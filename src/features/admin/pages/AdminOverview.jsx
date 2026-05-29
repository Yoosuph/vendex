import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';

export default function AdminOverview() {
  const { products, orders, users, loading } = useContext(MarketplaceContext);
  const { user } = useContext(AuthContext);

  // Compute real stats
  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0), [orders]);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const vendors = useMemo(() => users.filter(u => u.role === 'vendor'), [users]);
  const buyers = useMemo(() => users.filter(u => u.role === 'buyer'), [users]);
  const totalVendors = vendors.length;
  const totalBuyers = buyers.length;

  // Revenue sparkline from order totals (daily buckets)
  const sparklineData = useMemo(() => {
    const daily = {};
    orders.forEach(o => {
      const d = new Date(o.createdAt || o.date || Date.now()).toLocaleDateString();
      daily[d] = (daily[d] || 0) + (Number(o.total) || 0);
    });
    return Object.entries(daily).slice(-10);
  }, [orders]);

  // Recent orders
  const recentOrders = useMemo(() => [...orders].sort((a, b) =>
    new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0)
  ).slice(0, 5), [orders]);

  // Revenue sparkline SVG path
  const maxRev = Math.max(1, ...sparklineData.map(([, v]) => v));
  const sparklinePath = sparklineData.length > 0
    ? sparklineData.map(([, v], i) => {
        const x = (i / Math.max(sparklineData.length - 1, 1)) * 100;
        const y = 35 - ((v / maxRev) * 30);
        return `${i === 0 ? 'M' : 'L'}${x},${y}`;
      }).join(' ')
    : 'M0,35 L100,35';

  // Order fulfillment stats
  const orderStatuses = useMemo(() => {
    const counts = { delivered: 0, cancelled: 0, processing: 0, onHold: 0 };
    orders.forEach(o => {
      const s = (o.status || '').toLowerCase();
      if (s.includes('deliver') || s.includes('shipped') || s.includes('complete')) counts.delivered++;
      else if (s.includes('cancel') || s.includes('refund')) counts.cancelled++;
      else if (s.includes('process') || s.includes('pending')) counts.processing++;
      else counts.onHold++;
    });
    return counts;
  }, [orders]);

  // Pending (unapproved) vendors
  const pendingVendors = useMemo(() => vendors.filter(v => v.status !== 'approved').slice(0, 3), [vendors]);

  if (loading) return <div className="pt-16"><LoadingSpinner text="Loading dashboard..." /></div>;

  const formatCurrency = (val) => {
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(1) + 'k';
    return '$' + val.toFixed(2);
  };

  return (
    <main className="pt-16 min-h-screen p-gutter max-w-container-max mx-auto">

      {/* Stats cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">
        <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-transparent hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all">
          <div className="flex justify-between items-start mb-xs">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Total Revenue</span>
            <span className="bg-primary/10 text-primary px-xs py-[2px] rounded text-meta font-bold">{orders.length > 0 ? '+Active' : 'N/A'}</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="font-display-lg text-[28px] font-black text-primary">{formatCurrency(totalRevenue)}</h2>
            <svg className="w-20 h-10" viewBox="0 0 100 40">
              <path className="sparkline" d={sparklinePath} stroke="#c0152a" fill="none" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-transparent hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all">
          <div className="flex justify-between items-start mb-xs">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Total Orders</span>
            <span className="material-symbols-outlined text-secondary">shopping_cart</span>
          </div>
          <h2 className="font-display-lg text-[28px] font-black text-on-surface">{totalOrders.toLocaleString()}</h2>
          <p className="text-meta text-secondary mt-base font-medium">{orderStatuses.processing} pending fulfillment</p>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-transparent hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all">
          <div className="flex justify-between items-start mb-xs">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Active Vendors</span>
            <span className="material-symbols-outlined text-secondary">storefront</span>
          </div>
          <h2 className="font-display-lg text-[28px] font-black text-on-surface">{totalVendors.toLocaleString()}</h2>
          <div className="w-full bg-surface-container h-1 rounded-full mt-sm overflow-hidden">
            <div className="bg-primary h-full" style={{ width: `${totalVendors > 0 ? (vendors.filter(v => v.status === 'approved').length / totalVendors * 100) : 0}%` }}></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-transparent hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all">
          <div className="flex justify-between items-start mb-xs">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Registered Buyers</span>
            <span className="material-symbols-outlined text-secondary">group</span>
          </div>
          <h2 className="font-display-lg text-[28px] font-black text-on-surface">{totalBuyers.toLocaleString()}</h2>
          <p className="text-meta text-[#2D7A4F] mt-base font-bold">↑ Active community</p>
        </div>
      </section>

      {/* Revenue Growth & Order Fulfillment */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-md mb-xl">
        <div className="lg:col-span-8 bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-center mb-md">
            <h3 className="font-headline-md text-headline-md font-bold">Revenue Growth</h3>
            <select className="bg-surface border border-outline-variant rounded-lg font-label-md px-sm py-1 focus:ring-primary">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-1 relative overflow-hidden">
            <div className="absolute inset-0 border-b border-l border-outline-variant opacity-20"></div>
            {sparklineData.length > 0 ? (
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <path
                  d={sparklineData.map(([, v], i) => { const x = (i / Math.max(sparklineData.length - 1, 1)) * 1000; const y = 200 - ((v / maxRev) * 180); return `${i === 0 ? 'M' : 'L'}${x},${y}`; }).join(' ')}
                  fill="none" stroke="#c0152a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"
                />
                <path
                  d={sparklineData.map(([, v], i) => { const x = (i / Math.max(sparklineData.length - 1, 1)) * 1000; const y = 200 - ((v / maxRev) * 180); return `${i === 0 ? 'M' : 'L'}${x},${y}`; }).join(' ') + ' L1000,200 L0,200 Z'}
                  fill="url(#grad1)" opacity="0.1"
                />
                <defs>
                  <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#c0152a', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#c0152a', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              <div className="w-full flex items-center justify-center text-on-surface/40">No revenue data yet</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <h3 className="font-headline-md text-headline-md font-bold mb-md">Order Fulfillment</h3>
          <div className="flex flex-col items-center">
            <svg className="donut" height="160" viewBox="0 0 42 42" width="160">
              <circle className="donut-hole" cx="21" cy="21" fill="transparent" r="15.915"></circle>
              <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#e3e3de" strokeWidth="3"></circle>
              {(() => {
                const total = totalOrders || 1;
                const deliveredPct = orderStatuses.delivered / total * 100;
                const cancelledPct = orderStatuses.cancelled / total * 100;
                const processingPct = orderStatuses.processing / total * 100;
                return (
                  <>
                    <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#2D7A4F"
                      strokeDasharray={`${deliveredPct} ${100 - deliveredPct}`} strokeDashoffset="0" strokeWidth="4" />
                    <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#c0152a"
                      strokeDasharray={`${cancelledPct} ${100 - cancelledPct}`} strokeDashoffset={-deliveredPct} strokeWidth="4" />
                    <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#F5A623"
                      strokeDasharray={`${processingPct} ${100 - processingPct}`} strokeDashoffset={-(deliveredPct + cancelledPct)} strokeWidth="4" />
                  </>
                );
              })()}
              <g className="chart-text">
                <text className="font-bold text-[6px]" dominantBaseline="middle" fill="#1a1c19" textAnchor="middle" x="50%" y="50%">
                  {totalOrders ? Math.round(orderStatuses.delivered / totalOrders * 100) : 0}% Rate
                </text>
              </g>
            </svg>
            <div className="grid grid-cols-2 gap-sm w-full mt-md">
              <div className="flex items-center gap-xs"><div className="w-3 h-3 rounded-full bg-[#2D7A4F]"></div><span className="text-meta font-label-md">Delivered ({orderStatuses.delivered})</span></div>
              <div className="flex items-center gap-xs"><div className="w-3 h-3 rounded-full bg-[#c0152a]"></div><span className="text-meta font-label-md">Cancelled ({orderStatuses.cancelled})</span></div>
              <div className="flex items-center gap-xs"><div className="w-3 h-3 rounded-full bg-[#F5A623]"></div><span className="text-meta font-label-md">Processing ({orderStatuses.processing})</span></div>
              <div className="flex items-center gap-xs"><div className="w-3 h-3 rounded-full bg-[#e3e3de]"></div><span className="text-meta font-label-md">On Hold ({orderStatuses.onHold})</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* New Vendors + Recent Orders */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-md mb-lg">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="p-md border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md font-bold">New Vendors</h3>
            <Link to="/admin/vendors" className="text-primary font-label-md text-label-md hover:underline">View All</Link>
          </div>
          {pendingVendors.length === 0 ? (
            <EmptyState icon="storefront" title="No pending vendors" description="All vendors have been approved." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-md py-sm font-label-md text-label-md text-secondary">Vendor</th>
                    <th className="px-md py-sm font-label-md text-label-md text-secondary">ID</th>
                    <th className="px-md py-sm font-label-md text-label-md text-secondary text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {pendingVendors.map(v => (
                    <tr key={v.id} className="hover:bg-surface-container transition-colors">
                      <td className="px-md py-sm flex items-center gap-sm">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-primary">
                          {v.name ? v.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'VN'}
                        </div>
                        <span className="font-body-md text-body-md">{v.name || v.email}</span>
                      </td>
                      <td className="px-md py-sm font-body-sm text-body-sm text-on-surface-variant">{v.vendorId || v.id}</td>
                      <td className="px-md py-sm text-right">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-bold">{v.status || 'pending'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="p-md border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md font-bold">Recent Orders</h3>
            <Link to="/admin" className="text-primary font-label-md text-label-md hover:underline">View All</Link>
          </div>
          {recentOrders.length === 0 ? (
            <EmptyState icon="shopping_cart" title="No orders yet" description="Orders will appear here once buyers start purchasing." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-md py-sm font-label-md text-label-md text-secondary">Order ID</th>
                    <th className="px-md py-sm font-label-md text-label-md text-secondary">Customer</th>
                    <th className="px-md py-sm font-label-md text-label-md text-secondary">Amount</th>
                    <th className="px-md py-sm font-label-md text-label-md text-secondary">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {recentOrders.map(o => (
                    <tr key={o.id} className="hover:bg-surface-container transition-colors">
                      <td className="px-md py-sm font-body-sm text-body-sm font-bold">{o.id || 'N/A'}</td>
                      <td className="px-md py-sm font-body-sm text-body-sm">{o.buyerName || o.customerName || 'N/A'}</td>
                      <td className="px-md py-sm font-body-sm text-body-sm">${Number(o.total || 0).toFixed(2)}</td>
                      <td className="px-md py-sm">
                        <span className={`px-xs py-1 text-meta rounded font-bold ${
                          (o.status || '').toLowerCase().includes('shipped') || (o.status || '').toLowerCase().includes('deliver')
                            ? 'bg-[#2D7A4F]/10 text-[#2D7A4F]'
                            : (o.status || '').toLowerCase().includes('cancel')
                            ? 'bg-error/10 text-error'
                            : 'bg-primary/10 text-primary'
                        }`}>{o.status || 'Pending'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
