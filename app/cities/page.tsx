'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Heart,
  Plus,
  ArrowRight,
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
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2.5">
            <Building2 className="w-6 h-6 opacity-80" /> India Destinations
          </h1>
          <p className="text-xs text-muted font-normal mt-1">
            Explore curated cities across North, South, West, East, and Himalayan India, compare local cost indices, and add stops into your trips.
          </p>
        </div>
        <Link
          href="/trips/new"
          className="self-start md:self-auto px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-2 active:opacity-80 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" /> Plan Custom Trip
        </Link>
      </div>

      {/* SearchFilterBar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search destinations by city or country..."
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
          <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
          <p className="text-xs text-muted">Loading destinations...</p>
        </div>
      ) : filteredCities.length === 0 ? (
        <div className="bg-cream rounded-card p-12 text-center border border-light-cream">
          <Building2 className="w-8 h-8 text-muted mx-auto mb-2 opacity-50" />
          <h3 className="text-sm font-semibold text-charcoal">No destinations found</h3>
          <p className="text-xs text-muted mt-0.5">Try adjusting your search query or region filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => {
            const isSaved = savedCityIds.has(city.id);
            return (
              <div
                key={city.id}
                className="bg-cream rounded-card border border-light-cream overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream border-b border-light-cream">
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleSaveCity(city.id)}
                      aria-label="Save City"
                      className="absolute top-3 right-3 p-1.5 rounded-pill bg-cream border border-light-cream text-charcoal shadow-inset-btn opacity-80 active:opacity-100"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-charcoal text-charcoal' : ''}`} />
                    </button>

                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-cream border border-light-cream text-[10px] font-normal text-charcoal">
                      {(city as any).region || 'Global'}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow-sm">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">{city.name}</h3>
                        <span className="text-xs font-normal">
                          ★ {city.popularity}/100
                        </span>
                      </div>
                      <p className="text-xs text-slate-200">{city.country}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-muted font-normal line-clamp-3 leading-relaxed">
                      {city.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-light-cream text-xs text-muted font-normal">
                      <span>Cost Index: {city.costIndex}x base</span>
                      <span>
                        {city.costIndex <= 0.8
                          ? 'Budget'
                          : city.costIndex <= 1.2
                          ? 'Moderate'
                          : 'Premium'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 grid grid-cols-2 gap-2 border-t border-light-cream mt-2">
                  <button
                    onClick={() => openAddToTripModal(city)}
                    className="py-2 px-3 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add to Trip
                  </button>
                  <Link
                    href={`/trips/new?city=${encodeURIComponent(city.name)}`}
                    className="py-2 px-3 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center justify-center gap-1.5 active:opacity-80 transition-opacity"
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
        <div className="fixed inset-0 z-50 bg-charcoal-40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-cream rounded-card p-6 max-w-md w-full border border-light-cream space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-charcoal">
                  Add {selectedCityForTrip.name} to Itinerary
                </h3>
                <p className="text-xs text-muted font-normal">Choose which trip to include this stop in</p>
              </div>
              <button
                onClick={() => setSelectedCityForTrip(null)}
                className="p-1 text-muted hover:text-charcoal rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {addSuccessMsg ? (
              <div className="p-3 bg-charcoal-4 border border-charcoal-40 rounded text-xs font-normal text-charcoal flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{addSuccessMsg}</span>
              </div>
            ) : trips.length === 0 ? (
              <div className="text-center py-4 space-y-3">
                <p className="text-xs text-muted font-normal">
                  You don't have any existing trips yet. Create one first.
                </p>
                <Link
                  href={`/trips/new?city=${encodeURIComponent(selectedCityForTrip.name)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal"
                >
                  Create Trip for {selectedCityForTrip.name}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleAddStopToTrip} className="space-y-3">
                <div>
                  <label className="block text-xs font-normal text-charcoal mb-1">Select Trip</label>
                  <select
                    value={targetTripId}
                    onChange={(e) => setTargetTripId(e.target.value)}
                    className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs font-normal focus:ring-2 focus:ring-ring-blue"
                    required
                  >
                    {trips.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({new Date(t.startDate).toLocaleDateString()} - {new Date(t.endDate).toLocaleDateString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-normal text-charcoal mb-1">Arrival Date</label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-charcoal mb-1">Departure Date</label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                      required
                    />
                  </div>
                </div>

                {addErrorMsg && (
                  <div className="p-2.5 bg-charcoal-4 border border-charcoal-40 rounded text-xs font-normal text-charcoal">
                    {addErrorMsg}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCityForTrip(null)}
                    className="px-3 py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 rounded hover:bg-charcoal-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addingStop}
                    className="px-4 py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80 disabled:opacity-50"
                  >
                    {addingStop ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Confirm Add'}
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
