import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/shared/components/Button';
import { motion } from 'framer-motion';
import StarRating from './StarRating';

const sizeConfig = {
  default: {
    card: 'p-4',
    imageWrapper: 'h-48',
    name: 'text-body-md font-bold',
    price: 'text-headline-md font-bold',
    vendor: 'text-body-sm',
  },
  compact: {
    card: 'p-3',
    imageWrapper: 'h-32',
    name: 'text-body-sm font-bold',
    price: 'text-body-md font-bold',
    vendor: 'text-meta',
  },
};

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  showVendor = true,
  size = 'default',
}) {
  const cfg = sizeConfig[size] || sizeConfig.default;
  const isOutOfStock = product.stock === 0;
  const isLowStock = !isOutOfStock && product.stock <= 5;

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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <Link
        to={`/product/${product.id}`}
        className={`block bg-white border border-outline-variant/30 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden ${cfg.card}`}
      >
        {/* Image */}
        <div className={`relative ${cfg.imageWrapper} rounded-lg overflow-hidden bg-surface-container-low`}>
          <motion.img
            src={product.image || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Stock badges */}
          {isOutOfStock && (
            <div className="absolute top-2 left-2 bg-error/90 text-white text-meta font-bold px-2.5 py-1 rounded-full">
              Out of Stock
            </div>
          )}
          {isLowStock && (
            <div className="absolute top-2 left-2 bg-amber-500/90 text-white text-meta font-bold px-2.5 py-1 rounded-full">
              Low Stock
            </div>
          )}

          {/* Wishlist heart */}
          {onToggleWishlist && (
            <button
              onClick={handleWishlist}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{
                  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  color: isWishlisted ? '#97001b' : '#5b403e',
                }}
              >
                favorite
              </span>
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1.5">
          {showVendor && product.vendor && (
            <p className={`${cfg.vendor} text-secondary truncate`}>{product.vendor}</p>
          )}

          <h3 className={`${cfg.name} text-on-surface line-clamp-2`}>{product.name}</h3>

          {product.rating !== undefined && (
            <StarRating rating={product.rating} count={product.reviewCount} />
          )}

          <p className={`${cfg.price} text-primary`}>
            ${(product.price ?? 0).toFixed(2)}
          </p>
        </div>

        {/* Add to cart button */}
        <Button
          variant={isOutOfStock ? 'secondary' : 'primary'}
          fullWidth
          size="md"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="mt-3"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </Link>
    </motion.div>
  );
}
