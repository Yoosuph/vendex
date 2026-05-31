import React, { useContext, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from '@/shared/context/CartContext';
import Button from '@/shared/components/Button';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function SearchResults() {
  const { products } = useContext(MarketplaceContext);
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const categoryFilter = params.get('category') || '';

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setSuccessMessage(`Added "${product.name}" to cart!`);
    setTimeout(() => setSuccessMessage(''), 2000);
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

  return (
    <>
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-md py-sm rounded-xl shadow-lg flex items-center gap-xs animate-bounce">
          <span className="material-symbols-outlined">check_circle</span>
          <span>{successMessage}</span>
        </div>
      )}

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
                    to={`/search?category=${encodeURIComponent(cat)}`}
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
                    to="/search"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
              {filteredProducts.map((product) => {
                const isWished = wishlist.some(item => item.id === product.id);
                const isOutOfStock = product.stock === 0;

                return (
                  <article key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                    <div className="aspect-square bg-surface-container-low relative overflow-hidden">
                      <Link to={`/product/${product.id}`}>
                        <img
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={product.image}
                        />
                      </Link>
                      {isOutOfStock ? (
                        <span className="absolute top-3 left-3 bg-primary-container text-white px-2 py-1 rounded text-meta font-bold">Sold Out</span>
                      ) : product.stock <= 5 && product.stock > 0 ? (
                        <span className="absolute top-3 left-3 bg-secondary text-white px-2 py-1 rounded text-meta font-bold">Low Stock</span>
                      ) : null}
                      <button
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toggleWishlist(product)}
                      >
                        <span className={cn('material-symbols-outlined text-body-lg', isWished ? 'text-primary icon-filled' : 'text-on-surface-variant')}>
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="p-4 flex flex-col gap-xs">
                      <Link className="font-label-sm text-label-sm text-primary uppercase font-bold hover:underline" to="/vendor/storefront">
                        {product.vendor}
                      </Link>
                      <Link to={`/product/${product.id}`}>
                        <h2 className="font-body-md text-body-md font-bold text-on-surface line-clamp-1">{product.name}</h2>
                      </Link>
                      <div className="flex items-center gap-1 text-primary">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={cn('material-symbols-outlined text-base', star <= Math.round(product.rating || 0) && 'icon-filled')}
                          >
                            {star <= Math.round(product.rating || 0) ? 'star' : 'star_outline'}
                          </span>
                        ))}
                        <span className="text-on-surface-variant text-meta font-meta ml-1">({product.reviewsCount || 0})</span>
                      </div>
                      <div className="flex items-center justify-between mt-sm">
                        <span className="font-headline-md text-headline-md text-on-surface">${product.price.toFixed(2)}</span>
 {isOutOfStock ? (
 <Button variant="secondary" size="md" disabled icon={<span className="material-symbols-outlined">shopping_cart</span>} />
 ) : (
 <Button
 variant="primary-container"
 size="md"
 icon={<span className="material-symbols-outlined">shopping_cart</span>}
 onClick={() => handleAddToCart(product)}
 />
 )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
