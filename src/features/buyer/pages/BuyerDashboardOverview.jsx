import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

const statusBadge = (status) => {
  const map = {
    Delivered: 'bg-success-container text-success',
    Shipped: 'bg-info-container text-info',
    Processing: 'bg-warning-container text-warning',
    'In Transit': 'bg-info-container text-info',
    Cancelled: 'bg-error-container text-error',
    Pending: 'bg-surface-container text-on-surface-variant',
  };
  return map[status] || 'bg-surface-container text-on-surface-variant';
};

export default function BuyerDashboardOverview() {
  const { orders, products, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const myOrders = useMemo(() => {
    if (!user) return [];
    return orders.filter(o => o.buyerId === user.id);
  }, [orders, user]);

  const stats = useMemo(() => {
    const delivered = myOrders.filter(o => o.status === 'Delivered').length;
    const pending = myOrders.filter(o => o.status === 'Processing' || o.status === 'Shipped' || o.status === 'In Transit').length;
    const totalSpent = myOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    return { total: myOrders.length, delivered, pending, totalSpent };
  }, [myOrders]);

  const recentOrders = useMemo(() => [...myOrders].reverse().slice(0, 5), [myOrders]);
  const wishlistItems = useMemo(() => products.slice(0, 4), [products]);

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  const statCards = [
    { label: 'Total Orders', value: stats.total, icon: 'receipt_long', color: 'bg-info-container text-info' },
    { label: 'Delivered', value: stats.delivered, icon: 'check_circle', color: 'bg-success-container text-success' },
    { label: 'In Progress', value: stats.pending, icon: 'local_shipping', color: 'bg-warning-container text-warning' },
    { label: 'Total Spent', value: `$${stats.totalSpent.toFixed(2)}`, icon: 'payments', color: 'bg-error-container text-error' },
  ];

  return (
    <div className="space-y-xl">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
        <div>
          <h1 className="text-headline-md font-bold text-on-surface">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-base">Here's what's happening with your orders.</p>
        </div>
        <div className="flex gap-sm">
          <Button variant="outline" size="sm" to="/search">Browse Products</Button>
          <Button variant="primary" size="sm" to="/buyer/orders">View All Orders</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md hover:border-outline transition-colors">
            <div className="flex items-center justify-between mb-sm">
              <span className="text-meta font-medium text-on-surface-variant uppercase tracking-wider">{stat.label}</span>
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', stat.color)}>
                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
              </div>
            </div>
            <p className="text-headline-md font-bold text-on-surface">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
          <div className="flex items-center justify-between px-md py-sm border-b border-outline-variant">
            <h2 className="text-body-md font-semibold text-on-surface">Recent Orders</h2>
            <Link to="/buyer/orders" className="text-label-md font-medium text-primary hover:underline">View all</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="py-xl">
              <EmptyState icon="shopping_bag" title="No orders yet" description="Start shopping to see your orders here." />
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="px-md py-sm text-meta font-semibold text-on-surface-variant uppercase tracking-wider">Order</th>
                  <th className="px-md py-sm text-meta font-semibold text-on-surface-variant uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="px-md py-sm text-meta font-semibold text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-md py-sm text-meta font-semibold text-on-surface-variant uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-surface-container-low transition-colors cursor-pointer" onClick={() => window.location.href = `/buyer/order-detail/${order.id}`}>
                    <td className="px-md py-sm">
                      <p className="text-body-sm font-medium text-on-surface">#{order.id}</p>
                      <p className="text-meta text-on-surface-variant mt-base truncate max-w-[180px]">
                        {order.items?.[0]?.name || '—'}
                        {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                      </p>
                    </td>
                    <td className="px-md py-sm text-body-sm text-on-surface-variant hidden sm:table-cell">{order.date || '—'}</td>
                    <td className="px-md py-sm">
                      <span className={cn('inline-block px-sm py-xs rounded-full text-meta font-semibold', statusBadge(order.status))}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-md py-sm text-body-sm font-semibold text-on-surface text-right">${(Number(order.total) || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Side panel */}
        <div className="space-y-md">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
            <h3 className="text-label-md font-semibold text-on-surface uppercase tracking-wider mb-md">Quick Actions</h3>
            <div className="space-y-sm">
              {[
                { label: 'Discover Products', desc: 'Browse the marketplace', icon: 'search', to: '/search', color: 'bg-info-container text-info' },
                { label: 'Track Orders', desc: 'View order history', icon: 'receipt_long', to: '/buyer/orders', color: 'bg-success-container text-success' },
                { label: 'Wishlist', desc: 'Saved items', icon: 'favorite', to: '/buyer/wishlist', color: 'bg-error-container text-error' },
                { label: 'View Cart', desc: 'Checkout your items', icon: 'shopping_cart', to: '/cart', color: 'bg-warning-container text-warning' },
              ].map(action => (
                <Link key={action.label} to={action.to} className="flex items-center gap-sm p-sm rounded-xl hover:bg-surface-container-low transition-colors group">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', action.color)}>
                    <span className="material-symbols-outlined text-xl">{action.icon}</span>
                  </div>
                  <div>
                    <p className="text-body-sm font-medium text-on-surface group-hover:text-primary transition-colors">{action.label}</p>
                    <p className="text-meta text-on-surface-variant">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
            <div className="flex items-center justify-between mb-md">
              <h3 className="text-label-md font-semibold text-on-surface uppercase tracking-wider">You Might Like</h3>
              <Link to="/search" className="text-meta text-primary hover:underline">See all</Link>
            </div>
            <div className="grid grid-cols-2 gap-sm">
              {wishlistItems.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="aspect-square rounded-lg bg-surface-container overflow-hidden mb-sm">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-meta font-medium text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{product.name}</p>
                  <p className="text-body-sm font-bold text-on-surface mt-base">${(product.price || 0).toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
