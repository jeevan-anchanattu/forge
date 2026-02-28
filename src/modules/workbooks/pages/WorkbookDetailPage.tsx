import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/shared/api';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { ArrowLeft } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import { PdfViewer } from '@/shared/components/PdfViewer';
import {
    Trash2, Download, Eye, FileText, Upload, CheckCircle2, Clock, User,
    Info,
    RotateCw,
    Search,
    Plus
} from 'lucide-react';
import { SectionManagement } from '../components/SectionManagement';

export const WorkbookDetailPage: React.FC = () => {
    const { workbookId } = useParams<{ workbookId: string }>();
    const navigate = useNavigate();
    const [workbook, setWorkbook] = useState<any>(null);
    const [revisions, setRevisions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    const fetchWorkbook = async () => {
        if (!workbookId) return;
        try {
            setLoading(true);
            const res = await api.get(`workbooks/${workbookId}`);
            const wb = res.data.data;
            setWorkbook(wb);
            if (wb.pdfUrl && !pdfInfo) {
                setPdfInfo({
                    name: "Existing Document",
                    size: 0,
                    uploadedAt: wb.updatedAt || new Date().toISOString(),
                    uploadedBy: 'System',
                    url: wb.pdfUrl,
                });
            }
        } catch (err) {
            console.error('failed to load workbook', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRevisions = async () => {
        if (!workbookId) return;
        try {
            const res = await api.get(`workbooks/${workbookId}/revisions`);
            setRevisions(res.data.data || []);
        } catch (err) {
            console.error('failed to load revisions', err);
        }
    };

    const [uploadJob, setUploadJob] = useState<{ id: string, status: string } | null>(null);
    const [previewSections, setPreviewSections] = useState<any[] | null>(null);

    const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
    const [pdfInfo, setPdfInfo] = useState<{
        name: string;
        size: number;
        uploadedAt: string;
        uploadedBy: string;
        url: string;
    } | null>(null);
    const [pdfModalOpen, setPdfModalOpen] = useState(false);

    const startParse = async () => {
        if (!workbookId || !selectedPdf) return;
        try {
            const res = await api.post(`workbooks/${workbookId}/upload/confirm`);
            const job_id = res.data.data.job_id;
            setUploadJob({ id: job_id, status: 'queued' });
            // record pdf info locally
            const url = URL.createObjectURL(selectedPdf);
            setPdfInfo({
                name: selectedPdf.name,
                size: selectedPdf.size,
                uploadedAt: new Date().toISOString(),
                uploadedBy: 'You',
                url,
            });
            // Persist the URL to the workbook record
            await api.put(`workbooks/${workbookId}`, { pdfUrl: url });
            // poll the job until complete
            const interval = setInterval(async () => {
                const r2 = await api.get(`jobs/${job_id}`);
                const stat = r2.data.data.status;
                setUploadJob(prev => prev ? { ...prev, status: stat } : null);
                if (stat === 'complete') {
                    clearInterval(interval);
                    const prevRes = await api.get(`workbooks/${workbookId}/parse/preview`);
                    setPreviewSections(prevRes.data.data || []);
                }
            }, 1000);
        } catch (err) {
            console.error('parse start failed', err);
        }
    };

    const confirmSections = async () => {
        if (!workbookId) return;
        try {
            await api.post(`workbooks/${workbookId}/parse/confirm`);
            // once confirmed, clear preview and refresh workbook/sections count
            setPreviewSections(null);
            fetchWorkbook();
            fetchSections();
        } catch (err) {
            console.error('confirm failed', err);
        }
    };

    const [sectionsList, setSectionsList] = useState<any[]>([]);
    const [isNamingModalOpen, setIsNamingModalOpen] = useState(false);
    const [pendingBounds, setPendingBounds] = useState<any>(null);
    const [pendingScale, setPendingScale] = useState<number>(1);
    const [pendingThumbnail, setPendingThumbnail] = useState<string>('');
    const [pendingSectionName, setPendingSectionName] = useState('');
    const [isCreatingDirect, setIsCreatingDirect] = useState(false);

    const handleDirectSectionCreate = async () => {
        if (!pendingSectionName.trim() || !workbookId) return;
        try {
            setIsCreatingDirect(true);
            // Simulate extraction
            const mockItems = [
                { id: `direct_${Date.now()}_1`, parameter: 'Extraction', extractedValue: 'New Value', unit: 'mm', confidence: 'high', boundsJson: pendingBounds },
            ];
            await api.post(`workbooks/${workbookId}/sections`, {
                name: pendingSectionName,
                isManual: true,
                boundsJson: pendingBounds,
                sourceScale: pendingScale,
                thumbnailUrl: pendingThumbnail,
                specItems: mockItems,
                status: 'complete'
            });
            setIsNamingModalOpen(false);
            setPendingSectionName('');
            setPendingBounds(null);
            fetchSections();
        } catch (err) {
            console.error('failed to create direct section', err);
        } finally {
            setIsCreatingDirect(false);
        }
    };

    const fetchSections = async () => {
        if (!workbookId) return;
        try {
            const res = await api.get(`workbooks/${workbookId}/sections`);
            setSectionsList(res.data.data || []);
        } catch (err) {
            console.error('failed to load sections', err);
        }
    };

    useEffect(() => {
        fetchWorkbook();
        fetchRevisions();
        fetchSections();
    }, [workbookId]);

    if (loading) {
        return <div className="p-8 text-center text-text-tertiary animate-pulse">Loading workbook...</div>;
    }

    if (!workbook) {
        return <div className="p-8 text-center text-error">Workbook not found</div>;
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => {
                        if (workbook?.projectId) {
                            navigate(`/projects/${workbook.projectId}/workbooks`);
                        } else {
                            navigate(-1);
                        }
                    }}
                    className="p-2 text-text-secondary hover:text-accent-primary hover:bg-surface rounded-lg transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-3xl font-display font-bold text-text-primary tracking-tight">{workbook.name}</h1>
                <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-error hover:bg-error/10"
                    onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this workbook?')) {
                            try {
                                await api.delete(`workbooks/${workbookId}`);
                                navigate(`/projects/${workbook.projectId}/workbooks`);
                            } catch (err) {
                                console.error('failed to delete workbook', err);
                            }
                        }
                    }}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Workbook
                </Button>
            </div>

            <Card className="p-4 flex items-center justify-between bg-bg-card/50 backdrop-blur-sm border-border-subtle shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="px-3 py-1 bg-surface rounded-lg border border-border-subtle">
                        <span className="text-[10px] text-text-tertiary uppercase tracking-widest block leading-none mb-1">Workbook ID</span>
                        <span className="font-mono text-sm text-text-primary">{workbook.id}</span>
                    </div>
                    <div className="h-8 w-px bg-border-subtle" />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-tertiary uppercase tracking-widest leading-none mb-1">Status</span>
                        <span className="text-[10px] uppercase tracking-widest bg-success/10 text-success px-2 py-0.5 rounded border border-success/20 w-fit font-bold">{workbook.status}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs text-text-tertiary font-medium">Revision:</span>
                    <select
                        className="bg-surface border border-border-subtle rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-1 ring-accent-primary outline-none transition-all hover:border-text-tertiary"
                        value={workbook.activeRevisionId || ''}
                        onChange={(e) => {
                            const newRevId = e.target.value;
                            setWorkbook({ ...workbook, activeRevisionId: newRevId });
                            // In a real app, this would trigger a re-fetch of sections for that revision
                        }}
                    >
                        {revisions.map(r => (
                            <option key={r.id} value={r.id}>
                                {r.revisionNumber} {r.isActive ? '●' : ''} — {r.label}
                            </option>
                        ))}
                    </select>
                </div>
            </Card>

            {/* tab nav */}
            <div className="border-b border-border-subtle flex overflow-x-auto no-scrollbar">
                {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'sections', label: 'Sections' },
                    { id: 'bom', label: 'BOM' },
                    { id: 'specs', label: 'Specs' },
                    { id: 'schedule', label: 'Schedule' },
                    { id: 'quotation', label: 'Quotation' },
                    { id: 'outputs', label: 'Outputs' },
                    { id: 'revisions', label: 'Revisions' },
                    { id: 'attachments', label: 'Attachments' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 text-sm font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-colors duration-200 ${activeTab === tab.id
                            ? 'border-accent-primary text-accent-primary'
                            : 'border-transparent text-text-tertiary hover:text-text-secondary hover:border-border-subtle'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* File Status Card */}
                            <Card className="p-6 border-l-4 border-l-accent-primary bg-accent-primary/5">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-accent-primary/10 rounded-xl">
                                            <FileText className="h-6 w-6 text-accent-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-text-primary">Source Document</h3>
                                            <p className="text-sm text-text-tertiary">
                                                {pdfInfo ? 'PDF uploaded and ready for analysis' : 'No document uploaded yet'}
                                            </p>
                                        </div>
                                    </div>
                                    {!pdfInfo && (
                                        <label className="flex items-center px-4 py-2 bg-accent-primary text-white rounded-lg cursor-pointer hover:bg-accent-secondary transition-colors">
                                            <Upload className="h-4 w-4 mr-2" />
                                            <span>Upload PDF</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="application/pdf"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    setSelectedPdf(file || null);
                                                }}
                                            />
                                        </label>
                                    )}
                                </div>

                                {selectedPdf && !pdfInfo && (
                                    <div className="mt-4 flex items-center justify-between p-3 bg-surface rounded-lg border border-border-subtle">
                                        <div className="flex items-center space-x-2">
                                            <FileText className="h-4 w-4 text-text-secondary" />
                                            <span className="text-sm font-medium">{selectedPdf.name}</span>
                                            <span className="text-xs text-text-tertiary">({(selectedPdf.size / 1024 / 1024).toFixed(2)} MB)</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button size="sm" variant="ghost" onClick={() => setSelectedPdf(null)}>Cancel</Button>
                                            <Button size="sm" onClick={startParse}>Parse Document</Button>
                                        </div>
                                    </div>
                                )}
                            </Card>

                            {/* Parsing Progress / Preview */}
                            {(uploadJob || previewSections) && (
                                <Card className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold flex items-center">
                                            <Clock className="h-4 w-4 mr-2 text-accent-primary" />
                                            Analysis Status
                                        </h3>
                                        <span className={`text-xs uppercase tracking-widest px-2 py-0.5 rounded ${uploadJob?.status === 'complete' ? 'bg-success/10 text-success' : 'bg-accent-primary/10 text-accent-primary animate-pulse'
                                            }`}>
                                            {uploadJob?.status || 'Processing'}
                                        </span>
                                    </div>

                                    {uploadJob?.status === 'complete' && previewSections && (
                                        <div className="space-y-4">
                                            <div className="p-4 bg-bg-secondary rounded-lg border border-border-subtle">
                                                <p className="text-sm font-medium mb-3">Extracted {previewSections.length} sections:</p>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {previewSections.slice(0, 6).map(s => (
                                                        <div key={s.id} className="flex items-center text-xs text-text-secondary px-2 py-1 bg-surface rounded">
                                                            <CheckCircle2 className="h-3 w-3 mr-1 text-success" />
                                                            {s.name || s.id}
                                                        </div>
                                                    ))}
                                                    {previewSections.length > 6 && (
                                                        <div className="text-xs text-text-tertiary px-2 py-1 italic">
                                                            + {previewSections.length - 6} more...
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <Button className="w-full" onClick={confirmSections}>Confirm & Import Sections</Button>
                                        </div>
                                    )}
                                </Card>
                            )}

                            {/* Main Content Area / Empty State */}
                            {!pdfInfo && !uploadJob && (
                                <div className="p-12 border-2 border-dashed border-border-subtle rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="p-4 bg-surface rounded-full">
                                        <Upload className="h-8 w-8 text-text-tertiary" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium text-text-primary">No Document Uploaded</h4>
                                        <p className="text-sm text-text-tertiary max-w-sm">
                                            Upload your mechanical drawings or project specifications to start the AI-powered extraction process.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            {/* File Details Sidebar */}
                            {pdfInfo && (
                                <Card className="p-6 space-y-6 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-4">
                                        <button
                                            onClick={() => {
                                                if (window.confirm('Remove this document reference? Sections will remain.')) {
                                                    setPdfInfo(null);
                                                    setSelectedPdf(null);
                                                    setUploadJob(null);
                                                    setPreviewSections(null);
                                                }
                                            }}
                                            className="p-2 text-text-tertiary hover:text-error transition-colors"
                                            title="Delete file"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-bold text-text-primary truncate pr-8" title={pdfInfo.name}>{pdfInfo.name}</h3>
                                        <p className="text-xs text-text-tertiary uppercase tracking-wider">Document Details</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center text-sm">
                                            <User className="h-4 w-4 mr-3 text-text-tertiary" />
                                            <div>
                                                <p className="text-xs text-text-tertiary">Uploaded by</p>
                                                <p className="font-medium">{pdfInfo.uploadedBy}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Clock className="h-4 w-4 mr-3 text-text-tertiary" />
                                            <div>
                                                <p className="text-xs text-text-tertiary">Last modified</p>
                                                <p className="font-medium">{new Date(pdfInfo.uploadedAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <FileText className="h-4 w-4 mr-3 text-text-tertiary" />
                                            <div>
                                                <p className="text-xs text-text-tertiary">File Size</p>
                                                <p className="font-medium">{(pdfInfo.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex flex-col gap-2">
                                        <Button className="w-full" onClick={() => setPdfModalOpen(true)}>
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Document
                                        </Button>
                                        <a
                                            href={pdfInfo.url}
                                            download={pdfInfo.name}
                                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-text-primary bg-surface border border-border-subtle rounded-lg hover:bg-bg-secondary transition-colors"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Download Original
                                        </a>
                                    </div>

                                    <Modal isOpen={pdfModalOpen} onClose={() => setPdfModalOpen(false)} title={pdfInfo.name} className="max-w-5xl h-full">
                                        <div className="flex flex-col h-full overflow-hidden">
                                            <div className="mb-1 p-3 bg-accent-primary/5 border-b border-border-subtle flex justify-between items-center">
                                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest flex items-center">
                                                    <Info className="h-3.5 w-3.5 mr-2 text-accent-primary" />
                                                    Drag to select a regional section for extraction
                                                </p>
                                            </div>
                                            <div className="flex-1 overflow-hidden relative">
                                                <PdfViewer
                                                    fileUrl={pdfInfo.url}
                                                    className="h-full"
                                                    initialDragMode="select"
                                                    onManualSection={(bounds, context) => {
                                                        setPendingBounds(bounds);
                                                        setPendingScale(context.scale);
                                                        setPendingThumbnail(context.thumbnail);
                                                        setIsNamingModalOpen(true);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Modal>

                                    {/* Naming Modal */}
                                    <Modal isOpen={isNamingModalOpen} onClose={() => setIsNamingModalOpen(false)} title="Create New Section" className="max-w-md" zIndex={99999} useFullscreenPortal>
                                        <div className="space-y-6 pt-4">
                                            <div className="p-4 bg-bg-secondary rounded-xl border border-border-subtle flex items-center gap-4">
                                                <div className="p-3 bg-accent-primary/10 rounded-lg">
                                                    <Search className="h-6 w-6 text-accent-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-tighter">Selected Area Captured</span>
                                                    <p className="text-xs text-text-secondary font-mono">Region: {pendingBounds?.x?.toFixed(0)}, {pendingBounds?.y?.toFixed(0)}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-text-tertiary uppercase tracking-widest">Section Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-surface border border-border-subtle rounded-lg px-4 py-2.5 text-sm focus:ring-1 ring-accent-primary outline-none transition-all"
                                                    placeholder="e.g. Inlet Assembly Notes"
                                                    value={pendingSectionName}
                                                    onChange={(e) => setPendingSectionName(e.target.value)}
                                                    autoFocus
                                                />
                                            </div>

                                            <div className="pt-4 flex gap-3">
                                                <Button variant="ghost" className="flex-1" onClick={() => setIsNamingModalOpen(false)}>Cancel</Button>
                                                <Button className="flex-1" onClick={handleDirectSectionCreate} disabled={!pendingSectionName.trim() || isCreatingDirect}>
                                                    {isCreatingDirect ? <RotateCw className="h-4 w-4 animate-spin" /> : 'Create Section'}
                                                </Button>
                                            </div>
                                        </div>
                                    </Modal>
                                </Card>
                            )}

                            <Card className="p-6">
                                <h3 className="font-bold mb-4">Workbook Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-secondary">Completion</span>
                                        <span className="font-mono text-accent-primary">{workbook.completionPct}%</span>
                                    </div>
                                    <div className="w-full bg-surface rounded-full h-1.5">
                                        <div className="bg-accent-primary h-1.5 rounded-full" style={{ width: `${workbook.completionPct}%` }} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="text-center p-3 bg-surface rounded-xl border border-border-subtle">
                                            <p className="text-2xl font-bold">{sectionsList.length}</p>
                                            <p className="text-[10px] uppercase text-text-tertiary tracking-tighter">Sections</p>
                                        </div>
                                        <div className="text-center p-3 bg-surface rounded-xl border border-border-subtle">
                                            <p className="text-2xl font-bold">{workbook.openCommentsCount || 0}</p>
                                            <p className="text-[10px] uppercase text-text-tertiary tracking-tighter">Comments</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
                {activeTab === 'sections' && (
                    <SectionManagement
                        workbookId={workbookId!}
                        sections={sectionsList}
                        pdfUrl={pdfInfo?.url}
                        onRefresh={fetchSections}
                    />
                )}
                {activeTab !== 'overview' && activeTab !== 'sections' && (
                    <div className="flex flex-col items-center justify-center p-20 text-center space-y-4 bg-bg-card/30 rounded-2xl border border-dashed border-border-subtle">
                        <div className="p-4 bg-surface rounded-full text-text-tertiary">
                            <Clock className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-text-primary capitalize">{activeTab} View coming soon</h3>
                            <p className="text-sm text-text-tertiary max-w-xs mx-auto">
                                This tab is part of the Phase 4 roadmap. You can currently manage sections and document analysis in the dedicated tabs.
                            </p>
                        </div>
                        <Button variant="ghost" onClick={() => setActiveTab('overview')}>Back to Overview</Button>
                    </div>
                )}
            </div>
        </div>
    );
};