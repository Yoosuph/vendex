import { apiClient } from './client';

export async function getBuyers(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qs.set(k, v); });
  const query = qs.toString();
  return apiClient(`/admin/buyers${query ? `?${query}` : ''}`);
}

export async function getAdminVendors(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qs.set(k, v); });
  const query = qs.toString();
  return apiClient(`/admin/vendors${query ? `?${query}` : ''}`);
}

export async function getProfile() {
  return apiClient('/users/me');
}

export async function updateProfile(dto) {
  return apiClient('/users/me', { method: 'PATCH', body: JSON.stringify(dto) });
}

export async function changePassword(dto) {
  return apiClient('/users/me/password', {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}
