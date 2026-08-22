'use client';

import React, { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  Compass,
  MapPin,
  Calendar,
  Building2,
  Sparkles,
  Plus,
  User,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  LayoutDashboard,
  Map,
  PieChart,
  Users,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  CloudSun,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = status === 'authenticated' && !!session?.user;
  const userRole = (session?.user as any)?.role || 'USER';

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cities?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Close notifications on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ordered Navigation Links per specification
  const navLinks = [
    { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { href: '/cities', label: 'Explore', icon: Building2 },
    { href: '/trips', label: 'My Trips', icon: MapPin },
    { href: '/ai-planner', label: 'AI Planner', icon: Sparkles, highlight: true },
    { href: '/map', label: 'Explore Map', icon: Map },
    { href: '/budget', label: 'Budget Analysis', icon: PieChart },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
    ...(userRole === 'ADMIN'
      ? [{ href: '/admin', label: 'Admin', icon: ShieldAlert }]
      : []),
  ];

  const sampleNotifications = [
    {
      id: 'n1',
      title: 'AI Itinerary Generated',
      time: '10m ago',
      desc: 'Your Japan Cultural Odyssey has been optimized for budget efficiency.',
      read: false,
    },
    {
      id: 'n2',
      title: 'Flight Price Drop',
      time: '2h ago',
      desc: 'Roundtrip flights to Paris dropped by 18% for October dates.',
      read: false,
    },
    {
      id: 'n3',
      title: 'Community Like',
      time: '1d ago',
      desc: 'Elena liked your travel photo in Bali rice terraces.',
      read: true,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-6">
            <NextLink
              href={isAuthenticated ? '/dashboard' : '/login'}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-600 to-navy-800 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-navy-900 dark:text-white">
                  Globe<span className="text-teal-500">Trotter</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-sunset-50 dark:bg-sunset-950 text-sunset-600 dark:text-sunset-400 border border-sunset-200 dark:border-sunset-800">
                  AI
                </span>
              </div>
            </NextLink>

            {/* Desktop Navigation Links */}
            {isAuthenticated && (
              <nav className="hidden xl:flex items-center gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/dashboard' && pathname.startsWith(link.href));

                  return (
                    <NextLink
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-bold'
                          : link.highlight
                          ? 'text-sunset-500 hover:bg-sunset-50 dark:hover:bg-sunset-950/40'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {link.label}
                    </NextLink>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Top Bar Extras: Search, Weather, Notifications, Dark Mode, Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input Bar (Desktop) */}
            {isAuthenticated && (
              <form
                onSubmit={handleSearchSubmit}
                className="hidden lg:flex items-center relative w-48 xl:w-56"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 transition-all"
                />
              </form>
            )}

            {/* Weather Widget Chip */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <CloudSun className="w-3.5 h-3.5 text-sunset-500" />
              <span>Tokyo 22°C</span>
            </div>

            {/* Notifications Popover */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="Notifications"
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sunset-500 animate-pulse" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 px-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Notifications</h4>
                      <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold cursor-pointer">
                        Mark all as read
                      </span>
                    </div>
                    <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                      {sampleNotifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-left"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                            {n.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-navy-800" />
              )}
            </button>

            {/* User Profile & Auth actions */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/trips/new"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-sunset-500 hover:bg-sunset-600 text-white rounded-xl text-xs font-bold shadow-md shadow-sunset-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Trip</span>
                </NextLink>

                <NextLink
                  href="/profile"
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="View Profile"
                >
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-7 h-7 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-xs">
                      {session?.user?.name ? session.user.name[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </NextLink>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/login"
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </NextLink>
                <NextLink
                  href="/register"
                  className="px-3.5 py-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-md shadow-teal-500/20 transition-all"
                >
                  Create Account
                </NextLink>
              </div>
            )}

            {/* Mobile Menu Hamburger (for expanded links on tablets/phones) */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {isAuthenticated && mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <NextLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  {link.label}
                </NextLink>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <NextLink
              href="/trips/new"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 px-4 py-2 bg-sunset-500 text-white rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" /> New Trip
            </NextLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
