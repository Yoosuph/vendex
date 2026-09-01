import { apiClient } from './client';

export async function getWishlist() {
  return apiClient('/wishlist');
}

export async function addWishlistItem(productId) {
  return apiClient('/wishlist', { method: 'POST', body: JSON.stringify({ productId }) });
}

export async function removeWishlistItem(productId) {
  return apiClient(`/wishlist/${productId}`, { method: 'DELETE' });
}
