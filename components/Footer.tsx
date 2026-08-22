import React from 'react';
import Link from 'next/link';
import { Compass, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-light-cream mt-auto py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-light-cream">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-charcoal flex items-center justify-center text-off-white shadow-inset-btn">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-semibold text-charcoal tracking-tight">
                GlobeTrotter
              </span>
            </div>
            <p className="text-sm font-normal text-muted max-w-sm leading-relaxed">
              Personalized multi-city travel planning, route sequencing, and budget intelligence.
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs font-normal text-muted">
              <span>Local SQLite Storage</span>
              <span>•</span>
              <span>Multi-City Routing</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-normal text-muted">
              <li>
                <Link href="/dashboard" className="hover:text-charcoal transition-colors">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link href="/trips" className="hover:text-charcoal transition-colors">
                  My Trips
                </Link>
              </li>
              <li>
                <Link href="/ai-planner" className="hover:text-charcoal transition-colors">
                  AI Planner
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-charcoal transition-colors">
                  Explore Map
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              Resources
            </h4>
            <ul className="space-y-2 text-sm font-normal text-muted">
              <li>
                <Link href="/budget" className="hover:text-charcoal transition-colors">
                  Budget Intelligence
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-charcoal transition-colors">
                  Traveler Community
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-charcoal transition-colors">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-normal text-muted gap-4">
          <p>© 2026 GlobeTrotter. Pure visual restyle edition.</p>
          <p>Built with Next.js, Tailwind CSS & Prisma</p>
        </div>
      </div>
    </footer>
  );
}
