import { authHandlers } from './handlers/auth.handlers';
import { orgHandlers } from './handlers/org.handlers';
import { HttpResponse, http } from 'msw';

export const handlers = [
    ...authHandlers,
    ...orgHandlers,
    http.get('/api/v1/health', () => {
        return HttpResponse.json({ status: 'ok' });
    }),
];
