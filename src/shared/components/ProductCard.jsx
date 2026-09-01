import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

function formatPrice(value) {
  const n = Number(value) || 0;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: n % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

/**
 * Editorial product card — SSENSE / Mr Porter inspired.
 * Works in dense grids (mobile 2-col) and generous desktop layouts.
 */
export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  showVendor = true,
  size = 'default',
}) {
  const compact = size === 'compact';
  const isOutOfStock = product.stock === 0;
  const isLowStock = !isOutOfStock && product.stock != null && product.stock <= 5;
  const vendor = product.vendor || product.vendorName;
  const category = product.category || product.categoryName;
  const rating = product.rating;
  const reviewsCount = product.reviewsCount;
  const image =
    product.image ||
    product.images?.[0] ||
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart && !isOutOfStock) onAddToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) onToggleWishlist(product);
  };

  return (
    <motion.article
      whileHover={{ y: compact ? -2 : -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex flex-col bg-surface-container-lowest',
        'border border-outline-variant/40 overflow-hidden',
        'rounded-xl sm:rounded-2xl',
        'shadow-[0_1px_2px_rgba(26,28,25,0.04)]',
        'hover:border-primary/25 hover:shadow-[0_12px_32px_rgba(26,28,25,0.08)]',
        'transition-[border-color,box-shadow] duration-300',
        compact ? 'p-0' : 'p-0',
      )}
    >
      {/* Media */}
      <div className={cn('relative', compact ? 'aspect-[4/5]' : 'aspect-[4/5] sm:aspect-[3/4]')}>
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-0 block overflow-hidden bg-surface-container-low"
          aria-label={product.name}
        >
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className={cn(
              'h-full w-full object-cover transition-transform duration-500 ease-out',
              'group-hover:scale-[1.04]',
              isOutOfStock && 'opacity-70 grayscale-[30%]',
            )}
          />
          {/* Soft bottom gradient for badge readability on light photos */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent opacity-0 sm:opacity-100" />
        </Link>

        {/* Badges — mono chips */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {isOutOfStock && (
            <span className="buyer-chip bg-inverse-surface text-inverse-on-surface shadow-sm">
              Sold out
            </span>
          )}
          {!isOutOfStock && isLowStock && (
            <span className="buyer-chip bg-warning-container text-on-warning-container shadow-sm">
              Low stock
            </span>
          )}
          {!isOutOfStock && !isLowStock && category && !compact && (
            <span className="buyer-chip bg-white/90 text-on-surface-variant backdrop-blur-sm shadow-sm hidden sm:inline-flex">
              {category}
            </span>
          )}
        </div>

        {/* Wishlist */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={handleWishlist}
            className={cn(
              'absolute top-2 right-2 sm:top-3 sm:right-3 z-10',
              'flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full',
              'bg-white/90 backdrop-blur-sm border border-white/60 shadow-sm',
              'text-on-surface-variant hover:text-primary hover:scale-105',
              'active:scale-95 transition-all duration-200',
              isWishlisted && 'text-primary',
            )}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <span
              className={cn(
                'material-symbols-outlined text-[20px] sm:text-[22px]',
                isWishlisted && 'icon-filled',
              )}
            >
              favorite
            </span>
          </button>
        )}

        {/* Quick add — desktop hover / always light on mobile as icon */}
        {onAddToCart && (
          <>
            {/* Desktop: full-width bar on hover */}
            <div
              className={cn(
                'absolute inset-x-0 bottom-0 z-10 p-2 sm:p-3',
                'hidden sm:block',
                'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
                'transition-all duration-300 ease-out',
              )}
            >
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={cn(
                  'w-full buyer-mono text-[11px] tracking-[0.14em] uppercase font-semibold',
                  'py-2.5 rounded-lg shadow-md transition-colors',
                  isOutOfStock
                    ? 'bg-surface-container text-on-surface-variant cursor-not-allowed'
                    : 'bg-inverse-surface text-inverse-on-surface hover:bg-primary',
                )}
              >
                {isOutOfStock ? 'Unavailable' : 'Add to cart'}
              </button>
            </div>

            {/* Mobile: floating + button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              aria-label={isOutOfStock ? 'Out of stock' : 'Add to cart'}
              className={cn(
                'sm:hidden absolute bottom-2 right-2 z-10',
                'flex h-9 w-9 items-center justify-center rounded-full shadow-md',
                'active:scale-95 transition-transform',
                isOutOfStock
                  ? 'bg-surface-container text-on-surface-variant'
                  : 'bg-primary text-on-primary',
              )}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isOutOfStock ? 'block' : 'add_shopping_cart'}
              </span>
            </button>
          </>
        )}
      </div>

      {/* Meta */}
      <div
        className={cn(
          'flex flex-1 flex-col',
          compact ? 'p-2.5 sm:p-3 gap-1' : 'p-3 sm:p-4 gap-1.5',
        )}
      >
        {showVendor && vendor && (
          <p className="buyer-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-on-surface-variant truncate">
            {vendor}
          </p>
        )}

        <Link to={`/product/${product.id}`} className="block min-w-0">
          <h3
            className={cn(
              'font-semibold text-on-surface leading-snug tracking-tight',
              'group-hover:text-primary transition-colors',
              compact
                ? 'text-[13px] sm:text-sm line-clamp-2 min-h-[2.4em]'
                : 'text-sm sm:text-base line-clamp-2 min-h-[2.5em] sm:min-h-[2.75em]',
            )}
          >
            {product.name}
          </h3>
        </Link>

        {rating != null && !compact && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="material-symbols-outlined icon-filled text-warning text-[14px] sm:text-[16px]">
              star
            </span>
            <span className="buyer-mono text-[11px] sm:text-xs text-on-surface tabular-nums">
              {Number(rating).toFixed(1)}
            </span>
            {reviewsCount != null && (
              <span className="buyer-mono text-[10px] sm:text-[11px] text-on-surface-variant">
                ({reviewsCount >= 1000
                  ? `${(reviewsCount / 1000).toFixed(1)}k`
                  : reviewsCount})
              </span>
            )}
          </div>
        )}

        <div
          className={cn(
            'mt-auto flex items-end justify-between gap-2 pt-1',
            compact ? 'pt-0.5' : 'pt-1 sm:pt-2',
          )}
        >
          <p
            className={cn(
              'buyer-price text-on-surface',
              compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg',
            )}
          >
            {formatPrice(product.price)}
          </p>
          {product.brand && !compact && (
            <span className="buyer-mono text-[10px] tracking-wider uppercase text-on-surface-variant truncate max-w-[40%] text-right hidden xs:inline sm:inline">
              {product.brand}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
