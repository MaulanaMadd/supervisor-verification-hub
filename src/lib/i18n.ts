import { AvailabilityStatus, VerificationStatus } from '@/types/supervisor';

export const VERIFICATION_LABELS_ID: Record<VerificationStatus, string> = {
  verified: 'Terverifikasi Resmi',
  'self-reported': 'Laporan Mandiri',
  pending: 'Menunggu Verifikasi',
  'needs-update': 'Perlu Pembaruan',
};

export const AVAILABILITY_LABELS_ID: Record<AvailabilityStatus, string> = {
  open: 'Tersedia',
  limited: 'Ketersediaan Terbatas',
  full: 'Kuota Penuh',
  'on-sabbatical': 'Sedang Cuti Akademik',
};

export function getResearchFieldLabelId(field: string): string {
  if (field === 'All Fields') return 'Semua Bidang Penelitian';
  return field;
}
