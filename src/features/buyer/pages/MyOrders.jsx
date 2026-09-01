import React, { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import { OrdersListSkeleton } from '@/shared/components/SkeletonLoader';
import BuyerPageHeader from '../components/BuyerPageHeader';
import {
  ORDER_STATUSES,
  formatDate,
  formatMoney,
  statusBadgeClass,
} from '../utils';
import { cn } from '@/utils/cn';

export default function MyOrders() {
  const { orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const myOrders = useMemo(() => {
    if (!user || !Array.isArray(orders)) return [];
    return [...orders]
      .filter((o) => o.buyerId === user.id)
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  }, [orders, user]);

  const filteredOrders = useMemo(() => {
    let list = myOrders;
    if (filter !== 'All') list = list.filter((o) => o.status === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (o) =>
          String(o.displayId || o.id).toLowerCase().includes(q) ||
          o.items?.some(
            (i) =>
              i.name?.toLowerCase().includes(q) ||
              i.vendor?.toLowerCase().includes(q),
          ),
      );
    }
    return list;
  }, [myOrders, filter, query]);

  if (loading && (!orders || orders.length === 0)) {
    return (
      <div className="space-y-xl">
        <BuyerPageHeader
          eyebrow="02  /  Orders"
          title="My orders"
          description="Track purchases across every vendor on Vendex."
        />
        <OrdersListSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="02  /  Orders"
        title="My orders"
        description="Track purchases across every vendor on Vendex."
        actions={<Button variant="outline" size="sm" to="/search">Continue shopping</Button>}
      />

      <div className="flex flex-col gap-md">
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
            search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order ID, product, or vendor"
            className="buyer-input pl-10 buyer-mono text-sm"
          />
        </div>

        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl w-full overflow-x-auto hide-scrollbar">
          {ORDER_STATUSES.map((s) => {
            const count =
              s === 'All'
                ? myOrders.length
                : myOrders.filter((o) => o.status === s).length;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={cn(
                  'px-md py-sm rounded-lg buyer-mono text-[11px] tracking-wide uppercase whitespace-nowrap transition-colors',
                  filter === s
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface',
                )}
              >
                {s}
                <span className="ml-1.5 opacity-60">{String(count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="buyer-panel">
          <EmptyState
            icon="shopping_bag"
            title="No orders found"
            description={
              filter !== 'All' || query
                ? 'Try another filter or search term.'
                : "You haven't placed any orders yet."
            }
            actionLabel={filter === 'All' && !query ? 'Browse products' : undefined}
            onAction={
              filter === 'All' && !query ? () => navigate('/search') : undefined
            }
          />
        </div>
      ) : (
        <div className="space-y-sm">
          {filteredOrders.map((order) => {
            const firstItem = order.items?.[0];
            return (
              <Link
                key={order.id}
                to={`/buyer/order-detail/${order.id}`}
                className="block buyer-panel hover:border-primary/35 hover:shadow-sm transition-all overflow-hidden"
              >
                <div className="p-md sm:p-lg flex flex-col sm:flex-row gap-md">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-surface-container overflow-hidden shrink-0">
                    {firstItem?.image ? (
                      <img
                        src={firstItem.image}
                        alt={firstItem.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-outline-variant">
                        <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-sm">
                      <div className="min-w-0">
                        <p className="text-body-sm font-semibold text-on-surface line-clamp-1">
                          {firstItem?.name || 'Order'}
                        </p>
                        <p className="buyer-mono text-[11px] text-on-surface-variant mt-1 tracking-wide">
                          {order.items?.length || 0} item
                          {order.items?.length !== 1 ? 's' : ''}
                          {' · '}
                          {formatDate(order.date)}
                          {firstItem?.vendor && ` · ${firstItem.vendor}`}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'buyer-chip shrink-0',
                          statusBadgeClass(order.status),
                        )}
                      >
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-sm pt-sm border-t buyer-hairline">
                      <p className="buyer-mono text-meta text-on-surface-variant">
                        #{order.displayId || order.id}
                      </p>
                      <p className="buyer-price text-body-md text-on-surface">
                        {formatMoney(order.total)}
                      </p>
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
