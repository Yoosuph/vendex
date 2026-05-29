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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Wishlist</h1>
          <p className="text-[14px] text-gray-500 mt-0.5">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map(product => (
            <div key={product.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all">
              {/* Image */}
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ cursor: 'pointer' }}
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-white transition-all active:scale-90"
                >
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
              </div>

              {/* Content */}
              <div className="p-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider truncate">
                  {product.vendor || product.brand || 'Unknown'}
                </p>
                <h3 className="text-[13px] font-semibold text-gray-900 mt-0.5 line-clamp-2 leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[15px] font-bold text-gray-900">${(product.price || 0).toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-container shadow-sm active:scale-90 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
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
