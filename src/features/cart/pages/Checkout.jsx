import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from "@/shared/context/CartContext";
import { AuthContext } from "@/shared/context/AuthContext";
import Button from '@/shared/components/Button';
import useForm from '@/shared/hooks/useForm';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

 export default function Checkout() {
 const { cart, cartTotal, checkoutAndCommit } = useContext(CartContext);
 const { user } = useContext(AuthContext);
 const navigate = useNavigate();

 const [loading, setLoading] = useState(false);

 if (cart.length === 0) {
   return (
     <main className="max-w-container-max mx-auto px-gutter py-xl">
       <div className="text-center py-xl bg-white border border-outline-variant/30 rounded-2xl p-lg">
         <span className="material-symbols-outlined text-[64px] text-secondary mb-md">shopping_cart</span>
         <p className="font-body-lg text-body-lg text-secondary mb-lg">Your cart is empty. Add some items before checking out.</p>
         <Button variant="primary" to="/" size="lg">Go Shopping</Button>
       </div>
     </main>
   );
 }

 const shipping = 15.00;
 const tax = cartTotal * 0.08;
 const grandTotal = cartTotal + shipping + tax;

 const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm({
   initialValues: {
     firstName: user?.name?.split(' ')[0] || '',
     lastName: user?.name?.split(' ').slice(1).join(' ') || '',
     address: '',
     city: '',
     zip: '',
     cardName: user?.name || '',
     cardNumber: '',
     expDate: '',
     cvv: '',
   },
   validate: (vals) => {
     const newErrors = {};
     if (!vals.firstName.trim()) newErrors.firstName = 'First name is required';
     if (!vals.lastName.trim()) newErrors.lastName = 'Last name is required';
     if (!vals.address.trim()) newErrors.address = 'Address is required';
     if (!vals.city.trim()) newErrors.city = 'City is required';
     if (!vals.zip.trim()) newErrors.zip = 'ZIP code is required';
     return newErrors;
   },
   onSubmit: async (vals) => {
     setLoading(true);
     const order = checkoutAndCommit(
       user?.id || 'u_buyer',
       {
         firstName: vals.firstName,
         lastName: vals.lastName,
         address: vals.address,
         city: vals.city,
         zip: vals.zip
       },
       { cardName: vals.cardName, cardNumber: vals.cardNumber }
     );
     navigate('/order-confirmation', { state: { order } });
   },
 });

 return (
 <>
<main className="max-w-container-max mx-auto px-gutter py-xl">
 <h1 className="font-headline-lg text-headline-lg text-on-surface mb-lg">Checkout</h1>

 <form className="grid grid-cols-1 lg:grid-cols-12 gap-xl" onSubmit={handleSubmit}>
 {/* Shipping and Payment Info */}
 <section className="lg:col-span-8 flex flex-col gap-lg bg-white p-lg rounded-2xl border border-outline-variant/30 shadow-sm">
 
       {/* Shipping Address */}
       <div>
         <h3 className="font-headline-md text-headline-md mb-md border-b border-outline-variant pb-xs">Shipping Address</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
           <div className="space-y-xs">
             <label className="font-label-md text-label-md text-on-surface-variant block">First Name</label>
             <input
               className={cn('w-full px-sm py-sm border rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none', touched.firstName && errors.firstName ? 'border-error' : 'border-outline-variant')}
               type="text"
               name="firstName"
               required
               value={values.firstName}
               onChange={handleChange}
               onBlur={handleBlur}
             />
             {touched.firstName && errors.firstName && <p className="text-error text-meta">{errors.firstName}</p>}
           </div>
           <div className="space-y-xs">
             <label className="font-label-md text-label-md text-on-surface-variant block">Last Name</label>
             <input
               className={cn('w-full px-sm py-sm border rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none', touched.lastName && errors.lastName ? 'border-error' : 'border-outline-variant')}
               type="text"
               name="lastName"
               required
               value={values.lastName}
               onChange={handleChange}
               onBlur={handleBlur}
             />
             {touched.lastName && errors.lastName && <p className="text-error text-meta">{errors.lastName}</p>}
           </div>
           <div className="space-y-xs sm:col-span-2">
             <label className="font-label-md text-label-md text-on-surface-variant block">Address</label>
             <input
               className={cn('w-full px-sm py-sm border rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none', touched.address && errors.address ? 'border-error' : 'border-outline-variant')}
               type="text"
               name="address"
               required
               value={values.address}
               onChange={handleChange}
               onBlur={handleBlur}
             />
             {touched.address && errors.address && <p className="text-error text-meta">{errors.address}</p>}
           </div>
           <div className="space-y-xs">
             <label className="font-label-md text-label-md text-on-surface-variant block">City</label>
             <input
               className={cn('w-full px-sm py-sm border rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none', touched.city && errors.city ? 'border-error' : 'border-outline-variant')}
               type="text"
               name="city"
               required
               value={values.city}
               onChange={handleChange}
               onBlur={handleBlur}
             />
             {touched.city && errors.city && <p className="text-error text-meta">{errors.city}</p>}
           </div>
           <div className="space-y-xs">
             <label className="font-label-md text-label-md text-on-surface-variant block">ZIP / Postal Code</label>
             <input
               className={cn('w-full px-sm py-sm border rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none', touched.zip && errors.zip ? 'border-error' : 'border-outline-variant')}
               type="text"
               name="zip"
               required
               value={values.zip}
               onChange={handleChange}
               onBlur={handleBlur}
             />
             {touched.zip && errors.zip && <p className="text-error text-meta">{errors.zip}</p>}
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
               name="cardName"
               required
               value={values.cardName}
               onChange={handleChange}
             />
           </div>
           <div className="space-y-xs sm:col-span-2">
             <label className="font-label-md text-label-md text-on-surface-variant block">Card Number</label>
             <input
               className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
               type="text"
               name="cardNumber"
               required
               value={values.cardNumber}
               onChange={handleChange}
             />
           </div>
           <div className="space-y-xs">
             <label className="font-label-md text-label-md text-on-surface-variant block">Expiration Date</label>
             <input
               className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
               type="text"
               name="expDate"
               placeholder="MM/YY"
               required
               value={values.expDate}
               onChange={handleChange}
             />
           </div>
           <div className="space-y-xs">
             <label className="font-label-md text-label-md text-on-surface-variant block">CVV</label>
             <input
               className="w-full px-sm py-sm border border-outline-variant rounded-lg bg-surface-container-low focus:ring-1 focus:ring-primary outline-none"
               type="password"
               name="cvv"
               maxLength="4"
               required
               value={values.cvv}
               onChange={handleChange}
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

 <Button
 variant="primary-container"
 fullWidth
 size="lg"
 type="submit"
 loading={loading ? "Processing..." : false}
 className="mt-sm"
 >
 Place Order
 </Button>
 </div>
 </section>
 </form>
 </main>
</>
 );
}
