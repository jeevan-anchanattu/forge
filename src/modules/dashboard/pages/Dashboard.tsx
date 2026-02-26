import React, { useEffect, useState } from 'react';
import { KpiCard } from '../components/KpiCard';
import { Card } from '@/shared/components/Card';
import api from '@/shared/api';
import {
    Briefcase, ListTodo, CalendarClock,
    FileSignature, Clock, Activity, LucideIcon
} from 'lucide-react';

interface KpiData {
    activeProjects: { value: number, delta: number, trend: 'up' | 'down' | 'flat' };
    openItems: { value: number, delta: number, trend: 'up' | 'down' | 'flat' };
    dueThisWeek: { value: number, delta: number, trend: 'up' | 'down' | 'flat' };
    quotesPending: { value: number, delta: number, trend: 'up' | 'down' | 'flat' };
    hoursLogged: { value: number, delta: number, trend: 'up' | 'down' | 'flat' };
    onTimeRate: { value: number, delta: number, trend: 'up' | 'down' | 'flat' };
}

interface ActivityItem {
    id: string;
    user: string;
    action: string;
    timestamp: string;
}

const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
};

export const DashboardPage: React.FC = () => {
    const [kpis, setKpis] = useState<KpiData | null>(null);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [kpiRes, actRes] = await Promise.all([
                    api.get('dashboard/kpis'),
                    api.get('dashboard/activity')
                ]);
                setKpis(kpiRes.data?.data || null);
                setActivities(actRes.data?.data || []);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="p-8 text-text-secondary animate-pulse">Initializing Command Center...</div>;
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">Command Center</h1>
                    <p className="text-text-secondary">Overview of facility operations and active metrics.</p>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpis && (
                    <>
                        <KpiCard title="Active Projects" value={kpis.activeProjects.value} delta={kpis.activeProjects.delta} trend={kpis.activeProjects.trend} icon={Briefcase as LucideIcon} />
                        <KpiCard title="Open Items" value={kpis.openItems.value} delta={kpis.openItems.delta} trend={kpis.openItems.trend} icon={ListTodo as LucideIcon} />
                        <KpiCard title="Due This Week" value={kpis.dueThisWeek.value} delta={kpis.dueThisWeek.delta} trend={kpis.dueThisWeek.trend} icon={CalendarClock as LucideIcon} />
                        <KpiCard title="Quotes Pending" value={kpis.quotesPending.value} delta={kpis.quotesPending.delta} trend={kpis.quotesPending.trend} icon={FileSignature as LucideIcon} />
                        <KpiCard title="Hours Logged" value={kpis.hoursLogged.value} delta={kpis.hoursLogged.delta} trend={kpis.hoursLogged.trend} icon={Clock as LucideIcon} suffix="h" />
                        <KpiCard title="On-Time Rate" value={kpis.onTimeRate.value} delta={kpis.onTimeRate.delta} trend={kpis.onTimeRate.trend} icon={Activity as LucideIcon} suffix="%" decimalPlaces={1} />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area (Projects Grid Placeholder) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6 min-h-[400px] flex flex-col">
                        <h3 className="text-lg font-bold text-text-primary uppercase tracking-tight border-b border-border-subtle pb-4 mb-4">Priority Projects</h3>
                        <div className="flex-1 flex items-center justify-center text-text-tertiary border-2 border-dashed border-border-subtle rounded-xl">
                            Project Grid (Load from Projects Module)
                        </div>
                    </Card>
                </div>

                {/* Activity Feed Sidebar */}
                <aside className="space-y-6">
                    <Card className="p-6">
                        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest border-b border-border-subtle pb-4 mb-4">Activity Feed</h3>
                        <div className="space-y-4">
                            {(activities || []).map((act) => (
                                <div key={act.id} className="flex space-x-3 group">
                                    <div className="mt-1">
                                        <div className="h-2 w-2 rounded-full bg-accent-primary/50 group-hover:bg-accent-primary transition-colors shadow-glow-sm" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm text-text-primary"><span className="font-bold text-accent-primary mr-1">{act.user}</span>{act.action}</p>
                                        <p className="text-[10px] uppercase tracking-widest text-text-tertiary">{formatTimeAgo(act.timestamp)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
};
