import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import Button from '@/shared/components/Button';

export default function VendorOnboarding() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    storeName: '',
    category: '',
    description: '',
    businessEmail: '',
    country: '',
    city: '',
    address: '',
    accountHolder: '',
    iban: '',
    bic: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    // Try to match field by placeholder
    const fieldMap = {
      'e.g. Minimalist Home Decor': 'storeName',
      'Briefly describe what you\'ll be selling...': 'description',
      'contact@yourstore.com': 'businessEmail',
      'United Kingdom': 'country',
      'London': 'city',
      '123 Business Way': 'address',
      'John Doe': 'accountHolder',
      'GB12 3456 7890...': 'iban',
      'VNDXGB2L': 'bic',
    };
    const field = fieldMap[placeholder] || e.target.id || placeholder;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Also handle direct id-based inputs for name/email/password
  const handleDirectChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSelectChange = (e) => {
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    // Validate step 1
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.storeName.trim()) newErrors.storeName = 'Store name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStep(1);
      return;
    }

    setSubmitting(true);
    try {
      await signup(formData.name, formData.email, formData.password, 'vendor');
      navigate('/vendor/application-submitted');
    } catch (err) {
      setErrors({ submit: err.message || 'Signup failed' });
      setSubmitting(false);
    }
  };

  const stepLabels = ['Store Basics', 'Contact', 'Verification', 'Payout'];
  const progressWidth = `${(step - 1) / 3 * 100}%`;

  if (submitting) return <LoadingSpinner text="Submitting application..." />;

  return (
    <main className="w-full max-w-[800px] bg-surface-container-lowest rounded-xl shadow-card overflow-hidden">
      <div className="px-xl pt-xl pb-lg border-b border-outline-variant">
        <div className="flex justify-between relative mb-xs">
          <div className="absolute top-[18px] left-0 w-full h-0.5 bg-surface-container-high z-0"></div>
          <div className="absolute top-[18px] left-0 h-0.5 bg-primary-container z-0" style={{ width: progressWidth }}></div>
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="relative z-10 flex flex-col items-center group cursor-pointer" onClick={() => s < step && setStep(s)}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ring-4 ring-surface-container-lowest ${s <= step ? 'bg-primary-container text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                <span className="font-label-md text-label-md">{s}</span>
              </div>
              <span className={`mt-xs font-label-md text-label-md ${s <= step ? 'text-primary' : 'text-secondary'}`}>{stepLabels[s - 1]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-xl min-h-[460px]">
        {/* Step 1: Store Identity + Account */}
        {step === 1 && (
          <section>
            <div className="mb-lg">
              <h1 className="font-headline-md text-headline-md text-on-surface mb-base">Store Identity</h1>
              <p className="font-body-md text-body-md text-secondary">Let's start with the basics of your marketplace presence.</p>
            </div>
            <div className="space-y-md">
              <div className="flex flex-col gap-base">
                <label className="font-label-md text-label-md text-on-surface">Your Name</label>
                <input className={`w-full h-12 px-md border rounded-lg focus:border-on-surface text-body-md transition-all ${errors.name ? 'border-error' : 'border-outline-variant'}`} placeholder="e.g. John Doe" type="text" value={formData.name} onChange={handleDirectChange('name')} />
                {errors.name && <p className="text-error font-meta">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-base">
                <label className="font-label-md text-label-md text-on-surface">Email</label>
                <input className={`w-full h-12 px-md border rounded-lg focus:border-on-surface text-body-md transition-all ${errors.email ? 'border-error' : 'border-outline-variant'}`} placeholder="you@example.com" type="email" value={formData.email} onChange={handleDirectChange('email')} />
                {errors.email && <p className="text-error font-meta">{errors.email}</p>}
              </div>
              <div className="flex flex-col gap-base">
                <label className="font-label-md text-label-md text-on-surface">Password</label>
                <input className={`w-full h-12 px-md border rounded-lg focus:border-on-surface text-body-md transition-all ${errors.password ? 'border-error' : 'border-outline-variant'}`} placeholder="At least 6 characters" type="password" value={formData.password} onChange={handleDirectChange('password')} />
                {errors.password && <p className="text-error font-meta">{errors.password}</p>}
              </div>
              <div className="flex flex-col gap-base">
                <label className="font-label-md text-label-md text-on-surface">Store Name</label>
                <input className={`w-full h-12 px-md border rounded-lg focus:border-on-surface text-body-md transition-all ${errors.storeName ? 'border-error' : 'border-outline-variant'}`} placeholder="e.g. Minimalist Home Decor" type="text" value={formData.storeName} onChange={handleChange} />
                {errors.storeName && <p className="text-error font-meta">{errors.storeName}</p>}
              </div>
              <div className="flex flex-col gap-base">
                <label className="font-label-md text-label-md text-on-surface">Category</label>
                <select className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-0 focus:border-on-surface text-body-md transition-all" onChange={handleSelectChange} value={formData.category}>
                  <option value="">Select a category</option>
                  <option>Fashion & Apparel</option>
                  <option>Home & Living</option>
                  <option>Electronics</option>
                  <option>Art & Collectibles</option>
                </select>
              </div>
              <div className="flex flex-col gap-base">
                <label className="font-label-md text-label-md text-on-surface">Store Description</label>
                <textarea className="w-full p-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-0 focus:border-on-surface text-body-md transition-all" placeholder="Briefly describe what you'll be selling..." rows="4" onChange={handleChange}></textarea>
              </div>
            </div>
          </section>
        )}

        {/* Step 2: Contact & Location */}
        {step === 2 && (
          <section>
            <div className="mb-lg">
              <h1 className="font-headline-md text-headline-md text-on-surface mb-base">Contact & Location</h1>
              <p className="font-body-md text-body-md text-secondary">Where can we reach you and where is your business based?</p>
            </div>
            <div className="grid grid-cols-2 gap-md">
              <div className="flex flex-col gap-base col-span-2">
                <label className="font-label-md text-label-md text-on-surface">Business Email</label>
                <input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="contact@yourstore.com" type="email" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-base">
                <label className="font-label-md text-label-md text-on-surface">Country</label>
                <input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="United Kingdom" type="text" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-base">
                <label className="font-label-md text-label-md text-on-surface">City</label>
                <input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="London" type="text" onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-base col-span-2">
                <label className="font-label-md text-label-md text-on-surface">Street Address</label>
                <input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="123 Business Way" type="text" onChange={handleChange} />
              </div>
            </div>
          </section>
        )}

        {/* Step 3: Verification */}
        {step === 3 && (
          <section>
            <div className="mb-lg">
              <h1 className="font-headline-md text-headline-md text-on-surface mb-base">Identity Verification</h1>
              <p className="font-body-md text-body-md text-secondary">To ensure security, please upload a valid government ID.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="border-2 border-dashed border-primary-container rounded-xl p-lg flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-primary text-5xl mb-sm group-hover:scale-110 transition-transform">cloud_upload</span>
                <p className="font-label-md text-label-md text-primary text-center">Upload Front of ID</p>
                <p className="font-meta text-meta text-secondary mt-base">PNG, JPG up to 10MB</p>
              </div>
              <div className="border-2 border-dashed border-primary-container rounded-xl p-lg flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-primary text-5xl mb-sm group-hover:scale-110 transition-transform">cloud_upload</span>
                <p className="font-label-md text-label-md text-primary text-center">Upload Back of ID</p>
                <p className="font-meta text-meta text-secondary mt-base">PNG, JPG up to 10MB</p>
              </div>
              <div className="col-span-1 md:col-span-2 p-md bg-surface-container rounded-lg border border-outline-variant flex gap-sm items-start">
                <span className="material-symbols-outlined text-secondary">info</span>
                <p className="font-body-sm text-body-sm text-secondary">Your data is encrypted and stored securely according to our privacy policy. Verification usually takes 24-48 hours.</p>
              </div>
            </div>
          </section>
        )}

        {/* Step 4: Payout Settings */}
        {step === 4 && (
          <section>
            <div className="mb-lg">
              <h1 className="font-headline-md text-headline-md text-on-surface mb-base">Payout Settings</h1>
              <p className="font-body-md text-body-md text-secondary">Configure where you'd like to receive your marketplace earnings.</p>
            </div>
            <div className="space-y-md">
              <div className="flex flex-col gap-base">
                <label className="font-label-md text-label-md text-on-surface">Account Holder Name</label>
                <input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="John Doe" type="text" onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-md">
                <div className="flex flex-col gap-base">
                  <label className="font-label-md text-label-md text-on-surface">IBAN / Account Number</label>
                  <input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="GB12 3456 7890..." type="text" onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-base">
                  <label className="font-label-md text-label-md text-on-surface">BIC / Swift Code</label>
                  <input className="w-full h-12 px-md border border-outline-variant rounded-lg focus:border-on-surface" placeholder="VNDXGB2L" type="text" onChange={handleChange} />
                </div>
              </div>
              <div className="p-md bg-primary/5 rounded-lg border border-primary/20 flex gap-sm items-center">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                <p className="font-body-sm text-body-sm text-primary font-medium">Automatic payouts are processed every Friday.</p>
              </div>
            </div>
          </section>
        )}

        {errors.submit && (
          <div className="mt-md p-sm bg-error/10 border border-error rounded-lg text-error font-body-sm">{errors.submit}</div>
        )}
      </div>

      <div className="px-xl py-lg bg-surface-container-low flex items-center justify-between">
        <Button variant="secondary" onClick={prevStep} icon={<span className="material-symbols-outlined">arrow_back</span>}>
          Back
        </Button>
        <div className="flex gap-md">
          {step < 4 ? (
            <Button variant="primary-container" onClick={nextStep}>Continue</Button>
          ) : (
            <Button variant="primary-container" onClick={handleSubmit}>Submit Application</Button>
          )}
        </div>
      </div>
    </main>
  );
}
