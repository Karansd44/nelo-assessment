import React, { useState } from 'react';

export const TaskForm = ({ onSubmit, initialData, onCancel }) => {
    const [form, setForm] = useState({ title: initialData?.title || '', description: initialData?.description || '', priority: initialData?.priority || 'medium', dueDate: initialData?.dueDate || '' });
    const [err, setErr] = useState({});

    const submit = (e) => {
        e.preventDefault();
        const newErr = {};
        if (!form.title.trim()) newErr.title = 'Required';
        if (!form.dueDate) newErr.dueDate = 'Required';
        if (Object.keys(newErr).length) return setErr(newErr);

        onSubmit({ ...form, status: initialData?.status || 'pending' });
        if (!initialData) setForm({ title: '', description: '', priority: 'medium', dueDate: '' });
    };

    const cls = (e) => `w-full px-4 py-2 rounded-lg border ${e ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none transition-all`;

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={cls(err.title)} placeholder="Task title" autoFocus />
                {err.title && <p className="mt-1 text-xs text-red-500">{err.title}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none" placeholder="Description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                        {['low', 'medium', 'high'].map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className={cls(err.dueDate)} />
                    {err.dueDate && <p className="mt-1 text-xs text-red-500">{err.dueDate}</p>}
                </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
                {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>}
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">{initialData ? 'Save' : 'Add'}</button>
            </div>
        </form>
    );
};
