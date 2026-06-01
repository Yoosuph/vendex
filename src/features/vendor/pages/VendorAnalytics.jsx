import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Button from '@/shared/components/Button';

export default function VendorAnalytics() {
  const { products, orders, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  const [timeRange, setTimeRange] = useState('30d');

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

  const filteredOrders = useMemo(() => {
    if (timeRange === '7d') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return vendorOrders.filter(o => new Date(o.date || o.createdAt || Date.now()) >= weekAgo);
    }
    if (timeRange === '365d') {
      const yearAgo = new Date();
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      return vendorOrders.filter(o => new Date(o.date || o.createdAt || Date.now()) >= yearAgo);
    }
    return vendorOrders;
  }, [vendorOrders, timeRange]);

  const totalSales = useMemo(() =>
    filteredOrders.reduce((sum, o) => sum + (o.total || 0), 0),
    [filteredOrders]
  );

  const orderCount = filteredOrders.length;
  const avgOrderValue = orderCount > 0 ? totalSales / orderCount : 0;

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const breakdown = {};
    vendorOrders.forEach(order => {
      (order.items || []).forEach(item => {
        if (item.vendorId === user?.vendorId) {
          const product = vendorProducts.find(p => p.id === item.id);
          const cat = product?.category || 'Other';
          breakdown[cat] = (breakdown[cat] || 0) + (item.price * (item.quantity || 1));
        }
      });
    });
    const grandTotal = Object.values(breakdown).reduce((s, v) => s + v, 0);
    return Object.entries(breakdown)
      .map(([name, value]) => ({ name, value, pct: grandTotal > 0 ? (value / grandTotal) * 100 : 0 }))
      .sort((a, b) => b.value - a.value);
  }, [vendorOrders, vendorProducts, user]);

  // Top products
  const topProducts = useMemo(() => {
    const prodSales = {};
    vendorOrders.forEach(order => {
      (order.items || []).forEach(item => {
        if (item.vendorId === user?.vendorId) {
          prodSales[item.id] = (prodSales[item.id] || 0) + (item.price * (item.quantity || 1));
        }
      });
    });
    return Object.entries(prodSales)
      .map(([id, value]) => {
        const product = vendorProducts.find(p => p.id === id);
        return { id, name: product?.name || 'Unknown', value };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [vendorOrders, vendorProducts, user]);

  // Returning vs new (simulated)
  const returningCustomers = Math.round(orderCount * 0.72);
  const newCustomers = orderCount - returningCustomers;
  const totalCustomers = orderCount;

  if (loading) return <LoadingSpinner text="Loading analytics..." />;

  return (
    <div>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-container-max mx-auto px-gutter py-lg">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-lg">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Vendor Performance</h3>
              <p className="font-body-md text-body-md text-secondary">Real-time insights across all retail channels.</p>
            </div>
            <div className="inline-flex bg-surface-container-lowest border border-outline-variant p-1 rounded-xl shadow-subtle">
              <Button variant={timeRange === '7d' ? 'primary-container' : 'ghost'} onClick={() => setTimeRange('7d')}>Last 7d</Button>
              <Button variant={timeRange === '30d' ? 'primary-container' : 'ghost'} onClick={() => setTimeRange('30d')}>Last 30d</Button>
              <Button variant={timeRange === '365d' ? 'primary-container' : 'ghost'} onClick={() => setTimeRange('365d')}>Yearly</Button>
            </div>
          </div>

          <div className="w-full bg-surface-container-lowest rounded-xl shadow-subtle p-gutter mb-gutter overflow-hidden relative group">
            <div className="flex items-center justify-between mb-lg">
              <div>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Gross Sales</p>
                <h4 className="font-headline-lg text-headline-lg text-on-surface">${totalSales.toFixed(2)}</h4>
                <span className="font-label-sm text-label-sm text-success bg-success-container/30 px-xs py-0.5 rounded-full inline-flex items-center gap-0.5 mt-xs">
                  <span className="material-symbols-outlined text-body-sm">trending_up</span> From {orderCount} orders
                </span>
              </div>
              <div className="flex items-center gap-sm">
                <div className="flex items-center gap-xs">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="font-label-sm text-label-sm text-secondary">Sales</span>
                </div>
              </div>
            </div>

            <div className="h-64 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 1000 200">
                <line stroke="#DEDEDA" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50"></line>
                <line stroke="#DEDEDA" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="100" y2="100"></line>
                <line stroke="#DEDEDA" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150"></line>
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#C0152A" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#C0152A" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,180 Q150,140 300,160 T600,80 T900,120 L1000,100 L1000,200 L0,200 Z" fill="url(#chartGradient)"></path>
                <path className="chart-line" d="M0,180 Q150,140 300,160 T600,80 T900,120 L1000,100" fill="none" stroke="#C0152A" strokeLinecap="round" strokeWidth="3"></path>
                <circle className="shadow-lg" cx="600" cy="80" fill="#C0152A" r="5"></circle>
                <text className="font-label-sm text-label-sm fill-on-surface" textAnchor="middle" x="600" y="60">${(totalSales * 0.08).toLocaleString(undefined, { maximumFractionDigits: 0 })}</text>
              </svg>
            </div>
            <div className="flex justify-between mt-sm">
              <span className="font-label-sm text-label-sm text-secondary">Recent</span>
              <span className="font-label-sm text-label-sm text-secondary">Older</span>
              <span className="font-label-sm text-label-sm text-secondary">Period</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="bg-surface-container-lowest rounded-xl shadow-subtle p-gutter">
              <div className="flex items-center justify-between mb-lg">
                <h5 className="font-headline-md text-headline-md text-on-surface">Top Categories</h5>
                <Button variant="ghost" icon={<span className="material-symbols-outlined">more_vert</span>} />
              </div>
              <div className="space-y-md">
                {categoryBreakdown.length === 0 ? (
                  <p className="text-secondary">No sales data yet</p>
                ) : (
                  categoryBreakdown.map(cat => (
                    <div key={cat.name} className="space-y-xs">
                      <div className="flex justify-between font-label-md text-label-md">
                        <span className="text-on-surface">{cat.name}</span>
                        <span className="text-secondary">{cat.pct.toFixed(0)}%</span>
                      </div>
                      <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container rounded-full" style={{ width: `${cat.pct}%` }}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-subtle p-gutter">
              <div className="flex items-center justify-between mb-lg">
                <h5 className="font-headline-md text-headline-md text-on-surface">Customer Loyalty</h5>
                <Button variant="ghost" icon={<span className="material-symbols-outlined">info</span>} />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-lg">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" r="40" stroke="#e3e3de" strokeWidth="12"></circle>
                    <circle cx="50" cy="50" fill="none" r="40" stroke="#C0152A" strokeDasharray={`${(returningCustomers / Math.max(totalCustomers, 1)) * 251} 251`} strokeWidth="12"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-headline-md text-headline-md text-on-surface">{totalCustomers > 0 ? Math.round((returningCustomers / totalCustomers) * 100) : 0}%</span>
                    <span className="font-meta text-meta text-secondary">Retention</span>
                  </div>
                </div>
                <div className="flex-1 space-y-sm w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-xs">
                      <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                      <span className="font-label-md text-label-md text-on-surface">Returning</span>
                    </div>
                    <span className="font-label-md text-label-md text-secondary">{returningCustomers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-xs">
                      <span className="w-3 h-3 rounded-full bg-secondary"></span>
                      <span className="font-label-md text-label-md text-on-surface">New</span>
                    </div>
                    <span className="font-label-md text-label-md text-secondary">{newCustomers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-xs">
                      <span className="w-3 h-3 rounded-full bg-surface-variant"></span>
                      <span className="font-label-md text-label-md text-on-surface">Avg Order</span>
                    </div>
                    <span className="font-label-md text-label-md text-secondary">${avgOrderValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-gutter grid grid-cols-3 gap-gutter mb-gutter">
            {topProducts.map(prod => (
              <div key={prod.id} className="bg-surface-container-lowest rounded-xl shadow-subtle p-md text-center">
                <span className="font-label-md text-label-md text-on-surface block">{prod.name}</span>
                <span className="font-headline-md text-headline-md text-primary">${prod.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
