export const getToken = () => localStorage.getItem('token');

export const getCurrentUser = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(normalizedPayload));

    return decoded;
  } catch {
    return null;
  }
};

export const isAdmin = () => {
  const user = getCurrentUser();
  const role = user?.role || user?.authorities?.[0]?.authority || user?.roles?.[0];
  const email = user?.email || user?.sub;

  return role === 'ADMIN' || role === 'ROLE_ADMIN' || email === 'rohitadmin@gmail.com';
};

export const getDefaultRoute = () => (isAdmin() ? '/admin' : '/dashboard');
