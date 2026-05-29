import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/shared/components/Button';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  // If no order data, redirect to home
  if (!order) {
    return <Navigate to="/" replace />;
  }

  // Group items by vendor
  const itemsByVendor = order.items.reduce((acc, item) => {
    const vendor = item.vendor || 'Unknown Vendor';
    if (!acc[vendor]) acc[vendor] = [];
    acc[vendor].push(item);
    return acc;
  }, {});

  const shipping = 15.00;
  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-start py-xl px-gutter max-w-[800px] mx-auto w-full">

        <div className="flex flex-col items-center text-center mb-xl">
          <div className="success-checkmark-animation bg-primary-container rounded-full p-lg mb-md inline-flex shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined text-white text-[64px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}>check_circle</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Thank you for your order!</h1>
          <p className="font-body-lg text-body-lg text-secondary mb-base">Your transaction was successful and your items are being prepared.</p>
          <div className="mt-md px-sm py-xs bg-surface-container-high rounded-full">
            <span className="font-label-md text-label-md text-on-surface">Order ID: <span className="font-bold">#{order.id}</span></span>
          </div>
        </div>

        <section className="w-full space-y-gutter">

          <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-md">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Estimated Delivery</p>
                <p className="font-headline-md text-headline-md text-on-surface">3-5 Business Days</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="font-body-sm text-body-sm text-secondary">Standard Shipping</p>
              <p className="font-label-md text-label-md text-on-surface-variant">
                {order.shippingDetails?.city}, {order.shippingDetails?.zip}
              </p>
            </div>
          </div>

          <div className="space-y-sm">
            <h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest px-xs">Items Summary</h3>

            {Object.entries(itemsByVendor).map(([vendor, items]) => (
              <div key={vendor} className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden border border-outline-variant/30">
                <div className="bg-surface-container-low px-md py-sm border-b border-outline-variant/20 flex justify-between items-center">
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-primary text-body-lg">storefront</span>
                    <span className="font-label-md text-label-md font-bold">{vendor}</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary">{items.length} Item{items.length !== 1 ? 's' : ''}</span>
                </div>
                {items.length > 1 && (
                  <div className="p-md space-y-md">
                    {items.map((item, idx) => (
                      <React.Fragment key={item.id}>
                        {idx > 0 && <div className="h-px bg-outline-variant/20"></div>}
                        <div className="flex gap-md items-center">
                          <img alt={item.name} className="w-20 h-20 object-cover rounded-lg" src={item.image} />
                          <div className="flex-grow">
                            <h4 className="font-body-md text-body-md font-bold text-on-surface">{item.name}</h4>
                            <p className="font-body-sm text-body-sm text-secondary">Qty: {item.quantity}</p>
                            <p className="font-body-md text-body-md text-primary font-bold mt-xs">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
                {items.length === 1 && (
                  <div className="p-md flex gap-md items-center">
                    <img alt={items[0].name} className="w-20 h-20 object-cover rounded-lg" src={items[0].image} />
                    <div className="flex-grow">
                      <h4 className="font-body-md text-body-md font-bold text-on-surface">{items[0].name}</h4>
                      <p className="font-body-sm text-body-sm text-secondary">Qty: {items[0].quantity}</p>
                      <p className="font-body-md text-body-md text-primary font-bold mt-xs">${items[0].price.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-outline-variant/30">
            <div className="space-y-xs">
              <div className="flex justify-between font-body-sm text-body-sm">
                <span className="text-secondary">Subtotal</span>
                <span className="text-on-surface">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm">
                <span className="text-secondary">Shipping</span>
                <span className="text-on-surface">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm">
                <span className="text-secondary">Taxes (8%)</span>
                <span className="text-on-surface">${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-outline-variant/30 my-sm"></div>
              <div className="flex justify-between font-headline-md text-headline-md">
                <span className="text-on-surface">Total</span>
                <span className="text-primary font-bold">${order.total ? order.total.toFixed(2) : (subtotal + shipping + tax).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full flex flex-col sm:flex-row gap-sm mt-xl">
 <Button
 variant="primary"
 to="/my-orders"
 icon={<span className="material-symbols-outlined">track_changes</span>}
 className="flex-1"
 >
 Track Order
 </Button>
 <Button
 variant="outline"
 to="/"
 icon={<span className="material-symbols-outlined">shopping_bag</span>}
 className="flex-1"
 >
 Continue Shopping
 </Button>
        </div>
        <div className="mt-lg text-center">
          <p className="font-body-sm text-body-sm text-secondary">
            A confirmation email has been sent to <span className="text-on-surface font-medium">
              {order.shippingDetails?.email || 'user@example.com'}
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
