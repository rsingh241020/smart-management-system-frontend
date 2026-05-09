import { CheckCircle2, Clock3, ListTodo } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SummaryCard from '../components/SummaryCard';
import TaskTable from '../components/TaskTable';
import { getMyTasks, getSummary, updateTask } from '../services/api';

function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');

    try {
      const [taskData, summaryData] = await Promise.all([
        getMyTasks(),
        getSummary(),
      ]);

      setTasks(Array.isArray(taskData) ? taskData : []);
      setSummary(summaryData || {});
    } catch {
      setError('Unable to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id, status) => {
    setUpdatingTaskId(id);
    setError('');

    try {
      await updateTask(id, status);
      await load();
    } catch {
      setError('Unable to update task status.');
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const cards = useMemo(() => [
    {
      label: 'Total tasks',
      value: summary.total ?? tasks.length,
      accent: 'bg-slate-950 text-white',
      icon: ListTodo,
    },
    {
      label: 'Completed',
      value: summary.completed ?? tasks.filter((task) => task.status === 'DONE').length,
      accent: 'bg-emerald-500 text-white',
      icon: CheckCircle2,
    },
    {
      label: 'Pending',
      value: summary.pending ?? tasks.filter((task) => task.status !== 'DONE').length,
      accent: 'bg-amber-400 text-slate-950',
      icon: Clock3,
    },
  ], [summary, tasks]);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar onLogout={onLogout} />

        <section className="min-w-0 flex-1">
          <Navbar taskCount={tasks.length} onLogout={onLogout} />

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <section id="summary" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {cards.map((card) => (
                <SummaryCard
                  key={card.label}
                  label={card.label}
                  value={card.value}
                  accent={card.accent}
                  icon={card.icon}
                />
              ))}
            </section>

            <TaskTable
              tasks={tasks}
              isLoading={isLoading}
              updatingTaskId={updatingTaskId}
              onRefresh={load}
              onStatusChange={changeStatus}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
