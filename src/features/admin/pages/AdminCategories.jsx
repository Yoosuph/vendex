import React, { useState, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { useToast } from '@/shared/context/ToastContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import Button from '@/shared/components/Button';

export default function AdminCategories() {
  const {
    products,
    categories: rawCategories,
    loading,
    addCategory,
    deleteCategory,
  } = useContext(MarketplaceContext);
  const { addToast } = useToast();

  const [newCategoryOpen, setNewCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    parent: '',
  });
  const [dialog, setDialog] = useState({
    open: false,
    title: '',
    message: '',
    action: null,
  });

  const categories = useMemo(() => {
    if (rawCategories && rawCategories.length > 0) {
      return rawCategories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        productCount: c.productCount ?? 0,
      }));
    }
    const catMap = {};
    products.forEach((p) => {
      const cat = p.category || 'Uncategorized';
      if (!catMap[cat])
        catMap[cat] = {
          name: cat,
          productCount: 0,
          slug: cat.toLowerCase().replace(/\s+/g, '-'),
        };
      catMap[cat].productCount++;
    });
    return Object.values(catMap).sort((a, b) => b.productCount - a.productCount);
  }, [rawCategories, products]);

  const handleDeleteCategory = (cat) => {
    setDialog({
      open: true,
      title: 'Delete Category',
      message: `Delete "${cat.name}"? Products in this category will be preserved under General/Uncategorized.`,
      action: async () => {
        try {
          if (cat.id) {
            await deleteCategory(cat.id);
            addToast(`Category "${cat.name}" deleted successfully`, 'success');
          }
        } catch (err) {
          addToast(err.message || 'Failed to delete category', 'error');
        } finally {
          setDialog({ open: false, title: '', message: '', action: null });
        }
      },
      variant: 'danger',
    });
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;
    try {
      await addCategory({
        name: newCategory.name.trim(),
        slug: newCategory.slug.trim() || undefined,
        description: newCategory.description.trim() || undefined,
      });
      addToast(`Category "${newCategory.name}" created successfully`, 'success');
      setNewCategoryOpen(false);
      setNewCategory({ name: '', slug: '', description: '', parent: '' });
    } catch (err) {
      addToast(err.message || 'Failed to create category', 'error');
    }
  };


  if (loading) return <div className="pt-header"><LoadingSpinner text="Loading categories..." /></div>;

  return (
    <>
      <div className="pt-header min-h-screen">
        <div className="max-w-container-max mx-auto px-gutter py-lg">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <nav className="flex gap-xs text-secondary text-sm mb-xs">
                <span>Marketplace</span>
                <span>/</span>
                <span className="text-primary font-medium">Categories Management</span>
              </nav>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Categories Management</h2>
            </div>
            <Button variant="primary" onClick={() => setNewCategoryOpen(!newCategoryOpen)} icon={<span className="material-symbols-outlined">add_circle</span>}>
              Add New Category
            </Button>
          </div>

          <div className="grid grid-cols-12 gap-gutter items-start">
            {/* Category sidebar */}
            <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden border border-outline-variant">
              <div className="p-md border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
                <h3 className="font-bold text-primary">Categories</h3>
                <span className="text-xs text-secondary">Total: {categories.length}</span>
              </div>
              {categories.length === 0 ? (
                <EmptyState icon="category" title="No categories" description="Categories appear from your product listings." />
              ) : (
                <div className="p-sm max-h-[500px] overflow-y-auto">
                  {categories.map(cat => (
                    <div key={cat.name} className="flex items-center gap-sm p-sm hover:bg-surface-container-low rounded-lg group">
                      <span className="material-symbols-outlined text-secondary group-hover:text-primary">folder</span>
                      <span className="flex-1 text-body-md">{cat.name}</span>
                      <span className="text-meta text-on-surface-variant">{cat.productCount}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost"><span className="material-symbols-outlined text-body-md">edit</span></Button>
                        <Button variant="danger" onClick={() => handleDeleteCategory(cat)} icon={<span className="material-symbols-outlined text-body-md">delete</span>} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category detail / add form */}
            <div className="col-span-12 lg:col-span-8 space-y-gutter">
              {newCategoryOpen ? (
                <div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant overflow-hidden">
                  <div className="p-md border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
                    <h3 className="font-bold text-on-surface">New Category</h3>
                  </div>
                  <div className="p-lg grid grid-cols-1 md:grid-cols-2 gap-lg">
                    <div className="space-y-md">
                      <div>
                        <label className="block text-sm font-bold text-on-surface-variant mb-xs">Category Name</label>
                        <input
                          className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-sm py-sm focus:border-primary focus:ring-0 transition-colors text-on-surface"
                          type="text"
                          value={newCategory.name}
                          onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                          placeholder="e.g. Electronics"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-on-surface-variant mb-xs">Slug</label>
                        <div className="flex rounded-xl border border-outline-variant/60 overflow-hidden">
                          <span className="bg-surface-container px-sm py-sm text-secondary text-sm border-r border-outline-variant/60">vendex.com/c/</span>
                          <input
                            className="w-full bg-surface-container-low border-none px-sm py-sm focus:ring-0 text-sm text-on-surface"
                            type="text"
                            value={newCategory.slug}
                            onChange={e => setNewCategory({ ...newCategory, slug: e.target.value })}
                            placeholder="auto-generated"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-on-surface-variant mb-xs">Description</label>
                        <textarea
                          className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-sm py-sm focus:border-primary focus:ring-0 transition-colors text-on-surface"
                          rows="4"
                          value={newCategory.description}
                          onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
                          placeholder="Describe this category..."
                        />
                      </div>
                    </div>
                    <div className="space-y-md">
                      <div>
                        <label className="block text-sm font-bold text-on-surface-variant mb-xs">Parent Category</label>
                        <select
                          className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-sm py-sm focus:border-primary focus:ring-0 transition-colors text-on-surface"
                          value={newCategory.parent}
                          onChange={e => setNewCategory({ ...newCategory, parent: e.target.value })}
                        >
                          <option value="">None (Top-level)</option>
                          {categories.map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="pt-sm border-t border-outline-variant mt-auto">
                        <div className="flex justify-end gap-sm">
                          <Button variant="secondary" onClick={() => setNewCategoryOpen(false)}>Cancel</Button>
                          <Button variant="primary" onClick={handleAddCategory}>Save Category</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant p-lg text-center">
                  <span className="material-symbols-outlined text-5xl text-on-surface/20 mb-sm">category</span>
                  <p className="text-on-surface-variant">Select a category to edit or add a new one.</p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant">
                  <div className="flex items-center gap-sm mb-sm text-primary">
                    <span className="material-symbols-outlined">trending_up</span>
                    <h4 className="font-bold">Summary</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-secondary uppercase font-bold">Categories</p>
                      <p className="text-headline-md font-black">{categories.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-secondary uppercase font-bold">Products</p>
                      <p className="text-headline-md font-black">{products.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
                  <div className="flex items-center gap-sm mb-sm text-on-surface">
                    <span className="material-symbols-outlined">inventory_2</span>
                    <h4 className="font-bold">Products Per Category</h4>
                  </div>
                  <div className="space-y-xs">
                    {categories.slice(0, 4).map(cat => (
                      <div key={cat.name} className="flex justify-between text-sm">
                        <span className="text-secondary">{cat.name}</span>
                        <span className="font-bold">{cat.productCount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
