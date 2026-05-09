import { ClipboardList, FolderKanban, LayoutDashboard, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

const navClass = ({ isActive }) => (
  isActive
    ? 'inline-flex items-center gap-2 rounded-xl border border-slate-950 bg-slate-950 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:px-4'
    : 'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-700 hover:shadow-sm sm:px-4'
);

function Navbar({ taskCount = 0, onLogout, title = 'Dashboard', eyebrow = 'Overview' }) {
  const admin = isAdmin();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 px-4 py-4 shadow-sm shadow-slate-200/40 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
            {eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
            {title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <NavLink className={navClass} to="/dashboard">
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>
          {admin && (
            <NavLink className={navClass} to="/admin">
              <FolderKanban size={16} />
              Admin
            </NavLink>
          )}
          <NavLink className={navClass} to="/tasks">
            <ClipboardList size={16} />
            Tasks
          </NavLink>
          <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 shadow-inner sm:block">
            {taskCount} tasks loaded
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 lg:hidden"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
