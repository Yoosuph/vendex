import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function AdminProducts() {
  const { products, users, loading, deleteProduct, updateProductStock } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const [dialog, setDialog] = useState({ open: false, title: '', message: '', action: null });
  const [editingStock, setEditingStock] = useState({ id: null, value: '' });

  const vendors = useMemo(() => (users || []).filter((u) => u.role === 'vendor'), [users]);

  const getVendorName = (product) => {
    if (product.vendorName) return product.vendorName;
    if (product.vendor) return typeof product.vendor === 'string' ? product.vendor : product.vendor.name || 'Unknown';
    const v = vendors.find((v) => v.id === product.vendorId);
    return v ? v.name : 'Unknown';
  };

  const filtered = useMemo(() => {
    return (products || []).filter((p) => {
      const matchSearch =
        !search ||
        (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.category || '').toLowerCase().includes(search.toLowerCase()) ||
        getVendorName(p).toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [products, search, vendors]);

  const totalProducts = (products || []).length;
  const lowStock = (products || []).filter((p) => (p.stock || 0) < 10 && (p.stock || 0) > 0).length;
  const outOfStock = (products || []).filter((p) => (p.stock || 0) === 0).length;

  const handleDelete = (product) => {
    setDialog({
      open: true,
      title: 'Delete Product',
      message: `Delete "${product.name}"? This action cannot be undone.`,
      action: () => {
        deleteProduct(product.id, user?.name || 'Admin');
        setDialog({ open: false, title: '', message: '', action: null });
      },
      variant: 'danger',
    });
  };

  const handleEditStock = (product) => {
    if (editingStock.id === product.id) {
      const newStock = parseInt(editingStock.value, 10);
      if (!isNaN(newStock) && newStock >= 0) {
        updateProductStock(product.id, newStock, user?.name || 'Admin');
      }
      setEditingStock({ id: null, value: '' });
    } else {
      setEditingStock({ id: product.id, value: String(product.stock || 0) });
    }
  };

  if (loading) return <LoadingSpinner text="Loading products..." />;

  return (
    <>
      <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24 overflow-x-hidden w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Global Product Inventory</h1>
            <p className="font-body-md text-sm sm:text-base text-secondary">
              Manage marketplace product listings across {vendors.length} vendors.
            </p>
          </div>
        </div>

        {/* Metric Cards (2-col on mobile, 4-col on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter">
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
            <span className="text-secondary text-xs font-semibold uppercase">Total Products</span>
            <p className="text-xl sm:text-2xl font-bold text-on-surface mt-1">{totalProducts}</p>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
            <span className="text-secondary text-xs font-semibold uppercase">Active Vendors</span>
            <p className="text-xl sm:text-2xl font-bold text-primary mt-1">{vendors.length}</p>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
            <span className="text-secondary text-xs font-semibold uppercase">Low Stock</span>
            <p className="text-xl sm:text-2xl font-bold text-warning mt-1">{lowStock}</p>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
            <span className="text-secondary text-xs font-semibold uppercase">Out of Stock</span>
            <p className="text-xl sm:text-2xl font-bold text-error mt-1">{outOfStock}</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/40 shadow-subtle">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">search</span>
            <input
              type="text"
              placeholder="Search products by name, category, or vendor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 text-center shadow-subtle">
            <EmptyState icon="inventory_2" title="No products found" description={search ? 'Try adjusting your search terms.' : 'No products in database.'} />
          </div>
        ) : (
          <>
            {/* Dedicated Mobile Product Cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((p) => {
                const vName = getVendorName(p);
                const isOutOfStock = (p.stock || 0) === 0;
                return (
                  <div key={p.id} className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-subtle flex gap-3.5 items-center">
                    <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden shrink-0">
                      <img alt={p.name} src={p.image} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider truncate">{vName}</span>
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', isOutOfStock ? 'bg-error-container text-error' : 'bg-success-container text-success')}>
                          {isOutOfStock ? 'Out of stock' : `${p.stock} in stock`}
                        </span>
                      </div>

                      <h3 className="font-semibold text-sm text-on-surface truncate">{p.name}</h3>

                      <div className="flex items-center justify-between mt-1">
                        <span className="font-bold text-on-surface buyer-price text-sm">${(p.price || 0).toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(p)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-error hover:bg-error-container/20 transition-colors"
                            aria-label="Delete product"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-surface-container-lowest rounded-2xl shadow-subtle border border-outline-variant/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Image</th>
                      <th className="px-4 py-3 font-semibold">Product</th>
                      <th className="px-4 py-3 font-semibold">Vendor</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold text-right">Price</th>
                      <th className="px-4 py-3 font-semibold text-right">Stock</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-sm">
                    {filtered.map((p) => {
                      const vName = getVendorName(p);
                      return (
                        <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="w-10 h-10 rounded-lg bg-surface-container overflow-hidden">
                              <img alt={p.name} src={p.image} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="px-4 py-3 font-semibold text-on-surface">{p.name}</td>
                          <td className="px-4 py-3 text-secondary">{vName}</td>
                          <td className="px-4 py-3 text-secondary">{p.category}</td>
                          <td className="px-4 py-3 text-right font-mono font-bold text-on-surface">${(p.price || 0).toFixed(2)}</td>
                          <td className="px-4 py-3 text-right font-mono">
                            {editingStock.id === p.id ? (
                              <input
                                autoFocus
                                type="number"
                                value={editingStock.value}
                                onChange={(e) => setEditingStock({ ...editingStock, value: e.target.value })}
                                onBlur={() => handleEditStock(p)}
                                onKeyDown={(e) => e.key === 'Enter' && handleEditStock(p)}
                                className="w-16 px-1 py-0.5 border rounded text-right"
                              />
                            ) : (
                              <span onClick={() => handleEditStock(p)} className="cursor-pointer hover:underline">
                                {p.stock}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => handleDelete(p)}
                              className="p-1.5 text-secondary hover:text-error hover:bg-error-container/20 rounded-lg transition-colors"
                              aria-label="Delete product"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={dialog.open}
        title={dialog.title}
        message={dialog.message}
        variant={dialog.variant || 'danger'}
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={dialog.action}
        onCancel={() => setDialog({ open: false, title: '', message: '', action: null })}
      />
    </>
  );
}
