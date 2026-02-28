import { http, HttpResponse, delay } from 'msw';
import sectionsData from '../fixtures/sections.json';

let sections: any[] = [...sectionsData];

export function addPreviewSections(newSections: any[]) {
    // avoid duplicates by id
    newSections.forEach(ns => {
        if (!sections.find(s => s.id === ns.id)) {
            sections.push(ns);
        }
    });
}

const makeId = (prefix = 'sec') => `${prefix}_${Math.random().toString(36).substring(2, 10)}`;

export const sectionHandlers = [
    // list all sections for a workbook
    http.get('/api/v1/workbooks/:id/sections', async ({ params }) => {
        const { id } = params;
        await delay(200);
        const list = sections.filter(s => s.workbookId === id);
        return HttpResponse.json({ success: true, data: list });
    }),

    // add manual section
    http.post('/api/v1/workbooks/:id/sections', async ({ params, request }) => {
        const { id } = params;
        const payload: any = await request.json();
        await delay(300);
        const newSection = {
            id: makeId(),
            workbookId: id,
            name: payload.name || 'New Section',
            status: 'draft',
            sortOrder: sections.filter(s => s.workbookId === id).length + 1,
            isManual: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...payload,
            thumbnailUrl: payload.thumbnailUrl || `https://picsum.photos/400/300?random=${Math.random()}`,
        };
        sections.push(newSection);
        return HttpResponse.json({ success: true, data: newSection });
    }),

    http.get('/api/v1/sections/:id', async ({ params }) => {
        const { id } = params;
        await delay(200);
        const sec = sections.find(s => s.id === id);
        if (sec) return HttpResponse.json({ success: true, data: sec });
        return HttpResponse.json({ success: false, errors: [{ message: 'Section not found' }] }, { status: 404 });
    }),

    http.put('/api/v1/sections/:id', async ({ params, request }) => {
        const { id } = params;
        const updates: any = await request.json();
        await delay(200);
        const idx = sections.findIndex(s => s.id === id);
        if (idx !== -1) {
            sections[idx] = { ...sections[idx], ...updates, updatedAt: new Date().toISOString() };
            return HttpResponse.json({ success: true, data: sections[idx] });
        }
        return HttpResponse.json({ success: false, errors: [{ message: 'Section not found' }] }, { status: 404 });
    }),

    http.delete('/api/v1/sections/:id', async ({ params }) => {
        const { id } = params;
        await delay(200);
        const idx = sections.findIndex(s => s.id === id);
        if (idx !== -1) {
            sections.splice(idx, 1);
            return HttpResponse.json({ success: true });
        }
        return HttpResponse.json({ success: false, errors: [{ message: 'Section not found' }] }, { status: 404 });
    }),

    http.put('/api/v1/sections/:id/status', async ({ params, request }) => {
        const { id } = params;
        const body: any = await request.json();
        const status = body.status;
        await delay(200);
        const idx = sections.findIndex(s => s.id === id);
        if (idx !== -1) {
            sections[idx] = { ...sections[idx], status, updatedAt: new Date().toISOString() };
            return HttpResponse.json({ success: true, data: sections[idx] });
        }
        return HttpResponse.json({ success: false, errors: [{ message: 'Section not found' }] }, { status: 404 });
    }),
];
