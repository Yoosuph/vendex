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
  const [expandedVendor, setExpandedVendor] = useState(null);

  const vendors = useMemo(() => users.filter(u => u.role === 'vendor'), [users]);

  const filtered = useMemo(() => {
    return vendors.filter(v => {
      const matchSearch = !search || (v.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (v.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (v.vendorId || '').toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || (v.status || 'pending') === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [vendors, search, statusFilter]);

  const getProductCount = (vendorId) => {
    return products.filter(p => p.vendorId === vendorId || p.vendor === vendorId).length;
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
      }
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
      variant: 'danger'
    });
  };

  if (loading) return <div className="pt-16"><LoadingSpinner text="Loading vendors..." /></div>;

  return (
    <>
      <main className="min-h-screen">
        <div className="mt-16 p-gutter max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Vendor Management</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Manage your multi-vendor marketplace partners and their performance.</p>
            </div>
            <div className="flex gap-sm">
              <button className="flex items-center gap-xs px-md py-sm bg-white border border-outline-variant rounded-lg text-secondary hover:bg-surface-container transition-all font-label-md text-label-md">
                <span className="material-symbols-outlined">download</span>
                Export CSV
              </button>
            </div>
          </div>

          <div className="bg-white p-sm rounded-xl border border-outline-variant shadow-sm mb-md flex flex-wrap gap-md items-center">
            <div className="flex-1 min-w-[300px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-label-md"
                placeholder="Search by vendor name or ID..."
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-sm">
              <select
                className="bg-white border border-outline-variant rounded-lg px-md py-2 text-label-md focus:ring-1 focus:ring-primary outline-none min-w-[140px]"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="approved">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon="storefront" title="No vendors found" description={search ? 'Try adjusting your search or filter.' : 'No vendors are registered yet.'} />
          ) : (
            <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider">Vendor</th>
                      <th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider">Email</th>
                      <th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider">ID</th>
                      <th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider text-center">Products</th>
                      <th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider">Status</th>
                      <th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {filtered.map(v => (
                      <tr key={v.id} className="hover:bg-surface-container-lowest transition-colors group">
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="h-10 w-10 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary">
                              {v.name ? v.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'VN'}
                            </div>
                            <div>
                              <div className="font-label-md text-label-md text-on-surface">{v.name || 'Unknown'}</div>
                              <div className="font-meta text-meta text-on-surface-variant">ID: {v.vendorId || v.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-md py-md font-body-md text-body-md text-on-surface-variant">{v.email || 'N/A'}</td>
                        <td className="px-md py-md font-body-md text-body-md">{v.vendorId || v.id}</td>
                        <td className="px-md py-md font-body-md text-body-md text-center">{getProductCount(v.id)}</td>
                        <td className="px-md py-md">
                          <span className={cn(
                            'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold',
                            v.status === 'approved' ? 'bg-green-100 text-green-800' :
                            v.status === 'suspended' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          )}>
                            <span className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              v.status === 'approved' ? 'bg-green-600' :
                              v.status === 'suspended' ? 'bg-red-600' :
                              'bg-blue-600'
                            )}></span>
                            {(v.status || 'PENDING').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-md py-md text-center">
                          <div className="flex justify-center gap-xs">
                            {v.status !== 'approved' && (
                              <Button variant="primary" size="sm" onClick={() => handleApprove(v)}>Approve</Button>
                            )}
                            {v.status !== 'suspended' && (
                              <Button variant="danger" size="sm" onClick={() => handleSuspend(v)}>Suspend</Button>
                            )}
                            <button
                              className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"
                              onClick={() => setExpandedVendor(expandedVendor === v.id ? null : v.id)}
                            >
                              <span className="material-symbols-outlined text-body-lg">
                                {expandedVendor === v.id ? 'expand_less' : 'visibility'}
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-md py-sm border-t border-outline-variant flex justify-between items-center bg-surface-container-low">
                <div className="font-meta text-meta text-on-surface-variant">Showing {filtered.length} of {vendors.length} vendors</div>
              </div>
            </div>
          )}
        </div>
      </main>

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
