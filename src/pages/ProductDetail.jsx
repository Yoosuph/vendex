import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

const PRODUCT = {
  id: 'hybrid-controller-pro',
  name: 'Professional Series Hybrid Controller Pro',
  price: 129.99,
  vendor: 'NexusTech Solutions',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYzv-tUWHNjSH_RY9Vz7qB-7pylM2zxI9HGJoVZDh6rwbrs1DZyPWRaMdu_RSDCMnUxIa1bK1q_EEg45ED5tNtgC2MV6kCHLALCdzXRw0I3EAGf92-uTvjMlrGQCn0ZqNIqpdODt-GgVbkmEgb0gxaluuNsj5OaE5w0xkq1vx5VH0oAbMd65SF_vDGDD10rrgMzPtSL0UsHqv1lCw-Y4UZ14n5K1YsTOV0PhzZ5ll-osUfkmTOPPni2DYPrYx--OzKLDAdZQhDidxA',
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDYzv-tUWHNjSH_RY9Vz7qB-7pylM2zxI9HGJoVZDh6rwbrs1DZyPWRaMdu_RSDCMnUxIa1bK1q_EEg45ED5tNtgC2MV6kCHLALCdzXRw0I3EAGf92-uTvjMlrGQCn0ZqNIqpdODt-GgVbkmEgb0gxaluuNsj5OaE5w0xkq1vx5VH0oAbMd65SF_vDGDD10rrgMzPtSL0UsHqv1lCw-Y4UZ14n5K1YsTOV0PhzZ5ll-osUfkmTOPPni2DYPrYx--OzKLDAdZQhDidxA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDCHQGFRQN4Gl9RjTlOzGic94MMqnjU80hmNJ_1wG6iy7BwQRDCX-ZYKTN5aAr7U88WMEdN2B4FZRowe7qKXrJRkbHrt4GHKiIb3kTWNP4EmJY7qhTj4a4E2WdI40RUhU6eCsIeG5yv6e0utPLfU6aHMr22ZNVAdN5GspNLlkLu--lFSnrdNkOfeBl84ZWwCsLdn5Mau4sPguoBfDRX_3NOQWgPD-0ugmYQoDILd7uCY23evTPCxRaNMQFO-fSCXh3oLc4luansa7OY',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCl2DQT7lv653yF1sg0DfkezFwOuKfA-PdEah-UcHCV9IJbVcKHUpUscOovq8Noqw2RgNP_KQ1rY58_Sdre3k9h10U623NZKVh7dgh9q90DR3UO_RzLx34boHpT1X0_CqxpKrR2nJQiT6dw_lMnGhON678qR69k0SyKXe4EF5TzyrO7n8aBpsQMlg9QFNTJ4fE-PO96ZPTbHgKk0j4lzW6oCE1H8Hgt9FWV1TUbb-KC3yAf_SEMCFi7UvnDoy6V4lNtJ1ld9WulA5ti',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDc5RriRjbA34rwgiU8VioXr911lsmw7X3e-BfcPiZKM0Qy96FraAhzidhurK95Hp7aABsPhXGJgl3dgC2137akDiX4AWi1TCsnjghIl-a7-VgQe8boBxsq3d1NboOGTSb6AnpX7OySSaoe6sD8T3ZJZEVkF3mxuYRaLDM7HnGhWe7yO5Gc3x5JmNu60qZyIbHZklrKKrBJs8gFB6RsqUgBAV_oPyeySRLNJUHQUHVOXqpjbv3rsYkdCC3hMoAqfhHJN8e-VKD9QmuE'
  ]
};

export default function ProductDetail() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(PRODUCT.image);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'specs', 'reviews'
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(PRODUCT, 1);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(PRODUCT, 1);
    navigate('/cart');
  };

  return (
    <>
      <Header />
      <main className="max-w-container-max mx-auto px-gutter py-xl">
        {addedMessage && (
          <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-md py-sm rounded-xl shadow-lg flex items-center gap-xs animate-bounce">
            <span className="material-symbols-outlined">check_circle</span>
            <span>Added to Cart!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-xl items-start">
          {/* Left Column: Image Gallery */}
          <section className="md:col-span-7 flex flex-col gap-md">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant/30">
              <img
                alt="Main Product View"
                className="w-full aspect-square object-cover transition-all duration-300"
                id="main-product-image"
                src={selectedImage}
              />
            </div>
            <div className="flex gap-sm overflow-x-auto pb-2">
              {PRODUCT.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  className={`w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border transition-colors ${
                    selectedImage === imgUrl ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary'
                  }`}
                  onClick={() => setSelectedImage(imgUrl)}
                >
                  <img alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" src={imgUrl} />
                </button>
              ))}
            </div>
          </section>

          {/* Right Column: Product Info */}
          <section className="md:col-span-5 flex flex-col gap-lg">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">{PRODUCT.name}</h1>
              <div className="flex items-center gap-xs font-body-md">
                <span className="text-on-surface-variant">Vendor:</span>
                <Link className="text-primary font-bold hover:underline" to="/vendor/storefront">
                  {PRODUCT.vendor}
                </Link>
                <div className="flex items-center text-primary ml-auto">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]">star_half</span>
                  <span className="ml-1 text-on-surface-variant text-label-md">(124 Reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-end gap-md">
              <span className="text-primary font-bold text-[40px] leading-none">${PRODUCT.price}</span>
              <span className="text-secondary line-through text-body-lg mb-1">$159.00</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-label-sm font-bold mb-1">SAVE 18%</span>
            </div>

            <div className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs p-md bg-white border border-outline-variant rounded-xl shadow-sm">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary">local_shipping</span>
                  <span className="text-body-md font-medium">Estimated Delivery: <span class="text-on-surface">Oct 24 - Oct 27</span></span>
                </div>
                <div className="h-px bg-outline-variant my-1"></div>
                <div className="grid grid-cols-2 gap-md">
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    <span className="text-label-md font-bold text-on-surface-variant">Safe Payment</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    <span className="text-label-md font-bold text-on-surface-variant">Fast Delivery</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-sm">
                <button
                  className="w-full bg-primary-container text-white py-lg rounded-lg font-bold text-headline-md hover:bg-[#96101F] transition-all shadow-sm active:scale-[0.98]"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="w-full border-2 border-primary text-primary py-lg rounded-lg font-bold text-headline-md hover:bg-surface-container-low transition-all active:scale-[0.98]"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>

            <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/50">
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                <span className="font-bold text-on-surface">Vendex Guarantee:</span> This product is verified for multi-vendor quality standards. Includes 1-year manufacturer warranty and 30-day no-hassle returns.
              </p>
            </div>
          </section>
        </div>

        {/* Content Tabs */}
        <section className="mt-xl">
          <div className="border-b border-outline-variant flex gap-xl overflow-x-auto">
            <button
              className={`pb-md text-headline-md whitespace-nowrap transition-all ${
                activeTab === 'description' ? 'border-bottom-2 border-primary text-primary font-bold border-b-2' : 'text-secondary hover:text-primary'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pb-md text-headline-md whitespace-nowrap transition-all ${
                activeTab === 'specs' ? 'border-bottom-2 border-primary text-primary font-bold border-b-2' : 'text-secondary hover:text-primary'
              }`}
              onClick={() => setActiveTab('specs')}
            >
              Specs
            </button>
            <button
              className={`pb-md text-headline-md whitespace-nowrap transition-all ${
                activeTab === 'reviews' ? 'border-bottom-2 border-primary text-primary font-bold border-b-2' : 'text-secondary hover:text-primary'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="py-xl">
            {activeTab === 'description' && (
              <div className="tab-content grid grid-cols-1 md:grid-cols-2 gap-xl" id="content-description">
                <div className="flex flex-col gap-md">
                  <h3 className="text-headline-md">Engineered for Precision</h3>
                  <p className="text-body-lg text-on-surface-variant">
                    The Hybrid Controller Pro represents the pinnacle of multi-vendor engineering, combining tactile response with ultra-low latency. Designed for professionals who demand consistent performance across diverse workflows.
                  </p>
                  <ul className="flex flex-col gap-sm">
                    <li className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                      <span className="text-body-md">Adaptive haptic feedback with vendor-specific profiles.</span>
                    </li>
                    <li className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                      <span className="text-body-md">Precision-milled aluminum chassis for architectural stability.</span>
                    </li>
                    <li className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                      <span className="text-body-md">Universal connectivity via Vendex-Bridge architecture.</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <img
                    alt="Product Lifestyle"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm4QwTpZunDEFqL_bh-15XD4l6C1pnT5W90rPVJVhLG7cXU7xVUmTU1kvMaIqYpcdpW_JTIqHShmYtnm0O_X-rnh2t1LuCTdn41_6u8Ku2KpB_-Rph7BjWq-w4Pto1rhbG6g_0Xkqpq_MrQF8WGlkh6u2pI-S9mVsTfxs27FIPJQ5k5qGDBY1xNQugXjF-KtVPH5fIvrdoLWXFt1raAhMpTrjOvLuRNlDg59dfg3iiDaF5yV71lf12A1cDejUe9syw5KD4ZPUOMHP5"
                  />
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="tab-content flex flex-col gap-md" id="content-specs">
                <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-outline-variant/30">
                        <td className="p-md font-bold text-on-surface bg-surface-container-low w-1/3">Weight</td>
                        <td className="p-md text-on-surface-variant">450g (1.2 lbs)</td>
                      </tr>
                      <tr className="border-b border-outline-variant/30">
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">Dimensions</td>
                        <td className="p-md text-on-surface-variant">15.5 x 10.2 x 6.4 cm</td>
                      </tr>
                      <tr className="border-b border-outline-variant/30">
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">Battery Life</td>
                        <td className="p-md text-on-surface-variant">Up to 40 hours wireless usage</td>
                      </tr>
                      <tr className="border-b border-outline-variant/30">
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">Connectivity</td>
                        <td className="p-md text-on-surface-variant">USB-C, Bluetooth 5.2, 2.4GHz Wireless</td>
                      </tr>
                      <tr>
                        <td className="p-md font-bold text-on-surface bg-surface-container-low">Warranty</td>
                        <td className="p-md text-on-surface-variant">1 Year Worldwide Limited</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-content flex flex-col gap-lg" id="content-reviews">
                <div className="flex flex-col gap-md">
                  <div className="p-md border-b border-outline-variant/30">
                    <div className="flex items-center gap-sm mb-xs">
                      <span className="font-bold text-on-surface">James T.</span>
                      <div className="flex text-primary">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                    </div>
                    <p className="text-body-md text-on-surface-variant italic">"The build quality is exceptional. It feels substantial and the red accents really pop against the minimalist white design of my studio."</p>
                  </div>
                  <div className="p-md border-b border-outline-variant/30">
                    <div className="flex items-center gap-sm mb-xs">
                      <span className="font-bold text-on-surface">Sarah K.</span>
                      <div className="flex text-primary">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]">star</span>
                      </div>
                    </div>
                    <p className="text-body-md text-on-surface-variant italic">"Fast delivery and the safe payment verification gave me peace of mind. Highly recommended for any serious pro."</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
