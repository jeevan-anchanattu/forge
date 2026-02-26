import React, { useState } from 'react';
import { useForgeStore } from '@/shared/store';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Modal } from '@/shared/components/Modal';
import { User as UserIcon, Shield, MoreVertical } from 'lucide-react';

export const TeamTable: React.FC = () => {
    const { members } = useForgeStore();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-text-primary uppercase tracking-tight">Team Members</h3>
                <Button variant="secondary" size="sm" onClick={() => setIsInviteModalOpen(true)}>Invite Member</Button>
            </div>

            <Modal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                title="Invite Team Member"
            >
                <div className="space-y-4">
                    <p className="text-sm text-text-secondary">Send an invitation email to add a new colleague to your organization.</p>
                    <Input label="Email Address" placeholder="colleague@company.com" />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xs font-medium text-text-tertiary uppercase tracking-wider">Role</label>
                        <select className="bg-surface border border-border-subtle rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:ring-1 focus:ring-accent-primary">
                            <option>Coordinator</option>
                            <option>Contributor</option>
                            <option>Reviewer</option>
                        </select>
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button variant="ghost" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
                        <Button onClick={() => {
                            alert('Invitation sent! (Mock)');
                            setIsInviteModalOpen(false);
                        }}>Send Invite</Button>
                    </div>
                </div>
            </Modal>

            <div className="grid grid-cols-1 gap-4">
                {members.map((member) => (
                    <Card key={member.id} className="p-4 flex items-center justify-between hover:bg-surface/30 group">
                        <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-lg bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                                {member.avatarUrl ? (
                                    <img src={member.avatarUrl} alt={member.displayName} className="h-full w-full object-cover rounded-lg" />
                                ) : (
                                    <UserIcon className="h-5 w-5 text-accent-primary" />
                                )}
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-text-primary">{member.displayName}</span>
                                    <div className="px-2 py-0.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center">
                                        <Shield className="h-3 w-3 text-accent-primary mr-1" />
                                        <span className="text-[10px] font-mono font-bold text-accent-primary uppercase tracking-tighter">
                                            {member.orgRole}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xs text-text-tertiary">{member.email}</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 text-xs font-mono uppercase tracking-tighter">
                            <div className="flex flex-col text-right">
                                <span className="text-text-tertiary">Last Active</span>
                                <span className="text-text-secondary">2 hours ago</span>
                            </div>
                            <button className="p-2 text-text-tertiary hover:text-text-primary transition-colors">
                                <MoreVertical className="h-4 w-4" />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
