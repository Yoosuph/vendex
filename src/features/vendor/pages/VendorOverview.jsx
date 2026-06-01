import React, { useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import { cn } from '@/utils/cn';

export default function VendorOverview() {
  const { products, orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const vendorProducts = useMemo(() => {
    if (!user?.vendorId) return [];
    return products.filter(p => p.vendorId === user.vendorId);
  }, [products, user]);

  const vendorOrders = useMemo(() => {
    if (!user?.vendorId) return [];
    return orders.filter(o =>
      o.items?.some(item => item.vendorId === user.vendorId)
    );
  }, [orders, user]);

  const totalRevenue = useMemo(() =>
    vendorOrders.reduce((sum, o) => {
      const vendorItems = (o.items || []).filter(item => item.vendorId === user?.vendorId);
      return sum + vendorItems.reduce((s, item) => s + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
    }, 0),
    [vendorOrders, user]
  );

  const totalOrders = vendorOrders.length;
  const pendingOrders = vendorOrders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  return (
    <div>
      <div className="flex-1 p-gutter md:p-lg bg-surface min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">

          <div className="bg-surface-container-lowest p-sm rounded-xl card-shadow border border-outline-variant/30">
            <div className="flex justify-between items-start mb-xs">
              <span className="text-secondary font-label-md text-label-md">Total Revenue</span>
              <span className="material-symbols-outlined text-secondary">payments</span>
            </div>
            <div className="mb-sm">
              <h3 className="font-headline-md text-headline-md text-on-surface">${totalRevenue.toFixed(2)}</h3>
              <p className="text-primary font-label-sm text-label-sm">From {totalOrders} orders</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-sm rounded-xl card-shadow border border-outline-variant/30">
            <div className="flex justify-between items-start mb-xs">
              <span className="text-secondary font-label-md text-label-md">Products</span>
              <span className="material-symbols-outlined text-secondary">inventory_2</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">{vendorProducts.length}</h3>
            <p className="text-secondary font-label-sm text-label-sm">{vendorProducts.filter(p => p.stock > 0).length} active listings</p>
          </div>

          <div className="bg-surface-container-lowest p-sm rounded-xl card-shadow border border-outline-variant/30">
            <div className="flex justify-between items-start mb-xs">
              <span className="text-secondary font-label-md text-label-md">Pending Orders</span>
              <span className="material-symbols-outlined text-secondary">package_2</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">{pendingOrders}</h3>
            <p className="text-error font-label-sm text-label-sm">{pendingOrders > 0 ? 'Action required' : 'All clear'}</p>
          </div>

          <div className="bg-surface-container-lowest p-sm rounded-xl card-shadow border border-outline-variant/30">
            <div className="flex justify-between items-start mb-xs">
              <span className="text-secondary font-label-md text-label-md">Store Rating</span>
              <span className="material-symbols-outlined text-secondary">grade</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">4.9</h3>
            <div className="flex items-center gap-0.5 mt-xs">
              {[1, 2, 3, 4].map(i => (
                <span key={i} className="material-symbols-outlined text-primary icon-filled">star</span>
              ))}
              <span className="material-symbols-outlined text-primary icon-filled">star_half</span>
            </div>
            <p className="text-secondary font-meta text-meta mt-xs">Based on 1,240 reviews</p>
          </div>
        </div>

        <section className="bg-surface-container-lowest rounded-xl card-shadow border border-outline-variant/30 overflow-hidden">
          <div className="p-gutter border-b border-outline-variant flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">Recent Orders</h2>
            <Link to="/vendor/orders" className="text-primary font-label-md text-label-md hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            {vendorOrders.length === 0 ? (
              <div className="p-xl text-center text-secondary">No orders yet</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-gutter py-sm font-label-md text-label-md text-secondary">Order ID</th>
                    <th className="px-gutter py-sm font-label-md text-label-md text-secondary">Customer</th>
                    <th className="px-gutter py-sm font-label-md text-label-md text-secondary">Status</th>
                    <th className="px-gutter py-sm font-label-md text-label-md text-secondary">Amount</th>
                    <th className="px-gutter py-sm font-label-md text-label-md text-secondary">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {vendorOrders.slice(0, 4).map(order => {
                    const ship = order.shippingDetails || {};
                    const initials = (ship.firstName?.[0] || '') + (ship.lastName?.[0] || '');
                    const statusBadges = {
                      'Processing': 'bg-success-container text-success',
                      'Pending': 'bg-warning-container text-warning',
                      'Shipped': 'bg-info-container text-info',
                      'Delivered': 'bg-success-container text-success',
                    };
                    return (
                      <tr key={order.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-gutter py-sm font-label-sm text-label-sm text-on-surface">#{order.id}</td>
                        <td className="px-gutter py-sm">
                          <div className="flex items-center gap-xs">
                            <div className="w-6 h-6 rounded-full bg-tertiary-container/10 flex items-center justify-center font-bold text-meta text-primary">{initials || '?'}</div>
                            <span className="font-body-sm text-body-sm">{ship.firstName && ship.lastName ? `${ship.firstName} ${ship.lastName}` : 'Customer'}</span>
                          </div>
                        </td>
                        <td className="px-gutter py-sm">
                          <span className={cn(
                            'px-xs py-0.5 rounded-full text-meta font-bold uppercase tracking-wider',
                            statusBadges[order.status] || 'bg-surface-container text-on-surface'
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-gutter py-sm font-body-sm text-body-sm font-bold">${(order.total || 0).toFixed(2)}</td>
                        <td className="px-gutter py-sm">
                          <span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary">more_vert</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
