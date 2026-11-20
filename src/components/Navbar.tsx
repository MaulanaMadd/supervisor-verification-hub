import Link from 'next/link';

export default function Navbar() {
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
                    IS Capstone
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Department of Information Systems • Thesis Advising Decision Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Quick Academic Meta */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-right hidden md:block">
              <div className="text-xs font-semibold text-slate-200">
                Academic Year 2026/2027
              </div>
              <div className="text-xs text-emerald-400 flex items-center justify-end space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Advising Intake Open</span>
              </div>
            </div>

            <Link
              href="/"
              className="px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center space-x-1.5"
            >
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Directory</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
