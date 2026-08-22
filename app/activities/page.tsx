'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Clock,
  MapPin,
  Plus,
  CheckCircle2,
  Loader2,
  Camera,
  Utensils,
  Mountain,
  Palmtree,
  X,
} from 'lucide-react';
import SearchFilterBar from '@/components/SearchFilterBar';
import { Trip } from '@/lib/types';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedCostTier, setSelectedCostTier] = useState('ALL');
  const [selectedSort, setSelectedSort] = useState('cost-asc');

  // Add to Trip Modal State
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [targetTripId, setTargetTripId] = useState<string>('');
  const [targetStopId, setTargetStopId] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [scheduledTime, setScheduledTime] = useState<string>('10:00');
  const [addingActivity, setAddingActivity] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState<string | null>(null);
  const [addErrorMsg, setAddErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [actRes, tripsRes] = await Promise.all([
          fetch('/api/activities/search'),
          fetch('/api/trips'),
        ]);

        const actData = await actRes.json();
        const tripsData = await tripsRes.json();

        if (actData.activities) setActivities(actData.activities);
        if (tripsData.trips) {
          setTrips(tripsData.trips);
          if (tripsData.trips.length > 0) {
            setTargetTripId(tripsData.trips[0].id);
            if (tripsData.trips[0].stops && tripsData.trips[0].stops.length > 0) {
              setTargetStopId(tripsData.trips[0].stops[0].id);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const openAddToTripModal = (act: any) => {
    setSelectedActivity(act);
    setScheduledDate(new Date().toISOString().split('T')[0]);
    setScheduledTime('10:00');
    setAddSuccessMsg(null);
    setAddErrorMsg(null);
  };

  const handleTripSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tId = e.target.value;
    setTargetTripId(tId);
    const chosenTrip = trips.find((t) => t.id === tId);
    if (chosenTrip?.stops && chosenTrip.stops.length > 0) {
      setTargetStopId(chosenTrip.stops[0].id);
    } else {
      setTargetStopId('');
    }
  };

  const handleAddActivityToStop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity || !targetStopId) return;

    try {
      setAddingActivity(true);
      setAddErrorMsg(null);

      const res = await fetch(`/api/stops/${targetStopId}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedActivity.name,
          type: selectedActivity.type,
          cost: selectedActivity.cost,
          durationMinutes: selectedActivity.durationMinutes,
          description: selectedActivity.description,
          scheduledDate,
          scheduledTime,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to add activity to trip');

      setAddSuccessMsg(`Added "${selectedActivity.name}" to your itinerary!`);
      setTimeout(() => {
        setSelectedActivity(null);
      }, 1500);
    } catch (err: any) {
      setAddErrorMsg(err.message || 'Failed to add activity.');
    } finally {
      setAddingActivity(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'SIGHTSEEING':
        return <Camera className="w-3.5 h-3.5 text-charcoal opacity-70" />;
      case 'FOOD':
        return <Utensils className="w-3.5 h-3.5 text-charcoal opacity-70" />;
      case 'ADVENTURE':
        return <Mountain className="w-3.5 h-3.5 text-charcoal opacity-70" />;
      case 'RELAXATION':
        return <Palmtree className="w-3.5 h-3.5 text-charcoal opacity-70" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-charcoal opacity-70" />;
    }
  };

  const typeOptions = [
    { label: 'All Experience Types', value: 'ALL' },
    { label: 'Sightseeing & Culture', value: 'SIGHTSEEING' },
    { label: 'Food & Culinary', value: 'FOOD' },
    { label: 'Adventure & Outdoors', value: 'ADVENTURE' },
    { label: 'Relaxation & Wellness', value: 'RELAXATION' },
  ];

  const costOptions = [
    { label: 'All Price Ranges', value: 'ALL' },
    { label: 'Free ($0)', value: 'FREE' },
    { label: 'Under $30', value: 'UNDER_30' },
    { label: 'Under $60', value: 'UNDER_60' },
    { label: '$60 and Above', value: 'ABOVE_60' },
  ];

  const sortOptions = [
    { label: 'Price: Low to High', value: 'cost-asc' },
    { label: 'Price: High to Low', value: 'cost-desc' },
    { label: 'Duration: Short to Long', value: 'duration-asc' },
    { label: 'Name: A to Z', value: 'name-asc' },
  ];

  const filteredActivities = activities
    .filter((act) => {
      const matchesSearch =
        act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (act.description && act.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (act.city && act.city.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (act.stop?.city && act.stop.city.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === 'ALL' || act.type === selectedType;

      let matchesCost = true;
      if (selectedCostTier === 'FREE') matchesCost = act.cost === 0;
      else if (selectedCostTier === 'UNDER_30') matchesCost = act.cost <= 30;
      else if (selectedCostTier === 'UNDER_60') matchesCost = act.cost <= 60;
      else if (selectedCostTier === 'ABOVE_60') matchesCost = act.cost >= 60;

      return matchesSearch && matchesType && matchesCost;
    })
    .sort((a, b) => {
      if (selectedSort === 'cost-asc') return a.cost - b.cost;
      if (selectedSort === 'cost-desc') return b.cost - a.cost;
      if (selectedSort === 'duration-asc') return a.durationMinutes - b.durationMinutes;
      if (selectedSort === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

  const selectedTripObject = trips.find((t) => t.id === targetTripId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 opacity-80" /> Experience Catalog
          </h1>
          <p className="text-xs text-muted font-normal mt-1">
            Discover culinary tastings, sightseeing tours, and wellness activities worldwide.
          </p>
        </div>
      </div>

      {/* SearchFilterBar */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search experiences by keyword or city..."
        filterOptions={typeOptions}
        selectedFilter={selectedType}
        onFilterChange={setSelectedType}
        secondaryFilterOptions={costOptions}
        selectedSecondaryFilter={selectedCostTier}
        onSecondaryFilterChange={setSelectedCostTier}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        totalResults={filteredActivities.length}
      />

      {/* Activities Grid */}
      {loading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
          <p className="text-xs text-muted">Loading experiences...</p>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="bg-cream rounded-card p-12 text-center border border-light-cream">
          <Sparkles className="w-8 h-8 text-muted mx-auto mb-2 opacity-50" />
          <h3 className="text-sm font-semibold text-charcoal">No experiences match your filters</h3>
          <p className="text-xs text-muted mt-0.5">Try broadening your search term or cost filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((act) => {
            const cityName = act.city?.name || act.stop?.city?.name || 'Global Destination';
            return (
              <div
                key={act.id}
                className="bg-cream rounded-card border border-light-cream p-4 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded bg-charcoal-4 flex items-center justify-center">
                        {getActivityIcon(act.type)}
                      </div>
                      <span className="text-[10px] font-normal text-muted uppercase tracking-wider">
                        {act.type}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-charcoal text-off-white text-[11px] font-normal shadow-inset-btn">
                      {act.cost === 0 ? 'FREE' : `$${act.cost}`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-charcoal leading-snug">
                      {act.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-muted mt-0.5">
                      <MapPin className="w-3 h-3 opacity-70" />
                      {cityName}
                    </div>
                  </div>

                  {act.description && (
                    <p className="text-xs text-muted font-normal line-clamp-2 leading-relaxed">
                      {act.description}
                    </p>
                  )}
                </div>

                <div className="pt-2.5 border-t border-light-cream flex items-center justify-between text-xs text-muted font-normal">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 opacity-70" />
                    {act.durationMinutes} min
                  </div>
                  <button
                    onClick={() => openAddToTripModal(act)}
                    className="px-3 py-1.5 bg-transparent text-charcoal border border-charcoal-40 rounded text-xs font-normal hover:bg-charcoal-4 flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add to Trip
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Experience to Trip Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-charcoal-40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-cream rounded-card p-6 max-w-md w-full border border-light-cream space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-charcoal">Add to Itinerary</h3>
                <p className="text-xs text-muted font-normal truncate max-w-xs">{selectedActivity.name}</p>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
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
                <p className="text-xs text-muted font-normal">You need a trip with at least one stop first.</p>
                <Link
                  href="/trips/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal"
                >
                  Create Trip First
                </Link>
              </div>
            ) : (
              <form onSubmit={handleAddActivityToStop} className="space-y-3">
                <div>
                  <label className="block text-xs font-normal text-charcoal mb-1">Select Trip</label>
                  <select
                    value={targetTripId}
                    onChange={handleTripSelectChange}
                    className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs font-normal focus:ring-2 focus:ring-ring-blue"
                    required
                  >
                    {trips.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-normal text-charcoal mb-1">Select City Stop</label>
                  {selectedTripObject?.stops && selectedTripObject.stops.length > 0 ? (
                    <select
                      value={targetStopId}
                      onChange={(e) => setTargetStopId(e.target.value)}
                      className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs font-normal focus:ring-2 focus:ring-ring-blue"
                      required
                    >
                      {selectedTripObject.stops.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.city.name} ({new Date(s.arrivalDate).toLocaleDateString()} - {new Date(s.departureDate).toLocaleDateString()})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-2.5 bg-charcoal-4 border border-charcoal-40 rounded text-xs text-charcoal font-normal">
                      This trip doesn't have any stops yet. Please add a stop in Builder first.
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-normal text-charcoal mb-1">Scheduled Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-charcoal mb-1">Scheduled Time</label>
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
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
                    onClick={() => setSelectedActivity(null)}
                    className="px-3 py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 rounded hover:bg-charcoal-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addingActivity || !targetStopId}
                    className="px-4 py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80 disabled:opacity-50"
                  >
                    {addingActivity ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Confirm Add'}
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
