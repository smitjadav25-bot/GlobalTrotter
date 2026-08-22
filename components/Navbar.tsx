'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Sparkles,
  CloudSun,
  MapPin,
  Check,
  ChevronDown,
  AlertTriangle,
  Tag,
  Clock,
  Menu,
  X
} from 'lucide-react';
import GlobalSearchModal from './GlobalSearchModal';

interface NotificationItem {
  id: string;
  type: 'weather' | 'price' | 'ai' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'weather',
    title: '🌧 Rain Expected Tomorrow in Bali',
    message: 'We suggested swapping Mount Batur hike with an Ubud Organic Cooking Class.',
    time: '15m ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'price',
    title: '📉 Price Drop Alert: Tokyo Flights',
    message: 'Direct flights from your origin dropped by $140 for October departures!',
    time: '2h ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'ai',
    title: '✨ AI Route Optimization Ready',
    message: 'Your Switzerland Alps itinerary travel time can be reduced by 45 minutes.',
    time: '1d ago',
    read: true,
  },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [weatherCity, setWeatherCity] = useState('Bali');

  useEffect(() => {
    const handleOpenSearch = () => setSearchOpen(true);
    window.addEventListener('open-search-modal', handleOpenSearch);
    return () => window.removeEventListener('open-search-modal', handleOpenSearch);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-soft-xs">
        {/* Mobile Logo & Brand */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="font-extrabold text-base tracking-tight text-navy-900">
              GlobeTrotter<span className="text-sunset-500">AI</span>
            </span>
          </Link>
        </div>

        {/* Global Search Input Button */}
        <div className="hidden sm:flex items-center flex-1 max-w-md mx-2 lg:mx-0">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200/60 text-slate-400 text-xs font-medium transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
              <span className="text-slate-500 group-hover:text-slate-700">
                Search destinations, stays, activities...
              </span>
            </div>
            <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-500 shadow-xs border border-slate-200">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Weather Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-300 transition-all cursor-pointer">
            <CloudSun className="w-4 h-4 text-amber-500" />
            <span>{weatherCity}: 29°C</span>
            <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-1.5 py-0.5 rounded-full">
              Sunny
            </span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sunset-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {notifOpen && (
              <div
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200/90 py-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-4 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-navy-900">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-sunset-500 text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] text-teal-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 hover:bg-slate-50 transition-colors flex gap-3 ${
                        !n.read ? 'bg-teal-50/30' : ''
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-base">
                        {n.type === 'weather' ? '🌧' : n.type === 'price' ? '🏷' : '✨'}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-900">{n.title}</div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 font-medium mt-1 inline-block">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pt-2.5 border-t border-slate-100 text-center">
                  <Link
                    href="/weather"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700"
                  >
                    View All Weather Alerts & Updates →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quick AI Plan Button */}
          <Link
            href="/planner"
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 hover:from-teal-700 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-navy-900/10 hover:shadow-glow-teal hover:-translate-y-0.5 transition-all duration-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
            <span className="hidden sm:inline">Plan with AI</span>
          </Link>

          {/* User Profile Avatar */}
          <Link href="/profile" className="flex items-center gap-2 group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Alex Rivera"
              className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 group-hover:border-teal-500 transition-all"
            />
          </Link>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
