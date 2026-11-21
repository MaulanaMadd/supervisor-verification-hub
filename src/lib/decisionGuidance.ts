import { Supervisor } from '@/types/supervisor';

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

  // 1. Verification & freshness facts
  if (supervisor.verificationStatus === 'verified') {
    factualObservations.push(
      `Officially verified (${verifiedScopeCount}/${totalScopeCount} scope dimensions verified; updated ${supervisor.freshness.daysAgo} days ago).`
    );
  } else {
    factualObservations.push(
      `Verification is "${supervisor.verificationStatusLabel}" (${verifiedScopeCount}/${totalScopeCount} scope dimensions verified; updated ${supervisor.freshness.daysAgo} days ago).`
    );
  }

  // 2. Availability & quota facts
  if (supervisor.availabilityStatus === 'on-sabbatical') {
    factualObservations.push(
      `Currently on sabbatical/leave (${supervisor.availabilityLabel}).`
    );
  } else if (supervisor.availabilityStatus === 'full') {
    factualObservations.push(
      `Quota is currently full (${supervisor.quota.filled}/${supervisor.quota.total} filled; ${supervisor.availabilityLabel}).`
    );
  } else if (supervisor.availabilityStatus === 'limited') {
    factualObservations.push(
      `Limited advising capacity (${supervisor.quota.remaining} of ${supervisor.quota.total} slot remaining).`
    );
  } else {
    const quotaCaveat =
      quotaScopeItem && !quotaScopeItem.isVerified
        ? ' — note: quota slot count is not yet centrally verified'
        : '';
    factualObservations.push(
      `Advising availability reported as open (${supervisor.quota.remaining} of ${supervisor.quota.total} slots remaining${quotaCaveat}).`
    );
  }

  // 3. Methodologies count fact
  if (supervisor.methodologies.length > 0) {
    factualObservations.push(
      `Documented methodologies include ${supervisor.methodologies.slice(0, 2).join(' and ')}.`
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
      label: 'Explore Alternative Supervisors',
      rationale:
        'Because this supervisor is currently on sabbatical with 0 open slots, avoid submitting a primary proposal this semester and explore active faculty in related research fields.',
      href: exploreHref,
      ctaLabel: 'Browse Related Supervisors',
      tone: 'slate',
    };
  } else if (supervisor.recommendedAction.actionType === 'co-supervisor-required') {
    suggestedAction = {
      label: 'Check Quota Expansion & Co-Supervisor Option',
      rationale:
        'Standard advising capacity is full (0 remaining) with an expansion pending senate review. Review co-supervisor guidance before preparing a formal submission.',
      href: detailHref,
      ctaLabel: 'Open Co-Supervisor Guidance',
      tone: 'amber',
    };
  } else if (
    supervisor.verificationStatus === 'needs-update' ||
    supervisor.verificationStatus === 'pending'
  ) {
    suggestedAction = {
      label: 'Verify Current Status Before Contacting',
      rationale: `Profile verification is "${supervisor.verificationStatusLabel}". Confirm current advising availability directly before committing to a full proposal.`,
      href: detailHref,
      ctaLabel: 'Review Verification Details',
      tone: 'rose',
    };
  } else if (
    supervisor.verificationStatus === 'self-reported' ||
    (quotaScopeItem && !quotaScopeItem.isVerified)
  ) {
    suggestedAction = {
      label: 'Send Inquiry Email & Confirm Slot Status',
      rationale:
        'Advising availability appears open, but quota information is self-reported and not yet centrally verified. Send a brief inquiry to confirm remaining slots first.',
      href: detailHref,
      ctaLabel: 'Open Email Inquiry Hub',
      tone: 'amber',
    };
  } else if (supervisor.recommendedAction.actionType === 'office-visit') {
    suggestedAction = {
      label: 'Schedule / Prepare Office Consultation',
      rationale: `Profile is officially verified with ${supervisor.quota.remaining} open slot(s). Use the consultation planner to prepare your outline before attending office hours.`,
      href: detailHref,
      ctaLabel: 'Open Consultation Planner',
      tone: 'indigo',
    };
  } else if (
    supervisor.recommendedAction.actionType === 'draft-proposal' &&
    supervisor.availabilityStatus === 'limited'
  ) {
    suggestedAction = {
      label: 'Prepare Pre-Proposal & Contact Soon',
      rationale: `Profile is officially verified, but only ${supervisor.quota.remaining} slot remains. Prepare your pre-proposal draft promptly to avoid missing capacity.`,
      href: detailHref,
      ctaLabel: 'Open Proposal Draft Hub',
      tone: 'emerald',
    };
  } else {
    suggestedAction = {
      label: 'Prepare Inquiry & Contact Supervisor',
      rationale:
        'Profile information is verified and advising capacity is available. Use the Action Execution Hub on the profile page to draft your outreach.',
      href: detailHref,
      ctaLabel: 'Open Action Execution Hub',
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
      `Open: ${openList.map((s) => `${s.name} (${s.quota.remaining} left)`).join(', ')}`
    );
  }
  if (limitedList.length > 0) {
    availabilityParts.push(
      `Limited: ${limitedList.map((s) => `${s.name} (${s.availabilityLabel})`).join(', ')}`
    );
  }
  if (unavailableList.length > 0) {
    availabilityParts.push(
      `Unavailable/Full: ${unavailableList.map((s) => `${s.name} (${s.availabilityLabel})`).join(', ')}`
    );
  }
  if (availabilityParts.length > 0) {
    insights.push({
      category: 'factual',
      title: 'Advising Availability Contrast',
      detail: availabilityParts.join('. ') + '.',
    });
  }

  // 2. Verification & Information Completeness (Factual)
  const verifiedList = supervisors.filter((s) => s.verificationStatus === 'verified');
  const unverifiedList = supervisors.filter((s) => s.verificationStatus !== 'verified');
  if (verifiedList.length > 0 && unverifiedList.length > 0) {
    insights.push({
      category: 'factual',
      title: 'Verification Reliability Difference',
      detail: `${verifiedList.map((s) => s.name).join(', ')} ${verifiedList.length === 1 ? 'is' : 'are'} Officially Verified, whereas ${unverifiedList.map((s) => `${s.name} (${s.verificationStatusLabel})`).join(', ')} ${unverifiedList.length === 1 ? 'has' : 'have'} incomplete or unratified verification.`,
    });
  } else if (verifiedList.length === supervisors.length) {
    insights.push({
      category: 'factual',
      title: 'Verification Status',
      detail: 'All compared supervisors are Officially Verified with institutional records.',
    });
  } else {
    insights.push({
      category: 'consideration',
      title: 'Verification Caution',
      detail: `None of the compared profiles are Officially Verified (${supervisors.map((s) => `${s.name}: ${s.verificationStatusLabel}`).join('; ')}). Confirm slot availability directly before submitting.`,
    });
  }

  // 3. Research Field & Methodology Overlap (Factual)
  const sharedFields = findSharedItems(supervisors.map((s) => s.researchFields));
  const sharedMethods = findSharedItems(supervisors.map((s) => s.methodologies));
  insights.push({
    category: 'factual',
    title: 'Research & Methodology Overlap',
    detail:
      sharedFields.size > 0 || sharedMethods.size > 0
        ? [
            sharedFields.size > 0
              ? `Shared research fields: ${Array.from(sharedFields).join(', ')}`
              : 'Distinct research fields across candidates',
            sharedMethods.size > 0
              ? `Shared methodologies: ${Array.from(sharedMethods).join(', ')}`
              : null,
          ]
            .filter(Boolean)
            .join('. ') + '.'
        : 'No overlapping research field tags or methodologies—each supervisor covers a distinct specialization.',
  });

  // 4. Special Conditions / Action Considerations (Advisory)
  const considerations: string[] = [];
  for (const s of supervisors) {
    if (s.availabilityStatus === 'on-sabbatical' || s.recommendedAction.actionType === 'waitlist') {
      considerations.push(
        `${s.name} is on sabbatical (consider exploring active alternatives).`
      );
    } else if (s.recommendedAction.actionType === 'co-supervisor-required') {
      considerations.push(
        `${s.name} may require a co-supervisor or senate quota expansion approval.`
      );
    } else if (s.availabilityStatus === 'limited') {
      considerations.push(
        `${s.name} has limited remaining capacity (${s.quota.remaining} slot)—consider contacting promptly if their topic fits.`
      );
    } else if (s.verificationStatus === 'self-reported') {
      considerations.push(
        `${s.name} reports open slots, but quota data is self-reported—verify availability when emailing.`
      );
    }
  }
  if (considerations.length > 0) {
    insights.push({
      category: 'consideration',
      title: 'Decision Considerations',
      detail: considerations.join(' '),
    });
  }

  return insights;
}
