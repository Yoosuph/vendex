import React from 'react';
import { Link } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VendorOverview() {
  return (
    <>
      <div className="flex min-h-screen">

<VendorSidebar />

<main className="flex-1 p-gutter md:p-lg bg-surface min-w-0">

<Header />

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">

<div className="bg-surface-container-lowest p-sm rounded-xl card-shadow border border-outline-variant/30">
<div className="flex justify-between items-start mb-xs">
<span className="text-secondary font-label-md text-label-md">Total Revenue</span>
<span className="material-symbols-outlined text-secondary">payments</span>
</div>
<div className="mb-sm">
<h3 className="font-headline-md text-headline-md text-on-surface">$12,840.50</h3>
<p className="text-primary font-label-sm text-label-sm">+14.2% from last month</p>
</div>
<div className="h-12 w-full flex items-end gap-[2px]">

<div className="flex-1 bg-primary-container/20 h-[30%] rounded-t-sm"></div>
<div className="flex-1 bg-primary-container/20 h-[50%] rounded-t-sm"></div>
<div className="flex-1 bg-primary-container/20 h-[40%] rounded-t-sm"></div>
<div className="flex-1 bg-primary-container/20 h-[70%] rounded-t-sm"></div>
<div className="flex-1 bg-primary-container/20 h-[60%] rounded-t-sm"></div>
<div className="flex-1 bg-primary-container/20 h-[90%] rounded-t-sm"></div>
<div className="flex-1 bg-primary-container h-full rounded-t-sm"></div>
</div>
</div>

<div className="bg-surface-container-lowest p-sm rounded-xl card-shadow border border-outline-variant/30">
<div className="flex justify-between items-start mb-xs">
<span className="text-secondary font-label-md text-label-md">Orders Today</span>
<span className="material-symbols-outlined text-secondary">shopping_cart</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">42</h3>
<p className="text-secondary font-label-sm text-label-sm">8 orders pending processing</p>
<div className="mt-sm w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
<div className="bg-primary-container w-[65%] h-full"></div>
</div>
</div>

<div className="bg-surface-container-lowest p-sm rounded-xl card-shadow border border-outline-variant/30">
<div className="flex justify-between items-start mb-xs">
<span className="text-secondary font-label-md text-label-md">Pending Shipments</span>
<span className="material-symbols-outlined text-secondary">package_2</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">12</h3>
<p className="text-error font-label-sm text-label-sm">3 urgent departures</p>
<div className="mt-sm flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-400"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold">+9</div>
</div>
</div>

<div className="bg-surface-container-lowest p-sm rounded-xl card-shadow border border-outline-variant/30">
<div className="flex justify-between items-start mb-xs">
<span className="text-secondary font-label-md text-label-md">Store Rating</span>
<span className="material-symbols-outlined text-secondary">grade</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">4.9</h3>
<div className="flex items-center gap-[2px] mt-xs">
<span className="material-symbols-outlined text-primary text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-primary text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-primary text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-primary text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-primary text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star_half</span>
</div>
<p className="text-secondary font-meta text-meta mt-xs">Based on 1,240 reviews</p>
</div>
</div>

<section className="bg-surface-container-lowest rounded-xl card-shadow border border-outline-variant/30 overflow-hidden">
<div className="p-gutter border-b border-outline-variant flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface">Recent Orders</h2>
<button className="text-primary font-label-md text-label-md hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low">
<th className="px-gutter py-sm font-label-md text-label-md text-secondary">Order ID</th>
<th className="px-gutter py-sm font-label-md text-label-md text-secondary">Customer</th>
<th className="px-gutter py-sm font-label-md text-label-md text-secondary">Status</th>
<th className="px-gutter py-sm font-label-md text-label-md text-secondary">Amount</th>
<th className="px-gutter py-sm font-label-md text-label-md text-secondary">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-gutter py-sm font-label-sm text-label-sm text-on-surface">#VDX-8921</td>
<td className="px-gutter py-sm">
<div className="flex items-center gap-xs">
<div className="w-6 h-6 rounded-full bg-tertiary-container/10 flex items-center justify-center font-bold text-[10px] text-primary">JD</div>
<span className="font-body-sm text-body-sm">Jane Doe</span>
</div>
</td>
<td className="px-gutter py-sm">
<span className="px-xs py-[2px] rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">Processing</span>
</td>
<td className="px-gutter py-sm font-body-sm text-body-sm font-bold">$124.00</td>
<td className="px-gutter py-sm">
<span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary">more_vert</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-gutter py-sm font-label-sm text-label-sm text-on-surface">#VDX-8920</td>
<td className="px-gutter py-sm">
<div className="flex items-center gap-xs">
<div className="w-6 h-6 rounded-full bg-tertiary-container/10 flex items-center justify-center font-bold text-[10px] text-primary">MS</div>
<span className="font-body-sm text-body-sm">Mark Smith</span>
</div>
</td>
<td className="px-gutter py-sm">
<span className="px-xs py-[2px] rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">Pending</span>
</td>
<td className="px-gutter py-sm font-body-sm text-body-sm font-bold">$45.99</td>
<td className="px-gutter py-sm">
<span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary">more_vert</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-gutter py-sm font-label-sm text-label-sm text-on-surface">#VDX-8919</td>
<td className="px-gutter py-sm">
<div className="flex items-center gap-xs">
<div className="w-6 h-6 rounded-full bg-tertiary-container/10 flex items-center justify-center font-bold text-[10px] text-primary">RW</div>
<span className="font-body-sm text-body-sm">Riley West</span>
</div>
</td>
<td className="px-gutter py-sm">
<span className="px-xs py-[2px] rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider">Shipped</span>
</td>
<td className="px-gutter py-sm font-body-sm text-body-sm font-bold">$312.50</td>
<td className="px-gutter py-sm">
<span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary">more_vert</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-gutter py-sm font-label-sm text-label-sm text-on-surface">#VDX-8918</td>
<td className="px-gutter py-sm">
<div className="flex items-center gap-xs">
<div className="w-6 h-6 rounded-full bg-tertiary-container/10 flex items-center justify-center font-bold text-[10px] text-primary">KL</div>
<span className="font-body-sm text-body-sm">Kevin Lee</span>
</div>
</td>
<td className="px-gutter py-sm">
<span className="px-xs py-[2px] rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">Processing</span>
</td>
<td className="px-gutter py-sm font-body-sm text-body-sm font-bold">$89.00</td>
<td className="px-gutter py-sm">
<span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary">more_vert</span>
</td>
</tr>
</tbody>
</table>
</div>
</section>
</main>
</div>
<Footer />
    </>
  );
}
