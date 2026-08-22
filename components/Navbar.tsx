'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/router';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  MapPin,
  Calendar,
  PieChart,
  Plus,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import NextLink from 'next/link';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string | null; email: string; avatarUrl?: string | null } | null>(null);

  useEffect(() => {
    fetch('/api/auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch((err) => console.error(err));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  const navLinks = [
    { href: '/', label: 'Explore', icon: Compass },
    { href: '/trips', label: 'My Trips', icon: MapPin },
    { href: '/profile', label: 'Wishlist & Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NextLink href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coral to-rose-400 flex items-center justify-center text-white shadow-md shadow-coral/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-coral bg-clip-text text-transparent">
                GlobeTrotter
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-coral-50 text-coral-600 border border-coral-200">
                PRO
              </span>
            </div>
          </NextLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <NextLink
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-coral-50 text-coral-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-coral' : 'text-slate-400'}`} />
                  {link.label}
                </NextLink>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <NextLink
              href="/trips/new"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-coral hover:bg-coral-dark text-white text-sm font-semibold shadow-md shadow-coral/25 hover:shadow-lg hover:shadow-coral/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Plan New Trip
            </NextLink>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <NextLink href="/profile" className="flex items-center gap-2 group p-1 rounded-lg hover:bg-slate-100">
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-coral/30 group-hover:ring-coral transition-all"
                  />
                  <span className="text-xs font-semibold text-slate-700 max-w-[90px] truncate">
                    {user.name || user.email.split('@')[0]}
                  </span>
                </NextLink>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/login"
                  className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Log In
                </NextLink>
                <NextLink
                  href="/signup"
                  className="px-3.5 py-2 text-sm font-semibold text-coral bg-coral-50 hover:bg-coral-100 rounded-lg transition-colors"
                >
                  Sign Up
                </NextLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <NextLink
              href="/trips/new"
              className="p-2 rounded-lg bg-coral text-white shadow-xs"
            >
              <Plus className="w-5 h-5" />
            </NextLink>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <NextLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? 'bg-coral-50 text-coral-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </NextLink>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <NextLink
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
                >
                  Log In
                </NextLink>
                <NextLink
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 text-sm font-semibold text-white bg-coral rounded-lg"
                >
                  Sign Up
                </NextLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
