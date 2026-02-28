import { http, HttpResponse, delay } from 'msw';
import workbooksData from '../fixtures/workbooks.json';
import sectionsPreviewData from '../fixtures/sections.json';
import { addPreviewSections } from './section.handlers';
import { createJob, getJob } from './job.handlers';

// in-memory stores
let workbooks: any[] = [...workbooksData];

// helper to generate simple IDs
const makeId = (prefix = 'wb') => `${prefix}_${Math.random().toString(36).substring(2, 10)}`;

export const workbookHandlers = [
    // list workbooks for a project
    http.get('/api/v1/projects/:pid/workbooks', async ({ params }) => {
        const { pid } = params;
        await delay(300);
        const list = workbooks.filter(w => w.projectId === pid);
        return HttpResponse.json({ success: true, data: list });
    }),

    http.get('/api/v1/workbooks/:id', async ({ params }) => {
        const { id } = params;
        await delay(200);
        const wb = workbooks.find(w => w.id === id);
        if (wb) return HttpResponse.json({ success: true, data: wb });
        return HttpResponse.json({ success: false, errors: [{ message: 'Workbook not found' }] }, { status: 404 });
    }),

    http.post('/api/v1/projects/:pid/workbooks', async ({ params, request }) => {
        const { pid } = params;
        const data = (await request.json()) as any;
        await delay(400);
        const wb = {
            id: makeId('wb'),
            projectId: pid,
            orgId: data.orgId || 'org_1',
            name: data.name || 'Untitled Workbook',
            status: 'draft',
            priority: data.priority || 'medium',
            tags: data.tags || [],
            createdBy: data.createdBy || 'user_1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sectionCount: 0,
            openCommentsCount: 0,
            revisionCount: 0,
            completionPct: 0,
            pdfUrl: data.pdfUrl || null,
        };
        workbooks.push(wb);
        return HttpResponse.json({ success: true, data: wb });
    }),

    http.put('/api/v1/workbooks/:id', async ({ params, request }) => {
        const { id } = params;
        const updates = (await request.json()) as any;
        await delay(300);
        const idx = workbooks.findIndex(w => w.id === id);
        if (idx !== -1) {
            workbooks[idx] = { ...workbooks[idx], ...updates, updatedAt: new Date().toISOString() };
            return HttpResponse.json({ success: true, data: workbooks[idx] });
        }
        return HttpResponse.json({ success: false, errors: [{ message: 'Workbook not found' }] }, { status: 404 });
    }),

    http.delete('/api/v1/workbooks/:id', async ({ params }) => {
        const { id } = params;
        await delay(300);
        const idx = workbooks.findIndex(w => w.id === id);
        if (idx !== -1) {
            workbooks.splice(idx, 1);
            return HttpResponse.json({ success: true });
        }
        return HttpResponse.json({ success: false, errors: [{ message: 'Workbook not found' }] }, { status: 404 });
    }),

    // PDF upload / parse endpoints
    http.post('/api/v1/workbooks/:id/upload/confirm', async ({ params }) => {
        const { id } = params;
        await delay(200);
        const jobId = createJob('queued');
        // keep a mapping in workbook record for status endpoint if needed
        const wb = workbooks.find(w => w.id === id);
        if (wb) {
            (wb as any).lastParseJobId = jobId;
        }
        return HttpResponse.json({ success: true, data: { job_id: jobId, poll_url: `/api/v1/jobs/${jobId}` } });
    }),

    http.get('/api/v1/workbooks/:id/parse/preview', async ({ params }) => {
        const { id } = params;
        await delay(300);
        // return list of sections from fixture filtered by workbookId
        const preview = sectionsPreviewData.filter((s: any) => s.workbookId === id);
        return HttpResponse.json({ success: true, data: preview });
    }),

    http.post('/api/v1/workbooks/:id/parse/confirm', async ({ params }) => {
        const { id } = params;
        await delay(300);
        // when user confirms preview, populate the live sections store
        const preview = sectionsPreviewData.filter((s: any) => s.workbookId === id);
        addPreviewSections(preview);
        const wb = workbooks.find(w => w.id === id);
        if (wb) {
            wb.sectionCount = (wb.sectionCount || 0) + preview.length;
        }
        return HttpResponse.json({ success: true, data: preview });
    }),

    http.get('/api/v1/workbooks/:id/parse/status', async ({ params }) => {
        const { id } = params;
        await delay(200);
        const wb = workbooks.find(w => w.id === id);
        if (!wb || !(wb as any).lastParseJobId) {
            return HttpResponse.json({ success: false, errors: [{ message: 'No active parse job' }] }, { status: 404 });
        }
        const jobId = (wb as any).lastParseJobId as string;
        const job = getJob(jobId);
        if (!job) {
            return HttpResponse.json({ success: false, errors: [{ message: 'Job not found' }] }, { status: 404 });
        }
        // mimic polling side effects
        job.callCount += 1;
        if (job.callCount <= 3) job.status = 'processing';
        else job.status = 'complete';
        return HttpResponse.json({ success: true, data: { job_id: jobId, status: job.status } });
    }),
];
