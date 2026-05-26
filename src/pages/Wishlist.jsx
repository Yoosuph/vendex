import React from 'react';
import { Link } from 'react-router-dom';
import BuyerSidebar from '../components/BuyerSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Wishlist() {
  return (
    <>
      <Header />
<div className="max-w-container-max mx-auto flex min-h-[calc(100vh-64px)]">

<BuyerSidebar />

<main className="flex-1 bg-surface-container-low p-md lg:p-xl">
<div className="max-w-6xl mx-auto">
<Header />

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="bg-surface-container-lowest rounded-xl custom-shadow custom-shadow-hover overflow-hidden transition-all group flex flex-col h-full">
<div className="relative aspect-square overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A pair of premium, matte black over-ear headphones resting on a minimalist white stone surface. The lighting is soft but directed, creating subtle shadows and emphasizing the sleek, architectural curves of the product. The color palette is strictly monochrome with high-contrast clarity, reflecting a high-end corporate retail aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmj1x4_wJLE8adt92YSI2xVzLP1JmWQqjdSmR7HwGAskd5hYB_Ejsd6CV8D_7ozfcEPsGE5LLN32Eo0GXi-5ZgcTtUKnIRg4ARugUsamQmw4T3pMNrwYKX-yf40FVorRsTwmtlZvP2fHZVlV2UeRMSZ9aKxSnGwjJTQvOEZ3baze26tO_abAuwhNxd879zUsN5_QJ82YaXQ1StEpXULTHNhKMOkHIjvt9uWUTEFvy_ereGvntRM4R2OQG6Ae15joa_E6FufMbvmQ_r"/>
<button className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm text-primary transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="favorite" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
</button>
</div>
<div className="p-sm flex flex-col flex-1">
<span className="text-secondary font-meta text-meta uppercase tracking-wider mb-base">SonicPro Audio</span>
<h3 className="font-body-md text-body-md text-on-surface font-semibold mb-xs line-clamp-1">Elite Wireless Headphones</h3>
<div className="mt-auto pt-sm">
<div className="font-headline-md text-headline-md text-primary mb-md">$299.00</div>
<button className="w-full bg-primary-container text-on-primary font-label-md py-2.5 rounded-lg hover:bg-[#96101F] transition-colors active:opacity-80 flex items-center justify-center gap-xs">
<span className="material-symbols-outlined text-sm" data-icon="add_shopping_cart">add_shopping_cart</span>
                                    Add to Cart
                                </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl custom-shadow custom-shadow-hover overflow-hidden transition-all group flex flex-col h-full">
<div className="relative aspect-square overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A high-end designer wristwatch with a white dial and silver metallic band, positioned centrally on a textured white pedestal. The surrounding environment is bright and airy with diffuse lighting that makes the metallic surfaces sparkle. The overall mood is sophisticated and authoritative, perfect for a curated vendor marketplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkPo1qmxIr0H1-I49nH394ogEjgfZZF2kq6voJgQJ084hqwVFFP9zxDYed_WJH-uKGMjAP8zo-cZSHLs2NJmFRw_hlVxk7K4jpzTv6YOaTJcYtcwdDj3cvV0EUkXbbd1kZM6essjwlBfQHb9cUE_TGSomipTcX727LowjGoDtKS-_krcw91jFll68vj7dtxBlADWI5P2QRdm1EatEamvXYw_AvmEcHQrSShklY-GFuxRjjjLOEus_xaIe1e5txRK6XK04sCzbbIw3n"/>
<button className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm text-primary transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="favorite" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
</button>
</div>
<div className="p-sm flex flex-col flex-1">
<span className="text-secondary font-meta text-meta uppercase tracking-wider mb-base">Chronos Luxe</span>
<h3 className="font-body-md text-body-md text-on-surface font-semibold mb-xs line-clamp-1">Minimalist Silver Watch</h3>
<div className="mt-auto pt-sm">
<div className="font-headline-md text-headline-md text-primary mb-md">$185.00</div>
<button className="w-full bg-primary-container text-on-primary font-label-md py-2.5 rounded-lg hover:bg-[#96101F] transition-colors active:opacity-80 flex items-center justify-center gap-xs">
<span className="material-symbols-outlined text-sm" data-icon="add_shopping_cart">add_shopping_cart</span>
                                    Add to Cart
                                </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl custom-shadow custom-shadow-hover overflow-hidden transition-all group flex flex-col h-full">
<div className="relative aspect-square overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Vibrant red performance running shoes displayed in a dynamic, slightly angled composition on a clean light grey background. The lighting is sharp, emphasizing the texture of the mesh and the bold red color that pops against the neutral setting. The style is energetic and commercial, evoking efficiency and curated quality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBooKqqkjEpvKH4Zfwf32VDw0Eg_H-ds68IBgbuWHrU7nrqMv43e61vz8o2lJeUOJnaIHYsHaBxo4Q_VU-BHEKwYaji_lZtr7zldjc8WTqwlC2-IIh2Dw05IZrDgTqf7xUJkUlwfP-iMewV-BBTgEljdwuGSm8Fa42DZKi5T22Fys3f0MJJX7p0JAamtfF5Plvj4Tls9oU4yOhBniY9Npi-sBCw1UGFf_DK5_PhrbAXgfOQXDS3jKiEUalU6L0vgFIyzOTm4cGjw1Z_"/>
<button className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm text-primary transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="favorite" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
</button>
</div>
<div className="p-sm flex flex-col flex-1">
<span className="text-secondary font-meta text-meta uppercase tracking-wider mb-base">AeroSport</span>
<h3 className="font-body-md text-body-md text-on-surface font-semibold mb-xs line-clamp-1">Nitro Speed Trainers</h3>
<div className="mt-auto pt-sm">
<div className="font-headline-md text-headline-md text-primary mb-md">$120.00</div>
<button className="w-full bg-primary-container text-on-primary font-label-md py-2.5 rounded-lg hover:bg-[#96101F] transition-colors active:opacity-80 flex items-center justify-center gap-xs">
<span className="material-symbols-outlined text-sm" data-icon="add_shopping_cart">add_shopping_cart</span>
                                    Add to Cart
                                </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl custom-shadow custom-shadow-hover overflow-hidden transition-all group flex flex-col h-full">
<div className="relative aspect-square overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A vintage-style instant camera in a sleek, off-white finish, centered in a minimalist studio setup. The background is a dim white color that reduces eye strain while making the product's details stand out. Soft ambient lighting creates a gentle 'lifted' depth effect on the camera's surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYPwnUpYdyT8zi87tvIhKE5Fj29uPNNW6O9t4QjaZqZbMr5ZXcx5538DP5BNa5QIztB6TWT_HelC3afmCLslNN0rp1EFmImMi0KoSRK-nxqwF5277eGJn9HuWPtDJQWayVZwEw2gfD-3CAzSyEeNeEBbJonHlQarwUfrAX0JYPDFLKUIuratcEJara7E0FfYaljFrvIjaLu4qmhpScnfKy-AEiGFdVBZn1koT7ftfM8Ss7e1H24EBccHdkShYhD_kauob4CwVVi7v5"/>
<button className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm text-primary transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="favorite" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
</button>
</div>
<div className="p-sm flex flex-col flex-1">
<span className="text-secondary font-meta text-meta uppercase tracking-wider mb-base">Optic Retro</span>
<h3 className="font-body-md text-body-md text-on-surface font-semibold mb-xs line-clamp-1">InstaView Analog Camera</h3>
<div className="mt-auto pt-sm">
<div className="font-headline-md text-headline-md text-primary mb-md">$95.00</div>
<button className="w-full bg-primary-container text-on-primary font-label-md py-2.5 rounded-lg hover:bg-[#96101F] transition-colors active:opacity-80 flex items-center justify-center gap-xs">
<span className="material-symbols-outlined text-sm" data-icon="add_shopping_cart">add_shopping_cart</span>
                                    Add to Cart
                                </button>
</div>
</div>
</div>

</div>

<section className="mt-xl">
<h2 className="font-headline-md text-headline-md text-on-surface mb-lg">Recently Viewed Items</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter opacity-80 hover:opacity-100 transition-opacity">

<div className="bg-surface-container-lowest rounded-xl custom-shadow border border-outline-variant/30 overflow-hidden group flex flex-col h-full">
<div className="relative aspect-square overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover" data-alt="A premium leather artisan backpack in deep mahogany, placed against a minimalist light-colored wall. The scene is illuminated by crisp, white daylight, showcasing the high-quality stitching and tactile texture of the leather. The mood is professional and authoritative, evoking a premium retail experience." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8TvhZSnGrFLYeHVefCS3LD5uqitUS_K0zwmGZQR6IP4HHYUO-fZSMF_9FPRDqM08mKHtaio8Ox7G_bQ9JrGZgoUqo1V7sPUv7ttaP-UvQu8SCRaxMBp-oh-xQzKfES312-ZKWRlHCyOUfqVhpjvcYOHQJvdb4JCNKYV8Dpm7YC0K4UMqq8ECkDuCs4LpqGmXf9VvYA0rtffMyZF38jPYv3qiWwyiy9lRaAjfygTitPO_FuEyGGKyLU2Pk6KiHXTMxMRK4RQgrBetv"/>
<button className="absolute top-3 right-3 w-8 h-8 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm text-secondary hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="favorite">favorite</span>
</button>
</div>
<div className="p-sm flex flex-col flex-1">
<span className="text-secondary font-meta text-meta uppercase tracking-wider mb-base">Nomad Goods</span>
<h3 className="font-body-md text-body-md text-on-surface font-semibold mb-xs line-clamp-1">Artisan Leather Pack</h3>
<div className="mt-auto pt-sm">
<div className="font-headline-md text-headline-md text-primary mb-md">$240.00</div>
<button className="w-full border border-primary text-primary font-label-md py-2.5 rounded-lg hover:bg-surface-container-low transition-colors active:opacity-80">
                                        View Details
                                    </button>
</div>
</div>
</div>

</div>
</section>
</div>
</main>
</div>

<Footer />

<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-outline-variant z-50 flex items-center justify-around h-16">
<Link className="flex flex-col items-center gap-base text-secondary" to="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="text-[10px] font-medium">Home</span>
</Link>
<Link className="flex flex-col items-center gap-base text-secondary" to="#">
<span className="material-symbols-outlined" data-icon="search">search</span>
<span className="text-[10px] font-medium">Search</span>
</Link>
<Link className="flex flex-col items-center gap-base text-primary" to="#">
<span className="material-symbols-outlined" data-icon="favorite" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
<span className="text-[10px] font-bold">Wishlist</span>
</Link>
<Link className="flex flex-col items-center gap-base text-secondary" to="#">
<span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
<span className="text-[10px] font-medium">Cart</span>
</Link>
<Link className="flex flex-col items-center gap-base text-secondary" to="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="text-[10px] font-medium">Account</span>
</Link>
</nav>
    </>
  );
}
