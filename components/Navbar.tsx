'use client';

import React, { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  Compass,
  MapPin,
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
  CloudSun,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { href: '/cities', label: 'Explore', icon: Building2 },
    { href: '/trips', label: 'My Trips', icon: MapPin },
    { href: '/ai-planner', label: 'AI Planner', icon: Sparkles },
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
      title: 'Itinerary Blueprint Generated',
      time: '10m ago',
      desc: 'Your Japan route has been optimized for transit and pacing.',
    },
    {
      id: 'n2',
      title: 'Fare Adjustment Detected',
      time: '2h ago',
      desc: 'Selected stays in Kyoto decreased by 15% for your dates.',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream border-b border-light-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-6">
            <NextLink
              href={isAuthenticated ? '/dashboard' : '/login'}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded bg-charcoal flex items-center justify-center text-off-white shadow-inset-btn">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-base font-semibold tracking-tight text-charcoal">
                GlobeTrotter
              </span>
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
                      className={`px-3 py-1.5 rounded text-sm font-normal transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-charcoal-4 text-charcoal font-semibold'
                          : 'text-muted hover:text-charcoal hover:bg-charcoal-3'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 opacity-70" />
                      {link.label}
                    </NextLink>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Top Bar Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Search Input Bar (Desktop) */}
            {isAuthenticated && (
              <form
                onSubmit={handleSearchSubmit}
                className="hidden lg:flex items-center relative w-48"
              >
                <Search className="w-3.5 h-3.5 text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-cream text-charcoal border border-light-cream rounded text-xs placeholder:text-muted focus:ring-2 focus:ring-ring-blue focus:outline-none"
                />
              </form>
            )}

            {/* Weather Widget Chip */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-cream border border-light-cream rounded text-xs font-normal text-muted">
              <CloudSun className="w-3.5 h-3.5 text-charcoal opacity-70" />
              <span>Tokyo 22°C</span>
            </div>

            {/* Notifications Popover */}
            {isAuthenticated && (
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="Notifications"
                  className="p-1.5 rounded text-muted hover:text-charcoal hover:bg-charcoal-4 relative transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-pill bg-charcoal" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-cream rounded-card border border-light-cream p-3 z-50">
                    <div className="flex items-center justify-between pb-2 border-b border-light-cream px-1">
                      <span className="text-xs font-semibold text-charcoal">Notifications</span>
                      <span className="text-[11px] text-muted cursor-pointer hover:text-charcoal">
                        Mark read
                      </span>
                    </div>
                    <div className="space-y-1.5 mt-2 max-h-60 overflow-y-auto">
                      {sampleNotifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-2 rounded bg-charcoal-3 hover:bg-charcoal-4 transition-colors cursor-pointer text-left"
                        >
                          <div className="text-xs font-semibold text-charcoal">{n.title}</div>
                          <p className="text-[11px] text-muted mt-0.5 line-clamp-2">{n.desc}</p>
                          <span className="text-[10px] text-muted mt-1 block">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile & Auth actions */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/trips/new"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-charcoal text-off-white text-xs font-normal rounded shadow-inset-btn active:opacity-80 focus:shadow-focus-soft transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Trip</span>
                </NextLink>

                <NextLink
                  href="/profile"
                  className="flex items-center gap-1.5 p-1 rounded hover:bg-charcoal-4 transition-colors"
                  title="View Profile"
                >
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-6 h-6 rounded object-cover border border-light-cream"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded bg-charcoal text-off-white flex items-center justify-center font-normal text-xs">
                      {session?.user?.name ? session.user.name[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </NextLink>

                <button
                  onClick={handleLogout}
                  className="p-1.5 text-muted hover:text-charcoal hover:bg-charcoal-4 rounded transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/login"
                  className="px-3 py-1.5 text-xs font-normal text-charcoal hover:bg-charcoal-4 rounded transition-colors"
                >
                  Sign In
                </NextLink>
                <NextLink
                  href="/register"
                  className="px-3.5 py-1.5 text-xs font-normal bg-charcoal text-off-white rounded shadow-inset-btn active:opacity-80 transition-opacity"
                >
                  Create Account
                </NextLink>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-1.5 rounded text-charcoal hover:bg-charcoal-4"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isAuthenticated && mobileMenuOpen && (
        <div className="xl:hidden bg-cream border-b border-light-cream px-4 pt-2 pb-4 space-y-2">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-2">
            <Search className="w-3.5 h-3.5 text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-cream text-charcoal border border-light-cream rounded text-xs focus:ring-2 focus:ring-ring-blue focus:outline-none"
            />
          </form>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <NextLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded text-xs font-normal ${
                    isActive
                      ? 'bg-charcoal-4 text-charcoal font-semibold'
                      : 'text-muted hover:text-charcoal hover:bg-charcoal-3'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-70" />
                  {link.label}
                </NextLink>
              );
            })}
          </div>

          <div className="pt-2 border-t border-light-cream flex items-center justify-between">
            <NextLink
              href="/trips/new"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal text-off-white rounded shadow-inset-btn text-xs font-normal"
            >
              <Plus className="w-3.5 h-3.5" /> New Trip
            </NextLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-muted hover:text-charcoal text-xs font-normal"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
