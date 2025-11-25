import { useState } from 'react';
import { useTaskManager } from './hooks/useTaskManager';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { Modal } from './components/Modal';
import { Plus, Layout } from 'lucide-react';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } = useTaskManager();
  const [addOpen, setAddOpen] = useState(false);

  const Stat = ({ label, count, color }: { label: string; count: number; color: string }) => (
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
          <button onClick={() => setAddOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm">
            <Plus size={18} /> New Task
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="flex gap-4">
          <Stat label="Pending" count={tasks.filter(t => t.status === 'pending').length} color="text-blue-600" />
          <Stat label="Completed" count={tasks.filter(t => t.status === 'completed').length} color="text-green-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Your Tasks <span className="text-gray-500 text-sm font-normal ml-2">{tasks.length} total</span></h2>
          <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} onToggle={toggleTaskStatus} />
        </div>
      </main>

      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="New Task">
        <TaskForm onSubmit={task => { addTask(task); setAddOpen(false); }} onCancel={() => setAddOpen(false)} />
      </Modal>
    </div>
  );
}
