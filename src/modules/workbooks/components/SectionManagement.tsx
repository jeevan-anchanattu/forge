import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Modal } from '@/shared/components/Modal';
import { PdfViewer } from '@/shared/components/PdfViewer';
import {
    Plus,
    MoreVertical,
    Trash2,
    RotateCw,
    ExternalLink,
    Info,
    FileText,
    Upload,
    CheckCircle2,
    Clock,
    ChevronRight,
    AlertCircle,
    Search
} from 'lucide-react';
import api from '@/shared/api';

interface Section {
    id: string;
    name: string;
    status: string;
    pageNumber?: number;
    updatedAt: string;
    isManual?: boolean;
    thumbnailUrl?: string;
}

interface SectionManagementProps {
    workbookId: string;
    sections: Section[];
    pdfUrl?: string;
    onRefresh: () => void;
}

export const SectionManagement: React.FC<SectionManagementProps> = ({
    workbookId,
    sections,
    pdfUrl,
    onRefresh
}) => {
    const navigate = useNavigate();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [isRefreshing, setIsRefreshing] = useState<string | null>(null);

    // Add Section Form State
    const [newName, setNewName] = useState('');
    const [sourceType, setSourceType] = useState<'current' | 'upload'>(pdfUrl ? 'current' : 'upload');
    const [isSelectingArea, setIsSelectingArea] = useState(false);
    const [selectedArea, setSelectedArea] = useState<any>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [tempUploadUrl, setTempUploadUrl] = useState<string | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractedItems, setExtractedItems] = useState<any[]>([]);

    const resetForm = () => {
        setIsAddModalOpen(false);
        setNewName('');
        setSelectedArea(null);
        handleFileChange(null);
        setExtractedItems([]);
        setIsExtracting(false);
    };

    const handleFileChange = (file: File | null) => {
        setUploadFile(file);
        if (tempUploadUrl) URL.revokeObjectURL(tempUploadUrl);
        if (file) {
            setTempUploadUrl(URL.createObjectURL(file));
        } else {
            setTempUploadUrl(null);
        }
    };

    // Cleanup object URL on unmount
    React.useEffect(() => {
        return () => {
            if (tempUploadUrl) URL.revokeObjectURL(tempUploadUrl);
        };
    }, [tempUploadUrl]);

    // Sync sourceType if pdfUrl changes (e.g. file uploaded in other tab)
    React.useEffect(() => {
        if (!pdfUrl && sourceType === 'current') {
            setSourceType('upload');
        } else if (pdfUrl && sourceType === 'upload' && !uploadFile) {
            setSourceType('current');
        }
    }, [pdfUrl]);

    const handleAddSection = async () => {
        if (!newName.trim()) return;
        try {
            await api.post(`workbooks/${workbookId}/sections`, {
                name: newName,
                isManual: true,
                boundsJson: selectedArea,
                specItems: extractedItems,
                status: extractedItems.length > 0 ? 'complete' : 'draft',
            });
            resetForm();
            onRefresh();
        } catch (err) {
            console.error('Failed to add section', err);
        }
    };

    const handleDeleteSection = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this section?')) return;
        try {
            await api.delete(`sections/${id}`);
            onRefresh();
        } catch (err) {
            console.error('Failed to delete section', err);
        }
    };

    const handleRefreshSection = async (id: string) => {
        setIsRefreshing(id);
        try {
            // Simulate re-extraction delay
            await api.put(`sections/${id}/status`, { status: 'processing' });
            setTimeout(async () => {
                await api.put(`sections/${id}/status`, { status: 'complete' });
                setIsRefreshing(null);
                onRefresh();
            }, 2000);
        } catch (err) {
            console.error('Failed to refresh section', err);
            setIsRefreshing(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-text-primary tracking-tight">Project Sections</h2>
                    <span className="px-2 py-0.5 rounded-full bg-surface text-text-tertiary text-[10px] font-bold border border-border-subtle">
                        {sections.length} TOTAL
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={onRefresh}>
                        <RotateCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Sync All
                    </Button>
                    <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                    </Button>
                </div>
            </div>

            {sections.length === 0 ? (
                <div className="p-12 border-2 border-dashed border-border-subtle rounded-2xl flex flex-col items-center justify-center text-center space-y-4 bg-bg-card/30">
                    <div className="p-4 bg-surface rounded-full text-text-tertiary">
                        <AlertCircle className="h-8 w-8" />
                    </div>
                    <div>
                        <h4 className="text-lg font-medium text-text-primary">No sections defined yet</h4>
                        <p className="text-sm text-text-tertiary max-w-sm">
                            Sections represent logical portions of your workbook. Add a section to begin deep analysis and extraction.
                        </p>
                    </div>
                    <Button variant="ghost" onClick={() => setIsAddModalOpen(true)}>Create First Section</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sections.map(section => (
                        <Card key={section.id} glass className="group hover:border-accent-primary/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
                            <div className="p-4 flex-1">
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${section.status === 'complete' ? 'bg-success/10 text-success border border-success/20' :
                                        section.status === 'processing' ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20 animate-pulse' :
                                            'bg-surface text-text-tertiary border border-border-subtle'
                                        }`}>
                                        {section.status}
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRefreshSection(section.id); }}
                                            className="p-1.5 text-text-tertiary hover:text-accent-primary hover:bg-accent-primary/10 rounded"
                                            title="Refresh / Re-extract"
                                        >
                                            <RotateCw className={`h-3.5 w-3.5 ${isRefreshing === section.id ? 'animate-spin' : ''}`} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedSection(section); setIsDetailsModalOpen(true); }}
                                            className="p-1.5 text-text-tertiary hover:text-accent-primary hover:bg-accent-primary/10 rounded"
                                            title="View Details"
                                        >
                                            <Info className="h-3.5 w-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteSection(section.id); }}
                                            className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/10 rounded"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {section.thumbnailUrl ? (
                                    <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden border border-border-subtle bg-bg-secondary group-hover:border-accent-primary/30 transition-colors">
                                        <img
                                            src={section.thumbnailUrl}
                                            alt={section.name}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/60 to-transparent pointer-events-none" />
                                    </div>
                                ) : (
                                    <div className="aspect-[4/3] mb-4 rounded-lg border border-border-subtle bg-bg-secondary/50 flex items-center justify-center text-text-tertiary">
                                        <FileText className="h-8 w-8 opacity-20" />
                                    </div>
                                )}

                                <h3 className="font-bold text-text-primary mb-1 line-clamp-1">{section.name}</h3>
                                <div className="flex items-center gap-3 text-xs text-text-tertiary">
                                    <span className="flex items-center">
                                        <FileText className="h-3 w-3 mr-1" />
                                        Page {section.pageNumber || 'N/A'}
                                    </span>
                                    <span className="flex items-center font-mono">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {new Date(section.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/workbooks/${workbookId}/sections/${section.id}`)}
                                className="w-full py-2.5 bg-bg-card/80 border-t border-border-subtle flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent-primary hover:bg-surface transition-colors"
                            >
                                Open Cockpit
                                <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Section Modal */}
            <Modal isOpen={isAddModalOpen} onClose={resetForm} title="Add New Section" className="max-w-md">
                <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-text-tertiary uppercase tracking-widest">Section Name</label>
                        <input
                            type="text"
                            className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-2.5 text-sm focus:ring-1 ring-accent-primary outline-none transition-all"
                            placeholder="e.g. Inlet Assembly Notes"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-text-tertiary uppercase tracking-widest">Document Source</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => pdfUrl && setSourceType('current')}
                                disabled={!pdfUrl}
                                className={`flex items-center justify-center p-3 rounded-xl border transition-all ${sourceType === 'current'
                                    ? 'border-accent-primary bg-accent-primary/5 text-accent-primary'
                                    : 'border-border-subtle bg-surface text-text-tertiary hover:border-text-tertiary'
                                    } ${!pdfUrl ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
                            >
                                <div className="text-center">
                                    <FileText className="h-5 w-5 mx-auto mb-1" />
                                    <p className="text-[10px] font-bold uppercase">Current PDF</p>
                                    {!pdfUrl && <p className="text-[8px] opacity-60">No file uploaded</p>}
                                </div>
                            </button>
                            <button
                                onClick={() => setSourceType('upload')}
                                className={`flex items-center justify-center p-3 rounded-xl border transition-all ${sourceType === 'upload'
                                    ? 'border-accent-primary bg-accent-primary/5 text-accent-primary'
                                    : 'border-border-subtle bg-surface text-text-tertiary hover:border-text-tertiary'
                                    }`}
                            >
                                <div className="text-center">
                                    <Upload className="h-5 w-5 mx-auto mb-1" />
                                    <p className="text-[10px] font-bold uppercase">New Upload</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {sourceType === 'current' ? (
                        <div className="p-4 bg-bg-secondary rounded-xl border border-border-subtle border-dashed">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-text-secondary">Section Boundary</span>
                                {selectedArea && (
                                    <span className="text-[10px] font-bold text-success uppercase">Region Set ✓</span>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full group"
                                onClick={() => setIsSelectingArea(true)}
                            >
                                <Plus className="h-3.5 w-3.5 mr-2 group-hover:scale-110 transition-transform" />
                                {selectedArea ? 'Redefine Selection Area' : 'Select Area from PDF'}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-bg-secondary rounded-xl border border-border-subtle border-dashed text-center">
                                <label className="cursor-pointer group">
                                    <Upload className="h-8 w-8 text-text-tertiary mx-auto mb-2 group-hover:text-accent-primary transition-colors" />
                                    <span className="text-xs font-medium text-text-secondary block">
                                        {uploadFile ? uploadFile.name : 'Click to upload specific PDF'}
                                    </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="application/pdf"
                                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                    />
                                </label>
                            </div>

                            {uploadFile && (
                                <div className="p-4 bg-bg-secondary rounded-xl border border-border-subtle border-dashed">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-text-secondary">Section Boundary</span>
                                        {selectedArea && (
                                            <span className="text-[10px] font-bold text-success uppercase">Region Set ✓</span>
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full group"
                                        onClick={() => setIsSelectingArea(true)}
                                    >
                                        <Plus className="h-3.5 w-3.5 mr-2 group-hover:scale-110 transition-transform" />
                                        {selectedArea ? 'Redefine Selection Area' : 'Select Area from Uploaded PDF'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="pt-4 flex gap-3">
                        <Button variant="ghost" className="flex-1" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button className="flex-1" onClick={handleAddSection} disabled={!newName.trim()}>Create Section</Button>
                    </div>
                </div>
            </Modal>

            {/* Region Selection Modal */}
            <Modal isOpen={isSelectingArea} onClose={() => setIsSelectingArea(false)} title="Select Section Area" className="max-w-5xl h-[90vh]">
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="p-4 bg-accent-primary/5 border-b border-border-subtle">
                        <p className="text-xs text-text-secondary flex items-center">
                            <Info className="h-3.5 w-3.5 mr-2 text-accent-primary" />
                            Drag a box over the region of the {sourceType === 'current' ? 'Current' : 'Uploaded'} PDF that represents this section.
                        </p>
                    </div>
                    <div className="flex-1 overflow-hidden relative bg-surface">
                        {(sourceType === 'current' ? pdfUrl : tempUploadUrl) ? (
                            <PdfViewer
                                fileUrl={(sourceType === 'current' ? pdfUrl : tempUploadUrl)!}
                                className="h-full"
                                initialDragMode="select"
                                onManualSection={(bounds) => {
                                    setSelectedArea(bounds);
                                    setIsExtracting(true);
                                    // Simulate AI Extraction delay
                                    setTimeout(() => {
                                        const mockItems = [
                                            { id: `ext_${Date.now()}_1`, parameter: 'Duct Width', extractedValue: '450', unit: 'mm', confidence: 'high', boundsJson: { x: bounds.x + 10, y: bounds.y + 10, w: 50, h: 20 } },
                                            { id: `ext_${Date.now()}_2`, parameter: 'Material', extractedValue: 'Galv Steeel', unit: '-', confidence: 'medium', boundsJson: { x: bounds.x + 20, y: bounds.y + 40, w: 60, h: 20 } },
                                            { id: `ext_${Date.now()}_3`, parameter: 'Insulation', extractedValue: '25', unit: 'mm', confidence: 'low', boundsJson: { x: bounds.x + 30, y: bounds.y + 70, w: 40, h: 20 } },
                                        ];
                                        setExtractedItems(mockItems);
                                        setIsExtracting(false);
                                    }, 1500);
                                }}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-text-tertiary italic text-sm">
                                <AlertCircle className="h-5 w-5 mr-2 animate-pulse" />
                                No source document available for selection.
                            </div>
                        )}

                        {isExtracting && (
                            <div className="absolute inset-0 z-50 flex items-center justify-center bg-bg-primary/40 backdrop-blur-sm">
                                <div className="bg-bg-card p-6 rounded-2xl border border-accent-primary/30 shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                                    <div className="relative">
                                        <RotateCw className="h-10 w-10 text-accent-primary animate-spin" />
                                        <Search className="absolute inset-0 m-auto h-4 w-4 text-accent-primary animate-pulse" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-text-primary uppercase tracking-widest text-xs mb-1">AI Extraction in Progress</p>
                                        <p className="text-[10px] text-text-tertiary">Analyzing engineering parameters for selected region...</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedArea && !isExtracting && (
                            <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                                {extractedItems.length > 0 && (
                                    <div className="bg-bg-card/90 backdrop-blur-md border border-border-subtle rounded-xl p-4 shadow-2xl max-w-xs animate-in slide-in-from-bottom-4 duration-300">
                                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                                            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">Extracted Specifications</span>
                                            <span className="bg-success/10 text-success text-[10px] px-1.5 py-0.5 rounded font-bold">{extractedItems.length} Found</span>
                                        </div>
                                        <div className="space-y-2 max-h-40 overflow-auto no-scrollbar">
                                            {extractedItems.map(item => (
                                                <div key={item.id} className="flex items-center justify-between text-xs p-1.5 bg-surface/50 rounded border border-white/5 group hover:border-accent-primary/30 transition-colors">
                                                    <span className="text-text-secondary truncate pr-2">{item.parameter}</span>
                                                    <span className="font-mono text-accent-primary shrink-0">{item.extractedValue}{item.unit !== '-' ? item.unit : ''}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <Button className="shadow-2xl border border-white/10 px-6 py-3 h-auto" onClick={() => setIsSelectingArea(false)}>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    <div className="text-left">
                                        <p className="text-[10px] font-bold uppercase leading-none mb-0.5">Confirm Region</p>
                                        <p className="text-[8px] font-medium opacity-70 leading-none">Create section with {extractedItems.length} items</p>
                                    </div>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} title="Section details" className="max-w-md">
                {selectedSection && (
                    <div className="space-y-6 pt-4">
                        {selectedSection.thumbnailUrl && (
                            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-border-subtle shadow-inner bg-surface">
                                <img
                                    src={selectedSection.thumbnailUrl}
                                    alt={selectedSection.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-4 p-4 bg-bg-secondary rounded-xl border border-border-subtle">
                            <div className="p-3 bg-accent-primary/10 rounded-lg">
                                <FileText className="h-6 w-6 text-accent-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary">{selectedSection.name}</h3>
                                <p className="text-xs text-text-tertiary">ID: {selectedSection.id}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-1">Status</p>
                                    <div className="text-sm font-medium flex items-center">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${selectedSection.status === 'complete' ? 'bg-success' : 'bg-warning'}`} />
                                        {selectedSection.status}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-1">Last Updated</p>
                                    <div className="text-sm font-medium">{new Date(selectedSection.updatedAt).toLocaleDateString()}</div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-1">Page Number</p>
                                    <div className="text-sm font-medium">{selectedSection.pageNumber || 'N/A'}</div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-1">Source</p>
                                    <div className="text-sm font-medium">{selectedSection.isManual ? 'Manual Selection' : 'Auto Extracted'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <Button
                                className="flex-1"
                                onClick={() => {
                                    setIsDetailsModalOpen(false);
                                    navigate(`/workbooks/${workbookId}/sections/${selectedSection.id}`);
                                }}
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Open Full Cockpit
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
