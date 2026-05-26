import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

export default function AdminReviewsDisputes() {
  return (
    <>
      <AdminSidebar />

<Header />

<main className="ml-64 mt-16 p-gutter min-h-[calc(100vh-4rem)]">
<div className="max-w-container-max mx-auto">

<div className="flex justify-between items-end mb-lg">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Feedback &amp; Resolution</h2>
<p className="text-on-surface-variant font-body-md">Monitor customer reviews and manage open dispute claims.</p>
</div>
<div className="flex bg-surface-container p-1 rounded-xl">
<button className="px-md py-2 rounded-lg font-label-md transition-all bg-surface-container-lowest shadow-sm text-primary" id="btn-reviews" onclick="switchTab('reviews')">Reviews</button>
<button className="px-md py-2 rounded-lg font-label-md transition-all text-on-surface-variant hover:text-on-surface" id="btn-disputes" onclick="switchTab('disputes')">Disputes</button>
</div>
</div>

<div className="space-y-md" id="tab-reviews">

<div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-lg">
<div className="col-span-1 p-md bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm">
<p className="text-label-sm text-secondary uppercase tracking-wider mb-xs">Average Rating</p>
<div className="flex items-end gap-2">
<h3 className="text-display-lg font-black text-primary">4.8</h3>
<span className="material-symbols-outlined text-primary pb-2" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
<p className="text-meta text-on-surface-variant mt-2">+0.2 from last month</p>
</div>
<div className="col-span-3 p-md bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col justify-center">
<div className="flex justify-between items-center mb-sm px-md">
<span className="text-label-md font-bold">Rating Distribution</span>
<span className="text-label-sm text-on-surface-variant">1,248 total reviews</span>
</div>
<div className="space-y-3 px-md">
<div className="flex items-center gap-md">
<span className="text-label-sm w-12 text-secondary">5 Star</span>
<div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-primary h-full w-[85%] rounded-full"></div>
</div>
<span className="text-label-sm w-8">85%</span>
</div>
<div className="flex items-center gap-md">
<span className="text-label-sm w-12 text-secondary">4 Star</span>
<div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-primary/60 h-full w-[10%] rounded-full"></div>
</div>
<span className="text-label-sm w-8">10%</span>
</div>
<div className="flex items-center gap-md">
<span className="text-label-sm w-12 text-secondary">3 Star</span>
<div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-primary/20 h-full w-[3%] rounded-full"></div>
</div>
<span className="text-label-sm w-8">3%</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-outline-variant">
<tr>
<th className="px-md py-sm font-label-md text-on-surface">Customer</th>
<th className="px-md py-sm font-label-md text-on-surface">Rating</th>
<th className="px-md py-sm font-label-md text-on-surface">Excerpt</th>
<th className="px-md py-sm font-label-md text-on-surface">Product</th>
<th className="px-md py-sm font-label-md text-on-surface">Date</th>
<th className="px-md py-sm"></th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-md py-md">
<div className="flex items-center gap-sm">
<img alt="User 1" className="h-8 w-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCivli-GwXTH76fCOxQPzcentl85Hx4XqPbKS1rH7lkZJ3Yiq453Zs5DZGfOdImDFSwl1M4ShIbFB_7nwFh2LttH4FJSXOTsT_40DGE_AIG8Qh8ILq1vcRnP57wf5_pAzgC4-aOrWj0QddERhY0Xju8RhOFVJdE5uygsMwiklTIYHVyDcqREDG4VEeYYsIgFUOlQMzvlPco_7LryYP5MXNFwjYChaodUOhqW3KPKoVzxCOu6xMuH3LAvu7_XHgkL1hGYRUXYFXUvDKP"/>
<span className="font-label-md">Alex Johnson</span>
</div>
</td>
<td className="px-md py-md">
<div className="flex text-primary">
<span className="material-symbols-outlined text-[18px]" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
</td>
<td className="px-md py-md text-on-surface-variant font-body-sm max-w-xs truncate">
                                    "Exceptional build quality. The shipping was surprisingly fast..."
                                </td>
<td className="px-md py-md font-label-md">TechNova Pro Laptop</td>
<td className="px-md py-md text-meta">Oct 24, 2023</td>
<td className="px-md py-md text-right">
<button className="text-primary hover:underline font-label-sm">View Details</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-md py-md">
<div className="flex items-center gap-sm">
<img alt="User 2" className="h-8 w-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXNpU-yQVaXA_HaUuCfOmcUj1fJNhUugV7eVMes0FTLvPx1q0zjt_MPegx_gKFxYaCQoqU9EApilKPhLxFakHD6KfXQ0PjDanniOQnN69BGIwtIdrt4RwoTTm5svKoZVECxFVFcXLWuLJZHVSHcxcWbjAdrR3sBam6GRpfjpjnCaLzT-Od_ZHccI5O3SqYMQzRCM1F7g9zEEI751Vl-nd1hlXeMRdeCD6qLuuStfBoH7XH19LKqtC9hDdyF0w4sWXvfEc7C0ZcvY61"/>
<span className="font-label-md">Sarah Miller</span>
</div>
</td>
<td className="px-md py-md">
<div className="flex text-primary">
<span className="material-symbols-outlined text-[18px]" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[18px]" data-icon="star">star</span>
</div>
</td>
<td className="px-md py-md text-on-surface-variant font-body-sm max-w-xs truncate">
                                    "Good value for money, but the packaging was slightly damaged."
                                </td>
<td className="px-md py-md font-label-md">Wireless Audio X1</td>
<td className="px-md py-md text-meta">Oct 22, 2023</td>
<td className="px-md py-md text-right">
<button className="text-primary hover:underline font-label-sm">View Details</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="hidden animate-in fade-in slide-in-from-bottom-2 duration-300" id="tab-disputes">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden mb-lg">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-outline-variant">
<tr>
<th className="px-md py-sm font-label-md text-on-surface">Case ID</th>
<th className="px-md py-sm font-label-md text-on-surface">Claimant</th>
<th className="px-md py-sm font-label-md text-on-surface">Vendor</th>
<th className="px-md py-sm font-label-md text-on-surface">Status</th>
<th className="px-md py-sm font-label-md text-on-surface">Amount</th>
<th className="px-md py-sm font-label-md text-on-surface">Initiated</th>
<th className="px-md py-sm"></th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors cursor-pointer" onclick="openResolutionPage()">
<td className="px-md py-md font-label-md text-primary">#DIS-9021</td>
<td className="px-md py-md">
<div className="flex items-center gap-sm">
<img alt="Buyer" className="h-6 w-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXXvbP3V9Iy--Al41tdCybAqWqjJ0db4au1ozXiyDH5O0-tAFbovxawRZLnHHyUiL-cottm4SP6znjI1qdn_5FNZWjoUtAl5hzkpmW9wZkNP2eU0NRf8nAvviSvI9bHo0mQRp3lLrhsbn5amE668rFjz0f19iULMICoBrl86ENdC2q91rev5vLlhD0DX1ZVnRdxxBY0X3ZZVAvYSsdsPlMejSwCJE-5kM1FvlPmI8F8dOjGHHGvALI_vlkzjAIpPPGJuD-_14k2F2-"/>
<span className="font-body-sm">David Chen</span>
</div>
</td>
<td className="px-md py-md text-body-sm">ElectroSwift Inc.</td>
<td className="px-md py-md">
<span className="px-2 py-1 rounded bg-error/10 text-error font-label-sm uppercase tracking-tight">Open</span>
</td>
<td className="px-md py-md font-label-md">$1,299.00</td>
<td className="px-md py-md text-meta">2h ago</td>
<td className="px-md py-md text-right">
<span className="material-symbols-outlined text-secondary" data-icon="chevron_right">chevron_right</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-md py-md font-label-md text-primary">#DIS-8945</td>
<td className="px-md py-md">
<div className="flex items-center gap-sm">
<img alt="Buyer" className="h-6 w-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1OMQeEuSoPvxPuhpk_fWdIFqFsKCI-M5iYGsevCEG588yzrXFg-LJuKlhvEPwmzHO491Oh1SdXgC4aTYFgVKPZ_Q9yvASeOKye-f-VyMelQOxWAqTaCIwuQJ7L3LYSYJO7XgQLL8Mxf6zaGOdmerKqM2_HLJAmnZyklTJEu8yZUPACkA0kmjoZwM-EQ5tq1AvVIJ87per1ZB-3o9kfMsLJ09hQ6Mlnj-lHaSFPd63BjTxL1yRPFmkT0WtgmYoW9UCXdQ9EG1_WOlN"/>
<span className="font-body-sm">Emily Rose</span>
</div>
</td>
<td className="px-md py-md text-body-sm">LuxeLiving Co.</td>
<td className="px-md py-md">
<span className="px-2 py-1 rounded bg-primary/10 text-primary font-label-sm uppercase tracking-tight">Under Review</span>
</td>
<td className="px-md py-md font-label-md">$450.00</td>
<td className="px-md py-md text-meta">1 day ago</td>
<td className="px-md py-md text-right">
<span className="material-symbols-outlined text-secondary" data-icon="chevron_right">chevron_right</span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-md py-md font-label-md text-primary">#DIS-8812</td>
<td className="px-md py-md">
<div className="flex items-center gap-sm">
<img alt="Buyer" className="h-6 w-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLelUVrdbxyTPVKZ7GqFJw_p5qY37iHYov99phTjwLwsJHxXKq9qNmdcOBadfqgxG2tVIQoUCNyPp-5Z-h0pz6MQunszhp-gQnCbzWe2cY6LOQmO_BiPBUQkyZdc9LhMLE3YC7TLVAY0CkYT7vsZ-E1TTILwy6UxtlPk4PKMb_e4Z8qfuJ38ip-Bm--ZeMvE55PqZtL7fLZUGiiTzTYEEwDddC8JoiNc0JfF8QCi81k3KJkPk7Pvx5mqx4ZjxpcpdBXMrSfhO8PTX-"/>
<span className="font-body-sm">Mark Thompson</span>
</div>
</td>
<td className="px-md py-md text-body-sm">GearHead Shop</td>
<td className="px-md py-md">
<span className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm uppercase tracking-tight">Resolved</span>
</td>
<td className="px-md py-md font-label-md">$89.99</td>
<td className="px-md py-md text-meta">3 days ago</td>
<td className="px-md py-md text-right">
<span className="material-symbols-outlined text-secondary" data-icon="chevron_right">chevron_right</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="hidden fixed inset-0 z-[60] flex items-center justify-center p-lg" id="resolution-view">
<div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" onclick="closeResolutionPage()"></div>
<div className="relative bg-surface-container-lowest w-full max-w-5xl h-[870px] rounded-2xl shadow-xl flex flex-col overflow-hidden">
<div className="px-md py-sm border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
<div className="flex items-center gap-sm">
<span className="px-2 py-1 rounded bg-error/10 text-error font-label-sm">#DIS-9021</span>
<h3 className="font-headline-md text-headline-md">Case Resolution: Item Damaged on Arrival</h3>
</div>
<button className="p-2 hover:bg-surface-container rounded-full" onclick="closeResolutionPage()">
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>
<div className="flex-1 flex overflow-hidden">

<div className="flex-1 flex flex-col p-md overflow-y-auto space-y-md bg-background">

<div className="flex gap-sm max-w-[80%]">
<img alt="David Chen" className="h-10 w-10 rounded-full flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvHDii74qchq-in4qBlE0cgv3PApoba33kg_3NSzMD1Mj0Yj9B5Ve0mhU0yQg7eQ-AptM0TX6Vzcj0DmW6cHjsKvPDcCBWAdiBFi51lLhmE8oo6Q99cUQUL1NewVkgWfZkcgCLnwUkym83PFSdVBNCCKhb2J6Z54VcznZNTmNYGVFg_jHX19MOOjbaLIBfPPurxFPPffTdGqaeh1HtZv5yRDqbwWVvxn02Ba6n3BuZLzUMCwoWOuC7TIvOhpUWXVwust8DrE3S8j2s"/>
<div className="space-y-1">
<div className="bg-white border border-outline-variant p-md rounded-2xl rounded-tl-none shadow-sm">
<p className="font-label-sm text-secondary mb-1">David Chen (Buyer)</p>
<p className="font-body-md text-on-surface">I received the laptop this morning, but the screen is cracked and there is visible dent on the chassis. I want a full refund immediately.</p>
<div className="mt-sm grid grid-cols-2 gap-2">
<div className="aspect-video bg-surface-container rounded-lg border border-outline-variant overflow-hidden relative group">
<img className="w-full h-full object-cover" data-alt="A high-resolution photograph of a modern laptop with a severely shattered glass screen sitting on a minimalist white desk. The lighting is cold and clinical, emphasizing the sharp cracks and the metallic texture of the chassis. The composition is close-up and dramatic, creating a sense of technical failure in a pristine light-mode environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUM57nig4K_wHFMJ6UJCgMvUD4ffE3lGRa4RrBgsfeyD3pCiBitic7dkt9H63eATsLRy5LAwWtobbCgvAwQQLrM4AjC1D4lfmDLfa0KPvTm5D8HlRtc2RZLbJaWssZyLFrYmeNGgR6Ry9inakn3AkiWc024NfEV7tihWvg0w7rE6KL4Z3wJTborq3sXr8It9WF1gf-VcFWIz4UNuBv-UVdsIOdE1wZLJYmkizykkaRZPOIcfrgaVploM9LFvnTDH6gxbjDyIzoNip9"/>
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
<span className="material-symbols-outlined text-white" data-icon="zoom_in">zoom_in</span>
</div>
</div>
</div>
</div>
<p className="text-meta text-on-surface-variant">Today, 10:15 AM</p>
</div>
</div>

<div className="flex gap-sm max-w-[80%] ml-auto flex-row-reverse">
<div className="bg-primary/5 p-2 rounded-full h-10 w-10 flex items-center justify-center border border-primary/20 flex-shrink-0">
<span className="material-symbols-outlined text-primary" data-icon="storefront">storefront</span>
</div>
<div className="space-y-1 text-right">
<div className="bg-white border border-primary/20 p-md rounded-2xl rounded-tr-none shadow-sm text-left">
<p className="font-label-sm text-primary mb-1">ElectroSwift Inc. (Vendor)</p>
<p className="font-body-md text-on-surface">We apologize for the inconvenience. The unit was inspected before shipping. This appears to be shipping damage. We can offer a replacement unit if you ship the broken one back.</p>
</div>
<p className="text-meta text-on-surface-variant">Today, 11:30 AM</p>
</div>
</div>

<div className="flex justify-center py-sm">
<div className="px-md py-1 bg-surface-container text-on-surface-variant font-label-sm rounded-full">
                                    Admin joined the conversation
                                </div>
</div>
</div>

<div className="w-80 border-l border-outline-variant p-md bg-surface-container-low space-y-lg">
<div>
<h4 className="font-label-md text-on-surface mb-sm">Evidence Summary</h4>
<ul className="space-y-2">
<li className="flex items-center gap-xs text-meta text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-primary" data-icon="check_circle">check_circle</span>
                                        Photographic evidence provided
                                    </li>
<li className="flex items-center gap-xs text-meta text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-primary" data-icon="check_circle">check_circle</span>
                                        Order tracking confirms delivery
                                    </li>
</ul>
</div>
<div className="space-y-sm">
<h4 className="font-label-md text-on-surface">Arbitration Decision</h4>
<button className="w-full py-sm border border-outline-variant hover:border-primary text-on-surface hover:text-primary rounded-lg font-label-md bg-white transition-all flex items-center justify-center gap-2 active:scale-95">
<span className="material-symbols-outlined text-[20px]" data-icon="person">person</span>
                                    Side with Buyer
                                </button>
<button className="w-full py-sm border border-outline-variant hover:border-primary text-on-surface hover:text-primary rounded-lg font-label-md bg-white transition-all flex items-center justify-center gap-2 active:scale-95">
<span className="material-symbols-outlined text-[20px]" data-icon="storefront">storefront</span>
                                    Side with Vendor
                                </button>
<button className="w-full py-sm bg-primary text-white rounded-lg font-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 active:scale-95">
<span className="material-symbols-outlined text-[20px]" data-icon="gavel">gavel</span>
                                    Execute Refund
                                </button>
</div>
<div className="pt-lg border-t border-outline-variant">
<p className="text-meta text-on-surface-variant italic leading-relaxed">
                                    Refunds will be processed to the original payment method. Decision is final and binding for both parties.
                                </p>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
