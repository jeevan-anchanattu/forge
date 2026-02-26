import { HttpResponse, http, delay } from 'msw';
import users from '../fixtures/users.json';

export const authHandlers = [
    http.post('/api/v1/auth/login', async ({ request }) => {
        const { email, password } = (await request.json()) as any;

        // Mock check
        if (email === 'john@cambridgeprofab.com' && password === 'password123') {
            const user = users[0];
            await delay(400);
            return HttpResponse.json({
                success: true,
                data: {
                    user,
                    token: 'mock-jwt-token-12345'
                }
            });
        }

        return HttpResponse.json(
            { success: false, errors: [{ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }] },
            { status: 401 }
        );
    }),

    http.post('/api/v1/auth/logout', async () => {
        await delay(200);
        return HttpResponse.json({ success: true, data: null });
    }),

    http.get('/api/v1/auth/me', async () => {
        await delay(200);
        return HttpResponse.json({ success: true, data: users[0] });
    }),
];
