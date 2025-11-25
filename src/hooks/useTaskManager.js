import { useState, useEffect } from 'react';

export const useTaskManager = () => {
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks') || '[]'));

    useEffect(() => localStorage.setItem('tasks', JSON.stringify(tasks)), [tasks]);

    const update = (id, fn) => setTasks(prev => prev.map(t => t.id === id ? fn(t) : t));

    return {
        tasks,
        addTask: (t) => setTasks(prev => [{ ...t, id: crypto.randomUUID(), createdAt: Date.now() }, ...prev]),
        updateTask: (id, up) => update(id, t => ({ ...t, ...up })),
        deleteTask: (id) => setTasks(prev => prev.filter(t => t.id !== id)),
        toggleTaskStatus: (id) => update(id, t => ({ ...t, status: t.status === 'completed' ? 'pending' : 'completed' }))
    };
};
