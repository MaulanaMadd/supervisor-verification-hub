import { Supervisor } from '@/types/supervisor';
import { AVAILABILITY_LABELS_ID, VERIFICATION_LABELS_ID } from '@/lib/i18n';

export type GuidanceTone = 'emerald' | 'indigo' | 'amber' | 'rose' | 'slate';

export interface SuggestedNextAction {
  label: string;
  rationale: string;
  href: string;
  ctaLabel: string;
  tone: GuidanceTone;
}

export interface CandidateGuidance {
  factualObservations: string[];
  suggestedAction: SuggestedNextAction;
}

export interface ComparisonInsight {
  category: 'factual' | 'consideration';
  title: string;
  detail: string;
}

/**
 * Pure, transparent, rule-based decision guidance derived strictly from
 * verified/recorded fields in the Supervisor data model.
 * Produces zero fabricated scores, percentages, rankings, or AI claims.
 */
export function evaluateCandidateGuidance(supervisor: Supervisor): CandidateGuidance {
  const factualObservations: string[] = [];

  const verifiedScopeCount = supervisor.verificationScope.filter((s) => s.isVerified).length;
  const totalScopeCount = supervisor.verificationScope.length;
  const quotaScopeItem = supervisor.verificationScope.find((s) => s.id === 'scope-quota');
  const verificationLabel = VERIFICATION_LABELS_ID[supervisor.verificationStatus];

  // 1. Verification & freshness facts
  if (supervisor.verificationStatus === 'verified') {
    factualObservations.push(
      `Terverifikasi resmi (${verifiedScopeCount}/${totalScopeCount} dimensi terverifikasi; diperbarui ${supervisor.freshness.daysAgo} hari lalu).`
    );
  } else {
    factualObservations.push(
      `Status verifikasi "${verificationLabel}" (${verifiedScopeCount}/${totalScopeCount} dimensi terverifikasi; diperbarui ${supervisor.freshness.daysAgo} hari lalu).`
    );
  }

  // 2. Availability & quota facts
  if (supervisor.availabilityStatus === 'on-sabbatical') {
    factualObservations.push(
      `Sedang cuti akademik (${AVAILABILITY_LABELS_ID[supervisor.availabilityStatus]}).`
    );
  } else if (supervisor.availabilityStatus === 'full') {
    factualObservations.push(
      `Kuota saat ini penuh (${supervisor.quota.filled} dari ${supervisor.quota.total} terisi).`
    );
  } else if (supervisor.availabilityStatus === 'limited') {
    factualObservations.push(
      `Ketersediaan terbatas (sisa ${supervisor.quota.remaining} dari ${supervisor.quota.total} kuota).`
    );
  } else {
    const quotaCaveat =
      quotaScopeItem && !quotaScopeItem.isVerified
        ? ' — catatan: jumlah sisa kuota belum terverifikasi di tingkat departemen'
        : '';
    factualObservations.push(
      `Ketersediaan dilaporkan terbuka (sisa ${supervisor.quota.remaining} dari ${supervisor.quota.total} kuota${quotaCaveat}).`
    );
  }

  // 3. Methodologies count fact
  if (supervisor.methodologies.length > 0) {
    factualObservations.push(
      `Metodologi yang digunakan meliputi ${supervisor.methodologies.slice(0, 2).join(' dan ')}.`
    );
  }

  // 4. Transparent rule-based advisory next action
  const detailHref = `/supervisors/${supervisor.id}`;
  const primaryField = supervisor.researchFields[0];
  const exploreHref = primaryField ? `/?field=${encodeURIComponent(primaryField)}` : '/';

  let suggestedAction: SuggestedNextAction;

  if (
    supervisor.availabilityStatus === 'on-sabbatical' ||
    supervisor.recommendedAction.actionType === 'waitlist'
  ) {
    suggestedAction = {
      label: 'Cari Dosen Pembimbing Alternatif',
      rationale:
        'Dosen sedang menjalani cuti akademik dengan 0 kuota tersedia. Hindari mengajukan proposal utama pada semester ini dan jelajahi dosen aktif di bidang penelitian terkait.',
      href: exploreHref,
      ctaLabel: 'Jelajahi Dosen Alternatif',
      tone: 'slate',
    };
  } else if (supervisor.recommendedAction.actionType === 'co-supervisor-required') {
    suggestedAction = {
      label: 'Cek Penambahan Kuota & Skema Co-Supervisor',
      rationale:
        'Kuota reguler saat ini penuh (sisa 0 kuota) dengan usulan penambahan kuota yang masih menunggu persetujuan senat. Tinjau panduan co-supervisor sebelum mengajukan proposal.',
      href: detailHref,
      ctaLabel: 'Buka Panduan Co-Supervisor',
      tone: 'amber',
    };
  } else if (
    supervisor.verificationStatus === 'needs-update' ||
    supervisor.verificationStatus === 'pending'
  ) {
    suggestedAction = {
      label: 'Verifikasi Status Sebelum Menghubungi',
      rationale: `Status verifikasi profil masih "${verificationLabel}". Konfirmasikan ketersediaan bimbingan secara langsung sebelum menyusun proposal lengkap.`,
      href: detailHref,
      ctaLabel: 'Tinjau Detail Verifikasi',
      tone: 'rose',
    };
  } else if (
    supervisor.verificationStatus === 'self-reported' ||
    (quotaScopeItem && !quotaScopeItem.isVerified)
  ) {
    suggestedAction = {
      label: 'Kirim Email Pertanyaan & Konfirmasi Kuota',
      rationale:
        'Ketersediaan tampak terbuka, namun informasi kuota berasal dari laporan mandiri dan belum terverifikasi pusat. Kirimkan email singkat untuk memastikan sisa kuota terlebih dahulu.',
      href: detailHref,
      ctaLabel: 'Buka Pembuat Draf Email',
      tone: 'amber',
    };
  } else if (supervisor.recommendedAction.actionType === 'office-visit') {
    suggestedAction = {
      label: 'Jadwalkan / Siapkan Konsultasi Tatap Muka',
      rationale: `Profil telah terverifikasi resmi dengan sisa ${supervisor.quota.remaining} kuota. Gunakan perencana konsultasi untuk menyiapkan ringkasan topik sebelum menemui dosen pada jam kantor.`,
      href: detailHref,
      ctaLabel: 'Buka Perencana Konsultasi',
      tone: 'indigo',
    };
  } else if (
    supervisor.recommendedAction.actionType === 'draft-proposal' &&
    supervisor.availabilityStatus === 'limited'
  ) {
    suggestedAction = {
      label: 'Siapkan Draf Pre-Proposal & Segera Hubungi',
      rationale: `Profil telah terverifikasi resmi, namun hanya tersisa ${supervisor.quota.remaining} kuota. Siapkan draf pre-proposal lebih awal agar tidak kehabisan kuota bimbingan.`,
      href: detailHref,
      ctaLabel: 'Buka Pembuat Draf Pre-Proposal',
      tone: 'emerald',
    };
  } else {
    suggestedAction = {
      label: 'Siapkan Pengajuan & Hubungi Dosen',
      rationale:
        'Informasi profil telah terverifikasi dan kuota bimbingan tersedia. Gunakan Pusat Tindak Lanjut pada halaman profil untuk menyusun komunikasi resmi.',
      href: detailHref,
      ctaLabel: 'Buka Pusat Tindak Lanjut',
      tone: 'emerald',
    };
  }

  return {
    factualObservations,
    suggestedAction,
  };
}

export function findSharedItems(lists: string[][]): Set<string> {
  const counts = new Map<string, number>();
  for (const list of lists) {
    for (const item of new Set(list)) {
      counts.set(item, (counts.get(item) || 0) + 1);
    }
  }
  const shared = new Set<string>();
  for (const [item, count] of counts.entries()) {
    if (count >= 2) shared.add(item);
  }
  return shared;
}

export function generateComparisonInsights(supervisors: Supervisor[]): ComparisonInsight[] {
  const insights: ComparisonInsight[] = [];

  // 1. Availability & Quota Contrast (Factual)
  const openList = supervisors.filter((s) => s.availabilityStatus === 'open');
  const limitedList = supervisors.filter((s) => s.availabilityStatus === 'limited');
  const unavailableList = supervisors.filter(
    (s) => s.availabilityStatus === 'full' || s.availabilityStatus === 'on-sabbatical'
  );

  const availabilityParts: string[] = [];
  if (openList.length > 0) {
    availabilityParts.push(
      `Tersedia: ${openList.map((s) => `${s.name} (sisa ${s.quota.remaining} kuota)`).join(', ')}`
    );
  }
  if (limitedList.length > 0) {
    availabilityParts.push(
      `Terbatas: ${limitedList.map((s) => `${s.name} (sisa ${s.quota.remaining} dari ${s.quota.total} kuota)`).join(', ')}`
    );
  }
  if (unavailableList.length > 0) {
    availabilityParts.push(
      `Penuh/Cuti: ${unavailableList.map((s) => `${s.name} (${AVAILABILITY_LABELS_ID[s.availabilityStatus]})`).join(', ')}`
    );
  }
  if (availabilityParts.length > 0) {
    insights.push({
      category: 'factual',
      title: 'Perbandingan Ketersediaan Bimbingan',
      detail: availabilityParts.join('. ') + '.',
    });
  }

  // 2. Verification & Information Completeness (Factual)
  const verifiedList = supervisors.filter((s) => s.verificationStatus === 'verified');
  const unverifiedList = supervisors.filter((s) => s.verificationStatus !== 'verified');
  if (verifiedList.length > 0 && unverifiedList.length > 0) {
    insights.push({
      category: 'factual',
      title: 'Perbedaan Status Verifikasi',
      detail: `${verifiedList.map((s) => s.name).join(', ')} telah Terverifikasi Resmi, sedangkan ${unverifiedList.map((s) => `${s.name} (${VERIFICATION_LABELS_ID[s.verificationStatus]})`).join(', ')} masih memerlukan konfirmasi langsung atas data terbaru.`,
    });
  } else if (verifiedList.length === supervisors.length) {
    insights.push({
      category: 'factual',
      title: 'Status Verifikasi',
      detail: 'Seluruh dosen pembimbing yang dibandingkan berstatus Terverifikasi Resmi.',
    });
  } else {
    insights.push({
      category: 'consideration',
      title: 'Perhatian Verifikasi',
      detail: `Belum ada profil yang berstatus Terverifikasi Resmi (${supervisors.map((s) => `${s.name}: ${VERIFICATION_LABELS_ID[s.verificationStatus]}`).join('; ')}). Konfirmasikan sisa kuota secara langsung sebelum mengajukan proposal.`,
    });
  }

  // 3. Research Field & Methodology Overlap (Factual)
  const sharedFields = findSharedItems(supervisors.map((s) => s.researchFields));
  const sharedMethods = findSharedItems(supervisors.map((s) => s.methodologies));
  insights.push({
    category: 'factual',
    title: 'Kesamaan Bidang Penelitian & Metodologi',
    detail:
      sharedFields.size > 0 || sharedMethods.size > 0
        ? [
            sharedFields.size > 0
              ? `Bidang penelitian yang sama: ${Array.from(sharedFields).join(', ')}`
              : 'Bidang penelitian antar kandidat berbeda',
            sharedMethods.size > 0
              ? `Metodologi yang sama: ${Array.from(sharedMethods).join(', ')}`
              : null,
          ]
            .filter(Boolean)
            .join('. ') + '.'
        : 'Tidak ada irisan bidang penelitian atau metodologi yang identik—setiap dosen memiliki spesialisasi riset yang berbeda.',
  });

  // 4. Special Conditions / Action Considerations (Advisory)
  const considerations: string[] = [];
  for (const s of supervisors) {
    if (s.availabilityStatus === 'on-sabbatical' || s.recommendedAction.actionType === 'waitlist') {
      considerations.push(
        `${s.name} sedang cuti akademik (disarankan mencari alternatif dosen aktif).`
      );
    } else if (s.recommendedAction.actionType === 'co-supervisor-required') {
      considerations.push(
        `${s.name} kemungkinan memerlukan skema co-supervisor atau persetujuan penambahan kuota senat.`
      );
    } else if (s.availabilityStatus === 'limited') {
      considerations.push(
        `${s.name} memiliki sisa kuota terbatas (sisa ${s.quota.remaining} kuota)—pertimbangkan untuk segera menghubungi jika topik sesuai.`
      );
    } else if (s.verificationStatus === 'self-reported') {
      considerations.push(
        `${s.name} melaporkan kuota tersedia melalui laporan mandiri—konfirmasikan ketersediaan saat mengirim email.`
      );
    }
  }
  if (considerations.length > 0) {
    insights.push({
      category: 'consideration',
      title: 'Hal yang Perlu Dipertimbangkan',
      detail: considerations.join(' '),
    });
  }

  return insights;
}
