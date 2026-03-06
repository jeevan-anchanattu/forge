import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

async function prepareApp() {
    if (import.meta.env.VITE_MOCK_API === 'true') {
        const { worker } = await import('./shared/api/mock/browser');

        // Start the worker and return a promise that resolves when it's ready
        return worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
                // Use Vite's BASE_URL and ensure it ends with exactly one slash
                url: `${import.meta.env.BASE_URL.replace(/\/$/, '')}/mockServiceWorker.js`,
            },
        });
    }
    return Promise.resolve();
}

prepareApp().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});
