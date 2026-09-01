import React, { useState, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function AdminBuyers() {
  const { users, orders, loading, suspendUser } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [dialog, setDialog] = useState({ open: false, title: '', message: '', action: null });
  const [search, setSearch] = useState('');

  const buyers = useMemo(() => (users || []).filter((u) => u.role === 'buyer'), [users]);

  // Compute stats per buyer
  const buyerStats = useMemo(() => {
    return buyers.map((b) => {
      const buyerOrders = (orders || []).filter((o) => o.buyerId === b.id || o.userId === b.id);
      const totalSpent = buyerOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
      return { ...b, orderCount: buyerOrders.length, totalSpent, buyerOrders };
    });
  }, [buyers, orders]);

  const filtered = useMemo(() => {
    if (!search.trim()) return buyerStats;
    const q = search.toLowerCase();
    return buyerStats.filter(
      (b) =>
        (b.name || '').toLowerCase().includes(q) ||
        (b.email || '').toLowerCase().includes(q) ||
        (b.id || '').toLowerCase().includes(q)
    );
  }, [buyerStats, search]);

  const totalBuyers = buyers.length;
  const avgSpend = useMemo(() => {
    if (buyers.length === 0) return 0;
    const total = buyerStats.reduce((s, b) => s + b.totalSpent, 0);
    return total / buyers.length;
  }, [buyerStats, buyers]);

  const openDrawer = (buyer) => {
    setSelectedBuyer(buyer);
    setDrawerOpen(true);
  };

  const handleSuspend = (buyer) => {
    setDialog({
      open: true,
      title: 'Suspend Buyer',
      message: `Suspend "${buyer.name || buyer.email}"? They will lose purchasing access.`,
      action: () => {
        suspendUser(buyer.id, user?.name || 'Admin');
        setDialog({ open: false, title: '', message: '', action: null });
        setDrawerOpen(false);
      },
      variant: 'danger',
    });
  };

  if (loading) return <LoadingSpinner text="Loading buyers..." />;

  return (
    <>
      <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24">
        {/* Header */}
        <div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Buyer Management</h1>
          <p className="font-body-md text-sm sm:text-base text-secondary">
            Review customer activity, lifetime spend, and manage buyer account standing.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-gutter">
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
            <span className="text-secondary text-xs font-semibold uppercase tracking-wider">Total Buyers</span>
            <p className="text-xl sm:text-2xl font-bold text-on-surface mt-1">{totalBuyers.toLocaleString()}</p>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
            <span className="text-secondary text-xs font-semibold uppercase tracking-wider">Avg. Spend</span>
            <p className="text-xl sm:text-2xl font-bold text-primary buyer-price mt-1">${avgSpend.toFixed(2)}</p>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-subtle">
            <span className="text-secondary text-xs font-semibold uppercase tracking-wider">Suspended</span>
            <p className="text-xl sm:text-2xl font-bold text-error mt-1">
              {buyers.filter((b) => b.status === 'suspended').length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/40 shadow-subtle">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">search</span>
            <input
              type="text"
              placeholder="Search by buyer name, email, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 text-center shadow-subtle">
            <EmptyState
              icon="group"
              title="No buyers found"
              description={search ? 'Try adjusting your search query.' : 'Buyers will appear once they register on the platform.'}
            />
          </div>
        ) : (
          <>
            {/* Dedicated Mobile Buyer Cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((b) => (
                <div
                  key={b.id}
                  onClick={() => openDrawer(b)}
                  className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-subtle flex flex-col gap-3 active:scale-[0.99] transition-transform cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {b.name ? b.name.slice(0, 2).toUpperCase() : 'BU'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-on-surface">{b.name || 'Buyer'}</h3>
                        <p className="text-xs text-secondary">{b.email || 'No email'}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase',
                        b.status === 'suspended' ? 'bg-error-container text-error' : 'bg-success-container text-success'
                      )}
                    >
                      {b.status || 'Active'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-outline-variant/30 pt-2 text-xs">
                    <span className="text-secondary">
                      Orders: <strong className="text-on-surface font-mono">{b.orderCount}</strong>
                    </span>
                    <span className="text-primary font-bold buyer-price text-sm">
                      ${b.totalSpent.toFixed(2)} spent
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-surface-container-lowest rounded-2xl shadow-subtle border border-outline-variant/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Buyer</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold text-center">Orders</th>
                      <th className="px-4 py-3 font-semibold text-right">Spent</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-sm">
                    {filtered.map((b) => (
                      <tr key={b.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                              {b.name ? b.name.slice(0, 2).toUpperCase() : 'BU'}
                            </div>
                            <span className="font-semibold text-on-surface">{b.name || 'Buyer'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-secondary">{b.email || 'N/A'}</td>
                        <td className="px-4 py-3 text-center font-mono font-semibold">{b.orderCount}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-primary">${b.totalSpent.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                              b.status === 'suspended' ? 'bg-error-container text-error' : 'bg-success-container text-success'
                            )}
                          >
                            {b.status || 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" onClick={() => openDrawer(b)}>
                            View Profile
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && selectedBuyer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-surface-container-lowest z-50 shadow-2xl flex flex-col"
            >
              <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex items-center justify-between">
                <h3 className="font-bold text-lg text-on-surface">Buyer Profile</h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 text-primary font-bold text-2xl flex items-center justify-center mx-auto mb-3">
                    {selectedBuyer.name ? selectedBuyer.name.slice(0, 2).toUpperCase() : 'BU'}
                  </div>
                  <h4 className="font-bold text-lg text-on-surface">{selectedBuyer.name || 'Buyer'}</h4>
                  <p className="text-xs text-secondary">{selectedBuyer.email}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/40 text-center">
                    <span className="text-xs text-secondary font-semibold uppercase">Total Spent</span>
                    <p className="text-lg font-bold text-primary buyer-price mt-0.5">${selectedBuyer.totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/40 text-center">
                    <span className="text-xs text-secondary font-semibold uppercase">Orders</span>
                    <p className="text-lg font-bold text-on-surface mt-0.5">{selectedBuyer.orderCount}</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-secondary mb-3">Recent Orders</h5>
                  {selectedBuyer.buyerOrders?.length === 0 ? (
                    <p className="text-sm text-secondary">No orders recorded.</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedBuyer.buyerOrders.slice(0, 5).map((o) => (
                        <div key={o.id} className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
                          <div>
                            <p className="font-mono font-bold text-primary">#{o.displayId || o.id}</p>
                            <span className="text-secondary">{o.date || 'Recent'}</span>
                          </div>
                          <span className="font-bold text-on-surface buyer-price">${(o.total || 0).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-outline-variant/40 bg-surface-container-lowest">
                {selectedBuyer.status !== 'suspended' && (
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={() => handleSuspend(selectedBuyer)}
                  >
                    Suspend Buyer Account
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
