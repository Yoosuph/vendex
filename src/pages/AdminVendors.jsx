import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

export default function AdminVendors() {
  return (
    <>
      <AdminSidebar />

<main className="ml-64 min-h-screen">

<Header />

<div className="mt-16 p-gutter max-w-container-max mx-auto">

<div className="flex justify-between items-end mb-lg">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Vendor Management</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Manage your multi-vendor marketplace partners and their performance.</p>
</div>
<div className="flex gap-sm">
<button className="flex items-center gap-xs px-md py-sm bg-white border border-outline-variant rounded-lg text-secondary hover:bg-surface-container transition-all font-label-md text-label-md">
<span className="material-symbols-outlined" data-icon="download">download</span>
            Export CSV
          </button>
<button className="flex items-center gap-xs px-md py-sm bg-primary text-white rounded-lg hover:bg-[#96101F] transition-all font-label-md text-label-md shadow-sm">
<span className="material-symbols-outlined" data-icon="person_add">person_add</span>
            Add New Vendor
          </button>
</div>
</div>

<div className="bg-white p-sm rounded-xl border border-outline-variant shadow-sm mb-md flex flex-wrap gap-md items-center">
<div className="flex-1 min-w-[300px] relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-10 pr-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-label-md" placeholder="Search by vendor name or ID..." type="text"/>
</div>
<div className="flex gap-sm">
<select className="bg-white border border-outline-variant rounded-lg px-md py-2 text-label-md focus:ring-1 focus:ring-primary outline-none min-w-[140px]">
<option>All Categories</option>
<option>Electronics</option>
<option>Fashion</option>
<option>Home &amp; Living</option>
<option>Beauty</option>
</select>
<select className="bg-white border border-outline-variant rounded-lg px-md py-2 text-label-md focus:ring-1 focus:ring-primary outline-none min-w-[140px]">
<option>All Statuses</option>
<option>Active</option>
<option>Pending</option>
<option>Suspended</option>
</select>
</div>
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors">
<span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
</button>
</div>

<div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider">Vendor</th>
<th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider">Owner</th>
<th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider">Category</th>
<th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider text-right">Sales (YTD)</th>
<th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider text-right">Comm.</th>
<th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider">Status</th>
<th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider">Joined</th>
<th className="px-md py-sm font-label-md text-label-md text-secondary uppercase tracking-wider text-center">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-md">
<div className="flex items-center gap-sm">
<img alt="Lumix Store" className="h-10 w-10 rounded-lg object-cover border border-outline-variant" data-alt="A minimalist logo for a high-end electronics brand featuring clean, geometric shapes and professional typography. The scene is a stylized digital office background with soft neutral tones, dim lighting, and premium corporate aesthetics. The image emphasizes a sense of architectural precision and commercial authority within a modern marketplace ecosystem." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5C5E8GS86-jyu2tgVUSLBdkL6ulSdGg4qjvBBQNJe2knScMiqVKLm75Ivj_Ih4M7KYLtO_vIo6gB180myWphLAgqd-MPlwejCUkLV7eAPCVPURzGgFFpHN07KvWWQjiXa0PZed0lgShphMG8XRjupFNHoHcH_qnLh62Q6aw9DDIU2azq0g7MpSAiKBSsQkaC0hx9uzUg89NRix-E0NCXNxpa0DHGXQgDOVZEEK0jJa3qQPN-kVG4gqgrzP1sKWLmEF3_VsGFurYlZ"/>
<div>
<div className="font-label-md text-label-md text-on-surface">Lumix Electronics</div>
<div className="font-meta text-meta text-on-surface-variant">ID: VND-2024-001</div>
</div>
</div>
</td>
<td className="px-md py-md font-body-md text-body-md">Sarah Jenkins</td>
<td className="px-md py-md">
<span className="px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs font-label-sm">Electronics</span>
</td>
<td className="px-md py-md font-body-md text-body-md text-right font-medium">$128,450.00</td>
<td className="px-md py-md font-body-md text-body-md text-right">12%</td>
<td className="px-md py-md">
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    ACTIVE
                  </span>
</td>
<td className="px-md py-md font-meta text-meta text-on-surface-variant">Jan 12, 2024</td>
<td className="px-md py-md text-center">
<div className="flex justify-center gap-xs">
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"><span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"><span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span></button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-md">
<div className="flex items-center gap-sm">
<img alt="Vogue Luxe" className="h-10 w-10 rounded-lg object-cover border border-outline-variant" data-alt="An elegant, minimalist fashion brand logo displayed in a sophisticated high-end retail context. The background is a dimly lit, luxurious boutique with marble textures and gold accents. The lighting is soft and directional, creating a premium atmosphere of high-fashion and curation. The overall aesthetic is clean, authoritative, and deeply professional." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo9AFsBP3c2q8xBDbg5uvKUMUw3jY_87-oIRryjfF1CpsvLYpMu-sZh3AoahGUa7ceWGDiA9HEq-uJymtU76_0zs4sVgtRqKF7RX3W-K4LsOp7uvWTQYxNO77-KKkGI7Y7DmBWoLHbcUE7Agv_Hfe9I16FMiMGVDbP1fSoMmV63EeZKPXpqLF-4CVcDmadK8904PrmH2UXA2n1rNBJ8TQCmSZPbMQbLeLL1szqiY5Ga_CITR6nY3pEZSKqqahxF5Cqk2gM__CAftya"/>
<div>
<div className="font-label-md text-label-md text-on-surface">Vogue Luxe</div>
<div className="font-meta text-meta text-on-surface-variant">ID: VND-2024-042</div>
</div>
</div>
</td>
<td className="px-md py-md font-body-md text-body-md">Marcello Rossi</td>
<td className="px-md py-md">
<span className="px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs font-label-sm">Fashion</span>
</td>
<td className="px-md py-md font-body-md text-body-md text-right font-medium">$84,120.00</td>
<td className="px-md py-md font-body-md text-body-md text-right">15%</td>
<td className="px-md py-md">
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    PENDING
                  </span>
</td>
<td className="px-md py-md font-meta text-meta text-on-surface-variant">Feb 05, 2024</td>
<td className="px-md py-md text-center">
<div className="flex justify-center gap-xs">
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"><span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"><span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span></button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-md">
<div className="flex items-center gap-sm">
<img alt="Urban Living" className="h-10 w-10 rounded-lg object-cover border border-outline-variant" data-alt="A contemporary home and living brand logo set against a backdrop of a beautifully designed minimalist apartment. The interior features natural light, soft linens, and architectural furniture. The style is modern corporate, emphasizing comfort and efficiency. The lighting is bright and natural, reinforcing a sense of high-trust quality and curated living spaces." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0tnc2R22_ntzBeAuvYtNt5hgvoGFDjawTEwINVxR2EtANioU4ehGx-ML8wTs1Qm9dvkhW3_He78HKpGJ8iLPk95-0Z6OldxoMrsLAlAJrptW8oxhxtEuhIaYdQEpYvghDjPyuOaDeDliSE4z4ykhjrndpK84KN5iwUsxmnJ7XKt4bw51zsqzkswOvlg6cHj134DhZukh6ENG7UuZVp2qlnEY6qyvS1S7CN3SZwKvFa5xZ9OGFxQVcvT_2NKfcqYsFKEgzGuei2DZW"/>
<div>
<div className="font-label-md text-label-md text-on-surface">Urban Living</div>
<div className="font-meta text-meta text-on-surface-variant">ID: VND-2023-118</div>
</div>
</div>
</td>
<td className="px-md py-md font-body-md text-body-md">Elena Fisher</td>
<td className="px-md py-md">
<span className="px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs font-label-sm">Home &amp; Living</span>
</td>
<td className="px-md py-md font-body-md text-body-md text-right font-medium">$42,900.00</td>
<td className="px-md py-md font-body-md text-body-md text-right">10%</td>
<td className="px-md py-md">
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    SUSPENDED
                  </span>
</td>
<td className="px-md py-md font-meta text-meta text-on-surface-variant">Nov 20, 2023</td>
<td className="px-md py-md text-center">
<div className="flex justify-center gap-xs">
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"><span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"><span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span></button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-md py-md">
<div className="flex items-center gap-sm">
<img alt="Glow Beauty" className="h-10 w-10 rounded-lg object-cover border border-outline-variant" data-alt="A sleek, modern beauty brand logo presented in a bright, minimalist studio environment. The lighting is diffused and high-key, creating a clean and clinical yet inviting look. The background features glass textures and soft pastels, perfectly aligned with a professional skincare aesthetic. The image evokes reliability, safety, and modern cosmetic excellence." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuig8YwVk8PLog6qGqWaO-4E0_F2EJoFlpD0Fxvbyx2S7XHJwXU1sH022Jpq1KOEME9HvfmHmDut907GM2i1z6JP-o4mt6NYS0twFZfw8RPb2PfjHx4knpGcrV5PsCdMdah9oEcukWsFIjleE_jDEH4RnBv5C4OuqXcQOG06kI43XtkGsBqJ0Ue6wRvltVNFcUENsSyMWvYqBCYbZ9BfJts3ToTT7F1ZxgzzXTKFAPPORZtXs7WO8AI1mK_Yml8G_AyCvzJ7rP_K5b"/>
<div>
<div className="font-label-md text-label-md text-on-surface">Glow Beauty</div>
<div className="font-meta text-meta text-on-surface-variant">ID: VND-2024-089</div>
</div>
</div>
</td>
<td className="px-md py-md font-body-md text-body-md">David Chen</td>
<td className="px-md py-md">
<span className="px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs font-label-sm">Beauty</span>
</td>
<td className="px-md py-md font-body-md text-body-md text-right font-medium">$215,600.00</td>
<td className="px-md py-md font-body-md text-body-md text-right">18%</td>
<td className="px-md py-md">
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    ACTIVE
                  </span>
</td>
<td className="px-md py-md font-meta text-meta text-on-surface-variant">Mar 01, 2024</td>
<td className="px-md py-md text-center">
<div className="flex justify-center gap-xs">
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"><span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span></button>
<button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant"><span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-md py-sm border-t border-outline-variant flex justify-between items-center bg-surface-container-low">
<div className="font-meta text-meta text-on-surface-variant">Showing 1 to 10 of 248 vendors</div>
<div className="flex gap-xs">
<button className="p-2 rounded-lg border border-outline-variant bg-white disabled:opacity-50 hover:bg-surface-container transition-all" disabled="">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button className="px-4 py-2 rounded-lg bg-primary text-white font-label-md text-label-md">1</button>
<button className="px-4 py-2 rounded-lg hover:bg-surface-container font-label-md text-label-md transition-all">2</button>
<button className="px-4 py-2 rounded-lg hover:bg-surface-container font-label-md text-label-md transition-all">3</button>
<button className="p-2 rounded-lg border border-outline-variant bg-white hover:bg-surface-container transition-all">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
