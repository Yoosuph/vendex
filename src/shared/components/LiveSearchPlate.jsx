import React, { useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const POPULAR_SEARCHES = [
  { label: 'Bespoke Tech', query: 'Bespoke Tech' },
  { label: 'Home Studio', query: 'Home Studio' },
  { label: 'Kitchen & Dining', query: 'Kitchen' },
  { label: 'Wellness & Ritual', query: 'Wellness' },
  { label: 'Audio & Sound', query: 'Audio' },
  { label: 'Sneakers', query: 'Sneakers' },
];

export default function LiveSearchPlate({
  query = '',
  isOpen = false,
  onClose,
  className = '',
  align = 'left',
}) {
  const { products } = useContext(MarketplaceContext);
  const navigate = useNavigate();

  const trimmedQuery = query.trim().toLowerCase();

  const matchingProducts = useMemo(() => {
    if (!products || products.length === 0 || !trimmedQuery) return [];

    return products
      .filter((p) => {
        const name = (p.name || '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        const cat = (p.category || p.categoryName || '').toLowerCase();
        const vendor = (p.vendor || p.vendorName || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();

        return (
          name.includes(trimmedQuery) ||
          brand.includes(trimmedQuery) ||
          cat.includes(trimmedQuery) ||
          vendor.includes(trimmedQuery) ||
          desc.includes(trimmedQuery)
        );
      })
      .slice(0, 5);
  }, [products, trimmedQuery]);

  const totalCount = useMemo(() => {
    if (!products || !trimmedQuery) return 0;
    return products.filter((p) => {
      const name = (p.name || '').toLowerCase();
      const brand = (p.brand || '').toLowerCase();
      const cat = (p.category || p.categoryName || '').toLowerCase();
      return name.includes(trimmedQuery) || brand.includes(trimmedQuery) || cat.includes(trimmedQuery);
    }).length;
  }, [products, trimmedQuery]);

  if (!isOpen) return null;

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    if (onClose) onClose();
  };

  const handleQueryClick = (searchQ) => {
    navigate(`/search?q=${encodeURIComponent(searchQ)}`);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className={cn(
          'absolute top-full mt-2 w-full min-w-[280px] sm:min-w-[360px] max-w-lg',
          'bg-surface-container-lowest/95 dark:bg-surface-container-low/95 backdrop-blur-xl',
          'border border-outline-variant/60 shadow-2xl rounded-2xl overflow-hidden z-50',
          align === 'right' ? 'right-0' : 'left-0',
          className
        )}
      >
        {/* If query has text */}
        {trimmedQuery ? (
          <div>
            <div className="px-3.5 py-2.5 bg-surface-container-low/50 dark:bg-surface-container/50 border-b border-outline-variant/30 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-secondary">
                Matching Products ({matchingProducts.length})
              </span>
              {totalCount > matchingProducts.length && (
                <span className="text-[11px] font-mono text-secondary">
                  +{totalCount - matchingProducts.length} more
                </span>
              )}
            </div>

            {matchingProducts.length > 0 ? (
              <div className="divide-y divide-outline-variant/20 max-h-[340px] overflow-y-auto overscroll-contain">
                {matchingProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleProductClick(p.id)}
                    className="w-full p-2.5 sm:p-3 flex items-center gap-3 text-left hover:bg-surface-container-high/40 dark:hover:bg-surface-container-high/60 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0 border border-outline-variant/30 relative">
                      <img
                        src={p.image || p.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120'}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-secondary truncate">
                          {p.brand || p.vendor || p.category || 'Vendex'}
                        </span>
                        {p.stock > 0 && p.stock <= 5 && (
                          <span className="text-[9px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded-full">
                            Low Stock
                          </span>
                        )}
                      </div>
                      <p className="text-body-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                        {p.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono font-bold text-body-sm text-primary">
                          ${Number(p.price || 0).toFixed(2)}
                        </span>
                        {p.rating > 0 && (
                          <span className="text-[11px] text-secondary flex items-center gap-0.5">
                            <span className="text-amber-400 text-xs">★</span> {Number(p.rating).toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow Action */}
                    <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-secondary group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center space-y-2">
                <span className="material-symbols-outlined text-3xl text-secondary">search_off</span>
                <p className="text-body-sm font-semibold text-on-surface">No products matching "{query}"</p>
                <p className="text-meta text-secondary">Try searching for broader keywords, brands, or categories.</p>
              </div>
            )}

            {/* Footer: View all results */}
            <div className="p-2 border-t border-outline-variant/30 bg-surface-container-low/40">
              <button
                type="button"
                onClick={() => handleQueryClick(query)}
                className="w-full py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-body-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View all {totalCount > 0 ? totalCount : ''} results for "{query}"</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ) : (
          /* When query is empty (focus / suggestion state) */
          <div className="p-4 space-y-3.5">
            <div>
              <p className="text-[11px] font-mono font-bold tracking-wider uppercase text-secondary mb-2">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleQueryClick(item.query)}
                    className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-body-sm text-on-surface font-medium transition-colors flex items-center gap-1 text-xs"
                  >
                    <span className="material-symbols-outlined text-xs text-primary">trending_up</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
