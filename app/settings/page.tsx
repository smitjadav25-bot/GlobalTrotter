'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  Settings,
  Globe,
  DollarSign,
  Bell,
  Trash2,
  Check,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

const LANGUAGES = [
  { code: 'en', label: 'English (US)' },
  { code: 'es', label: 'Español (Spanish)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'ja', label: '日本語 (Japanese)' },
  { code: 'de', label: 'Deutsch (German)' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'US Dollar (USD)' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee (INR)' },
  { code: 'EUR', symbol: '€', label: 'Euro (EUR)' },
  { code: 'GBP', symbol: '£', label: 'British Pound (GBP)' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen (JPY)' },
];

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [priceDropAlerts, setPriceDropAlerts] = useState(true);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setAvatarUrl(session.user.image || (session.user as any)?.avatarUrl || '');
      setLanguage((session.user as any)?.languagePref || 'en');
    }
  }, [session]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          avatarUrl,
          languagePref: language,
        }),
      });

      if (res.ok) {
        await updateSession({
          name,
          avatarUrl,
          languagePref: language,
        });
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error updating settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);
      const res = await fetch('/api/profile', {
        method: 'DELETE',
      });
      if (res.ok) {
        await signOut({ callbackUrl: '/login' });
      }
    } catch (err) {
      console.error('Error deleting account:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2.5">
          <Settings className="w-6 h-6 opacity-80" /> Account Preferences & Settings
        </h1>
        <p className="text-xs text-muted font-normal mt-1">
          Manage your personal details, localization, preferred currency, and security options.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-charcoal-4 border border-charcoal-40 rounded text-xs font-normal text-charcoal flex items-center gap-2">
          <Check className="w-4 h-4" /> Preferences successfully saved and synchronized.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-cream rounded-card p-6 border border-light-cream space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Profile Information</h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative w-16 h-16 rounded overflow-hidden bg-cream border border-light-cream shrink-0">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted font-semibold text-xl">
                  {name ? name[0].toUpperCase() : 'U'}
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <label className="block text-xs font-normal text-charcoal">
                Avatar Image URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring-blue"
              />
              <p className="text-[11px] text-muted">Direct HTTPS URL for your personal profile picture.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:outline-none focus:ring-2 focus:ring-ring-blue"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3 py-2 bg-charcoal-3 border border-light-cream rounded text-xs text-muted cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Localization & Preferences Card */}
        <div className="bg-cream rounded-card p-6 border border-light-cream space-y-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Regional Preferences</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 opacity-70" /> Interface Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs font-normal focus:outline-none focus:ring-2 focus:ring-ring-blue"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 opacity-70" /> Default Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs font-normal focus:outline-none focus:ring-2 focus:ring-ring-blue"
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Toggle Card */}
        <div className="bg-cream rounded-card p-6 border border-light-cream space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 opacity-70" /> Smart Travel Alerts
          </h2>

          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 rounded bg-charcoal-3 cursor-pointer">
              <div>
                <div className="text-xs font-semibold text-charcoal">AI Itinerary Updates</div>
                <div className="text-[11px] text-muted">Receive alerts when routes are optimized or schedules shift.</div>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 accent-charcoal rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded bg-charcoal-3 cursor-pointer">
              <div>
                <div className="text-xs font-semibold text-charcoal">Flight & Hotel Price Drop Watcher</div>
                <div className="text-[11px] text-muted">Get notified when tracked city stays decrease in cost.</div>
              </div>
              <input
                type="checkbox"
                checked={priceDropAlerts}
                onChange={(e) => setPriceDropAlerts(e.target.checked)}
                className="w-4 h-4 accent-charcoal rounded"
              />
            </label>
          </div>
        </div>

        {/* Save button bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-2 active:opacity-80 transition-opacity disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            Save Changes
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-cream rounded-card p-6 border border-charcoal-40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-charcoal flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 opacity-80" /> Danger Zone
            </h3>
            <p className="text-xs text-muted font-normal mt-0.5">
              Permanently remove your account, saved itineraries, and preferences from SQLite storage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="self-start sm:self-auto px-3.5 py-1.5 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        title="Permanently Delete Account?"
        message="This action is irreversible. All your custom multi-city trips and saved destinations will be permanently removed from SQLite database."
        confirmLabel="Yes, Delete My Account"
        isLoading={deleting}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
