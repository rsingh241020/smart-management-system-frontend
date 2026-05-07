import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', checkToken);
    return () => window.removeEventListener('storage', checkToken);
  }, []);

  if (token) {
    return <Dashboard />;
  } else {
    return <Login />;
  }
}

export default App;