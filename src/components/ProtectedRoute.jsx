import { Navigate, Outlet } from 'react-router-dom';
import { getToken, isAdmin } from '../utils/auth';

function ProtectedRoute({ adminOnly = false }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
