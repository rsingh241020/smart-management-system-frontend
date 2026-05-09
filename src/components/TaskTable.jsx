import { RefreshCw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const statusOptions = ['TODO', 'IN_PROGRESS', 'DONE'];

const statusStyles = {
  TODO: 'bg-amber-50 text-amber-700 ring-amber-200',
  IN_PROGRESS: 'bg-blue-50 text-blue-700 ring-blue-200',
  DONE: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
};

function TaskTable({
  tasks,
  isLoading,
  updatingTaskId,
  onRefresh,
  onStatusChange,
  showStatusControl = true,
}) {
  return (
    <section id="tasks" className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Task table</h2>
            <p className="text-sm text-slate-500">Update task progress from the status dropdown.</p>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-sm disabled:cursor-not-allowed disabled:text-slate-400 sm:w-auto"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500 sm:px-6">
                Task
              </th>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Current status
              </th>
              {showStatusControl && (
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Change status
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              <tr>
                <td className="px-5 py-10 text-center sm:px-6" colSpan={showStatusControl ? '3' : '2'}>
                  <LoadingSpinner label="Loading dashboard data..." />
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td className="px-5 py-10 text-center text-sm font-medium text-slate-500 sm:px-6" colSpan={showStatusControl ? '3' : '2'}>
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="transition duration-150 hover:bg-cyan-50/40">
                  <td className="max-w-xs px-5 py-4 sm:px-6">
                    <p className="truncate text-sm font-semibold text-slate-950">{task.title}</p>
                    {task.description && (
                      <p className="mt-1 truncate text-xs text-slate-500">{task.description}</p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusStyles[task.status] || 'bg-slate-100 text-slate-700 ring-slate-200'}`}>
                      {task.status || 'UNKNOWN'}
                    </span>
                  </td>
                  {showStatusControl && (
                    <td className="px-5 py-4">
                      <select
                        value={task.status || ''}
                        disabled={updatingTaskId === task.id}
                        onChange={(event) => onStatusChange(task.id, event.target.value)}
                        className="w-full min-w-36 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none transition duration-200 hover:border-cyan-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        {!statusOptions.includes(task.status) && (
                          <option value={task.status || ''}>{task.status || 'UNKNOWN'}</option>
                        )}
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TaskTable;
