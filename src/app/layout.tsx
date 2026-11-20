import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Supervisor Verification Hub (SVH) | Information Systems',
  description:
    'A verification platform for Information Systems students evaluating potential thesis supervisors based on research fit, verification status, verification scope, information sources, freshness, and recommended next actions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans">
        <Navbar />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Supervisor Verification Hub (SVH) • Q3.04 Capstone Foundation
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Department of Information Systems • Academic Advising Transparency Initiative
              </p>
            </div>
            <div className="flex items-center space-x-4 text-[11px]">
              <span className="inline-flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Audit Verified 2026/2027</span>
              </span>
              <span>Next.js • TypeScript • Tailwind CSS</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
