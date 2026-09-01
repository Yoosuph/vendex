import React, { useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from '@/shared/context/CartContext';
import { AuthContext } from '@/shared/context/AuthContext';
import ProductCard from '@/shared/components/ProductCard';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import BuyerPageHeader from '../components/BuyerPageHeader';
import {
  formatDate,
  formatMoney,
  statusBadgeClass,
} from '../utils';
import { cn } from '@/utils/cn';

export default function BuyerDashboardOverview() {
  const { orders, products, disputes, loading } = useContext(MarketplaceContext);
  const { wishlist, cartCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const myOrders = useMemo(() => {
    if (!user || !Array.isArray(orders)) return [];
    return orders.filter((o) => o.buyerId === user.id);
  }, [orders, user]);

  const myDisputes = useMemo(() => {
    if (!user || !Array.isArray(disputes)) return [];
    return disputes.filter(
      (d) => d.claimantId === user.id || d.claimantName === user.name,
    );
  }, [disputes, user]);

  const stats = useMemo(() => {
    const delivered = myOrders.filter((o) => o.status === 'Delivered').length;
    const pending = myOrders.filter((o) =>
      ['Processing', 'Shipped', 'In Transit', 'Pending'].includes(o.status),
    ).length;
    const totalSpent = myOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    return { total: myOrders.length, delivered, pending, totalSpent };
  }, [myOrders]);

  const recentOrders = useMemo(
    () =>
      [...myOrders]
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .slice(0, 5),
    [myOrders],
  );

  const suggestions = useMemo(() => {
    if (wishlist?.length) return wishlist.slice(0, 4);
    return (products || []).slice(0, 4);
  }, [products, wishlist]);

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  const firstName = user?.name?.split(' ')[0] || 'there';
  const openDisputes = myDisputes.filter((d) =>
    ['Open', 'Under Review', 'OPEN', 'UNDER_REVIEW'].includes(d.status),
  ).length;

  const statCards = [
    { label: 'Orders', value: stats.total, mono: String(stats.total).padStart(2, '0'), icon: 'receipt_long', tone: 'bg-info-container text-info' },
    { label: 'In progress', value: stats.pending, mono: String(stats.pending).padStart(2, '0'), icon: 'local_shipping', tone: 'bg-warning-container text-warning' },
    { label: 'Delivered', value: stats.delivered, mono: String(stats.delivered).padStart(2, '0'), icon: 'check_circle', tone: 'bg-success-container text-success' },
    { label: 'Lifetime', value: formatMoney(stats.totalSpent), mono: formatMoney(stats.totalSpent), icon: 'payments', tone: 'bg-error-container text-error' },
  ];

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="01  /  Account"
        title={`Welcome back, ${firstName}`}
        description="Track orders, manage saves, and pick up where you left off across the marketplace."
        actions={
          <>
            <Button variant="outline" size="sm" to="/search">Browse catalog</Button>
            <Button variant="primary" size="sm" to="/buyer/orders">View orders</Button>
          </>
        }
      />

      {/* Mono strip of live counters */}
      <div className="buyer-panel px-md py-sm flex flex-wrap gap-x-lg gap-y-sm items-center">
        <span className="buyer-mono text-[11px] tracking-widest uppercase text-on-surface-variant">
          Live
        </span>
        <span className="buyer-mono text-meta text-on-surface">
          Cart <strong className="text-primary">{cartCount}</strong>
        </span>
        <span className="buyer-mono text-meta text-on-surface">
          Wishlist <strong className="text-primary">{wishlist?.length || 0}</strong>
        </span>
        <span className="buyer-mono text-meta text-on-surface">
          Open disputes <strong className="text-primary">{openDisputes}</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="buyer-panel p-md hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-sm">
              <p className="buyer-eyebrow">{stat.label}</p>
              <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', stat.tone)}>
                <span className="material-symbols-outlined text-lg">{stat.icon}</span>
              </div>
            </div>
            <p className="buyer-price text-2xl md:text-3xl text-on-surface">{stat.mono}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 buyer-panel overflow-hidden">
          <div className="flex items-center justify-between px-md py-sm border-b buyer-hairline">
            <div>
              <p className="buyer-eyebrow">Recent activity</p>
              <h2 className="text-body-md font-semibold text-on-surface mt-1">Latest orders</h2>
            </div>
            <Link
              to="/buyer/orders"
              className="buyer-mono text-[11px] tracking-wider uppercase text-primary hover:underline"
            >
              View all →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-xl">
              <EmptyState
                icon="shopping_bag"
                title="No orders yet"
                description="Start shopping to see your orders here."
                actionLabel="Browse products"
                onAction={() => navigate('/search')}
              />
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/40">
              {recentOrders.map((order) => (
                <button
                  key={order.id}
                  type="button"
                  onClick={() => navigate(`/buyer/order-detail/${order.id}`)}
                  className="w-full text-left px-md py-sm flex items-center gap-md hover:bg-surface-container-low transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0">
                    {order.items?.[0]?.image ? (
                      <img
                        src={order.items[0].image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-outline-variant">
                        <span className="material-symbols-outlined">package_2</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-sm flex-wrap">
                      <span className="buyer-mono text-meta text-on-surface-variant">
                        #{order.displayId || order.id}
                      </span>
                      <span
                        className={cn(
                          'buyer-chip',
                          statusBadgeClass(order.status),
                        )}
                      >
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    <p className="text-body-sm font-medium text-on-surface truncate mt-0.5">
                      {order.items?.[0]?.name || 'Order'}
                      {order.items?.length > 1 && (
                        <span className="text-on-surface-variant font-normal">
                          {' '}
                          +{order.items.length - 1} more
                        </span>
                      )}
                    </p>
                    <p className="buyer-mono text-[11px] text-on-surface-variant mt-0.5">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <p className="buyer-price text-body-sm text-on-surface shrink-0">
                    {formatMoney(order.total)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-md">
          <div className="buyer-panel p-md">
            <p className="buyer-eyebrow mb-md">Quick actions</p>
            <div className="space-y-1">
              {[
                { label: 'Discover products', desc: 'Browse the marketplace', icon: 'search', to: '/search' },
                { label: 'Track orders', desc: 'Full order history', icon: 'receipt_long', to: '/buyer/orders' },
                { label: 'Wishlist', desc: 'Saved for later', icon: 'favorite', to: '/buyer/wishlist' },
                { label: 'Addresses', desc: 'Shipping destinations', icon: 'location_on', to: '/buyer/addresses' },
                { label: 'Write a review', desc: 'Rate delivered items', icon: 'rate_review', to: '/buyer/reviews' },
                { label: 'Wallet', desc: 'Credits & balance', icon: 'account_balance_wallet', to: '/buyer/wallet' },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="flex items-center gap-sm p-sm rounded-lg hover:bg-surface-container-low transition-colors group"
                >
                  <div className="w-9 h-9 rounded-md bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">{action.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                      {action.label}
                    </p>
                    <p className="buyer-mono text-[10px] tracking-wide text-on-surface-variant uppercase">
                      {action.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="buyer-panel p-md">
            <div className="flex items-center justify-between mb-md">
              <p className="buyer-eyebrow">You might like</p>
              <Link to="/search" className="buyer-mono text-[10px] tracking-wider uppercase text-primary">
                See all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-sm">
              {suggestions.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  size="compact"
                  showVendor={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
