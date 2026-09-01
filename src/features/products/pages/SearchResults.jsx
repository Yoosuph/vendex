import React, { useContext, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from '@/shared/context/CartContext';
import { useToast } from '@/shared/context/ToastContext';
import ProductCard from '@/shared/components/ProductCard';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function SearchResults() {
  const { products } = useContext(MarketplaceContext);
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);
  const { addToast } = useToast();
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const categoryFilter = params.get('category') || '';

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  // Derive unique categories from products
  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...new Set(products.map(p => p.category).filter(Boolean))];
  }, [products]);

  // Derive unique brands from products
  const brands = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...new Set(products.map(p => p.brand).filter(Boolean))];
  }, [products]);

  // Filter products by search query, category, price range, and selected brands
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    let result = [...products];

    // Filter by category from URL param
    if (categoryFilter) {
      result = result.filter(p => p.category && p.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Filter by search query
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.vendor && p.vendor.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    return result;
  }, [products, query, categoryFilter, priceRange, selectedBrands]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const isLoading = !products;

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
      <main className="max-w-container-max mx-auto px-gutter py-lg flex flex-col md:flex-row gap-gutter">

        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-xl">

          {/* Search Header */}
          {query && (
            <section>
              <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary mb-md">
                Search: "{query}"
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </section>
          )}

          {/* Categories */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary mb-md">Categories</h3>
            <ul className="space-y-base">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    className={cn('flex items-center justify-between font-body-sm text-body-sm transition-colors', categoryFilter === cat ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary')}
                    to={getCategoryLink(cat)}
                  >
                    {cat}
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </Link>
                </li>
              ))}
              {categoryFilter && (
                <li>
                  <Link
                    className="flex items-center justify-between font-body-sm text-body-sm text-secondary hover:text-primary transition-colors"
                    to={getClearCategoryLink()}
                  >
                    Clear filter
                  </Link>
                </li>
              )}
            </ul>
          </section>

          {/* Price Range */}
          <section>
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary mb-md">Price Range</h3>
            <div className="px-base">
              <input
                className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer"
                max="5000"
                min="0"
                step="50"
                type="range"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
              <div className="flex justify-between mt-sm text-meta font-meta text-on-surface-variant">
                <span>$0</span>
                <span>$5,000+</span>
              </div>
              <div className="mt-md flex items-center gap-xs">
                <input
                  className="w-full bg-white border border-outline-variant rounded px-2 py-1 text-body-sm font-body-sm"
                  type="text"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                />
                <span className="text-on-surface-variant">-</span>
                <input
                  className="w-full bg-white border border-outline-variant rounded px-2 py-1 text-body-sm font-body-sm"
                  type="text"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 0])}
                />
              </div>
            </div>
          </section>

          {/* Brand Filter */}
          {brands.length > 0 && (
            <section>
              <h3 className="font-label-md text-label-md uppercase tracking-wider text-secondary mb-md">Brand</h3>
              <div className="space-y-sm">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-sm cursor-pointer group">
                    <input
                      checked={selectedBrands.includes(brand)}
                      className="w-4 h-4 rounded border-outline-variant focus:ring-0"
                      type="checkbox"
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          {isLoading ? (
            <LoadingSpinner text="Loading products..." size="lg" />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              icon="search_off"
              title={query ? `No results found for "${query}"` : 'No products found'}
              description="Try adjusting your search terms or filters."
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.some(item => item.id === product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
