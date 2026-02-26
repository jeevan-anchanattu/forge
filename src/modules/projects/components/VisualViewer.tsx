import React, { useState, useRef, useCallback, Suspense } from 'react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useForgeStore } from '@/shared/store';
import {
    Box as BoxIcon, Image as ImageIcon, ImageOff, UploadCloud, FolderOpen,
    ChevronRight, ChevronDown, ZoomIn, ZoomOut, RotateCcw,
    Plus, Pencil, Trash2, Check, X, FolderPlus, Maximize2, Minimize2
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

// ── Error Boundary for 3D Canvas ─────────────────────────────────────────────
class ModelErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: string }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: any) {
        return { hasError: true, error: error?.message || 'Failed to load model' };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0f1d]">
                    <div className="p-6 text-center space-y-2">
                        <div className="text-error text-lg font-bold">Model Load Failed</div>
                        <p className="text-text-tertiary text-sm">{this.state.error}</p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="mt-4 px-4 py-1.5 text-xs bg-surface border border-border-subtle rounded text-text-secondary hover:text-text-primary transition-colors"
                        >Try Again</button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

// ── 3D Model Component ───────────────────────────────────────────────────────
const ModelScene = ({ url }: { url: string }) => {
    const { scene } = useGLTF(url);
    const ref = useRef<any>();

    useFrame(() => {
        if (ref.current) ref.current.rotation.y += 0.003;
    });

    return (
        <group ref={ref} scale={2}>
            <primitive object={scene.clone(true)} />
        </group>
    );
};

const ModelFallback = () => (
    <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#00E5FF" wireframe />
    </mesh>
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface FileEntry { id: string; name: string; url: string; type: 'model' | 'image'; }
interface FolderEntry { id: string; name: string; isOpen: boolean; files: FileEntry[]; }

// ── Main Component ────────────────────────────────────────────────────────────
export const VisualViewer: React.FC<{ project: any }> = ({ project }) => {
    const defaultModels: string[] = project.visualAssets?.models || [];
    const images: string[] = project.visualAssets?.images || [];
    const { org } = useForgeStore();
    const orgColor = (org as any)?.color || '#00E5FF';
    const initials = project.name ? project.name.substring(0, 2).toUpperCase() : 'PR';

    const [folders, setFolders] = useState<FolderEntry[]>([
        {
            id: 'f1', name: 'Design Approvals', isOpen: true,
            files: defaultModels.map((url, i) => ({
                id: `m${i}`, name: url.split('/').pop() || `Model_${i}.glb`, url, type: 'model' as const
            }))
        },
        {
            id: 'f2', name: 'Reference Images', isOpen: false,
            files: images.map((url, i) => ({
                id: `img${i}`, name: `Reference_${i}.png`, url, type: 'image' as const
            }))
        },
        { id: 'f3', name: 'Client Uploads', isOpen: true, files: [] }
    ]);

    const [activeFile, setActiveFile] = useState<FileEntry | null>(folders[0]?.files[0] || null);
    const [selectedFolderId, setSelectedFolderId] = useState<string>('f3');
    const [isUploading, setIsUploading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);
    const orbitRef = useRef<any>(null);

    const handleZoomIn = () => {
        if (orbitRef.current) {
            orbitRef.current.dollyIn(1.3);
            orbitRef.current.update();
            setZoomLevel(prev => Math.min(prev + 15, 400));
        }
    };
    const handleZoomOut = () => {
        if (orbitRef.current) {
            orbitRef.current.dollyOut(1.3);
            orbitRef.current.update();
            setZoomLevel(prev => Math.max(prev - 15, 10));
        }
    };
    const handleZoomReset = () => {
        if (orbitRef.current) {
            orbitRef.current.reset();
            setZoomLevel(100);
        }
    };

    // Rename / Add folder state
    const [renamingFolderId, setRenamingFolderId] = useState<string | null>(null);
    const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    const [addingFolder, setAddingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    // ── Dropzone ──────────────────────────────────────────────────────────────
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setIsUploading(true);
        setTimeout(() => {
            const newFiles: FileEntry[] = acceptedFiles.map((file, idx) => {
                const url = URL.createObjectURL(file);
                const ext = file.name.toLowerCase().split('.').pop() || '';
                const isModel = ['glb', 'gltf', 'obj', 'fbx', 'stl', 'step', 'stp'].includes(ext);
                return { id: `new_${Date.now()}_${idx}`, name: file.name, url, type: isModel ? 'model' : 'image' };
            });
            const targetId = selectedFolderId;
            setFolders(prev => prev.map(f =>
                f.id === targetId ? { ...f, files: [...f.files, ...newFiles], isOpen: true } : f
            ));
            if (newFiles.length > 0) setActiveFile(newFiles[0]);
            setIsUploading(false);
        }, 800);
    }, [selectedFolderId]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    // ── Folder / File CRUD ────────────────────────────────────────────────────
    const addFolder = () => {
        if (!newFolderName.trim()) return;
        const id = `f_${Date.now()}`;
        setFolders(prev => [...prev, { id, name: newFolderName.trim(), isOpen: true, files: [] }]);
        setSelectedFolderId(id);
        setNewFolderName('');
        setAddingFolder(false);
    };

    const renameFolder = (id: string) => {
        if (!renameValue.trim()) return;
        setFolders(prev => prev.map(f => f.id === id ? { ...f, name: renameValue.trim() } : f));
        setRenamingFolderId(null);
    };

    const deleteFolder = (id: string) => {
        setFolders(prev => prev.filter(f => f.id !== id));
        if (selectedFolderId === id) setSelectedFolderId('f1');
        setActiveFile(prev => {
            const folder = folders.find(f => f.id === id);
            if (folder?.files.some(fi => fi.id === prev?.id)) return null;
            return prev;
        });
    };

    const renameFile = (folderId: string, fileId: string) => {
        if (!renameValue.trim()) return;
        setFolders(prev => prev.map(f => f.id === folderId
            ? { ...f, files: f.files.map(fi => fi.id === fileId ? { ...fi, name: renameValue.trim() } : fi) }
            : f
        ));
        setRenamingFileId(null);
    };

    const deleteFile = (folderId: string, fileId: string) => {
        setFolders(prev => prev.map(f =>
            f.id === folderId ? { ...f, files: f.files.filter(fi => fi.id !== fileId) } : f
        ));
        if (activeFile?.id === fileId) setActiveFile(null);
    };

    const toggleFolder = (id: string) => {
        setFolders(prev => prev.map(f => f.id === id ? { ...f, isOpen: !f.isOpen } : f));
    };

    // ── Viewer render ─────────────────────────────────────────────────────────
    const renderViewer = () => {
        if (!activeFile) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-surface/30">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mb-4">
                        <rect width="120" height="120" rx="24" fill={orgColor} fillOpacity="0.1" />
                        <rect x="2" y="2" width="116" height="116" rx="22" stroke={orgColor} strokeOpacity="0.2" strokeWidth="4" strokeDasharray="8 8" />
                        <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill={orgColor} fontSize="36" fontFamily="monospace" fontWeight="bold">{initials}</text>
                    </svg>
                    <div className="flex items-center text-text-secondary">
                        <ImageOff className="h-4 w-4 mr-2 text-text-tertiary" />
                        <span className="text-sm">Select a file from the explorer or drag & drop</span>
                    </div>
                </div>
            );
        }

        if (activeFile.type === 'model') {
            return (
                <div className="w-full h-full relative bg-[#0a0f1d]">
                    {/* Model label */}
                    <div className="absolute top-4 left-4 z-10 flex items-center bg-bg-primary/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-border-subtle">
                        <BoxIcon className="h-4 w-4 text-accent-primary mr-2" />
                        <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">{activeFile.name}</span>
                    </div>
                    {/* Zoom controls */}
                    <div className="absolute bottom-4 right-4 z-10 flex flex-col items-center gap-1 bg-bg-primary/80 backdrop-blur-md border border-border-subtle rounded-lg overflow-hidden">
                        <button onClick={handleZoomIn} className="p-2 text-text-secondary hover:text-accent-primary hover:bg-surface transition-colors w-full flex justify-center" title="Zoom In – or use scroll wheel">
                            <ZoomIn className="h-4 w-4" />
                        </button>
                        <div className="h-px w-full bg-border-subtle" />
                        <button onClick={handleZoomReset} className="p-2 text-text-secondary hover:text-accent-primary hover:bg-surface transition-colors w-full flex justify-center" title="Reset View">
                            <RotateCcw className="h-3 w-3" />
                        </button>
                        <div className="h-px w-full bg-border-subtle" />
                        <button onClick={handleZoomOut} className="p-2 text-text-secondary hover:text-accent-primary hover:bg-surface transition-colors w-full flex justify-center" title="Zoom Out">
                            <ZoomOut className="h-4 w-4" />
                        </button>
                    </div>
                    {/* Top-right: fullscreen */}
                    <button
                        onClick={() => setIsFullscreen(f => !f)}
                        className="absolute top-4 right-4 z-10 p-2 bg-bg-primary/80 backdrop-blur-md border border-border-subtle rounded-md text-text-secondary hover:text-accent-primary transition-colors"
                        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    >
                        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </button>
                    {/* Bottom-left: zoom level */}
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                        <div className="bg-bg-primary/80 backdrop-blur-md px-3 py-1 rounded-md border border-border-subtle">
                            <span className="text-[10px] font-mono text-accent-primary font-bold">{zoomLevel}%</span>
                        </div>
                        <div className="bg-bg-primary/80 backdrop-blur-md px-3 py-1 rounded-md border border-border-subtle hidden sm:block">
                            <span className="text-[10px] font-mono text-text-tertiary">Scroll=Zoom · Drag=Rotate · RightDrag=Pan</span>
                        </div>
                    </div>
                    <ModelErrorBoundary key={activeFile.url}>
                        <div className="w-full h-full" onContextMenu={e => e.preventDefault()}>
                            <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
                                <color attach="background" args={['#0a0f1d']} />
                                <Suspense fallback={<ModelFallback />}>
                                    <Stage environment="city" intensity={0.5}>
                                        <ModelScene key={activeFile.url} url={activeFile.url} />
                                    </Stage>
                                </Suspense>
                                <OrbitControls
                                    ref={orbitRef}
                                    makeDefault
                                    enablePan={true}
                                    enableZoom={true}
                                    enableRotate={true}
                                    mouseButtons={{ LEFT: 0, MIDDLE: 1, RIGHT: 2 }}
                                />
                            </Canvas>
                        </div>
                    </ModelErrorBoundary>
                </div>
            );
        }

        return (
            <div className="w-full h-full relative bg-bg-card flex items-center justify-center p-8">
                <div className="absolute top-4 left-4 z-10 flex items-center bg-bg-primary/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-border-subtle">
                    <ImageIcon className="h-4 w-4 text-accent-primary mr-2" />
                    <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">{activeFile.name}</span>
                </div>
                <img src={activeFile.url} alt={activeFile.name} className="max-w-full max-h-full object-contain rounded-lg" />
            </div>
        );
    };

    return (
        <Card className={`flex flex-col overflow-hidden shadow-glow transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[200] rounded-none h-screen' : 'h-[720px]'}`}>
            {/* ── Header ────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface/50 shrink-0">
                <h3 className="text-lg font-display font-bold text-text-primary tracking-tight uppercase">Design & Visuals Vault</h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-text-tertiary">Upload to: <span className="text-accent-primary font-bold">{folders.find(f => f.id === selectedFolderId)?.name}</span></span>
                    <Button variant="secondary" size="sm" loading={isUploading} onClick={getRootProps().onClick}>
                        <UploadCloud className="h-4 w-4 mr-2 text-accent-primary" />
                        Upload
                    </Button>
                </div>
            </div>

            {/* ── Split Pane ─────────────────────────────────────────────────── */}
            <div {...getRootProps({ onClick: (e: any) => e.stopPropagation() })} className="flex flex-1 min-h-0 outline-none relative">
                <input {...getInputProps()} />

                {/* Drag overlay */}
                <AnimatePresence>
                    {isDragActive && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-2 border-dashed border-accent-primary flex flex-col items-center justify-center text-center p-12"
                        >
                            <div className="h-24 w-24 bg-accent-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <UploadCloud className="h-12 w-12 text-accent-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-text-primary mb-2">Drop Files Here</h2>
                            <p className="text-text-secondary max-w-sm text-sm">Supports .glb, .gltf, .obj, .fbx, .stl, .step and common image formats.</p>
                            <p className="text-accent-primary text-sm mt-3 font-bold">→ {folders.find(f => f.id === selectedFolderId)?.name}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── File Explorer Sidebar ────────────────────────────────────── */}
                <div className="w-64 border-r border-border-subtle bg-surface/20 overflow-y-auto flex flex-col shrink-0">
                    {/* Explorer header */}
                    <div className="flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-widest text-text-tertiary border-b border-border-subtle bg-surface/40">
                        <span>Project Files</span>
                        <button onClick={() => { setAddingFolder(true); setNewFolderName(''); }}
                            className="p-1 text-text-tertiary hover:text-accent-primary hover:bg-surface rounded transition-colors" title="Add Folder">
                            <FolderPlus className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    {/* New folder input */}
                    <AnimatePresence>
                        {addingFolder && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                className="px-3 py-2 border-b border-border-subtle flex gap-1 overflow-hidden bg-surface/50"
                            >
                                <input
                                    autoFocus
                                    value={newFolderName}
                                    onChange={e => setNewFolderName(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter') addFolder(); if (e.key === 'Escape') setAddingFolder(false); }}
                                    placeholder="Folder name..."
                                    className="flex-1 bg-bg-primary border border-border-subtle rounded px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-primary"
                                />
                                <button onClick={addFolder} className="p-1 text-success hover:bg-success/10 rounded transition-colors"><Check className="h-3.5 w-3.5" /></button>
                                <button onClick={() => setAddingFolder(false)} className="p-1 text-text-tertiary hover:bg-surface rounded transition-colors"><X className="h-3.5 w-3.5" /></button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="p-2 space-y-0.5 flex-1">
                        {folders.map(folder => (
                            <div key={folder.id}>
                                {/* Folder Row */}
                                {renamingFolderId === folder.id ? (
                                    <div className="flex gap-1 px-2 py-1">
                                        <input autoFocus value={renameValue} onChange={e => setRenameValue(e.target.value)}
                                            onKeyDown={e => { if (e.key === 'Enter') renameFolder(folder.id); if (e.key === 'Escape') setRenamingFolderId(null); }}
                                            className="flex-1 bg-bg-primary border border-accent-primary rounded px-2 py-0.5 text-xs text-text-primary outline-none" />
                                        <button onClick={() => renameFolder(folder.id)} className="p-1 text-success rounded hover:bg-success/10 transition-colors"><Check className="h-3 w-3" /></button>
                                        <button onClick={() => setRenamingFolderId(null)} className="p-1 text-text-tertiary rounded hover:bg-surface transition-colors"><X className="h-3 w-3" /></button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => { toggleFolder(folder.id); setSelectedFolderId(folder.id); }}
                                        className={`group flex items-center px-2 py-1.5 text-sm rounded-md cursor-pointer transition-colors ${selectedFolderId === folder.id ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface'}`}
                                    >
                                        {folder.isOpen ? <ChevronDown className="h-4 w-4 mr-1 shrink-0 opacity-70" /> : <ChevronRight className="h-4 w-4 mr-1 shrink-0 opacity-70" />}
                                        <FolderOpen className="h-4 w-4 mr-2 shrink-0 text-amber-400/80" />
                                        <span className="font-medium truncate flex-1">{folder.name}</span>
                                        <span className="text-xs opacity-60 mr-1">{folder.files.length}</span>
                                        {/* Folder action icons — shown on hover */}
                                        <div className="hidden group-hover:flex items-center gap-0.5 ml-1" onClick={e => e.stopPropagation()}>
                                            <button onClick={() => { setRenamingFolderId(folder.id); setRenameValue(folder.name); }}
                                                className="p-0.5 text-text-tertiary hover:text-text-primary rounded transition-colors"><Pencil className="h-3 w-3" /></button>
                                            <button onClick={() => deleteFolder(folder.id)}
                                                className="p-0.5 text-text-tertiary hover:text-error rounded transition-colors"><Trash2 className="h-3 w-3" /></button>
                                        </div>
                                    </div>
                                )}

                                {/* Files inside folder */}
                                <AnimatePresence>
                                    {folder.isOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <div className="pl-5 pr-1 space-y-0.5 py-0.5">
                                                {folder.files.length === 0 && (
                                                    <p className="px-2 py-1.5 text-[11px] text-text-tertiary italic">Drop files here to upload</p>
                                                )}
                                                {folder.files.map(file => (
                                                    renamingFileId === file.id ? (
                                                        <div key={file.id} className="flex gap-1 px-2 py-1">
                                                            <input autoFocus value={renameValue} onChange={e => setRenameValue(e.target.value)}
                                                                onKeyDown={e => { if (e.key === 'Enter') renameFile(folder.id, file.id); if (e.key === 'Escape') setRenamingFileId(null); }}
                                                                className="flex-1 bg-bg-primary border border-accent-primary rounded px-2 py-0.5 text-xs text-text-primary outline-none" />
                                                            <button onClick={() => renameFile(folder.id, file.id)} className="p-1 text-success rounded hover:bg-success/10 transition-colors"><Check className="h-3 w-3" /></button>
                                                            <button onClick={() => setRenamingFileId(null)} className="p-1 text-text-tertiary rounded transition-colors"><X className="h-3 w-3" /></button>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            key={file.id}
                                                            onClick={() => setActiveFile(file)}
                                                            className={`group flex items-center px-2 py-1.5 text-xs rounded-md cursor-pointer transition-colors ${activeFile?.id === file.id ? 'bg-accent-primary/15 text-accent-primary font-bold' : 'text-text-tertiary hover:text-text-secondary hover:bg-surface'}`}
                                                        >
                                                            {file.type === 'model' ? <BoxIcon className="h-3 w-3 mr-2 shrink-0 opacity-70" /> : <ImageIcon className="h-3 w-3 mr-2 shrink-0 opacity-70" />}
                                                            <span className="truncate flex-1">{file.name}</span>
                                                            <div className="hidden group-hover:flex items-center gap-0.5 ml-1" onClick={e => e.stopPropagation()}>
                                                                <button onClick={() => { setRenamingFileId(file.id); setRenameValue(file.name); }}
                                                                    className="p-0.5 text-text-tertiary hover:text-text-primary rounded transition-colors"><Pencil className="h-3 w-3" /></button>
                                                                <button onClick={() => deleteFile(folder.id, file.id)}
                                                                    className="p-0.5 text-text-tertiary hover:text-error rounded transition-colors"><Trash2 className="h-3 w-3" /></button>
                                                            </div>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 3D / Image Viewer ────────────────────────────────────────── */}
                <div className="flex-1 relative bg-bg-card overflow-hidden">
                    {renderViewer()}
                </div>
            </div>
        </Card>
    );
};
