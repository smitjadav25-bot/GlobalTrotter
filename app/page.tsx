'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Search,
  MapPin,
  Star,
  ArrowRight,
  TrendingUp,
  Compass,
  DollarSign,
  ShieldCheck,
  Zap,
  Globe2,
  Calendar,
  Layers,
  Heart
} from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

// Trending Activities dataset required by prompt
const TRENDING_ACTIVITIES = [
  {
    id: 'act-skydiving',
    name: 'Tandem Skydiving Over Palms',
    destination: 'Dubai, UAE',
    destId: 'dubai',
    avgPrice: 380,
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    category: 'Sky Diving',
    badge: 'Adrenaline Top Pick'
  },
  {
    id: 'act-trekking',
    name: 'Glacial Alpine High-Pass Trekking',
    destination: 'Switzerland Alps',
    destId: 'switzerland',
    avgPrice: 140,
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    category: 'Trekking',
    badge: 'UNESCO Trail'
  },
  {
    id: 'act-scuba',
    name: 'Manta Ray & Coral Scuba Diving',
    destination: 'Bali, Indonesia',
    destId: 'bali',
    avgPrice: 65,
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    category: 'Scuba Diving',
    badge: 'Marine Protected'
  },
  {
    id: 'act-hiking',
    name: '10,000 Torii Gates Mountain Hike',
    destination: 'Tokyo & Kyoto, Japan',
    destId: 'tokyo',
    avgPrice: 25,
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    category: 'Hiking',
    badge: 'Sacred Path'
  },
  {
    id: 'act-paragliding',
    name: 'Tandem Alpine Paragliding Flight',
    destination: 'Interlaken, Switzerland',
    destId: 'switzerland',
    avgPrice: 180,
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    category: 'Paragliding',
    badge: 'Breathtaking 360°'
  },
  {
    id: 'act-safari',
    name: 'Red Dunes 4x4 Starlit Desert Safari',
    destination: 'Dubai, UAE',
    destId: 'dubai',
    avgPrice: 65,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    category: 'Safari',
    badge: 'BBQ & Stargazing'
  },
  {
    id: 'act-camping',
    name: 'Milky Way Glamping at Pangong Lake (14,270 ft)',
    destination: 'Ladakh, India',
    destId: 'ladakh',
    avgPrice: 50,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    category: 'Camping',
    badge: 'High Altitude'
  },
  {
    id: 'act-cruise',
    name: 'Overnight Kettuvallam Luxury Cruise',
    destination: 'Kerala, India',
    destId: 'kerala',
    avgPrice: 140,
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    category: 'Cruise',
    badge: 'Private Chef'
  }
];

const SUGGESTED_PROMPTS = [
  '7 days in Bali for romantic couple on $2,500 budget',
  'Tokyo 5-day sushi, anime & digital art itinerary',
  'Switzerland scenic rail & alpine hiking for 6 days',
  'High-altitude motorbike expedition in Ladakh'
];

export default function HomePage() {
  const router = useRouter();
  const [aiPrompt, setAiPrompt] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>(['bali', 'tokyo']);

  const handlePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) {
      router.push('/planner');
    } else {
      router.push(`/planner?prompt=${encodeURIComponent(aiPrompt)}`);
    }
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background Ambient Glows & Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
            alt="World Travel"
            className="w-full h-full object-cover filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-50/90 via-warm-50/95 to-warm-50" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Subtle Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-soft-xs text-xs font-bold text-navy-900 animate-in fade-in slide-in-from-top-2 duration-300">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-sunset-500" />
            <span>AI-First Global Travel Planner</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-navy-900 leading-[1.08]">
            Where will you{' '}
            <span className="bg-gradient-to-r from-teal-600 via-sunset-500 to-sunset-600 bg-clip-text text-transparent">
              go next?
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Let AI plan the journey while you enjoy the experience.
          </p>

          {/* Large AI Search Box */}
          <div className="pt-4 max-w-3xl mx-auto">
            <form
              onSubmit={handlePlanSubmit}
              className="p-2 sm:p-2.5 rounded-3xl bg-white shadow-soft-lg border border-slate-200/90 flex flex-col sm:flex-row items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500"
            >
              <div className="flex items-center gap-3 px-3 flex-1 w-full">
                <Search className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Tell Globe AI where you want to travel..."
                  className="w-full bg-transparent text-sm sm:text-base text-navy-900 placeholder-slate-400 font-medium focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-navy-900/15 hover:shadow-glow-teal hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 text-sunset-400" />
                <span>✨ Plan with AI</span>
              </button>
            </form>

            {/* Prompt Quick Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Try asking:</span>
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAiPrompt(prompt);
                    router.push(`/planner?prompt=${encodeURIComponent(prompt)}`);
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/80 border border-slate-200/70 hover:border-teal-400 hover:text-teal-700 transition-all text-[11px]"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1. TRENDING DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700 mb-1">
              <TrendingUp className="w-3.5 h-3.5" /> Handpicked Global Escapes
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Trending Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Curated locations with live AI weather intelligence, boutique stays, and authentic food trails.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 px-3.5 py-2 rounded-xl border border-teal-200/60 transition-all hover:gap-2 self-start sm:self-auto"
          >
            Explore All 12 Hubs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Large Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SAMPLE_DESTINATIONS.map((dest) => {
            const isSaved = savedIds.includes(dest.id);

            return (
              <div
                key={dest.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative"
              >
                {/* Hero Image & Badges */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-navy-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{dest.rating}</span>
                    <span className="text-[10px] text-slate-300 font-normal">({dest.reviewCount})</span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleSave(dest.id, e)}
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-sunset-500 shadow-sm transition-all"
                    title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-sunset-500 text-sunset-500' : ''}`} />
                  </button>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      {dest.country}
                    </span>
                    <span className="text-[11px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/30">
                      {dest.bestTimeToVisit.split('(')[0]}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-navy-900 group-hover:text-teal-700 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  {/* Highlights Pill Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {dest.climate} Climate
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700">
                      {dest.placesToVisit.length}+ Top Spots
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sunset-50 text-sunset-700">
                      {dest.stays.length} Boutique Stays
                    </span>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Ideal Stay</div>
                      <div className="text-xs font-bold text-navy-900">{dest.idealDurationDays}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/planner?destination=${encodeURIComponent(dest.name)}`}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      >
                        Plan AI
                      </Link>
                      <Link
                        href={`/explore/${dest.id}`}
                        className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1"
                      >
                        Explore <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. TRENDING ACTIVITIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sunset-600 mb-1">
              <Zap className="w-3.5 h-3.5" /> High-Thrill & Cultural Adventures
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Trending Activities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              From tandem skydiving and alpine paragliding to secret island scuba trails.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Verified Guides & Gear Included</span>
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRENDING_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={act.image}
                  alt={act.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-navy-900 text-[10px] font-extrabold px-2 py-0.5 rounded-lg shadow-xs">
                  {act.category}
                </div>

                {/* Rating */}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white text-xs font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {act.rating}
                </div>

                {/* Price */}
                <div className="absolute bottom-2.5 right-2.5 bg-navy-900/85 backdrop-blur-md text-white text-[11px] font-extrabold px-2 py-0.5 rounded-lg">
                  Avg. ${act.avgPrice}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-extrabold text-sm text-navy-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                    {act.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{act.destination}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sunset-700 bg-sunset-50 px-2 py-0.5 rounded-md">
                    {act.badge}
                  </span>

                  <Link
                    href={`/explore/${act.destId}#activities`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Highlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-teal-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-soft-xl">
          <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute -left-12 -top-12 w-80 h-80 rounded-full bg-sunset-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold border border-white/15">
              <Sparkles className="w-3.5 h-3.5" /> Intelligent Travel Technology
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              Smart Weather Adaptation & Instant Budget Optimization
            </h3>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              When rain threatens your outdoor excursions, Globe AI automatically replans your itinerary with indoor artisan workshops, museum fast-tracks, and cozy culinary trails—keeping your journey flawless.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/planner"
                className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-navy-900 font-extrabold text-xs sm:text-sm shadow-md transition-all"
              >
                Launch AI Multi-Step Wizard
              </Link>
              <Link
                href="/budget"
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                View Budget Analysis Suite
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
