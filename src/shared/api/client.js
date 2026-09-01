const VITE_URL = import.meta.env.VITE_API_URL;
const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

const API_BASE = isLocalhost
  ? (VITE_URL || 'http://localhost:3001')
  : (VITE_URL && !VITE_URL.includes('localhost') ? VITE_URL : 'https://vendex-api.onrender.com');

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

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

async function tryRefreshToken() {
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) throw new Error('Refresh failed');
    const data = await res.json();
    setToken(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch (err) {
    clearToken();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return null;
  }
}

export async function apiClient(path, options = {}) {
  const isFormData =
    typeof FormData !== 'undefined' && options.body instanceof FormData;

  const headers = {
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && refreshToken && !path.includes('/auth/')) {
    if (!isRefreshing) {
      isRefreshing = true;
      const newToken = await tryRefreshToken();
      isRefreshing = false;
      if (newToken) {
        onRefreshed(newToken);
        headers.Authorization = `Bearer ${newToken}`;
        res = await fetch(`${API_BASE}${path}`, { ...options, headers });
      }
    } else {
      const retryPromise = new Promise((resolve) => {
        refreshSubscribers.push(async (newToken) => {
          if (newToken) {
            headers.Authorization = `Bearer ${newToken}`;
            resolve(await fetch(`${API_BASE}${path}`, { ...options, headers }));
          } else {
            resolve(res);
          }
        });
      });
      res = await retryPromise;
    }
  }

  if (res.status === 401) {
    clearToken();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
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
      (Array.isArray(data?.message)
        ? data.message.join(', ')
        : data?.message) ||
      data?.error ||
      `Request failed (${res.status})`;
    const err = new Error(msg);
    err.data = data;
    err.status = res.status;
    err.issues = data?.issues;
    throw err;
  }

  return data;
}

