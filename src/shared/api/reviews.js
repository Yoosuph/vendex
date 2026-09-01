import { apiClient } from './client';

export async function getProductReviews(productId, params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qs.set(k, v); });
  const query = qs.toString();
  return apiClient(`/products/${productId}/reviews${query ? `?${query}` : ''}`);
}

export async function createReview(productId, dto) {
  return apiClient(`/products/${productId}/reviews`, { method: 'POST', body: JSON.stringify(dto) });
}
