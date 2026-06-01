import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

const CATEGORIES = [
  { id: 'apparel', label: 'Fashion & Apparel', icon: 'checkroom' },
  { id: 'electronics', label: 'Electronics', icon: 'devices' },
  { id: 'home-decor', label: 'Home & Living', icon: 'chair' },
  { id: 'furniture', label: 'Art & Collectibles', icon: 'palette' },
];

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Germany', 'France',
  'Australia', 'Japan', 'Netherlands', 'Sweden', 'Other',
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

export default function VendorOnboarding() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Account
    name: '',
    email: '',
    password: '',
    // Step 2: Store
    storeName: '',
    category: '',
    description: '',
    country: '',
    city: '',
    address: '',
    businessEmail: '',
  });

  const [errors, setErrors] = useState({});

  const updateField = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const nextStep = () => {
    const validationErrors = validateStep(step);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setDirection(1);
    setStep(s => Math.min(s + 1, 3));
  };

  const prevStep = () => {
    setErrors({});
    setDirection(-1);
    setStep(s => Math.max(s - 1, 1));
  };

  const validateStep = (s) => {
    const errs = {};
    if (s === 1) {
      if (!formData.name.trim()) errs.name = 'Full name is required';
      if (!formData.email.trim()) errs.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email';
      if (!formData.password) errs.password = 'Password is required';
      else if (formData.password.length < 6) errs.password = 'At least 6 characters';
    }
    if (s === 2) {
      if (!formData.storeName.trim()) errs.storeName = 'Store name is required';
      if (!formData.category) errs.category = 'Pick a category';
    }
    return errs;
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      setErrors({ terms: 'You must accept the terms to continue' });
      return;
    }

    setSubmitting(true);
    try {
      await signup(formData.name, formData.email, formData.password, 'vendor', {
        storeName: formData.storeName,
        category: formData.category,
        description: formData.description,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        businessEmail: formData.businessEmail || formData.email,
      });
      navigate('/vendor/submitted');
    } catch (err) {
      setErrors({ submit: err.message || 'Signup failed' });
      setSubmitting(false);
    }
  };

  const stepConfig = [
    { num: 1, label: 'Account', icon: 'person' },
    { num: 2, label: 'Store', icon: 'storefront' },
    { num: 3, label: 'Review', icon: 'rate_review' },
  ];

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-gutter py-xl">
      <div className="w-full max-w-[640px]">
        {/* Header */}
        <div className="text-center mb-lg">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Become a Vendor</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Set up your store and start selling in minutes.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-xl">
          {stepConfig.map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                  step >= s.num
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                )}>
                  {step > s.num ? (
                    <span className="material-symbols-outlined text-lg">check</span>
                  ) : (
                    s.num
                  )}
                </div>
                <span className={cn(
                  'font-label-md text-label-md hidden sm:block',
                  step >= s.num ? 'text-on-surface' : 'text-on-surface-variant'
                )}>
                  {s.label}
                </span>
              </div>
              {i < stepConfig.length - 1 && (
                <div className={cn(
                  'w-12 h-0.5 rounded-full transition-all duration-300',
                  step > s.num ? 'bg-primary' : 'bg-surface-container-high'
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-card border border-outline-variant/30 overflow-hidden">
          <div className="p-lg sm:p-xl min-h-[420px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
              >
                {/* Step 1: Account */}
                {step === 1 && (
                  <div>
                    <div className="mb-lg">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-md">
                        <span className="material-symbols-outlined text-primary text-2xl">person</span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface">Create your account</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">This will be your login credentials.</p>
                    </div>

                    <div className="space-y-md">
                      <div>
                        <label className="font-label-md text-label-md text-on-surface block mb-xs">Full Name</label>
                        <input
                          className={cn(
                            'w-full h-12 px-md border rounded-xl bg-surface-container-low text-body-md transition-all outline-none focus:ring-2 focus:ring-primary/20',
                            errors.name ? 'border-error' : 'border-outline-variant focus:border-primary'
                          )}
                          placeholder="e.g. Jane Smith"
                          type="text"
                          value={formData.name}
                          onChange={updateField('name')}
                        />
                        {errors.name && <p className="text-error text-meta mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="font-label-md text-label-md text-on-surface block mb-xs">Email</label>
                        <input
                          className={cn(
                            'w-full h-12 px-md border rounded-xl bg-surface-container-low text-body-md transition-all outline-none focus:ring-2 focus:ring-primary/20',
                            errors.email ? 'border-error' : 'border-outline-variant focus:border-primary'
                          )}
                          placeholder="you@business.com"
                          type="email"
                          value={formData.email}
                          onChange={updateField('email')}
                        />
                        {errors.email && <p className="text-error text-meta mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="font-label-md text-label-md text-on-surface block mb-xs">Password</label>
                        <div className="relative">
                          <input
                            className={cn(
                              'w-full h-12 px-md pr-12 border rounded-xl bg-surface-container-low text-body-md transition-all outline-none focus:ring-2 focus:ring-primary/20',
                              errors.password ? 'border-error' : 'border-outline-variant focus:border-primary'
                            )}
                            placeholder="At least 6 characters"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={updateField('password')}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-surface-container transition-colors"
                          >
                            <span className="material-symbols-outlined text-secondary text-xl">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                        {errors.password && <p className="text-error text-meta mt-1">{errors.password}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Store */}
                {step === 2 && (
                  <div>
                    <div className="mb-lg">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-md">
                        <span className="material-symbols-outlined text-primary text-2xl">storefront</span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface">Set up your store</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Tell us about your business.</p>
                    </div>

                    <div className="space-y-md">
                      <div>
                        <label className="font-label-md text-label-md text-on-surface block mb-xs">Store Name</label>
                        <input
                          className={cn(
                            'w-full h-12 px-md border rounded-xl bg-surface-container-low text-body-md transition-all outline-none focus:ring-2 focus:ring-primary/20',
                            errors.storeName ? 'border-error' : 'border-outline-variant focus:border-primary'
                          )}
                          placeholder="e.g. Urban Goods Co."
                          type="text"
                          value={formData.storeName}
                          onChange={updateField('storeName')}
                        />
                        {errors.storeName && <p className="text-error text-meta mt-1">{errors.storeName}</p>}
                      </div>

                      <div>
                        <label className="font-label-md text-label-md text-on-surface block mb-xs">Category</label>
                        <div className="grid grid-cols-2 gap-2">
                          {CATEGORIES.map(cat => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, category: cat.id }));
                                if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
                              }}
                              className={cn(
                                'flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all',
                                formData.category === cat.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-outline-variant hover:border-outline bg-surface-container-low'
                              )}
                            >
                              <span className={cn(
                                'material-symbols-outlined text-xl',
                                formData.category === cat.id ? 'text-primary' : 'text-on-surface-variant'
                              )}>
                                {cat.icon}
                              </span>
                              <span className={cn(
                                'font-label-md text-label-md',
                                formData.category === cat.id ? 'text-primary' : 'text-on-surface'
                              )}>
                                {cat.label}
                              </span>
                            </button>
                          ))}
                        </div>
                        {errors.category && <p className="text-error text-meta mt-1">{errors.category}</p>}
                      </div>

                      <div>
                        <label className="font-label-md text-label-md text-on-surface block mb-xs">Description <span className="text-on-surface-variant">(optional)</span></label>
                        <textarea
                          className="w-full px-md py-3 border border-outline-variant rounded-xl bg-surface-container-low text-body-md transition-all outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                          placeholder="What do you sell? What makes your store special?"
                          rows="3"
                          value={formData.description}
                          onChange={updateField('description')}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-label-md text-label-md text-on-surface block mb-xs">Country</label>
                          <select
                            className="w-full h-12 px-md border border-outline-variant rounded-xl bg-surface-container-low text-body-md transition-all outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                            value={formData.country}
                            onChange={updateField('country')}
                          >
                            <option value="">Select</option>
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="font-label-md text-label-md text-on-surface block mb-xs">City</label>
                          <input
                            className="w-full h-12 px-md border border-outline-variant rounded-xl bg-surface-container-low text-body-md transition-all outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="London"
                            type="text"
                            value={formData.city}
                            onChange={updateField('city')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <div>
                    <div className="mb-lg">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-md">
                        <span className="material-symbols-outlined text-primary text-2xl">rate_review</span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-on-surface">Review your application</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Make sure everything looks right before submitting.</p>
                    </div>

                    <div className="space-y-md">
                      {/* Account summary */}
                      <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/50">
                        <div className="flex items-center justify-between mb-sm">
                          <h3 className="font-label-md text-label-md text-on-surface">Account</h3>
                          <button onClick={() => setStep(1)} className="text-primary text-meta font-medium hover:underline">Edit</button>
                        </div>
                        <div className="space-y-xs text-body-sm">
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Name</span>
                            <span className="text-on-surface font-medium">{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Email</span>
                            <span className="text-on-surface font-medium">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Password</span>
                            <span className="text-on-surface font-medium">{'•'.repeat(formData.password.length)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Store summary */}
                      <div className="p-md rounded-xl bg-surface-container-low border border-outline-variant/50">
                        <div className="flex items-center justify-between mb-sm">
                          <h3 className="font-label-md text-label-md text-on-surface">Store</h3>
                          <button onClick={() => setStep(2)} className="text-primary text-meta font-medium hover:underline">Edit</button>
                        </div>
                        <div className="space-y-xs text-body-sm">
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Store Name</span>
                            <span className="text-on-surface font-medium">{formData.storeName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Category</span>
                            <span className="text-on-surface font-medium">{CATEGORIES.find(c => c.id === formData.category)?.label || '—'}</span>
                          </div>
                          {formData.description && (
                            <div className="pt-2 border-t border-outline-variant/50">
                              <p className="text-on-surface-variant text-meta mb-1">Description</p>
                              <p className="text-on-surface text-body-sm">{formData.description}</p>
                            </div>
                          )}
                          {formData.country && (
                            <div className="flex justify-between">
                              <span className="text-on-surface-variant">Location</span>
                              <span className="text-on-surface font-medium">{[formData.city, formData.country].filter(Boolean).join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Terms */}
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => {
                            setTermsAccepted(e.target.checked);
                            if (errors.terms) setErrors(prev => ({ ...prev, terms: '' }));
                          }}
                          className="mt-0.5 w-4 h-4 rounded border-outline-variant text-primary focus:ring-0"
                        />
                        <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                          I agree to Vendex's{' '}
                          <span className="text-primary font-medium">Terms of Service</span> and{' '}
                          <span className="text-primary font-medium">Vendor Agreement</span>.
                          I understand my store will be reviewed before going live.
                        </span>
                      </label>
                      {errors.terms && <p className="text-error text-meta">{errors.terms}</p>}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {errors.submit && (
              <div className="mt-md p-sm bg-error/10 border border-error rounded-xl text-error text-body-sm">{errors.submit}</div>
            )}
          </div>

          {/* Footer */}
          <div className="px-lg sm:px-xl py-lg bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              icon={<span className="material-symbols-outlined text-lg">arrow_back</span>}
              className={cn(step === 1 && 'invisible')}
            >
              Back
            </Button>

            {step < 3 ? (
              <Button
                variant="primary"
                onClick={nextStep}
                icon={<span className="material-symbols-outlined text-lg">arrow_forward</span>}
                iconPosition="right"
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                loading={submitting ? 'Submitting...' : false}
                onClick={handleSubmit}
                icon={<span className="material-symbols-outlined text-lg">send</span>}
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>

        {/* Footer link */}
        <p className="text-center text-meta text-on-surface-variant mt-lg">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-primary font-medium hover:underline">Sign in</button>
        </p>
      </div>
    </div>
  );
}
