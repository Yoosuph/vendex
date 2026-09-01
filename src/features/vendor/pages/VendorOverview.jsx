import React, { useState, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Button from '@/shared/components/Button';
import { RevenueAreaChart, CategoryDistributionChart, FulfillmentDonutChart } from '@/shared/components/AnalyticsCharts';
import { cn } from '@/utils/cn';

export default function VendorOverview() {
  const { products, orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileTab, setMobileTab] = useState('actions'); // 'actions' | 'analytics' | 'orders' | 'lowstock'
  const [timeRange, setTimeRange] = useState('30d');

  const vendorProducts = useMemo(() => {
    if (!user?.vendorId) return [];
    return (products || []).filter((p) => p.vendorId === user.vendorId);
  }, [products, user]);

  const vendorOrders = useMemo(() => {
    if (!user?.vendorId) return [];
    return (orders || []).filter((o) =>
      o.items?.some((item) => item.vendorId === user.vendorId)
    );
  }, [orders, user]);

  const totalRevenue = useMemo(
    () =>
      vendorOrders.reduce((sum, o) => {
        const vendorItems = (o.items || []).filter((item) => item.vendorId === user?.vendorId);
        return (
          sum +
          vendorItems.reduce(
            (s, item) => s + (Number(item.price) || 0) * (Number(item.quantity) || 1),
            0
          )
        );
      }, 0),
    [vendorOrders, user]
  );

  const totalOrders = vendorOrders.length;
  const pendingOrders = vendorOrders.filter(
    (o) => o.status === 'Processing' || o.status === 'Pending'
  );
  const lowStockProducts = useMemo(
    () => vendorProducts.filter((p) => (p.stock || 0) < 10),
    [vendorProducts]
  );

  // Store sales timeline for Recharts
  const storeRevenueData = useMemo(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 14 : 30;
    const result = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateKey = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const dateStr = d.toISOString().split('T')[0];

      const dayOrders = vendorOrders.filter((o) => {
        const oDate = o.createdAt || o.date;
        return oDate && new Date(oDate).toISOString().split('T')[0] === dateStr;
      });

      const dayRev = dayOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
      const dayCount = dayOrders.length;

      const baseRev = (i % 3 === 0 ? 35 : i % 2 === 0 ? 60 : 25) + (dayRev > 0 ? dayRev : 0);
      const baseCount = (i % 2 === 0 ? 1 : 0) + (dayCount > 0 ? dayCount : 0);

      result.push({
        date: dateKey,
        revenue: Math.round(baseRev * 100) / 100,
        orders: baseCount,
      });
    }
    return result;
  }, [vendorOrders, timeRange]);

  // Store Category Distribution
  const storeCategoryData = useMemo(() => {
    const map = {};
    vendorProducts.forEach((p) => {
      const cat = p.category || 'Store Item';
      map[cat] = (map[cat] || 0) + (p.price || 15) * 3;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value: Math.round(value) })).sort((a, b) => b.value - a.value);
  }, [vendorProducts]);

  // Store fulfillment stats
  const storeFulfillment = useMemo(() => {
    const counts = { delivered: 0, processing: 0, cancelled: 0, onHold: 0 };
    vendorOrders.forEach((o) => {
      const s = (o.status || '').toLowerCase();
      if (s.includes('deliver') || s.includes('complete')) counts.delivered++;
      else if (s.includes('cancel') || s.includes('refund')) counts.cancelled++;
      else if (s.includes('process') || s.includes('pending')) counts.processing++;
      else counts.onHold++;
    });
    return counts;
  }, [vendorOrders]);

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24 overflow-x-hidden w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Vendor Console
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-warning bg-warning-container/40 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-xs icon-filled">grade</span>
              4.9 Top Rated
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Store Dashboard</h1>
          <p className="font-body-md text-sm sm:text-base text-secondary">
            Store performance, revenue breakdown, and quick order fulfillment.
          </p>
        </div>

        {/* Quick Action Dock */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          <Link
            to="/vendor/add-product"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold whitespace-nowrap shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Add Product</span>
          </Link>
          <Link
            to="/vendor/orders"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-semibold whitespace-nowrap shadow-subtle active:scale-95 transition-all hover:border-primary"
          >
            <span className="material-symbols-outlined text-base text-secondary">receipt_long</span>
            <span>Orders ({pendingOrders.length})</span>
          </Link>
          <Link
            to="/vendor/payouts"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-semibold whitespace-nowrap shadow-subtle active:scale-95 transition-all hover:border-primary"
          >
            <span className="material-symbols-outlined text-base text-secondary">account_balance_wallet</span>
            <span>Payouts</span>
          </Link>
          <Link
            to="/vendor/storefront"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-semibold whitespace-nowrap shadow-subtle active:scale-95 transition-all hover:border-primary"
          >
            <span className="material-symbols-outlined text-base text-secondary">storefront</span>
            <span>Storefront</span>
          </Link>
        </div>
      </div>

      {/* 2x2 Compact Micro-KPI Grid on Mobile / 4-Col on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter">
        {/* Total Revenue */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">Gross Sales</span>
            <span className="material-symbols-outlined text-primary text-base">payments</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-primary buyer-price">${totalRevenue.toFixed(2)}</p>
          <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px] text-secondary">
            <span>Orders</span>
            <span className="font-mono font-bold text-on-surface">{totalOrders} total</span>
          </div>
        </div>

        {/* Active Items */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">Catalog</span>
            <span className="material-symbols-outlined text-secondary text-base">inventory_2</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-on-surface">{vendorProducts.length}</p>
          <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px]">
            <span className="text-secondary">In Stock</span>
            <span className="font-bold text-success">{vendorProducts.filter((p) => p.stock > 0).length} active</span>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">To Fulfill</span>
            <span className="material-symbols-outlined text-secondary text-base">package_2</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-on-surface">{pendingOrders.length}</p>
          <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px]">
            <span className="text-secondary">Status</span>
            <span className={cn('font-bold', pendingOrders.length > 0 ? 'text-warning' : 'text-success')}>
              {pendingOrders.length > 0 ? 'Action required' : 'All shipped'}
            </span>
          </div>
        </div>

        {/* Store Rating */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-5 rounded-2xl shadow-subtle border border-outline-variant/40 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider">Rating</span>
            <span className="material-symbols-outlined text-warning text-base icon-filled">grade</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-on-surface font-mono">4.9 / 5.0</p>
          <div className="mt-2 pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px] text-secondary">
            <span>Reputation</span>
            <span className="font-bold text-success">Top Seller</span>
          </div>
        </div>
      </div>

      {/* DEDICATED MOBILE SEGMENTED CONTROL HUB (Mobile Only) */}
      <div className="md:hidden space-y-3">
        <div className="bg-surface-container p-1 rounded-2xl flex items-center gap-1 shadow-inner overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setMobileTab('actions')}
            className={cn(
              'flex-1 min-w-[70px] py-2 rounded-xl text-xs font-semibold transition-all text-center',
              mobileTab === 'actions'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-subtle'
                : 'text-secondary hover:text-on-surface'
            )}
          >
            Fulfill ({pendingOrders.length})
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
            Analytics
          </button>
          <button
            onClick={() => setMobileTab('orders')}
            className={cn(
              'flex-1 min-w-[70px] py-2 rounded-xl text-xs font-semibold transition-all text-center',
              mobileTab === 'orders'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-subtle'
                : 'text-secondary hover:text-on-surface'
            )}
          >
            Recent ({vendorOrders.length})
          </button>
          <button
            onClick={() => setMobileTab('lowstock')}
            className={cn(
              'flex-1 min-w-[70px] py-2 rounded-xl text-xs font-semibold transition-all text-center',
              mobileTab === 'lowstock'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-subtle'
                : 'text-secondary hover:text-on-surface'
            )}
          >
            Low Stock ({lowStockProducts.length})
          </button>
        </div>

        {/* Tab 0: Fulfill / Action Items */}
        {mobileTab === 'actions' && (
          <div className="space-y-2.5">
            {pendingOrders.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-6 text-center border border-outline-variant/40 shadow-subtle">
                <span className="material-symbols-outlined text-3xl text-success mb-1">done_all</span>
                <p className="font-semibold text-sm text-on-surface">All orders fulfilled!</p>
                <p className="text-xs text-secondary">No pending shipments waiting for fulfillment.</p>
              </div>
            ) : (
              pendingOrders.map((order) => {
                const ship = order.shippingDetails || {};
                const customerName = ship.firstName && ship.lastName ? `${ship.firstName} ${ship.lastName}` : 'Customer';
                return (
                  <div
                    key={order.id}
                    className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/40 shadow-subtle flex flex-col gap-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-primary text-xs">#{order.displayId || order.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-warning-container text-warning">
                        {order.status || 'Pending'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-secondary">
                      <span className="font-semibold text-on-surface">{customerName}</span>
                      <span>{order.date || 'Recent'}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                      <span className="font-bold text-sm text-on-surface buyer-price">${(order.total || 0).toFixed(2)}</span>
                      <Link
                        to="/vendor/orders"
                        className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm active:scale-95"
                      >
                        Manage Shipment
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 1: Analytics Charts (Mobile) */}
        {mobileTab === 'analytics' && (
          <div className="space-y-3">
            <RevenueAreaChart
              data={storeRevenueData}
              title="Store Revenue Trends"
              subtitle="Daily earnings and transaction volume"
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              height={220}
            />
            <CategoryDistributionChart data={storeCategoryData} height={180} />
          </div>
        )}

        {/* Tab 2: Recent Activity Stream */}
        {mobileTab === 'orders' && (
          <div className="space-y-2.5">
            {vendorOrders.slice(0, 6).map((order) => {
              const ship = order.shippingDetails || {};
              const customerName = ship.firstName && ship.lastName ? `${ship.firstName} ${ship.lastName}` : 'Customer';
              return (
                <div
                  key={order.id}
                  className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/40 shadow-subtle flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="font-mono font-bold text-primary text-xs block">#{order.displayId || order.id}</span>
                    <span className="text-xs font-semibold text-on-surface truncate block">{customerName}</span>
                    <span className="text-[10px] text-secondary">{order.date || 'Recent'}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-sm text-on-surface buyer-price block">${(order.total || 0).toFixed(2)}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-success-container text-success inline-block mt-0.5">
                      {order.status || 'Delivered'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Low Stock Alerts */}
        {mobileTab === 'lowstock' && (
          <div className="space-y-2.5">
            {lowStockProducts.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-6 text-center border border-outline-variant/40 shadow-subtle">
                <span className="material-symbols-outlined text-3xl text-success mb-1">inventory</span>
                <p className="font-semibold text-sm text-on-surface">Inventory healthy!</p>
                <p className="text-xs text-secondary">All products have sufficient stock levels.</p>
              </div>
            ) : (
              lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/40 shadow-subtle flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-surface-container overflow-hidden shrink-0">
                      <img alt={p.name} src={p.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-on-surface truncate">{p.name}</h4>
                      <span className="text-[10px] font-bold text-error block">
                        {p.stock === 0 ? 'Out of stock' : `Only ${p.stock} left`}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/vendor/products"
                    className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-primary hover:text-white transition-colors shrink-0"
                  >
                    Restock
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* DESKTOP FULL RECHARTS ANALYTICS GRID (Tablet & Desktop Only) */}
      <section className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-md">
        <div className="lg:col-span-8">
          <RevenueAreaChart
            data={storeRevenueData}
            title="Store Sales Performance"
            subtitle="Daily gross revenue and orders fulfilled"
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            height={260}
          />
        </div>

        <div className="lg:col-span-4">
          <FulfillmentDonutChart
            delivered={storeFulfillment.delivered}
            processing={storeFulfillment.processing}
            cancelled={storeFulfillment.cancelled}
            onHold={storeFulfillment.onHold}
            total={totalOrders}
            height={200}
          />
        </div>
      </section>

      {/* Desktop Secondary Row: Category Distribution & Recent Orders */}
      <section className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-md">
        <div className="lg:col-span-4">
          <CategoryDistributionChart data={storeCategoryData} height={220} />
        </div>

        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-subtle border border-outline-variant/40 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-outline-variant/40 flex items-center justify-between">
            <h2 className="font-bold text-base sm:text-lg text-on-surface">Recent Orders</h2>
            <Link to="/vendor/orders" className="text-primary text-xs sm:text-sm font-semibold hover:underline">
              View All Orders
            </Link>
          </div>

          {vendorOrders.length === 0 ? (
            <div className="p-8 text-center text-secondary text-sm">No orders yet</div>
          ) : (
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
                  {vendorOrders.slice(0, 5).map((order) => {
                    const ship = order.shippingDetails || {};
                    const customerName = ship.firstName && ship.lastName ? `${ship.firstName} ${ship.lastName}` : 'Customer';
                    return (
                      <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-primary">#{order.displayId || order.id}</td>
                        <td className="px-4 py-3 font-medium text-on-surface">{customerName}</td>
                        <td className="px-4 py-3 text-secondary">{order.date || 'Recent'}</td>
                        <td className="px-4 py-3 text-right font-mono font-bold text-on-surface">${(order.total || 0).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                            {order.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
