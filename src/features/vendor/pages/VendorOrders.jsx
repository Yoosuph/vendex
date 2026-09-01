import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function VendorOrders() {
  const { orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('All');

  const vendorOrders = useMemo(() => {
    if (!user?.vendorId) return [];
    return (orders || []).filter((o) =>
      o.items?.some((item) => item.vendorId === user.vendorId)
    );
  }, [orders, user]);

  const filteredOrders = useMemo(() => {
    if (filter === 'All') return vendorOrders;
    return vendorOrders.filter((o) => o.status === filter);
  }, [vendorOrders, filter]);

  if (loading) return <LoadingSpinner text="Loading orders..." />;

  const statusBadgeColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success-container text-success';
      case 'Processing':
      case 'In Transit':
      case 'Shipped':
        return 'bg-primary/10 text-primary';
      case 'Cancelled':
      case 'Delayed':
        return 'bg-error-container text-error';
      default:
        return 'bg-surface-container text-secondary';
    }
  };

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24 overflow-x-hidden w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Order Management</h1>
          <p className="font-body-md text-sm sm:text-base text-secondary">
            Manage vendor fulfillments and track customer shipping status.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {['All', 'Processing', 'In Transit', 'Delivered', 'Cancelled'].map((s) => {
          const count = s === 'All' ? vendorOrders.length : vendorOrders.filter((o) => o.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors',
                filter === s
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-lowest text-secondary border border-outline-variant/40'
              )}
            >
              {s} ({count})
            </button>
          );
        })}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-8 text-center shadow-subtle">
          <EmptyState
            icon="receipt_long"
            title="No orders found"
            description="Orders containing your products will appear here."
          />
        </div>
      ) : (
        <>
          {/* Dedicated Mobile Order Cards (Mobile Only) */}
          <div className="md:hidden space-y-3">
            {filteredOrders.map((order) => {
              const ship = order.shippingDetails || {};
              const customerName = ship.firstName && ship.lastName ? `${ship.firstName} ${ship.lastName}` : 'Customer';
              const vendorItems = (order.items || []).filter((i) => i.vendorId === user?.vendorId);
              return (
                <div
                  key={order.id}
                  className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-subtle flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-primary text-sm">#{order.displayId || order.id}</span>
                    <span className={cn('px-2.5 py-0.5 rounded-full text-[11px] font-bold', statusBadgeColor(order.status))}>
                      {order.status || 'Pending'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-secondary border-t border-outline-variant/30 pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">person</span>
                      <span className="font-semibold text-on-surface">{customerName}</span>
                    </div>
                    <span>{order.date || 'Recent'}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-outline-variant/30 pt-2">
                    <span className="text-xs text-secondary font-medium">
                      {vendorItems.length} item{vendorItems.length !== 1 ? 's' : ''}
                    </span>
                    <span className="font-bold text-base text-on-surface buyer-price">
                      ${(order.total || 0).toFixed(2)}
                    </span>
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
                    <th className="px-4 py-3 font-semibold">Order ID</th>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold text-right">Total</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 text-sm">
                  {filteredOrders.map((order) => {
                    const ship = order.shippingDetails || {};
                    const customerName = ship.firstName && ship.lastName ? `${ship.firstName} ${ship.lastName}` : 'Customer';
                    return (
                      <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-primary">#{order.displayId || order.id}</td>
                        <td className="px-4 py-3 font-medium text-on-surface">{customerName}</td>
                        <td className="px-4 py-3 text-secondary">{order.date || 'Recent'}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-on-surface">${(order.total || 0).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold', statusBadgeColor(order.status))}>
                            {order.status || 'Pending'}
                          </span>
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
  );
}
