import { apiClient, clearToken, getRefreshToken, setToken } from './client';

const STATUS_MAP = {
  APPROVED: 'approved',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
};

function normalizeUser(user) {
  if (!user) return null;
  return {
    ...user,
    role: user.role ? user.role.toLowerCase() : 'buyer',
    status: STATUS_MAP[user.status] || user.status || 'approved',
  };
}

export async function login(email, password) {
  const data = await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  });
  setToken(data.accessToken, data.refreshToken);
  return normalizeUser(data.user);
}

export async function register(
  name,
  email,
  password,
  role = 'buyer',
  storeData = {},
) {
  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: role.toUpperCase(),
    ...(storeData || {}),
  };

  const data = await apiClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  setToken(data.accessToken, data.refreshToken);
  return normalizeUser(data.user);
}

export async function logout() {
  const refreshToken = getRefreshToken();
  try {
    await apiClient('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  } catch {
    /* ignore network errors on logout */
  } finally {
    clearToken();
  }
}

export async function forgotPassword(email) {
  return apiClient('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
}

export async function resetPassword(token, newPassword) {
  return apiClient('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}

