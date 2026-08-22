'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  User,
  Mail,
  Globe,
  Camera,
  MapPin,
  Heart,
  Trash2,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Shield,
  AlertTriangle,
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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-coral animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
          <User className="w-8 h-8 text-coral" /> Traveler Profile & Preferences
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account information, interface language, and saved destination wishlist.
        </p>
      </div>

      {/* Main Profile Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-coral/10 text-coral flex items-center justify-center font-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Personal Information</h2>
              <div className="text-xs text-slate-500">
                Account Role:{' '}
                <span className="px-2 py-0.5 rounded-md bg-coral-50 text-coral-700 font-extrabold uppercase text-[10px]">
                  {profile?.role || 'USER'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* Avatar Upload */}
          <ImageUploader
            value={avatarUrl}
            onChange={(url) => setAvatarUrl(url)}
            label="Profile Avatar Photo"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-coral/40 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-coral/40 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Language Preference</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={languagePref}
                onChange={(e) => setLanguagePref(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-coral/40 focus:outline-none"
              >
                <option value="en">English (US)</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
                <option value="ja">日本語 (Japanese)</option>
                <option value="de">Deutsch (German)</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-600">
              {error}
            </div>
          )}

          {saveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Profile updated successfully!
            </div>
          )}

          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-coral hover:bg-coral-dark text-white rounded-xl text-xs font-bold shadow-md shadow-coral/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Saved Destinations Wishlist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center font-black">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Saved Wishlist Destinations</h2>
              <p className="text-xs text-slate-500">Cities you have bookmarked for future adventures</p>
            </div>
          </div>
          <Link
            href="/cities"
            className="text-xs font-bold text-coral hover:text-coral-dark flex items-center gap-1"
          >
            Browse More <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {profile?.savedDestinations && profile.savedDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profile.savedDestinations.map((saved: any) => (
              <div
                key={saved.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs group flex flex-col justify-between"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={saved.city.imageUrl}
                    alt={saved.city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <button
                    onClick={() => handleRemoveSavedCity(saved.cityId)}
                    title="Remove from saved"
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <div className="text-sm font-bold truncate">{saved.city.name}</div>
                    <div className="text-[10px] text-slate-200">{saved.city.country}</div>
                  </div>
                </div>

                <div className="p-3">
                  <Link
                    href={`/trips/new?city=${encodeURIComponent(saved.city.name)}`}
                    className="w-full py-2 bg-coral hover:bg-coral-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    Plan Trip Here <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500 space-y-2">
            <p>You haven't bookmarked any cities yet.</p>
            <Link
              href="/cities"
              className="inline-flex items-center gap-1 font-bold text-coral hover:underline"
            >
              Explore destinations now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-soft space-y-4">
        <div className="flex items-center gap-3 text-rose-800">
          <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
          <div>
            <h3 className="text-base font-bold text-rose-900">Danger Zone</h3>
            <p className="text-xs text-rose-700">
              Permanently delete your account and remove all associated trips, stops, and uploads.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
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
