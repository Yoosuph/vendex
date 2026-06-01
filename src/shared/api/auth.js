import { apiClient, setToken, clearToken } from './client';

function normalizeRole(role) {
  if (!role) return 'buyer';
  return role.toLowerCase();
}

export async function login(email, password) {
  const data = await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.accessToken, data.refreshToken);
  return { ...data.user, role: normalizeRole(data.user.role) };
}

export async function register(name, email, password, role = 'buyer') {
  const data = await apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role: role.toUpperCase() }),
  });
  setToken(data.accessToken, data.refreshToken);
  return { ...data.user, role: normalizeRole(data.user.role) };
}

export function logout() {
  clearToken();
}

export async function refreshToken() {
  // Stub for now
}
