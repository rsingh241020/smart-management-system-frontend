import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskTable from '../components/TaskTable';
import { getMyTasks, updateTask } from '../services/api';

function Tasks({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    setIsLoading(true);
    setError('');

    try {
      const taskData = await getMyTasks();
      setTasks(Array.isArray(taskData) ? taskData : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load tasks.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const initialize = async () => {
      try {
        const taskData = await getMyTasks();

        if (!isActive) {
          return;
        }

        setTasks(Array.isArray(taskData) ? taskData : []);
        setError('');
      } catch (err) {
        if (!isActive) {
          return;
        }

        const message = err instanceof Error ? err.message : 'Unable to load tasks.';
        setError(message);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void initialize();

    return () => {
      isActive = false;
    };
  }, []);

  const changeStatus = async (id, status) => {
    setUpdatingTaskId(id);
    setError('');

    try {
      await updateTask(id, status);
      await loadTasks();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to update task status.';
      setError(message);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar onLogout={onLogout} />

        <section className="min-w-0 flex-1">
          <Navbar
            taskCount={tasks.length}
            onLogout={onLogout}
            title="Tasks"
            eyebrow="Workspace"
          />

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <TaskTable
              tasks={tasks}
              isLoading={isLoading}
              updatingTaskId={updatingTaskId}
              onRefresh={loadTasks}
              onStatusChange={changeStatus}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Tasks;
