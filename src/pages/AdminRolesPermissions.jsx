import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminRolesPermissions() {
  return (
    <>
      <AdminSidebar />

<Header />

<main className="ml-64 pt-16 h-screen overflow-hidden flex flex-col bg-background">
<div className="flex-1 flex overflow-hidden">

<section className="w-80 border-r border-outline-variant bg-surface-container-low p-md flex flex-col overflow-y-auto custom-scrollbar">
<div className="mb-6">
<h2 className="font-headline-md text-on-surface mb-1">User Roles</h2>
<p className="font-body-sm text-on-surface-variant">Select a role to configure permissions</p>
</div>
<div className="space-y-3">

<button className="w-full text-left p-4 rounded-xl bg-white border-2 border-primary shadow-md transition-all group">
<div className="flex justify-between items-start mb-2">
<span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>shield_person</span>
<span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold rounded uppercase tracking-wider">Active</span>
</div>
<h3 className="font-label-md font-bold text-on-surface">Super Admin</h3>
<p className="font-meta text-on-surface-variant mt-1 leading-relaxed">Full system access, including financial settlements and root configs.</p>
</button>

<button className="w-full text-left p-4 rounded-xl bg-white border border-outline-variant hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-2">
<span className="material-symbols-outlined text-secondary">support_agent</span>
</div>
<h3 className="font-label-md font-bold text-on-surface">Support Lead</h3>
<p className="font-meta text-on-surface-variant mt-1 leading-relaxed">Manage customer disputes, refunds, and support ticket escalations.</p>
</button>
<button className="w-full text-left p-4 rounded-xl bg-white border border-outline-variant hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-2">
<span className="material-symbols-outlined text-secondary">inventory_2</span>
</div>
<h3 className="font-label-md font-bold text-on-surface">Vendor Manager</h3>
<p className="font-meta text-on-surface-variant mt-1 leading-relaxed">Onboard new sellers and audit inventory compliance.</p>
</button>
<button className="w-full text-left p-4 rounded-xl bg-white border border-outline-variant hover:border-primary/50 transition-all group">
<div className="flex justify-between items-start mb-2">
<span className="material-symbols-outlined text-secondary">analytics</span>
</div>
<h3 className="font-label-md font-bold text-on-surface">Data Analyst</h3>
<p className="font-meta text-on-surface-variant mt-1 leading-relaxed">Read-only access to sales reports and conversion metrics.</p>
</button>
<button className="w-full text-left p-4 rounded-xl border-2 border-dashed border-outline-variant hover:bg-surface-container transition-all flex flex-col items-center justify-center py-6 group">
<span className="material-symbols-outlined text-outline-variant mb-1 group-hover:text-primary">add_circle</span>
<span className="font-label-sm text-on-surface-variant">Create Custom Role</span>
</button>
</div>
</section>

<section className="flex-1 p-lg overflow-y-auto custom-scrollbar bg-white">
<div className="max-w-4xl mx-auto">
<div className="flex justify-between items-end mb-8">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="text-primary font-bold text-body-sm tracking-widest uppercase">Configuration</span>
</div>
<h2 className="font-headline-lg text-on-surface">Super Admin Permissions</h2>
</div>
<div className="flex gap-3">
<button className="px-4 py-2 text-primary font-label-md hover:bg-primary-fixed rounded-lg transition-all">Select All</button>
<button className="px-4 py-2 text-secondary font-label-md hover:bg-secondary-container rounded-lg transition-all">Clear All</button>
</div>
</div>

<div className="space-y-12">

<div>
<h3 className="font-label-md font-bold text-on-surface-variant mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">terminal</span>
                                CORE PLATFORM ACCESS
                            </h3>
<div className="grid grid-cols-1 gap-px bg-outline-variant border border-outline-variant rounded-xl overflow-hidden shadow-sm">

<div className="bg-white p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div>
<p className="font-label-md text-on-surface">System Architecture Access</p>
<p className="font-meta text-on-surface-variant">Modify global environment variables and CDN settings</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only toggle-switch" type="checkbox"/>
<div className="w-10 h-5 bg-outline-variant rounded-full transition-colors toggle-bg flex items-center px-0.5">
<div className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform toggle-dot"></div>
</div>
</label>
</div>

<div className="bg-white p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div>
<p className="font-label-md text-on-surface">Security Audit Logs</p>
<p className="font-meta text-on-surface-variant">View and export system-wide security event logs</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only toggle-switch" type="checkbox"/>
<div className="w-10 h-5 bg-outline-variant rounded-full transition-colors toggle-bg flex items-center px-0.5">
<div className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform toggle-dot"></div>
</div>
</label>
</div>
</div>
</div>

<div>
<h3 className="font-label-md font-bold text-on-surface-variant mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">account_balance</span>
                                FINANCIAL OPERATIONS
                            </h3>
<div className="grid grid-cols-1 gap-px bg-outline-variant border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="bg-white p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div>
<p className="font-label-md text-on-surface">Gateway Management</p>
<p className="font-meta text-on-surface-variant">Toggle payment methods and configure Stripe/PayPal API keys</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only toggle-switch" type="checkbox"/>
<div className="w-10 h-5 bg-outline-variant rounded-full transition-colors toggle-bg flex items-center px-0.5">
<div className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform toggle-dot"></div>
</div>
</label>
</div>
<div className="bg-white p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div>
<p className="font-label-md text-on-surface">Commission Rules</p>
<p className="font-meta text-on-surface-variant">Define percentage cuts for marketplace categories</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only toggle-switch" type="checkbox"/>
<div className="w-10 h-5 bg-outline-variant rounded-full transition-colors toggle-bg flex items-center px-0.5">
<div className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform toggle-dot"></div>
</div>
</label>
</div>
<div className="bg-white p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div>
<p className="font-label-md text-on-surface">Refund Override</p>
<p className="font-meta text-on-surface-variant">Bypass standard refund policy for manual corrections</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only toggle-switch" type="checkbox"/>
<div className="w-10 h-5 bg-outline-variant rounded-full transition-colors toggle-bg flex items-center px-0.5">
<div className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform toggle-dot"></div>
</div>
</label>
</div>
</div>
</div>

<div>
<h3 className="font-label-md font-bold text-on-surface-variant mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">campaign</span>
                                COMMUNICATIONS &amp; CRM
                            </h3>
<div className="grid grid-cols-1 gap-px bg-outline-variant border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="bg-white p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div>
<p className="font-label-md text-on-surface">Bulk Notification Blast</p>
<p className="font-meta text-on-surface-variant">Send push notifications to all vendors and customers</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only toggle-switch" type="checkbox"/>
<div className="w-10 h-5 bg-outline-variant rounded-full transition-colors toggle-bg flex items-center px-0.5">
<div className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform toggle-dot"></div>
</div>
</label>
</div>
<div className="bg-white p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div>
<p className="font-label-md text-on-surface">Marketing Automation</p>
<p className="font-meta text-on-surface-variant">Configure email triggers for abandoned carts</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only toggle-switch" type="checkbox"/>
<div className="w-10 h-5 bg-outline-variant rounded-full transition-colors toggle-bg flex items-center px-0.5">
<div className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform toggle-dot"></div>
</div>
</label>
</div>
</div>
</div>
</div>
<div className="h-40"></div> 
</div>
</section>
</div>

<Footer />
</main>
    </>
  );
}
