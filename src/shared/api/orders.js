import { apiClient } from './client';

export async function getOrders(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qs.set(k, v); });
  const query = qs.toString();
  const data = await apiClient(`/orders${query ? `?${query}` : ''}`);
  return data; // { orders, pagination }
}

export async function getOrder(id) {
  return apiClient(`/orders/${id}`);
}

export async function checkout(buyerId, dto) {
  return apiClient('/orders', { method: 'POST', body: JSON.stringify(dto) });
}

export async function updateOrderStatus(id, dto) {
  return apiClient(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify(dto) });
}
