import { StateCreator } from 'zustand';
import { Project, Workbook, Section } from '@/shared/types';

export interface ActiveContextSlice {
    projectId: string | null;
    workbookId: string | null;
    sectionId: string | null;
    project: Project | null;
    workbook: Workbook | null;
    section: Section | null;
    setActiveProject: (project: Project | null) => void;
    setActiveWorkbook: (workbook: Workbook | null) => void;
    setActiveSection: (section: Section | null) => void;
    clearContext: () => void;
}

export const createActiveContextSlice: StateCreator<ActiveContextSlice> = (set) => ({
    projectId: null,
    workbookId: null,
    sectionId: null,
    project: null,
    workbook: null,
    section: null,
    setActiveProject: (project) => set({
        project,
        projectId: project?.id || null,
        workbook: null,
        workbookId: null,
        section: null,
        sectionId: null
    }),
    setActiveWorkbook: (workbook) => set({
        workbook,
        workbookId: workbook?.id || null,
        section: null,
        sectionId: null
    }),
    setActiveSection: (section) => set({
        section,
        sectionId: section?.id || null
    }),
    clearContext: () => set({
        projectId: null,
        workbookId: null,
        sectionId: null,
        project: null,
        workbook: null,
        section: null
    }),
});
