import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'GlobeTrotter — Personalized Multi-City Travel Planning',
  description:
    'Create customized multi-city trips, organize stops and activities, compute budgets, visualize timelines, and share stunning itineraries.',
  keywords: ['travel planner', 'multi-city trip', 'itinerary builder', 'budget breakdown', 'travel calendar'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
