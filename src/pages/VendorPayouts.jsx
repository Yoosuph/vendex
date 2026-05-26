import React from 'react';
import { Link } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VendorPayouts() {
  return (
    <>
      <Header />
<main className="max-w-container-max mx-auto px-gutter py-xl">

<nav className="flex items-center gap-xs mb-md text-on-surface-variant font-label-sm">
<span>Finance</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary">Vendor Payouts</span>
</nav>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-xl">
<div className="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-surface-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
<div>
<h2 className="font-label-md text-label-md text-on-surface-variant mb-base">Available Balance</h2>
<div className="font-display-lg text-display-lg text-on-surface">$4,250.00</div>
<p className="text-body-sm text-secondary mt-base">Next scheduled payout: Oct 24, 2024</p>
</div>
<button className="bg-primary-container text-on-primary hover:bg-[#96101f] px-xl py-sm rounded-lg font-bold transition-all active:scale-95 flex items-center gap-xs" onclick="toggleModal(true)">
<span className="material-symbols-outlined">payments</span>
                    Withdraw Funds
                </button>
</div>
<div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-surface-variant flex flex-col justify-between">
<div>
<h2 className="font-label-md text-label-md text-on-surface-variant mb-base">Pending Clearance</h2>
<div className="font-headline-lg text-headline-lg text-on-surface">$1,120.45</div>
</div>
<div className="mt-md pt-md border-t border-outline-variant">
<div className="flex justify-between items-center text-body-sm">
<span className="text-on-surface-variant">Lifetime Earnings</span>
<span className="font-bold text-on-surface">$52,490.00</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-surface-variant overflow-hidden">
<div className="px-lg py-md border-b border-outline-variant flex items-center justify-between">
<h3 className="font-headline-md text-headline-md">Payout History</h3>
<div className="flex gap-sm">
<button className="flex items-center gap-xs border border-outline-variant px-sm py-xs rounded-lg text-label-md hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px]">filter_list</span>
                        Filter
                    </button>
<button className="flex items-center gap-xs border border-outline-variant px-sm py-xs rounded-lg text-label-md hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px]">download</span>
                        Export
                    </button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container text-on-surface-variant font-label-md text-label-md">
<tr>
<th className="px-lg py-sm">Reference ID</th>
<th className="px-lg py-sm">Date</th>
<th className="px-lg py-sm">Destination</th>
<th className="px-lg py-sm">Amount</th>
<th className="px-lg py-sm">Status</th>
<th className="px-lg py-sm text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-lg py-md font-medium text-on-surface">#PAY-99281-V</td>
<td className="px-lg py-md text-secondary">Oct 18, 2024</td>
<td className="px-lg py-md text-secondary">Chase Bank (****4210)</td>
<td className="px-lg py-md font-bold text-on-surface">$1,200.00</td>
<td className="px-lg py-md">
<span className="inline-flex items-center px-xs py-[2px] rounded-full bg-green-100 text-[#2D7A4F] text-xs font-bold uppercase tracking-wider">
<span className="w-1 h-1 rounded-full bg-[#2D7A4F] mr-xs"></span>
                                    Completed
                                </span>
</td>
<td className="px-lg py-md text-right">
<button className="text-primary hover:underline font-label-md">View Details</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-lg py-md font-medium text-on-surface">#PAY-99275-V</td>
<td className="px-lg py-md text-secondary">Oct 21, 2024</td>
<td className="px-lg py-md text-secondary">Chase Bank (****4210)</td>
<td className="px-lg py-md font-bold text-on-surface">$850.00</td>
<td className="px-lg py-md">
<span className="inline-flex items-center px-xs py-[2px] rounded-full bg-[#c0152a1a] text-[#C0152A] text-xs font-bold uppercase tracking-wider">
<span className="w-1 h-1 rounded-full bg-[#C0152A] mr-xs"></span>
                                    Pending
                                </span>
</td>
<td className="px-lg py-md text-right">
<button className="text-primary hover:underline font-label-md">View Details</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-lg py-md font-medium text-on-surface">#PAY-99264-V</td>
<td className="px-lg py-md text-secondary">Oct 14, 2024</td>
<td className="px-lg py-md text-secondary">Paypal (ven***@vendex.com)</td>
<td className="px-lg py-md font-bold text-on-surface">$2,200.00</td>
<td className="px-lg py-md">
<span className="inline-flex items-center px-xs py-[2px] rounded-full bg-green-100 text-[#2D7A4F] text-xs font-bold uppercase tracking-wider">
<span className="w-1 h-1 rounded-full bg-[#2D7A4F] mr-xs"></span>
                                    Completed
                                </span>
</td>
<td className="px-lg py-md text-right">
<button className="text-primary hover:underline font-label-md">View Details</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="px-lg py-md border-t border-outline-variant flex items-center justify-between">
<span className="text-body-sm text-on-surface-variant">Showing 1-10 of 42 payouts</span>
<div className="flex gap-xs">
<button className="p-xs border border-outline-variant rounded-lg hover:bg-surface-container transition-colors disabled:opacity-30" disabled="">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="p-xs border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
</main>

<div className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-gutter transition-opacity duration-300" id="withdrawalModal">
<div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-xl overflow-hidden scale-100 transition-transform duration-300">
<div className="px-lg py-md border-b border-outline-variant flex items-center justify-between">
<h3 className="font-headline-md text-headline-md">Withdraw Funds</h3>
<button className="p-xs hover:bg-surface-container rounded-full transition-colors" onclick="toggleModal(false)">
<span className="material-symbols-outlined text-on-surface-variant">close</span>
</button>
</div>
<div className="p-lg">
<div className="mb-md">
<label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Amount to Withdraw</label>
<div className="relative">
<span className="absolute left-md top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">$</span>
<input className="w-full pl-lg pr-md py-sm border border-outline-variant rounded-lg focus:ring-0 focus:border-on-surface font-headline-md transition-all" type="number" value="4250.00"/>
</div>
<p className="text-meta text-secondary mt-xs">Maximum available: $4,250.00</p>
</div>
<div className="mb-lg">
<label className="block font-label-md text-label-md text-on-surface-variant mb-xs">Payout Method</label>
<div className="flex items-center justify-between p-sm border border-on-surface rounded-lg bg-surface-container-low">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">account_balance</span>
<div>
<p className="font-label-md text-on-surface">Chase Bank</p>
<p className="text-meta text-secondary">Checking Account ••••4210</p>
</div>
</div>
<span className="material-symbols-outlined text-primary">check_circle</span>
</div>
</div>
<div className="bg-surface-container p-sm rounded-lg mb-lg">
<div className="flex justify-between items-center mb-xs">
<span className="text-body-sm text-secondary">Processing Fee (1.5%)</span>
<span className="text-body-sm font-medium text-on-surface">-$63.75</span>
</div>
<div className="flex justify-between items-center border-t border-outline-variant pt-xs mt-xs">
<span className="font-bold text-on-surface">Total Payout</span>
<span className="font-bold text-primary text-headline-md">$4,186.25</span>
</div>
</div>
<button className="w-full bg-primary-container text-on-primary py-sm rounded-lg font-bold hover:bg-[#96101f] transition-all active:scale-95 shadow-md">
                    Confirm Withdrawal
                </button>
<p className="text-center text-meta text-secondary mt-md">Funds will be available in your bank account in 1-3 business days.</p>
</div>
</div>
</div>

<Footer />
    </>
  );
}
