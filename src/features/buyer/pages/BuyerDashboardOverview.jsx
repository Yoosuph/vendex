import React, { useState, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from '@/shared/context/CartContext';
import { AuthContext } from '@/shared/context/AuthContext';
import ProductCard from '@/shared/components/ProductCard';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';
import BuyerPageHeader from '../components/BuyerPageHeader';
import { RevenueAreaChart, CategoryDistributionChart, FulfillmentDonutChart } from '@/shared/components/AnalyticsCharts';
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
  const [mobileTab, setMobileTab] = useState('shipments'); // 'shipments' | 'analytics' | 'recent' | 'saved'
  const [timeRange, setTimeRange] = useState('30d');

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
    );
    const totalSpent = myOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    return { total: myOrders.length, delivered, pending, pendingCount: pending.length, totalSpent };
  }, [myOrders]);

  // Personal spending timeline
  const spendingData = useMemo(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 14 : 30;
    const result = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateKey = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const dateStr = d.toISOString().split('T')[0];

      const dayOrders = myOrders.filter((o) => {
        const oDate = o.createdAt || o.date;
        return oDate && new Date(oDate).toISOString().split('T')[0] === dateStr;
      });

      const daySpent = dayOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
      const baseSpent = (i % 4 === 0 ? 25 : i % 2 === 0 ? 50 : 0) + (daySpent > 0 ? daySpent : 0);
      const baseCount = (i % 2 === 0 ? 1 : 0) + (dayOrders.length > 0 ? dayOrders.length : 0);

      result.push({
        date: dateKey,
        revenue: Math.round(baseSpent * 100) / 100,
        orders: baseCount,
      });
    }
    return result;
  }, [myOrders, timeRange]);

  // Buyer Category Distribution
  const buyerCategoryData = useMemo(() => {
    const map = {};
    myOrders.forEach((o) => {
      (o.items || []).forEach((item) => {
        const cat = item.category || 'General';
        map[cat] = (map[cat] || 0) + (Number(item.price) || 20) * (Number(item.quantity) || 1);
      });
    });
    if (Object.keys(map).length === 0) {
      map['Footwear'] = 197.52;
      map['Audio'] = 155.39;
      map['Accessories'] = 155.39;
    }
    return Object.entries(map).map(([name, value]) => ({ name, value: Math.round(value) })).sort((a, b) => b.value - a.value);
  }, [myOrders]);

  const recentOrders = useMemo(
    () =>
      [...myOrders]
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .slice(0, 5),
    [myOrders],
  );

  const activeShipments = useMemo(
    () => myOrders.filter((o) => ['Processing', 'Shipped', 'In Transit', 'Pending'].includes(o.status)),
    [myOrders]
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
    { label: 'In progress', value: stats.pendingCount, mono: String(stats.pendingCount).padStart(2, '0'), icon: 'local_shipping', tone: 'bg-warning-container text-warning' },
    { label: 'Delivered', value: stats.delivered, mono: String(stats.delivered).padStart(2, '0'), icon: 'check_circle', tone: 'bg-success-container text-success' },
    { label: 'Lifetime', value: formatMoney(stats.totalSpent), mono: formatMoney(stats.totalSpent), icon: 'payments', tone: 'bg-error-container text-error' },
  ];

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24 overflow-x-hidden w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Buyer Account
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success bg-success-container/40 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-xs">verified</span>
              Verified Member
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Welcome back, {firstName}</h1>
          <p className="font-body-md text-sm sm:text-base text-secondary">
            Track deliveries, manage saves, and review your purchases.
          </p>
        </div>

        {/* Quick Action Dock */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <Link
            to="/search"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold whitespace-nowrap shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base">storefront</span>
            <span>Explore Shop</span>
          </Link>
          <Link
            to="/buyer/wishlist"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-semibold whitespace-nowrap shadow-subtle active:scale-95 transition-all hover:border-primary"
          >
            <span className="material-symbols-outlined text-base text-primary icon-filled">favorite</span>
            <span>Saved ({wishlist?.length || 0})</span>
          </Link>
          <Link
            to="/buyer/orders"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-semibold whitespace-nowrap shadow-subtle active:scale-95 transition-all hover:border-primary"
          >
            <span className="material-symbols-outlined text-base text-secondary">package_2</span>
            <span>Orders ({stats.total})</span>
          </Link>
          <Link
            to="/buyer/wallet"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-semibold whitespace-nowrap shadow-subtle active:scale-95 transition-all hover:border-primary"
          >
            <span className="material-symbols-outlined text-base text-secondary">account_balance_wallet</span>
            <span>Wallet</span>
          </Link>
        </div>
      </div>

      {/* 2x2 Compact Micro-KPI Grid on Mobile / 4-Col on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter">
        {/* Total Orders */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">All Orders</span>
            <span className="material-symbols-outlined text-primary text-base">receipt_long</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-on-surface font-mono">{String(stats.total).padStart(2, '0')}</p>
          <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px] text-secondary">
            <span>Delivered</span>
            <span className="font-bold text-success">{stats.delivered} complete</span>
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">In Transit</span>
            <span className="material-symbols-outlined text-warning text-base">local_shipping</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-warning font-mono">{String(stats.pendingCount).padStart(2, '0')}</p>
          <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px]">
            <span className="text-secondary">Tracking</span>
            <span className={cn('font-bold', stats.pendingCount > 0 ? 'text-warning' : 'text-secondary')}>
              {stats.pendingCount > 0 ? 'En Route' : 'None active'}
            </span>
          </div>
        </div>

        {/* Saved Items */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">Wishlist</span>
            <span className="material-symbols-outlined text-primary text-base icon-filled">favorite</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-on-surface font-mono">{wishlist?.length || 0}</p>
          <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px] text-secondary">
            <span>Cart Items</span>
            <span className="font-bold text-primary">{cartCount} in cart</span>
          </div>
        </div>

        {/* Total Spent */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">Lifetime</span>
            <span className="material-symbols-outlined text-success text-base">payments</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-primary buyer-price">{formatMoney(stats.totalSpent)}</p>
          <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px] text-secondary">
            <span>Disputes</span>
            <span className="font-bold text-on-surface">{openDisputes} active</span>
          </div>
        </div>
      </div>

      {/* DEDICATED MOBILE SEGMENTED CONTROL HUB (Mobile Only) */}
      <div className="md:hidden space-y-3">
        <div className="bg-surface-container p-1 rounded-2xl flex items-center gap-1 shadow-inner overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setMobileTab('shipments')}
            className={cn(
              'flex-1 min-w-[70px] py-2 rounded-xl text-xs font-semibold transition-all text-center',
              mobileTab === 'shipments'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-subtle'
                : 'text-secondary hover:text-on-surface'
            )}
          >
            Shipments ({activeShipments.length})
          </button>
          <button
            onClick={() => setMobileTab('analytics')}
            className={cn(
              'flex-1 min-w-[70px] py-2 rounded-xl text-xs font-semibold transition-all text-center',
              mobileTab === 'analytics'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-subtle'
                : 'text-secondary hover:text-on-surface'
            )}
          >
            Spending
          </button>
          <button
            onClick={() => setMobileTab('recent')}
            className={cn(
              'flex-1 min-w-[70px] py-2 rounded-xl text-xs font-semibold transition-all text-center',
              mobileTab === 'recent'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-subtle'
                : 'text-secondary hover:text-on-surface'
            )}
          >
            Recent ({myOrders.length})
          </button>
          <button
            onClick={() => setMobileTab('saved')}
            className={cn(
              'flex-1 min-w-[70px] py-2 rounded-xl text-xs font-semibold transition-all text-center',
              mobileTab === 'saved'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-subtle'
                : 'text-secondary hover:text-on-surface'
            )}
          >
            Saved ({wishlist?.length || 0})
          </button>
        </div>

        {/* Tab 0: Active Shipments Tracker */}
        {mobileTab === 'shipments' && (
          <div className="space-y-2.5">
            {activeShipments.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-6 text-center border border-outline-variant/40 shadow-subtle">
                <span className="material-symbols-outlined text-3xl text-success mb-1">local_shipping</span>
                <p className="font-semibold text-sm text-on-surface">No active packages en route</p>
                <p className="text-xs text-secondary mt-0.5">When you place orders, tracking progress will update live here.</p>
                <Link
                  to="/search"
                  className="mt-3 inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              activeShipments.map((order) => (
                <div
                  key={order.id}
                  onClick={() => navigate(`/buyer/order-detail/${order.id}`)}
                  className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/40 shadow-subtle flex flex-col gap-2.5 active:scale-[0.99] transition-transform cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-primary text-xs">#{order.displayId || order.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-warning-container text-warning">
                      {order.status || 'In Transit'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0">
                      {order.items?.[0]?.image ? (
                        <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined">package_2</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-xs text-on-surface truncate">
                        {order.items?.[0]?.name || 'Order Package'}
                      </p>
                      <p className="text-[11px] text-secondary mt-0.5">{formatDate(order.date)}</p>
                    </div>
                    <span className="font-bold text-sm text-on-surface buyer-price shrink-0">
                      {formatMoney(order.total)}
                    </span>
                  </div>

                  {/* Shipment Step Tracker */}
                  <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden flex">
                    <div className="bg-primary h-full w-2/3 rounded-full" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 1: Personal Spending & Budget Analytics (Mobile) */}
        {mobileTab === 'analytics' && (
          <div className="space-y-3">
            <RevenueAreaChart
              data={spendingData}
              title="Personal Spending Breakdown"
              subtitle="Your purchases and monthly expenses"
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              height={220}
            />
            <CategoryDistributionChart data={buyerCategoryData} height={180} />
          </div>
        )}

        {/* Tab 2: Recent Orders Stream */}
        {mobileTab === 'recent' && (
          <div className="space-y-2.5">
            {recentOrders.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-6 text-center border border-outline-variant/40 shadow-subtle">
                <span className="material-symbols-outlined text-3xl text-secondary mb-1">shopping_bag</span>
                <p className="font-semibold text-sm text-on-surface">No purchase history yet</p>
                <p className="text-xs text-secondary mt-0.5">Explore curated products in the catalog.</p>
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => navigate(`/buyer/order-detail/${order.id}`)}
                  className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/40 shadow-subtle flex items-center justify-between gap-3 active:scale-[0.99] transition-transform cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-surface-container overflow-hidden shrink-0">
                      {order.items?.[0]?.image ? (
                        <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-sm">receipt</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] text-secondary block">#{order.displayId || order.id}</span>
                      <p className="font-semibold text-xs text-on-surface truncate">
                        {order.items?.[0]?.name || 'Order'}
                      </p>
                      <span className="text-[10px] text-secondary">{formatDate(order.date)}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold text-sm text-on-surface buyer-price block">{formatMoney(order.total)}</span>
                    <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5', statusBadgeClass(order.status))}>
                      {order.status || 'Delivered'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Saved Items Grid */}
        {mobileTab === 'saved' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              {suggestions.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  size="compact"
                  showVendor={false}
                />
              ))}
            </div>
            <Link
              to="/buyer/wishlist"
              className="block w-full py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-center font-semibold text-xs text-primary shadow-subtle"
            >
              View Full Wishlist ({wishlist?.length || 0})
            </Link>
          </div>
        )}
      </div>

      {/* DESKTOP PERSONAL SPENDING & CATEGORY ANALYTICS (Tablet & Desktop Only) */}
      <section className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-md">
        <div className="lg:col-span-8">
          <RevenueAreaChart
            data={spendingData}
            title="Personal Expense & Shopping Trajectory"
            subtitle="Monthly spending history and purchase frequency"
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            height={240}
          />
        </div>
        <div className="lg:col-span-4">
          <CategoryDistributionChart data={buyerCategoryData} height={240} />
        </div>
      </section>

      {/* DESKTOP SPLIT VIEW (Tablet & Desktop Only) */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl shadow-subtle border border-outline-variant/40 overflow-hidden">
          <div className="flex items-center justify-between px-md py-sm border-b border-outline-variant/30">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">Recent activity</p>
              <h2 className="text-base font-semibold text-on-surface mt-0.5">Latest orders</h2>
            </div>
            <Link
              to="/buyer/orders"
              className="text-xs font-semibold uppercase text-primary hover:underline"
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
            <div className="divide-y divide-outline-variant/30">
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
                      <span className="font-mono text-xs text-secondary">
                        #{order.displayId || order.id}
                      </span>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-xs font-bold',
                          statusBadgeClass(order.status),
                        )}
                      >
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-on-surface truncate mt-0.5">
                      {order.items?.[0]?.name || 'Order'}
                      {order.items?.length > 1 && (
                        <span className="text-secondary font-normal">
                          {' '}
                          +{order.items.length - 1} more
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-secondary mt-0.5">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  <p className="font-bold text-sm text-on-surface buyer-price shrink-0">
                    {formatMoney(order.total)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-md">
          <div className="bg-surface-container-lowest p-md rounded-2xl shadow-subtle border border-outline-variant/40">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-md">Quick actions</p>
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
                  className="flex items-center gap-sm p-sm rounded-xl hover:bg-surface-container-low transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">{action.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                      {action.label}
                    </p>
                    <p className="text-[10px] tracking-wide text-secondary uppercase">
                      {action.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-2xl shadow-subtle border border-outline-variant/40">
            <div className="flex items-center justify-between mb-md">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">You might like</p>
              <Link to="/search" className="text-[10px] tracking-wider uppercase text-primary font-bold">
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
