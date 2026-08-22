'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Calendar,
  DollarSign,
  Globe,
  Lock,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '@/components/ImageUploader';

const tripSchema = z.object({
  name: z.string().min(2, 'Trip name must be at least 2 characters'),
  description: z.string().optional(),
  startDate: z.string().min(1, 'Please choose a start date'),
  endDate: z.string().min(1, 'Please choose an end date'),
  budgetLimit: z.preprocess((val) => (val === '' || val === undefined ? null : Number(val)), z.number().nullable().optional()),
  isPublic: z.boolean().default(false),
  coverPhotoUrl: z.string().optional(),
});

type TripFormData = z.infer<typeof tripSchema>;

function NewTripForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCity = searchParams?.get('city') || '';

  const [coverPhoto, setCoverPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      name: initialCity ? `Grand Adventure to ${initialCity}` : '',
      description: initialCity ? `Exploring the sights, cuisine, and culture of ${initialCity}.` : '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      budgetLimit: 2000,
      isPublic: true,
      coverPhotoUrl: coverPhoto,
    },
  });

  const isPublicValue = watch('isPublic');

  const onSubmit = async (data: TripFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          coverPhotoUrl: coverPhoto,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to create trip');
      }

      router.push(`/trips/${json.trip.id}/builder`);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'An error occurred while creating your trip.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-cream rounded-card p-6 sm:p-8 border border-light-cream space-y-5"
    >
      {/* Trip Name */}
      <div>
        <label className="block text-xs font-normal text-charcoal mb-1">
          Trip Name <span className="text-charcoal">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. European Circuit, Japan Sakura Expedition..."
          {...register('name')}
          className={`w-full px-3 py-2 bg-cream text-charcoal border rounded text-xs placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring-blue ${
            errors.name ? 'border-charcoal-40' : 'border-light-cream'
          }`}
        />
        {errors.name && (
          <p className="text-[11px] font-normal text-charcoal mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 opacity-70" /> Start Date
          </label>
          <input
            type="date"
            {...register('startDate')}
            className={`w-full px-3 py-2 bg-cream text-charcoal border rounded text-xs focus:ring-2 focus:ring-ring-blue ${
              errors.startDate ? 'border-charcoal-40' : 'border-light-cream'
            }`}
          />
          {errors.startDate && (
            <p className="text-[11px] font-normal text-charcoal mt-1">{errors.startDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 opacity-70" /> End Date
          </label>
          <input
            type="date"
            {...register('endDate')}
            className={`w-full px-3 py-2 bg-cream text-charcoal border rounded text-xs focus:ring-2 focus:ring-ring-blue ${
              errors.endDate ? 'border-charcoal-40' : 'border-light-cream'
            }`}
          />
          {errors.endDate && (
            <p className="text-[11px] font-normal text-charcoal mt-1">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Budget Limit */}
      <div>
        <label className="block text-xs font-normal text-charcoal mb-1 flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 opacity-70" /> Target Budget Limit ($ Optional)
        </label>
        <input
          type="number"
          min="0"
          step="50"
          placeholder="e.g. 2500"
          {...register('budgetLimit')}
          className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
        />
        <p className="text-[11px] text-muted mt-1">
          GlobeTrotter monitors activity costs against this limit.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-normal text-charcoal mb-1">
          Description / Overview (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Notes on travel companions, packing, goals..."
          {...register('description')}
          className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue resize-none"
        />
      </div>

      {/* Cover Photo Uploader */}
      <ImageUploader
        value={coverPhoto}
        onChange={(url) => {
          setCoverPhoto(url);
          setValue('coverPhotoUrl', url);
        }}
        label="Trip Cover Photo"
      />

      {/* Public Sharing Toggle */}
      <div className="p-3 bg-charcoal-3 border border-light-cream rounded flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-cream border border-light-cream flex items-center justify-center text-charcoal">
            {isPublicValue ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-muted" />}
          </div>
          <div>
            <div className="text-xs font-semibold text-charcoal">
              {isPublicValue ? 'Public Itinerary' : 'Private Itinerary'}
            </div>
            <div className="text-[11px] text-muted">
              {isPublicValue
                ? 'Anyone with your share link can view this itinerary.'
                : 'Only you can view this itinerary.'}
            </div>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            {...register('isPublic')}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-light-cream rounded-pill peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-cream after:border after:border-light-cream after:rounded-pill after:h-4 after:w-4 after:transition-all peer-checked:bg-charcoal"></div>
        </label>
      </div>

      {submitError && (
        <div className="p-2.5 bg-charcoal-4 border border-charcoal-40 rounded text-xs font-normal text-charcoal">
          {submitError}
        </div>
      )}

      {/* Submit */}
      <div className="pt-3 flex items-center justify-end gap-2 border-t border-light-cream">
        <Link
          href="/trips"
          className="px-3.5 py-2 text-xs font-normal text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving Trip...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" /> Save & Build Itinerary
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function NewTripPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-5">
        <Link
          href="/trips"
          className="inline-flex items-center gap-1 text-xs font-normal text-muted hover:text-charcoal mb-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Trips
        </Link>
        <h1 className="text-2xl font-semibold text-charcoal tracking-tight">Create New Trip</h1>
        <p className="text-xs text-muted font-normal mt-0.5">
          Set up your multi-city adventure and start adding destinations and experiences.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="py-20 text-center flex flex-col items-center justify-center gap-2 bg-cream rounded-card border border-light-cream">
            <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
            <span className="text-xs text-muted">Loading form...</span>
          </div>
        }
      >
        <NewTripForm />
      </Suspense>
    </div>
  );
}
