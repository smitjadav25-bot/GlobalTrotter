'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, MapPin, Sparkles, Hotel, Compass, ArrowRight, X, User } from 'lucide-react';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event
          window.dispatchEvent(new CustomEvent('open-search-modal'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDestinations = SAMPLE_DESTINATIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.country.toLowerCase().includes(query.toLowerCase()) ||
      d.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const matchedStays = SAMPLE_DESTINATIONS.flatMap((d) =>
    d.stays
      .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.type.toLowerCase().includes(query.toLowerCase()))
      .map((s) => ({ ...s, destName: d.name, destId: d.id }))
  ).slice(0, 4);

  const matchedActivities = SAMPLE_DESTINATIONS.flatMap((d) =>
    d.activities
      .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()))
      .map((a) => ({ ...a, destName: d.name, destId: d.id }))
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-teal-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations (Bali, Paris, Tokyo), luxury stays, activities, or food..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-200/80 text-slate-600 hover:bg-slate-300"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          {/* Quick AI Planner Action */}
          <Link
            href={`/planner?q=${encodeURIComponent(query || 'Best Destination')}`}
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-sunset-500/10 via-teal-500/10 to-transparent border border-sunset-500/20 hover:border-sunset-500/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sunset-500 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-navy-900 group-hover:text-sunset-600 transition-colors">
                  {query ? `Let AI generate an itinerary for "${query}"` : 'Generate an AI Multi-City Trip Plan'}
                </div>
                <div className="text-[11px] text-slate-500">Instant day-by-day routes, budgets & weather forecast</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-sunset-500 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Destinations Category */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              Destinations ({filteredDestinations.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredDestinations.slice(0, 6).map((dest) => (
                <Link
                  key={dest.id}
                  href={`/explore/${dest.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                >
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                  />
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-teal-700 truncate">
                      {dest.name}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {dest.country} • ⭐ {dest.rating}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stays Category */}
          {matchedStays.length > 0 && (
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Hotel className="w-3.5 h-3.5 text-sunset-500" />
                Curated Stays & Resorts
              </div>
              <div className="space-y-1.5">
                {matchedStays.map((stay) => (
                  <Link
                    key={stay.id}
                    href={`/explore/${stay.destId}#stays`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img src={stay.imageUrl} alt={stay.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="text-xs font-bold text-slate-800">{stay.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {stay.type} in {stay.destName} • ⭐ {stay.rating}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-navy-900">${stay.pricePerNight}</div>
                      <div className="text-[10px] text-slate-400">/ night</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Activities Category */}
          {matchedActivities.length > 0 && (
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Featured Experiences
              </div>
              <div className="space-y-1.5">
                {matchedActivities.map((act) => (
                  <Link
                    key={act.id}
                    href={`/explore/${act.destId}#activities`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img src={act.imageUrl} alt={act.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="text-xs font-bold text-slate-800">{act.name}</div>
                        <div className="text-[11px] text-slate-500">
                          {act.category} • {act.destName}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg">
                      ${act.cost}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press <strong>ESC</strong> to close</span>
          <span>Tip: Use <strong>⌘K</strong> or <strong>Ctrl+K</strong> anywhere</span>
        </div>
      </div>
    </div>
  );
}
