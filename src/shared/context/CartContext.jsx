import React, { createContext, useState, useEffect } from 'react';
import { mockDb } from "@/shared/db/mockDb";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('vendex_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('vendex_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => { localStorage.setItem('vendex_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('vendex_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity, vendor: product.vendor || 'Unknown Store', vendorId: product.vendorId, image: product.image }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id, quantity) => { if (quantity <= 0) { removeFromCart(id); return; } setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item)); };
  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => { const exists = prev.some(item => item.id === product.id); if (exists) return prev.filter(item => item.id !== product.id); return [...prev, product]; });
  };

  const checkoutAndCommit = (buyerId, shippingDetails, paymentMethod) => {
    const products = mockDb.get('products');
    cart.forEach(item => { const prod = products.find(p => p.id === item.id); if (prod) prod.stock = Math.max(0, prod.stock - item.quantity); });
    mockDb.set('products', products);
    const orders = mockDb.get('orders');
    const newOrder = {
      id: "VX-" + Math.floor(10000 + Math.random() * 90000), buyerId, items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 1.08 + 15.00,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Processing", shippingDetails, paymentMethod
    };
    mockDb.set('orders', [...orders, newOrder]);
    clearCart();
    return newOrder;
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, wishlist, loading, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, cartCount, cartTotal, checkoutAndCommit }}>
      {children}
    </CartContext.Provider>
  );
};
