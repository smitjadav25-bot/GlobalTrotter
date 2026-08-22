import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import AskGlobeAiModal from '@/components/AskGlobeAiModal';
import MobileBottomNav from '@/components/MobileBottomNav';

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-slate-100 font-sans pb-16 md:pb-0 transition-colors duration-200">
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <AskGlobeAiModal />
            <MobileBottomNav />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
