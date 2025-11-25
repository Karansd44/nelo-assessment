import { useState, useEffect } from 'react';
import type { Task } from '../types/task';

export const useTaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Task = {
            ...task,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const toggleTaskStatus = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
                    : task
            )
        );
    };

    return { tasks, addTask, updateTask, deleteTask, toggleTaskStatus };
};
