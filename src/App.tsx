import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './app/router';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-bg-primary text-text-primary font-primary selection:bg-accent-primary/30 selection:text-white">
                <AppRouter />
                <Toaster
                    theme="dark"
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#141B2D',
                            border: '1px solid #1E2D4A',
                            color: '#E8F0FF',
                        },
                    }}
                />
            </div>
        </QueryClientProvider>
    );
};

export default App;
