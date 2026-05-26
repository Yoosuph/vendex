import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: 'Alexander',
    lastName: 'Great',
    address: '124 Commerce St.',
    city: 'San Francisco',
    zip: '94103',
    cardName: 'Alexander Great',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '123'
  });

  const shipping = 15.00;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <>
      <Header />
      <main className="max-w-container-max mx-auto px-gutter py-xl">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-lg">Checkout</h1>

        <form className="grid grid-cols-1 lg:grid-cols-12 gap-xl" onSubmit={handlePlaceOrder}>
          {/* Shipping and Payment Info */}
          <section className="lg:col-span-8 flex flex-col gap-lg bg-white p-lg rounded-2xl border border-outline-variant/30 shadow-sm">
            
            {/* Shipping Address */}
            <div>
              <h3 className="font-headline-md text-headline-md mb-md border-b border-outline-variant pb-xs">Shipping Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant block">First Name</label>
                  <input
                    className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Last Name</label>
                  <input
                    className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-xs sm:col-span-2">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Address</label>
                  <input
                    className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant block">City</label>
                  <input
                    className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant block">ZIP / Postal Code</label>
                  <input
                    className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="font-headline-md text-headline-md mb-md border-b border-outline-variant pb-xs">Payment Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                <div className="space-y-xs sm:col-span-2">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Name on Card</label>
                  <input
                    className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    required
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                  />
                </div>
                <div className="space-y-xs sm:col-span-2">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Card Number</label>
                  <input
                    className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant block">Expiration Date</label>
                  <input
                    className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    placeholder="MM/YY"
                    required
                    value={formData.expDate}
                    onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant block">CVV</label>
                  <input
                    className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
                    type="password"
                    maxLength="4"
                    required
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Cart Item Summary & Place Order */}
          <section className="lg:col-span-4 flex flex-col gap-md">
            <div className="bg-white rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col gap-md">
              <h3 className="font-headline-md text-headline-md border-b border-outline-variant pb-xs">Your Order</h3>
              
              <div className="max-h-64 overflow-y-auto space-y-sm pr-xs hide-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-sm items-center">
                    <div className="w-12 h-12 bg-surface-container-high rounded-md overflow-hidden flex-shrink-0">
                      <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-label-md text-label-md text-on-surface truncate">{item.name}</h4>
                      <p className="font-meta text-meta text-secondary">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <span className="font-bold text-body-sm text-on-surface">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-outline-variant"></div>

              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="h-px bg-outline-variant"></div>

              <div className="flex justify-between font-headline-md text-headline-md">
                <span>Total</span>
                <span className="text-primary font-black">${grandTotal.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-md bg-primary-container text-white rounded-lg font-bold text-headline-md hover:bg-[#96101F] transition-all shadow-md mt-sm active:scale-[0.98]"
              >
                Place Order
              </button>
            </div>
          </section>
        </form>
      </main>
      <Footer />
    </>
  );
}
