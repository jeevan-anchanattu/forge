import React from 'react';

interface PanelResizerProps {
    panel: 'pdf' | 'ai';
}

export const PanelResizer: React.FC<PanelResizerProps> = ({ panel }) => {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;

        const root = document.documentElement;
        const getWidth = () => parseFloat(getComputedStyle(root).getPropertyValue(`--${panel}-w`)) || 0;
        const min = panel === 'pdf' ? 48 : 0;
        const max = panel === 'pdf' ? 600 : 480;

        const onMouseMove = (moveEvt: MouseEvent) => {
            let newWidth;
            if (panel === 'pdf') {
                newWidth = moveEvt.clientX;
            } else {
                newWidth = window.innerWidth - moveEvt.clientX;
            }
            if (newWidth < min) newWidth = min;
            if (newWidth > max) newWidth = max;
            root.style.setProperty(`--${panel}-w`, `${newWidth}px`);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.body.style.cursor = '';
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.body.style.cursor = 'ew-resize';
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            className="absolute top-0 bottom-0 w-1 cursor-ew-resize hover:bg-accent-primary/40 bg-transparent"
            style={{
                [panel === 'pdf' ? 'right' : 'left']: 0,
            } as React.CSSProperties}
        />
    );
};