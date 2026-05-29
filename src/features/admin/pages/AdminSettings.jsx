import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import Button from '@/shared/components/Button';

const STORAGE_KEY = 'vendex_settings';

export default function AdminSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      platformName: 'Vendex',
      supportEmail: 'support@vendex.com',
      commissionRate: 10,
      currency: 'USD',
      maintenanceMode: false
    };
  });
  const [saved, setSaved] = useState(true);
  const [dialog, setDialog] = useState({ open: false, title: '', message: '', action: null });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
  }, []);

  // Mark unsaved on change
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
    setDialog({
      open: true,
      title: 'Settings Saved',
      message: 'Platform settings have been saved successfully.',
      action: () => setDialog({ open: false, title: '', message: '', action: null })
    });
  };

  const handleSaveClick = () => {
    if (saved) return;
    handleSave();
  };

  return (
    <>
      <main className="pt-16 min-h-screen bg-background">
        <div className="max-w-container-max mx-auto p-gutter">
          <div className="flex flex-col md:flex-row gap-lg">
            <div className="flex-1 space-y-lg">
              {/* General Settings */}
              <section className="tab-content bg-white p-lg rounded-xl shadow-sm border border-outline-variant space-y-xl">
                <div>
                  <h3 className="font-headline-md text-headline-md mb-md">General Settings</h3>
                  <div className="space-y-lg">
                    {/* Platform Name */}
                    <div>
                      <label className="block font-label-md text-on-surface mb-sm">Platform Name</label>
                      <input
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm focus:border-primary focus:ring-0"
                        type="text"
                        value={settings.platformName}
                        onChange={e => updateSetting('platformName', e.target.value)}
                      />
                    </div>

                    {/* Support Email */}
                    <div>
                      <label className="block font-label-md text-on-surface mb-sm">Support Email</label>
                      <input
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm focus:border-primary focus:ring-0"
                        type="email"
                        value={settings.supportEmail}
                        onChange={e => updateSetting('supportEmail', e.target.value)}
                      />
                    </div>

                    {/* Commission Rate */}
                    <div>
                      <label className="block font-label-md text-on-surface mb-sm">Default Commission Rate (%)</label>
                      <div className="flex items-center gap-xs">
                        <input
                          className="w-24 bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm focus:border-primary focus:ring-0"
                          type="number"
                          min="0"
                          max="100"
                          value={settings.commissionRate}
                          onChange={e => updateSetting('commissionRate', Number(e.target.value))}
                        />
                        <span className="text-secondary">%</span>
                      </div>
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="block font-label-md text-on-surface mb-sm">Currency</label>
                      <select
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-sm py-sm focus:border-primary focus:ring-0"
                        value={settings.currency}
                        onChange={e => updateSetting('currency', e.target.value)}
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>

                    {/* Maintenance Mode */}
                    <div className="flex items-center justify-between p-md bg-surface-container-low rounded-lg">
                      <div>
                        <p className="font-label-md text-on-surface">Maintenance Mode</p>
                        <p className="text-meta text-on-surface-variant">Prevent customers from accessing the storefront while you make changes.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          checked={settings.maintenanceMode}
                          onChange={e => updateSetting('maintenanceMode', e.target.checked)}
                          className="sr-only"
                          type="checkbox"
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${settings.maintenanceMode ? 'bg-primary' : 'bg-outline-variant'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.maintenanceMode ? 'translate-x-5' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end border-t border-outline-variant pt-md">
                  <motion.button
                    className={`px-xl py-sm rounded-lg font-label-md transition-all active:scale-95 ${
                      saved
                        ? 'bg-outline-variant text-on-surface-variant cursor-not-allowed'
                        : 'bg-[#C0152A] hover:bg-[#96101F] text-white'
                    }`}
                    onClick={handleSaveClick}
                    disabled={saved}
                    whileHover={saved ? {} : { scale: 1.02 }}
                    whileTap={saved ? {} : { scale: 0.95 }}
                  >
                    {saved ? 'Saved' : 'Save Changes'}
                  </motion.button>
                </div>
              </section>

              {/* Current Settings Summary */}
              <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Current Configuration</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-md text-sm">
                  <div>
                    <p className="text-on-surface-variant">Platform</p>
                    <p className="font-bold text-on-surface">{settings.platformName}</p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant">Email</p>
                    <p className="font-bold text-on-surface">{settings.supportEmail}</p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant">Commission</p>
                    <p className="font-bold text-on-surface">{settings.commissionRate}%</p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant">Currency</p>
                    <p className="font-bold text-on-surface">{settings.currency}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={dialog.open}
        title={dialog.title}
        message={dialog.message}
        confirmLabel="OK"
        cancelLabel=""
        onConfirm={dialog.action}
        onCancel={() => setDialog({ open: false, title: '', message: '', action: null })}
      />
    </>
  );
}
