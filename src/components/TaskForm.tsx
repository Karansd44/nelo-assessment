import React, { useState } from 'react';
import type { Task, Priority } from '../types/task';

interface TaskFormProps {
    onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
    initialData?: Task;
    onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        priority: initialData?.priority || 'medium' as Priority,
        dueDate: initialData?.dueDate || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.dueDate) newErrors.dueDate = 'Due date is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSubmit({ ...formData, status: initialData?.status || 'pending' });
        if (!initialData) setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
    };

    const inputClass = (error?: string) => `w-full px-4 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all`;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className={inputClass(errors.title)}
                    placeholder="Task title"
                    autoFocus
                />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 resize-none"
                    placeholder="Description (optional)"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                        value={formData.priority}
                        onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                        type="date"
                        value={formData.dueDate}
                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                        className={inputClass(errors.dueDate)}
                    />
                    {errors.dueDate && <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                {onCancel && (
                    <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
                        Cancel
                    </button>
                )}
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                    {initialData ? 'Save' : 'Add'}
                </button>
            </div>
        </form>
    );
};
