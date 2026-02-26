import { useEffect, useCallback } from 'react';
import { useForgeStore } from '@/shared/store';

const DEFAULT_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export function useSessionLock() {
    const { isAuthenticated, user, lockSession, sessionLocked } = useForgeStore();

    const handleIdle = useCallback(() => {
        if (isAuthenticated && !sessionLocked) {
            lockSession();
        }
    }, [isAuthenticated, sessionLocked, lockSession]);

    useEffect(() => {
        if (!isAuthenticated) return;

        let timeoutId: number;
        const timeout = DEFAULT_TIMEOUT; // In a real app, this would be from user preferences

        const resetTimer = () => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(handleIdle, timeout);
        };

        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        events.forEach(event => document.addEventListener(event, resetTimer));

        resetTimer();

        return () => {
            window.clearTimeout(timeoutId);
            events.forEach(event => document.removeEventListener(event, resetTimer));
        };
    }, [isAuthenticated, handleIdle]);
}
