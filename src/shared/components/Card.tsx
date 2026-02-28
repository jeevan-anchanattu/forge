import React from 'react';
import { cn } from './Button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    glass?: boolean;
    tilt?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, glass = true, tilt = false, children, ...props }, ref) => {
        const localRef = React.useRef<HTMLDivElement>(null);
        const combinedRef = (ref as React.RefObject<HTMLDivElement>) || localRef;

        React.useEffect(() => {
            if (!tilt || !combinedRef.current) return;
            const card = combinedRef.current;

            const handleMouseMove = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect();
                const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
                const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            };

            const handleMouseLeave = () => {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            };
        }, [tilt]);

        return (
            <div
                ref={combinedRef}
                className={cn(
                    'rounded-xl border border-border-subtle bg-bg-card transition-all duration-300',
                    glass && 'backdrop-blur-xl bg-opacity-80',
                    'hover:border-accent-primary/30 hover:shadow-card',
                    tilt && 'transition-[transform] duration-75',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
