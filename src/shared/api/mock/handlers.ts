import { authHandlers } from './handlers/auth.handlers';
import { orgHandlers } from './handlers/org.handlers';
import { projectHandlers } from './handlers/project.handlers';
import { dashboardHandlers } from './handlers/dashboard.handlers';
import { HttpResponse, http } from 'msw';

export const handlers = [
    ...authHandlers,
    ...orgHandlers,
    ...projectHandlers,
    ...dashboardHandlers,
    http.get('/api/v1/health', () => {
        return HttpResponse.json({ status: 'ok' });
    }),
];
