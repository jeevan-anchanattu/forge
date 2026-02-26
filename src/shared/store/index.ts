import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createOrgSlice, OrgSlice } from './slices/orgSlice';
import { createActiveContextSlice, ActiveContextSlice } from './slices/activeContextSlice';
import { createUISlice, UISlice } from './slices/uiSlice';
import { createAISlice, AISlice } from './slices/aiSlice';
import { createNotificationSlice, NotificationSlice } from './slices/notificationSlice';
import { createJobSlice, JobSlice } from './slices/jobSlice';

export type ForgeStore = AuthSlice &
    OrgSlice &
    ActiveContextSlice &
    UISlice &
    AISlice &
    NotificationSlice &
    JobSlice;

export const useForgeStore = create<ForgeStore>()(
    persist(
        (...a) => ({
            ...createAuthSlice(...a),
            ...createOrgSlice(...a),
            ...createActiveContextSlice(...a),
            ...createUISlice(...a),
            ...createAISlice(...a),
            ...createNotificationSlice(...a),
            ...createJobSlice(...a),
        }),
        {
            name: 'forge-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                // Only persist UI settings and some auth state
                theme: state.theme,
                sidebarExpanded: state.sidebarExpanded,
                aiPanelWidth: state.aiPanelWidth,
                pdfPanelWidth: state.pdfPanelWidth,
                reviewPanelWidth: state.reviewPanelWidth,
                user: state.user,
                token: state.token,
                sessionLocked: state.sessionLocked,
            }),
        }
    )
);
