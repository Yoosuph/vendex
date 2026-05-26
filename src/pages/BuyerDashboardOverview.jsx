import React from 'react';
import { Link } from 'react-router-dom';
import BuyerSidebar from '../components/BuyerSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function BuyerDashboardOverview() {
  return (
    <>
      <div className="flex min-h-screen">

<BuyerSidebar />

<main className="flex-1 p-gutter md:p-xl max-w-container-max mx-auto w-full">

<Header />

<section className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">

<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant flex items-center gap-md">
<div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Total Orders</p>
<h3 className="font-headline-md text-headline-md text-on-surface">124</h3>
</div>
</div>

<div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant flex items-center gap-md">
<div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Pending Deliveries</p>
<h3 className="font-headline-md text-headline-md text-on-surface">03</h3>
</div>
</div>

<div className="bg-primary-container p-md rounded-xl shadow-[0_4px_12px_rgba(192,21,42,0.2)] flex items-center gap-md text-white">
<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-white/80 uppercase tracking-wider">Wallet Balance</p>
<h3 className="font-headline-md text-headline-md">$2,450.50</h3>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">

<section className="lg:col-span-2">
<div className="flex items-center justify-between mb-md">
<h2 className="font-headline-md text-headline-md text-on-surface">Recent Orders</h2>
<Link className="font-label-md text-label-md text-primary-container hover:underline" to="#">View All</Link>
</div>
<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant overflow-hidden">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-md py-3 font-label-md text-label-md text-secondary">Order ID</th>
<th className="px-md py-3 font-label-md text-label-md text-secondary">Product</th>
<th className="px-md py-3 font-label-md text-label-md text-secondary">Status</th>
<th className="px-md py-3 font-label-md text-label-md text-secondary">Amount</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-md py-4 font-body-sm text-body-sm">#VX-9921</td>
<td className="px-md py-4 font-body-sm text-body-sm font-medium">Leather Weekend Bag</td>
<td className="px-md py-4">
<span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Shipped</span>
</td>
<td className="px-md py-4 font-body-sm text-body-sm font-semibold">$340.00</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-md py-4 font-body-sm text-body-sm">#VX-8742</td>
<td className="px-md py-4 font-body-sm text-body-sm font-medium">Mechanical Keycap Set</td>
<td className="px-md py-4">
<span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold uppercase">Processing</span>
</td>
<td className="px-md py-4 font-body-sm text-body-sm font-semibold">$89.00</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-md py-4 font-body-sm text-body-sm">#VX-7104</td>
<td className="px-md py-4 font-body-sm text-body-sm font-medium">Minimalist Desk Lamp</td>
<td className="px-md py-4">
<span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase">Delivered</span>
</td>
<td className="px-md py-4 font-body-sm text-body-sm font-semibold">$120.00</td>
</tr>
</tbody>
</table>
</div>
</section>

<section className="lg:col-span-1">
<div className="bg-surface-container-high/40 p-md rounded-xl border border-outline-variant h-full">
<h3 className="font-headline-md text-headline-md mb-sm text-on-surface-variant">Recommended Actions</h3>
<div className="space-y-md">
<div className="flex gap-sm items-start">
<span className="material-symbols-outlined text-primary-container" data-icon="verified_user">verified_user</span>
<div>
<p className="font-label-md text-label-md font-semibold">Verify Identity</p>
<p className="font-body-sm text-body-sm text-secondary">Complete verification to increase your withdrawal limits.</p>
</div>
</div>
<div className="flex gap-sm items-start">
<span className="material-symbols-outlined text-primary-container" data-icon="add_card">add_card</span>
<div>
<p className="font-label-md text-label-md font-semibold">Update Payment</p>
<p className="font-body-sm text-body-sm text-secondary">Your default card is expiring soon.</p>
</div>
</div>
</div>
</div>
</section>
</div>

<section className="mt-xl">
<div className="flex items-center justify-between mb-md">
<h2 className="font-headline-md text-headline-md text-on-surface">Recently Viewed</h2>
<div className="flex gap-xs">
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-md">

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant group cursor-pointer">
<div className="relative aspect-square overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A professional product photograph of a sleek red athletic sneaker against a clean white backdrop. The lighting is crisp and modern, highlighting the high-quality synthetic texture and aerodynamic design. The image follows a high-end commercial marketplace aesthetic with minimal shadows and deep red brand accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlTWw0foljmbzH1TeoTQ42UGAsg4lutO9lqx-zXG9-O8dOagm24LrpX8eBJLHwU04-iuWVGM0vpVN7EA-hfZXGMDvdjt19HSDSCBtnppPPB07cZx-NJJ6OdmG5tws51KL6kWUx2hhIe-WXmr1oXcObsKUaHClEU0jgwrNQK16-3BCUxIqIVuMY9LB9m2487Hf9i-VhCZKAVuuNhxRB3OXi2D38Drsd1M7DeOU8xawkAyJXS9MmXFW8XxPMy8yp_VpdJnr_f6GLQe3G"/>
</div>
<div className="p-sm">
<p className="font-label-sm text-label-sm text-secondary">Footwear</p>
<h4 className="font-label-md text-label-md font-bold truncate">Velocity Pro Red</h4>
<p className="font-label-md text-label-md text-primary-container mt-1">$145.00</p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant group cursor-pointer">
<div className="relative aspect-square overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A luxury minimalist wristwatch with a silver band and a clean white face, displayed in a bright and airy environment. The scene is illuminated with soft, natural morning light, creating a calm and premium commercial vibe. Subtle reflections on the glass surface indicate high craftsmanship and quality materials." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzXwaRbmTZv3qqXTEHIRxvK8EgS3Lyg1inBl8lO3rPvDRt48czOemTUP_e1h5ocjQJ2HnyvAUDlGFmqZMA2zK_Ho3wZzsteoCZ4PKxXWzCcjL1d3BoGtE5-u_wyNc3b0Amfj5Qgh-g39Yhn3C9vWjIX27hLv5K08QPaTK5SE87NaaZDhERTXWlWC7PjhT1yQ6IxWfvsGVYeTjPltggtMSCQh9j8bj_GtVsRtOLvrjB4fVqhLkAfBu5lhKHROFwg_6V1tvxfUVoCNxm"/>
</div>
<div className="p-sm">
<p className="font-label-sm text-label-sm text-secondary">Accessories</p>
<h4 className="font-label-md text-label-md font-bold truncate">Classic Silver Dial</h4>
<p className="font-label-md text-label-md text-primary-container mt-1">$220.00</p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant group cursor-pointer">
<div className="relative aspect-square overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="High-fidelity black studio headphones resting on a minimalist grey surface. The lighting is sophisticated and directional, casting soft shadows that emphasize the sleek industrial design. The overall mood is professional, high-tech, and premium, aligned with a modern electronics marketplace palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0jXcsjYR2xdmgIzj3kyxpxS7V9an-epxsqqRg4_e8tlTaOH55yqVtqo8NNP4DPeOtELtQriS5AALxOW6tk0nudcVwii7UTCcgTJVBXZD0sOr9CrDvzuQ4GlTxDp0ti7n3zuMUYFkgX5ht0aVbJVNO7WieVgbfkEPYcLA-eWnEavVkgAA7J66ddEB8x59bSQCOowrx1za7asTcsn8MisnOCq27w77AK28AFHnhpnJSNrGTwmrRHUqIdaOB_4KRX8WgVhAO4ZDKU4dJ"/>
</div>
<div className="p-sm">
<p className="font-label-sm text-label-sm text-secondary">Electronics</p>
<h4 className="font-label-md text-label-md font-bold truncate">Studio Bass Pro</h4>
<p className="font-label-md text-label-md text-primary-container mt-1">$299.00</p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant group cursor-pointer hidden md:block">
<div className="relative aspect-square overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A professional microphone for content creators, featuring an all-black metal finish with elegant design lines. The background is a clean, out-of-focus studio setting with cool ambient lighting and warm red accents. The image captures a sense of professional audio engineering and high-end creative productivity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQP0DBaL3f6-9YeYcfuGHbLq_IVSf9Rv1i7F6WZ2lXpwcpmKLw8jDQtpO-WDM65Bqw3DHaTjzlpF6Z9nOzDiDuCx6UzjxF7Pf1NHRVHOEMtXnz8IcLlWLfR-igrSvIkdzyXJlPnsoZFPwlU66555Tcz_NcyX1KL__NxnctMOT6B-ARDSOfS_yAvT2OXLlNodWRQZSVUlH4OOP7qdHfmByJeE08gsCeNRl7nJomNi09pMuw2AeRDo2BYhm_sEXjCpwemov9XyirLBsm"/>
</div>
<div className="p-sm">
<p className="font-label-sm text-label-sm text-secondary">Audio</p>
<h4 className="font-label-md text-label-md font-bold truncate">Creator Mic V2</h4>
<p className="font-label-md text-label-md text-primary-container mt-1">$175.00</p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant group cursor-pointer hidden lg:block">
<div className="relative aspect-square overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Elegant leather shoes in a rich mahogany brown, presented in a minimalist high-fashion context. The lighting is soft and architectural, showcasing the fine grain of the leather and the precision stitching. The aesthetic is sophisticated, timeless, and corporate-modern, fitting for a premium lifestyle brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsV7GcKYPg0f2DQAH9LvM2qVXkFwIDAWDdn5t_CGpkthaqs5mB5STpGSmhnAfSH5UBgAkjL7O6h8Uj9wuFo3RnDSg2iV9fZTtm4YiXXFU59daiPVoYK2XzYYuFA5IdSqmsrFnH9L_cP_krTTb4y24XCxnb8Q5X4xXrkz5OLY7GuIH2R3GoJvnbKkFdHk3iz6DBZkPd-T5M2SquSbalaa0YzNCFzLxGb_K2Xf3OHsBg37B5nw62jAxDNb4uoq0doNBM75k27-gQLjWP"/>
</div>
<div className="p-sm">
<p className="font-label-sm text-label-sm text-secondary">Lifestyle</p>
<h4 className="font-label-md text-label-md font-bold truncate">Derby Leather Brogues</h4>
<p className="font-label-md text-label-md text-primary-container mt-1">$180.00</p>
</div>
</div>
</div>
</section>
</main>
</div>

<Footer />
    </>
  );
}
