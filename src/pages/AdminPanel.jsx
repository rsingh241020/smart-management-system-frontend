import { FolderPlus, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskTable from '../components/TaskTable';
import { createProject, createTask, getAllTasks } from '../services/api';

const initialTask = {
  title: '',
  description: '',
  status: 'TODO',
  projectId: '',
};

const initialProject = {
  name: '',
  description: '',
};

const cleanPayload = (data) => Object.fromEntries(
  Object.entries(data)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => [key, key.endsWith('Id') ? Number(value) : value]),
);

function AdminPanel({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState(initialTask);
  const [projectForm, setProjectForm] = useState(initialProject);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadTasks = async () => {
    setError('');

    try {
      const allTasks = await getAllTasks();
      setTasks(Array.isArray(allTasks) ? allTasks : []);
    } catch {
      setError('Unable to load all tasks.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const submitProject = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsCreatingProject(true);

    try {
      await createProject(cleanPayload(projectForm));
      setProjectForm(initialProject);
      setSuccess('Project created successfully.');
    } catch {
      setError('Unable to create project.');
    } finally {
      setIsCreatingProject(false);
    }
  };

  const submitTask = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsCreatingTask(true);

    try {
      await createTask(cleanPayload(taskForm));
      setTaskForm(initialTask);
      setSuccess('Task created successfully.');
      await loadTasks();
    } catch {
      setError('Unable to create task.');
    } finally {
      setIsCreatingTask(false);
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
            title="Admin panel"
            eyebrow="Admin"
          />

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {success}
              </div>
            )}

            <section className="grid gap-5 xl:grid-cols-2">
              <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/80 sm:p-6" onSubmit={submitProject}>
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                    <FolderPlus size={20} />
                  </span>
                  <div>
                  <h2 className="text-lg font-bold text-slate-950">Create project</h2>
                  <p className="mt-1 text-sm text-slate-500">Add a new backend project record.</p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="project-name" className="mb-2 block text-sm font-semibold text-slate-800">
                      Project name
                    </label>
                    <input
                      id="project-name"
                      value={projectForm.name}
                      required
                      onChange={(event) => setProjectForm({ ...projectForm, name: event.target.value })}
                      className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition duration-200 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      placeholder="Project name"
                    />
                  </div>

                  <div>
                    <label htmlFor="project-description" className="mb-2 block text-sm font-semibold text-slate-800">
                      Description
                    </label>
                    <textarea
                      id="project-description"
                      value={projectForm.description}
                      rows="4"
                      onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })}
                      className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition duration-200 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      placeholder="Project description"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreatingProject}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                >
                  {isCreatingProject ? <LoadingSpinner label="Creating project..." /> : <><FolderPlus size={18} />Create project</>}
                </button>
              </form>

              <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/80 sm:p-6" onSubmit={submitTask}>
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <PlusCircle size={20} />
                  </span>
                  <div>
                  <h2 className="text-lg font-bold text-slate-950">Create task</h2>
                  <p className="mt-1 text-sm text-slate-500">Create a task through the backend task API.</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="task-title" className="mb-2 block text-sm font-semibold text-slate-800">
                      Task title
                    </label>
                    <input
                      id="task-title"
                      value={taskForm.title}
                      required
                      onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })}
                      className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition duration-200 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      placeholder="Task title"
                    />
                  </div>

                  <div>
                    <label htmlFor="task-status" className="mb-2 block text-sm font-semibold text-slate-800">
                      Status
                    </label>
                    <select
                      id="task-status"
                      value={taskForm.status}
                      onChange={(event) => setTaskForm({ ...taskForm, status: event.target.value })}
                      className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition duration-200 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="task-project" className="mb-2 block text-sm font-semibold text-slate-800">
                      Project ID
                    </label>
                    <input
                      id="task-project"
                      type="number"
                      min="1"
                      value={taskForm.projectId}
                      onChange={(event) => setTaskForm({ ...taskForm, projectId: event.target.value })}
                      className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition duration-200 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      placeholder="Optional"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="task-description" className="mb-2 block text-sm font-semibold text-slate-800">
                      Description
                    </label>
                    <textarea
                      id="task-description"
                      value={taskForm.description}
                      rows="4"
                      onChange={(event) => setTaskForm({ ...taskForm, description: event.target.value })}
                      className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition duration-200 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      placeholder="Task description"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreatingTask}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                >
                  {isCreatingTask ? <LoadingSpinner label="Creating task..." /> : <><PlusCircle size={18} />Create task</>}
                </button>
              </form>
            </section>

            <TaskTable
              tasks={tasks}
              isLoading={isLoading}
              onRefresh={loadTasks}
              showStatusControl={false}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminPanel;
