# Supervisor Verification Hub (SVH)

> **Information Systems Capstone Project (Q3.04 Foundation)**  
> Department of Information Systems • Academic Advising Transparency Portal

Supervisor Verification Hub (SVH) is a specialized web platform designed to help undergraduate Information Systems students evaluate potential thesis supervisors before submitting academic proposals. Instead of relying on word-of-mouth or outdated faculty directories, SVH provides verifiable data across six critical academic dimensions.

---

## 🌟 Six Core Evaluation Dimensions

1. **Research Fit & Expertise**:
   - Primary research fields (e.g., Enterprise Architecture, Business Intelligence, HCI/UX, FinTech, Information Security).
   - Past thesis topic themes and recommended methodology frameworks (e.g., TOGAF, COBIT 2019, CRISP-DM, UCD, ISO 27001).
2. **Verification Status**:
   - `Officially Verified`: Directly audited and ratified through faculty senate / central academic records.
   - `Self-Reported`: Directly provided by lecturer via intake questionnaire; pending senate audit.
   - `Pending Review`: Verification update submitted; under department review for quota or roadmap adjustments.
   - `Stale / Needs Update`: Information older than active semester policy (e.g., faculty on sabbatical).
3. **Verification Scope**:
   - Detailed checklist of audited dimensions: *Active Research Topics*, *Advising Capacity & Quotas*, *Prerequisites & Guidelines*, and *Lab Affiliation*.
4. **Information Sources & Audit Traceability**:
   - Transparent citations: Academic Advising Portal (SIAKAD), Faculty Senate Decrees, SINTA/Scopus Indexes, and Direct Faculty Verification Interviews.
5. **Information Freshness**:
   - Explicit timestamps and relative freshness ratings (*Fresh < 7 days*, *Moderate < 60 days*, *Stale > 6 months*).
6. **Recommended Next Actions**:
   - Actionable step-by-step guidance for students (e.g., drafting a 1-page pre-proposal, portfolio submission, scheduling specific office consultation hours, or selecting a co-supervisor).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Version Control**: Git
- **Deployment**: Vercel-ready (zero external database / serverless static optimization)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation & Local Run

```bash
# Clone the repository (or navigate to project directory)
cd supervisor-verification-hub

# Install dependencies (already completed in scratch setup)
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Verification

```bash
# Run production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
supervisor-verification-hub/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # University-styled root layout (academic nav & footer)
│   │   ├── page.tsx                  # Supervisor directory with live search & multidimensional filters
│   │   ├── globals.css               # Academic styling & color system
│   │   └── supervisors/
│   │       └── [id]/
│   │           ├── page.tsx          # Comprehensive Supervisor Profile & Verification Details page
│   │           └── not-found.tsx     # Academic 404 state for invalid supervisor IDs
│   ├── components/
│   │   ├── Navbar.tsx                # University branding & intake status header
│   │   ├── SupervisorCard.tsx        # Directory card displaying core fit, status badge & preview
│   │   ├── SearchAndFilterBar.tsx    # Live search (name/field) & verification status filter pills
│   │   ├── VerificationBadge.tsx     # Color-coded verification status badges with icons
│   │   ├── AvailabilityBadge.tsx     # Quota capacity and student availability pill
│   │   ├── FreshnessBadge.tsx        # Relative data freshness indicator
│   │   └── SupervisorDetailView.tsx  # Detailed profile breakdown (scope, sources, actions, fit)
│   ├── data/
│   │   └── mockSupervisors.ts        # 5 realistic Information Systems thesis supervisors
│   └── types/
│       └── supervisor.ts             # Strict TypeScript types for domain entities
├── public/                           # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚢 Deploying to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com):
1. Push this repository to GitHub / GitLab / Bitbucket.
2. In Vercel, click **"Add New Project"** and import the repository.
3. Build Command: `npm run build`
4. Output Directory: `.next`
5. Click **Deploy**.
