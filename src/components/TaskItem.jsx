import React, { useState } from 'react';
import { Pencil, Trash2, CheckCircle, Circle, Calendar, AlertCircle } from 'lucide-react';
import { Modal } from './Modal';
import { TaskForm } from './TaskForm';

const COLORS = { low: 'bg-green-100 text-green-800', medium: 'bg-yellow-100 text-yellow-800', high: 'bg-red-100 text-red-800' };

export const TaskItem = ({ task, onUpdate, onDelete, onToggle }) => {
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const done = task.status === 'completed';

    return (
        <>
            <div className={`group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 ${done ? 'opacity-60' : ''}`}>
                <div className="flex items-start gap-3">
                    <button onClick={() => onToggle(task.id)} className={`mt-1 ${done ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}>{done ? <CheckCircle size={22} /> : <Circle size={22} />}</button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold text-gray-900 truncate ${done ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${COLORS[task.priority]}`}>{task.priority}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{task.description}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500"><Calendar size={14} /><span>{new Date(task.dueDate).toLocaleDateString()}</span></div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEdit(true)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={18} /></button>
                        <button onClick={() => setDel(true)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                </div>
            </div>
            <Modal isOpen={edit} onClose={() => setEdit(false)} title="Edit Task"><TaskForm onSubmit={d => { onUpdate(task.id, d); setEdit(false); }} initialData={task} onCancel={() => setEdit(false)} /></Modal>
            <Modal isOpen={del} onClose={() => setDel(false)} title="Delete Task">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-red-600 bg-red-50 p-3 rounded-lg"><AlertCircle size={24} /><p className="font-medium">Delete this task?</p></div>
                    <p className="text-gray-600">Permanently remove "<span className="font-medium">{task.title}</span>"?</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setDel(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
                        <button onClick={() => onDelete(task.id)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg">Delete</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
