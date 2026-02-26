import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/shared/api';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { Project } from '@/shared/types'; // Assuming we'll add this type later or use any for now

export const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [filterOpen, setFilterOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const navigate = useNavigate();

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = () => {
            setFilterOpen(false);
            setOpenMenuId(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('projects');
                setProjects(res.data?.data || []);
            } catch (err) {
                console.error('Failed to load projects', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'all' || p.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        if (status.includes('complete') || status === 'delivered') return 'text-success bg-success/10';
        if (status.includes('review') || status === 'planning') return 'text-warning bg-warning/10';
        return 'text-accent-primary bg-accent-primary/10';
    };

    const formatStatus = (status: string) => {
        return status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Project Registry</h1>
                    <p className="text-text-secondary">Manage and track all mechanical fabrication projects.</p>
                </div>
                <Button className="shrink-0 group" onClick={() => navigate('/projects/new')}>
                    <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    New Project
                </Button>
            </div>

            <Card className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                    <Input
                        placeholder="Search by project name or ID..."
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
                            <button onClick={() => { setActiveFilter('all'); setFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === 'all' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>All Statuses</button>
                            <button onClick={() => { setActiveFilter('planning'); setFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === 'planning' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>Planning</button>
                            <button onClick={() => { setActiveFilter('active'); setFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === 'active' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>Active</button>
                            <button onClick={() => { setActiveFilter('manufacturing_progress'); setFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === 'manufacturing_progress' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>Manufacturing</button>
                            <button onClick={() => { setActiveFilter('delivered'); setFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === 'delivered' ? 'bg-accent-primary/10 text-accent-primary' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>Delivered</button>
                        </div>
                    )}
                </div>
            </Card>

            {loading ? (
                <div className="text-center py-12 text-text-tertiary animate-pulse border border-dashed border-border-subtle rounded-xl">
                    Loading Registry...
                </div>
            ) : (
                <div className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border-subtle bg-surface/50 text-xs uppercase tracking-widest text-text-tertiary">
                                    <th className="p-4 font-medium">Project ID & Name</th>
                                    <th className="p-4 font-medium">Client</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium text-right">Target Date</th>
                                    <th className="p-4 font-medium w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {filteredProjects.map((project) => (
                                    <tr
                                        key={project.id}
                                        onClick={() => navigate(`/project/${project.id}`)}
                                        className="hover:bg-surface/50 transition-colors cursor-pointer group"
                                    >
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-text-primary group-hover:text-accent-primary transition-colors">{project.name}</span>
                                                <span className="text-xs font-mono text-text-tertiary">{project.id}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-text-secondary">
                                            {project.clientName}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${getStatusColor(project.status)}`}>
                                                {formatStatus(project.status)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-text-secondary text-right font-mono">
                                            {new Date(project.targetDate || project.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right relative">
                                            <button
                                                className="p-2 text-text-tertiary hover:text-accent-primary transition-colors rounded-lg hover:bg-bg-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenuId(openMenuId === project.id ? null : project.id);
                                                    setFilterOpen(false);
                                                }}
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>

                                            {openMenuId === project.id && (
                                                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 bg-bg-card border border-border-subtle rounded-md shadow-lg py-1 z-50 animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
                                                    <button onClick={() => navigate(`/project/${project.id}`)} className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">Open Cockpit</button>
                                                    <button onClick={() => { /* Quick edit stub */ setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">Quick Edit</button>
                                                    <div className="h-px bg-border-subtle my-1" />
                                                    <button onClick={() => { /* Archive stub */ setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm text-warning hover:bg-warning/10 transition-colors">Archive Project</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredProjects.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-text-tertiary">
                                            No projects found matching your criteria.
                                        </td>
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
