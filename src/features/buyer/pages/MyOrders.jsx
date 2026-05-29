import React, { useContext, useMemo, useState } from 'react';
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

export default function MyOrders() {
  const { orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('All');

  const myOrders = useMemo(() => {
    if (!user) return [];
    return orders.filter(o => o.buyerId === user.id);
  }, [orders, user]);

  const filteredOrders = useMemo(() => {
    if (filter === 'All') return myOrders;
    return myOrders.filter(o => o.status === filter);
  }, [myOrders, filter]);

  const statuses = ['All', 'Processing', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'];

  if (loading) return <LoadingSpinner text="Loading orders..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">My Orders</h1>
          <p className="text-[14px] text-gray-500 mt-0.5">Track and manage your purchases across all vendors.</p>
        </div>
        <Button variant="outline" size="sm" to="/search">Continue Shopping</Button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl w-fit overflow-x-auto">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors ${
              filter === s ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {s}
            {s !== 'All' && (
              <span className="ml-1.5 text-[11px] text-gray-400">
                {myOrders.filter(o => o.status === s).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon="shopping_bag"
          title="No orders found"
          description={filter !== 'All' ? `No orders with status "${filter}".` : "You haven't placed any orders yet."}
          actionLabel={filter !== 'All' ? undefined : "Browse Products"}
          onAction={filter !== 'All' ? undefined : () => window.location.href = '/search'}
        />
      ) : (
        <div className="space-y-3">
          {filteredOrders.map(order => {
            const firstItem = order.items?.[0];
            return (
              <Link
                key={order.id}
                to={`/buyer/order-detail/${order.id}`}
                className="block bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all overflow-hidden"
              >
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4">
                  {/* Product image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                    {firstItem?.image ? (
                      <img src={firstItem.image} alt={firstItem.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="material-symbols-outlined text-[28px]">shopping_bag</span>
                      </div>
                    )}
                  </div>

                  {/* Order info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[14px] font-semibold text-gray-900 line-clamp-1">{firstItem?.name || 'Order'}</p>
                        <p className="text-[12px] text-gray-400 mt-0.5">
                          {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''} · {order.date || '—'}
                          {firstItem?.vendor && ` · ${firstItem.vendor}`}
                        </p>
                      </div>
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${statusBadge(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-[11px] text-gray-400 font-mono">#{order.id}</p>
                      <p className="text-[16px] font-bold text-gray-900">${(Number(order.total) || 0).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
