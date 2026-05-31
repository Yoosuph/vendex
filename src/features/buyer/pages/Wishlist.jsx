import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '@/shared/context/CartContext';
import Button from '@/shared/components/Button';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, loading } = useContext(CartContext);
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner text="Loading wishlist..." />;

  return (
    <div className="space-y-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
        <div>
          <h1 className="text-headline-md font-bold text-on-surface">Wishlist</h1>
          <p className="text-body-sm text-on-surface-variant mt-base">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>
        {wishlist.length > 0 && (
          <Button variant="outline" size="sm" to="/search">Browse More</Button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <EmptyState
          icon="favorite"
          title="Your wishlist is empty"
          description="Save items you love and come back to them anytime."
          actionLabel="Browse Products"
          onAction={() => navigate('/search')}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
          {wishlist.map(product => (
            <div key={product.id} className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden hover:border-outline hover:shadow-sm transition-all">
              <div className="relative aspect-square bg-surface-container overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-sm right-sm w-8 h-8 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm text-error hover:bg-surface-container-lowest transition-all active:scale-90"
                >
                  <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
              </div>
              <div className="p-sm">
                <p className="text-meta font-semibold text-on-surface-variant uppercase tracking-wider truncate">
                  {product.vendor || product.brand || 'Unknown'}
                </p>
                <h3 className="text-body-sm font-semibold text-on-surface mt-xs line-clamp-2 leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-sm">
                  <span className="text-body-lg font-bold text-on-surface">${(product.price || 0).toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container shadow-sm active:scale-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
