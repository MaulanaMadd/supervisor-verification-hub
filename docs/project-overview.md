# Project Overview — Supervisor Verification Hub (SVH)

## 1. Project Identity

- **Project Name:** Supervisor Verification Hub (SVH)
- **Context:** Information Systems Capstone Prototype (Q3.04)
- **Domain:** Academic Advising Transparency & Thesis Supervisor Decision Support

---

## 2. Problem Statement

Undergraduate Information Systems students preparing for their thesis frequently encounter fragmented, outdated, or opaque information when selecting a thesis supervisor:

- **Uncertain research alignment:** Faculty directory pages often list broad departmental titles rather than active thesis themes or preferred research methodologies (e.g., TOGAF ADM, CRISP-DM, ISO 9241-210, ISO/IEC 27001).
- **Unverified or stale advising capacity:** Students often spend weeks drafting proposals for supervisors whose quotas are already full, whose slots are unconfirmed, or who are on academic leave/sabbatical.
- **Unstructured outreach and comparison:** Students rely on informal word-of-mouth rather than comparing candidate trade-offs (availability vs. verification reliability vs. prerequisite requirements) and often send incomplete or generic inquiry emails.

---

## 3. Motivation & Core Value Proposition

SVH transforms thesis supervisor discovery from guesswork into a **transparent, verifiable, step-by-step decision-support workflow**:

1. **Visibility before outreach:** Surfaces verification status, verification scope, source citations, information freshness, and advising availability upfront.
2. **Structured comparison without black-box scores:** Lets students shortlist and compare 2–3 candidates side-by-side with explicit **Fact** vs. **Advisory** guidance—never fabricating compatibility percentages or automated rankings.
3. **Personal evaluation tracking:** Allows students to assign decision statuses and record private decision notes persisted locally in their browser.
4. **Actionable next steps:** Guides students to the right action for each supervisor's actual situation (pre-proposal draft, email inquiry, consultation checklist, co-supervisor guidance, or exploring alternatives).

---

## 4. Intended Users

- **Primary Users:** Undergraduate Information Systems students preparing to select and approach a thesis supervisor.
- **Secondary Audience (Demonstration / Evaluation):** Capstone evaluators, academic advisors, and portfolio reviewers assessing information transparency and decision-support UX.

---

## 5. Objectives & Scope

### In Scope (Implemented)
- Searchable, multi-filter Supervisor Directory (`/`).
- Detailed Supervisor Verification Profiles (`/supervisors/[id]`) with scope checklists, source records, freshness indicators, prerequisites, and adaptive Action Execution Hub modals.
- Persistent Shortlist management (`/shortlist`) with live navbar counter.
- Dynamic Side-by-Side Comparison (`/compare`) for 2–3 shortlisted supervisors.
- Candidate Decision Status (`Considering`, `Priority Candidate`, `Contacted`, `Meeting Scheduled`, `Not Pursuing`), personal Decision Notes, and transparent rule-based Decision Guidance.
- Responsive layouts across desktop (`1280px`), tablet (`768px`), and mobile (`375px`).

### Out of Scope (Current Prototype)
- Live backend database or institutional SIAKAD API integration.
- User authentication, multi-device cloud sync, or official transcript verification.
- Automated email dispatch (email drafts open the user's own email client via `mailto:` or copy to clipboard).
- Automated supervisor ranking, AI scoring, or match percentages.
