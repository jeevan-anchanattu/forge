import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/shared/api';
import { PanelResizer } from '../components/PanelResizer';
import { PanelCollapseToggle } from '../components/PanelCollapseToggle';
import { ArrowLeft, Save, ShieldCheck, MessageSquare, List, FileText, ChevronLeft, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';
import { PdfViewer } from '@/shared/components/PdfViewer';
import { SpecTable } from '../components/SpecTable';
import { AIChat } from '../components/AIChat';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';

export const SectionCockpitPage: React.FC = () => {
    const navigate = useNavigate();
    const { sectionId, workbookId } = useParams<{ sectionId: string; workbookId: string }>();
    const [section, setSection] = useState<any>(null);
    const [workbook, setWorkbook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [highlightedId, setHighlightedId] = useState<string | null>(null);
    const [isPdfCollapsed, setIsPdfCollapsed] = useState(true);
    const [isAiCollapsed, setIsAiCollapsed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!sectionId || !workbookId) return;
            try {
                setLoading(true);
                const [secRes, wbRes] = await Promise.all([
                    api.get(`sections/${sectionId}`),
                    api.get(`workbooks/${workbookId}`)
                ]);
                setSection(secRes.data.data);
                setWorkbook(wbRes.data.data);
            } catch (err) {
                console.error('failed to load section data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [sectionId, workbookId]);

    const handleSpecUpdate = (id: string, field: string, value: string) => {
        setSection((prev: any) => ({
            ...prev,
            specItems: prev.specItems.map((item: any) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleManualSection = (bounds: { x: number; y: number; w: number; h: number }) => {
        const newItem = {
            id: `manual_${Date.now()}`,
            parameter: 'New Extraction',
            extractedValue: 'Pending...',
            verifiedValue: '',
            unit: 'mm',
            tolerance: '±0.1',
            material: 'Pending...',
            confidence: 'medium' as const,
            boundsJson: bounds
        };
        setSection((prev: any) => ({
            ...prev,
            specItems: [...(prev.specItems || []), newItem]
        }));
        setHighlightedId(newItem.id);
    };

    const handleAddRow = () => {
        const newId = `new-spec-${Date.now()}`;
        const newSpec = {
            id: newId,
            parameter: 'New Parameter',
            extractedValue: '',
            verifiedValue: '',
            unit: 'mm',
            tolerance: '',
            material: '',
            standard: '',
            surfaceFinish: '',
            confidence: 'medium' as const,
        };
        setSection((prev: any) => prev ? {
            ...prev,
            specItems: [...prev.specItems, newSpec]
        } : null);
        setHighlightedId(newId);
    };

    if (loading) {
        return <div className="p-8 text-text-tertiary animate-pulse">Loading section cockpit...</div>;
    }

    if (!section) {
        return <div className="p-8 text-error">Section not found</div>;
    }


    return (
        <div className="cockpit bg-bg-primary">
            {/* left PDF panel */}
            <div className="relative bg-bg-secondary flex flex-col border-r border-border-subtle h-full min-h-0 overflow-hidden">
                {!isPdfCollapsed ? (
                    <div className="flex-1 min-h-0 overflow-hidden">
                        <PdfViewer
                            fileUrl={workbook?.pdfUrl || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae1/web/compressed.tracemonkey-pldi-09.pdf'}
                            className="h-full w-full"
                            specItems={section.specItems}
                            highlightedId={highlightedId}
                            onSpecClick={setHighlightedId}
                            onManualSection={handleManualSection}
                        />
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center pt-8 gap-6 opacity-40 hover:opacity-100 transition-opacity">
                        <FileText className="h-6 w-6 text-text-tertiary" />
                    </div>
                )}
                <PanelResizer panel="pdf" />
            </div>

            {/* center work panel */}
            <div className="flex flex-col min-w-0 bg-bg-primary overflow-hidden">
                {/* Header */}
                <div className="px-3 border-b border-border-subtle bg-bg-card flex items-center justify-between shadow-sm z-10 h-12 shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="flex border-r border-border-subtle pr-2 mr-1">
                            <button
                                onClick={() => navigate(`/workbook/${workbookId}`)}
                                className="p-1 text-text-secondary hover:text-accent-primary hover:bg-surface rounded-lg transition-all shrink-0"
                                title="Back to Workbook"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                            </button>
                            <PanelCollapseToggle
                                panel="pdf"
                                title="Toggle PDF View"
                                isCollapsed={isPdfCollapsed}
                                onToggle={setIsPdfCollapsed}
                            />
                        </div>

                        <div className="flex items-center gap-2 min-w-0">
                            {section.thumbnailUrl && (
                                <div className="w-8 h-8 rounded overflow-hidden border border-border-subtle shrink-0 shadow-sm bg-surface hidden sm:block">
                                    <img src={section.thumbnailUrl} alt={section.name} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <h2 className="text-xs font-bold text-text-primary truncate">{section.name}</h2>
                                    <span className="shrink-0 text-[9px] uppercase font-bold tracking-tighter bg-accent-primary/10 text-accent-primary px-1.5 py-0.5 rounded border border-accent-primary/20">
                                        {section.sectionType || 'EXTRACTED'}
                                    </span>
                                </div>
                                <p className="text-[8px] text-text-tertiary truncate">WB: {workbook?.name} • P: {section.pageNumber || '1'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-2 border-r border-border-subtle pr-3 mr-1">
                            <Button variant="ghost" size="sm" className="h-8 px-2.5 text-[11px]">
                                <Save className="h-3 w-3 mr-1.5" />
                                Save
                            </Button>
                            <Button size="sm" className="h-8 px-2.5 text-[11px]">
                                <ShieldCheck className="h-3 w-3 mr-1.5" />
                                Verify
                            </Button>
                        </div>
                        <PanelCollapseToggle
                            panel="ai"
                            title="Toggle AI Assistant"
                            isCollapsed={isAiCollapsed}
                            onToggle={setIsAiCollapsed}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto custom-scrollbar bg-bg-primary">
                    <div className="p-3 space-y-3 max-w-5xl mx-auto w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button className="text-sm font-bold text-accent-primary border-b-2 border-accent-primary pb-1 flex items-center">
                                    <List className="h-4 w-4 mr-2" />
                                    Specifications
                                </button>
                                <button className="text-sm font-bold text-text-tertiary hover:text-text-secondary pb-1 flex items-center">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Comments
                                </button>
                            </div>
                        </div>

                        <Card glass className="overflow-hidden border-border-subtle shadow-xl">
                            {section.specItems ? (
                                <SpecTable
                                    data={section.specItems}
                                    onUpdate={handleSpecUpdate}
                                    onHighlight={setHighlightedId}
                                    highlightedId={highlightedId}
                                    onAddRow={handleAddRow}
                                />
                            ) : (
                                <div className="p-12 text-center text-text-tertiary italic">
                                    No specifications extracted for this section.
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>

            {/* right AI/review panel */}
            <div className="relative bg-bg-secondary flex flex-col border-l border-border-subtle h-full min-h-0 overflow-hidden">
                {!isAiCollapsed ? (
                    <AIChat
                        sectionName={section.name}
                        specItems={section.specItems || []}
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center pt-8 gap-6 opacity-40 hover:opacity-100 transition-opacity">
                        <MessageSquare className="h-6 w-6 text-text-tertiary" />
                    </div>
                )}
                <PanelResizer panel="ai" />
            </div>
        </div>
    );
};