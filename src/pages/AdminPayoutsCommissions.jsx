import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

export default function AdminPayoutsCommissions() {
  return (
    <>
      <AdminSidebar />

<Header />

<main className="ml-64 pt-16 min-h-screen">
<div className="p-gutter max-w-container-max mx-auto space-y-md">

<div className="flex justify-between items-end">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface">Payouts &amp; Commissions</h2>
<p className="text-on-surface-variant text-body-lg">Manage multi-vendor disbursements and commission structures.</p>
</div>
<div className="flex gap-sm">
<button className="px-sm py-xs border border-primary text-primary rounded-lg font-label-md hover:bg-surface-container-low transition-all">
                        Export CSV
                    </button>
<button className="px-sm py-xs bg-primary text-on-primary rounded-lg font-label-md hover:bg-[#96101F] transition-all shadow-sm">
                        Process Batch
                    </button>
</div>
</div>

<section className="grid grid-cols-1 md:grid-cols-3 gap-md">
<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30 flex flex-col gap-xs group transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
<div className="flex justify-between items-start">
<span className="text-label-md font-label-md text-secondary uppercase">Disbursed</span>
<div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
</div>
<div className="text-headline-lg font-headline-lg text-on-surface">$1,420,500.00</div>
<div className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-base">
<span className="text-emerald-600 font-bold">↑ 12%</span> vs last month
                    </div>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30 flex flex-col gap-xs group transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
<div className="flex justify-between items-start">
<span className="text-label-md font-label-md text-secondary uppercase">Pending Approval</span>
<div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[18px]">hourglass_empty</span>
</div>
</div>
<div className="text-headline-lg font-headline-lg text-on-surface">$84,200.50</div>
<div className="text-label-sm font-label-sm text-on-surface-variant">14 batches awaiting review</div>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30 flex flex-col gap-xs group transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
<div className="flex justify-between items-start">
<span className="text-label-md font-label-md text-secondary uppercase">Total Commissions</span>
<div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
</div>
</div>
<div className="text-headline-lg font-headline-lg text-on-surface text-primary">$312,940.00</div>
<div className="text-label-sm font-label-sm text-on-surface-variant">Avg. rate 12.4%</div>
</div>
</section>

<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30 overflow-hidden">
<div className="flex border-b border-outline-variant">
<button className="px-md py-sm font-label-md text-primary border-b-2 border-primary bg-surface-container-low/30" id="tab-payouts-btn" onclick="toggleTab('payouts')">
                        Payouts Queue
                    </button>
<button className="px-md py-sm font-label-md text-on-surface-variant hover:text-primary transition-all" id="tab-commissions-btn" onclick="toggleTab('commissions')">
                        Commission Rates
                    </button>
</div>

<div className="p-sm" id="payouts-view">
<div className="flex items-center justify-between mb-sm px-xs">
<div className="flex gap-xs">
<button className="px-sm py-base bg-primary text-on-primary rounded font-label-sm flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px]">check_circle</span> Bulk Approve
                            </button>
<button className="px-sm py-base border border-outline text-on-surface-variant rounded font-label-sm">
                                Hold Selected
                            </button>
</div>
<div className="flex items-center gap-xs">
<span className="text-label-sm text-on-surface-variant">Filter by status:</span>
<select className="bg-surface-container-low border-none rounded text-label-sm focus:ring-1 focus:ring-primary py-1 px-3">
<option>All</option>
<option>Pending</option>
<option>Processing</option>
</select>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="text-label-sm font-label-sm text-secondary border-b border-outline-variant">
<th className="p-sm"><input className="rounded text-primary focus:ring-primary" type="checkbox"/></th>
<th className="p-sm">VENDOR</th>
<th className="p-sm">REQUESTED DATE</th>
<th className="p-sm">GROSS SALES</th>
<th className="p-sm">VENDEX FEE</th>
<th className="p-sm">NET PAYOUT</th>
<th className="p-sm">STATUS</th>
<th className="p-sm text-right">ACTION</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="p-sm"><input className="rounded text-primary focus:ring-primary" type="checkbox"/></td>
<td className="p-sm flex items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-xs">NL</div>
<span className="font-label-md">Nordic Loft Furniture</span>
</td>
<td className="p-sm text-on-surface-variant text-body-sm">Oct 24, 2023</td>
<td className="p-sm text-body-sm">$12,450.00</td>
<td className="p-sm text-error text-body-sm">-$1,494.00</td>
<td className="p-sm font-bold text-body-sm">$10,956.00</td>
<td className="p-sm">
<span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-tighter">Pending</span>
</td>
<td className="p-sm text-right">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary">more_vert</button>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="p-sm"><input className="rounded text-primary focus:ring-primary" type="checkbox"/></td>
<td className="p-sm flex items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary text-xs">AS</div>
<span className="font-label-md">Aura Skincare</span>
</td>
<td className="p-sm text-on-surface-variant text-body-sm">Oct 23, 2023</td>
<td className="p-sm text-body-sm">$4,200.00</td>
<td className="p-sm text-error text-body-sm">-$630.00</td>
<td className="p-sm font-bold text-body-sm">$3,570.00</td>
<td className="p-sm">
<span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-tighter">Approved</span>
</td>
<td className="p-sm text-right">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary">more_vert</button>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="p-sm"><input className="rounded text-primary focus:ring-primary" type="checkbox"/></td>
<td className="p-sm flex items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-xs">TC</div>
<span className="font-label-md">Tech Core Gadgets</span>
</td>
<td className="p-sm text-on-surface-variant text-body-sm">Oct 22, 2023</td>
<td className="p-sm text-body-sm">$28,900.00</td>
<td className="p-sm text-error text-body-sm">-$2,312.00</td>
<td className="p-sm font-bold text-body-sm">$26,588.00</td>
<td className="p-sm">
<span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-tighter">Pending</span>
</td>
<td className="p-sm text-right">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary">more_vert</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="p-sm hidden" id="commissions-view">
<div className="mb-sm flex items-center justify-between px-xs">
<p className="text-body-sm text-on-surface-variant">Update commission percentages by category or vendor. Changes apply immediately.</p>
<button className="px-sm py-base bg-secondary text-on-secondary rounded font-label-sm">Save Global Rules</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="text-label-sm font-label-sm text-secondary border-b border-outline-variant">
<th className="p-sm">CATEGORY</th>
<th className="p-sm">BASE RATE</th>
<th className="p-sm">PROMO RATE</th>
<th className="p-sm">ACTIVE VENDORS</th>
<th className="p-sm">MONTHLY REVENUE</th>
<th className="p-sm text-right">ADJUST</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr>
<td className="p-sm font-label-md">Furniture &amp; Decor</td>
<td className="p-sm">
<div className="flex items-center gap-xs">
<input className="w-16 bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-body-sm focus:border-primary focus:ring-0" type="number" value="12"/>
<span className="text-secondary">%</span>
</div>
</td>
<td className="p-sm">8%</td>
<td className="p-sm text-on-surface-variant">42 Vendors</td>
<td className="p-sm">$420k</td>
<td className="p-sm text-right">
<button className="text-primary hover:underline text-label-sm font-bold">Update</button>
</td>
</tr>
<tr>
<td className="p-sm font-label-md">Electronics</td>
<td className="p-sm">
<div className="flex items-center gap-xs">
<input className="w-16 bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-body-sm focus:border-primary focus:ring-0" type="number" value="8"/>
<span className="text-secondary">%</span>
</div>
</td>
<td className="p-sm">5%</td>
<td className="p-sm text-on-surface-variant">18 Vendors</td>
<td className="p-sm">$1.2M</td>
<td className="p-sm text-right">
<button className="text-primary hover:underline text-label-sm font-bold">Update</button>
</td>
</tr>
<tr>
<td className="p-sm font-label-md">Beauty &amp; Health</td>
<td className="p-sm">
<div className="flex items-center gap-xs">
<input className="w-16 bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-body-sm focus:border-primary focus:ring-0" type="number" value="15"/>
<span className="text-secondary">%</span>
</div>
</td>
<td className="p-sm">12%</td>
<td className="p-sm text-on-surface-variant">94 Vendors</td>
<td className="p-sm">$850k</td>
<td className="p-sm text-right">
<button className="text-primary hover:underline text-label-sm font-bold">Update</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
<div className="bg-primary/5 border border-primary/20 p-md rounded-xl flex gap-md items-center">
<div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-on-primary shrink-0">
<span className="material-symbols-outlined text-[28px]">trending_up</span>
</div>
<div>
<h4 className="font-label-md text-primary font-bold">Optimization Suggestion</h4>
<p className="text-body-sm text-on-surface">Lowering commissions for 'Home &amp; Garden' to 10% could increase vendor retention by estimated 15% based on seasonal trends.</p>
</div>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl flex gap-md items-center">
<div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[28px]">shield</span>
</div>
<div>
<h4 className="font-label-md text-on-surface font-bold">Security Status</h4>
<p className="text-body-sm text-on-surface-variant">All payouts over $5,000 require multi-admin approval. Current verification level: High.</p>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
