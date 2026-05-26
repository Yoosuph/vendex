import React from 'react';
import { Link } from 'react-router-dom';
import VendorSidebar from '../components/VendorSidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function VendorStorefront() {
  return (
    <>
      <nav className="w-full sticky top-0 z-50 shadow-sm bg-surface dark:bg-surface-dim">
<div className="max-w-container-max mx-auto px-gutter flex items-center justify-between h-16">
<div className="flex items-center gap-md">
<span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Vendex</span>
<div className="hidden md:flex items-center bg-surface-container px-sm py-xs rounded-lg border border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant mr-xs">search</span>
<input className="bg-transparent border-none focus:ring-0 text-body-sm w-64" placeholder="Search in this store..." type="text"/>
</div>
</div>
<div className="flex items-center gap-md">
<div className="hidden md:flex items-center gap-sm">
<span className="text-on-surface-variant font-medium cursor-pointer hover:text-primary-container transition-colors">Categories</span>
<span className="text-on-surface-variant font-medium cursor-pointer hover:text-primary-container transition-colors">Deals</span>
</div>
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary cursor-pointer active:opacity-80" data-icon="notifications">notifications</span>
<span className="material-symbols-outlined text-primary cursor-pointer active:opacity-80" data-icon="shopping_cart">shopping_cart</span>
<div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
<img alt="User Avatar" data-alt="A professional headshot of a modern user for a high-end marketplace interface. The lighting is soft and studio-quality, emphasizing a friendly yet professional demeanor. The background is a clean, neutral grey that complements the minimalist aesthetic of the Vendex platform. The overall mood is approachable and trustworthy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuATUXNbMzU1lS_Gv-9ZE4jiSeu9BAx6Ska41tQuk8ZX82QchvDSz12pEvXi2ejZcibMn1EIRRqvYgBm89Zv6jKqBxj77XjGPZFbw9arMZouxlfn8U29z8Up3rsbT_8md32_ukwjvh8EY7VxY-0p1ycia-JbTJJERiP40Yw4haGMZBvacTmnF3NVkvaPQHDnBdvZnDKZalZyK2ben-YuhM4eo0GnV9POuDbtle4rLqUe3Q80n4OazZE95-OcGMTdyUCtKJjuYYT9o3ZL"/>
</div>
</div>
</div>
</div>
</nav>

<Header />

<nav className="w-full bg-white shadow-sm sticky top-16 z-40">
<div className="max-w-container-max mx-auto px-gutter flex gap-lg">
<button className="py-md text-primary font-bold border-b-2 border-primary cursor-pointer font-label-md">Products</button>
<button className="py-md text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer font-label-md">About</button>
<button className="py-md text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer font-label-md">Reviews (482)</button>
<button className="py-md text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer font-label-md">Policies</button>
</div>
</nav>
<main className="max-w-container-max mx-auto px-gutter py-lg">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<VendorSidebar />

<section className="md:col-span-9">
<div className="flex justify-between items-center mb-md">
<h2 className="font-headline-md text-headline-md">All Products (84)</h2>
<div className="flex gap-sm">
<select className="bg-white border-outline-variant rounded-lg text-body-sm px-md py-xs focus:border-primary focus:ring-primary">
<option>Newest First</option>
<option>Price: Low to High</option>
<option>Price: High to Low</option>
</select>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">

<div className="bg-white rounded-xl overflow-hidden product-card-shadow flex flex-col group">
<div className="relative aspect-square overflow-hidden bg-surface-container">
<img alt="Studio Headphones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="High-end professional studio headphones resting on a minimalist concrete surface. The lighting is dramatic and focused, highlighting the metallic accents and leather textures of the product. The scene is shot in a high-key light mode style with a neutral grey and white background that makes the rich textures pop. Perfect for a premium electronics marketplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3yFYyTzOHPc8TN650PdZyNdhHzZ7Kz8LNTY-vYW1E1kQcKDA36zoWQePMBxm-PGtq1KJGPyQ3az0-Wvq6XHAymWCnoQ2jT8w3fOQH0Bld1rIDaucWGfzfnS_omX53-hUZNZsmUoltUuxXgwu9y3y03I6reve5EAy97D_5omtjDMdrechVSoxreAtIi1eCEEM5-eIsvpWLBIFGTrtIxBnheNvN88j1UNQpkLF-MvAASD000PzPN4GiAG4Vf4Bv-IV2_qo_LEUksOCp"/>
<span className="absolute top-sm right-sm bg-white/90 backdrop-blur-md px-xs py-1 rounded text-meta font-bold text-primary">BEST SELLER</span>
</div>
<div className="p-sm flex-grow">
<p className="text-meta text-on-surface-variant mb-xs">Headphones</p>
<h3 className="font-label-md text-on-surface mb-xs group-hover:text-primary transition-colors">Artisan X1 Studio Reference</h3>
<div className="flex items-center gap-xs mb-md">
<span className="material-symbols-outlined text-[14px] text-primary" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="text-meta font-bold">4.9</span>
<span className="text-meta text-on-surface-variant">(128)</span>
</div>
<div className="flex justify-between items-end">
<span className="font-headline-md text-on-surface">$299.00</span>
<button className="p-xs bg-surface-container rounded-full hover:bg-primary hover:text-white transition-all">
<span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
</button>
</div>
</div>
</div>

<div className="bg-white rounded-xl overflow-hidden product-card-shadow flex flex-col group">
<div className="relative aspect-square overflow-hidden bg-surface-container">
<img alt="Mechanical Keyboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A premium custom mechanical keyboard featuring brushed aluminum housing and minimalist white keycaps. The photograph uses shallow depth of field to focus on the intricate craftsmanship of the switches. The lighting is soft and airy, creating a clean light-mode aesthetic against a pale wood desk background. Professional and sleek for a high-trust vendor store." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq0TxexgmDB-3Dx_7fJmTwKnJ9RKDXNrI5DrwDJ8gMbSShvq_ee8Q868MA-wc2DmXD6fS2oRLQC-AbEiKgY0fLvZj7pxOWvOGLiki5U5F7exwoWWl-rR-cmkArFiRbhSvuH4ZvQGRzhcqMXYnPUDPjrqI_3hvIms448OfnFdZ23tADPyP_zYCmT6v6r058R6IVA2ncrT1PgEIyqb9-wbG7pb9LTu6HyHAaarbPJWWPJfC0okZzPsoFjRlwiJk0qJI6a0PWLf3o24zL"/>
</div>
<div className="p-sm flex-grow">
<p className="text-meta text-on-surface-variant mb-xs">Keyboards</p>
<h3 className="font-label-md text-on-surface mb-xs group-hover:text-primary transition-colors">Tactile Pro 75% Mechanical</h3>
<div className="flex items-center gap-xs mb-md">
<span className="material-symbols-outlined text-[14px] text-primary" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="text-meta font-bold">4.8</span>
<span className="text-meta text-on-surface-variant">(64)</span>
</div>
<div className="flex justify-between items-end">
<span className="font-headline-md text-on-surface">$185.00</span>
<button className="p-xs bg-surface-container rounded-full hover:bg-primary hover:text-white transition-all">
<span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
</button>
</div>
</div>
</div>

<div className="bg-white rounded-xl overflow-hidden product-card-shadow flex flex-col group">
<div className="relative aspect-square overflow-hidden bg-surface-container">
<img alt="Webcam" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A professional-grade 4K webcam with a large glass lens and a sleek matte finish. The product is shown mounted on a modern monitor edge. The lighting emphasizes the precision of the optics and the refined build quality. The background is a blurred office interior, maintaining a bright and professional tone for the Vendex platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBox6eRFChI16ZMQ585X1xSoVPOSoiw-eQTzeRzafIfgfmvgJW6Sp4YIRMgKdkWU36BZuJGCO_uK2oCIKZovtqjNuQM7ijRfhRUQJfxk4wqaC05I8U1C8b2wUw-xZ2cAKZnixzCcIqS45XX_QsHjRt9No_4h56KoCcW7XChyJ0FdtLXq0Y3AwWExn2RfavK8hITdDC1y23T7kCnXzOcKN_vYu4l5TnLaCqo1ZhpcfCjW-Jl8N-OLJ6xiFJkdwR9kS_ij-bXJIuDeHSJ"/>
</div>
<div className="p-sm flex-grow">
<p className="text-meta text-on-surface-variant mb-xs">Peripherals</p>
<h3 className="font-label-md text-on-surface mb-xs group-hover:text-primary transition-colors">Vista 4K Streamer Cam</h3>
<div className="flex items-center gap-xs mb-md">
<span className="material-symbols-outlined text-[14px] text-primary" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="text-meta font-bold">4.7</span>
<span className="text-meta text-on-surface-variant">(92)</span>
</div>
<div className="flex justify-between items-end">
<span className="font-headline-md text-on-surface">$149.00</span>
<button className="p-xs bg-surface-container rounded-full hover:bg-primary hover:text-white transition-all">
<span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
</button>
</div>
</div>
</div>

<div className="bg-white rounded-xl overflow-hidden product-card-shadow flex flex-col group">
<div className="relative aspect-square overflow-hidden bg-surface-container">
<img alt="Earbuds" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="High-fidelity wireless earbuds displayed in their open charging case. The case and earbuds are finished in a sophisticated matte white with silver accents. The lighting is clean and sharp, highlighting the ergonomic design. Set against a soft-focus architectural background, reinforcing a sense of premium quality and modern lifestyle." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSVc7AKriLAT6_N-9PL2MucP14dwlDpXD-uxFco86JiY9yLIY9pgP14uhpyR0vo4HK-GXzggkli6m0UdskkY79-W_gNQ0y2Utio8tFl2CMyou33Zo_edlcXLnM_A2T30QxMhFm3c5_ZEcrYQc0vztmig7gwIdpKdhWaSzwwFBEh678xMKDnNgCGsulYD_5vBSHokmipAZwyVfP8e4ZAtwGCbTBpavm7jBrVebsKH3HLyL-VxP_qNuEBUGvvvFVDIkLHcO0Y_5Bu9K8"/>
</div>
<div className="p-sm flex-grow">
<p className="text-meta text-on-surface-variant mb-xs">Audio</p>
<h3 className="font-label-md text-on-surface mb-xs group-hover:text-primary transition-colors">Sonic Air ANC Buds</h3>
<div className="flex items-center gap-xs mb-md">
<span className="material-symbols-outlined text-[14px] text-primary" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="text-meta font-bold">4.9</span>
<span className="text-meta text-on-surface-variant">(215)</span>
</div>
<div className="flex justify-between items-end">
<span className="font-headline-md text-on-surface">$129.00</span>
<button className="p-xs bg-surface-container rounded-full hover:bg-primary hover:text-white transition-all">
<span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
</button>
</div>
</div>
</div>
</div>

<div className="mt-xl flex justify-center items-center gap-sm">
<button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-white transition-colors disabled:opacity-50" disabled="">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-lg font-bold">1</button>
<button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-white transition-colors">2</button>
<button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-white transition-colors">3</button>
<span className="text-on-surface-variant px-xs">...</span>
<button className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-lg hover:bg-white transition-colors">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</section>
</div>
</main>

<Footer />
    </>
  );
}
