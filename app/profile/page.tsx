'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  User,
  Mail,
  Globe,
  Heart,
  Trash2,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Shield,
  AlertTriangle,
  LogOut,
} from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [languagePref, setLanguagePref] = useState('en');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Delete Account State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/profile');
      if (!res.ok) throw new Error('Failed to load profile');
      const data = await res.json();
      setProfile(data.profile);
      setName(data.profile.name || '');
      setEmail(data.profile.email || '');
      setLanguagePref(data.profile.languagePref || 'en');
      setAvatarUrl(
        data.profile.avatarUrl ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, avatarUrl, languagePref }),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      setSaveSuccess(true);
      await updateSession({ name, avatarUrl, languagePref });
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut({ callbackUrl: '/login' });
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleRemoveSavedCity = async (cityId: string) => {
    try {
      const res = await fetch('/api/profile/saved', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId }),
      });
      if (res.ok) {
        setProfile((prev: any) => ({
          ...prev,
          savedDestinations: prev.savedDestinations.filter((s: any) => s.cityId !== cityId),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);
      const res = await fetch('/api/profile', { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete account');

      await signOut({ callbackUrl: '/login' });
    } catch (err: any) {
      setError(err.message || 'Failed to delete account.');
      setIsDeletingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 text-charcoal animate-spin" />
        <p className="text-xs text-muted">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Title & Quick Sign Out Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2.5">
            <User className="w-6 h-6 opacity-80" /> Traveler Profile & Preferences
          </h1>
          <p className="text-xs text-muted font-normal mt-1">
            Manage your account information, interface language, and saved destinations.
          </p>
        </div>

        {/* Top Sign Out Action */}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-cream text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded text-xs font-normal transition-colors disabled:opacity-50"
          title="Sign out of your account"
        >
          {isSigningOut ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LogOut className="w-3.5 h-3.5 opacity-80" />
          )}
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Profile Form */}
      <div className="bg-cream rounded-card p-6 border border-light-cream space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-light-cream">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-charcoal text-off-white flex items-center justify-center shadow-inset-btn">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-charcoal">Personal Information</h2>
              <div className="text-xs text-muted">
                Role: <span className="text-charcoal font-semibold uppercase">{profile?.role || 'USER'}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <ImageUploader
            value={avatarUrl}
            onChange={(url) => setAvatarUrl(url)}
            label="Profile Avatar Photo"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1">Full Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-normal text-charcoal mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-normal text-charcoal mb-1">Language Preference</label>
            <div className="relative">
              <Globe className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={languagePref}
                onChange={(e) => setLanguagePref(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs font-normal focus:ring-2 focus:ring-ring-blue focus:outline-none"
              >
                <option value="en">English (US)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="de">Deutsch (German)</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="p-2.5 bg-charcoal-4 border border-charcoal-40 rounded text-xs font-normal text-charcoal">
              {error}
            </div>
          )}

          {saveSuccess && (
            <div className="p-2.5 bg-charcoal-4 border border-charcoal-40 rounded text-xs font-normal text-charcoal flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-2 active:opacity-80 transition-opacity disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Saved Destinations Wishlist */}
      <div className="bg-cream rounded-card p-6 border border-light-cream space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-light-cream">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-charcoal text-off-white flex items-center justify-center shadow-inset-btn">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-charcoal">Saved Wishlist Destinations</h2>
              <p className="text-xs text-muted">Indian cities and destinations you bookmarked for future travels</p>
            </div>
          </div>
          <Link
            href="/cities"
            className="text-xs font-normal text-charcoal underline flex items-center gap-1"
          >
            Browse More <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {profile?.savedDestinations && profile.savedDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profile.savedDestinations.map((saved: any) => (
              <div
                key={saved.id}
                className="bg-cream rounded-card border border-light-cream overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-cream border-b border-light-cream">
                  <img
                    src={saved.city.imageUrl}
                    alt={saved.city.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveSavedCity(saved.cityId)}
                    title="Remove from saved"
                    className="absolute top-2 right-2 p-1 rounded-pill bg-cream border border-light-cream text-charcoal shadow-inset-btn opacity-80"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 text-white drop-shadow-sm">
                    <div className="text-xs font-semibold">{saved.city.name}</div>
                    <div className="text-[10px] opacity-80">{saved.city.country}</div>
                  </div>
                </div>

                <div className="p-3">
                  <Link
                    href={`/trips/new?city=${encodeURIComponent(saved.city.name)}`}
                    className="w-full py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center justify-center gap-1 active:opacity-80 transition-opacity"
                  >
                    Plan Trip Here <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded border border-light-cream text-xs text-muted space-y-1.5">
            <p>You haven't bookmarked any destinations yet.</p>
            <Link
              href="/cities"
              className="inline-flex items-center gap-1 text-charcoal underline"
            >
              Explore destinations across India <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* Account Actions / Sign Out & Danger Zone */}
      <div className="bg-cream rounded-card p-6 border border-light-cream space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-light-cream">
          <div>
            <h3 className="text-sm font-semibold text-charcoal flex items-center gap-2">
              <LogOut className="w-4 h-4 opacity-80" /> Sign Out of Session
            </h3>
            <p className="text-xs text-muted font-normal mt-0.5">
              Securely log out of your GlobeTrotter account on this device.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="self-start sm:self-auto px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal active:opacity-80 transition-opacity flex items-center gap-2"
          >
            {isSigningOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
            Sign Out
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-charcoal flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 opacity-80" /> Delete Account
            </h3>
            <p className="text-xs text-muted font-normal mt-0.5">
              Permanently delete your account and all associated itineraries, stops, and saved destinations.
            </p>
          </div>
          <button
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
        message="This action cannot be undone. All your trips, saved destinations, and photo uploads will be permanently removed."
        confirmLabel="Yes, Delete My Account"
        isLoading={isDeletingAccount}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
