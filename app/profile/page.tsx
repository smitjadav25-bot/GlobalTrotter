'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  MapPin,
  Award,
  Globe2,
  Heart,
  Bookmark,
  Calendar,
  DollarSign,
  ShieldCheck,
  Check,
  Edit,
  Sparkles,
  Plane,
  Luggage
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';
import { trotStore } from '@/lib/store';

const ACHIEVEMENTS = [
  { id: 'a1', title: 'Globetrotter Elite', desc: 'Explored 10+ global destinations', icon: '🌍', unlocked: true },
  { id: 'a2', title: 'Mountain Conqueror', desc: 'Completed high-altitude trails in Alps & Himalayas', icon: '🏔️', unlocked: true },
  { id: 'a3', title: 'Island Hopper', desc: 'Discovered 5+ secret coastal archipelagos', icon: '🏝️', unlocked: true },
  { id: 'a4', title: 'Budget Master', desc: 'Saved over $1,200 with AI itinerary optimization', icon: '💰', unlocked: true },
  { id: 'a5', title: 'Gastronomy Hunter', desc: 'Tasted 25+ iconic Michelin & street dishes', icon: '🍜', unlocked: false },
  { id: 'a6', title: 'Zero-Carbon Voyager', desc: 'Used scenic rail transit for 1,000+ km', icon: '🚆', unlocked: true }
];

const VISITED_COUNTRIES = [
  { country: 'Japan', flag: '🇯🇵', cities: 'Tokyo, Kyoto, Osaka', visited: true },
  { country: 'Indonesia', flag: '🇮🇩', cities: 'Bali, Nusa Penida', visited: true },
  { country: 'France', flag: '🇫🇷', cities: 'Paris, Nice', visited: true },
  { country: 'Switzerland', flag: '🇨🇭', cities: 'Interlaken, Zermatt', visited: true },
  { country: 'United Arab Emirates', flag: '🇦🇪', cities: 'Dubai', visited: true },
  { country: 'India', flag: '🇮🇳', cities: 'Goa, Ladakh, Kashmir, Manali', visited: true },
  { country: 'Singapore', flag: '🇸🇬', cities: 'Singapore', visited: false },
  { country: 'United States', flag: '🇺🇸', cities: 'New York', visited: false }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'countries' | 'bookings' | 'badges'>('wishlist');
  const [visitedList, setVisitedList] = useState(VISITED_COUNTRIES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleVisited = (index: number) => {
    const next = [...visitedList];
    next[index].visited = !next[index].visited;
    setVisitedList(next);
    setToastMessage(`Updated visited status for ${next[index].country}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const wishlistDestinations = SAMPLE_DESTINATIONS.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* User Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Alex Rivera"
              className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-100 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white p-1.5 rounded-xl shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-navy-900">Alex Rivera</h1>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Elite Voyager 🌟
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Architect & Cultural Explorer • San Francisco, CA • Member since 2024
            </p>
            <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
              Passionate about high-altitude alpine hiking, Japanese gastronomy, and sustainable bamboo architecture.
            </p>
          </div>
        </div>

        <Link
          href="/settings"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors self-start md:self-auto"
        >
          <Edit className="w-3.5 h-3.5" /> Edit Profile
        </Link>
      </div>

      {/* Travel Stats Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-soft text-center space-y-1">
          <div className="text-xs text-slate-400 font-bold uppercase">Countries Visited</div>
          <div className="text-3xl font-black text-navy-900">
            {visitedList.filter((v) => v.visited).length} <span className="text-sm font-normal text-slate-400">/ 195</span>
          </div>
          <div className="text-[11px] text-teal-700 font-semibold">Top 5% Voyager</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-soft text-center space-y-1">
          <div className="text-xs text-slate-400 font-bold uppercase">Trips Completed</div>
          <div className="text-3xl font-black text-navy-900">14</div>
          <div className="text-[11px] text-teal-700 font-semibold">100% On-Time</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-soft text-center space-y-1">
          <div className="text-xs text-slate-400 font-bold uppercase">Total Distance</div>
          <div className="text-3xl font-black text-navy-900">42.8k</div>
          <div className="text-[11px] text-teal-700 font-semibold">Kilometers Traveled</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-soft text-center space-y-1">
          <div className="text-xs text-slate-400 font-bold uppercase">AI Budget Saved</div>
          <div className="text-3xl font-black text-sunset-600">$1,450</div>
          <div className="text-[11px] text-sunset-700 font-semibold">Optimized Stays</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        {[
          { id: 'wishlist', label: 'Saved Wishlist (4)', icon: Heart },
          { id: 'countries', label: 'Visited Countries (6)', icon: Globe2 },
          { id: 'badges', label: 'Achievements & Badges (5)', icon: Award },
          { id: 'bookings', label: 'Active Bookings', icon: Luggage }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlistDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 bg-white/90 p-1.5 rounded-full text-sunset-500 shadow-sm">
                  <Heart className="w-3.5 h-3.5 fill-sunset-500" />
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-extrabold text-sm text-navy-900">{dest.name}</h3>
                  <p className="text-xs text-slate-500">{dest.country} • ⭐ {dest.rating}</p>
                </div>

                <Link
                  href={`/explore/${dest.id}`}
                  className="w-full py-2 bg-slate-100 hover:bg-navy-900 hover:text-white text-navy-900 text-xs font-bold rounded-xl text-center transition-colors"
                >
                  View Destination
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: VISITED COUNTRIES CHECKLIST */}
      {activeTab === 'countries' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-navy-900">World Scratch & Visited Tracker</h3>
            <span className="text-xs text-teal-700 font-bold">
              {visitedList.filter((v) => v.visited).length} Countries Checked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visitedList.map((c, idx) => (
              <button
                key={c.country}
                onClick={() => toggleVisited(idx)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  c.visited
                    ? 'border-teal-500 bg-teal-50/40 shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className={`text-xs font-extrabold ${c.visited ? 'text-navy-900' : 'text-slate-500'}`}>
                      {c.country}
                    </div>
                    <div className="text-[10px] text-slate-400">{c.cities}</div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border text-xs font-bold ${
                    c.visited ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {c.visited && '✓'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ACHIEVEMENTS & BADGES */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border flex items-center gap-4 transition-all ${
                badge.unlocked
                  ? 'bg-white border-slate-200/80 shadow-soft'
                  : 'bg-slate-50 border-slate-200/50 opacity-60'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-navy-900 to-teal-800 text-white flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                {badge.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-xs text-navy-900">{badge.title}</h4>
                  {badge.unlocked && <span className="text-teal-600 text-[10px] font-bold">✓ Unlocked</span>}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: ACTIVE BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="font-extrabold text-base text-navy-900">Confirmed Booking Vouchers</h3>
          <div className="space-y-3">
            {[
              { title: 'Mandapa, a Ritz-Carlton Reserve (Private Pool Villa)', date: 'Oct 15 - Oct 18, 2026', code: 'GT-BL-9812', amount: '$1,740' },
              { title: 'Mount Batur Sunrise Volcanic Trek (2 Adults)', date: 'Oct 16, 2026 at 04:00 AM', code: 'GT-ACT-412', amount: '$90' }
            ].map((b, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-extrabold text-xs text-navy-900">{b.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Booking Ref: <strong>{b.code}</strong> • {b.date}</div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="text-xs font-black text-navy-900">{b.amount}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
