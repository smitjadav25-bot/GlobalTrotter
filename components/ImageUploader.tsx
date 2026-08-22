'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Sparkles } from 'lucide-react';

interface ImageUploaderProps {
  value?: string | null;
  onChange: (url: string) => void;
  tripId?: string;
  label?: string;
}

const PRESET_COVERS = [
  { name: 'Jaipur Hawa Mahal', url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Agra Taj Mahal', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Varanasi Ghats', url: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Goa Coastline', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Udaipur Lake Palace', url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Leh-Ladakh Pangong', url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80' },
];

export default function ImageUploader({
  value,
  onChange,
  tripId,
  label = 'Trip Cover Photo',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setError(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be under 5MB.');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      if (tripId) formData.append('tripId', tripId);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload photo');
      }

      onChange(data.photo.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-normal text-charcoal">{label}</label>
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="text-xs font-normal text-muted hover:text-charcoal flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {showPresets ? 'Hide presets' : 'Choose from presets'}
        </button>
      </div>

      {showPresets && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-2.5 bg-cream border border-light-cream rounded">
          {PRESET_COVERS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                onChange(preset.url);
                setShowPresets(false);
              }}
              className={`relative rounded overflow-hidden aspect-video border transition-colors ${
                value === preset.url ? 'border-charcoal ring-1 ring-charcoal' : 'border-light-cream hover:border-charcoal-40'
              }`}
            >
              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-charcoal-40 flex items-end p-1 text-[10px] text-off-white font-normal">
                <span className="truncate">{preset.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {value ? (
        <div className="relative rounded overflow-hidden aspect-video max-h-56 border border-light-cream group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-charcoal-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-1.5 active:opacity-80"
            >
              <UploadCloud className="w-3.5 h-3.5" /> Change Photo
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 bg-cream text-charcoal border border-charcoal-40 hover:bg-charcoal-4 rounded text-xs font-normal flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded p-5 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-charcoal bg-charcoal-4'
              : 'border-light-cream hover:border-charcoal-40 hover:bg-charcoal-3'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          <div className="flex flex-col items-center justify-center space-y-1.5">
            <div className="w-9 h-9 rounded bg-cream border border-light-cream flex items-center justify-center text-charcoal">
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin text-charcoal" />
              ) : (
                <UploadCloud className="w-4 h-4" />
              )}
            </div>
            <div className="text-xs font-semibold text-charcoal">
              {isUploading ? 'Uploading to storage...' : 'Click to upload or drag & drop'}
            </div>
            <p className="text-[11px] text-muted">
              Supports JPEG, PNG, or WebP (Max 5MB).
            </p>
          </div>
        </div>
      )}

      {error && <p className="text-xs font-normal text-charcoal">{error}</p>}
    </div>
  );
}
