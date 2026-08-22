'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Sparkles,
  Plus,
  Compass,
  Calendar,
  Send,
  X,
  CheckCircle2,
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  location: string;
  route: string;
  days: number;
  image: string;
  content: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
  timeAgo: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      handle: '@mayatravels',
    },
    location: 'Kyoto, Japan',
    route: 'Tokyo ➔ Hakone ➔ Kyoto ➔ Osaka',
    days: 10,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    content:
      'Waking up at 5:30 AM to walk through Fushimi Inari before the crowds was pure magic. The sunlight filtering through thousands of orange torii gates was totally surreal. Pro tip: hike all the way to the summit for quiet hidden tea shops! ⛩️🍵',
    likes: 342,
    comments: 28,
    timeAgo: '2 hours ago',
  },
  {
    id: 'p2',
    author: {
      name: 'Julian Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      handle: '@julianvance',
    },
    location: 'Amalfi Coast, Italy',
    route: 'Rome ➔ Naples ➔ Positano ➔ Capri',
    days: 7,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    content:
      'Took the coastal ferry from Salerno to Positano instead of the winding bus — highly recommend! Sunset spritz on the cliffs overlooking pastel villas was the highlight of our summer. 🍋🌊',
    likes: 512,
    comments: 44,
    timeAgo: '6 hours ago',
  },
  {
    id: 'p3',
    author: {
      name: 'Chloe Tremblay',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      handle: '@chloe_globetrotter',
    },
    location: 'Ubud, Bali',
    route: 'Seminyak ➔ Ubud ➔ Nusa Penida',
    days: 12,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    content:
      'Tegallalang rice terraces at sunrise. The morning mist over the palm trees made it look straight out of a painting. Rented a scooter for $5/day to explore local waterfall sanctuaries. 🌴🛵',
    likes: 279,
    comments: 19,
    timeAgo: '1 day ago',
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [newRoute, setNewRoute] = useState('');
  const [newStory, setNewStory] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const toggleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const handleShare = (postId: string) => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.trim()) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: {
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        handle: '@alex_travels',
      },
      location: newLocation || 'Tokyo, Japan',
      route: newRoute || 'Tokyo ➔ Kyoto',
      days: 8,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      content: newStory,
      likes: 1,
      comments: 0,
      isLiked: true,
      timeAgo: 'Just now',
    };

    setPosts([newPost, ...posts]);
    setNewLocation('');
    setNewRoute('');
    setNewStory('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-sunset-500" /> Travel Stories & Community
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real itineraries, live field notes, and photo stories from fellow global wanderers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-sunset-500 hover:bg-sunset-600 text-white rounded-xl text-xs font-bold shadow-md shadow-sunset-500/20 flex items-center gap-2 shrink-0 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Share Trip Story
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-card-dark rounded-card border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden transition-all duration-200"
          >
            {/* Author Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-navy-900 dark:text-white">
                      {post.author.name}
                    </span>
                    <span className="text-[11px] text-slate-400">{post.author.handle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-500" /> {post.location}
                    </span>
                    <span>•</span>
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                {post.days} Days Itinerary
              </div>
            </div>

            {/* Photo */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={post.image}
                alt={post.location}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-teal-400" />
                Route: {post.route}
              </div>
            </div>

            {/* Content & Actions */}
            <div className="p-5 space-y-4">
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                {post.content}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors ${
                      post.isLiked ? 'text-rose-500' : 'hover:text-rose-500'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 font-bold hover:text-teal-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-1.5 font-bold hover:text-sunset-500 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedId === post.id ? 'Link Copied!' : 'Share'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSave(post.id)}
                  className={`p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                    post.isSaved ? 'text-teal-500' : ''
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-teal-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Story Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-card p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-navy-900 dark:text-white">Share Your Trip Story</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Destination & City</label>
                <input
                  type="text"
                  placeholder="e.g. Kyoto, Japan"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sunset-500/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Multi-City Route</label>
                <input
                  type="text"
                  placeholder="e.g. Tokyo ➔ Hakone ➔ Kyoto"
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sunset-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Trip Highlights & Advice</label>
                <textarea
                  rows={4}
                  placeholder="Share what made your journey special, secret food spots, or packing advice..."
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sunset-500/40"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sunset-500 hover:bg-sunset-600 text-white rounded-xl text-xs font-bold shadow-md shadow-sunset-500/20"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
