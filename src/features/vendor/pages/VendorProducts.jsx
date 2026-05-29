import React, { useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function VendorProducts() {
  const { products, deleteProduct, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const vendorProducts = useMemo(() => {
    if (!user?.vendorId) return [];
    return products.filter(p => p.vendorId === user.vendorId);
  }, [products, user]);

  const totalProducts = vendorProducts.length;
  const activeProducts = vendorProducts.filter(p => p.stock > 0).length;
  const lowStock = vendorProducts.filter(p => p.stock > 0 && p.stock <= 10).length;

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Delete "${productName}"? This cannot be undone.`)) {
      deleteProduct(productId, user?.name);
    }
  };

  if (loading) return <LoadingSpinner text="Loading products..." />;

  return (
    <div className="max-w-container-max mx-auto flex">
      <main className="flex-1 p-gutter md:p-xl">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Product Inventory</h1>
            <p className="font-body-md text-body-md text-secondary">Manage your catalog, stock levels and visibility across Vendex.</p>
          </div>
          <Link to="/vendor/add-product" className="bg-primary hover:bg-primary-container text-on-primary px-md py-xs rounded-lg flex items-center justify-center gap-xs transition-all shadow-sm active:scale-[0.98]">
            <span className="material-symbols-outlined text-body-lg">add</span>
            <span className="font-label-md text-label-md uppercase tracking-wide">Add New Product</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-xl">
          <div className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/30">
            <span className="text-secondary font-label-md text-label-md">Total Products</span>
            <div className="flex items-end justify-between mt-xs">
              <span className="font-headline-md text-headline-md">{totalProducts}</span>
              <span className="text-success font-label-sm text-label-sm flex items-center">Active</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/30">
            <span className="text-secondary font-label-md text-label-md">Active Listings</span>
            <div className="flex items-end justify-between mt-xs">
              <span className="font-headline-md text-headline-md">{activeProducts}</span>
              <span className="material-symbols-outlined text-primary">check_circle</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/30">
            <span className="text-secondary font-label-md text-label-md">Low Stock</span>
            <div className="flex items-end justify-between mt-xs">
              <span className="font-headline-md text-headline-md">{lowStock}</span>
              <span className="text-primary font-label-sm text-label-sm">{lowStock > 0 ? 'Requires Action' : 'OK'}</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/30">
            <span className="text-secondary font-label-md text-label-md">Drafts</span>
            <div className="flex items-end justify-between mt-xs">
              <span className="font-headline-md text-headline-md">0</span>
              <span className="material-symbols-outlined text-secondary">edit_note</span>
            </div>
          </div>
        </div>

        {vendorProducts.length === 0 ? (
          <EmptyState
            icon="inventory_2"
            title="No products yet"
            description="Add your first product to start selling on Vendex."
            actionLabel="Add New Product"
            onAction={() => navigate('/vendor/add-product')}
          />
        ) : (
          <div className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/30 overflow-hidden">
            <div className="px-md py-sm border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-md">
                <Button variant="outline">All Items</Button>
                <Button variant="ghost">Out of Stock</Button>
                <Button variant="ghost">Drafts</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                  <tr>
                    <th className="px-md py-sm font-medium">Image</th>
                    <th className="px-md py-sm font-medium">Product Name</th>
                    <th className="px-md py-sm font-medium">Category</th>
                    <th className="px-md py-sm font-medium text-right">Stock</th>
                    <th className="px-md py-sm font-medium text-right">Price</th>
                    <th className="px-md py-sm font-medium">Status</th>
                    <th className="px-md py-sm font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {vendorProducts.map(product => {
                    const statusBadge = product.stock > 0
                      ? { label: 'Active', className: 'bg-success-container text-success' }
                      : { label: 'Out of Stock', className: 'bg-error-container text-error' };
                    return (
                      <tr key={product.id} className="hover:bg-surface-container-lowest transition-colors group">
                        <td className="px-md py-sm">
                          <div className="h-12 w-12 rounded-lg bg-surface border border-outline-variant/30 overflow-hidden">
                            <img alt={product.name} src={product.image} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="px-md py-sm">
                          <span className="font-label-md text-label-md text-on-surface block">{product.name}</span>
                          <span className="font-meta text-meta text-secondary">SKU: {product.id.toUpperCase()}</span>
                        </td>
                        <td className="px-md py-sm font-body-sm text-body-sm text-secondary">{product.category}</td>
                        <td className="px-md py-sm font-body-sm text-body-sm text-on-surface text-right">{product.stock}</td>
                        <td className="px-md py-sm font-label-md text-label-md text-on-surface text-right">${(product.price || 0).toFixed(2)}</td>
                        <td className="px-md py-sm">
                          <span className={cn('px-xs py-0.5 rounded-full font-label-sm text-label-sm', statusBadge.className)}>{statusBadge.label}</span>
                        </td>
                        <td className="px-md py-sm text-right">
                          <div className="flex items-center justify-end gap-xs">
                            <Button variant="primary"><span className="material-symbols-outlined text-body-lg">edit</span></Button>
                            <Button variant="primary" onClick={() => handleDelete(product.id, product.name)}><span className="material-symbols-outlined text-body-lg">delete</span></Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-md py-sm border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
              <span className="font-meta text-meta text-secondary">Showing 1 to {vendorProducts.length} of {totalProducts} results</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
