import { http, HttpResponse, delay } from 'msw';
import revisionsData from '../fixtures/revisions.json';

let revisions: any[] = [...revisionsData];

export const revisionHandlers = [
    // list revisions for a workbook
    http.get('/api/v1/workbooks/:id/revisions', async ({ params }) => {
        const { id } = params;
        await delay(200);
        const list = revisions.filter(r => r.workbookId === id);
        return HttpResponse.json({ success: true, data: list });
    }),

    // get a single revision
    http.get('/api/v1/revisions/:id', async ({ params }) => {
        const { id } = params;
        await delay(200);
        const rev = revisions.find(r => r.id === id);
        if (rev) return HttpResponse.json({ success: true, data: rev });
        return HttpResponse.json({ success: false, errors: [{ message: 'Revision not found' }] }, { status: 404 });
    }),
];