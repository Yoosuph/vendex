import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '@/shared/context/CartContext';
import ProductCard from '@/shared/components/ProductCard';
import Button from '@/shared/components/Button';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import BuyerPageHeader from '../components/BuyerPageHeader';
import { useToast } from '@/shared/context/ToastContext';
import { formatMoney } from '../utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, loading } = useContext(CartContext);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [busy, setBusy] = useState(false);

  if (loading) return <LoadingSpinner text="Loading wishlist..." />;

  const totalValue = wishlist.reduce((s, p) => s + (Number(p.price) || 0), 0);

  const addAllToCart = () => {
    setBusy(true);
    let added = 0;
    wishlist.forEach((product) => {
      if (product.stock === 0) return;
      addToCart(product, 1);
      added += 1;
    });
    setBusy(false);
    if (added > 0) {
      addToast(`Added ${added} item${added === 1 ? '' : 's'} to cart`, 'success');
    } else {
      addToast('No in-stock items to add', 'info');
    }
  };

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="03  /  Wishlist"
        title="Saved items"
        description="Pieces you've bookmarked across the marketplace."
        actions={
          wishlist.length > 0 ? (
            <>
              <Button variant="outline" size="sm" to="/search">Browse more</Button>
              <Button
                variant="primary"
                size="sm"
                loading={busy}
                onClick={addAllToCart}
                icon={<span className="material-symbols-outlined text-lg">add_shopping_cart</span>}
              >
                Add all to cart
              </Button>
            </>
          ) : null
        }
      />

      {wishlist.length > 0 && (
        <div className="buyer-panel px-md py-sm flex flex-wrap items-center justify-between gap-sm">
          <p className="buyer-mono text-[11px] tracking-widest uppercase text-on-surface-variant">
            {String(wishlist.length).padStart(2, '0')} saved
          </p>
          <p className="buyer-price text-body-sm text-on-surface">
            Est. value {formatMoney(totalValue)}
          </p>
        </div>
      )}

      {wishlist.length === 0 ? (
        <div className="buyer-panel">
          <EmptyState
            icon="favorite"
            title="Your wishlist is empty"
            description="Save items you love and come back to them anytime."
            actionLabel="Browse products"
            onAction={() => navigate('/search')}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-md">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => {
                addToCart(p);
                addToast('Added to cart', 'success');
              }}
              onToggleWishlist={toggleWishlist}
              isWishlisted
            />
          ))}
        </div>
      )}
    </div>
  );
}
