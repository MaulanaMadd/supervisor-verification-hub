'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { MOCK_SUPERVISORS, RESEARCH_FIELDS } from '@/data/mockSupervisors';
import { VerificationStatus, AvailabilityStatus } from '@/types/supervisor';
import SupervisorCard from '@/components/SupervisorCard';
import SearchAndFilterBar from '@/components/SearchAndFilterBar';

function SupervisorDirectoryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fieldParam = searchParams.get('field');
  const validParamField = fieldParam && RESEARCH_FIELDS.includes(fieldParam) ? fieldParam : null;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<VerificationStatus | 'all'>('all');
  const [userFieldFilter, setUserFieldFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityStatus | 'all'>('all');

  // Derive active field filter: user manual selection takes precedence; otherwise URL param; otherwise 'All Fields'
  const activeFieldFilter = userFieldFilter ?? (validParamField || 'All Fields');

  // Filtered supervisor list
  const filteredSupervisors = useMemo(() => {
    return MOCK_SUPERVISORS.filter((supervisor) => {
      // 1. Text Search (Matches supervisor name, academic title, research fields, thesis focus, bio, methodologies)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = supervisor.name.toLowerCase().includes(query);
        const matchesTitle = supervisor.academicTitle.toLowerCase().includes(query);
        const matchesFields = supervisor.researchFields.some((field) =>
          field.toLowerCase().includes(query)
        );
        const matchesTopics = supervisor.thesisFocusAreas.some((topic) =>
          topic.toLowerCase().includes(query)
        );
        const matchesBio = supervisor.bio.toLowerCase().includes(query);
        const matchesMethodologies = supervisor.methodologies.some((method) =>
          method.toLowerCase().includes(query)
        );

        if (
          !matchesName &&
          !matchesTitle &&
          !matchesFields &&
          !matchesTopics &&
          !matchesBio &&
          !matchesMethodologies
        ) {
          return false;
        }
      }

      // 2. Verification Status Filter
      if (statusFilter !== 'all' && supervisor.verificationStatus !== statusFilter) {
        return false;
      }

      // 3. Research Field Filter
      if (activeFieldFilter !== 'All Fields') {
        const hasField = supervisor.researchFields.includes(activeFieldFilter);
        if (!hasField) return false;
      }

      // 4. Availability Status Filter
      if (availabilityFilter !== 'all') {
        if (supervisor.availabilityStatus !== availabilityFilter) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, statusFilter, activeFieldFilter, availabilityFilter]);

  const handleFieldFilterChange = (field: string) => {
    setUserFieldFilter(field);
    // Clear URL param when manually changing field filter
    if (searchParams.get('field')) {
      router.replace(pathname, { scroll: false });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setUserFieldFilter('All Fields');
    setAvailabilityFilter('all');
    if (searchParams.get('field')) {
      router.replace(pathname, { scroll: false });
    }
  };

  // Quick statistics
  const verifiedCount = MOCK_SUPERVISORS.filter((s) => s.verificationStatus === 'verified').length;
  const openCapacityCount = MOCK_SUPERVISORS.reduce(
    (acc, curr) => acc + (curr.quota?.remaining || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Hero / University Context Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-200 dark:border-blue-800">
              <span>Platform Verifikasi Dosen Pembimbing</span>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] font-medium border border-amber-200 dark:border-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Prototipe Demo • Data Sampel Ilustratif</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Direktori Dosen Pembimbing Tugas Akhir
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Evaluasi calon dosen pembimbing tugas akhir secara transparan berdasarkan kesesuaian bidang penelitian,
            sumber informasi, cakupan verifikasi, keterbaruan data, serta rekomendasi tindak lanjut sebelum mengajukan proposal.
          </p>
        </div>

        {/* Quick Academic KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">Total Dosen Pembimbing</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {MOCK_SUPERVISORS.length} Dosen
            </span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40">
            <span className="text-emerald-700 dark:text-emerald-400 block font-medium">
              Terverifikasi Resmi
            </span>
            <span className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
              {verifiedCount} Profil Terverifikasi
            </span>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40">
            <span className="text-blue-700 dark:text-blue-400 block font-medium">
              Sisa Kuota Bimbingan
            </span>
            <span className="text-lg font-bold text-blue-800 dark:text-blue-300">
              Sisa {openCapacityCount} Kuota
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">Periode Akademik</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Ganjil 2026/2027
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <SearchAndFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        fieldFilter={activeFieldFilter}
        onFieldFilterChange={handleFieldFilterChange}
        availabilityFilter={availabilityFilter}
        onAvailabilityFilterChange={setAvailabilityFilter}
        availableFields={RESEARCH_FIELDS}
        totalResults={filteredSupervisors.length}
        totalSupervisors={MOCK_SUPERVISORS.length}
        onResetFilters={handleResetFilters}
      />

      {/* Supervisor Card Grid or Empty State */}
      {filteredSupervisors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSupervisors.map((supervisor) => (
            <SupervisorCard
              key={supervisor.id}
              supervisor={supervisor}
              activeSearchQuery={searchQuery}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Dosen pembimbing tidak ditemukan
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            Tidak ada dosen pembimbing yang cocok dengan pencarian &quot;{searchQuery}&quot; atau kriteria filter saat ini. Coba sesuaikan status verifikasi atau atur ulang semua filter.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Atur Ulang Semua Filter
          </button>
        </div>
      )}
    </div>
  );
}

export default function SupervisorDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-slate-500 text-sm">
          Memuat Direktori Dosen Pembimbing...
        </div>
      }
    >
      <SupervisorDirectoryContent />
    </Suspense>
  );
}
