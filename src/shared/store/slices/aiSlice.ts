import { StateCreator } from 'zustand';
import { AIContextMemoryPoint, AIMessage } from '@/shared/types';

export interface AISlice {
    memoryPoints: AIContextMemoryPoint[];
    messages: AIMessage[];
    isThinking: boolean;
    addMemoryPoint: (point: AIContextMemoryPoint) => void;
    addMessage: (message: AIMessage) => void;
    clearHistory: () => void;
    setThinking: (thinking: boolean) => void;
}

export const createAISlice: StateCreator<AISlice> = (set) => ({
    memoryPoints: [],
    messages: [],
    isThinking: false,
    addMemoryPoint: (point) => set((state) => ({ memoryPoints: [...state.memoryPoints, point] })),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    clearHistory: () => set({ messages: [] }),
    setThinking: (thinking) => set({ isThinking: thinking }),
});
