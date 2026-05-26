import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

export default function AdminBuyers() {
  return (
    <>
      <AdminSidebar />

<Header />

<main className="ml-64 pt-16 min-h-screen">
<div className="p-gutter max-w-container-max mx-auto">

<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-lg gap-md">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Buyer Management</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Review and manage your marketplace ecosystem buyers.</p>
</div>
<div className="flex gap-sm">
<button className="px-sm py-2 bg-surface-container-highest border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container transition-all flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filter
                    </button>
<button className="px-sm py-2 bg-surface-container-highest border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container transition-all flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">file_download</span>
                        Export
                    </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-lg">
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Buyers</p>
<div className="flex items-end justify-between mt-xs">
<span className="font-headline-md text-headline-md text-on-surface">12,842</span>
<span className="text-success text-sm flex items-center font-medium" style={{color: '#2d7a4f'}}>
<span className="material-symbols-outlined text-sm mr-1">trending_up</span>+12%
                        </span>
</div>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active Today</p>
<div className="flex items-end justify-between mt-xs">
<span className="font-headline-md text-headline-md text-on-surface">3,201</span>
<span className="text-on-surface-variant text-sm flex items-center font-medium">
<span className="material-symbols-outlined text-sm mr-1">person</span>Live
                        </span>
</div>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Avg. Spend</p>
<div className="flex items-end justify-between mt-xs">
<span className="font-headline-md text-headline-md text-on-surface">$428.50</span>
<span className="text-success text-sm flex items-center font-medium" style={{color: '#2d7a4f'}}>
<span className="material-symbols-outlined text-sm mr-1">trending_up</span>+5.2%
                        </span>
</div>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Risk Flagged</p>
<div className="flex items-end justify-between mt-xs">
<span className="font-headline-md text-headline-md text-on-surface">18</span>
<span className="text-error text-sm flex items-center font-medium">
<span className="material-symbols-outlined text-sm mr-1">warning</span>Critical
                        </span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Buyer Details</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Email</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Phone</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Orders</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Spent</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Status</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface-variant">Joined</th>
<th className="px-md py-4 font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="table-row-hover cursor-pointer" onclick="toggleDrawer(true)">
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<img alt="Buyer Avatar" className="w-10 h-10 rounded-full border border-outline-variant" data-alt="A detailed digital portrait of a professional woman with a friendly expression. She is wearing a modern minimalist white blouse. The background is a soft, solid pastel grey that highlights her features. The lighting is clean and professional, using high-key studio techniques to evoke trust and high-end marketplace quality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSAs0BNgJl_oe0WH80LfLd3mmRXNKYDUqkGI7Isqkxr6oNLEkhnXyWOXtZtvrLFwUnqxxFwQfmzK-OUTGGMf_mUunZEMfUFPhseTN4BCKmo-31SAMtlKtvhrJZrbzWne-4UtmpmI-7X8yzviLll38mCPQ2xVDZ78u3zM6LPsJNUNSFUGv6oEQo8veu6bhd3ipA3oi_e0OjF_BOtLB-IreIcOUIKa3WwTLt9ItlSUmTLWpazTnV5K9HvDcj93V9QyfkJNc_nJ5zYMU6"/>
<div>
<p className="font-body-md text-body-md font-bold text-on-surface">Helena Hills</p>
<p className="font-meta text-meta text-on-surface-variant">ID: #B-8271</p>
</div>
</div>
</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">helena.h@corporate.com</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">+1 202-555-0143</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface">42</td>
<td className="px-md py-4 font-body-sm text-body-sm font-bold text-on-surface">$1,240.00</td>
<td className="px-md py-4">
<span className="px-2 py-1 rounded-full text-[12px] font-bold bg-[#2d7a4f1a] text-[#2d7a4f]">Active</span>
</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">Jan 12, 2023</td>
<td className="px-md py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="table-row-hover cursor-pointer" onclick="toggleDrawer(true)">
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<img alt="Buyer Avatar" className="w-10 h-10 rounded-full border border-outline-variant" data-alt="A portrait of a young man with a creative, modern look, wearing a black turtleneck. The aesthetic is clean and professional with a neutral studio background. The lighting is sophisticated, emphasizing textures and providing a sense of high-trust transactional security common in elite digital marketplaces." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4V9TSzc4etFE-V0UXrJ4PkXwP4TOWA0PnAYuEAPgV0tAozDociGwkOUt37HJoyTIhLybJWGzHjWyNEi0o9Y_LpWHBzPPujIdO6BmjwNFxOO0aEWXpRQRwCESGhG4Nae63WSjms6083UbjGjk6Ol3rRdqm7_uvd4M6Fj8GlzY2S-1LVucwuY8PznwkJOte_DmzTQRX_mzabspCj6hQdph2SUow9kUK7c8tGcNJ2ob52MczeERwewIAdDNDT1I8TmRutVOXtg-eCjlc"/>
<div>
<p className="font-body-md text-body-md font-bold text-on-surface">Julian Wan</p>
<p className="font-meta text-meta text-on-surface-variant">ID: #B-8272</p>
</div>
</div>
</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">j.wan@design.studio</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">+1 202-555-0198</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface">18</td>
<td className="px-md py-4 font-body-sm text-body-sm font-bold text-on-surface">$890.50</td>
<td className="px-md py-4">
<span className="px-2 py-1 rounded-full text-[12px] font-bold bg-error-container text-error">Flagged</span>
</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">Mar 05, 2023</td>
<td className="px-md py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="table-row-hover cursor-pointer" onclick="toggleDrawer(true)">
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<img alt="Buyer Avatar" className="w-10 h-10 rounded-full border border-outline-variant" data-alt="A detailed professional portrait of a senior executive woman with grey-toned hair, wearing a structured navy blazer. The lighting is soft and flattering, set against a blurred high-end office interior. The visual style is premium and corporate, radiating competence and reliability suitable for a multi-vendor platform dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAK4oHW_E42k5wnOPuVCLOZ_SAeNttpTlV-JWcgotl7o0BsIq_BbXPJ6D7CE6EEiR6GOSSSFVAlcyNSnviWjXgC8AwiTqEYrmy0ZQccHD9l4MCog6TXVJkya15UWNhLODS8tfGmuLUfu_sVbD4hz_b5uFVP0IWWHpv_jHjnadf5yLATcLlOO76D6RxXeKR2Jzq_OT2EZAepD4Xt5z9NpyOaNHdC7mA8QDpvJW7UVOtb9E6546qeEQflhnlbC28aN8zrp9ViI8I4yUT"/>
<div>
<p className="font-body-md text-body-md font-bold text-on-surface">Eleanor Pera</p>
<p className="font-meta text-meta text-on-surface-variant">ID: #B-8273</p>
</div>
</div>
</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">epera@global.net</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">+44 20 7946 0128</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface">156</td>
<td className="px-md py-4 font-body-sm text-body-sm font-bold text-on-surface">$12,450.00</td>
<td className="px-md py-4">
<span className="px-2 py-1 rounded-full text-[12px] font-bold bg-[#2d7a4f1a] text-[#2d7a4f]">Active</span>
</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">Nov 18, 2022</td>
<td className="px-md py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="table-row-hover cursor-pointer" onclick="toggleDrawer(true)">
<td className="px-md py-4">
<div className="flex items-center gap-sm">
<img alt="Buyer Avatar" className="w-10 h-10 rounded-full border border-outline-variant" data-alt="A portrait of a male buyer in his 30s with a sharp haircut and a casual grey sweater. The background is a minimalist studio setting with soft side lighting that defines his features. The aesthetic is clean, modern, and aligned with the corporate minimalist design system of the Vendex platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgybVKjkHNaQZOe13Bo_hTTtQU50ktQ__U6BE-DeT26ujeSF2v4aS1o3OHKwytZCkGoXD45JXFvb5tYZZ9PdQNOI1dWmuewz9BGwyDHEH1Sa_xtmtaOXvFtvttIWsNjYEdmW4_RU4b13uc6L39DFRe4-kX7YtVaUxpJ7QHuffapRSHzZKccOaAE6vayeUH4zKc7OW9gEm7wffOCdxQy-V17qdSW2P5tA0-8Ua0HEC8spOkwLzrst07KR7g7I7hK5uC-upAimVY0bTP"/>
<div>
<p className="font-body-md text-body-md font-bold text-on-surface">Marcus Thorne</p>
<p className="font-meta text-meta text-on-surface-variant">ID: #B-8274</p>
</div>
</div>
</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">m.thorne@techflow.io</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">+1 415-555-0821</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface">5</td>
<td className="px-md py-4 font-body-sm text-body-sm font-bold text-on-surface">$210.00</td>
<td className="px-md py-4">
<span className="px-2 py-1 rounded-full text-[12px] font-bold bg-surface-variant text-on-surface-variant">Dormant</span>
</td>
<td className="px-md py-4 font-body-sm text-body-sm text-on-surface-variant">Jun 30, 2023</td>
<td className="px-md py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-md py-4 bg-surface-container-low flex items-center justify-between border-t border-outline-variant">
<p className="font-meta text-meta text-on-surface-variant">Showing 1 to 10 of 12,842 results</p>
<div className="flex items-center gap-xs">
<button className="p-1 rounded hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
<span className="px-2 py-1 bg-primary text-on-primary rounded text-xs font-bold">1</span>
<button className="px-2 py-1 hover:bg-surface-container-high rounded text-xs text-on-surface-variant">2</button>
<button className="px-2 py-1 hover:bg-surface-container-high rounded text-xs text-on-surface-variant">3</button>
<span className="text-on-surface-variant">...</span>
<button className="p-1 rounded hover:bg-surface-container-high transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
</div>
</div>
</main>

<div className="fixed inset-0 bg-black/20 z-[60] backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300" id="buyerDrawerOverlay" onclick="toggleDrawer(false)"></div>
<div className="fixed top-0 right-0 h-full w-[450px] bg-surface-container-lowest z-[70] translate-x-full transition-transform duration-300 ease-in-out drawer-shadow flex flex-col" id="buyerDrawer">

<div className="p-md border-b border-outline-variant flex items-center justify-between">
<h3 className="font-headline-md text-headline-md text-on-surface">Buyer Profile</h3>
<button className="p-2 hover:bg-surface-container rounded-full transition-colors" onclick="toggleDrawer(false)">
<span className="material-symbols-outlined">close</span>
</button>
</div>
<div className="flex-1 overflow-y-auto">

<div className="p-md text-center border-b border-outline-variant bg-surface-container-low/30">
<div className="relative inline-block">
<img alt="Julian Wan" className="w-24 h-24 rounded-full border-4 border-surface shadow-md mx-auto mb-sm" data-alt="Close-up of a stylish male avatar in a modern tech-corporate setting. The subject has dark hair and is wearing a sleek black designer turtleneck. The background is a soft, blurred off-white studio wall with subtle shadow depth. The image is clean, crisp, and high-resolution, conveying a premium and secure digital identity for a marketplace user profile." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPeAAaEovO8sIlFS2p4-wZpdLTVVdzG4RdQ05c0UC92t67AhOfqo24nLk2t5s7EFT6RL6BpUW8ixK-UQ9FSRkX_C1YxICxUVvPi6YwABqpWO-m9rZeNQDiC1n67T9FU2dBcdAZj8GI10f4YHIINEsEKS958KSGYpZDLnzse-UxWBdEhbv22m9BZFATLu5SweoUeU3-b7bic12sOO-rfT2RlMrf8-TSpNCIp4cVscGPlAXaJorBrZQRpBMsOk0oGC4tLGhAjz43ir9L"/>
<span className="absolute bottom-2 right-0 w-6 h-6 bg-error border-4 border-surface rounded-full"></span>
</div>
<h4 className="font-headline-md text-headline-md text-on-surface mt-xs">Julian Wan</h4>
<p className="font-body-md text-body-md text-on-surface-variant">ID: #B-8272 • Member since 2023</p>
<div className="flex justify-center gap-sm mt-md">
<button className="px-md py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-[#96101F] transition-all">Message</button>
<button className="px-md py-2 border border-outline text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container transition-all">Edit Details</button>
</div>
</div>

<div className="p-md space-y-sm">
<h5 className="font-label-md text-label-md text-error flex items-center gap-xs uppercase tracking-wider">
<span className="material-symbols-outlined text-[18px]">warning</span>
                    Activity Warnings
                </h5>
<div className="p-sm bg-error-container/30 border border-error-container rounded-lg">
<div className="flex gap-sm">
<span className="material-symbols-outlined text-error mt-0.5">error_outline</span>
<div>
<p className="font-body-sm text-body-sm font-bold text-on-error-container">Multiple Chargebacks</p>
<p className="font-meta text-meta text-on-surface-variant">3 failed payment disputes in the last 30 days. Action required.</p>
</div>
</div>
</div>
<div className="p-sm bg-error-container/30 border border-error-container rounded-lg">
<div className="flex gap-sm">
<span className="material-symbols-outlined text-error mt-0.5">location_on</span>
<div>
<p className="font-body-sm text-body-sm font-bold text-on-error-container">Unusual Login Location</p>
<p className="font-meta text-meta text-on-surface-variant">Recent login detected from Vladivostok, RU. Verification pending.</p>
</div>
</div>
</div>
</div>

<div className="px-md py-sm">
<div className="grid grid-cols-2 gap-sm">
<div className="p-sm bg-surface-container-low rounded-lg border border-outline-variant">
<p className="font-meta text-meta text-on-surface-variant uppercase">Lifetime Spent</p>
<p className="font-headline-md text-headline-md text-on-surface">$4,890.50</p>
</div>
<div className="p-sm bg-surface-container-low rounded-lg border border-outline-variant">
<p className="font-meta text-meta text-on-surface-variant uppercase">Total Orders</p>
<p className="font-headline-md text-headline-md text-on-surface">18</p>
</div>
</div>
</div>

<div className="p-md border-t border-outline-variant mt-sm">
<h5 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-md">Recent Order History</h5>
<div className="space-y-md">
<div className="flex justify-between items-center group">
<div className="flex gap-sm">
<div className="w-10 h-10 bg-surface-container rounded flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant">shopping_bag</span>
</div>
<div>
<p className="font-body-sm text-body-sm font-bold text-on-surface">Order #ORD-92811</p>
<p className="font-meta text-meta text-on-surface-variant">Premium Wireless Earbuds • Mar 04, 2023</p>
</div>
</div>
<p className="font-body-sm text-body-sm font-bold text-on-surface">$129.00</p>
</div>
<div className="flex justify-between items-center group">
<div className="flex gap-sm">
<div className="w-10 h-10 bg-surface-container rounded flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant">shopping_bag</span>
</div>
<div>
<p className="font-body-sm text-body-sm font-bold text-on-surface">Order #ORD-88120</p>
<p className="font-meta text-meta text-on-surface-variant">Smart Watch Series 7 • Feb 12, 2023</p>
</div>
</div>
<p className="font-body-sm text-body-sm font-bold text-on-surface">$399.00</p>
</div>
<div className="flex justify-between items-center group">
<div className="flex gap-sm">
<div className="w-10 h-10 bg-surface-container rounded flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant">shopping_bag</span>
</div>
<div>
<p className="font-body-sm text-body-sm font-bold text-on-surface">Order #ORD-77421</p>
<p className="font-meta text-meta text-on-surface-variant">USB-C Hub Multiport • Jan 28, 2023</p>
</div>
</div>
<p className="font-body-sm text-body-sm font-bold text-on-surface">$65.00</p>
</div>
</div>
<button className="w-full mt-lg py-2 text-primary font-label-md text-label-md hover:underline">View All Transactions</button>
</div>
</div>

<div className="p-md border-t border-outline-variant bg-surface-container-lowest">
<button className="w-full py-3 bg-error text-on-error rounded-lg font-label-md text-label-md hover:bg-[#93000a] transition-all flex items-center justify-center gap-xs">
<span className="material-symbols-outlined text-[20px]">block</span>
                Suspend Account
            </button>
</div>
</div>
    </>
  );
}
