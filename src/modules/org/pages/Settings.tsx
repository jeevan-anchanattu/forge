import React, { useState } from 'react';
import { useForgeStore } from '@/shared/store';
import { Card } from '@/shared/components/Card';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { Modal } from '@/shared/components/Modal';
import { TeamTable } from '../components/TeamTable';
import { Settings as SettingsIcon, Globe, MapPin, CreditCard, Shield } from 'lucide-react';

export const OrgSettingsPage: React.FC = () => {
    const { org } = useForgeStore();
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [newPin, setNewPin] = useState('');
    const [pinError, setPinError] = useState('');

    const [isMultipliersModalOpen, setIsMultipliersModalOpen] = useState(false);
    const [multipliers, setMultipliers] = useState({
        shopRate: 85,
        overhead: 15,
        margin: 20
    });

    const handleSetPin = async () => {
        if (!/^\d{6}$/.test(newPin)) {
            setPinError('PIN must be exactly 6 digits');
            return;
        }
        const { hashPin } = await import('@/shared/utils/crypto');
        const hash = await hashPin(newPin);
        localStorage.setItem('forge-pin-hash', hash);
        setIsPinModalOpen(false);
        setNewPin('');
        setPinError('');
        alert('PIN successfully updated');
    };

    return (
        <div className="space-y-10 max-w-5xl mx-auto">
            <div className="flex items-center space-x-4 border-b border-border-subtle pb-6">
                <div className="h-12 w-12 rounded-xl bg-accent-primary/10 border border-accent-primary/20 shadow-glow flex items-center justify-center">
                    <SettingsIcon className="h-6 w-6 text-accent-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Organization Control</h1>
                    <p className="text-text-secondary">Facility-wide configurations and access governance</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* Identity Section */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 text-accent-primary">
                            <Globe className="h-4 w-4" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Public Identity</h3>
                        </div>
                        <Card className="p-6 space-y-6">
                            <div className="flex items-center space-x-6">
                                <div className="h-20 w-20 rounded-xl border border-border-subtle bg-surface flex items-center justify-center group cursor-pointer overflow-hidden">
                                    {org?.logoUrl ? (
                                        <img src={org.logoUrl} alt={org.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="text-text-tertiary text-xs text-center p-2 opacity-50">Upload Logo</div>
                                    )}
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Facility Name" defaultValue={org?.name} />
                                    <Input label="Industry Vertical" defaultValue={org?.industry} />
                                </div>
                            </div>
                        </Card>
                    </section>

                    {/* Profile Section */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 text-accent-primary">
                            <MapPin className="h-4 w-4" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Contact & Logistics</h3>
                        </div>
                        <Card className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <Input label="HQ Address" defaultValue="123 Cambridge Dr, Cambridge, ON" />
                            </div>
                            <Input label="Central Email" defaultValue="ops@cambridgeprofab.com" />
                            <Input label="Logistics Phone" defaultValue="+1 (519) 555-0199" />
                        </Card>
                    </section>

                    {/* Team Section */}
                    <TeamTable />

                    {/* Security Section */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 text-accent-primary">
                            <Shield className="h-4 w-4" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Security & Access</h3>
                        </div>
                        <Card className="p-6 space-y-6">
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-bold text-text-primary">Session Lock PIN</h4>
                                        <p className="text-xs text-text-tertiary">Used to quickly resume your session after idle periods</p>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => setIsPinModalOpen(true)}
                                    >
                                        Set PIN
                                    </Button>
                                </div>

                                <Modal
                                    isOpen={isPinModalOpen}
                                    onClose={() => {
                                        setIsPinModalOpen(false);
                                        setNewPin('');
                                        setPinError('');
                                    }}
                                    title="Set Session Lock PIN"
                                >
                                    <div className="space-y-4">
                                        <p className="text-sm text-text-secondary">Enter a 6-digit PIN to securely lock your session when idle.</p>
                                        <div className="flex flex-col space-y-2">
                                            <Input
                                                label="New PIN"
                                                type="password"
                                                maxLength={6}
                                                placeholder="••••••"
                                                value={newPin}
                                                onChange={e => {
                                                    setNewPin(e.target.value.replace(/\D/g, ''));
                                                    setPinError('');
                                                }}
                                                error={pinError}
                                            />
                                        </div>
                                        <div className="pt-4 flex justify-end space-x-3">
                                            <Button variant="ghost" onClick={() => setIsPinModalOpen(false)}>Cancel</Button>
                                            <Button onClick={handleSetPin}>Save PIN</Button>
                                        </div>
                                    </div>
                                </Modal>

                                <div className="flex items-center justify-between text-xs py-2 border-t border-border-subtle">
                                    <span className="text-text-secondary">Idle Timeout</span>
                                    <select className="bg-surface border border-border-subtle rounded px-2 py-1 text-text-primary outline-none">
                                        <option>5 Minutes</option>
                                        <option>15 Minutes (Default)</option>
                                        <option>30 Minutes</option>
                                    </select>
                                </div>
                            </div>
                        </Card>
                    </section>
                </div>

                <aside className="space-y-8">
                    {/* Subscription Card */}
                    <Card className="p-6 bg-gradient-to-br from-accent-tertiary/10 to-transparent border-accent-tertiary/20">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-accent-tertiary uppercase tracking-widest">Active Tier</span>
                                <span className="px-2 py-0.5 rounded bg-accent-tertiary/20 text-[10px] font-mono font-bold text-white uppercase">Professional</span>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-display font-bold text-text-primary">$499 <span className="text-sm font-normal text-text-tertiary">/mo</span></div>
                                <div className="text-xs text-text-secondary">Renews on Mar 15, 2026</div>
                            </div>
                            <Button variant="secondary" className="w-full text-xs font-bold uppercase border-accent-tertiary/40 text-accent-tertiary hover:bg-accent-tertiary/10">Manage Subscription</Button>
                        </div>
                    </Card>

                    {/* Economics Summary */}
                    <Card className="p-6 space-y-4">
                        <div className="flex items-center space-x-2 text-accent-primary">
                            <CreditCard className="h-4 w-4" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Economics</h3>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: 'Avg Shop Rate', value: `$${multipliers.shopRate.toFixed(2)}/hr` },
                                { label: 'Admin Overhead', value: `${multipliers.overhead}%` },
                                { label: 'Standard Margin', value: `${multipliers.margin}%` },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center py-2 border-b border-border-subtle last:border-0">
                                    <span className="text-xs text-text-secondary">{item.label}</span>
                                    <span className="text-sm font-mono text-text-primary">{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full text-xs uppercase tracking-widest text-text-tertiary hover:text-accent-primary"
                            onClick={() => setIsMultipliersModalOpen(true)}
                        >
                            Edit Multipliers
                        </Button>

                        <Modal
                            isOpen={isMultipliersModalOpen}
                            onClose={() => setIsMultipliersModalOpen(false)}
                            title="Edit Economic Multipliers"
                        >
                            <div className="space-y-4">
                                <p className="text-sm text-text-secondary">Update the standard economic rates used across projects and templates.</p>
                                <div className="space-y-3">
                                    <Input
                                        label="Avg Shop Rate ($/hr)"
                                        type="number"
                                        value={multipliers.shopRate}
                                        onChange={e => setMultipliers({ ...multipliers, shopRate: parseFloat(e.target.value) || 0 })}
                                    />
                                    <Input
                                        label="Admin Overhead (%)"
                                        type="number"
                                        value={multipliers.overhead}
                                        onChange={e => setMultipliers({ ...multipliers, overhead: parseFloat(e.target.value) || 0 })}
                                    />
                                    <Input
                                        label="Standard Margin (%)"
                                        type="number"
                                        value={multipliers.margin}
                                        onChange={e => setMultipliers({ ...multipliers, margin: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                                <div className="pt-4 flex justify-end space-x-3 border-t border-border-subtle mt-4">
                                    <Button variant="ghost" onClick={() => setIsMultipliersModalOpen(false)}>Cancel</Button>
                                    <Button onClick={() => setIsMultipliersModalOpen(false)}>Save Rates</Button>
                                </div>
                            </div>
                        </Modal>
                    </Card>
                </aside>
            </div>
        </div>
    );
};
