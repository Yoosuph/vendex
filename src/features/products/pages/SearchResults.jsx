import React, { useContext, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from '@/shared/context/CartContext';
import { useToast } from '@/shared/context/ToastContext';
import ProductCard from '@/shared/components/ProductCard';
import EmptyState from '@/shared/components/EmptyState';
import { ProductGridSkeleton } from '@/shared/components/SkeletonLoader';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function SearchResults() {
  const { products, loading: isLoading } = useContext(MarketplaceContext);
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);
  const { addToast } = useToast();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const categoryFilter = params.get('category') || '';

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique categories and brands
  const categories = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.category).filter(Boolean))];
  }, [products]);

  const brands = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.brand).filter(Boolean))];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = products.filter((product) => {
      // Text query match
      if (query) {
        const q = query.toLowerCase();
        const matchName = product.name?.toLowerCase().includes(q);
        const matchDesc = product.description?.toLowerCase().includes(q);
        const matchVendor = product.vendor?.toLowerCase().includes(q);
        const matchCat = product.category?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchVendor && !matchCat) return false;
      }

      // Category filter
      if (categoryFilter && product.category !== categoryFilter) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      return true;
    });

    // Sorting
    switch (sortBy) {
      case 'price-low':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...result].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return [...result].reverse();
      default:
        return result;
    }
  }, [products, query, categoryFilter, priceRange, selectedBrands, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Render loading state if initial load
  if (isLoading && (!products || products.length === 0)) {
    return (
      <main className="max-w-container-max mx-auto px-4 sm:px-gutter py-8 space-y-6">
        <div className="h-6 w-64 bg-surface-container-high/60 rounded animate-pulse" />
        <ProductGridSkeleton count={8} />
      </main>
    );
  }

  const getCategoryLink = (cat) => {
    const nextParams = new URLSearchParams(params);
    nextParams.set('category', cat);
    return `/search?${nextParams.toString()}`;
  };

  const getClearCategoryLink = () => {
    const nextParams = new URLSearchParams(params);
    nextParams.delete('category');
    const queryString = nextParams.toString();
    return queryString ? `/search?${queryString}` : '/search';
  };

  return (
    <>
      <main className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-lg flex flex-col md:flex-row gap-6 md:gap-gutter pb-24">
        {/* Mobile Filter & Controls Bar */}
        <div className="md:hidden flex items-center justify-between gap-2 p-3 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-subtle">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-semibold text-xs"
            >
              <span className="material-symbols-outlined text-base">tune</span>
              Filters {(categoryFilter || selectedBrands.length > 0) ? `(Active)` : ''}
            </button>
            <span className="text-xs text-secondary font-medium">
              {filteredProducts.length} items
            </span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold bg-surface-container-low border border-outline-variant/50 rounded-xl px-2.5 py-1.5 text-on-surface outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 shrink-0 space-y-6">
          {query && (
            <section className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-subtle">
              <h3 className="font-bold text-xs uppercase tracking-wider text-secondary mb-1">
                Search Query
              </h3>
              <p className="font-semibold text-on-surface text-sm">
                "{query}" ({filteredProducts.length} results)
              </p>
            </section>
          )}

          {/* Categories */}
          <section className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-subtle">
            <h3 className="font-bold text-xs uppercase tracking-wider text-secondary mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    className={cn(
                      'flex items-center justify-between text-sm py-1 transition-colors',
                      categoryFilter === cat ? 'text-primary font-bold' : 'text-secondary hover:text-primary'
                    )}
                    to={getCategoryLink(cat)}
                  >
                    {cat}
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </Link>
                </li>
              ))}
              {categoryFilter && (
                <li className="pt-2 border-t border-outline-variant/40">
                  <Link
                    className="text-xs font-bold text-primary hover:underline"
                    to={getClearCategoryLink()}
                  >
                    Clear category filter
                  </Link>
                </li>
              )}
            </ul>
          </section>

          {/* Price Range */}
          <section className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-subtle">
            <h3 className="font-bold text-xs uppercase tracking-wider text-secondary mb-3">Price Range</h3>
            <div>
              <input
                className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                max="5000"
                min="0"
                step="50"
                type="range"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
              <div className="flex justify-between text-xs text-secondary mt-2 font-mono">
                <span>$0</span>
                <span className="font-bold text-primary">${priceRange[1]}</span>
              </div>
            </div>
          </section>

          {/* Brands */}
          {brands.length > 0 && (
            <section className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-subtle">
              <h3 className="font-bold text-xs uppercase tracking-wider text-secondary mb-3">Brands</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm text-secondary cursor-pointer hover:text-on-surface">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Products Grid Section */}
        <section className="flex-1 min-w-0">
          {/* Desktop Sort Header */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <p className="text-body-sm text-secondary">
              Showing <span className="font-bold text-on-surface">{filteredProducts.length}</span> products
            </p>
            <div className="flex items-center gap-3">
              <label htmlFor="sort-desktop" className="text-body-sm text-secondary font-medium">Sort by:</label>
              <select
                id="sort-desktop"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-body-sm font-semibold bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-3 py-1.5 text-on-surface outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-8 sm:p-12 text-center shadow-subtle">
              <EmptyState
                icon="search_off"
                title="No matching products"
                description="Try clearing your filters or searching with different keywords."
                actionText="Clear All Filters"
                onAction={() => {
                  setParams({});
                  setPriceRange([0, 5000]);
                  setSelectedBrands([]);
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Dedicated Mobile Filter Drawer / Bottom Sheet */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 bg-surface-container-lowest rounded-t-3xl z-50 md:hidden max-h-[85vh] flex flex-col shadow-2xl p-4 sm:p-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
                <h3 className="font-bold text-lg text-on-surface">Filters & Refinements</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-secondary mb-2.5">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const nextParams = new URLSearchParams(params);
                        nextParams.delete('category');
                        setParams(nextParams);
                      }}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
                        !categoryFilter ? 'bg-primary text-white' : 'bg-surface-container text-secondary'
                      )}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          const nextParams = new URLSearchParams(params);
                          nextParams.set('category', cat);
                          setParams(nextParams);
                        }}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
                          categoryFilter === cat ? 'bg-primary text-white' : 'bg-surface-container text-secondary'
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-secondary mb-2.5">
                    Max Price: <span className="text-primary font-mono font-bold">${priceRange[1]}</span>
                  </h4>
                  <input
                    className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                    max="5000"
                    min="0"
                    step="50"
                    type="range"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  />
                </div>

                {/* Brands */}
                {brands.length > 0 && (
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-secondary mb-2.5">Brands</h4>
                    <div className="flex flex-wrap gap-2">
                      {brands.map((b) => {
                        const selected = selectedBrands.includes(b);
                        return (
                          <button
                            key={b}
                            onClick={() => toggleBrand(b)}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
                              selected
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'bg-surface-container-low border-outline-variant/40 text-secondary'
                            )}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-outline-variant/40 flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setParams({});
                    setPriceRange([0, 5000]);
                    setSelectedBrands([]);
                    setMobileFilterOpen(false);
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Apply ({filteredProducts.length})
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
