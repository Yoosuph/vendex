import React, { useState, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/shared/context/AuthContext';
import { useToast } from '@/shared/context/ToastContext';
import Button from '@/shared/components/Button';
import VendexLogo from '@/shared/components/VendexLogo';
import useForm from '@/shared/hooks/useForm';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function LoginSignUp() {
  const { login, signup } = useContext(AuthContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [role, setRole] = useState('shop'); // 'shop' (buyer) or 'sell' (vendor)
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      storeName: '',
    },
    validate: (vals) => {
      const errs = {};
      if (activeTab === 'signup' && !vals.name?.trim()) {
        errs.name = 'Please enter your full name.';
      }
      if (!vals.email?.trim()) {
        errs.email = 'Please enter an email address.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
        errs.email = 'Please enter a valid email address.';
      }
      if (!vals.password) {
        errs.password = 'Please enter your password.';
      } else if (vals.password.length < 6) {
        errs.password = 'Password must be at least 6 characters.';
      }
      if (activeTab === 'signup' && role === 'sell' && !vals.storeName?.trim()) {
        errs.storeName = 'Please enter your business or store name.';
      }
      return errs;
    },
    onSubmit: async (vals) => {
      setErrorMsg('');
      const selectedRole = activeTab === 'signup' && role === 'sell' ? 'vendor' : 'buyer';

      try {
        let authUser;
        if (activeTab === 'signup') {
          const displayName = vals.name.trim() || vals.email.split('@')[0];
          const storeData = role === 'sell' ? { storeName: vals.storeName.trim() } : {};
          authUser = await signup(displayName, vals.email.trim(), vals.password, selectedRole, storeData);
          addToast('Account created successfully!', 'success');
        } else {
          authUser = await login(vals.email.trim(), vals.password);
          addToast(`Welcome back, ${authUser.name}!`, 'success');
        }

        if (authUser.role === 'admin') {
          navigate('/admin');
        } else if (authUser.role === 'vendor') {
          navigate('/vendor');
        } else {
          navigate('/buyer');
        }
      } catch (err) {
        setErrorMsg(err.message || 'Authentication failed. Please try again.');
        addToast(err.message || 'Authentication failed', 'error');
      }
    },
  });

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const p = values.password || '';
    if (!p) return { score: 0, label: '', color: 'bg-outline-variant' };
    let score = 0;
    if (p.length >= 6) score += 1;
    if (p.length >= 10) score += 1;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-error' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500' };
  }, [values.password]);

  const handleDemoLogin = async (demoRole) => {
    let demoEmail = 'buyer@vendex.com';
    if (demoRole === 'vendor') demoEmail = 'vendor@vendex.com';
    if (demoRole === 'admin') demoEmail = 'admin@vendex.com';

    setDemoLoading(true);
    setErrorMsg('');
    try {
      const loggedUser = await login(demoEmail, 'password');
      addToast(`Signed in as Demo ${demoRole.toUpperCase()}`, 'success');
      if (loggedUser.role === 'admin') {
        navigate('/admin');
      } else if (loggedUser.role === 'vendor') {
        navigate('/vendor');
      } else {
        navigate('/buyer');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials. Please try again.');
      addToast(err.message || 'Demo login failed', 'error');
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-surface text-on-surface">
      {/* Left Panel: Luxury Brand Showcase (Desktop/Tablet) */}
      <section className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0c0c0e] via-[#161418] to-[#1e1014] relative flex-col justify-between p-12 xl:p-16 overflow-hidden border-r border-outline-variant/30 text-white">
        {/* Background Ambient Glows & Grid */}
        <div className="absolute inset-0 pattern-bg opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <VendexLogo size="lg" linkTo="/" />
        </div>

        {/* Hero Value Props */}
        <div className="relative z-10 max-w-lg space-y-8 my-auto py-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            ENTERPRISE COMMERCE INFRASTRUCTURE
          </div>

          <h1 className="text-4xl xl:text-5xl font-black font-sans tracking-tight leading-[1.15] text-white">
            Curated Excellence,{' '}
            <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-200 bg-clip-text text-transparent">
              Engineered for Growth.
            </span>
          </h1>

          <p className="text-body-lg text-white/70 leading-relaxed">
            Experience next-generation multi-vendor commerce. Secure transactions, atomic escrow settlements, and verified luxury stores.
          </p>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="font-mono text-2xl font-bold text-white">$14.2M+</p>
              <p className="text-[11px] font-mono text-white/50 uppercase tracking-wider mt-0.5">GMV Volume</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-emerald-400">99.98%</p>
              <p className="text-[11px] font-mono text-white/50 uppercase tracking-wider mt-0.5">Platform SLA</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-amber-300">12.4k+</p>
              <p className="text-[11px] font-mono text-white/50 uppercase tracking-wider mt-0.5">Merchants</p>
            </div>
          </div>
        </div>

        {/* Social Proof Footer */}
        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full ring-2 ring-black bg-gradient-to-tr from-primary to-rose-400 flex items-center justify-center font-bold text-[10px] text-white">AG</div>
              <div className="w-8 h-8 rounded-full ring-2 ring-black bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center font-bold text-[10px] text-black">NO</div>
              <div className="w-8 h-8 rounded-full ring-2 ring-black bg-gradient-to-tr from-indigo-500 to-purple-400 flex items-center justify-center font-bold text-[10px] text-white">AU</div>
            </div>
            <span>Trusted by 5,000+ certified sellers</span>
          </div>
          <span className="font-mono">v2.4.0 · SOC2 Compliant</span>
        </div>
      </section>

      {/* Right Panel: Authentication Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-6">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <VendexLogo size="md" linkTo="/" />
            <Link to="/" className="text-xs font-mono text-secondary hover:text-primary transition-colors">
              Back to Shop →
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-3xl shadow-xl p-6 sm:p-8 relative">
            {/* Header Title & Segmented Toggle */}
            <div className="space-y-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight">
                  {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
                </h2>
                <p className="text-body-sm text-secondary mt-1">
                  {activeTab === 'login'
                    ? 'Enter your credentials to access your portal'
                    : 'Join Vendex as a luxury shopper or verified seller'}
                </p>
              </div>

              {/* Segmented Tab Pill */}
              <div className="grid grid-cols-2 p-1 bg-surface-container rounded-2xl border border-outline-variant/40">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMsg('');
                  }}
                  className={cn(
                    'py-2 text-body-sm font-bold rounded-xl transition-all relative',
                    activeTab === 'login'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-secondary hover:text-on-surface'
                  )}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signup');
                    setErrorMsg('');
                  }}
                  className={cn(
                    'py-2 text-body-sm font-bold rounded-xl transition-all relative',
                    activeTab === 'signup'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-secondary hover:text-on-surface'
                  )}
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-5 p-3.5 bg-error-container/40 border border-error/30 text-error rounded-xl text-body-sm flex items-center gap-2 animate-in fade-in duration-200">
                <span className="material-symbols-outlined text-lg shrink-0">error</span>
                <span className="flex-1">{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selector (Sign Up Mode Only) */}
              <AnimatePresence>
                {activeTab === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-secondary">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setRole('shop')}
                        className={cn(
                          'p-3 rounded-xl border text-left transition-all flex items-start gap-2.5',
                          role === 'shop'
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-outline-variant bg-surface-container-low hover:border-outline'
                        )}
                      >
                        <span className={cn('material-symbols-outlined text-xl', role === 'shop' ? 'text-primary' : 'text-secondary')}>
                          shopping_bag
                        </span>
                        <div>
                          <p className="text-body-sm font-bold text-on-surface">VIP Buyer</p>
                          <p className="text-[10px] text-secondary">Shop & earn points</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRole('sell')}
                        className={cn(
                          'p-3 rounded-xl border text-left transition-all flex items-start gap-2.5',
                          role === 'sell'
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-outline-variant bg-surface-container-low hover:border-outline'
                        )}
                      >
                        <span className={cn('material-symbols-outlined text-xl', role === 'sell' ? 'text-primary' : 'text-secondary')}>
                          storefront
                        </span>
                        <div>
                          <p className="text-body-sm font-bold text-on-surface">Merchant</p>
                          <p className="text-[10px] text-secondary">Sell products</p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full Name (Sign Up Only) */}
              {activeTab === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-secondary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Alexander Great"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      'w-full px-3.5 py-2.5 rounded-xl border bg-surface-container-low text-on-surface text-body-sm outline-none transition-all',
                      touched.name && errors.name
                        ? 'border-error focus:ring-1 focus:ring-error'
                        : 'border-outline-variant/60 focus:border-primary focus:bg-surface-container-lowest'
                    )}
                  />
                  {touched.name && errors.name && (
                    <p className="text-error text-xs font-medium">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Store Name (Merchant Sign Up Only) */}
              {activeTab === 'signup' && role === 'sell' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-secondary">
                    Brand / Store Name
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    placeholder="Bespoke Tech Lab"
                    value={values.storeName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      'w-full px-3.5 py-2.5 rounded-xl border bg-surface-container-low text-on-surface text-body-sm outline-none transition-all',
                      touched.storeName && errors.storeName
                        ? 'border-error focus:ring-1 focus:ring-error'
                        : 'border-outline-variant/60 focus:border-primary focus:bg-surface-container-lowest'
                    )}
                  />
                  {touched.storeName && errors.storeName && (
                    <p className="text-error text-xs font-medium">{errors.storeName}</p>
                  )}
                </div>
              )}

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-secondary">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-lg">
                    mail
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="buyer@vendex.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      'w-full pl-10 pr-3.5 py-2.5 rounded-xl border bg-surface-container-low text-on-surface text-body-sm outline-none transition-all',
                      touched.email && errors.email
                        ? 'border-error focus:ring-1 focus:ring-error'
                        : 'border-outline-variant/60 focus:border-primary focus:bg-surface-container-lowest'
                    )}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-error text-xs font-medium">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-secondary">
                    Password
                  </label>
                  {activeTab === 'login' && (
                    <button
                      type="button"
                      onClick={() => addToast('Password reset link sent in demo mode', 'info')}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-lg">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••••••"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      'w-full pl-10 pr-10 py-2.5 rounded-xl border bg-surface-container-low text-on-surface text-body-sm outline-none transition-all font-mono',
                      touched.password && errors.password
                        ? 'border-error focus:ring-1 focus:ring-error'
                        : 'border-outline-variant/60 focus:border-primary focus:bg-surface-container-lowest'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-error text-xs font-medium">{errors.password}</p>
                )}

                {/* Password Strength Meter (Sign Up Only) */}
                {activeTab === 'signup' && values.password && (
                  <div className="space-y-1 pt-1">
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={cn(
                            'flex-1 rounded-full transition-all duration-300',
                            step <= passwordStrength.score ? passwordStrength.color : 'bg-surface-container-high'
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-secondary">
                      <span>Password strength:</span>
                      <span className="font-bold">{passwordStrength.label}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={isSubmitting}
                className="mt-2 shadow-lg shadow-primary/20"
              >
                {activeTab === 'login' ? 'Sign In to Portal' : 'Create Vendex Account'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-outline-variant/40" />
              <span className="flex-shrink mx-3 text-[11px] font-mono uppercase tracking-wider text-secondary">
                1-Tap Demo Access
              </span>
              <div className="flex-grow border-t border-outline-variant/40" />
            </div>

            {/* Fast 1-Tap Demo Roles */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                disabled={demoLoading}
                onClick={() => handleDemoLogin('buyer')}
                className="p-2.5 rounded-xl border border-outline-variant/60 hover:border-primary/60 bg-surface-container-low hover:bg-surface-container flex flex-col items-center gap-1 transition-all group active:scale-95 text-center"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-base">person</span>
                </div>
                <span className="text-xs font-bold text-on-surface">Demo Buyer</span>
                <span className="text-[9px] font-mono text-secondary">Shopper</span>
              </button>

              <button
                type="button"
                disabled={demoLoading}
                onClick={() => handleDemoLogin('vendor')}
                className="p-2.5 rounded-xl border border-outline-variant/60 hover:border-primary/60 bg-surface-container-low hover:bg-surface-container flex flex-col items-center gap-1 transition-all group active:scale-95 text-center"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-base">storefront</span>
                </div>
                <span className="text-xs font-bold text-on-surface">Demo Vendor</span>
                <span className="text-[9px] font-mono text-secondary">Merchant</span>
              </button>

              <button
                type="button"
                disabled={demoLoading}
                onClick={() => handleDemoLogin('admin')}
                className="p-2.5 rounded-xl border border-outline-variant/60 hover:border-primary/60 bg-surface-container-low hover:bg-surface-container flex flex-col items-center gap-1 transition-all group active:scale-95 text-center"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                </div>
                <span className="text-xs font-bold text-on-surface">Demo Admin</span>
                <span className="text-[9px] font-mono text-secondary">Executive</span>
              </button>
            </div>

            {/* Terms Footer */}
            <p className="text-center text-[11px] text-secondary mt-6 leading-relaxed">
              By proceeding, you agree to Vendex's{' '}
              <a href="#" className="underline hover:text-on-surface">Terms of Service</a> and{' '}
              <a href="#" className="underline hover:text-on-surface">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
