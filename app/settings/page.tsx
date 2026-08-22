'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  Settings,
  User,
  Mail,
  Globe,
  DollarSign,
  Bell,
  Trash2,
  Check,
  Loader2,
  Camera,
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
        <h1 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-teal-500" /> Account Preferences & Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal details, localization, preferred currency, and security options.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-2xl text-xs font-bold text-teal-800 dark:text-teal-200 flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-teal-500" /> Preferences successfully saved and synchronized.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-card-dark rounded-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Profile Information</h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shrink-0">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-black text-2xl">
                  {name ? name[0].toUpperCase() : 'U'}
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Avatar Image URL
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
              <p className="text-[11px] text-slate-400">Direct HTTPS URL for your personal profile picture.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-500 dark:text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Localization & Preferences Card */}
        <div className="bg-white dark:bg-card-dark rounded-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Regional Preferences</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-500" /> Interface Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-sunset-500" /> Default Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40"
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
        <div className="bg-white dark:bg-card-dark rounded-card p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Bell className="w-4 h-4 text-sunset-500" /> Smart Travel Alerts
          </h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-navy-900 dark:text-white">AI Itinerary Updates</div>
                <div className="text-[11px] text-slate-400">Receive alerts when routes are optimized or schedules shift.</div>
              </div>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="w-4 h-4 accent-teal-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-navy-900 dark:text-white">Flight & Hotel Price Drop Watcher</div>
                <div className="text-[11px] text-slate-400">Get notified when tracked city stays decrease in cost.</div>
              </div>
              <input
                type="checkbox"
                checked={priceDropAlerts}
                onChange={(e) => setPriceDropAlerts(e.target.checked)}
                className="w-4 h-4 accent-teal-500 rounded"
              />
            </label>
          </div>
        </div>

        {/* Save button bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-2 disabled:opacity-50 transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="bg-rose-50/60 dark:bg-rose-950/20 rounded-card p-6 border border-rose-200 dark:border-rose-900/60 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Danger Zone
            </h3>
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
              Permanently remove your account, saved itineraries, and preferences from SQLite storage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
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
