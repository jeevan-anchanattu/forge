import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Minimize2 } from 'lucide-react';

interface PanelCollapseToggleProps {
    panel: 'pdf' | 'ai';
    className?: string;
    title?: string;
    isCollapsed?: boolean;
    onToggle?: (collapsed: boolean) => void;
}

export const PanelCollapseToggle: React.FC<PanelCollapseToggleProps> = ({
    panel,
    className,
    title,
    isCollapsed: controlledCollapsed,
    onToggle
}) => {
    const varName = `--${panel}-w`;
    const min = panel === 'pdf' ? 48 : 0;
    const defaultWidth = panel === 'pdf' ? 450 : 320;

    // Internal state if not controlled
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

    const [width, setWidth] = useState(defaultWidth);

    useEffect(() => {
        const root = document.documentElement;
        const val = parseFloat(getComputedStyle(root).getPropertyValue(varName)) || defaultWidth;
        if (val > min) setWidth(val);
    }, [varName, min, defaultWidth]);

    useEffect(() => {
        const root = document.documentElement;
        const newW = isCollapsed ? min : width;
        root.style.setProperty(varName, `${newW}px`);
    }, [isCollapsed, width, varName, min]);

    const handleToggle = () => {
        if (onToggle) {
            onToggle(!isCollapsed);
        } else {
            setInternalCollapsed(!isCollapsed);
        }
    };

    const isLeft = panel === 'pdf';

    return (
        <button
            className={`p-1.5 rounded-lg hover:bg-surface transition-all text-text-tertiary hover:text-text-primary ${className || ''}`}
            onClick={handleToggle}
            title={title || (isCollapsed ? 'Expand Panel' : 'Minimize Panel')}
        >
            {isCollapsed ? (
                isLeft ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            ) : (
                <Minimize2 className="h-4 w-4" />
            )}
        </button>
    );
};