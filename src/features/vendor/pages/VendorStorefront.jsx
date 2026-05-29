import React, { useContext, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { CartContext } from '@/shared/context/CartContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import Button from '@/shared/components/Button';

export default function VendorStorefront() {
  const { vendorId: paramVendorId } = useParams();
  const { products, loading } = useContext(MarketplaceContext);
  const { addToCart } = useContext(CartContext);

  // Use the first vendor ID from products if no param, or the provided one
  const vendorId = paramVendorId || products[0]?.vendorId;

  const vendorProducts = useMemo(() => {
    if (!vendorId) return [];
    return products.filter(p => p.vendorId === vendorId);
  }, [products, vendorId]);

  const vendorName = vendorProducts[0]?.vendor || 'Vendor Store';

  if (loading) return <LoadingSpinner text="Loading storefront..." />;

  return (
    <>
      <nav className="w-full bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-container-max mx-auto px-gutter flex gap-lg">
          <Button variant="outline">Products</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Reviews</Button>
          <Button variant="ghost">Policies</Button>
        </div>
      </nav>
      <main className="max-w-container-max mx-auto px-gutter py-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <section className="md:col-span-9">
            <div className="flex justify-between items-center mb-md">
              <h2 className="font-headline-md text-headline-md">All Products ({vendorProducts.length})</h2>
              <div className="flex gap-sm">
                <select className="bg-white border-outline-variant rounded-lg text-body-sm px-md py-xs focus:border-primary focus:ring-primary">
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
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden product-card-shadow flex flex-col group">
                    <div className="relative aspect-square overflow-hidden bg-surface-container">
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={product.image}
                      />
                      {product.stock <= 5 && product.stock > 0 && (
                        <span className="absolute top-sm right-sm bg-white/90 backdrop-blur-md px-xs py-1 rounded text-meta font-bold text-primary">LOW STOCK</span>
                      )}
                    </div>
                    <div className="p-sm flex-grow">
                      <p className="text-meta text-on-surface-variant mb-xs">{product.category}</p>
                      <h3 className="font-label-md text-on-surface mb-xs group-hover:text-primary transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-xs mb-md">
                        <span className="material-symbols-outlined text-[14px] text-primary" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="text-meta font-bold">{product.rating || '4.0'}</span>
                        <span className="text-meta text-on-surface-variant">({product.reviewsCount || 0})</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="font-headline-md text-on-surface">${(product.price || 0).toFixed(2)}</span>
                        <Button variant="primary" onClick={() => addToCart(product)}><span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span></Button>
                      </div>
                    </div>
                  </div>
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
      </main>
    </>
  );
}
