import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { useForgeStore } from '@/shared/store';
import {
    FolderOpen, FolderPlus, ChevronRight, ChevronDown,
    FileText, Image as ImageIcon, File as FileIcon, Archive,
    UploadCloud, Download, Trash2, Pencil, Check, X,
    Clock, User, History, Eye, Maximize2, AlertTriangle
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
const CATEGORIES = ['Client Documents', 'Internal', 'Photos', 'Certificates', 'Correspondence', 'Reference'] as const;
type Category = typeof CATEGORIES[number];

interface FileVersion {
    versionNumber: number;
    uploadedBy: string;
    uploadedAt: string;
    size: number;
    url: string;
    note?: string;
}

interface VaultFile {
    id: string;
    name: string;
    category: Category;
    mimeType: string;
    size: number;
    versions: FileVersion[];
    currentVersion: number;
    folderId: string;
}

interface VaultFolder {
    id: string;
    name: string;
    isOpen: boolean;
    files: VaultFile[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
};

const MOCK_USERS = ['John Davidson', 'Sarah Jenkins', 'Mike Ruiz'];

const makeVersion = (file: File, vNum: number): FileVersion => ({
    versionNumber: vNum,
    uploadedBy: MOCK_USERS[0],
    uploadedAt: new Date().toISOString(),
    size: file.size,
    url: URL.createObjectURL(file),
});

const INITIAL_FOLDERS: VaultFolder[] = [
    {
        id: 'folder_client', name: 'Client Documents', isOpen: true,
        files: [
            {
                id: 'f1', name: 'Structural_Specs_vFinal.pdf', category: 'Client Documents',
                mimeType: 'application/pdf', size: 2450000, folderId: 'folder_client', currentVersion: 3,
                versions: [
                    { versionNumber: 1, uploadedBy: 'Sarah Jenkins', uploadedAt: '2024-11-01T10:00:00Z', size: 2100000, url: '' },
                    { versionNumber: 2, uploadedBy: 'Mike Ruiz', uploadedAt: '2024-11-15T14:30:00Z', size: 2300000, url: '' },
                    { versionNumber: 3, uploadedBy: 'John Davidson', uploadedAt: '2024-12-01T09:00:00Z', size: 2450000, url: '' },
                ]
            }
        ]
    },
    {
        id: 'folder_certs', name: 'Certificates', isOpen: false,
        files: [
            {
                id: 'f2', name: 'Material_Cert_A36.pdf', category: 'Certificates',
                mimeType: 'application/pdf', size: 1200000, folderId: 'folder_certs', currentVersion: 1,
                versions: [{ versionNumber: 1, uploadedBy: 'John Davidson', uploadedAt: '2024-10-20T08:00:00Z', size: 1200000, url: '' }]
            }
        ]
    },
    { id: 'folder_photos', name: 'Photos', isOpen: false, files: [] },
    { id: 'folder_internal', name: 'Internal', isOpen: false, files: [] },
];

// ── File icon by mime type ─────────────────────────────────────────────────
const FileTypeIcon = ({ mimeType, size = 'md' }: { mimeType: string; size?: 'sm' | 'md' | 'lg' }) => {
    const cls = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6';
    if (mimeType.includes('pdf')) return <FileText className={`${cls} text-red-400`} />;
    if (mimeType.startsWith('image/')) return <ImageIcon className={`${cls} text-sky-400`} />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className={`${cls} text-yellow-400`} />;
    return <FileIcon className={`${cls} text-text-tertiary`} />;
};

// ── In-App File Preview Modal ──────────────────────────────────────────────
const PreviewModal = ({ file, version, onClose }: { file: VaultFile; version: FileVersion; onClose: () => void }) => {
    const canPreview = file.mimeType.startsWith('image/') || file.mimeType.includes('pdf');

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-card/80 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                    <FileTypeIcon mimeType={file.mimeType} size="sm" />
                    <div>
                        <p className="text-sm font-bold text-text-primary">{file.name}</p>
                        <p className="text-xs text-text-tertiary">v{version.versionNumber} · {formatSize(version.size)} · Uploaded by {version.uploadedBy}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {version.url && (
                        <a href={version.url} download={file.name}>
                            <Button variant="secondary" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
                        </a>
                    )}
                    <button onClick={onClose} className="p-2 text-text-tertiary hover:text-text-primary hover:bg-surface rounded-lg transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Preview area */}
            <div className="flex-1 flex items-center justify-center overflow-hidden p-6">
                {!canPreview && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <FileTypeIcon mimeType={file.mimeType} size="lg" />
                        <p className="text-text-secondary">No preview available for this file type.</p>
                        {version.url && (
                            <a href={version.url} download={file.name}>
                                <Button><Download className="h-4 w-4 mr-2" />Download to View</Button>
                            </a>
                        )}
                    </div>
                )}
                {canPreview && !version.url && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <AlertTriangle className="h-12 w-12 text-warning" />
                        <p className="text-text-secondary">This is mock data. Upload a real file to preview it.</p>
                    </div>
                )}
                {canPreview && version.url && file.mimeType.startsWith('image/') && (
                    <img src={version.url} alt={file.name} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                )}
                {canPreview && version.url && file.mimeType.includes('pdf') && (
                    <iframe src={version.url} title={file.name} className="w-full h-full rounded-lg border border-border-subtle" />
                )}
            </div>
        </motion.div>
    );
};

// ── Upload Dialog ─────────────────────────────────────────────────────────────
const UploadDialog = ({ folders, onConfirm, onCancel }: {
    folders: VaultFolder[];
    onConfirm: (files: File[], category: Category, folderId: string, note: string) => void;
    onCancel: () => void;
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [category, setCategory] = useState<Category>('Client Documents');
    const [folderId, setFolderId] = useState(folders[0]?.id || '');
    const [note, setNote] = useState('');

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (files) => setSelectedFiles(prev => [...prev, ...files])
    });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
        >
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                className="bg-bg-card border border-border-subtle rounded-xl w-full max-w-lg shadow-2xl overflow-hidden"
            >
                <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
                    <h2 className="text-lg font-display font-bold text-text-primary">Upload Files</h2>
                    <button onClick={onCancel} className="p-1 text-text-tertiary hover:text-text-primary"><X className="h-5 w-5" /></button>
                </div>

                <div className="p-6 space-y-5">
                    {/* Drop zone */}
                    <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-accent-primary bg-accent-primary/5' : 'border-border-subtle bg-surface/30 hover:border-accent-primary/50 hover:bg-surface'}`}>
                        <input {...getInputProps()} />
                        <UploadCloud className={`h-10 w-10 mx-auto mb-3 ${isDragActive ? 'text-accent-primary' : 'text-text-tertiary'}`} />
                        <p className="text-sm font-medium text-text-primary">Drop files here or click to browse</p>
                        {selectedFiles.length > 0 && (
                            <div className="mt-3 space-y-1">
                                {selectedFiles.map((f, i) => (
                                    <p key={i} className="text-xs text-accent-primary font-mono">{f.name} ({formatSize(f.size)})</p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Folder */}
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Upload to Folder</label>
                        <select value={folderId} onChange={e => setFolderId(e.target.value)}
                            className="w-full bg-surface border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-primary transition-colors"
                        >
                            {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                        </select>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">File Category</label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => setCategory(cat)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${category === cat ? 'bg-accent-primary text-bg-primary' : 'bg-surface text-text-secondary hover:text-text-primary border border-border-subtle'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Version note */}
                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Version Note <span className="text-text-tertiary normal-case tracking-normal font-normal">(optional)</span></label>
                        <input value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Updated spec after client review"
                            className="w-full bg-surface border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent-primary transition-colors"
                        />
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-border-subtle flex justify-end gap-3">
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => { if (selectedFiles.length) onConfirm(selectedFiles, category, folderId, note); else onCancel(); }}
                        disabled={selectedFiles.length === 0}>
                        <UploadCloud className="h-4 w-4 mr-2" />
                        Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ── File History Panel ────────────────────────────────────────────────────────
const HistoryPanel = ({ file, onClose, onPreviewVersion }: {
    file: VaultFile; onClose: () => void;
    onPreviewVersion: (v: FileVersion) => void;
}) => (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        className="absolute right-0 top-0 bottom-0 w-80 bg-bg-card border-l border-border-subtle flex flex-col z-20 shadow-2xl"
    >
        <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between bg-surface/50">
            <div>
                <p className="text-sm font-bold text-text-primary">File History</p>
                <p className="text-xs text-text-tertiary truncate max-w-[200px]">{file.name}</p>
            </div>
            <button onClick={onClose} className="p-1 text-text-tertiary hover:text-text-primary"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {[...file.versions].reverse().map((v) => (
                <div key={v.versionNumber} className={`p-3 rounded-lg border transition-colors ${v.versionNumber === file.currentVersion ? 'border-accent-primary bg-accent-primary/5' : 'border-border-subtle bg-surface/30'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${v.versionNumber === file.currentVersion ? 'bg-accent-primary text-bg-primary' : 'bg-surface text-text-secondary'}`}>
                            v{v.versionNumber} {v.versionNumber === file.currentVersion ? '· Current' : ''}
                        </span>
                        <span className="text-xs text-text-tertiary">{formatSize(v.size)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-tertiary mb-1">
                        <User className="h-3 w-3" /> {v.uploadedBy}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-tertiary mb-3">
                        <Clock className="h-3 w-3" /> {new Date(v.uploadedAt).toLocaleDateString()}
                    </div>
                    {v.url && (
                        <button onClick={() => onPreviewVersion(v)}
                            className="w-full text-xs py-1.5 rounded bg-surface border border-border-subtle text-text-secondary hover:text-text-primary hover:border-accent-primary/40 transition-colors flex items-center justify-center gap-1.5"
                        >
                            <Eye className="h-3 w-3" /> Preview this version
                        </button>
                    )}
                </div>
            ))}
        </div>
    </motion.div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export const DocumentVault: React.FC<{ project: any }> = ({ project }) => {
    const { user } = useForgeStore();
    const isAdmin = user?.orgRole === 'org_admin' || user?.orgRole === 'super_admin';
    const canDelete = isAdmin;
    const canDownload = true; // all roles

    const [folders, setFolders] = useState<VaultFolder[]>(INITIAL_FOLDERS);
    const [selectedFolderId, setSelectedFolderId] = useState<string>(INITIAL_FOLDERS[0].id);
    const [renamingFolderId, setRenamingFolderId] = useState<string | null>(null);
    const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    const [addingFolder, setAddingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [previewTarget, setPreviewTarget] = useState<{ file: VaultFile; version: FileVersion } | null>(null);
    const [historyFile, setHistoryFile] = useState<VaultFile | null>(null);

    const allFiles = folders.flatMap(f => f.files);
    const selectedFolder = folders.find(f => f.id === selectedFolderId);
    const displayFiles = selectedFolderId === '__all__' ? allFiles : (selectedFolder?.files || []);

    // ── Folder CRUD ───────────────────────────────────────────────────────────
    const addFolder = () => {
        if (!newFolderName.trim()) return;
        const id = `folder_${Date.now()}`;
        setFolders(prev => [...prev, { id, name: newFolderName.trim(), isOpen: true, files: [] }]);
        setSelectedFolderId(id);
        setAddingFolder(false);
        setNewFolderName('');
    };

    const renameFolder = (id: string) => {
        setFolders(prev => prev.map(f => f.id === id ? { ...f, name: renameValue.trim() } : f));
        setRenamingFolderId(null);
    };

    const deleteFolder = (id: string) => {
        setFolders(prev => prev.filter(f => f.id !== id));
        if (selectedFolderId === id) setSelectedFolderId(INITIAL_FOLDERS[0].id);
    };

    // ── File CRUD ─────────────────────────────────────────────────────────────
    const handleUpload = (files: File[], category: Category, folderId: string, note: string) => {
        setFolders(prev => prev.map(folder => {
            if (folder.id !== folderId) return folder;
            const updatedFiles = [...folder.files];
            files.forEach((file) => {
                const existing = updatedFiles.find(f => f.name === file.name);
                const newVersion = makeVersion(file, existing ? existing.currentVersion + 1 : 1);
                if (existing) {
                    const idx = updatedFiles.findIndex(f => f.name === file.name);
                    updatedFiles[idx] = {
                        ...existing,
                        currentVersion: newVersion.versionNumber,
                        size: file.size,
                        versions: [...existing.versions, { ...newVersion, note }],
                    };
                } else {
                    updatedFiles.push({
                        id: `file_${Date.now()}_${Math.random()}`,
                        name: file.name,
                        category,
                        mimeType: file.type || 'application/octet-stream',
                        size: file.size,
                        folderId,
                        currentVersion: 1,
                        versions: [{ ...newVersion, note }],
                    });
                }
            });
            return { ...folder, files: updatedFiles };
        }));
        setShowUpload(false);
    };

    const deleteFile = (folderId: string, fileId: string) => {
        setFolders(prev => prev.map(f =>
            f.id === folderId ? { ...f, files: f.files.filter(fi => fi.id !== fileId) } : f
        ));
        if (historyFile?.id === fileId) setHistoryFile(null);
    };

    const renameFile = (folderId: string, fileId: string) => {
        setFolders(prev => prev.map(f =>
            f.id === folderId ? { ...f, files: f.files.map(fi => fi.id === fileId ? { ...fi, name: renameValue.trim() } : fi) } : f
        ));
        setRenamingFileId(null);
    };

    const openPreview = (file: VaultFile) => {
        const current = file.versions.find(v => v.versionNumber === file.currentVersion);
        if (current) setPreviewTarget({ file, version: current });
    };

    return (
        <div className="flex h-[750px] bg-bg-card border border-border-subtle rounded-xl overflow-hidden shadow-glow relative">
            {/* ── Sidebar ───────────────────────────────────────────────────── */}
            <div className="w-60 border-r border-border-subtle bg-surface/20 flex flex-col shrink-0">
                <div className="flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-text-tertiary border-b border-border-subtle bg-surface/40">
                    <span>Folders</span>
                    <div className="flex items-center gap-1">
                        <button onClick={() => { setAddingFolder(true); setNewFolderName(''); }}
                            className="p-1 rounded text-text-tertiary hover:text-accent-primary hover:bg-surface transition-colors" title="New Folder">
                            <FolderPlus className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {addingFolder && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden px-3 py-2 border-b border-border-subtle bg-surface/50 flex gap-1"
                        >
                            <input autoFocus value={newFolderName} onChange={e => setNewFolderName(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') addFolder(); if (e.key === 'Escape') setAddingFolder(false); }}
                                placeholder="Folder name..."
                                className="flex-1 bg-bg-primary border border-border-subtle rounded px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-primary"
                            />
                            <button onClick={addFolder} className="p-1 text-success hover:bg-success/10 rounded"><Check className="h-3.5 w-3.5" /></button>
                            <button onClick={() => setAddingFolder(false)} className="p-1 text-text-tertiary hover:bg-surface rounded"><X className="h-3.5 w-3.5" /></button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="overflow-y-auto flex-1 p-2 space-y-0.5">
                    {/* All files shortcut */}
                    <button onClick={() => setSelectedFolderId('__all__')}
                        className={`w-full flex items-center px-2 py-1.5 text-xs rounded-md transition-colors ${selectedFolderId === '__all__' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}
                    >
                        <FileIcon className="h-3.5 w-3.5 mr-2 shrink-0" />
                        <span className="font-medium">All Files</span>
                        <span className="ml-auto text-[10px] text-text-tertiary">{allFiles.length}</span>
                    </button>

                    {folders.map(folder => (
                        <div key={folder.id}>
                            {renamingFolderId === folder.id ? (
                                <div className="flex gap-1 px-2 py-1">
                                    <input autoFocus value={renameValue} onChange={e => setRenameValue(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') renameFolder(folder.id); if (e.key === 'Escape') setRenamingFolderId(null); }}
                                        className="flex-1 bg-bg-primary border border-accent-primary rounded px-2 py-0.5 text-xs text-text-primary outline-none"
                                    />
                                    <button onClick={() => renameFolder(folder.id)} className="p-0.5 text-success rounded"><Check className="h-3 w-3" /></button>
                                    <button onClick={() => setRenamingFolderId(null)} className="p-0.5 text-text-tertiary rounded"><X className="h-3 w-3" /></button>
                                </div>
                            ) : (
                                <div onClick={() => setSelectedFolderId(folder.id)}
                                    className={`group flex items-center px-2 py-1.5 text-xs rounded-md cursor-pointer transition-colors ${selectedFolderId === folder.id ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}
                                >
                                    <FolderOpen className="h-3.5 w-3.5 mr-2 shrink-0 text-amber-400/80" />
                                    <span className="font-medium truncate flex-1">{folder.name}</span>
                                    <span className="text-[10px] text-text-tertiary mr-1">{folder.files.length}</span>
                                    {isAdmin && (
                                        <div className="hidden group-hover:flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
                                            <button onClick={() => { setRenamingFolderId(folder.id); setRenameValue(folder.name); }}
                                                className="p-0.5 text-text-tertiary hover:text-text-primary rounded transition-colors"><Pencil className="h-3 w-3" /></button>
                                            <button onClick={() => deleteFolder(folder.id)}
                                                className="p-0.5 text-text-tertiary hover:text-error rounded transition-colors"><Trash2 className="h-3 w-3" /></button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Main Area ─────────────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface/30 shrink-0">
                    <div>
                        <h3 className="text-sm font-bold text-text-primary">{selectedFolderId === '__all__' ? 'All Files' : (selectedFolder?.name || '')}</h3>
                        <p className="text-xs text-text-tertiary">{displayFiles.length} file{displayFiles.length !== 1 ? 's' : ''}</p>
                    </div>
                    <Button size="sm" onClick={() => setShowUpload(true)}>
                        <UploadCloud className="h-4 w-4 mr-2" />
                        Upload
                    </Button>
                </div>

                {/* File grid */}
                <div className="flex-1 overflow-y-auto p-4">
                    {displayFiles.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-text-tertiary">
                            <FolderOpen className="h-12 w-12 mb-3 opacity-30" />
                            <p className="text-sm">No files yet.</p>
                            <button onClick={() => setShowUpload(true)} className="mt-3 text-xs text-accent-primary hover:underline">Upload first file</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                            {displayFiles.map(file => (
                                <div key={file.id} className="group relative bg-surface/30 border border-border-subtle hover:border-accent-primary/40 rounded-xl p-3 flex flex-col gap-2 transition-colors cursor-pointer"
                                    onClick={() => openPreview(file)}>

                                    {/* Version badge */}
                                    <span className="absolute -top-1.5 -left-1.5 bg-bg-card border border-border-subtle text-[9px] font-bold text-accent-primary px-1.5 py-0.5 rounded shadow-sm z-10">
                                        v{file.currentVersion}
                                    </span>

                                    {/* File icon / thumbnail */}
                                    <div className="h-16 w-full rounded-lg bg-surface flex items-center justify-center overflow-hidden border border-border-subtle">
                                        {(() => {
                                            const current = file.versions.find(v => v.versionNumber === file.currentVersion);
                                            if (file.mimeType.startsWith('image/') && current?.url) {
                                                return <img src={current.url} alt={file.name} className="h-full w-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />;
                                            }
                                            return <FileTypeIcon mimeType={file.mimeType} size="md" />;
                                        })()}
                                    </div>

                                    {/* File name — renaming inline */}
                                    {renamingFileId === file.id ? (
                                        <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                                            <input autoFocus value={renameValue} onChange={e => setRenameValue(e.target.value)}
                                                onKeyDown={e => { if (e.key === 'Enter') renameFile(file.folderId, file.id); if (e.key === 'Escape') setRenamingFileId(null); }}
                                                className="flex-1 bg-bg-primary border border-accent-primary rounded px-1.5 py-0.5 text-[11px] text-text-primary outline-none"
                                            />
                                            <button onClick={() => renameFile(file.folderId, file.id)} className="p-0.5 text-success"><Check className="h-3 w-3" /></button>
                                        </div>
                                    ) : (
                                        <p className="text-xs font-medium text-text-primary truncate" title={file.name}>{file.name}</p>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-text-tertiary">{formatSize(file.size)}</span>
                                        <span className="text-[10px] text-text-tertiary bg-surface px-1.5 py-0.5 rounded">{file.category}</span>
                                    </div>

                                    {/* Action row (on hover) */}
                                    <div className="hidden group-hover:flex items-center gap-1 pt-1 border-t border-border-subtle" onClick={e => e.stopPropagation()}>
                                        <button onClick={() => setHistoryFile(file)}
                                            className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-text-tertiary hover:text-text-primary hover:bg-surface rounded transition-colors" title="Version history">
                                            <History className="h-3 w-3" />
                                        </button>
                                        {canDownload && (() => {
                                            const cur = file.versions.find(v => v.versionNumber === file.currentVersion);
                                            return cur?.url ? (
                                                <a href={cur.url} download={file.name}
                                                    className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-text-tertiary hover:text-accent-primary hover:bg-surface rounded transition-colors" title="Download">
                                                    <Download className="h-3 w-3" />
                                                </a>
                                            ) : null;
                                        })()}
                                        {isAdmin && (
                                            <button onClick={() => { setRenamingFileId(file.id); setRenameValue(file.name); }}
                                                className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-text-tertiary hover:text-text-primary hover:bg-surface rounded transition-colors" title="Rename">
                                                <Pencil className="h-3 w-3" />
                                            </button>
                                        )}
                                        {canDelete && (
                                            <button onClick={() => deleteFile(file.folderId, file.id)}
                                                className="flex-1 flex items-center justify-center gap-1 py-1 text-[10px] text-text-tertiary hover:text-error hover:bg-error/5 rounded transition-colors" title="Delete">
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* History Panel (slide-in from right) */}
                <AnimatePresence>
                    {historyFile && (
                        <HistoryPanel
                            file={historyFile}
                            onClose={() => setHistoryFile(null)}
                            onPreviewVersion={(v) => { setPreviewTarget({ file: historyFile, version: v }); }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* ── Modals ────────────────────────────────────────────────────── */}
            <AnimatePresence>
                {showUpload && (
                    <UploadDialog
                        folders={folders}
                        onConfirm={handleUpload}
                        onCancel={() => setShowUpload(false)}
                    />
                )}
                {previewTarget && (
                    <PreviewModal
                        file={previewTarget.file}
                        version={previewTarget.version}
                        onClose={() => setPreviewTarget(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
