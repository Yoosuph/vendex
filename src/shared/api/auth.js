import { apiClient, setToken, clearToken } from './client';

const STATUS_MAP = {
  APPROVED: 'approved',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
};

function normalizeUser(user) {
  return {
    ...user,
    role: user.role ? user.role.toLowerCase() : 'buyer',
    status: STATUS_MAP[user.status] || user.status,
  };
}

export async function login(email, password) {
  const data = await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.accessToken, data.refreshToken);
  return normalizeUser(data.user);
}

export async function register(name, email, password, role = 'buyer') {
  const data = await apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role: role.toUpperCase() }),
  });
  setToken(data.accessToken, data.refreshToken);
  return normalizeUser(data.user);
}

export function logout() {
  clearToken();
}

export async function refreshToken() {
  // Stub for now
}
