import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderConfirmation() {
  return (
    <>
      <Header />

<main className="flex-grow flex flex-col items-center justify-start py-xl px-gutter max-w-[800px] mx-auto w-full">

<div className="flex flex-col items-center text-center mb-xl">
<div className="success-checkmark-animation bg-primary-container rounded-full p-lg mb-md inline-flex shadow-lg shadow-primary/10">
<span className="material-symbols-outlined text-white text-[64px]" style={{fontVariationSettings: "'FILL' 0, 'wght' 600"}}>check_circle</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Thank you for your order!</h1>
<p className="font-body-lg text-body-lg text-secondary mb-base">Your transaction was successful and your items are being prepared.</p>
<div className="mt-md px-sm py-xs bg-surface-container-high rounded-full">
<span className="font-label-md text-label-md text-on-surface">Order ID: <span className="font-bold">#VX-99281-002</span></span>
</div>
</div>

<section className="w-full space-y-gutter">

<div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30 flex items-center justify-between">
<div className="flex items-center gap-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined">local_shipping</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Estimated Delivery</p>
<p className="font-headline-md text-headline-md text-on-surface">Tuesday, Oct 24th</p>
</div>
</div>
<div className="text-right hidden sm:block">
<p className="font-body-sm text-body-sm text-secondary">Standard Shipping</p>
<p className="font-label-md text-label-md text-on-surface-variant">2-4 Business Days</p>
</div>
</div>

<div className="space-y-sm">
<h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest px-xs">Items Summary</h3>

<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden border border-outline-variant/30">
<div className="bg-surface-container-low px-md py-sm border-b border-outline-variant/20 flex justify-between items-center">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-primary text-[20px]">storefront</span>
<span className="font-label-md text-label-md font-bold">Luxe Audio Hub</span>
</div>
<span className="font-label-sm text-label-sm text-secondary">1 Item</span>
</div>
<div className="p-md flex gap-md items-center">
<img alt="Premium Headphones" className="w-20 h-20 object-cover rounded-lg" data-alt="High-end studio headphones in a sleek matte black finish, resting on a minimalist concrete surface. The lighting is dramatic, high-contrast, with soft red ambient reflections. The background is a clean, dim white architectural space, emphasizing the premium quality and sharp design of the audio equipment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnftOcx-1f9gAlVQweN4zSCC4nhnGlvzPiAp1aQt8OZuSayRIOUOZNPLE3Mv8w-DgLIsePxi6yXvAi8ciaUnI3zhWmmkpnNZIzSsHvZlQeFgk0X0w8v57td8Ts_sn9CNf2AYqlY1HHXLioUcfP6WT2Re4DZbyPOlOQYdscL1dPyle-0FKO9R9hgibJrEmnY82SSgCz3p1YUDam28TiKeE0pHg-koqL0cMOh-WnF_3MIktaQSS2LELLTpvajvdBwu88h9Nn3QjO2jrJ"/>
<div className="flex-grow">
<h4 className="font-body-md text-body-md font-bold text-on-surface">Acoustic Pro-X Wireless Headphones</h4>
<p className="font-body-sm text-body-sm text-secondary">Space Grey • Active Noise Cancelling</p>
<p className="font-body-md text-body-md text-primary font-bold mt-xs">$349.00</p>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden border border-outline-variant/30">
<div className="bg-surface-container-low px-md py-sm border-b border-outline-variant/20 flex justify-between items-center">
<div className="flex items-center gap-xs">
<span className="material-symbols-outlined text-primary text-[20px]">storefront</span>
<span className="font-label-md text-label-md font-bold">Urban Tech Collective</span>
</div>
<span className="font-label-sm text-label-sm text-secondary">2 Items</span>
</div>
<div className="p-md space-y-md">
<div className="flex gap-md items-center">
<img alt="Smart Watch" className="w-20 h-20 object-cover rounded-lg" data-alt="A modern smart watch with a vibrant digital display showing fitness metrics. The watch has a charcoal silicone strap and sits atop a clean glass desk. The scene is illuminated by soft, neutral daylight with deep shadows, following the minimalist corporate aesthetic of the Vendex brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3dKB1Yi9mHhtWBypDIB6TOUId1Vt0DB5pxm-n-OH1YggYv_BRYzRfvI9cv2-oq9cRxQK0-hfREgwR6Bs5T1uISZ3F9gfBVPNKI9U-yNnvHKYoA_B_9LQ70RKkoBmsVZ4BXdUvsj9ojIMqLGSLFAkS5gCX4hwazt-acPqx25ELU4YijAtaUUGCYWBD51jIHAttRE_WKIWcQh--GUa0Os2XgtjzrV6lAQSZhiVC9t6U8if7abC-qzAVYJTmOYS-Bb7szH0fnyxn4z-3"/>
<div className="flex-grow">
<h4 className="font-body-md text-body-md font-bold text-on-surface">Velo-T Fit Smartwatch</h4>
<p className="font-body-sm text-body-sm text-secondary">Midnight • 44mm Case</p>
<p className="font-body-md text-body-md text-primary font-bold mt-xs">$199.00</p>
</div>
</div>
<div className="h-px bg-outline-variant/20"></div>
<div className="flex gap-md items-center">
<img alt="Leather Case" className="w-20 h-20 object-cover rounded-lg" data-alt="A premium top-grain leather phone case in a rich burgundy color. It is positioned on a crisp white surface with a slight reflection. The mood is sophisticated and tactile, emphasizing the texture of the leather. The lighting is soft and even, highlighting the meticulous stitching and premium finish." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYOaFrVKICVlsG5KeW702ppZJ6oFC0ma6epZPdB60mnj3t1vCKERZedgTcxkgIWM2a_NquDqUdFt0qp6V2BLafnWedGI3X_-RmDrqEexIHIYbcQGSYxt0Gv9vxSnUMyYZGuRcStxIR6qeqeigVBuimIWW_ygr6bRwoUYWQRExkPyeuzuKZoexyRRWJjT1uUHzr4hX4KUVBXd5BaUZzBLDXHpPzCJpqYc2rTVI4XULFsmys-IDlDhf0T3Cu8XdE0s1GN6Muah9nzTQ4"/>
<div className="flex-grow">
<h4 className="font-body-md text-body-md font-bold text-on-surface">Signature Leather Case</h4>
<p className="font-body-sm text-body-sm text-secondary">Deep Burgundy • For Pro Max</p>
<p className="font-body-md text-body-md text-primary font-bold mt-xs">$45.00</p>
</div>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30">
<div className="space-y-xs">
<div className="flex justify-between font-body-sm text-body-sm">
<span className="text-secondary">Subtotal</span>
<span className="text-on-surface">$593.00</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm">
<span className="text-secondary">Shipping</span>
<span className="text-on-surface font-medium text-emerald-600">Free</span>
</div>
<div className="flex justify-between font-body-sm text-body-sm">
<span className="text-secondary">Taxes</span>
<span className="text-on-surface">$47.44</span>
</div>
<div className="h-px bg-outline-variant/30 my-sm"></div>
<div className="flex justify-between font-headline-md text-headline-md">
<span className="text-on-surface">Total</span>
<span className="text-primary font-bold">$640.44</span>
</div>
</div>
</div>
</section>

<div className="w-full flex flex-col sm:flex-row gap-sm mt-xl">
<button className="flex-1 bg-primary hover:bg-[#96101F] text-white font-label-md text-label-md py-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-xs cursor-pointer active:opacity-80">
<span className="material-symbols-outlined">track_changes</span>
                Track Order
            </button>
<button className="flex-1 border-2 border-primary text-primary bg-transparent hover:bg-surface-container-low font-label-md text-label-md py-sm rounded-lg transition-all flex items-center justify-center gap-xs cursor-pointer active:opacity-80">
<span className="material-symbols-outlined">shopping_bag</span>
                Continue Shopping
            </button>
</div>
<div className="mt-lg text-center">
<p className="font-body-sm text-body-sm text-secondary">A confirmation email has been sent to <span className="text-on-surface font-medium">user@example.com</span></p>
</div>
</main>

<Footer />
    </>
  );
}
