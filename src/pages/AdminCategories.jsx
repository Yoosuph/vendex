import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

export default function AdminCategories() {
  return (
    <>
      <Header />

<AdminSidebar />

<main className="ml-64 pt-16 min-h-screen">
<div className="max-w-container-max mx-auto px-gutter py-lg">

<div className="flex justify-between items-end mb-lg">
<div>
<nav className="flex gap-xs text-secondary text-sm mb-xs">
<span>Marketplace</span>
<span>/</span>
<span className="text-primary font-medium">Categories Management</span>
</nav>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Categories Management</h2>
</div>
<button className="px-md py-sm bg-primary hover:bg-[#96101F] text-white font-bold rounded-lg transition-all flex items-center gap-sm shadow-sm">
<span className="material-symbols-outlined">add_circle</span>
                    Add New Category
                </button>
</div>

<div className="grid grid-cols-12 gap-gutter items-start">

<div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden border border-outline-variant">
<div className="p-md border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
<h3 className="font-bold text-primary">Category Hierarchy</h3>
<span className="text-xs text-secondary">Total: 42</span>
</div>
<div className="p-sm max-h-[716px] overflow-y-auto">

<div className="mb-base">
<div className="flex items-center gap-sm p-sm hover:bg-surface-container-low rounded-lg cursor-pointer group">
<span className="material-symbols-outlined text-secondary group-hover:text-primary">expand_more</span>
<span className="material-symbols-outlined text-secondary group-hover:text-primary">apparel</span>
<span className="flex-1">Fashion &amp; Apparel</span>
</div>

<div className="ml-lg relative mt-base">
<div className="flex items-center gap-sm p-sm tree-item-active rounded-lg cursor-pointer relative">
<span className="material-symbols-outlined text-primary">check_circle</span>
<span className="flex-1">Men's Casual Wear</span>
</div>
<div className="flex items-center gap-sm p-sm hover:bg-surface-container-low rounded-lg cursor-pointer group relative">
<span className="material-symbols-outlined text-secondary group-hover:text-primary">radio_button_unchecked</span>
<span className="flex-1">Women's Collection</span>
</div>
<div className="flex items-center gap-sm p-sm hover:bg-surface-container-low rounded-lg cursor-pointer group relative">
<span className="material-symbols-outlined text-secondary group-hover:text-primary">radio_button_unchecked</span>
<span className="flex-1">Kids &amp; Accessories</span>
</div>
</div>
</div>

<div className="mt-md">
<div className="flex items-center gap-sm p-sm hover:bg-surface-container-low rounded-lg cursor-pointer group">
<span className="material-symbols-outlined text-secondary group-hover:text-primary">chevron_right</span>
<span className="material-symbols-outlined text-secondary group-hover:text-primary">laptop_mac</span>
<span className="flex-1">Electronics</span>
</div>
</div>

<div className="mt-base">
<div className="flex items-center gap-sm p-sm hover:bg-surface-container-low rounded-lg cursor-pointer group">
<span className="material-symbols-outlined text-secondary group-hover:text-primary">chevron_right</span>
<span className="material-symbols-outlined text-secondary group-hover:text-primary">home</span>
<span className="flex-1">Home &amp; Living</span>
</div>
</div>

<div className="mt-base">
<div className="flex items-center gap-sm p-sm hover:bg-surface-container-low rounded-lg cursor-pointer group">
<span className="material-symbols-outlined text-secondary group-hover:text-primary">chevron_right</span>
<span className="material-symbols-outlined text-secondary group-hover:text-primary">fitness_center</span>
<span className="flex-1">Sports &amp; Outdoors</span>
</div>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-8 space-y-gutter">

<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant overflow-hidden">
<div className="p-md border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<h3 className="font-bold text-on-surface">Edit Category: Men's Casual Wear</h3>
<div className="flex items-center gap-sm">
<span className="text-sm font-medium text-secondary">Status:</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-secondary-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
<span className="ml-xs text-sm font-medium text-primary">Active</span>
</label>
</div>
</div>
<div className="p-lg grid grid-cols-1 md:grid-cols-2 gap-lg">

<div className="space-y-md">
<div>
<label className="block text-sm font-bold text-on-surface-variant mb-xs">Category Name</label>
<input className="w-full bg-white border border-[#DEDEDA] rounded-lg px-sm py-sm focus:border-on-surface focus:ring-0 transition-colors" type="text" value="Men's Casual Wear"/>
</div>
<div>
<label className="block text-sm font-bold text-on-surface-variant mb-xs">Slug</label>
<div className="flex rounded-lg border border-[#DEDEDA] overflow-hidden">
<span className="bg-surface-container-low px-sm py-sm text-secondary text-sm border-r border-[#DEDEDA]">vendex.com/c/</span>
<input className="w-full bg-white border-none px-sm py-sm focus:ring-0 text-sm" type="text" value="mens-casual-wear"/>
</div>
</div>
<div>
<label className="block text-sm font-bold text-on-surface-variant mb-xs">Description</label>
<textarea className="w-full bg-white border border-[#DEDEDA] rounded-lg px-sm py-sm focus:border-on-surface focus:ring-0 transition-colors" rows="4">Premium everyday wear for men, featuring high-quality fabrics and contemporary designs for the modern lifestyle.</textarea>
</div>
</div>

<div className="space-y-md">
<label className="block text-sm font-bold text-on-surface-variant mb-xs">Category Image</label>
<div className="relative group aspect-video bg-surface-container rounded-xl overflow-hidden border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center p-sm">
<img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" data-alt="A sophisticated commercial fashion photograph featuring high-end men's casual apparel. The shot is set in a sun-drenched, minimalist loft with large windows and a soft, warm light-mode glow. A model is styled in premium textures—linen and soft cotton—emphasizing quality and contemporary elegance. The overall mood is refined, bright, and aspirational, consistent with a high-trust corporate retail environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3T10wX1_9HdJ73xtaCmTQUNl1eMSq0noFoX-Ths-Jkh4QuApMcyMjaqMqR7grsPyubApAHKKwpKXD3UOMUBahfNdC4fWzQ-c8PL28fZEIIs4swzGWrp-0KAVY0oBI_fpp8uuerEZCdR3sBm-Q0Ti3oB7n65vdiIfYOwFIjNXoRHIVf7-v376orNlc4d73WaYNhqhn2yhDztc-tiWMo-L1uUEIwlMQsqv_sxc2FcOIXCveiTXi_50FbwZ1ZnyoHNjgzwL8sjri8QoW"/>
<div className="relative z-10">
<button className="bg-white/90 backdrop-blur-sm px-sm py-xs rounded-full flex items-center gap-xs text-sm font-bold shadow-md hover:bg-white transition-all text-primary">
<span className="material-symbols-outlined text-sm">edit</span>
                                            Replace Image
                                        </button>
<p className="text-xs text-white mt-xs drop-shadow-md">Recommended: 1200x800px</p>
</div>
</div>
<div>
<label className="block text-sm font-bold text-on-surface-variant mb-xs">Parent Category</label>
<select className="w-full bg-white border border-[#DEDEDA] rounded-lg px-sm py-sm focus:border-on-surface focus:ring-0 transition-colors">
<option>Fashion &amp; Apparel</option>
<option>Electronics</option>
<option>Home &amp; Living</option>
</select>
</div>
<div className="pt-sm border-t border-outline-variant">
<div className="flex justify-end gap-sm">
<button className="px-md py-sm text-secondary hover:bg-surface-container rounded-lg transition-colors font-medium">Discard</button>
<button className="px-md py-sm bg-primary text-white rounded-lg hover:bg-[#96101F] font-bold shadow-sm transition-all active:scale-95">Save Changes</button>
</div>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="bg-surface-container-low p-md rounded-xl border border-outline-variant">
<div className="flex items-center gap-sm mb-sm text-primary">
<span className="material-symbols-outlined">trending_up</span>
<h4 className="font-bold">Performance Stats</h4>
</div>
<div className="flex justify-between items-center">
<div>
<p className="text-xs text-secondary uppercase font-bold">Monthly Views</p>
<p className="text-headline-md font-black">24.5k</p>
</div>
<div className="text-right">
<p className="text-xs text-secondary uppercase font-bold">Conversions</p>
<p className="text-headline-md font-black">3.2%</p>
</div>
</div>
</div>
<div className="bg-white p-md rounded-xl border border-outline-variant shadow-sm">
<div className="flex items-center gap-sm mb-sm text-on-surface">
<span className="material-symbols-outlined">inventory_2</span>
<h4 className="font-bold">Inventory Summary</h4>
</div>
<div className="space-y-xs">
<div className="flex justify-between text-sm">
<span className="text-secondary">Products Linked</span>
<span className="font-bold">1,240</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-secondary">Active Vendors</span>
<span className="font-bold">18</span>
</div>
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
