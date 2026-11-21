# Data Provenance, Transparency & Limitations

This document explicitly distinguishes what SVH represents, where data originates, and what the current prototype does **not** claim to do.

---

## 1. Data Provenance Breakdown

| Data Category | Provenance | Details |
| --- | --- | --- |
| Supervisor profiles, research fields, thesis focus areas, methodologies, emails, office hours | **Mock / Sample Data** | Defined statically in `src/data/mockSupervisors.ts` (5 illustrative Information Systems faculty profiles). |
| Verification statuses (`verified`, `self-reported`, `pending`, `needs-update`), verification scope items, institutional reference codes (`SIAKAD-REG-...`, `SK-DEKAN-...`), freshness dates | **Mock / Sample Data** | Simulates an institutional verification audit workflow for capstone demonstration. No real faculty members have been contacted or audited. |
| Advising availability & remaining quota counts | **Mock / Sample Data** | Illustrative capacity figures (`filled`, `remaining`, `total`)—not live or real-time confirmed institutional quota. |
| Shortlist selections, Decision Statuses, Personal Decision Notes, Prerequisite checkboxes | **User-Provided (Local)** | Entered by the student in the browser and stored locally in `localStorage` (`svh-shortlist`, `svh-decision-statuses`, `svh-decision-notes`). |
| Research/methodology overlap, availability contrast, verification gap | **Derived (Factual)** | Computed deterministically from the profile fields in `src/lib/decisionGuidance.ts` and labeled **`Fact`** in `/compare`. |
| Suggested Next Actions & Decision Considerations | **System-Generated Advisory** | Deterministic rule-based recommendations derived from `actionType`, `availabilityStatus`, `verificationStatus`, and `quota`; labeled **`Advisory`** with an explicit **"Why:"** rationale. |

---

## 2. Explicit Non-Claims & Ethical Guardrails

SVH intentionally avoids misleading automation:

- **No live SIAKAD integration:** All faculty records are illustrative demonstration data, disclosed in the global footer (`Demo Dataset • 2026/2027`).
- **No automated rankings or fabricated scores:** SVH does not generate compatibility percentages, match scores, AI confidence scores, or supervisor rankings.
- **No automated transcript validation:** The prerequisite checklist (`InteractivePrerequisites.tsx`) explicitly states that it is a personal self-assessment tool; definitive eligibility is determined by the Academic Affairs office and the supervisor.
- **No automated email sending:** Email/proposal drafts only copy text to the clipboard or open the user's own email client via `mailto:`.

---

## 3. Known Prototype Limitations

1. **Static Mock Dataset:** Replacing `mockSupervisors.ts` with a real university backend/API is required before production deployment.
2. **Fixed Freshness Reference Date:** `freshness.daysAgo` values are stored statically relative to `2026-11-20` rather than computed dynamically against the live calendar date.
3. **Browser-Local Persistence Only:** Shortlist, decision statuses, and personal notes are stored in the user's local browser `localStorage` and do not sync across devices or browsers.
4. **Curated Field Filter Dropdown:** `RESEARCH_FIELDS` exposes 10 primary categories in the dropdown (2 per profile); the remaining 10 secondary field tags are searchable via the live text search input.
5. **Bilingual Interface Mix:** Core navigation, directory, comparison, and decision guidance UI are in English, while Action Execution Hub outreach templates and checklists are in formal academic Indonesian to match local university correspondence conventions.
