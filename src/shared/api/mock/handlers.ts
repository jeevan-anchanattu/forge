import { authHandlers } from './handlers/auth.handlers';
import { orgHandlers } from './handlers/org.handlers';
import { projectHandlers } from './handlers/project.handlers';
import { dashboardHandlers } from './handlers/dashboard.handlers';
import { workbookHandlers } from './handlers/workbook.handlers';
import { sectionHandlers } from './handlers/section.handlers';
import { revisionHandlers } from './handlers/revision.handlers';
import { jobHandlers } from './handlers/job.handlers';
import { HttpResponse, http } from 'msw';

export const handlers = [
    ...authHandlers,
    ...orgHandlers,
    ...projectHandlers,
    ...dashboardHandlers,
    ...workbookHandlers,
    ...sectionHandlers,
    ...revisionHandlers,
    ...jobHandlers,
    http.get('/api/v1/health', () => {
        return HttpResponse.json({ status: 'ok' });
    }),
];
