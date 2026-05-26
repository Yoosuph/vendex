import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderDetail() {
  return (
    <>
      <Header />
<div className="max-w-container-max mx-auto flex">

<aside className="hidden md:flex flex-col w-64 h-[calc(100vh-64px)] sticky top-16 border-r border-outline-variant p-md">
<nav className="flex flex-col gap-base">
<div className="flex items-center gap-sm p-sm rounded-lg bg-primary-container text-on-primary-container cursor-pointer">
<span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
<span className="font-label-md text-label-md">My Orders</span>
</div>
<div className="flex items-center gap-sm p-sm rounded-lg hover:bg-surface-container transition-colors cursor-pointer text-secondary">
<span className="material-symbols-outlined" data-icon="favorite">favorite</span>
<span className="font-label-md text-label-md">Wishlist</span>
</div>
<div className="flex items-center gap-sm p-sm rounded-lg hover:bg-surface-container transition-colors cursor-pointer text-secondary">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-md text-label-md">Profile Settings</span>
</div>
<div className="flex items-center gap-sm p-sm rounded-lg hover:bg-surface-container transition-colors cursor-pointer text-secondary">
<span className="material-symbols-outlined" data-icon="location_on">location_on</span>
<span className="font-label-md text-label-md">Saved Addresses</span>
</div>
<div className="flex items-center gap-sm p-sm rounded-lg hover:bg-surface-container transition-colors cursor-pointer text-secondary">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<span className="font-label-md text-label-md">Payment Methods</span>
</div>
<hr className="my-base border-outline-variant"/>
<div className="flex items-center gap-sm p-sm rounded-lg hover:bg-surface-container transition-colors cursor-pointer text-secondary">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
<span className="font-label-md text-label-md">Sign Out</span>
</div>
</nav>
</aside>

<main className="flex-1 p-md md:p-xl bg-surface">

<div className="flex items-center justify-between mb-lg">
<div className="flex items-center gap-sm">
<button className="h-10 w-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-on-surface" data-icon="arrow_back">arrow_back</span>
</button>
<h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Order Details #VX-12345</h1>
</div>
<div className="flex gap-sm">
<button className="px-sm py-xs border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center gap-xs">
<span className="material-symbols-outlined text-[20px]" data-icon="receipt_long">receipt_long</span>
                        Invoice
                    </button>
<button className="px-sm py-xs bg-primary text-white rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center gap-xs">
<span className="material-symbols-outlined text-[20px]" data-icon="help_outline">help_outline</span>
                        Get Help
                    </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl custom-shadow border border-outline-variant overflow-hidden">

<div className="p-md md:p-lg bg-surface-container-low border-b border-outline-variant">
<div className="relative flex items-center justify-between max-w-3xl mx-auto">

<div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-secondary-fixed-dim"></div>
<div className="absolute left-0 top-1/2 -translate-y-1/2 w-3/4 h-[2px] bg-primary-container"></div>

<div className="relative z-10 flex flex-col items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-primary-container text-white flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]" data-icon="check">check</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface font-bold">Confirmed</span>
<span className="font-meta text-meta text-secondary">Oct 24, 09:12 AM</span>
</div>

<div className="relative z-10 flex flex-col items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-primary-container text-white flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]" data-icon="check">check</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface font-bold">Processing</span>
<span className="font-meta text-meta text-secondary">Oct 24, 11:45 AM</span>
</div>

<div className="relative z-10 flex flex-col items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-primary-container text-white flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]" data-icon="local_shipping">local_shipping</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface font-bold">Shipped</span>
<span className="font-meta text-meta text-secondary">Oct 25, 03:20 PM</span>
</div>

<div className="relative z-10 flex flex-col items-center gap-xs">
<div className="h-8 w-8 rounded-full bg-secondary-fixed-dim text-white flex items-center justify-center border-4 border-surface-container-low">
<span className="material-symbols-outlined text-[18px]" data-icon="inventory_2">inventory_2</span>
</div>
<span className="font-label-sm text-label-sm text-secondary">Delivered</span>
<span className="font-meta text-meta text-secondary">Expected Oct 28</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter p-md md:p-lg">

<div className="lg:col-span-2 flex flex-col gap-md">
<h2 className="font-headline-md text-headline-md text-on-surface">Items (2)</h2>

<div className="flex gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant">
<div className="w-24 h-24 rounded-lg bg-surface-container-highest overflow-hidden shrink-0">
<img alt="Product" className="w-full h-full object-cover" data-alt="A high-end, sleek red athletic sneaker positioned against a neutral, minimalist grey background. The lighting is crisp and professional, highlighting the textile textures and architectural lines of the footwear. This image embodies a premium retail product shot with modern lighting and a clean, high-contrast aesthetic that fits the Vendex marketplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdNx5jucRwvaxKb73LxuCY1ACoh8s9K-e5UE1p49mlqcSQ_guOBo-m5mvra6YcxHNDwowswehgYyA4S-FAkep5K2F-GDtTGkSDNv9PHp-D_5COY1cRpUpja9Z90mbAIbTWHD0TYyxBrdXa47qzSICd9_4XmME6YwmQqY2y6s_ys1tChIABteWmp2d2qYs-omd6S4bd6HGCsGno8NzFRnYwTqUfWYyPoWYl6i3XnmAcnayUXypU3Kt4YcfVAyC2p3O-nORlKOXdKDUa"/>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<h3 className="font-label-md text-label-md text-on-surface">Precision Runner X-1</h3>
<p className="font-body-sm text-body-sm text-secondary">Vendor: Velocity Sports Co.</p>
<p className="font-meta text-meta text-secondary mt-base">Size: 10 | Color: Racing Red</p>
</div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface font-bold">$129.00</span>
<span className="font-body-sm text-body-sm text-secondary">Qty: 1</span>
</div>
</div>
</div>

<div className="flex gap-md p-sm rounded-lg hover:bg-surface-container-low transition-colors border border-transparent hover:border-outline-variant">
<div className="w-24 h-24 rounded-lg bg-surface-container-highest overflow-hidden shrink-0">
<img alt="Product" className="w-full h-full object-cover" data-alt="A minimalist white designer watch with a simple face and high-quality leather strap, displayed on a clean surface. The composition uses soft studio lighting and follows a modern corporate aesthetic with high-key whites and subtle grey shadows. The overall mood is sophisticated, reliable, and premium, aligned with a high-trust marketplace brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoS9XXlEFTi-NzDmgQKEX0EkiUdvCOb8HrZ02iMEjqpJ4RN5yrCpyNqsc_MVPAji0K-poqCyOZlR0wz5MqWAv7vtfBqHCaAMwrk454fTmKyB7NiEaHI5NqasCSRG5jnuWME5oMIv7HllukPJ59MnzhTcjG8CHWevveQWiZvIFhs-V8ZFPvyuoMFRXoQ460GAekeDXh__qNLsFq4C1Ua0Pqr3Em312nh64DasEFADv_zcG0CaILM_9JqA5Fn11_elEqw-knmMz56LG1"/>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<h3 className="font-label-md text-label-md text-on-surface">Minimalist Chrono White</h3>
<p className="font-body-sm text-body-sm text-secondary">Vendor: Nordic Timepieces</p>
<p className="font-meta text-meta text-secondary mt-base">Default Edition</p>
</div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface font-bold">$195.00</span>
<span className="font-body-sm text-body-sm text-secondary">Qty: 1</span>
</div>
</div>
</div>

<div className="mt-md p-md bg-secondary-container rounded-lg flex items-center justify-between">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary" data-icon="local_post_office">local_post_office</span>
<div>
<p className="font-label-sm text-label-sm text-secondary">Tracking Number</p>
<p className="font-label-md text-label-md text-on-surface font-bold">VX-TRK-78892011</p>
</div>
</div>
<button className="text-primary font-bold text-label-sm hover:underline">Track Package</button>
</div>
</div>

<div className="flex flex-col gap-lg border-l border-outline-variant pl-gutter">

<section className="flex flex-col gap-md">
<div>
<h4 className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-sm">Shipping Address</h4>
<div className="font-body-sm text-body-sm text-on-surface">
<p className="font-bold">Felix Anderson</p>
<p>1248 North Sky Avenue</p>
<p>Apartment 4B</p>
<p>Chicago, IL 60601</p>
<p>United States</p>
</div>
</div>
<div>
<h4 className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-sm">Billing Address</h4>
<div className="font-body-sm text-body-sm text-on-surface">
<p>Same as shipping</p>
</div>
</div>
</section>

<section>
<h4 className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-sm">Payment Method</h4>
<div className="flex items-center gap-sm p-sm border border-outline-variant rounded-lg">
<div className="w-10 h-6 bg-on-surface-variant rounded flex items-center justify-center">
<span className="text-[10px] text-white font-bold italic">VISA</span>
</div>
<div className="font-body-sm text-body-sm text-on-surface">
<p>Visa ending in 4421</p>
<p className="text-secondary font-meta">Expires 12/26</p>
</div>
</div>
</section>

<section className="bg-surface-container-low p-md rounded-lg">
<h4 className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-md">Order Summary</h4>
<div className="flex flex-col gap-xs">
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span>Subtotal</span>
<span>$324.00</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span>Shipping</span>
<span className="text-primary font-bold">FREE</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm text-on-surface">
<span>Tax</span>
<span>$25.92</span>
</div>
<div className="h-px bg-outline-variant my-base"></div>
<div className="flex justify-between font-headline-md text-headline-md text-primary pt-base">
<span>Total</span>
<span>$349.92</span>
</div>
</div>
</section>
</div>
</div>
</div>

<div className="mt-lg flex flex-col md:flex-row gap-gutter">
<div className="flex-1 p-md rounded-xl bg-surface-container border border-outline-variant flex items-center gap-md custom-shadow-hover transition-all">
<div className="h-12 w-12 rounded-full bg-surface flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="assignment_return">assignment_return</span>
</div>
<div>
<h5 className="font-label-md text-label-md text-on-surface font-bold">Easy Returns</h5>
<p className="font-body-sm text-body-sm text-secondary">Start a return within 30 days of delivery.</p>
</div>
</div>
<div className="flex-1 p-md rounded-xl bg-surface-container border border-outline-variant flex items-center gap-md custom-shadow-hover transition-all">
<div className="h-12 w-12 rounded-full bg-surface flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="star">star</span>
</div>
<div>
<h5 className="font-label-md text-label-md text-on-surface font-bold">Review Your Order</h5>
<p className="font-body-sm text-body-sm text-secondary">Share your feedback on these items.</p>
</div>
</div>
</div>
</main>
</div>

<Footer />

<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center h-16 z-50 px-sm">
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="text-[10px] font-medium">Home</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined" data-icon="search">search</span>
<span className="text-[10px] font-medium">Search</span>
</button>
<button className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" data-icon="shopping_bag" style={{fontVariationSettings: "'FILL' 1"}}>shopping_bag</span>
<span className="text-[10px] font-bold">Orders</span>
</button>
<button className="flex flex-col items-center gap-1 text-secondary">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="text-[10px] font-medium">Profile</span>
</button>
</nav>
    </>
  );
}
