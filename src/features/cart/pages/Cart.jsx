import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from "@/shared/context/CartContext";
import Button from '@/shared/components/Button';
import EmptyState from '@/shared/components/EmptyState';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const shipping = cart.length > 0 ? 15.00 : 0.00;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <main className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl pb-32 lg:pb-12">
        <div className="flex items-center justify-between mb-6 sm:mb-lg">
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Shopping Cart</h1>
          {cart.length > 0 && (
            <span className="text-body-sm text-secondary font-medium">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-8 sm:p-12 text-center shadow-subtle max-w-xl mx-auto">
            <EmptyState
              icon="shopping_cart"
              title="Your cart is empty"
              description="Explore verified multi-vendor products and add items to your cart."
              actionText="Explore Marketplace"
              onAction={() => navigate('/')}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-xl items-start">
            {/* Cart Items List */}
            <section className="lg:col-span-8 flex flex-col gap-3 sm:gap-sm">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest rounded-2xl p-3.5 sm:p-md shadow-subtle border border-outline-variant/40 flex items-center gap-3.5 sm:gap-md group"
                >
                  <Link to={`/product/${item.id}`} className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container-high rounded-xl overflow-hidden shrink-0 block">
                    <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" src={item.image} />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <span className="text-primary font-label-sm text-[11px] font-bold uppercase tracking-wider block mb-0.5">{item.vendor}</span>
                    <Link to={`/product/${item.id}`} className="block">
                      <h3 className="font-semibold text-sm sm:text-base text-on-surface truncate hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="font-bold text-on-surface buyer-price text-sm sm:text-base mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-sm shrink-0">
                    {/* Stepper */}
                    <div className="flex items-center border border-outline-variant/60 rounded-xl bg-surface-container-low overflow-hidden h-8 sm:h-9">
                      <button
                        className="w-8 h-full flex items-center justify-center text-secondary hover:bg-surface-container transition-colors text-sm font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-on-surface text-xs sm:text-sm">{item.quantity}</span>
                      <button
                        className="w-8 h-full flex items-center justify-center text-secondary hover:bg-surface-container transition-colors text-sm font-bold"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      className="p-1.5 text-secondary hover:text-error hover:bg-error-container/20 rounded-lg transition-colors"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <span className="material-symbols-outlined text-lg sm:text-xl">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </section>

            {/* Desktop Cart Summary */}
            <section className="hidden lg:block lg:col-span-4">
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 shadow-subtle flex flex-col gap-4 sticky top-24">
                <h3 className="font-bold text-lg text-on-surface border-b border-outline-variant/40 pb-3">Order Summary</h3>
                
                <div className="flex justify-between text-body-sm text-secondary">
                  <span>Subtotal</span>
                  <span className="font-semibold text-on-surface">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body-sm text-secondary">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-on-surface">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body-sm text-secondary">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-on-surface">${tax.toFixed(2)}</span>
                </div>

                <div className="h-px bg-outline-variant/40 my-1" />

                <div className="flex justify-between items-baseline font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary text-2xl font-bold buyer-price">${grandTotal.toFixed(2)}</span>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleCheckout}
                  className="mt-2 rounded-xl"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Dedicated Sticky Mobile Checkout Bar */}
      {cart.length > 0 && (
        <aside className="fixed bottom-20 inset-x-3 z-30 lg:hidden pointer-events-auto">
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-surface-container-lowest/95 dark:bg-inverse-surface/95 backdrop-blur-xl border border-outline-variant/60 shadow-xl">
            <div className="flex flex-col min-w-0 pl-1">
              <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Total (incl. tax)</span>
              <span className="text-xl font-black text-primary buyer-price leading-tight">${grandTotal.toFixed(2)}</span>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleCheckout}
              className="rounded-xl px-5 font-semibold text-sm shadow-md"
            >
              Checkout ({cart.reduce((a, b) => a + b.quantity, 0)})
            </Button>
          </div>
        </aside>
      )}
    </>
  );
}
