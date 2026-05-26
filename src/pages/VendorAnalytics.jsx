import React from 'react';
import { Link } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VendorAnalytics() {
  return (
    <>
      <div className="flex min-h-screen">

<VendorSidebar />

<main className="flex-1 overflow-y-auto">

<Header />

<div className="max-w-container-max mx-auto px-gutter py-lg">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-lg">
<div>
<h3 className="font-headline-lg text-headline-lg text-on-surface">Vendor Performance</h3>
<p className="font-body-md text-body-md text-secondary">Real-time insights across all retail channels.</p>
</div>

<div className="inline-flex bg-surface-container-lowest border border-outline-variant p-1 rounded-xl shadow-subtle">
<button className="px-md py-xs rounded-lg font-label-md text-label-md transition-all text-secondary hover:text-primary">Last 7d</button>
<button className="px-md py-xs rounded-lg font-label-md text-label-md transition-all bg-primary-container text-on-primary shadow-sm">Last 30d</button>
<button className="px-md py-xs rounded-lg font-label-md text-label-md transition-all text-secondary hover:text-primary">Yearly</button>
<button className="px-md py-xs rounded-lg font-label-md text-label-md transition-all text-secondary hover:text-primary flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Custom
            </button>
</div>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl shadow-subtle p-gutter mb-gutter overflow-hidden relative group">
<div className="flex items-center justify-between mb-lg">
<div>
<p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Gross Sales</p>
<h4 className="font-headline-lg text-headline-lg text-on-surface">$142,584.00</h4>
<span className="font-label-sm text-label-sm text-[#2D7A4F] bg-[#2D7A4F]/10 px-xs py-0.5 rounded-full inline-flex items-center gap-0.5 mt-xs">
<span className="material-symbols-outlined text-[14px]">trending_up</span> +12.5%
              </span>
</div>
<div className="flex items-center gap-sm">
<div className="flex items-center gap-xs">
<span className="w-3 h-3 rounded-full bg-primary"></span>
<span className="font-label-sm text-label-sm text-secondary">Sales</span>
</div>
<div className="flex items-center gap-xs">
<span className="w-3 h-3 rounded-full bg-outline-variant"></span>
<span className="font-label-sm text-label-sm text-secondary">Projected</span>
</div>
</div>
</div>

<div className="h-64 w-full relative">
<svg className="w-full h-full preserve-3d" viewBox="0 0 1000 200">

<line stroke="#DEDEDA" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50"></line>
<line stroke="#DEDEDA" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="100" y2="100"></line>
<line stroke="#DEDEDA" strokeDasharray="5,5" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150"></line>

<defs>
<lineargradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#C0152A" stopOpacity="0.2"></stop>
<stop offset="100%" stopColor="#C0152A" stopOpacity="0"></stop>
</lineargradient>
</defs>
<path d="M0,180 Q150,140 300,160 T600,80 T900,120 L1000,100 L1000,200 L0,200 Z" fill="url(#chartGradient)"></path>

<path className="chart-line" d="M0,180 Q150,140 300,160 T600,80 T900,120 L1000,100" fill="none" stroke="#C0152A" strokeLinecap="round" strokeWidth="3"></path>

<circle className="shadow-lg" cx="600" cy="80" fill="#C0152A" r="5"></circle>
<text className="font-label-sm text-label-sm fill-on-surface" textAnchor="middle" x="600" y="60">$12.4k</text>
</svg>
</div>
<div className="flex justify-between mt-sm">
<span className="font-label-sm text-label-sm text-secondary">01 Aug</span>
<span className="font-label-sm text-label-sm text-secondary">08 Aug</span>
<span className="font-label-sm text-label-sm text-secondary">15 Aug</span>
<span className="font-label-sm text-label-sm text-secondary">22 Aug</span>
<span className="font-label-sm text-label-sm text-secondary">29 Aug</span>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">

<div className="bg-surface-container-lowest rounded-xl shadow-subtle p-gutter">
<div className="flex items-center justify-between mb-lg">
<h5 className="font-headline-md text-headline-md text-on-surface">Top Categories</h5>
<button className="material-symbols-outlined text-secondary">more_vert</button>
</div>
<div className="space-y-md">
<div className="space-y-xs">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-on-surface">Lifestyle &amp; Apparel</span>
<span className="text-secondary">42%</span>
</div>
<div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
<div className="bar-grow h-full bg-primary-container" style={{width: '42%'}}></div>
</div>
</div>
<div className="space-y-xs">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-on-surface">Electronics</span>
<span className="text-secondary">28%</span>
</div>
<div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
<div className="bar-grow h-full bg-primary-container" style={{width: '28%', animationDelay: '0.1s'}}></div>
</div>
</div>
<div className="space-y-xs">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-on-surface">Home Decor</span>
<span className="text-secondary">18%</span>
</div>
<div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
<div className="bar-grow h-full bg-primary-container" style={{width: '18%', animationDelay: '0.2s'}}></div>
</div>
</div>
<div className="space-y-xs">
<div className="flex justify-between font-label-md text-label-md">
<span className="text-on-surface">Essentials</span>
<span className="text-secondary">12%</span>
</div>
<div className="h-4 w-full bg-surface-container rounded-full overflow-hidden">
<div className="bar-grow h-full bg-primary-container" style={{width: '12%', animationDelay: '0.3s'}}></div>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-subtle p-gutter">
<div className="flex items-center justify-between mb-lg">
<h5 className="font-headline-md text-headline-md text-on-surface">Customer Loyalty</h5>
<button className="material-symbols-outlined text-secondary">info</button>
</div>
<div className="flex flex-col md:flex-row items-center gap-lg">

<div className="relative w-48 h-48">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
<circle cx="50" cy="50" fill="none" r="40" stroke="#e3e3de" strokeWidth="12"></circle>
<circle cx="50" cy="50" fill="none" r="40" stroke="#C0152A" strokeDasharray="180 251" strokeWidth="12"></circle>
<circle cx="50" cy="50" fill="none" r="40" stroke="#5f5e5e" strokeDasharray="70 251" strokeDashoffset="-180" strokeWidth="12"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-headline-md text-headline-md text-on-surface">72%</span>
<span className="font-meta text-meta text-secondary">Retention</span>
</div>
</div>

<div className="flex-1 space-y-sm w-full">
<div className="flex items-center justify-between">
<div className="flex items-center gap-xs">
<span className="w-3 h-3 rounded-full bg-primary-container"></span>
<span className="font-label-md text-label-md text-on-surface">Returning</span>
</div>
<span className="font-label-md text-label-md text-secondary">1,240</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-xs">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span className="font-label-md text-label-md text-on-surface">New</span>
</div>
<span className="font-label-md text-label-md text-secondary">482</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-xs">
<span className="w-3 h-3 rounded-full bg-surface-variant"></span>
<span className="font-label-md text-label-md text-on-surface">Guest</span>
</div>
<span className="font-label-md text-label-md text-secondary">112</span>
</div>
<button className="w-full mt-sm py-xs border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container-high transition-colors">
                  View Segmentation
                </button>
</div>
</div>
</div>
</div>

<div className="mt-gutter">
<div className="bg-surface-container-lowest rounded-xl shadow-subtle overflow-hidden">
<div className="p-gutter border-b border-outline-variant flex items-center justify-between">
<h5 className="font-headline-md text-headline-md text-on-surface">Recent Reports</h5>
<Link className="font-label-md text-label-md text-primary hover:underline" to="#">Download All</Link>
</div>
<table className="w-full text-left">
<thead className="bg-surface-container-low font-label-sm text-label-sm text-secondary uppercase tracking-wider">
<tr>
<th className="px-gutter py-sm">Report Name</th>
<th className="px-gutter py-sm">Date Generated</th>
<th className="px-gutter py-sm">Status</th>
<th className="px-gutter py-sm text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface transition-colors cursor-pointer">
<td className="px-gutter py-md">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">description</span>
<span className="font-label-md text-label-md text-on-surface">Monthly Sales Recap - July 2024</span>
</div>
</td>
<td className="px-gutter py-md font-body-sm text-body-sm text-secondary">Aug 01, 2024</td>
<td className="px-gutter py-md">
<span className="px-xs py-0.5 rounded-full bg-[#2D7A4F]/10 text-[#2D7A4F] font-meta text-meta">Completed</span>
</td>
<td className="px-gutter py-md text-right">
<button className="material-symbols-outlined text-secondary hover:text-primary">download</button>
</td>
</tr>
<tr className="hover:bg-surface transition-colors cursor-pointer">
<td className="px-gutter py-md">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">pie_chart</span>
<span className="font-label-md text-label-md text-on-surface">Category Distribution Q2</span>
</div>
</td>
<td className="px-gutter py-md font-body-sm text-body-sm text-secondary">July 15, 2024</td>
<td className="px-gutter py-md">
<span className="px-xs py-0.5 rounded-full bg-[#2D7A4F]/10 text-[#2D7A4F] font-meta text-meta">Completed</span>
</td>
<td className="px-gutter py-md text-right">
<button className="material-symbols-outlined text-secondary hover:text-primary">download</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<Footer />
</main>
</div>
    </>
  );
}
