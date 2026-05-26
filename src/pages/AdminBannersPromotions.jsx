import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

export default function AdminBannersPromotions() {
  return (
    <>
      <AdminSidebar />

<main className="ml-64 min-h-screen">

<Header />

<section className="px-gutter pt-lg pb-sm">
<div className="flex justify-between items-end">
<div>
<h3 className="font-headline-lg text-headline-lg text-on-surface">Banners &amp; Promotions</h3>
<p className="font-body-md text-on-surface-variant mt-2">Manage active marketplace campaigns and landing page visuals.</p>
</div>
<button className="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md flex items-center gap-2 hover:bg-[#96101F] transition-all shadow-sm" onclick="document.getElementById('modal-overlay').classList.remove('hidden')">
<span className="material-symbols-outlined">add_photo_alternate</span>
                    Add New Banner
                </button>
</div>
</section>

<section className="px-gutter py-md">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">

<div className="bg-surface-container-lowest rounded-xl overflow-hidden custom-shadow group border border-transparent hover:border-outline-variant transition-all">
<div className="relative h-48 overflow-hidden">
<img alt="Seasonal Sale Banner" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A high-end retail promotional banner showcasing premium electronics and fashion accessories arranged in a dynamic, professional flat-lay. The color palette is modern and clean, featuring soft whites, deep charcoals, and vibrant red accents. The lighting is bright and airy, creating a sophisticated commercial mood for a premium shopping experience." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8AZSa54cwIeHIdVYua1J74lhgobm_hAcmOgK6GLgKhsbDD-thz0K7m8-hbGQb7-pjeYdE84Fly9CgpW-zHGC_WoGrcfUZtEfA1j97nGmzR70mpfcKkkQUDj_9v0hrJr6W-H8VfsAwtmcR8zsxYJ88si03fdUWolcoMe0l7d3X7i0ArAAyffm02EssE1km7zswmz0ZB54GCqDOnKjjd0iTNfb1U84mXzE63AK2hpfZ84Fv7NVb6IcuiHXqqkB42bGtErgvbrsumZsa"/>
<div className="absolute top-3 left-3 px-3 py-1 bg-primary text-on-primary rounded-full font-label-sm">Home Hero</div>
</div>
<div className="p-sm">
<div className="flex justify-between items-start mb-2">
<h4 className="font-headline-md text-headline-md text-on-surface">Seasonal Tech Sale</h4>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-secondary-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<p className="font-body-sm text-on-surface-variant line-clamp-2">20% Off all electronics. Target: Global Marketplace users.</p>
<div className="mt-md flex justify-between items-center border-t border-outline-variant pt-sm">
<span className="font-label-sm text-secondary">Active until Sep 30</span>
<div className="flex gap-2">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden custom-shadow group border border-transparent hover:border-outline-variant transition-all">
<div className="relative h-48 overflow-hidden">
<img alt="Vendor Spotlight" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A sophisticated banner featuring a minimalist interior design store, with clean architectural lines and high-quality furniture pieces. The atmosphere is serene and expensive, utilizing a palette of off-whites, warm wood tones, and sharp black details. Soft natural sunlight streams through a large window, creating a premium light-mode commercial aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSyU5AyOufu9j_wVu43aEh4saYQr5zSvzdXvnxl0ahLKBy0BxheEmz_B29DzauWn0HMFK3B76i-OFZU1yCN4lrLc_EJouuhaX4Z5mtvJcSaPQ21rQ5IJnK0WYMPfuUEDHZxT8AfxnxTAQ1To81TKjuoHXYf-0ZGG5zD82MV3xCghH2skbNTgTWgCKGnXtquzJezrObQii8wRIJgia17heGcv3u1_lWK7AB_yk2CwJVLV8SsPSWtUN3eP5E5IJgv_-wjC_fb010FSmm"/>
<div className="absolute top-3 left-3 px-3 py-1 bg-surface text-on-surface rounded-full font-label-sm shadow-sm">Category Top</div>
</div>
<div className="p-sm">
<div className="flex justify-between items-start mb-2">
<h4 className="font-headline-md text-headline-md text-on-surface">Vendor of the Month</h4>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-secondary-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<p className="font-body-sm text-on-surface-variant line-clamp-2">Featuring "Urban Living" brand in Home &amp; Decor category.</p>
<div className="mt-md flex justify-between items-center border-t border-outline-variant pt-sm">
<span className="font-label-sm text-error">Paused</span>
<div className="flex gap-2">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden custom-shadow group border border-transparent hover:border-outline-variant transition-all">
<div className="relative h-48 overflow-hidden">
<img alt="Flash Sale" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A high-energy flash sale banner with abstract flowing shapes in vibrant red and white. The design is modern and minimalist, focusing on movement and urgency. The lighting is crisp and commercial, using a bright white background to emphasize the bold red accents, perfectly aligning with the Vendex brand's professional and energetic identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDSWCYSOiY1HYf2iOg9t3qEmetdiQ-cGWKS9rmquSmy8Eo67WV5yL9Nnny6verWFKioi7Qiblgoz-47nHPT7NUaAHIeUGm85vF-uV0Ouz16sZv2HS3vZN-ygEmsNW1Ki7CvO51CnqH0d79mhrWrHn0wwqYVqTdlXvco2rF3fPZja879CN4ioBEhaD6CAlmF2szVJkWX0hokmyAiVMBC8olJI267dMj3t3mZ9dtbYY9M1jy6EaWpm2wpk9umAX0dffLMTdXZSbLeV4T"/>
<div className="absolute top-3 left-3 px-3 py-1 bg-primary text-on-primary rounded-full font-label-sm">Sidebar</div>
</div>
<div className="p-sm">
<div className="flex justify-between items-start mb-2">
<h4 className="font-headline-md text-headline-md text-on-surface">24h Flash Deals</h4>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-secondary-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<p className="font-body-sm text-on-surface-variant line-clamp-2">Urgent 24-hour countdown deals for registered members only.</p>
<div className="mt-md flex justify-between items-center border-t border-outline-variant pt-sm">
<span className="font-label-sm text-secondary">Ends in 08:42:15</span>
<div className="flex gap-2">
<button className="p-2 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
</div>
</div>
</div>
</div>
</div>
</section>
</main>

<div className="hidden fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-md" id="modal-overlay">
<div className="bg-surface rounded-xl w-full max-w-4xl max-h-[921px] overflow-hidden flex flex-col shadow-xl">

<div className="px-lg py-sm border-b border-outline-variant flex justify-between items-center">
<h3 className="font-headline-md text-headline-md text-on-surface">Create New Banner</h3>
<button className="p-2 hover:bg-surface-container rounded-full transition-colors" onclick="document.getElementById('modal-overlay').classList.add('hidden')">
<span className="material-symbols-outlined">close</span>
</button>
</div>

<div className="flex-1 overflow-y-auto p-lg">
<div className="grid grid-cols-1 md:grid-cols-2 gap-xl">

<div className="space-y-sm">
<div>
<label className="block font-label-md text-on-surface mb-2">Banner Title</label>
<input className="w-full bg-white border border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-0 outline-none transition-all" placeholder="e.g. Summer Collection 2024" type="text"/>
</div>
<div>
<label className="block font-label-md text-on-surface mb-2">Placement</label>
<select className="w-full bg-white border border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-0 outline-none transition-all">
<option>Home Hero Carousel</option>
<option>Category Sidebar</option>
<option>Footer Promo</option>
<option>Mobile App Splash</option>
</select>
</div>
<div>
<label className="block font-label-md text-on-surface mb-2">Target URL</label>
<input className="w-full bg-white border border-outline-variant rounded-lg p-3 font-body-md focus:border-primary focus:ring-0 outline-none transition-all" placeholder="https://vendex.com/promo/summer" type="text"/>
</div>
<div>
<label className="block font-label-md text-on-surface mb-2">Upload Asset</label>
<div className="upload-dashed rounded-lg p-xl flex flex-col items-center justify-center bg-primary-container/5 hover:bg-primary-container/10 transition-colors cursor-pointer">
<span className="material-symbols-outlined text-primary text-display-lg mb-2">cloud_upload</span>
<p className="font-label-md text-on-surface">Click to upload or drag &amp; drop</p>
<p className="font-meta text-on-surface-variant">Recommended size: 1920x600px (PNG, JPG)</p>
</div>
</div>
</div>

<div className="space-y-sm">
<label className="block font-label-md text-on-surface">Live Preview</label>
<div className="bg-surface-container rounded-lg aspect-video flex flex-col items-center justify-center relative overflow-hidden">

<div className="text-center p-md">
<span className="material-symbols-outlined text-outline text-display-lg mb-2">image</span>
<p className="font-meta text-on-surface-variant">Asset preview will appear here</p>
</div>

<div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg">
<h5 className="font-headline-md text-on-surface" id="preview-title">Banner Title</h5>
<p className="font-body-sm text-secondary">Placement: Home Hero</p>
</div>
</div>
<div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant">
<h6 className="font-label-sm text-on-surface-variant uppercase mb-2">Scheduling</h6>
<div className="flex gap-4">
<div className="flex-1">
<label className="font-meta text-secondary">Start Date</label>
<input className="w-full bg-white border border-outline-variant rounded p-2 text-sm mt-1" type="date"/>
</div>
<div className="flex-1">
<label className="font-meta text-secondary">End Date</label>
<input className="w-full bg-white border border-outline-variant rounded p-2 text-sm mt-1" type="date"/>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="px-lg py-md border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-md">
<button className="px-lg py-2 border border-outline-variant text-on-surface-variant rounded-lg font-label-md hover:bg-surface-container transition-all" onclick="document.getElementById('modal-overlay').classList.add('hidden')">
                    Cancel
                </button>
<button className="px-lg py-2 bg-primary text-on-primary rounded-lg font-label-md hover:bg-[#96101F] transition-all shadow-sm">
                    Publish Banner
                </button>
</div>
</div>
</div>
    </>
  );
}
