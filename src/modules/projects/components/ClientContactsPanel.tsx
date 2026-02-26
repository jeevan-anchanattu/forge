import React from 'react';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { Plus, X } from 'lucide-react';
import { ClientContact } from '@/shared/types';

interface Props {
    contacts: ClientContact[];
    isEditing: boolean;
    setContacts: (contacts: ClientContact[]) => void;
    disabled?: boolean;
}

export const ClientContactsPanel: React.FC<Props> = ({ contacts, isEditing, setContacts, disabled }) => {
    const updateContact = (index: number, changes: Partial<ClientContact>) => {
        const updated = [...contacts];
        // allow string address for editing convenience
        updated[index] = { ...updated[index], ...changes } as any;
        setContacts(updated);
    };

    const addContact = () => {
        setContacts([
            ...contacts,
            { name: '', title: '', email: '', phone: '', companyAddress: '', isPrimary: false }
        ] as ClientContact[]);
    };

    const removeContact = (index: number) => {
        setContacts(contacts.filter((_, i) => i !== index));
    };

    const markPrimary = (index: number) => {
        const updated = contacts.map((c, i) => ({ ...c, isPrimary: i === index }));
        setContacts(updated as ClientContact[]);
    };

    if (!contacts || contacts.length === 0) {
        if (!isEditing) {
            return <p className="text-sm text-text-tertiary">No client contacts defined.</p>;
        }
    }

    if (!isEditing) {
        return (
            <div className="space-y-4">
                {contacts.map((c, i) => (
                    <div key={i} className="border border-border-subtle rounded-lg p-4">
                        <div className="flex justify-between">
                            <span className="font-medium text-text-primary">{c.name}</span>
                            {c.isPrimary && <span className="text-xs text-success uppercase">Primary</span>}
                        </div>
                        <div className="text-sm text-text-secondary mt-1">
                            {c.title && <div>{c.title}</div>}
                            {c.email && <div><a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a></div>}
                            {c.phone && <div><a href={`tel:${c.phone}`} className="hover:underline">{c.phone}</a></div>}
                            {(c as any).companyAddress && <div>{(c as any).companyAddress}</div>}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {contacts.map((c, i) => (
                <div key={i} className="relative border border-border-subtle rounded-lg p-4">
                    {isEditing && !disabled && (
                        <button
                            onClick={() => removeContact(i)}
                            className="absolute top-2 right-2 text-text-tertiary hover:text-error"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    <div className="space-y-2">
                        <Input
                            label="Name"
                            value={c.name}
                            onChange={e => updateContact(i, { name: e.target.value })}
                            disabled={!isEditing || disabled}
                        />
                        <Input
                            label="Title"
                            value={c.title || ''}
                            onChange={e => updateContact(i, { title: e.target.value })}
                            disabled={!isEditing || disabled}
                        />
                        <Input
                            label="Email"
                            value={c.email || ''}
                            onChange={e => updateContact(i, { email: e.target.value })}
                            disabled={!isEditing || disabled}
                        />
                        <Input
                            label="Phone"
                            value={c.phone || ''}
                            onChange={e => updateContact(i, { phone: e.target.value })}
                            disabled={!isEditing || disabled}
                        />
                        <Input
                            label="Address"
                            value={(c as any).companyAddress || ''}
                            onChange={e => updateContact(i, { companyAddress: e.target.value as any })}
                            disabled={!isEditing || disabled}
                        />
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                checked={c.isPrimary}
                                onChange={() => markPrimary(i)}
                                disabled={!isEditing || disabled}
                            />
                            <label className="text-sm">Primary contact</label>
                        </div>
                    </div>
                </div>
            ))}

            {isEditing && !disabled && (
                <Button variant="ghost" size="sm" onClick={addContact} className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" /> Add Contact
                </Button>
            )}
        </div>
    );
};
