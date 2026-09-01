import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { apiClient } from '@/shared/api/client';
import { AuthContext } from '@/shared/context/AuthContext';

export const MarketplaceContext = createContext();

const ORDER_STATUS_MAP = {
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
  PENDING: 'Pending',
};

const VENDOR_STATUS_MAP = {
  APPROVED: 'approved',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
};

const DISPUTE_STATUS_MAP = {
  OPEN: 'Open',
  UNDER_REVIEW: 'Under Review',
  RESOLVED: 'Resolved',
  DISMISSED: 'Dismissed',
};

function normalizeOrder(order) {
  const displayId = order.displayId || order.id;
  return {
    ...order,
    id: order.id,
    displayId,
    orderId: displayId,
    status: ORDER_STATUS_MAP[order.status] || order.status,
    date: order.createdAt,
  };
}

function normalizeVendor(v) {
  return {
    ...v,
    role: 'vendor',
    status: VENDOR_STATUS_MAP[v.status] || v.status,
  };
}

function normalizeBuyer(b) {
  return {
    ...b,
    role: 'buyer',
  };
}

function normalizeProduct(p) {
  return {
    ...p,
    vendor: p.vendorName || p.vendor || 'Unknown Store',
    category: p.categoryName || p.category || '',
    brand: p.brand || '',
    reviews: p.reviews || [],
    image: p.image || p.images?.[0] || null,
  };
}

function normalizeDispute(d) {
  return {
    ...d,
    status: DISPUTE_STATUS_MAP[d.status] || d.status,
  };
}

export const MarketplaceProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  const loadFromDb = useCallback(async () => {
    setLoading(true);

    // Public / auth-agnostic — always safe
    try {
      const [prodRes, catRes] = await Promise.all([
        apiClient('/products?limit=100'),
        apiClient('/categories'),
      ]);
      setProducts((prodRes.products || []).map(normalizeProduct));
      setCategories(catRes.categories || []);
    } catch {
      setProducts([]);
      setCategories([]);
    }

    // Authenticated data — only query if user is logged in
    if (user) {
      try {
        const orderRes = await apiClient('/orders?limit=100');
        setOrders((orderRes.orders || []).map(normalizeOrder));
      } catch {
        setOrders([]);
      }

      try {
        const disputeRes = await apiClient('/disputes?limit=100');
        setDisputes((disputeRes.disputes || []).map(normalizeDispute));
      } catch {
        setDisputes([]);
      }
    } else {
      setOrders([]);
      setDisputes([]);
    }

    // Admin-only endpoints — skip entirely for non-admins to avoid 401 noise
    if (isAdmin) {
      try {
        const vendorRes = await apiClient('/admin/vendors');
        const buyerRes = await apiClient('/admin/buyers');
        setUsers([
          ...(vendorRes.vendors || []).map(normalizeVendor),
          ...(buyerRes.buyers || []).map(normalizeBuyer),
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
    } else {
      setUsers([]);
      setAuditLogs([]);
    }

    setLoading(false);
  }, [isAdmin, user]);

  // Reload catalog + role-scoped data when auth changes
  useEffect(() => {
    loadFromDb();
  }, [loadFromDb, user?.id]);

  const reloadFromDb = loadFromDb;

  const addProduct = async (product, author) => {
    let categoryId = product.categoryId;
    if (!categoryId && product.category) {
      try {
        const catRes = await apiClient('/categories');
        const cats = catRes.categories || [];
        const match = cats.find(
          (c) => c.name.toLowerCase() === (product.category || '').toLowerCase(),
        );
        categoryId = match?.id;
      } catch {
        /* fall through */
      }
    }

    const dto = {
      name: product.name,
      categoryId: categoryId || product.category,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image,
      images: product.images,
    };

    const data = await apiClient('/products', {
      method: 'POST',
      body: JSON.stringify(dto),
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
    const dto = { ...updates };
    const stockUpdate = dto.stock;
    delete dto.stock;

    if (dto.category && !dto.categoryId) {
      try {
        const catRes = await apiClient('/categories');
        const cats = catRes.categories || [];
        const match = cats.find(
          (c) => c.name.toLowerCase() === dto.category.toLowerCase(),
        );
        if (match) {
          dto.categoryId = match.id;
          delete dto.category;
        }
      } catch {
        /* fall through */
      }
    }

    delete dto.vendor;
    delete dto.vendorId;

    if (Object.keys(dto).length > 0) {
      await apiClient(`/products/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify(dto),
      });
    }

    if (stockUpdate !== undefined) {
      await apiClient(`/products/${productId}/stock`, {
        method: 'PATCH',
        body: JSON.stringify({ stock: stockUpdate }),
      });
    }

    await reloadFromDb();
  };

  const addCategory = async (categoryData) => {
    const data = await apiClient('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
    await reloadFromDb();
    return data;
  };

  const updateCategory = async (id, categoryData) => {
    const data = await apiClient(`/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(categoryData),
    });
    await reloadFromDb();
    return data;
  };

  const deleteCategory = async (id) => {
    const data = await apiClient(`/categories/${id}`, {
      method: 'DELETE',
    });
    await reloadFromDb();
    return data;
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
    console.log(`[Audit] ${adminName}: ${action} — ${resource}`);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        categories,
        disputes,
        auditLogs,
        orders,
        users,
        loading,
        addProduct,
        deleteProduct,
        updateProductStock,
        updateProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        resolveDispute,
        logAdminAction,
        approveVendor,
        suspendUser,
        addReview,
        reloadFromDb,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

