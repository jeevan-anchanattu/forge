import React from 'react';
import { NavLink } from 'react-router-dom';
import { useForgeStore } from '@/shared/store';
import { cn } from '@/shared/components/Button';
import {
    LayoutDashboard,
    Briefcase,
    Package,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
    const { sidebarExpanded, toggleSidebar, org } = useForgeStore();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Briefcase, label: 'Projects', path: '/projects' },
        { icon: Package, label: 'Inventory', path: '/inventory' },
        { icon: BarChart3, label: 'Reports', path: '/reports' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 h-screen bg-bg-secondary border-r border-border-subtle transition-all duration-300 ease-in-out z-50 flex flex-col',
                sidebarExpanded ? 'w-[260px]' : 'w-[64px]'
            )}
        >
            {/* Header / Org Logo */}
            <div className="h-[64px] flex items-center px-3 border-b border-border-subtle">
                <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="h-10 w-10 min-w-[40px] rounded-lg bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20 shadow-glow overflow-hidden">
                        {org?.logoUrl ? (
                            <img src={org.logoUrl} alt={org.name} className="h-full w-full object-cover" />
                        ) : (
                            <ShieldCheck className="h-6 w-6 text-accent-primary" />
                        )}
                    </div>
                    {sidebarExpanded && (
                        <div className="flex flex-col whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                            <span className="text-sm font-display font-bold text-text-primary uppercase tracking-tight">
                                {org?.name || 'FORGE'}
                            </span>
                            <span className="text-[10px] text-accent-primary font-mono font-bold tracking-widest uppercase opacity-70">
                                {org?.subscriptionTier || 'PROFESSIONAL'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2 custom-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center rounded-lg transition-all duration-200 group relative',
                                sidebarExpanded ? 'px-3 h-11' : 'justify-center w-10 h-10',
                                isActive
                                    ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20 shadow-glow-sm'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                            )
                        }
                    >
                        <item.icon className={cn('h-5 w-5', !sidebarExpanded && 'h-6 w-6')} />
                        {sidebarExpanded && (
                            <span className="ml-3 text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                                {item.label}
                            </span>
                        )}

                        {!sidebarExpanded && (
                            <div className="absolute left-[70px] bg-bg-card border border-border-subtle px-2 py-1 rounded text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                                {item.label}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / Toggle */}
            <div className="p-3 border-t border-border-subtle">
                <button
                    onClick={toggleSidebar}
                    className="flex items-center justify-center w-full h-10 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors"
                >
                    {sidebarExpanded ? (
                        <div className="flex items-center justify-between w-full px-2">
                            <span className="text-xs uppercase font-bold tracking-widest">Collapse</span>
                            <ChevronLeft className="h-4 w-4" />
                        </div>
                    ) : (
                        <ChevronRight className="h-5 w-5" />
                    )}
                </button>
            </div>
        </aside>
    );
};
