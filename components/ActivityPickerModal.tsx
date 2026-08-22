'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
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
  { id: 'SIGHTSEEING', label: 'Sightseeing', icon: Camera },
  { id: 'FOOD', label: 'Food & Dining', icon: Utensils },
  { id: 'ADVENTURE', label: 'Adventure', icon: Compass },
  { id: 'RELAXATION', label: 'Relaxation', icon: Smile },
  { id: 'OTHER', label: 'Other', icon: Tag },
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
    <div className="fixed inset-0 z-50 bg-charcoal-40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-cream rounded-card max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-light-cream">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-light-cream flex items-center justify-between bg-cream">
          <div>
            <h3 className="text-base font-semibold text-charcoal flex items-center gap-2">
              <Sparkles className="w-4 h-4 opacity-80" /> Add Activity for {cityName}
            </h3>
            <p className="text-xs text-muted font-normal">Pick from curated experiences or create a custom plan</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded text-muted hover:text-charcoal">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-light-cream px-6 bg-cream">
          <button
            type="button"
            onClick={() => setTab('presets')}
            className={`py-2.5 px-3 text-xs font-normal border-b-2 transition-colors ${
              tab === 'presets'
                ? 'border-charcoal text-charcoal font-semibold'
                : 'border-transparent text-muted hover:text-charcoal'
            }`}
          >
            Recommended ({presetActivities.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('custom')}
            className={`py-2.5 px-3 text-xs font-normal border-b-2 transition-colors ${
              tab === 'custom'
                ? 'border-charcoal text-charcoal font-semibold'
                : 'border-transparent text-muted hover:text-charcoal'
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
                  <label className="block text-xs font-normal text-charcoal mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-charcoal mb-1">Time Slot</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                  />
                </div>
              </div>

              {loadingPresets ? (
                <div className="py-12 text-center text-muted flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
                  <span className="text-xs">Loading experiences...</span>
                </div>
              ) : presetActivities.length === 0 ? (
                <div className="py-12 text-center text-muted text-xs">
                  No preset activities found. Switch to "Custom Activity" to design your own.
                </div>
              ) : (
                <div className="space-y-2">
                  {presetActivities.map((preset) => (
                    <div
                      key={preset.id}
                      className="flex items-center gap-3 p-2.5 rounded bg-charcoal-3 border border-light-cream group"
                    >
                      {preset.imageUrl ? (
                        <img
                          src={preset.imageUrl}
                          alt={preset.name}
                          className="w-12 h-12 rounded object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded bg-cream border border-light-cream flex items-center justify-center text-muted shrink-0">
                          <Tag className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-normal text-muted">
                            {preset.type}
                          </span>
                          <span className="text-xs font-semibold text-charcoal">
                            ${preset.cost}
                          </span>
                          <span className="text-[11px] text-muted flex items-center gap-0.5">
                            <Clock className="w-3 h-3 opacity-70" /> {preset.durationMinutes}m
                          </span>
                        </div>
                        <h4 className="font-semibold text-xs text-charcoal truncate mt-0.5">{preset.name}</h4>
                        {preset.description && (
                          <p className="text-[11px] text-muted line-clamp-1 mt-0.5">{preset.description}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleSelectPreset(preset)}
                        className="px-3 py-1 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal shrink-0 flex items-center gap-1 active:opacity-80 transition-opacity"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-normal text-charcoal mb-1">Activity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sushi Making Class, Morning Surfing, Sunset Hike..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-normal text-charcoal mb-1">Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = type === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setType(cat.id)}
                        className={`flex items-center gap-1.5 p-2 rounded text-xs font-normal border transition-colors ${
                          isSelected
                            ? 'bg-charcoal text-off-white border-charcoal shadow-inset-btn'
                            : 'bg-cream text-charcoal border-light-cream hover:bg-charcoal-4'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cost & Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 opacity-70" /> Estimated Cost ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={cost}
                    onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 opacity-70" /> Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="15"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 60)}
                    className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 opacity-70" /> Scheduled Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-normal text-charcoal mb-1">Time Slot</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-normal text-charcoal mb-1">Notes / Description</label>
                <textarea
                  rows={2}
                  placeholder="Location tips, reservation numbers, tickets..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs resize-none"
                />
              </div>

              <ImageUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="Activity Photo (Optional)"
              />

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-light-cream">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  Create Activity
                </button>
              </div>
            </form>
          )}

          {error && <p className="text-xs text-charcoal mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
