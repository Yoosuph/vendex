import React from 'react';
import { Link } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';

export default function VendorOnboarding() {
  return (
    <>
      <main className="w-full max-w-[800px] bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">

<div className="px-xl pt-xl pb-lg border-b border-outline-variant">
<div className="flex justify-between relative mb-xs">

<div className="absolute top-[18px] left-0 w-full h-[2px] bg-surface-container-high z-0"></div>

<div className="absolute top-[18px] left-0 h-[2px] bg-primary-container z-0 progress-line" id="progress-bar-fill" style={{width: '25%'}}></div>

<div className="relative z-10 flex flex-col items-center group cursor-pointer" onclick="goToStep(1)">
<div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center transition-all duration-300 ring-4 ring-surface-container-lowest" id="step-dot-1">
<span className="font-label-md text-label-md">1</span>
</div>
<span className="mt-xs font-label-md text-label-md text-primary" id="step-label-1">Store Basics</span>
</div>
<div className="relative z-10 flex flex-col items-center group cursor-pointer" onclick="goToStep(2)">
<div className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all duration-300 ring-4 ring-surface-container-lowest" id="step-dot-2">
<span className="font-label-md text-label-md">2</span>
</div>
<span className="mt-xs font-label-md text-label-md text-secondary" id="step-label-2">Contact</span>
</div>
<div className="relative z-10 flex flex-col items-center group cursor-pointer" onclick="goToStep(3)">
<div className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all duration-300 ring-4 ring-surface-container-lowest" id="step-dot-3">
<span className="font-label-md text-label-md">3</span>
</div>
<span className="mt-xs font-label-md text-label-md text-secondary" id="step-label-3">Verification</span>
</div>
<div className="relative z-10 flex flex-col items-center group cursor-pointer" onclick="goToStep(4)">
<div className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-all duration-300 ring-4 ring-surface-container-lowest" id="step-dot-4">
<span className="font-label-md text-label-md">4</span>
</div>
<span className="mt-xs font-label-md text-label-md text-secondary" id="step-label-4">Payout</span>
</div>
</div>
</div>

<div className="p-xl min-h-[460px]">

<section className="step-transition block" id="step-content-1">
<div className="mb-lg">
<h1 className="font-headline-md text-headline-md text-on-surface mb-base">Store Identity</h1>
<p className="font-body-md text-body-md text-secondary">Let's start with the basics of your marketplace presence.</p>
</div>
<div className="space-y-md">
<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface">Store Name</label>
<input className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-0 focus:border-on-surface text-body-md transition-all" placeholder="e.g. Minimalist Home Decor" type="text"/>
</div>
<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface">Category</label>
<select className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-0 focus:border-on-surface text-body-md transition-all">
<option>Select a category</option>
<option>Fashion &amp; Apparel</option>
<option>Home &amp; Living</option>
<option>Electronics</option>
<option>Art &amp; Collectibles</option>
</select>
</div>
<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface">Store Description</label>
<textarea className="w-full p-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-0 focus:border-on-surface text-body-md transition-all" placeholder="Briefly describe what you'll be selling..." rows="4"></textarea>
</div>
</div>
</section>

<section className="step-transition hidden" id="step-content-2">
<div className="mb-lg">
<h1 className="font-headline-md text-headline-md text-on-surface mb-base">Contact &amp; Location</h1>
<p className="font-body-md text-body-md text-secondary">Where can we reach you and where is your business based?</p>
</div>
<div className="grid grid-cols-2 gap-md">
<div className="flex flex-col gap-base col-span-2">
<label className="font-label-md text-label-md text-on-surface">Business Email</label>
<input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="contact@yourstore.com" type="email"/>
</div>
<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface">Country</label>
<input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="United Kingdom" type="text"/>
</div>
<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface">City</label>
<input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="London" type="text"/>
</div>
<div className="flex flex-col gap-base col-span-2">
<label className="font-label-md text-label-md text-on-surface">Street Address</label>
<input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="123 Business Way" type="text"/>
</div>
</div>
</section>

<section className="step-transition hidden" id="step-content-3">
<div className="mb-lg">
<h1 className="font-headline-md text-headline-md text-on-surface mb-base">Identity Verification</h1>
<p className="font-body-md text-body-md text-secondary">To ensure security, please upload a valid government ID.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-md">

<div className="border-2 border-dashed border-primary-container rounded-xl p-lg flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
<span className="material-symbols-outlined text-primary text-[48px] mb-sm group-hover:scale-110 transition-transform">cloud_upload</span>
<p className="font-label-md text-label-md text-primary text-center">Upload Front of ID</p>
<p className="font-meta text-meta text-secondary mt-base">PNG, JPG up to 10MB</p>
</div>

<div className="border-2 border-dashed border-primary-container rounded-xl p-lg flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
<span className="material-symbols-outlined text-primary text-[48px] mb-sm group-hover:scale-110 transition-transform">cloud_upload</span>
<p className="font-label-md text-label-md text-primary text-center">Upload Back of ID</p>
<p className="font-meta text-meta text-secondary mt-base">PNG, JPG up to 10MB</p>
</div>
<div className="col-span-1 md:col-span-2 p-md bg-surface-container rounded-lg border border-outline-variant flex gap-sm items-start">
<span className="material-symbols-outlined text-secondary">info</span>
<p className="font-body-sm text-body-sm text-secondary">Your data is encrypted and stored securely according to our privacy policy. Verification usually takes 24-48 hours.</p>
</div>
</div>
</section>

<section className="step-transition hidden" id="step-content-4">
<div className="mb-lg">
<h1 className="font-headline-md text-headline-md text-on-surface mb-base">Payout Settings</h1>
<p className="font-body-md text-body-md text-secondary">Configure where you'd like to receive your marketplace earnings.</p>
</div>
<div className="space-y-md">
<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface">Account Holder Name</label>
<input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="John Doe" type="text"/>
</div>
<div className="grid grid-cols-2 gap-md">
<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface">IBAN / Account Number</label>
<input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="GB12 3456 7890..." type="text"/>
</div>
<div className="flex flex-col gap-base">
<label className="font-label-md text-label-md text-on-surface">BIC / Swift Code</label>
<input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="VNDXGB2L" type="text"/>
</div>
</div>
<div className="p-md bg-primary/5 rounded-lg border border-primary/20 flex gap-sm items-center">
<span className="material-symbols-outlined text-primary">verified_user</span>
<p className="font-body-sm text-body-sm text-primary font-medium">Automatic payouts are processed every Friday.</p>
</div>
</div>
</section>
</div>

<div className="px-xl py-lg bg-surface-container-low flex items-center justify-between">
<button className="flex items-center gap-xs font-label-md text-label-md text-secondary hover:text-on-surface transition-colors opacity-50 cursor-not-allowed" disabled="" id="prev-btn" onclick="prevStep()">
<span className="material-symbols-outlined">arrow_back</span>
                Back
            </button>
<div className="flex gap-md">
<button className="font-label-md text-label-md text-secondary hover:text-on-surface transition-colors">Save Draft</button>
<button className="bg-primary-container hover:bg-primary text-on-primary px-xl h-11 rounded-lg font-label-md text-label-md transition-all shadow-sm active:scale-95" id="next-btn" onclick="nextStep()">
                    Continue
                </button>
</div>
</div>
</main>

<div className="fixed top-0 right-0 p-lg pointer-events-none opacity-20">
<span className="font-display-lg text-display-lg text-primary select-none">Vendex.</span>
</div>
    </>
  );
}
