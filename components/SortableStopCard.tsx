'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  Clock,
  DollarSign,
  Utensils,
  Camera,
  Compass,
  Smile,
  Tag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { format } from 'date-fns';
import { StopDTO, ActivityDTO } from '@/lib/types';
import ActivityPickerModal from './ActivityPickerModal';

interface SortableStopCardProps {
  stop: StopDTO;
  index: number;
  onDeleteStop: (stopId: string) => Promise<void>;
  onAddActivity: (stopId: string, data: any) => Promise<void>;
  onDeleteActivity: (activityId: string) => Promise<void>;
}

const CATEGORY_ICONS: Record<string, any> = {
  SIGHTSEEING: Camera,
  FOOD: Utensils,
  ADVENTURE: Compass,
  RELAXATION: Smile,
  OTHER: Tag,
};

export default function SortableStopCard({
  stop,
  index,
  onDeleteStop,
  onAddActivity,
  onDeleteActivity,
}: SortableStopCardProps) {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stop.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  const totalStopCost = stop.activities.reduce((sum, a) => sum + (a.cost || 0), 0);

  const arrivalFormatted = stop.arrivalDate
    ? format(new Date(stop.arrivalDate), 'MMM d, yyyy')
    : 'Set date';
  const departureFormatted = stop.departureDate
    ? format(new Date(stop.departureDate), 'MMM d, yyyy')
    : 'Set date';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden ${
        isDragging
          ? 'border-coral shadow-2xl scale-[1.02] opacity-90'
          : 'border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-slate-300'
      }`}
    >
      {/* Stop Card Top Bar */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-slate-50/60 border-b border-slate-100">
        <div className="flex items-center gap-3 min-w-0">
          {/* Drag Handle */}
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg cursor-grab active:cursor-grabbing shrink-0"
            title="Drag to reorder stop"
          >
            <GripVertical className="w-5 h-5" />
          </button>

          {/* City Badge & Photo */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-xs">
            <img
              src={stop.city.imageUrl}
              alt={stop.city.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-md">
              #{index + 1}
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {stop.city.name}
              </h3>
              <span className="text-xs text-slate-500 font-medium truncate">
                {stop.city.country}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80">
                {stop.city.costIndex}x Cost Index
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
              <span className="flex items-center gap-1 font-medium text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-coral" />
                {arrivalFormatted} → {departureFormatted}
              </span>
              <span>•</span>
              <span className="font-semibold text-slate-700">
                {stop.activities.length} activities (${totalStopCost.toFixed(2)})
              </span>
            </div>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onDeleteStop(stop.id)}
            title="Remove stop"
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Activities List */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Planned Activities ({stop.activities.length})
            </h4>
            <button
              type="button"
              onClick={() => setIsActivityModalOpen(true)}
              className="text-xs font-semibold text-coral hover:text-coral-dark hover:bg-coral-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Activity
            </button>
          </div>

          {stop.activities.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <p className="text-xs text-slate-500 mb-2">
                No activities planned yet for {stop.city.name}.
              </p>
              <button
                type="button"
                onClick={() => setIsActivityModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-bold text-coral hover:underline"
              >
                <Plus className="w-3 h-3" /> Add first experience
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {stop.activities.map((act) => {
                const Icon = CATEGORY_ICONS[act.type] || Tag;
                const actDate = act.scheduledDate
                  ? format(new Date(act.scheduledDate), 'MMM d')
                  : null;

                return (
                  <div
                    key={act.id}
                    className="flex items-center justify-between gap-3 p-3 bg-slate-50/70 hover:bg-slate-100/80 rounded-2xl border border-slate-200/60 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-coral shadow-xs shrink-0 border border-slate-200/60">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                            {act.name}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-white border border-slate-200 text-slate-600 uppercase">
                            {act.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5 flex-wrap">
                          {actDate && <span>{actDate}</span>}
                          {act.scheduledTime && <span>at {act.scheduledTime}</span>}
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3 text-slate-400" /> {act.durationMinutes}m
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-200/60">
                        ${act.cost.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteActivity(act.id)}
                        title="Delete activity"
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Activity Picker Modal */}
      <ActivityPickerModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        cityName={stop.city.name}
        cityId={stop.city.id}
        defaultDate={stop.arrivalDate ? format(new Date(stop.arrivalDate), 'yyyy-MM-dd') : undefined}
        onAddActivity={async (data) => {
          await onAddActivity(stop.id, data);
        }}
      />
    </div>
  );
}
