import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

const STORES = [
  {
    name: "Aurum Collective",
    rating: "4.9",
    reviews: "1.2k",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOQagrNf8wLacGtEiTsjIA1R63IhTHRCGuununomFyLT03U1cwNUIqSZsONRxsJ39gzZ0-KfRAtJvamrc6VtDb9-RFkatG87t5OiuqzRvOk9WvjZ2HwtwJXXJnu0gsGeKzsUe0tLclQLYBhf7HF5S5DesYuvnYs8ab0RLiiIJ78rbFkV7Ik4urRVpDyb3N1-hegYZvA4CeWt6kUe_Cp5e1zbCg01EHM9_Gx9F1P84509sgaGKv4lnqwCJ_VaXKqRMOwts1yZwwqpxC"
  },
  {
    name: "Nexus Tech",
    rating: "4.8",
    reviews: "850",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlyMURukI5iInHfHmxc3ld6YgEl3EUyLirOBKDqip8wraRmXTYJgi3sYgqUaVG3tY-PFUXUd63abbWYKZRMnRNOgX0ZANdaTy6WMpMV_eMLPiaytraVNWQSHEvaXdKaIWggfGJGYgFO5lcwvl_mcAyH7_8kToUoxfVT3jMkGsqqngOTu7IHtL6D3fGDo1aVRdE4qP22MUBL-O4-EQQpG_nbpVpNsYQG1xWzYiRMV1lXieU9wXff-Brgf0WagW61Jl0h0nUZqk5EbyL"
  },
  {
    name: "Elementa",
    rating: "5.0",
    reviews: "430",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYBUEHb4Wy9FJgBf-djLB1e2I7ny6gT2S4l2B3T5gzDcYDGlvftgVFjYLwfGKLahJPMcKL00TXEfjzEgrgxxF_7OBOtiYicJl0_0_Wr1Xyy3PvSS5-fYQZDOX0KU5plv2kFs_e7DpJDq0anZqeN6PstGwVGLJTLQWO77JnUmufK1VSczMo8_wVFWCZ5xl3LKFmkiSbXfaXERbZDUkKVnDGhqdiBsPzkRK_kbDk7CJ1Ip1cNZGZknFI7zhh0L-nEbry-DbayQcb-RTk"
  },
  {
    name: "Vogue Minimal",
    rating: "4.7",
    reviews: "2.4k",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJzizAjqkWsOVfk54M_bfyIYDUJ50nOuaoHN0t4IWumFu9jUzmC0JcYopl8_cSHVFXRFdbvv_Vzjz-tAQqQzvsvh3XXtoIQfcu_Yg6eQhjqZfy-8d6G2SI0gafIW3bIvjac516btDFCrqZFxb4TB_Z3ErvxxwkxiN1VZlf-I4LN7VfrPI8Eej0LdKpN6abaajTurYxa65ciSt1Plau9VvTxM_Ebqs-WWegqS5yM2m5dhYmG8xzPkw_BtF_1FOzNOmyFVV615xZEEry"
  }
];

const TRENDING_PRODUCTS = [
  {
    id: "p1",
    name: "Horizon Smartwatch Gen 4",
    price: 299.00,
    vendor: "Nexus Tech",
    reviews: 128,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsIgaOJk1ZKiwsjyfauHOQxO7DTZT2RT9Ww5SKhaKjtd-ty8hXyXF6QFjQXUhNg1Jtg_BJCBfMr7E2pXIlET31oaR0mWPLUY9LGLG6Tgf_gL9Lajzf4_S6h4258Ugr2vf6CmFINfKhyUNYSeWVCaDvk-Qf-BFgst-ppMpu0l7RpvrQ38Ni8wFCfmr8U2ZYZFBdhpsaO1Yj2N6iEAq75juyQj7vQtpXvNaGy58uLnptf7SQ3yGgclojrKmioyU3EuZEVGoQ-Pdip44S"
  },
  {
    id: "p2",
    name: "Studio Pro ANC Wireless",
    price: 449.00,
    vendor: "Nexus Tech",
    reviews: 245,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBliE1PaoYv17I_Gh971gp-KGKldsJAuIcrseUbmJv8oiQNesLKe8mwz4ueu4EJigY_oDcfWtR6ul9AakipobZFv7OTgAU--WJpgh8he9IQq57CDD1taQFAQjQWdo5xnvdDLU0z3GCqPNEchKpbDyzfPJv59sD5HK0m3i3JC9CfyK-Jlc-KbvamAmWaX2yy-792Hhb2VqlxbW-vZEjGYLW5m3Fob7al2o-rIvVwJRs7TSEgnPhut6mBF8aa4m1jsRVz9oLhPncfduEm"
  },
  {
    id: "p3",
    name: "Terraform Leather Boots",
    price: 185.00,
    vendor: "Vogue Minimal",
    reviews: 82,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCepxAPUA0kVC8EKnRYyzaQtkYga-j_9CB4SFsrdvHM8NTqhtyy_TAQZAMGO-V9CmnE3jSv2zXVhDSZUiBPziczNUjazfBnowF3OjBawX4YIVKKbXxO_uX8MnX18YdWFDPwzGSBbaGYUxj1N-vs8FVWZnFrm5qKYpsg0V9Ty70Dj6mBEE9FhRG8lNXSttk1FcU4_lOosDdoPXhsn2g1l_f8lq383tyj9UMQuV5rGPZ1ubofDSTG0A0SOMj8jdU5nBeZybSvDc0Qj4o1"
  },
  {
    id: "p4",
    name: "Velocity Run '24 Red",
    price: 120.00,
    vendor: "Aurum Collective",
    reviews: 512,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO2D5TWdNIMnYsFxy5Kg-RCMDhHZ04Eu3BR8FkSpvTvKNNWMeorZQqp5cWpfr7fwe-jS01d24MPLzdPRSK-iz3jJvGClQVBftElkXW846SlwiFQfZDQmipbQ6AEZqW5X-JEpzuL4hz_Spw0_4-UJL8-Fwh9aB84Gk2Nz1VDbNQUDGdSOoLeoMtY8-6hzFLNagnD5q76UNUo_n-Z0k0t3lv_1eiLLMSNbqjbfsD0sLC-QTRBIWCGiboXfQHARgfppVxik-VZPQHbvvH"
  }
];

export default function Home() {
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setSuccessMessage(`Added "${product.name}" to cart!`);
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  return (
    <>
      <Header />
      
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-md py-sm rounded-xl shadow-lg flex items-center gap-xs animate-bounce">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{successMessage}</span>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden py-xl md:py-24">
          <div className="max-w-container-max mx-auto px-gutter relative z-10 flex flex-col items-center text-center md:items-start md:text-left">
            <span className="bg-white/10 text-white px-4 py-1 rounded-full text-label-md font-label-md mb-6 backdrop-blur-md">
              The New Standard of Commerce
            </span>
            <h1 className="text-white font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-4 max-w-3xl">
              Premium Shopping,<br />Redefined
            </h1>
            <p className="text-white/80 font-body-lg text-body-lg mb-10 max-w-xl">
              Experience a curated marketplace where high-end aesthetics meet surgical precision. Quality without compromise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/search')} className="bg-white text-primary-container px-8 py-4 rounded-lg font-bold text-body-md hover:bg-surface-container transition-all active:scale-95 shadow-lg">
                Shop Now
              </button>
              <button onClick={() => navigate('/search?category=Bespoke%20Tech')} className="border border-white/30 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-body-md hover:bg-white/10 transition-all active:scale-95">
                Explore Collections
              </button>
            </div>
          </div>
          {/* Abstract background shape */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none translate-x-1/4">
            <svg className="w-full h-full" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <path d="M400 0H0V400H400V0Z" fill="white"></path>
              <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="40"></circle>
            </svg>
          </div>
        </section>

        {/* Category Chips Section */}
        <section className="bg-surface-container-low py-sm border-b border-outline-variant/30">
          <div className="max-w-container-max mx-auto px-gutter flex items-center gap-sm overflow-x-auto hide-scrollbar">
            <button onClick={() => navigate('/search')} className="whitespace-nowrap px-6 py-2 rounded-full bg-primary-container text-white font-label-md text-label-md transition-all">
              All Categories
            </button>
            <button onClick={() => navigate('/search?category=Luxury%20Goods')} className="whitespace-nowrap px-6 py-2 rounded-full bg-white text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-all border border-outline-variant/20 shadow-sm">
              Luxury Goods
            </button>
            <button onClick={() => navigate('/search?category=Bespoke%20Tech')} className="whitespace-nowrap px-6 py-2 rounded-full bg-white text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-all border border-outline-variant/20 shadow-sm">
              Bespoke Tech
            </button>
            <button onClick={() => navigate('/search?category=Home%20Studio')} className="whitespace-nowrap px-6 py-2 rounded-full bg-white text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-all border border-outline-variant/20 shadow-sm">
              Home Studio
            </button>
            <button onClick={() => navigate('/search?category=Wellness%20%26%20Ritual')} className="whitespace-nowrap px-6 py-2 rounded-full bg-white text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-all border border-outline-variant/20 shadow-sm">
              Wellness &amp; Ritual
            </button>
          </div>
        </section>

        {/* Top Stores Carousel */}
        <section className="py-xl bg-background">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex justify-between items-end mb-lg">
              <div>
                <h2 class="font-headline-lg text-headline-lg text-on-background mb-2">Top Stores</h2>
                <p class="text-on-surface-variant font-body-md text-body-md">Discover the most trusted vendors this month.</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
            <div className="flex gap-gutter overflow-x-auto hide-scrollbar pb-gutter">
              {STORES.map((store) => (
                <div key={store.name} className="flex-shrink-0 w-72 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all p-6 text-center group">
                  <div className="w-20 h-20 mx-auto bg-surface-container-low rounded-full mb-4 overflow-hidden border-2 border-outline-variant/10 group-hover:border-primary transition-colors">
                    <img alt="Vendor" className="w-full h-full object-cover" src={store.avatar} />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{store.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-6">
                    <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-body-sm font-bold text-on-surface">{store.rating}</span>
                    <span className="text-body-sm text-on-surface-variant">({store.reviews})</span>
                  </div>
                  <Link to="/vendor/storefront" className="w-full py-2 bg-primary-container text-white rounded-lg font-label-md text-label-md hover:bg-primary transition-colors block text-center">
                    Visit Store
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products Grid */}
        <section className="py-xl bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="mb-lg">
              <h2 className="font-headline-lg text-headline-lg text-on-background">Trending Products</h2>
              <p className="text-on-surface-variant font-body-md text-body-md">The most sought-after items across all our vendors.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {TRENDING_PRODUCTS.map((product) => {
                const isWished = wishlist.some(item => item.id === product.id);
                return (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] group hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-square bg-surface-container-high overflow-hidden relative">
                      <Link to="/product/hybrid-controller-pro">
                        <img alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.image} />
                      </Link>
                      <button
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toggleWishlist(product)}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${isWished ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontVariationSettings: isWished ? "'FILL' 1" : "'FILL' 0" }}>
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="p-4">
                      <Link className="text-primary font-label-md text-label-md block mb-1" to="/vendor/storefront">
                        {product.vendor}
                      </Link>
                      <Link to="/product/hybrid-controller-pro">
                        <h3 className="font-headline-md text-headline-md text-[18px] text-on-surface mb-1 truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-3">
                        <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px] text-outline-variant" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-meta font-meta text-on-surface-variant ml-1">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="font-bold text-on-background text-headline-md">${product.price.toFixed(2)}</span>
                        <button
                          className="bg-primary-container text-white p-2 rounded-lg hover:bg-primary transition-colors flex items-center justify-center"
                          onClick={() => handleAddToCart(product)}
                        >
                          <span className="material-symbols-outlined">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-lg text-center">
              <button onClick={() => navigate('/search')} className="px-8 py-3 border border-primary text-primary rounded-lg font-bold text-body-md hover:bg-surface transition-all">
                View All Trending Items
              </button>
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="max-w-container-max mx-auto px-gutter py-xl">
          <div className="bg-surface-container-high rounded-2xl overflow-hidden flex flex-col md:flex-row items-center relative">
            <div className="p-lg md:p-xl flex-1 text-center md:text-left z-10">
              <h2 className="font-display-lg text-display-lg text-primary-container mb-4">Unmatched Quality. Verified Vendors.</h2>
              <p className="text-on-surface-variant font-body-lg text-body-lg mb-8 max-w-lg">Every store on Vendex undergoes a rigorous vetting process to ensure you receive only the finest products with world-class support.</p>
              <button onClick={() => navigate('/vendor/onboarding')} className="bg-primary-container text-white px-8 py-4 rounded-lg font-bold text-body-md hover:bg-primary transition-all">
                Become a Vendor
              </button>
            </div>
            <div className="flex-1 w-full h-64 md:h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5"></div>
              <img alt="Promo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSzjLENOhHx_5CeBqPXG-Cbfr9uRqT_rkGZWd2FFfSwYZqiUa-RB2nfWXosW2n51xkJHoU8fn7SoZVjfkK9aSKQQSRWyrfYKBbGRW6sPkE907vqT9B2rZYwfmO0syjXIx5U9kg2K29EWsYIjiAxasiiQ7iSgbHr1M640gCXEauMG7ieemUk5xDiY72DwJ_Dne_v_jqAiXUxSHiJtLMzCMXgGn-MGe9UwC1Q5Z8yMmlrZS1jvwsjDE-a-OBlTWderxxvem70GpV5j6Q" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
