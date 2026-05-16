import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import { getDefaultRoute, getToken } from "./utils/auth";

function App() {
  const navigate = useNavigate();

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);

    // ✅ DECODE JWT
    const payload = JSON.parse(atob(newToken.split(".")[1]));

    // ✅ SAVE ROLE
    localStorage.setItem("role", payload.role);

    navigate(getDefaultRoute(), { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          getToken() ? (
            <Navigate to={getDefaultRoute()} replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/register"
        element={
          getToken() ? (
            <Navigate to={getDefaultRoute()} replace />
          ) : (
            <Register />
          )
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard onLogout={handleLogout} />}
        />
        <Route path="/tasks" element={<Tasks onLogout={handleLogout} />} />
      </Route>

      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin" element={<AdminPanel onLogout={handleLogout} />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={getToken() ? getDefaultRoute() : "/login"} replace />
        }
      />
    </Routes>
  );
}

export default App;
