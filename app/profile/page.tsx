'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  MapPin,
  Heart,
  Save,
  Trash2,
  Plus,
  Loader2,
  Sparkles,
  CheckCircle2,
  Calendar,
  Compass,
} from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/profile');
      const data = await res.json();
      if (data.profile) {
        setProfile(data.profile);
        setName(data.profile.name || '');
        setEmail(data.profile.email || '');
        setAvatarUrl(data.profile.avatarUrl || '');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setSavedSuccess(false);
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, avatarUrl }),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveSavedCity = async (cityId: string) => {
    try {
      const res = await fetch('/api/profile/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId }),
      });
      if (res.ok) {
        setProfile((prev: any) => ({
          ...prev,
          savedDestinations: prev.savedDestinations.filter((sd: any) => sd.city.id !== cityId),
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
        <span className="text-sm font-semibold text-slate-500">Loading user profile...</span>
      </div>
    );
  }

  const savedDestinations = profile?.savedDestinations || [];
  const trips = profile?.trips || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Profile & Wishlist</h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize your travel profile and view saved destinations for future itineraries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Settings */}
        <div className="lg:col-span-5 space-y-6">
          <form
            onSubmit={handleUpdateProfile}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-5"
          >
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-coral" /> Traveler Information
            </h2>

            {/* Avatar Preview */}
            <div className="flex items-center gap-4">
              <img
                src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt=""
                className="w-16 h-16 rounded-full object-cover ring-4 ring-coral/20 shrink-0"
              />
              <div className="min-w-0">
                <div className="font-bold text-sm text-slate-900">{name || 'Traveler'}</div>
                <div className="text-xs text-slate-500 truncate">{email}</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-coral/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-coral/40"
              />
            </div>

            <ImageUploader
              value={avatarUrl}
              onChange={setAvatarUrl}
              label="Avatar Photo"
            />

            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile updated successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 bg-coral hover:bg-coral-dark text-white rounded-xl text-sm font-bold shadow-md shadow-coral/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Profile Changes
            </button>
          </form>

          {/* Quick Stats Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
            <h3 className="font-bold text-sm text-slate-900 mb-3">Traveler Stats</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <div className="text-2xl font-black text-slate-900">{trips.length}</div>
                <div className="text-[11px] text-slate-500 font-medium">Created Trips</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <div className="text-2xl font-black text-coral">{savedDestinations.length}</div>
                <div className="text-[11px] text-slate-500 font-medium">Saved Destinations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Saved Destinations Wishlist */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-coral fill-coral" /> Saved Destinations Wishlist
                </h2>
                <p className="text-xs text-slate-500">Places you want to visit on future journeys</p>
              </div>
              <Link
                href="/trips/new"
                className="px-3.5 py-1.5 bg-coral-50 hover:bg-coral-100 text-coral rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Plan Trip
              </Link>
            </div>

            {savedDestinations.length === 0 ? (
              <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-2">
                <p className="text-xs text-slate-500">No saved destinations in your wishlist yet.</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-xs font-bold text-coral hover:underline"
                >
                  Explore Destinations
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedDestinations.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-between group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.city.imageUrl}
                        alt={item.city.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.city.costIndex}x Cost
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{item.city.name}</h4>
                        <p className="text-xs text-slate-500">{item.city.country}</p>
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-200/60">
                        <Link
                          href={`/trips/new?city=${encodeURIComponent(item.city.name)}`}
                          className="text-xs font-bold text-coral hover:underline"
                        >
                          Plan Trip Here →
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleRemoveSavedCity(item.city.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
