import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  const [reviewModal, setReviewModal] = useState(null);
  const [search, setSearch] = useState('');
  const [dialog, setDialog] = useState({ open: false, title: '', message: '', action: null });
  const [editingStock, setEditingStock] = useState({ id: null, value: '' });

  const vendors = useMemo(() => users.filter(u => u.role === 'vendor'), [users]);

  const getVendorName = (product) => {
    if (product.vendorName) return product.vendorName;
    if (product.vendor) return typeof product.vendor === 'string' ? product.vendor : product.vendor.name || 'Unknown';
    const v = vendors.find(v => v.id === product.vendorId);
    return v ? v.name : 'Unknown';
  };

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search ||
        (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.category || '').toLowerCase().includes(search.toLowerCase()) ||
        getVendorName(p).toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [products, search, vendors]);

  const totalProducts = products.length;
  const lowStock = products.filter(p => (p.stock || 0) < 10 && (p.stock || 0) > 0).length;
  const outOfStock = products.filter(p => (p.stock || 0) === 0).length;

  const handleDelete = (product) => {
    setDialog({
      open: true,
      title: 'Delete Product',
      message: `Delete "${product.name}"? This action cannot be undone.`,
      action: () => {
        deleteProduct(product.id, user?.name || 'Admin');
        setDialog({ open: false, title: '', message: '', action: null });
      },
      variant: 'danger'
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

  if (loading) return <div className="pt-16"><LoadingSpinner text="Loading products..." /></div>;

  return (
    <>
      <main className="pt-16 min-h-screen">
        <div className="p-gutter max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Product Inventory</h2>
              <p className="text-on-surface-variant font-body-md">Manage global product listings across {vendors.length} vendors.</p>
            </div>
            <div className="flex gap-sm">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input
                  className="bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-primary outline-none text-label-md"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Button variant="primary"><span className="material-symbols-outlined mr-2">download</span>
                Export CSV</Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-md mb-lg">
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Total Products</p>
              <p className="text-headline-md font-bold text-on-surface">{totalProducts}</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Low Stock</p>
              <p className="text-headline-md font-bold text-primary">{lowStock}</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Out of Stock</p>
              <p className="text-headline-md font-bold text-on-surface">{outOfStock}</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Rating</p>
              <p className="text-headline-md font-bold text-on-surface">
                {products.length > 0 ? (products.reduce((s, p) => s + (p.rating || 5), 0) / products.length).toFixed(1) : 'N/A'}
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon="inventory_2" title="No products found" description={search ? 'Try adjusting your search.' : 'No products in the inventory yet.'} />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="px-md py-4 font-label-md text-on-surface-variant">Product Name</th>
                    <th className="px-md py-4 font-label-md text-on-surface-variant">Vendor</th>
                    <th className="px-md py-4 font-label-md text-on-surface-variant">Category</th>
                    <th className="px-md py-4 font-label-md text-on-surface-variant">Price</th>
                    <th className="px-md py-4 font-label-md text-on-surface-variant">Stock</th>
                    <th className="px-md py-4 font-label-md text-on-surface-variant">Rating</th>
                    <th className="px-md py-4 font-label-md text-on-surface-variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-md py-4">
                        <div className="flex items-center gap-sm">
                          {p.image ? (
                            <img className="w-10 h-10 rounded object-cover border border-outline-variant" src={p.image} alt={p.name} />
                          ) : (
                            <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
                              <span className="material-symbols-outlined text-on-surface-variant">inventory_2</span>
                            </div>
                          )}
                          <div>
                            <p className="font-label-md text-on-surface">{p.name}</p>
                            <p className="text-meta text-on-surface-variant">ID: {p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-md py-4 text-on-surface-variant">{getVendorName(p)}</td>
                      <td className="px-md py-4 text-on-surface-variant">{p.category || 'N/A'}</td>
                      <td className="px-md py-4 font-bold text-on-surface">${Number(p.price || 0).toFixed(2)}</td>
                      <td className="px-md py-4">
                        {editingStock.id === p.id ? (
                          <div className="flex items-center gap-xs">
                            <input
                              className="w-16 border border-outline-variant rounded px-2 py-1 text-sm"
                              type="number"
                              value={editingStock.value}
                              onChange={e => setEditingStock({ ...editingStock, value: e.target.value })}
                              onKeyDown={e => e.key === 'Enter' && handleEditStock(p)}
                            />
                            <Button variant="ghost" onClick={() => handleEditStock(p)}>✓</Button>
                            <Button variant="danger" onClick={() => setEditingStock({ id: null, value: '' })}>✗</Button>
                          </div>
                        ) : (
                          <span className={cn((p.stock || 0) === 0 ? 'text-error font-bold' : (p.stock || 0) < 10 ? 'text-amber-600' : '')}>
                            {p.stock || 0} units
                          </span>
                        )}
                      </td>
                      <td className="px-md py-4">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-primary text-sm icon-filled">star</span>
                          <span className="font-bold">{(p.rating || 5).toFixed(1)}</span>
                          <span className="text-on-surface-variant text-xs">({p.reviewsCount || 0})</span>
                        </div>
                      </td>
                      <td className="px-md py-4 text-right">
                        <div className="flex justify-end gap-xs">
                          <Button variant="ghost" onClick={() => setEditingStock({ id: p.id, value: String(p.stock || 0) })} icon={<span className="material-symbols-outlined">edit</span>} />
                          <Button variant="ghost" onClick={() => setReviewModal(p)} icon={<span className="material-symbols-outlined">visibility</span>} />
                          <Button variant="danger" onClick={() => handleDelete(p)} icon={<span className="material-symbols-outlined">delete</span>} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-md py-4 bg-surface-container-low flex justify-between items-center border-t border-outline-variant">
                <p className="text-meta text-on-surface-variant">Showing {filtered.length} of {totalProducts} products</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-md">
          <div className="modal-overlay absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setReviewModal(null)}></div>
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <div className="p-lg">
              <div className="flex justify-between items-start mb-lg">
                <div>
                  <h3 className="text-headline-md font-bold text-on-surface">{reviewModal.name}</h3>
                  <p className="text-primary font-label-md">{getVendorName(reviewModal)}</p>
                </div>
                <Button variant="ghost" onClick={() => setReviewModal(null)} icon={<span className="material-symbols-outlined">close</span>} />
              </div>
              <div className="grid grid-cols-3 gap-md mb-lg">
                <div><p className="text-meta text-on-surface-variant uppercase">Price</p><p className="font-bold text-headline-md">${Number(reviewModal.price || 0).toFixed(2)}</p></div>
                <div><p className="text-meta text-on-surface-variant uppercase">Category</p><p className="font-label-md">{reviewModal.category || 'N/A'}</p></div>
                <div><p className="text-meta text-on-surface-variant uppercase">Stock</p><p className="font-label-md">{reviewModal.stock || 0} units</p></div>
              </div>
              <div className="p-md bg-surface-container-low rounded-lg border border-outline-variant mb-lg">
                <p className="font-label-md text-on-surface mb-1">Description</p>
                <p className="text-body-sm text-on-surface-variant">{reviewModal.description || 'No description provided.'}</p>
              </div>

              {/* Reviews section */}
              <div>
                <p className="font-label-md text-on-surface mb-sm">Reviews ({reviewModal.reviewsCount || 0})</p>
                {reviewModal.reviews && reviewModal.reviews.length > 0 ? (
                  <div className="space-y-sm max-h-60 overflow-y-auto">
                    {reviewModal.reviews.map((r, i) => (
                      <div key={i} className="p-sm bg-surface-container-lowest rounded-lg border border-outline-variant">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs">{r.user?.slice(0, 2).toUpperCase() || 'U'}</div>
                            <span className="font-label-sm">{r.user || 'Anonymous'}</span>
                          </div>
                          <div className="flex text-primary">
                            {Array.from({ length: r.rating || 5 }).map((_, j) => (
                              <span key={j} className="material-symbols-outlined text-body-sm icon-filled">star</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-body-sm text-on-surface-variant mt-1">{r.comment || r.text || 'No comment.'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-body-sm text-on-surface-variant">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={dialog.open}
        title={dialog.title}
        message={dialog.message}
        variant={dialog.variant || 'danger'}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={dialog.action}
        onCancel={() => setDialog({ open: false, title: '', message: '', action: null })}
      />
    </>
  );
}
