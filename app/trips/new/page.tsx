'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Compass,
  Calendar,
  DollarSign,
  Globe,
  Lock,
  ArrowLeft,
  Loader2,
  Sparkles,
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
      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6"
    >
      {/* Trip Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-1.5">
          Trip Name <span className="text-coral">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. European Summer 2026, Japan Sakura Tour..."
          {...register('name')}
          className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 transition-all ${
            errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
          }`}
        />
        {errors.name && (
          <p className="text-xs font-semibold text-rose-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-coral" /> Start Date
          </label>
          <input
            type="date"
            {...register('startDate')}
            className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 ${
              errors.startDate ? 'border-rose-500' : 'border-slate-200'
            }`}
          />
          {errors.startDate && (
            <p className="text-xs font-semibold text-rose-600 mt-1">{errors.startDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-coral" /> End Date
          </label>
          <input
            type="date"
            {...register('endDate')}
            className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 ${
              errors.endDate ? 'border-rose-500' : 'border-slate-200'
            }`}
          />
          {errors.endDate && (
            <p className="text-xs font-semibold text-rose-600 mt-1">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Budget Limit */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-teal-600" /> Target Budget Limit ($ Optional)
        </label>
        <input
          type="number"
          min="0"
          step="50"
          placeholder="e.g. 2500"
          {...register('budgetLimit')}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/40"
        />
        <p className="text-xs text-slate-400 mt-1">
          GlobeTrotter will monitor your activity costs against this target budget limit.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-1.5">
          Description / Overview (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="What is the goal of this journey? Notes on traveling companions, packing list, goals..."
          {...register('description')}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/40 resize-none"
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
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-xs">
            {isPublicValue ? <Globe className="w-5 h-5" /> : <Lock className="w-5 h-5 text-slate-400" />}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              {isPublicValue ? 'Public Itinerary' : 'Private Itinerary'}
            </div>
            <div className="text-xs text-slate-500">
              {isPublicValue
                ? 'Anyone with your share link can view and clone this itinerary.'
                : 'Only you can view this itinerary when logged into your account.'}
            </div>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            {...register('isPublic')}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-coral"></div>
        </label>
      </div>

      {submitError && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-600">
          {submitError}
        </div>
      )}

      {/* Submit */}
      <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
        <Link
          href="/trips"
          className="px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-coral hover:bg-coral-dark text-white rounded-2xl text-sm font-bold shadow-md shadow-coral/25 hover:shadow-lg hover:shadow-coral/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving Trip...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" /> Save & Build Itinerary
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function NewTripPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link
          href="/trips"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Trips
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create New Trip</h1>
        <p className="text-sm text-slate-500 mt-1">
          Set up your multi-city adventure and start adding destinations and experiences.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="py-20 text-center flex flex-col items-center justify-center gap-2 bg-white rounded-3xl border border-slate-200">
            <Loader2 className="w-6 h-6 animate-spin text-coral" />
            <span className="text-xs text-slate-500">Loading form...</span>
          </div>
        }
      >
        <NewTripForm />
      </Suspense>
    </div>
  );
}
