import React from 'react';
import { cn } from './Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="space-y-1.5 w-full">
                {label && (
                    <label className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-border-subtle bg-surface px-3 py-2 text-sm text-text-primary ring-offset-bg-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary/40 focus:border-accent-primary/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                        error && 'border-error focus:ring-error/40',
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-xs text-error">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
