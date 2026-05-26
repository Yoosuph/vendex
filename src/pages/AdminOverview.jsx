import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminOverview() {
  return (
    <>
      <AdminSidebar />

<Header />

<main className="ml-64 pt-16 min-h-screen p-gutter max-w-container-max mx-auto">

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">

<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-transparent hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all">
<div className="flex justify-between items-start mb-xs">
<span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Total Revenue</span>
<span className="bg-primary/10 text-primary px-xs py-[2px] rounded text-meta font-bold">+12.5%</span>
</div>
<div className="flex items-end justify-between">
<h2 className="font-display-lg text-[28px] font-black text-primary">$4.2M</h2>
<svg className="w-20 h-10" viewBox="0 0 100 40">
<path className="sparkline" d="M0,35 Q10,30 20,38 T40,25 T60,30 T80,10 T100,5"></path>
</svg>
</div>
</div>

<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-transparent hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all">
<div className="flex justify-between items-start mb-xs">
<span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Total Orders</span>
<span className="material-symbols-outlined text-secondary" data-icon="shopping_cart">shopping_cart</span>
</div>
<h2 className="font-display-lg text-[28px] font-black text-on-surface">18,542</h2>
<p className="text-meta text-secondary mt-base font-medium">842 orders in last 24h</p>
</div>

<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-transparent hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all">
<div className="flex justify-between items-start mb-xs">
<span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Active Vendors</span>
<span className="material-symbols-outlined text-secondary" data-icon="storefront">storefront</span>
</div>
<h2 className="font-display-lg text-[28px] font-black text-on-surface">1,208</h2>
<div className="w-full bg-surface-container h-1 rounded-full mt-sm overflow-hidden">
<div className="bg-primary h-full w-[85%]"></div>
</div>
</div>

<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-transparent hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all">
<div className="flex justify-between items-start mb-xs">
<span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Registered Buyers</span>
<span className="material-symbols-outlined text-secondary" data-icon="group">group</span>
</div>
<h2 className="font-display-lg text-[28px] font-black text-on-surface">42.9k</h2>
<p className="text-meta text-[#2D7A4F] mt-base font-bold">↑ 4.2% from last month</p>
</div>
</section>

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

<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
<path d="M0,180 L100,160 L200,170 L300,120 L400,130 L500,80 L600,100 L700,40 L800,60 L900,20 L1000,30" fill="none" stroke="#c0152a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></path>
<path d="M0,180 L100,160 L200,170 L300,120 L400,130 L500,80 L600,100 L700,40 L800,60 L900,20 L1000,30 L1000,200 L0,200 Z" fill="url(#grad1)" opacity="0.1"></path>
<defs>
<lineargradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" style={{stopColor: '#c0152a', stopOpacity: 1}}></stop>
<stop offset="100%" style={{stopColor: '#c0152a', stopOpacity: 0}}></stop>
</lineargradient>
</defs>
</svg>
</div>
</div>

<div className="lg:col-span-4 bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
<h3 className="font-headline-md text-headline-md font-bold mb-md">Order Fulfillment</h3>
<div className="flex flex-col items-center">
<svg className="donut" height="160" viewBox="0 0 42 42" width="160">
<circle className="donut-hole" cx="21" cy="21" fill="transparent" r="15.915"></circle>
<circle className="donut-ring" cx="21" cy="21" fill="transparent" r="15.915" stroke="#e3e3de" strokeWidth="3"></circle>
<circle className="donut-segment" cx="21" cy="21" fill="transparent" r="15.915" stroke="#2D7A4F" strokeDasharray="65 35" strokeDashoffset="0" strokeWidth="4"></circle>
<circle className="donut-segment" cx="21" cy="21" fill="transparent" r="15.915" stroke="#c0152a" strokeDasharray="15 85" strokeDashoffset="-65" strokeWidth="4"></circle>
<circle className="donut-segment" cx="21" cy="21" fill="transparent" r="15.915" stroke="#F5A623" strokeDasharray="20 80" strokeDashoffset="-80" strokeWidth="4"></circle>
<g className="chart-text">
<text className="font-bold text-[6px]" dominantBaseline="middle" fill="#1a1c19" textAnchor="middle" x="50%" y="50%">82% Rate</text>
</g>
</svg>
<div className="grid grid-cols-2 gap-sm w-full mt-md">
<div className="flex items-center gap-xs">
<div className="w-3 h-3 rounded-full bg-[#2D7A4F]"></div>
<span className="text-meta font-label-md">Delivered</span>
</div>
<div className="flex items-center gap-xs">
<div className="w-3 h-3 rounded-full bg-[#c0152a]"></div>
<span className="text-meta font-label-md">Cancelled</span>
</div>
<div className="flex items-center gap-xs">
<div className="w-3 h-3 rounded-full bg-[#F5A623]"></div>
<span className="text-meta font-label-md">Processing</span>
</div>
<div className="flex items-center gap-xs">
<div className="w-3 h-3 rounded-full bg-[#e3e3de]"></div>
<span className="text-meta font-label-md">On Hold</span>
</div>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-1 lg:grid-cols-2 gap-md mb-lg">

<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
<div className="p-md border-b border-outline-variant flex justify-between items-center">
<h3 className="font-headline-md text-headline-md font-bold">New Vendors</h3>
<button className="text-primary font-label-md text-label-md hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low">
<th className="px-md py-sm font-label-md text-label-md text-secondary">Vendor</th>
<th className="px-md py-sm font-label-md text-label-md text-secondary">Category</th>
<th className="px-md py-sm font-label-md text-label-md text-secondary text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container transition-colors">
<td className="px-md py-sm flex items-center gap-sm">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-primary">LU</div>
<span className="font-body-md text-body-md">Luxe Interiors</span>
</td>
<td className="px-md py-sm font-body-sm text-body-sm text-on-surface-variant">Home Decor</td>
<td className="px-md py-sm text-right flex justify-end gap-sm">
<button className="px-sm py-1 bg-primary text-on-primary text-label-sm rounded-lg hover:bg-[#96101F]">Approve</button>
<button className="p-1 text-secondary hover:text-on-surface"><span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span></button>
</td>
</tr>
<tr className="hover:bg-surface-container transition-colors">
<td className="px-md py-sm flex items-center gap-sm">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-primary">BT</div>
<span className="font-body-md text-body-md">BioTech Gadgets</span>
</td>
<td className="px-md py-sm font-body-sm text-body-sm text-on-surface-variant">Electronics</td>
<td className="px-md py-sm text-right flex justify-end gap-sm">
<button className="px-sm py-1 bg-primary text-on-primary text-label-sm rounded-lg hover:bg-[#96101F]">Approve</button>
<button className="p-1 text-secondary hover:text-on-surface"><span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span></button>
</td>
</tr>
<tr className="hover:bg-surface-container transition-colors">
<td className="px-md py-sm flex items-center gap-sm">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-primary">SF</div>
<span className="font-body-md text-body-md">Silk &amp; Flora</span>
</td>
<td className="px-md py-sm font-body-sm text-body-sm text-on-surface-variant">Fashion</td>
<td className="px-md py-sm text-right flex justify-end gap-sm">
<button className="px-sm py-1 bg-primary text-on-primary text-label-sm rounded-lg hover:bg-[#96101F]">Approve</button>
<button className="p-1 text-secondary hover:text-on-surface"><span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span></button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
<div className="p-md border-b border-outline-variant flex justify-between items-center">
<h3 className="font-headline-md text-headline-md font-bold">Recent Orders</h3>
<button className="text-primary font-label-md text-label-md hover:underline">View All</button>
</div>
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
<tr className="hover:bg-surface-container transition-colors">
<td className="px-md py-sm font-body-sm text-body-sm font-bold">#VX-9901</td>
<td className="px-md py-sm font-body-sm text-body-sm">Alex Johnson</td>
<td className="px-md py-sm font-body-sm text-body-sm">$1,240.00</td>
<td className="px-md py-sm">
<span className="px-xs py-1 bg-[#2D7A4F]/10 text-[#2D7A4F] text-meta rounded font-bold">Shipped</span>
</td>
</tr>
<tr className="hover:bg-surface-container transition-colors">
<td className="px-md py-sm font-body-sm text-body-sm font-bold">#VX-9902</td>
<td className="px-md py-sm font-body-sm text-body-sm">Maria Chen</td>
<td className="px-md py-sm font-body-sm text-body-sm">$450.50</td>
<td className="px-md py-sm">
<span className="px-xs py-1 bg-primary/10 text-primary text-meta rounded font-bold">Pending</span>
</td>
</tr>
<tr className="hover:bg-surface-container transition-colors">
<td className="px-md py-sm font-body-sm text-body-sm font-bold">#VX-9903</td>
<td className="px-md py-sm font-body-sm text-body-sm">Sam Wilson</td>
<td className="px-md py-sm font-body-sm text-body-sm">$3,100.20</td>
<td className="px-md py-sm">
<span className="px-xs py-1 bg-surface-container-highest text-secondary text-meta rounded font-bold">Processing</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>

<Footer />
</main>
    </>
  );
}
