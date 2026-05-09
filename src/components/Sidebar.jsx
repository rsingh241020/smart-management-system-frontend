import { ClipboardList, FolderKanban, LayoutDashboard, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

const linkClass = ({ isActive }) => (
  isActive
    ? 'flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-950 shadow-lg shadow-cyan-950/20'
    : 'flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition duration-200 hover:bg-white/10 hover:text-white hover:translate-x-1'
);

function Sidebar({ onLogout }) {
  const admin = isAdmin();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950 px-6 py-6 text-white lg:flex lg:flex-col">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20">
          SM
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Smart Manager</p>
          <p className="text-xs text-slate-400">Task workspace</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2 text-sm font-medium">
        <NavLink className={linkClass} to="/dashboard">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
        {admin && (
          <NavLink className={linkClass} to="/admin">
            <FolderKanban size={18} />
            Admin panel
          </NavLink>
        )}
        <NavLink className={linkClass} to="/tasks">
          <ClipboardList size={18} />
          Tasks
        </NavLink>
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-semibold text-slate-200 transition duration-200 hover:border-red-300/50 hover:bg-red-500/10 hover:text-white"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
