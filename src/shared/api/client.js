const API_BASE = 'http://localhost:3001';

let accessToken = null;
let refreshToken = null;

export function setToken(token, refresh) {
  accessToken = token;
  refreshToken = refresh || refreshToken;
}

export function getToken() {
  return accessToken;
}

export function getRefreshToken() {
  return refreshToken;
}

export function clearToken() {
  accessToken = null;
  refreshToken = null;
}

export async function apiClient(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    clearToken();
    throw new Error('Unauthorized — please log in again');
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.error || `Request failed (${res.status})`);
  }

  return data;
}
