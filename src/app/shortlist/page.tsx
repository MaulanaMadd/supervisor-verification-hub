'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_SUPERVISORS } from '@/data/mockSupervisors';
import {
  MAX_COMPARE_COUNT,
  MIN_COMPARE_COUNT,
  useShortlist,
} from '@/context/ShortlistContext';
import SupervisorCard from '@/components/SupervisorCard';
import CandidateDecisionControls from '@/components/CandidateDecisionControls';

export default function ShortlistPage() {
  const router = useRouter();
  const {
    shortlistedIds,
    isHydrated,
    clearShortlist,
    selectedCompareIds,
    isSelectedForCompare,
    toggleCompareSelection,
    clearCompareSelection,
  } = useShortlist();

  const [limitNotice, setLimitNotice] = useState(false);

  const shortlistedSupervisors = useMemo(() => {
    return shortlistedIds
      .map((id) => MOCK_SUPERVISORS.find((sup) => sup.id === id))
      .filter((sup): sup is NonNullable<typeof sup> => Boolean(sup));
  }, [shortlistedIds]);

  const selectedCount = selectedCompareIds.length;
  const canCompare = selectedCount >= MIN_COMPARE_COUNT && selectedCount <= MAX_COMPARE_COUNT;

  const handleToggleCompare = (supervisorId: string) => {
    const result = toggleCompareSelection(supervisorId);
    if (result === 'limit-reached') {
      setLimitNotice(true);
    } else {
      setLimitNotice(false);
    }
  };

  const handleCompareSelected = () => {
    if (!canCompare) return;
    router.push(`/compare?ids=${selectedCompareIds.join(',')}`);
  };

  const handleClearShortlist = () => {
    setLimitNotice(false);
    clearCompareSelection();
    clearShortlist();
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-200 dark:border-blue-800">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span>Daftar Kandidat Tersimpan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Kandidat Pilihan Anda
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Tinjau dan kelola calon dosen pembimbing yang telah Anda simpan dari direktori. Pilih 2
              hingga 3 kandidat pilihan untuk membandingkannya secara berdampingan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kembali ke Beranda</span>
            </Link>

            {isHydrated && shortlistedSupervisors.length > 0 && (
              <button
                type="button"
                onClick={handleClearShortlist}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/70 border border-red-200 dark:border-red-900/60 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Hapus Semua</span>
              </button>
            )}
          </div>
        </div>

        {/* Summary Bar */}
        {isHydrated && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <div>
              Total kandidat pilihan:{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {shortlistedSupervisors.length} dosen pembimbing
              </span>
            </div>
            {shortlistedSupervisors.length > 0 && (
              <span>Klik ikon marka buku pada kartu untuk menghapus dosen dari kandidat pilihan.</span>
            )}
          </div>
        )}
      </div>

      {/* Comparison Selection Bar */}
      {isHydrated && shortlistedSupervisors.length > 0 && (
        <div
          data-testid="compare-selection-bar"
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              <span>Bandingkan Kandidat Pilihan</span>
              <span
                data-testid="compare-selected-count"
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800"
              >
                {selectedCount} / {MAX_COMPARE_COUNT} dipilih
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {shortlistedSupervisors.length < MIN_COMPARE_COUNT
                ? `Simpan minimal ${MIN_COMPARE_COUNT} dosen pembimbing untuk membandingkannya secara berdampingan.`
                : limitNotice
                  ? `Anda dapat membandingkan maksimal ${MAX_COMPARE_COUNT} dosen pembimbing sekaligus. Batalkan satu pilihan sebelum memilih dosen lain.`
                  : selectedCount < MIN_COMPARE_COUNT
                    ? `Pilih minimal ${MIN_COMPARE_COUNT} dosen (maksimal ${MAX_COMPARE_COUNT}) untuk mengaktifkan perbandingan berdampingan.`
                    : selectedCount === MAX_COMPARE_COUNT
                      ? `Maksimal ${MAX_COMPARE_COUNT} dosen telah dipilih. Siap dibandingkan, atau batalkan satu pilihan untuk mengganti.`
                      : `${selectedCount} dosen dipilih. Siap dibandingkan, atau pilih 1 dosen lagi (maksimal ${MAX_COMPARE_COUNT}).`}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setLimitNotice(false);
                  clearCompareSelection();
                }}
                className="px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Batalkan Pilihan
              </button>
            )}
            <button
              type="button"
              data-testid="compare-selected-btn"
              disabled={!canCompare}
              onClick={handleCompareSelected}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                canCompare
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm cursor-pointer'
                  : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <span>Bandingkan Terpilih{selectedCount > 0 ? ` (${selectedCount})` : ''}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isHydrated ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">Memuat daftar kandidat pilihan...</p>
        </div>
      ) : shortlistedSupervisors.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 sm:p-14 text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Daftar kandidat pilihan masih kosong
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
            Anda belum menyimpan calon dosen pembimbing. Jelajahi direktori dosen pembimbing lalu
            klik ikon marka buku pada kartu atau halaman profil dosen untuk menyimpannya di sini.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
          >
            <span>Jelajahi Direktori Dosen</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlistedSupervisors.map((supervisor) => {
            const isSelected = isSelectedForCompare(supervisor.id);
            const isMaxBlocked = !isSelected && selectedCount >= MAX_COMPARE_COUNT;
            return (
              <div
                key={supervisor.id}
                className={`flex flex-col rounded-xl transition-all ${
                  isSelected
                    ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950'
                    : ''
                }`}
              >
                {/* Comparison Selection Strip */}
                <button
                  type="button"
                  data-compare-toggle={supervisor.id}
                  aria-pressed={isSelected}
                  onClick={() => handleToggleCompare(supervisor.id)}
                  className={`mb-2 px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-500'
                      : isMaxBlocked
                        ? 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800/60 dark:text-slate-500 dark:border-slate-800'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:text-blue-700 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:border-blue-700'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected
                          ? 'bg-white text-blue-600 border-white'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span>
                      {isSelected
                        ? 'Dipilih untuk Dibandingkan'
                        : isMaxBlocked
                          ? `Maksimal ${MAX_COMPARE_COUNT} Dipilih`
                          : 'Pilih untuk Dibandingkan'}
                    </span>
                  </span>
                </button>

                <div className="flex-1 flex flex-col [&>div]:flex-1">
                  <SupervisorCard supervisor={supervisor} />
                </div>

                <div className="mt-2">
                  <CandidateDecisionControls
                    supervisorId={supervisor.id}
                    supervisorName={supervisor.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
