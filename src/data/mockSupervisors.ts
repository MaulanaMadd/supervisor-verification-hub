import { Supervisor } from '@/types/supervisor';

export const MOCK_SUPERVISORS: Supervisor[] = [
  {
    id: 'prof-hendra-wijaya',
    name: 'Prof. Dr. Ir. Hendra Wijaya, M.Kom., IPU',
    academicTitle: 'Professor of Information Systems Engineering',
    role: 'Head of Enterprise Systems & Governance Laboratory',
    department: 'Department of Information Systems',
    faculty: 'Faculty of Computer Science and Information Technology',
    email: 'hendra.wijaya@univ-si.ac.id',
    roomLocation: 'Building D, 3rd Floor, Room D-304 (Enterprise Lab)',
    officeHours: 'Tuesdays & Thursdays, 10:00 - 12:30 WIB (By Appointment)',
    avatarInitials: 'HW',
    bio: 'Senior researcher specializing in Enterprise Architecture, IT Governance (COBIT 2019/2026), and digital transformation alignment in banking and public institutions.',
    researchFields: [
      'Enterprise Architecture',
      'IT Governance & COBIT',
      'Digital Transformation Strategy',
      'IS Strategic Planning'
    ],
    thesisFocusAreas: [
      'Enterprise Architecture Blueprint Design using TOGAF standard for Regional Government',
      'IT Capability & Governance Maturity Assessment using COBIT 2019 in Financial Services',
      'Strategic Information Systems Planning (SISP) for State-Owned Enterprises',
      'Enterprise Resource Planning (ERP) Post-Implementation Evaluation'
    ],
    methodologies: [
      'TOGAF ADM Framework',
      'COBIT 2019 Design Guide & PAM',
      'Ward and Peppard SISP Model',
      'Design Science Research (DSR)'
    ],
    verificationStatus: 'verified',
    verificationStatusLabel: 'Officially Verified',
    verificationStatusDescription: 'Verified via the Central Faculty Academic Affairs Senate and Academic Advising Registry. Topics and advising capacity ratified.',
    verificationScope: [
      {
        id: 'scope-topics',
        label: 'Active Research Topics & Focus Areas',
        isVerified: true,
        notes: 'Aligned with active Research Roadmap 2025–2028 of the Enterprise Systems Lab.'
      },
      {
        id: 'scope-quota',
        label: 'Advising Quota & Slot Availability',
        isVerified: true,
        notes: 'Confirmed by Academic Affairs database. 5 of 6 active advising quotas assigned.'
      },
      {
        id: 'scope-guidelines',
        label: 'Prerequisites & Defense Timeline',
        isVerified: true,
        notes: 'Requires completion of Enterprise Architecture and IS Audit courses with minimum grade B.'
      },
      {
        id: 'scope-lab',
        label: 'Lab Membership & Grant Affiliation',
        isVerified: true,
        notes: 'Currently principal investigator on Ministry of Higher Education Collaborative Grant.'
      }
    ],
    informationSources: [
      {
        id: 'src-1',
        title: 'Faculty Academic Advising Registry (SIAKAD)',
        sourceType: 'institutional-portal',
        sourceTypeName: 'Faculty Academic Portal',
        referenceCode: 'SIAKAD-REG-2026-ODD-0412',
        dateRetrieved: '2026-11-14',
        authority: 'Vice Dean for Academic Affairs & Senate Secretariat'
      },
      {
        id: 'src-2',
        title: 'Enterprise Systems Lab Annual Advising Quota Letter',
        sourceType: 'official-registry',
        sourceTypeName: 'Official Department Decree',
        referenceCode: 'SK-DEKAN-FASILKOM-108/2026',
        dateRetrieved: '2026-11-12',
        authority: 'Head of Information Systems Department'
      },
      {
        id: 'src-3',
        title: 'Direct Faculty Coordination Meeting Log',
        sourceType: 'direct-interview',
        sourceTypeName: 'Faculty Verification Meeting',
        dateRetrieved: '2026-11-10',
        authority: 'SVH Academic Audit Team & Prof. Hendra Wijaya'
      }
    ],
    freshness: {
      lastUpdatedDate: '2026-11-14',
      daysAgo: 6,
      category: 'fresh',
      freshnessLabel: 'Updated 6 days ago (Current Semester)'
    },
    availabilityStatus: 'limited',
    availabilityLabel: '1 Slot Remaining (5/6 Filled)',
    quota: {
      total: 6,
      filled: 5,
      remaining: 1,
      semester: 'Odd Semester 2026/2027'
    },
    recommendedAction: {
      headline: 'Submit 1-Page Pre-Proposal Aligned with TOGAF/COBIT 2019',
      actionType: 'draft-proposal',
      actionTypeLabel: 'Prepare Formal Pre-Proposal Draft',
      summary: 'With only 1 slot remaining, Prof. Hendra requires candidates to draft a 1-page pre-proposal highlighting real enterprise case studies before requesting an appointment.',
      actionSteps: [
        'Select a documented case organization (state-owned enterprise or regional agency) with accessible preliminary data.',
        'Format a 1-page concept note covering: Problem Statement, Relevant Framework (TOGAF or COBIT), and Deliverables.',
        'Email the concept note along with your unofficial academic transcript to hendra.wijaya@univ-si.ac.id with subject [SVH-Thesis Proposal-2026] Your Name - NIM.',
        'Request an in-person slot during Tuesday office hours (Building D-304).'
      ],
      prerequisites: [
        'Completed Enterprise Architecture (IS-401) with grade B or higher',
        'Completed IS Governance & Audit (IS-405) with grade B or higher',
        'Signed preliminary letter of study access from the target organization'
      ],
      contactEmail: 'hendra.wijaya@univ-si.ac.id',
      preferredOfficeHours: 'Tuesdays & Thursdays, 10:00 - 12:30 WIB'
    }
  },
  {
    id: 'dr-ratna-indah-pramesti',
    name: 'Dr. Ratna Indah Pramesti, S.Kom., M.T., Ph.D.',
    academicTitle: 'Associate Professor in Data Intelligence & Analytics',
    role: 'Lead Researcher, Data Intelligence & Process Mining Research Group',
    department: 'Department of Information Systems',
    faculty: 'Faculty of Computer Science and Information Technology',
    email: 'ratna.pramesti@univ-si.ac.id',
    roomLocation: 'Building D, 4th Floor, Room D-412 (Data Intelligence Lab)',
    officeHours: 'Wednesdays & Fridays, 13:00 - 15:30 WIB',
    avatarInitials: 'RP',
    bio: 'Expert in applied Business Intelligence, Process Mining on ERP event logs, customer churn predictive analytics, and explainable AI for organizational decision support.',
    researchFields: [
      'Business Intelligence & Big Data',
      'Process Mining & Workflow Analytics',
      'Machine Learning for IS',
      'Predictive Analytics & Decision Support'
    ],
    thesisFocusAreas: [
      'Process Bottleneck Identification in Hospital Information Systems Using Process Mining (ProM / Celonis)',
      'Customer Retention and Churn Prediction Model in Indonesian SaaS Platforms using Explainable AI',
      'Real-Time Executive Dashboard Development for Supply Chain Traceability',
      'Automated Quality Anomaly Detection in Manufacturing ERP Event Logs'
    ],
    methodologies: [
      'CRISP-DM (Cross-Industry Standard Process for Data Mining)',
      'Process Discovery & Conformance Checking (Heuristics Miner, Inductive Miner)',
      'Design Science Research (Peffers et al.)',
      'Supervised Machine Learning & SHAP Interpretability'
    ],
    verificationStatus: 'verified',
    verificationStatusLabel: 'Officially Verified',
    verificationStatusDescription: 'Verified directly with the Data Intelligence Lab registry and Department Academic Advisory Board for the current active semester.',
    verificationScope: [
      {
        id: 'scope-topics',
        label: 'Active Research Topics & Focus Areas',
        isVerified: true,
        notes: 'Covers ongoing funded projects in healthcare workflow mining and e-commerce analytics.'
      },
      {
        id: 'scope-quota',
        label: 'Advising Quota & Slot Availability',
        isVerified: true,
        notes: 'Official quota confirmed: 2 slots filled, 4 open slots for motivated students.'
      },
      {
        id: 'scope-guidelines',
        label: 'Prerequisites & Defense Timeline',
        isVerified: true,
        notes: 'Requires Python/R proficiency and completion of Data Warehousing & Business Analytics.'
      },
      {
        id: 'scope-lab',
        label: 'Lab Membership & Hardware Access',
        isVerified: true,
        notes: 'Advising students receive dedicated workstation access in Room D-412.'
      }
    ],
    informationSources: [
      {
        id: 'src-1',
        title: 'Data Intelligence Lab Advising Capacity Register',
        sourceType: 'institutional-portal',
        sourceTypeName: 'Faculty Academic Portal',
        referenceCode: 'DIL-CAP-2026-B',
        dateRetrieved: '2026-11-18',
        authority: 'Data Intelligence Research Group Coordinator'
      },
      {
        id: 'src-2',
        title: 'SINTA & Scopus Active Grant Database',
        sourceType: 'academic-profile',
        sourceTypeName: 'National Research Repository',
        referenceCode: 'SINTA-ID-598214',
        dateRetrieved: '2026-11-15',
        authority: 'Ministry of Education & Culture SINTA Index'
      },
      {
        id: 'src-3',
        title: 'Direct Interview with Dr. Ratna Indah',
        sourceType: 'direct-interview',
        sourceTypeName: 'Faculty Verification Meeting',
        dateRetrieved: '2026-11-18',
        authority: 'SVH Information Verification Officer'
      }
    ],
    freshness: {
      lastUpdatedDate: '2026-11-18',
      daysAgo: 2,
      category: 'fresh',
      freshnessLabel: 'Updated 2 days ago (Very Fresh)'
    },
    availabilityStatus: 'open',
    availabilityLabel: '4 Slots Available (2/6 Filled)',
    quota: {
      total: 6,
      filled: 2,
      remaining: 4,
      semester: 'Odd Semester 2026/2027'
    },
    recommendedAction: {
      headline: 'Prepare Dataset Access Plan & Attend Wednesday Consultation',
      actionType: 'office-visit',
      actionTypeLabel: 'Consultation with Dataset Plan',
      summary: 'Dr. Ratna actively seeks 4 new supervisees. The most critical evaluation factor is student ability to obtain real or simulated event logs/datasets.',
      actionSteps: [
        'Identify your dataset source (e.g., hospital event logs, open BPI challenge data, or partner corporate data).',
        'Draft a 2-page research outline stating: Research Question, Data Schema, and Target Analysis Pipeline (CRISP-DM).',
        'Attend open office consultation on Wednesday at 13:30 WIB in Room D-412 with your printed outline.',
        'If approved, register thesis topic in the university SIAKAD portal within 7 business days.'
      ],
      prerequisites: [
        'Passed Business Analytics (IS-308) with minimum grade B+',
        'Practical programming competence in Python (pandas, scikit-learn, pm4py) or R',
        'Commitment to attend weekly research group seminars on Friday mornings'
      ],
      contactEmail: 'ratna.pramesti@univ-si.ac.id',
      preferredOfficeHours: 'Wednesdays & Fridays, 13:00 - 15:30 WIB'
    }
  },
  {
    id: 'bambang-suryo-nugroho',
    name: 'Bambang Suryo Nugroho, S.T., M.Kom.',
    academicTitle: 'Senior Lecturer in HCI & Digital User Experience',
    role: 'Coordinator of User Experience & Interaction Design Studio',
    department: 'Department of Information Systems',
    faculty: 'Faculty of Computer Science and Information Technology',
    email: 'bambang.suryo@univ-si.ac.id',
    roomLocation: 'Building C, 2nd Floor, Room C-208 (UX Studio)',
    officeHours: 'Mondays & Wednesdays, 09:00 - 11:30 WIB',
    avatarInitials: 'BS',
    bio: 'Specialist in Human-Centered Informatics, usability engineering, accessibility for vulnerable user groups, and mobile health application ergonomics.',
    researchFields: [
      'Human-Computer Interaction (HCI)',
      'UX Research & Usability Engineering',
      'User-Centered Design (UCD)',
      'Health Informatics & Mobile UI/UX'
    ],
    thesisFocusAreas: [
      'Usability Evaluation and Redesign of Public Hospital Patient Registration Apps using System Usability Scale (SUS)',
      'Inclusive Mobile Banking Interface for Elderly Citizens in Tier-2/3 Cities',
      'Gamification Mechanics to Enhance Student Engagement in Blended Learning Systems',
      'Cognitive Load Measurement in Clinical Decision Support System Interfaces'
    ],
    methodologies: [
      'User-Centered Design (ISO 9241-210)',
      'Design Thinking (Stanford d.school)',
      'Heuristic Evaluation & Usability Testing (SUS, UEQ, NASA-TLX)',
      'Mixed-Method HCI Research (Contextual Inquiry + Quantitative Testing)'
    ],
    verificationStatus: 'self-reported',
    verificationStatusLabel: 'Self-Reported Data',
    verificationStatusDescription: 'Information provided directly by lecturer via semester intake questionnaire. Not yet cross-verified by the department academic senate audit.',
    verificationScope: [
      {
        id: 'scope-topics',
        label: 'Active Research Topics & Focus Areas',
        isVerified: true,
        notes: 'Provided directly by lecturer via online intake form on Oct 9, 2026.'
      },
      {
        id: 'scope-quota',
        label: 'Advising Quota & Slot Availability',
        isVerified: false,
        notes: 'Lecturer reports 2 remaining slots; pending central academic office confirmation.'
      },
      {
        id: 'scope-guidelines',
        label: 'Prerequisites & Defense Timeline',
        isVerified: true,
        notes: 'Must submit Figma portfolio or UX case study alongside thesis proposal.'
      },
      {
        id: 'scope-lab',
        label: 'Lab Membership & Facility Access',
        isVerified: false,
        notes: 'UX studio hardware maintenance schedule currently unverified.'
      }
    ],
    informationSources: [
      {
        id: 'src-1',
        title: 'Lecturer Semester Intake Self-Report Form',
        sourceType: 'official-registry',
        sourceTypeName: 'Faculty Self-Report Form',
        referenceCode: 'FORM-INTAKE-2026-BSN',
        dateRetrieved: '2026-10-09',
        authority: 'Self-Reported by Bambang Suryo Nugroho, S.T., M.Kom.'
      },
      {
        id: 'src-2',
        title: 'Google Scholar Academic Citations',
        sourceType: 'academic-profile',
        sourceTypeName: 'Public Scholar Profile',
        dateRetrieved: '2026-10-15',
        authority: 'Google Scholar Metrics (H-index 8)'
      }
    ],
    freshness: {
      lastUpdatedDate: '2026-10-09',
      daysAgo: 42,
      category: 'moderate',
      freshnessLabel: 'Updated 42 days ago (Moderate Freshness)'
    },
    availabilityStatus: 'open',
    availabilityLabel: '2 Slots Reported Available (3/5)',
    quota: {
      total: 5,
      filled: 3,
      remaining: 2,
      semester: 'Odd Semester 2026/2027'
    },
    recommendedAction: {
      headline: 'Send Email with UX Portfolio & Verify Slot Status',
      actionType: 'email-inquiry',
      actionTypeLabel: 'Direct Email Inquiry with Portfolio',
      summary: 'Because quota data is self-reported, verify directly via email whether slots remain before drafting full research instruments.',
      actionSteps: [
        'Prepare a short portfolio or link (Behance/Figma/PDF) showcasing prior UX or UI research coursework.',
        'Draft an email introducing your thesis topic, problem rationale, and target user demographic.',
        'Explicitly inquire if the reported advising slot is still open for the current thesis batch.',
        'Request permission to meet during Monday morning office hours in Room C-208.'
      ],
      prerequisites: [
        'Completed Human-Computer Interaction (IS-210) with grade B or higher',
        'Basic familiarity with Figma or prototyping tools and usability evaluation metrics'
      ],
      contactEmail: 'bambang.suryo@univ-si.ac.id',
      preferredOfficeHours: 'Mondays & Wednesdays, 09:00 - 11:30 WIB'
    }
  },
  {
    id: 'dr-eng-aris-munandar',
    name: 'Dr. Eng. Aris Munandar, S.Kom., M.Eng.',
    academicTitle: 'Associate Professor in Cybersecurity & FinTech Systems',
    role: 'Director of Information Security & Distributed Ledger Center',
    department: 'Department of Information Systems',
    faculty: 'Faculty of Computer Science and Information Technology',
    email: 'aris.munandar@univ-si.ac.id',
    roomLocation: 'Building D, 2nd Floor, Room D-215 (FinTech & Sec Lab)',
    officeHours: 'Thursdays, 14:00 - 16:30 WIB',
    avatarInitials: 'AM',
    bio: 'Researcher focused on Information Security Management Systems (ISO/IEC 27001), decentralized finance protocols, smart contract security auditing, and cloud data protection governance.',
    researchFields: [
      'Information Security Management',
      'FinTech Systems & Blockchain',
      'Cloud Security & Compliance',
      'IT Risk Assessment'
    ],
    thesisFocusAreas: [
      'Information Security Risk Assessment on Open Banking APIs using ISO/IEC 27005 and NIST CSF',
      'Decentralized Identity (DID) Framework for Academic Credential Verification in Universities',
      'Security Vulnerability Analysis of EVM-Compatible Smart Contracts in Decentralized Lending',
      'Zero-Trust Architecture (ZTA) Implementation Model for Public Cloud Healthcare Systems'
    ],
    methodologies: [
      'ISO/IEC 27001 & 27005 Standard Guidelines',
      'NIST Cybersecurity Framework (CSF 2.0)',
      'OCTAVE Allegro Risk Assessment Methodology',
      'Design Science Research (DSR)'
    ],
    verificationStatus: 'pending',
    verificationStatusLabel: 'Pending Faculty Review',
    verificationStatusDescription: 'Verification request submitted by lecturer; currently queued for department senate advising quota adjustment.',
    verificationScope: [
      {
        id: 'scope-topics',
        label: 'Active Research Topics & Focus Areas',
        isVerified: true,
        notes: 'Submitted topics align with active FinTech lab initiatives.'
      },
      {
        id: 'scope-quota',
        label: 'Advising Quota & Slot Availability',
        isVerified: false,
        notes: 'Currently at full capacity (4/4 ratified slots filled). Formal proposal for +2 expansion slots is pending senate review.'
      },
      {
        id: 'scope-guidelines',
        label: 'Prerequisites & Defense Timeline',
        isVerified: false,
        notes: 'Prerequisite verification pending department curriculum harmonization.'
      },
      {
        id: 'scope-lab',
        label: 'Lab Membership & Grant Affiliation',
        isVerified: true,
        notes: 'Lab affiliation verified with Center for FinTech & Distributed Ledgers.'
      }
    ],
    informationSources: [
      {
        id: 'src-1',
        title: 'Department Senate Quota Expansion Proposal',
        sourceType: 'official-registry',
        sourceTypeName: 'Faculty Senate Memo',
        referenceCode: 'MEMO-SENAT-EXP-2026-09',
        dateRetrieved: '2026-11-10',
        authority: 'Head of Information Systems Academic Senate'
      },
      {
        id: 'src-2',
        title: 'Lecturer Verification Update Submission',
        sourceType: 'institutional-portal',
        sourceTypeName: 'Faculty Portal Request',
        referenceCode: 'VERIF-REQ-AM-449',
        dateRetrieved: '2026-11-10',
        authority: 'Faculty Academic System Queue'
      }
    ],
    freshness: {
      lastUpdatedDate: '2026-11-10',
      daysAgo: 10,
      category: 'moderate',
      freshnessLabel: 'Submitted 10 days ago (In Review)'
    },
    availabilityStatus: 'full',
    availabilityLabel: 'Quota Full (4/4) • Expansion Pending Senate Review',
    quota: {
      total: 4,
      filled: 4,
      remaining: 0,
      semester: 'Odd Semester 2026/2027'
    },
    recommendedAction: {
      headline: 'Standard Quota Full; Consult Coordinator on Pending Expansion & Co-Supervisor Option',
      actionType: 'co-supervisor-required',
      actionTypeLabel: 'Identify Secondary Co-Supervisor / Await Expansion',
      summary: 'Dr. Aris is currently at maximum capacity (4/4 slots occupied). A memo requesting 2 expansion slots is pending senate approval; students must prepare a co-supervisor alternative or verify approval status before submitting.',
      actionSteps: [
        'Check with Department Academic Coordinator (Pak Irfan) whether Dr. Aris’s quota expansion has passed.',
        'Identify an eligible co-supervisor with compatible domain interests (e.g., Cloud Infrastructure or Information Systems Auditing).',
        'Prepare a draft title and abstract centered on ISO 27001 or Blockchain architecture.',
        'Attend Thursday office hours (14:00 WIB, Room D-215) to seek provisional guidance pending senate sign-off.'
      ],
      prerequisites: [
        'Completed Information Security & Risk Management (IS-312) with grade B+ or higher',
        'Basic comprehension of network protocols, cloud architecture, or cryptography'
      ],
      contactEmail: 'aris.munandar@univ-si.ac.id',
      preferredOfficeHours: 'Thursdays, 14:00 - 16:30 WIB'
    }
  },
  {
    id: 'dra-nurul-hidayati',
    name: 'Dra. Nurul Hidayati, M.Sc., Ph.D.',
    academicTitle: 'Senior Lecturer in E-Commerce & Technology Adoption',
    role: 'Former Head of E-Business Studies Group',
    department: 'Department of Information Systems',
    faculty: 'Faculty of Computer Science and Information Technology',
    email: 'nurul.hidayati@univ-si.ac.id',
    roomLocation: 'Building D, 3rd Floor, Room D-310 (Currently on Leave)',
    officeHours: 'Unavailable during Sabbatical Period (Semesters 2026/2027)',
    avatarInitials: 'NH',
    bio: 'Researches electronic commerce adoption, consumer behavioral intention in mobile commerce, digital marketing analytics, and information systems educational pedagogy.',
    researchFields: [
      'E-Commerce & Digital Business',
      'Technology Acceptance (TAM / UTAUT)',
      'Digital Consumer Behavior',
      'IS Pedagogy & Education'
    ],
    thesisFocusAreas: [
      'Factors Influencing Gen-Z Quick Commerce Adoption in Metropolitan Areas: An Extended UTAUT-2 Model',
      'Omnichannel Retailing Integration Impact on Customer Brand Loyalty in Retail SMEs',
      'Empirical Analysis of Social Commerce Live-Streaming Purchase Intentions',
      'Adoption of Micro-Learning Systems in Higher Education IS Curricula'
    ],
    methodologies: [
      'Structural Equation Modeling (PLS-SEM with SmartPLS / WarpPLS)',
      'Technology Acceptance Model (TAM & UTAUT-2)',
      'Quantitative Survey Research Design',
      'DeLone & McLean IS Success Model'
    ],
    verificationStatus: 'needs-update',
    verificationStatusLabel: 'Information Stale / Needs Update',
    verificationStatusDescription: 'Last verified in April 2026. The supervisor is currently on overseas research sabbatical fellowship. Advising data requires official renewal.',
    verificationScope: [
      {
        id: 'scope-topics',
        label: 'Active Research Topics & Focus Areas',
        isVerified: false,
        notes: 'Topics reflect 2025/2026 academic catalog; current year sabbatical themes unverified.'
      },
      {
        id: 'scope-quota',
        label: 'Advising Quota & Slot Availability',
        isVerified: false,
        notes: '0 active advising slots open for current semester due to sabbatical status.'
      },
      {
        id: 'scope-guidelines',
        label: 'Prerequisites & Defense Timeline',
        isVerified: false,
        notes: 'Defense schedules cannot be supervised while overseas.'
      },
      {
        id: 'scope-lab',
        label: 'Lab Membership & Affiliation',
        isVerified: true,
        notes: 'Department permanent faculty on approved institutional fellowship.'
      }
    ],
    informationSources: [
      {
        id: 'src-1',
        title: 'Archived Faculty Catalog 2025/2026',
        sourceType: 'official-registry',
        sourceTypeName: 'Archived Academic Catalog',
        referenceCode: 'ARCHIVE-KAT-2025-26',
        dateRetrieved: '2026-04-12',
        authority: 'Dean’s Office Academic Archives'
      },
      {
        id: 'src-2',
        title: 'Dean’s Decree on International Research Fellowship',
        sourceType: 'official-registry',
        sourceTypeName: 'Official Sabbatical Decree',
        referenceCode: 'SK-DEKAN-SABBATICAL-41/2026',
        dateRetrieved: '2026-05-02',
        authority: 'Faculty Human Resources & Senate'
      }
    ],
    freshness: {
      lastUpdatedDate: '2026-04-12',
      daysAgo: 222,
      category: 'stale',
      freshnessLabel: 'Last updated > 7 months ago (Stale)'
    },
    availabilityStatus: 'on-sabbatical',
    availabilityLabel: 'On Sabbatical / Leave (0 Slots)',
    quota: {
      total: 0,
      filled: 0,
      remaining: 0,
      semester: 'Odd Semester 2026/2027'
    },
    recommendedAction: {
      headline: 'Do Not Submit Proposal for Current Semester; Select Alternate Supervisor',
      actionType: 'waitlist',
      actionTypeLabel: 'Select Alternate Supervisor',
      summary: 'Dra. Nurul Hidayati is on overseas sabbatical until Spring 2027 and is not taking new primary thesis supervisees for this semester.',
      actionSteps: [
        'Do not submit a proposal addressed to Dra. Nurul for the current registration batch.',
        'If your topic centers on E-Commerce or UTAUT, consult the Department Head to assign an active faculty supervisor (e.g., Pak Bambang or Dr. Ratna).',
        'Contact the department thesis secretariat if you require a formal co-supervisor exception upon her return.'
      ],
      prerequisites: [
        'N/A - Not accepting new undergraduate thesis supervisees this semester'
      ],
      contactEmail: 'nurul.hidayati@univ-si.ac.id',
      preferredOfficeHours: 'On overseas academic leave'
    }
  }
];

export const RESEARCH_FIELDS: string[] = [
  'All Fields',
  'Enterprise Architecture',
  'IT Governance & COBIT',
  'Business Intelligence & Big Data',
  'Process Mining & Workflow Analytics',
  'Human-Computer Interaction (HCI)',
  'UX Research & Usability Engineering',
  'Information Security Management',
  'FinTech Systems & Blockchain',
  'E-Commerce & Digital Business',
  'Technology Acceptance (TAM / UTAUT)'
];
