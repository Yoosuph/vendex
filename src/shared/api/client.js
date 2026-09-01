const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const TOKEN_KEY = 'vendex_access_token';
const REFRESH_KEY = 'vendex_refresh_token';

let accessToken = (() => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
})();

let refreshToken = (() => {
  try {
    return localStorage.getItem(REFRESH_KEY);
  } catch {
    return null;
  }
})();

export function setToken(token, refresh) {
  accessToken = token || null;
  if (refresh !== undefined) refreshToken = refresh || null;
  try {
    if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken);
    else localStorage.removeItem(TOKEN_KEY);
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
    else localStorage.removeItem(REFRESH_KEY);
  } catch {
    /* ignore quota / private mode */
  }
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
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  } catch {
    /* ignore */
  }
}

export async function apiClient(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    clearToken();
    throw new Error('Unauthorized — please log in again');
  }

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    const msg =
      (Array.isArray(data?.message) ? data.message.join(', ') : data?.message) ||
      data?.error ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}
