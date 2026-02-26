import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges tailwind classes safely.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'ai' | 'agent';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-accent-primary text-bg-primary hover:shadow-glow focus:ring-accent-primary/50',
            secondary: 'border border-accent-primary text-accent-primary hover:bg-accent-primary/10 focus:ring-accent-primary/30',
            ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface focus:ring-surface/50',
            destructive: 'border border-error text-error hover:bg-error/10 focus:ring-error/30',
            ai: 'bg-gradient-to-r from-accent-tertiary to-[#9D50BB] text-white hover:shadow-[0_0_20px_rgba(123,47,190,0.4)] animate-pulse-cyan',
            agent: 'bg-gradient-to-r from-warning to-accent-secondary text-bg-primary font-semibold',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
            icon: 'p-2',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={loading || props.disabled}
                {...props}
            >
                {loading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
