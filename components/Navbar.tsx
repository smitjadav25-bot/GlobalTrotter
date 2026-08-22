'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = status === 'authenticated' && !!session?.user;
  const userRole = (session?.user as any)?.role || 'USER';

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/trips', label: 'My Trips', icon: MapPin },
    { href: '/cities', label: 'Cities', icon: Building2 },
    { href: '/activities', label: 'Activities', icon: Sparkles },
    ...(userRole === 'ADMIN'
      ? [{ href: '/admin', label: 'Admin', icon: ShieldAlert }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NextLink href={isAuthenticated ? '/dashboard' : '/login'} className="flex items-center gap-2.5 group">
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
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <NextLink
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-coral-50 text-coral-600 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-coral' : 'text-slate-400'}`} />
                    {link.label}
                  </NextLink>
                );
              })}
            </nav>
          )}

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <NextLink
                  href="/trips/new"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-coral hover:bg-coral-dark text-white text-xs font-bold shadow-md shadow-coral/25 hover:shadow-lg hover:shadow-coral/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  Plan New Trip
                </NextLink>

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <NextLink
                    href="/profile"
                    className="flex items-center gap-2 group p-1 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={
                        (session.user as any)?.avatarUrl ||
                        session.user?.image ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                      }
                      alt={session.user?.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-coral/30 group-hover:ring-coral transition-all"
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800 max-w-[90px] truncate leading-tight">
                        {session.user?.name || session.user?.email?.split('@')[0]}
                      </div>
                      <div className="text-[10px] text-slate-400 capitalize">{userRole.toLowerCase()}</div>
                    </div>
                  </NextLink>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <NextLink
                  href="/login"
                  className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </NextLink>
                <NextLink
                  href="/register"
                  className="px-3.5 py-2 text-xs font-bold text-coral bg-coral-50 hover:bg-coral-100 rounded-xl transition-colors"
                >
                  Create Account
                </NextLink>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && (
              <NextLink
                href="/trips/new"
                className="p-2 rounded-xl bg-coral text-white shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </NextLink>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {isAuthenticated ? (
            <>
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <NextLink
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                        isActive
                          ? 'bg-coral-50 text-coral-600'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </NextLink>
                  );
                })}
                <NextLink
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <User className="w-4 h-4" />
                  Profile & Wishlist
                </NextLink>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-3 py-2 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <img
                    src={
                      (session.user as any)?.avatarUrl ||
                      session.user?.image ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                    }
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{session.user?.name}</div>
                    <div className="text-[10px] text-slate-500">{session.user?.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <NextLink
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl"
              >
                Sign In
              </NextLink>
              <NextLink
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-xs font-bold text-white bg-coral rounded-xl shadow-xs"
              >
                Sign Up
              </NextLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
