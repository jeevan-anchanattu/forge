import React, { useState, useMemo } from 'react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { CheckCircle2, AlertCircle, HelpCircle, ExternalLink, RefreshCcw, Info, MessageSquare, ClipboardList, Download, Plus, FileJson, FileSpreadsheet, Edit2 } from 'lucide-react';
import { Button } from '@/shared/components/Button';

export interface SpecItem {
    id: string;
    parameter?: string;
    extractedValue?: string;
    verifiedValue?: string;
    unit?: string;
    confidence?: 'high' | 'medium' | 'low';
    description?: string;
    instructions?: string;
    remarks?: string;
    tolerance?: string;
    material?: string;
    standard?: string;
    surfaceFinish?: string;
    [key: string]: any;
}

interface SpecTableProps {
    data: SpecItem[];
    onUpdate: (id: string, field: string, value: string) => void;
    onHighlight: (id: string) => void;
    onAddRow: () => void;
    highlightedId?: string | null;
}

const columnHelper = createColumnHelper<SpecItem>();

interface EditableCellProps {
    value: any;
    id: string;
    field: string;
    onUpdate: (id: string, field: string, value: string) => void;
    isEditing: boolean;
    setEditing: (editing: boolean) => void;
    className?: string;
    placeholder?: string;
    type?: 'text' | 'number';
}

const EditableCell: React.FC<EditableCellProps> = ({ value, id, field, onUpdate, isEditing, setEditing, className = "", placeholder = "—", type = "text" }) => {
    const [localValue, setLocalValue] = useState(value?.toString() || "");

    if (isEditing) {
        return (
            <input
                autoFocus
                type={type}
                className={`w-full bg-surface border border-accent-primary rounded px-2 py-1 text-xs focus:outline-none shadow-sm ${className}`}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={() => {
                    onUpdate(id, field, localValue);
                    setEditing(false);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onUpdate(id, field, localValue);
                        setEditing(false);
                    }
                    if (e.key === 'Escape') {
                        setLocalValue(value?.toString() || "");
                        setEditing(false);
                    }
                }}
            />
        );
    }

    const displayValue = typeof value === 'object' ? JSON.stringify(value) : (value?.toString() || placeholder);

    return (
        <div
            className={`group flex items-center gap-2 cursor-pointer hover:bg-surface/50 rounded px-1 -mx-1 transition-colors min-h-[28px] ${className}`}
            onClick={() => {
                setLocalValue(value?.toString() || "");
                setEditing(true);
            }}
        >
            <span className="truncate flex-1">{displayValue}</span>
            <Edit2 className="h-2.5 w-2.5 opacity-0 group-hover:opacity-40 text-text-tertiary shrink-0" />
        </div>
    );
};

export const SpecTable: React.FC<SpecTableProps> = ({ data, onUpdate, onHighlight, onAddRow, highlightedId }) => {
    const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);

    // Dynamic Column Discovery
    const dynamicColumns = useMemo(() => {
        const coreKeys = ['id', 'parameter', 'extractedValue', 'verifiedValue', 'unit', 'confidence', 'description', 'instructions', 'remarks', 'tolerance', 'material', 'standard', 'surfaceFinish', 'boundsJson'];
        const allKeys = new Set<string>();
        data.forEach(item => {
            Object.keys(item).forEach(key => {
                if (!coreKeys.includes(key)) {
                    allKeys.add(key);
                }
            });
        });

        // Helper to check if data exists
        const hasData = (key: string) => data.some(item => item[key] !== undefined && item[key] !== null && item[key] !== '');

        const cols = [
            // Index
            columnHelper.accessor('id', {
                id: 'index',
                header: '#',
                cell: info => <span className="text-[10px] uppercase text-text-tertiary w-6 inline-block">{(info.row.index + 1).toString().padStart(2, '0')}</span>,
            }),

            // Parameter
            columnHelper.accessor('parameter', {
                header: 'Parameter',
                cell: info => (
                    <EditableCell
                        value={info.getValue()}
                        id={info.row.original.id}
                        field="parameter"
                        onUpdate={onUpdate}
                        isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'parameter'}
                        setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'parameter' } : null)}
                        className="font-bold text-text-primary text-xs"
                    />
                ),
            }),

            // Tolerance
            ...(hasData('tolerance') ? [
                columnHelper.accessor('tolerance', {
                    header: 'Tolerance',
                    cell: info => (
                        <EditableCell
                            value={info.getValue()}
                            id={info.row.original.id}
                            field="tolerance"
                            onUpdate={onUpdate}
                            isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'tolerance'}
                            setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'tolerance' } : null)}
                            className="font-mono text-[11px] text-accent-primary"
                        />
                    ),
                })
            ] : []),

            // Extracted
            columnHelper.accessor('extractedValue', {
                header: 'Extracted',
                cell: info => (
                    <EditableCell
                        value={info.getValue()}
                        id={info.row.original.id}
                        field="extractedValue"
                        onUpdate={onUpdate}
                        isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'extractedValue'}
                        setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'extractedValue' } : null)}
                        className="font-mono text-cyan-400 bg-cyan-400/5 px-1.5 py-0.5 rounded border border-cyan-400/20 text-[11px]"
                    />
                ),
            }),

            // Verified
            columnHelper.accessor('verifiedValue', {
                header: 'Verified',
                cell: info => (
                    <EditableCell
                        value={info.getValue()}
                        id={info.row.original.id}
                        field="verifiedValue"
                        onUpdate={onUpdate}
                        isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'verifiedValue'}
                        setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'verifiedValue' } : null)}
                        className="font-mono text-cyan-400 bg-bg-secondary px-1.5 py-0.5 rounded border border-border-subtle text-[11px]"
                        placeholder="Measure..."
                    />
                ),
            }),

            // Unit
            columnHelper.accessor('unit', {
                header: 'Unit',
                cell: info => (
                    <EditableCell
                        value={info.getValue()}
                        id={info.row.original.id}
                        field="unit"
                        onUpdate={onUpdate}
                        isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'unit'}
                        setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'unit' } : null)}
                        className="text-[10px] text-text-tertiary uppercase font-medium"
                    />
                ),
            }),

            // Material
            ...(hasData('material') ? [
                columnHelper.accessor('material', {
                    header: 'Material',
                    cell: info => (
                        <EditableCell
                            value={info.getValue()}
                            id={info.row.original.id}
                            field="material"
                            onUpdate={onUpdate}
                            isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'material'}
                            setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'material' } : null)}
                            className="text-xs text-text-secondary"
                        />
                    ),
                })
            ] : []),

            // Standard
            ...(hasData('standard') ? [
                columnHelper.accessor('standard', {
                    header: 'Standard',
                    cell: info => (
                        <EditableCell
                            value={info.getValue()}
                            id={info.row.original.id}
                            field="standard"
                            onUpdate={onUpdate}
                            isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'standard'}
                            setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'standard' } : null)}
                            className="text-[10px] text-text-tertiary font-mono bg-surface/50 px-1.5 py-0.5 rounded"
                        />
                    ),
                })
            ] : []),

            // Surface Finish
            ...(hasData('surfaceFinish') ? [
                columnHelper.accessor('surfaceFinish', {
                    header: 'Surface Finish',
                    cell: info => (
                        <EditableCell
                            value={info.getValue()}
                            id={info.row.original.id}
                            field="surfaceFinish"
                            onUpdate={onUpdate}
                            isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'surfaceFinish'}
                            setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'surfaceFinish' } : null)}
                            className="text-xs text-text-secondary"
                        />
                    ),
                })
            ] : []),

            // Confidence
            columnHelper.accessor('confidence', {
                header: 'Confidence',
                cell: info => {
                    const val = info.getValue() as string;
                    const colors: any = {
                        high: 'bg-success/10 text-success border-success/20',
                        medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
                        low: 'bg-error/10 text-error border-error/20',
                    };
                    const icons: any = {
                        high: <CheckCircle2 className="h-3 w-3 mr-1" />,
                        medium: <HelpCircle className="h-3 w-3 mr-1" />,
                        low: <AlertCircle className="h-3 w-3 mr-1" />,
                    };
                    return (
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${colors[val] || colors.medium}`}>
                            {icons[val] || icons.medium}
                            {val || 'N/A'}
                        </span>
                    );
                },
            }),

            // Description
            ...(hasData('description') ? [
                columnHelper.accessor('description', {
                    header: 'Description',
                    cell: info => (
                        <div className="flex items-center gap-2 max-w-xs">
                            <Info className="h-3 w-3 text-text-tertiary shrink-0" />
                            <EditableCell
                                value={info.getValue()}
                                id={info.row.original.id}
                                field="description"
                                onUpdate={onUpdate}
                                isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'description'}
                                setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'description' } : null)}
                                className="text-xs text-text-secondary"
                            />
                        </div>
                    ),
                })
            ] : []),

            // Instructions
            ...(hasData('instructions') ? [
                columnHelper.accessor('instructions', {
                    header: 'Instructions',
                    cell: info => (
                        <div className="flex items-center gap-2 max-w-xs">
                            <ClipboardList className="h-3 w-3 text-accent-primary shrink-0" />
                            <EditableCell
                                value={info.getValue()}
                                id={info.row.original.id}
                                field="instructions"
                                onUpdate={onUpdate}
                                isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'instructions'}
                                setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'instructions' } : null)}
                                className="text-[10px] text-text-tertiary italic leading-tight"
                            />
                        </div>
                    ),
                })
            ] : []),

            // Dynamic
            ...Array.from(allKeys).map(key => columnHelper.accessor(key as any, {
                header: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                cell: info => (
                    <EditableCell
                        value={info.getValue()}
                        id={info.row.original.id}
                        field={key}
                        onUpdate={onUpdate}
                        isEditing={editingCell?.id === info.row.original.id && editingCell?.field === key}
                        setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: key } : null)}
                        className="text-xs text-text-secondary"
                    />
                ),
            })),

            // Remarks
            ...(hasData('remarks') ? [
                columnHelper.accessor('remarks', {
                    header: 'Remarks',
                    cell: info => (
                        <div className="flex items-center gap-2 bg-surface/30 px-2 py-0.5 rounded border border-border-subtle/50 text-ellipsis overflow-hidden">
                            <MessageSquare className="h-3 w-3 text-text-tertiary shrink-0" />
                            <EditableCell
                                value={info.getValue()}
                                id={info.row.original.id}
                                field="remarks"
                                onUpdate={onUpdate}
                                isEditing={editingCell?.id === info.row.original.id && editingCell?.field === 'remarks'}
                                setEditing={(editing) => setEditingCell(editing ? { id: info.row.original.id, field: 'remarks' } : null)}
                                className="text-[10px] text-text-secondary"
                            />
                        </div>
                    ),
                })
            ] : []),

            // Actions
            columnHelper.display({
                id: 'actions',
                header: 'Actions',
                cell: info => (
                    <div className="flex items-center gap-1.5 pr-2">
                        <button
                            onClick={() => onHighlight(info.row.original.id)}
                            className="p-1 hover:bg-surface rounded text-text-tertiary hover:text-accent-primary transition-colors"
                            title="Locate in PDF"
                        >
                            <ExternalLink className="h-3 w-3" />
                        </button>
                        <button
                            className="p-1 hover:bg-surface rounded text-text-tertiary hover:text-accent-primary transition-colors"
                            title="Re-check AI"
                        >
                            <RefreshCcw className="h-3 w-3" />
                        </button>
                    </div>
                ),
            }),
        ];
        return cols;
    }, [data, onUpdate, onHighlight, editingCell]);

    const table = useReactTable({
        data,
        columns: dynamicColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    const exportJSON = () => {
        const str = JSON.stringify(data, null, 2);
        const blob = new Blob([str], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `specs-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    };

    const exportCSV = () => {
        if (data.length === 0) return;
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(',')).join('\n');
        const csv = `${headers}\n${rows}`;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `specs-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-1">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 text-[11px] gap-1.5 hover:bg-surface" onClick={onAddRow}>
                        <Plus className="h-3.5 w-3.5" />
                        Add New Row
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 text-[11px] gap-1.5 hover:bg-surface" onClick={exportJSON}>
                        <FileJson className="h-3.5 w-3.5" />
                        Export JSON
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[11px] gap-1.5 hover:bg-surface" onClick={exportCSV}>
                        <FileSpreadsheet className="h-3.5 w-3.5" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto no-scrollbar border border-border-subtle rounded-xl bg-bg-card shadow-sm">
                <table className="w-full text-left border-collapse table-auto min-w-[1000px]">
                    <thead className="bg-bg-secondary border-b border-border-subtle">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-text-tertiary whitespace-nowrap first:pl-4 last:pr-4">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                        {table.getRowModel().rows.map(row => {
                            const isHighlighted = highlightedId === row.original.id;
                            return (
                                <tr
                                    key={row.id}
                                    className={`transition-all duration-200 ${isHighlighted ? 'bg-accent-primary/5 border-l-2 border-l-accent-primary shadow-sm' : 'hover:bg-surface/10'}`}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-4 py-3 align-middle first:pl-4 last:pr-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
