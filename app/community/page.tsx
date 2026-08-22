'use client';

import React, { useState } from 'react';
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Calendar,
  Sparkles,
  Plus,
  Send,
  X,
  Compass,
} from 'lucide-react';
import Link from 'next/link';

interface StoryPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  location: string;
  tripDuration: string;
  title: string;
  content: string;
  photos: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  publishedAt: string;
}

const INITIAL_STORIES: StoryPost[] = [
  {
    id: 's-1',
    authorName: 'Kenji Takahashi',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    location: 'Kyoto & Tokyo, Japan',
    tripDuration: '8 Days',
    title: 'Autumn in the Zen Gardens & Evening Ramen Trails',
    content:
      'We spent 4 days waking up at 5:30 AM to walk Fushimi Inari before the crowds arrived, followed by matcha in Uji and high-speed Shinkansen to Tokyo.',
    photos: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    ],
    likes: 142,
    comments: 18,
    publishedAt: '2 hours ago',
  },
  {
    id: 's-2',
    authorName: 'Amélie Laurent',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    location: 'Paris & Nice, France',
    tripDuration: '6 Days',
    title: 'Secret Cafés and Sunset Walks along the Seine',
    content:
      'GlobeTrotter helped us sequence our museum reservations to avoid queues completely. The evening boat ride on the Seine remains our favorite highlight.',
    photos: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    ],
    likes: 89,
    comments: 7,
    publishedAt: 'Yesterday',
  },
];

export default function CommunityPage() {
  const [stories, setStories] = useState<StoryPost[]>(INITIAL_STORIES);
  const [showShareModal, setShowShareModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newContent, setNewContent] = useState('');

  const toggleLike = (id: string) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const isLiked = !s.isLiked;
          return {
            ...s,
            isLiked,
            likes: isLiked ? s.likes + 1 : s.likes - 1,
          };
        }
        return s;
      })
    );
  };

  const toggleBookmark = (id: string) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isBookmarked: !s.isBookmarked } : s))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: StoryPost = {
      id: `s-${Date.now()}`,
      authorName: 'You (Traveler)',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      location: newLocation || 'Global Route',
      tripDuration: 'Custom Trip',
      title: newTitle,
      content: newContent,
      photos: [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      ],
      likes: 1,
      comments: 0,
      isLiked: true,
      publishedAt: 'Just now',
    };

    setStories([newPost, ...stories]);
    setNewTitle('');
    setNewLocation('');
    setNewContent('');
    setShowShareModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal tracking-[-0.9px] flex items-center gap-2.5">
            <Users className="w-6 h-6 opacity-80" /> Traveler Community & Stories
          </h1>
          <p className="text-xs text-muted font-normal mt-1">
            Real itineraries, travel stories, and route recommendations from travelers worldwide.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowShareModal(true)}
          className="self-start sm:self-auto px-4 py-2 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal flex items-center gap-2 active:opacity-80 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" /> Share Trip Story
        </button>
      </div>

      {/* Stories Feed */}
      <div className="space-y-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-cream rounded-card p-6 border border-light-cream space-y-4"
          >
            {/* Author Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={story.authorAvatar}
                  alt={story.authorName}
                  className="w-9 h-9 rounded-pill object-cover border border-light-cream"
                />
                <div>
                  <h3 className="text-xs font-semibold text-charcoal">{story.authorName}</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted">
                    <MapPin className="w-3 h-3 opacity-70" />
                    <span>{story.location}</span>
                    <span>•</span>
                    <span>{story.tripDuration}</span>
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-muted">{story.publishedAt}</span>
            </div>

            {/* Content Body */}
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-charcoal leading-snug">{story.title}</h2>
              <p className="text-xs text-muted font-normal leading-relaxed">{story.content}</p>
            </div>

            {/* Photos */}
            {story.photos && story.photos.length > 0 && (
              <div className={`grid gap-2 ${story.photos.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {story.photos.map((photo, i) => (
                  <div key={i} className="aspect-[16/10] rounded overflow-hidden bg-cream border border-light-cream">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-3 border-t border-light-cream flex items-center justify-between text-xs text-muted font-normal">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => toggleLike(story.id)}
                  className={`flex items-center gap-1 hover:text-charcoal transition-colors ${
                    story.isLiked ? 'text-charcoal font-semibold' : ''
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${story.isLiked ? 'fill-charcoal' : ''}`} />
                  <span>{story.likes}</span>
                </button>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 opacity-70" />
                  <span>{story.comments}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleBookmark(story.id)}
                  className="p-1 text-muted hover:text-charcoal rounded"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${story.isBookmarked ? 'fill-charcoal text-charcoal' : ''}`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => alert('Story link copied to clipboard!')}
                  className="p-1 text-muted hover:text-charcoal rounded"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Trip Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-charcoal-40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-cream rounded-card p-6 max-w-md w-full border border-light-cream space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-charcoal">Share Your Trip Story</h3>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="p-1 text-muted hover:text-charcoal rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div>
                <label className="block text-xs font-normal text-charcoal mb-1">Story Title</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Days Exploring Roman Piazzas and Gelato"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-normal text-charcoal mb-1">Destination Visited</label>
                <input
                  type="text"
                  placeholder="e.g. Rome & Florence, Italy"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-normal text-charcoal mb-1">Story / Tips</label>
                <textarea
                  rows={4}
                  placeholder="Share memorable moments, secret food spots, and pacing tips..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="px-3 py-1.5 text-xs font-normal text-charcoal border border-charcoal-40 rounded hover:bg-charcoal-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal active:opacity-80 transition-opacity"
                >
                  Post Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
