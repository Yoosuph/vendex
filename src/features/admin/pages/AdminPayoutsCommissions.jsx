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
      const vendorOrders = orders.filter(o => o.vendorId === v.id || o.vendor === v.id || o.sellerId === v.id);
      const grossSales = vendorOrders.reduce((s, o) => s + (Number(o.total) || 0), 0);
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

  if (loading) return <div className="pt-16"><LoadingSpinner text="Loading payouts..." /></div>;

  return (
    <main className="pt-16 min-h-screen">
      <div className="p-gutter max-w-container-max mx-auto space-y-md">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-surface">Payouts & Commissions</h2>
            <p className="text-on-surface-variant text-body-lg">Manage multi-vendor disbursements and commission structures.</p>
          </div>
          <div className="flex gap-sm">
            <Button variant="outline" icon={<span className="material-symbols-outlined text-body-lg">file_download</span>}>Export CSV</Button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/30">
            <div className="flex justify-between items-start">
              <span className="text-label-md font-label-md text-secondary uppercase">Disbursed</span>
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-body-lg">verified</span>
              </div>
            </div>
            <div className="text-headline-lg font-headline-lg text-on-surface">{formatCurrency(totalDisbursed)}</div>
            <div className="text-label-sm font-label-sm text-on-surface-variant">{payouts.length} vendors</div>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/30">
            <div className="flex justify-between items-start">
              <span className="text-label-md font-label-md text-secondary uppercase">Pending Payouts</span>
              <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700">
                <span className="material-symbols-outlined text-body-lg">hourglass_empty</span>
              </div>
            </div>
            <div className="text-headline-lg font-headline-lg text-on-surface">{formatCurrency(pendingAmount)}</div>
            <div className="text-label-sm font-label-sm text-on-surface-variant">{pendingPayouts.length} pending</div>
          </div>
          <div className="bg-surface-container-lowest p-md rounded-xl shadow-card border border-outline-variant/30">
            <div className="flex justify-between items-start">
              <span className="text-label-md font-label-md text-secondary uppercase">Total Commissions</span>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                <span className="material-symbols-outlined text-body-lg">account_balance_wallet</span>
              </div>
            </div>
            <div className="text-headline-lg font-headline-lg text-on-surface text-primary">{formatCurrency(totalCommissions)}</div>
            <div className="text-label-sm font-label-sm text-on-surface-variant">Avg. rate {commissionSettings.globalRate}%</div>
          </div>
        </section>

        <div className="bg-surface-container-lowest rounded-xl shadow-card border border-outline-variant/30 overflow-hidden">
          <div className="flex border-b border-outline-variant">
            <Button variant={activeTab === 'payouts' ? 'primary' : 'ghost'} onClick={() => setActiveTab('payouts')}>Payouts</Button>
            <Button variant={activeTab === 'commissions' ? 'primary' : 'ghost'} onClick={() => setActiveTab('commissions')}>Commissions</Button>
          </div>

          {activeTab === 'payouts' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-label-sm font-label-sm text-secondary border-b border-outline-variant">
                    <th className="p-sm">VENDOR</th>
                    <th className="p-sm">ORDERS</th>
                    <th className="p-sm">GROSS SALES</th>
                    <th className="p-sm">FEE ({commissionSettings.globalRate}%)</th>
                    <th className="p-sm">NET PAYOUT</th>
                    <th className="p-sm">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {payouts.map(p => (
                    <tr key={p.id} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="p-sm flex items-center gap-xs">
                        <div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-xs">
                          {p.vendorName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <span className="font-label-md">{p.vendorName}</span>
                      </td>
                      <td className="p-sm text-body-sm">{p.orderCount}</td>
                      <td className="p-sm text-body-sm">${p.grossSales.toFixed(2)}</td>
                      <td className="p-sm text-error text-body-sm">-${p.fee.toFixed(2)}</td>
                      <td className="p-sm font-bold text-body-sm">${p.net.toFixed(2)}</td>
                      <td className="p-sm">
                        <span className={cn('px-2 py-0.5 rounded-full text-meta font-bold uppercase', p.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700')}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                  {payouts.length === 0 && (
                    <tr><td colSpan="6" className="p-lg text-center text-on-surface-variant">No payout data available.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
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
    </main>
  );
}
