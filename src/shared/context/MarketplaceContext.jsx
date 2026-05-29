import React, { createContext, useState, useEffect } from 'react';
import { mockDb } from "@/shared/db/mockDb";

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [products, setProducts] = useState(() => mockDb.get('products', []));
  const [disputes, setDisputes] = useState(() => mockDb.get('disputes', []));
  const [auditLogs, setAuditLogs] = useState(() => mockDb.get('audit_logs', []));
  const [orders, setOrders] = useState(() => mockDb.get('orders', []));
  const [users, setUsers] = useState(() => mockDb.get('users', []));
  const [loading, setLoading] = useState(false); // data is sync from mockDb, set true for async operations

  useEffect(() => { mockDb.set('products', products); }, [products]);
  useEffect(() => { mockDb.set('disputes', disputes); }, [disputes]);
  useEffect(() => { mockDb.set('audit_logs', auditLogs); }, [auditLogs]);
  useEffect(() => { mockDb.set('orders', orders); }, [orders]);
  useEffect(() => { mockDb.set('users', users); }, [users]);

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
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'approved' } : u));
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
      addReview
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};
