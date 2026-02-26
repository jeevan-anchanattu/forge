import { StateCreator } from 'zustand';
import { Notification } from '@/shared/types';

export interface NotificationSlice {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (notification: Notification) => void;
    markRead: (id: string) => void;
    markAllRead: () => void;
}

export const createNotificationSlice: StateCreator<NotificationSlice> = (set) => ({
    notifications: [],
    unreadCount: 0,
    addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + (notification.isRead ? 0 : 1)
    })),
    markRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n),
        unreadCount: Math.max(0, state.unreadCount - 1)
    })),
    markAllRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, isRead: true })),
        unreadCount: 0
    })),
});
