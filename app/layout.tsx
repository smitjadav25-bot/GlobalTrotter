import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import MobileNav from '@/components/MobileNav';
import GlobeAIChatbot from '@/components/GlobeAIChatbot';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GlobeTrotter AI — Next-Gen AI Travel Operating System',
  description:
    'Plan multi-destination trips with real-time AI optimization, dynamic weather adaptations, budget analysis, interactive maps, and boutique stays.',
  keywords: [
    'AI travel planner',
    'itinerary builder',
    'multi-city trips',
    'budget analysis',
    'weather intelligence',
    'travel assistant',
    'GlobeTrotter AI'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-warm text-charcoal flex antialiased selection:bg-teal-100 selection:text-teal-900">
        {/* Left Persistent Sidebar (Desktop) */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navbar */}
          <Navbar />

          {/* Page Body */}
          <main className="flex-1 w-full pb-16 lg:pb-0">{children}</main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Floating Context-Aware Globe AI Assistant */}
        <GlobeAIChatbot />

        {/* Bottom Navigation (Mobile) */}
        <MobileNav />
      </body>
    </html>
  );
}
