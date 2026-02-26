import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForgeStore } from '@/shared/store';
import { Button } from '@/shared/components/Button';
import { Card } from '@/shared/components/Card';
import { Input } from '@/shared/components/Input';
import { LogIn } from 'lucide-react';
import api from '@/shared/api';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('john@cambridgeprofab.com');
    const [password, setPassword] = useState('password123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { setUser, setToken } = useForgeStore();

    const [isForgotMode, setIsForgotMode] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isForgotMode) {
            setLoading(true);
            // Mock forgot password
            setTimeout(() => {
                setLoading(false);
                setForgotSuccess(true);
            }, 800);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('auth/login', { email, password });
            const { user, token } = response.data.data;

            setUser(user);
            setToken(token);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.errors?.[0]?.message || 'Login failed. Check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent-primary/10 via-bg-primary to-bg-primary">
            <Card className="w-full max-w-md p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500 shadow-glow">
                <div className="flex flex-col items-center space-y-4">
                    <div className="h-16 w-16 bg-bg-secondary rounded-xl border border-border-subtle flex items-center justify-center shadow-inner">
                        <LogIn className="h-8 w-8 text-accent-primary" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-display font-bold text-text-primary tracking-tight">
                            {isForgotMode ? 'Reset Password' : 'FORGE'}
                        </h1>
                        <p className="text-text-secondary text-sm">
                            {isForgotMode ? "We'll send you reset instructions." : 'Mechanical Fabrication Management'}
                        </p>
                    </div>
                </div>

                {isForgotMode && forgotSuccess ? (
                    <div className="text-center space-y-6">
                        <div className="p-4 bg-accent-primary/10 border border-accent-primary/20 rounded-lg">
                            <p className="text-sm text-accent-primary">Instructions sent to <span className="font-bold">{email}</span></p>
                        </div>
                        <Button variant="secondary" onClick={() => { setIsForgotMode(false); setForgotSuccess(false); }} className="w-full">
                            Return to Login
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            label="Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                        />
                        {!isForgotMode && (
                            <Input
                                label="Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        )}

                        {error && <p className="text-error text-sm text-center">{error}</p>}

                        <Button type="submit" loading={loading} className="w-full h-11 font-bold">
                            {isForgotMode ? 'Send Reset Link' : 'Sign In'}
                        </Button>
                    </form>
                )}

                <div className="text-center space-y-4">
                    {!isForgotMode ? (
                        <>
                            <button onClick={() => setIsForgotMode(true)} type="button" className="text-xs text-text-tertiary hover:text-accent-primary transition-colors uppercase tracking-widest block w-full">
                                Forgot Password?
                            </button>
                            <div className="pt-4 border-t border-border-subtle">
                                <button
                                    type="button"
                                    onClick={() => navigate('/onboarding')}
                                    className="text-xs text-accent-primary hover:text-accent-secondary transition-colors uppercase font-bold tracking-[0.15em]"
                                >
                                    Setup New Organization
                                </button>
                            </div>
                        </>
                    ) : (
                        !forgotSuccess && (
                            <button onClick={() => setIsForgotMode(false)} type="button" className="text-xs text-text-tertiary hover:text-accent-primary transition-colors uppercase tracking-widest block w-full">
                                Back to Login
                            </button>
                        )
                    )}
                </div>
            </Card>
        </div>
    );
};
