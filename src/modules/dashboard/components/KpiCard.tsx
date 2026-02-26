import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Card } from '@/shared/components/Card';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/shared/components/Button'; // reusing cn

interface KpiCardProps {
    title: string;
    value: number;
    suffix?: string;
    prefix?: string;
    delta?: number;
    trend?: 'up' | 'down' | 'flat';
    icon: LucideIcon;
    decimalPlaces?: number;
}

export const KpiCard: React.FC<KpiCardProps> = ({
    title,
    value,
    suffix = '',
    prefix = '',
    delta,
    trend,
    icon: Icon,
    decimalPlaces = 0
}) => {
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (counterRef.current) {
            anime({
                targets: counterRef.current,
                innerHTML: [0, value],
                round: decimalPlaces === 0 ? 1 : 10 ** decimalPlaces,
                duration: 800,
                easing: 'easeOutExpo',
                update: function (a) {
                    if (counterRef.current) {
                        const val = parseFloat(a.animations[0].currentValue);
                        counterRef.current.innerHTML = `${prefix}${val.toFixed(decimalPlaces)}${suffix}`;
                    }
                }
            });
        }
    }, [value, prefix, suffix, decimalPlaces]);

    return (
        <Card className="p-5 flex flex-col space-y-4 hover:border-accent-primary/30 transition-colors group">
            <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">{title}</span>
                <div className="h-8 w-8 rounded-lg bg-surface flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
                    <Icon className="h-4 w-4 text-text-tertiary group-hover:text-accent-primary transition-colors" />
                </div>
            </div>

            <div className="flex flex-col space-y-1">
                <div
                    ref={counterRef}
                    className="text-3xl font-display font-bold text-text-primary tracking-tight"
                >
                    {prefix}0{suffix}
                </div>

                {delta !== undefined && trend && (
                    <div className="flex items-center space-x-1.5 mt-2">
                        <div className={cn(
                            "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                            trend === 'up' ? "text-success bg-success/10" :
                                trend === 'down' ? "text-error bg-error/10" :
                                    "text-text-tertiary bg-surface"
                        )}>
                            {trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                            {trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                            {trend === 'flat' && <Minus className="h-3 w-3 mr-1" />}
                            {delta > 0 ? '+' : ''}{delta}%
                        </div>
                        <span className="text-[10px] text-text-tertiary">vs last 30 days</span>
                    </div>
                )}
            </div>
        </Card>
    );
};
