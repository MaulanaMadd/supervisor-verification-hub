'use client';

import { useState, useId } from 'react';
import { Supervisor } from '@/types/supervisor';

interface InquiryEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  supervisor: Supervisor;
  mode?: 'draft-proposal' | 'email-inquiry';
}

export default function InquiryEmailModal({
  isOpen,
  onClose,
  supervisor,
  mode = 'draft-proposal',
}: InquiryEmailModalProps) {
  const nameId = useId();
  const nimId = useId();
  const topicSelectId = useId();
  const customTopicId = useId();
  const methodSelectId = useId();
  const descId = useId();

  // Form states
  const [studentName, setStudentName] = useState('');
  const [studentNim, setStudentNim] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(
    supervisor.thesisFocusAreas[0] || 'Topik Mandiri / Custom Topic'
  );
  const [customTopic, setCustomTopic] = useState('');
  const [selectedMethodology, setSelectedMethodology] = useState(
    supervisor.methodologies[0] || 'Belum ditentukan'
  );
  const [researchDescription, setResearchDescription] = useState('');

  // Copy feedback states
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  if (!isOpen) return null;

  const finalTopic =
    selectedTopic === '__custom__'
      ? customTopic.trim() || '[Topik Penelitian Belum Diisi]'
      : selectedTopic;

  // Recipient email
  const recipientEmail = supervisor.recommendedAction.contactEmail || supervisor.email;

  // Subject strictly following institutional standard:
  // [SVH-Thesis Proposal-2026] Student Name - NIM
  const emailSubject = `[SVH-Thesis Proposal-2026] ${studentName.trim() || 'Nama Mahasiswa'} - ${studentNim.trim() || 'NIM'}`;

  // Supervisor honorific (avoid duplicating "Prof." or mislabeling Associate Professors as full Prof.)
  const honorific = supervisor.name.trim().startsWith('Prof.')
    ? supervisor.name
    : `Bapak/Ibu ${supervisor.name}`;

  // Mode-specific content
  const proposalSpecificContext =
    mode === 'draft-proposal'
      ? `Sebagai bahan pertimbangan awal, saya telah menyusun draf ringkasan pre-proposal (2-3 halaman) yang mencakup latar belakang permasalahan, rumusan masalah, tujuan penelitian, dan rencana metodologi sesuai format departemen.`
      : `Melalui email ini, saya bermaksud untuk berkonsultasi mengenai ketersediaan kuota bimbingan Bapak/Ibu serta keselarasan topik yang saya rencanakan dengan fokus riset laboratorium.`;

  // Body text in polite, professional academic Indonesian
  const emailBody = `Yth. ${honorific},
${supervisor.role} - ${supervisor.department}
${supervisor.faculty}

Dengan hormat,

Perkenalkan, saya:
Nama: ${studentName.trim() || '[Nama Lengkap]'}
NIM: ${studentNim.trim() || '[NIM]'}
Program Studi: Sistem Informasi, Angkatan [Tahun Angkatan]

Menindaklanjuti informasi direktori pada Supervisor Verification Hub (SVH), saya melihat bahwa fokus riset Bapak/Ibu sangat relevan dengan bidang minat tugas akhir/skripsi yang sedang saya kaji, khususnya di bidang ${supervisor.researchFields.join(', ')}.

Saya bermaksud mengajukan rencana penelitian tugas akhir dengan rencana topik:
"${finalTopic}"
${selectedMethodology && selectedMethodology !== 'Belum ditentukan' ? `Rencana Metodologi/Kerangka Kerja: ${selectedMethodology}` : ''}
${researchDescription.trim() ? `\nRingkasan Permasalahan / Motivasi Singkat:\n${researchDescription.trim()}\n` : ''}
${proposalSpecificContext}

Saya telah melakukan evaluasi mandiri terhadap prasyarat akademik yang disyaratkan oleh departemen dan siap untuk mendiskusikan topik ini lebih lanjut.

Apabila Bapak/Ibu berkenan dan memiliki waktu luang, mohon kiranya saya dapat diberikan arahan atau kesempatan konsultasi tatap muka pada jam kerja kantor (${supervisor.officeHours}) atau melalui media yang Bapak/Ibu sarankan.

Demikian permohonan ini saya sampaikan. Atas perhatian, arahan, dan kesediaan waktu Bapak/Ibu, saya mengucapkan terima kasih.

Hormat saya,

${studentName.trim() || '[Nama Lengkap]'}
NIM: ${studentNim.trim() || '[NIM]'}
Program Studi Sistem Informasi`;

  // Copy handlers
  const handleCopySubject = async () => {
    try {
      await navigator.clipboard.writeText(emailSubject);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyBody = async () => {
    try {
      await navigator.clipboard.writeText(emailBody);
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Direct mailto link
  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pembuat Draf Pre-Proposal dan Email Bimbingan"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {mode === 'draft-proposal'
                  ? 'Pembuat Draf Pre-Proposal & Email'
                  : 'Pembuat Draf Email Bimbingan Skripsi'}
              </h2>
              <p className="text-xs text-blue-100">
                Kepada: {supervisor.name} ({recipientEmail})
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

        {/* Content Body: Split into Form & Preview */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Instructions banner */}
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start space-x-2">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="leading-relaxed">
              Lengkapi formulir di bawah ini untuk menghasilkan draf korespondensi akademik yang terstruktur. SVH <strong>tidak mengirim email secara otomatis</strong>. Anda dapat menyalin teks atau membuka aplikasi email resmi Anda.
            </span>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={nameId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nama Lengkap Mahasiswa <span className="text-red-500">*</span>
              </label>
              <input
                id={nameId}
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Contoh: Muhammad Ihsan"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor={nimId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nomor Induk Mahasiswa (NIM) <span className="text-red-500">*</span>
              </label>
              <input
                id={nimId}
                type="text"
                value={studentNim}
                onChange={(e) => setStudentNim(e.target.value)}
                placeholder="Contoh: 1202204123"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={topicSelectId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pilihan Topik Skripsi / Riset Terkait
              </label>
              <select
                id={topicSelectId}
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {supervisor.thesisFocusAreas.map((topic, idx) => (
                  <option key={idx} value={topic}>
                    {topic}
                  </option>
                ))}
                <option value="__custom__">+ Tulis Topik Mandiri / Topik Lainnya</option>
              </select>
            </div>

            {selectedTopic === '__custom__' && (
              <div className="sm:col-span-2">
                <label htmlFor={customTopicId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Judul/Topik Mandiri yang Diajukan
                </label>
                <input
                  id={customTopicId}
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Tuliskan judul atau ide topik spesifik Anda..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label htmlFor={methodSelectId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Metodologi / Kerangka Kerja
              </label>
              <select
                id={methodSelectId}
                value={selectedMethodology}
                onChange={(e) => setSelectedMethodology(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {supervisor.methodologies.map((method, idx) => (
                  <option key={idx} value={method}>
                    {method}
                  </option>
                ))}
                <option value="Belum ditentukan">Belum ditentukan / Terbuka terhadap arahan</option>
              </select>
            </div>

            <div>
              <label htmlFor={descId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Catatan Singkat / Latar Belakang (Opsional)
              </label>
              <input
                id={descId}
                type="text"
                value={researchDescription}
                onChange={(e) => setResearchDescription(e.target.value)}
                placeholder="Contoh: Studi kasus pada UMKM sektor retail di Bandung"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Generated Email Preview Box */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Pratinjau Subjek & Isi Email
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Penerima: {recipientEmail}
              </span>
            </div>

            {/* Subject bar */}
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 shrink-0">Subjek:</span>
              <code className="text-xs font-mono text-blue-700 dark:text-blue-300 flex-1 truncate">
                {emailSubject}
              </code>
              <button
                type="button"
                onClick={handleCopySubject}
                className="px-2 py-1 bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-[11px] font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shrink-0 transition-colors"
              >
                {copiedSubject ? '✓ Tersalin' : 'Salin Subjek'}
              </button>
            </div>

            {/* Body box */}
            <div className="relative">
              <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap border border-slate-800 max-h-64">
                {emailBody}
              </pre>
              <button
                type="button"
                onClick={handleCopyBody}
                className="absolute top-3 right-3 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium shadow transition-colors flex items-center space-x-1"
              >
                {copiedBody ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Salin Isi Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Pastikan Anda telah memeriksa lampiran draf pre-proposal sebelum mengirim.
          </div>

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
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center space-x-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Buka di Aplikasi Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
