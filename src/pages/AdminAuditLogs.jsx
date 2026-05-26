import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

export default function AdminAuditLogs() {
  return (
    <>
      <AdminSidebar />

<main className="ml-64 min-h-screen">

<Header />

<section className="pt-24 pb-xl px-gutter max-w-container-max mx-auto">

<div className="mb-lg flex flex-col md:flex-row md:items-end justify-between gap-md">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Audit Logs</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Track all administrative actions across the Vendex ecosystem.</p>
</div>
<div className="flex flex-wrap items-center gap-sm">
<div className="flex flex-col gap-1">
<span className="font-label-sm text-label-sm text-secondary px-1">Date Range</span>
<div className="flex items-center gap-xs bg-white border border-outline-variant rounded-lg px-sm py-2">
<span className="material-symbols-outlined text-on-surface-variant" style={{fontSize: '18px'}}>calendar_today</span>
<span className="font-body-sm text-body-sm">Oct 24, 2023 - Oct 31, 2023</span>
</div>
</div>
<button className="flex items-center gap-xs border border-primary text-primary px-md py-2 rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors self-end h-[42px]">
<span className="material-symbols-outlined" style={{fontSize: '20px'}}>download</span>
                        Export CSV
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
<div className="bg-white p-md rounded-xl shadow-sm border border-surface-variant">
<div className="flex items-center justify-between mb-sm">
<span className="font-label-md text-label-md text-secondary">Total Actions</span>
<span className="material-symbols-outlined text-primary">history</span>
</div>
<div className="font-headline-md text-headline-md">12,482</div>
<div className="font-meta text-meta text-green-600 mt-xs">+12% from last week</div>
</div>
<div className="bg-white p-md rounded-xl shadow-sm border border-surface-variant">
<div className="flex items-center justify-between mb-sm">
<span className="font-label-md text-label-md text-secondary">Security Alerts</span>
<span className="material-symbols-outlined text-error">gpp_maybe</span>
</div>
<div className="font-headline-md text-headline-md">3</div>
<div className="font-meta text-meta text-secondary mt-xs">No active threats</div>
</div>
<div className="bg-white p-md rounded-xl shadow-sm border border-surface-variant">
<div className="flex items-center justify-between mb-sm">
<span className="font-label-md text-label-md text-secondary">Top Admin</span>
<span className="material-symbols-outlined text-secondary">person_check</span>
</div>
<div className="font-headline-md text-headline-md">Sarah Jenkins</div>
<div className="font-meta text-meta text-secondary mt-xs">428 actions this month</div>
</div>
<div className="bg-white p-md rounded-xl shadow-sm border border-surface-variant">
<div className="flex items-center justify-between mb-sm">
<span className="font-label-md text-label-md text-secondary">Avg Response</span>
<span className="material-symbols-outlined text-secondary">speed</span>
</div>
<div className="font-headline-md text-headline-md">1.2s</div>
<div className="font-meta text-meta text-green-600 mt-xs">Optimal performance</div>
</div>
</div>

<div className="bg-white rounded-xl shadow-sm border border-surface-variant overflow-hidden">
<div className="custom-scrollbar overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Timestamp</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Administrator</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Action Type</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Resource</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">Status</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider">IP Address</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface uppercase tracking-wider"></th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-4">
<div className="flex flex-col">
<span className="font-body-md text-body-md">Oct 31, 2023</span>
<span className="font-meta text-meta text-secondary">14:22:15</span>
</div>
</td>
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-label-md text-primary">AM</div>
<span className="font-body-md text-body-md">Alex Miller</span>
</div>
</td>
<td className="px-md py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-error/10 text-error">
                                        DELETE
                                    </span>
</td>
<td className="px-md py-4">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-on-surface-variant" style={{fontSize: '18px'}}>inventory_2</span>
<span className="font-body-sm text-body-sm">Product #99284 (Vintage Watch)</span>
</div>
</td>
<td className="px-md py-4">
<span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Success
                                    </span>
</td>
<td className="px-md py-4 font-meta text-meta text-secondary">192.168.1.45</td>
<td className="px-md py-4 text-right">
<button className="p-1 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-4">
<div className="flex flex-col">
<span className="font-body-md text-body-md">Oct 31, 2023</span>
<span className="font-meta text-meta text-secondary">12:10:42</span>
</div>
</td>
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-label-md text-primary">SJ</div>
<span className="font-body-md text-body-md">Sarah Jenkins</span>
</div>
</td>
<td className="px-md py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                        APPROVE
                                    </span>
</td>
<td className="px-md py-4">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-on-surface-variant" style={{fontSize: '18px'}}>account_balance_wallet</span>
<span className="font-body-sm text-body-sm">Payout #TX-882 (Vendor: Aura)</span>
</div>
</td>
<td className="px-md py-4">
<span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Success
                                    </span>
</td>
<td className="px-md py-4 font-meta text-meta text-secondary">104.22.84.19</td>
<td className="px-md py-4 text-right">
<button className="p-1 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-4">
<div className="flex flex-col">
<span className="font-body-md text-body-md">Oct 30, 2023</span>
<span className="font-meta text-meta text-secondary">09:45:00</span>
</div>
</td>
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-label-md text-primary">RB</div>
<span className="font-body-md text-body-md">Robert Black</span>
</div>
</td>
<td className="px-md py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                                        EDIT
                                    </span>
</td>
<td className="px-md py-4">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-on-surface-variant" style={{fontSize: '18px'}}>person</span>
<span className="font-body-sm text-body-sm">User Permissions: ID_501</span>
</div>
</td>
<td className="px-md py-4">
<span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Success
                                    </span>
</td>
<td className="px-md py-4 font-meta text-meta text-secondary">82.11.43.204</td>
<td className="px-md py-4 text-right">
<button className="p-1 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group bg-error/5">
<td className="px-md py-4">
<div className="flex flex-col">
<span className="font-body-md text-body-md">Oct 30, 2023</span>
<span className="font-meta text-meta text-secondary">08:12:33</span>
</div>
</td>
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-label-md text-on-surface-variant">
<span className="material-symbols-outlined" style={{fontSize: '16px'}}>robot_2</span>
</div>
<span className="font-body-md text-body-md">System Core</span>
</div>
</td>
<td className="px-md py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-error text-on-error">
                                        CRITICAL
                                    </span>
</td>
<td className="px-md py-4">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-error" style={{fontSize: '18px'}}>dns</span>
<span className="font-body-sm text-body-sm text-error font-bold">API Gateway Timeout</span>
</div>
</td>
<td className="px-md py-4">
<span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span> Failed
                                    </span>
</td>
<td className="px-md py-4 font-meta text-meta text-secondary">Intra-Network</td>
<td className="px-md py-4 text-right">
<button className="p-1 hover:bg-surface-container rounded transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="bg-surface-container-lowest px-md py-sm border-t border-outline-variant flex items-center justify-between">
<span className="font-label-sm text-label-sm text-secondary">Showing 1 to 25 of 12,482 entries</span>
<div className="flex items-center gap-xs">
<button className="p-2 rounded border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-50" disabled="">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label-md">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container font-label-md">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container font-label-md">3</button>
<span className="px-2 text-secondary">...</span>
<button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container font-label-md">499</button>
<button className="p-2 rounded border border-outline-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="mt-lg grid grid-cols-1 md:grid-cols-2 gap-md">
<div className="bg-white p-lg rounded-xl shadow-sm border border-surface-variant relative overflow-hidden group">
<div className="relative z-10">
<h3 className="font-headline-md text-headline-md mb-xs">Activity Hotspots</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-md">System heavy lifting occurs primarily between 09:00 and 11:00 UTC.</p>
<div className="flex items-end gap-1 h-32">
<div className="flex-1 bg-surface-variant rounded-t hover:bg-primary transition-colors" style={{height: '40%'}}></div>
<div className="flex-1 bg-surface-variant rounded-t hover:bg-primary transition-colors" style={{height: '60%'}}></div>
<div className="flex-1 bg-surface-variant rounded-t hover:bg-primary transition-colors" style={{height: '30%'}}></div>
<div className="flex-1 bg-surface-variant rounded-t hover:bg-primary transition-colors" style={{height: '90%'}}></div>
<div className="flex-1 bg-primary rounded-t" style={{height: '100%'}}></div>
<div className="flex-1 bg-surface-variant rounded-t hover:bg-primary transition-colors" style={{height: '70%'}}></div>
<div className="flex-1 bg-surface-variant rounded-t hover:bg-primary transition-colors" style={{height: '50%'}}></div>
<div className="flex-1 bg-surface-variant rounded-t hover:bg-primary transition-colors" style={{height: '20%'}}></div>
<div className="flex-1 bg-surface-variant rounded-t hover:bg-primary transition-colors" style={{height: '40%'}}></div>
</div>
<div className="flex justify-between mt-2 font-meta text-meta text-secondary">
<span>00:00</span>
<span>12:00</span>
<span>23:59</span>
</div>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[120px]" style={{fontVariationSettings: "'wght' 200"}}>show_chart</span>
</div>
</div>
<div className="bg-primary text-on-primary p-lg rounded-xl shadow-md border-none flex flex-col justify-between">
<div>
<div className="flex items-center gap-xs mb-sm">
<span className="material-symbols-outlined">verified_user</span>
<span className="font-label-md text-label-md">Audit Integrity</span>
</div>
<h3 className="font-headline-md text-headline-md mb-sm">Blockchain Ledger Active</h3>
<p className="font-body-md text-body-md opacity-80">All logs are hashed and stored on the immutable Vendex ledger. No entries can be modified or deleted without administrative consensus.</p>
</div>
<div className="mt-md">
<button className="bg-white text-primary px-md py-2 rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors">
                            Verify Ledger Hash
                        </button>
</div>
</div>
</div>
</section>
</main>
    </>
  );
}
