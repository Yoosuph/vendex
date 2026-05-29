import React, { useState, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import Button from '@/shared/components/Button';

export default function AdminBuyers() {
  const { users, orders, loading, suspendUser } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [dialog, setDialog] = useState({ open: false, title: '', message: '', action: null });

  const buyers = useMemo(() => users.filter(u => u.role === 'buyer'), [users]);

  // Compute stats per buyer
  const buyerStats = useMemo(() => {
    return buyers.map(b => {
      const buyerOrders = orders.filter(o => o.buyerId === b.id || o.userId === b.id);
      const totalSpent = buyerOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
      return { ...b, orderCount: buyerOrders.length, totalSpent, buyerOrders };
    });
  }, [buyers, orders]);

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
      variant: 'danger'
    });
  };

  if (loading) return <div className="pt-16"><LoadingSpinner text="Loading buyers..." /></div>;

  return (
    <>
      <main className="pt-16 min-h-screen">
        <div className="p-gutter max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-lg gap-md">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Buyer Management</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Review and manage your marketplace ecosystem buyers.</p>
            </div>
            <div className="flex gap-sm">
              <Button variant="secondary"><span className="material-symbols-outlined text-[18px]">filter_list</span>
                Filter</Button>
              <Button variant="secondary"><span className="material-symbols-outlined text-[18px]">file_download</span>
                Export</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-lg">
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Buyers</p>
              <div className="flex items-end justify-between mt-xs">
                <span className="font-headline-md text-headline-md text-on-surface">{totalBuyers.toLocaleString()}</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Spend</p>
              <div className="flex items-end justify-between mt-xs">
                <span className="font-headline-md text-headline-md text-on-surface">${avgSpend.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Risk Flagged</p>
              <div className="flex items-end justify-between mt-xs">
                <span className="font-headline-md text-headline-md text-on-surface">{buyers.filter(b => b.status === 'suspended' || b.status === 'flagged').length}</span>
                <span className="text-error text-sm flex items-center font-medium">
                  <span className="material-symbols-outlined text-sm mr-1">warning</span>Critical
                </span>
              </div>
            </div>
          </div>

          {buyerStats.length === 0 ? (
            <EmptyState icon="group" title="No buyers yet" description="Buyers will appear once they register on the platform." />
          ) : (
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Buyer Details</th>
                      <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Email</th>
                      <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Orders</th>
                      <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Spent</th>
                      <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Status</th>
                      <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Joined</th>
                      <th className="px-md py-4 font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {buyerStats.map(b => (
                      <tr key={b.id} className="table-row-hover cursor-pointer hover:bg-surface-container-low" onClick={() => openDrawer(b)}>
                        <td className="px-md py-4">
                          <div className="flex items-center gap-sm">
                            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">
                              {b.name ? b.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'BU'}
                            </div>
                            <div>
                              <p className="font-body-md text-body-md font-bold text-on-surface">{b.name || 'Unknown'}</p>
                              <p className="font-meta text-meta text-on-surface-variant">ID: {b.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">{b.email || 'N/A'}</td>
                        <td className="px-md py-4 font-body-sm text-body-sm text-on-surface">{b.orderCount}</td>
                        <td className="px-md py-4 font-body-sm text-body-sm font-bold text-on-surface">${b.totalSpent.toFixed(2)}</td>
                        <td className="px-md py-4">
                          <span className={`px-2 py-1 rounded-full text-[12px] font-bold ${
                            b.status === 'suspended' ? 'bg-error-container text-error' :
                            b.status === 'flagged' ? 'bg-surface-variant text-on-surface-variant' :
                            'bg-[#2d7a4f1a] text-[#2d7a4f]'
                          }`}>{b.status || 'Active'}</span>
                        </td>
                        <td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">{b.joinedAt || b.createdAt || 'N/A'}</td>
                        <td className="px-md py-4 text-right">
                          <Button variant="ghost" onClick={(e) => { e.stopPropagation(); openDrawer(b); }} icon={<span className="material-symbols-outlined">more_vert</span>} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-md py-4 bg-surface-container-low flex items-center justify-between border-t border-outline-variant">
                <p className="font-meta text-meta text-on-surface-variant">Showing {buyerStats.length} buyers</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Drawer */}
      {drawerOpen && selectedBuyer && (
        <>
          <div className="fixed inset-0 bg-black/20 z-[60] backdrop-blur-sm transition-opacity duration-300" onClick={() => setDrawerOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-[450px] bg-surface-container-lowest z-[70] translate-x-0 transition-transform duration-300 ease-in-out drawer-shadow flex flex-col">
            <div className="p-md border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface">Buyer Profile</h3>
              <Button variant="ghost" onClick={() => setDrawerOpen(false)} icon={<span className="material-symbols-outlined">close</span>} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-md text-center border-b border-outline-variant bg-surface-container-low/30">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full border-4 border-surface shadow-md mx-auto mb-sm bg-surface-container flex items-center justify-center text-3xl font-bold text-primary">
                    {selectedBuyer.name ? selectedBuyer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'BU'}
                  </div>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mt-xs">{selectedBuyer.name || 'Unknown'}</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">ID: {selectedBuyer.id} • {selectedBuyer.email}</p>
              </div>

              <div className="px-md py-sm">
                <div className="grid grid-cols-2 gap-sm">
                  <div className="p-sm bg-surface-container-low rounded-lg border border-outline-variant">
                    <p className="font-meta text-meta text-on-surface-variant uppercase">Lifetime Spent</p>
                    <p className="font-headline-md text-headline-md text-on-surface">${selectedBuyer.totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="p-sm bg-surface-container-low rounded-lg border border-outline-variant">
                    <p className="font-meta text-meta text-on-surface-variant uppercase">Total Orders</p>
                    <p className="font-headline-md text-headline-md text-on-surface">{selectedBuyer.orderCount}</p>
                  </div>
                </div>
              </div>

              <div className="p-md border-t border-outline-variant mt-sm">
                <h5 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-md">Recent Order History</h5>
                {selectedBuyer.buyerOrders.length === 0 ? (
                  <p className="text-on-surface-variant text-body-sm">No orders yet.</p>
                ) : (
                  <div className="space-y-md">
                    {selectedBuyer.buyerOrders.slice(0, 5).map(o => (
                      <div key={o.id} className="flex justify-between items-center group">
                        <div className="flex gap-sm">
                          <div className="w-10 h-10 bg-surface-container rounded flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface-variant">shopping_bag</span>
                          </div>
                          <div>
                            <p className="font-body-sm text-body-sm font-bold text-on-surface">Order {o.id}</p>
                            <p className="font-meta text-meta text-on-surface-variant">{o.status || 'Pending'}</p>
                          </div>
                        </div>
                        <p className="font-body-sm text-body-sm font-bold text-on-surface">${Number(o.total || 0).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-md border-t border-outline-variant bg-surface-container-lowest">
              <Button variant="danger" onClick={() => handleSuspend(selectedBuyer)} icon={<span className="material-symbols-outlined text-[20px]">block</span>} fullWidth>
                Suspend Account
              </Button>
            </div>
          </div>
        </>
      )}

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
