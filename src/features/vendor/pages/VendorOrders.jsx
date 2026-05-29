import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';

export default function VendorOrders() {
  const { orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const vendorOrders = useMemo(() => {
    if (!user?.vendorId) return [];
    return orders.filter(o =>
      o.items?.some(item => item.vendorId === user.vendorId)
    );
  }, [orders, user]);

  if (loading) return <LoadingSpinner text="Loading orders..." />;

  const statusBadgeColor = (status) => {
    switch (status) {
      case 'Urgent': return 'bg-error-container text-on-error-container';
      case 'Processing': return 'bg-secondary-container text-on-secondary-container';
      case 'Delayed': return 'bg-error-container text-on-error-container';
      case 'Shipped': return 'bg-outline-variant/30 text-on-surface-variant';
      default: return 'bg-surface-container-high text-on-surface-variant';
    }
  };

  return (
    <main className="max-w-container-max mx-auto px-gutter py-xl flex gap-gutter relative min-h-[calc(100vh-64px)]">
      <div className="flex-1 transition-all duration-300 mr-[32%]">
        <div className="flex justify-between items-end mb-lg">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Order Management</h1>
            <p className="text-on-surface-variant font-body-md text-body-md mt-base">Manage vendor fulfillments and track shipping status.</p>
          </div>
          <div className="flex gap-sm">
            <Button variant="primary"><span className="material-symbols-outlined text-[20px]">filter_list</span>
              Filters</Button>
            <Button variant="primary-container"><span className="material-symbols-outlined text-[20px]">download</span>
              Export CSV</Button>
          </div>
        </div>

        {vendorOrders.length === 0 ? (
          <EmptyState
            icon="receipt_long"
            title="No orders yet"
            description="Orders containing your products will appear here."
          />
        ) : (
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Order ID</th>
                  <th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Customer</th>
                  <th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Date</th>
                  <th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Total</th>
                  <th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Status</th>
                  <th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {vendorOrders.map(order => {
                  const ship = order.shippingDetails || {};
                  const initials = (ship.firstName?.[0] || '') + (ship.lastName?.[0] || '');
                  return (
                    <tr key={order.id} className="hover:bg-surface-container-low transition-colors cursor-pointer">
                      <td className="px-sm py-4 font-body-md text-body-md font-bold text-primary">#{order.id}</td>
                      <td className="px-sm py-4">
                        <div className="flex items-center gap-xs">
                          <div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-label-sm text-label-sm">
                            {initials || '?'}
                          </div>
                          <span className="font-body-md text-body-md text-on-surface">
                            {ship.firstName && ship.lastName ? `${ship.firstName} ${ship.lastName}` : 'Customer'}
                          </span>
                        </div>
                      </td>
                      <td className="px-sm py-4 font-body-md text-body-md text-on-surface-variant">{order.date}</td>
                      <td className="px-sm py-4 font-body-md text-body-md font-medium text-on-surface">${(order.total || 0).toFixed(2)}</td>
                      <td className="px-sm py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm ${statusBadgeColor(order.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${order.status === 'Shipped' ? 'bg-outline' : 'bg-error'}`}></span>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-sm py-4">
                        <Button variant="ghost">View Details</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="px-sm py-4 flex items-center justify-between bg-surface-container-low border-t border-outline-variant">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1-{vendorOrders.length} of {vendorOrders.length} orders</span>
              <div className="flex gap-xs">
                <Button variant="primary"><span className="material-symbols-outlined">chevron_left</span></Button>
                <Button variant="primary"><span className="material-symbols-outlined">chevron_right</span></Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
