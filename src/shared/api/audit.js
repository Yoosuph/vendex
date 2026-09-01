import { apiClient } from './client';

export async function getAuditLogs(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qs.set(k, v); });
  const query = qs.toString();
  // Try admin audit-logs first (more complete), fallback to general
  try {
    const data = await apiClient(`/admin/audit-logs${query ? `?${query}` : ''}`);
    return data;
  } catch {
    const data = await apiClient(`/audit-logs${query ? `?${query}` : ''}`);
    return data;
  }
}
