'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, DollarSign, Star, Calendar, Loader2, Plus } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-coral" /> Add Destination Stop
            </h3>
            <p className="text-xs text-slate-500">Pick a city and set your stay dates</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city name or country (e.g. Tokyo, France, Bali)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral"
            />
          </div>

          {/* Cities Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select City ({cities.length})
            </label>
            {loading ? (
              <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-coral" />
                <span className="text-xs">Loading destinations...</span>
              </div>
            ) : cities.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">
                No cities found matching "{search}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto p-1">
                {cities.map((city) => {
                  const isSelected = selectedCityId === city.id;
                  return (
                    <div
                      key={city.id}
                      onClick={() => {
                        setSelectedCityId(city.id);
                        setError(null);
                      }}
                      className={`relative flex items-center gap-3 p-2.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-coral bg-coral-50/40 shadow-xs'
                          : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={city.imageUrl}
                        alt={city.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-slate-900 truncate">{city.name}</h4>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                            {city.popularity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">{city.country}</p>
                        <div className="text-[11px] font-semibold text-teal-700 mt-0.5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-coral" /> Arrival Date
              </label>
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/40"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-coral" /> Departure Date
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/40"
                required
              />
            </div>
          </div>

          {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}

          {/* Footer actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedCityId}
              className="px-5 py-2 bg-coral hover:bg-coral-dark text-white rounded-xl text-sm font-semibold shadow-md shadow-coral/20 flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add Stop to Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
