import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "@/shared/context/AuthContext";
import Button from '@/shared/components/Button';
import useForm from '@/shared/hooks/useForm';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function LoginSignUp() {
 const { login, signup } = useContext(AuthContext);
 const navigate = useNavigate();

 const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
 const [role, setRole] = useState('shop'); // 'shop' (buyer) or 'sell' (vendor)
  const [errorMsg, setErrorMsg] = useState('');
  const [socialLoading, setSocialLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useForm({
   initialValues: { email: '', password: '' },
   validate: (vals) => {
     const errs = {};
     if (!vals.email) errs.email = 'Please enter an email address.';
     else if (!vals.email.includes('@')) errs.email = 'Please enter a valid email address.';
     if (vals.password.length < 6) errs.password = 'Password must be at least 6 characters.';
     return errs;
   },
   onSubmit: async (vals) => {
      setErrorMsg('');
      const selectedRole = activeTab === 'signup' && role === 'sell' ? 'vendor' : undefined;

      try {
        let authUser;
        if (activeTab === 'signup') {
          const name = vals.email.split('@')[0];
          authUser = signup(name, vals.email, vals.password, selectedRole || 'buyer');
        } else {
          authUser = login(vals.email, vals.password);
        }

       if (authUser.role === 'admin') {
         navigate('/admin');
       } else if (authUser.role === 'vendor') {
         navigate('/vendor');
       } else {
         navigate('/');
       }
     } catch (err) {
       setErrorMsg(err.message || 'Authentication failed. Please try again.');
     }
   }
 });

 const handleSocialLogin = (demoRole) => {
 let demoEmail = 'buyer@vendex.com';
 if (demoRole === 'vendor') demoEmail = 'vendor@vendex.com';
 if (demoRole === 'admin') demoEmail = 'admin@vendex.com';
 
 setSocialLoading(true);
 setErrorMsg('');
 try {
 const loggedUser = login(demoEmail, 'password');
 if (loggedUser.role === 'admin') {
 navigate('/admin');
 } else if (loggedUser.role === 'vendor') {
 navigate('/vendor');
 } else {
 navigate('/');
 }
 } catch (err) {
 setErrorMsg(err.message || 'Invalid credentials. Please try again.');
 } finally {
 setSocialLoading(false);
 }
 };

 return (
 <main className="min-h-screen flex flex-col md:flex-row bg-surface font-body-md text-on-surface">
 {/* Left Panel: Branding & Identity */}
 <section className="w-full md:w-[45%] lg:w-[40%] bg-primary-container relative flex flex-col justify-between p-lg lg:p-xl overflow-hidden">
 {/* Background Abstract Pattern Overlay */}
 <div className="absolute inset-0 pattern-bg opacity-30 pointer-events-none"></div>
 <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary opacity-20 blur-3xl rounded-full pointer-events-none"></div>
 
 {/* Branding Content */}
 <div className="relative z-10">
 <Link to="/" className="flex items-center gap-xs">
 <span className="material-symbols-outlined text-white text-headline-lg icon-filled">shopping_bag</span>
 <h1 className="font-headline-md text-headline-md text-white tracking-tight">Vendex</h1>
 </Link>
 </div>
 
 <div className="relative z-10 max-w-md my-8 md:my-0">
 <h2 className="font-display-lg text-display-lg text-white mb-sm">Buy. Sell. Grow.</h2>
 <p className="font-body-lg text-body-lg text-on-primary-container opacity-90">
 Join the world's most trusted multi-vendor marketplace. Secure transactions, curated quality, and professional tools for global commerce.
 </p>
 </div>
 
 <div className="relative z-10">
 <div className="flex gap-md">
 <div className="flex -space-x-2">
 <img alt="User 1" className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZd74X4igPsPtC4PwLzDnuMlietfIpkrEEu0K0w_i1Ldgx9lLslYDGSmzWQxddeU4hvPV0kkjOr-Ee82EWa2xUxdRCyV80nNJP5GWz89qN2707uBV95jIyK9j0VTeB6e1ILgaUSUfmPD4A1Zydl8tOxE-PG3I1mqxGZxmeZ--j5-H_e2LKAa_SUexdVNTwWkhJfVs9JyS3FctiHy3tzGbHYdV7Gg9Cjz79i4LNMNDSshA3tq9pa6YMw1HlDoBj3rSgB1wjSlCQmZH3" />
 <img alt="User 2" className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2ApppA-D9FM720E93h_dS5YyXYG_2GiuPRg8ba09CUtaiJ9DS6YmdDGCfLkpxK2BeXBGUsxovLbmtXObE_yrp9-7V2c_ckiPFYWluVYJWqHX7Dre63NUCjf9aPZP1vmhLgk11QX8frg5oUCtU4k1GgKTdKpTuWV1a0dIbOM_OMKVwFmbTXcXU1_0UlBzvKNvznmeukR_XkPszzrtDHYTkkp2SoketPwZshHUW09d6EmrY4ChZjP1gP4U48t_Urv8ZMeWFbeMuOerU" />
 <div className="w-10 h-10 rounded-full bg-primary border-2 border-primary-container flex items-center justify-center text-white text-xs font-bold">+5k</div>
 </div>
 <p className="font-label-md text-label-md text-white flex items-center">Trusted by 5,000+ vendors worldwide</p>
 </div>
 </div>
 </section>

 {/* Right Panel: Authentication Canvas */}
 <section className="w-full md:w-[55%] lg:w-[60%] bg-surface-container-low flex items-center justify-center p-md lg:p-xl">
 <div className="w-full max-w-[480px] bg-white rounded-xl shadow-sm p-lg transition-all-custom">
 
 {/* Tab Toggle */}
 <div className="flex gap-lg border-b border-outline-variant mb-lg">
 <button
              className={cn('pb-base font-headline-md text-headline-md transition-all-custom', activeTab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary')}
 onClick={() => {
 setActiveTab('login');
 setErrorMsg('');
 }}
 >
 Login
 </button>
 <button
              className={cn('pb-base font-headline-md text-headline-md transition-all-custom', activeTab === 'signup' ? 'text-primary border-b-2 border-primary' : 'text-secondary hover:text-primary')}
 onClick={() => {
 setActiveTab('signup');
 setErrorMsg('');
 }}
 >
 Sign Up
 </button>
 </div>

 {/* Form Container */}
 <form className="space-y-md" onSubmit={handleSubmit}>
 {errorMsg && (
 <div className="p-3 bg-error/10 text-error rounded-lg text-body-sm font-medium">
 {errorMsg}
 </div>
 )}

 {/* Role Selector (Visible only on Sign Up) */}
 {activeTab === 'signup' && (
 <div className="animate-in fade-in slide-in-from-top-4 duration-500">
 <label className="font-label-md text-label-md text-on-surface-variant block mb-sm">I want to...</label>
 <div className="grid grid-cols-2 gap-sm">
 <div
                  className={cn('cursor-pointer p-sm border-2 rounded-lg bg-surface-container-low transition-all-custom', role === 'shop' ? 'border-primary' : 'border-outline-variant hover:border-primary')}
 onClick={() => setRole('shop')}
 >
 <span
              className={cn('material-symbols-outlined mb-xs', role === 'shop' ? 'text-primary icon-filled' : 'text-secondary')}
            >
 shopping_cart
 </span>
 <p className="font-label-md text-label-md font-bold text-on-surface">Shop</p>
 <p className="font-meta text-meta text-on-surface-variant">Find unique products</p>
 </div>
 <div
                  className={cn('cursor-pointer p-sm border-2 rounded-lg bg-surface-container-low transition-all-custom', role === 'sell' ? 'border-primary' : 'border-outline-variant hover:border-primary')}
 onClick={() => setRole('sell')}
 >
 <span
              className={cn('material-symbols-outlined mb-xs', role === 'sell' ? 'text-primary icon-filled' : 'text-secondary')}
            >
 storefront
 </span>
 <p className="font-label-md text-label-md font-bold text-on-surface">Sell</p>
 <p className="font-meta text-meta text-on-surface-variant">Grow your business</p>
 </div>
 </div>
 </div>
 )}

             {/* Input Fields */}
             <div className="space-y-sm">
               <div className="space-y-xs">
                 <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email Address</label>
                 <input
                    className={cn('w-full px-sm py-sm border rounded-lg bg-white focus:ring-0 focus:border-on-surface transition-all-custom outline-none placeholder:text-outline', touched.email && errors.email ? 'border-error' : 'border-outline-variant')}
                   id="email"
                   name="email"
                   placeholder="name@company.com"
                   type="email"
                   value={values.email}
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {touched.email && errors.email && <p className="text-error text-meta">{errors.email}</p>}
               </div>
               <div className="space-y-xs">
                 <div className="flex justify-between items-center">
                   <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                   {activeTab === 'login' && (
                     <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">Forgot password?</a>
                   )}
                 </div>
                 <input
                    className={cn('w-full px-sm py-sm border rounded-lg bg-white focus:ring-0 focus:border-on-surface transition-all-custom outline-none', touched.password && errors.password ? 'border-error' : 'border-outline-variant')}
                   id="password"
                   name="password"
                   placeholder="••••••••"
                   type="password"
                   value={values.password}
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {touched.password && errors.password && <p className="text-error text-meta">{errors.password}</p>}
               </div>
             </div>

             {/* CTA Button */}
 <Button
 variant="primary-container"
 fullWidth
 size="lg"
 type="submit"
 loading={isSubmitting ? "Signing in..." : false}
 className="shadow-md"
 >
 {activeTab === 'login' ? 'Login' : 'Create Account'}
 </Button>

 {/* Divider */}
 <div className="relative flex items-center py-xs">
 <div className="flex-grow border-t border-outline-variant"></div>
 <span className="flex-shrink mx-sm text-meta text-outline">or continue with</span>
 <div className="flex-grow border-t border-outline-variant"></div>
 </div>

 {/* Demo Quick Logins */}
 <div className="grid grid-cols-3 gap-xs">
 <Button
 variant="secondary"
 type="button"
 size="sm"
 icon={<span className="material-symbols-outlined text-body-lg text-primary">person</span>}
 onClick={() => handleSocialLogin('buyer')}
 className="flex-col py-2 text-meta font-label-md"
 >
 Demo Buyer
 </Button>
 <Button
 variant="secondary"
 type="button"
 size="sm"
 icon={<span className="material-symbols-outlined text-body-lg text-primary">store</span>}
 onClick={() => handleSocialLogin('vendor')}
 className="flex-col py-2 text-meta font-label-md"
 >
 Demo Vendor
 </Button>
 <Button
 variant="secondary"
 type="button"
 size="sm"
 icon={<span className="material-symbols-outlined text-body-lg text-primary">admin_panel_settings</span>}
 onClick={() => handleSocialLogin('admin')}
 className="flex-col py-2 text-meta font-label-md"
 >
 Demo Admin
 </Button>
 </div>

 {/* Legal */}
 <p className="text-center font-meta text-meta text-outline pt-md">
 By continuing, you agree to Vendex's <br />
 <Link className="text-on-surface hover:underline" to="#">Terms of Service</Link> and <Link className="text-on-surface hover:underline" to="#">Privacy Policy</Link>.
 </p>
 </form>
 </div>
 </section>
 </main>
 );
}
