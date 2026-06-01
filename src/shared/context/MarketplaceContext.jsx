import React, { createContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/shared/api/client';

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [disputes, setDisputes] = useState(null);
  const [auditLogs, setAuditLogs] = useState(null);
  const [orders, setOrders] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadFromDb = useCallback(async () => {
    setLoading(true);
    try {
      const prodRes = await apiClient('/products?limit=100');
      setProducts(prodRes.products || []);
    } catch {
      setProducts([]);
    }

    try {
      const orderRes = await apiClient('/orders?limit=100');
      setOrders(orderRes.orders || []);
    } catch {
      setOrders([]);
    }

    try {
      const disputeRes = await apiClient('/disputes?limit=100');
      setDisputes(disputeRes.disputes || []);
    } catch {
      setDisputes([]);
    }

    try {
      const vendorRes = await apiClient('/admin/vendors');
      const buyerRes = await apiClient('/admin/buyers');
      setUsers([
        ...(vendorRes.vendors || []).map(v => ({ ...v, role: 'vendor' })),
        ...(buyerRes.buyers || []).map(b => ({ ...b, role: 'buyer' })),
      ]);
    } catch {
      setUsers([]);
    }

    try {
      const auditRes = await apiClient('/admin/audit-logs?limit=100');
      setAuditLogs(auditRes.logs || auditRes.auditLogs || []);
    } catch {
      setAuditLogs([]);
    }

    setLoading(false);
  }, []);

  useEffect(() => { loadFromDb(); }, [loadFromDb]);

  const reloadFromDb = loadFromDb;

  const addProduct = async (product, author) => {
    const data = await apiClient('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    await reloadFromDb();
    return data;
  };

  const deleteProduct = async (productId, author) => {
    await apiClient(`/products/${productId}`, { method: 'DELETE' });
    await reloadFromDb();
  };

  const updateProductStock = async (productId, newStock, author) => {
    await apiClient(`/products/${productId}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ stock: newStock }),
    });
    await reloadFromDb();
  };

  const updateProduct = async (productId, updates, author) => {
    await apiClient(`/products/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    await reloadFromDb();
  };

  const resolveDispute = async (disputeId, decision, author) => {
    await apiClient(`/disputes/${disputeId}/resolve`, {
      method: 'PATCH',
      body: JSON.stringify({ decision }),
    });
    await reloadFromDb();
  };

  const approveVendor = async (userId, author) => {
    await apiClient(`/vendors/${userId}/approve`, { method: 'PATCH' });
    await reloadFromDb();
  };

  const suspendUser = async (userId, author) => {
    await apiClient(`/vendors/${userId}/suspend`, { method: 'PATCH' });
    await reloadFromDb();
  };

  const addReview = async (productId, review, author) => {
    await apiClient(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
    });
    await reloadFromDb();
  };

  const logAdminAction = async (adminName, action, resource) => {
    // Backend logs admin actions automatically on mutations
    console.log(`[Audit] ${adminName}: ${action} — ${resource}`);
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
