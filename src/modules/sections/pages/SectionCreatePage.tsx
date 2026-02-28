import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/shared/api';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';

export const SectionCreatePage: React.FC = () => {
    const { workbookId } = useParams<{ workbookId: string }>();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!workbookId) return;
        setSubmitting(true);
        try {
            const res = await api.post(`workbooks/${workbookId}/sections`, { name });
            const newSec = res.data.data;
            navigate(`/workbooks/${workbookId}/sections/${newSec.id}`);
        } catch (err:any) {
            setError(err?.message || 'Failed to create section');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-display font-bold">Add Manual Section</h1>
            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary">Section Name</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Notes, Appendix A"
                            required
                        />
                    </div>
                    {error && <div className="text-sm text-error">{error}</div>}
                    <div className="flex justify-end">
                        <Button type="submit" disabled={submitting || !name}>
                            {submitting ? 'Adding...' : 'Add Section'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};