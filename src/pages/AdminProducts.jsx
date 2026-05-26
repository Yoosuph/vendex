import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

export default function AdminProducts() {
  return (
    <>
      <AdminSidebar />

<Header />

<main className="ml-64 pt-16 min-h-screen">
<div className="p-gutter max-w-container-max mx-auto">

<div className="flex justify-between items-end mb-lg">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Product Inventory</h2>
<p className="text-on-surface-variant font-body-md">Manage global product listings across 24 active vendors.</p>
</div>
<div className="flex space-x-3">
<button className="px-4 py-2 border border-outline-variant bg-surface rounded-lg font-label-md hover:bg-surface-container transition-colors flex items-center">
<span className="material-symbols-outlined mr-2" data-icon="filter_list">filter_list</span>
                        Filter
                    </button>
<button className="px-4 py-2 border border-outline-variant bg-surface rounded-lg font-label-md hover:bg-surface-container transition-colors flex items-center">
<span className="material-symbols-outlined mr-2" data-icon="download">download</span>
                        Export CSV
                    </button>
</div>
</div>

<div className="grid grid-cols-4 gap-md mb-lg">
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Total Products</p>
<p className="text-headline-md font-bold text-on-surface">1,284</p>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Pending Review</p>
<p className="text-headline-md font-bold text-primary">12</p>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Low Stock</p>
<p className="text-headline-md font-bold text-on-surface">45</p>
</div>
<div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Out of Stock</p>
<p className="text-headline-md font-bold text-on-surface">8</p>
</div>
</div>

<div className="bg-white rounded-xl shadow-sm border border-outline-variant overflow-hidden">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-outline-variant">
<tr>
<th className="px-md py-4 font-label-md text-on-surface-variant">Image</th>
<th className="px-md py-4 font-label-md text-on-surface-variant">Product Name</th>
<th className="px-md py-4 font-label-md text-on-surface-variant">Vendor</th>
<th className="px-md py-4 font-label-md text-on-surface-variant">Category</th>
<th className="px-md py-4 font-label-md text-on-surface-variant">Price</th>
<th className="px-md py-4 font-label-md text-on-surface-variant">Stock</th>
<th className="px-md py-4 font-label-md text-on-surface-variant">Status</th>
<th className="px-md py-4 font-label-md text-on-surface-variant text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer" onclick="openReviewModal('Velvet Armchair', 'Luxe Living Co.', '$849.00', 'Furniture', '20')">
<td className="px-md py-4">
<img className="w-12 h-12 rounded object-cover border border-outline-variant" data-alt="A professional studio product photograph of a plush velvet armchair in a deep emerald green, positioned against a minimalist light grey background. The lighting is soft and cinematic, highlighting the rich texture of the fabric and the sleek wooden legs. The overall mood is sophisticated, luxurious, and clean, perfectly fitting a high-end corporate marketplace aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuQvydYKFAf7IZmCqn1vPgQaP_VksmI98ppZCadzbFsSzoDyWaDa2gNkXPbdUArbm5ljoge3Sbmk8Ruo_VXIvAJTXRTLihORRTbnZOTeIGqftpaXP6OEXyLdue9DeGXV3yumXlobyMwY4hCS5W4YtwVmTeXYMa6WbgrtToM_hSJoR_QgqwQNSY7PaNsONayD8Ar5XkkfyHEBJ01hIPz3GjDpZWznPCBVacbNv5MbAbnfDtio8NcsYoROc002osoZFEZ0cDOf4lBo0P"/>
</td>
<td className="px-md py-4">
<p className="font-label-md text-on-surface">Velvet Armchair</p>
<p className="text-meta text-on-surface-variant">ID: PRD-4492</p>
</td>
<td className="px-md py-4">
<Link className="text-primary font-label-md hover:underline" to="#">Luxe Living Co.</Link>
</td>
<td className="px-md py-4 text-on-surface-variant">Furniture</td>
<td className="px-md py-4 font-bold text-on-surface">$849.00</td>
<td className="px-md py-4">20 units</td>
<td className="px-md py-4">
<span className="px-2 py-1 bg-error-container text-on-error-container text-label-sm rounded-full font-bold">Pending Review</span>
</td>
<td className="px-md py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-md py-4">
<img className="w-12 h-12 rounded object-cover border border-outline-variant" data-alt="A minimalist overhead product shot of a sleek white smartwatch with a silicone strap, resting on a clean dim-white surface. The lighting is bright and even, casting subtle shadows to create depth without clutter. The image emphasizes precision and modern industrial design, following a high-trust retail visual standard with a muted but crisp color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOzBj7DfQRHt2JMQTPC5BKIcDwED2h-qQKbUIiDLMM_aGwZsQxJhjmln7NYjoNbg5JbzFPJgeaYxSjx4aqxhuV2pnQXeXU0S7s6tH13Is_6l1krv5FGaA3aY3XnfDf1Mc06kljoqanevFZYuZqDq1XiXufUGJGZJwdFQ202f9gOHkQouNPH54oTR5Zfn7sC-n6y6Xyr-4pSA6oFGKHU762yOyWiPogU_dNV9c3oNEBXEelfi60DkNfWjyxnu2U5TJqF7ovn6SWlD50"/>
</td>
<td className="px-md py-4">
<p className="font-label-md text-on-surface">Chronos Smartwatch</p>
<p className="text-meta text-on-surface-variant">ID: PRD-1102</p>
</td>
<td className="px-md py-4">
<Link className="text-primary font-label-md hover:underline" to="#">TechNova</Link>
</td>
<td className="px-md py-4 text-on-surface-variant">Electronics</td>
<td className="px-md py-4 font-bold text-on-surface">$199.00</td>
<td className="px-md py-4">142 units</td>
<td className="px-md py-4">
<span className="px-2 py-1 bg-primary/10 text-primary text-label-sm rounded-full font-bold">Active</span>
</td>
<td className="px-md py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer" onclick="openReviewModal('Artisan Ceramic Set', 'Handmade Haven', '$120.00', 'Home Decor', '15')">
<td className="px-md py-4">
<img className="w-12 h-12 rounded object-cover border border-outline-variant" data-alt="A beautifully arranged collection of handmade ceramic vases in neutral earth tones, set against a soft beige textured backdrop. The composition is artistic and asymmetric, lit by natural diffused sunlight coming from the side. The scene conveys craftsmanship, quality, and a minimalist organic lifestyle aesthetic consistent with premium multi-vendor marketplace standards." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB__Dfqz3SUnknHyXSDqaKekK4q3pbKvdpMYqjw9c5MJISDXyPOam43mAEkRqErPmJA_5JutP80rOMwlLHw9SxQQ7gwiHKkF8t4Ie45IhMY2ahJp3sw5KCyRiLZgTaOx5ccx1KKTX7uF2deByowdtQE-NiPEleWq7H_wDEXmfUdCgY6KpyJjmr1l8hlVeMs89dzA63GEJK7jhxv0xGz7Bmha8dIlAA11lc9FSohS3Rb0Cs-7o3U1ys88bFf-2KCMjiVgz1dXswsAn_"/>
</td>
<td className="px-md py-4">
<p className="font-label-md text-on-surface">Artisan Ceramic Set</p>
<p className="text-meta text-on-surface-variant">ID: PRD-3381</p>
</td>
<td className="px-md py-4">
<Link className="text-primary font-label-md hover:underline" to="#">Handmade Haven</Link>
</td>
<td className="px-md py-4 text-on-surface-variant">Home Decor</td>
<td className="px-md py-4 font-bold text-on-surface">$120.00</td>
<td className="px-md py-4">15 units</td>
<td className="px-md py-4">
<span className="px-2 py-1 bg-error-container text-on-error-container text-label-sm rounded-full font-bold">Pending Review</span>
</td>
<td className="px-md py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-md py-4">
<img className="w-12 h-12 rounded object-cover border border-outline-variant" data-alt="A dynamic product photo of a vibrant red running shoe, floating mid-air against a clean white and light grey gradient background. High-speed strobe lighting freezes the motion, highlighting the athletic performance features and vivid primary red color. The visual style is energetic yet commercially precise, echoing a premium retail catalog look." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaRpzGfFC1MEjCO9GGkPUAe9hzWpRS8KxXrZraLALw4qf4UAHRs25yuZJhYIXE5SGvgtj0OAnNPYlC4u0cbV-wZiSjB-KNEnS4nY4jELCeUj9ixpmw-rKpQ4psP6lg2AZ7QiOgUy_W1WjZDjPw5oWE-GoNGWSghrDWZXv0Mx_tk8ZY7dEC9_z5OzLhuhBSIOT9RzaDH6s5umFWbII0K-FoseuptfiOYNinsrVGz7VZ7Sv0z__yaNFnAXj483fxGPc_VbCpX0szNxDC"/>
</td>
<td className="px-md py-4">
<p className="font-label-md text-on-surface">Sprint Elite Z3</p>
<p className="text-meta text-on-surface-variant">ID: PRD-0023</p>
</td>
<td className="px-md py-4">
<Link className="text-primary font-label-md hover:underline" to="#">Velocity Sports</Link>
</td>
<td className="px-md py-4 text-on-surface-variant">Apparel</td>
<td className="px-md py-4 font-bold text-on-surface">$145.00</td>
<td className="px-md py-4">56 units</td>
<td className="px-md py-4">
<span className="px-2 py-1 bg-primary/10 text-primary text-label-sm rounded-full font-bold">Active</span>
</td>
<td className="px-md py-4 text-right">
<button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
<div className="px-md py-4 bg-surface-container-low flex justify-between items-center border-t border-outline-variant">
<p className="text-meta text-on-surface-variant">Showing 1-4 of 1,284 products</p>
<div className="flex space-x-2">
<button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded bg-white hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="w-8 h-8 flex items-center justify-center border border-primary rounded bg-primary-container/10 text-primary font-bold">1</button>
<button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded bg-white hover:bg-surface-container transition-colors">2</button>
<button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded bg-white hover:bg-surface-container transition-colors">3</button>
<button className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded bg-white hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</main>

<div className="fixed inset-0 z-[60] hidden flex items-center justify-center p-md" id="reviewModal">
<div className="modal-overlay absolute inset-0" onclick="closeModal()"></div>
<div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
<div className="flex h-[600px]">

<div className="w-1/2 bg-surface-container flex flex-col p-md space-y-md">
<div className="flex-1 bg-white rounded-lg overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A highly detailed close-up of a premium furniture item, showcasing fine fabric textures and master craftsmanship. The image is bathed in soft, bright light that emphasizes the high-quality materials and deep color saturation. It is styled as a professional product feature for an upscale e-commerce platform, focusing on tactile quality and clean composition." id="modalMainImg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIrrVir3nOZaIx41CIO_Hw0LWygHw-robybDWGIFvG6hLNn-Nairl_MNVAsvQqCRhNZvgXdzdK7rp7LXNFMqptFqtsRccs8iSRfQGlEW2LpY2aSyehqiGgxnmuZtsKzWzsvrx2y5OfkZHnb1cokEO6uxDP2JYtEwiZe6vL_a_Q3hS575bvmnI4zAIhEEORYdCivQgRrL9KbHOJU2CBlo18rKzGQRaRE7ChI6j_gwC4Ex_vGSO5JE_ID_8SfEuidvXDY2RbDoFcBVt1"/>
</div>
<div className="flex space-x-2 overflow-x-auto pb-2">
<img alt="Thumb" className="w-20 h-20 rounded border-2 border-primary object-cover cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOtCI6mEEkOdezUiyKCPPSju_hjEWURpUjgLzZ8qinAwOHdt6yXQ1_MkYqvirIvMLcjULqNEFAl-47tPpNDPQwxYY160yMJxM8zb4HjxqLQHc5y4ndEN1_b8YsE0idgQpuxrNp2b-3e8mARIQQbxhwq8oTL8MWaKnuAUXY-hbLTUfPl_J5nAhivg25ifY6YEx3nY2pqIkmKei9GRho20eyNV0aae-BHupvgMusnB71WR4iJXiHSSruYMCDp306X610lp3ssTz-1Zx-"/>
<img alt="Thumb" className="w-20 h-20 rounded border border-outline-variant object-cover cursor-pointer hover:border-primary transition-colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2giglJ37IIGFrdI_Xh05yeub2ujrtJXfyrKQIfP4AvQTLtnD3OmrO_tTkW1YbbLZSme-d1xy4AVIZaqLFzCVwVvS4aCykv1n_TkxhS45MNuQf4wPf6UoVegSrvzr3sSQzjEX7bUGKa_sPJb5qMY6E8iOHWzqZwjam3RF4JArFev7RTeZ7w2v66zRR5BugB_50GTbHeI3zWdZoOC48G7y3vQ5IWEUdoDhHivND9m5PE2r6H95R5h3zNZA6Hdj9TH6ZKMVnEuK8gbgW"/>
<img alt="Thumb" className="w-20 h-20 rounded border border-outline-variant object-cover cursor-pointer hover:border-primary transition-colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKUOa6qMlx6x9LTIX_3X7ijT3IVe9zQQEI1sRWFopKa6r2nk-JybtDoOAiZFfNAGuy71_PIvNY79dMUUAY1SeXdpQJW93R5Ngh1fff5qz_NPskfuPhCiOWosCoWp4KiF4uvfX5lGv3t0KCbm7eXNb9ceh4-fUSdkAQH56uo9zkgXb2E-OJi1yLMudSRc9i8MUnriLvqPFYQB_WejbVLXWC3iM03QBYFAQ10lKMV_UDaVzButJWGbOclbCBMYPUz4FE4C6VDiI59aUd"/>
</div>
</div>

<div className="w-1/2 p-lg flex flex-col">
<div className="flex justify-between items-start">
<div>
<span className="px-2 py-1 bg-error-container text-on-error-container text-label-sm rounded-full font-bold uppercase mb-2 inline-block">Review Required</span>
<h3 className="text-headline-md font-bold text-on-surface" id="modalTitle">Velvet Armchair</h3>
<p className="text-primary font-label-md" id="modalVendor">Luxe Living Co.</p>
</div>
<button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant" onclick="closeModal()">
<span className="material-symbols-outlined">close</span>
</button>
</div>
<div className="mt-lg space-y-md flex-1">
<div className="grid grid-cols-2 gap-md">
<div>
<p className="text-meta text-on-surface-variant uppercase">Price</p>
<p className="font-bold text-headline-md text-on-surface" id="modalPrice">$849.00</p>
</div>
<div>
<p className="text-meta text-on-surface-variant uppercase">Category</p>
<p className="font-label-md text-on-surface" id="modalCategory">Furniture</p>
</div>
</div>
<div>
<p className="text-meta text-on-surface-variant uppercase mb-1">Description</p>
<p className="text-body-sm text-on-surface-variant leading-relaxed">
                                Handcrafted with premium Italian velvet and solid oak legs. This piece combines 19th-century aesthetics with modern ergonomic support. Ideal for executive offices or high-end residential lounges. Verified sustainable sourcing for all materials.
                            </p>
</div>
<div className="p-md bg-surface-container-low rounded-lg border border-outline-variant">
<p className="font-label-md text-on-surface mb-1 flex items-center">
<span className="material-symbols-outlined text-primary text-sm mr-2" style={{fontVariationSettings: "'FILL' 1"}}>inventory_2</span>
                                Inventory Status
                            </p>
<p className="text-body-sm text-on-surface-variant" id="modalStock">Initial batch of 20 units ready for shipment from Vendor Warehouse B.</p>
</div>
</div>

<div className="mt-lg pt-md border-t border-outline-variant flex space-x-3">
<button className="flex-1 py-3 bg-white border border-error text-error font-bold rounded-lg hover:bg-error-container/10 transition-colors">
                            Reject Product
                        </button>
<button className="flex-1 py-3 bg-primary-container text-on-primary-container font-bold rounded-lg hover:bg-primary transition-colors">
                            Approve Listing
                        </button>
</div>
</div>
</div>
</div>
</div>
    </>
  );
}
