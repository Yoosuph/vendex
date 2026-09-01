import React, { useContext, useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from "@/shared/context/CartContext";
import { useToast } from '@/shared/context/ToastContext';
import Button from '@/shared/components/Button';
import ProductCard from '@/shared/components/ProductCard';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

import { ProductGridSkeleton } from '@/shared/components/SkeletonLoader';
import LiveSearchPlate from '@/shared/components/LiveSearchPlate';

export default function Home() {
  const { products, loading: isLoading } = useContext(MarketplaceContext);
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [heroSearchOpen, setHeroSearchOpen] = useState(false);
  const navigate = useNavigate();
  const storeCarouselRef = useRef(null);

  // Derive stores from products (group by vendor)
  const stores = useMemo(() => {
    if (!products || products.length === 0) return [];
    const vendorMap = {};
    products.forEach((p) => {
      if (!vendorMap[p.vendor]) {
        vendorMap[p.vendor] = {
          name: p.vendor,
          vendorId: p.vendorId,
          products: [],
          totalRating: 0,
          totalReviews: 0,
        };
      }
      vendorMap[p.vendor].products.push(p);
      vendorMap[p.vendor].totalRating += p.rating || 0;
      vendorMap[p.vendor].totalReviews += p.reviewsCount || 0;
    });
    return Object.values(vendorMap).map((v) => ({
      name: v.name,
      vendorId: v.vendorId,
      productCount: v.products.length,
      rating: v.totalReviews > 0 ? (v.totalRating / v.products.length).toFixed(1) : '5.0',
      reviews: v.totalReviews >= 1000
        ? `${(v.totalReviews / 1000).toFixed(1)}k`
        : String(v.totalReviews || 0),
      avatar: v.products[0]?.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300',
      category: v.products[0]?.category || 'General',
      image: v.products[0]?.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300',
    }));
  }, [products]);

  const featuredProducts = useMemo(() => {
    return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8);
  }, [products]);

  const trendingProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products]
      .sort((a, b) => ((b.rating || 0) * (b.reviewsCount || 0)) - ((a.rating || 0) * (a.reviewsCount || 0)))
      .slice(0, 10);
  }, [products]);

  const newArrivals = useMemo(() => {
    return [...products].reverse().slice(0, 8);
  }, [products]);

  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    return ['All Categories', ...new Set(products.map(p => p.category).filter(Boolean))];
  }, [products]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  if (isLoading && (!products || products.length === 0)) {
    return (
      <main className="max-w-container-max mx-auto px-4 sm:px-gutter py-8 md:py-12 space-y-12">
        <div className="h-64 sm:h-96 rounded-2xl bg-surface-container-high/60 animate-pulse" />
        <div className="space-y-6">
          <div className="h-8 w-48 bg-surface-container-high/60 rounded animate-pulse" />
          <ProductGridSkeleton count={8} />
        </div>
      </main>
    );
  }

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden">
          {/* Background image from Pexels */}
          <div className="absolute inset-0">
            <img
              src="/images/hero-bg.jpg"
              alt="Premium Marketplace"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Pattern overlay */}
          <div className="absolute inset-0 pattern-bg opacity-[0.03] pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter py-xl md:py-24">
            <div className="max-w-2xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-xs bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full mb-8"
              >
                <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse"></span>
                <span className="text-white/90 font-label-md text-label-md">The New Standard of Commerce</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-white font-display-lg text-display-lg-mobile md:text-display-lg leading-[1.05] mb-6 tracking-tight"
              >
                Curated Excellence,{' '}
                <span className="text-primary-container">Delivered.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white/70 font-body-lg text-body-lg mb-10 max-w-lg leading-relaxed"
              >
                Discover premium products from the world's most trusted brands. Quality without compromise, curated for those who expect more.
              </motion.p>

              {/* Search Bar — integrated into hero */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-3 max-w-xl mb-10 relative z-20"
              >
                <div className="flex-1 relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-headline-md group-focus-within:text-white/80 transition-colors">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search products, brands, or categories..."
                    value={searchQuery}
                    onFocus={() => setHeroSearchOpen(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setHeroSearchOpen(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        setHeroSearchOpen(false);
                        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                      }
                    }}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/40 text-body-md focus:outline-none focus:border-white/30 focus:bg-white/15 transition-all"
                  />

                  {/* Live Results Plate */}
                  <LiveSearchPlate
                    query={searchQuery}
                    isOpen={heroSearchOpen && !!searchQuery.trim()}
                    onClose={() => setHeroSearchOpen(false)}
                    className="top-full mt-2"
                  />
                </div>
                <Button
                  variant="primary-container"
                  size="lg"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      setHeroSearchOpen(false);
                      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    }
                  }}
                  icon={<span className="material-symbols-outlined">search</span>}
                >
                  Search
                </Button>
              </motion.div>

              {/* Quick category links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-2"
              >
                <span className="text-white/40 font-label-sm text-label-sm self-center mr-1">Popular:</span>
                {categories.filter(c => c !== 'All Categories').slice(0, 5).map(cat => (
                  <button
                    key={cat}
                    onClick={() => navigate(`/search?category=${encodeURIComponent(cat)}`)}
                    className="px-4 py-1.5 rounded-full text-label-sm font-label-sm bg-white/8 border border-white/10 text-white/70 hover:bg-white/15 hover:text-white hover:border-white/20 transition-all backdrop-blur-sm"
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-16 flex flex-wrap gap-8 md:gap-16"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/80">inventory_2</span>
                </div>
                <div>
                  <p className="text-white font-headline-md text-body-lg">{products.length}+</p>
                  <p className="text-white/50 font-body-sm text-body-sm">Premium Products</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/80">storefront</span>
                </div>
                <div>
                  <p className="text-white font-headline-md text-body-lg">{stores.length}+</p>
                  <p className="text-white/50 font-body-sm text-body-sm">Verified Vendors</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/80">verified</span>
                </div>
                <div>
                  <p className="text-white font-headline-md text-body-lg">100%</p>
                  <p className="text-white/50 font-body-sm text-body-sm">Verified Quality</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Chips Section */}
        <section className="bg-surface-container-low py-sm border-b border-outline-variant/30">
          <div className="max-w-container-max mx-auto px-gutter flex items-center gap-sm overflow-x-auto hide-scrollbar">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(idx === 0 ? '/search' : `/search?category=${encodeURIComponent(cat)}`)}
                className={cn(
                  'whitespace-nowrap px-6 py-2 rounded-full font-label-md text-label-md transition-all border border-outline-variant/20 shadow-sm',
                  idx === 0
                    ? 'bg-primary-container text-white shadow-md'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                )}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Top Stores Carousel */}
        {stores.length > 0 && (
          <section className="py-xl bg-background">
            <div className="max-w-container-max mx-auto px-gutter">
              <div className="flex justify-between items-end mb-lg">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-background mb-2">Top Stores</h2>
                  <p className="text-on-surface-variant font-body-md text-body-md">Discover the most trusted vendors this month.</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => storeCarouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
                    className="p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => storeCarouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
                    className="p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </motion.button>
                </div>
              </div>
              <div ref={storeCarouselRef} className="flex gap-gutter overflow-x-auto hide-scrollbar pb-gutter">
                {stores.map((store) => (
                  <motion.div
                    key={store.name}
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="flex-shrink-0 w-72 bg-surface-container-lowest rounded-2xl shadow-subtle hover:shadow-xl border border-outline-variant/40 transition-all p-6 text-center group"
                  >
                    <div className="w-20 h-20 mx-auto bg-surface-container-low rounded-full mb-4 overflow-hidden border-2 border-outline-variant/10 group-hover:border-primary group-hover:scale-105 transition-all">
                      <img alt={store.name} className="w-full h-full object-cover" src={store.avatar} />
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{store.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-6">
                      <span className="material-symbols-outlined icon-filled text-primary text-body-md">star</span>
                      <span className="text-body-sm font-bold text-on-surface">{store.rating}</span>
                      <span className="text-body-sm text-on-surface-variant">({store.reviews})</span>
                    </div>
                    <Button variant="primary-container" fullWidth size="sm" to={`/store/${store.vendorId}`}>
                      Visit Store
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trending Products Grid */}
        <section className="py-xl bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="mb-lg">
              <h2 className="font-headline-lg text-headline-lg text-on-background">Trending Products</h2>
              <p className="text-on-surface-variant font-body-md text-body-md">The most sought-after items across all our vendors.</p>
            </div>
            {trendingProducts.length === 0 ? (
              <EmptyState
                icon="shopping_bag"
                title="No products yet"
                description="Check back soon for trending items."
              />
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5"
              >
                {trendingProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={toggleWishlist}
                      isWishlisted={wishlist.some(item => item.id === product.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
            <div className="mt-lg text-center">
              <Button variant="outline" onClick={() => navigate('/search')}>
                View All Trending Items
              </Button>
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="max-w-container-max mx-auto px-gutter py-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-surface-container-high rounded-3xl overflow-hidden flex flex-col md:flex-row items-center relative border border-outline-variant/40 shadow-xl"
          >
            <div className="p-lg md:p-xl flex-1 text-center md:text-left z-10">
              <h2 className="font-display-lg text-display-lg text-primary-container mb-4">Unmatched Quality. Verified Vendors.</h2>
              <p className="text-on-surface-variant font-body-lg text-body-lg mb-8 max-w-lg">Every store on Vendex undergoes a rigorous vetting process to ensure you receive only the finest products with world-class support.</p>
              <Button variant="primary-container" size="lg" onClick={() => navigate('/vendor/onboarding')}>
                Become a Vendor
              </Button>
            </div>
            <div className="flex-1 w-full h-64 md:h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5"></div>
              <img alt="Promo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSzjLENOhHx_5CeBqPXG-Cbfr9uRqT_rkGZWd2FFfSwYZqiUa-RB2nfWXosW2n51xkJHoU8fn7SoZVjfkK9aSKQQSRWyrfYKBbGRW6sPkE907vqT9B2rZYwfmO0syjXIx5U9kg2K29EWsYIjiAxasiiQ7iSgbHr1M640gCXEauMG7ieemUk5xDiY72DwJ_Dne_v_jqAiXUxSHiJtLMzCMXgGn-MGe9UwC1Q5Z8yMmlrZS1jvwsjDE-a-OBlTWderxxvem70GpV5j6Q" />
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
