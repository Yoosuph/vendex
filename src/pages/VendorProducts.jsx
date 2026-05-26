import React from 'react';
import { Link } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VendorProducts() {
  return (
    <>
      <Header />
<div className="max-w-container-max mx-auto flex">

<VendorSidebar />

<main className="flex-1 p-gutter md:p-xl">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface">Product Inventory</h1>
<p className="font-body-md text-body-md text-secondary">Manage your catalog, stock levels and visibility across Vendex.</p>
</div>
<button className="bg-[#C0152A] hover:bg-[#96101F] text-white px-md py-xs rounded-lg flex items-center justify-center gap-xs transition-all shadow-sm active:scale-[0.98]">
<span className="material-symbols-outlined text-[20px]">add</span>
<span className="font-label-md text-label-md uppercase tracking-wide">Add New Product</span>
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-xl">
<div className="bg-white p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30">
<span className="text-secondary font-label-md text-label-md">Total Products</span>
<div className="flex items-end justify-between mt-xs">
<span className="font-headline-md text-headline-md">1,284</span>
<span className="text-green-600 font-label-sm text-label-sm flex items-center">+12%</span>
</div>
</div>
<div className="bg-white p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30">
<span className="text-secondary font-label-md text-label-md">Active Listings</span>
<div className="flex items-end justify-between mt-xs">
<span className="font-headline-md text-headline-md">1,102</span>
<span className="material-symbols-outlined text-primary">check_circle</span>
</div>
</div>
<div className="bg-white p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30">
<span className="text-secondary font-label-md text-label-md">Low Stock</span>
<div className="flex items-end justify-between mt-xs">
<span className="font-headline-md text-headline-md">14</span>
<span className="text-primary font-label-sm text-label-sm">Requires Action</span>
</div>
</div>
<div className="bg-white p-md rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30">
<span className="text-secondary font-label-md text-label-md">Drafts</span>
<div className="flex items-end justify-between mt-xs">
<span className="font-headline-md text-headline-md">168</span>
<span className="material-symbols-outlined text-secondary">edit_note</span>
</div>
</div>
</div>

<div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30 overflow-hidden">
<div className="px-md py-sm border-b border-outline-variant/30 flex items-center justify-between">
<div className="flex items-center gap-md">
<button className="font-label-md text-label-md text-primary border-b-2 border-primary pb-sm translate-y-[13px]">All Items</button>
<button className="font-label-md text-label-md text-secondary hover:text-primary transition-colors pb-sm translate-y-[13px]">Out of Stock</button>
<button className="font-label-md text-label-md text-secondary hover:text-primary transition-colors pb-sm translate-y-[13px]">Drafts</button>
</div>
<div className="flex gap-xs">
<button className="p-xs text-secondary hover:bg-surface-container rounded-lg">
<span className="material-symbols-outlined text-[20px]">filter_list</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider">
<tr>
<th className="px-md py-sm font-medium">Image</th>
<th className="px-md py-sm font-medium">Product Name</th>
<th className="px-md py-sm font-medium">Category</th>
<th className="px-md py-sm font-medium text-right">Stock</th>
<th className="px-md py-sm font-medium text-right">Price</th>
<th className="px-md py-sm font-medium">Status</th>
<th className="px-md py-sm font-medium text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/30">

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-sm">
<div className="h-12 w-12 rounded-lg bg-surface border border-outline-variant/30 overflow-hidden">
<img alt="Red Sneaker" data-alt="A studio photograph of a vibrant red high-performance athletic sneaker positioned diagonally on a minimalist grey pedestal. The lighting is crisp and multi-directional, highlighting the intricate texture of the mesh and the sleek curvature of the sole. The atmosphere is energetic and modern, emphasizing the premium quality of the product against a clean, light-mode background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM2oYq8KO3sIWmL3dXi8sg8styYRonOcsS7bYnnkS_TjqWq1vZJd0IT_yzcr5f4pEf-ntdcQ7bk_ZhE_eQo9fgDWLZwlWWYlzw1ZnwowREFpsBny1mUL5eChEzcy5A09q6OXxonxACpeKibgdTVmI9g2AI9B8YHEGssN8ESolOPWZLG7RYyco0XnFDky2NJtHR52Q3nkVlHV0VrSLAD--Iqg1_a1eJhDl0oFzA5f6ha8JTuGm7_ijYy5-uP4CjYEp895jRT1BW9rSQ"/>
</div>
</td>
<td className="px-md py-sm">
<span className="font-label-md text-label-md text-on-surface block">Hyper-Stride Pro Runner</span>
<span className="font-meta text-meta text-secondary">SKU: VDX-8821-RED</span>
</td>
<td className="px-md py-sm font-body-sm text-body-sm text-secondary">Footwear</td>
<td className="px-md py-sm font-body-sm text-body-sm text-on-surface text-right">240</td>
<td className="px-md py-sm font-label-md text-label-md text-on-surface text-right">$129.99</td>
<td className="px-md py-sm">
<span className="bg-green-100 text-green-800 px-xs py-0.5 rounded-full font-label-sm text-label-sm">Active</span>
</td>
<td className="px-md py-sm text-right">
<div className="flex items-center justify-end gap-xs">
<button className="p-xs text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="p-xs text-primary hover:bg-primary/10 rounded-lg transition-all" title="Delete">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-sm">
<div className="h-12 w-12 rounded-lg bg-surface border border-outline-variant/30 overflow-hidden">
<img alt="Smart Watch" data-alt="A top-down professional shot of a sleek, white smart watch with a silver casing resting on a textured light grey surface. The lighting is soft and ambient, creating gentle shadows that define the watch's form. The composition is minimalist and high-tech, reflecting a clean corporate aesthetic with a focus on precision and modern design elements." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9ffAi3ccb3-TSaxrO7qM8U6qmV9k0De3J6IYDqsZ32qm4NRjK5nJQtlyPQew_QVdKMGE8HedV0p9GORd3cHLW45f2P0T_FYDRVYfnsUxGAUZDoq_kJwm2vF-NuwLw8y2EkYQxwRvYyvXsmUPtsxrqMpA-MkX8toR_EZljuvn6rMf6TNJuyaLYcbytlYyhEJkLq30GRbjncUBCOdNeBSCnZcR2mAR0tLGFodUa2ztqo6JXgtHRxWI4VzRbXGXhWAqCnZ3D7MrReDHQ"/>
</div>
</td>
<td className="px-md py-sm">
<span className="font-label-md text-label-md text-on-surface block">Zenith Chronos Series X</span>
<span className="font-meta text-meta text-secondary">SKU: VDX-4410-WHT</span>
</td>
<td className="px-md py-sm font-body-sm text-body-sm text-secondary">Electronics</td>
<td className="px-md py-sm font-body-sm text-body-sm text-on-surface text-right">0</td>
<td className="px-md py-sm font-label-md text-label-md text-on-surface text-right">$349.50</td>
<td className="px-md py-sm">
<span className="bg-red-100 text-red-800 px-xs py-0.5 rounded-full font-label-sm text-label-sm">Out of Stock</span>
</td>
<td className="px-md py-sm text-right">
<div className="flex items-center justify-end gap-xs">
<button className="p-xs text-primary hover:bg-primary/10 rounded-lg transition-all">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="p-xs text-primary hover:bg-primary/10 rounded-lg transition-all">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-sm">
<div className="h-12 w-12 rounded-lg bg-surface border border-outline-variant/30 overflow-hidden">
<img alt="Headphones" data-alt="A minimalist studio setup featuring premium black wireless headphones with metallic copper accents. The headphones are shown in a profile view on a stark white background with subtle grey gradients. The lighting is sharp and technical, emphasizing the high-end build materials and the modern, luxurious feel of the consumer electronic device." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHkLz8SVdK5dYOcNpVQTcpwEqurIiX2K_DjxmwQaOFpojhfxe_wBKLSXJJqHuQYZatViwbDE5vqgvHpNsDPDGhpnrH5TesNzPLeqzbLsUVWhouMwpCSGFSimoI43zJfu91X322Cv7SYKC_oexncBaUOrwnIIikfq8CGcD36vQqqWt0Ii1MoVGhoEZVYc1K4j4A5TlG3NhQrbB1zC61IKzSWl-JP5lY3E44f1tOatY-c4nlHNN6p0F6POVqnBuh1JHkCmJjWpHM3oRr"/>
</div>
</td>
<td className="px-md py-sm">
<span className="font-label-md text-label-md text-on-surface block">Aura Noise Cancelling XL</span>
<span className="font-meta text-meta text-secondary">SKU: VDX-1200-BLK</span>
</td>
<td className="px-md py-sm font-body-sm text-body-sm text-secondary">Audio</td>
<td className="px-md py-sm font-body-sm text-body-sm text-on-surface text-right">45</td>
<td className="px-md py-sm font-label-md text-label-md text-on-surface text-right">$199.00</td>
<td className="px-md py-sm">
<span className="bg-gray-100 text-gray-800 px-xs py-0.5 rounded-full font-label-sm text-label-sm">Draft</span>
</td>
<td className="px-md py-sm text-right">
<div className="flex items-center justify-end gap-xs">
<button className="p-xs text-primary hover:bg-primary/10 rounded-lg transition-all">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="p-xs text-primary hover:bg-primary/10 rounded-lg transition-all">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-sm">
<div className="h-12 w-12 rounded-lg bg-surface border border-outline-variant/30 overflow-hidden">
<img alt="Camera Lens" data-alt="A high-detail macro photograph of a professional camera lens, showcasing the reflective glass coating and precisely machined focus rings. The lighting creates elegant circular glints on the lens elements. The background is a sophisticated dark grey, allowing the black and silver components of the lens to stand out as a symbol of architectural and technological precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB96FP7wMrSP-z5Qp-UGsyIzDxy3g8YtmdsOHT9rHSXX7po9uC4P88Ue9hGdYCpx01zPmVcmqXtMVlOkjhMOhZ0XUe2Q4MVrTuANpvAvggN0JNjUGfXeJ1bXi0NWWeD6XH1dZHXpnS3eAw_0JLpPZXYhRd_gjw5h4nt341FqUUpTxo8qB1ZvY5b_Bb0MTw6WPcHCC8aReae2EK5x_3ns_Z6yAKPMJSUOVxu8pyzmdoRz4qVeeeAcF0YM8d5sYpQFTbhI4nSzCnw8RCz"/>
</div>
</td>
<td className="px-md py-sm">
<span className="font-label-md text-label-md text-on-surface block">OpticPrime 50mm f/1.4</span>
<span className="font-meta text-meta text-secondary">SKU: VDX-0050-LNS</span>
</td>
<td className="px-md py-sm font-body-sm text-body-sm text-secondary">Photography</td>
<td className="px-md py-sm font-body-sm text-body-sm text-on-surface text-right">12</td>
<td className="px-md py-sm font-label-md text-label-md text-on-surface text-right">$599.00</td>
<td className="px-md py-sm">
<span className="bg-green-100 text-green-800 px-xs py-0.5 rounded-full font-label-sm text-label-sm">Active</span>
</td>
<td className="px-md py-sm text-right">
<div className="flex items-center justify-end gap-xs">
<button className="p-xs text-primary hover:bg-primary/10 rounded-lg transition-all">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="p-xs text-primary hover:bg-primary/10 rounded-lg transition-all">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div className="px-md py-sm border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-low">
<span className="font-meta text-meta text-secondary">Showing 1 to 4 of 1,284 results</span>
<div className="flex gap-xs">
<button className="px-sm py-1 border border-outline-variant rounded-lg font-label-sm text-label-sm text-secondary hover:bg-white disabled:opacity-50" disabled="">Previous</button>
<button className="px-sm py-1 border border-outline-variant rounded-lg font-label-sm text-label-sm text-secondary hover:bg-white">Next</button>
</div>
</div>
</div>
</main>
</div>

<Footer />
    </>
  );
}
