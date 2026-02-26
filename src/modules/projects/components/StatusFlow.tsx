import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Modal } from '@/shared/components/Modal';
import api from '@/shared/api';
import { AlertTriangle, Lock, Unlock, CheckCircle2, ChevronRight } from 'lucide-react';

const STATUS_STAGES = [
    'planning', 'active', 'quotation_review', 'quotation_approved', 'plan_started',
    'plan_complete', 'manufacturing_review', 'manufacturing_progress',
    'manufacturing_qa_review', 'manufacturing_complete', 'manufacturing_signoff',
    'delivered', 'feedback', 'retrospective', 'archived'
];

const UNLOCK_FEATURES: Record<string, string[]> = {
    'active': ['Project Cockpit access', 'Workbook generation allowed'],
    'quotation_approved': ['Planning module unlocks', 'Material procurement begins'],
    'manufacturing_review': ['Manufacturing Kanban unlocks', 'Shop floor visibility'],
    'delivered': ['Client feedback module unlocks', 'Post-mortem analytics']
};

interface StatusFlowProps {
    project: any;
    onUpdate: () => void;
}

export const StatusFlow: React.FC<StatusFlowProps> = ({ project, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [backwardModal, setBackwardModal] = useState<{ isOpen: boolean, target: string | null }>({ isOpen: false, target: null });
    const [forwardModal, setForwardModal] = useState<{ isOpen: boolean, target: string | null }>({ isOpen: false, target: null });
    const [reason, setReason] = useState('');

    const currentIndex = STATUS_STAGES.indexOf(project.status);

    const handleStatusChange = async (newStatus: string, reasonText?: string) => {
        setLoading(true);
        try {
            await api.patch(`projects/${project.id}/status`, { status: newStatus, reason: reasonText });
            onUpdate();
        } catch (err) {
            console.error('Failed to change status', err);
        } finally {
            setLoading(false);
            setBackwardModal({ isOpen: false, target: null });
            setForwardModal({ isOpen: false, target: null });
            setReason('');
        }
    };

    const attemptTransition = (targetStatus: string, targetIndex: number) => {
        if (targetIndex < currentIndex) {
            setBackwardModal({ isOpen: true, target: targetStatus });
        } else if (UNLOCK_FEATURES[targetStatus] && targetIndex > currentIndex) {
            setForwardModal({ isOpen: true, target: targetStatus });
        } else {
            handleStatusChange(targetStatus);
        }
    };

    return (
        <Card className="p-6 space-y-8">
            <div className="flex flex-col space-y-2 mb-6">
                <h3 className="text-xl font-display font-bold text-text-primary capitalize">Project Lifecycle</h3>
                <p className="text-sm text-text-secondary">Track and advance the project through its operational phases.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {STATUS_STAGES.map((status, index) => {
                    const isPast = index < currentIndex;
                    const isCurrent = index === currentIndex;
                    const isFuture = index > currentIndex;

                    return (
                        <button
                            key={status}
                            disabled={loading}
                            onClick={() => attemptTransition(status, index)}
                            className={`
                                relative p-4 rounded-xl border text-left flex flex-col justify-between min-h-[100px] transition-all duration-300
                                ${isCurrent ? 'border-accent-primary bg-accent-primary/10 shadow-glow-sm cursor-default' : ''}
                                ${isPast ? 'border-success/30 bg-success/5 hover:border-warning/50 cursor-pointer group' : ''}
                                ${isFuture ? 'border-border-subtle bg-surface/30 opacity-60 hover:opacity-100 hover:border-accent-primary/50 cursor-pointer' : ''}
                            `}
                        >
                            {isPast && <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-success" />}
                            {isFuture && <Lock className="absolute top-3 right-3 h-4 w-4 text-text-tertiary" />}

                            <span className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${isCurrent ? 'text-accent-primary font-bold' : 'text-text-tertiary'}`}>
                                Stage {index + 1}
                            </span>

                            <span className={`text-sm font-bold ${isCurrent ? 'text-accent-primary' : 'text-text-secondary group-hover:text-warning'}`}>
                                {status.replace(/_/g, ' ')}
                            </span>

                            {isPast && (
                                <div className="absolute inset-0 bg-warning/90 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-bold text-bg-primary uppercase tracking-widest flex items-center">
                                        <AlertTriangle className="h-3 w-3 mr-1" /> Revert
                                    </span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Sub-components below for modals */}
            <Modal
                isOpen={backwardModal.isOpen}
                onClose={() => setBackwardModal({ isOpen: false, target: null })}
                title="Warning: Backward Transition"
            >
                <div className="space-y-4">
                    <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                        <p className="text-sm text-text-secondary">You are moving the project backward to <strong className="text-text-primary capitalize">{backwardModal.target?.replace('_', ' ')}</strong>. This will lock downstream features and may invalidate current workbook data.</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Reason for Reversal</label>
                        <Input
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g. Client requested major revision..."
                        />
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button variant="ghost" onClick={() => setBackwardModal({ isOpen: false, target: null })}>Cancel</Button>
                        <Button variant="destructive" disabled={!reason.trim() || loading} onClick={() => handleStatusChange(backwardModal.target!, reason)}>
                            Confirm Reversal
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={forwardModal.isOpen}
                onClose={() => setForwardModal({ isOpen: false, target: null })}
                title="Stage Advancement"
            >
                <div className="space-y-4">
                    <div className="p-6 bg-surface border border-border-subtle rounded-xl flex flex-col items-center justify-center text-center space-y-3">
                        <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                            <Unlock className="h-6 w-6 text-success" />
                        </div>
                        <h4 className="text-lg font-bold text-text-primary capitalize">Advancing to {forwardModal.target?.replace('_', ' ')}</h4>
                        <p className="text-sm text-text-secondary">This stage transition unlocks new capabilities in the system.</p>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-xs font-bold uppercase tracking-widest text-text-tertiary">Feature Unlocks</h5>
                        <ul className="space-y-2">
                            {forwardModal.target && UNLOCK_FEATURES[forwardModal.target]?.map(feat => (
                                <li key={feat} className="flex items-center text-sm text-text-secondary">
                                    <ChevronRight className="h-4 w-4 text-accent-primary mr-2" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <Button variant="ghost" onClick={() => setForwardModal({ isOpen: false, target: null })}>Review Stage</Button>
                        <Button loading={loading} onClick={() => handleStatusChange(forwardModal.target!)}>
                            Acknowledge & Advance
                        </Button>
                    </div>
                </div>
            </Modal>
        </Card>
    );
};
