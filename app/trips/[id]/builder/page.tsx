'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
      <div className="py-24 text-center flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-charcoal" />
        <span className="text-xs font-normal text-muted">Loading itinerary builder...</span>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-3">
        <h2 className="text-lg font-semibold text-charcoal">Trip not found</h2>
        <Link href="/trips" className="inline-block text-xs font-normal text-charcoal underline">
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
      <div className="relative rounded-card overflow-hidden border border-light-cream bg-cream">
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/trips"
              className="inline-flex items-center gap-1 text-xs font-normal text-muted hover:text-charcoal transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Trips
            </Link>

            <div className="flex items-center gap-2">
              {saveStatus && (
                <span className="px-2.5 py-0.5 bg-charcoal text-off-white text-xs font-normal rounded shadow-inset-btn flex items-center gap-1">
                  <Check className="w-3 h-3" /> {saveStatus}
                </span>
              )}
              {trip.isPublic && (
                <Link
                  href={`/share/${trip.shareSlug}`}
                  target="_blank"
                  className="px-3 py-1.5 bg-transparent text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded text-xs font-normal flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" /> Public Link
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-tight">{trip.name}</h1>
              {trip.isPublic ? (
                <span className="bg-charcoal text-off-white text-[10px] font-normal px-2 py-0.5 rounded shadow-inset-btn flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Public
                </span>
              ) : (
                <span className="bg-charcoal-3 text-muted text-[10px] font-normal px-2 py-0.5 rounded flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Private
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-muted flex-wrap font-normal">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 opacity-70" />
                {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
              </span>
              <span>•</span>
              <span>{stops.length} Stops</span>
              <span>•</span>
              <span className="text-charcoal font-semibold">
                Est. Total: ${totalCost.toFixed(2)}
              </span>
              {trip.budgetLimit && (
                <span className="text-muted">
                  (Target limit: ${trip.budgetLimit})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Tabs Submenu */}
        <div className="flex border-t border-light-cream px-4 sm:px-6 bg-cream overflow-x-auto">
          <Link
            href={`/trips/${trip.id}/builder`}
            className="py-2.5 px-4 text-xs font-semibold text-charcoal border-b-2 border-charcoal flex items-center gap-1.5 shrink-0"
          >
            <Sliders className="w-3.5 h-3.5" /> Itinerary Builder
          </Link>
          <Link
            href={`/trips/${trip.id}/view`}
            className="py-2.5 px-4 text-xs font-normal text-muted hover:text-charcoal border-b-2 border-transparent flex items-center gap-1.5 shrink-0"
          >
            <Eye className="w-3.5 h-3.5" /> Structured View
          </Link>
          <Link
            href={`/trips/${trip.id}/budget`}
            className="py-2.5 px-4 text-xs font-normal text-muted hover:text-charcoal border-b-2 border-transparent flex items-center gap-1.5 shrink-0"
          >
            <PieChart className="w-3.5 h-3.5" /> Budget & Charts
          </Link>
          <Link
            href={`/trips/${trip.id}/calendar`}
            className="py-2.5 px-4 text-xs font-normal text-muted hover:text-charcoal border-b-2 border-transparent flex items-center gap-1.5 shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" /> Timeline & Calendar
          </Link>
        </div>
      </div>

      {/* Builder Main Area */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-semibold text-charcoal tracking-tight">Destination Stops & Timeline</h2>
            <p className="text-xs text-muted font-normal">
              Drag stops to reorder. Add custom activities and budget items to each stop.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCityModalOpen(true)}
            className="px-4 py-2 bg-charcoal text-off-white text-xs font-normal rounded shadow-inset-btn flex items-center gap-1.5 active:opacity-80 transition-opacity shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Destination Stop
          </button>
        </div>

        {/* Sortable DND Container */}
        {stops.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-light-cream rounded-card bg-cream space-y-3">
            <div className="w-12 h-12 rounded bg-charcoal text-off-white flex items-center justify-center mx-auto shadow-inset-btn">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-charcoal">No stops in this itinerary yet</h3>
              <p className="text-xs text-muted max-w-sm mx-auto mt-0.5">
                Add your first city stop to begin crafting your day-by-day travel plan.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-charcoal text-off-white text-xs font-normal rounded shadow-inset-btn active:opacity-80"
            >
              <Plus className="w-3.5 h-3.5" /> Add First Stop
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
        onClose={() => setDeleteStopId(null)}
      />
    </div>
  );
}
