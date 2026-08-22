'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Calendar,
  Trash2,
  Compass,
  Loader2,
  Globe,
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
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px]">Your Trips</h1>
          <p className="text-xs text-muted font-normal mt-0.5">
            Manage your multi-city itineraries, budgets, and schedules
          </p>
        </div>
        <Link
          href="/trips/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-charcoal text-off-white text-xs font-normal rounded shadow-inset-btn active:opacity-80 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" />
          Plan New Trip
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center gap-3 bg-cream p-1.5 rounded-card border border-light-cream">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by trip name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-cream text-charcoal border border-light-cream rounded placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring-blue"
          />
        </div>
      </div>

      {/* Trips Grid */}
      {loading ? (
        <div className="py-24 text-center text-muted flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
          <span className="text-xs font-normal">Loading your itineraries...</span>
        </div>
      ) : trips.length === 0 ? (
        <div className="py-16 text-center rounded-card bg-cream border border-light-cream p-8">
          <div className="w-12 h-12 rounded bg-charcoal text-off-white flex items-center justify-center mx-auto mb-3 shadow-inset-btn">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-charcoal">No trips found</h3>
          <p className="text-xs text-muted max-w-md mx-auto mt-1 mb-4">
            {search ? `No trips matching "${search}".` : "You haven't created any trips yet. Start planning your destination now."}
          </p>
          <Link
            href="/trips/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-off-white text-xs font-normal rounded shadow-inset-btn active:opacity-80"
          >
            <Plus className="w-3.5 h-3.5" /> Create Trip Now
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
                className="bg-cream rounded-card overflow-hidden border border-light-cream flex flex-col group justify-between"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-cream border-b border-light-cream">
                    <img
                      src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-cream border border-light-cream text-charcoal text-[10px] font-normal px-2 py-0.5 rounded">
                      {trip.stopsCount || 0} {trip.stopsCount === 1 ? 'Stop' : 'Stops'}
                    </div>
                    {trip.isPublic && (
                      <div className="absolute top-2.5 right-2.5 bg-charcoal text-off-white text-[10px] font-normal px-2 py-0.5 rounded shadow-inset-btn flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Public
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-base font-semibold text-charcoal line-clamp-1">
                        {trip.name}
                      </h3>
                      <p className="text-xs font-normal text-muted mt-0.5 line-clamp-1">
                        {citiesStr}
                      </p>
                      {trip.description && (
                        <p className="text-xs text-muted font-normal line-clamp-2 mt-1 leading-relaxed">
                          {trip.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-light-cream flex items-center justify-between text-xs text-muted font-normal">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 opacity-70" />
                        {startDate} - {endDate}
                      </span>
                      <span className="font-semibold text-charcoal">
                        ${trip.totalCost?.toFixed(0) || 0} est.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-4 gap-1.5 p-4 pt-0 border-t border-light-cream mt-2">
                  <Link
                    href={`/trips/${trip.id}/builder`}
                    className="text-center py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors"
                  >
                    Builder
                  </Link>
                  <Link
                    href={`/trips/${trip.id}/view`}
                    className="text-center py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors"
                  >
                    View
                  </Link>
                  <Link
                    href={`/trips/${trip.id}/budget`}
                    className="text-center py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors"
                  >
                    Budget
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDeleteTripId(trip.id)}
                    className="py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors flex items-center justify-center"
                    title="Delete Trip"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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
        onClose={() => setDeleteTripId(null)}
      />
    </div>
  );
}
