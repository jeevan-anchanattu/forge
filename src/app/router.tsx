import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { LoginPage } from '@/modules/auth';
import { OnboardingPage, OrgSettingsPage } from '@/modules/org';
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
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: '/dashboard',
                element: <PlaceholderPage title="Command Center" />,
            },
            {
                path: '/projects',
                element: <PlaceholderPage title="Project Registry" />,
            },
            {
                path: '/project/:id',
                element: <PlaceholderPage title="Project Cockpit" />,
            },
            {
                path: '/workbook/:id',
                element: <PlaceholderPage title="Mechanical Workbook" />,
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
]);

export const AppRouter = () => <RouterProvider router={router} />;
