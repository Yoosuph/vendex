import { apiClient } from './client';

export async function getVendors(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qs.set(k, v); });
  const query = qs.toString();
  return apiClient(`/vendors${query ? `?${query}` : ''}`);
}

export async function approveVendor(vendorUserId) {
  return apiClient(`/vendors/${vendorUserId}/approve`, { method: 'PATCH' });
}

export async function suspendVendor(vendorUserId) {
  return apiClient(`/vendors/${vendorUserId}/suspend`, { method: 'PATCH' });
}

export async function unsuspendVendor(vendorUserId) {
  return apiClient(`/vendors/${vendorUserId}/unsuspend`, { method: 'PATCH' });
}
