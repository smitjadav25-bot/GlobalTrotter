'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Check, X, Loader2, Sparkles } from 'lucide-react';

interface ImageUploaderProps {
  value?: string | null;
  onChange: (url: string) => void;
  tripId?: string;
  label?: string;
}

const PRESET_COVERS = [
  { name: 'Tokyo Neon', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Parisian Sunset', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Bali Paradise', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Kyoto Temple', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Rome Colosseum', url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80' },
  { name: 'New York Skyline', url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80' },
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

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a JPG, PNG, or WebP image.');
      return;
    }

    // Validate size (5MB)
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="text-xs font-semibold text-coral hover:text-coral-dark flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {showPresets ? 'Hide presets' : 'Choose from presets'}
        </button>
      </div>

      {showPresets && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
          {PRESET_COVERS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                onChange(preset.url);
                setShowPresets(false);
              }}
              className={`group relative rounded-lg overflow-hidden aspect-video border-2 transition-all ${
                value === preset.url ? 'border-coral ring-2 ring-coral/30' : 'border-transparent hover:border-slate-300'
              }`}
            >
              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-1 text-[10px] text-white font-medium">
                <span className="truncate">{preset.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {value ? (
        <div className="relative rounded-2xl overflow-hidden aspect-video max-h-64 border border-slate-200 shadow-sm group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white/90 hover:bg-white text-slate-800 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5"
            >
              <UploadCloud className="w-4 h-4" /> Change Photo
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5"
            >
              <X className="w-4 h-4" /> Remove
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
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-coral bg-coral-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-coral/60 hover:bg-slate-50/70'
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

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-coral-50 flex items-center justify-center text-coral mb-1">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-coral" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>
            <div className="text-sm font-semibold text-slate-800">
              {isUploading ? 'Uploading to local storage...' : 'Click to upload or drag & drop'}
            </div>
            <p className="text-xs text-slate-500">
              Supports JPEG, PNG, or WebP (Max 5MB). Saved directly to <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">/public/uploads</code>.
            </p>
          </div>
        </div>
      )}

      {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
}
