import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from "@/shared/context/CartContext";
import Button from '@/shared/components/Button';
import { motion } from 'framer-motion';

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
<main className="max-w-container-max mx-auto px-gutter py-xl">
 <h1 className="font-headline-lg text-headline-lg text-on-surface mb-lg">Shopping Cart</h1>

 {cart.length === 0 ? (
 <div className="text-center py-xl bg-white border border-outline-variant/30 rounded-2xl p-lg">
 <span className="material-symbols-outlined text-[64px] text-secondary mb-md">shopping_cart</span>
 <p className="font-body-lg text-body-lg text-secondary mb-lg">Your cart is currently empty.</p>
 <Button variant="primary" to="/" size="lg">
 Go Shopping
 </Button>
 </div>
 ) : (
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
 {/* Cart Items List */}
 <section className="lg:col-span-8 flex flex-col gap-sm">
 {cart.map((item) => (
 <div
 key={item.id}
 className="bg-white rounded-xl p-md shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center gap-md"
 >
 <div className="w-20 h-20 bg-surface-container-high rounded-lg overflow-hidden flex-shrink-0">
 <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
 </div>
 <div className="flex-1 min-w-0">
 <span className="text-primary font-label-sm text-label-sm block mb-[2px]">{item.vendor}</span>
 <h3 className="font-headline-md text-headline-md text-body-lg text-on-surface truncate mb-1">
 {item.name}
 </h3>
 <p className="font-bold text-on-surface-variant text-body-sm">${item.price.toFixed(2)}</p>
 </div>
 <div className="flex items-center gap-sm">
 {/* Quantity Controls */}
 <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-low overflow-hidden">
 <button
 className="px-3 py-1 text-secondary hover:bg-surface-container transition-colors"
 onClick={() => updateQuantity(item.id, item.quantity - 1)}
 >
 -
 </button>
 <span className="px-3 font-bold text-on-surface font-body-sm">{item.quantity}</span>
 <button
 className="px-3 py-1 text-secondary hover:bg-surface-container transition-colors"
 onClick={() => updateQuantity(item.id, item.quantity + 1)}
 >
 +
 </button>
 </div>
 {/* Trash Button */}
 <button
 className="p-2 text-secondary hover:text-error hover:bg-error-container/10 rounded-full transition-all"
 onClick={() => removeFromCart(item.id)}
 >
 <span className="material-symbols-outlined text-body-lg">delete</span>
 </button>
 </div>
 </div>
 ))}
 </section>

 {/* Cart Summary */}
 <section className="lg:col-span-4">
 <div className="bg-white rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col gap-md">
 <h3 className="font-headline-md text-headline-md border-b border-outline-variant pb-xs">Order Summary</h3>
 
 <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
 <span>Subtotal</span>
 <span className="font-bold text-on-surface">${cartTotal.toFixed(2)}</span>
 </div>
 <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
 <span>Estimated Shipping</span>
 <span className="font-bold text-on-surface">${shipping.toFixed(2)}</span>
 </div>
 <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
 <span>Estimated Tax (8%)</span>
 <span className="font-bold text-on-surface">${tax.toFixed(2)}</span>
 </div>

 <div className="h-px bg-outline-variant"></div>

 <div className="flex justify-between font-headline-md text-headline-md">
 <span>Total</span>
 <span className="text-primary font-black">${grandTotal.toFixed(2)}</span>
 </div>

 <Button
 variant="primary-container"
 fullWidth
 size="lg"
 onClick={handleCheckout}
 className="mt-sm"
 >
 Proceed to Checkout
 </Button>
 </div>
 </section>
 </div>
 )}
 </main>
</>
 );
}
