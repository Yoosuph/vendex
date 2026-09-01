import React, { useContext, useState } from 'react';
import { AuthContext } from '@/shared/context/AuthContext';
import Button from '@/shared/components/Button';
import BuyerPageHeader from '../components/BuyerPageHeader';
import { useToast } from '@/shared/context/ToastContext';
import * as usersApi from '@/shared/api/users';
import { initials } from '../utils';

export default function BuyerSettings() {
  const { user, updateUser, logout } = useContext(AuthContext);
  const { addToast } = useToast();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
    country: user?.country || '',
    city: user?.city || '',
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirm: '',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPass, setSavingPass] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await usersApi.updateProfile({
        name: profile.name,
        avatar: profile.avatar || undefined,
        country: profile.country || undefined,
        city: profile.city || undefined,
      });
      updateUser?.(updated);
      addToast('Profile updated', 'success');
    } catch (err) {
      addToast(err.message || 'Could not update profile', 'error');
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
      addToast('Password changed', 'success');
    } catch (err) {
      addToast(err.message || 'Could not change password', 'error');
    } finally {
      setSavingPass(false);
    }
  };

  return (
    <div className="space-y-xl">
      <BuyerPageHeader
        eyebrow="07  /  Settings"
        title="Account settings"
        description="Manage your profile, security, and preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="buyer-panel p-md flex flex-col items-center text-center gap-sm">
          <div className="w-20 h-20 rounded-full bg-surface-container border border-outline-variant overflow-hidden flex items-center justify-center">
            {profile.avatar ? (
              <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="buyer-mono text-xl font-semibold text-on-surface">
                {initials(profile.name || user?.name)}
              </span>
            )}
          </div>
          <div>
            <p className="text-body-md font-semibold text-on-surface">{profile.name || user?.name}</p>
            <p className="buyer-mono text-[11px] text-on-surface-variant mt-1">{user?.email}</p>
            <p className="buyer-mono text-[10px] tracking-widest uppercase text-primary mt-2">
              {user?.role || 'buyer'}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-md">
          <form onSubmit={saveProfile} className="buyer-panel p-md space-y-md">
            <p className="buyer-eyebrow">Profile</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="sm:col-span-2">
                <label className="buyer-label" htmlFor="name">Display name</label>
                <input
                  id="name"
                  className="buyer-input"
                  value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="buyer-label" htmlFor="avatar">Avatar URL</label>
                <input
                  id="avatar"
                  className="buyer-input buyer-mono text-sm"
                  placeholder="https://"
                  value={profile.avatar}
                  onChange={(e) => setProfile((p) => ({ ...p, avatar: e.target.value }))}
                />
              </div>
              <div>
                <label className="buyer-label" htmlFor="city">City</label>
                <input
                  id="city"
                  className="buyer-input"
                  value={profile.city}
                  onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                />
              </div>
              <div>
                <label className="buyer-label" htmlFor="country">Country</label>
                <input
                  id="country"
                  className="buyer-input"
                  value={profile.country}
                  onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary" loading={savingProfile}>
                Save profile
              </Button>
            </div>
          </form>

          <form onSubmit={savePassword} className="buyer-panel p-md space-y-md">
            <p className="buyer-eyebrow">Security</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="sm:col-span-2">
                <label className="buyer-label" htmlFor="current">Current password</label>
                <input
                  id="current"
                  type="password"
                  autoComplete="current-password"
                  className="buyer-input"
                  value={passwords.currentPassword}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, currentPassword: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="buyer-label" htmlFor="new">New password</label>
                <input
                  id="new"
                  type="password"
                  autoComplete="new-password"
                  className="buyer-input"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, newPassword: e.target.value }))
                  }
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="buyer-label" htmlFor="confirm">Confirm</label>
                <input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  className="buyer-input"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, confirm: e.target.value }))
                  }
                  required
                  minLength={6}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="secondary" loading={savingPass}>
                Update password
              </Button>
            </div>
          </form>

          <div className="buyer-panel p-md flex flex-col sm:flex-row sm:items-center justify-between gap-md">
            <div>
              <p className="buyer-eyebrow">Session</p>
              <p className="text-body-sm text-on-surface mt-1">Sign out of this device</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                logout();
                window.location.href = '/login';
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
