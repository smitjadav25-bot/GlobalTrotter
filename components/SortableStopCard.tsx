'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Calendar,
  Plus,
  Trash2,
  Clock,
  Utensils,
  Camera,
  Compass,
  Smile,
  Tag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { format } from 'date-fns';
import { StopDTO } from '@/lib/types';
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
      className={`bg-cream rounded-card border transition-all duration-200 overflow-hidden ${
        isDragging
          ? 'border-charcoal opacity-90'
          : 'border-light-cream'
      }`}
    >
      {/* Stop Card Top Bar */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 bg-cream border-b border-light-cream">
        <div className="flex items-center gap-3 min-w-0">
          {/* Drag Handle */}
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="p-1 text-muted hover:text-charcoal rounded cursor-grab active:cursor-grabbing shrink-0"
            title="Drag to reorder stop"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          {/* City Photo */}
          <div className="relative w-10 h-10 rounded overflow-hidden shrink-0 border border-light-cream">
            <img
              src={stop.city.imageUrl}
              alt={stop.city.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 bg-charcoal text-off-white text-[9px] font-normal px-1 py-0.2 rounded-br shadow-inset-btn">
              #{index + 1}
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-charcoal truncate">
                {stop.city.name}
              </h3>
              <span className="text-xs text-muted font-normal truncate">
                {stop.city.country}
              </span>
              <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-charcoal-3 text-muted">
                {stop.city.costIndex}x Cost Index
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted mt-0.5 flex-wrap">
              <span className="flex items-center gap-1 font-normal">
                <Calendar className="w-3 h-3 opacity-70" />
                {arrivalFormatted} → {departureFormatted}
              </span>
              <span>•</span>
              <span className="font-semibold text-charcoal">
                {stop.activities.length} activities (${totalStopCost.toFixed(2)})
              </span>
            </div>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-muted hover:text-charcoal rounded"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => onDeleteStop(stop.id)}
            title="Remove stop"
            className="p-1.5 text-muted hover:text-charcoal rounded"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Activities List */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-normal uppercase tracking-wider text-muted">
              Planned Activities ({stop.activities.length})
            </h4>
            <button
              type="button"
              onClick={() => setIsActivityModalOpen(true)}
              className="text-xs font-normal text-charcoal underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Activity
            </button>
          </div>

          {stop.activities.length === 0 ? (
            <div className="p-4 text-center border border-dashed border-light-cream rounded bg-charcoal-3">
              <p className="text-xs text-muted mb-1">
                No activities planned yet for {stop.city.name}.
              </p>
              <button
                type="button"
                onClick={() => setIsActivityModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal underline"
              >
                <Plus className="w-3 h-3" /> Add first experience
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {stop.activities.map((act) => {
                const Icon = CATEGORY_ICONS[act.type] || Tag;
                const actDate = act.scheduledDate
                  ? format(new Date(act.scheduledDate), 'MMM d')
                  : null;

                return (
                  <div
                    key={act.id}
                    className="flex items-center justify-between gap-3 p-2.5 bg-charcoal-3 rounded border border-light-cream group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded bg-cream border border-light-cream flex items-center justify-center text-charcoal shrink-0">
                        <Icon className="w-3.5 h-3.5 opacity-70" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-xs text-charcoal truncate">
                            {act.name}
                          </span>
                          <span className="text-[10px] font-normal px-1 py-0.2 rounded bg-cream border border-light-cream text-muted uppercase">
                            {act.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-muted flex-wrap">
                          {actDate && <span>{actDate}</span>}
                          {act.scheduledTime && <span>at {act.scheduledTime}</span>}
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="w-3 h-3 opacity-70" /> {act.durationMinutes}m
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-xs font-semibold text-charcoal">
                        ${act.cost.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteActivity(act.id)}
                        title="Delete activity"
                        className="opacity-0 group-hover:opacity-100 p-1 text-muted hover:text-charcoal rounded"
                      >
                        <Trash2 className="w-3 h-3" />
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
