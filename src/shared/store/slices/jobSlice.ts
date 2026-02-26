import { StateCreator } from 'zustand';
import { BackgroundJob } from '@/shared/types';

export interface JobSlice {
    activeJobs: BackgroundJob[];
    addJob: (job: BackgroundJob) => void;
    updateJob: (id: string, updates: Partial<BackgroundJob>) => void;
    removeJob: (id: string) => void;
}

export const createJobSlice: StateCreator<JobSlice> = (set) => ({
    activeJobs: [],
    addJob: (job) => set((state) => ({ activeJobs: [...state.activeJobs, job] })),
    updateJob: (id, updates) => set((state) => ({
        activeJobs: state.activeJobs.map(j => j.id === id ? { ...j, ...updates } : j)
    })),
    removeJob: (id) => set((state) => ({
        activeJobs: state.activeJobs.filter(j => j.id !== id)
    })),
});
