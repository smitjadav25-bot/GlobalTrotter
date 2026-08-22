'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Plus,
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  PieChart,
  Eye,
  Share2,
  Sliders,
  Sparkles,
  Loader2,
  Check,
  Globe,
  Lock,
} from 'lucide-react';
import { format } from 'date-fns';
import { TripDTO, StopDTO } from '@/lib/types';
import SortableStopCard from '@/components/SortableStopCard';
import CityPickerModal from '@/components/CityPickerModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

export default function ItineraryBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;

  const [trip, setTrip] = useState<TripDTO | null>(null);
  const [stops, setStops] = useState<StopDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [deleteStopId, setDeleteStopId] = useState<string | null>(null);
  const [isDeletingStop, setIsDeletingStop] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchTripDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/trips/${tripId}`);
      const data = await res.json();
      if (data.trip) {
        setTrip(data.trip);
        setStops(data.trip.stops || []);
      }
    } catch (err) {
      console.error('Error loading trip details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTripDetails();
  }, [tripId]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = stops.findIndex((s) => s.id === active.id);
    const newIndex = stops.findIndex((s) => s.id === over.id);

    const reordered = arrayMove(stops, oldIndex, newIndex);
    setStops(reordered);

    // Save reordered indices to backend
    try {
      setSaveStatus('Saving order...');
      const reorderedStopIds = reordered.map((s) => s.id);
      await fetch(`/api/stops/${active.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reorderedStopIds }),
      });
      setSaveStatus('Order saved!');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (err) {
      console.error('Error saving reorder:', err);
      setSaveStatus('Failed to save order');
    }
  };

  const handleAddStop = async (cityId: string, arrivalDate: string, departureDate: string) => {
    const res = await fetch(`/api/trips/${tripId}/stops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityId, arrivalDate, departureDate }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add stop');

    setStops((prev) => [...prev, data.stop]);
  };

  const handleDeleteStopConfirm = async () => {
    if (!deleteStopId) return;
    try {
      setIsDeletingStop(true);
      const res = await fetch(`/api/stops/${deleteStopId}`, { method: 'DELETE' });
      if (res.ok) {
        setStops((prev) => prev.filter((s) => s.id !== deleteStopId));
      }
    } catch (err) {
      console.error('Error deleting stop:', err);
    } finally {
      setIsDeletingStop(false);
      setDeleteStopId(null);
    }
  };

  const handleAddActivity = async (stopId: string, activityData: any) => {
    const res = await fetch(`/api/stops/${stopId}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to add activity');

    setStops((prev) =>
      prev.map((s) => (s.id === stopId ? { ...s, activities: [...s.activities, data.activity] } : s))
    );
  };

  const handleDeleteActivity = async (activityId: string) => {
    try {
      const res = await fetch(`/api/activities/${activityId}`, { method: 'DELETE' });
      if (res.ok) {
        setStops((prev) =>
          prev.map((s) => ({
            ...s,
            activities: s.activities.filter((a) => a.id !== activityId),
          }))
        );
      }
    } catch (err) {
      console.error('Error deleting activity:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
        <span className="text-sm font-semibold text-slate-500">Loading itinerary builder...</span>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Trip not found</h2>
        <Link href="/trips" className="inline-block text-sm font-semibold text-coral hover:underline">
          Return to all trips
        </Link>
      </div>
    );
  }

  const allActivities = stops.flatMap((s) => s.activities);
  const totalCost = allActivities.reduce((sum, a) => sum + (a.cost || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Trip Navigation */}
      <div className="relative rounded-3xl overflow-hidden shadow-soft border border-slate-200/90 bg-white">
        <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-900">
          <img
            src={trip.coverPhotoUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80'}
            alt={trip.name}
            className="w-full h-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <Link
              href="/trips"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Trips
            </Link>

            <div className="flex items-center gap-2">
              {saveStatus && (
                <span className="px-3 py-1 bg-teal-600/90 text-white text-xs font-semibold rounded-lg animate-pulse flex items-center gap-1">
                  <Check className="w-3 h-3" /> {saveStatus}
                </span>
              )}
              <Link
                href={`/share/${trip.shareSlug}`}
                className="px-3 py-1.5 bg-white/90 hover:bg-white text-slate-800 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-coral" /> Public Link
              </Link>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black truncate">{trip.name}</h1>
              {trip.isPublic ? (
                <span className="bg-teal-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Public
                </span>
              ) : (
                <span className="bg-slate-700/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Private
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-200 flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-coral" />
                {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
              </span>
              <span>•</span>
              <span>{stops.length} Stops</span>
              <span>•</span>
              <span className="text-emerald-300 font-bold">
                Total Est: ${totalCost.toFixed(2)}
              </span>
              {trip.budgetLimit && (
                <span className="text-slate-300">
                  (Budget limit: ${trip.budgetLimit})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Tabs Submenu */}
        <div className="flex border-t border-slate-100 px-4 sm:px-6 bg-slate-50/70 overflow-x-auto">
          <Link
            href={`/trips/${trip.id}/builder`}
            className="py-3 px-4 text-xs font-bold text-coral border-b-2 border-coral flex items-center gap-1.5 shrink-0"
          >
            <Sliders className="w-3.5 h-3.5" /> Itinerary Builder
          </Link>
          <Link
            href={`/trips/${trip.id}/view`}
            className="py-3 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 border-b-2 border-transparent flex items-center gap-1.5 shrink-0"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" /> Structured View
          </Link>
          <Link
            href={`/trips/${trip.id}/budget`}
            className="py-3 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 border-b-2 border-transparent flex items-center gap-1.5 shrink-0"
          >
            <PieChart className="w-3.5 h-3.5 text-slate-400" /> Budget & Charts
          </Link>
          <Link
            href={`/trips/${trip.id}/calendar`}
            className="py-3 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 border-b-2 border-transparent flex items-center gap-1.5 shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" /> Timeline & Calendar
          </Link>
        </div>
      </div>

      {/* Builder Main Area */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Destination Stops & Timeline</h2>
            <p className="text-xs text-slate-500">
              Drag stops to reorder. Add custom activities and budget items to each stop.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCityModalOpen(true)}
            className="px-5 py-2.5 bg-coral hover:bg-coral-dark text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-coral/20 flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Destination Stop
          </button>
        </div>

        {/* Sortable DND Container */}
        {stops.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-slate-300 rounded-3xl bg-white space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-coral-50 text-coral flex items-center justify-center mx-auto">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">No stops in this itinerary yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Add your first city stop to begin crafting your day-by-day travel plan.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white text-xs font-bold rounded-xl shadow-md hover:bg-coral-dark"
            >
              <Plus className="w-4 h-4" /> Add First Stop
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={stops.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {stops.map((stop, index) => (
                  <SortableStopCard
                    key={stop.id}
                    stop={stop}
                    index={index}
                    onDeleteStop={async (id) => setDeleteStopId(id)}
                    onAddActivity={handleAddActivity}
                    onDeleteActivity={handleDeleteActivity}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* City Picker Modal */}
      <CityPickerModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        onSelectCity={handleAddStop}
        defaultArrival={trip.startDate ? format(new Date(trip.startDate), 'yyyy-MM-dd') : undefined}
        defaultDeparture={trip.endDate ? format(new Date(trip.endDate), 'yyyy-MM-dd') : undefined}
      />

      {/* Delete Stop Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteStopId}
        title="Remove Destination Stop?"
        message="This will remove this stop and all its planned activities from your trip itinerary."
        isLoading={isDeletingStop}
        onConfirm={handleDeleteStopConfirm}
        onCancel={() => setDeleteStopId(null)}
      />
    </div>
  );
}
