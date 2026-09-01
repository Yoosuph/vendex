import React, { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import { cn } from '@/utils/cn';

export default function VendorProducts() {
  const { products, deleteProduct, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filter, setFilter] = useState('all');

  const vendorProducts = useMemo(() => {
    if (!user?.vendorId) return [];
    return products.filter((p) => p.vendorId === user.vendorId);
  }, [products, user]);

  const filteredProducts = useMemo(() => {
    if (filter === 'low') return vendorProducts.filter((p) => p.stock > 0 && p.stock <= 10);
    if (filter === 'out') return vendorProducts.filter((p) => p.stock === 0);
    return vendorProducts;
  }, [vendorProducts, filter]);

  const totalProducts = vendorProducts.length;
  const activeProducts = vendorProducts.filter((p) => p.stock > 0).length;
  const lowStock = vendorProducts.filter((p) => p.stock > 0 && p.stock <= 10).length;

  const handleDelete = (productId, productName) => {
    setDeleteTarget({ id: productId, name: productName });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id, user?.name);
      setDeleteTarget(null);
    }
  };

  if (loading) return <LoadingSpinner text="Loading products..." />;

  return (
    <>
      <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24 overflow-x-hidden w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Product Inventory</h1>
            <p className="font-body-md text-sm sm:text-base text-secondary">
              Manage your catalog, stock levels, and visibility across Vendex.
            </p>
          </div>
          <Link
            to="/vendor/add-product"
            className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 text-sm font-semibold self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Metric Cards: 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter">
          <div className="bg-surface-container-lowest p-4 sm:p-md rounded-2xl shadow-subtle border border-outline-variant/30">
            <span className="text-secondary text-xs sm:text-label-md font-medium">Total Products</span>
            <div className="flex items-end justify-between mt-1">
              <span className="text-xl sm:text-headline-md font-bold text-on-surface">{totalProducts}</span>
              <span className="text-success text-[11px] font-bold">Active</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 sm:p-md rounded-2xl shadow-subtle border border-outline-variant/30">
            <span className="text-secondary text-xs sm:text-label-md font-medium">Active Listings</span>
            <div className="flex items-end justify-between mt-1">
              <span className="text-xl sm:text-headline-md font-bold text-on-surface">{activeProducts}</span>
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 sm:p-md rounded-2xl shadow-subtle border border-outline-variant/30">
            <span className="text-secondary text-xs sm:text-label-md font-medium">Low Stock</span>
            <div className="flex items-end justify-between mt-1">
              <span className="text-xl sm:text-headline-md font-bold text-on-surface">{lowStock}</span>
              <span className="text-primary text-[11px] font-bold">{lowStock > 0 ? 'Action Needed' : 'OK'}</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 sm:p-md rounded-2xl shadow-subtle border border-outline-variant/30">
            <span className="text-secondary text-xs sm:text-label-md font-medium">Out of Stock</span>
            <div className="flex items-end justify-between mt-1">
              <span className="text-xl sm:text-headline-md font-bold text-on-surface">
                {vendorProducts.filter((p) => p.stock === 0).length}
              </span>
              <span className="material-symbols-outlined text-secondary text-lg">inventory</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors',
              filter === 'all' ? 'bg-primary text-white' : 'bg-surface-container-lowest text-secondary border border-outline-variant/40'
            )}
          >
            All Products ({totalProducts})
          </button>
          <button
            onClick={() => setFilter('low')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors',
              filter === 'low' ? 'bg-primary text-white' : 'bg-surface-container-lowest text-secondary border border-outline-variant/40'
            )}
          >
            Low Stock ({lowStock})
          </button>
          <button
            onClick={() => setFilter('out')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors',
              filter === 'out' ? 'bg-primary text-white' : 'bg-surface-container-lowest text-secondary border border-outline-variant/40'
            )}
          >
            Out of Stock ({vendorProducts.filter((p) => p.stock === 0).length})
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 text-center shadow-subtle">
            <EmptyState
              icon="inventory_2"
              title="No products found"
              description="Add your first product to start selling on Vendex."
              actionText="Add New Product"
              onAction={() => navigate('/vendor/add-product')}
            />
          </div>
        ) : (
          <>
            {/* Dedicated Mobile Products Cards (Mobile Only) */}
            <div className="md:hidden space-y-3">
              {filteredProducts.map((product) => {
                const isOutOfStock = product.stock === 0;
                return (
                  <div
                    key={product.id}
                    className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/40 shadow-subtle flex gap-3.5 items-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden shrink-0">
                      <img alt={product.name} src={product.image} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider truncate">
                          {product.category}
                        </span>
                        <span
                          className={cn(
                            'text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0',
                            isOutOfStock
                              ? 'bg-error-container text-error'
                              : 'bg-success-container text-success'
                          )}
                        >
                          {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
                        </span>
                      </div>

                      <h3 className="font-semibold text-sm text-on-surface truncate">{product.name}</h3>

                      <div className="flex items-center justify-between mt-1">
                        <span className="font-bold text-primary buyer-price text-sm">
                          ${(product.price || 0).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
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

            {/* Desktop Table View (Tablet & Desktop Only) */}
            <div className="hidden md:block bg-surface-container-lowest rounded-2xl shadow-subtle border border-outline-variant/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Image</th>
                      <th className="px-4 py-3 font-semibold">Product Name</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold text-right">Stock</th>
                      <th className="px-4 py-3 font-semibold text-right">Price</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-sm">
                    {filteredProducts.map((product) => {
                      const isOutOfStock = product.stock === 0;
                      const imgSrc = product.image || product.images?.[0];
                      return (
                        <tr key={product.id} className="hover:bg-surface-container-low/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="h-12 w-12 rounded-lg bg-surface-container border border-outline-variant/30 overflow-hidden flex items-center justify-center">
                              {imgSrc ? (
                                <img
                                  alt={product.name}
                                  src={imgSrc}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <span className="material-symbols-outlined text-secondary text-lg">inventory_2</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-on-surface block">{product.name}</span>
                            <span className="text-xs text-secondary font-mono">SKU: {product.id.slice(0, 8).toUpperCase()}</span>
                          </td>
                          <td className="px-4 py-3 text-secondary">{product.category}</td>
                          <td className="px-4 py-3 text-on-surface text-right font-mono font-semibold">{product.stock}</td>
                          <td className="px-4 py-3 text-on-surface text-right font-mono font-bold">${(product.price || 0).toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                                isOutOfStock
                                  ? 'bg-error-container text-error'
                                  : 'bg-success-container text-success'
                              )}
                            >
                              {isOutOfStock ? 'Out of Stock' : 'Active'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => handleDelete(product.id, product.name)}
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

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Product"
          message={`Delete "${deleteTarget.name}"? This cannot be undone.`}
          confirmLabel="Delete"
          variant="danger"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
