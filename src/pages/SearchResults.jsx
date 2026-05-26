import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SearchResults() {
  return (
    <>
      <Header />
<main className="max-w-container-max mx-auto px-gutter py-lg flex flex-col md:flex-row gap-gutter">

<aside className="w-full md:w-64 flex-shrink-0 space-y-xl">

<section>
<h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary mb-md">Categories</h3>
<ul className="space-y-base">
<li><Link className="flex items-center justify-between font-body-sm text-body-sm text-primary font-bold" to="#">Electronics <span className="material-symbols-outlined text-sm">chevron_right</span></Link></li>
<li><Link className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="#">Fashion</Link></li>
<li><Link className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="#">Home &amp; Living</Link></li>
<li><Link className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="#">Beauty</Link></li>
<li><Link className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" to="#">Sports</Link></li>
</ul>
</section>

<section>
<h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary mb-md">Price Range</h3>
<div className="px-base">
<input className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer" max="5000" min="0" step="50" type="range"/>
<div className="flex justify-between mt-sm text-meta font-meta text-on-surface-variant">
<span>$0</span>
<span>$5,000+</span>
</div>
<div className="mt-md flex items-center gap-xs">
<input className="w-full bg-white border border-outline-variant rounded px-2 py-1 text-body-sm font-body-sm" type="text" value="0"/>
<span className="text-on-surface-variant">-</span>
<input className="w-full bg-white border border-outline-variant rounded px-2 py-1 text-body-sm font-body-sm" type="text" value="1200"/>
</div>
</div>
</section>

<section>
<h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary mb-md">Brand</h3>
<div className="space-y-sm">
<label className="flex items-center gap-sm cursor-pointer group">
<input checked="" className="w-4 h-4 rounded border-outline-variant focus:ring-0" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Apple</span>
</label>
<label className="flex items-center gap-sm cursor-pointer group">
<input className="w-4 h-4 rounded border-outline-variant focus:ring-0" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Samsung</span>
</label>
<label className="flex items-center gap-sm cursor-pointer group">
<input className="w-4 h-4 rounded border-outline-variant focus:ring-0" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Sony</span>
</label>
<label className="flex items-center gap-sm cursor-pointer group">
<input className="w-4 h-4 rounded border-outline-variant focus:ring-0" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">Logitech</span>
</label>
</div>
</section>
</aside>

<div className="flex-1">

<Header />

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">

<article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
<div className="aspect-square bg-surface-container-low relative overflow-hidden">
<img alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A premium, sleek silver smartphone resting on a reflective white surface with a minimalist, high-key studio background. The lighting is soft and diffused, highlighting the industrial design and metallic textures of the device. The aesthetic is clean and modern, following a high-end corporate retail style with a dominant palette of white and subtle grey tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3GAsQ0JRXxNGp_ZdjDTB5ZQeLq3yQbxxtLFMx2uzyu7M2b531Ty0I1TtQYoFIjdModhGyehCf_xuZIDpzI_JXyjxNTBKSm8KO-uT8Qv8U9Z4OPtPjwUsVmJVmOP2tPmq3sj-1GkGGwuPk3J93a_gMDvEqCp7f7LD8B1YdIGg_y4JeC53B9o9fu-COczewD5xApGT0-RJFXVSJgZ7jJV85iXMBo55pivqgjetwyXXlEfIKVJ-Zn8AY8lygMfahSXWXOzTVkInRTP9p"/>
<span className="absolute top-3 right-3 bg-primary-container text-white px-2 py-1 rounded text-meta font-bold">New</span>
</div>
<div className="p-4 flex flex-col gap-xs">
<Link className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" to="#">Apple Official Store</Link>
<h2 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">iPhone 15 Pro Max - 256GB</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base">star_half</span>
<span className="text-on-surface-variant text-meta font-meta ml-1">(428)</span>
</div>
<div className="flex items-center justify-between mt-sm">
<span className="font-headline-md text-headline-md text-on-surface">$1,199.00</span>
<button className="bg-primary-container text-white p-2 rounded-lg hover:bg-[#96101F] transition-colors shadow-sm active:scale-95">
<span className="material-symbols-outlined">shopping_cart</span>
</button>
</div>
</div>
</article>

<article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
<div className="aspect-square bg-surface-container-low relative overflow-hidden">
<img alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Professional over-ear noise-cancelling headphones in a matte black finish, positioned at an angle against a clean, dim-white architectural backdrop. The image uses sharp focus and high contrast to emphasize the tactile material quality and ergonomic curves. The overall mood is sophisticated and tech-forward, featuring a palette of charcoal black and soft ivory whites." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKK39hqb5K4zyYjLU2S3gYVlO5WUj6Vvi3H0OeJjt_KOJo1pF0XSDmNh7jkEdTko4MqEHwF306z-YuuGnixyAzzNV5l3TOg1RHfUcrs9XI4q6Nnv5EYZV46bHtXWNEUwEhx9D2diMXB1cPTMH1RA0wZfqwi4yVb_4CZb3b0e09yk1mFBRGJxpqfdZZKLDBFlQ6TR1g9xdNpId7f7dB2YNHRhtFEKDFTGPAbfIGukQDGbn_8oBQ2wmocd3l2Jc_AEIq4bHH8d49u_26"/>
</div>
<div className="p-4 flex flex-col gap-xs">
<Link className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" to="#">Sony Audio Pro</Link>
<h2 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">Sony WH-1000XM5 Wireless</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="text-on-surface-variant text-meta font-meta ml-1">(1.2k)</span>
</div>
<div className="flex items-center justify-between mt-sm">
<span className="font-headline-md text-headline-md text-on-surface">$348.00</span>
<button className="bg-primary-container text-white p-2 rounded-lg hover:bg-[#96101F] transition-colors shadow-sm active:scale-95">
<span className="material-symbols-outlined">shopping_cart</span>
</button>
</div>
</div>
</article>

<article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
<div className="aspect-square bg-surface-container-low relative overflow-hidden">
<img alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A modern, minimalist mechanical keyboard with high-quality white keycaps and subtle red accents, displayed on a clean grey desk mat. The perspective is a shallow depth-of-field close-up that highlights the texture of the plastic and the precision of the assembly. Bright, natural lighting gives the scene an airy, efficient, and professional workspace vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_DLASLbSBfv0UpWm4pbEkMfWuON2bY_AiC64wKp_AhlP2J49YCXwEBjSi8dTsHrD3J-YS3kp5a0YQOxTBICNmc8cSJJe4tcg4U7ZY53kX6_8FAVEJlhvMa17Il5mHGqnEbHgjq2nBW96APHwlIBLnQ-QkUcb2D_voGBxom_ycQtE9FWwmh6_NN4pUXTVe4pWpIk8Tc15gna52LEysp1RUpU1OzLYnPJuEpZevEVA-c5zVmsYQpqMPj0my9fzotpymilCObCW3HAF-"/>
<span className="absolute top-3 left-3 bg-secondary text-white px-2 py-1 rounded text-meta font-bold">-15%</span>
</div>
<div className="p-4 flex flex-col gap-xs">
<Link className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" to="#">Logi Tech Hub</Link>
<h2 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">MX Mechanical Keyboard Mini</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base">star_outline</span>
<span className="text-on-surface-variant text-meta font-meta ml-1">(89)</span>
</div>
<div className="flex items-center justify-between mt-sm">
<span className="font-headline-md text-headline-md text-on-surface">$149.99</span>
<button className="bg-primary-container text-white p-2 rounded-lg hover:bg-[#96101F] transition-colors shadow-sm active:scale-95">
<span className="material-symbols-outlined">shopping_cart</span>
</button>
</div>
</div>
</article>

<article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
<div className="aspect-square bg-surface-container-low relative overflow-hidden">
<img alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="An ultra-slim, silver laptop open to show a vibrant, colorful abstract wallpaper, positioned on a white marble surface. The lighting is crisp and cool, creating a sense of clarity and performance. The composition is clean and focused, reflecting a premium corporate aesthetic with metallic highlights and a pristine atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcxvVhRp3kQ5WjwkCIwZKLVzqTKQn1isNLM9z1Q6hQUEnn38Mjz8rH9XOgEGXi68_hvJt4Z0hoWz2INrtY-k4dhSvj5Z4aG1d2ePFqrBeTYd4PptMjRTCeImCXTB-ynK1JyRdTrmAHLC7R14jbdxoeR8VhXfnKeHiHdofSrgqHqM39e_yumYnG-ZHwjEm7D6IPbCqm6pm6N5U3_PmDSQ4T4EvU7R2nG_eGpL3UXguqkIL_iwBGZ4Ib9brkhd1gZnmsksbX1JfNBNj5"/>
</div>
<div className="p-4 flex flex-col gap-xs">
<Link className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" to="#">Samsung Store</Link>
<h2 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">Galaxy Book3 Pro 360</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="text-on-surface-variant text-meta font-meta ml-1">(56)</span>
</div>
<div className="flex items-center justify-between mt-sm">
<span className="font-headline-md text-headline-md text-on-surface">$1,399.00</span>
<button className="bg-primary-container text-white p-2 rounded-lg hover:bg-[#96101F] transition-colors shadow-sm active:scale-95">
<span className="material-symbols-outlined">shopping_cart</span>
</button>
</div>
</div>
</article>


<article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
<div className="aspect-square bg-surface-container-low relative overflow-hidden">
<img alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A sleek black smartwatch with a minimalist digital interface, shown close-up in a brightly lit, sterile modern environment. The focus is on the screen and the smooth curve of the band. The lighting creates subtle reflections on the glass surface, maintaining a professional and technologically advanced feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd61xNCUKOWCh0QPAWnqfd_lxKvcYlyO-k83DCsaNyARZeV9drYQSFp19s5a-DNKGYl3wMhWS6Oqu_y3JNoGihKfnQ1IpMNalqvfHGSqyuhYnypSxgFD0fzfeuvkpFlQOhrGNT9w53NcaO8yTW5nFFY71TU0bUexuAV9MpDgABgLtcVJZm9lrkoFLCzArh_mQkeuUfx_UJCXOcupWt3gqRkIKqQlJXrkh6yXK6yIKIUfBxaJer6SlsHcubByEI3MwIpxzjLwftEpoZ"/>
</div>
<div className="p-4 flex flex-col gap-xs">
<Link className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" to="#">Apple Official Store</Link>
<h2 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">Apple Watch Series 9</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base">star</span>
<span className="text-on-surface-variant text-meta font-meta ml-1">(890)</span>
</div>
<div className="flex items-center justify-between mt-sm">
<span className="font-headline-md text-headline-md text-on-surface">$399.00</span>
<button className="bg-primary-container text-white p-2 rounded-lg hover:bg-[#96101F] transition-colors shadow-sm active:scale-95">
<span className="material-symbols-outlined">shopping_cart</span>
</button>
</div>
</div>
</article>

<article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
<div className="aspect-square bg-surface-container-low relative overflow-hidden">
<img alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A high-resolution mirrorless camera with a large lens, set against a blurred studio background. The camera is charcoal grey with metallic dials, illuminated by a soft rim light that emphasizes its professional build quality. The aesthetic is focused, authoritative, and clean." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeWLPF7gAmxaZziyEm_jYvhe9rGJQcZafeQl6GMOlEy92wh9x2Rb0cFYS1lVCDOunrbXGnmfaDtKvxjhmdzuzcQN3oAOS3kEY_yutkEkLxlE41uTtBQlrm8sAxXfxkxOK7dmqGU70Y8IiY_RgLD_GtJYN2Qr58ABuemRXDgxXUdgR1CqHKfeN10PSzQe-ZEjeht2ON0Zgxjt8Qso-4Q1oXlqLeZAMa0DKXcx1RDMOA0nvt5pU4H5uOM1K21lfWr9646TwRr35DnoHy"/>
</div>
<div className="p-4 flex flex-col gap-xs">
<Link className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" to="#">Sony Camera Center</Link>
<h2 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">Sony Alpha a7 IV Mirrorless</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base">star</span>
<span className="text-on-surface-variant text-meta font-meta ml-1">(245)</span>
</div>
<div className="flex items-center justify-between mt-sm">
<span className="font-headline-md text-headline-md text-on-surface">$2,498.00</span>
<button className="bg-primary-container text-white p-2 rounded-lg hover:bg-[#96101F] transition-colors shadow-sm active:scale-95">
<span className="material-symbols-outlined">shopping_cart</span>
</button>
</div>
</div>
</article>

<article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
<div className="aspect-square bg-surface-container-low relative overflow-hidden">
<img alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A pair of minimalist white true wireless earbuds and their charging case, positioned on a clean frosted glass surface. Soft lighting from above creates gentle shadows and highlights the smooth, ergonomic form. The palette is dominated by pure whites and subtle greys for a serene retail look." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN9SraTI6nLQjKJ2nMudRGXAtL7jI6b6n4kPDbpq4xAisOD57pD04wGC1Sq72lewPFc46C1ksQj7SwUzcbkCHAC-MNXQqmTUf-hcjyhXm-gqZgPIVfedlinak0-VG9hUSdWCG7jZCbmi7XSJ6riYka6wS3xa_QyUzaK2tWFwHqIltCRWN1XUvnz3Tx3uztoEqxGFeGAmnubX2M3D_6PIApq1PvzB_swX596Y5QyOjGC8wvJLaEjBDA7flmiVaddSYnWY0FiVoRBrDE"/>
</div>
<div className="p-4 flex flex-col gap-xs">
<Link className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" to="#">Sennheiser Audio</Link>
<h2 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">Momentum True Wireless 3</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base">star_half</span>
<span className="text-on-surface-variant text-meta font-meta ml-1">(312)</span>
</div>
<div className="flex items-center justify-between mt-sm">
<span className="font-headline-md text-headline-md text-on-surface">$199.95</span>
<button className="bg-primary-container text-white p-2 rounded-lg hover:bg-[#96101F] transition-colors shadow-sm active:scale-95">
<span className="material-symbols-outlined">shopping_cart</span>
</button>
</div>
</div>
</article>

<article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
<div className="aspect-square bg-surface-container-low relative overflow-hidden">
<img alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A powerful gaming laptop with a backlit RGB keyboard in soft blue tones, set in a darkened, high-tech room with minimalist aesthetics. The screen displays a high-resolution landscape. The image focuses on the sharp edges and the glowing lights of the hardware, creating a mood of high performance and immersive quality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSAWn6D1uIzChhy0_aAO-3NZ6bRspYOjfOZSxYCIu3_2FP222oUKehLxl0QDR8x10pNSl8aELe6DTgjmYfK1OIf6O4bqv1QxAZocrRNhhXKpUfoZXp7-Bo8KasssxtPud5NOlegQ5lqiaMbEGCY2shUIE-rHn2is198Q9A-htSYP7-xpCDihowKbvjhNedUbgLwD22qefCQPfvuDFouWbR7xOKEPL2VOvW8OjBUP_U1ml-EL7xbC7LvKUjCKch30DAcvEHHwyOccT8"/>
<span className="absolute top-3 left-3 bg-primary-container text-white px-2 py-1 rounded text-meta font-bold">Sold Out</span>
</div>
<div className="p-4 flex flex-col gap-xs">
<Link className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" to="#">Razer Store</Link>
<h2 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">Razer Blade 16 Gaming Laptop</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="text-on-surface-variant text-meta font-meta ml-1">(18)</span>
</div>
<div className="flex items-center justify-between mt-sm">
<span className="font-headline-md text-headline-md text-on-surface">$2,699.99</span>
<button className="bg-surface-container text-on-surface-variant p-2 rounded-lg cursor-not-allowed opacity-50">
<span className="material-symbols-outlined">shopping_cart</span>
</button>
</div>
</div>
</article>
</div>

<Footer />
</div>
</main>

<Footer />
    </>
  );
}
