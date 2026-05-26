import React from 'react';
import { Link } from 'react-router-dom';
import BuyerSidebar from '../components/BuyerSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyOrders() {
  return (
    <>
      <Header />
<div className="max-w-container-max mx-auto flex min-h-[calc(100vh-64px)]">

<BuyerSidebar />

<main className="flex-1 bg-surface-container-low overflow-y-auto">
<div className="p-gutter md:p-xl">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">My Orders</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Manage and track your recent purchases across all vendors.</p>
</div>
</div>

<div className="flex items-center gap-lg border-b border-outline-variant mb-xl overflow-x-auto whitespace-nowrap scrollbar-hide">
<button className="pb-md font-label-md text-label-md text-primary border-b-2 border-primary">All</button>
<button className="pb-md font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">To Pay</button>
<button className="pb-md font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">To Ship</button>
<button className="pb-md font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">To Receive</button>
<button className="pb-md font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Completed</button>
<button className="pb-md font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Cancelled</button>
</div>

<div className="flex flex-col gap-md">

<div className="bg-surface-container-lowest rounded-xl order-card-shadow transition-all overflow-hidden border border-transparent hover:border-outline-variant">
<div className="p-md flex flex-col md:flex-row items-start gap-md">
<div className="w-24 h-24 rounded-lg bg-surface flex-shrink-0 overflow-hidden">
<img alt="Product" className="w-full h-full object-cover" data-alt="A premium red athletic sneaker displayed in a minimalist studio setting with high-key soft lighting. The product is shot from a dynamic side-angle against a clean white background, emphasizing its sleek design and vibrant primary red color. The atmosphere is professional, modern, and aligned with a curated retail marketplace aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6BtCnB1eSWr3e7O5jM5fPrUQTJRPDQJ2l84Z3SJsgDNv185xhOdNzApFg3R54Zpt64iMvwZOjdKD2_3zoiKE4bAxj3F5_3LOTYyM-V_4xBdXF6mUKwV3sz_5M49myUuHm0uzzNBGFNRoDOAws34VaY4dNwb_YwTykN6qpKLNcdpJG2Wr5TIJNX5gU2t50YgUxfwEg_0N5M-wgeocuYFfXNwsbThCLu4D9ELP60ePWgNwykgvb2LDJXK4IbH7DsfjdBi3VMhb_tEN-"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-base">
<h3 className="font-headline-md text-[18px] text-on-surface">Precision Runner X-200</h3>
<div className="flex flex-col items-end">
<span className="px-sm py-1 rounded-full bg-green-100 text-green-700 font-label-sm text-label-sm flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-green-700"></span>
                                            Delivered
                                        </span>
</div>
</div>
<p className="font-body-sm text-body-sm text-secondary mb-xs">Vendor: <span className="text-primary font-medium">Velocity Sports</span></p>
<div className="flex items-center gap-md font-meta text-meta text-on-surface-variant">
<span>Order Date: 12 Oct 2023</span>
<span>•</span>
<span>Order ID: #VNDX-88291</span>
</div>
<div className="mt-md font-headline-md text-headline-md text-on-surface">$129.00</div>
</div>
</div>
<div className="bg-surface-container-low px-md py-sm flex flex-col md:flex-row justify-end gap-sm border-t border-outline-variant">
<button className="px-md py-xs rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-surface transition-all">Write Review</button>
<button className="px-md py-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-[#96101F] transition-all">Reorder</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl order-card-shadow transition-all overflow-hidden border border-transparent hover:border-outline-variant">
<div className="p-md flex flex-col md:flex-row items-start gap-md">
<div className="w-24 h-24 rounded-lg bg-surface flex-shrink-0 overflow-hidden">
<img alt="Product" className="w-full h-full object-cover" data-alt="A modern minimalist white designer watch with a leather strap, photographed in soft ambient lighting. The composition is clean and architectural, utilizing the dim white background to create a premium, tactile feel. The aesthetic is sophisticated and high-end, focusing on efficient product presentation for a multi-vendor dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV-ZTz8dh_yP3v6si2n881Wtn3ITupTN6kVUf16hViTFwhpj0iVy9jOS5OM4ukN3C3Mb6IhcL2IKOT1M0FBqrZKYxAyDBOQZtm75VJ9-fSHL7IPYTGt8W_zzG2FD7Nn63PunMGyGQtEca2SGNsY5UnA5YzbnaVDxOZTY3r_qVO--0xHQdG9fxZDr6DjUO6UnRrPUUqYDJodXqzGxBs8Kl2cBYwj-NVsKaYbiiPsEQtc8HdwgQ74J1ZWV5ObOMDLs4q4OZy9Mq0cBfw"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-base">
<h3 className="font-headline-md text-[18px] text-on-surface">Minimalist Analog Timepiece</h3>
<div className="flex flex-col items-end">
<span className="px-sm py-1 rounded-full bg-amber-100 text-amber-700 font-label-sm text-label-sm flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                                            In Transit
                                        </span>
</div>
</div>
<p className="font-body-sm text-body-sm text-secondary mb-xs">Vendor: <span className="text-primary font-medium">Urban Essentials</span></p>
<div className="flex items-center gap-md font-meta text-meta text-on-surface-variant">
<span>Order Date: 24 Oct 2023</span>
<span>•</span>
<span>Order ID: #VNDX-99102</span>
</div>
<div className="mt-md font-headline-md text-headline-md text-on-surface">$245.50</div>
</div>
</div>
<div className="bg-surface-container-low px-md py-sm flex flex-col md:flex-row justify-end gap-sm border-t border-outline-variant">
<button className="px-md py-xs rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-surface transition-all">Track Order</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl order-card-shadow transition-all overflow-hidden border border-transparent hover:border-outline-variant opacity-80">
<div className="p-md flex flex-col md:flex-row items-start gap-md">
<div className="w-24 h-24 rounded-lg bg-surface flex-shrink-0 overflow-hidden grayscale">
<img alt="Product" className="w-full h-full object-cover" data-alt="A pair of high-fidelity matte black studio headphones shown against a dark, minimalist background with subtle red accent lighting. The image captures a sleek, modern technical aesthetic with sharp details and professional lighting. The mood is authoritative and security-focused, emphasizing the quality and precision of the multi-vendor marketplace products." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqZPk46jo610mM9sr5_riPRycaF5pthyJYDfxNEEC-1PP1ZZ9pd9zKXquqkDrIwvaQJNnbK7WBwsW7VD3XFiy1Y7AivsKxZYl3L5QD0rkQze-ZO6zGWziWWOU3I21lR_r-Yfa34-WXD8gpHJsGW0m3_12O4YSAVfgTQwkTG5OFQ4qhwEIq4jeIJ0hQc9AXTbyY77n4yYI_6uCDPl-yCy6ax7OfjVDjJE4wXDHg5tmdnJ-Xa7mMfSLtAK0szARgf1svogIQAf3kC8kN"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-base">
<h3 className="font-headline-md text-[18px] text-on-surface">Studio Pro Wireless Headphones</h3>
<div className="flex flex-col items-end">
<span className="px-sm py-1 rounded-full bg-red-100 text-red-700 font-label-sm text-label-sm flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-red-700"></span>
                                            Cancelled
                                        </span>
</div>
</div>
<p className="font-body-sm text-body-sm text-secondary mb-xs">Vendor: <span className="text-primary font-medium">Audio Tech Global</span></p>
<div className="flex items-center gap-md font-meta text-meta text-on-surface-variant">
<span>Order Date: 05 Oct 2023</span>
<span>•</span>
<span>Order ID: #VNDX-77123</span>
</div>
<div className="mt-md font-headline-md text-headline-md text-on-surface">$199.00</div>
</div>
</div>
<div className="bg-surface-container-low px-md py-sm flex flex-col md:flex-row justify-end gap-sm border-t border-outline-variant">
<button className="px-md py-xs rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-surface transition-all">Support</button>
<button className="px-md py-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-[#96101F] transition-all">Reorder</button>
</div>
</div>
</div>
</div>

<Footer />
</main>
</div>

<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex items-center justify-around h-16 px-gutter z-50">
<button className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-[10px] font-medium">Overview</span>
</button>
<button className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>shopping_bag</span>
<span className="text-[10px] font-bold">Orders</span>
</button>
<button className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined">favorite</span>
<span className="text-[10px] font-medium">Wishlist</span>
</button>
<button className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined">person</span>
<span className="text-[10px] font-medium">Profile</span>
</button>
</nav>
    </>
  );
}
