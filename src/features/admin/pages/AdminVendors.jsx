import React, { useState, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function AdminVendors() {
  const { users, products, loading, approveVendor, suspendUser } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialog, setDialog] = useState({ open: false, title: '', message: '', action: null });
  const [selectedVendor, setSelectedVendor] = useState(null);

  const vendors = useMemo(() => (users || []).filter((u) => u.role === 'vendor'), [users]);

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchSearch =
        !search ||
        (v.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (v.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (v.vendorId || '').toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || (v.status || 'pending') === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [vendors, search, statusFilter]);

  const getProductCount = (vendorId) => {
    return (products || []).filter((p) => p.vendorId === vendorId).length;
  };

  const handleApprove = (vendor) => {
    setSelectedVendor(vendor);
    setDialog({
      open: true,
      title: 'Approve Vendor',
      message: `Approve "${vendor.name || vendor.email}" as an active vendor?`,
      action: () => {
        approveVendor(vendor.id, user?.name || 'Admin');
        setDialog({ open: false, title: '', message: '', action: null });
      },
    });
  };

  const handleSuspend = (vendor) => {
    setSelectedVendor(vendor);
    setDialog({
      open: true,
      title: 'Suspend Vendor',
      message: `Suspend "${vendor.name || vendor.email}"? They will lose marketplace access.`,
      action: () => {
        suspendUser(vendor.id, user?.name || 'Admin');
        setDialog({ open: false, title: '', message: '', action: null });
      },
      variant: 'danger',
    });
  };

  if (loading) return <LoadingSpinner text="Loading vendors..." />;

  return (
    <>
      <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Vendor Management</h1>
            <p className="font-body-md text-sm sm:text-base text-secondary">
              Review marketplace partners, approve onboarding requests, and monitor compliance.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/40 shadow-subtle flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex-1 w-full relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">search</span>
            <input
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
              placeholder="Search vendor name, email, or ID..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-auto">
            <select
              className="w-full sm:w-auto bg-surface-container-low border border-outline-variant/40 rounded-xl px-3 py-2 text-sm font-semibold outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="approved">Active</option>
              <option value="pending">Pending Review</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 text-center shadow-subtle">
            <EmptyState
              icon="storefront"
              title="No vendors found"
              description={search ? 'Try adjusting your search or filter.' : 'No vendors are registered yet.'}
            />
          </div>
        ) : (
          <>
            {/* Dedicated Mobile Cards (Mobile Only) */}
            <div className="md:hidden space-y-3">
              {filtered.map((v) => {
                const pCount = getProductCount(v.vendorId || v.id);
                return (
                  <div
                    key={v.id}
                    className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-subtle flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                          {v.name ? v.name.slice(0, 2).toUpperCase() : 'VN'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-on-surface">{v.name || 'Store'}</h3>
                          <p className="text-xs text-secondary">{v.email || 'No email'}</p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          'text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider',
                          v.status === 'approved'
                            ? 'bg-success-container text-success'
                            : v.status === 'suspended'
                            ? 'bg-error-container text-error'
                            : 'bg-warning-container text-warning'
                        )}
                      >
                        {v.status || 'Pending'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-secondary border-t border-outline-variant/30 pt-2">
                      <span>Products: <strong className="text-on-surface font-mono">{pCount}</strong></span>
                      <span className="font-mono text-[11px]">ID: {v.vendorId || v.id}</span>
                    </div>

                    <div className="flex items-center gap-2 border-t border-outline-variant/30 pt-2">
                      {v.status !== 'approved' && (
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          onClick={() => handleApprove(v)}
                        >
                          Approve
                        </Button>
                      )}
                      {v.status !== 'suspended' && (
                        <Button
                          variant="danger"
                          size="sm"
                          fullWidth
                          onClick={() => handleSuspend(v)}
                        >
                          Suspend
                        </Button>
                      )}
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
                      <th className="px-4 py-3 font-semibold">Vendor</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold">Vendor ID</th>
                      <th className="px-4 py-3 font-semibold text-center">Products</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-sm">
                    {filtered.map((v) => {
                      const pCount = getProductCount(v.vendorId || v.id);
                      return (
                        <tr key={v.id} className="hover:bg-surface-container-low/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                {v.name ? v.name.slice(0, 2).toUpperCase() : 'VN'}
                              </div>
                              <span className="font-semibold text-on-surface">{v.name || 'Store'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-secondary">{v.email || 'N/A'}</td>
                          <td className="px-4 py-3 font-mono text-xs text-secondary">{v.vendorId || v.id}</td>
                          <td className="px-4 py-3 text-center font-mono font-semibold">{pCount}</td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                                v.status === 'approved'
                                  ? 'bg-success-container text-success'
                                  : v.status === 'suspended'
                                  ? 'bg-error-container text-error'
                                  : 'bg-warning-container text-warning'
                              )}
                            >
                              {(v.status || 'Pending').toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {v.status !== 'approved' && (
                                <Button variant="primary" size="sm" onClick={() => handleApprove(v)}>
                                  Approve
                                </Button>
                              )}
                              {v.status !== 'suspended' && (
                                <Button variant="danger" size="sm" onClick={() => handleSuspend(v)}>
                                  Suspend
                                </Button>
                              )}
                            </div>
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
        variant={dialog.variant || 'default'}
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={dialog.action}
        onCancel={() => setDialog({ open: false, title: '', message: '', action: null })}
      />
    </>
  );
}
