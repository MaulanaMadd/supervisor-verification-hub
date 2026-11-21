'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShortlist } from '@/context/ShortlistContext';

export default function Navbar() {
  const pathname = usePathname();
  const { count, isHydrated } = useShortlist();
  const isShortlistActive = pathname === '/shortlist';
  const isDirectoryActive = pathname === '/';

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Identity */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
                SVH
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-base sm:text-lg tracking-tight text-white">
                    Supervisor Verification Hub
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-950 text-blue-300 border border-blue-800">
                    Capstone SI
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Departemen Sistem Informasi • Portal Keputusan Bimbingan Tugas Akhir
                </p>
              </div>
            </Link>
          </div>

          {/* Quick Academic Meta */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-right hidden md:block">
              <div className="text-xs font-semibold text-slate-200">
                Tahun Akademik 2026/2027
              </div>
              <div className="text-xs text-emerald-400 flex items-center justify-end space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Periode Bimbingan Dibuka</span>
              </div>
            </div>

            <nav aria-label="Navigasi utama" className="flex items-center space-x-2">
              <Link
                href="/"
                className={`px-3 py-2 min-h-[36px] rounded-lg text-xs sm:text-sm font-medium border transition-colors flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  isDirectoryActive
                    ? 'bg-slate-800 text-white border-slate-600'
                    : 'bg-slate-800/70 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">Beranda</span>
              </Link>

              <Link
                href="/shortlist"
                className={`px-3 py-2 min-h-[36px] rounded-lg text-xs sm:text-sm font-medium border transition-colors flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                  isShortlistActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <svg
                  className={`w-4 h-4 shrink-0 ${isShortlistActive ? 'text-white' : 'text-blue-400'}`}
                  fill={isHydrated && count > 0 ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>Kandidat Pilihan</span>
                {isHydrated && count > 0 && (
                  <span
                    data-testid="navbar-shortlist-count"
                    className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[11px] font-bold leading-none ${
                      isShortlistActive
                        ? 'bg-white text-blue-700'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
