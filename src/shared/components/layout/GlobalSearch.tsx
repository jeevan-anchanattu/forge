import React, { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';
import { cn } from '@/shared/components/Button';

export const GlobalSearch: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative max-w-md w-full">
            <div
                className="flex items-center h-9 px-3 bg-surface border border-border-subtle rounded-md text-text-tertiary hover:border-accent-primary/30 hover:bg-surface/80 cursor-pointer transition-all group"
                onClick={() => setIsOpen(true)}
            >
                <Search className="h-4 w-4 mr-2 group-hover:text-accent-primary transition-colors" />
                <span className="text-xs flex-1">Search anything... (Cmd+K)</span>
                <div className="hidden sm:flex items-center px-1.5 py-0.5 rounded border border-border-subtle bg-bg-secondary text-[10px] font-mono leading-none">
                    <Command className="h-2.5 w-2.5 mr-1" />
                    <span>K</span>
                </div>
            </div>

            {/* Command Palette Placeholder */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] bg-bg-primary/80 backdrop-blur-sm flex items-start justify-center pt-[15vh] p-6"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="w-full max-w-2xl bg-bg-card border border-border-subtle rounded-xl shadow-2xl p-4 flex flex-col space-y-4 animate-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center border-b border-border-subtle pb-3">
                            <Search className="h-5 w-5 text-accent-primary mr-3" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Type to search (projects, workbooks, specs...)"
                                className="flex-1 bg-transparent border-none outline-none text-text-primary text-lg"
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') setIsOpen(false);
                                    if (e.key === 'Enter') {
                                        // Mock selection
                                        setIsOpen(false);
                                    }
                                }}
                            />
                        </div>
                        <div className="text-[10px] text-text-tertiary uppercase font-bold tracking-widest px-2">
                            Recent Searches
                        </div>
                        <div className="flex flex-col space-y-1">
                            {['CPF#8250016-6B1', 'Material Grade A36', 'Weld Procedure Specs'].map(item => (
                                <div
                                    key={item}
                                    onClick={() => setIsOpen(false)}
                                    className="px-3 py-2 rounded-lg hover:bg-surface text-sm text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[10px] text-text-tertiary">
                            <div className="flex items-center space-x-2">
                                <span>ESC to close</span>
                                <span>•</span>
                                <span>ENTER to select</span>
                            </div>
                            <span className="font-mono text-accent-primary">FORGE INTELLIGENCE SEARCH</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
