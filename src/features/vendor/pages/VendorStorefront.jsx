import React, { useContext, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from '@/shared/context/CartContext';
import { AuthContext } from '@/shared/context/AuthContext';
import ProductCard from '@/shared/components/ProductCard';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';

export default function VendorStorefront() {
  const { vendorId: paramVendorId } = useParams();
  const { products, loading } = useContext(MarketplaceContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Use URL param for public store view, or logged-in vendor's ID for console
  const vendorId = paramVendorId || user?.vendorId || products[0]?.vendorId;

  const vendorProducts = useMemo(() => {
    if (!vendorId) return [];
    return products.filter(p => p.vendorId === vendorId);
  }, [products, vendorId]);

  const vendorName = vendorProducts[0]?.vendor || 'Vendor Store';

  if (loading) return <LoadingSpinner text="Loading storefront..." />;

  return (
    <>
      <nav className="w-full bg-surface-container-lowest shadow-sm sticky top-16 z-40">
        <div className="max-w-container-max mx-auto px-gutter flex gap-lg">
          <Button variant="outline">Products</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Reviews</Button>
          <Button variant="ghost">Policies</Button>
        </div>
      </nav>
      <div className="max-w-container-max mx-auto px-gutter py-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <section className="md:col-span-9">
            <div className="flex justify-between items-center mb-md">
              <h2 className="font-headline-md text-headline-md">All Products ({vendorProducts.length})</h2>
              <div className="flex gap-sm">
                <select className="bg-surface-container-lowest border-outline-variant rounded-lg text-body-sm px-md py-xs focus:border-primary focus:ring-primary">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {vendorProducts.length === 0 ? (
              <EmptyState
                icon="storefront"
                title="No products in this store"
                description="This vendor hasn't listed any products yet."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {vendorProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}

            {vendorProducts.length > 0 && (
              <div className="mt-xl flex justify-center items-center gap-sm">
                <Button variant="primary"><span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span></Button>
                <Button variant="primary">1</Button>
                {vendorProducts.length > 3 && (
                  <>
                    <Button variant="primary">2</Button>
                  </>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
