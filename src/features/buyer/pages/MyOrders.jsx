import React, { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const statuses = ['All', 'Processing', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'];

export default function MyOrders() {
  const { orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  const myOrders = useMemo(() => {
    if (!user) return [];
    return orders.filter(o => o.buyerId === user.id);
  }, [orders, user]);

  const filteredOrders = useMemo(() => {
    if (filter === 'All') return myOrders;
    return myOrders.filter(o => o.status === filter);
  }, [myOrders, filter]);

  if (loading) return <LoadingSpinner text="Loading orders..." />;

  return (
    <div className="space-y-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
        <div>
          <h1 className="text-headline-md font-bold text-on-surface">My Orders</h1>
          <p className="text-body-sm text-on-surface-variant mt-base">Track and manage your purchases across all vendors.</p>
        </div>
        <Button variant="outline" size="sm" to="/search">Continue Shopping</Button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-xs bg-surface-container-low p-xs rounded-xl w-fit overflow-x-auto">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              'px-md py-sm rounded-lg text-label-md font-medium whitespace-nowrap transition-colors',
              filter === s ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface',
            )}
          >
            {s}
            {s !== 'All' && (
              <span className="ml-sm text-meta text-on-surface-variant">
                {myOrders.filter(o => o.status === s).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <EmptyState
          icon="shopping_bag"
          title="No orders found"
          description={filter !== 'All' ? `No orders with status "${filter}".` : "You haven't placed any orders yet."}
          actionLabel={filter !== 'All' ? undefined : "Browse Products"}
          onAction={filter !== 'All' ? undefined : () => navigate('/search')}
        />
      ) : (
        <div className="space-y-sm">
          {filteredOrders.map(order => {
            const firstItem = order.items?.[0];
            return (
              <Link
                key={order.id}
                to={`/buyer/order-detail/${order.id}`}
                className="block bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-outline hover:shadow-sm transition-all overflow-hidden"
              >
                <div className="p-md sm:p-lg flex flex-col sm:flex-row gap-md">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-surface-container overflow-hidden shrink-0">
                    {firstItem?.image ? (
                      <img src={firstItem.image} alt={firstItem.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-outline-variant">
                        <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-sm">
                      <div>
                        <p className="text-body-sm font-semibold text-on-surface line-clamp-1">{firstItem?.name || 'Order'}</p>
                        <p className="text-meta text-on-surface-variant mt-base">
                          {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''} · {order.date || '—'}
                          {firstItem?.vendor && ` · ${firstItem.vendor}`}
                        </p>
                      </div>
                      <span className={cn('inline-block px-sm py-xs rounded-full text-meta font-semibold shrink-0', statusBadge(order.status))}>
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-sm">
                      <p className="text-meta text-on-surface-variant font-mono">#{order.id}</p>
                      <p className="text-body-lg font-bold text-on-surface">${(Number(order.total) || 0).toFixed(2)}</p>
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
