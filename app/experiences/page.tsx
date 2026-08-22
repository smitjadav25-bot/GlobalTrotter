'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Compass, MapPin, Star, Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

export default function ExperiencesCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDest, setSelectedDest] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const allActivities = SAMPLE_DESTINATIONS.flatMap((d) =>
    d.activities.map((a) => ({ ...a, destinationName: d.name, country: d.country, destId: d.id }))
  );

  const filteredActivities = allActivities.filter((a) => {
    const matchesCategory = selectedCategory === 'All' || a.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDest = selectedDest === 'All' || a.destId === selectedDest;
    return matchesCategory && matchesDest;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-sunset-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-soft-lg">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sunset-300 text-xs font-bold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" /> High-Thrill & Cultural Adventures
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Local Experiences & Guided Tours
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
            From volcanic sunrise treks and tandem skydiving to private Michelin food masterclasses and coral reefs.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
          {(['All', 'Adventure', 'Culture', 'Nature', 'Food'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Destination Filter */}
        <select
          value={selectedDest}
          onChange={(e) => setSelectedDest(e.target.value)}
          className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-auto"
        >
          <option value="All">All 12 Destinations</option>
          {SAMPLE_DESTINATIONS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}, {d.country}
            </option>
          ))}
        </select>
      </div>

      {/* Grid of Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={act.imageUrl}
                alt={act.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {act.rating} ({act.reviews})
              </div>
              {act.badge && (
                <div className="absolute top-3 right-3 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {act.badge}
                </div>
              )}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                <MapPin className="w-3 h-3 inline mr-0.5 text-teal-400" /> {act.destinationName}, {act.country}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>{act.category}</span>
                  <span className="text-teal-700">{act.intensity || 'Moderate'}</span>
                </div>

                <h3 className="font-extrabold text-base text-navy-900 mt-1 group-hover:text-teal-700 transition-colors">
                  {act.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {act.description}
                </p>

                <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center gap-3">
                  <span>⏳ {Math.round(act.durationMinutes / 60)} Hours</span>
                  <span>🛡️ Professional Guide</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-extrabold text-navy-900">${act.cost}</span>
                  <span className="text-[10px] text-slate-400"> / person</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/explore/${act.destId}`}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    View Hub
                  </Link>
                  <button
                    onClick={() => showToast(`Booked "${act.name}" for your upcoming trip!`)}
                    className="px-4 py-1.5 bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                  >
                    Book Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
