import { StateCreator } from 'zustand';
import { User, OrgRole } from '@/shared/types';

export interface AuthSlice {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    sessionLocked: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    lockSession: () => void;
    unlockSession: () => void;
    logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
    user: null,
    isAuthenticated: false,
    token: null,
    sessionLocked: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setToken: (token) => set({ token }),
    lockSession: () => set({ sessionLocked: true }),
    unlockSession: () => set({ sessionLocked: false }),
    logout: () => set({ user: null, isAuthenticated: false, token: null, sessionLocked: false }),
});
