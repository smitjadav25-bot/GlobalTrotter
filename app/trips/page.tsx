'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Luggage,
  Calendar,
  DollarSign,
  Plus,
  ArrowRight,
  MoreHorizontal,
  Copy,
  Trash2,
  Edit,
  Share2,
  Check,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { trotStore } from '@/lib/store';
import { UserTrip } from '@/lib/types';

export default function MyTripsPage() {
  const [trips, setTrips] = useState<UserTrip[]>(trotStore.getTrips());
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDuplicate = (id: string, name: string) => {
    const dup = trotStore.duplicateTrip(id);
    if (dup) {
      setTrips([...trotStore.getTrips()]);
      showToast(`Duplicated "${name}" successfully!`);
    }
  };

  const handleDelete = (id: string, name: string) => {
    const ok = trotStore.deleteTrip(id);
    if (ok) {
      setTrips([...trotStore.getTrips()]);
      showToast(`Deleted trip "${name}"`);
    }
  };

  const filteredTrips = trips.filter((t) => {
    if (activeTab === 'all') return true;
    return t.status === activeTab;
  });

  const upcomingTrips = trips.filter((t) => t.status === 'upcoming');
  const ongoingTrips = trips.filter((t) => t.status === 'ongoing');
  const completedTrips = trips.filter((t) => t.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700 mb-1">
            <Luggage className="w-3.5 h-3.5" /> Your Travel Vault
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            My Travel Itineraries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage upcoming adventures, active timelines, and completed trip archives.
          </p>
        </div>

        <Link
          href="/planner"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-teal-300" />
          <span>Create New AI Trip</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All Trips', count: trips.length },
          { id: 'upcoming', label: 'Upcoming', count: upcomingTrips.length },
          { id: 'ongoing', label: 'Ongoing', count: ongoingTrips.length },
          { id: 'completed', label: 'Completed', count: completedTrips.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid of Trips */}
      {filteredTrips.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-teal-50 text-teal-600 flex items-center justify-center text-2xl">
            🧳
          </div>
          <div>
            <h3 className="font-extrabold text-base text-navy-900">No {activeTab} trips found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Start planning your next getaway with our AI trip planner.
            </p>
          </div>
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-xs font-bold rounded-xl"
          >
            <Plus className="w-4 h-4" /> Plan with AI
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredTrips.map((trip) => {
            const statusColor =
              trip.status === 'ongoing'
                ? 'bg-emerald-500 text-white'
                : trip.status === 'upcoming'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-500 text-white';

            return (
              <div
                key={trip.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={trip.coverImage}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-xs ${statusColor}`}>
                    {trip.status}
                  </div>

                  {/* AI Score */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-navy-900 text-[10px] font-extrabold px-2.5 py-1 rounded-xl shadow-xs">
                    Score: {trip.tripScore}/100
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      {trip.destinationName}, {trip.country}
                    </span>
                    <span className="text-[11px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/30">
                      {trip.travelStyle}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-navy-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {trip.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{trip.startDate} to {trip.endDate}</span>
                    </div>

                    {/* Budget Progress bar */}
                    <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-100">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">Budget Spent:</span>
                        <span className="text-navy-900 font-extrabold">
                          ${trip.spentBudget} <span className="text-slate-400 font-normal">/ ${trip.totalBudget}</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-teal-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, (trip.spentBudget / trip.totalBudget) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDuplicate(trip.id, trip.name)}
                        className="p-2 rounded-xl text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                        title="Duplicate Trip"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(trip.id, trip.name)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/budget?tripId=${trip.id}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      >
                        Budget
                      </Link>
                      <Link
                        href={`/planner?destination=${encodeURIComponent(trip.destinationName)}`}
                        className="px-4 py-1.5 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
