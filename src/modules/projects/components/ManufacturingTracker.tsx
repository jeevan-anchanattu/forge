import React from 'react';
import { Card } from '@/shared/components/Card';

export const KanbanTracker = ({ project }: { project: any }) => {
    // Basic placeholder so the router doesn’t crash before full implementation
    return (
        <Card className="p-6">
            <h2 className="text-xl font-bold">Manufacturing Tracker (Coming Soon)</h2>
            <p className="text-text-secondary text-sm">Requires status: manufacturing_review or greater.</p>
        </Card>
    );
};

export const ManufacturingTracker = KanbanTracker;
