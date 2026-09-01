import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { apiClient } from '@/shared/api/client';
import { AuthContext } from '@/shared/context/AuthContext';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';

export const CartContext = createContext(null);

const CART_KEY = 'vendex_cart';
const WISHLIST_KEY = 'vendex_wishlist';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { reloadFromDb } = useContext(MarketplaceContext);
  const loggedIn = !!user;

  const prevUserRef = useRef(user);

  // Reset cart/wishlist states and localStorage arrays on logout
  useEffect(() => {
    if (prevUserRef.current && !user) {
      setCart([]);
      setWishlist([]);
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(WISHLIST_KEY);
    }
    prevUserRef.current = user;
  }, [user]);

  // Sync cart from backend on login (mount / user change)
  useEffect(() => {
    if (!loggedIn) return;
    (async () => {
      try {
        const data = await apiClient('/cart');
        if (data.items?.length > 0) {
          setCart(data.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            vendor: item.vendor || 'Unknown Store',
            vendorId: item.vendorId,
            image: item.image,
          })));
        }
      } catch { /* offline or unauthenticated — keep local cart */ }
      try {
        const wData = await apiClient('/wishlist');
        if (wData.items?.length > 0) {
          setWishlist(wData.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            vendor: item.vendorName || item.vendor || 'Unknown Store',
            vendorId: item.vendorId,
          })));
        }
      } catch { /* keep local wishlist */ }
    })();
  }, [loggedIn]);

  // Persist cart/wishlist to localStorage as fallback
  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity, vendor: product.vendor || product.vendorName || 'Unknown Store', vendorId: product.vendorId, image: product.image }];
    });
    if (loggedIn) {
      apiClient('/cart/items', { method: 'POST', body: JSON.stringify({ productId: product.id, quantity }) }).catch(() => {});
    }
  }, [loggedIn]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    if (loggedIn) {
      apiClient(`/cart/items/${id}`, { method: 'DELETE' }).catch(() => {});
    }
  }, [loggedIn]);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    if (loggedIn) {
      apiClient(`/cart/items/${id}`, { method: 'PATCH', body: JSON.stringify({ quantity }) }).catch(() => {});
    }
  }, [loggedIn, removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    if (loggedIn) {
      apiClient('/cart', { method: 'DELETE' }).catch(() => {});
    }
  }, [loggedIn]);

  const toggleWishlist = useCallback((product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      if (loggedIn) {
        apiClient(`/wishlist/${product.id}`, { method: 'DELETE' }).catch(() => {});
      }
      setWishlist(prev => prev.filter(item => item.id !== product.id));
    } else {
      if (loggedIn) {
        apiClient('/wishlist', { method: 'POST', body: JSON.stringify({ productId: product.id }) }).catch(() => {});
      }
      setWishlist(prev => [...prev, product]);
    }
  }, [loggedIn, wishlist]);

  const checkoutAndCommit = async (buyerId, shippingDetails, paymentMethod) => {
    setLoading(true);
    try {
      const items = cart.map(item => ({ id: item.id, quantity: item.quantity }));
      const data = await apiClient('/orders', {
        method: 'POST',
        body: JSON.stringify({ shippingDetails, paymentMethod, items }),
      });
      clearCart();
      await reloadFromDb();
      return data.order;
    } finally {
      setLoading(false);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, wishlist, loading, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, cartCount, cartTotal, checkoutAndCommit }}>
      {children}
    </CartContext.Provider>
  );
};
