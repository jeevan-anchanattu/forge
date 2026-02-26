import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { useForgeStore } from '@/shared/store';
import api from '@/shared/api';
import { Edit2, Check, X, Building2, User, Calendar, DollarSign, Activity, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const OverviewTab: React.FC<{ project: any, onUpdate: () => void }> = ({ project, onUpdate }) => {
    const { user } = useForgeStore();
    const isAdmin = user?.orgRole === 'org_admin' || user?.orgRole === 'super_admin';

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [editData, setEditData] = useState({
        name: project.name,
        id: project.id,
        clientName: project.clientName || '',
        targetDate: project.targetDate ? new Date(project.targetDate).toISOString().split('T')[0] : '',
        budget: project.budget || 0,
        createdBy: project.createdBy || ''
    });

    const handleSave = async () => {
        setSaving(true);
        try {
            // Include ID updates if changed (usually not recommended, but requested by user)
            const payload = { ...editData };
            await api.patch(`projects/${project.id}`, payload);
            setIsEditing(false);
            onUpdate();
        } catch (err) {
            console.error("Failed to update project", err);
        } finally {
            setSaving(false);
        }
    };

    const cancelEdit = () => {
        setEditData({
            name: project.name,
            id: project.id,
            clientName: project.clientName || '',
            targetDate: project.targetDate ? new Date(project.targetDate).toISOString().split('T')[0] : '',
            budget: project.budget || 0,
            createdBy: project.createdBy || ''
        });
        setIsEditing(false);
    };

    const mockChartData = [
        { name: 'Engineering', planned: 120, actual: 110 },
        { name: 'Procurement', planned: 80, actual: 85 },
        { name: 'Manufacturing', planned: 300, actual: 150 },
        { name: 'QA/QC', planned: 40, actual: 10 },
    ];

    const mockActivities = [
        { id: '1', user: 'System', action: 'Project moved to Manufacturing', time: '2h ago' },
        { id: '2', user: 'Sarah J.', action: 'Uploaded new technical drawings', time: '1d ago' },
        { id: '3', user: 'Mike R.', action: 'Approved initial quotation', time: '3d ago' },
        { id: '4', user: 'John D.', action: 'Created project registry', time: '1w ago' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Details & Editing */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-display font-bold text-text-primary tracking-tight">Project Details</h3>
                        {!isEditing && (
                            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {isEditing ? (
                            <div className="space-y-4 animate-in fade-in">
                                <Input label="Project Name" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} disabled={!isAdmin} />
                                <Input label="Project ID" value={editData.id} onChange={e => setEditData({ ...editData, id: e.target.value })} disabled={!isAdmin} />
                                <Input label="Client Name" value={editData.clientName} onChange={e => setEditData({ ...editData, clientName: e.target.value })} disabled={!isAdmin} />
                                <Input label="Owner / Lead" value={editData.createdBy} onChange={e => setEditData({ ...editData, createdBy: e.target.value })} disabled={!isAdmin} />
                                <Input label="Target Date" type="date" value={editData.targetDate} onChange={e => setEditData({ ...editData, targetDate: e.target.value })} />
                                <Input label="Budget ($)" type="number" value={editData.budget} onChange={e => setEditData({ ...editData, budget: parseFloat(e.target.value) })} />

                                <div className="flex gap-2 pt-4">
                                    <Button onClick={handleSave} loading={saving} className="flex-1 bg-success hover:bg-success/80 text-white">
                                        <Check className="h-4 w-4 mr-2" /> Save
                                    </Button>
                                    <Button onClick={cancelEdit} variant="secondary" className="flex-1">
                                        <X className="h-4 w-4 mr-2" /> Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 text-sm animate-in fade-in">
                                <DetailRow icon={<FileText />} label="Project ID" value={project.id} />
                                <DetailRow icon={<Building2 />} label="Client" value={project.clientName || 'Unassigned'} />
                                <DetailRow icon={<User />} label="Owner" value={project.createdBy || 'Unknown'} />
                                <DetailRow icon={<Calendar />} label="Target Date" value={project.targetDate ? new Date(project.targetDate).toLocaleDateString() : 'TBD'} />
                                <DetailRow icon={<DollarSign />} label="Budget" value={`$${(project.budget || 0).toLocaleString()}`} />
                                <DetailRow icon={<Activity />} label="Status" value={project.status.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} />
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Right Column: Charts & Activity */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary border-b border-border-subtle pb-4 mb-6">Hours vs Budget Estimates</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#8b949e', fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#ffffff05' }}
                                    contentStyle={{ backgroundColor: '#1c2128', border: '1px solid #30363d', borderRadius: '8px' }}
                                />
                                <Bar dataKey="planned" fill="#00E5FF" radius={[4, 4, 0, 0]} name="Planned Hrs" />
                                <Bar dataKey="actual" fill="#005A6B" radius={[4, 4, 0, 0]} name="Actual Hrs" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary border-b border-border-subtle pb-4 mb-4">Project Activity Feed</h3>
                    <div className="space-y-4">
                        {mockActivities.map((act) => (
                            <div key={act.id} className="flex gap-4 items-start p-3 bg-surface/30 rounded-lg hover:bg-surface/50 transition-colors">
                                <div className="h-8 w-8 rounded-full bg-accent-primary/10 flex items-center justify-center shrink-0 border border-accent-primary/20">
                                    <span className="text-xs font-bold text-accent-primary">{act.user.substring(0, 2).toUpperCase()}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-text-primary"><span className="font-bold">{act.user}</span> {act.action}</p>
                                    <p className="text-xs text-text-tertiary mt-1">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | React.ReactNode }) => (
    <div className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0">
        <div className="flex items-center text-text-tertiary">
            {React.cloneElement(icon as React.ReactElement, { className: 'h-4 w-4 mr-2' })}
            <span>{label}</span>
        </div>
        <span className="font-medium text-text-primary text-right">{value}</span>
    </div>
);
