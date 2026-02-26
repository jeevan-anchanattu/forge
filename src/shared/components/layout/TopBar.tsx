import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForgeStore } from '@/shared/store';
import { GlobalSearch } from './GlobalSearch';
import { Bell, User as UserIcon, HelpCircle } from 'lucide-react';

export const TopBar: React.FC = () => {
    const { user } = useForgeStore();
    const navigate = useNavigate();

    return (
        <header className="h-[64px] border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md px-6 flex items-center justify-between z-40">
            <div className="flex-1 flex items-center">
                {/* Breadcrumbs - Simplified for now */}
                <div className="hidden lg:flex items-center text-xs font-mono uppercase tracking-widest text-text-tertiary">
                    <span className="hover:text-accent-primary cursor-pointer transition-colors">FORGE</span>
                    <span className="mx-2 text-border-subtle">/</span>
                    <span className="text-text-primary">Dashboard</span>
                </div>
            </div>

            <div className="flex-1 flex justify-center px-4">
                <GlobalSearch />
            </div>

            <div className="flex-1 flex items-center justify-end space-x-4">
                <button className="p-2 text-text-secondary hover:text-accent-primary transition-colors">
                    <HelpCircle className="h-5 w-5" />
                </button>
                <div className="relative group" onClick={() => {
                    const dropdown = document.getElementById('notification-dropdown');
                    if (dropdown) dropdown.classList.toggle('hidden');
                }}>
                    <button className="p-2 text-text-secondary hover:text-accent-primary transition-colors relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-bg-primary"></span>
                    </button>

                    <div id="notification-dropdown" className="hidden absolute right-0 top-full mt-2 w-80 bg-bg-card border border-border-subtle rounded-md shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 cursor-default" onClick={e => e.stopPropagation()}>
                        <div className="px-4 py-2 border-b border-border-subtle flex justify-between items-center">
                            <span className="text-sm font-bold text-text-primary">Notifications</span>
                            <span className="text-[10px] text-accent-primary uppercase font-bold tracking-widest cursor-pointer hover:text-accent-secondary transition-colors" onClick={() => document.getElementById('notification-dropdown')?.classList.add('hidden')}>Mark all as read</span>
                        </div>
                        <div className="flex flex-col max-h-80 overflow-y-auto">
                            <div className="px-4 py-3 hover:bg-surface transition-colors cursor-pointer border-b border-border-subtle/50 group/item">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-sm font-bold text-text-primary group-hover/item:text-accent-primary transition-colors">System Update</span>
                                    <span className="text-[10px] text-text-tertiary">2m ago</span>
                                </div>
                                <p className="text-xs text-text-secondary line-clamp-2">Forge v2.0 is now live. Please review the new mechanical fabrication management features.</p>
                            </div>
                            <div className="px-4 py-3 hover:bg-surface transition-colors cursor-pointer opacity-70 group/item">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-sm font-bold text-text-primary group-hover/item:text-accent-primary transition-colors">New Team Member</span>
                                    <span className="text-[10px] text-text-tertiary">1h ago</span>
                                </div>
                                <p className="text-xs text-text-secondary line-clamp-2">Sarah Jenkins has joined the Cambridge Pro Fab workspace.</p>
                            </div>
                        </div>
                        <div className="pt-2 px-4 border-t border-border-subtle text-center pb-1">
                            <button className="text-xs text-text-tertiary hover:text-accent-primary transition-colors uppercase tracking-widest font-bold w-full p-2" onClick={() => document.getElementById('notification-dropdown')?.classList.add('hidden')}>View All</button>
                        </div>
                    </div>
                </div>

                <div className="h-8 w-[1px] bg-border-subtle mx-2" />

                <div className="relative group cursor-pointer" onClick={() => {
                    const dropdown = document.getElementById('user-dropdown');
                    if (dropdown) dropdown.classList.toggle('hidden');
                }}>
                    <div className="flex items-center space-x-3">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                                {user?.displayName || 'John Davidson'}
                            </span>
                            <span className="text-[10px] text-text-tertiary uppercase font-mono tracking-tighter">
                                {user?.orgRole || 'ADMIN'}
                            </span>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center overflow-hidden group-hover:shadow-glow-sm transition-all">
                            {user?.avatarUrl ? (
                                <img src={user.avatarUrl} alt={user.displayName} className="h-full w-full object-cover" />
                            ) : (
                                <UserIcon className="h-5 w-5 text-accent-primary" />
                            )}
                        </div>
                    </div>

                    <div
                        id="user-dropdown"
                        className="hidden absolute right-0 top-full mt-2 w-48 bg-bg-card border border-border-subtle rounded-md shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 cursor-default"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => {
                                navigate('/settings');
                                document.getElementById('user-dropdown')?.classList.add('hidden');
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
                        >
                            Settings
                        </button>
                        <div className="h-[1px] bg-border-subtle my-1"></div>
                        <button
                            onClick={() => {
                                const { lockSession } = useForgeStore.getState();
                                lockSession();
                                document.getElementById('user-dropdown')?.classList.add('hidden');
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
                        >
                            Lock Session
                        </button>
                        <button
                            onClick={() => {
                                const { logout } = useForgeStore.getState();
                                logout();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
