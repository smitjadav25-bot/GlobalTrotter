'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Heart,
  Plus,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  Loader2,
  X,
} from 'lucide-react';
import SearchFilterBar from '@/components/SearchFilterBar';
import { City, Trip } from '@/lib/types';

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedSort, setSelectedSort] = useState('popularity-desc');
  const [savedCityIds, setSavedCityIds] = useState<Set<string>>(new Set());

  // Add to Trip Modal State
  const [selectedCityForTrip, setSelectedCityForTrip] = useState<City | null>(null);
  const [targetTripId, setTargetTripId] = useState<string>('');
  const [arrivalDate, setArrivalDate] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [addingStop, setAddingStop] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState<string | null>(null);
  const [addErrorMsg, setAddErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [citiesRes, tripsRes, savedRes] = await Promise.all([
          fetch('/api/cities'),
          fetch('/api/trips'),
          fetch('/api/profile/saved'),
        ]);

        const citiesData = await citiesRes.json();
        const tripsData = await tripsRes.json();
        const savedData = await savedRes.json();

        if (citiesData.cities) setCities(citiesData.cities);
        if (tripsData.trips) {
          setTrips(tripsData.trips);
          if (tripsData.trips.length > 0) setTargetTripId(tripsData.trips[0].id);
        }
        if (savedData.saved) {
          setSavedCityIds(new Set(savedData.saved.map((s: any) => s.cityId)));
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleSaveCity = async (cityId: string) => {
    try {
      const isSaved = savedCityIds.has(cityId);
      const res = await fetch('/api/profile/saved', {
        method: isSaved ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityId }),
      });
      if (res.ok) {
        setSavedCityIds((prev) => {
          const next = new Set(prev);
          if (isSaved) next.delete(cityId);
          else next.add(cityId);
          return next;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddToTripModal = (city: City) => {
    setSelectedCityForTrip(city);
    setArrivalDate(new Date().toISOString().split('T')[0]);
    setDepartureDate(new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0]);
    setAddSuccessMsg(null);
    setAddErrorMsg(null);
  };

  const handleAddStopToTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCityForTrip || !targetTripId) return;

    try {
      setAddingStop(true);
      setAddErrorMsg(null);
      const res = await fetch(`/api/trips/${targetTripId}/stops`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityId: selectedCityForTrip.id,
          arrivalDate,
          departureDate,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to add stop to trip');

      setAddSuccessMsg(`Successfully added ${selectedCityForTrip.name} to your trip!`);
      setTimeout(() => {
        setSelectedCityForTrip(null);
      }, 1500);
    } catch (err: any) {
      setAddErrorMsg(err.message || 'Failed to add stop.');
    } finally {
      setAddingStop(false);
    }
  };

  // Filter & Sort Logic
  const regions = Array.from(new Set(cities.map((c) => (c as any).region || 'Global'))).filter(Boolean);
  const regionOptions = [
    { label: 'All Regions', value: 'ALL' },
    ...regions.map((r) => ({ label: r, value: r })),
  ];

  const sortOptions = [
    { label: 'Popularity (High to Low)', value: 'popularity-desc' },
    { label: 'Cost Index (Lowest First)', value: 'cost-asc' },
    { label: 'Cost Index (Highest First)', value: 'cost-desc' },
    { label: 'Name (A to Z)', value: 'name-asc' },
  ];

  const filteredCities = cities
    .filter((city) => {
      const matchesQuery =
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion =
        selectedRegion === 'ALL' || ((city as any).region || 'Global') === selectedRegion;
      return matchesQuery && matchesRegion;
    })
    .sort((a, b) => {
      if (selectedSort === 'popularity-desc') return (b.popularity || 80) - (a.popularity || 80);
      if (selectedSort === 'cost-asc') return a.costIndex - b.costIndex;
      if (selectedSort === 'cost-desc') return b.costIndex - a.costIndex;
      if (selectedSort === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Building2 className="w-8 h-8 text-coral" /> Global Destinations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore curated world cities, compare local cost indices, and add destinations directly into your trips.
          </p>
        </div>
        <Link
          href="/trips/new"
          className="self-start md:self-auto px-5 py-2.5 bg-coral hover:bg-coral-dark text-white rounded-2xl text-xs font-bold shadow-md shadow-coral/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Plan Custom Trip
        </Link>
      </div>

      {/* Shared SearchFilterBar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search destinations by city or country (e.g. Tokyo, France, Bali)..."
        filterOptions={regionOptions}
        selectedFilter={selectedRegion}
        onFilterChange={setSelectedRegion}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        totalResults={filteredCities.length}
      />

      {/* Cities Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-coral" />
          <p className="text-xs text-slate-400">Loading destinations...</p>
        </div>
      ) : filteredCities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-soft">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No destinations found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or region filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => {
            const isSaved = savedCityIds.has(city.id);
            return (
              <div
                key={city.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    <button
                      onClick={() => toggleSaveCity(city.id)}
                      aria-label="Save City"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors shadow-sm"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-900/75 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                      {(city as any).region || 'Global'}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{city.name}</h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm">
                          ★ {city.popularity}/100
                        </span>
                      </div>
                      <p className="text-xs text-slate-200">{city.country}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {city.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="text-slate-600">
                        Cost Rating:{' '}
                        <span className="font-bold text-teal-700">
                          {city.costIndex <= 0.8
                            ? '$ (Budget-Friendly)'
                            : city.costIndex <= 1.2
                            ? '$$ (Moderate)'
                            : '$$$ (Premium)'}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {city.costIndex}x base
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-slate-100 mt-2">
                  <button
                    onClick={() => openAddToTripModal(city)}
                    className="py-2.5 px-3 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add to Trip
                  </button>
                  <Link
                    href={`/trips/new?city=${encodeURIComponent(city.name)}`}
                    className="py-2.5 px-3 bg-coral hover:bg-coral-dark text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    Plan Trip <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add To Trip Modal */}
      {selectedCityForTrip && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Add {selectedCityForTrip.name} to Itinerary
                </h3>
                <p className="text-xs text-slate-500">Choose which trip to include this stop in</p>
              </div>
              <button
                onClick={() => setSelectedCityForTrip(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addSuccessMsg ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold">{addSuccessMsg}</span>
              </div>
            ) : trips.length === 0 ? (
              <div className="text-center py-4 space-y-3">
                <p className="text-xs text-slate-600">
                  You don't have any existing trips yet. Create one first!
                </p>
                <Link
                  href={`/trips/new?city=${encodeURIComponent(selectedCityForTrip.name)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-xs font-bold shadow-md shadow-coral/20"
                >
                  Create Trip for {selectedCityForTrip.name}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleAddStopToTrip} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Trip</label>
                  <select
                    value={targetTripId}
                    onChange={(e) => setTargetTripId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-coral/40"
                    required
                  >
                    {trips.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({new Date(t.startDate).toLocaleDateString()} - {new Date(t.endDate).toLocaleDateString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Arrival Date</label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-coral/40"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Departure Date</label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-coral/40"
                      required
                    />
                  </div>
                </div>

                {addErrorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-600">
                    {addErrorMsg}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCityForTrip(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addingStop}
                    className="px-5 py-2.5 bg-coral hover:bg-coral-dark text-white rounded-xl text-xs font-bold shadow-md shadow-coral/20 flex items-center gap-2 disabled:opacity-50"
                  >
                    {addingStop ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Add'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
