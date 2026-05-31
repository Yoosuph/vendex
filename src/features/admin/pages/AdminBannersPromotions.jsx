import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

const STORAGE_KEY = 'vendex_banners';

export default function AdminBannersPromotions() {
  const [banners, setBanners] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', placement: 'Home Hero Carousel', url: '', startDate: '', endDate: '', image: '' });
  const [dialog, setDialog] = useState({ open: false, title: '', message: '', action: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(banners));
  }, [banners]);

  const handleToggle = (id) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const handleDelete = (banner) => {
    setDialog({
      open: true,
      title: 'Delete Banner',
      message: `Delete "${banner.title}"? This cannot be undone.`,
      action: () => {
        setBanners(prev => prev.filter(b => b.id !== banner.id));
        setDialog({ open: false, title: '', message: '', action: null });
      },
      variant: 'danger'
    });
  };

  const handleEdit = (banner) => {
    setEditId(banner.id);
    setForm({ title: banner.title, placement: banner.placement, url: banner.url || '', startDate: banner.startDate || '', endDate: banner.endDate || '', image: banner.image || '' });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    const now = new Date().toISOString().split('T')[0];
    if (editId) {
      setBanners(prev => prev.map(b => b.id === editId ? { ...b, ...form } : b));
    } else {
      const newBanner = {
        id: 'banner_' + Date.now(),
        ...form,
        active: true,
        createdAt: now
      };
      setBanners(prev => [...prev, newBanner]);
    }
    setModalOpen(false);
    setEditId(null);
    setForm({ title: '', placement: 'Home Hero Carousel', url: '', startDate: '', endDate: '', image: '' });
  };

  const openNewModal = () => {
    setEditId(null);
    setForm({ title: '', placement: 'Home Hero Carousel', url: '', startDate: '', endDate: '', image: '' });
    setModalOpen(true);
  };

  if (loading) return <LoadingSpinner text="Loading banners..." />;

  return (
    <>
      <div className="min-h-screen">
        <section className="px-gutter pt-lg pb-sm">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Banners & Promotions</h3>
              <p className="font-body-md text-on-surface-variant mt-2">Manage active marketplace campaigns and landing page visuals.</p>
            </div>
            <Button variant="primary" onClick={openNewModal} icon={<span className="material-symbols-outlined">add_photo_alternate</span>}>
              Add New Banner
            </Button>
          </div>
        </section>

        <section className="px-gutter py-md">
          {banners.length === 0 ? (
            <EmptyState icon="campaign" title="No banners yet" description="Create your first promotional banner to engage customers." actionLabel="Add New Banner" onAction={openNewModal} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              {banners.map(banner => (
                <div key={banner.id} className="bg-surface-container-lowest rounded-xl overflow-hidden custom-shadow group border border-transparent hover:border-outline-variant transition-all">
                  <div className="relative h-48 overflow-hidden">
                    {banner.image ? (
                      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl text-on-surface/20">image</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-on-primary rounded-full font-label-sm">{banner.placement}</div>
                  </div>
                  <div className="p-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-headline-md text-headline-md text-on-surface">{banner.title}</h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          checked={banner.active}
                          onChange={() => handleToggle(banner.id)}
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-secondary-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <p className="font-body-sm text-on-surface-variant line-clamp-2">{banner.url || 'No target URL'}</p>
                    <div className="mt-md flex justify-between items-center border-t border-outline-variant pt-sm">
                      <span className={cn('font-label-sm', banner.active ? 'text-secondary' : 'text-error')}>
                        {banner.active ? (banner.endDate ? `Active until ${banner.endDate}` : 'Active') : 'Paused'}
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors" onClick={() => handleEdit(banner)}>
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="p-2 text-on-surface-variant hover:text-error transition-colors" onClick={() => handleDelete(banner)}>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Create/Edit Banner Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-md">
          <div className="bg-surface rounded-xl w-full max-w-4xl max-h-[921px] overflow-hidden flex flex-col shadow-xl">
            <div className="px-lg py-sm border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface">{editId ? 'Edit Banner' : 'Create New Banner'}</h3>
              <button className="p-2 hover:bg-surface-container rounded-full transition-colors" onClick={() => setModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                <div className="space-y-sm">
                  <div>
                    <label className="block font-label-md text-on-surface mb-2">Banner Title</label>
                    <input
                      className="w-full bg-white border border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-0 outline-none transition-all"
                      placeholder="e.g. Summer Collection 2024"
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface mb-2">Placement</label>
                    <select
                      className="w-full bg-white border border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-0 outline-none transition-all"
                      value={form.placement}
                      onChange={e => setForm({ ...form, placement: e.target.value })}
                    >
                      <option>Home Hero Carousel</option>
                      <option>Category Sidebar</option>
                      <option>Footer Promo</option>
                      <option>Mobile App Splash</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface mb-2">Target URL</label>
                    <input
                      className="w-full bg-white border border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-0 outline-none transition-all"
                      placeholder="https://vendex.com/promo/summer"
                      type="text"
                      value={form.url}
                      onChange={e => setForm({ ...form, url: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface mb-2">Image URL</label>
                    <input
                      className="w-full bg-white border border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-0 outline-none transition-all"
                      placeholder="https://example.com/banner.jpg"
                      type="text"
                      value={form.image}
                      onChange={e => setForm({ ...form, image: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-sm">
                  <label className="block font-label-md text-on-surface">Live Preview</label>
                  <div className="bg-surface-container rounded-lg aspect-video flex flex-col items-center justify-center relative overflow-hidden">
                    {form.image ? (
                      <img src={form.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-md">
                        <span className="material-symbols-outlined text-outline text-display-lg mb-2">image</span>
                        <p className="font-meta text-on-surface-variant">Asset preview will appear here</p>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg">
                      <h5 className="font-headline-md text-on-surface">{form.title || 'Banner Title'}</h5>
                      <p className="font-body-sm text-secondary">Placement: {form.placement}</p>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant">
                    <h6 className="font-label-sm text-on-surface-variant uppercase mb-2">Scheduling</h6>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="font-meta text-secondary">Start Date</label>
                        <input
                          className="w-full bg-white border border-outline-variant rounded p-2 text-sm mt-1"
                          type="date"
                          value={form.startDate}
                          onChange={e => setForm({ ...form, startDate: e.target.value })}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="font-meta text-secondary">End Date</label>
                        <input
                          className="w-full bg-white border border-outline-variant rounded p-2 text-sm mt-1"
                          type="date"
                          value={form.endDate}
                          onChange={e => setForm({ ...form, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-lg py-md border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-md">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSubmit}>
                {editId ? 'Update Banner' : 'Publish Banner'}
              </Button>
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
