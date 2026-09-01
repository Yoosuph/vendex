import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/shared/context/ToastContext';
import Button from '@/shared/components/Button';
import { cn } from '@/utils/cn';

const STORAGE_KEY = 'vendex_enterprise_settings';

export default function AdminSettings() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'financial' | 'security' | 'webhooks' | 'system'

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      platformName: 'Vendex Commerce',
      supportEmail: 'ops@vendex.com',
      systemCurrency: 'USD',
      timezone: 'America/New_York',
      openRegistration: true,
      commissionRate: 10,
      fixedFee: 0.30,
      minPayout: 50,
      escrowDays: 7,
      enforce2FA: true,
      sessionTimeoutHours: 24,
      maxLoginAttempts: 5,
      webhookUrl: 'https://api.vendex.internal/hooks/v1',
      webhookSecret: 'whsec_8921f09e8a719284',
      emailProvider: 'Resend (Enterprise)',
      maintenanceMode: false,
      maintenanceMessage: 'Vendex is undergoing scheduled cloud maintenance. All systems will resume shortly.',
    };
  });

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setTimeout(() => {
      setSaving(false);
      addToast('Enterprise platform settings saved and propagated!', 'success');
    }, 500);
  };

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24 overflow-x-hidden w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              GLOBAL PLATFORM GOVERNANCE
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success bg-success-container/40 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-xs">tune</span>
              v2.4.0 Live
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Platform Settings</h1>
          <p className="font-body-md text-sm sm:text-base text-secondary">
            Global fee parameters, merchant compliance rules, API webhooks, and core system maintenance.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Propagating...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">save</span>
              <span>Apply Global Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-surface-container-lowest p-1.5 rounded-2xl border border-outline-variant/40 shadow-subtle flex items-center gap-1 overflow-x-auto hide-scrollbar">
        {[
          { id: 'general', label: 'General Platform', icon: 'public' },
          { id: 'financial', label: 'Commissions & Fees', icon: 'payments' },
          { id: 'security', label: 'Security & Auth', icon: 'shield' },
          { id: 'webhooks', label: 'Webhooks & APIs', icon: 'api' },
          { id: 'system', label: 'System & Maintenance', icon: 'dns' },
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

      {/* TAB 1: GENERAL PLATFORM */}
      {activeTab === 'general' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4"
        >
          <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Platform Identity</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Platform Brand Name</label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Platform Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Base System Currency</label>
              <select
                value={settings.systemCurrency}
                onChange={(e) => setSettings({ ...settings, systemCurrency: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="USD">USD ($) - United States Dollar</option>
                <option value="EUR">EUR (€) - European Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Server Standard Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="America/New_York">America/New_York (EST/EDT)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="Europe/London">Europe/London (GMT/BST)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm text-on-surface">Open Merchant Registration</h4>
              <p className="text-xs text-secondary">Allow prospective sellers to apply for vendor accounts directly.</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, openRegistration: !settings.openRegistration })}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0',
                settings.openRegistration ? 'bg-primary' : 'bg-surface-container'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                  settings.openRegistration ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>
          </div>
        </motion.div>
      )}

      {/* TAB 2: FINANCIAL PARAMETERS */}
      {activeTab === 'financial' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Marketplace Commission & Escrow</h3>
              <p className="text-xs text-secondary">Set take rates, dispute escrow windows, and automated payout thresholds.</p>
            </div>
            <span className="material-symbols-outlined text-secondary">monetization_on</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Standard Platform Commission (%)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={settings.commissionRate}
                onChange={(e) => setSettings({ ...settings, commissionRate: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Fixed Transaction Fee ($)</label>
              <input
                type="number"
                step="0.05"
                value={settings.fixedFee}
                onChange={(e) => setSettings({ ...settings, fixedFee: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Minimum Vendor Withdrawal Threshold ($)</label>
              <input
                type="number"
                value={settings.minPayout}
                onChange={(e) => setSettings({ ...settings, minPayout: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Dispute Escrow Hold (Days)</label>
              <input
                type="number"
                value={settings.escrowDays}
                onChange={(e) => setSettings({ ...settings, escrowDays: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: SECURITY & COMPLIANCE */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4"
        >
          <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Authentication & Perimeter Defense</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Admin & Vendor Session Timeout (Hours)</label>
              <input
                type="number"
                value={settings.sessionTimeoutHours}
                onChange={(e) => setSettings({ ...settings, sessionTimeoutHours: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Max Failed Login Attempts</label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({ ...settings, maxLoginAttempts: Number(e.target.value) })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm text-on-surface">Mandatory 2FA for Privileged Roles</h4>
              <p className="text-xs text-secondary">Require Two-Factor Authentication for all Admin and Vendor accounts.</p>
            </div>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, enforce2FA: !settings.enforce2FA })}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0',
                settings.enforce2FA ? 'bg-primary' : 'bg-surface-container'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                  settings.enforce2FA ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>
          </div>
        </motion.div>
      )}

      {/* TAB 4: WEBHOOKS & APIS */}
      {activeTab === 'webhooks' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Event Webhooks & Relays</h3>
              <p className="text-xs text-secondary">Dispatch real-time webhooks for orders, payouts, disputes, and user onboarding.</p>
            </div>
            <span className="material-symbols-outlined text-secondary">webhook</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Outgoing Webhook Endpoint</label>
              <input
                type="url"
                value={settings.webhookUrl}
                onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Webhook Signing Secret</label>
              <input
                type="text"
                value={settings.webhookSecret}
                onChange={(e) => setSettings({ ...settings, webhookSecret: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm font-mono text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Transactional Email Gateway</label>
              <select
                value={settings.emailProvider}
                onChange={(e) => setSettings({ ...settings, emailProvider: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="Resend (Enterprise)">Resend (Enterprise API)</option>
                <option value="SendGrid v3">SendGrid v3 API</option>
                <option value="Amazon SES">Amazon Simple Email Service (SES)</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: SYSTEM & MAINTENANCE */}
      {activeTab === 'system' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Maintenance Mode */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Maintenance Mode Gate</h3>
                <p className="text-xs text-secondary">Freeze non-admin buyer and vendor traffic during database upgrades.</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                className={cn(
                  'w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0',
                  settings.maintenanceMode ? 'bg-error' : 'bg-surface-container'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                    settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                  )}
                />
              </button>
            </div>

            {settings.maintenanceMode && (
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Public Maintenance Notice</label>
                <textarea
                  rows={2}
                  value={settings.maintenanceMessage}
                  onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
                  className="w-full bg-surface-container-low border border-error/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Database Actions */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4">
            <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Data Snapshots & Cache</h3>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => addToast('Snapshot exported: vendex_backup.json', 'success')}
                className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Export JSON Database Snapshot</span>
              </button>
              <button
                onClick={() => addToast('Redis & Edge CDN Cache purged successfully!', 'info')}
                className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">cached</span>
                <span>Flush Edge CDN Cache</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
