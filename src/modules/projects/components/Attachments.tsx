import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/shared/components/Card';
import { UploadCloud, FileText, Image as ImageIcon, Archive, FileIcon, X } from 'lucide-react';

// Image thumbnail that gracefully falls back to a file-type icon if the URL fails to load
const SafeThumbnail: React.FC<{ file: { thumbnailUrl?: string; name: string; type: string } }> = ({ file }) => {
    const [errored, setErrored] = useState(false);

    if (!file.thumbnailUrl || errored) {
        // Fallback icon based on mime type
        if (file.type.includes('pdf')) return <FileText className="h-8 w-8 text-error/80" />;
        if (file.type.includes('image')) return <ImageIcon className="h-8 w-8 text-accent-primary" />;
        if (file.type.includes('zip') || file.type.includes('rar')) return <Archive className="h-8 w-8 text-warning" />;
        return <FileIcon className="h-8 w-8 text-text-tertiary" />;
    }

    return (
        <img
            src={file.thumbnailUrl}
            alt={file.name}
            className="h-full w-full object-cover"
            onError={() => setErrored(true)}
        />
    );
};

const CATEGORIES = [
    'Client Documents', 'Internal', 'Photos', 'Certificates', 'Correspondence', 'Reference'
];

interface Attachment {
    id: string;
    name: string;
    category: string;
    size: number;
    type: string;
    version: number;
    uploadedAt: string;
    thumbnailUrl?: string; // Only for images or PDFs
}

// Initial mock data
const INITIAL_FILES: Attachment[] = [
    { id: 'att_1', name: 'Structural_Specs_vFinal.pdf', category: 'Client Documents', size: 2450000, type: 'application/pdf', version: 3, uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 'att_2', name: 'site_survey_photo.jpg', category: 'Photos', size: 4500000, type: 'image/jpeg', version: 1, uploadedAt: new Date(Date.now() - 86400000).toISOString(), thumbnailUrl: 'https://images.unsplash.com/photo-1541888087898-da6728dd30eb?w=150&h=150&fit=crop' },
    { id: 'att_3', name: 'Material_Cert_A36.pdf', category: 'Certificates', size: 1200000, type: 'application/pdf', version: 1, uploadedAt: Date.now().toString() }
];

export const Attachments: React.FC<{ project: any }> = ({ project }) => {
    const [files, setFiles] = useState<Attachment[]>(INITIAL_FILES);
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const onDrop = (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file, i) => {
            const isImage = file.type.startsWith('image/');

            // Check for existing identically named file for version increment
            const existing = files.find(f => f.name === file.name);
            const newVersion = existing ? existing.version + 1 : 1;

            return {
                id: `att_new_${Date.now()}_${i}`,
                name: file.name,
                category: activeCategory === 'All' ? 'Reference' : activeCategory,
                size: file.size,
                type: file.type,
                version: newVersion,
                uploadedAt: new Date().toISOString(),
                thumbnailUrl: isImage ? URL.createObjectURL(file) : undefined
            };
        });

        setFiles(prev => [...newFiles, ...prev.filter(p => !newFiles.find(n => n.name === p.name))]); // Replace older versions in array
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    };

    const getIconForType = (type: string) => {
        if (type.includes('pdf')) return <FileText className="h-8 w-8 text-error/80" />;
        if (type.includes('image')) return <ImageIcon className="h-8 w-8 text-accent-primary" />;
        if (type.includes('zip') || type.includes('rar')) return <Archive className="h-8 w-8 text-warning" />;
        return <FileIcon className="h-8 w-8 text-text-tertiary" />;
    };

    const filteredFiles = activeCategory === 'All' ? files : files.filter(f => f.category === activeCategory);

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div {...getRootProps()} className={`
                    border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-200
                    ${isDragActive ? 'border-accent-primary bg-accent-primary/10' : 'border-border-subtle bg-surface/30 hover:bg-surface hover:border-accent-primary/50'}
                `}>
                    <input {...getInputProps()} />
                    <UploadCloud className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? 'text-accent-primary drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]' : 'text-text-tertiary'}`} />
                    <p className="text-lg font-bold text-text-primary mb-1">Drag & Drop files here</p>
                    <p className="text-sm text-text-secondary">Or click to select from your directory. Automatic version tracking.</p>
                </div>
            </Card>

            <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                <button
                    onClick={() => setActiveCategory('All')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activeCategory === 'All' ? 'bg-accent-primary text-bg-primary' : 'bg-surface text-text-secondary hover:text-text-primary'}`}
                >
                    All Files
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-accent-primary text-bg-primary' : 'bg-surface text-text-secondary hover:text-text-primary'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFiles.map(file => (
                    <Card key={file.id} className="p-4 flex flex-col group hover:border-accent-primary/40 transition-colors">
                        <div className="flex justify-between items-start mb-4 relative">
                            <div className="h-14 w-14 rounded-lg bg-surface flex items-center justify-center overflow-hidden border border-border-subtle group-hover:border-accent-primary/20 transition-colors">
                                <SafeThumbnail file={file} />
                            </div>
                            <button className="text-text-tertiary hover:text-error transition-colors p-1" onClick={() => setFiles(files.filter(f => f.id !== file.id))}>
                                <X className="h-4 w-4" />
                            </button>

                            <span className="absolute -top-2 -left-2 bg-bg-card border border-border-subtle text-[9px] font-bold text-accent-primary px-1.5 py-0.5 rounded shadow-sm">
                                V{file.version}
                            </span>
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-end space-y-1">
                            <h4 className="text-sm font-bold text-text-primary truncate" title={file.name}>{file.name}</h4>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] uppercase font-mono tracking-tighter text-text-tertiary shrink-0 px-1.5 py-0.5 bg-surface rounded">
                                    {file.category}
                                </span>
                                <span className="text-xs text-text-secondary">{formatSize(file.size)}</span>
                            </div>
                        </div>
                    </Card>
                ))}

                {filteredFiles.length === 0 && (
                    <div className="col-span-full py-12 text-center text-text-tertiary">
                        No files uploaded in this category yet.
                    </div>
                )}
            </div>
        </div>
    );
};
