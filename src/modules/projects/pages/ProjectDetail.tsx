import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/shared/api';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { ArrowLeft, User as UserIcon, Phone, Mail } from 'lucide-react';
import { ProjectStatus } from '@/shared/types';
import { StatusFlow } from '../components/StatusFlow';
import { VisualViewer } from '../components/VisualViewer';
import { ManufacturingTracker } from '../components/ManufacturingTracker';
import { Attachments } from '../components/Attachments';
import { OverviewTab } from '../components/OverviewTab';
import { DocumentVault } from '../components/DocumentVault';

export const ProjectDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'status' | 'visuals' | 'manufacturing' | 'attachments' | 'documents'>('overview');

    const fetchProject = async () => {
        try {
            setLoading(true);
            const res = await api.get(`projects/${id}`);
            setProject(res.data.data);
        } catch (err) {
            console.error('Failed to load project', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProject();
    }, [id]);

    const STATUS_ORDER: ProjectStatus[] = [
        'planning','active','quotation_review','quotation_approved',
        'plan_started','plan_complete','manufacturing_review',
        'manufacturing_progress','manufacturing_qa_review',
        'manufacturing_complete','manufacturing_signoff',
        'delivered','feedback','retrospective','archived'
    ];

    const showManufacturing =
        project &&
        STATUS_ORDER.indexOf(project.status) >= STATUS_ORDER.indexOf('manufacturing_review');

    // ensure activeTab stays valid if manufacturing section becomes unavailable
    React.useEffect(() => {
        if (!showManufacturing && activeTab === 'manufacturing') {
            setActiveTab('overview');
        }
    }, [showManufacturing, activeTab]);

    if (loading) {
        return <div className="p-8 text-center text-text-tertiary animate-pulse">Scanning Project Data...</div>;
    }

    if (!project) {
        return <div className="p-8 text-center text-error">Project Not Found</div>;
    }

    const allContacts = project.contacts || project.clientJson || [];
    const primaryContact = allContacts.find((c: any) => c.isPrimary) || allContacts[0];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'status', label: 'Status Flow' },
        { id: 'workbooks', label: 'Workbooks' },
        { id: 'visuals', label: 'Visual Viewer' },
        ...(showManufacturing ? [{ id: 'manufacturing', label: 'Manufacturing' }] : []),
        { id: 'attachments', label: 'Attachments' },
        { id: 'documents', label: '📁 Documents' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start space-x-4">
                    <button onClick={() => navigate('/projects')} className="mt-1 p-2 text-text-secondary hover:text-accent-primary hover:bg-surface rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <div className="flex items-center space-x-3 mb-1">
                            <h1 className="text-3xl font-display font-bold text-text-primary tracking-tight">{project.name}</h1>
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-success/10 text-success border border-success/20">
                                {project.status.replace('_', ' ')}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-text-tertiary">
                            <span className="font-mono">{project.id}</span>
                            <span className="w-1 h-1 rounded-full bg-border-subtle" />
                            <span>Client: <strong className="text-text-secondary">{project.clientName}</strong></span>
                        </div>
                    </div>
                </div>

                {/* Primary Contact Card */}
                {primaryContact && (
                    <Card className="p-3 flex items-center space-x-3 bg-surface/50 border-dashed max-w-sm">
                        <div className="h-10 w-10 rounded-full bg-accent-primary/10 flex items-center justify-center shrink-0">
                            <UserIcon className="h-5 w-5 text-accent-primary" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-text-primary truncate">{primaryContact.name}</span>
                            <span className="text-[10px] uppercase tracking-widest text-text-tertiary truncate">{primaryContact.title}</span>
                        </div>
                        <div className="flex flex-col pl-3 border-l border-border-subtle space-y-1">
                            <a href={`mailto:${primaryContact.email}`} className="text-text-tertiary hover:text-accent-primary"><Mail className="h-3 w-3" /></a>
                            <a href={`tel:${primaryContact.phone}`} className="text-text-tertiary hover:text-accent-primary"><Phone className="h-3 w-3" /></a>
                        </div>
                    </Card>
                )}
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-border-subtle flex overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            if (tab.id === 'workbooks' && project?.id) {
                                navigate(`/projects/${project.id}/workbooks`);
                            } else {
                                setActiveTab(tab.id as any);
                            }
                        }}
                        className={`px-6 py-3 text-sm font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-colors duration-200 ${activeTab === tab.id
                            ? 'border-accent-primary text-accent-primary'
                            : 'border-transparent text-text-tertiary hover:text-text-secondary hover:border-border-subtle'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content Area */}
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === 'overview' && <OverviewTab project={project} onUpdate={fetchProject} />}

                {activeTab === 'status' && <StatusFlow project={project} onUpdate={fetchProject} />}
                {activeTab === 'visuals' && <VisualViewer project={project} />}
                {activeTab === 'manufacturing' && <ManufacturingTracker project={project} onUpdate={fetchProject} />}
                {activeTab === 'attachments' && <Attachments project={project} />}
                {activeTab === 'documents' && <DocumentVault project={project} />}
            </div>
        </div>
    );
};
