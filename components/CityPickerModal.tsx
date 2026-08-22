'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Star, Calendar, Loader2, Plus } from 'lucide-react';
import { CityDTO } from '@/lib/types';

interface CityPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (cityId: string, arrivalDate: string, departureDate: string) => Promise<void>;
  defaultArrival?: string;
  defaultDeparture?: string;
}

export default function CityPickerModal({
  isOpen,
  onClose,
  onSelectCity,
  defaultArrival,
  defaultDeparture,
}: CityPickerModalProps) {
  const [cities, setCities] = useState<CityDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [arrivalDate, setArrivalDate] = useState(defaultArrival || '');
  const [departureDate, setDepartureDate] = useState(defaultDeparture || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch(`/api/cities?search=${encodeURIComponent(search)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cities) setCities(data.cities);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, search]);

  useEffect(() => {
    if (defaultArrival) setArrivalDate(defaultArrival);
    if (defaultDeparture) setDepartureDate(defaultDeparture);
  }, [defaultArrival, defaultDeparture]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCityId) {
      setError('Please select a destination city.');
      return;
    }
    if (!arrivalDate || !departureDate) {
      setError('Please choose arrival and departure dates.');
      return;
    }
    if (new Date(arrivalDate) > new Date(departureDate)) {
      setError('Departure date must be after arrival date.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSelectCity(selectedCityId, arrivalDate, departureDate);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add stop');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-cream rounded-card max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-light-cream">
        {/* Header */}
        <div className="px-6 py-4 border-b border-light-cream flex items-center justify-between bg-cream">
          <div>
            <h3 className="text-base font-semibold text-charcoal flex items-center gap-2">
              <MapPin className="w-4 h-4 opacity-80" /> Add Destination Stop
            </h3>
            <p className="text-xs text-muted">Pick a city and set your stay dates</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-muted hover:text-charcoal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city name or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring-blue"
            />
          </div>

          {/* Cities Grid */}
          <div>
            <label className="block text-[11px] font-normal uppercase tracking-wider text-muted mb-2">
              Select City ({cities.length})
            </label>
            {loading ? (
              <div className="py-12 text-center text-muted flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
                <span className="text-xs">Loading destinations...</span>
              </div>
            ) : cities.length === 0 ? (
              <div className="py-8 text-center text-muted text-xs">
                No cities found matching "{search}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-0.5">
                {cities.map((city) => {
                  const isSelected = selectedCityId === city.id;
                  return (
                    <div
                      key={city.id}
                      onClick={() => {
                        setSelectedCityId(city.id);
                        setError(null);
                      }}
                      className={`flex items-center gap-2.5 p-2 rounded border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-charcoal text-off-white border-charcoal shadow-inset-btn'
                          : 'bg-cream text-charcoal border-light-cream hover:bg-charcoal-4'
                      }`}
                    >
                      <img
                        src={city.imageUrl}
                        alt={city.name}
                        className="w-12 h-12 rounded object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-xs truncate">{city.name}</h4>
                          <span className="text-[10px] opacity-80 flex items-center gap-0.5">
                            ★ {city.popularity}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-80 truncate">{city.country}</p>
                        <div className="text-[10px] opacity-70 mt-0.5">
                          Cost Index: {city.costIndex}x
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dates Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-light-cream">
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 opacity-70" /> Arrival Date
              </label>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 opacity-70" /> Departure Date
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                required
              />
            </div>
          </div>

          {error && <p className="text-xs text-charcoal">{error}</p>}

          {/* Footer actions */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-light-cream">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedCityId}
              className="px-4 py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              Add Stop to Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
