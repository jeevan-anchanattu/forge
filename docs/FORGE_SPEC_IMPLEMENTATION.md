# FORGE — Phase-by-Phase Implementation Plan
### AI Agent Development Guide — Frontend-First, Mock-Driven, Modular

**Document Version:** 1.0  
**Based on:** FORGE Spec v2.0  
**Strategy:** Frontend → Mock API → Backend → Integration  
**Principle:** Every phase is independently runnable and demonstrable. No phase breaks a previous phase.

---

## HOW TO USE THIS DOCUMENT

This plan divides the FORGE build into **8 phases**:

- **Phases 1–4:** Pure frontend with MSW mock API. Zero backend required. Fully demonstrable.
- **Phase 5:** Backend foundation (API skeleton, DB, auth). Frontend switches from mock → real for auth/org only.
- **Phases 6–7:** Backend modules built one-by-one. Frontend mock handlers are replaced module-by-module.
- **Phase 8:** AI, agents, integrations, production hardening.

### The Golden Rule: Mock ↔ Spec ↔ Backend Stay in Sync

Every time the UI changes:
1. Update the mock fixture/handler in `src/shared/api/mock/`
2. Update the TypeScript interface in `src/shared/types/`
3. Add a `// SPEC: Section X.X` comment linking back to the spec
4. The backend team (Phase 5+) reads these types/fixtures as their contract — NOT the spec directly

```
FORGE Spec (source of truth)
       │
       ▼
TypeScript Interfaces (src/shared/types/)   ← updated whenever UI changes
       │                    │
       ▼                    ▼
Mock Fixtures          Backend Schemas
(src/shared/api/mock/) (Pydantic models)
       │                    │
       └──── must match ─────┘
```

### How to Give Each Phase to Your AI Agent

Each phase section below includes:
- **Context block** — paste this at the top of your AI agent prompt
- **Exact file list** — what files to create
- **Definition of Done checklist** — how you know the phase is complete
- **What NOT to build** — prevents scope creep

---

## PHASE 0 — Project Scaffolding & Design System
**Duration:** 2–3 days | **Deliverable:** Runnable empty shell with full design system

### Context Block (paste to AI agent)
```
You are building FORGE — a mechanical fabrication management platform.
Tech stack: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion + Zustand + TanStack Query.
Mock API: MSW v2 (Mock Service Worker) — VITE_MOCK_API=true in .env.
This phase builds ONLY the project scaffold, design system tokens, shared components, 
global state shell, and routing skeleton. NO feature logic yet.
Module isolation rule: each feature module in /src/modules/ exposes only its index.ts.
No module imports another module's internals.
```

### 0.1 — Repository & Tooling Setup

**Create these files/configs:**
```
forge-frontend/
├── package.json                    # All dependencies (see list below)
├── vite.config.ts                  # Vite config with path aliases (@/→src/)
├── tsconfig.json                   # Strict TypeScript
├── tailwind.config.ts              # Custom tokens from spec
├── postcss.config.js
├── .env                            # VITE_MOCK_API=true, VITE_MOCK_DELAY_MS=400
├── .env.production                 # VITE_MOCK_API=false
├── .eslintrc.json
├── .prettierrc
└── index.html
```

**Package.json dependencies (exact versions):**
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.0",
    "zustand": "^4.5.4",
    "@tanstack/react-query": "^5.51.0",
    "@tanstack/react-table": "^8.19.3",
    "@tanstack/react-virtual": "^3.8.1",
    "framer-motion": "^11.3.8",
    "animejs": "^3.2.2",
    "three": "^0.166.1",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.109.0",
    "axios": "^1.7.3",
    "lucide-react": "^0.408.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "date-fns": "^3.6.0",
    "react-hook-form": "^7.52.1",
    "zod": "^3.23.8",
    "@hookform/resolvers": "^3.9.0",
    "react-dropzone": "^14.2.3",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "sonner": "^1.5.0",
    "react-day-picker": "^8.10.1",
    "react-pdf": "^7.7.3",
    "pdfjs-dist": "^4.3.136",
    "recharts": "^2.12.7",
    "@tiptap/react": "^2.4.0",
    "@tiptap/starter-kit": "^2.4.0",
    "@tiptap/extension-text-align": "^2.4.0",
    "@tiptap/extension-color": "^2.4.0",
    "@tiptap/extension-highlight": "^2.4.0",
    "@tiptap/extension-link": "^2.4.0",
    "@tiptap/extension-image": "^2.4.0",
    "@tiptap/extension-table": "^2.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.166.0",
    "@types/animejs": "^3.1.12",
    "typescript": "^5.5.3",
    "vite": "^5.3.4",
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^3.4.6",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "msw": "^2.3.1",
    "eslint": "^8.57.0",
    "prettier": "^3.3.3"
  }
}
```

### 0.2 — Tailwind Design System Tokens

**File:** `tailwind.config.ts`

```typescript
// SPEC: Section 2.1 — Color Palette, Section 2.2 — Typography
export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark theme background layers
        'bg-primary':    '#0A0E1A',
        'bg-secondary':  '#0F1629',
        'bg-card':       '#141B2D',
        'surface':       '#1A2440',
        'border-subtle': '#1E2D4A',
        // Accents
        'accent-primary':   '#00D4FF',
        'accent-secondary': '#FF6B35',
        'accent-tertiary':  '#7B2FBE',
        // Semantic
        'success':  '#00E5A0',
        'warning':  '#FFB800',
        'error':    '#FF3B5C',
        // Text
        'text-primary':   '#E8F0FF',
        'text-secondary': '#8B9CC4',
        'text-tertiary':  '#4A5980',
        // Status colors (manufacturing lifecycle)
        'status-planning':        '#4A5980',
        'status-active':          '#00D4FF',
        'status-quotation':       '#FFB800',
        'status-approved':        '#00E5A0',
        'status-plan-started':    '#7B2FBE',
        'status-plan-complete':   '#00D4FF',
        'status-mfg-review':      '#FF6B35',
        'status-mfg-progress':    '#1A6FFF',
        'status-mfg-qa':          '#FFB800',
        'status-mfg-complete':    '#00E5A0',
        'status-mfg-signoff':     '#00C853',
        'status-delivered':       '#00C853',
        'status-feedback':        '#FFD600',
        'status-retrospective':   '#FFD600',
        'status-archived':        '#4A5980',
      },
      fontFamily: {
        primary:  ['Inter', 'system-ui', 'sans-serif'],
        display:  ['Space Grotesk', 'Inter', 'sans-serif'],
        mono:     ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-sm':  '0 0 8px rgba(0,212,255,0.2)',
        'glow':     '0 0 16px rgba(0,212,255,0.3)',
        'glow-lg':  '0 0 32px rgba(0,212,255,0.4)',
        'card':     '0 4px 24px rgba(0,212,255,0.08)',
        'card-hover': '0 4px 32px rgba(0,212,255,0.16)',
      },
      animation: {
        'scan': 'scan 2s linear infinite',
        'pulse-cyan': 'pulse-cyan 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-cyan': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(0,212,255,0.2)' },
          '50%': { boxShadow: '0 0 24px rgba(0,212,255,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
};
```

### 0.3 — Shared Type Definitions

**File:** `src/shared/types/index.ts` — Master type file. All types here. Expand as phases progress.

```typescript
// SPEC: Section 30 — Data Models & Schema

export type Theme = 'dark' | 'light' | 'system';
export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';
export type UnitSystem = 'imperial' | 'metric' | 'both';

// SPEC: Section 7.2 — Role Hierarchy
export type OrgRole = 'super_admin' | 'org_admin' | 'owner' | 'coordinator' | 'contributor' | 'reviewer' | 'reader' | 'shop_floor';

// SPEC: Section 14.3 — Project Status Flow (14 statuses)
export type ProjectStatus =
  | 'planning' | 'active' | 'quotation_review' | 'quotation_approved'
  | 'plan_started' | 'plan_complete' | 'manufacturing_review'
  | 'manufacturing_progress' | 'manufacturing_qa_review'
  | 'manufacturing_complete' | 'manufacturing_signoff'
  | 'delivered' | 'feedback' | 'retrospective' | 'archived';

// SPEC: Section 15.4 — Workbook Status Flow (14 statuses)
export type WorkbookStatus =
  | 'draft' | 'quotation_complete' | 'approved' | 'plan_started'
  | 'plan_complete' | 'design_complete' | 'review_complete'
  | 'manufacturing_review' | 'manufacturing_progress' | 'manufacturing_qa_review'
  | 'manufacturing_complete' | 'manufacturing_signoff' | 'delivered' | 'closed';

export type SectionStatus = 'draft' | 'in_progress' | 'review' | 'complete';
export type TaskStatus = 'planned' | 'in_progress' | 'on_hold' | 'complete' | 'skipped';
export type CommentType = 'question' | 'issue' | 'suggestion' | 'approval' | 'note';
export type CommentStatus = 'open' | 'in_progress' | 'resolved' | 'wont_fix';
export type SpecConfidence = 'high' | 'medium' | 'low';
export type MemoryType = 'decision' | 'clarification' | 'standard_applied' | 'anomaly_noted' | 'user_correction' | 'preference' | 'material_decision' | 'supplier_selected';
export type JobStatus = 'queued' | 'processing' | 'complete' | 'failed';
export type JobType = 'pdf_parse' | 'export_pdf' | 'export_docx' | 'export_xlsx' | 'export_html' | 'ai_extract' | 'ai_summarize' | 'ai_visualize' | 'agent_run';
export type RevisionType = 'minor' | 'major' | 'correction' | 'client_revision';

export interface User {
  id: string;
  orgId: string;
  email: string;
  displayName: string;
  jobTitle?: string;
  department?: string;
  phone?: string;
  avatarUrl?: string;
  orgRole: OrgRole;
  joinedAt: string;
  lastActiveAt?: string;
  isActive: boolean;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: Theme;
  sidebarExpanded: boolean;
  aiPanelWidth: number;
  pdfPanelWidth: number;
  reviewPanelWidth: number;
  defaultUnitSystem: UnitSystem;
  pdfDefaultZoom: number;
  density: 'comfortable' | 'compact' | 'spacious';
  fontSize: 'sm' | 'md' | 'lg';
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  orgColor?: string;
  industry?: string;
  addressJson?: Address;
  contactJson?: OrgContact;
  taxIdsJson?: Record<string, string>;
  brandingJson?: OrgBranding;
  labourRates?: LabourRate[];
  defaultsJson?: OrgDefaults;
  subscriptionTier: SubscriptionTier;
  featureOverrides: Record<string, boolean>;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface OrgContact {
  primaryPhone?: string;
  secondaryPhone?: string;
  primaryEmail?: string;
  website?: string;
}

export interface OrgBranding {
  primaryColor: string;
  secondaryColor: string;
  fontPrimary: string;
}

export interface OrgDefaults {
  currency: string;
  unitSystem: UnitSystem;
  fiscalYearStart: number;
  overheadPct: number;
  profitPct: { labour: number; material: number };
  contingencyPct: number;
  paymentTerms: string;
  quotationValidityDays: number;
  scrapFactor: number;
  defaultStandards: string[];
}

export interface LabourRate {
  trade: string;
  ratePerHour: number;
  currency: string;
  otMultiplier: number;
  notes?: string;
}

export interface OrgMember extends User {
  projectRole?: OrgRole;
  activeProjects?: ProjectSummary[];
  latestMilestone?: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  status: ProjectStatus;
  nextDue?: string;
}

export interface Project {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  internalRef?: string;
  projectType: 'fabrication' | 'assembly' | 'structural' | 'piping' | 'mixed';
  status: ProjectStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  coverImageUrl?: string;
  visual3dUrl?: string;
  visualImages: string[];
  clientName?: string;
  clientJson?: ClientContact[];
  poNumber?: string;
  drawingReference?: string;
  startDate?: string;
  targetDate?: string;
  mfgStartDate?: string;
  deliveryDate?: string;
  currency: string;
  unitSystem: UnitSystem;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
  // Computed/aggregated
  workbookCount?: number;
  openItemsCount?: number;
  completionPct?: number;
  members?: OrgMember[];
  financialSummary?: ProjectFinancialSummary;
}

export interface ClientContact {
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  companyAddress?: Address;
  isPrimary: boolean;
}

export interface ProjectFinancialSummary {
  quotedValue: number;
  materialCommitted: number;
  labourSpent: number;
  remainingBudget: number;
  currency: string;
}

export interface Workbook {
  id: string;
  projectId: string;
  orgId: string;
  name: string;
  description?: string;
  drawingNumber?: string;
  drawingRevision?: string;
  status: WorkbookStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  aiSummary?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  // Aggregated
  sectionCount?: number;
  openCommentsCount?: number;
  revisionCount?: number;
  completionPct?: number;
  activeRevisionId?: string;
}

export interface Section {
  id: string;
  workbookId: string;
  pdfUploadId?: string;
  name: string;
  sectionType?: string;
  pageNumber?: number;
  boundsJson?: { x: number; y: number; width: number; height: number };
  cutoutImageUrl?: string;
  status: SectionStatus;
  assignedTo?: string;
  aiSummary?: string;
  sortOrder: number;
  isManual: boolean;
  anomaliesJson?: Anomaly[];
  createdAt: string;
  updatedAt: string;
}

export interface Anomaly {
  severity: 'critical' | 'warning' | 'info';
  message: string;
  suggestion?: string;
}

export interface SpecItem {
  id: string;
  sectionId: string;
  parameter: string;
  extractedValue?: string;
  verifiedValue?: string;
  unit?: string;
  confidence: SpecConfidence;
  sourceRef?: string;
  standardRef?: string;
  notes?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface BomItem {
  id: string;
  workbookId: string;
  sectionId?: string;
  itemNumber?: string;
  partNumber?: string;
  description: string;
  materialGrade?: string;
  materialSpec?: string;
  quantity: number;
  unit: string;
  unitWeightKg?: number;
  totalWeightKg?: number;
  unitCost?: number;
  totalCost?: number;
  currency?: string;
  supplier?: string;
  supplierPartNo?: string;
  leadTimeDays?: number;
  notes?: string;
  inventoryItemId?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  orgId: string;
  projectId?: string;
  partNumber: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory?: string;
  materialGrade?: string;
  materialSpec?: string;
  manufacturer?: string;
  manufacturerPn?: string;
  dimsJson?: Record<string, number>;
  unitWeightKg?: number;
  surfaceAreaM2?: number;
  unit: string;
  unitCost?: number;
  currency: string;
  lastPurchasePrice?: number;
  lastPurchaseDate?: string;
  suppliersJson?: InventorySupplier[];
  leadTimeDays?: number;
  minOrderQty?: number;
  currentStock?: number;
  minStockLevel?: number;
  stockLocation?: string;
  certRequirements?: { millCert: boolean; coc: boolean; inspectionLevel: string };
  applicableStandards: string[];
  isConsumable: boolean;
  isStandardStock: boolean;
  isActive: boolean;
  notes?: string;
  tags: string[];
  imageUrl?: string;
  datasheetUrl?: string;
  priceHistory?: { price: number; date: string; source: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface InventorySupplier {
  name: string;
  code?: string;
  contact?: string;
  isPreferred: boolean;
}

export interface Quotation {
  id: string;
  workbookId: string;
  projectId: string;
  orgId: string;
  quotationNumber: string;
  quotationType: 'detailed' | 'preliminary' | 'change_order';
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'sent_to_client' | 'client_approved';
  scopeText?: string;
  materialItems: QuotationLineItem[];
  labourItems: QuotationLineItem[];
  subOpsItems: QuotationLineItem[];
  paintItems: QuotationLineItem[];
  freightItems: QuotationLineItem[];
  procurementItems: QuotationLineItem[];
  overheadPct: number;
  profitPct: { labour: number; material: number };
  contingencyPct: number;
  totalsJson?: QuotationTotals;
  exclusionsText?: string;
  termsText?: string;
  validityDays: number;
  currency: string;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationLineItem {
  id: string;
  description: string;
  quantity?: number;
  unit?: string;
  unitCost?: number;
  totalCost: number;
  notes?: string;
}

export interface QuotationTotals {
  material: number;
  labour: number;
  subOps: number;
  paint: number;
  freight: number;
  procurement: number;
  subtotal: number;
  overhead: number;
  profitLabour: number;
  profitMaterial: number;
  contingency: number;
  grandTotal: number;
  currency: string;
}

export interface Revision {
  id: string;
  workbookId: string;
  revisionNumber: string;
  label?: string;
  description: string;
  type: RevisionType;
  snapshotUrl?: string;
  diffJson?: RevisionDiff;
  isActive: boolean;
  isLocked: boolean;
  isArchived: boolean;
  branchFromId?: string;
  createdBy: string;
  createdAt: string;
}

export interface RevisionDiff {
  sectionsChanged: number;
  specItemsModified: number;
  bomItemsAdded: number;
  bomItemsRemoved: number;
  summary: string;
  details: DiffDetail[];
}

export interface DiffDetail {
  type: 'added' | 'removed' | 'changed';
  entityType: string;
  entityName: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
}

export interface Comment {
  id: string;
  sectionId: string;
  parentId?: string;
  authorId: string;
  commentType: CommentType;
  content: string;
  status: CommentStatus;
  specItemId?: string;
  pdfAnnotationRef?: string;
  bomItemId?: string;
  mentions: string[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  replies?: Comment[];
  author?: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
}

export interface ScheduleTask {
  id: string;
  workbookId: string;
  projectId: string;
  taskNumber?: number;
  name: string;
  description?: string;
  trade?: string;
  operationType?: string;
  estimatedHours?: number;
  actualHours?: number;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  actualStart?: string;
  actualEnd?: string;
  dependencies: string[];
  status: TaskStatus;
  notes?: string;
  wpsReference?: string;
  completionPhotos: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  filename: string;
  originalName: string;
  fileUrl: string;
  fileSizeBytes: number;
  mimeType: string;
  category: 'client_doc' | 'internal' | 'photo' | 'certificate' | 'correspondence' | 'reference';
  description?: string;
  version: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  notificationType: string;
  title: string;
  body?: string;
  linkUrl?: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

export interface BackgroundJob {
  id: string;
  jobType: JobType;
  status: JobStatus;
  progress: number;
  progressMessage?: string;
  outputUrl?: string;
  outputExpiresAt?: string;
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

export interface AIContextMemoryPoint {
  id: string;
  memoryType: MemoryType;
  summary: string;
  detail?: string;
  tags: string[];
  source: 'user' | 'ai' | 'system' | 'agent';
  isPinned: boolean;
  createdBy: string;
  createdAt: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta?: { page: number; perPage: number; total: number; totalPages: number };
  errors?: { code: string; message: string; field?: string }[];
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}
```

### 0.4 — Global State (Zustand Slices)

**File structure:**
```
src/shared/store/
  slices/
    authSlice.ts
    orgSlice.ts
    activeContextSlice.ts
    uiSlice.ts
    aiSlice.ts
    notificationSlice.ts
    jobSlice.ts
  index.ts           ← combines all slices
  hooks.ts           ← typed useForgeStore, useAuth, useOrg, useActiveContext, useUI
```

**File:** `src/shared/store/index.ts`
```typescript
// SPEC: Section 5 — Global State Management
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice';
import { createOrgSlice } from './slices/orgSlice';
import { createActiveContextSlice } from './slices/activeContextSlice';
import { createUISlice } from './slices/uiSlice';
import { createAISlice } from './slices/aiSlice';
import { createNotificationSlice } from './slices/notificationSlice';
import { createJobSlice } from './slices/jobSlice';

// Root store — all slices composed
export const useForgeStore = create(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
      ...createOrgSlice(...args),
      ...createActiveContextSlice(...args),
      ...createUISlice(...args),
      ...createAISlice(...args),
      ...createNotificationSlice(...args),
      ...createJobSlice(...args),
    }),
    {
      name: 'forge-store',
      storage: createJSONStorage(() => localStorage),
      // ONLY persist UI preferences and session lock state
      partialize: (state) => ({
        ui: { theme: state.ui.theme, sidebarExpanded: state.ui.sidebarExpanded },
        auth: { sessionLocked: state.auth.sessionLocked },
      }),
    }
  )
);
```

### 0.5 — API Client & MSW Setup

**File:** `src/shared/api/client.ts`
```typescript
// SPEC: Section 6.1 — Mock API Mode
import axios from 'axios';

const isMock = import.meta.env.VITE_MOCK_API === 'true';

export const apiClient = axios.create({
  baseURL: isMock ? '' : import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: inject auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('forge_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: unwrap ApiResponse<T>
apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);
```

**File:** `src/shared/api/mock/browser.ts`
```typescript
import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth.handlers';
import { orgHandlers } from './handlers/org.handlers';
import { projectHandlers } from './handlers/project.handlers';
import { workbookHandlers } from './handlers/workbook.handlers';
import { sectionHandlers } from './handlers/section.handlers';
import { bomHandlers } from './handlers/bom.handlers';
import { inventoryHandlers } from './handlers/inventory.handlers';
import { quotationHandlers } from './handlers/quotation.handlers';
import { revisionHandlers } from './handlers/revision.handlers';
import { scheduleHandlers } from './handlers/schedule.handlers';
import { reportHandlers } from './handlers/report.handlers';
import { notificationHandlers } from './handlers/notification.handlers';
import { jobHandlers } from './handlers/job.handlers';

export const worker = setupWorker(
  ...authHandlers,
  ...orgHandlers,
  ...projectHandlers,
  ...workbookHandlers,
  ...sectionHandlers,
  ...bomHandlers,
  ...inventoryHandlers,
  ...quotationHandlers,
  ...revisionHandlers,
  ...scheduleHandlers,
  ...reportHandlers,
  ...notificationHandlers,
  ...jobHandlers,
);
```

**File:** `src/main.tsx`
```typescript
async function enableMocking() {
  if (import.meta.env.VITE_MOCK_API !== 'true') return;
  const { worker } = await import('./shared/api/mock/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode><App /></React.StrictMode>
  );
});
```

### 0.6 — Routing Skeleton

**File:** `src/app/router.tsx`
```typescript
// All routes defined here. Pages are lazy-loaded per module.
// SPEC: Section 4.2 — Module structure
const routes = [
  { path: '/login', element: lazy(() => import('../modules/auth/pages/LoginPage')) },
  { path: '/onboarding', element: lazy(() => import('../modules/org/pages/OnboardingPage')) },
  { path: '/', element: <AppShell />, children: [
    { index: true, element: lazy(() => import('../modules/dashboard/pages/DashboardPage')) },
    { path: 'projects', element: lazy(() => import('../modules/projects/pages/ProjectsPage')) },
    { path: 'projects/:projectId', element: lazy(() => import('../modules/projects/pages/ProjectDetailPage')) },
    { path: 'projects/:projectId/workbooks', element: lazy(() => import('../modules/workbooks/pages/WorkbooksPage')) },
    { path: 'workbooks/:workbookId', element: lazy(() => import('../modules/workbooks/pages/WorkbookDetailPage')) },
    { path: 'workbooks/:workbookId/sections/:sectionId', element: lazy(() => import('../modules/sections/pages/SectionCockpitPage')) },
    { path: 'inventory', element: lazy(() => import('../modules/inventory/pages/InventoryPage')) },
    { path: 'reports', element: lazy(() => import('../modules/reports/pages/ReportsPage')) },
    { path: 'settings', element: lazy(() => import('../modules/settings/pages/SettingsPage')) },
    { path: 'admin', element: lazy(() => import('../modules/admin/pages/AdminPage')) },
  ]},
];
```

### 0.7 — Shared Component Library

**Create all components in `src/shared/components/`:**

```
src/shared/components/
  ui/
    Button.tsx          # Primary, Secondary, Destructive, AI, Agent variants
    Card.tsx            # Standard + Intuitive (data-card="intuitive") variants
    Badge.tsx           # Status badges with color map
    Input.tsx           # Dark surface, floating label, focus ring
    Select.tsx          # Styled select
    Textarea.tsx
    Modal.tsx           # Framer Motion animated
    Drawer.tsx          # Slide-in panel
    Tooltip.tsx
    Toast.tsx           # Sonner integration
    Dropdown.tsx        # Dropdown menu
    Avatar.tsx          # User avatar + online indicator
    Spinner.tsx         # HUD scan loading animation
    ProgressBar.tsx     # Pulsing cyan
    EmptyState.tsx      # Empty state with icon + CTA
    ConfirmDialog.tsx   # Destructive action confirmation
    Tabs.tsx
    Accordion.tsx
    Popover.tsx
    DatePicker.tsx
  layout/
    AppShell.tsx        # Sidebar + TopBar + Main area
    Sidebar.tsx         # Collapsible 64→260px
    TopBar.tsx          # Breadcrumb, search, notifications, avatar
    PageHeader.tsx      # Page title + subtitle + actions
    Section.tsx         # Content section wrapper
  data/
    StatusBadge.tsx     # Color-coded status badge (maps all 14+ statuses)
    SpecValue.tsx       # font-mono cyan wrapper for dimensions/values
    PartCode.tsx        # font-mono amber wrapper for part numbers
    StandardCode.tsx    # font-mono violet for standards citations
    KPICard.tsx         # Animated counter card
    ProgressRing.tsx    # Circular progress with Anime.js counter
    GanttBar.tsx        # Single task bar for Gantt chart
  forms/
    FormField.tsx       # Label + input + error
    FormSection.tsx     # Group of form fields
    FileDropzone.tsx    # react-dropzone styled
    RichTextEditor.tsx  # TipTap wrapper
    SmartTable.tsx      # TanStack Table with all features
```

### 0.8 — Mock Fixtures (Seed Data)

**Create all fixture files in `src/shared/api/mock/fixtures/`:**

```
organizations.json     # Cambridge Profab org + mock org
users.json             # 8 mock users with different roles
projects.json          # 3 projects at different statuses
workbooks.json         # 3 workbooks including CPF#8250016-6B1
sections.json          # All sections from CPF drawing (A-A, B-B, D-D, etc.)
spec-items.json        # Extracted specs for each section
bom-items.json         # Full BOM from CPF drawing
inventory.json         # 50+ inventory items (plates, pipe, angles, consumables)
quotations.json        # 1 complete quotation (QT-2026-0047)
revisions.json         # R0, R1, R2, R3 for main workbook
comments.json          # Sample threaded comments
schedule-tasks.json    # 13 manufacturing tasks from spec
notifications.json     # 10 recent notifications
reports.json           # Pre-built report data
```

### Phase 0 — Definition of Done

```
□ npm run dev starts without errors
□ Dark theme renders with correct colors
□ Typography: Inter, Space Grotesk, JetBrains Mono all load
□ All Tailwind custom tokens work (bg-bg-primary, text-accent-primary, etc.)
□ MSW starts in browser console: [MSW] Mocking enabled
□ All routes resolve to placeholder pages (no 404s)
□ Sidebar collapses/expands with animation
□ useForgeStore() accessible from any component
□ TypeScript: zero compilation errors
□ ESLint: zero errors
```

---

## PHASE 1 — Authentication & Organization Shell
**Duration:** 3–4 days | **Deliverable:** Full auth flow + org onboarding + app shell with mock data

### Context Block (paste to AI agent)
```
Building FORGE Phase 1. Scaffold is complete (Phase 0 done).
SPEC sections: 7 (Auth), 8 (Organization & Team Management).
Use MSW mock API (VITE_MOCK_API=true). Do NOT build any backend.
All API calls go through src/shared/api/client.ts → intercepted by MSW.
Mock handlers in src/shared/api/mock/handlers/auth.handlers.ts and org.handlers.ts.
Mock fixtures in src/shared/api/mock/fixtures/users.json and organizations.json.
Global state updates via src/shared/store/ slices (authSlice, orgSlice).
```

### 1.1 — Mock Handlers to Create

**`auth.handlers.ts`** — Handles: POST /api/v1/auth/login, POST /api/v1/auth/google, POST /api/v1/auth/refresh, POST /api/v1/auth/logout, GET /api/v1/auth/sessions

**`org.handlers.ts`** — Handles: GET/PUT /api/v1/orgs/current, GET /api/v1/orgs/current/members, POST /api/v1/orgs/current/members/invite, PUT /api/v1/orgs/current/members/{uid}/role, DELETE /api/v1/orgs/current/members/{uid}

### 1.2 — Files to Build

```
src/modules/auth/
  pages/
    LoginPage.tsx         # Email/Password + Google OAuth button, dark HUD design
    SessionLockPage.tsx   # 6-digit PIN lock screen with org logo
    ForgotPasswordPage.tsx
  components/
    LoginForm.tsx
    PinLockScreen.tsx     # 6-digit PIN input with numpad
    SecurityQuestionSetup.tsx
  hooks/
    useAuth.ts            # login, logout, lockSession, unlockSession actions
    useSessionLock.ts     # idle timer, PIN validation logic
  api/
    auth.api.ts           # API calls: login, logout, refresh, google
  index.ts                # Public exports

src/modules/org/
  pages/
    OnboardingPage.tsx    # 5-step wizard (SPEC Section 8.1)
    OrgSettingsPage.tsx   # Accessible from Settings > Organization
  components/
    OnboardingStep1.tsx   # Create Organization (name, logo, industry)
    OnboardingStep2.tsx   # Company Profile (address, tax, bank)
    OnboardingStep3.tsx   # Operational Defaults (labour rates, overhead)
    OnboardingStep4.tsx   # Document Templates (link to template editor)
    OnboardingStep5.tsx   # Invite Team
    TeamMemberCard.tsx    # Expandable card with projects + milestone
    TeamMemberTable.tsx   # Sortable team overview table
    LabourRateTable.tsx   # Editable rate table per trade
    InviteModal.tsx       # Invite by email + role selector
    OrgLogoUpload.tsx     # Logo upload with color extraction
  hooks/
    useOrg.ts             # org CRUD operations
    useTeam.ts            # member management
  api/
    org.api.ts
  index.ts
```

### 1.3 — App Shell Completion

```
src/shared/components/layout/
  AppShell.tsx            # Complete layout: sidebar + topbar + outlet
  Sidebar.tsx             # Full sidebar with all nav items, org logo, collapse
  TopBar.tsx              # Breadcrumb, Cmd+K search (opens modal), bell, avatar
  GlobalSearch.tsx        # Cmd+K command palette (search projects, workbooks, sections)
  NotificationDrawer.tsx  # Slide-in notification panel
  UserMenu.tsx            # Avatar dropdown: profile, settings, logout
  SessionLockOverlay.tsx  # Renders PinLockScreen when sessionLocked=true
```

### 1.4 — Key UX Details to Implement

```
SESSION LOCK PIN (SPEC Section 7.1 — Option C):
  - After login, user prompted: "Set a session PIN? (optional)"
  - PIN stored in localStorage as SHA-256 hash
  - Idle timer: starts on any user interaction, resets on activity
  - Lock screen: full-screen overlay, org logo centered, 6-digit input
  - Keyboard input: digit keys auto-advance, Backspace to clear
  - "Forgot PIN?" link → security question modal → reset

ORGANIZATION LOGO IN SIDEBAR (SPEC Section 8.1):
  - If logoUrl exists: show org logo 40×40px at top of sidebar
  - If org has orgColor: apply as CSS variable --org-accent
  - Used for: sidebar header tint, active nav indicator color

FIRST-TIME FLOW:
  - Login → check if org exists → if no org → redirect to /onboarding
  - Onboarding is a stepper, can navigate back
  - Step 3 completes → optional (can skip) → goes to dashboard
  - After onboarding: org screen HIDDEN from nav, only in Settings
```

### Phase 1 — Definition of Done
```
□ Login page renders with HUD aesthetic
□ Email/password login works (mock: any email + "password123")
□ Session lock PIN can be set, locks on idle, unlocks with PIN
□ Forgot PIN → security question → reset flow works
□ Onboarding 5-step wizard completes
□ Org logo appears in sidebar after upload
□ Team member table shows with expandable cards
□ Labour rate table is editable
□ Invite modal sends (mock) invitation
□ App shell: sidebar collapses/expands with spring animation
□ Global search (Cmd+K) opens command palette
□ Notification bell shows unread count
□ All mock data from fixtures/users.json and organizations.json rendered correctly
```

---

## PHASE 2 — Dashboard & Project Management
**Duration:** 4–5 days | **Deliverable:** Full dashboard + project CRUD + project dashboard with all features

### Context Block (paste to AI agent)
```
Building FORGE Phase 2. Auth + org shell complete (Phases 0-1 done).
SPEC sections: 13 (Dashboard), 14 (Project Management Module).
Use MSW mock API. Mock data from projects.json fixture.
Mock handlers: project.handlers.ts.
Key features: KPI cards with Anime.js counters, project grid, project detail dashboard,
project status flow (14 statuses), project creation form, 3D visual viewer (Three.js),
client contacts, attachments, Gantt timeline, financial summary.
```

### 2.1 — Mock Handlers
**`project.handlers.ts`** — All CRUD + status change + members + attachments + manufacturing tracker + report endpoints for projects.

### 2.2 — Files to Build

```
src/modules/dashboard/
  pages/
    DashboardPage.tsx     # Main command center dashboard
  components/
    KPIRow.tsx            # 6 KPI cards with Anime.js number animation
    KPICard.tsx           # Individual card: value, label, trend, click-to-drill
    ActivityFeed.tsx      # Real-time (mocked) event feed
    ProjectTimeline.tsx   # Multi-project Gantt overview (Recharts or custom)
    ProjectsGrid.tsx      # Project card grid
    ProjectCard.tsx       # Individual project card with status, progress, team
    AgentStatusBar.tsx    # Agent activity strip (shown if agents enabled)
  hooks/
    useDashboard.ts       # KPI data fetching + aggregation
  api/
    dashboard.api.ts
  index.ts

src/modules/projects/
  pages/
    ProjectsPage.tsx      # List view with filters + create button
    ProjectDetailPage.tsx # Full project dashboard
    ProjectCreatePage.tsx # Multi-section creation form
  components/
    ProjectHeader.tsx         # Name, status, progress ring, client, dates, visual
    ProjectVisual.tsx         # 3D model viewer (Three.js) OR image slider
    ProjectStatusStepper.tsx  # 14-status horizontal stepper
    ProjectStatusModal.tsx    # Confirm status transition with checklist
    ProjectSummaryCards.tsx   # Workbooks / sections / open items cards
    WorkbooksTable.tsx        # Workbooks list in project
    ProjectGantt.tsx          # Drag-and-drop timeline
    ProjectFinancialSummary.tsx
    ProjectTeamPanel.tsx      # Member avatars, roles, presence
    ProjectNotes.tsx          # WYSIWYG timestamped notes
    ProjectAttachments.tsx    # File upload + versioned attachments list
    ClientContactsPanel.tsx   # Client contacts with all fields
    ManufacturingTracker.tsx  # Kanban board (visible from mfg_review+)
    PreProductionChecklist.tsx # Mandatory checklist for mfg_review
    RetrospectiveForm.tsx     # End-of-project feedback form
    RetroAggregate.tsx        # Aggregate retrospective view
    NCRList.tsx               # Non-conformance report log
    ProjectCreateForm.tsx     # Multi-step form with all fields
  hooks/
    useProject.ts
    useProjectStatus.ts   # Status transition logic with confirmation
    useManufacturing.ts
  api/
    project.api.ts
  index.ts
```

### 2.3 — Key UX Details

```
KPI CARDS (SPEC Section 13.2):
  - Load animation: Anime.js counter from 0 → value in 800ms
  - Counter easing: easeOutExpo
  - Trend arrow: ▲ green for positive, ▼ red for negative
  - Click → navigate to filtered view

PROJECT CARD (SPEC Section 13.4):
  - Status badge with correct color from status color map
  - Progress bar: gradient fill
  - Team avatars: stacked with +N overflow
  - Agent indicator badge if agents active on project
  - Hover: card lifts with glow shadow

PROJECT VISUAL (SPEC Section 14.5):
  - If .glb/.gltf/.obj file: Three.js WebGL viewer, auto-rotate 2 RPM
    Use @react-three/fiber + @react-three/drei (useGLTF, OrbitControls, Stage)
  - If image files: Framer Motion AnimatePresence carousel, 4s auto-advance
  - If nothing: SVG placeholder generated from org color + initials
  - Both display as 200px tall hero in project header

STATUS STEPPER (SPEC Section 14.3 — 14 statuses):
  - Horizontal stepper with 14 steps
  - Overflow: scrollable on small screens
  - Current: cyan dot + label
  - Completed: filled dot
  - Click future step → opens confirmation dialog
  - Backward move: shows red warning + requires reason input

PRE-PRODUCTION CHECKLIST (SPEC Section 14.6):
  - Only appears at manufacturing_review status
  - Full checklist from spec: Engineering / Quality / Materials / Planning / Sign-off sections
  - Each item: checkbox + optional notes field
  - Can't proceed to manufacturing_progress until complete (unless Owner override)
  - PDF exportable (queues export job)
```

### Phase 2 — Definition of Done
```
□ Dashboard KPI cards animate with Anime.js counters
□ Activity feed shows mock events with correct icons
□ Project cards grid renders with all data + status badges
□ Project creation form: all fields, validates, creates
□ 3D model viewer renders GLB files with auto-rotation
□ Image slider works with 3+ images
□ Project status stepper shows all 14 statuses
□ Status change with confirmation dialog and consequence text
□ Project detail: all 8 tabs render with mock data
□ Workbook table in project lists all workbooks
□ Gantt shows workbook timelines
□ Financial summary shows quotation data
□ Client contacts panel: add/edit/delete contacts
□ Attachments: upload (mock), version, delete
□ Manufacturing tracker (Kanban) visible at manufacturing_review+
□ Pre-production checklist renders and is submittable
□ Retrospective form sends per-user response
```

---

## PHASE 3 — Workbook Engine & Section Cockpit
**Duration:** 5–6 days | **Deliverable:** Complete workbook management + three-panel section interface + PDF viewer

### Context Block (paste to AI agent)
```
Building FORGE Phase 3. Dashboard + projects complete (Phases 0-2 done).
SPEC sections: 15 (Workbook Engine), 16 (Section Work Interface — Three-Panel Cockpit),
17 (PDF Intelligence Parser — UI only, no real parsing), 18 (Section Analysis & Extraction Engine).
Use MSW mock API. Mock data from workbooks.json and sections.json fixtures.
Key features: workbook creation wizard, workbook dashboard with 9 tabs, 14-status stepper,
three-panel cockpit (PDF viewer / work area / AI panel) — all collapsible,
PDF viewer with scale ruler, section spec table, comment threads, AI suggestions panel,
revision selector in header, attachments tab.
The PDF parse pipeline is UI ONLY in this phase — all section data comes from mock fixtures.
```

### 3.1 — Mock Handlers
**`workbook.handlers.ts`**, **`section.handlers.ts`**, **`bom.handlers.ts`**, **`revision.handlers.ts`**

For PDF parse: mock handlers for `/workbooks/:id/upload`, `/workbooks/:id/parse/status` (returns job that completes after 3s delay), `/workbooks/:id/parse/preview` (returns pre-built sections from fixture).

### 3.2 — Files to Build

```
src/modules/workbooks/
  pages/
    WorkbookDetailPage.tsx   # Tabbed workbook view
    WorkbookCreatePage.tsx   # 4-step wizard
  components/
    WorkbookHeader.tsx           # Drawing info, status stepper, revision selector
    WorkbookStatusStepper.tsx    # 14-status stepper
    WorkbookTabNav.tsx           # 9 tabs navigation
    WorkbookOverviewTab.tsx      # Summary, key specs, timeline, pending actions
    WorkbookSectionsTab.tsx      # Sections grid with status cards
    WorkbookBomTab.tsx           # BOM smart table (full TanStack)
    WorkbookSpecsTab.tsx         # All specs organized by category
    WorkbookScheduleTab.tsx      # Task table + Gantt
    WorkbookQuotationTab.tsx     # Quotation builder (Phase 4)
    WorkbookOutputsTab.tsx       # Export artifacts list
    WorkbookRevisionsTab.tsx     # Revision timeline
    WorkbookAttachmentsTab.tsx   # Workbook-level attachments
    WorkbookCreateStep1.tsx      # Basic info
    WorkbookCreateStep2.tsx      # File upload + parse trigger
    WorkbookCreateStep3.tsx      # Parse preview + section confirmation
    WorkbookCreateStep4.tsx      # Attachments
    ParseProgressOverlay.tsx     # Job polling UI (scanning animation)
    ParsePreviewScreen.tsx       # Section thumbnails + confirm/edit
    SectionCard.tsx              # Grid card for section in sections tab
    PdfScaleRuler.tsx            # Horizontal+vertical ruler with calibration
  hooks/
    useWorkbook.ts
    usePdfParse.ts               # Job polling hook (polls every 2s)
  api/
    workbook.api.ts
  index.ts

src/modules/sections/
  pages/
    SectionCockpitPage.tsx   # Three-panel layout
  components/
    # LEFT PANEL — PDF VIEWER
    PdfPanel.tsx             # Panel wrapper with collapse toggle
    PdfViewer.tsx            # react-pdf canvas, zoom, pan
    PdfPageNav.tsx           # Page selector + prev/next
    PdfSectionNav.tsx        # Jump between sections
    PdfScaleRuler.tsx        # Horizontal ruler with unit selector + calibration
    MeasurementTool.tsx      # Click-two-points distance measurement
    PdfAnnotationLayer.tsx   # Highlight, sticky note, box, arrow, text overlays
    GhostOverlay.tsx         # Colored confidence boxes over extracted data
    RevisionCompare.tsx      # Side-by-side PDF diff view

    # CENTER — WORK AREA
    WorkPanel.tsx            # Panel wrapper with collapse toggle
    SectionHeader.tsx        # Name, status badge, assignee, revision indicator
    SectionSummary.tsx       # AI summary block (TipTap WYSIWYG)
    SpecTable.tsx            # TanStack spec items table (font-mono values)
    SpecTableRow.tsx         # Individual row with re-check, link-to-pdf actions
    SectionNotes.tsx         # Notes as data-card="intuitive" cards
    IntuitivNoteCard.tsx     # 3D tilt card with mouse tracking
    RelatedBomItems.tsx      # BOM items sourced from this section
    SectionActions.tsx       # Request Review, Export, Mark Complete buttons

    # RIGHT PANEL — AI + REVIEW + MEMORY
    RightPanel.tsx           # Panel wrapper: tabs for AI / Review / Memory
    AiPanel.tsx              # AI assistant tab
    AiChat.tsx               # Chat interface (mock responses)
    AiToolsBar.tsx           # Quick action buttons (Generate BOM, Peer Review, etc.)
    AiSuggestions.tsx        # Proactive anomaly + suggestion cards
    ReviewPanel.tsx          # Review tab — mirrors AI panel structure
    ReviewThread.tsx         # Threaded comment with status + type badge
    ReviewComment.tsx        # Single comment + replies + actions
    AddCommentForm.tsx       # New comment with type selector + @mention
    MemoryPanel.tsx          # Memory tab — list + pin + delete + add
    MemoryPointCard.tsx      # Individual memory point card

    # PANEL SYSTEM
    PanelResizer.tsx         # Drag handle between panels
    PanelCollapseToggle.tsx  # ◀▶ toggle button at panel edge

    # PROGRESS CARD (presentation view)
    SectionProgressCard.tsx  # data-widget="progress-card" sticky rail card
  hooks/
    useSectionCockpit.ts     # Panel state management
    usePdfViewer.ts          # Zoom, pan, scale, annotation state
    useSpecTable.ts          # Spec CRUD with optimistic updates
    useComments.ts           # Comment thread CRUD
    useAiChat.ts             # Mock AI chat (Phase 4 makes it real)
  api/
    section.api.ts
  index.ts
```

### 3.3 — Key UX Details

```
THREE-PANEL COCKPIT (SPEC Section 16.1):
  Layout: CSS Grid — `grid-cols-[var(--pdf-width)_1fr_var(--ai-width)]`
  --pdf-width: from uiSlice.pdfPanelWidth (default 380px, range 48–600px)
  --ai-width: from uiSlice.aiPanelWidth (default 320px, range 0–480px)
  
  Panel collapse:
    - Toggle button: position: absolute, right/left edge, 32×32px
    - Collapsed: width → 48px (icon strip), Framer Motion spring
    - Expanded: restores last width
    - Drag resize: MouseEvent on PanelResizer (updates CSS variable)

PDF VIEWER SCALE RULER (SPEC Section 16.2):
  Position: horizontal ruler at top, vertical on left side (always visible)
  Scale calibration:
    1. "Calibrate" button → enters calibration mode (cursor crosshair)
    2. User clicks point A on PDF
    3. User clicks point B on PDF  
    4. Modal: "Known distance" input + unit selector
    5. pxPerUnit = pixel_distance / known_distance
    6. Ruler updates: tick marks at correct spacing
    7. Store in section state (persists per section)
  Auto-detect: if PDF text contains "SCALE 1:10" → auto-calibrate
  Unit selector: Inches / mm / cm / m

GHOST OVERLAY (SPEC Section 16.2):
  Toggle button in PDF toolbar
  Each spec item has boundsJson: {x, y, width, height} on page (from mock fixture)
  Overlay: <div> positioned absolute over PDF canvas
  Color by confidence: green (high), yellow (medium), red (low)
  Click spec table row → scrollIntoView of corresponding overlay box (and vice versa)

INTUITIVE NOTE CARDS (SPEC Section 2.3):
  data-card="intuitive" — CSS class
  Mouse move listener: rotateX/Y based on mouse position relative to card center
  Max rotation: 10deg
  Transition: transform 0.3s ease
  Different border-left colors per note type:
    General: cyan, Technical: amber, QA: red, Client: violet, AI: purple

AI CHAT (MOCK IN THIS PHASE):
  Streaming simulation: AI response appears word-by-word using setInterval
  Context indicator: shows current org/project/workbook name
  Mock responses: pattern-matched responses to common questions
    "weld spec" → responds with weld spec from mock section data
    "BOM" → responds listing mock BOM items
  Tool buttons: clicking "Generate BOM" shows toast "BOM generated (3 items added)"
```

### Phase 3 — Definition of Done
```
□ Workbook creation 4-step wizard completes
□ PDF upload UI with drag-drop works (mock: returns pre-parsed sections)
□ Parse progress overlay with scanning animation shows for 3s then resolves
□ Parse preview: section thumbnails + confirm creates sections
□ Workbook detail: all 9 tabs render with mock data
□ BOM tab: TanStack table with all columns, inline edit, formula columns
□ Specs tab: specs organized by category
□ Three-panel cockpit loads with correct default widths
□ All three panels independently collapse/expand with animation
□ Panels are drag-resizable (resize updates CSS variable)
□ PDF viewer: zoom, pan, page nav all work on mock PDF
□ Scale ruler: visible, calibration flow works, measurements calculate correctly
□ Ghost overlay: toggleable, colored boxes align with spec items
□ Click spec row → highlights PDF box (bidirectional)
□ Section header: status badge, assignee picker, revision indicator
□ AI summary: TipTap editor, editable
□ Spec table: font-mono values, inline edit, re-check button (shows toast)
□ Intuitive note cards: 3D tilt on mouse hover
□ AI panel: context indicator, mock streaming chat, tool buttons
□ Review panel: threaded comments, add comment with type, resolve
□ Memory panel: list points, pin, delete, add manual
□ Keyboard shortcut Cmd+1/2/3 toggles panels
□ Revision selector in workbook header works
□ Attachments tab: upload, view, delete
```

---

## PHASE 4 — Business Tools: Inventory, Quotation, Schedule, Revisions, Visualization
**Duration:** 6–7 days | **Deliverable:** All business-critical modules functional with mock data

### Context Block (paste to AI agent)
```
Building FORGE Phase 4. Section cockpit complete (Phases 0-3 done).
SPEC sections: 20 (Inventory), 19 (Quotation), 21 (WYSIWYG + Smart Tables),
22 (Revision Control), 23 (Anime.js Visualization), 24 (Output & Export), 15.6 (Schedule).
Use MSW mock API. Mock data from inventory.json, quotations.json, revisions.json fixtures.
Key features: full inventory management, multi-page quotation builder, manufacturing schedule 
with Gantt, revision timeline with diff viewer, Anime.js parallax visualization, export modal.
```

### 4.1 — Mock Handlers
**`inventory.handlers.ts`**, **`quotation.handlers.ts`**, **`schedule.handlers.ts`**, **`revision.handlers.ts`** (full), **`job.handlers.ts`** (export jobs that complete after delay)

### 4.2 — Files to Build

```
src/modules/inventory/
  pages/
    InventoryPage.tsx        # Full inventory management
  components/
    InventoryTable.tsx           # TanStack table with all inventory columns
    InventoryFilters.tsx         # Category, material, supplier filter sidebar
    InventoryItemModal.tsx       # Create/edit item form (all fields from SPEC Appendix C)
    InventoryImportModal.tsx     # CSV/Excel import with column mapping
    StockGauge.tsx               # Visual stock level indicator
    PriceHistoryChart.tsx        # Recharts line chart
    InventoryAutocomplete.tsx    # Shared component for BOM/quotation dropdowns
    ExternalBadge.tsx            # [External: ERP] badge on external items
  hooks/
    useInventory.ts
  api/
    inventory.api.ts
  index.ts

src/modules/quotation/
  pages/
    QuotationBuilderPage.tsx # Full multi-page quotation
  components/
    QuotationPageNav.tsx         # Cover / Scope / Summary / Breakdown / Exclusions / Terms / Signatures
    QuotationCoverPage.tsx       # Letterhead, quotation number, client/org info
    QuotationScopePage.tsx       # TipTap WYSIWYG scope of work
    QuotationSummaryPage.tsx     # High-level cost breakdown + pie chart (Recharts)
    QuotationDetailPage.tsx      # All cost tables: material, labour, sub-ops, paint, etc.
    QuotationExclusionsPage.tsx  # WYSIWYG exclusions + assumptions
    QuotationTermsPage.tsx       # WYSIWYG T&Cs
    QuotationSignaturePage.tsx   # Signature fields
    MaterialCostTable.tsx        # Line items with inventory autocomplete
    LabourCostTable.tsx          # Trade + hours + rate = subtotal
    SubOpsTable.tsx              # Sub-operations with unit rates
    PaintTable.tsx               # Surface treatment line items
    CostSummaryBar.tsx           # Sticky total bar at bottom
    QuotationApprovalFlow.tsx    # Submit → Internal Review → Approved flow
    QuotationStatusBanner.tsx    # Draft/Submitted/Approved banner
    ChangeOrderModal.tsx         # Clone + create change order
  hooks/
    useQuotation.ts
    useQuotationTotals.ts        # Reactive cost calculation
  api/
    quotation.api.ts
  index.ts

src/modules/schedule/
  components/
    ScheduleGantt.tsx            # Task bars on timeline (custom or library)
    ScheduleList.tsx             # Full task table with all columns from SPEC 15.6
    TaskModal.tsx                # Add/edit task modal
    TaskStatusUpdate.tsx         # Mobile-friendly status update (shop floor view)
    TaskDependencyGraph.tsx      # Dependency visualization
    GanttBar.tsx                 # Individual bar in Gantt
    MilestoneMarker.tsx          # Diamond milestone on Gantt
  hooks/
    useSchedule.ts
  api/
    schedule.api.ts
  index.ts

src/modules/revisions/
  components/
    RevisionTimeline.tsx         # Horizontal timeline with nodes
    RevisionNode.tsx             # Single revision node (click to expand)
    RevisionDiffViewer.tsx       # Split-screen diff view
    DiffItem.tsx                 # Single changed item (color-coded)
    ActivateRevisionDialog.tsx   # Consequence display + confirmation
    RevisionLockModal.tsx        # Lock/unlock revision
    RevisionCreateModal.tsx      # Save as revision form
  hooks/
    useRevisions.ts
  api/
    revision.api.ts
  index.ts

src/modules/visualization/
  pages/
    ParallaxViewPage.tsx         # Full-screen parallax presentation
  components/
    ParallaxScene.tsx            # Main Anime.js scene renderer
    ComponentBlock.tsx           # Individual component in scene
    SpecCallout.tsx              # SVG callout line + label
    ProgressCard.tsx             # data-widget="progress-card" sticky card
    ScrollScrubber.tsx           # Scroll position → animation progress mapping
    AssemblyStageLabel.tsx       # Stage label appears at scroll threshold
    ParallaxExportViewer.tsx     # iframe viewer for AI-generated HTML
  hooks/
    useParallax.ts               # Scroll state, animation control
    useAnimeScene.ts             # Anime.js timeline management
  api/
    visualization.api.ts
  index.ts

src/modules/exports/
  components/
    ExportModal.tsx              # Export options: format, branding, sections
    ExportJobStatus.tsx          # Progress bar + download button
    OutputsTab.tsx               # List of all generated files per workbook
    ExportFileCard.tsx           # Generated file card with download + expiry
  hooks/
    useExport.ts                 # Queue job → poll → download
  api/
    export.api.ts
  index.ts
```

### 4.3 — Key UX Details

```
QUOTATION BUILDER (SPEC Section 19.2):
  Multi-page document within a single page view
  Left nav: page list (Cover / Scope / Summary / Detailed / Exclusions / Terms / Signatures)
  Sticky total bar at bottom: always shows grand total, updates in real time
  Cost calculation: useQuotationTotals hook calculates all subtotals reactively
  Material rows: InventoryAutocomplete in Part Number cell
  Labour rows: Trade dropdown (from org labour rate table) + hours → auto-fills rate

REVISION DIFF VIEWER (SPEC Section 22.5):
  Side-by-side: older revision on left, newer on right
  Diff color coding:
    🟢 Added row: background rgba(0,229,160,0.1), left border success color
    🔴 Removed: background rgba(255,59,92,0.1), strikethrough text
    🟡 Changed: old value struck through, new value shown, amber background
    ⬜ Unchanged: muted opacity
  Filter: "Show only changes" toggle

ANIME.JS PARALLAX (SPEC Section 23):
  ParallaxViewPage is a fullscreen overlay (Framer Motion AnimatePresence)
  Scroll drives animation progress:
    progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    Each Anime.js animation: autoplay: false, seek(progress × duration)
  Components:
    1. All parts assembled (progress 0-0.2)
    2. Explode outward (progress 0.2-0.5) — translateX/Y based on part position
    3. Labels fly in (progress 0.5-0.7) — TipTap-style callout lines, font-mono specs
    4. Weld lines draw on (progress 0.7-0.9) — SVG stroke-dashoffset animation
    5. Reassemble (progress 0.9-1.0)
  progress-card: position: sticky top:24px, left rail, shows current section + completion %
  Keyboard: left/right arrow keys jump to animation stages
  Mock data: use CPF sections from fixture to demonstrate real assembly
  Export: "Download HTML" button — in Phase 4 this downloads a static HTML template
           (real AI generation in Phase 7)

SMART TABLE FULL FEATURES (SPEC Section 21.2):
  Applies to: BOM, Spec Items, Inventory, Schedule, Quotation line items
  All column types: text, number, currency (formatted), date, dropdown, autocomplete, checkbox
  Formula columns: Qty × UnitCost = TotalCost (computed client-side)
  All values in font-mono class
  Excel paste: onPaste event → parse tab-separated → fill cells
  Conditional formatting: user-configurable rules (>$5000 → red background)
  Frozen header: always visible on scroll
  Export: each table has its own "Export CSV" / "Export Excel" button
```

### Phase 4 — Definition of Done
```
□ Inventory page: full table, search, filter by category, add/edit/delete item
□ Inventory autocomplete works in BOM table part number column
□ Price history chart renders
□ Quotation builder: all 7 pages navigable
□ Cost tables: all line items, add row, delete, formula columns calculate
□ Quotation totals update reactively as items change
□ Material rows: inventory autocomplete populated from fixture
□ Quotation status flow: submit → approve → send
□ Schedule: Gantt + list view, add task, status update, dependencies shown
□ Shop floor view: simplified task list with status update + photo upload area
□ Revision timeline: nodes with expand, type badges, locked indicator
□ Revision diff viewer: split-screen, three diff types colored correctly
□ Activate revision dialog: consequence text shown
□ Parallax view: opens full-screen, scroll drives animation through all 5 stages
□ Component blocks sized proportionally to part dimensions
□ Spec callout lines animate with SVG stroke-dashoffset
□ Sticky progress card visible while scrolling
□ Keyboard navigation (arrows) works in parallax
□ Export modal: format selector, options, queues mock job
□ Job status: progress bar updates, download button appears when complete
□ Outputs tab: shows all mock generated files with download links
```

---

## PHASE 5 — Reporting, Notifications, Settings & Admin
**Duration:** 3–4 days | **Deliverable:** Complete reporting suite, notifications, settings, admin panel

### Context Block (paste to AI agent)
```
Building FORGE Phase 5. All core modules complete (Phases 0-4 done).
SPEC sections: 27 (Reports & Analytics), 26 (Notifications), 29 (Settings), 28 (Admin Panel).
Use MSW mock API. Mock data from reports.json, notifications.json fixtures.
Key features: project status report, portfolio report, financial reports, schedule reports,
notification drawer + preferences, all settings pages, superadmin panel.
```

### 5.1 — Files to Build

```
src/modules/reports/
  pages/
    ReportsPage.tsx          # Report selector
    ProjectReportPage.tsx    # Project status report
    PortfolioReportPage.tsx  # Org-wide portfolio
    FinancialReportPage.tsx
    ScheduleReportPage.tsx
    QualityReportPage.tsx
    InventoryReportPage.tsx
    AgentReportPage.tsx
    RetroReportPage.tsx
  components/
    ReportHeader.tsx         # Report title + generated date + export
    ProjectStatusReport.tsx  # Full status report layout from SPEC Section 27.2
    KPIMetric.tsx            # Large metric with trend indicator
    PortfolioTable.tsx       # All projects in one table
    CapacityHeatmap.tsx      # Labour hours heatmap (Recharts)
    CostVarianceChart.tsx    # Quoted vs actual bar chart
    GanttExport.tsx          # Full Gantt view
    ScheduleReport.tsx       # Schedule performance metrics
    ScheduleReportModal.tsx  # Configure scheduled report delivery
  hooks/
    useReports.ts
  api/
    report.api.ts
  index.ts

src/modules/notifications/
  components/
    NotificationDrawer.tsx   # Slide-in panel from TopBar bell
    NotificationItem.tsx     # Individual notification card
    NotificationFilters.tsx  # All / Mine / Mentions / Agent Activity
    NotificationPreferences.tsx  # Per-type: in-app / email / push / chat toggles
  hooks/
    useNotifications.ts
    useWebSocket.ts          # Mock WebSocket simulation in Phase 5
  api/
    notification.api.ts
  index.ts

src/modules/settings/
  pages/
    SettingsPage.tsx         # Settings layout with left nav
  components/
    # User settings
    ProfileSettings.tsx      # Display name, title, avatar, phone
    SecuritySettings.tsx     # Password change, sessions, PIN, 2FA placeholder
    NotificationSettings.tsx # Delivery preferences table
    AppearanceSettings.tsx   # Theme, density, font size, PDF zoom
    AIUserSettings.tsx       # Personal AI key overrides, preferences

    # Org settings (Org Admin only)
    OrgProfileSettings.tsx   # All company info fields
    OrgTeamSettings.tsx      # Team member management
    OrgLabourRates.tsx       # Labour rate table
    EmailTemplateEditor.tsx  # Template selector + WYSIWYG editor
    DocTemplateEditor.tsx    # Quotation / report template config
    StorageSettings.tsx      # Storage provider config + test
    AIGatewaySettings.tsx    # Per-task-type model selector + provider cards
    AgentSettings.tsx        # Agent enable/configure per type
    IntegrationSettings.tsx  # External adapter config
    SubscriptionBilling.tsx  # Current plan + upgrade CTA

    # Shared
    FeatureGate.tsx          # Wraps premium features with upgrade prompt
    UpgradePrompt.tsx        # "Upgrade to Professional to unlock" card
    APIKeyInput.tsx          # Masked key input with test-connection button
    StorageProviderCard.tsx  # Connection status + quota
  hooks/
    useSettings.ts
  api/
    settings.api.ts
  index.ts

src/modules/admin/
  pages/
    AdminPage.tsx            # Admin dashboard
  components/
    AdminOrgTable.tsx        # All orgs: plan, users, storage, last active
    AdminUserTable.tsx       # Global user list
    AdminAnalytics.tsx       # Platform analytics: DAU, AI calls, storage
    AdminSystemHealth.tsx    # DB/Redis/Worker status indicators
    AdminFeatureFlags.tsx    # Toggle flags globally or per org
    AdminSubscriptionEditor.tsx # Change org plan, set trial
    PlanBadge.tsx            # Color-coded plan badge
  hooks/
    useAdmin.ts
  api/
    admin.api.ts
  index.ts
```

### 5.2 — Key UX Details

```
REPORTS (SPEC Section 27.1):
  Reports accessible in 2 clicks from any project
  "Generate" button: queues a job (mock: completes in 1s), then shows inline report
  Export PDF button: queues export job → download
  Schedule report modal: cron-style schedule selector + email recipients input

NOTIFICATION DRAWER:
  Opens from bell icon in top bar
  Groups by: Today / Yesterday / This Week / Older
  Each item: icon (by type), actor avatar, description, time, unread dot
  Swipe-to-dismiss on mobile
  "Mark all read" button
  Filter chips at top: All / Mentions / Agent / Urgent

SETTINGS NAVIGATION:
  Left nav with groups: Personal / Organization (org admin only) / Developer
  URL reflects current settings section: /settings/security, /settings/ai
  Unsaved changes: show save/discard bar at bottom when dirty

FEATURE GATING:
  checkFeature() from useOrg() slice
  Locked features: render with lock icon + tooltip "Available on Professional plan"
  UpgradePrompt component: shows current plan, feature list, upgrade CTA button
  In mock mode: use subscriptionTier from org fixture to test different states

API KEY INPUT:
  Shows masked value: "sk-••••••••••••••••••••••XXXX" (last 4 chars visible)
  Edit: click reveals input field
  Save: calls mock handler → shows "✅ Valid" or "❌ Invalid" badge
  Provider card shows: connected status ring, usage gauge (mock data)
```

### Phase 5 — Definition of Done
```
□ All report pages render with Recharts charts and mock data
□ Project status report matches layout in SPEC Section 27.2
□ Portfolio report table with all project columns
□ Financial report: cost variance bar chart
□ Scheduled report modal: configures and saves
□ Notification drawer opens from bell, shows mock notifications
□ Notification item types: correct icon per event type
□ Mark as read: updates unread count in store
□ Notification preferences: all toggles work, per-type table
□ Settings: all pages accessible via left nav
□ Profile settings: all fields editable, avatar upload (mock)
□ Security: active sessions list, PIN change, reset flow
□ Appearance: theme toggle (dark/light/system) actually switches
□ AI settings: model selectors, provider cards, test connection (mock)
□ Agent settings: enable/disable agents, mode selector
□ Org team: same as Phase 1 but now in Settings > Organization context
□ Template editors: WYSIWYG with variable placeholders
□ Storage settings: provider config, test button
□ Admin panel: org table, analytics charts, system health indicators
□ Feature flags: toggle updates mock featureOverrides in org store
```

---

## PHASE 6 — Backend Foundation: API, Database, Auth
**Duration:** 5–6 days | **Deliverable:** Running FastAPI backend. Frontend switches auth + org from mock → real.

### Context Block (paste to AI agent)
```
Building FORGE Phase 6 — Backend Foundation.
Frontend is complete with MSW mock API (Phases 0-5 done).
SPEC sections: 3 (Architecture), 4 (Module Isolation), 30 (Data Models), 31 (API), 
32 (Tech Stack), 33 (Prerequisites).
Build: Python 3.11 + FastAPI + PostgreSQL + Redis + Alembic + Docker Compose.
This phase: ONLY auth endpoints, org/user endpoints, and infrastructure.
Frontend change: VITE_MOCK_API=false. MSW workers for auth/org/users DISABLED.
All other modules STILL use MSW (section handlers, workbook handlers, etc.)
This is incremental backend integration — one module at a time.
```

### 6.1 — Backend Structure to Create

```
forge-backend/
├── docker-compose.yml          # postgres, redis, minio, api
├── Dockerfile
├── requirements.txt
├── alembic/
│   ├── env.py
│   └── versions/               # Migration files
├── .env                        # Backend env vars
├── main.py                     # FastAPI app factory
├── core/
│   ├── config.py               # Settings from .env (Pydantic BaseSettings)
│   ├── database.py             # Async SQLAlchemy engine + session
│   ├── redis_client.py
│   ├── security.py             # JWT create/verify, bcrypt, AES encryption
│   ├── permissions.py          # Role permission checker dependency
│   └── middleware.py           # CORS, rate limit, request logging
├── models/
│   ├── base.py                 # SQLAlchemy Base + created_at/updated_at mixin
│   ├── user.py                 # Users table
│   ├── organization.py         # Organizations table
│   ├── project.py              # Projects + ProjectMembers
│   ├── workbook.py             # Workbooks + PdfUploads
│   ├── section.py              # Sections + SpecItems
│   ├── bom.py                  # BomItems
│   ├── inventory.py            # InventoryItems
│   ├── quotation.py            # Quotations
│   ├── revision.py             # Revisions
│   ├── comment.py              # Comments
│   ├── schedule.py             # ScheduleTasks
│   ├── notification.py         # Notifications
│   ├── job.py                  # BackgroundJobs
│   ├── attachment.py           # Attachments
│   ├── ncr.py                  # NCRReports
│   ├── memory.py               # AIContextMemory
│   └── retrospective.py        # RetrospectiveResponses
├── schemas/                    # Pydantic schemas (mirrors TypeScript types)
│   ├── auth.py
│   ├── user.py
│   ├── organization.py
│   └── ... (one per domain)
├── routers/                    # FastAPI routers (one per module)
│   ├── auth.py                 # Phase 6: BUILT
│   ├── orgs.py                 # Phase 6: BUILT
│   ├── projects.py             # Phase 7: build next
│   └── ... (Phase 7+)
├── services/                   # Business logic
│   ├── auth_service.py         # Phase 6: BUILT
│   ├── org_service.py          # Phase 6: BUILT
│   └── ... (Phase 7+)
└── scripts/
    └── seed_superadmin.py      # Creates first superadmin user
```

### 6.2 — Phase 6 Deliverables (Backend Only)

```
✓ docker-compose.yml: postgres, redis, api, minio services
✓ All SQLAlchemy models created (all tables from SPEC Section 30.1)
✓ Alembic initial migration: creates all tables
✓ FastAPI app with CORS, rate limiting
✓ Auth router: POST /auth/login, /auth/google, /auth/refresh, /auth/logout
✓ Auth service: bcrypt verify, JWT create/verify, refresh token rotation
✓ Google OAuth: verify Google token → find/create user
✓ Session management: refresh tokens in Redis
✓ Org router: GET/PUT /orgs/current, members CRUD, invitations
✓ Org service: org CRUD, member management, invitation emails (SendGrid)
✓ File upload: MinIO/S3 signed URL endpoint (for logo, future PDFs)
✓ Health check: GET /health
✓ Seed script: creates superadmin, creates Cambridge Profab org, seeds users
```

### 6.3 — Frontend Change: Selective Mock Disable

```typescript
// src/shared/api/mock/browser.ts — After Phase 6
// Auth and Org handlers are REMOVED from MSW — real API now handles them
// All other handlers remain
export const worker = setupWorker(
  // authHandlers — REMOVED: now uses real backend
  // orgHandlers — REMOVED: now uses real backend
  ...projectHandlers,        // Still mock
  ...workbookHandlers,       // Still mock
  ...sectionHandlers,        // Still mock
  ...bomHandlers,            // Still mock
  ...inventoryHandlers,      // Still mock
  ...quotationHandlers,      // Still mock
  ...revisionHandlers,       // Still mock
  ...scheduleHandlers,       // Still mock
  ...reportHandlers,         // Still mock
  ...notificationHandlers,   // Still mock
  ...jobHandlers,            // Still mock
);
```

### Phase 6 — Definition of Done
```
□ docker compose up starts all services without errors
□ PostgreSQL: all tables created by migration
□ POST /auth/login: returns JWT tokens for seeded user
□ POST /auth/google: accepts Google token, returns JWT
□ Token refresh works: GET /auth/refresh returns new access token
□ Org creation via API: POST /orgs creates org, sets user as admin
□ Org members: invite, role change, remove all work via API
□ Frontend (VITE_MOCK_API=false): login flow uses real backend
□ Frontend: auth token stored in memory, refresh token in httpOnly cookie
□ Org data loads from real DB (not fixture)
□ MinIO accessible: logo uploads to real object storage
□ All other modules still work (still using MSW mock handlers)
```

---

## PHASE 7 — Backend Modules (One-by-One Integration)
**Duration:** 8–10 days | **Deliverable:** All backend modules built. Frontend fully on real API.

### Context Block (paste to AI agent — use per-module)
```
Building FORGE Phase 7 — [MODULE NAME] Backend.
Frontend for this module uses MSW mock (see handlers/[module].handlers.ts and fixtures/[module].json).
The TypeScript types in src/shared/types/index.ts are the CONTRACT — Pydantic schemas must match.
The mock handlers show expected request/response shapes.
Build the backend module in this order:
  1. SQLAlchemy models (already exist from Phase 6 migration)
  2. Pydantic schemas (match TypeScript interfaces exactly)
  3. Service class (business logic)
  4. Router (FastAPI endpoints matching SPEC Section 31 API list)
  5. Test: call each endpoint, verify response matches TypeScript interface
Then update frontend: remove that module's MSW handlers, verify frontend still works.
```

### 7.1 — Module Integration Order

Build backend modules in this order (each module is a sub-phase — roughly 1-2 days each):

**Sub-Phase 7A — Projects**
- Backend: `routers/projects.py`, `services/project_service.py`
- Endpoints: All project CRUD, status change, members, attachments
- Frontend: Remove `project.handlers.ts` from MSW worker

**Sub-Phase 7B — Workbooks + PDF Upload**
- Backend: `routers/workbooks.py`, `services/workbook_service.py`
- Storage: MinIO PDF upload (signed URL flow)
- File processing: PyMuPDF extract page count + title block text (no AI yet)
- Frontend: Remove `workbook.handlers.ts`

**Sub-Phase 7C — Sections + Spec Items + Comments**
- Backend: `routers/sections.py`, `routers/comments.py`
- Frontend: Remove `section.handlers.ts`

**Sub-Phase 7D — BOM + Inventory**
- Backend: `routers/bom.py`, `routers/inventory.py`
- Inventory search with full-text PostgreSQL search (tsvector)
- Frontend: Remove `bom.handlers.ts`, `inventory.handlers.ts`

**Sub-Phase 7E — Quotations**
- Backend: `routers/quotations.py`, `services/quotation_service.py`
- Quotation totals calculation (pure Python — no AI)
- Frontend: Remove `quotation.handlers.ts`

**Sub-Phase 7F — Schedule + Manufacturing**
- Backend: `routers/schedule.py`, manufacturing tracking endpoints
- Frontend: Remove `schedule.handlers.ts`

**Sub-Phase 7G — Revisions**
- Backend: `routers/revisions.py`, `services/revision_service.py`
- Snapshot: serialize workbook state to JSON → store in MinIO
- Diff computation: DeepDiff on two snapshots
- Frontend: Remove `revision.handlers.ts`

**Sub-Phase 7H — Notifications + WebSocket**
- Backend: `routers/notifications.py`, WebSocket endpoint (`/ws/{org_id}/{user_id}`)
- Redis pub/sub for real-time broadcast
- Frontend: Replace mock WebSocket simulation with real WebSocket connection
  Remove `notification.handlers.ts`

**Sub-Phase 7I — Background Jobs (Celery)**
- Celery app setup with Redis broker
- `worker-export` container: basic PDF/Excel export using python-docx + openpyxl
- Job status polling: `GET /jobs/{id}` returns real Celery task state
- Frontend: Remove `job.handlers.ts`

**Sub-Phase 7J — Reports**
- Backend: `routers/reports.py` — aggregation queries
- PostgreSQL views for dashboard KPIs (precomputed)
- Frontend: Remove `report.handlers.ts`

### 7.2 — Type Sync Rule for Each Sub-Phase

Before building each backend module:
1. Open `src/shared/types/index.ts` — read the TypeScript interface for that domain
2. Open `src/shared/api/mock/fixtures/[module].json` — read the fixture data
3. Build Pydantic schema to exactly match
4. After building: run a script that calls each endpoint + validates response against TS interface shape

```python
# scripts/validate_types.py — run after each sub-phase
# Calls every endpoint for the module and validates response schema
# Uses jsonschema with schema derived from TypeScript types
```

### Phase 7 — Definition of Done
```
□ All MSW handlers removed (VITE_MOCK_API still works for demo but all real handlers available)
□ All endpoints in SPEC Section 31 return correct data
□ Projects: full CRUD on real DB, status transitions persisted
□ Workbooks: PDF uploads to MinIO, parse job queued (returns mock sections for now)
□ Sections: spec items, comments all persisted
□ BOM: line items + inventory autocomplete from real DB
□ Inventory: 50+ items seeded, search works
□ Quotations: totals calculated server-side, approval flow works
□ Revisions: snapshots saved to MinIO, diff computed
□ WebSocket: status change on one browser tab → reflected on another tab in real-time
□ Celery: export job starts, progress updates via WebSocket, file downloadable
□ Reports: all report endpoints return aggregated real data
□ TypeScript type validation: all API responses match TS interfaces
```

---

## PHASE 8 — AI Integration, Agents & Production Hardening
**Duration:** 8–10 days | **Deliverable:** Full AI features, agent system, production-ready

### Context Block (paste to AI agent)
```
Building FORGE Phase 8 — AI Integration & Production.
Backend fully operational (Phase 7 done). Frontend on real API.
SPEC sections: 9 (AI Config), 10 (Agent Automation), 11 (AI Context Memory),
17 (PDF Intelligence Parser — real AI), 23 (Anime.js — AI generation), 33 (Prerequisites).
Build order: AI Gateway → PDF Parser → Context Memory → AI Chat → Agents → Chat Integrations.
```

### 8.1 — AI Gateway Module

```python
# app/services/ai_gateway.py
# SPEC: Section 9 — Task-type model routing + fallback chain
class AIGateway:
    async def dispatch(self, task_type: str, prompt: str, context: dict, org_id: str) -> str:
        # 1. Get org AI config (encrypted keys from DB)
        # 2. Build model chain for task_type
        # 3. Try primary → secondary → free fallback
        # 4. Return response
```

### 8.2 — Real PDF Intelligence Pipeline

```python
# app/tasks/pdf_tasks.py — 7-stage pipeline using Celery
# SPEC: Section 17.2
# Stage 1-3: PyMuPDF (no AI, synchronous)
# Stage 4: Dispatch to AI Gateway (vision model for extraction)
# Stage 5: Cross-reference validation (Python, DB lookups)
# Stage 6: AI summaries via gateway
# Stage 7: Create sections + spec items in DB
```

### 8.3 — AI Context Memory

```python
# app/services/context_memory_service.py
# SPEC: Section 11
# Store memory points in DB with vector embedding (pgvector)
# Semantic search: find relevant memories for user's query
# Inject into all AI prompts: org context + project context + relevant memories
```

### 8.4 — Real AI Chat Endpoint

```python
# POST /api/v1/ai/chat — Streaming response using SSE or WebSocket
# Receives user message + current scope (org/project/workbook/section)
# Builds context prompt with memory injection
# Dispatches to AI Gateway
# Streams response back
```

### 8.5 — AI Agent System

```python
# app/services/agent_service.py
# app/tasks/agent_tasks.py
# SPEC: Section 10
# DrawingAnalyst, Estimator, Scheduler, Reporter agents
# Each agent: load context → run AI task → create draft → notify for approval
# LangGraph for multi-step agent orchestration
```

### 8.6 — Chat Integration Bridge

```python
# Telegram bot: python-telegram-bot
# Slash commands: /forge status {project_ref}, /forge approve {quotation_id}
# Incoming command → parse → dispatch to agent → respond
# Notification delivery: org events → format → send to configured chat
```

### 8.7 — Production Hardening

```
Security:
  □ All inputs sanitized (bleach for HTML, strict Pydantic validators)
  □ SQL injection: SQLAlchemy ORM used exclusively (no raw SQL)
  □ OWASP Top 10 review
  □ Rate limiting per endpoint per user
  □ API keys encrypted at rest (AES-256-GCM)
  □ HTTPS enforced (Nginx TLS termination)
  □ httpOnly SameSite=Strict cookies for refresh tokens
  □ CSP headers configured

Performance:
  □ Database: all indexes from SPEC Section 30.2 applied
  □ N+1 queries: SQLAlchemy joinedload for all list endpoints
  □ Redis caching: org data, user permissions (5-min TTL)
  □ Celery workers: separate queues with independent scaling
  □ Frontend: bundle analysis, code splitting per route
  □ Images: WebP conversion, lazy loading
  □ Lighthouse score: >90 all categories

Observability:
  □ Structlog: JSON structured logging, request ID on all logs
  □ Prometheus metrics exposed: /metrics
  □ Error tracking: Sentry DSN configured
  □ Health check: GET /health checks DB + Redis + MinIO connectivity

Testing:
  □ Backend: pytest coverage >70% on services + routers
  □ Frontend: React Testing Library for all shared components
  □ E2E: Playwright — critical paths (login, create project, upload PDF, export)
  □ Load test: k6 — 50 concurrent users, all P95 <500ms
```

### Phase 8 — Definition of Done
```
□ Upload real PDF → AI parses → sections created with real extracted specs
□ Spec values extracted: dimensions in font-mono, weld symbols decoded
□ Confidence scores assigned per spec item
□ Ghost overlay boxes align with extracted data on real PDF
□ AI chat: asks about weld spec → responds with real extracted data + memory context
□ AI chat memory: user corrects spec → creates memory point → next session remembers
□ AI suggestions: proactive anomaly detection shows for real extracted data
□ AI Generate BOM: creates BOM rows from section extraction
□ Estimator agent: generates quotation draft from workbook → notifies for approval
□ Telegram bot: /forge status {ref} returns real project status
□ Anime.js visualization: AI generates real HTML scene from section data
□ All Lighthouse scores >90
□ Sentry error tracking active
□ All E2E tests pass
□ Load test: 50 concurrent users, no errors
```


## MOCK DATA SYNC PROTOCOL

### When You Change the UI in Any Phase

**ALWAYS follow this 4-step protocol:**

**Step 1: Update the TypeScript interface**
```typescript
// src/shared/types/index.ts
// Add new field, change type, add new status value, etc.
// Example: Adding 'ncr_count' to Project
export interface Project {
  // ... existing fields
  ncrCount?: number;   // ← ADDED — link to SPEC Section 14.2
}
```

**Step 2: Update the fixture JSON**
```json
// src/shared/api/mock/fixtures/projects.json
{
  "projects": [
    {
      "id": "proj-001",
      ...
      "ncr_count": 3  // ← ADD to all fixture records
    }
  ]
}
```

**Step 3: Update the mock handler**
```typescript
// src/shared/api/mock/handlers/project.handlers.ts
// Ensure GET /projects response includes the new field
// Ensure POST/PUT handlers accept the new field if it's writable
http.get('/api/v1/projects', () => {
  return HttpResponse.json({
    success: true,
    data: projectsFixture.map(p => ({
      ...p,
      ncr_count: p.ncr_count ?? 0,  // ← ensure new field present
    })),
  });
}),
```

**Step 4: Add a SPEC comment linking to the source**
```typescript
// In the component that renders the new field:
// SPEC: Section 14.2 — NCR log count shown in project summary cards
<Badge>{project.ncrCount} NCRs</Badge>
```

**Rule:** If the backend contract changes (Step 4 in Phase 7), the TypeScript interface and fixture are the reference — the backend Pydantic schema must match them, never the other way around.

---

### Mock Data Naming Conventions

All fixture files use **snake_case for JSON keys** matching the API response format. TypeScript interfaces use **camelCase**. The API client layer handles the transform:

```typescript
// src/shared/api/transforms.ts
// Converts snake_case API responses → camelCase TypeScript objects
import { camelizeKeys, decamelizeKeys } from 'humps';

apiClient.interceptors.response.use((res) => ({
  ...res,
  data: camelizeKeys(res.data),
}));
apiClient.interceptors.request.use((config) => ({
  ...config,
  data: config.data ? decamelizeKeys(config.data) : config.data,
}));
```

This means:
- Fixtures use: `"part_number"`, `"unit_cost"`, `"created_at"`
- TypeScript uses: `partNumber`, `unitCost`, `createdAt`
- No manual mapping needed anywhere else

---

### Mock Handler Template (copy for every new module)

```typescript
// src/shared/api/mock/handlers/[module].handlers.ts
import { http, HttpResponse, delay } from 'msw';
import fixtureData from '../fixtures/[module].json';
import { MOCK_DELAY } from '../config';

// Helper: simulate realistic delay
const respond = async <T>(data: T, status = 200) => {
  await delay(Number(import.meta.env.VITE_MOCK_DELAY_MS) || MOCK_DELAY);
  return HttpResponse.json({ success: true, data }, { status });
};

const respondError = async (message: string, code: string, status = 400) => {
  await delay(200);
  return HttpResponse.json(
    { success: false, data: null, errors: [{ code, message }] },
    { status }
  );
};

export const [module]Handlers = [
  // LIST
  http.get('/api/v1/[module]', async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const filtered = fixtureData.[entities].filter(item =>
      item.name?.toLowerCase().includes(search)
    );
    return respond({ items: filtered, total: filtered.length });
  }),

  // GET ONE
  http.get('/api/v1/[module]/:id', async ({ params }) => {
    const item = fixtureData.[entities].find(i => i.id === params.id);
    if (!item) return respondError('Not found', 'NOT_FOUND', 404);
    return respond(item);
  }),

  // CREATE
  http.post('/api/v1/[module]', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    const newItem = {
      id: `mock-${Date.now()}`,
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    // In real MSW v2, you'd push to a store; in fixture mode, just return it
    return respond(newItem, 201);
  }),

  // UPDATE
  http.put('/api/v1/[module]/:id', async ({ params, request }) => {
    const body = await request.json() as Record<string, unknown>;
    const existing = fixtureData.[entities].find(i => i.id === params.id);
    if (!existing) return respondError('Not found', 'NOT_FOUND', 404);
    return respond({ ...existing, ...body, updated_at: new Date().toISOString() });
  }),

  // DELETE
  http.delete('/api/v1/[module]/:id', async ({ params }) => {
    const exists = fixtureData.[entities].some(i => i.id === params.id);
    if (!exists) return respondError('Not found', 'NOT_FOUND', 404);
    return respond({ id: params.id, deleted: true });
  }),
];
```