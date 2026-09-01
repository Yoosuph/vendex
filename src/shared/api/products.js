import { apiClient } from './client';

export async function getProducts(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') qs.set(k, v); });
  const query = qs.toString();
  const data = await apiClient(`/products${query ? `?${query}` : ''}`);
  return data; // { products, pagination, filters }
}

export async function getProduct(id) {
  return apiClient(`/products/${id}`);
}

export async function createProduct(dto) {
  return apiClient('/products', { method: 'POST', body: JSON.stringify(dto) });
}

export async function updateProduct(id, dto) {
  return apiClient(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(dto) });
}

export async function deleteProduct(id) {
  return apiClient(`/products/${id}`, { method: 'DELETE' });
}

export async function updateProductStock(id, stock) {
  return apiClient(`/products/${id}/stock`, { method: 'PATCH', body: JSON.stringify({ stock }) });
}
