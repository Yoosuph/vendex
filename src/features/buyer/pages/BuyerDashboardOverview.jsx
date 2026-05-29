import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';

const statusBadge = (status) => {
  const map = {
    Delivered: 'bg-emerald-50 text-emerald-700',
    Shipped: 'bg-blue-50 text-blue-700',
    Processing: 'bg-amber-50 text-amber-700',
    'In Transit': 'bg-indigo-50 text-indigo-700',
    Cancelled: 'bg-red-50 text-red-500',
    Pending: 'bg-gray-100 text-gray-600',
  };
  return map[status] || 'bg-gray-100 text-gray-600';
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

  const recentOrders = useMemo(() => {
    return [...myOrders].reverse().slice(0, 5);
  }, [myOrders]);

  const wishlistItems = useMemo(() => products.slice(0, 4), [products]);

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-[14px] text-gray-500 mt-0.5">Here's what's happening with your orders.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" to="/search">Browse Products</Button>
          <Button variant="primary" size="sm" to="/buyer/orders">View All Orders</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: stats.total, icon: 'receipt_long', color: 'bg-blue-50 text-blue-600' },
          { label: 'Delivered', value: stats.delivered, icon: 'check_circle', color: 'bg-emerald-50 text-emerald-600' },
          { label: 'In Progress', value: stats.pending, icon: 'local_shipping', color: 'bg-amber-50 text-amber-600' },
          { label: 'Total Spent', value: `$${stats.totalSpent.toFixed(2)}`, icon: 'payments', color: 'bg-red-50 text-red-600', isCurrency: true },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">{stat.label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
            </div>
            <p className={`text-[24px] font-bold text-gray-900 ${stat.isCurrency ? 'tracking-tight' : ''}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-[15px] font-semibold text-gray-900">Recent Orders</h2>
            <Link to="/buyer/orders" className="text-[13px] font-medium text-primary hover:underline">View all</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="py-12">
              <EmptyState icon="shopping_bag" title="No orders yet" description="Start shopping to see your orders here." />
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Order</th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => window.location.href = `/buyer/order-detail/${order.id}`}>
                    <td className="px-5 py-3.5">
                      <p className="text-[14px] font-medium text-gray-900">#{order.id}</p>
                      <p className="text-[12px] text-gray-400 mt-0.5 truncate max-w-[180px]">
                        {order.items?.[0]?.name || '—'}
                        {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-gray-500 hidden sm:table-cell">{order.date || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusBadge(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[14px] font-semibold text-gray-900 text-right">${(Number(order.total) || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Quick links */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/search" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-gray-700 group-hover:text-primary transition-colors">Discover Products</p>
                  <p className="text-[11px] text-gray-400">Browse the marketplace</p>
                </div>
              </Link>
              <Link to="/buyer/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-gray-700 group-hover:text-primary transition-colors">Track Orders</p>
                  <p className="text-[11px] text-gray-400">View order history</p>
                </div>
              </Link>
              <Link to="/buyer/wishlist" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-gray-700 group-hover:text-primary transition-colors">Wishlist</p>
                  <p className="text-[11px] text-gray-400">Saved items</p>
                </div>
              </Link>
              <Link to="/cart" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-gray-700 group-hover:text-primary transition-colors">View Cart</p>
                  <p className="text-[11px] text-gray-400">Checkout your items</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Wishlist preview */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider">You Might Like</h3>
              <Link to="/search" className="text-[12px] text-primary hover:underline">See all</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {wishlistItems.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="aspect-square rounded-lg bg-gray-50 overflow-hidden mb-2">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-[12px] font-medium text-gray-700 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</p>
                  <p className="text-[13px] font-bold text-gray-900 mt-0.5">${(product.price || 0).toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
