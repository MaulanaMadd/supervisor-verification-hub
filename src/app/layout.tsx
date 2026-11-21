import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ShortlistProvider } from '@/context/ShortlistContext';

export const metadata: Metadata = {
  title: 'Supervisor Verification Hub (SVH) | Sistem Informasi',
  description:
    'Platform verifikasi dan panduan pengambilan keputusan bagi mahasiswa Sistem Informasi dalam mengevaluasi calon dosen pembimbing tugas akhir secara transparan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans">
        <ShortlistProvider>
          <Navbar />
          <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Supervisor Verification Hub (SVH) • Prototipe Capstone Q3.04
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Data profil, kuota, dan verifikasi bersifat sampel ilustratif untuk demonstrasi capstone — konfirmasikan kuota bimbingan resmi ke departemen Anda.
                </p>
              </div>
              <div className="flex items-center space-x-4 text-[11px]">
                <span className="inline-flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Data Sampel Demo • 2026/2027</span>
                </span>
                <span>Next.js • TypeScript • Tailwind CSS</span>
              </div>
            </div>
          </footer>
        </ShortlistProvider>
      </body>
    </html>
  );
}
