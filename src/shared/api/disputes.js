import { apiClient } from './client';

export async function getDisputes(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qs.set(k, v); });
  const query = qs.toString();
  const data = await apiClient(`/disputes${query ? `?${query}` : ''}`);
  return data;
}

export async function createDispute(dto) {
  return apiClient('/disputes', { method: 'POST', body: JSON.stringify(dto) });
}

export async function resolveDispute(id, decision) {
  return apiClient(`/disputes/${id}/resolve`, { method: 'PATCH', body: JSON.stringify({ decision }) });
}
