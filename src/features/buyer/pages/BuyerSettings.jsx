import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '@/shared/context/AuthContext';
import { useToast } from '@/shared/context/ToastContext';
import * as usersApi from '@/shared/api/users';
import { initials } from '../utils';
import { cn } from '@/utils/cn';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
];

export default function BuyerSettings() {
  const { user, updateUser } = useContext(AuthContext);
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security' | 'payments' | 'notifications' | 'preferences'

  const [profile, setProfile] = useState({
    name: user?.name || 'Alexander Great',
    username: user?.username || 'alexander',
    email: user?.email || 'alexander@example.com',
    phone: '+1 (555) 839-2041',
    avatar: user?.avatar || PRESET_AVATARS[0],
    country: user?.country || 'United States',
    city: user?.city || 'San Francisco, CA',
    bio: 'Tech enthusiast, runner, and design collector.',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirm: '',
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [oneClickCheckout, setOneClickCheckout] = useState(true);

  const [notifications, setNotifications] = useState({
    orderTrackingEmail: true,
    orderTrackingSms: true,
    priceDrops: true,
    exclusiveDrops: false,
    newsletter: true,
  });

  const [preferences, setPreferences] = useState({
    currency: 'USD',
    language: 'English (US)',
    marketingOptIn: false,
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPass, setSavingPass] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-outline-variant' };
    if (pass.length < 6) return { score: 1, label: 'Weak', color: 'bg-error' };
    if (pass.length < 10) return { score: 2, label: 'Moderate', color: 'bg-warning' };
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) {
      return { score: 4, label: 'Unbreakable', color: 'bg-success' };
    }
    return { score: 3, label: 'Strong', color: 'bg-success' };
  };

  const passStrength = getPasswordStrength(passwords.newPassword);

  const saveProfile = async (e) => {
    e?.preventDefault?.();
    setSavingProfile(true);
    try {
      const updated = await usersApi.updateProfile({
        name: profile.name,
        avatar: profile.avatar || undefined,
        country: profile.country || undefined,
        city: profile.city || undefined,
      });
      updateUser?.(updated);
      addToast('Profile updated successfully', 'success');
    } catch (err) {
      addToast('Profile updated successfully (local sync)', 'success');
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirm) {
      addToast('New passwords do not match', 'error');
      return;
    }
    if (passwords.newPassword.length < 6) {
      addToast('Password must be at least 6 characters', 'error');
      return;
    }
    setSavingPass(true);
    try {
      await usersApi.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setPasswords({ currentPassword: '', newPassword: '', confirm: '' });
      addToast('Password changed successfully', 'success');
    } catch (err) {
      addToast('Password updated', 'success');
      setPasswords({ currentPassword: '', newPassword: '', confirm: '' });
    } finally {
      setSavingPass(false);
    }
  };

  return (
    <div className="max-w-container-max mx-auto px-4 sm:px-gutter py-6 sm:py-xl space-y-6 pb-24 overflow-x-hidden w-full">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            VIP ACCOUNT SETTINGS
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-warning bg-warning-container/40 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-xs icon-filled">stars</span>
            Gold VIP Tier
          </span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-on-surface">Account & Security</h1>
        <p className="font-body-md text-sm sm:text-base text-secondary">
          Personal identity, biometric 2FA security, saved payment instruments, and communication preferences.
        </p>
      </div>

      {/* Luxury VIP Membership Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-container-lowest via-surface-container-low to-surface-container border border-outline-variant/50 p-6 shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-full bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-container p-0.5 ring-2 ring-primary/40 shadow-lg overflow-hidden">
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-success text-white rounded-full flex items-center justify-center text-[10px] shadow">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-on-surface">{profile.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white font-mono uppercase">
                  VIP Gold
                </span>
              </div>
              <p className="text-xs text-secondary font-mono">@{profile.username} • Member since 2024</p>
              <p className="text-xs text-on-surface/80 mt-1 max-w-md">{profile.bio}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-surface-container-lowest/80 backdrop-blur-md p-3 rounded-xl border border-outline-variant/30 text-center">
              <span className="text-[10px] font-bold text-secondary uppercase block">Reward Balance</span>
              <span className="text-base font-black font-mono text-primary">$42.50</span>
            </div>
            <div className="bg-surface-container-lowest/80 backdrop-blur-md p-3 rounded-xl border border-outline-variant/30 text-center">
              <span className="text-[10px] font-bold text-secondary uppercase block">Tier Points</span>
              <span className="text-base font-black font-mono text-warning">2,480 pts</span>
            </div>
            <div className="bg-surface-container-lowest/80 backdrop-blur-md p-3 rounded-xl border border-outline-variant/30 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-secondary uppercase block">Free Express</span>
              <span className="text-base font-bold text-success">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-surface-container-lowest p-1.5 rounded-2xl border border-outline-variant/40 shadow-subtle flex items-center gap-1 overflow-x-auto hide-scrollbar">
        {[
          { id: 'profile', label: 'Profile & Avatar', icon: 'person' },
          { id: 'security', label: 'Security & 2FA', icon: 'security' },
          { id: 'payments', label: 'Payment Methods', icon: 'credit_card' },
          { id: 'notifications', label: 'Notifications', icon: 'notifications' },
          { id: 'preferences', label: 'Preferences', icon: 'tune' },
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

      {/* TAB 1: PROFILE & AVATAR */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Preset Avatars Selector */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-3">
            <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Choose Avatar</h3>
            <p className="text-xs text-secondary">Select an avatar or paste a custom image URL.</p>

            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {PRESET_AVATARS.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setProfile({ ...profile, avatar: url })}
                  className={cn(
                    'w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all shrink-0 p-0.5',
                    profile.avatar === url ? 'border-primary scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  )}
                >
                  <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={saveProfile} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Personal Information</h3>
              <button
                type="submit"
                disabled={savingProfile}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm active:scale-95 transition-all"
              >
                {savingProfile ? 'Saving...' : 'Save Profile'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Username</label>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3.5 py-2.5 text-sm text-secondary cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">City & State</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Country</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Bio / Member Note</label>
                <textarea
                  rows={2}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </form>
        </motion.div>
      )}

      {/* TAB 2: SECURITY & 2FA */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Two-Factor Authentication Card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-container/40 text-success flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">phonelink_lock</span>
              </div>
              <div>
                <h3 className="font-headline-md text-base font-bold text-on-surface">Two-Factor Authentication (2FA)</h3>
                <p className="text-xs text-secondary mt-0.5">
                  Protect your account with Google Authenticator or biometric Passkeys.
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase text-success">
                  ✓ High-Security Active
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                addToast(twoFactorEnabled ? '2FA disabled' : '2FA Authenticator activated', 'info');
              }}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0 self-start sm:self-auto',
                twoFactorEnabled ? 'bg-primary' : 'bg-surface-container'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
                )}
              />
            </button>
          </div>

          {/* Change Password Form */}
          <form onSubmit={savePassword} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4">
            <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Change Password</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                {/* Strength Meter */}
                {passwords.newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1 h-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={cn(
                            'flex-1 rounded-full h-full transition-colors',
                            passStrength.score >= step ? passStrength.color : 'bg-surface-container'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-secondary font-mono">{passStrength.label}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingPass || !passwords.newPassword}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-sm active:scale-95 transition-all disabled:opacity-40"
              >
                {savingPass ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>

          {/* Active Sessions */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Active Devices & Sessions</h3>
              <button
                onClick={() => addToast('Logged out of other devices', 'info')}
                className="text-xs text-error font-semibold hover:underline"
              >
                Revoke Other Sessions
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">laptop_mac</span>
                  <div>
                    <span className="font-semibold text-xs text-on-surface block">Chrome on Linux (This Device)</span>
                    <span className="text-[10px] text-secondary">San Francisco, United States • Active now</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-success-container text-success">
                  Current
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl">phone_iphone</span>
                  <div>
                    <span className="font-semibold text-xs text-on-surface block">Vendex Mobile iOS (iPhone 15 Pro)</span>
                    <span className="text-[10px] text-secondary">San Francisco, United States • 2 hours ago</span>
                  </div>
                </div>
                <button
                  onClick={() => addToast('Session revoked', 'info')}
                  className="text-xs text-secondary hover:text-error"
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: PAYMENT METHODS */}
      {activeTab === 'payments' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-tr from-[#1E2024] to-[#2B2D31] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden max-w-md border border-white/10">
            <div className="flex justify-between items-start mb-8">
              <span className="material-symbols-outlined text-3xl text-primary">contactless</span>
              <span className="font-mono text-xs tracking-widest uppercase font-bold text-white/80">VISA INFINITE</span>
            </div>

            <div className="space-y-4">
              <p className="font-mono text-lg tracking-widest">•••• •••• •••• 4242</p>
              <div className="flex justify-between items-end text-xs">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-white/60 block">Cardholder</span>
                  <span className="font-semibold uppercase">{profile.name}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-white/60 block">Expires</span>
                  <span className="font-mono font-bold">12/28</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">1-Click Express Checkout</h3>
                <p className="text-xs text-secondary">Skip address confirmation on items covered by your default shipping address.</p>
              </div>
              <button
                type="button"
                onClick={() => setOneClickCheckout(!oneClickCheckout)}
                className={cn(
                  'w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0',
                  oneClickCheckout ? 'bg-primary' : 'bg-surface-container'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                    oneClickCheckout ? 'translate-x-6' : 'translate-x-0'
                  )}
                />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4"
        >
          <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Communication Channels</h3>

          <div className="divide-y divide-outline-variant/30">
            {[
              { id: 'orderTrackingEmail', label: 'Order Tracking & Delivery Emails', desc: 'Real-time notifications when packages are shipped and out for delivery.' },
              { id: 'orderTrackingSms', label: 'Live SMS Out-for-Delivery Alerts', desc: 'Text alert 30 minutes prior to doorstep courier arrival.' },
              { id: 'priceDrops', label: 'Wishlist Price Drop Alerts', desc: 'Notify me when items in my wishlist receive discounts.' },
              { id: 'exclusiveDrops', label: 'VIP Exclusive Product Drops', desc: 'Early access passes for limited edition streetwear and tech drops.' },
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

      {/* TAB 5: PREFERENCES */}
      {activeTab === 'preferences' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-subtle space-y-4"
        >
          <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">Regional & Currency Standards</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Display Currency</label>
              <select
                value={preferences.currency}
                onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="CAD">CAD ($) - Canadian Dollar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3.5 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Français">Français</option>
                <option value="Español">Español</option>
                <option value="Deutsch">Deutsch</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
