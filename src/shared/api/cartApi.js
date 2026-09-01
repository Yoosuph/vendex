import { apiClient } from './client';

export async function getCart() {
  return apiClient('/cart');
}

export async function addCartItem(productId, quantity = 1) {
  return apiClient('/cart/items', { method: 'POST', body: JSON.stringify({ productId, quantity }) });
}

export async function updateCartItem(productId, quantity) {
  return apiClient(`/cart/items/${productId}`, { method: 'PATCH', body: JSON.stringify({ quantity }) });
}

export async function removeCartItem(productId) {
  return apiClient(`/cart/items/${productId}`, { method: 'DELETE' });
}

export async function clearCartApi() {
  return apiClient('/cart', { method: 'DELETE' });
}
