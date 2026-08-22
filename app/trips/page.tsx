'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Share2,
  Trash2,
  Edit3,
  PieChart,
  Eye,
  Compass,
  DollarSign,
  Loader2,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { format } from 'date-fns';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

export default function TripsPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTripId, setDeleteTripId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/trips?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.trips) setTrips(data.trips);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [search]);

  const handleDeleteConfirm = async () => {
    if (!deleteTripId) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/trips/${deleteTripId}`, { method: 'DELETE' });
      if (res.ok) {
        setTrips((prev) => prev.filter((t) => t.id !== deleteTripId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteTripId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Trips</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your multi-city itineraries, budgets, and schedules
          </p>
        </div>
        <Link
          href="/trips/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-coral hover:bg-coral-dark text-white text-sm font-bold rounded-2xl shadow-md shadow-coral/25 hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Plan New Trip
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by trip name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Trips Grid */}
      {loading ? (
        <div className="py-24 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-coral" />
          <span className="text-sm font-medium">Loading your itineraries...</span>
        </div>
      ) : trips.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-white border border-slate-200 shadow-soft p-8">
          <div className="w-16 h-16 rounded-3xl bg-coral-50 text-coral flex items-center justify-center mx-auto mb-4">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No trips found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
            {search ? `No trips matching "${search}".` : "You haven't created any trips yet. Start planning your dream destination now!"}
          </p>
          <Link
            href="/trips/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral-dark text-white text-sm font-bold rounded-2xl shadow-md"
          >
            <Plus className="w-4 h-4" /> Create Trip Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => {
            const startDate = trip.startDate ? format(new Date(trip.startDate), 'MMM d, yyyy') : '';
            const endDate = trip.endDate ? format(new Date(trip.endDate), 'MMM d, yyyy') : '';
            const citiesStr = trip.citiesVisited?.join(' → ') || 'No stops yet';

            return (
              <div
                key={trip.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:border-coral/40 transition-all flex flex-col group"
              >
                {/* Cover Image */}
                <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                  <img
                    src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                    alt={trip.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {trip.stopsCount || 0} {trip.stopsCount === 1 ? 'Stop' : 'Stops'}
                  </div>
                  {trip.isPublic && (
                    <div className="absolute top-3 right-3 bg-teal-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Public
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-coral transition-colors">
                      {trip.name}
                    </h3>
                    <p className="text-xs font-semibold text-coral mt-0.5 line-clamp-1">
                      {citiesStr}
                    </p>
                    {trip.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                        {trip.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {startDate} - {endDate}
                    </span>
                    <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      ${trip.totalCost?.toFixed(0) || 0} est.
                    </span>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-100">
                    <Link
                      href={`/trips/${trip.id}/builder`}
                      className="text-center py-2 text-xs font-bold text-coral bg-coral-50 hover:bg-coral-100 rounded-xl transition-colors"
                      title="Open Drag & Drop Builder"
                    >
                      Builder
                    </Link>
                    <Link
                      href={`/trips/${trip.id}/view`}
                      className="text-center py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                      title="View Structured Itinerary"
                    >
                      View
                    </Link>
                    <Link
                      href={`/trips/${trip.id}/budget`}
                      className="text-center py-2 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors"
                      title="Budget Analytics & Charts"
                    >
                      Budget
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTripId(trip.id)}
                      className="py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center justify-center"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTripId}
        title="Delete Trip?"
        message="Are you sure you want to delete this trip and all its stops and activities? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTripId(null)}
      />
    </div>
  );
}
