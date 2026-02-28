import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { ZoomIn, ZoomOut, Maximize2, Ruler, Target, Crosshair, ChevronLeft, ChevronRight, Info, MousePointer2, Square, Search, Plus, X } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface SpecItem {
    id: string;
    parameter: string;
    extractedValue: string;
    verifiedValue: string;
    unit: string;
    confidence: 'high' | 'medium' | 'low';
    boundsJson?: { x: number; y: number; w: number; h: number };
}

interface PdfViewerProps {
    fileUrl: string;
    className?: string;
    specItems?: SpecItem[];
    highlightedId?: string | null;
    onSpecClick?: (id: string) => void;
    onManualSection?: (bounds: { x: number; y: number; w: number; h: number }, context: { scale: number; thumbnail: string }) => void;
    maxHeight?: string;
    initialDragMode?: 'pan' | 'select' | 'calibrate';
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
    fileUrl,
    className,
    specItems = [],
    highlightedId,
    onSpecClick,
    onManualSection,
    maxHeight = '80vh',
    initialDragMode = 'pan'
}) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.5);

    // Ruler and Calibration State
    const [pxPerUnit, setPxPerUnit] = useState<number>(1); // e.g., 10px per mm
    const [calibrationMode, setCalibrationMode] = useState(false);
    const [calibrationPoints, setCalibrationPoints] = useState<{ x: number, y: number }[]>([]);
    const [showCalibrationModal, setShowCalibrationModal] = useState(false);
    const [realDistance, setRealDistance] = useState('100');
    const [unit, setUnit] = useState('mm');
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Pan/Drag State
    const [dragMode, setDragMode] = useState<'pan' | 'select' | 'calibrate'>(initialDragMode);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    // Selection State
    const [selection, setSelection] = useState<{ x: number, y: number, w: number, h: number } | null>(null);
    const [selectionPhase, setSelectionPhase] = useState<'creating' | 'moving' | 'resizing' | 'idle'>('idle');
    const [resizeHandle, setResizeHandle] = useState<string | null>(null);
    const [unitMenu, setUnitMenu] = useState<{ x: number, y: number } | null>(null);
    const [rulerTrigger, setRulerTrigger] = useState(0);
    const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });

    const hRulerRef = useRef<HTMLCanvasElement>(null);
    const vRulerRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        // Trigger ruler update after document is rendered and scaled
        setTimeout(() => {
            setRulerTrigger(prev => prev + 1);
        }, 1000);
    }

    // Draw Ruler Ticks
    // Draw Ruler Ticks
    useEffect(() => {
        const drawRuler = (canvas: HTMLCanvasElement, orientation: 'h' | 'v') => {
            const ctx = canvas.getContext('2d', { alpha: false });
            if (!ctx) return;

            const isH = orientation === 'h';
            const width = canvas.width;
            const height = canvas.height;

            const scrollOffset = isH ? scrollPos.x : scrollPos.y;
            const spacing = pxPerUnit * scale;
            if (spacing <= 0) return;

            // Background
            ctx.fillStyle = '#0B0F1A';
            ctx.fillRect(0, 0, width, height);

            ctx.strokeStyle = '#64748b';
            ctx.fillStyle = '#64748b';
            ctx.lineWidth = 1;
            ctx.font = '9px Inter';
            ctx.beginPath();

            const interval = spacing < 10 ? 50 : spacing < 50 ? 10 : 5;

            // Align 0 with the PDF page edge (12px padding)
            const paddingOffset = 12 * scale;
            const scrollOffsetAdjusted = scrollOffset - paddingOffset;

            const firstTick = Math.max(0, Math.ceil(scrollOffsetAdjusted / spacing));
            const startPos = (firstTick * spacing) - scrollOffsetAdjusted;
            const limit = isH ? width : height;

            for (let pos = startPos, tickValue = firstTick; pos < limit; pos += spacing, tickValue++) {
                const isMajor = tickValue % interval === 0;

                if (isH) {
                    ctx.moveTo(pos, 20);
                    ctx.lineTo(pos, isMajor ? 0 : 12);
                    if (isMajor) {
                        ctx.fillText(`${tickValue}${unit}`, pos + 2, 8);
                    }
                } else {
                    ctx.moveTo(20, pos);
                    ctx.lineTo(isMajor ? 0 : 12, pos);
                    if (isMajor) {
                        ctx.fillText(`${tickValue}${unit}`, 2, pos - 2);
                    }
                }
            }
            ctx.stroke();
        };

        const updateRulers = () => {
            if (hRulerRef.current && vRulerRef.current && containerRef.current && mainRef.current) {
                const container = containerRef.current;
                const main = mainRef.current;
                const hParent = hRulerRef.current.parentElement;
                const vParent = vRulerRef.current.parentElement;

                if (!hParent || !vParent) return;

                // Dynamically calculate the vertical ruler height based on
                // the component's root height minus the toolbar height.
                const toolbarH = toolbarRef.current?.clientHeight || 40;
                const vHeight = main.clientHeight - toolbarH;
                const hWidth = container.clientWidth;

                hRulerRef.current.width = hWidth;
                hRulerRef.current.height = 20;
                vRulerRef.current.width = 20;
                vRulerRef.current.height = vHeight;

                // Do not manually set style.height if flex-1 is used,
                // just ensure the canvas is sized correctly.

                drawRuler(hRulerRef.current, 'h');
                drawRuler(vRulerRef.current, 'v');
            }
        };

        updateRulers();

        const resizeObserver = new ResizeObserver(() => {
            updateRulers();
        });

        const currentMain = mainRef.current;
        if (currentMain) resizeObserver.observe(currentMain);

        return () => {
            if (currentMain) resizeObserver.unobserve(currentMain);
        };
    }, [scale, pxPerUnit, unit, numPages, rulerTrigger, scrollPos, isFullscreen]);

    const handleContainerClick = (e: React.MouseEvent) => {
        if (!calibrationMode) return;

        const pageRect = containerRef.current?.querySelector('.react-pdf__Page')?.getBoundingClientRect();
        if (!pageRect) return;

        // Account for scale and page position
        const x = (e.clientX - pageRect.left) / scale;
        const y = (e.clientY - pageRect.top) / scale;

        const newPoints = [...calibrationPoints, { x, y }];
        setCalibrationPoints(newPoints);

        if (newPoints.length === 2) {
            setShowCalibrationModal(true);
            setCalibrationMode(false);
        }
    };

    const completeCalibration = () => {
        const [p1, p2] = calibrationPoints;
        const pixelDist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        const dist = parseFloat(realDistance);
        if (dist > 0) {
            setPxPerUnit((pixelDist) / dist);
        }
        setShowCalibrationModal(false);
        setCalibrationPoints([]);
    };

    const toggleFullscreen = () => {
        if (!mainRef.current) return;

        if (!document.fullscreenElement) {
            mainRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleFSChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFSChange);
        return () => document.removeEventListener('fullscreenchange', handleFSChange);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (calibrationMode && dragMode !== 'calibrate') return;

        const pageRect = containerRef.current?.querySelector('.react-pdf__Page')?.getBoundingClientRect();
        if (!pageRect) return;

        // Coordinates relative to the Page element
        const x = (e.clientX - pageRect.left) / scale;
        const y = (e.clientY - pageRect.top) / scale;

        if (dragMode === 'select') {
            const target = e.target as HTMLElement;
            // Ignore if clicking on selection tools
            if (target.closest('.selection-tools')) return;

            if (target.classList.contains('selection-handle')) {
                setSelectionPhase('resizing');
                setResizeHandle(target.dataset.handle || null);
                setIsDragging(true);
                setStartX(x);
                setStartY(y);
                return;
            }
            if (target.classList.contains('selection-box')) {
                setSelectionPhase('moving');
                setIsDragging(true);
                setStartX(x - (selection?.x || 0));
                setStartY(y - (selection?.y || 0));
                return;
            }
            setSelection({ x, y, w: 0, h: 0 });
            setSelectionPhase('creating');
        }

        setIsDragging(true);
        if (dragMode === 'pan') {
            setStartX(e.clientX);
            setStartY(e.clientY);
            setScrollLeft(containerRef.current?.scrollLeft || 0);
            setScrollTop(containerRef.current?.scrollTop || 0);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();

        const pageRect = containerRef.current?.querySelector('.react-pdf__Page')?.getBoundingClientRect();
        if (!pageRect) return;

        const currentX = (e.clientX - pageRect.left) / scale;
        const currentY = (e.clientY - pageRect.top) / scale;

        if (dragMode === 'select' && selection) {
            if (selectionPhase === 'creating') {
                setSelection({
                    ...selection,
                    w: currentX - selection.x,
                    h: currentY - selection.y
                });
            } else if (selectionPhase === 'moving') {
                setSelection({
                    ...selection,
                    x: currentX - startX,
                    y: currentY - startY
                });
            } else if (selectionPhase === 'resizing' && resizeHandle) {
                let { x, y, w, h } = selection;
                if (resizeHandle.includes('e')) w = currentX - x;
                if (resizeHandle.includes('w')) { w = w + (x - currentX); x = currentX; }
                if (resizeHandle.includes('s')) h = currentY - y;
                if (resizeHandle.includes('n')) { h = h + (y - currentY); y = currentY; }
                setSelection({ x, y, w, h });
            }
            return;
        }

        if (dragMode === 'pan') {
            const walkX = (e.clientX - startX);
            const walkY = (e.clientY - startY);
            if (containerRef.current) {
                containerRef.current.scrollLeft = scrollLeft - walkX;
                containerRef.current.scrollTop = scrollTop - walkY;
                // Let onScroll handle the scrollPos update to avoid redundant re-renders
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setSelectionPhase('idle');
        setResizeHandle(null);
    };

    const zoomToSelection = () => {
        if (!selection || selection.w === 0 || selection.h === 0) return;

        const containerWidth = containerRef.current?.clientWidth || 0;
        const containerHeight = containerRef.current?.clientHeight || 0;

        const scaleX = containerWidth / Math.abs(selection.w * scale);
        const scaleY = containerHeight / Math.abs(selection.h * scale);
        const newScale = Math.min(5, scale * Math.min(scaleX, scaleY) * 0.8);

        setScale(newScale);

        // Center the selection after scale change
        setTimeout(() => {
            const pageEl = containerRef.current?.querySelector('.react-pdf__Page') as HTMLElement;
            if (pageEl && containerRef.current) {
                const centerX = (selection.x + selection.w / 2) * newScale;
                const centerY = (selection.y + selection.h / 2) * newScale;

                // Get page position relative to container
                const pageOffsetLeft = pageEl.offsetLeft;
                const pageOffsetTop = pageEl.offsetTop;

                containerRef.current.scrollLeft = (pageOffsetLeft + centerX) - (containerWidth / 2);
                containerRef.current.scrollTop = (pageOffsetTop + centerY) - (containerHeight / 2);
            }
            setSelection(null);
        }, 100);
    };

    const fitToWidth = () => {
        const pageEl = containerRef.current?.querySelector('.react-pdf__Page') as HTMLElement;
        const containerEl = containerRef.current;
        if (!pageEl || !containerEl) return;

        const containerWidth = containerEl.clientWidth - 40; // Subtract rulers/padding
        const pageWidth = pageEl.clientWidth / scale; // Original width
        const newScale = containerWidth / pageWidth;
        setScale(newScale);
    };

    const handleRulerContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setUnitMenu({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            ref={mainRef}
            className={`flex flex-col h-full bg-[#0B0F1A] border border-border-subtle rounded-xl overflow-hidden shadow-2xl ${className}`}
            onClick={() => unitMenu && setUnitMenu(null)}
            style={{ maxHeight: isFullscreen ? 'none' : maxHeight }}
        >
            {/* Toolbar */}
            <div ref={toolbarRef} className="flex items-center justify-between p-3 bg-bg-card border-b border-border-subtle z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex bg-surface rounded-lg p-1">
                        <button
                            className={`p-1.5 rounded-md transition-colors ${dragMode === 'pan' ? 'bg-accent-primary text-white shadow-sm' : 'text-text-secondary hover:bg-bg-secondary'}`}
                            onClick={() => { setDragMode('pan'); setCalibrationMode(false); }}
                            title="Pan Tool"
                        >
                            <MousePointer2 className="h-4 w-4" />
                        </button>
                        <button
                            className={`p-1.5 rounded-md transition-colors ${dragMode === 'select' ? 'bg-accent-primary text-white shadow-sm' : 'text-text-secondary hover:bg-bg-secondary'}`}
                            onClick={() => { setDragMode('select'); setCalibrationMode(false); }}
                            title="Selection Tool"
                        >
                            <Square className="h-4 w-4" />
                        </button>
                        <button
                            className={`p-1.5 rounded-md transition-colors ${dragMode === 'calibrate' ? 'bg-accent-primary text-white shadow-sm' : 'text-text-secondary hover:bg-bg-secondary'}`}
                            onClick={() => {
                                setDragMode('calibrate');
                                setCalibrationMode(true);
                                setCalibrationPoints([]);
                            }}
                            title="Calibration Tool"
                        >
                            <Ruler className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex bg-surface rounded-lg p-1">
                        <button
                            className="p-1.5 hover:bg-bg-secondary rounded-md text-text-secondary disabled:opacity-30"
                            disabled={pageNumber <= 1}
                            onClick={() => setPageNumber(p => p - 1)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-xs font-mono font-bold flex items-center">
                            {pageNumber} / {numPages}
                        </span>
                        <button
                            className="p-1.5 hover:bg-bg-secondary rounded-md text-text-secondary disabled:opacity-30"
                            disabled={pageNumber >= numPages}
                            onClick={() => setPageNumber(p => p + 1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-surface rounded-lg p-1">
                        <button className="p-1.5 hover:bg-bg-secondary rounded-md text-text-secondary" onClick={() => setScale(s => Math.max(0.1, s - 0.2))}><ZoomOut className="h-4 w-4" /></button>
                        <span className="px-2 py-1 text-xs font-mono w-14 text-center flex items-center justify-center cursor-pointer hover:text-accent-primary" onClick={fitToWidth} title="Fit to Width">{Math.round(scale * 100)}%</span>
                        <button className="p-1.5 hover:bg-bg-secondary rounded-md text-text-secondary" onClick={() => setScale(s => Math.min(5, s + 0.2))}><ZoomIn className="h-4 w-4" /></button>
                    </div>

                    <div className="h-6 w-px bg-border-subtle" />

                    <div className="flex gap-2">
                        <button
                            className={`p-2 rounded-lg transition-colors leading-none ${isFullscreen ? 'bg-accent-primary text-white' : 'bg-surface text-text-secondary hover:bg-bg-secondary'}`}
                            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                            onClick={toggleFullscreen}
                        >
                            <Maximize2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`flex-1 relative overflow-hidden flex min-h-0 min-w-0 bg-[#0B0F1A] max-h-full ${isDragging ? 'cursor-grabbing' : (dragMode === 'select' ? 'cursor-crosshair' : (dragMode === 'calibrate' ? 'cursor-crosshair' : 'cursor-grab'))}`}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Left Column for Vertical Ruler */}
                <div className="flex flex-col shrink-0 h-full min-h-0 max-h-full">
                    <div className="w-5 h-5 bg-[#0B0F1A] border-b border-r border-border-subtle z-50 shrink-0" />
                    <div className="flex-1 w-5 bg-[#0B0F1A] border-r border-border-subtle relative overflow-hidden cursor-context-menu min-h-0 max-h-full" onContextMenu={handleRulerContextMenu}>
                        <canvas ref={vRulerRef} className="absolute inset-0 w-full" />
                    </div>
                </div>

                {/* Right Column for H-Ruler and Content */}
                <div className="flex-1 flex flex-col min-w-0 h-full min-h-0 max-h-full overflow-hidden">
                    <div className="h-5 bg-[#0B0F1A] border-b border-border-subtle relative overflow-hidden cursor-context-menu shrink-0" onContextMenu={handleRulerContextMenu}>
                        <canvas ref={hRulerRef} className="absolute inset-0 h-full" />
                    </div>

                    <div
                        className="flex-1 relative overflow-auto no-scrollbar bg-bg-secondary min-h-0 max-h-full"
                        ref={containerRef}
                        onMouseDown={handleMouseDown}
                        onScroll={() => {
                            if (containerRef.current) {
                                setScrollPos({
                                    x: containerRef.current.scrollLeft,
                                    y: containerRef.current.scrollTop
                                });
                            }
                        }}
                        onClick={(e) => {
                            if (dragMode === 'calibrate') handleContainerClick(e);
                        }}
                    >
                        {/* PDF Document Container */}
                        <div className="relative pt-12 px-12 pb-[100vh] bg-[#0B0F1A] min-w-max min-h-full">
                            <Document
                                file={fileUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="shadow-2xl ring-1 ring-border-subtle pointer-events-auto"
                            >
                                <div className="relative bg-white shadow-inner">
                                    <Page
                                        pageNumber={pageNumber}
                                        scale={scale}
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                    />

                                    {/* Ghost Overlay Layer */}
                                    <div className="absolute inset-0 z-1 pointer-events-none">
                                        {specItems.map((item) => {
                                            if (!item.boundsJson) return null;
                                            const isHighlighted = highlightedId === item.id;
                                            const color = item.confidence === 'high' ? 'rgba(34, 197, 94, 0.2)' :
                                                item.confidence === 'medium' ? 'rgba(234, 179, 8, 0.2)' :
                                                    'rgba(239, 68, 68, 0.2)';
                                            const borderColor = item.confidence === 'high' ? '#22c55e' :
                                                item.confidence === 'medium' ? '#eab308' :
                                                    '#ef4444';

                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`absolute cursor-pointer border ring-1 ring-inset pointer-events-auto transition-all ${isHighlighted ? 'animate-pulse z-10 border-white ring-white scale-[1.02]' : 'hover:scale-[1.01] hover:border-white'}`}
                                                    style={{
                                                        left: `${item.boundsJson.x * 100}%`,
                                                        top: `${item.boundsJson.y * 100}%`,
                                                        width: `${item.boundsJson.w * 100}%`,
                                                        height: `${item.boundsJson.h * 100}%`,
                                                        backgroundColor: color,
                                                        borderColor: borderColor,
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onSpecClick?.(item.id);
                                                    }}
                                                >
                                                    {isHighlighted && (
                                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded shadow-xl whitespace-nowrap">
                                                            {item.parameter}: {item.extractedValue}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Selection Overlay */}
                                    {selection && (
                                        <div className={`absolute border-2 border-accent-primary border-dashed bg-accent-primary/5 z-40 selection-box 
                                                ${dragMode === 'select' ? 'pointer-events-auto cursor-move' : 'pointer-events-none'}`}
                                            style={{
                                                left: Math.min(selection.x, selection.x + selection.w) * scale,
                                                top: Math.min(selection.y, selection.y + selection.h) * scale,
                                                width: Math.abs(selection.w) * scale,
                                                height: Math.abs(selection.h) * scale
                                            }}
                                        >
                                            {/* Resize Handles */}
                                            {dragMode === 'select' && !isDragging && (
                                                <>
                                                    {['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].map(h => (
                                                        <div
                                                            key={h}
                                                            data-handle={h}
                                                            className={`selection-handle absolute w-3 h-3 bg-white border border-accent-primary z-50 rounded-sm
                                                                ${h === 'n' || h === 's' ? 'left-1/2 -translate-x-1/2 cursor-ns-resize' : ''}
                                                                ${h === 'e' || h === 'w' ? 'top-1/2 -translate-y-1/2 cursor-ew-resize' : ''}
                                                                ${h === 'nw' ? 'top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize' : ''}
                                                                ${h === 'ne' ? 'top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize' : ''}
                                                                ${h === 'se' ? 'bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize' : ''}
                                                                ${h === 'sw' ? 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize' : ''}
                                                                ${h === 'n' ? 'top-0 -translate-y-1/2' : ''}
                                                                ${h === 's' ? 'bottom-0 translate-y-1/2' : ''}
                                                                ${h === 'e' ? 'right-0 translate-x-1/2' : ''}
                                                                ${h === 'w' ? 'left-0 -translate-x-1/2' : ''}
                                                            `}
                                                        />
                                                    ))}
                                                </>
                                            )}

                                        </div>
                                    )}

                                    {/* Calibration feedback */}
                                    {calibrationPoints.map((p, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-3 h-3 bg-accent-primary rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg pointer-events-none z-30"
                                            style={{ left: p.x * scale, top: p.y * scale }}
                                        />
                                    ))}
                                    {calibrationPoints.length === 2 && (
                                        <div
                                            className="absolute border-t-2 border-accent-primary border-dashed z-30 pointer-events-none origin-left"
                                            style={{
                                                left: calibrationPoints[0].x * scale,
                                                top: calibrationPoints[0].y * scale,
                                                width: Math.sqrt(Math.pow((calibrationPoints[1].x - calibrationPoints[0].x) * scale, 2) + Math.pow((calibrationPoints[1].y - calibrationPoints[0].y) * scale, 2)),
                                                transform: `rotate(${Math.atan2(calibrationPoints[1].y - calibrationPoints[0].y, calibrationPoints[1].x - calibrationPoints[0].x)}rad)`
                                            }}
                                        />
                                    )}
                                </div>
                            </Document>
                        </div>
                    </div>
                </div>
            </div>

            {/* Unit Context Menu */}
            {unitMenu && (
                <div
                    className="fixed z-[100] bg-bg-card border border-border-subtle rounded-lg shadow-2xl py-2 w-48 scale-in"
                    style={{ left: unitMenu.x, top: unitMenu.y }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-text-tertiary border-b border-border-subtle mb-1">Select Unit</p>
                    {['mm', 'cm', 'm', 'inch', 'ft'].map(u => (
                        <button
                            key={u}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-accent-primary hover:text-white transition-colors flex items-center justify-between ${unit === u ? 'text-accent-primary font-bold' : 'text-text-primary'}`}
                            onClick={() => {
                                // Unit conversion logic
                                const mmPerUnit: Record<string, number> = {
                                    mm: 1, cm: 10, m: 1000, inch: 25.4, ft: 304.8
                                };
                                const pxPerMm = pxPerUnit / mmPerUnit[unit];
                                const newPxPerUnit = pxPerMm * mmPerUnit[u];

                                setPxPerUnit(newPxPerUnit);
                                setUnit(u);
                                setUnitMenu(null);
                            }}
                        >
                            {u === 'inch' ? 'Inches (")' : u === 'ft' ? 'Feet (\')' : u}
                            {unit === u && <div className="w-1.5 h-1.5 bg-current rounded-full" />}
                        </button>
                    ))}
                </div>
            )}

            {/* Calibration Modal */}
            {showCalibrationModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <Card className="max-w-xs w-full p-6 shadow-2xl ring-1 ring-border-subtle scale-in">
                        <h4 className="flex items-center font-bold mb-4">
                            <Target className="h-4 w-4 mr-2 text-accent-primary" />
                            Calibrate Scale
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs uppercase tracking-widest text-text-tertiary mb-1 block">Real Distance</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        className="flex-1 bg-surface border border-border-subtle rounded px-3 py-2 text-sm font-mono focus:ring-1 ring-accent-primary outline-none"
                                        style={{ width: '10px' }}
                                        value={realDistance}
                                        onChange={(e) => setRealDistance(e.target.value)}
                                    />
                                    <select
                                        className="bg-surface border border-border-subtle rounded px-2 py-2 text-sm focus:ring-1 ring-accent-primary outline-none"
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                    >
                                        <option value="mm">mm</option>
                                        <option value="cm">cm</option>
                                        <option value="m">m</option>
                                        <option value="in">in</option>
                                        <option value="ft">ft</option>
                                    </select>
                                </div>
                            </div>
                            <div className="p-3 bg-bg-secondary rounded text-[10px] text-text-tertiary leading-relaxed border border-border-subtle italic">
                                Set the physical distance between the two points selected to calibrate the ruler.
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button variant="ghost" className="flex-1" onClick={() => setShowCalibrationModal(false)}>Cancel</Button>
                                <Button className="flex-1" onClick={completeCalibration}>Set Scale</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Floating Selection Tools */}
            {selection && !isDragging && Math.abs(selection.w) > 20 && (
                <div className="absolute bottom-8 right-8 z-50 flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
                    <div className="bg-bg-card/90 backdrop-blur-md border border-border-subtle rounded-2xl p-4 shadow-2xl flex flex-col gap-3 min-w-[220px] pointer-events-auto selection-tools">
                        <div className="flex items-center justify-between border-b border-border-subtle pb-2 mb-1">
                            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Region Selected</span>
                            <button
                                onClick={() => setSelection(null)}
                                className="p-1 hover:bg-surface rounded-md text-text-tertiary hover:text-text-primary transition-colors"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    const rect = containerRef.current?.querySelector('.react-pdf__Page')?.getBoundingClientRect();
                                    if (!rect) return;

                                    // Convert selection to relative coordinates (0-1)
                                    const pX = Math.min(selection.x, selection.x + selection.w) / (rect.width / scale);
                                    const pY = Math.min(selection.y, selection.y + selection.h) / (rect.height / scale);
                                    const pW = Math.abs(selection.w) / (rect.width / scale);
                                    const pH = Math.abs(selection.h) / (rect.height / scale);

                                    onManualSection?.({ x: pX, y: pY, w: pW, h: pH }, {
                                        scale,
                                        thumbnail: `https://picsum.photos/400/300?random=${Math.random()}`
                                    });
                                    setSelection(null);
                                }}
                                className="w-full bg-success text-white py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs font-bold uppercase transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-success/20"
                            >
                                <Plus className="h-4 w-4" /> Extract Section
                            </button>
                            <button
                                onClick={zoomToSelection}
                                className="w-full bg-accent-primary text-white py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs font-bold uppercase transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-accent-primary/20"
                            >
                                <Search className="h-4 w-4" /> Zoom to Area
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
