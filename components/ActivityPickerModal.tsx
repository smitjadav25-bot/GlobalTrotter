'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Search,
  DollarSign,
  Clock,
  Calendar,
  Sparkles,
  Camera,
  Utensils,
  Compass,
  Smile,
  Tag,
  Loader2,
} from 'lucide-react';
import { ActivityDTO } from '@/lib/types';
import ImageUploader from './ImageUploader';

interface ActivityPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (data: {
    name: string;
    type: string;
    cost: number;
    durationMinutes: number;
    description?: string;
    imageUrl?: string;
    scheduledDate?: string;
    scheduledTime?: string;
  }) => Promise<void>;
  cityName: string;
  cityId: string;
  defaultDate?: string;
}

const CATEGORIES = [
  { id: 'SIGHTSEEING', label: 'Sightseeing', icon: Camera, color: 'text-sky-600 bg-sky-50 border-sky-200' },
  { id: 'FOOD', label: 'Food & Dining', icon: Utensils, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'ADVENTURE', label: 'Adventure', icon: Compass, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'RELAXATION', label: 'Relaxation', icon: Smile, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { id: 'OTHER', label: 'Other', icon: Tag, color: 'text-slate-600 bg-slate-50 border-slate-200' },
];

export default function ActivityPickerModal({
  isOpen,
  onClose,
  onAddActivity,
  cityName,
  cityId,
  defaultDate,
}: ActivityPickerModalProps) {
  const [tab, setTab] = useState<'presets' | 'custom'>('presets');
  const [presetActivities, setPresetActivities] = useState<ActivityDTO[]>([]);
  const [loadingPresets, setLoadingPresets] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Custom activity form state
  const [name, setName] = useState('');
  const [type, setType] = useState('SIGHTSEEING');
  const [cost, setCost] = useState<number>(25);
  const [durationMinutes, setDurationMinutes] = useState<number>(120);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scheduledDate, setScheduledDate] = useState(defaultDate || '');
  const [scheduledTime, setScheduledTime] = useState('10:00');

  useEffect(() => {
    if (isOpen) {
      setLoadingPresets(true);
      fetch(`/api/activities/search?cityId=${cityId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.activities && data.activities.length > 0) {
            setPresetActivities(data.activities);
          } else {
            // Fetch global popular activities if none for this city
            fetch('/api/activities/search')
              .then((r) => r.json())
              .then((d) => setPresetActivities(d.activities || []));
          }
        })
        .finally(() => setLoadingPresets(false));
    }
  }, [isOpen, cityId]);

  useEffect(() => {
    if (defaultDate) setScheduledDate(defaultDate);
  }, [defaultDate]);

  if (!isOpen) return null;

  const handleSelectPreset = async (preset: ActivityDTO) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onAddActivity({
        name: preset.name,
        type: preset.type,
        cost: preset.cost,
        durationMinutes: preset.durationMinutes,
        description: preset.description || undefined,
        imageUrl: preset.imageUrl || undefined,
        scheduledDate: scheduledDate || defaultDate || undefined,
        scheduledTime: scheduledTime || '10:00',
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add activity');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter an activity title.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onAddActivity({
        name,
        type,
        cost: Number(cost) || 0,
        durationMinutes: Number(durationMinutes) || 60,
        description: description || undefined,
        imageUrl: imageUrl || undefined,
        scheduledDate: scheduledDate || undefined,
        scheduledTime: scheduledTime || undefined,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create activity');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-coral" /> Add Activity for {cityName}
            </h3>
            <p className="text-xs text-slate-500">Pick from curated experiences or create a custom plan</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/30">
          <button
            type="button"
            onClick={() => setTab('presets')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-all ${
              tab === 'presets'
                ? 'border-coral text-coral'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Recommended Experiences ({presetActivities.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('custom')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-all ${
              tab === 'custom'
                ? 'border-coral text-coral'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Custom Activity
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'presets' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {loadingPresets ? (
                <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-coral" />
                  <span className="text-xs">Loading experiences...</span>
                </div>
              ) : presetActivities.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  No preset activities found. Switch to "Custom Activity" to design your own!
                </div>
              ) : (
                <div className="space-y-3">
                  {presetActivities.map((preset) => (
                    <div
                      key={preset.id}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200/80 hover:border-coral/40 hover:bg-coral-50/20 transition-all group"
                    >
                      {preset.imageUrl ? (
                        <img
                          src={preset.imageUrl}
                          alt={preset.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                          <Tag className="w-6 h-6" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
                            {preset.type}
                          </span>
                          <span className="text-xs font-bold text-teal-700 flex items-center">
                            ${preset.cost}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-0.5">
                            <Clock className="w-3 h-3" /> {preset.durationMinutes}m
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 truncate mt-0.5">{preset.name}</h4>
                        {preset.description && (
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{preset.description}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleSelectPreset(preset)}
                        className="px-3 py-1.5 bg-coral hover:bg-coral-dark text-white rounded-xl text-xs font-semibold shrink-0 shadow-sm flex items-center gap-1 group-hover:scale-105 transition-transform"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Activity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sushi Making Class, Morning Surfing, Sunset Hike..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-coral/40"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = type === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setType(cat.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                          isSelected
                            ? 'border-coral bg-coral-50 text-coral'
                            : 'border-slate-200/80 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cost & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-teal-600" /> Estimated Cost ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={cost}
                    onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="15"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 60)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-coral" /> Scheduled Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time (e.g. 14:00)</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Description</label>
                <textarea
                  rows={2}
                  placeholder="Location tips, reservation numbers, tickets..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm resize-none"
                />
              </div>

              <ImageUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="Activity Photo (Optional)"
              />

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
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-coral hover:bg-coral-dark text-white rounded-xl text-sm font-semibold shadow-md shadow-coral/20 flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Create Activity
                </button>
              </div>
            </form>
          )}

          {error && <p className="text-xs font-semibold text-rose-600 mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}
