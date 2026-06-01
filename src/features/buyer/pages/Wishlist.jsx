import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '@/shared/context/CartContext';
import ProductCard from '@/shared/components/ProductCard';
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
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isWishlisted={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
