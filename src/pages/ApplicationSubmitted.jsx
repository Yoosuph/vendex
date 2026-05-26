import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ApplicationSubmitted() {
  return (
    <>
      <Header />

<main className="flex-grow flex items-center justify-center px-gutter py-xl">
<div className="max-w-[600px] w-full bg-surface-container-lowest rounded-xl p-xl success-card-shadow text-center relative overflow-hidden">

<div className="absolute top-0 left-0 w-full h-1 bg-primary-container"></div>

<div className="mb-lg inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-fixed">
<span className="material-symbols-outlined text-[64px] text-primary-container micro-bounce" data-icon="verified" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>

<h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Store submitted for review</h1>
<p className="font-body-lg text-body-lg text-secondary mb-xl max-w-[420px] mx-auto">
                Our team is reviewing your application. Expected approval time: <span className="font-bold text-on-surface">24-48 hours</span>
</p>

<div className="flex items-center justify-between gap-base mb-xl px-xl">
<div className="flex-1 h-1 rounded-full bg-primary-container"></div>
<div className="flex-1 h-1 rounded-full bg-primary-container"></div>
<div className="flex-1 h-1 rounded-full bg-primary-container"></div>
<div className="flex-1 h-1 rounded-full bg-surface-variant"></div>
</div>

<div className="flex flex-col sm:flex-row items-center justify-center gap-md">
<button className="w-full sm:w-auto px-xl py-md bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg hover:bg-[#96101F] transition-all active:scale-95">
                    Go to Dashboard
                </button>
<button className="w-full sm:w-auto px-xl py-md border border-outline-variant text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container-low transition-all">
                    View Submission
                </button>
</div>

<div className="mt-xl pt-lg border-t border-outline-variant">
<p className="font-meta text-meta text-secondary">
                    Need immediate assistance? <Link className="text-primary font-medium hover:underline" to="#">Contact Vendor Support</Link>
</p>
</div>
</div>
</main>

<section className="max-w-container-max mx-auto px-gutter pb-xl w-full">
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="bg-surface-container-lowest p-md rounded-xl success-card-shadow flex items-start gap-md">
<div className="p-xs bg-primary-fixed rounded-lg">
<span className="material-symbols-outlined text-primary-container" data-icon="inventory_2">inventory_2</span>
</div>
<div>
<h3 className="font-label-md text-label-md text-on-surface mb-base">Inventory Setup</h3>
<p className="font-body-sm text-body-sm text-secondary">You can start uploading your product catalog while you wait for approval.</p>
</div>
</div>

<div className="bg-surface-container-lowest p-md rounded-xl success-card-shadow flex items-start gap-md">
<div className="p-xs bg-primary-fixed rounded-lg">
<span className="material-symbols-outlined text-primary-container" data-icon="payments">payments</span>
</div>
<div>
<h3 className="font-label-md text-label-md text-on-surface mb-base">Payout Settings</h3>
<p className="font-body-sm text-body-sm text-secondary">Link your bank account to ensure seamless transactions once live.</p>
</div>
</div>

<div className="bg-surface-container-lowest p-md rounded-xl success-card-shadow flex items-start gap-md">
<div className="p-xs bg-primary-fixed rounded-lg">
<span className="material-symbols-outlined text-primary-container" data-icon="school">school</span>
</div>
<div>
<h3 className="font-label-md text-label-md text-on-surface mb-base">Seller Guide</h3>
<p className="font-body-sm text-body-sm text-secondary">Learn the best practices for selling on Vendex to boost your visibility.</p>
</div>
</div>
</div>
</section>

<Footer />
    </>
  );
}
