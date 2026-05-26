import React from 'react';
import { Link } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VendorOrders() {
  return (
    <>
      <Header />
<main className="max-w-container-max mx-auto px-gutter py-xl flex gap-gutter relative min-h-[calc(100vh-64px)]">

<div className="flex-1 transition-all duration-300 mr-[32%]">
<div className="flex justify-between items-end mb-lg">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface">Order Management</h1>
<p className="text-on-surface-variant font-body-md text-body-md mt-base">Manage vendor fulfillments and track shipping status.</p>
</div>
<div className="flex gap-sm">
<button className="flex items-center gap-xs px-4 py-2 border border-outline-variant rounded-lg text-body-sm font-medium hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[20px]">filter_list</span>
                        Filters
                    </button>
<button className="flex items-center gap-xs px-4 py-2 bg-primary-container text-on-primary rounded-lg text-body-sm font-medium hover:bg-[#96101F] transition-colors">
<span className="material-symbols-outlined text-[20px]">download</span>
                        Export CSV
                    </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant overflow-hidden">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-outline-variant">
<tr>
<th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Order ID</th>
<th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Customer</th>
<th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Date</th>
<th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Total</th>
<th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Status</th>
<th className="px-sm py-4 font-label-md text-label-md text-on-surface-variant">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low transition-colors cursor-pointer bg-primary/5">
<td className="px-sm py-4 font-body-md text-body-md font-bold text-primary">#VX-7721</td>
<td className="px-sm py-4">
<div className="flex items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-label-sm text-label-sm">JS</div>
<span className="font-body-md text-body-md text-on-surface">Julianne Smith</span>
</div>
</td>
<td className="px-sm py-4 font-body-md text-body-md text-on-surface-variant">Oct 24, 2024</td>
<td className="px-sm py-4 font-body-md text-body-md font-medium text-on-surface">$1,240.00</td>
<td className="px-sm py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-error-container text-on-error-container">
<span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                                    Urgent
                                </span>
</td>
<td className="px-sm py-4">
<button className="text-primary hover:underline font-label-md text-label-md">View Details</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors cursor-pointer">
<td className="px-sm py-4 font-body-md text-body-md font-medium text-on-surface">#VX-7720</td>
<td className="px-sm py-4">
<div className="flex items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container font-label-sm text-label-sm">MK</div>
<span className="font-body-md text-body-md text-on-surface">Marcus Knight</span>
</div>
</td>
<td className="px-sm py-4 font-body-md text-body-md text-on-surface-variant">Oct 23, 2024</td>
<td className="px-sm py-4 font-body-md text-body-md font-medium text-on-surface">$450.50</td>
<td className="px-sm py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container">
<span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5"></span>
                                    Processing
                                </span>
</td>
<td className="px-sm py-4">
<button className="text-secondary hover:text-primary transition-colors font-label-md text-label-md">View Details</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors cursor-pointer">
<td className="px-sm py-4 font-body-md text-body-md font-medium text-on-surface">#VX-7719</td>
<td className="px-sm py-4">
<div className="flex items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-outline-variant flex items-center justify-center text-on-surface font-label-sm text-label-sm">EL</div>
<span className="font-body-md text-body-md text-on-surface">Elena Lopez</span>
</div>
</td>
<td className="px-sm py-4 font-body-md text-body-md text-on-surface-variant">Oct 23, 2024</td>
<td className="px-sm py-4 font-body-md text-body-md font-medium text-on-surface">$2,100.00</td>
<td className="px-sm py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-error-container text-on-error-container">
<span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                                    Delayed
                                </span>
</td>
<td className="px-sm py-4">
<button className="text-secondary hover:text-primary transition-colors font-label-md text-label-md">View Details</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors cursor-pointer">
<td className="px-sm py-4 font-body-md text-body-md font-medium text-on-surface">#VX-7718</td>
<td className="px-sm py-4">
<div className="flex items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-label-sm text-label-sm">AB</div>
<span className="font-body-md text-body-md text-on-surface">Aaron Burr</span>
</div>
</td>
<td className="px-sm py-4 font-body-md text-body-md text-on-surface-variant">Oct 22, 2024</td>
<td className="px-sm py-4 font-body-md text-body-md font-medium text-on-surface">$89.99</td>
<td className="px-sm py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-outline-variant/30 text-on-surface-variant">
<span className="w-1.5 h-1.5 rounded-full bg-outline mr-1.5"></span>
                                    Shipped
                                </span>
</td>
<td className="px-sm py-4">
<button className="text-secondary hover:text-primary transition-colors font-label-md text-label-md">View Details</button>
</td>
</tr>
</tbody>
</table>
<div className="px-sm py-4 flex items-center justify-between bg-surface-container-low border-t border-outline-variant">
<span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1-10 of 124 orders</span>
<div className="flex gap-xs">
<button className="p-1 rounded hover:bg-surface-variant transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
<button className="p-1 rounded hover:bg-surface-variant transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
</div>
</div>

<VendorSidebar />
</main>

<Footer />
    </>
  );
}
