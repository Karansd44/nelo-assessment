import React from 'react';
import { TaskItem } from './TaskItem';
import { ClipboardList } from 'lucide-react';

export const TaskList = ({ tasks, onUpdate, onDelete, onToggle }) => {
    if (!tasks.length) return (
        <div className="flex flex-col items-center py-16 text-center text-gray-500">
            <div className="bg-gray-50 p-4 rounded-full mb-3"><ClipboardList size={40} className="text-gray-300" /></div>
            <p>No tasks yet. Add one to get started!</p>
        </div>
    );

    const sorted = [...tasks].sort((a, b) => (a.status === b.status) ? new Date(a.dueDate) - new Date(b.dueDate) : (a.status === 'pending' ? -1 : 1));

    return <div className="space-y-3">{sorted.map(t => <TaskItem key={t.id} task={t} onUpdate={onUpdate} onDelete={onDelete} onToggle={onToggle} />)}</div>;
};
