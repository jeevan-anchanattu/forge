import { http, HttpResponse, delay } from 'msw';
import projectsData from '../fixtures/projects.json';

// In-memory store for mutations
let projects: any[] = [...projectsData];

export const projectHandlers = [
    http.get('/api/v1/projects', async () => {
        await delay(400);
        return HttpResponse.json({
            success: true,
            data: projects
        });
    }),

    http.get('/api/v1/projects/:id', async ({ params }) => {
        const { id } = params;
        await delay(300);
        const project = projects.find(p => p.id === id);

        if (project) {
            return HttpResponse.json({ success: true, data: project });
        }
        return HttpResponse.json({ success: false, errors: [{ message: 'Project not found' }] }, { status: 404 });
    }),

    http.post('/api/v1/projects', async ({ request }) => {
        const newProject = await request.json() as any;
        await delay(500);

        const project = {
            id: `PRJ-${Math.floor(Math.random() * 10000)}`,
            ...newProject,
            status: 'planning',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        projects.push(project);
        return HttpResponse.json({ success: true, data: project });
    }),

    http.patch('/api/v1/projects/:id/status', async ({ params, request }) => {
        const { id } = params;
        const { status, reason } = await request.json() as any;
        await delay(400);

        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = {
                ...projects[index],
                status,
                updatedAt: new Date().toISOString(),
                statusHistory: [
                    ...((projects[index] as any).statusHistory || []),
                    { status, timestamp: new Date().toISOString(), reason }
                ]
            };
            return HttpResponse.json({ success: true, data: projects[index] });
        }
        return HttpResponse.json({ success: false, errors: [{ message: 'Project not found' }] }, { status: 404 });
    }),

    http.patch('/api/v1/projects/:id', async ({ params, request }) => {
        const { id } = params;
        const updates = await request.json() as any;
        await delay(400);

        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = {
                ...projects[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            return HttpResponse.json({ success: true, data: projects[index] });
        }
        return HttpResponse.json({ success: false, errors: [{ message: 'Project not found' }] }, { status: 404 });
    })
];
