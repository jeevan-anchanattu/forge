import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useRouteError } from 'react-router-dom';
import { LoginPage } from '@/modules/auth';
import { OnboardingPage, OrgSettingsPage } from '@/modules/org';
import { DashboardPage } from '@/modules/dashboard/pages/Dashboard';
import { ProjectList } from '@/modules/projects/pages/ProjectList';
import { ProjectDetail } from '@/modules/projects/pages/ProjectDetail';
import { WorkbooksPage } from '@/modules/workbooks/pages/WorkbooksPage';
import { WorkbookDetailPage } from '@/modules/workbooks/pages/WorkbookDetailPage';
import { WorkbookCreatePage } from '@/modules/workbooks/pages/WorkbookCreatePage';
import { SectionCockpitPage } from '@/modules/sections/pages/SectionCockpitPage';
import { SectionCreatePage } from '@/modules/sections/pages/SectionCreatePage';
import { AppShell } from '@/shared/components/layout/AppShell';
import { useForgeStore } from '@/shared/store';

// Protected Route Wrapper
const ProtectedRoute = () => {
    const { isAuthenticated } = useForgeStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <AppShell>
            <Outlet />
        </AppShell>
    );
};

const RootErrorBoundary = () => {
    const error = useRouteError() as any;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary p-6 text-center space-y-4">
            <div className="h-16 w-16 bg-error/10 text-error rounded-xl flex items-center justify-center mb-4 border border-error/20">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h1 className="text-2xl font-display font-bold text-text-primary uppercase tracking-tight">System Fault Detected</h1>
            <p className="text-text-secondary max-w-md">An unexpected interface error occurred. The system has paused execution to prevent cascade failure.</p>
            <div className="bg-surface border border-border-subtle p-4 rounded-lg w-full max-w-2xl text-left overflow-auto mt-4">
                <pre className="text-xs text-error font-mono">{error?.message || 'Unknown Error'}</pre>
            </div>
            <button onClick={() => window.location.reload()} className="mt-8 px-6 py-2 bg-accent-primary text-bg-primary font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-accent-secondary transition-colors">
                Reboot Session
            </button>
        </div>
    );
};

// Placeholder Pages
const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-3xl font-display font-bold text-accent-primary tracking-tight uppercase">
            {title}
        </h1>
        <p className="text-text-secondary text-lg">Engineering Module Under Construction</p>
        <div className="w-12 h-1 bg-accent-primary/20 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-accent-primary animate-scan" />
        </div>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/onboarding',
        element: <OnboardingPage />,
    },
    {
        element: <ProtectedRoute />,
        errorElement: <RootErrorBoundary />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/projects',
                element: <ProjectList />,
            },
            {
                path: '/project/:id',
                element: <ProjectDetail />,
            },
            {
                path: '/projects/:projectId/workbooks',
                element: <React.Suspense fallback={<div>Loading...</div>}><WorkbooksPage /></React.Suspense>,
            },
            {
                path: '/projects/:projectId/workbooks/new',
                element: <React.Suspense fallback={<div>Loading...</div>}><WorkbookCreatePage /></React.Suspense>,
            },
            {
                path: '/workbook/:workbookId',
                element: <React.Suspense fallback={<div>Loading...</div>}><WorkbookDetailPage /></React.Suspense>,
            },
            {
                path: '/workbooks/:workbookId/sections/new',
                element: <React.Suspense fallback={<div>Loading...</div>}><SectionCreatePage /></React.Suspense>,
            },
            {
                path: '/workbooks/:workbookId/sections/:sectionId',
                element: <React.Suspense fallback={<div>Loading...</div>}><SectionCockpitPage /></React.Suspense>,
            },
            {
                path: '/inventory',
                element: <PlaceholderPage title="Inventory Repository" />,
            },
            {
                path: '/reports',
                element: <PlaceholderPage title="Analytics & Reports" />,
            },
            {
                path: '/settings',
                element: <OrgSettingsPage />,
            },
        ],
    },
    {
        path: '*',
        element: <PlaceholderPage title="404 — Null Reference" />,
    },
], {
    basename: import.meta.env.BASE_URL
});

export const AppRouter = () => <RouterProvider router={router} />;
