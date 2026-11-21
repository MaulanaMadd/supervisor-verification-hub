# Supervisor Verification Hub (SVH) — Documentation Index

Welcome to the documentation and evidence package for the **Supervisor Verification Hub (SVH)**, an Information Systems capstone prototype designed to support transparent, structured thesis supervisor evaluation and decision-making.

## Documentation Structure

| Document | Purpose |
| --- | --- |
| [Project Overview](./project-overview.md) | Problem statement, motivation, intended users, objectives, scope, and value proposition |
| [Feature Documentation](./features.md) | Detailed breakdown of every implemented feature across Directory, Detail, Action Execution Hub, Shortlist, Comparison, and Decision Support |
| [User Flow](./user-flow.md) | End-to-end non-linear student workflow with Mermaid flow diagram |
| [Technical Architecture](./technical-architecture.md) | Actual tech stack, directory layout, routing, state management, `localStorage` persistence, and rule-based decision engine |
| [Data & Transparency](./data-and-limitations.md) | Data provenance, mock dataset disclosure, verification semantics, and known prototype limitations |
| [Testing & QA](./testing-and-qa.md) | Actual test suites, results (38/38 Full System QA), lint/typecheck verification, and build limitation |
| [Visual Evidence Index](./evidence/screenshots/) | 18 genuine desktop and mobile application screenshots captured from the live running app |

## Visual Evidence Inventory (`docs/evidence/screenshots/`)

| # | Screenshot | Viewport |
| :-: | --- | --- |
| 01 | `01-dashboard.png` — Supervisor Directory Dashboard | Desktop (`1280×900`) |
| 02 | `02-search-results.png` — Live Search Results (`TOGAF`) | Desktop (`1280×900`) |
| 03 | `03-filtered-directory.png` — Filtered Directory (`Officially Verified`) | Desktop (`1280×900`) |
| 04 | `04-supervisor-detail.png` — Supervisor Detail Page Header | Desktop (`1280×900`) |
| 05 | `05-supervisor-verification-info.png` — Verification Scope, Sources & Freshness | Desktop (`1280×900`) |
| 06 | `06-action-execution-hub.png` — Action Execution Hub & Prerequisites | Desktop (`1280×900`) |
| 07 | `07-inquiry-email-draft.png` — Pre-Proposal / Inquiry Email Draft Modal | Desktop (`1280×900`) |
| 08 | `08-consultation-planner.png` — Office Consultation Preparation Planner Modal | Desktop (`1280×900`) |
| 09 | `09-shortlist-populated.png` — Populated Shortlist Page | Desktop (`1280×900`) |
| 10 | `10-shortlist-empty-state.png` — Empty Shortlist State | Desktop (`1280×900`) |
| 11 | `11-comparison-2-candidates.png` — Side-by-Side Comparison (2 Candidates) | Desktop (`1280×900`, full page) |
| 12 | `12-comparison-3-candidates.png` — Side-by-Side Comparison (3 Candidates) | Desktop (`1280×900`, full page) |
| 13 | `13-decision-status.png` — Candidate Decision Status Controls | Desktop (`1280×900`) |
| 14 | `14-decision-notes.png` — Expandable Personal Decision Notes Editor | Desktop (`1280×900`) |
| 15 | `15-decision-guidance.png` — Explainable Rule-Based Decision Guidance | Desktop (`1280×900`) |
| 16 | `16-mobile-dashboard.png` — Mobile Dashboard | Mobile (`375×812`) |
| 17 | `17-mobile-supervisor-detail.png` — Mobile Supervisor Detail Page | Mobile (`375×812`) |
| 18 | `18-mobile-comparison.png` — Mobile Stacked Comparison Cards | Mobile (`375×812`, full page) |

## Localized Indonesian UI Evidence (`docs/evidence/screenshots/id/`)

Captured from the production build (`npm start`) on branch `feature/indonesian-localization`:

| # | Screenshot | Viewport |
| :-: | --- | --- |
| 01 | `01-beranda-dashboard.png` — Beranda & Direktori Dosen Pembimbing | Desktop (`1280×900`) |
| 02 | `02-pencarian-filter.png` — Pencarian Langsung & Filter (`TOGAF`) | Desktop (`1280×900`) |
| 03 | `03-detail-dosen.png` — Halaman Profil Verifikasi Dosen | Desktop (`1280×900`) |
| 04 | `04-pusat-tindak-lanjut.png` — Pusat Tindak Lanjut & Prasyarat | Desktop (`1280×900`) |
| 05 | `05-draf-email-pengajuan.png` — Pembuat Draf Pre-Proposal & Email | Desktop (`1280×900`) |
| 06 | `06-perencana-konsultasi.png` — Perencana Konsultasi Tatap Muka | Desktop (`1280×900`) |
| 07 | `07-kandidat-pilihan.png` — Kandidat Pilihan, Status & Catatan | Desktop (`1280×900`) |
| 08 | `08-perbandingan-2-dosen.png` — Perbandingan 2 Dosen Pembimbing | Desktop (`1280×900`, full page) |
| 09 | `09-perbandingan-3-dosen.png` — Perbandingan 3 Dosen Pembimbing | Desktop (`1280×900`, full page) |
| 10 | `10-panduan-keputusan.png` — Perbedaan Utama & Panduan Keputusan (`Fakta` / `Saran`) | Desktop (`1280×900`) |
| 11 | `11-mobile-beranda.png` — Beranda Mobile | Mobile (`375×812`) |
| 12 | `12-mobile-detail-dosen.png` — Profil Dosen Mobile | Mobile (`375×812`) |
| 13 | `13-mobile-perbandingan.png` — Perbandingan Mobile | Mobile (`375×812`, full page) |
