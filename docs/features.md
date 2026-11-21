# Feature Documentation

Every feature documented below reflects the actual implemented codebase in `src/`.

---

## 1. Supervisor Directory (`/`)

- **Hero & Academic KPI Summary:** Displays total faculty profiles, officially verified count, open advising slots, and academic period (`Odd 2026/2027`).
- **Supervisor Cards (`SupervisorCard.tsx`):** Show verification status badge, freshness badge, compact availability badge, avatar initials, name (linked to detail page), academic title, office location, bio excerpt, research field tags (with live search keyword highlighting), verification scope snapshot (`X/Y Dimensions Verified`), primary source citation, recommended next action preview, shortlist toggle button, and `"View Verification Profile"` CTA.
- **Live Search (`SearchAndFilterBar.tsx`):** Instant client-side filtering as the user types (no Enter required; Enter does not submit a form or reload the page). Searches across supervisor `name`, `academicTitle`, `researchFields`, `thesisFocusAreas`, `bio`, and `methodologies` (case-insensitive), with a clear button and empty-state reset.
- **Multi-Dimensional Filtering:**
  - **Verification Status Pills:** `All Statuses`, `Officially Verified`, `Self-Reported`, `Pending Review`, `Needs Update`.
  - **Research Field Dropdown:** Filters by curated primary research fields (also syncs with `/?field=...` query parameter when navigating from sabbatical/alternative links).
  - **Advising Availability Dropdown:** `All Advising Statuses`, `Accepting Students Only` (`open`), `Limited Slots` (`limited`), `Quota Full` (`full`), `On Sabbatical` (`on-sabbatical`).
  - **Combined Filtering & Reset:** All filters combine cleanly with live search; `"Reset"` / `"Reset All Filters"` restores the full directory.

---

## 2. Supervisor Detail Page (`/supervisors/[id]`)

- **Profile Header (`SupervisorDetailView.tsx`):** Displays full verification, freshness, and availability/quota badges, profile identity, shortlist toggle button (`Save to Shortlist` / `Shortlisted`), office location, office hours, and institutional email (`mailto:`).
- **Verification Scope & Information Sources:** Side-by-side breakdown showing each audited dimension (`Verified` vs. `Unverified / Self-Reported`) with notes, verification policy description, source citations (title, source type, auditing authority, reference code, retrieval date), and last audit date summary.
- **Research Fit, Thesis Focus Areas & Methodologies:** Displays all research fields, active thesis focus themes, and recommended frameworks/methodologies.
- **Invalid Route Handling (`not-found.tsx`):** Invalid supervisor IDs render a dedicated `"Supervisor Profile Not Found"` page with a direct link back to `/`.

---

## 3. Action Execution Hub (on `/supervisors/[id]`)

Adapts dynamically to each supervisor's `recommendedAction.actionType` and `availabilityStatus`:

- **Pre-Proposal / Inquiry Email Draft Generator (`InquiryEmailModal.tsx`):** Triggered for `draft-proposal` and `email-inquiry` profiles. Accepts student name, NIM, target thesis topic (from supervisor focus areas or custom), methodology, and brief motivation; generates an editable formal Indonesian academic email using the supervisor's context, with copy-subject, copy-body, and `mailto:` handoff.
- **Office Consultation Preparation Planner (`OfficeConsultationModal.tsx`):** Triggered for `office-visit` profiles. Provides an interactive 4-item preparation checklist, copyable room/office-hours summary, and optional attendance confirmation `mailto:` template.
- **Co-Supervisor Guidance (`CoSupervisorModal.tsx`):** Triggered for `co-supervisor-required` profiles (e.g., quota full with pending senate expansion). Explains the co-supervisor pathway without falsely claiming a co-supervisor has been secured, dynamically interpolates current quota (`filled/total`), and offers a copyable consultation template.
- **Sabbatical / Waitlist Guidance:** For `on-sabbatical` or `waitlist` profiles, intentionally omits any contradicting email CTA and provides a direct link to explore alternative supervisors in the same primary research field (`/?field=...`).
- **Interactive Prerequisite Self-Assessment (`InteractivePrerequisites.tsx`):** Lets students check off listed prerequisites for personal readiness tracking, accompanied by an explicit disclaimer that SVH does not validate official transcripts.

---

## 4. Shortlist System (`/shortlist` & Global Navbar)

- **Add / Remove Anywhere:** Bookmark icon toggle on every dashboard/shortlist card (`ShortlistButton.tsx`, `variant="icon"` — stops propagation so it never triggers navigation) and labeled button on every detail page (`variant="button"`).
- **Dynamic Navbar Counter (`Navbar.tsx`):** Live count badge next to the **Shortlist** link updates immediately across all routes.
- **Dedicated Shortlist Page (`/shortlist`):**
  - **Empty State:** Clear explanation and `"Browse Supervisor Directory"` CTA.
  - **Populated State:** Displays total shortlisted count, reuses `SupervisorCard`, supports direct per-card removal, `"Clear All"`, comparison selection, and per-candidate decision status & notes.
- **Persistence:** Stored in browser `localStorage` (`svh-shortlist`) as validated supervisor IDs; resilient to malformed JSON and cross-tab updates.

---

## 5. Side-by-Side Comparison (`/compare`)

- **Selection Rules (on `/shortlist`):** Students can select **2 to 3** currently shortlisted supervisors via per-card selection strips. Selection count (`X / 3 selected`), disabled state (< 2), and clear max-3 notice (> 3) are enforced.
- **Dynamic Resolution (`/compare?ids=...`):** Resolves supervisor records from `MOCK_SUPERVISORS` filtered strictly against active `shortlistedIds`. Unrecognized IDs, non-shortlisted IDs, or missing selections are handled gracefully with inline alerts and recovery CTAs.
- **Aligned Comparison Matrix (`ComparisonView.tsx`):**
  - **Desktop / Tablet (`md+`):** Structured comparison table with sticky left criterion column covering Your Candidate Evaluation (Status & Notes), Verification & Reliability, Advising Availability & Capacity, Academic & Research Profile (highlighting exact shared research fields and methodologies), and Suggested Next Action (Advisory).
  - **Mobile (`< md`):** Stacked, criterion-aligned comparison cards with zero horizontal overflow.
  - Supports `"Remove from Compare"` and `"Unshortlist"` directly from `/compare`.

---

## 6. Decision Support Enhancement

- **Candidate Decision Status (`CandidateDecisionControls.tsx`):** Five statuses per shortlisted supervisor (`Considering` default, `Priority Candidate`, `Contacted`, `Meeting Scheduled`, `Not Pursuing`), editable from both `/shortlist` and `/compare`, persisted in `localStorage` (`svh-decision-statuses`), and cleaned up automatically upon unshortlisting.
- **Personal Decision Notes:** Compact expandable note editor per shortlisted supervisor with collapsed preview, explicit `"Save Note"`, `"Clear"`, and auto-save on blur/collapse, persisted in `localStorage` (`svh-decision-notes`).
- **Explainable Rule-Based Decision Guidance (`src/lib/decisionGuidance.ts`):** Clearly separates **`Fact`** observations (availability contrast, verification reliability gap, exact shared fields/methodologies) from **`Advisory`** considerations and per-candidate Suggested Next Actions with an explicit **"Why:"** rationale and direct link to the corresponding SVH workflow.
