import React, { createContext, useState, useEffect, useContext } from 'react';
import { mockDb } from "@/shared/db/mockDb";
import { MarketplaceContext } from "@/shared/context/MarketplaceContext";

const CHECKOUT_CONFIG = { taxRate: 0.08, shippingFlat: 15.00 };

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

  const { reloadFromDb } = useContext(MarketplaceContext);

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

    for (const item of cart) {
      const prod = products.find(p => p.id === item.id);
      if (!prod || prod.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.name}`);
      }
    }

    const updatedProducts = products.map(prod => {
      const cartItem = cart.find(item => item.id === prod.id);
      if (cartItem) {
        return { ...prod, stock: prod.stock - cartItem.quantity };
      }
      return prod;
    });
    mockDb.set('products', updatedProducts);

    const orders = mockDb.get('orders');
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder = {
      id: "VX-" + Math.floor(10000 + Math.random() * 90000), buyerId, items: [...cart],
      total: subtotal * (1 + CHECKOUT_CONFIG.taxRate) + CHECKOUT_CONFIG.shippingFlat,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Processing", shippingDetails, paymentMethod
    };
    mockDb.set('orders', [...orders, newOrder]);
    clearCart();
    reloadFromDb();
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
