import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from './Button';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
    zIndex?: number;
    useFullscreenPortal?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className, zIndex, useFullscreenPortal }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-bg-primary/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            style={{ zIndex: zIndex || 9999 }}
        >
            <div
                className={cn(
                    "w-full max-w-md bg-bg-card border border-border-subtle rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200",
                    className
                )}
            >
                <div className="flex items-center justify-between p-4 border-b border-border-subtle">
                    <h3 className="text-lg font-bold text-text-primary capitalize-first">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-text-tertiary hover:text-text-primary transition-colors rounded-lg hover:bg-surface"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>,
        (useFullscreenPortal && document.fullscreenElement as HTMLElement) || document.body
    );
};
