import { RefreshCw } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const statusOptions = ["TODO", "IN_PROGRESS", "DONE"];

const statusStyles = {
  TODO: "bg-amber-50 text-amber-700 ring-amber-200",

  IN_PROGRESS: "bg-blue-50 text-blue-700 ring-blue-200",

  DONE: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

// ===============================
// ASSIGNEE LABEL
// ===============================

const getAssigneeLabel = (task) => {
  if (task.assignedTo) {
    const name = task.assignedTo.split("@")[0];

    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return "Unassigned";
};

// ===============================
// PROJECT NAME
// ===============================

const getProjectName = (task) => {
  if (task.project?.name) {
    return task.project.name;
  }

  return "No Project";
};

function TaskTable({
  tasks,
  isLoading,
  updatingTaskId,
  onRefresh,
  onStatusChange,
  showStatusControl = true,
}) {
  // ===============================
  // ROLE CHECK
  // ===============================

  const token = localStorage.getItem("token");

  let isAdmin = false;

  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));

      isAdmin = payload.role === "ADMIN";
    }
  } catch (err) {
    console.error("Token parse error", err);
  }

  return (
    <section
      id="tasks"
      className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* HEADER */}

      <div className="border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Task table</h2>

            <p className="text-sm text-slate-500">
              Update task progress from the status dropdown.
            </p>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-cyan-300 hover:text-cyan-700"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          {/* HEAD */}

          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                Task
              </th>

              {isAdmin && (
                <th className="px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                  Assignee
                </th>
              )}

              <th className="px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                Project
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                Due Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                Current Status
              </th>

              {showStatusControl && (
                <th className="px-5 py-3 text-left text-xs font-bold uppercase text-slate-500">
                  Change Status
                </th>
              )}
            </tr>
          </thead>

          {/* BODY */}

          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 5}
                  className="px-5 py-10 text-center"
                >
                  <LoadingSpinner label="Loading tasks..." />
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 5}
                  className="px-5 py-10 text-center text-sm text-slate-500"
                >
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="hover:bg-cyan-50/40">
                  {/* TASK */}

                  <td className="max-w-xs px-5 py-4">
                    <p className="text-sm font-semibold text-slate-950">
                      {task.title}
                    </p>

                    {task.description && (
                      <p className="mt-1 text-xs text-slate-500">
                        {task.description}
                      </p>
                    )}
                  </td>

                  {/* ASSIGNEE */}

                  {isAdmin && (
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-800">
                        {getAssigneeLabel(task)}
                      </p>
                    </td>
                  )}

                  {/* PROJECT */}

                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-700">
                      {getProjectName(task)}
                    </p>
                  </td>

                  {/* DUE DATE */}

                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-700">
                      {task.dueDate ? task.dueDate : "No due date"}
                    </p>
                  </td>

                  {/* STATUS */}

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${
                        statusStyles[task.status] ||
                        "bg-slate-100 text-slate-700 ring-slate-200"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  {/* STATUS CONTROL */}

                  {showStatusControl && (
                    <td className="px-5 py-4">
                      <select
                        value={task.status}
                        disabled={updatingTaskId === task.id}
                        onChange={(event) =>
                          onStatusChange(task.id, event.target.value)
                        }
                        className="w-full min-w-36 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800"
                      >
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
