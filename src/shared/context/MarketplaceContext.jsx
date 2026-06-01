import React, { createContext, useState, useEffect, useRef } from 'react';
import { mockDb } from "@/shared/db/mockDb";

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [disputes, setDisputes] = useState(null);
  const [auditLogs, setAuditLogs] = useState(null);
  const [orders, setOrders] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const saveTimerRef = useRef(null);

  const loadFromDb = () => {
    setLoading(true);
    setProducts(mockDb.get('products', []));
    setOrders(mockDb.get('orders', []));
    setUsers(mockDb.get('users', []));
    setDisputes(mockDb.get('disputes', []));
    setAuditLogs(mockDb.get('audit_logs', []));
    setLoading(false);
  };

  useEffect(() => { loadFromDb(); }, []);

  const reloadFromDb = () => {
    setProducts(mockDb.get('products', []));
    setOrders(mockDb.get('orders', []));
    setUsers(mockDb.get('users', []));
    setDisputes(mockDb.get('disputes', []));
    setAuditLogs(mockDb.get('audit_logs', []));
  };

  useEffect(() => {
    if (products === null || disputes === null || auditLogs === null || orders === null || users === null) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      mockDb.set('products', products);
      mockDb.set('disputes', disputes);
      mockDb.set('audit_logs', auditLogs);
      mockDb.set('orders', orders);
      mockDb.set('users', users);
    }, 300);
  }, [products, disputes, auditLogs, orders, users]);

  const logAdminAction = (adminName, action, resource) => {
    const newLog = {
      id: 'log_' + Date.now(),
      timestamp: new Date().toLocaleString(),
      admin: adminName || "System Core",
      action,
      resource,
      status: "Success",
      ip: "192.168.1." + Math.floor(Math.random() * 254)
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addProduct = (product, author) => {
    const newProduct = {
      ...product,
      id: 'p_' + Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      reviews: []
    };
    setProducts(prev => [newProduct, ...prev]);
    logAdminAction(author, "ADD_PRODUCT", `Added product "${product.name}"`);
    return newProduct;
  };

  const deleteProduct = (productId, author) => {
    const prod = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    logAdminAction(author, "DELETE_PRODUCT", `Deleted product ID "${productId}" (${prod?.name})`);
  };

  const updateProductStock = (productId, newStock, author) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
    logAdminAction(author, "UPDATE_STOCK", `Updated stock for product ID "${productId}" to ${newStock}`);
  };

  const updateProduct = (productId, updates, author) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
    logAdminAction(author, "UPDATE_PRODUCT", `Updated product ID "${productId}"`);
  };

  const resolveDispute = (disputeId, decision, author) => {
    setDisputes(prev => prev.map(d => d.id === disputeId ? { ...d, status: 'Resolved', decision } : d));
    logAdminAction(author, "RESOLVE_DISPUTE", `Arbitrated Dispute #${disputeId} in favor of ${decision}`);
  };

  const approveVendor = (userId, author) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'approved', vendorId: u.vendorId || 'v_' + Date.now() } : u));
    logAdminAction(author, "APPROVE_VENDOR", `Approved vendor ${userId}`);
  };

  const suspendUser = (userId, author) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'suspended' } : u));
    logAdminAction(author, "SUSPEND_USER", `Suspended user ${userId}`);
  };

  const addReview = (productId, review, author) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const newReview = {
        id: 'rev_' + Date.now(),
        ...review,
        date: new Date().toISOString(),
      };
      const reviews = [...(p.reviews || []), newReview];
      const totalScore = reviews.reduce((sum, r) => sum + (r.score || 0), 0);
      const newRating = reviews.length > 0 ? totalScore / reviews.length : 0;
      return {
        ...p,
        reviews,
        reviewsCount: reviews.length,
        rating: Math.round(newRating * 10) / 10,
      };
    }));
    logAdminAction(author || review.reviewer, "ADD_REVIEW", `Added review to product ID "${productId}"`);
  };

  return (
    <MarketplaceContext.Provider value={{
      products, disputes, auditLogs, orders, users, loading,
      addProduct, deleteProduct, updateProductStock, updateProduct,
      resolveDispute, logAdminAction, approveVendor, suspendUser,
      addReview, reloadFromDb
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};
