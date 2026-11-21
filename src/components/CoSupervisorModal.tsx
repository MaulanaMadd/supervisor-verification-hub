'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Supervisor } from '@/types/supervisor';

interface CoSupervisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  supervisor: Supervisor;
}

export default function CoSupervisorModal({
  isOpen,
  onClose,
  supervisor,
}: CoSupervisorModalProps) {
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  if (!isOpen) return null;

  const primaryField = supervisor.researchFields[0] || 'Sistem Informasi';

  const inquirySubject = `[SVH-Skripsi Co-Supervisor] Konsultasi Skema Pembimbing Pendamping - ${supervisor.name}`;
  const inquiryBody = `Yth. Bapak/Ibu ${supervisor.name},
${supervisor.role} - ${supervisor.department}

Dengan hormat,

Perkenalkan saya [Nama Mahasiswa] (NIM: [NIM]), mahasiswa Program Studi Sistem Informasi.

Berdasarkan informasi direktori SVH, saya memahami bahwa kuota bimbingan utama Bapak/Ibu untuk semester ini telah terisi penuh (${supervisor.quota.filled}/${supervisor.quota.total} mahasiswa) dan saat ini sedang menunggu persetujuan senat untuk penambahan kuota.

Sesuai regulasi departemen, saya bermaksud menjajaki skema bimbingan bersama dengan Dosen Pembimbing Pendamping (Co-Supervisor) untuk topik penelitian yang berkaitan dengan ${supervisor.researchFields.join(' dan ')}.

Saya bermaksud berkonsultasi mengenai:
1. Kesediaan Bapak/Ibu untuk bertindak sebagai Dosen Pembimbing Utama/Pendamping dalam skema kemitraan riset ini.
2. Rekomendasi calon dosen pembimbing pendamping yang memiliki bidang keahlian selaras.
3. Arahan mengenai penyusunan usulan judul sebelum diajukan ke Koordinator Tugas Akhir.

Demikian permohonan ini saya sampaikan. Terima kasih atas arahan dan perhatian Bapak/Ibu.

Hormat saya,

[Nama Mahasiswa]
NIM: [NIM]`;

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(inquiryBody);
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    } catch {
      // Fallback
    }
  };

  const mailtoUrl = `mailto:${supervisor.email}?subject=${encodeURIComponent(inquirySubject)}&body=${encodeURIComponent(inquiryBody)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Panduan Skema Co-Supervisor"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold">Panduan Skema Co-Supervisor</h2>
              <p className="text-xs text-amber-100">
                Konsultasi & Kemitraan Pembimbing: {supervisor.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="Tutup dialog"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Situation explanation banner */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200 space-y-2">
            <div className="font-semibold flex items-center space-x-1.5">
              <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Status Kuota & Regulasi Departemen</span>
            </div>
            <p className="leading-relaxed">
              Kuota reguler {supervisor.name} saat ini <strong>terisi penuh (4/4 mahasiswa)</strong>. Usulan penambahan kuota bimbingan sedang diajukan ke Senat Akademik. Mahasiswa baru dapat dibimbing apabila didampingi oleh <strong>Dosen Pembimbing Pendamping (Co-Supervisor)</strong> yang terdaftar dan memiliki kuota tersedia.
            </p>
          </div>

          {/* Action Steps */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Langkah Pengajuan Skema Co-Supervisor:
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Identifikasi Calon Co-Supervisor</div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Pilih dosen di bidang yang berdekatan ({supervisor.researchFields.join(', ')}) yang masih memiliki slot kuota aktif.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Konsultasi Kesediaan Awal</div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Kirimkan permohonan konsultasi awal kepada {supervisor.name} menggunakan draf template di bawah ini untuk mengonfirmasi kesediaan beliau membimbing dalam format kemitraan.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Pengesahan ke Koordinator Skripsi</div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Setelah kedua calon dosen menyetujui, ajukan form persetujuan co-supervision resmi ke Koordinator Tugas Akhir Program Studi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Template */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Draf Permohonan Konsultasi Co-Supervisor
              </span>
              <button
                type="button"
                onClick={handleCopyTemplate}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copiedTemplate ? '✓ Template Tersalin' : 'Salin Template'}
              </button>
            </div>

            <pre className="p-3 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800 max-h-40">
              {inquiryBody}
            </pre>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/?field=${encodeURIComponent(primaryField)}`}
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Cari Calon Co-Supervisor di {primaryField}</span>
          </Link>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Tutup
            </button>

            <a
              href={mailtoUrl}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md shadow-amber-500/20 flex items-center space-x-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Kirim Email Penjajakan</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
