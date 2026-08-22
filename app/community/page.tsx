'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  Check,
  Award,
  Send,
  UserPlus
} from 'lucide-react';
import { trotStore } from '@/lib/store';
import { CommunityPost, TravelGroup } from '@/lib/types';
import { SAMPLE_DESTINATIONS } from '@/lib/mockData';

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(trotStore.getCommunityPosts());
  const [groups, setGroups] = useState<TravelGroup[]>(trotStore.getTravelGroups());
  const [activeTab, setActiveTab] = useState<'feed' | 'groups'>('feed');

  const [newPostModal, setNewPostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostDest, setNewPostDest] = useState('Bali, Indonesia');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLike = (postId: string) => {
    const updated = trotStore.toggleLikePost(postId);
    if (updated) {
      setPosts([...trotStore.getCommunityPosts()]);
    }
  };

  const handleToggleGroup = (groupId: string, name: string) => {
    const updated = trotStore.toggleJoinGroup(groupId);
    if (updated) {
      setGroups([...trotStore.getTravelGroups()]);
      showToast(updated.joined ? `Joined "${name}" group!` : `Left group "${name}"`);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: 'Alex Rivera',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      authorBadge: 'Elite Voyager',
      destination: newPostDest,
      tripTitle: newPostTitle,
      coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
      days: 6,
      budgetSpent: 920,
      likes: 1,
      isLiked: true,
      commentsCount: 0,
      timeAgo: 'Just now',
      content: newPostContent,
      tags: ['#GlobeTrotter', '#TravelStory'],
      highlights: ['Local Hidden Spot', 'AI Budget Saved $180']
    };

    trotStore.addCommunityPost(newPost);
    setPosts([...trotStore.getCommunityPosts()]);
    setNewPostModal(false);
    setNewPostTitle('');
    setNewPostContent('');
    showToast('✨ Your travel story is now live in the global community feed!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-700 mb-1">
            <Users className="w-3.5 h-3.5" /> Global Voyagers Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Traveler Community & Groups
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover real traveler journeys, vote on activities, and join travel buddy groups.
          </p>
        </div>

        <button
          onClick={() => setNewPostModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-navy-900 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-teal-300" />
          <span>Share Your Story</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'feed'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Travel Stories Feed ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'groups'
              ? 'bg-navy-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Travel Buddy Groups ({groups.length})
        </button>
      </div>

      {/* Tab 1: Stories Feed */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all space-y-4 p-6"
              >
                {/* Author Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-xs text-navy-900">{post.authorName}</span>
                        <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded-md">
                          {post.authorBadge}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {post.destination} • {post.timeAgo}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-400">
                    {post.days} Days • ${post.budgetSpent} spent
                  </span>
                </div>

                {/* Cover Image */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xs">
                  <img
                    src={post.coverImage}
                    alt={post.tripTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl">
                    {post.tripTitle}
                  </div>
                </div>

                {/* Story Content */}
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {post.content}
                </p>

                {/* Highlights List */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Trip Highlights
                  </div>
                  <div className="flex flex-wrap gap-2 text-slate-700">
                    {post.highlights.map((hl, i) => (
                      <span key={i} className="font-semibold text-teal-800">
                        ✓ {hl}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="text-teal-600 font-semibold hover:underline cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Like / Comment Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                        post.isLiked ? 'text-sunset-500' : 'text-slate-500 hover:text-sunset-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-sunset-500' : ''}`} />
                      <span>{post.likes} Likes</span>
                    </button>

                    <button
                      onClick={() => showToast('Comments section expanded!')}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-navy-900"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentsCount} Comments</span>
                    </button>
                  </div>

                  <button
                    onClick={() => showToast('Trip link copied to clipboard!')}
                    className="p-2 text-slate-400 hover:text-navy-900 rounded-xl hover:bg-slate-100"
                    title="Share post"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar: Active Travel Groups */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
              <h3 className="font-extrabold text-base text-navy-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" /> Travel Buddy Groups
              </h3>
              <p className="text-xs text-slate-500">
                Join verified small groups looking for travel partners to split villas and activities.
              </p>

              <div className="space-y-3">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div className="overflow-hidden flex-1">
                        <h4 className="font-bold text-xs text-navy-900 truncate">{group.name}</h4>
                        <div className="text-[10px] text-slate-500">{group.dates}</div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                      {group.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                        {group.membersCount}/{group.maxMembers} Members
                      </span>
                      <button
                        onClick={() => handleToggleGroup(group.id, group.name)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          group.joined
                            ? 'bg-emerald-600 text-white'
                            : 'bg-navy-900 hover:bg-teal-700 text-white'
                        }`}
                      >
                        {group.joined ? 'Joined ✓' : 'Join Group'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Travel Buddy Groups Expanded */}
      {activeTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={group.avatar}
                    alt={group.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      {group.style}
                    </span>
                    <h3 className="font-extrabold text-base text-navy-900 mt-1">{group.name}</h3>
                    <div className="text-xs text-slate-500">{group.dates}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{group.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-navy-900">
                  {group.membersCount} of {group.maxMembers} Members Joined
                </span>

                <button
                  onClick={() => handleToggleGroup(group.id, group.name)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    group.joined
                      ? 'bg-emerald-600 text-white'
                      : 'bg-navy-900 hover:bg-teal-700 text-white'
                  }`}
                >
                  {group.joined ? '✓ You Are in This Group' : 'Join Travel Group'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create New Post Modal */}
      {newPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-900">Share Your Travel Story</h3>
              <button
                onClick={() => setNewPostModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Destination</label>
                <select
                  value={newPostDest}
                  onChange={(e) => setNewPostDest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900"
                >
                  {SAMPLE_DESTINATIONS.map((d) => (
                    <option key={d.id} value={`${d.name}, ${d.country}`}>
                      {d.name}, {d.country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Trip Title</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="e.g. Unforgettable 7 Days in Bali & Secret Waterfalls"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Story & Tips</label>
                <textarea
                  rows={4}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your favorite spots, budget tips, hidden food stalls, and recommendations..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewPostModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-navy-900 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-colors"
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
