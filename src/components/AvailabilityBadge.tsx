import { AvailabilityStatus, QuotaInfo } from '@/types/supervisor';

interface AvailabilityBadgeProps {
  status: AvailabilityStatus;
  quota?: QuotaInfo;
  compact?: boolean;
}

export default function AvailabilityBadge({
  status,
  quota,
  compact = false,
}: AvailabilityBadgeProps) {
  const configs = {
    open: {
      label: 'Open for Supervisees',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
      dotClass: 'bg-emerald-500',
    },
    limited: {
      label: 'Limited Slots',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
      dotClass: 'bg-amber-500',
    },
    full: {
      label: 'Quota Full',
      badgeClass: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
      dotClass: 'bg-red-500',
    },
    'on-sabbatical': {
      label: 'On Sabbatical / Leave',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      dotClass: 'bg-slate-400',
    },
  };

  const config = configs[status];

  return (
    <div className="inline-flex items-center space-x-1.5">
      <span
        className={`inline-flex items-center rounded-md border text-xs px-2.5 py-1 font-medium ${config.badgeClass}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.dotClass}`} />
        <span>{config.label}</span>
        {quota && quota.total > 0 && !compact && (
          <span className="ml-1.5 pl-1.5 border-l border-current opacity-80 font-mono text-[11px]">
            {quota.remaining} left ({quota.filled}/{quota.total})
          </span>
        )}
      </span>
    </div>
  );
}
