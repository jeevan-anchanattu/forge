import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/shared/api';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Search, Plus, Filter, MoreHorizontal, ArrowLeft } from 'lucide-react';

export const WorkbooksPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [workbooks, setWorkbooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [filterOpen, setFilterOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = () => {
            setFilterOpen(false);
            setOpenMenuId(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (!projectId) return;
            try {
                setLoading(true);
                const res = await api.get(`projects/${projectId}/workbooks`);
                setWorkbooks(res.data?.data || []);
            } catch (err) {
                console.error('Failed to load workbooks', err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [projectId]);

    const filtered = workbooks.filter(wb => {
        const matchesSearch = wb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            wb.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || wb.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        if (status.includes('complete') || status === 'delivered') return 'text-success bg-success/10';
        if (status.includes('review') || status === 'draft') return 'text-warning bg-warning/10';
        return 'text-accent-primary bg-accent-primary/10';
    };

    const formatStatus = (status: string) => status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                    <button onClick={() => navigate(`/project/${projectId}`)} className="p-2 text-text-secondary hover:text-accent-primary hover:bg-surface rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Workbooks</h1>
                        <p className="text-text-secondary">{projectId ? `Project ${projectId}` : ''}</p>
                    </div>
                </div>
                <Button className="shrink-0 group" onClick={() => navigate(`/projects/${projectId}/workbooks/new`)}>
                    <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    New Workbook
                </Button>
            </div>

            <Card className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                    <Input
                        placeholder="Search by name or ID..."
                        className="pl-10 h-10 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Button variant="ghost" className="shrink-0" onClick={(e) => { e.stopPropagation(); setFilterOpen(!filterOpen); setOpenMenuId(null); }}>
                        <Filter className="h-4 w-4 mr-2" />
                        {activeFilter === 'all' ? 'Filters' : `Status: ${formatStatus(activeFilter)}`}
                    </Button>
                    {filterOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-bg-card border border-border-subtle rounded-md shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2" onClick={e => e.stopPropagation()}>
                            <button onClick={() => { setActiveFilter('all'); setFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === 'all' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>All Status</button>
                            <button onClick={() => { setActiveFilter('draft'); setFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === 'draft' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>Draft</button>
                            <button onClick={() => { setActiveFilter('approved'); setFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === 'approved' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>Approved</button>
                        </div>
                    )}
                </div>
            </Card>

            {loading ? (
                <div className="text-center py-12 text-text-tertiary animate-pulse border border-dashed border-border-subtle rounded-xl">Loading Workbooks...</div>
            ) : (
                <div className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border-subtle bg-surface/50 text-xs uppercase tracking-widest text-text-tertiary">
                                    <th className="p-4 font-medium">Workbook ID & Name</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Sections</th>
                                    <th className="p-4 font-medium text-right">Updated</th>
                                    <th className="p-4 font-medium w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {filtered.map(wb => (
                                    <tr key={wb.id} onClick={() => navigate(`/workbook/${wb.id}`)} className="hover:bg-surface/50 transition-colors cursor-pointer group">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">{wb.name}</span>
                                                <span className="text-xs font-mono text-text-tertiary">{wb.id}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${getStatusColor(wb.status)}`}>{formatStatus(wb.status)}</span>
                                        </td>
                                        <td className="p-4 text-sm text-text-secondary">
                                            {wb.sectionCount || 0}
                                        </td>
                                        <td className="p-4 text-sm text-text-secondary text-right font-mono">
                                            {new Date(wb.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right relative">
                                            <button
                                                className="p-2 text-text-tertiary hover:text-accent-primary transition-colors rounded-lg hover:bg-bg-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenuId(openMenuId === wb.id ? null : wb.id);
                                                    setFilterOpen(false);
                                                }}
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                            {openMenuId === wb.id && (
                                                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 bg-bg-card border border-border-subtle rounded-md shadow-lg py-1 z-50 animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
                                                    <button onClick={() => navigate(`/workbook/${wb.id}`)} className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">Open Cockpit</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-text-tertiary">No workbooks found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};