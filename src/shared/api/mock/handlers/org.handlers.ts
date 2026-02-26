import { HttpResponse, http, delay } from 'msw';
import organizations from '../fixtures/organizations.json';
import users from '../fixtures/users.json';

export const orgHandlers = [
    http.get('/api/v1/orgs/:id', async ({ params }) => {
        const org = organizations.find(o => o.id === params.id);
        await delay(300);
        if (!org) return new HttpResponse(null, { status: 404 });
        return HttpResponse.json({ success: true, data: org });
    }),

    http.get('/api/v1/orgs/:id/members', async () => {
        await delay(300);
        return HttpResponse.json({ success: true, data: users });
    }),

    http.post('/api/v1/orgs', async ({ request }) => {
        const data = (await request.json()) as Record<string, any>;
        await delay(800);
        return HttpResponse.json({
            success: true,
            data: { ...data, id: `org_${Math.random().toString(36).substring(2, 11)}` }
        });
    }),
];
