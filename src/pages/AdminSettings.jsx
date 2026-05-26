import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

export default function AdminSettings() {
  return (
    <>
      <AdminSidebar />

<Header />

<main className="ml-64 pt-16 min-h-screen bg-background">
<div className="max-w-container-max mx-auto p-gutter">
<Header />
<div className="flex flex-col md:flex-row gap-lg">

<AdminSidebar />

<div className="flex-1 space-y-lg">

<section className="tab-content bg-white p-lg rounded-xl shadow-sm border border-outline-variant space-y-xl" id="content-general">
<div>
<h3 className="font-headline-md text-headline-md mb-md">General Settings</h3>
<div className="space-y-lg">

<div>
<label className="block font-label-md text-on-surface mb-sm">Platform Brand Logo</label>
<div className="red-dashed-border p-xl flex flex-col items-center justify-center bg-surface-container-low cursor-pointer hover:bg-surface-container-high transition-colors group">
<span className="material-symbols-outlined text-primary text-4xl mb-sm group-hover:scale-110 transition-transform">upload_file</span>
<p className="font-label-md text-primary">Click to upload or drag and drop</p>
<p className="text-meta text-on-surface-variant mt-xs">SVG, PNG, or JPG (max. 2MB)</p>
</div>
</div>

<div className="flex items-center justify-between p-md bg-surface-container-low rounded-lg">
<div>
<p className="font-label-md text-on-surface">Maintenance Mode</p>
<p className="text-meta text-on-surface-variant">Prevent customers from accessing the storefront while you make changes.</p>
</div>
<button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none bg-outline-variant" id="maintenance-toggle">
<span aria-hidden="true" className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 translate-x-0" id="toggle-thumb"></span>
</button>
</div>
</div>
</div>
<div className="flex justify-end border-t border-outline-variant pt-md">
<button className="bg-[#C0152A] hover:bg-[#96101F] text-white px-xl py-sm rounded-lg font-label-md transition-all active:scale-95">Save Changes</button>
</div>
</section>

<section className="tab-content hidden space-y-md" id="content-payment">
<div className="grid grid-cols-1 md:grid-cols-2 gap-md">

<div className="bg-white p-md rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
<div className="flex justify-between items-start mb-md">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-indigo-600">credit_card</span>
</div>
<div>
<h4 className="font-label-md text-on-surface">Stripe Payments</h4>
<span className="text-meta px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Active</span>
</div>
</div>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_vert</span>
</div>
<div className="space-y-sm">
<div className="space-y-xs">
<label className="text-meta font-label-sm text-on-surface-variant">Publishable API Key</label>
<input className="w-full text-body-sm px-sm py-2 rounded-lg border border-outline-variant focus:border-on-surface focus:ring-0" type="password" value="pk_live_************************"/>
</div>
<div className="space-y-xs">
<label className="text-meta font-label-sm text-on-surface-variant">Secret API Key</label>
<input className="w-full text-body-sm px-sm py-2 rounded-lg border border-outline-variant focus:border-on-surface focus:ring-0" type="password" value="sk_live_************************"/>
</div>
</div>
<button className="mt-md w-full bg-[#C0152A] hover:bg-[#96101F] text-white py-sm rounded-lg font-label-md transition-all">Update Stripe</button>
</div>

<div className="bg-white p-md rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
<div className="flex justify-between items-start mb-md">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-blue-600">payments</span>
</div>
<div>
<h4 className="font-label-md text-on-surface">PayPal Checkout</h4>
<span className="text-meta px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">Setup Required</span>
</div>
</div>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_vert</span>
</div>
<div className="space-y-sm">
<div className="space-y-xs">
<label className="text-meta font-label-sm text-on-surface-variant">Client ID</label>
<input className="w-full text-body-sm px-sm py-2 rounded-lg border border-outline-variant focus:border-on-surface focus:ring-0" placeholder="Enter PayPal Client ID" type="text"/>
</div>
<div className="space-y-xs">
<label className="text-meta font-label-sm text-on-surface-variant">Secret Key</label>
<input className="w-full text-body-sm px-sm py-2 rounded-lg border border-outline-variant focus:border-on-surface focus:ring-0" placeholder="Enter PayPal Secret Key" type="password"/>
</div>
</div>
<button className="mt-md w-full bg-[#C0152A] hover:bg-[#96101F] text-white py-sm rounded-lg font-label-md transition-all">Enable PayPal</button>
</div>
</div>
</section>

<section className="tab-content hidden bg-white p-lg rounded-xl shadow-sm border border-outline-variant" id="content-shipping">
<div className="flex flex-col items-center justify-center py-xl text-center">
<span className="material-symbols-outlined text-primary text-5xl mb-md">local_shipping</span>
<h3 className="font-headline-md">Shipping Zones</h3>
<p className="text-on-surface-variant mt-sm">Configure your domestic and international shipping rates here.</p>
<button className="mt-lg bg-[#C0152A] text-white px-lg py-sm rounded-lg font-label-md">Add Shipping Zone</button>
</div>
</section>
<section className="tab-content hidden bg-white p-lg rounded-xl shadow-sm border border-outline-variant" id="content-seo">
<div className="space-y-lg">
<h3 className="font-headline-md">Search Engine Optimization</h3>
<div className="space-y-md">
<div className="space-y-xs">
<label className="font-label-md">Meta Title</label>
<input className="w-full px-sm py-2 border border-outline-variant rounded-lg" type="text" value="Vendex | Modern Multi-vendor Marketplace"/>
</div>
<div className="space-y-xs">
<label className="font-label-md">Meta Description</label>
<textarea className="w-full px-sm py-2 border border-outline-variant rounded-lg" rows="3">Discover the best products from independent vendors around the world. Secure, fast, and curated for quality.</textarea>
</div>
<button className="bg-[#C0152A] text-white px-xl py-sm rounded-lg font-label-md">Save SEO Data</button>
</div>
</div>
</section>
</div>
</div>
</div>
</main>
    </>
  );
}
