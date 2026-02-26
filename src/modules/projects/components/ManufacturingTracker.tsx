import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import api from '@/shared/api';
import { TaskStatus } from '@/shared/types';

interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    assignedTo?: string;
    dueDate?: string;
}

const STATUS_LABELS: Record<string, string> = {
    planned: 'To Do',
    in_progress: 'In Progress',
    on_hold: 'QA Hold',
    complete: 'Done'
};

export const KanbanTracker = ({ project, onUpdate }: { project: any; onUpdate?: () => void }) => {
    const initialTasks: Task[] = project.manufacturingTasks || [
        { id: 't1', title: 'Cut steel plates', status: 'planned' },
        { id: 't2', title: 'Weld frame', status: 'in_progress' },
        { id: 't3', title: 'Quality inspection', status: 'on_hold' },
        { id: 't4', title: 'Paint finish', status: 'complete' },
    ];

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    // update when project prop changes (only if tasks present)
    React.useEffect(() => {
        if (project.manufacturingTasks) {
            setTasks(project.manufacturingTasks);
        }
    }, [project.manufacturingTasks]);
    const [shopView, setShopView] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showModal, setShowModal] = useState(false);

    const saveTasks = async (updated: Task[]) => {
        setTasks(updated);
        if (project.id) {
            try {
                await api.patch(`projects/${project.id}`, { manufacturingTasks: updated });
                onUpdate && onUpdate();
            } catch (err) {
                console.error('Failed to save tasks', err);
            }
        }
    };

    const moveTask = (id: string, newStatus: TaskStatus) => {
        const updated = tasks.map(t => t.id === id ? { ...t, status: newStatus } : t);
        saveTasks(updated);
    };

    const columns: TaskStatus[] = ['planned', 'in_progress', 'on_hold', 'complete'];

    const openTask = (task: Task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    const openNew = () => {
        setSelectedTask({ id: `tmp_${Date.now()}`, title: '', status: 'planned' });
        setShowModal(true);
    };

    const handleModalSave = () => {
        if (!selectedTask) return;
        let taskToSave = selectedTask;
        // assign a proper ID if temporary
        if (taskToSave.id.startsWith('tmp_')) {
            taskToSave = { ...taskToSave, id: `t${Date.now()}` };
        }
        const exists = tasks.find(t => t.id === taskToSave.id);
        let updated: Task[];
        if (exists) {
            updated = tasks.map(t => t.id === taskToSave.id ? taskToSave : t);
        } else {
            updated = [...tasks, taskToSave];
        }
        saveTasks(updated);
        setShowModal(false);
    };

    const handleModalDelete = () => {
        if (!selectedTask) return;
        const updated = tasks.filter(t => t.id !== selectedTask.id);
        saveTasks(updated);
        setShowModal(false);
    };

    const handleModalChange = (changes: Partial<Task>) => {
        if (selectedTask) setSelectedTask({ ...selectedTask, ...changes });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Manufacturing Tracker</h2>
                <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setShopView(v => !v)}>
                        {shopView ? 'Kanban View' : 'Shop Floor'}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={openNew}>+ Task</Button>
                </div>
            </div>

            {shopView ? (
                <div className="space-y-4">
                    {tasks.length === 0 && <p className="text-sm text-text-tertiary">No tasks yet. Click "+ Task" to add one.</p>}
                    {tasks.map(task => (
                        <Card key={task.id} className="p-4 flex items-center justify-between cursor-pointer" onClick={() => openTask(task)}>
                            <div className="flex-1">
                                <span className="font-medium">{task.title}</span>
                                <div className="text-xs text-text-secondary mt-1">
                                    {task.assignedTo && <span>→ {task.assignedTo}</span>}
                                    {task.dueDate && <span className="ml-2">due {new Date(task.dueDate).toLocaleDateString()}</span>}
                                    {task.remarks && <div className="mt-1 italic">{task.remarks}</div>}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {columns.map(status => (
                                    <Button
                                        key={status}
                                        size="xs"
                                        variant={task.status === status ? 'primary' : 'ghost'}
                                        onClick={e => { e.stopPropagation(); moveTask(task.id, status); }}
                                    >
                                        {STATUS_LABELS[status]}
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {tasks.length === 0 && <p className="text-sm text-text-tertiary col-span-full">No tasks yet. Click "+ Task" to add one.</p>}
                    {columns.map(col => (
                        <div key={col} className="bg-surface/20 rounded-lg p-3">
                            <h4 className="text-sm font-bold mb-2">{STATUS_LABELS[col]}</h4>
                            <div className="space-y-2">
                                {tasks.filter(t => t.status === col).map(t => (
                                    <Card key={t.id} className="p-2 cursor-pointer" onClick={() => openTask(t)}>
                                        <div>
                                            <span className="text-sm font-medium">{t.title}</span>
                                            <div className="text-xs text-text-secondary">
                                                {t.assignedTo && <span>→ {t.assignedTo}</span>}
                                                {t.dueDate && <span className="ml-1">due {new Date(t.dueDate).toLocaleDateString()}</span>}
                                                {t.remarks && <div className="ml-1 italic">{t.remarks}</div>}
                                            </div>
                                        </div>
                                        <div className="mt-1 flex gap-1">
                                            {columns.map(status => (
                                                <button
                                                    key={status}
                                                    className={`text-[10px] px-1 py-0.5 rounded ${t.status === status ? 'bg-accent-primary text-white' : 'bg-border-subtle text-text-secondary'}`}
                                                    onClick={e => { e.stopPropagation(); moveTask(t.id, status); }}
                                                >
                                                    {STATUS_LABELS[status]}
                                                </button>
                                            ))}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* modal for add/edit */}
            {showModal && selectedTask && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <Card className="w-full max-w-md p-6 relative">
                        <h3 className="text-lg font-bold mb-4">{tasks.find(t => t.id === selectedTask.id) ? 'Edit Task' : 'New Task'}</h3>
                        <div className="space-y-3">
                            <Input
                                label="Title"
                                value={selectedTask.title}
                                onChange={e => handleModalChange({ title: e.target.value })}
                            />
                            {project.members && project.members.length > 0 ? (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Assigned To</label>
                                    <select
                                        className="w-full border border-border-subtle rounded px-2 py-1"
                                        value={selectedTask.assignedTo || ''}
                                        onChange={e => handleModalChange({ assignedTo: e.target.value })}
                                    >
                                        <option value="">-- select --</option>
                                        {project.members.map((m: any) => (
                                            <option key={m.id} value={m.name}>{m.name}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <Input
                                    label="Assigned To"
                                    value={selectedTask.assignedTo || ''}
                                    onChange={e => handleModalChange({ assignedTo: e.target.value })}
                                />
                            )}
                            <Input
                                label="Due Date"
                                type="date"
                                value={selectedTask.dueDate || ''}
                                onChange={e => handleModalChange({ dueDate: e.target.value })}
                            />
                            <div className="space-y-1.5 w-full">
                                <label className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                                    Remarks
                                </label>
                                <textarea
                                    className="flex w-full rounded-md border border-border-subtle bg-surface px-3 py-2 text-sm text-text-primary ring-offset-bg-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                    value={selectedTask.remarks || ''}
                                    onChange={e => handleModalChange({ remarks: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    className="w-full border border-border-subtle rounded px-2 py-1"
                                    value={selectedTask.status}
                                    onChange={e => handleModalChange({ status: e.target.value as TaskStatus })}
                                >
                                    {columns.map(s => (
                                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            {tasks.find(t => t.id === selectedTask.id) && (
                                <Button variant="destructive" size="sm" onClick={handleModalDelete}>Delete</Button>
                            )}
                            <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button size="sm" onClick={handleModalSave}>Save</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export const ManufacturingTracker = KanbanTracker;
