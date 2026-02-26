import React, { useState } from 'react';
import { useForgeStore } from '@/shared/store';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { hashPin } from '@/shared/utils/crypto';

export const LockScreen: React.FC = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const { org, unlockSession, logout } = useForgeStore();

    const handleUnlock = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (pin.length !== 6) {
            setError('PIN must be 6 digits');
            return;
        }

        const hashedInput = await hashPin(pin);
        const storedHash = localStorage.getItem('forge-pin-hash');

        if (hashedInput === storedHash) {
            unlockSession();
        } else {
            setError('Invalid PIN');
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-bg-primary/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="w-full max-w-sm flex flex-col items-center space-y-8">
                {org?.logoUrl && (
                    <img src={org.logoUrl} alt={org.name} className="h-16 w-16 object-contain" />
                )}

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-display font-bold text-accent-primary uppercase tracking-widest">
                        Session Locked
                    </h2>
                    <p className="text-text-secondary">Enter your 6-digit PIN to resume</p>
                </div>

                <form onSubmit={handleUnlock} className="w-full space-y-6">
                    <Input
                        type="password"
                        maxLength={6}
                        placeholder="······"
                        className="text-center text-3xl tracking-[1em] font-mono border-accent-primary/20"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                        autoFocus
                    />

                    {error && <p className="text-error text-center text-sm">{error}</p>}

                    <div className="grid grid-cols-2 gap-4">
                        <Button type="submit" variant="primary" className="font-bold">
                            Unlock
                        </Button>
                        <Button type="button" variant="ghost" onClick={logout}>
                            Switch User
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
