import React, { useState, useContext, useMemo, useEffect } from 'react';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

const STORAGE_KEY = 'vendex_commission_settings';

export default function AdminPayoutsCommissions() {
  const { orders, users, products, loading } = useContext(MarketplaceContext);
  const [activeTab, setActiveTab] = useState('payouts');

  const [commissionSettings, setCommissionSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { globalRate: 10, categoryRates: {} };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(commissionSettings));
  }, [commissionSettings]);

  const payouts = useMemo(() => {
    const vendors = users.filter(u => u.role === 'vendor');
    return vendors.map(v => {
      const vendorOrders = orders.filter(o =>
        o.items?.some(item => item.vendorId === v.vendorId || item.vendor === v.name)
      );
      const grossSales = vendorOrders.reduce((s, o) => {
        const vendorItems = (o.items || []).filter(item => item.vendorId === v.vendorId || item.vendor === v.name);
        return s + vendorItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
      }, 0);
      const rate = commissionSettings.globalRate / 100;
      const fee = grossSales * rate;
      return {
        id: v.id, vendorName: v.name || v.email || 'Unknown', vendorId: v.vendorId || v.id,
        grossSales, fee, net: grossSales - fee, orderCount: vendorOrders.length,
        status: vendorOrders.length > 0 ? 'pending' : 'no_orders'
      };
    }).filter(p => p.orderCount > 0);
  }, [orders, users, commissionSettings]);

  const categoryStats = useMemo(() => {
    const catMap = {};
    products.forEach(p => {
      const cat = p.category || 'Uncategorized';
      if (!catMap[cat]) catMap[cat] = { name: cat, vendorCount: 0, productCount: 0, rate: commissionSettings.categoryRates[cat] || commissionSettings.globalRate };
      catMap[cat].productCount++;
    });
    const vendorCats = {};
    users.filter(u => u.role === 'vendor').forEach(v => {
      const seen = new Set();
      products.filter(p => p.vendorId === v.id || p.vendor === v.id).forEach(p => {
        const cat = p.category || 'Uncategorized';
        if (!seen.has(cat)) { seen.add(cat); vendorCats[cat] = (vendorCats[cat] || 0) + 1; }
      });
    });
    Object.keys(catMap).forEach(cat => { catMap[cat].vendorCount = vendorCats[cat] || 0; });
    return Object.values(catMap);
  }, [products, users, commissionSettings]);

  const totalDisbursed = payouts.filter(p => p.status === 'completed').reduce((s, p) => s + p.net, 0);
  const pendingPayouts = payouts.filter(p => p.status === 'pending');
  const pendingAmount = pendingPayouts.reduce((s, p) => s + p.net, 0);
  const totalCommissions = payouts.reduce((s, p) => s + p.fee, 0);

  const formatCurrency = (v) => '$' + v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const saveGlobalRate = (val) => {
    const n = parseFloat(val);
    if (!isNaN(n) && n >= 0 && n <= 100) setCommissionSettings(prev => ({ ...prev, globalRate: n }));
  };

  const updateCategoryRate = (cat, val) => {
    const n = parseFloat(val);
    if (!isNaN(n) && n >= 0 && n <= 100) {
      setCommissionSettings(prev => ({ ...prev, categoryRates: { ...prev.categoryRates, [cat]: n } }));
    }
  };

  if (loading) return <div className="pt-header"><LoadingSpinner text="Loading payouts..." /></div>;

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24 overflow-x-hidden w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Payouts & Commissions</h1>
          <p className="font-body-md text-sm sm:text-base text-secondary">
            Manage multi-vendor disbursements and commission structures.
          </p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" icon={<span className="material-symbols-outlined text-base">file_download</span>}>Export CSV</Button>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-gutter">
        <div className="bg-surface-container-lowest p-4 sm:p-md rounded-2xl shadow-subtle border border-outline-variant/30">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-secondary uppercase">Disbursed</span>
            <div className="h-7 w-7 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-base">verified</span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-on-surface mt-1 buyer-price">{formatCurrency(totalDisbursed)}</div>
          <div className="text-xs text-secondary mt-0.5">{payouts.length} vendors</div>
        </div>
        <div className="bg-surface-container-lowest p-4 sm:p-md rounded-2xl shadow-subtle border border-outline-variant/30">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-secondary uppercase">Pending Payouts</span>
            <div className="h-7 w-7 bg-warning/10 rounded-full flex items-center justify-center text-warning">
              <span className="material-symbols-outlined text-base">hourglass_empty</span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-on-surface mt-1 buyer-price">{formatCurrency(pendingAmount)}</div>
          <div className="text-xs text-secondary mt-0.5">{pendingPayouts.length} pending</div>
        </div>
        <div className="bg-surface-container-lowest p-4 sm:p-md rounded-2xl shadow-subtle border border-outline-variant/30">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-secondary uppercase">Total Commissions</span>
            <div className="h-7 w-7 bg-info/10 rounded-full flex items-center justify-center text-info">
              <span className="material-symbols-outlined text-base">account_balance_wallet</span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-primary mt-1 buyer-price">{formatCurrency(totalCommissions)}</div>
          <div className="text-xs text-secondary mt-0.5">Avg. rate {commissionSettings.globalRate}%</div>
        </div>
      </section>

      <div className="bg-surface-container-lowest rounded-2xl shadow-subtle border border-outline-variant/40 overflow-hidden">
        <div className="flex border-b border-outline-variant/40 p-2 gap-2">
          <button
            onClick={() => setActiveTab('payouts')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-colors',
              activeTab === 'payouts' ? 'bg-primary text-white' : 'text-secondary hover:bg-surface-container'
            )}
          >
            Payouts
          </button>
          <button
            onClick={() => setActiveTab('commissions')}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-colors',
              activeTab === 'commissions' ? 'bg-primary text-white' : 'text-secondary hover:bg-surface-container'
            )}
          >
            Commission Settings
          </button>
        </div>

        {activeTab === 'payouts' && (
          <>
            {/* Dedicated Mobile Settlement Cards (Mobile Only) */}
            <div className="md:hidden p-3 space-y-3">
              {payouts.map((p) => (
                <div
                  key={p.id}
                  className="bg-surface-container-low rounded-xl p-3.5 border border-outline-variant/30 flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                        {p.vendorName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <span className="font-semibold text-sm text-on-surface">{p.vendorName}</span>
                    </div>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
                        p.status === 'pending'
                          ? 'bg-warning-container text-warning'
                          : 'bg-success-container text-success'
                      )}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-outline-variant/20 pt-2 text-secondary">
                    <div>
                      <span>Orders: </span>
                      <span className="font-semibold text-on-surface">{p.orderCount}</span>
                    </div>
                    <div>
                      <span>Gross: </span>
                      <span className="font-semibold text-on-surface">${p.grossSales.toFixed(2)}</span>
                    </div>
                    <div>
                      <span>Fee ({commissionSettings.globalRate}%): </span>
                      <span className="font-semibold text-error">-${p.fee.toFixed(2)}</span>
                    </div>
                    <div>
                      <span>Net Payout: </span>
                      <span className="font-bold text-primary buyer-price text-sm">${p.net.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
              {payouts.length === 0 && (
                <div className="p-6 text-center text-secondary text-sm">No payout data available.</div>
              )}
            </div>

            {/* Desktop Table View (Desktop Only) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs uppercase font-semibold text-secondary bg-surface-container-low border-b border-outline-variant/30">
                    <th className="px-4 py-3">Vendor</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3 text-right">Gross Sales</th>
                    <th className="px-4 py-3 text-right">Fee ({commissionSettings.globalRate}%)</th>
                    <th className="px-4 py-3 text-right">Net Payout</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 text-sm">
                  {payouts.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                          {p.vendorName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <span className="font-semibold text-on-surface">{p.vendorName}</span>
                      </td>
                      <td className="px-4 py-3 text-secondary">{p.orderCount}</td>
                      <td className="px-4 py-3 text-right font-mono">${p.grossSales.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-mono text-error">-${p.fee.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-on-surface">${p.net.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-full text-xs font-bold uppercase',
                            p.status === 'pending'
                              ? 'bg-warning-container text-warning'
                              : 'bg-success-container text-success'
                          )}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {payouts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-secondary">
                        No payout data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

          {activeTab === 'commissions' && (
            <div className="p-sm">
              <div className="mb-sm flex items-center justify-between px-xs">
                <div className="flex items-center gap-sm">
                  <span className="text-body-sm text-on-surface-variant">Global Rate:</span>
                  <input className="w-16 bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-body-sm" type="number" value={commissionSettings.globalRate} onChange={e => saveGlobalRate(e.target.value)} />
                  <span className="text-secondary">%</span>
                </div>
                <Button variant="primary" size="sm">Save</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-label-sm font-label-sm text-secondary border-b border-outline-variant">
                      <th className="p-sm">CATEGORY</th>
                      <th className="p-sm">RATE</th>
                      <th className="p-sm">ACTIVE VENDORS</th>
                      <th className="p-sm">PRODUCTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {categoryStats.map(cat => (
                      <tr key={cat.name}>
                        <td className="p-sm font-label-md">{cat.name}</td>
                        <td className="p-sm">
                          <div className="flex items-center gap-xs">
                            <input className="w-16 bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-body-sm" type="number" value={cat.rate} onChange={e => updateCategoryRate(cat.name, e.target.value)} />
                            <span className="text-secondary">%</span>
                          </div>
                        </td>
                        <td className="p-sm text-on-surface-variant">{cat.vendorCount} Vendors</td>
                        <td className="p-sm text-on-surface-variant">{cat.productCount}</td>
                      </tr>
                    ))}
                    {categoryStats.length === 0 && (
                      <tr><td colSpan="4" className="p-lg text-center text-on-surface-variant">No category data available.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
