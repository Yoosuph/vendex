import React, { useContext, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from "@/shared/context/CartContext";
import Button from '@/shared/components/Button';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function Home() {
  const { products } = useContext(MarketplaceContext);
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Derive stores from products (group by vendor)
  const stores = useMemo(() => {
    if (!products || products.length === 0) return [];
    const vendorMap = {};
    products.forEach(p => {
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
    return Object.values(vendorMap).map(v => ({
      name: v.name,
      vendorId: v.vendorId,
      rating: (v.totalRating / v.products.length).toFixed(1),
      reviews: v.totalReviews >= 1000
        ? `${(v.totalReviews / 1000).toFixed(1)}k`
        : String(v.totalReviews),
      avatar: v.products[0]?.image || '',
      productCount: v.products.length,
    }));
  }, [products]);

  // Derive trending products (top 8 by rating * reviewsCount)
  const trendingProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products]
      .sort((a, b) => ((b.rating || 0) * (b.reviewsCount || 0)) - ((a.rating || 0) * (a.reviewsCount || 0)))
      .slice(0, 12);
  }, [products]);

  // Derive unique categories
  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    return ['All Categories', ...new Set(products.map(p => p.category).filter(Boolean))];
  }, [products]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setSuccessMessage(`Added "${product.name}" to cart!`);
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const isLoading = !products || products.length === 0;

  if (isLoading) {
    return (
      <main>
        <section className="hero-gradient relative overflow-hidden py-xl md:py-24">
          <LoadingSpinner text="Loading marketplace..." size="lg" />
        </section>
      </main>
    );
  }

  return (
    <>
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 bg-success text-white px-md py-sm rounded-xl shadow-lg flex items-center gap-xs animate-bounce">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{successMessage}</span>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden">
          {/* Background image from Pexels */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
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
                className="flex flex-col sm:flex-row gap-3 max-w-xl mb-10"
              >
                <div className="flex-1 relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-headline-md group-focus-within:text-white/80 transition-colors">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search products, brands, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                      }
                    }}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/40 text-body-md focus:outline-none focus:border-white/30 focus:bg-white/15 transition-all"
                  />
                </div>
                <Button
                  variant="primary-container"
                  size="lg"
                  onClick={() => searchQuery.trim() && navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)}
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
              <button
                key={cat}
                onClick={() => navigate(idx === 0 ? '/search' : `/search?category=${encodeURIComponent(cat)}`)}
                className={cn(
                  'whitespace-nowrap px-6 py-2 rounded-full font-label-md text-label-md transition-all border border-outline-variant/20 shadow-sm',
                  idx === 0
                    ? 'bg-primary-container text-white'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                )}
              >
                {cat}
              </button>
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
                  <button className="p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
                  <button className="p-2 border border-outline-variant rounded-full hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
              </div>
              <div className="flex gap-gutter overflow-x-auto hide-scrollbar pb-gutter">
                {stores.map((store) => (
                  <div key={store.name} className="flex-shrink-0 w-72 bg-surface-container-lowest rounded-xl shadow-card hover:shadow-card-hover transition-all p-6 text-center group">
                    <div className="w-20 h-20 mx-auto bg-surface-container-low rounded-full mb-4 overflow-hidden border-2 border-outline-variant/10 group-hover:border-primary transition-colors">
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
                  </div>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
                {trendingProducts.map((product) => {
                  const isWished = wishlist.some(item => item.id === product.id);
                  return (
                    <div key={product.id} className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:border-outline hover:shadow-md transition-all duration-200">
                      {/* Image */}
                      <Link to={`/product/${product.id}`} className="block relative bg-surface-container-low overflow-hidden aspect-square">
                        <img
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={product.image}
                        />
                        {product.stock === 0 && (
                          <span className="absolute top-2 left-2 bg-black/60 text-white text-meta font-medium px-2 py-0.5 rounded-full">Sold Out</span>
                        )}
                      </Link>
                      {/* Content */}
                      <div className="p-2.5 md:p-3">
                        <p className="text-meta font-semibold text-on-surface-variant uppercase tracking-wider truncate">{product.vendor}</p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-body-sm font-semibold text-on-surface mt-0.5 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-0.5 mt-1">
                          <span className="material-symbols-outlined icon-filled text-meta text-warning">star</span>
                          <span className="text-meta font-medium text-on-surface-variant">{product.rating?.toFixed(1) || '5.0'}</span>
                          <span className="text-meta text-on-surface-variant ml-0.5">({product.reviewsCount || 0})</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-body-sm font-bold text-on-surface">${product.price.toFixed(2)}</span>
                          <button
                            onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                            disabled={product.stock === 0}
                            className={cn(
                              'w-7 h-7 rounded-full flex items-center justify-center transition-all',
                              product.stock === 0
                                ? 'bg-surface-container-low text-on-surface-variant cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-primary-container shadow-sm active:scale-90'
                            )}
                          >
                            <span className="material-symbols-outlined text-body-sm">add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
          <div className="bg-surface-container-high rounded-2xl overflow-hidden flex flex-col md:flex-row items-center relative">
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
          </div>
        </section>
      </main>
    </>
  );
}
