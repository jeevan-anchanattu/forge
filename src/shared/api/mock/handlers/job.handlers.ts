import { http, HttpResponse, delay } from 'msw';

// central store for all background jobs
interface JobState { callCount: number; status: string; }
const jobs: Record<string, JobState> = {};

export function createJob(initialStatus: string = 'queued') {
    const id = `job_${Math.random().toString(36).substr(2, 8)}`;
    jobs[id] = { callCount: 0, status: initialStatus };
    return id;
}

export function getJob(id: string) {
    return jobs[id];
}

export const jobHandlers = [
    http.post('/api/v1/jobs', async ({ request }) => {
        const body: any = await request.json();
        const id = createJob(body.status || 'queued');
        await delay(100);
        return HttpResponse.json({ success: true, data: { job_id: id, status: jobs[id].status } });
    }),

    http.get('/api/v1/jobs/:id', async ({ params }) => {
        const { id } = params;
        await delay(200);
        const job = jobs[id];
        if (!job) {
            return HttpResponse.json({ success: false, errors: [{ message: 'Job not found' }] }, { status: 404 });
        }
        job.callCount += 1;
        if (job.callCount <= 3) {
            job.status = 'processing';
        } else {
            job.status = 'complete';
        }
        return HttpResponse.json({ success: true, data: { job_id: id, status: job.status } });
    }),
];
