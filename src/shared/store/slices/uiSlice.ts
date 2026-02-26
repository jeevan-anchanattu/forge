import { StateCreator } from 'zustand';
import { Theme } from '@/shared/types';

export interface UISlice {
    theme: Theme;
    sidebarExpanded: boolean;
    aiPanelOpen: boolean;
    aiPanelWidth: number;
    pdfPanelOpen: boolean;
    pdfPanelWidth: number;
    reviewPanelOpen: boolean;
    reviewPanelWidth: number;
    setTheme: (theme: Theme) => void;
    toggleSidebar: () => void;
    toggleAIPanel: () => void;
    setAIPanelWidth: (width: number) => void;
    togglePDFPanel: () => void;
    setPDFPanelWidth: (width: number) => void;
    toggleReviewPanel: () => void;
    setReviewPanelWidth: (width: number) => void;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
    theme: 'dark',
    sidebarExpanded: true,
    aiPanelOpen: false,
    aiPanelWidth: 320,
    pdfPanelOpen: true,
    pdfPanelWidth: 400,
    reviewPanelOpen: false,
    reviewPanelWidth: 320,
    setTheme: (theme) => set({ theme }),
    toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
    toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
    setAIPanelWidth: (width) => set({ aiPanelWidth: width }),
    togglePDFPanel: () => set((state) => ({ pdfPanelOpen: !state.pdfPanelOpen })),
    setPDFPanelWidth: (width) => set({ pdfPanelWidth: width }),
    toggleReviewPanel: () => set((state) => ({ reviewPanelOpen: !state.reviewPanelOpen })),
    setReviewPanelWidth: (width) => set({ reviewPanelWidth: width }),
});
