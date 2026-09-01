import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '@/shared/context/AuthContext';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import { useToast } from '@/shared/context/ToastContext';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

export default function VendorSettings() {
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('branding'); // 'branding' | 'business' | 'payout' | 'shipping' | 'notifications'

  // Store profile & branding
  const [branding, setBranding] = useState({
    storeName: user?.vendorName || user?.name || 'Urban Goods Co.',
    tagline: 'Premium Lifestyle & Tech Accessories',
    bio: 'Direct-to-consumer artisanal and performance gear handcrafted for modern creators and urban explorers.',
    storeSlug: 'urban-goods',
    logoUrl: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  });

  // Business & Legal
  const [business, setBusiness] = useState({
    legalEntityName: 'Urban Goods LLC',
    taxId: 'US-94-829104',
    supportEmail: user?.email || 'support@urbangoods.co',
    supportPhone: '+1 (555) 234-8901',
    address: '450 Mission St, Suite 800',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'United States',
  });

  // Bank & Payouts
  const [payout, setPayout] = useState({
    bankName: 'JPMorgan Chase & Co.',
    accountHolder: 'Urban Goods LLC',
    routingNumber: '••••••••1234',
    accountNumber: '••••••••8902',
    payoutSchedule: 'weekly', // 'daily' | 'weekly' | 'monthly'
    minPayoutThreshold: 100,
    currency: 'USD',
  });

  // Shipping & Fulfillment Policies
  const [shipping, setShipping] = useState({
    processingDays: '1-2 business days',
    freeShippingThreshold: 75,
    standardShippingFee: 4.99,
    expressShippingFee: 14.99,
    returnWindowDays: 30,
    restockingFeePct: 0,
    shipsInternational: true,
  });

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    orderAlertEmail: true,
    orderAlertSms: true,
    lowStockThreshold: true,
    payoutConfirmedEmail: true,
    disputeAlertEmail: true,
    marketingDigest: false,
  });

  const [saving, setSaving] = useState(false);

  const handleSave = (sectionName) => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      addToast(`${sectionName} saved successfully!`, 'success');
    }, 600);
  };

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24 overflow-x-hidden w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              MERCHANT PREFERENCES
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success bg-success-container/40 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-xs">verified</span>
              Verified Merchant
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Store Settings</h1>
          <p className="font-body-md text-sm sm:text-base text-secondary">
            Configure store branding, banking & payout rules, shipping policies, and operational alerts.
          </p>
        </div>

        <button
          onClick={() => handleSave('Store settings')}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">save</span>
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs Hub */}
      <div className="bg-surface-container-lowest p-1.5 rounded-2xl border border-outline-variant/40 shadow-subtle flex items-center gap-1 overflow-x-auto hide-scrollbar">
        {[
          { id: 'branding', label: 'Store Branding', icon: 'storefront' },
          { id: 'business', label: 'Business & Legal', icon: 'badge' },
          { id: 'payout', label: 'Bank & Payouts', icon: 'account_balance' },
          { id: 'shipping', label: 'Shipping & Returns', icon: 'local_shipping' },
          { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-1 sm:flex-initial justify-center',
              activeTab === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'text-secondary hover:text-on-surface hover:bg-surface-container-low'
            )}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: STORE BRANDING */}
      {activeTab === 'branding' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Banner & Logo Preview */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-subtle overflow-hidden">
            <div className="relative h-40 sm:h-52 bg-surface-container overflow-hidden group">
              <img src={branding.bannerUrl} alt="Store Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => addToast('Banner upload simulated', 'info')}
                  className="px-4 py-2 bg-white/90 text-black text-xs font-bold rounded-xl shadow-lg hover:bg-white"
                >
                  Change Cover Image
                </button>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12">
              <div className="flex items-end gap-4">
                <div className="relative w-24 h-24 rounded-2xl bg-surface-container-lowest p-1 shadow-xl border border-outline-variant/40 shrink-0 overflow-hidden">
                  <img src={branding.logoUrl} alt="Store Logo" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-on-surface">{branding.storeName}</h3>
                  <p className="text-xs text-secondary font-mono">vendex.com/store/{branding.storeSlug}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-success-container/40 text-success text-xs font-bold rounded-full">
                  Public Active Storefront
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4">
            <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Store Identity</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Store Display Name</label>
                <input
                  type="text"
                  value={branding.storeName}
                  onChange={(e) => setBranding({ ...branding, storeName: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Storefront Slug</label>
                <div className="flex items-center bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm">
                  <span className="text-secondary font-mono text-xs">/store/</span>
                  <input
                    type="text"
                    value={branding.storeSlug}
                    onChange={(e) => setBranding({ ...branding, storeSlug: e.target.value })}
                    className="w-full bg-transparent text-on-surface font-mono text-sm focus:outline-none ml-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Store Tagline</label>
              <input
                type="text"
                value={branding.tagline}
                onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Store Bio / About Story</label>
              <textarea
                rows={3}
                value={branding.bio}
                onChange={(e) => setBranding({ ...branding, bio: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: BUSINESS & LEGAL */}
      {activeTab === 'business' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Legal Registration & Tax</h3>
              <p className="text-xs text-secondary">Registered business entity details used for automated merchant invoicing.</p>
            </div>
            <span className="material-symbols-outlined text-secondary">verified_user</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Legal Entity Name</label>
              <input
                type="text"
                value={business.legalEntityName}
                onChange={(e) => setBusiness({ ...business, legalEntityName: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Tax ID / EIN / VAT #</label>
              <input
                type="text"
                value={business.taxId}
                onChange={(e) => setBusiness({ ...business, taxId: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Customer Support Email</label>
              <input
                type="email"
                value={business.supportEmail}
                onChange={(e) => setBusiness({ ...business, supportEmail: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Customer Support Hotline</label>
              <input
                type="text"
                value={business.supportPhone}
                onChange={(e) => setBusiness({ ...business, supportPhone: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Business Address</label>
              <input
                type="text"
                value={business.address}
                onChange={(e) => setBusiness({ ...business, address: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">City & State</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={business.city}
                  onChange={(e) => setBusiness({ ...business, city: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={business.state}
                  onChange={(e) => setBusiness({ ...business, state: e.target.value })}
                  className="w-24 bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Country & Postal Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={business.country}
                  onChange={(e) => setBusiness({ ...business, country: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  value={business.postalCode}
                  onChange={(e) => setBusiness({ ...business, postalCode: e.target.value })}
                  className="w-28 bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: BANK & PAYOUTS */}
      {activeTab === 'payout' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Active Bank Card */}
          <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container p-6 rounded-2xl border border-outline-variant/40 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-primary">account_balance</span>
                <span className="font-bold text-sm text-on-surface">{payout.bankName}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-success-container text-success">
                Primary Settlement Account
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-secondary block text-[10px] uppercase">Account Holder</span>
                <span className="font-semibold text-on-surface text-sm">{payout.accountHolder}</span>
              </div>
              <div>
                <span className="text-secondary block text-[10px] uppercase">Account Number</span>
                <span className="font-mono font-bold text-on-surface text-sm">{payout.accountNumber}</span>
              </div>
              <div>
                <span className="text-secondary block text-[10px] uppercase">Routing / BIC</span>
                <span className="font-mono font-bold text-on-surface text-sm">{payout.routingNumber}</span>
              </div>
            </div>
          </div>

          {/* Payout Automation Rules */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4">
            <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Payout Cadence & Thresholds</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Automated Payout Schedule</label>
                <select
                  value={payout.payoutSchedule}
                  onChange={(e) => setPayout({ ...payout, payoutSchedule: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value="daily">Daily (Rolling 48h settlement)</option>
                  <option value="weekly">Weekly (Every Monday)</option>
                  <option value="monthly">Monthly (1st of each month)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Minimum Transfer Balance ($)</label>
                <input
                  type="number"
                  value={payout.minPayoutThreshold}
                  onChange={(e) => setPayout({ ...payout, minPayoutThreshold: Number(e.target.value) })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: SHIPPING & RETURNS */}
      {activeTab === 'shipping' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Fulfillment & Shipping Rates</h3>
              <p className="text-xs text-secondary">Set default shipping fees, free shipping incentives, and return policies.</p>
            </div>
            <span className="material-symbols-outlined text-secondary">local_shipping</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Handling & Dispatch Time</label>
              <select
                value={shipping.processingDays}
                onChange={(e) => setShipping({ ...shipping, processingDays: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="Same day (Orders before 2PM)">Same day (Orders before 2PM)</option>
                <option value="1-2 business days">1-2 business days</option>
                <option value="3-5 business days">3-5 business days</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Free Shipping Minimum ($)</label>
              <input
                type="number"
                value={shipping.freeShippingThreshold}
                onChange={(e) => setShipping({ ...shipping, freeShippingThreshold: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Standard Flat Shipping Fee ($)</label>
              <input
                type="number"
                step="0.01"
                value={shipping.standardShippingFee}
                onChange={(e) => setShipping({ ...shipping, standardShippingFee: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Customer Return Policy Window</label>
              <select
                value={shipping.returnWindowDays}
                onChange={(e) => setShipping({ ...shipping, returnWindowDays: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value={14}>14 Days (Standard)</option>
                <option value={30}>30 Days (Recommended)</option>
                <option value={60}>60 Days (Extended)</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4"
        >
          <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Merchant Alerts & Dispatch Signals</h3>

          <div className="divide-y divide-outline-variant/30">
            {[
              { id: 'orderAlertEmail', label: 'New Order Email Alerts', desc: 'Instant email receipt whenever a customer places an order.' },
              { id: 'orderAlertSms', label: 'High-Value Order SMS Notifications', desc: 'Direct text alert for orders exceeding $150.' },
              { id: 'lowStockThreshold', label: 'Low Stock Warnings', desc: 'Alert when any product SKU drops below 5 units.' },
              { id: 'payoutConfirmedEmail', label: 'Bank Payout Confirmations', desc: 'Detailed wire and ACH settlement confirmations.' },
              { id: 'disputeAlertEmail', label: 'Customer Dispute & Review Alerts', desc: 'Immediate notification when a buyer opens a ticket or dispute.' },
            ].map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-on-surface">{item.label}</h4>
                  <p className="text-xs text-secondary">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })}
                  className={cn(
                    'w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0',
                    notifications[item.id] ? 'bg-primary' : 'bg-surface-container'
                  )}
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                      notifications[item.id] ? 'translate-x-6' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
