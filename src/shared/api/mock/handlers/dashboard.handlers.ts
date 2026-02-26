import { http, HttpResponse, delay } from 'msw';

export const dashboardHandlers = [
    http.get('/api/v1/dashboard/kpis', async () => {
        await delay(300);
        return HttpResponse.json({
            success: true,
            data: {
                activeProjects: { value: 24, delta: 3, trend: 'up' },
                openItems: { value: 142, delta: -12, trend: 'down' },
                dueThisWeek: { value: 8, delta: 2, trend: 'up' },
                quotesPending: { value: 5, delta: -1, trend: 'down' },
                hoursLogged: { value: 1240, delta: 150, trend: 'up' },
                onTimeRate: { value: 92.5, delta: 1.2, trend: 'up' }
            }
        });
    }),

    http.get('/api/v1/dashboard/activity', async () => {
        await delay(400);
        return HttpResponse.json({
            success: true,
            data: [
                { id: 'act_1', user: 'John D.', action: 'Moved Project CPF-203 to Manufacturing', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
                { id: 'act_2', user: 'Sarah J.', action: 'Uploaded new structural drawings to PRJ-992', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
                { id: 'act_3', user: 'System', action: 'Daily KPI snapshot generated', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }
            ]
        });
    })
];
