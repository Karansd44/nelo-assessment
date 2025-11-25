import { useState, useMemo } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import { useDebounce } from '../hooks/useDebounce';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { Modal } from './Modal';
import { Plus, Layout, Search, Filter, LogOut } from 'lucide-react';

export const Dashboard = ({ onLogout }) => {
    const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } = useTaskManager();
    const [addOpen, setAddOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const debouncedQuery = useDebounce(query, 300).toLowerCase();

    const filtered = useMemo(() => tasks.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(debouncedQuery) || t.description.toLowerCase().includes(debouncedQuery);
        const matchesFilter = filter === 'all' || (filter === 'completed' ? t.status === 'completed' : filter === 'pending' ? t.status === 'pending' : t.priority === filter);
        return matchesSearch && matchesFilter;
    }), [tasks, debouncedQuery, filter]);

    const Stat = ({ label, count, color }) => (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex-1">
            <p className={`text-sm font-medium ${color}`}>{label}</p>
            <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xl"><Layout /> TaskFlow</div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setAddOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm"><Plus size={18} /> New Task</button>
                        <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Logout"><LogOut size={20} /></button>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
                <div className="flex gap-4">
                    <Stat label="Pending" count={tasks.filter(t => t.status === 'pending').length} color="text-blue-600" />
                    <Stat label="Completed" count={tasks.filter(t => t.status === 'completed').length} color="text-green-600" />
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center hover:shadow-md transition-all">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tasks..." className="w-full pl-12 pr-4 py-3 bg-gray-50 hover:bg-gray-100 focus:bg-white rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                    <div className="relative min-w-[200px] w-full sm:w-auto">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        <select value={filter} onChange={e => setFilter(e.target.value)} className="w-full pl-12 pr-10 py-3 bg-gray-50 hover:bg-gray-100 focus:bg-white rounded-xl outline-none focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer transition-all">
                            {['all', 'pending', 'completed', 'high', 'medium', 'low'].map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)} {['high', 'medium', 'low'].includes(opt) ? 'Priority' : (opt === 'all' ? 'Tasks' : '')}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4">Your Tasks <span className="text-gray-500 text-sm font-normal ml-2">{filtered.length} results</span></h2>
                    <TaskList tasks={filtered} onUpdate={updateTask} onDelete={deleteTask} onToggle={toggleTaskStatus} />
                </div>
            </main>

            <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="New Task">
                <TaskForm onSubmit={task => { addTask(task); setAddOpen(false); }} onCancel={() => setAddOpen(false)} />
            </Modal>
        </div>
    );
};
