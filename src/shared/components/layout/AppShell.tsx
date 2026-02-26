import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useForgeStore } from '@/shared/store';
import { LockScreen } from '@/modules/auth/components/LockScreen';
import { useSessionLock } from '@/shared/hooks/useSessionLock';
import { cn } from '@/shared/components/Button';

interface AppShellProps {
    children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
    const { sessionLocked, sidebarExpanded } = useForgeStore();

    // Register session idle detection
    useSessionLock();

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Session Lock Screen Overlay */}
            {sessionLocked && <LockScreen />}

            {/* Main Layout Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <div
                className={cn(
                    'transition-all duration-300 ease-in-out flex flex-col min-h-screen',
                    sidebarExpanded ? 'pl-[260px]' : 'pl-[64px]'
                )}
            >
                <TopBar />
                <main className="flex-1 p-6 lg:p-10">
                    <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
