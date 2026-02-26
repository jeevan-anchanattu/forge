# FORGE — Full-Stack Product Specification v2.0
### **F**abrication & **O**perations **R**econstruction & **G**uidance **E**ngine
**Version 2.0 | Comprehensive Engineering-Grade Build Specification**
*Authored for AI Agent & Developer Implementation — Do Not Remove Any Section*

---

## TABLE OF CONTENTS

1. [Executive Vision](#1-executive-vision)
2. [Design System & UX Philosophy](#2-design-system--ux-philosophy)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [Module Isolation & Containerization Strategy](#4-module-isolation--containerization-strategy)
5. [Global State Management](#5-global-state-management)
6. [Mock API & External Integration Layer](#6-mock-api--external-integration-layer)
7. [Authentication & Access Control](#7-authentication--access-control)
8. [Organization & Team Management](#8-organization--team-management)
9. [AI Configuration & Model Registry](#9-ai-configuration--model-registry)
10. [AI Agent Automation System](#10-ai-agent-automation-system)
11. [AI Context Memory Engine](#11-ai-context-memory-engine)
12. [Storage & Integration Layer](#12-storage--integration-layer)
13. [Dashboard](#13-dashboard)
14. [Project Management Module](#14-project-management-module)
15. [Workbook Engine](#15-workbook-engine)
16. [Section Work Interface — Three-Panel Cockpit](#16-section-work-interface--three-panel-cockpit)
17. [PDF Intelligence Parser](#17-pdf-intelligence-parser)
18. [Section Analysis & Extraction Engine](#18-section-analysis--extraction-engine)
19. [Quotation & Cost Estimation Module](#19-quotation--cost-estimation-module)
20. [Inventory Management System](#20-inventory-management-system)
21. [WYSIWYG Editor & Smart Tables](#21-wysiwyg-editor--smart-tables)
22. [Revision Control System](#22-revision-control-system)
23. [Parallax Visualization Engine (Anime.js)](#23-parallax-visualization-engine-animejs)
24. [Output & Export Module](#24-output--export-module)
25. [Event-Driven Export & Job Processing](#25-event-driven-export--job-processing)
26. [Notification & Collaboration System](#26-notification--collaboration-system)
27. [Reports & Analytics Module](#27-reports--analytics-module)
28. [Admin Panel & Subscription Management](#28-admin-panel--subscription-management)
29. [Settings & Personalization](#29-settings--personalization)
30. [Data Models & Schema](#30-data-models--schema)
31. [API Specification](#31-api-specification)
32. [Tech Stack & Implementation Guide](#32-tech-stack--implementation-guide)
33. [Technical Prerequisites & Required Keys](#33-technical-prerequisites--required-keys)
34. [Free vs Paid Feature Matrix](#34-free-vs-paid-feature-matrix)
35. [Implementation Phases](#35-implementation-phases)
36. [Appendix A: Mechanical Manufacturing Process Reference](#appendix-a-mechanical-manufacturing-process-reference)
37. [Appendix B: Drawing Section Types Reference](#appendix-b-drawing-section-types-reference)
38. [Appendix C: Inventory Field Reference for Manufacturing](#appendix-c-inventory-field-reference-for-manufacturing)
39. [Appendix D: Weld & Material Standards Reference](#appendix-d-weld--material-standards-reference)

---

## 1. EXECUTIVE VISION

### 1.1 Product Tagline
> *"Think it. Build it. Ship it."* — The command center for mechanical fabrication engineers.

### 1.2 Core Problem Being Solved

Mechanical fabrication companies — from well-organized shops to those running on spreadsheets and gut instinct — all share the same pain:

- **Disorganized:** Engineering drawings arrive as PDFs; dimensions are manually re-typed into spreadsheets
- **Disconnected:** Quotation lives in Excel, manufacturing plan on paper, schedule in email
- **Invisible:** Project managers have zero real-time view of what's on the shop floor
- **Slow:** Creating a BOM, quotation, and manufacturing plan for a single workbook takes 2–3 days manually
- **Lossy:** Revisions arrive with no diff tracking; teams work from wrong drawing versions
- **Siloed:** Engineering, procurement, shop floor, and management never share a single source of truth

**FORGE eliminates all of this.** It is the Iron Man suit for mechanical engineers — an intelligent workspace that reads engineering documents, semantically understands context, extracts structured data, generates quotations, orchestrates manufacturing timelines, and produces presentation-grade deliverables. It works equally well for a 5-person shop hacking their way through contracts and a 500-person precision fabrication enterprise with ISO 9001 quality systems.

### 1.3 Target Users

| Role | Primary Use | Key Need |
|------|-------------|----------|
| Mechanical Engineer | Section analysis, spec extraction, BOM | Accurate data from drawings, fast |
| Estimator / Quotation | Quotation builder | Cost accuracy, quick turnaround |
| Project Manager | Dashboard, timeline, team | Visibility, milestone tracking |
| Fabrication Coordinator | Work orders, scheduling | Shop floor task management |
| QA / Inspector | Spec sheets, NDT records | Standards traceability |
| Procurement | BOM → PO | Supplier, pricing, lead time |
| Shop Floor Supervisor | Work orders, progress updates | Simple, minimal input UI |
| Org Admin / Owner | Reports, billing, team | Business-level insight |
| Client (future read-only portal) | Project status, deliverables | Transparency |

### 1.4 Key Differentiators

- **Context-aware PDF intelligence** — semantic extraction, not OCR copy-paste
- **Full manufacturing lifecycle** from drawing intake → shop floor sign-off → project retrospective
- **Bring-Your-Own-AI** — 10+ AI providers, task-specific routing, free tier fallback
- **AI Agent Automation** — human roles optionally replaced by AI agents on high-tier plans
- **External Chat Control** — instruct AI agents via Telegram, WhatsApp, Slack, or any configured chat interface
- **Tony Stark Anime.js visualization** — cinematic exploded-view assemblies from drawing data
- **Mock API mode** — instant demo with zero backend dependency
- **External integrations** — plug in existing ERP, inventory, or MRP systems
- **Productizable** — multi-tenant, subscription-based, white-labelable, enterprise-ready

### 1.5 Future Vision (AI Agents Replace Human Roles)

In high-tier subscriptions, every human role in the workflow can be optionally replaced by a configured AI agent:
- **AI Estimator Bot** reads drawing, generates full quotation, submits for human approval
- **AI Procurement Bot** generates purchase orders from BOM, emails suppliers
- **AI QA Bot** reviews spec tables against standards, flags non-conformances
- **AI Scheduler Bot** generates optimal manufacturing schedule from workbook data
- **AI Reporter Bot** sends daily project status updates to configured chat channels

All agents are human-in-the-loop by default (suggest, human approves) with optional fully-autonomous mode.

---

## 2. DESIGN SYSTEM & UX PHILOSOPHY

### 2.1 Visual Identity

**Theme:** Futuristic dark industrial — JARVIS HUD meets precision engineering. When the org logo is uploaded, its primary color is extracted and used as a subtle accent tint throughout that org's app instance, giving the tool a personalized company identity.

**Color Palette (Dark Theme — Default):**
```
Background Primary:    #0A0E1A  (near-black navy)
Background Secondary:  #0F1629  (dark panel)
Background Card:       #141B2D  (elevated card)
Surface:               #1A2440  (interactive surface)
Border:                #1E2D4A  (subtle border)
Accent Primary:        #00D4FF  (electric cyan — primary CTA)
Accent Secondary:      #FF6B35  (burnt orange — warnings/alerts)
Accent Tertiary:       #7B2FBE  (deep violet — badges/tags)
Success:               #00E5A0  (mint green)
Warning:               #FFB800  (amber)
Error:                 #FF3B5C  (crimson)
Text Primary:          #E8F0FF  (near-white)
Text Secondary:        #8B9CC4  (muted blue-grey)
Text Tertiary:         #4A5980  (dim)
Highlight:             #00D4FF22 (translucent cyan glow)
Org Accent (dynamic):  Extracted from org logo — applied to sidebar header,
                        active nav indicators, org avatar border ring
```

**Color Palette (Light Theme):**
```
Background Primary:    #F0F4FF
Background Secondary:  #E8EDF8
Background Card:       #FFFFFF
Surface:               #F5F8FF
Border:                #D0D9EE
Accent Primary:        #0066CC
Accent Secondary:      #E84E1B
Text Primary:          #0A1029
Text Secondary:        #4A5568
```

### 2.2 Typography

```css
/* Primary UI font */
font-family: "Inter", sans-serif;

/* Display / dashboard headers / KPI numbers */
font-family: "Space Grotesk", sans-serif;

/* All specs, dimensions, part numbers, codes, measurements */
font-family: "JetBrains Mono", "Fira Code", "Mono", monospace;
/* Applied via: font-code class or data-type="spec" | data-type="dimension" */
/* Example: class="font-mono text-cyan-400 tracking-wider" */

/* Presentation view labels and callouts */
font-family: "Mono", monospace;  /* as specified — clean, industrial */
```

**Typography Rules:**
- All numerical dimensions and tolerances: `font-mono text-[#00D4FF]` (cyan mono)
- Part numbers and drawing codes: `font-mono text-[#FFB800]` (amber mono)
- Standards citations (AWS D1.1, etc.): `font-mono text-[#7B2FBE]` (violet mono)
- Body text (summaries, notes): Inter, regular weight
- Section headers: Space Grotesk, semibold

### 2.3 Component Design Language

**Cards:** Subtle glassmorphism with 1px cyan border glow on hover. `backdrop-filter: blur(12px)`. Box shadow: `0 4px 24px rgba(0,212,255,0.08)`.

**Buttons:**
- Primary: Solid cyan with black text, slight glow on hover (`shadow-[0_0_16px_rgba(0,212,255,0.4)]`)
- Secondary: Ghost with cyan border
- Destructive: Red border ghost
- AI Action: Violet gradient with pulse animation
- Agent Action: Amber gradient (denotes AI agent-executed)

**Icons:** Lucide React icons throughout. Custom SVG icons for manufacturing-specific concepts (weld symbol, CNC, lathe, plasma cutter, NDT probe, etc.).

**Inputs:** Dark surface with cyan focus ring, animated label float.

**Loading States:** Scanning animation using CSS grid lines — like a radar sweep or HUD scan. Progress bars use pulsing cyan fill.

**Transitions:** Framer Motion for route transitions (slide + fade). Anime.js for data visualizations and the parallax presentation engine.

**Note Cards (Anime.js inspired):**
Notes displayed in the work area and presentation view use the `data-card="intuitive"` pattern inspired by the anime.js website:
```html

  

```
CSS: `transform-style: preserve-3d`, mouse-tracking `rotateX/Y` via JS event listener, `transition: transform 0.3s ease`.

**Progress Cards (Home/Presentation):**
`data-widget="progress-card"` — shown while scrolling through the presentation view. These stick to a fixed rail on the left during scroll, showing: section name, completion %, status badge, key specs count. Implemented via `position: sticky` + IntersectionObserver.

### 2.4 Layout System

```
Sidebar (collapsed: 64px / expanded: 260px) — persisted in user preferences
  ├─ Top: Org logo (click to expand org details tooltip)
  ├─ Nav items with icons + labels
  └─ Bottom: User avatar, settings, help

Top Bar (56px) — breadcrumb trail, global search (Cmd+K), notification bell, user avatar

Main Content Area — responsive, scrollable, padded

Right Panel — AI Assistant (default 320px, collapsible to 0, expandable to 480px)
Left Panel  — PDF Viewer (in section cockpit: default 380px, collapsible to 48px icon strip, expandable to 600px)
Review Panel — Mirrors AI panel placement, toggled separately (320px collapsible)
```

**Panel Collapse/Expand Behavior:**
- Each panel has a `◀` / `▶` toggle button at its edge (32×32px, semi-transparent)
- Collapsed state: 48px icon-only strip showing panel type icon
- Expanded state: full width with smooth Framer Motion spring animation (`stiffness: 300, damping: 30`)
- Panel widths are drag-resizable (mouse drag on the divider line)
- State persisted per user in localStorage and synced to DB preferences

**Grid:** 12-column CSS Grid. Cards use 4/6/12 column spans based on viewport.

### 2.5 UX Principles

1. **Zero cognitive overhead on repeated tasks** — remembered, autocompleted, suggested always
2. **No dead ends** — every screen has a clear next action prominently placed
3. **Progressive disclosure** — show minimal info first, expand on demand
4. **AI is ambient** — always available in the right panel, never intrusive
5. **The dashboard is a command center** — any KPI visible within 3 seconds of login
6. **Every destructive action has consequence explanation** — not just "Are you sure?"
7. **Shop floor accessibility** — key status update screens designed for tablet/touch, large tap targets
8. **Keyboard-first power users** — Cmd+K global search, keyboard shortcuts for all common actions
9. **The tool works for organized and chaotic shops alike** — optional fields are truly optional, nothing blocks basic usage
10. **Performance over aesthetics** — if an animation costs >16ms frame budget, skip it

---

## 3. SYSTEM ARCHITECTURE OVERVIEW

### 3.1 High-Level Stack

```
┌─────────────────────────────────────────────────────────────────────┐
│                              FORGE v2.0                             │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                        FRONTEND                             │   │
│  │  React 18 + Vite + TypeScript                               │   │
│  │  Tailwind CSS + Framer Motion + Anime.js                    │   │
│  │  TipTap (WYSIWYG) + TanStack Table + TanStack Query         │   │
│  │  Zustand (global state) + React Context (module state)      │   │
│  │  Module Federation (Webpack 5) — isolated feature modules   │   │
│  │  Mock API Layer (MSW — Mock Service Worker)                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                               │                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                         BACKEND                             │   │
│  │  Python FastAPI (core API gateway)                          │   │
│  │  Celery + Redis (background task queue)                     │   │
│  │  PyMuPDF + OpenCV (PDF/image processing)                    │   │
│  │  LangChain + LlamaIndex (AI orchestration)                  │   │
│  │  WebSocket server (real-time collaboration)                 │   │
│  │  Event Bus: Redis Pub/Sub + Celery (export jobs)            │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                               │                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      DATA LAYER                             │   │
│  │  PostgreSQL 15 (primary relational data)                    │   │
│  │  Redis 7 (cache, sessions, pub/sub, task queue)             │   │
│  │  MinIO / AWS S3 (file & object storage)                     │   │
│  │  Google Drive API (optional cloud sync)                     │   │
│  │  Firebase (free-tier PoC: Firestore + Storage)              │   │
│  │  Vector DB: Chroma / Qdrant (AI context memory)             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                               │                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      AI GATEWAY                             │   │
│  │  Model Router → OpenAI / Anthropic / xAI / Google           │   │
│  │              → DeepSeek / Perplexity / Mistral              │   │
│  │              → HuggingFace (free tier) / Ollama (local)     │   │
│  │  Task-type dispatch + fallback chain                        │   │
│  │  Context Memory injection per request                       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                               │                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   AGENT RUNTIME                             │   │
│  │  AI Agent Orchestrator (LangGraph / AutoGen)                │   │
│  │  Chat Interface Bridge: Telegram Bot API / WhatsApp Cloud   │   │
│  │                          Slack API / Discord / Email         │   │
│  │  Agent Task Queue (Celery beat scheduled + on-demand)       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                               │                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │               EXTERNAL INTEGRATION ADAPTER                  │   │
│  │  Configurable REST/GraphQL adapters for:                    │   │
│  │  → External ERP / MRP systems                               │   │
│  │  → Third-party inventory management apps                    │   │
│  │  → Accounting systems (QuickBooks, Sage, SAP)               │   │
│  │  → Drawing/CAD platforms (future)                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Deployment Model

- **Local/Self-hosted:** Docker Compose (all services in one stack)
- **Cloud:** Any VPS, Railway, Render, AWS ECS, GCP Cloud Run, Azure Container Apps
- **Multi-tenant:** Every DB query scoped via `org_id`. Row-level security (RLS) on PostgreSQL
- **Horizontal scaling:** Celery workers scale independently; FastAPI behind load balancer
- **Environment config:** `.env` for app-level; per-org encrypted keys stored in DB; `.env.mock` for mock mode

---

## 4. MODULE ISOLATION & CONTAINERIZATION STRATEGY

### 4.1 Philosophy

Each major feature module is **independently deployable, independently testable, and cascading-change-free**. A change to the Quotation module should never break the PDF Parser or the Revision system.

### 4.2 Frontend Module Isolation

**Strategy:** React feature modules with explicit boundary contracts.

```
/src/
  /modules/
    /auth/              — login, session lock, OAuth
    /org/               — organization, team management
    /dashboard/         — global dashboard, KPIs
    /projects/          — project CRUD, project dashboard
    /workbooks/         — workbook engine, status flow
    /sections/          — section cockpit, three-panel interface
    /pdf-parser/        — PDF viewer, scale tool, annotations
    /ai-assistant/      — AI panel, context memory, agent chat
    /review-panel/      — review comments, approval workflow
    /bom/               — bill of materials table
    /inventory/         — org + project inventory
    /quotation/         — quotation builder (multi-page)
    /schedule/          — Gantt, task management
    /revisions/         — revision timeline, diff viewer
    /visualization/     — Anime.js parallax engine
    /exports/           — export builder, job status
    /reports/           — analytics, reporting module
    /notifications/     — notification center
    /admin/             — superadmin panel
    /settings/          — user + org + AI + storage settings
  /shared/
    /components/        — reusable components (Button, Table, Modal, etc.)
    /hooks/             — shared hooks (useAuth, useOrg, useProject, etc.)
    /store/             — Zustand global stores
    /api/               — API client layer (real + mock)
    /types/             — shared TypeScript interfaces
    /utils/             — shared utilities
```

**Module Contract Rules:**
- Modules communicate via **Zustand global stores** (read) and **events** (write)
- No module directly imports another module's internal components
- Each module exposes only its `index.ts` public API
- Module-level state lives in its own Zustand slice; it must not mutate another module's slice
- New features added to a module stay within its boundary

### 4.3 Backend Module Isolation

```
/app/
  /routers/             — FastAPI routers (one per module)
    auth.py, orgs.py, projects.py, workbooks.py,
    sections.py, bom.py, inventory.py, quotations.py,
    revisions.py, exports.py, reports.py, notifications.py,
    admin.py, settings.py, agents.py, integrations.py
  /services/            — Business logic (one service class per domain)
    AuthService, OrgService, ProjectService, WorkbookService,
    SectionService, BomService, InventoryService, QuotationService,
    RevisionService, ExportService, AIGatewayService,
    AgentService, ContextMemoryService, IntegrationService
  /tasks/               — Celery tasks (one file per domain)
    pdf_tasks.py, export_tasks.py, agent_tasks.py, notification_tasks.py
  /models/              — SQLAlchemy models
  /schemas/             — Pydantic schemas (request/response)
  /core/                — Config, DB setup, Redis, security
  /integrations/        — External adapter implementations
```

**Backend Contract Rules:**
- Routers call Service methods only — no direct DB queries in routers
- Services call Repository methods only — no raw SQL in services
- Tasks call Service methods — tasks are thin orchestrators
- Adding a new feature: add router endpoint → add service method → add repository → add schema
- Zero cross-service imports at the same layer level (auth service never calls quotation service)

### 4.4 Docker Compose Service Map

```yaml
services:
  frontend:         # React app (Vite dev server / Nginx in prod)
  api:              # FastAPI core
  worker-pdf:       # Celery worker: PDF parsing tasks
  worker-ai:        # Celery worker: AI generation tasks
  worker-export:    # Celery worker: export/document generation jobs
  worker-agent:     # Celery worker: AI agent execution
  worker-notify:    # Celery worker: notification dispatch
  beat:             # Celery beat scheduler (scheduled tasks)
  redis:            # Cache + message broker + pub/sub
  postgres:         # Primary database
  minio:            # Object storage (S3-compatible)
  chroma:           # Vector DB for AI context memory
  nginx:            # Reverse proxy + SSL termination
```

Each worker type scales independently: `docker compose scale worker-pdf=3 worker-ai=5`

---

## 5. GLOBAL STATE MANAGEMENT

### 5.1 Zustand Store Architecture

Global state is organized into **named slices** — each slice is a separate Zustand store. They are composed into a root store accessible via a single `useForgeStore()` hook, but updated only through their own slice actions.

```typescript
// /src/shared/store/index.ts — Root store composition

// Auth slice
interface AuthSlice {
  user: User | null;
  token: string | null;
  orgId: string | null;
  sessionLocked: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  lockSession: () => void;
  unlockSession: () => void;
}

// Org slice
interface OrgSlice {
  org: Organization | null;
  members: OrgMember[];
  subscription: SubscriptionTier;
  featureFlags: Record;
  setOrg: (org: Organization) => void;
  checkFeature: (flag: string) => boolean;
}

// Active context slice — what the user is currently working on
interface ActiveContextSlice {
  projectId: string | null;
  workbookId: string | null;
  sectionId: string | null;
  project: Project | null;
  workbook: Workbook | null;
  section: Section | null;
  setActiveProject: (project: Project) => void;
  setActiveWorkbook: (workbook: Workbook) => void;
  setActiveSection: (section: Section) => void;
  clearContext: () => void;
}

// UI state slice — panel visibility, theme, layout
interface UISlice {
  theme: 'dark' | 'light' | 'system';
  sidebarExpanded: boolean;
  aiPanelOpen: boolean;
  aiPanelWidth: number;
  pdfPanelOpen: boolean;
  pdfPanelWidth: number;
  reviewPanelOpen: boolean;
  reviewPanelWidth: number;
  toasts: Toast[];
  modals: Modal[];
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  togglePDFPanel: () => void;
  toggleReviewPanel: () => void;
  addToast: (toast: Toast) => void;
  openModal: (modal: Modal) => void;
  closeModal: (id: string) => void;
}

// AI context slice
interface AIContextSlice {
  contextMemory: ContextMemoryPoint[];
  conversationHistory: Message[];
  agentStatus: Record;
  addMemoryPoint: (point: ContextMemoryPoint) => void;
  addMessage: (msg: Message) => void;
  clearConversation: () => void;
}

// Notifications slice
interface NotificationSlice {
  notifications: Notification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (n: Notification) => void;
}
```

### 5.2 State Persistence Strategy

```typescript
// Persisted to localStorage (lightweight, UI preferences only):
persistedSlices = ['ui', 'auth.sessionLocked'];

// Persisted to DB (synced on login, user-specific):
dbSyncedSlices = ['ui.theme', 'ui.sidebarExpanded', 'ui.aiPanelWidth',
                  'ui.pdfPanelWidth', 'settings.pdfZoom'];

// In-memory only (cleared on page refresh — refetched from API):
memoryOnlySlices = ['activeContext', 'aiContext.conversationHistory', 
                    'notifications'];
```

### 5.3 Cross-Module Data Passing

Modules do not pass data via props across module boundaries. They read from the global store:

```typescript
// In any module — access active context
const { projectId, workbookId, sectionId } = useForgeStore(s => s.activeContext);

// In any module — trigger navigation + context change
const { setActiveSection } = useForgeStore(s => s.activeContextActions);
setActiveSection(section); // updates store → components re-render via subscription
```

**React Query** handles all server state (fetching, caching, invalidation). It is the single source of truth for data from the API. Zustand handles UI state and cross-screen context.

---

## 6. MOCK API & EXTERNAL INTEGRATION LAYER

### 6.1 Mock API Mode (Demo / Development)

**Controlled via `.env` flag:**
```bash
# .env
VITE_MOCK_API=false          # Set to true for demo mode
VITE_MOCK_DELAY_MS=400       # Simulate realistic API latency
VITE_MOCK_ORG=cambridge_profab  # Load specific org fixture
```

**Implementation:** Mock Service Worker (MSW v2) intercepts all fetch/axios requests at the browser service worker level when `VITE_MOCK_API=true`. Zero code changes between mock and real mode.

```typescript
// /src/shared/api/index.ts
// Automatically uses mock or real handlers based on env flag
if (import.meta.env.VITE_MOCK_API === 'true') {
  const { worker } = await import('./mock/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}
```

**Mock Data Structure:**
```
/src/shared/api/mock/
  handlers/           — MSW request handlers per module
    auth.handlers.ts
    projects.handlers.ts
    workbooks.handlers.ts
    sections.handlers.ts
    bom.handlers.ts
    ...
  fixtures/           — Realistic static data files
    organizations.json
    projects.json
    workbooks.json     — Includes CPF#8250016-6B1 sample
    sections.json      — Pre-parsed sections from sample PDF
    inventory.json
    quotations.json
  browser.ts          — MSW browser worker setup
  server.ts           — MSW node server setup (for tests)
```

**Mock data includes the sample CPF#8250016-6B1 drawing** fully pre-parsed so demos always show a realistic, populated workbook immediately.

### 6.2 External Integration Adapter System

The Integration Layer allows FORGE to connect to any external system (ERP, inventory, MRP, accounting) via configurable adapters.

**Architecture:**
```
ExternalIntegrationAdapter (abstract base)
  ├── InventoryAdapter       — GET items, sync stock levels
  ├── SupplierAdapter        — GET suppliers, GET pricing
  ├── AccountingAdapter      — POST invoices, GET PO numbers
  ├── ERPAdapter             — GET projects, POST work orders
  └── CustomAdapter          — User-defined field mapping
```

**Configuration (per org, in Settings > Integrations):**
```json
{
  "adapter_type": "inventory",
  "name": "Our ERP System",
  "base_url": "https://erp.ourcompany.com/api/v2",
  "auth_type": "bearer_token",
  "auth_token": "ENCRYPTED_TOKEN",
  "field_mapping": {
    "forge.part_number": "erp.item_code",
    "forge.description": "erp.item_description",
    "forge.unit_cost": "erp.last_purchase_price",
    "forge.supplier": "erp.preferred_vendor_name",
    "forge.stock_qty": "erp.quantity_on_hand"
  },
  "sync_direction": "read_only",
  "sync_schedule": "hourly",
  "enabled": true
}
```

**Behavior:**
- When FORGE's inventory autocomplete is triggered, it queries both internal inventory AND all enabled external adapters
- Results are merged and deduplicated by part number
- External items shown with a `[External: ERP]` badge
- If user adds an external item to BOM, FORGE stores a reference + snapshot (not a live link) to prevent data loss if external system changes

**Adapter SDK (for custom integrations):**
- FORGE provides a documented REST webhook specification that any external system can implement
- Third-party developers can build and register custom adapters

---

## 7. AUTHENTICATION & ACCESS CONTROL

### 7.1 Authentication Flows

**Option A: Google OAuth (if `GOOGLE_CLIENT_ID` configured in `.env`)**
- "Sign in with Google" button shown on login page
- Google profile photo used as avatar
- Email auto-verified; existing accounts linked by email

**Option B: Email + Password (always available)**
- Standard email/password with bcrypt (cost factor 12) hashing
- Email verification required before first login
- Forgot password via signed email link (15 min expiry)
- Password strength meter on signup

**Option C: 6-Digit Session Lock PIN**
- Set optionally after login (Settings > Security)
- PIN stored in browser `localStorage` hashed with SHA-256 + salt
- Idle timeout triggers lock screen (configurable: 5/10/15/30 min)
- Lock screen shows org logo + "Enter PIN to continue"
- "Forgot PIN?" → answer security question → reset PIN (new question required)
- Security question + answer stored in localStorage (answer SHA-256 hashed)
- PIN is purely a screen lock — does NOT replace JWT session auth
- On PIN entry, the app resumes exactly where the user left off (scroll position, open panels preserved)

**Implementation Notes:**
- JWT access tokens: 15 min expiry, stored in memory (not localStorage)
- Refresh tokens: 30-day expiry, stored in httpOnly SameSite=Strict cookies
- CSRF protection via `X-CSRF-Token` header on all mutation endpoints
- Rate limiting on auth endpoints: 5 failures → 15-min exponential backoff lockout
- Audit log: all login events with IP, user agent, timestamp

### 7.2 Role Hierarchy (Organization-wide)

```
Super Admin (app owner) > Org Admin > Owner (Project) > Coordinator > 
Contributor > Reviewer > Reader > Shop Floor (limited)
```

**Super Admin:** App-level — manages all orgs, subscriptions, feature flags, app AI keys
**Org Admin:** Full org control — create/delete projects, manage all members, billing, org settings, template management
**Owner (Project):** Full CRUD on their project, assign project roles, approve quotations, sign off manufacturing
**Coordinator:** Assign tasks, update statuses, manage schedule, create work orders
**Contributor:** Edit workbooks/sections assigned to them, create BOM, create drafts
**Reviewer:** Add comments, approve/reject sections, view all content
**Reader:** View-only to projects they are invited to
**Shop Floor (new):** Mobile-optimized limited access — update task status, add completion notes, upload photos of completed work. Cannot see quotations or financial data.

### 7.3 Permission Matrix (Expanded)

| Action | Shop Floor | Reader | Reviewer | Contributor | Coordinator | Owner | Org Admin |
|--------|-----------|--------|----------|-------------|-------------|-------|-----------|
| View project (non-financial) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View quotation/costs | — | — | — | ✓ | ✓ | ✓ | ✓ |
| Update task status | ✓ | — | — | ✓ | ✓ | ✓ | ✓ |
| Upload completion photos | ✓ | — | — | ✓ | ✓ | ✓ | ✓ |
| Edit workbook content | — | — | — | ✓ | ✓ | ✓ | ✓ |
| Add review comments | — | — | ✓ | ✓ | ✓ | ✓ | ✓ |
| Approve sections | — | — | ✓ | — | ✓ | ✓ | ✓ |
| Create quotation | — | — | — | ✓ | ✓ | ✓ | ✓ |
| Approve quotation | — | — | — | — | — | ✓ | ✓ |
| Publish revision | — | — | — | — | ✓ | ✓ | ✓ |
| Sign off manufacturing | — | — | — | — | — | ✓ | ✓ |
| Manage project members | — | — | — | — | — | ✓ | ✓ |
| Add to org inventory | — | — | — | — | ✓ | ✓ | ✓ |
| Manage org templates | — | — | — | — | — | — | ✓ |
| Configure org settings | — | — | — | — | — | — | ✓ |
| Manage subscriptions | — | — | — | — | — | — | ✓ |
| Control AI agents | — | — | — | — | ✓ | ✓ | ✓ |

---

## 8. ORGANIZATION & TEAM MANAGEMENT

### 8.1 Organization Setup (First-Time Onboarding)

**Step 1 — Create Organization**
- Org name, industry (manufacturing/fabrication/engineering/multi-discipline)
- Logo upload (SVG, PNG, JPEG — used for app branding + document headers)
- Country, timezone
- Company type: Sole proprietor / Partnership / Corporation / Other

**Step 2 — Company Profile**
- Primary address (street, city, province/state, postal code, country)
- Mailing address (if different)
- Primary phone, secondary phone
- Primary email (for outgoing correspondence — used in quotation footers)
- Website URL
- Tax ID / GST / HST / VAT number (used in quotations)
- Bank details (for payment terms in quotations — shown only in certain templates)
- Fiscal year start, default currency, default unit system (Imperial/Metric/Both)

**Step 3 — Operational Defaults**
- Labour rate table (per trade — see Section 8.2)
- Overhead % default
- Profit margin default (separate for labour/material)
- Contingency % default
- Standard payment terms (Net 30, Net 60, etc.)
- Default quotation validity period (days)
- Scrap/waste factor %

**Step 4 — Document Templates**
- Email templates (see Section 8.4)
- Quotation template (header/footer/terms — see Section 8.5)
- Output document template (report branding)

**Step 5 — Invite Team**
- Bulk invite by email with role assignment
- Shareable invitation link (7-day expiry, role pre-set)
- Optional: pre-assign to specific projects on invite

**After Setup:** Organization screen is hidden from main nav. It lives only in **Settings > Organization**. The org logo appears in the sidebar header at all times.

### 8.2 Labour Rate Table

```
Trade                    Rate ($/hr)   OT Multiplier   Notes
─────────────────────────────────────────────────────────────
Welder (certified)       [configurable]  1.5x         CWB certified
Welder (tacker)          [configurable]  1.5x         
Fitter / Layout          [configurable]  1.5x         
Machinist                [configurable]  1.5x         
Plasma/Laser Operator    [configurable]  1.5x         
Grinder / Finisher       [configurable]  1.5x         
Painter / Blaster        [configurable]  1.5x         
QA / Inspector           [configurable]  1.5x         
Millwright               [configurable]  1.5x         
Project Manager / Eng.   [configurable]  1.0x         Salaried
Procurement              [configurable]  1.0x         Salaried
Shipping / Logistics     [configurable]  1.5x         
General Labour           [configurable]  1.5x         
Custom Trade             [add row]       [configurable]
```

Rates are editable at org level. Project-level overrides allowed.

### 8.3 Organization Team Member View

**Location:** Settings > Organization > Team

**Team Member Card (in list + expandable):**
```
┌─ [Avatar] John Davidson ───────────────────────────────────────┐
│ Role: Senior Mechanical Engineer | Coordinator                 │
│ Email: john.d@company.com | Phone: +1 (519) 555-0192          │
│ Joined: Jan 15, 2025 (13 months ago)                          │
│ Status: Active                                                 │
│                                                                │
│ Active Projects (2):                                           │
│  • CPF#8250016-6B1 — SCR Duct Box 6 [MANUFACTURING PROGRESS] │
│    Next Due: Mar 10, 2026 (Weld QA Inspection)               │
│  • CPF#8250017-3A — Duct Assembly Box 3 [PLAN STARTED]       │
│    Next Due: Mar 22, 2026 (Material Procurement)              │
│                                                                │
│ Latest Milestone: "Fit-up Complete — Box 6 Section A-A"       │
│                   Updated 2 hours ago                         │
│                                                                │
│ [Change Role ▾]  [Remove from Org]  [Send Message]           │
└────────────────────────────────────────────────────────────────┘
```

**Team Overview Table (sortable):**

| Avatar | Name | Role | Joined | Active Projects | Next Due | Last Active |
|--------|------|------|--------|----------------|----------|-------------|
| 🟢 | John D. | Coordinator | Jan 2025 | 2 | Mar 10 | 2h ago |
| 🟢 | Alice K. | Reviewer | Mar 2024 | 1 | Mar 22 | Online now |

### 8.4 Email Templates (Org Admin)

**Location:** Settings > Organization > Email Templates

Configurable templates for:
- Invitation email (new member join)
- Quotation sent to client
- Quotation approved / rejected notification
- Project status change notification
- Manufacturing sign-off notification
- Project delivery notification
- Reminder: deadline approaching

**Template Editor:**
- WYSIWYG email editor with variable placeholders: `{{client_name}}`, `{{project_name}}`, `{{quotation_total}}`, `{{company_name}}`, `{{user_name}}`, `{{due_date}}`
- Preview mode: renders with sample data
- From address: configurable (uses org SMTP settings or SendGrid)
- Reply-to: configurable per template
- Attach generated PDFs toggle (for quotation emails)
- AI Rewrite button: "Make more professional / more concise / translate (future)"

### 8.5 Document Templates (Org Admin)

**Location:** Settings > Organization > Document Templates

**Quotation Template:**
- Header: logo position, company name style, address block format
- Color scheme: primary/secondary (pulls from org branding)
- Terms & conditions block (WYSIWYG — full multi-paragraph legal text)
- Validity statement
- Payment terms block
- Exclusions template (common exclusions pre-populated, editable)
- Signature fields: prepared by / approved by / client acceptance
- Footer: page numbering style, confidentiality notice
- Watermark text (for draft/confidential versions)

**Report/Design Plan Template:**
- Cover page layout (logo size/placement, project info block layout)
- Section header style
- Font selections (from safe web/system font list)
- Header/footer content per page

**Work Order Template:**
- Company header
- Task table format
- Sign-off box layout
- Safety notice (configurable)

### 8.6 Member Invitation Flow

- Inviter selects role + optional project pre-assignment
- Email sent using org email template
- Invitee clicks link → account creation (or link existing Google account)
- Auto-joined to org with assigned role
- Welcome screen: org overview + assigned projects
- Onboarding checklist: profile complete / PIN set / notifications configured

---

## 9. AI CONFIGURATION & MODEL REGISTRY

### 9.1 AI Gateway Architecture

The AI Gateway is a central router dispatching tasks to models based on task type, configured priority, and live fallback chain.

### 9.2 Task-Type to Model Mapping

```
TASK TYPE                  PRIMARY             SECONDARY          FREE FALLBACK
──────────────────────────────────────────────────────────────────────────────
pdf_parse_structure        Claude 3.5 Sonnet   GPT-4o             Mistral-7B (HF)
pdf_extract_dimensions     GPT-4o Vision        Claude 3.5         Gemini Flash
bom_table_extract          Claude 3.5 Sonnet   GPT-4o             Zephyr (HF)
weld_symbol_decode         GPT-4o Vision        Claude 3.5         N/A (needs vision)
text_gen_standard          GPT-4o-mini          DeepSeek-V3        Mistral-7B (HF)
text_gen_premium           GPT-4o / Claude Opus Gemini 1.5 Pro    N/A
quotation_calculation      GPT-4o-mini          DeepSeek-V3        Mistral-7B (HF)
search_citations           Perplexity Sonar     Tavily + GPT-4o    N/A
creative_doc_format        Claude 3.5 Sonnet   GPT-4o             Mistral-7B (HF)
agent_orchestration        GPT-4o / Claude Opus GPT-4o-mini        N/A (paid only)
context_memory_embed       text-embedding-3    voyage-3           all-MiniLM (HF)
3d_model_gen (future)      Point-E / Shap-E    Custom             N/A
```

**Configuration:** Each row in the table above is independently configurable in Settings > AI. "Use same model for all" toggle simplifies setup.

### 9.3 Supported AI Providers

| Provider | Models Available | Auth Method |
|----------|-----------------|-------------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-o1, text-embedding-3 | API Key |
| Anthropic | Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku | API Key |
| xAI | Grok-2, Grok-2-Vision | API Key |
| Google | Gemini 1.5 Pro, Gemini 1.5 Flash, text-embedding | API Key |
| Perplexity | Sonar Pro, Sonar Online, Sonar Small | API Key |
| DeepSeek | DeepSeek-V3, DeepSeek-Coder | API Key |
| Microsoft Azure | Azure OpenAI (all GPT models) | Key + Endpoint |
| Mistral | Mistral Large, Mistral Small, Mistral Embed | API Key |
| HuggingFace | Mistral-7B, Zephyr-7B, Phi-3, all-MiniLM | Hub Token (free) |
| Ollama | Any locally-served model | localhost URL |
| Voyage AI | voyage-3 (embeddings) | API Key |

### 9.4 Key Management Rules

1. **App-level keys** in `.env` → used for orgs on admin-assigned trial/demo plans
2. **Org-level keys** in Settings > AI → encrypted (AES-256-GCM) before DB storage; override app keys
3. **User-level keys** (personal) → override for personal AI calls (not used in shared/published work)
4. Keys decrypted only at request time, in-memory, never logged
5. Keys never appear in API responses or frontend state
6. Key validation: test ping on save (shows ✅ Valid / ❌ Invalid / ⚠ Limited Quota)

### 9.5 AI Settings UI

**Location:** Settings > AI Configuration

- Per-task-type model selector dropdowns (or "Same for all" toggle)
- Provider cards: connection status, estimated monthly spend, quota gauge
- Test connection button per provider
- HuggingFace: Hub token input OR "Use anonymous (rate-limited)" toggle
- Ollama: custom URL field (default: `http://localhost:11434`)
- AI cost estimate: projected cost based on current usage patterns × selected model pricing
- "Budget alert" threshold: notify if estimated monthly spend exceeds $X

---

## 10. AI AGENT AUTOMATION SYSTEM

### 10.1 Vision

In high-subscription tiers, every human workflow role can be optionally augmented or replaced by an AI agent. Agents are **human-in-the-loop by default** (suggest action → human approves) with an optional **autonomous mode** (act → notify human of outcome). All agent instructions can be sent via external chat interfaces (Telegram, WhatsApp, Slack, email, or FORGE's own chat).

### 10.2 Agent Types

| Agent | Human Role Replaced | Key Tasks | Autonomy Level |
|-------|--------------------|-----------|----|
| DrawingAnalyst | Junior Engineer | PDF parse, section extraction, spec table draft | Suggest (default) / Auto |
| Estimator | Estimator | BOM build, quotation draft, cost calculation | Suggest / Auto |
| Procurement | Procurement Officer | PO generation, supplier email, material requisition | Suggest / Auto |
| Scheduler | Coordinator | Task plan generation, Gantt build, work order creation | Suggest / Auto |
| QAReviewer | QA Inspector | Spec validation against standards, flag non-conformances | Suggest / Auto |
| Reporter | Project Manager | Daily status report, milestone update, client update | Suggest / Auto |
| Notifier | Admin | Deadline reminders, status escalations, team nudges | Auto (notify-only) |

### 10.3 Agent Configuration (per Org)

**Location:** Settings > AI Agents

For each agent type:
```
Agent: Estimator Bot
  Status: [Enabled / Disabled]
  Autonomy Mode: [Suggest (Human Approves) / Semi-Auto / Fully Autonomous]
  Trigger:
    □ When workbook reaches "Plan Complete" status
    □ When user explicitly requests via chat
    □ Scheduled (e.g., every Monday 8AM)
  Model: [inherit org AI config / override: GPT-4o]
  Notification: 
    □ Notify owner when task complete
    □ Notify assigned user
  Chat Channel: [Telegram @ForgeBotProfab / WhatsApp +1519... / Slack #forge-bot]
  Approval Required Before:
    □ Publishing quotation revision
    □ Sending emails to clients
    □ Modifying inventory quantities
```

### 10.4 Chat Interface Bridge (Telegram / WhatsApp / Slack)

**Supported Channels:**
- Telegram Bot API
- WhatsApp Business Cloud API (Meta)
- Slack API (Bot Token)
- Discord Webhook
- Email (receive via IMAP, respond via SMTP)

**Configuration (per Org, in Settings > Integrations > Chat Channels):**
```
Channel: Telegram
  Bot Token: [ENCRYPTED]
  Authorized Users: [map org user → Telegram user_id]
  Commands Allowed: [status updates, approve/reject, query, assign tasks]
  Notification Only Mode: [toggle — bot only sends, doesn't receive commands]
```

**Example Chat Interactions (Telegram):**

User → Bot: `forge status CPF#8250016-6B1`
Bot → User: "📋 SCR Duct Box 6 | Status: Manufacturing Progress | 68% complete | Next: Weld QA Inspection due Mar 14 | Assignee: Dave M."

User → Bot: `forge approve quotation QT-2026-0047`
Bot → User: "✅ Quotation QT-2026-0047 approved. Total: $102,441. Client notification sent."

User → Bot: `forge create schedule workbook WB-0023`
Bot → User: "🤖 Estimator Bot is generating the manufacturing schedule for Workbook 0023. I'll notify you when complete (est. 2 min)."

**Agent Action Log:** All agent actions (chat-triggered or autonomous) are logged with: agent type, action taken, data changed, triggered by (user/schedule/status), timestamp. Visible in project activity feed.

### 10.5 Agent Execution Flow

```
Trigger (status change / chat command / schedule)
     │
     ▼
Agent picks up task from queue (Celery + Redis)
     │
     ▼
Agent loads context (org settings + project + workbook + active revision memory)
     │
     ▼
Agent executes task using configured AI model + tools
     │
     ▼
Agent generates proposed action (structured output)
     │
     ├─ [Suggest mode] → Drafts action → Notifies user for approval
     │                   → User approves/rejects via app or chat
     │                   → On approve → executes action → logs result
     │
     └─ [Auto mode] → Executes action → Logs result → Notifies user of outcome
```

---

## 11. AI CONTEXT MEMORY ENGINE

### 11.1 Philosophy

The AI assistant is not stateless. It knows the organization, remembers past decisions on this project, and recalls what was discussed about this workbook. Context memory is hierarchical and persisted in the database (active revision only — not across revision branches).

### 11.2 Memory Hierarchy

```
Organization Memory
  └── Project Memory
        └── Workbook Memory
              └── Section Memory
```

Each level inherits context from above. An AI response in a section view has access to org defaults, project specifics, workbook context, and section history — automatically injected into every prompt.

### 11.3 Memory Points Structure

```python
class ContextMemoryPoint:
    id: UUID
    org_id: UUID
    project_id: UUID | None
    workbook_id: UUID | None
    section_id: UUID | None
    revision_id: UUID         # Only active revision's memory is used
    memory_type: Literal[
        'decision',           # Engineer made a specific choice
        'clarification',      # Question was asked and answered
        'standard_applied',   # A code/standard was applied
        'anomaly_noted',      # AI flagged something
        'user_correction',    # User corrected AI output
        'preference',         # User expressed a preference
        'material_decision',  # Material selection recorded
        'supplier_selected',  # Supplier chosen for an item
    ]
    summary: str              # Short sentence: "Decided to use 3/16 fillet weld per AWS D1.1"
    detail: str               # Full context with specifics
    tags: list[str]           # ['weld', 'section-a-a', 'aws-d1.1']
    embedding: list[float]    # Vector embedding for semantic retrieval
    source: Literal['user', 'ai', 'system']
    created_by: UUID
    created_at: datetime
    is_pinned: bool           # Pinned memories always injected (not just on retrieval)
```

### 11.4 Memory Injection into AI Prompts

```python
def build_context_prompt(org_id, project_id, workbook_id, section_id, user_query):
    # 1. Retrieve pinned memories (always included)
    pinned = get_pinned_memories(org_id, project_id, workbook_id)
    
    # 2. Semantic search: find memories relevant to user's query
    relevant = vector_search(
        query=user_query,
        filters=[org_id, project_id, workbook_id],
        top_k=8
    )
    
    # 3. Build context block
    context = f"""
    ORGANIZATION CONTEXT:
    Company: {org.name}, Industry: {org.industry}
    Standards: {org.default_standards}, Units: {org.unit_system}
    
    PROJECT CONTEXT:
    Project: {project.name}, Client: {project.client_name}
    Drawing: {workbook.drawing_number} Rev {workbook.revision_code}
    Status: {workbook.status}
    
    RELEVANT MEMORY (from past decisions on this project):
    {format_memories(pinned + relevant)}
    
    CURRENT SECTION: {section.name}
    Extracted specs: {section.spec_summary}
    """
    
    return context + "\n\nUSER QUESTION: " + user_query
```

### 11.5 Memory Management UI

**In the AI Panel (right panel):**
- "Memory" tab shows all context memory points for current scope
- Each memory card: summary, type badge, source, date, pin toggle, delete
- Filter: by type, by section, by date
- "Add memory manually" button (for engineer to record decisions not captured by AI)
- Memory search box

**Auto-capture events that create memory points:**
- User verifies/corrects an AI-extracted spec value → memory: "user_correction"
- User approves a section → memory: "decision"
- User selects a supplier for a BOM item → memory: "supplier_selected"
- User applies a standard citation → memory: "standard_applied"
- AI flags an anomaly, user acknowledges → memory: "anomaly_noted"

**Revision boundary:** On revision branch activation, memory from the branched revision is copied to the new revision's memory. Future memory points only attach to the active revision.

---

## 12. STORAGE & INTEGRATION LAYER

### 12.1 File Storage Options (Priority Order)

**Tier 1 — Configured Cloud Storage (recommended for production)**
- AWS S3 / compatible (MinIO for self-hosted)
- Google Cloud Storage
- Azure Blob Storage

**Tier 2 — Google Drive (if configured per org)**
- OAuth 2.0 Google Drive API
- Folder structure: `FORGE/{org_name}/{project_name}/{workbook_name}/`
- Auto-sync on save: enabled by toggle
- Read from Drive: browse Drive in file picker

**Tier 3 — Free-tier PoC Storage**
- Firebase Firestore: document metadata, small structured data
- Firebase Storage (5GB free): files, PDFs, images
- Google Sheets API: BOM data, quotation line items, inventory

**Tier 4 — Local/Browser**
- IndexedDB: unsaved drafts, offline caching
- File cache: recent PDF thumbnails, section images

### 12.2 Storage Configuration UI

**Location:** Settings > Storage

- Provider selector with status indicators (connected ✅ / not configured ⚠)
- Connection test + quota display per provider
- Google Drive: OAuth connect button + folder selector
- Auto-sync toggle (on save → push to configured storage)
- Backup: manual trigger + scheduled (daily/weekly) ZIP archive

---

## 13. DASHBOARD

### 13.1 Dashboard Layout (Command Center)

```
┌────────────────────────────────────────────────────────────────────┐
│ [Org Logo] FORGE     [⌘K Global Search]         🔔 [Avatar ▾]    │
├──────────┬─────────────────────────────────────────────────────────┤
│          │  Good morning, John. 3 items need your attention.       │
│ SIDEBAR  │  [Org Branding Accent Bar]                  [Feb 21]    │
│          ├─────────────────────────────────────────────────────────┤
│ [OrgLogo]│  ┌─ KPI ROW (Anime.js counter on load) ──────────────┐ │
│ Dashboard│  │                                                     │ │
│ Projects │  │ [12]        [47]       [8]        [5]    [234h]    │ │
│ Workbooks│  │ Active      Open       Due This   Quotes  Hours    │ │
│ Inventory│  │ Projects    Items      Week       Pending Logged   │ │
│ Reports  │  │ ▲2 this mo  ▼5 vs avg ↑ urgent   2 approved       │ │
│ Settings │  └─────────────────────────────────────────────────────┘ │
│          │                                                          │
│ [Agents] │  ┌─ ACTIVITY FEED ──────┐  ┌─ PROJECT TIMELINE ──────┐ │
│          │  │ [Live updates]        │  │ [Gantt — all projects]  │ │
│ [Collapse│  │ Status changes,       │  │ Current week highlighted │ │
│   ◀]     │  │ AI completions,       │  │ Milestones as diamonds  │ │
│          │  │ reviews, revisions    │  │ Click row → project     │ │
│          │  │ Filter: All/Mine/     │  │                         │ │
│          │  │ Projects/Mentions     │  │                         │ │
│          │  └──────────────────────┘  └─────────────────────────┘ │
│          │                                                          │
│          │  ┌─ PROJECTS GRID ──────────────────────────────────┐   │
│          │  │ [Card] [Card] [Card] [Card] [Card] [+New Project] │   │
│          │  └──────────────────────────────────────────────────┘   │
│          │                                                          │
│          │  ┌─ AGENT STATUS BAR (if agents enabled) ─────────────┐ │
│          │  │ 🤖 Estimator Bot: Working on QT-0048 (2 min left)  │ │
│          │  │ 🤖 Reporter Bot: Daily report sent at 8:00 AM ✓    │ │
│          │  └────────────────────────────────────────────────────┘ │
└──────────┴─────────────────────────────────────────────────────────┘
```

### 13.2 KPI Cards

Each card: Anime.js animated counter on load (0 → value in 800ms), color-coded ring/bar, trend indicator (vs last 30 days), click to drill down to filtered view. KPIs configurable per user (drag to reorder, toggle visibility).

### 13.3 Activity Feed

- Real-time via WebSocket (fallback: 30s polling)
- Events: workbook status change, review comment, revision published, section approved, teammate joined, AI agent completed task, manufacturing milestone updated, quotation approved
- Each event: type icon, actor avatar, description with linked entity, relative timestamp
- Filter: All / My Items / Projects I Own / Mentions / Agent Activity
- "Clear" button; persistent — feeds not reset on page refresh

### 13.4 Project Cards (Grid View)

```
┌────────────────────────────────────┐
│ [Client Logo]  CPF#8250016-6B1     │
│ SCR Duct — Far Side Panel, Box 6   │
│ Client: GE-Valmy NV                │
│ ━━━━━━━━━━━━━━━━━━━━━━━━  68%      │
│ Status: MANUFACTURING PROGRESS     │  ← color-coded status badge
│ 3 workbooks · 2 open items         │
│ Due: Mar 15, 2026 (22 days)        │
│ [Avatar][Avatar]+2 · 🤖 Agents: 1  │  ← active agent indicator
│         [Open Project →]           │
└────────────────────────────────────┘
```

---

## 14. PROJECT MANAGEMENT MODULE

### 14.1 Creating a New Project

**Project Creation Form:**
```
BASIC INFO
  Project Name*              [Text input]
  Project Description        [Rich text — brief]
  Internal Reference #       [Text — auto-generated or manual]
  Project Type               [Fabrication / Assembly / Structural / Piping / Mixed]
  Priority                   [Low / Medium / High / Critical]
  Tags                       [Multi-select + create new]
  Cover Image / 3D Visual    [See Section 14.5]

CLIENT INFORMATION
  Client Name*               [Text — autocomplete from org history]
  Client PO Number           [Text]
  Client Drawing Reference   [Text]
  Client Contact Name        [Text]
  Client Contact Email       [Email]
  Client Contact Phone       [Phone]
  Client Contact Title       [Text]
  Client Company Address     [Address block]
  Alternate Client Contact   [+ Add another contact]

TIMELINE
  Start Date*                [Date picker]
  Target Completion Date*    [Date picker]
  Manufacturing Start Date   [Date picker — optional]
  Delivery Date              [Date picker — optional]

TEAM
  Assign Project Members     [Multi-select from org + role per person]
  Notify Members on Create   [Toggle]

FINANCIAL
  Base Currency              [Inherit from org or override]
  Labour Rate Override       [Use org defaults / override per trade]
  Overhead % Override        [Use org default / override]

INVENTORY
  Link to Project Inventory  [Create new / link existing / inherit org]

SETTINGS
  Unit System                [Inherit from org / Imperial / Metric]
  Default Standards          [AWS D1.1 / CSA W59 / ASME / ISO / Other]
```

### 14.2 Project Dashboard

**Sections:**
1. **Header:** Project name, client, status badge, % complete ring (Anime.js), key dates, 3D visual (if uploaded), client contacts
2. **Summary Cards:** Total workbooks, sections, open reviews, overdue items, financial summary
3. **Workbooks Table:** Sortable — status, assignee, last modified, completion %, section count
4. **Gantt/Timeline:** Drag-and-drop workbook + task milestones
5. **Financial Summary:** Total estimated cost, approved quotations, invoiced, variance
6. **Team Panel:** Member avatars, roles, active now indicators, recent activity per member
7. **Attachments:** Project-level file attachments (see Section 14.4)
8. **Notes/Log:** Project-level timestamped notes (WYSIWYG, attributed to author)
9. **Manufacturing Tracker:** (visible from "Manufacturing Review" status onward — see Section 14.3)

### 14.3 Full Project Status Flow (Expanded)

```
1.  PLANNING
2.  ACTIVE (workbooks being worked on)
3.  QUOTATION REVIEW (quotation sent internally for review)
4.  QUOTATION APPROVED (client or internal approval)
5.  PLAN STARTED (manufacturing planning begins)
6.  PLAN COMPLETE (all workbooks planned, schedule confirmed)
7.  MANUFACTURING REVIEW (pre-production checklist, sign-off before floor)
8.  MANUFACTURING PROGRESS (on the shop floor — tasks tracked)
9.  MANUFACTURING QA REVIEW (NDT, inspection, dimensional check)
10. MANUFACTURING COMPLETE (all tasks done, QA passed)
11. MANUFACTURING SIGNOFF (Owner/QA official sign-off)
12. PROJECT DELIVERED (shipped to client)
13. PROJECT FEEDBACK (client feedback captured — optional)
14. PROJECT RETROSPECTIVE (team retro — what went well, what didn't — optional)
15. ARCHIVED (read-only, complete)
```

**Status Transition Rules:**
- Forward transitions: require confirmation dialog with checklist (e.g., "Have all sections been reviewed? Is the BOM complete?")
- Backward transitions: require reason entry + approval by Owner/Admin; triggers notification to all project members
- Not all statuses are mandatory (e.g., PROJECT FEEDBACK can be skipped)
- Shop Floor members can update status from MANUFACTURING PROGRESS → MANUFACTURING QA REVIEW (with Owner approval gate)

**Status-Dependent Feature Unlock:**
- MANUFACTURING REVIEW: "Pre-Production Checklist" tab appears in project dashboard
- MANUFACTURING PROGRESS: Shop floor members gain access; task status updates available; completion photo uploads enabled
- MANUFACTURING SIGNOFF: Digital sign-off fields appear (Name, Date, Certification number if applicable)
- PROJECT RETROSPECTIVE: Retrospective form sent to all contributors (see Section 14.7)

### 14.4 Project Attachments

**Location:** Project Dashboard > Attachments Tab

Supported file types: PDF, DOCX, XLSX, CSV, DWG (view-only), STEP, IGES, JPG/PNG/SVG, MP4 (video walkthroughs)

```
Attachment Record:
  filename, file_url, file_size, file_type,
  uploaded_by, uploaded_at, description, category
  
Categories:
  Client Documents  (incoming drawings, POs, specs)
  Internal Docs     (internal calculations, approvals)
  Photos            (shop floor progress photos)
  Certificates      (mill certs, welder certs, NDT reports)
  Correspondence    (emails, meeting notes)
  Reference         (standards excerpts, datasheets)
```

**Features:**
- Drag and drop upload (multi-file)
- Preview pane for images, PDFs
- Download all (ZIP)
- Version-tracked: upload new version of same document → shows version history
- Link attachments to specific workbooks or sections

### 14.5 Project 3D Visual / Product Image

**Optional field during project creation and in project settings.**

**If 3D model file uploaded (GLB, GLTF, OBJ):**
- Render using Three.js WebGL viewer embedded in project header
- Model auto-rotates slowly (2 RPM) in the project card and header
- User can click to interact: orbit, zoom, stop auto-rotation
- "Exploded view" trigger (if model supports it) — links to Section 23 visualization

**If image files uploaded (JPG, PNG, SVG — multiple allowed):**
- Rendered as an auto-advancing image slider/carousel in the project header
- Swipe-able on mobile
- Click to expand to lightbox (full-screen with caption)
- Suitable for: client renders, reference photos, design inspiration images

**If no visual uploaded:**
- Auto-generated abstract geometric placeholder using org accent color + project name initials (SVG, deterministically generated)

**UI Note:** The 3D visual / image slider appears as the project card's "hero" — approximately 200px tall in the project dashboard header. It gives stakeholders an immediate aesthetic sense of what is being built.

### 14.6 Pre-Production Checklist (Manufacturing Review Status)

When project moves to MANUFACTURING REVIEW, a mandatory checklist appears:

```
Pre-Production Checklist — CPF#8250016-6B1
  Engineering
  □ All sections reviewed and approved
  □ All revisions finalized (no open change requests)
  □ Drawing numbers recorded and cross-referenced
  □ Dimensions and tolerances verified
  □ Material specifications confirmed

  Quality & Standards
  □ Applicable welding standards confirmed (W59 / AWS D1.1 / etc.)
  □ Weld procedures (WPS) identified and available
  □ Welder qualifications verified for required processes
  □ NDT methods specified per drawing
  □ Inspection hold points identified

  Materials
  □ BOM complete and final
  □ Purchase orders issued for all materials
  □ Material certifications required? [Yes/No]
  □ Expected delivery dates confirmed vs. schedule

  Planning
  □ Manufacturing schedule approved
  □ Jigs/fixtures identified
  □ Special tooling required? [Yes/No — detail if yes]
  □ Sub-contractors confirmed (if applicable)
  □ Shop floor capacity confirmed

  Sign-off
  □ Reviewed by: [Name] [Date] [Signature]
  □ Approved by: [Name] [Date] [Signature]
```

Each checkbox has a notes field. Checklist is PDF-exportable. Incomplete checklist blocks transition to MANUFACTURING PROGRESS (with Owner override option).

### 14.7 Project Retrospective (End of Project)

**Triggered when:** Project moves to PROJECT RETROSPECTIVE status OR manually by Owner.

**Retrospective Form (sent to all contributors who worked on the project):**
```
Project: CPF#8250016-6B1 | Duration: Aug 2025 – Mar 2026

YOUR CONTRIBUTION
  Sections worked on: [auto-populated list]
  Hours logged: [auto-populated]

REFLECTION QUESTIONS
  What went well?
  [WYSIWYG — min 1 line]

  What could have been better?
  [WYSIWYG — min 1 line]

  What would you do differently next time?
  [WYSIWYG]

  Any tool/process improvements to suggest?
  [WYSIWYG]

  Rate the project (1-5 stars):
  Technical complexity: ★★★★☆
  Team collaboration:   ★★★★★
  Timeline accuracy:    ★★★☆☆
  Quotation accuracy:   ★★★★☆
```

**Retrospective Aggregate View (Owner/Admin):**
- All responses in one view
- Common themes highlighted (AI-extracted recurring keywords)
- Average ratings visualized
- Export to PDF for org knowledge base

### 14.8 Manufacturing Timeline Tracker (Post-Plan-Complete)

Visible from MANUFACTURING REVIEW status onward. Replaces the engineering-focused workbook view with a manufacturing-execution view:

- **Kanban board** of all manufacturing tasks: To Do / In Progress / QA Hold / Done
- **Shop floor update feed:** Task completions with timestamps and optional photos
- **Milestone tracker:** Key dates (material delivery, fit-up complete, weld complete, QA pass, paint, ship)
- **Progress photos gallery:** Photos uploaded by shop floor members, tagged to task
- **NCR (Non-Conformance Report) log:** QA issues raised, disposition, sign-off

---

## 15. WORKBOOK ENGINE

### 15.1 Workbook Concept

A **Workbook** represents one engineering drawing set (typically one PDF) and all the work done around it — extraction, analysis, quotation, planning. Projects can have multiple workbooks.

### 15.2 Creating a New Workbook

```
Step 1: Basic Info
  Workbook Name*
  Description
  Drawing Number (auto-detected from PDF title block or manual)
  Drawing Revision (auto-detected or manual)
  Tags
  Assigned Members (inherit from project or override)
  Timeline: Start date, Target completion
  Client Contact (inherit from project or override for this workbook)

Step 2: File Upload
  Primary: PDF (drag & drop, up to 200MB)
  Additional context:
    - Client BOM (Excel/CSV)
    - Material specs (PDF/CSV)
    - Reference images
    - Previous revision drawing (for comparison)
  "Analyze Document" → triggers PDF Intelligence Pipeline

Step 3: Analysis Preview
  System shows:
    - Detected sections with thumbnails
    - Extracted title block data
    - Detected standards referenced
    - BOM table (if found in drawing)
  User: confirms, merges, splits, or renames sections
  "Initialize Workbook" → creates all sections

Step 4: Attachments (optional)
  Upload workbook-level attachments (mill certs, sub-specs, etc.)
```

### 15.3 Workbook Dashboard Header

```
┌─ WORKBOOK HEADER ──────────────────────────────────────────────────────────┐
│ [PDF Thumbnail]  CPF#8250016-6B1 Rev.2  ·  Drawing: 6B1  ·  Sht 1 of 2   │
│ SCR Duct Far Side Panel — Box 6  |  GE-Valmy NV                            │
│ Status Stepper:                                                             │
│ ●─────────────●─────────────●──────────────●─────────────●──[●]──○──○──○  │
│ Draft    Quot.Cmp  Approved  Plan.Strt  Plan.Cmp  Mfg.Rev  ...             │
│ Revision: [R3 ▾]  ·  Assigned: [Avatars]  ·  Due: Mar 10  ·  52% ▓▓▓▓░░  │
│ Last saved: 2 min ago  ·  [🤖 1 agent active]  ·  [⚡ Actions ▾]           │
└────────────────────────────────────────────────────────────────────────────┘

TABS:
[Overview] [Sections] [BOM] [Specs] [Schedule] [Quotation] [Outputs] [Revisions] [Attachments]
```

### 15.4 Full Workbook Status Flow

```
1.  DRAFT
2.  QUOTATION COMPLETE
3.  APPROVED
4.  PLAN STARTED
5.  PLAN COMPLETE
6.  DESIGN COMPLETE
7.  REVIEW COMPLETE
8.  MANUFACTURING REVIEW
9.  MANUFACTURING PROGRESS
10. MANUFACTURING QA REVIEW
11. MANUFACTURING COMPLETE
12. MANUFACTURING SIGNOFF
13. DELIVERED
14. CLOSED
```

**Visual indicator:** Horizontal stepper at top of workbook. Each step is color-coded (grey → amber → cyan → green → done). Click step to see what it requires. Backward movement shows "reasons for regression" modal.

### 15.5 Workbook Tabs (Detailed)

**Overview Tab:**
- AI-generated summary (user-editable WYSIWYG)
- Key specs card (top-extracted specs)
- Timeline widget (mini-Gantt for this workbook)
- Pending actions checklist (AI-generated + user-added)
- Quick stats: section count, BOM item count, open comments, revision count

**Sections Tab:**
- Grid of section cards (see Section 18)
- Filter: by status / by assignee / by type
- "Add section manually" (for sections not in PDF)

**BOM Tab:**
- Full Bill of Materials (TanStack smart table)
- Auto-populated from PDF extraction + manual additions
- Columns: Item #, Part # (font-mono), Description, Material, Qty, Unit, Unit Wt (kg), Total Wt, Unit Cost, Total Cost, Supplier, Lead Time, Notes, Source (section ref)
- Total weight rollup + total cost rollup
- Cost variance vs inventory price (if item in inventory)
- Export: Excel / CSV / PDF

**Specs Tab:**
- All extracted specs, codes, weld requirements, notes
- Organized: General Notes / Per-Section / Standards / Weld Specs / NDT Requirements
- Each item: source reference, confidence, linked spec row
- Search and filter

**Schedule Tab:**
- Full manufacturing task list (see Section 15.6)
- Gantt view + list view toggle

**Quotation Tab:**
- Full multi-page quotation builder (see Section 19)

**Outputs Tab:**
- All exportable artifacts with status and last-generated date (see Section 24)

**Revisions Tab:**
- Visual revision timeline (see Section 22)

**Attachments Tab:**
- Workbook-level file attachments
- Same categories as project attachments, scoped to workbook
- Mill certificates particularly important here (per material, per heat number)

### 15.6 Manufacturing Schedule (per Workbook)

AI-generated from workbook sections, fully editable:

| # | Task | Trade | Est.Hrs | Actual Hrs | Assigned | Start | End | Dependencies | Status | Notes |
|---|------|-------|---------|-----------|---------|-------|-----|--------------|--------|-------|
| 1 | Material Procurement | PM | 8h | — | Alice | Mar 1 | Mar 3 | — | Planned | Await mill certs |
| 2 | Plate Cutting (CSG8) | Operator | 16h | — | Bob | Mar 4 | Mar 5 | 1 | Planned | — |
| 3 | Fit-up Box Stage | Fitter | 24h | — | Charlie | Mar 6 | Mar 8 | 2 | Planned | Jig required |
| 4 | Weld — CSG Plates | Welder | 32h | — | Dave | Mar 9 | Mar 13 | 3 | Planned | WPS-003 |
| 5 | Tack Stiffeners | Welder | 8h | — | Dave | Mar 12 | Mar 13 | 3 | Planned | TACK ONLY per dwg |
| 6 | PWHT (if req'd) | Sub | 16h | — | TBD | Mar 14 | Mar 14 | 4 | Planned | Check drawing note |
| 7 | Weld QA — VT | QA | 4h | — | Eve | Mar 14 | Mar 14 | 4,5 | Planned | AWS D1.1 VT |
| 8 | NDT — MT/RT | QA | 8h | — | Eve | Mar 15 | Mar 15 | 7 | Planned | Per spec |
| 9 | Dimensional Insp. | QA | 4h | — | Eve | Mar 15 | Mar 15 | 7 | Planned | As-built record |
| 10 | Blast + Prime | Painter | 8h | — | Frank | Mar 16 | Mar 17 | 8,9 | Planned | Sa 2.5 |
| 11 | Topcoat | Painter | 8h | — | Frank | Mar 17 | Mar 18 | 10 | Planned | 2 coats |
| 12 | Final Inspection | QA | 4h | — | Eve | Mar 18 | Mar 18 | 11 | Planned | DFT + docs |
| 13 | Shipping Prep | Logistics | 4h | — | Alice | Mar 19 | Mar 19 | 12 | Planned | Rigging check |

**Task status:** Planned / In Progress / On Hold / Complete / Skipped
**Actual hours:** Updated by assignee or Shop Floor role
**Progress photos:** uploadable per task (visible in Manufacturing Tracker)

---

## 16. SECTION WORK INTERFACE — THREE-PANEL COCKPIT

### 16.1 Layout Overview

The section cockpit is where engineers live. It is a **three-panel workspace**, all panels independently collapsible and drag-resizable.

```
┌─ [◀ COLLAPSE] PDF VIEWER ──────┬─ CENTER WORK AREA ──────────┬─ AI PANEL [COLLAPSE ▶] ─┐
│                                 │                              │                         │
│  [Org Logo] [Project/WB/Sect]   │  § SECTION A-A (TYP. 9)    │  [AI] [REVIEW] [MEMORY] │
│                                 │  ──────────────────────      │  ─────── tabs ─────────  │
│  ┌─ PDF CANVAS ───────────────┐ │  [AI SUMMARY — editable]   │  ACTIVE TAB: AI ASSIST  │
│  │                            │ │                              │                         │
│  │  [Zoomable, pannable       │ │  EXTRACTED SPECS (table)    │  Context: Workbook 6B1  │
│  │   PDF section cutout]      │ │  font-mono for all values   │  Memory: 12 points      │
│  │                            │ │  ─────────────────          │                         │
│  │  [Ghost overlay: colored   │ │  NOTES                      │  💬 Chat input...       │
│  │   boxes on extracted data] │ │  data-card="intuitive"      │                         │
│  │                            │ │  ─────────────────          │  AI SUGGESTIONS:        │
│  └────────────────────────────┘ │  RELATED BOM ITEMS         │  ⚠ Weld size may be     │
│                                 │  ─────────────────          │    undersized vs D1.1   │
│  SCALE RULER:                   │  ACTIONS                   │                         │
│  [▓▓▓░░░░ 1" = 25.4mm]         │  [Request Review]           │  [Search Standards]     │
│  Unit: [in ▾] [cm] [m]         │  [Export Parallax]          │  [Generate BOM]         │
│  Calibrate: [set 2 points]      │  [Mark Complete]            │  [Peer Review]          │
│                                 │                              │                         │
│  [Zoom +/-] [Fit] [Full]       │                              │                         │
│  [Annotate] [Measure]          │                              │                         │
│  [Compare Rev]  [< Prev][Next>]│                              │                         │
└─────────────────────────────────┴──────────────────────────────┴─────────────────────────┘
```

### 16.2 PDF Viewer Panel (Left — Collapsible)

**Core Capabilities:**
- Pan (click + drag) and zoom (scroll wheel, pinch-to-zoom, +/- buttons)
- Fit-to-panel (F), Fit-width (W), full-screen (Shift+F)
- Page navigation (in multi-page drawings): page selector dropdown + prev/next
- Section navigation: section selector shows all sections in this workbook, click to jump

**Scale Ruler & Measurement System:**
```
SCALE TOOL (critical for AI-assisted BOM/cost calculation)
─────────────────────────────────────────────────────────
Display: Horizontal ruler bar across top of canvas
         Vertical ruler bar on left side
         Both update dynamically on zoom

Current Scale Display:
  [1" = ___px at current zoom]  or  [1cm = ___px]  or  [1mm = ___px]
  Unit selector: [Inches ▾] / Centimeters / Meters / Millimeters

Scale Calibration (when drawing scale is known):
  1. Click "Calibrate Scale" button
  2. Click two points on a known dimension line in the drawing
  3. Enter the known real-world distance + unit
  4. FORGE calculates: px_per_unit = distance_px / real_distance
  5. Ruler updates to reflect calibrated scale

Drawing Scale Detection:
  - Auto-detected from title block (e.g., "SCALE 1:10" or "NTS")
  - If detected: scale auto-calibrated, shown as "Scale: 1:10 (auto)"
  - User can override
  
Measurement Tool:
  1. Click ruler icon (or press M)
  2. Click point A, click point B on the PDF
  3. FORGE shows: distance in selected unit (using calibrated scale)
  4. Can save measurement as an annotation note
  5. Measurements feed into: AI context, BOM calculation prompts

AI Integration:
  When user asks AI assistant: "What area of plate is needed for CSG8?"
  → AI receives calibrated scale + extracted dimensions + material type
  → Returns: area calculation + weight estimate + BOM quantity suggestion
```

**Annotation Tools:**
- Highlight (color options): yellow/cyan/red/green
- Sticky note (click to place, drag to reposition)
- Box annotation (drag rectangle + label)
- Arrow annotation (click + drag, label at tip)
- Measurement annotation (auto-labeled from measurement tool)
- Text annotation (click to type)

All annotations stored per section, per revision.

**Ghost Overlay Mode:**
- Toggle: shows colored semi-transparent boxes over every extracted data point
- Green: high-confidence extraction; Yellow: medium; Red: low/unverified
- Click any box → highlights corresponding row in spec table (center panel)
- Bidirectional: click spec table row → highlights box on PDF

**Side-by-Side Revision Compare:**
- Button: "Compare with Rev N"
- Splits viewer: current on left, selected revision on right
- Diff highlighting: changed dimensions in amber, new items in green, removed in red

### 16.3 Center Work Area Panel

**Section Header:**
- Section name (editable inline)
- Status badge (click to change with role-gated options)
- Assigned to (avatar picker)
- Last revision change indicator: `R2 → R3 (Feb 17 — weld symbol notes removed)`

**AI Summary Block:**
- Generated on first parse, editable by user via WYSIWYG
- AI Rewrite button: "More technical / More concise / Reformat / Translate"
- Displays with Inter font, comfortable line height

**Extracted Specs Table:**
- TanStack smart table
- All values in `font-mono text-cyan-400` (JetBrains Mono)
- Columns: Parameter | Extracted Value | Verified Value | Unit | Confidence | Source | Notes
- Click row → PDF ghost highlight
- AI re-check button per row (re-queries AI for that specific value)
- "Verify all" button (sends all low-confidence rows for AI re-verification)
- Edit cell inline — on change: creates memory point "user_correction"

**Notes Section (Anime.js Inspired):**
Notes displayed as `data-card="intuitive"` cards:
- Each note is a card with subtle 3D hover tilt effect (mouse tracking)
- Cards stagger-animate in on section load (Anime.js, 60ms delay between cards)
- Note types: General / Technical / QA / Client / AI-Generated (each with distinct border-color)
- Expand/collapse individual notes
- Add note: inline, with type selector
- AI-generated notes shown with 🤖 badge

**Related BOM Items:**
- Items from the workbook BOM that are sourced from this section
- Click → jumps to BOM tab, highlights row

**Actions Bar:**
- Request Review (sends to assigned reviewers)
- Export Parallax (Section 23)
- Add Note
- Mark Complete / Change Status
- Generate BOM from this section (AI)

### 16.4 Right Panel — AI Assistant (Collapsible)

The AI panel has **three tabs**, each collapsible to icons when panel is narrow:

**Tab 1: AI Assistant**
```
Context indicator: "Workbook 6B1 · Section A-A · 12 memory points loaded"

[Chat interface — full conversation history for this session]
User: What's the weld spec for the CSG9 to CSG8 joint?
AI: Based on Section A-A specs: 3/16" fillet weld (TYP.), conforming to 
    W59/AWS D1.1. Stiffeners are TACK ONLY per drawing note.
    Source: Section A-A, extracted spec row #3.

[Chat input with voice input icon (future)]
[Send] [Clear] [Save as Memory Point]

AI TOOLS (quick-action buttons):
  [🔍 Search Standards]     — query internal standards DB + web
  [📋 Generate BOM]         — create BOM rows from this section
  [🔄 Peer Review]          — AI reviews specs for issues
  [📐 Calculate Area/Weight] — using calibrated scale + dims
  [📝 Rewrite Summary]       — regenerate section summary
  [⚙️ Generate Tasks]       — suggest manufacturing tasks from section
  [🎨 Visualize Section]    — trigger Anime.js parallax for this section

SUGGESTIONS (proactive, shown without user asking):
  ⚠ "Weld size 3/16" may be at minimum for 1/4" plate — verify AWS D1.1 Table 5.8"
  💡 "No surface finish specified for joint — typical requirement for this grade"
  📎 "6-CSG9 not found in project inventory — add to inventory?"
```

**Tab 2: Review Panel**

Mirrors the AI Assistant panel's collapsible/expandable behavior. Appears in the same right panel space, toggled via tab selector.

```
REVIEW STATUS: 2 Open · 1 Resolved

[Review thread list — collapsible per thread]

┌─ REVIEW #1 · [ISSUE] · Open ─────────────────────────────┐
│ Eve M. (QA) · Feb 19, 2026                               │
│ "Weld note says TACK ONLY but spec table shows full       │
│  fillet weld — which is correct per client drawing?"     │
│                                                           │
│ [Reply] [Resolve] [Link to spec row] [Link to PDF area]  │
│                                                           │
│ → John D. · Feb 19: "Tack only is correct — updating     │
│   spec table now. Was AI extraction error."               │
│   [Mark Resolved ✓]                                       │
└───────────────────────────────────────────────────────────┘

[+ New Review Comment]
Comment Type: [Question / Issue / Suggestion / Approval]
@mention: type @ to mention team member

[Bulk: Mark All Resolved] [Export Review Log]
```

**Tab 3: Memory**

Shows and manages AI context memory for current scope:
```
SCOPE: Workbook 6B1 > Section A-A (12 points)
[Filter: All / Decisions / Corrections / Standards / Anomalies]

[Memory Point Card]
📌 DECISION · Feb 19 · John D.
"Tack only for stiffeners — drawing explicitly states NO FULL WELD"
Tags: stiffeners, tack-only, section-a-a
[Edit] [Delete] [Pin/Unpin]

[Memory Point Card]
🔄 USER_CORRECTION · Feb 18 · John D.
"AI extracted '1/4" fillet' — corrected to '3/16" fillet per W59"
[Edit] [Delete]

[+ Add Memory Point Manually]
```

---

## 17. PDF INTELLIGENCE PARSER

### 17.1 Philosophy

**Semantic understanding, not OCR copy-paste.** The parser uses vision AI to understand mechanical drawing *context* — recognizing that "3/16" next to a weld arrow symbol means fillet weld size, not a general dimension, and that "TYP. 9 PLCS" modifies the entire section, not just the adjacent callout.

### 17.2 Parsing Pipeline (7 Stages)

```
PDF File Input
     │
     ▼
Stage 1: Pre-processing
  ├─ Extract all pages as high-res images (PyMuPDF @ 300 DPI)
  ├─ Extract embedded text with precise coordinates (PyMuPDF)
  ├─ Extract PDF bookmarks/outline tree → section hints
  ├─ Detect page orientation, detect drawing scale from text
  ├─ Extract title block data (drawing number, revision, date, scale, drafter)
  └─ Store: {page_images[], text_with_coords[], bookmarks[], title_block{}}

     │
     ▼
Stage 2: Page Structure Analysis (Vision AI)
  ├─ Identify zones: main drawing area / title block / BOM table / notes block
  ├─ Detect section dividers: "SECTION A-A", "DETAIL F", callout bubbles
  ├─ Detect sub-sections on same page
  ├─ Map text labels to their corresponding drawing zones
  ├─ Extract BOM/parts list tables using table detection
  └─ Return: structured page layout JSON with zone polygons

     │
     ▼
Stage 3: Section Cropping & Extraction
  ├─ Crop each section zone from page image
  ├─ Extract: section name, type (section/detail/elevation/plan), scale
  ├─ Extract all text within section bounds with spatial coordinates
  ├─ Detect section cross-references (e.g., "SEE SECTION B-B SHT 2")
  └─ Output: {section_id, page, bounds, image_url, text[], scale}

     │
     ▼
Stage 4: Semantic Extraction (per section — most critical stage)
  ├─ DIMENSIONS:
  │    • All measurements with units (imperial fractions → decimal where needed)
  │    • Associate dimension with its labeled part/line
  │    • Detect "TYP." qualifiers and their scope
  │    • Detect REF dimensions (reference only, not inspected)
  │    • Detect tolerances ± and limit dimensions
  │
  ├─ PART REFERENCES:
  │    • Part numbers (e.g., 6-CSG8, 601A)
  │    • Quantities (e.g., "TYP. 14 PLCS", "QTY: 2")
  │    • Material callouts in section view
  │    • "NS" (near side) / "FS" (far side) designations
  │    • "TYP." (typical) applicability
  │
  ├─ WELD SYMBOLS (AWS A2.4 decoder):
  │    • Arrow side / other side
  │    • Weld type: fillet / groove / plug / slot / spot / seam
  │    • Size (leg size for fillet; depth/width for groove)
  │    • Length and pitch (intermittent welds)
  │    • Contour: flush / convex / concave
  │    • Finish: G (grind) / M (machine) / C (chip)
  │    • All-around symbol
  │    • Field weld flag
  │    • Tail: process/WPS reference
  │
  ├─ NOTES & INSTRUCTIONS:
  │    • General notes (numbered list)
  │    • Special instructions ("TACK ONLY", "DO NOT WELD")
  │    • Section-specific notes
  │    • Material callouts
  │    • Surface treatment notes
  │
  ├─ STANDARDS REFERENCES:
  │    • Welding: AWS D1.1, D1.6, W59, ISO 3834
  │    • Piping: ASME B31.1, B31.3
  │    • Structural: AISC 360, CAN/CSA S16
  │    • Materials: ASTM A36, A572, SS304, etc.
  │    • NDT: ASNT, CWB, CSA W178
  │    • Paint: SSPC, NACE, ISO 8501
  │
  ├─ GD&T (Geometric Dimensioning & Tolerancing):
  │    • Feature control frames
  │    • Datum references
  │    • Flatness, straightness, perpendicularity callouts
  │
  └─ REVISION DELTAS:
       • Changes shown in rev block → which section affected → what changed

     │
     ▼
Stage 5: Cross-Reference & Validation
  ├─ Match part numbers → project inventory → flag missing items
  ├─ Match parts across sections (same part → same dims? flag if inconsistent)
  ├─ Verify BOM quantities match "PLCS" callouts in drawing
  ├─ Detect missing required specs (no surface finish? no NDT? flag)
  ├─ Assign confidence scores (High/Medium/Low) per extracted data point
  └─ Generate anomaly list (AI-flagged issues for engineer review)

     │
     ▼
Stage 6: Section Assembly & AI Summaries
  ├─ Generate AI summary per section (2-4 sentences, technical)
  ├─ Create initial spec table (sorted by confidence, low-conf flagged)
  ├─ Suggest initial BOM rows from extracted parts
  ├─ Suggest manufacturing tasks from section content
  ├─ Generate initial memory points (parsing decisions, detected standards)
  └─ Output: complete workbook structure for user review

     │
     ▼
Stage 7: User Review & Confirmation
  Preview screen shows:
    - All sections with thumbnails and extracted section names
    - Detected drawing metadata (drawing#, revision, date, scale)
    - Anomaly list for engineer attention
    - BOM preview
    - Confidence summary: X high / Y medium / Z low confidence items
  User: Confirm / Rename sections / Merge / Split / Delete false sections
  Click "Initialize Workbook" → creates all sections in DB
```

### 17.3 Model Dispatch for Parsing

```python
PARSER_MODEL_CHAIN = {
    "page_structure":      ["claude-3-5-sonnet-20241022", "gpt-4o", "gemini-1.5-pro"],
    "dimension_extract":   ["gpt-4o-2024-11-20", "claude-3-5-sonnet"],
    "bom_table_extract":   ["claude-3-5-sonnet", "gpt-4o"],
    "weld_symbol_decode":  ["gpt-4o-2024-11-20", "claude-3-5-sonnet"],
    "gdt_extract":         ["gpt-4o-2024-11-20", "claude-3-5-sonnet"],
    "summary_generation":  ["claude-3-5-sonnet", "gpt-4o-mini", "mistral-7b-hf"],
    "anomaly_detection":   ["claude-3-5-sonnet", "gpt-4o"],
    "task_suggestion":     ["gpt-4o-mini", "deepseek-v3", "mistral-7b-hf"],
    "fallback_ocr":        ["easyocr", "tesseract"],  # no AI available
}
# All model chains configurable via org AI settings
```

### 17.4 Weld Symbol Decoder (AWS A2.4)

Full weld symbol parsing — output: human-readable string + structured JSON:

```json
{
  "symbol_id": "W-001",
  "section": "A-A",
  "weld_type": "fillet",
  "arrow_side": {
    "size_in": "3/16",
    "length": null,
    "pitch": null,
    "contour": null
  },
  "other_side": null,
  "all_around": false,
  "field_weld": false,
  "tail": "W59",
  "human_readable": "3/16\" fillet weld, arrow side, per CSA W59"
}
```

### 17.5 Drawing Standards Recognition Library

```
WELDING:          AWS D1.1, D1.2, D1.3, D1.6, D1.8, D1.9
                  CAN/CSA W59, W47.1, W47.2, W186
                  ISO 3834, 15614, 9692
STRUCTURAL:       AISC 360, AISC 341 (seismic)
                  CAN/CSA S16, S6
PIPING:           ASME B31.1, B31.3, B31.4, B31.8, B16.5, B16.9
PRESSURE VESSEL:  ASME Sec. VIII Div.1, Div.2, NBIC
MATERIALS:        ASTM A36, A572 Gr50, A516 Gr70, A240, A312
                  CSA G40.20/21 (44W, 50W, 50WT)
                  304SS, 316SS, Duplex 2205
NDT/INSPECTION:   ASNT SNT-TC-1A, NAS 410
                  CAN/CSA W178.1, W178.2
                  AWS D1.1 Chapter 6
SURFACE TREATMENT: SSPC-SP6, SSPC-SP10 (NACE No.3, No.2)
                   ISO 8501-1 (Sa 2.5), SSPC Paint systems
FASTENERS:        ASTM A325, A490, F3125; AISC Chapter J
```

---

## 18. SECTION ANALYSIS & EXTRACTION ENGINE

### 18.1 Spec Table (Detailed)

**Columns (Smart Table — TanStack, all editable):**

| Column | Type | Notes |
|--------|------|-------|
| # | Auto | Row number |
| Parameter | Text | What is being specified (e.g., "Fillet weld size") |
| Extracted Value | Text (font-mono) | AI-extracted raw value |
| Verified Value | Text (font-mono) | Human-verified value (editable, blank = use extracted) |
| Unit | Dropdown | in / mm / ° / — / custom |
| Confidence | Badge | High / Medium / Low |
| Source Ref | Text | "Section A-A, Arrow 3" |
| Standard | Text | "AWS D1.1 Table 5.8" |
| Notes | Text | Free notes |
| Actions | — | Re-check AI / Link to PDF / Delete |

When user edits "Verified Value": auto-creates memory point (user_correction type).

### 18.2 Review Comments System (Detailed)

- **Threaded:** Comments can have replies (unlimited depth)
- **Types:** Question 🟡 / Issue 🔴 / Suggestion 💡 / Approval ✅ / Note 📝
- **Status:** Open / In Progress / Resolved / Won't Fix
- **Linked to:** Spec row (click → highlights row) / PDF area (click → pan PDF to annotation) / BOM item
- **@mentions:** autocomplete from project members → push notification + email
- **Attachments:** Images, PDFs in comments (for reference sketches, standards excerpts)
- **Timestamps + edit history:** Last edited shown with timestamp
- **Export:** Review log as PDF (full thread, status, resolution notes)
- **Bulk actions:** Mark all resolved / Export unresolved

### 18.3 AI Feedback & Suggestions Panel

**Proactive suggestions (shown without user asking):**

```
ANOMALIES (auto-detected on section load):
  🔴 CRITICAL: No weld procedure (WPS) referenced for joint at CSG8/CSG9
  🟡 WARNING: Weld size 3/16" is minimum per AWS D1.1 §5.7 for 1/4" plate
  💡 SUGGESTION: 6-CSG8 (407"×115") weight ~3290 lbs — confirm crane capacity
  ℹ INFO: "TACK ONLY" per drawing note — verify this matches WPS requirements

CITATIONS (linked to web sources if Perplexity enabled):
  📎 AWS D1.1:2020 Table 5.8 — Minimum Fillet Weld Size [view]
  📎 CSA W59:19 Clause 5.3 — Fillet Weld Geometry [view]

SIMILAR SECTIONS (from other workbooks in this org):
  🔗 "Section D-D, Workbook SCR-002" — same CSG plate spec (98% similar)
       Compare? [Yes] [Dismiss]
```

**On-demand AI tools (user-triggered, in AI panel):**
- Generate BOM from this section
- Peer-review this section (AI checks all specs for completeness)
- Calculate total weld length (from extracted weld symbols + dimensions)
- Estimate weld cost (weld length × consumable rate × labor rate)
- Visualize this section (trigger Anime.js)
- Search standards database (keyword query)

---

## 19. QUOTATION & COST ESTIMATION MODULE

### 19.1 Quotation Types

**Type A: Detailed Study Quotation** — built from complete extraction + BOM analysis
**Type B: Preliminary / Budget Quotation** — built from client BOM, high-level scopes; flags as "Estimate subject to review"
**Type C: Variation / Change Order** — references original quotation, shows delta cost

### 19.2 Multi-Page Quotation Builder

The quotation is a full multi-page professional document built inside FORGE — not just a cost table. It has distinct pages/sections:

```
QUOTATION PAGES:
  Page 1: Cover Sheet
    - Company letterhead (from org template)
    - Quotation number (auto: QT-YYYY-NNNN)
    - Date, validity period
    - To: client name, address, contact
    - From: org contact, estimator name
    - Project reference, client PO reference
    - Quotation subject (project name + description)
    - "Strictly Confidential" notice

  Page 2: Scope of Work
    - Detailed description of work to be performed (WYSIWYG)
    - Drawing references included (drawing number, revision, sheet)
    - Workbook scope: which sections / assemblies / quantities
    - Applicable standards and codes
    - Special requirements noted

  Page 3: Cost Summary (Executive Summary)
    - High-level cost breakdown table (material / labour / sub-ops / paint / testing / overhead)
    - Total estimated value
    - Pie chart (optional visual)
    - Currency and exchange rate note (if applicable)

  Page 4–N: Detailed Cost Breakdown
    - Material Cost table (from BOM — each line item)
    - Labour Cost table (from schedule — each trade + hours)
    - Sub-operations table (cutting, NDT, machining, etc.)
    - Surface Treatment table
    - Purchased Items / Hardware table
    - Overhead & Markup calculation
    - Contingency calculation

  Page N+1: Exclusions
    - What is explicitly NOT included (from org template + project-specific)
    - What is assumed (from template + specific)

  Page N+2: Terms & Conditions
    - From org document template (WYSIWYG, full legal text)
    - Payment terms
    - Validity period
    - Revision / change order policy

  Page N+3: Signature Page
    - Prepared by: [Name] [Date] [Signature line]
    - Reviewed by: [Name] [Date]
    - Approved by: [Name] [Date]
    - Client Acceptance: [signature block]
```

All pages editable via WYSIWYG. Each page can be shown/hidden in the export.

### 19.3 Cost Components (Detailed)

**1. Material Costs**
- Source: BOM table
- Fields per item: Description, Material Grade, Specification (ASTM/CSA), Size, Qty, Unit Weight, Total Weight, Unit Cost, Total Cost, Supplier, Notes
- Steel price database (configurable): A36/44W ~$0.85–1.10/kg (configurable baseline)
- Scrap factor: configurable per material type (plate: 10%, pipe: 5%, structural: 8%)
- Price override per item
- Weight calculation: density lookup table (steel 7850 kg/m³, SS304 7900 kg/m³, Al 2700 kg/m³, etc.)
- "Market price" fetch (if configured external integration or user-entered price list)

**2. Labour Costs**
- Source: manufacturing schedule tasks
- Fields: Trade, Task, Estimated Hours, Actual Hours (post-fact), Rate, Subtotal
- Labour efficiency factor (configurable per project type: 0.7–1.0)
- Overtime hours: separate row with 1.5x multiplier

**3. Welding Consumables**
- Auto-estimated from extracted weld symbols:
  - Total weld length (from drawing dimensions + weld symbol spans)
  - Weld volume (size × length → kg of wire/rod)
  - Consumable cost: kg × $/kg (configurable per process: FCAW, SMAW, GMAW, GTAW)
- Or: manual override if auto-estimate not possible

**4. Sub-Operations**
- Plasma/laser cutting: lineal metres × $/m (configurable per material thickness range)
- CNC machining: hours × rate
- Heat treatment (PWHT): weight × $/kg or lump sum
- Shot blasting: m² × $/m² (surface area auto-estimated from dimensions)
- Galvanizing/hot-dip: kg × $/kg
- NDT testing: RT (m of weld), UT (m²), MT (m²), PT (m²) — each with unit rate
- Third-party inspection: hours × rate
- Radiography: per shot

**5. Surface Treatment / Painting**
- Surface area: calculated from extracted dimensions (length × width × sides) or manual
- Paint system spec: Primer (type, DFT), Intermediate (type, DFT), Topcoat (type, DFT, color)
- Unit rate: $/m² per coat (configurable per paint type)
- Blast cleaning: $/m² per grade
- Stripe coating: % addition on complex geometries

**6. Freight & Handling**
- Estimated weight/dimensions of final assembly
- Freight cost: manual or lookup (future integration with freight APIs)
- Rigging and loading: hours × rate
- Packaging/crating: lump sum estimate

**7. Procurement & Administrative**
- Document control / submittals preparation: hours × rate
- Engineering review time: hours × rate
- Expediting: hours × rate

**8. Overhead, Markup & Contingency**
- Fixed overhead: % of direct costs (configurable per org, default 15%)
- Profit margin: % configurable (default 12% labour, 8% material)
- Contingency: % configurable (default 10% — recommended range 8–15% for fabrication)
- Bonding / insurance: % of total (if applicable)
- Currency markup (if multi-currency): % buffer for exchange rate risk

### 19.4 Quotation Approval Flow

```
Draft → Submitted for Internal Review → Internally Approved → Sent to Client → 
Client Approved / Client Rejected → Revised and Resubmitted (loop)
```

- Approval required by Owner role (or Org Admin)
- Approval creates an immutable quotation snapshot (revision-controlled)
- Client approval status: manually updated (future: digital approval link)
- Rejected → can clone quotation, create revision, resubmit

### 19.5 Quotation Output Document

- Generated PDF using org document template
- Company logo, colors, fonts from org branding
- Professional typeset layout (not spreadsheet-look)
- Page numbers, document reference on every page
- "Draft" watermark on unapproved quotations
- Password protection option (paid)

---

## 20. INVENTORY MANAGEMENT SYSTEM

### 20.1 Inventory Levels & Scope

**Organization Inventory:** Master catalog — available to all projects
**Project Inventory:** Project-specific items, pricing, suppliers — overrides org inventory for that project

### 20.2 Inventory Item Schema (Comprehensive)

Every field a mechanical manufacturing team needs:

```
IDENTIFICATION
  part_number          (string, unique per org scope, font-mono)
  description          (string, free text)
  short_description    (string, 50 chars — for table display)
  category             (enum — see categories below)
  subcategory          (string)
  material_grade       (string — ASTM/CSA/ISO grade)
  material_specification (string — e.g., "ASTM A36 / CSA G40.21 44W")
  manufacturer         (string)
  manufacturer_part_no (string)

DIMENSIONS (all fields optional, relevant to item type)
  length_mm            (decimal)
  width_mm             (decimal)
  height_mm / thickness_mm (decimal)
  diameter_od_mm       (decimal — for pipe/tube)
  diameter_id_mm       (decimal — for pipe/tube)
  wall_thickness_mm    (decimal — for pipe/tube)
  pipe_schedule        (string — SCH 40, SCH 80, XXS, etc.)
  flange_rating        (string — 150#, 300#, etc.)
  length_unit          (enum: mm / in)

WEIGHT & PHYSICAL
  unit_weight_kg       (decimal — weight per unit quantity)
  total_weight_kg      (computed: unit_weight × quantity)
  density_kg_m3        (decimal — for auto weight calculation)
  surface_area_m2_per_unit (decimal — for paint/blast estimation)
  volume_m3_per_unit   (decimal)

COMMERCIAL
  unit                 (enum: EACH / LM / M2 / KG / LB / SET / LOT)
  unit_cost            (decimal)
  currency             (string — ISO 4217)
  cost_basis           (enum: per_unit / per_kg / per_meter / per_m2)
  last_purchase_price  (decimal — from last PO)
  last_purchase_date   (date)
  price_validity_days  (integer — how long the price is valid)

SUPPLIER
  preferred_supplier   (string)
  preferred_supplier_code (string — their part number)
  preferred_supplier_contact (string)
  alternate_supplier_1 (string)
  alternate_supplier_1_code (string)
  alternate_supplier_2 (string)
  lead_time_days       (integer — typical procurement lead time)
  minimum_order_qty    (decimal)
  order_multiple_qty   (decimal — e.g., must order in multiples of 6m)

STOCK
  current_stock_qty    (decimal)
  minimum_stock_level  (decimal — triggers alert below this)
  reorder_qty          (decimal)
  stock_location       (string — bin/rack/yard location)
  last_stock_check     (date)

CERTIFICATION & COMPLIANCE
  requires_mill_cert   (boolean)
  requires_cert_of_conformance (boolean)
  inspection_level     (enum: none / incoming / full)
  applicable_standards (string[] — list of standards this item must meet)
  hazmat_classification (string — WHMIS/GHS if applicable)

OPERATIONAL
  is_consumable        (boolean — welding wire, paint, etc.)
  is_standard_stock    (boolean — always kept in inventory)
  is_make_to_order     (boolean)
  is_active            (boolean — soft delete / obsolete flag)

NOTES & TRACKING
  notes                (text — general notes)
  tags                 (string[] — for filtering/grouping)
  image_url            (string — product image)
  datasheet_url        (string — technical datasheet)
  created_by, created_at, updated_by, updated_at

EXTERNAL INTEGRATION
  external_source      (string — "ERP", "QuickBooks", etc.)
  external_id          (string — ID in external system)
  last_sync_at         (datetime)
```

### 20.3 Inventory Categories (Mechanical Manufacturing)

```
PLATE & SHEET       Structural plate, checkered plate, floor plate
STRUCTURAL SECTIONS W-shapes, HSS, angles, channels, flat bar, round bar
PIPE & TUBE         Carbon steel pipe, SS pipe, structural tube, ERW, seamless
FLANGES & FITTINGS  Weld neck, slip-on, blind; elbows, tees, reducers
FASTENERS           Bolts, nuts, washers, studs, anchor bolts, huck bolts
WELDING CONSUMABLES Electrodes (SMAW), wire (FCAW/GMAW/GTAW), flux, shielding gas
HARDWARE            Lifting lugs, eye bolts, shackles, pad eyes, clips
GASKETS & SEALS     Ring gaskets, spiral wound, full-face, O-rings
ELECTRICAL          Conduit, cable tray, junction boxes (if in scope)
INSULATION          Ceramic, mineral wool, blankets, scallop plates
PAINT & COATING     Primers, topcoats, specialty coatings, blast media
MACHINED PARTS      Shafts, bushings, keyways, precision machined items
CASTINGS & FORGINGS Flanges, valves, pump casings
SHEET METAL         Ductwork, casing, panels, enclosures
REFRACTORY          Castable, brick, anchor systems
GRATING & HANDRAIL  Bar grating, safety grating, handrail pipe, fittings
SUB-ASSEMBLIES      Purchased assemblies, vendor-supplied items
SERVICES            Contract cutting, galvanizing, heat treatment, NDT
TOOLS & EQUIPMENT   Consumable tooling, jig materials (if tracked)
```

### 20.4 Inventory Features

- **Full-text search + filter** by all fields (material grade, category, supplier, tags)
- **Autocomplete** in BOM editor, quotation builder — type part# or description → dropdown with match highlights
- **Price history chart:** Recharts line chart of price over time (per unit/kg)
- **Stock level gauge:** Visual indicator + low stock alert badge
- **Usage history:** Projects/workbooks that have used this item (with quantities)
- **Import:** CSV/Excel with column mapping wizard (maps "your column name" → FORGE field)
- **Export:** BOM template, procurement list, stock report
- **Bulk update:** Select multiple items → update common fields (e.g., update price for all 44W plate items)
- **Promote to org:** From project inventory, promote an item to org inventory (with permission)
- **Link to external:** Associate an org inventory item with its external ERP counterpart

---

## 21. WYSIWYG EDITOR & SMART TABLES

### 21.1 WYSIWYG Editor (TipTap 2)

Used for: section summaries, quotation scope/terms/exclusions, project notes, output document narrative blocks.

**Base capabilities (StarterKit):**
- Bold, italic, underline, strikethrough, code inline
- Headings H1–H4
- Ordered and bullet lists
- Blockquote (for standard citations / client spec excerpts)
- Code block (for part codes, WPS references, spec strings)
- Horizontal rule
- Hard break vs paragraph break

**Extended TipTap extensions:**
- `@tiptap/extension-text-align` — left/center/right/justify
- `@tiptap/extension-color` + `@tiptap/extension-highlight` — text color + highlight
- `@tiptap/extension-link` — URL links with preview tooltip
- `@tiptap/extension-image` — inline images (paste or file upload)
- `@tiptap/extension-table` — basic tables (for narrative tables; Smart Table used for data tables)
- Custom extension: `ForgeSpecInline` — renders spec/dimension values in font-mono cyan inline
- Custom extension: `AIMention` — triggers AI rewrite when `//` typed in content

**AI Toolbar (floating, appears on text selection):**
- Rewrite (general)
- Make more technical / formal
- Make more concise
- Fix grammar and spelling
- Suggest citation (searches standards DB)
- Translate (future)

### 21.2 Smart Tables (TanStack Table v8)

For: BOM, spec items, quotation line items, inventory, schedule tasks, purchase lists.

**Column types:**
- Text, Number, Currency (auto-formatted), Date, Dropdown (configurable options), Autocomplete (from inventory), Checkbox, File link, Status badge, User avatar (assignee)

**All numerical values:** rendered in `font-mono` class

**Features:**
- **Inline edit:** click cell → edit in place → Tab to next → Enter to save
- **Column controls:** sort (click header), filter (filter input in header), resize (drag edge), hide (right-click column header), reorder (drag header)
- **Row controls:** add row (bottom or insert above/below), delete row (with undo), duplicate row, drag to reorder
- **Multi-row select:** Shift+click, Ctrl+click → bulk delete, bulk status change
- **Column formulas:** `=Qty × UnitCost` calculated client-side, auto-update on dependency change
- **Freeze:** header row always visible; first column pinned (optional)
- **Search bar:** above table, filters all visible rows in real time
- **Excel paste:** paste tab-separated values into selected cell range
- **Undo/Redo:** Ctrl+Z / Ctrl+Y within table (table-level history, 50 steps)
- **Export:** CSV / Excel (.xlsx with styled header row) / PDF (table rendered to print layout)
- **Conditional formatting rules:** configurable per column (e.g., highlight red if Total Cost > $X)
- **Totals row:** auto-sum / auto-count / custom formula at bottom
- **Column grouping:** group rows by category/material/section

---

## 22. REVISION CONTROL SYSTEM

### 22.1 Revision Concept

Revisions are immutable **named snapshots** of the entire workbook state: all spec tables, BOM, notes, schedule, quotation draft. Like Git commits — you always know what was in the workbook at any point in time.

### 22.2 Revision Limits by Plan

| Plan | Max Revisions per Workbook |
|------|---------------------------|
| Free | 3 |
| Starter | 25 |
| Professional | Unlimited |
| Enterprise | Unlimited + archive to external storage |

When limit reached: oldest non-locked revision is auto-archived (compressed snapshot stored to file storage, removed from live DB). User can "restore from archive" if needed.

### 22.3 Creating a Revision

**Trigger:** User clicks "Save as Revision" (in workbook header or Revisions tab)
**Form:**
- Revision label: auto-suggested (e.g., "R3" or "Rev C") or custom
- Description: what changed (WYSIWYG, required min 10 chars)
- Type: Minor (typo fix, minor spec update) / Major (significant scope/design change) / Correction (error fix) / Client Revision (triggered by client drawing update)
- Timestamp and author: auto-captured

**Immutability:** After creation, revision snapshot cannot be overwritten. All future work creates new revisions.

### 22.4 Revision Timeline UI

```
REVISION TIMELINE — Workbook CPF#8250016-6B1
─────────────────────────────────────────────────────────────────────────────────
R0 ────── R1 ────── R2 ────── [R3 ACTIVE] ──── (future)
Aug 2025  Sep 2025  Feb 3     Feb 17
Issued    Scope +   Part      Weld
for Fab   added     600-6     symbol
          parts     added     notes
                              removed

[R0] [R1] [R2] [R3 ●] [Save New Revision →]
```

**Each revision node (click to expand):**
```
R3 — Feb 17, 2026 · AD · Major
"Weld symbol notes removed from Section B-B per client request"
  Changed: 3 spec items, 1 section note
  Author: AD (auto-detected from PDF revision block)
  [View Snapshot] [Compare with R2] [Activate] [Lock]
```

### 22.5 Revision Diff Viewer

**Layout:** Split-screen — left: older revision, right: newer revision

**Diff types highlighted:**
- 🟢 Added: new spec rows, new sections, new BOM items
- 🔴 Removed: deleted items
- 🟡 Changed: modified values (old value struck through, new value shown)
- ⬜ Unchanged: greyed out (toggleable: show/hide unchanged)

**Diff scope:** Section-by-section, with summary: "3 sections changed, 12 spec items modified, 2 BOM items added"

### 22.6 Activating a Past Revision

**Dialog (explicit consequences shown):**
```
⚠ Activate R1 as Working Base?

This will:
• Create a new branch starting from R1 (will become R4)
• R2 and R3 will be ARCHIVED (read-only, still visible)
• All future edits will create R4, R5, etc. from R1's content

To keep R2/R3 as editable references instead:
  □ Lock R2 and R3 (preserved, accessible, but no new edits)

□ I understand. Revisions R2 and R3 will be archived.
[Cancel]  [Activate R1 and Create R4 Branch]
```

### 22.7 Change Tracking (Field-Level Audit)

All changes to spec items, BOM, notes are logged:
```
change_log (id, entity_type, entity_id, field_name, old_value, new_value,
            changed_by, changed_at, revision_id, change_source)
change_source: 'user' | 'ai_extraction' | 'ai_suggestion' | 'import' | 'agent'
```

Full change history visible per field (hover over cell → "Last changed by John D., Feb 18, 2026: '1/4" fillet' → '3/16" fillet'").

---

## 23. PARALLAX VISUALIZATION ENGINE (ANIME.JS)

### 23.1 Vision

Cinema-quality exploded-view animations of mechanical assemblies — each component floating in space, labeled with specs, revealed as you scroll. Generated automatically by AI from the workbook's extracted section data. Inspired by the anime.js website's product showcase.

### 23.2 Visualization Levels

- **Section Level:** Exploded view of all components in one drawing section
- **Workbook Level:** All sections shown as connected assembly stages, progressively revealed
- **Project Level:** All workbooks as a complete system assembly overview

### 23.3 Home Progress Cards (During Scroll)

```css
/* Applied in presentation view as user scrolls */
[data-widget="progress-card"] {
  position: sticky;
  top: 24px;
  /* Left rail — visible alongside main scroll content */
  
  /* Shows:
     Section name (Space Grotesk, bold)
     Completion % (Anime.js counter, font-mono)
     Status badge (color-coded)
     Key specs count
     Animated progress bar (Anime.js)
  */
}
```

As user scrolls through the parallax presentation, progress cards update in real time, giving a "HUD overlay" feel of where you are in the assembly.

### 23.4 AI-Generated Scene Process

**Trigger:** User clicks "Export Parallax View" on section/workbook/project.

**AI Prompt Package (sent to AI):**
```json
{
  "section_name": "SECTION A-A (TYP. 9 PLCS)",
  "assembly_type": "box_panel",
  "components": [
    {
      "id": "6-CSG9", "type": "plate",
      "dims": {"length_in": 407, "width_in": 19, "thick_in": 0.25},
      "material": "44W", "qty": 1,
      "color_hint": "structural_steel"
    },
    {
      "id": "6-CSG8", "type": "plate",
      "dims": {"length_in": 407, "width_in": 115, "thick_in": 0.25},
      "material": "44W", "qty": 1,
      "color_hint": "structural_steel"
    },
    {
      "id": "6-8", "type": "flatbar",
      "dims": {"length_in": 19.125, "width_in": 7, "thick_in": 0.5},
      "material": "44W", "qty": 18,
      "color_hint": "stiffener"
    }
  ],
  "connections": [
    {"from": "6-CSG8", "to": "6-CSG9", "type": "fillet_weld", "size_in": 0.1875},
    {"from": "6-CSG8", "to": "6-8", "type": "tack_only", "note": "TACK ONLY"}
  ],
  "annotations": ["TYP. 9 PLCS", "1\" CSG GAP", "3/16 TYP.", "DO NOT WELD AT SPLIT"],
  "scale_factor": "auto",
  "org_colors": {"primary": "#00D4FF", "secondary": "#FF6B35"},
  "output_target": "html_self_contained"
}
```

**AI Output:** Complete self-contained HTML + Anime.js scene with:
- Proportionally sized component divs/SVGs
- Multi-stage scroll-driven animation:
  1. All components assembled (start)
  2. Explode outward to show each piece separately
  3. Labels fly in (part number, material, dimensions in font-mono)
  4. Weld connection lines animate (SVG path `stroke-dashoffset` draw-on effect)
  5. Callout annotations appear at scroll endpoints
  6. Reassemble on final scroll position with all specs visible
- Keyboard navigation: arrows step through stages
- Mobile: swipe-driven (touch events)
- Click component → spec popup (all extracted data for that part)
- Print/screenshot button → captures current frame

### 23.5 Parallax Scroll Behavior (Anime.js Implementation)

```javascript
// Scroll-driven animation architecture
const scrollObserver = new IntersectionObserver(/* ... */);
const scrollProgress = () => window.scrollY / document.documentElement.scrollHeight;

// Per-component Anime.js timeline, scrubbed by scroll
anime({
  targets: '#component-6CSG8',
  translateX: [0, -400],
  translateY: [0, -150],
  rotateZ: [0, -5],
  opacity: [1, 1],
  easing: 'easeInOutQuad',
  duration: 1000,
  autoplay: false  // controlled by scroll position
});

// Note cards (data-card="intuitive") stagger on entry
anime({
  targets: '[data-card="intuitive"]',
  translateY: [40, 0],
  opacity: [0, 1],
  delay: anime.stagger(80),
  easing: 'spring(1, 80, 10, 0)'
});
```

**Spec callout lines:**
```html

  


```

---

## 24. OUTPUT & EXPORT MODULE

### 24.1 Output Types Per Workbook

**1. Design Plan Document (DOCX + PDF)**
- Cover page: company logo, project name, drawing ref, revision, date, prepared by
- Table of contents (auto-generated)
- Executive summary (AI-generated + user-edited)
- Section-by-section: PDF cutout (high-res) + spec table + notes + review disposition
- Full BOM table
- Manufacturing schedule (Gantt image + task table)
- Standards referenced summary
- Revision history table
- Sign-off page
- Company branding: logo, colors, fonts (from org template)

**2. Bill of Materials Export (Excel + CSV)**
- Full BOM with all columns (see Section 20.2 fields)
- Subtotals by category
- Weight summary (per category + total)
- Cost summary (per category + total)
- Supplier summary tab (pivot: supplier → items from them)
- Company logo in Excel header (paid)

**3. Quotation Document (PDF)** — see Section 19

**4. Purchasing Checklist (PDF + Excel)**
- Derived from BOM + quotation
- Sorted by: supplier / required date / category
- Columns: Item, Spec, Qty, Unit, Supplier, Supplier Part #, Unit Cost, Total, Required By, PO Status, Delivery Status, Notes
- Status tracking: Not Ordered / PO Issued / Delivered / Checked
- Suitable for use as a live purchasing tracker (Excel version)

**5. Manufacturing Work Order (PDF)**
- Company header + project info
- Operator-friendly format (large font, clear layout)
- Task-by-task: operation name, drawing reference, materials needed, special instructions, inspection criteria
- Sign-off boxes: Operator initials / QA sign-off per task
- Optional: QR code linking to digital version
- Large-print format (for shop floor display / tablet)

**6. Spec Code Sheet / QA Checklist (PDF)**
- All welding standards: WPS required, welder certifications required, NDT methods
- All material specifications + certification requirements
- Surface treatment spec: blast standard, DFT per coat, total DFT
- Testing requirements: hydrostatic, dimensional, NDT
- Hold points: inspector sign-off required before proceeding
- Ideal for: QA package, third-party inspector handout

**7. Parallax Presentation (HTML)**
- Self-contained, shareable HTML file
- No FORGE dependency to view
- Embeddable in email or web page
- Includes FORGE attribution (or company branded on paid plans)

**8. Material Traceability Report (PDF)**
- Heat numbers, mill certificate numbers per material item
- Linked BOM items → their certificates
- Required for: ASME, pressure vessel, nuclear, structural applications

**9. Project Retrospective Report (PDF)**
- Auto-generated from retrospective form submissions
- Aggregated ratings, anonymized individual responses (configurable)
- Lessons learned summary (AI-extracted themes)
- Suitable for: org knowledge management, audit records

### 24.2 Export Settings

```
Export Configuration (per export):
  Template:              [Org default / Select template]
  Company logo:          [Shown / Hidden]
  Color scheme:          [Org branding / Neutral / Custom]
  Page format:           [A4 / Letter / A3 / Tabloid]
  Orientation:           [Portrait / Landscape (Gantt, large drawings)]
  Sections to include:   [Checkbox per section]
  Draft watermark:       [Toggle]
  Confidentiality:       [None / "Confidential" / "Strictly Confidential"]
  Password protection:   [None / Set password] (PDF, paid)
  Digital signature:     [None / Fields only / DocuSign (future)]
  Output format:         [PDF / DOCX / Excel / HTML]
```

---

## 25. EVENT-DRIVEN EXPORT & JOB PROCESSING

### 25.1 Why Event-Driven?

Long-running operations (PDF parsing, AI extraction, document generation, large Excel exports) block the request thread and time out on standard HTTP. FORGE uses an **event-driven job queue** for all operations exceeding ~2 seconds.

### 25.2 Architecture

```
User Action (e.g., "Export Design Plan PDF")
     │
     ▼
API Endpoint (FastAPI) — responds immediately:
  HTTP 202 Accepted
  { "job_id": "exp_abc123", "status": "queued", "poll_url": "/jobs/exp_abc123" }
     │
     ▼
Celery Task published to Redis Queue
(queue: "export-jobs" — separate from AI and PDF queues)
     │
     ▼
Worker (worker-export container) picks up task:
  1. Load workbook data from DB
  2. Render document (python-docx / weasyprint / openpyxl)
  3. Apply org branding (logo, colors, fonts)
  4. Upload generated file to file storage
  5. Update job record: { status: "complete", file_url: "...", expires_at: "..." }
  6. Push WebSocket event to frontend: "export_ready"
  7. Send email notification (if user configured)
     │
     ▼
Frontend receives WebSocket event:
  Toast: "✅ Design Plan PDF is ready — [Download]"
  Outputs tab: shows file with download button
  File available for 24h (configurable), then auto-deleted from temp storage
```

### 25.3 Job Types & Queues

```
Queue Name       Worker        Job Types
───────────────────────────────────────────────────────
pdf-parse        worker-pdf    pdf_parse, page_extract, section_crop
ai-tasks         worker-ai     ai_extract, ai_summarize, ai_suggest, ai_generate_viz
export-jobs      worker-export export_pdf, export_docx, export_xlsx, export_html
agent-tasks      worker-agent  agent_run, agent_schedule, agent_notify
notifications    worker-notify send_email, send_push, send_telegram, send_slack
```

### 25.4 Job Status Polling

```
GET /api/v1/jobs/{job_id}
Response:
{
  "job_id": "exp_abc123",
  "type": "export_pdf",
  "status": "processing",    // queued | processing | complete | failed
  "progress": 65,            // 0-100
  "progress_message": "Rendering Section A-A...",
  "started_at": "2026-02-21T14:32:00Z",
  "estimated_completion": "2026-02-21T14:32:45Z",
  "file_url": null,
  "error": null
}
```

Frontend: TanStack Query polls every 2s while job is `queued` or `processing`. On `complete`, invalidates the Outputs tab query and shows toast.

---

## 26. NOTIFICATION & COLLABORATION SYSTEM

### 26.1 Notification Types (Comprehensive)

| Event | Recipients | Channels |
|-------|------------|---------|
| Workbook status changed | All project members | In-app, Email (opt-in) |
| Review comment added | Assignee + @mentioned | In-app, Email |
| Review comment resolved | Comment author | In-app |
| Section approved | Workbook assignee | In-app |
| Revision published | All project members | In-app, Email (opt-in) |
| Quotation submitted for approval | Approvers | In-app, Email |
| Quotation approved / rejected | Quotation author + Owner | In-app, Email |
| Manufacturing task completed | Coordinator + Owner | In-app |
| Manufacturing milestone reached | Owner + Org Admin | In-app, Email, Chat (if configured) |
| Manufacturing sign-off done | Project Owner + Client contact | In-app, Email |
| Project delivered | All project members | In-app, Email |
| Deadline approaching (7 / 3 / 1 day) | Assignee + Coordinator | In-app, Email |
| Deadline overdue | Assignee + Owner + Org Admin | In-app, Email, Chat |
| New member joined project | Project Owner | In-app |
| AI agent task complete | Initiating user | In-app, Chat |
| AI agent requires approval | Approver (owner/coordinator) | In-app, Email, Chat |
| Export ready | Requesting user | In-app (toast) |
| PDF parse complete | Initiating user | In-app |
| Inventory low stock alert | Org Admin + Coordinator | In-app, Email |
| Retrospective form submitted | Project Owner | In-app |

### 26.2 Notification Delivery Channels

- **In-app:** Bell icon with badge count; slide-out notification drawer; grouped by project
- **Email:** Per-event opt-in; uses org email template; configurable digest (immediate/hourly/daily)
- **Browser push:** Requires user permission; works when tab is not active
- **Telegram/WhatsApp/Slack:** Per-agent or per-org; sent when chat integration configured
- **Chat digest:** Daily summary message to configured chat channel at configured time (e.g., "Morning digest: 3 tasks due today, 2 reviews pending")

### 26.3 Collaboration Features

- **Presence indicators:** Avatar bubbles on workbook/section cards showing who is viewing now
- **Typing indicator:** In review comment threads ("Alice is typing...")
- **Live status:** Workbook status changes broadcast via WebSocket to all viewers
- **@mention:** In any text field — `@username` autocomplete from project members
- **Shared cursors (future):** Live co-edit with cursor positions shown
- **"Ping" a teammate:** From any entity (section, task, comment) — sends a direct in-app notification

---

## 27. REPORTS & ANALYTICS MODULE

### 27.1 Report Access Philosophy

Reports should be **available in 2 clicks** for any authorized user. No waiting for IT. No export to Excel and manual pivot. Owners and managers see what they need immediately.

### 27.2 Report Types

**Project Status Report (most used)**
```
Project Status Report — CPF#8250016-6B1
Generated: Feb 21, 2026 | Period: Inception to Date

STATUS OVERVIEW
  Current Status: Manufacturing Progress
  Overall Completion: 68% (AI-estimated from task + section completion)
  Days to Delivery: 22 days (Mar 15, 2026)
  Days Ahead/Behind Schedule: 3 days behind (timeline slippage: Feb 18–19)

WORKBOOK SUMMARY
  Workbook         Status             Completion  Assignee
  WB-001 Sht 1    Manufacturing Prog  72%         John D.
  WB-002 Sht 2    Design Complete     100%        Alice K.
  WB-003 Elect.   Plan Started        35%         Bob M.

OPEN ITEMS
  5 open review comments (oldest: 4 days)
  2 low-confidence spec items (unverified)
  1 BOM item pending supplier confirmation

FINANCIAL SUMMARY
  Quoted Value:      $102,441
  Material Spend:    $38,200 (committed)
  Remaining Budget:  $64,241

MANUFACTURING PROGRESS
  Tasks Complete:    24/38
  Current Operation: Welding CSG plates (Dave M., Day 2 of 4)
  Next Milestone:    Weld QA Inspection (Mar 14)
  

The most frequently accessed report. Visible from the project dashboard "Reports" tab with no configuration required.

```
╔═══════════════════════════════════════════════════════════════════════════╗
║  PROJECT STATUS REPORT                                                    ║
║  CPF#8250016-6B1 — SCR Duct Far Side Panel, Box 6                       ║
║  Client: GE-Valmy NV    Generated: Feb 21, 2026    Period: Inception→Now ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  STATUS OVERVIEW                                                          ║
║  Current Phase:      MANUFACTURING PROGRESS                               ║
║  Overall Completion: ████████░░ 68%   (AI-estimated from tasks+sections) ║
║  Days to Delivery:   22 days (Mar 15, 2026)                              ║
║  Schedule Variance:  3 days BEHIND (slippage Feb 18–19: material delay)  ║
║  Risk Level:         MEDIUM ▲ (schedule pressure, manageable)            ║
║                                                                           ║
║  WORKBOOK SUMMARY                                                         ║
║  Name               Status                Completion  Assignee  Due      ║
║  ─────────────────────────────────────────────────────────────────────── ║
║  WB-001 Sheet 1     Mfg. Progress          72%        John D.   Mar 13   ║
║  WB-002 Sheet 2     Design Complete        100%       Alice K.  ✓Done    ║
║  WB-003 Electrical  Plan Started           35%        Bob M.    Mar 22   ║
║                                                                           ║
║  OPEN ITEMS REQUIRING ATTENTION                                           ║
║  ⚠  5 open review comments (oldest: 4 days ago — Eve M.)                 ║
║  ⚠  2 spec items with low confidence (unverified — Section D-D)          ║
║  ℹ  1 BOM item pending supplier quote (6-BR-1 angle, 110")               ║
║                                                                           ║
║  FINANCIAL SUMMARY                                                        ║
║  Quoted Value:        $102,441                                            ║
║  Material Committed:   $38,200    (37.3% of quote)                       ║
║  Labour Spent to Date: $14,600    (estimated from completed tasks)        ║
║  Remaining Budget:     $49,641                                            ║
║  Cost Variance:        ON TRACK (within 3% of phase budget)               ║
║                                                                           ║
║  MANUFACTURING PROGRESS                                                   ║
║  Tasks Complete:       24 / 38   (63%)                                    ║
║  Current Operation:    Welding CSG Plates (Dave M., Day 2/4)              ║
║  Next Milestone:       Weld QA Inspection — Mar 14 (21 days)              ║
║  Last Update:          Mar 11, 10:42 AM — Dave M. added completion photo  ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

**Export:** PDF (for client/management), Email (scheduled weekly), Share link (read-only, 7-day expiry).

### 27.3 Organization Portfolio Report

High-level view for Org Admins and Directors — all projects at a glance.

**Sections:**
- **Portfolio Summary:** Total active projects, total quoted value, total labour hours in progress, projects at risk (behind schedule)
- **Project Grid:** Each project as a row — name, client, status, % complete, quoted value, financial variance, days to delivery, key risk
- **Revenue Pipeline:** Quotations in progress → approved → invoiced → collected (funnel view)
- **Capacity Utilization:** Labour hours allocated vs available per trade, per week (heatmap calendar)
- **Team Productivity:** Hours logged per member, tasks completed, review comments resolved
- **On-Time Delivery Rate:** % of milestones hit on-time vs total milestones this period

### 27.4 Financial Reports

**Quotation Accuracy Report:**
- Quoted cost vs actual cost at project completion
- Variance by category: material / labour / painting / testing
- Trend: are we consistently over or under on certain categories?
- Per-project and aggregated across all projects (trailing 12 months)
- Actionable insight: "Labour on structural assembly consistently 18% over — review estimating standards"

**Material Cost Report:**
- BOM value per project, per material type
- Price variance: quoted price vs actual purchase price
- Supplier performance: price reliability, delivery accuracy
- Heavy spenders: which materials drive most cost

**Labour Utilization Report:**
- Estimated vs actual hours per trade, per project
- Overtime tracking
- Underutilized vs overloaded team members
- Cost of rework (tasks repeated)

### 27.5 Quality & Inspection Report

- NDT results per project (pass/fail per weld zone, section)
- NCR (Non-Conformance Report) log: open vs closed, average resolution time
- Weld rejection rate: welder, section, drawing
- Inspection hold points: pending vs completed
- QA sign-off completion rates

### 27.6 Schedule Performance Report (Gantt Export)

- Multi-project Gantt view: all projects on one timeline
- Baseline vs actual: original plan overlaid on actual dates
- Critical path visualization (Anime.js animated)
- Milestone completion: % of milestones hit on or before planned date
- Export: PDF (full-page Gantt), Excel (data), PNG (for presentations)

### 27.7 Inventory & Procurement Report

- Stock levels summary: items below reorder point
- Purchase orders pending vs received
- Supplier lead time accuracy: quoted vs actual delivery days
- Most-used items this period (BOM frequency)
- Items used across multiple projects (candidates for bulk purchasing)
- Price trend alerts: items with significant price changes since last quote

### 27.8 AI Agent Activity Report (if agents enabled)

- Tasks executed by each agent type
- Approval rate: human approval vs rejection of agent suggestions
- Time saved estimate: agent hours × task duration vs human equivalent
- Agent errors or corrections made by humans
- Most valuable agent actions (highest time saving per task type)

### 27.9 Retrospective Insights Report

- Aggregated across all projects with completed retrospectives
- Star ratings by category (technical complexity, collaboration, timeline accuracy, quotation accuracy)
- Recurring themes from "What could be better?" (AI keyword extraction)
- Trend: are scores improving over time?
- Suggested process improvements (AI-generated from patterns)

### 27.10 Report Scheduling & Delivery

**Location:** Reports > Schedule Reports

```
Report: Project Status Report
  Schedule: Weekly (Every Monday 7:00 AM org timezone)
  Projects: [All active / Selected projects]
  Recipients: [org admin@company.com, pm@company.com]
  Delivery: Email attachment (PDF) + Telegram message (summary)
  Format: PDF (full) + Plain text summary (for chat)
  [Save Schedule]
```

Scheduled reports run as Celery beat tasks. Failures: retry 3x with exponential backoff, notify admin on final failure.

### 27.11 Dashboard Report Widgets (Embeddable)

Any report section can be pinned as a widget on the main dashboard. Widgets are:
- Drag-and-drop rearrangeable
- Configurable: select metric, time range, project filter
- Refresh button + auto-refresh interval (5/15/30/60 min)
- Expand to full report from widget

---

## 28. ADMIN PANEL & SUBSCRIPTION MANAGEMENT

### 28.1 App-Level Admin Panel

**Access:** Super Admin only (`SUPERADMIN_EMAIL` in `.env`)
**URL:** `/admin` (not linked from normal nav — direct URL access)

**Sections:**

**Organizations Dashboard:**
```
Org Name          Plan       Users  Projects  Storage    Last Active  Status
Cambridge Profab  Starter    8      12        2.3 GB     2h ago       Active
Demo Corp         Free       2      1         180 MB     5 days ago   Active
Test Org          Enterprise 45     67        18.2 GB    Online now   Active
[+ Create Demo Org]  [Export CSV]
```

Per-org actions: view details, change plan, extend trial, impersonate admin (for support), suspend, delete.

**User Management:**
- Global user search by email/name
- View user's org, role, last login, sessions
- Disable/re-enable account
- Force password reset
- View user's activity log
- Impersonate user (audit-logged)

**Subscription Management:**
- View all subscriptions: plan, billing cycle, next renewal, payment method status
- Manually upgrade/downgrade org plan
- Apply discount code
- Set trial expiry per org
- Revenue metrics: MRR, ARR, churn rate, plan distribution

**Feature Flags:**
```
Feature              Default    Org Overrides
parallax_vis         Pro+       [Cambridge Profab: ON] [Demo Corp: ON (trial)]
custom_branding      Pro+       none
ai_premium_models    Starter+   none
agent_automation     Pro+       none
white_label          Enterprise [ClientA: ON]
api_access           Pro+       none
[+ Add Feature Flag]  [Edit]
```

**AI Key Management:**
- App-level AI keys (used for trial orgs): set/rotate/revoke each provider key
- Usage monitoring: tokens per day per provider, cost estimates
- Budget alerts: notify if daily AI spend exceeds threshold

**Analytics:**
- Daily/Weekly/Monthly active users (DAU/WAU/MAU)
- Workbooks created per day
- AI calls per day (by task type, by model)
- PDF parse jobs: count, avg duration, failure rate
- Export jobs: count, avg duration, most popular format
- Storage usage: total + per tier
- API error rate, P95 latency per endpoint

**System Health:**
- DB: connection pool status, query P95 latency, slow query log
- Redis: memory usage, queue depths per queue name
- Celery workers: status per worker type, task success/failure rate
- File storage: bucket usage, failed uploads
- WebSocket: active connections
- Last backup: timestamp + status

### 28.2 Subscription Plans

**Free (Community)**
- 1 org, 3 members, 2 active projects
- 5 workbooks per project
- 10 AI calls/day (HuggingFace free tier only)
- 3 revisions per workbook
- 500MB storage
- FORGE watermark on all exports
- No custom branding

**Starter ($49/month per org)**
- 1 org, 10 members, 10 active projects
- Unlimited workbooks
- 100 AI calls/day (bring your own key, premium models unlocked)
- 25 revisions per workbook
- 5 GB storage
- Company logo on exports
- Google Drive integration
- Manufacturing tracking module
- Basic reporting

**Professional ($149/month per org)**
- 1 org, 25 members, unlimited projects
- Unlimited workbooks, unlimited AI calls (own keys)
- Unlimited revisions + archive to external storage
- 25 GB storage
- Full custom branding on exports (colors, fonts, no watermark)
- Parallax Anime.js visualizations
- AI agent automation (2 agent types)
- Full reporting suite
- External integrations (1 adapter)
- API access (read)
- Priority email support

**Enterprise (Custom pricing)**
- Unlimited members, projects, workbooks
- Unlimited revisions + long-term archive
- 100+ GB storage (custom)
- White-label (custom domain, complete branding)
- All AI agent types, unlimited agents
- External chat control (Telegram, WhatsApp, Slack)
- All external integrations (unlimited adapters)
- Full API access (read + write + webhooks)
- Client portal (future)
- SSO/SAML
- On-premises deployment option
- Dedicated support + SLA (99.9% uptime)
- Custom AI model integration
- Audit log export
- Custom feature development (negotiated)

### 28.3 Feature Flag Architecture

```python
# Feature flag check in any backend service:
def check_feature(org_id: str, flag: str) -> bool:
    org = get_org(org_id)
    # Org-level override takes priority
    if flag in org.feature_overrides:
        return org.feature_overrides[flag]
    # Plan-level default
    plan_features = PLAN_FEATURE_MAP[org.subscription_tier]
    return flag in plan_features

PLAN_FEATURE_MAP = {
    "free":         ["basic_pdf", "basic_bom", "basic_quotation"],
    "starter":      [...plus "google_drive", "mfg_tracking", "basic_reports",
                    "custom_logo", "revision_25", "ai_own_key"],
    "professional": [...plus "custom_branding", "parallax", "agents_basic",
                    "full_reports", "external_integrations", "api_read"],
    "enterprise":   [...plus "white_label", "agents_all", "chat_control",
                    "api_full", "sso", "client_portal", "on_premises"],
}
```

Frontend checks features before rendering:
```typescript
const { checkFeature } = useOrg();
if (!checkFeature('parallax')) return <UpgradePrompt feature="parallax" />;
```

---

## 29. SETTINGS & PERSONALIZATION

### 29.1 Settings Navigation Structure

```
Settings/
  ├── My Profile           (user-level)
  ├── Security             (password, PIN, sessions)
  ├── Notifications        (channel preferences per notification type)
  ├── Appearance           (theme, density, font size)
  ├── AI Configuration     (model selections, API keys)
  ├── Keyboard Shortcuts   (view + customize)
  ├── Organization/        (org admin only)
  │     ├── Company Profile
  │     ├── Team Members
  │     ├── Invitations
  │     ├── Billing & Subscription
  │     ├── Labour Rates
  │     ├── Document Templates
  │     ├── Email Templates
  │     ├── Storage
  │     ├── Integrations
  │     └── AI Agents
  └── Developer/           (API access, webhooks — Pro+ only)
        ├── API Keys
        └── Webhooks
```

### 29.2 My Profile

- Display name (shown in app, on outputs, in comments)
- Job title + department
- Profile photo: upload (JPG/PNG) or use Google avatar
- Email address (change with verification flow)
- Phone number (optional — used for agent SMS future)
- Timezone (overrides org default for scheduling display)
- Preferred unit system (Imperial / Metric — overrides org default for display)
- Bio / signature block (shown in quotations "Prepared by" section)

### 29.3 Security Settings

- **Change password** (email/password accounts only)
- **Active sessions:** List of all active JWT sessions with device, IP, location, last active. Revoke individual or "Revoke all other sessions"
- **Session Lock PIN:**
  - Enable/disable PIN
  - Change PIN (requires current PIN)
  - Change security question + answer
  - Set idle timeout (5/10/15/30 min/Never)
- **Two-factor authentication (2FA):** TOTP (Google Authenticator, Authy) — future implementation
- **Login history:** Last 20 login events with device, IP, location, timestamp

### 29.4 Notification Preferences

Per-notification-type table:

| Notification Type | In-App | Email | Push | Chat |
|------------------|--------|-------|------|------|
| Workbook status changed | ✓ | opt-in | opt-in | opt-in |
| Review comment (assigned) | ✓ | ✓ | opt-in | — |
| @mentioned | ✓ | ✓ | ✓ | — |
| Revision published | ✓ | opt-in | — | — |
| Deadline (7 days) | ✓ | ✓ | opt-in | opt-in |
| Deadline (overdue) | ✓ | ✓ | ✓ | ✓ |
| AI agent complete | ✓ | — | opt-in | opt-in |
| ... | ... | ... | ... | ... |

Email digest options: Immediate / Hourly / Daily (8 AM) / Weekly (Monday 8 AM)

### 29.5 Appearance Settings

- **Theme:** Dark (default) / Light / System (follows OS)
- **Sidebar:** Auto-collapse / Always expanded / Always collapsed
- **Density:** Comfortable (more whitespace) / Compact (more rows visible) / Spacious (extra large)
- **Font size:** Small (13px base) / Medium (14px) / Large (16px)
- **PDF Viewer default zoom:** Fit page / Fit width / 50% / 75% / 100% / 150%
- **Spec display unit:** Inches / Millimeters / Centimeters (default for ruler/measurements)
- **Table row height:** Standard / Compact / Comfortable

### 29.6 AI Configuration (User-Level)

- API key overrides (personal keys — used only for personal AI calls in UI, not in shared work)
- AI panel default tab (AI Assistant / Review / Memory)
- AI suggestions visibility (on/off per section)
- Context memory: enable/disable auto-capture
- Preferred AI writing style: Technical / Formal / Concise

### 29.7 Organization — Company Profile (Org Admin)

All fields from Section 8.1 onboarding, editable:
- Company name, logo, tagline
- Full address (primary + mailing)
- Phone numbers (main, fax)
- Primary email (outgoing correspondence)
- Website URL
- Tax / registration numbers (GST/HST, VAT, EIN, BN)
- Banking details (for payment terms in quotations — encrypted storage)
- Company registration number
- QMS certification (ISO 9001 cert number + expiry — shown in quotation footer)
- Year established
- Number of employees (for profile completeness)

### 29.8 Organization — Integrations (Org Admin)

**Location:** Settings > Organization > Integrations

```
CONFIGURED INTEGRATIONS:
┌─ Our ERP System ──────────────────────────────────────────────────────────┐
│ Type: Inventory (read-only)  |  Status: ✅ Connected  |  Last sync: 5 min │
│ Base URL: https://erp.company.com/api/v2                                   │
│ Auth: Bearer Token (set)                                                   │
│ Sync schedule: Hourly                                                      │
│ Field mappings: 6 fields configured                                        │
│ [Edit]  [Test Connection]  [Sync Now]  [Disable]  [Delete]                │
└────────────────────────────────────────────────────────────────────────────┘

[+ Add Integration]
  Types available:
    Inventory System    (read items, prices, stock)
    Accounting System   (post POs, read invoices)
    ERP / MRP           (full bidirectional — Enterprise)
    Supplier Portal     (get quotes, send POs — future)
    Drawing Repository  (CAD system — future)
    Custom REST API     (configure any endpoint)
```

**Integration Test Panel:**
- Send test request → show raw response → confirm field mapping works
- Health check badge: green (last sync ok) / yellow (sync delayed) / red (connection failed)

---

## 30. DATA MODELS & SCHEMA

### 30.1 Core Tables

```sql
-- ═══════════════════════════════════════════════
-- ORGANIZATIONS
-- ═══════════════════════════════════════════════
CREATE TABLE organizations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    slug            TEXT UNIQUE NOT NULL,           -- URL-safe identifier
    logo_url        TEXT,
    org_color       TEXT,                           -- Extracted from logo (hex)
    industry        TEXT,
    company_type    TEXT,
    address_json    JSONB,                          -- Full address object
    contact_json    JSONB,                          -- Phones, emails, website
    tax_ids_json    JSONB,                          -- GST, VAT, EIN, etc.
    banking_json    JSONB ENCRYPTED,               -- Bank details (encrypted)
    qms_cert_json   JSONB,                          -- ISO cert number + expiry
    branding_json   JSONB,                          -- Colors, fonts, doc settings
    labour_rates    JSONB,                          -- Per-trade rate table
    defaults_json   JSONB,                          -- Currency, units, overhead%, etc.
    feature_overrides JSONB DEFAULT '{}',           -- Org-level feature flag overrides
    subscription_tier TEXT DEFAULT 'free',
    subscription_data JSONB,                        -- Plan details, renewal, billing
    ai_keys_json    JSONB ENCRYPTED,               -- Org AI keys (AES-256-GCM)
    storage_config  JSONB,                          -- Storage provider config
    integration_configs JSONB,                      -- External adapter configs
    email_templates JSONB,                          -- Email template library
    doc_templates   JSONB,                          -- Document template configs
    agent_configs   JSONB,                          -- AI agent configurations
    chat_configs    JSONB,                          -- Telegram/Slack/WhatsApp configs
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- USERS
-- ═══════════════════════════════════════════════
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id          UUID REFERENCES organizations(id),
    email           TEXT UNIQUE NOT NULL,
    password_hash   TEXT,
    google_id       TEXT UNIQUE,
    display_name    TEXT NOT NULL,
    job_title       TEXT,
    department      TEXT,
    phone           TEXT,
    avatar_url      TEXT,
    org_role        TEXT NOT NULL DEFAULT 'reader',  -- org-wide role
    preferences     JSONB DEFAULT '{}',              -- UI prefs, AI prefs, notifications
    ai_keys_json    JSONB ENCRYPTED,                -- User personal AI keys
    bio_json        JSONB,                           -- Signature block data
    joined_at       TIMESTAMPTZ DEFAULT now(),
    last_active_at  TIMESTAMPTZ,
    is_active       BOOLEAN DEFAULT true
);

-- ═══════════════════════════════════════════════
-- PROJECTS
-- ═══════════════════════════════════════════════
CREATE TABLE projects (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id          UUID REFERENCES organizations(id) NOT NULL,
    name            TEXT NOT NULL,
    description     TEXT,
    internal_ref    TEXT,
    project_type    TEXT,                           -- fabrication/assembly/structural/piping/mixed
    status          TEXT DEFAULT 'planning',        -- see status flow Section 14.3
    priority        TEXT DEFAULT 'medium',
    tags            TEXT[] DEFAULT '{}',
    cover_image_url TEXT,
    visual_3d_url   TEXT,                           -- GLB/GLTF/OBJ model file
    visual_images   TEXT[] DEFAULT '{}',            -- Image slider files
    client_name     TEXT,
    client_json     JSONB,                          -- client contacts array
    po_number       TEXT,
    drawing_reference TEXT,
    start_date      DATE,
    target_date     DATE,
    mfg_start_date  DATE,
    delivery_date   DATE,
    currency        TEXT,
    unit_system     TEXT,
    labour_rates    JSONB,                          -- Project override labour rates
    overhead_pct    NUMERIC(5,2),
    defaults_json   JSONB,                          -- Standards, contingency, etc.
    notes           TEXT,
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now(),
    archived_at     TIMESTAMPTZ
);

-- ═══════════════════════════════════════════════
-- PROJECT MEMBERS
-- ═══════════════════════════════════════════════
CREATE TABLE project_members (
    project_id      UUID REFERENCES projects(id),
    user_id         UUID REFERENCES users(id),
    project_role    TEXT NOT NULL,                  -- owner/coordinator/contributor/reviewer/reader/shop_floor
    added_by        UUID REFERENCES users(id),
    added_at        TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (project_id, user_id)
);

-- ═══════════════════════════════════════════════
-- PROJECT ATTACHMENTS
-- ═══════════════════════════════════════════════
CREATE TABLE attachments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id          UUID REFERENCES organizations(id),
    project_id      UUID REFERENCES projects(id),
    workbook_id     UUID,                           -- NULL = project-level attachment
    section_id      UUID,                           -- NULL = workbook-level
    filename        TEXT NOT NULL,
    original_name   TEXT NOT NULL,
    file_url        TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type       TEXT,
    category        TEXT,                           -- client_doc/internal/photo/certificate/correspondence/reference
    description     TEXT,
    version         INTEGER DEFAULT 1,
    parent_id       UUID,                           -- For versioning: points to previous version
    uploaded_by     UUID REFERENCES users(id),
    uploaded_at     TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- WORKBOOKS
-- ═══════════════════════════════════════════════
CREATE TABLE workbooks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID REFERENCES projects(id) NOT NULL,
    org_id          UUID REFERENCES organizations(id) NOT NULL,
    name            TEXT NOT NULL,
    description     TEXT,
    drawing_number  TEXT,
    drawing_revision TEXT,
    status          TEXT DEFAULT 'draft',           -- see Section 15.4 status flow
    priority        TEXT DEFAULT 'medium',
    tags            TEXT[] DEFAULT '{}',
    timeline_json   JSONB,                          -- start, target, milestones
    ai_summary      TEXT,
    client_contact_override JSONB,                  -- Override project client contact
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- PDF UPLOADS
-- ═══════════════════════════════════════════════
CREATE TABLE pdf_uploads (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workbook_id     UUID REFERENCES workbooks(id) NOT NULL,
    filename        TEXT NOT NULL,
    file_url        TEXT NOT NULL,
    file_size_bytes BIGINT,
    page_count      INTEGER,
    title_block     JSONB,                          -- Extracted: drawing#, rev, date, scale, drafter
    detected_scale  TEXT,                           -- e.g., "1:10" or "NTS"
    detected_standards TEXT[],                      -- Standards found in document
    parse_status    TEXT DEFAULT 'pending',         -- pending/processing/complete/failed
    parse_job_id    TEXT,
    parse_metadata  JSONB,                          -- Stats: sections found, confidence summary
    parsed_at       TIMESTAMPTZ,
    uploaded_by     UUID REFERENCES users(id),
    uploaded_at     TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- SECTIONS
-- ═══════════════════════════════════════════════
CREATE TABLE sections (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workbook_id     UUID REFERENCES workbooks(id) NOT NULL,
    pdf_upload_id   UUID REFERENCES pdf_uploads(id),
    name            TEXT NOT NULL,
    section_type    TEXT,                           -- section/detail/elevation/plan/notes/bom/title
    page_number     INTEGER,
    bounds_json     JSONB,                          -- {x, y, width, height} on page
    cutout_image_url TEXT,
    status          TEXT DEFAULT 'draft',
    assigned_to     UUID REFERENCES users(id),
    ai_summary      TEXT,
    sort_order      INTEGER DEFAULT 0,
    is_manual       BOOLEAN DEFAULT false,          -- Manually added vs PDF-extracted
    anomalies_json  JSONB,                          -- AI-flagged issues on parse
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- SPEC ITEMS (extracted from sections)
-- ═══════════════════════════════════════════════
CREATE TABLE spec_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id      UUID REFERENCES sections(id) NOT NULL,
    parameter       TEXT NOT NULL,
    extracted_value TEXT,
    verified_value  TEXT,
    unit            TEXT,
    confidence      TEXT DEFAULT 'medium',          -- high/medium/low
    source_ref      TEXT,                           -- "Section A-A, Arrow 3"
    standard_ref    TEXT,                           -- "AWS D1.1 Table 5.8"
    notes           TEXT,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- BOM ITEMS
-- ═══════════════════════════════════════════════
CREATE TABLE bom_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workbook_id     UUID REFERENCES workbooks(id) NOT NULL,
    section_id      UUID REFERENCES sections(id),
    item_number     TEXT,
    part_number     TEXT,
    description     TEXT NOT NULL,
    material_grade  TEXT,
    material_spec   TEXT,
    quantity        NUMERIC(12,4),
    unit            TEXT,
    unit_weight_kg  NUMERIC(12,4),
    total_weight_kg NUMERIC(12,4) GENERATED ALWAYS AS (quantity * unit_weight_kg) STORED,
    unit_cost       NUMERIC(12,2),
    total_cost      NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_cost) STORED,
    currency        TEXT,
    supplier        TEXT,
    supplier_part_no TEXT,
    lead_time_days  INTEGER,
    notes           TEXT,
    inventory_item_id UUID,                         -- FK to inventory if matched
    external_source TEXT,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- REVISIONS
-- ═══════════════════════════════════════════════
CREATE TABLE revisions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workbook_id     UUID REFERENCES workbooks(id) NOT NULL,
    revision_number TEXT NOT NULL,                  -- "R0", "R1", "Rev C", etc.
    label           TEXT,                           -- Display label
    description     TEXT NOT NULL,
    type            TEXT,                           -- minor/major/correction/client_revision
    snapshot_url    TEXT,                           -- URL to full JSON snapshot in file storage
    diff_json       JSONB,                          -- Structured diff from previous revision
    is_active       BOOLEAN DEFAULT false,           -- Only one revision active at a time
    is_locked       BOOLEAN DEFAULT false,           -- Locked = read-only, preserved
    is_archived     BOOLEAN DEFAULT false,           -- Archived = snapshot only, not in live DB
    branch_from_id  UUID REFERENCES revisions(id), -- Which revision this branched from
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- COMMENTS (threaded, on sections)
-- ═══════════════════════════════════════════════
CREATE TABLE comments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id      UUID REFERENCES sections(id) NOT NULL,
    parent_id       UUID REFERENCES comments(id),   -- For threading
    author_id       UUID REFERENCES users(id) NOT NULL,
    comment_type    TEXT,                           -- question/issue/suggestion/approval/note
    content         TEXT NOT NULL,
    status          TEXT DEFAULT 'open',            -- open/in_progress/resolved/wont_fix
    spec_item_id    UUID REFERENCES spec_items(id),
    pdf_annotation_ref TEXT,                        -- Reference to annotation on PDF
    bom_item_id     UUID REFERENCES bom_items(id),
    mentions        UUID[] DEFAULT '{}',            -- User IDs mentioned
    attachments     TEXT[] DEFAULT '{}',            -- File URLs in comment
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now(),
    resolved_at     TIMESTAMPTZ,
    resolved_by     UUID REFERENCES users(id)
);

-- ═══════════════════════════════════════════════
-- QUOTATIONS
-- ═══════════════════════════════════════════════
CREATE TABLE quotations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workbook_id     UUID REFERENCES workbooks(id) NOT NULL,
    project_id      UUID REFERENCES projects(id) NOT NULL,
    org_id          UUID REFERENCES organizations(id) NOT NULL,
    quotation_number TEXT UNIQUE NOT NULL,          -- QT-YYYY-NNNN auto-generated
    quotation_type  TEXT,                           -- detailed/preliminary/change_order
    status          TEXT DEFAULT 'draft',           -- draft/submitted/approved/rejected/sent_to_client/client_approved
    scope_text      TEXT,                           -- WYSIWYG scope of work
    material_items  JSONB,                          -- Material cost line items
    labour_items    JSONB,                          -- Labour cost line items
    sub_ops_items   JSONB,                          -- Sub-operations line items
    paint_items     JSONB,                          -- Surface treatment items
    freight_items   JSONB,                          -- Freight/handling items
    procurement_items JSONB,                        -- Admin/procurement costs
    overhead_pct    NUMERIC(5,2),
    profit_pct      JSONB,                          -- {labour_pct, material_pct}
    contingency_pct NUMERIC(5,2),
    totals_json     JSONB,                          -- Computed totals per category + grand total
    exclusions_text TEXT,
    terms_text      TEXT,
    validity_days   INTEGER DEFAULT 30,
    currency        TEXT,
    notes           TEXT,
    parent_quotation_id UUID,                       -- For change orders
    created_by      UUID REFERENCES users(id),
    reviewed_by     UUID REFERENCES users(id),
    approved_by     UUID REFERENCES users(id),
    approved_at     TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- INVENTORY ITEMS
-- ═══════════════════════════════════════════════
CREATE TABLE inventory_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id          UUID REFERENCES organizations(id) NOT NULL,
    project_id      UUID,                           -- NULL = org-level item
    part_number     TEXT NOT NULL,
    description     TEXT NOT NULL,
    short_description TEXT,
    category        TEXT,
    subcategory     TEXT,
    material_grade  TEXT,
    material_spec   TEXT,
    manufacturer    TEXT,
    manufacturer_pn TEXT,
    dims_json       JSONB,                          -- All dimensional fields
    unit_weight_kg  NUMERIC(12,4),
    density_kg_m3   NUMERIC(8,2),
    surface_area_m2 NUMERIC(12,4),
    unit            TEXT,
    cost_basis      TEXT,
    unit_cost       NUMERIC(12,4),
    currency        TEXT,
    last_purchase_price NUMERIC(12,4),
    last_purchase_date DATE,
    price_validity_days INTEGER,
    price_history   JSONB DEFAULT '[]',             -- Array of {price, date, source}
    suppliers_json  JSONB,                          -- preferred + alternates
    lead_time_days  INTEGER,
    min_order_qty   NUMERIC(12,4),
    order_multiple  NUMERIC(12,4),
    current_stock   NUMERIC(12,4) DEFAULT 0,
    min_stock_level NUMERIC(12,4),
    reorder_qty     NUMERIC(12,4),
    stock_location  TEXT,
    last_stock_check DATE,
    cert_requirements JSONB,                        -- mill_cert, coc, inspection_level
    applicable_standards TEXT[],
    hazmat_class    TEXT,
    is_consumable   BOOLEAN DEFAULT false,
    is_standard_stock BOOLEAN DEFAULT false,
    is_make_to_order BOOLEAN DEFAULT false,
    is_active       BOOLEAN DEFAULT true,
    notes           TEXT,
    tags            TEXT[] DEFAULT '{}',
    image_url       TEXT,
    datasheet_url   TEXT,
    external_source TEXT,
    external_id     TEXT,
    last_sync_at    TIMESTAMPTZ,
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- SCHEDULE TASKS
-- ═══════════════════════════════════════════════
CREATE TABLE schedule_tasks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workbook_id     UUID REFERENCES workbooks(id) NOT NULL,
    project_id      UUID REFERENCES projects(id) NOT NULL,
    task_number     INTEGER,
    name            TEXT NOT NULL,
    description     TEXT,
    trade           TEXT,
    operation_type  TEXT,                           -- procurement/cutting/fitup/welding/ndt/painting/inspection/shipping
    estimated_hours NUMERIC(8,2),
    actual_hours    NUMERIC(8,2),
    assigned_to     UUID REFERENCES users(id),
    start_date      DATE,
    end_date        DATE,
    actual_start    DATE,
    actual_end      DATE,
    dependencies    UUID[] DEFAULT '{}',            -- task IDs that must complete first
    status          TEXT DEFAULT 'planned',         -- planned/in_progress/on_hold/complete/skipped
    notes           TEXT,
    wps_reference   TEXT,                           -- Weld procedure spec reference
    completion_photos TEXT[] DEFAULT '{}',          -- Photo URLs uploaded by shop floor
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT now(),
    updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- AI CONTEXT MEMORY
-- ═══════════════════════════════════════════════
CREATE TABLE ai_context_memory (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id          UUID REFERENCES organizations(id) NOT NULL,
    project_id      UUID REFERENCES projects(id),
    workbook_id     UUID REFERENCES workbooks(id),
    section_id      UUID REFERENCES sections(id),
    revision_id     UUID REFERENCES revisions(id) NOT NULL,  -- Only active revision memory used
    memory_type     TEXT NOT NULL,                  -- decision/clarification/standard_applied/anomaly_noted/user_correction/preference/material_decision/supplier_selected
    summary         TEXT NOT NULL,                  -- Short sentence
    detail          TEXT,                           -- Full context
    tags            TEXT[] DEFAULT '{}',
    embedding       vector(1536),                   -- pgvector extension (or Chroma external)
    source          TEXT,                           -- user/ai/system/agent
    is_pinned       BOOLEAN DEFAULT false,           -- Always injected if pinned
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- NOTIFICATIONS
-- ═══════════════════════════════════════════════
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id) NOT NULL,
    org_id          UUID REFERENCES organizations(id),
    project_id      UUID REFERENCES projects(id),
    notification_type TEXT NOT NULL,
    title           TEXT NOT NULL,
    body            TEXT,
    link_url        TEXT,
    is_read         BOOLEAN DEFAULT false,
    is_emailed      BOOLEAN DEFAULT false,
    is_pushed       BOOLEAN DEFAULT false,
    metadata_json   JSONB,
    created_at      TIMESTAMPTZ DEFAULT now(),
    read_at         TIMESTAMPTZ
);

-- ═══════════════════════════════════════════════
-- BACKGROUND JOBS
-- ═══════════════════════════════════════════════
CREATE TABLE background_jobs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id          UUID REFERENCES organizations(id),
    job_type        TEXT NOT NULL,                  -- pdf_parse/export_pdf/ai_extract/agent_run
    status          TEXT DEFAULT 'queued',          -- queued/processing/complete/failed
    progress        INTEGER DEFAULT 0,              -- 0-100
    progress_message TEXT,
    celery_task_id  TEXT,
    input_data      JSONB,
    output_url      TEXT,                           -- File URL if job produces a file
    output_expires_at TIMESTAMPTZ,
    error_message   TEXT,
    error_traceback TEXT,
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT now(),
    started_at      TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ
);

-- ═══════════════════════════════════════════════
-- CHANGE LOG (field-level audit trail)
-- ═══════════════════════════════════════════════
CREATE TABLE change_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id          UUID NOT NULL,
    entity_type     TEXT NOT NULL,                  -- spec_item/bom_item/section/workbook/etc.
    entity_id       UUID NOT NULL,
    field_name      TEXT NOT NULL,
    old_value       TEXT,
    new_value       TEXT,
    changed_by      UUID REFERENCES users(id),
    changed_at      TIMESTAMPTZ DEFAULT now(),
    revision_id     UUID,
    change_source   TEXT                            -- user/ai_extraction/ai_suggestion/import/agent
);

-- ═══════════════════════════════════════════════
-- NCR (NON-CONFORMANCE REPORTS)
-- ═══════════════════════════════════════════════
CREATE TABLE ncr_reports (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID REFERENCES projects(id) NOT NULL,
    workbook_id     UUID REFERENCES workbooks(id),
    section_id      UUID REFERENCES sections(id),
    task_id         UUID REFERENCES schedule_tasks(id),
    ncr_number      TEXT UNIQUE NOT NULL,           -- NCR-YYYY-NNNN
    title           TEXT NOT NULL,
    description     TEXT NOT NULL,
    severity        TEXT,                           -- minor/major/critical
    category        TEXT,                           -- dimensional/weld/material/surface/documentation
    discovered_by   UUID REFERENCES users(id),
    discovered_at   TIMESTAMPTZ,
    disposition     TEXT,                           -- use_as_is/repair/rework/reject/return
    disposition_notes TEXT,
    corrective_action TEXT,
    root_cause      TEXT,
    status          TEXT DEFAULT 'open',            -- open/under_review/closed
    closed_by       UUID REFERENCES users(id),
    closed_at       TIMESTAMPTZ,
    photos          TEXT[] DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════
-- RETROSPECTIVE
-- ═══════════════════════════════════════════════
CREATE TABLE retrospective_responses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID REFERENCES projects(id) NOT NULL,
    user_id         UUID REFERENCES users(id) NOT NULL,
    sections_worked_on TEXT[],
    hours_logged    NUMERIC(8,2),
    went_well       TEXT,
    could_be_better TEXT,
    do_differently  TEXT,
    improvements    TEXT,
    rating_technical INTEGER CHECK (rating_technical BETWEEN 1 AND 5),
    rating_collaboration INTEGER CHECK (rating_collaboration BETWEEN 1 AND 5),
    rating_timeline INTEGER CHECK (rating_timeline BETWEEN 1 AND 5),
    rating_quotation INTEGER CHECK (rating_quotation BETWEEN 1 AND 5),
    submitted_at    TIMESTAMPTZ DEFAULT now()
);
```

### 30.2 Key Indexes

```sql
-- Performance-critical indexes
CREATE INDEX idx_projects_org_id ON projects(org_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_workbooks_project_id ON workbooks(project_id);
CREATE INDEX idx_sections_workbook_id ON sections(workbook_id);
CREATE INDEX idx_spec_items_section_id ON spec_items(section_id);
CREATE INDEX idx_bom_items_workbook_id ON bom_items(workbook_id);
CREATE INDEX idx_comments_section_id ON comments(section_id);
CREATE INDEX idx_revisions_workbook_id ON revisions(workbook_id);
CREATE INDEX idx_revisions_is_active ON revisions(workbook_id, is_active) WHERE is_active = true;
CREATE INDEX idx_inventory_org_id ON inventory_items(org_id);
CREATE INDEX idx_inventory_part_number ON inventory_items(org_id, part_number);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_change_log_entity ON change_log(entity_type, entity_id);
CREATE INDEX idx_jobs_status ON background_jobs(status) WHERE status IN ('queued', 'processing');
-- Vector similarity search for AI memory (requires pgvector extension)
CREATE INDEX idx_memory_embedding ON ai_context_memory USING ivfflat (embedding vector_cosine_ops);
```

---

## 31. API SPECIFICATION

### 31.1 Base Configuration

```
Base URL:         /api/v1
Authentication:   Bearer {jwt_access_token} in Authorization header
Content-Type:     application/json
Rate Limit:       100 req/min per user (configurable per plan)
Versioning:       URL-based (v1, v2...)
WebSocket:        wss://forge.yourdomain.com/ws/{org_id}/{user_id}
```

### 31.2 Standard Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 25,
    "total": 143,
    "total_pages": 6
  },
  "errors": null
}
```

Error response:
```json
{
  "success": false,
  "data": null,
  "errors": [
    { "code": "PERMISSION_DENIED", "message": "You do not have permission to approve quotations", "field": null }
  ]
}
```

### 31.3 Endpoint Reference (Complete)

```
AUTH
POST   /auth/login                           Email + password login
POST   /auth/google                          Google OAuth token exchange
POST   /auth/refresh                         Refresh JWT token
POST   /auth/logout                          Revoke refresh token
POST   /auth/forgot-password                 Send reset email
POST   /auth/reset-password                  Reset with token
GET    /auth/sessions                        List active sessions
DELETE /auth/sessions/{id}                   Revoke specific session
DELETE /auth/sessions                        Revoke all other sessions

ORGANIZATIONS
GET    /orgs/current                         Get current org
PUT    /orgs/current                         Update org profile
GET    /orgs/current/members                 List all members
POST   /orgs/current/members/invite          Invite by email
PUT    /orgs/current/members/{uid}/role      Change member role
DELETE /orgs/current/members/{uid}           Remove member
GET    /orgs/current/invitations             List active invitations
DELETE /orgs/current/invitations/{id}        Revoke invitation
GET    /orgs/current/integrations            List configured integrations
POST   /orgs/current/integrations            Add integration
PUT    /orgs/current/integrations/{id}       Update integration
DELETE /orgs/current/integrations/{id}       Remove integration
POST   /orgs/current/integrations/{id}/test  Test integration connection
POST   /orgs/current/integrations/{id}/sync  Trigger manual sync

PROJECTS
GET    /projects                             List projects (with filters)
POST   /projects                             Create project
GET    /projects/{id}                        Get project details
PUT    /projects/{id}                        Update project
DELETE /projects/{id}                        Archive project
PUT    /projects/{id}/status                 Change project status
GET    /projects/{id}/members               List project members
POST   /projects/{id}/members               Add member to project
PUT    /projects/{id}/members/{uid}         Update project role
DELETE /projects/{id}/members/{uid}         Remove from project
GET    /projects/{id}/attachments           List attachments
POST   /projects/{id}/attachments           Upload attachment
DELETE /projects/{id}/attachments/{aid}     Delete attachment
GET    /projects/{id}/report                Generate project status report
GET    /projects/{id}/manufacturing         Get manufacturing tracker view
POST   /projects/{id}/checklist             Submit pre-production checklist
GET    /projects/{id}/retrospective         Get retrospective responses
POST   /projects/{id}/retrospective         Submit retrospective response

WORKBOOKS
GET    /projects/{pid}/workbooks            List workbooks in project
POST   /projects/{pid}/workbooks            Create workbook
GET    /workbooks/{id}                      Get workbook
PUT    /workbooks/{id}                      Update workbook
DELETE /workbooks/{id}                      Delete workbook
PUT    /workbooks/{id}/status               Change workbook status
GET    /workbooks/{id}/attachments          List workbook attachments
POST   /workbooks/{id}/attachments          Upload attachment
DELETE /workbooks/{id}/attachments/{aid}    Delete attachment

PDF PARSING
POST   /workbooks/{id}/upload               Upload PDF (returns upload URL for direct-to-S3)
POST   /workbooks/{id}/upload/confirm       Confirm upload complete, trigger parse
GET    /workbooks/{id}/parse/status         Poll parse job status
GET    /workbooks/{id}/parse/preview        Get parsed section preview (before confirm)
POST   /workbooks/{id}/parse/confirm        Confirm section structure, create sections
POST   /workbooks/{id}/parse/retry          Retry failed parse

SECTIONS
GET    /workbooks/{id}/sections             List all sections
POST   /workbooks/{id}/sections             Add manual section
GET    /sections/{id}                       Get section details
PUT    /sections/{id}                       Update section (name, status, assignee, summary)
DELETE /sections/{id}                       Delete section
PUT    /sections/{id}/status                Change section status
POST   /sections/{id}/regenerate-summary    Trigger AI re-summarize
POST   /sections/{id}/ai-review             Trigger AI peer review of section
POST   /sections/{id}/visualize             Trigger Anime.js visualization generation
GET    /sections/{id}/annotations           Get PDF annotations for section
POST   /sections/{id}/annotations           Add annotation
DELETE /sections/{id}/annotations/{aid}     Delete annotation

SPEC ITEMS
GET    /sections/{id}/specs                 List spec items
POST   /sections/{id}/specs                 Add spec item
PUT    /specs/{id}                          Update spec item
DELETE /specs/{id}                          Delete spec item
POST   /specs/{id}/ai-recheck               Re-query AI for this spec value

BOM
GET    /workbooks/{id}/bom                  Get full BOM
POST   /workbooks/{id}/bom                  Add BOM item
PUT    /workbooks/{id}/bom/{item_id}        Update BOM item
DELETE /workbooks/{id}/bom/{item_id}        Delete BOM item
POST   /workbooks/{id}/bom/import           Import BOM from CSV/Excel (job)
GET    /workbooks/{id}/bom/export           Export BOM (job)
POST   /workbooks/{id}/bom/ai-generate      AI generate BOM from sections (job)

INVENTORY
GET    /inventory                           List inventory (org + project scope)
POST   /inventory                           Create item
GET    /inventory/{id}                      Get item
PUT    /inventory/{id}                      Update item
DELETE /inventory/{id}                      Deactivate item (soft delete)
POST   /inventory/import                    Import from CSV/Excel (job)
GET    /inventory/export                    Export inventory (job)
GET    /inventory/search                    Search + autocomplete (for BOM dropdowns)
POST   /inventory/{id}/promote              Promote project item to org level
GET    /inventory/external/search           Search external integration adapters

QUOTATIONS
GET    /workbooks/{id}/quotations           List quotations
POST   /workbooks/{id}/quotations           Create quotation
GET    /quotations/{id}                     Get quotation
PUT    /quotations/{id}                     Update quotation
PUT    /quotations/{id}/status              Change status (submit/approve/send)
POST   /quotations/{id}/export              Export quotation PDF (job)
POST   /quotations/{id}/clone               Clone for revision/change order

REVISIONS
GET    /workbooks/{id}/revisions            List all revisions
POST   /workbooks/{id}/revisions/save       Create new revision snapshot (job)
GET    /revisions/{id}                      Get revision metadata
GET    /revisions/{id}/diff                 Get diff vs another revision
POST   /revisions/{id}/activate             Activate (creates branch)
PUT    /revisions/{id}/lock                 Lock revision (read-only)

COMMENTS
GET    /sections/{id}/comments              List comments (threaded)
POST   /sections/{id}/comments              Add comment
PUT    /comments/{id}                       Update comment
PUT    /comments/{id}/resolve               Resolve comment
DELETE /comments/{id}                       Delete comment
POST   /comments/{id}/reply                 Add reply

SCHEDULE
GET    /workbooks/{id}/schedule             Get all schedule tasks
POST   /workbooks/{id}/schedule             Add task
PUT    /schedule/{id}                       Update task
DELETE /schedule/{id}                       Delete task
PUT    /schedule/{id}/status                Update task status (shop floor)
POST   /schedule/{id}/photos               Upload completion photos (shop floor)
POST   /workbooks/{id}/schedule/ai-generate AI generate schedule from workbook (job)

AI ASSISTANT
POST   /ai/chat                             Send message to AI assistant (streams response)
GET    /ai/suggestions/{section_id}         Get proactive suggestions for section
POST   /ai/memory                           Add memory point manually
GET    /ai/memory                           List memory points (scoped)
DELETE /ai/memory/{id}                      Delete memory point
PUT    /ai/memory/{id}/pin                  Pin/unpin memory point

AI AGENTS
GET    /agents                              List configured agents + status
POST   /agents/{type}/run                   Manually trigger agent task (job)
GET    /agents/log                          Agent activity log
PUT    /agents/{type}/config                Update agent configuration

EXPORTS
POST   /exports/design-plan                 Export design plan document (job)
POST   /exports/bom                         Export BOM (job)
POST   /exports/quotation/{id}              Export quotation PDF (job)
POST   /exports/schedule                    Export schedule (job)
POST   /exports/spec-sheet                  Export spec code sheet (job)
POST   /exports/work-order                  Export manufacturing work order (job)
POST   /exports/traceability                Export material traceability report (job)
POST   /exports/retrospective/{project_id}  Export retrospective report (job)
GET    /jobs/{id}                           Poll job status
GET    /jobs/{id}/download                  Download completed job output

REPORTS
GET    /reports/project/{id}                Project status report (JSON)
GET    /reports/portfolio                   Org portfolio report
GET    /reports/financial                   Financial report
GET    /reports/schedule                    Schedule performance report
GET    /reports/quality                     QA/inspection report
GET    /reports/inventory                   Inventory/procurement report
GET    /reports/agents                      AI agent activity report
POST   /reports/schedule                    Schedule a report for recurring delivery

NOTIFICATIONS
GET    /notifications                       List notifications
PUT    /notifications/{id}/read             Mark read
PUT    /notifications/read-all              Mark all read
GET    /notifications/preferences           Get delivery preferences
PUT    /notifications/preferences           Update delivery preferences

SETTINGS
GET    /settings/user                       Get user settings
PUT    /settings/user                       Update user settings
GET    /settings/ai                         Get AI configuration
PUT    /settings/ai                         Update AI configuration
POST   /settings/ai/test                    Test AI key connection
GET    /settings/storage                    Get storage config
PUT    /settings/storage                    Update storage config
POST   /settings/storage/test              Test storage connection

NCR
GET    /projects/{id}/ncr                   List NCR reports
POST   /projects/{id}/ncr                   Create NCR
GET    /ncr/{id}                            Get NCR detail
PUT    /ncr/{id}                            Update NCR
PUT    /ncr/{id}/close                      Close NCR

DEVELOPER (Pro+ only)
GET    /developer/api-keys                  List API keys
POST   /developer/api-keys                  Create API key
DELETE /developer/api-keys/{id}             Revoke API key
GET    /developer/webhooks                  List webhooks
POST   /developer/webhooks                  Create webhook
DELETE /developer/webhooks/{id}             Delete webhook

ADMIN (superadmin only)
GET    /admin/orgs                          List all organizations
GET    /admin/orgs/{id}                     Get org detail + usage
PUT    /admin/orgs/{id}/plan                Change org subscription plan
PUT    /admin/orgs/{id}/trial               Set trial expiry
POST   /admin/orgs/{id}/impersonate         Get impersonation token
GET    /admin/users                         Global user list
PUT    /admin/users/{id}/disable            Disable user account
GET    /admin/analytics                     Platform analytics
GET    /admin/system/health                 System health check
PUT    /admin/feature-flags                 Update global feature flags
GET    /admin/jobs                          All background jobs status
GET    /admin/ai-usage                      AI token usage across all orgs
```

### 31.4 WebSocket Events

```javascript
// Client → Server
{ "type": "subscribe", "channel": "workbook", "id": "workbook-uuid" }
{ "type": "presence", "section_id": "section-uuid" }   // User viewing a section

// Server → Client
{ "type": "workbook.status_changed", "workbook_id": "...", "new_status": "plan_complete", "by": "user-uuid" }
{ "type": "section.comment_added", "section_id": "...", "comment_id": "..." }
{ "type": "revision.published", "workbook_id": "...", "revision_id": "..." }
{ "type": "job.complete", "job_id": "...", "job_type": "export_pdf", "file_url": "..." }
{ "type": "job.progress", "job_id": "...", "progress": 65, "message": "Rendering..." }
{ "type": "agent.task_complete", "agent_type": "estimator", "result_summary": "..." }
{ "type": "presence.update", "section_id": "...", "viewers": ["user-uuid-1", "user-uuid-2"] }
{ "type": "notification", "notification_id": "...", "title": "...", "body": "..." }
```

---

## 32. TECH STACK & IMPLEMENTATION GUIDE

### 32.1 Frontend Stack (Complete)

```
Core Framework:         React 18.3 + TypeScript 5.x
Build Tool:             Vite 5 (fast dev server, optimized prod builds)
Styling:                Tailwind CSS 3.4 (utility-first, JIT)
State Management:       Zustand 4.5 (global) + TanStack Query v5 (server state)
Routing:                React Router v6 (file-based, nested routes)
Animation - UI:         Framer Motion 11 (transitions, micro-interactions)
Animation - Data:       Anime.js 3.2 (parallax visualization engine)
3D Models:              Three.js r159 (project 3D visual viewer)
WYSIWYG Editor:         TipTap 2.4 (extensible ProseMirror)
Data Tables:            TanStack Table v8 (headless, composable)
PDF Rendering:          react-pdf 7 + PDF.js (Mozilla)
Charts:                 Recharts 2.12 (SVG, composable) + D3 v7 (custom viz)
Forms:                  React Hook Form 7 + Zod 3 (validation)
Icons:                  Lucide React 0.408
Date Handling:          date-fns 3
File Upload:            react-dropzone 14
Drag & Drop:            @dnd-kit/core + @dnd-kit/sortable
Notifications:          Sonner (toasts) + custom drawer component
HTTP Client:            Axios 1.7 (with interceptors + retry)
Mock API:               MSW v2 (Mock Service Worker — zero-change mock/real switch)
WebSocket:              native WebSocket API (wrapped in custom hook)
Virtual Scroll:         @tanstack/react-virtual (for large lists)
Date Picker:            react-day-picker 8
Rich Gantt:             dhtmlxGantt (Pro) or react-gantt-chart (open source)
Code Highlighting:      Prism.js (for code blocks in WYSIWYG)
Internationalization:   i18next (prepared, not active in v1)
Testing:                Vitest + React Testing Library + Playwright (E2E)
Linting:                ESLint + Prettier
Type Checking:          TypeScript strict mode
```

### 32.2 Backend Stack (Complete)

```
Core Framework:         Python 3.11 + FastAPI 0.111
ASGI Server:            Uvicorn (dev) / Gunicorn + Uvicorn (prod)
Task Queue:             Celery 5.4 + Redis 7
PDF Processing:         PyMuPDF (fitz) 1.24 — primary
                        pdf2image 1.17 — image conversion
                        Pillow 10 — image manipulation
                        pytesseract + easyocr — OCR fallback
Image Analysis:         OpenCV 4.10 (cv2)
AI Orchestration:       LangChain 0.2 + LlamaIndex 0.10
Vector DB:              pgvector (PostgreSQL extension) primary
                        Chroma 0.5 (if external vector DB preferred)
AI Providers SDKs:      openai, anthropic, google-generativeai, mistralai, huggingface_hub
Object Storage:         boto3 (S3/MinIO), google-cloud-storage
Google Drive:           google-api-python-client 2.130
Firebase:               firebase-admin 6
Email:                  fastapi-mail + sendgrid (or SMTP via aiosmtplib)
Auth:                   python-jose[cryptography] (JWT)
                        passlib[bcrypt] (password hashing)
                        google-auth (Google OAuth verification)
ORM:                    SQLAlchemy 2.0 (async) + Alembic (migrations)
Database Driver:        asyncpg (async PostgreSQL driver)
Redis Client:           redis-py 5 (async)
Data Validation:        Pydantic v2
HTTP Client (internal): httpx (async, for calling external integrations)
Scheduling:             Celery beat (periodic tasks)
Telegram:               python-telegram-bot 21
WhatsApp:               requests (Meta Cloud API)
Slack:                  slack-sdk 3
Document Generation:    python-docx 1.1 (Word documents)
                        weasyprint 62 (HTML → PDF, better styling)
                        openpyxl 3.1 (Excel)
                        Jinja2 3.1 (document templates)
Testing:                pytest + pytest-asyncio + httpx (TestClient)
Logging:                structlog 24 (structured JSON logging)
Monitoring:             prometheus-fastapi-instrumentator
Type Hints:             Full type annotation (mypy strict)
```

### 32.3 Infrastructure & DevOps

```
Database:               PostgreSQL 15 + pgvector extension
Cache / Broker:         Redis 7
Object Storage:         MinIO (self-hosted) or AWS S3
Reverse Proxy:          Nginx 1.26 (SSL, rate limiting, static files)
Containers:             Docker 25 + Docker Compose v2
CI/CD:                  GitHub Actions (lint → test → build → deploy)
Secret Management:      .env for local; AWS Secrets Manager / Vault for cloud
TLS:                    Let's Encrypt (certbot) or AWS ACM
DNS:                    Configurable (any DNS provider)
Monitoring:             Prometheus + Grafana (optional dashboard)
Logging:                Loki + Grafana (optional) or CloudWatch/Datadog
Backup:                 pg_dump daily → S3, MinIO snapshots weekly
```

### 32.4 Docker Compose Service Map

```yaml
# docker-compose.yml
version: '3.9'
services:
  nginx:         # Reverse proxy, SSL, static file serving
  frontend:      # Vite dev or Nginx serving built React app
  api:           # FastAPI core (2+ replicas in prod)
  worker-pdf:    # Celery: PDF parse jobs (scale: 2-4 per production)
  worker-ai:     # Celery: AI generation/extraction jobs (scale: 3-8)
  worker-export: # Celery: Document export jobs (scale: 2-4)
  worker-agent:  # Celery: AI agent execution (scale: 1-2)
  worker-notify: # Celery: Notification dispatch (scale: 1-2)
  beat:          # Celery beat scheduler (1 instance only)
  redis:         # Broker + cache (Redis 7, persistence enabled)
  postgres:      # Primary database (with pgvector)
  minio:         # Object storage (self-hosted S3)
  chroma:        # Vector DB (optional, if not using pgvector)

# Scale workers independently:
# docker compose scale worker-ai=5 worker-pdf=3
```

---

## 33. TECHNICAL PREREQUISITES & REQUIRED KEYS

### 33.1 Minimum Infrastructure Requirements

**Development:**
```
RAM:    8 GB minimum, 16 GB recommended
CPU:    4 cores minimum
Storage: 20 GB (code + local MinIO + Postgres)
Docker + Docker Compose v2
Node.js 20 LTS
Python 3.11+
```

**Production (per 10 concurrent users):**
```
API server:  2 vCPU, 4 GB RAM
PostgreSQL:  2 vCPU, 4 GB RAM, 50 GB SSD
Redis:       1 vCPU, 2 GB RAM
Workers:     4 vCPU, 8 GB RAM (combined)
MinIO:       2 vCPU, 2 GB RAM, 100 GB storage (initial)
```

### 33.2 Required API Keys & Services

```
CORE (required for basic functionality):
  ── None required beyond infrastructure ──
  Free tier uses HuggingFace for AI (anonymous, rate-limited)

AI PROVIDERS (at least one required for full functionality):
  OpenAI:         https://platform.openai.com/api-keys
                  Billing: Set up payment method, recommended $50 credit minimum
                  Models: GPT-4o ($5/1M input, $15/1M output), GPT-4o-mini ($0.15/1M in)

  Anthropic:      https://console.anthropic.com
                  Models: Claude 3.5 Sonnet ($3/1M in, $15/1M out)

  Google AI:      https://aistudio.google.com/apikey
                  Models: Gemini 1.5 Pro ($3.50/1M in), Gemini Flash (free tier available)

  xAI:            https://console.x.ai
                  Models: Grok-2

  Perplexity:     https://www.perplexity.ai/api
                  Use case: Standards citations, web search queries

  DeepSeek:       https://platform.deepseek.com
                  Models: DeepSeek-V3 (very low cost, good for text tasks)

  HuggingFace:    https://huggingface.co/settings/tokens
                  Free tier: create read token, limited rate
                  Note: Anonymous access available but rate-limited

  Mistral:        https://console.mistral.ai
  Voyage AI:      https://dash.voyageai.com (for embeddings)

OPTIONAL SERVICES:
  Google OAuth:   https://console.cloud.google.com/apis/credentials
                  Create OAuth 2.0 Client ID (Web Application)
                  Redirect URI: http://localhost:3000/auth/google/callback
                  Required if Google Login or Google Drive features used

  Google Drive:   Same OAuth client as above
                  Enable: Google Drive API v3
                  Scopes: drive.file (write only user's files)

  Firebase:       https://console.firebase.google.com
                  Create project → Firestore + Storage
                  Download service-account JSON
                  Use case: Free-tier PoC storage

  SendGrid:       https://sendgrid.com (or use SMTP)
                  Email delivery for notifications, quotation emails
                  Verify sender domain for deliverability

  Telegram Bot:   https://t.me/BotFather → /newbot
                  Get Bot Token (format: 123456:ABC-...)
                  Required for: Agent chat control, notification delivery

  WhatsApp:       https://developers.facebook.com/apps
                  WhatsApp Business Cloud API
                  Meta Business Verification required for production
                  Required for: Agent chat control

  Slack:          https://api.slack.com/apps → Create App
                  Bot Token Scopes: chat:write, channels:read
                  Required for: Agent chat control, team notifications

AWS S3 / MinIO:   AWS: https://aws.amazon.com/s3 → Create bucket + IAM user
                  MinIO: Self-hosted, no external account needed
                  Required for: File storage (PDF uploads, exports)
                  S3 recommended for production, MinIO for self-hosted
```

### 33.3 Complete Environment Variables Reference

```bash
# ═══════════════════════════════════════════════════
# FORGE v2.0 — .env Configuration Reference
# ═══════════════════════════════════════════════════

# ── App Core ──────────────────────────────────────
APP_ENV=production                      # development | staging | production
APP_URL=https://forge.yourdomain.com    # Public app URL (no trailing slash)
API_URL=https://forge.yourdomain.com/api
SECRET_KEY=<random 64-char hex string>  # python -c "import secrets; print(secrets.token_hex(32))"
SUPERADMIN_EMAIL=admin@yourdomain.com   # App-level super admin
DEBUG=false                             # true only in development

# ── Database ──────────────────────────────────────
DATABASE_URL=postgresql+asyncpg://forge_user:password@localhost:5432/forge_db
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=10
POSTGRES_DB=forge_db
POSTGRES_USER=forge_user
POSTGRES_PASSWORD=<strong-password>

# ── Redis ─────────────────────────────────────────
REDIS_URL=redis://:password@localhost:6379/0
REDIS_CACHE_DB=1                        # Separate DB for cache vs broker

# ── Security ──────────────────────────────────────
JWT_SECRET_KEY=<random 64-char hex>
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15
JWT_REFRESH_TOKEN_EXPIRE_DAYS=30
AES_ENCRYPTION_KEY=<random 32-char hex> # For encrypting stored API keys
ALLOWED_HOSTS=forge.yourdomain.com,localhost
CORS_ORIGINS=https://forge.yourdomain.com,http://localhost:3000

# ── CORS ──────────────────────────────────────────
FRONTEND_URL=https://forge.yourdomain.com

# ── Google OAuth (optional) ──────────────────────
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=${APP_URL}/auth/google/callback

# ── AI Providers — App-Level Keys ────────────────
# These are used for trial/demo organizations. Leave blank to require orgs to provide their own.
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
XAI_API_KEY=
GOOGLE_AI_API_KEY=
PERPLEXITY_API_KEY=
DEEPSEEK_API_KEY=
MISTRAL_API_KEY=
VOYAGE_API_KEY=
HUGGINGFACE_TOKEN=                      # For free tier (anonymous if blank)

# Default model per task type (used as fallback if org has no config)
AI_MODEL_PDF_PARSE=claude-3-5-sonnet-20241022
AI_MODEL_DIMENSION_EXTRACT=gpt-4o-2024-11-20
AI_MODEL_BOM_EXTRACT=claude-3-5-sonnet-20241022
AI_MODEL_TEXT_GEN=gpt-4o-mini
AI_MODEL_SUMMARY=claude-3-5-sonnet-20241022
AI_MODEL_EMBED=text-embedding-3-small
AI_FREE_FALLBACK_MODEL=mistralai/Mistral-7B-Instruct-v0.3  # HuggingFace model ID

# Ollama (local models — optional)
OLLAMA_BASE_URL=http://localhost:11434  # Leave blank to disable

# ── File Storage ──────────────────────────────────
# Option 1: MinIO (self-hosted, recommended for on-prem)
STORAGE_PROVIDER=minio                  # minio | s3 | gcs | azure | firebase
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=<strong-password>
MINIO_BUCKET=forge-files
MINIO_SECURE=false                      # true for HTTPS MinIO

# Option 2: AWS S3
# STORAGE_PROVIDER=s3
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_REGION=us-east-1
# S3_BUCKET=forge-files

# ── Firebase (free-tier fallback) ────────────────
FIREBASE_PROJECT_ID=
FIREBASE_CREDENTIALS_JSON=              # Path to service account JSON file OR JSON string

# ── Google Drive (per-org, but app must be configured) ──
# Configured per org in settings, but app OAuth must exist:
GOOGLE_DRIVE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GOOGLE_DRIVE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}

# ── Email ─────────────────────────────────────────
EMAIL_PROVIDER=sendgrid                 # sendgrid | smtp
SENDGRID_API_KEY=
# SMTP alternative:
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USERNAME=
# SMTP_PASSWORD=
# SMTP_TLS=true
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
EMAIL_FROM_NAME=FORGE

# ── Chat Integrations (Agent Control) ────────────
# Configured per-org, but tokens registered at app level:
TELEGRAM_BOT_TOKEN=                     # Bot token from BotFather
TELEGRAM_WEBHOOK_URL=${API_URL}/webhooks/telegram

WHATSAPP_PHONE_NUMBER_ID=               # From Meta Developer Console
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_VERIFY_TOKEN=<random-string>   # For webhook verification

SLACK_BOT_TOKEN=                        # xoxb-... token
SLACK_SIGNING_SECRET=

# ── Feature Flags ─────────────────────────────────
# Force-enable features (bypass subscription check) — comma-separated
FEATURE_FORCE_ENABLE=
# Force-disable features globally — comma-separated
FEATURE_FORCE_DISABLE=

# ── Task Workers ─────────────────────────────────
CELERY_BROKER_URL=${REDIS_URL}
CELERY_RESULT_BACKEND=${REDIS_URL}
WORKER_PDF_CONCURRENCY=4               # Parallel PDF parse tasks
WORKER_AI_CONCURRENCY=8                # Parallel AI tasks
WORKER_EXPORT_CONCURRENCY=4            # Parallel export jobs
PDF_PARSE_TIMEOUT_SECONDS=300          # 5 min max for large PDF parse
AI_REQUEST_TIMEOUT_SECONDS=120         # 2 min max for AI generation

# ── Rate Limiting ─────────────────────────────────
RATE_LIMIT_PER_MINUTE=100              # API requests per user per minute
AUTH_RATE_LIMIT_PER_MINUTE=10          # Login attempts per minute
AI_RATE_LIMIT_PER_HOUR=200            # AI requests per org per hour (free tier)

# ── File Upload Limits ────────────────────────────
MAX_PDF_SIZE_MB=200
MAX_ATTACHMENT_SIZE_MB=50
MAX_IMAGE_SIZE_MB=10
ALLOWED_PDF_MIME_TYPES=application/pdf

# ── Vector DB ─────────────────────────────────────
VECTOR_DB=pgvector                      # pgvector | chroma
# If Chroma:
# CHROMA_HOST=localhost
# CHROMA_PORT=8000

# ── Monitoring (optional) ─────────────────────────
SENTRY_DSN=                            # Error tracking
PROMETHEUS_ENABLED=false
LOG_LEVEL=INFO                         # DEBUG | INFO | WARNING | ERROR

# ═══════════════════════════════════════════════════
# FRONTEND (.env — Vite, prefix VITE_)
# ═══════════════════════════════════════════════════
VITE_API_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/ws
VITE_MOCK_API=false                    # true = use MSW mock data, no API calls
VITE_MOCK_DELAY_MS=400                 # Simulated latency in mock mode
VITE_MOCK_ORG=cambridge_profab         # Which fixture org to load in mock mode
VITE_GOOGLE_CLIENT_ID=                 # Same as backend Google Client ID
VITE_SENTRY_DSN=                       # Frontend error tracking (optional)
VITE_APP_ENV=production
```

### 33.4 First-Run Setup Checklist

```
□ Clone repository
□ Copy .env.example → .env (backend)
□ Copy .env.example → .env (frontend/vite)
□ Fill required values in both .env files
□ docker compose up -d postgres redis minio
□ cd backend && alembic upgrade head          (run DB migrations)
□ python scripts/seed_superadmin.py          (create first superadmin)
□ docker compose up                          (start all services)
□ Navigate to http://localhost:3000
□ Login as superadmin
□ Create first organization
□ Configure AI keys in Settings > AI
□ Configure storage in Settings > Storage
□ Invite first team member
□ Create first project + upload first PDF
```

---

## 34. FREE VS PAID FEATURE MATRIX

| Feature | Free | Starter ($49/mo) | Professional ($149/mo) | Enterprise (Custom) |
|---------|------|-----------------|----------------------|---------------------|
| **Organizations** | 1 | 1 | 1 | Unlimited |
| **Users** | 3 | 10 | 25 | Unlimited |
| **Active Projects** | 2 | 10 | Unlimited | Unlimited |
| **Workbooks/Project** | 5 | Unlimited | Unlimited | Unlimited |
| **Sections/Workbook** | 10 | Unlimited | Unlimited | Unlimited |
| **Storage** | 500 MB | 5 GB | 25 GB | Custom |
| **Revisions/Workbook** | 3 | 25 | Unlimited | Unlimited + archive |
| **AI Provider** | HuggingFace only | Own keys (all providers) | Own keys | Own keys + app keys option |
| **AI Calls/Day** | 10 | 100 | Unlimited | Unlimited |
| **PDF Intelligence** | Basic (OCR fallback) | Full 7-stage pipeline | Full + vision models | Full + custom models |
| **BOM Extraction** | Manual only | AI-assisted | Full AI auto | Full AI + agent |
| **Weld Symbol Decoder** | — | ✓ | ✓ | ✓ |
| **AI Context Memory** | — | ✓ | ✓ | ✓ |
| **Quotation Builder** | Basic (1 page) | Full (multi-page) | Full + templates | Full + custom templates |
| **Inventory** | Project only (50 items) | Org + Project (unlimited) | Full | Full |
| **External Integrations** | — | — | 1 adapter | Unlimited adapters |
| **Manufacturing Tracking** | — | ✓ | ✓ | ✓ |
| **Shop Floor Access** | — | ✓ | ✓ | ✓ |
| **NCR Reports** | — | ✓ | ✓ | ✓ |
| **Pre-Production Checklist** | — | ✓ | ✓ | ✓ |
| **Project Retrospective** | — | ✓ | ✓ | ✓ |
| **Revision Diff Viewer** | — | ✓ | ✓ | ✓ |
| **Parallax Anime.js Viz** | — | Basic | Full cinematic | Full + custom branding |
| **3D Model Viewer** | — | Images only | GLB/GLTF viewer | GLB/GLTF + embed |
| **Export Formats** | PDF only | PDF + DOCX + CSV | All formats | All formats |
| **Custom Logo on Exports** | — | ✓ | ✓ | ✓ |
| **Full Custom Branding** | — | — | ✓ (colors, fonts) | ✓ White-label |
| **No FORGE Watermark** | — | ✓ | ✓ | ✓ |
| **Google Drive Sync** | — | ✓ | ✓ | ✓ |
| **Email Templates** | Default only | Basic | Full WYSIWYG | Full + custom SMTP |
| **Document Templates** | Default only | Logo + basic | Full custom | White-label |
| **AI Agent Automation** | — | — | 2 agent types | All 7 agent types |
| **Agent Autonomy Mode** | — | — | Suggest only | Full autonomous |
| **Telegram Bot Control** | — | — | ✓ | ✓ |
| **WhatsApp Control** | — | — | — | ✓ |
| **Slack Integration** | — | — | ✓ | ✓ |
| **Scheduled Reports** | — | Basic (3) | Full suite | Full suite + custom |
| **Portfolio Report** | — | — | ✓ | ✓ |
| **Financial Reports** | — | Basic | Full | Full |
| **QA/Inspection Reports** | — | ✓ | ✓ | ✓ |
| **Mock API Mode** | ✓ | ✓ | ✓ | ✓ |
| **Developer API Access** | — | — | Read only | Read + Write + Webhooks |
| **SSO / SAML** | — | — | — | ✓ |
| **Client Portal** | — | — | — | ✓ (future) |
| **On-Premises Deployment** | — | — | — | ✓ |
| **Audit Log Export** | — | — | — | ✓ |
| **SLA** | — | — | 99.5% | 99.9% |
| **Support** | Community forum | Email (48h) | Priority email (24h) | Dedicated + Slack |

---

## 35. IMPLEMENTATION PHASES

### Phase 0 — Foundation (Weeks 1–2)

**Goal:** Running skeleton, auth, org creation, no AI yet.

```
Backend:
  ✓ FastAPI app factory with module router structure
  ✓ PostgreSQL + Alembic migrations (all core tables)
  ✓ Redis setup
  ✓ Celery worker skeleton (no tasks yet)
  ✓ JWT auth endpoints (login, refresh, logout)
  ✓ Google OAuth endpoint
  ✓ Org creation + user management endpoints
  ✓ Project CRUD endpoints
  ✓ MinIO/S3 file upload infrastructure
  ✓ Basic notification system (DB + WebSocket skeleton)

Frontend:
  ✓ Vite + React + TypeScript + Tailwind setup
  ✓ Zustand store skeleton (all slices, no logic)
  ✓ React Query client setup
  ✓ MSW mock setup + sample fixtures
  ✓ Auth module (login, Google, session lock PIN)
  ✓ Routing (all routes, empty pages)
  ✓ Layout system (sidebar, topbar, right panel skeleton)
  ✓ Design system components (Button, Card, Badge, Input, Modal, Toast)
  ✓ Org creation onboarding flow (Step 1–5)
  ✓ Dashboard shell (KPI placeholders, project grid)
  ✓ Project creation form + project list
```

### Phase 1 — Workbook Core (Weeks 3–5)

**Goal:** Create workbooks, upload PDFs, display sections (no AI parse yet).

```
Backend:
  ✓ Workbook CRUD
  ✓ PDF upload (direct-to-S3, signed URL approach)
  ✓ Basic PDF page extraction (PyMuPDF — no AI)
  ✓ Manual section creation
  ✓ Section CRUD + spec item CRUD
  ✓ BOM item CRUD
  ✓ Attachment upload (project + workbook level)
  ✓ Revision create/list (no activation yet)
  ✓ Comment system (threaded)

Frontend:
  ✓ Workbook creation flow (Steps 1–3, no AI parse)
  ✓ Workbook dashboard with tabs
  ✓ Three-panel cockpit layout (PDF viewer shell, work area, AI panel shell)
  ✓ PDF viewer (react-pdf, zoom, pan, page nav)
  ✓ Scale ruler component
  ✓ Spec table (TanStack, all column types, inline edit)
  ✓ BOM table (TanStack, all column types)
  ✓ TipTap WYSIWYG editor (section summary, notes)
  ✓ Comment threads (review panel)
  ✓ Revision timeline (basic, no diff yet)
  ✓ Status steppers (workbook + project)
  ✓ Attachment upload + file list
```

### Phase 2 — AI Parse Pipeline (Weeks 6–8)

**Goal:** Full 7-stage PDF intelligence pipeline, semantic extraction, section assembly.

```
Backend:
  ✓ Celery worker-pdf setup
  ✓ Stage 1: Pre-processing (PyMuPDF, page images, text coords)
  ✓ Stage 2: Page structure analysis (vision AI via AI Gateway)
  ✓ Stage 3: Section cropping + extraction
  ✓ Stage 4: Semantic extraction (dimensions, parts, weld symbols, notes, standards)
  ✓ Stage 5: Cross-reference + validation
  ✓ Stage 6: Section assembly + AI summaries
  ✓ Stage 7: Preview endpoint + confirm endpoint
  ✓ AI Gateway module (model routing, fallback chain, all providers)
  ✓ Job status polling endpoint (/jobs/{id})
  ✓ Weld symbol decoder (AWS A2.4)
  ✓ Standards recognition library
  ✓ Ghost overlay data (confidence boxes per extraction)
  ✓ Anomaly detection + alert list

Frontend:
  ✓ PDF parse progress UI (job polling, progress bar)
  ✓ Parse preview screen (section thumbnails, confirm/edit)
  ✓ Ghost overlay toggle on PDF viewer
  ✓ Bidirectional highlight (spec table row ↔ PDF box)
  ✓ AI suggestions panel (proactive anomaly display)
  ✓ AI assistant chat interface (basic, no memory yet)
  ✓ "Re-check" per spec item
  ✓ Annotation tools (highlight, sticky note, box, arrow)
  ✓ Compare revision viewer (side-by-side PDF)
```

### Phase 3 — Quotation, Inventory & Schedule (Weeks 9–11)

**Goal:** Full quotation builder, inventory system, manufacturing schedule.

```
Backend:
  ✓ Inventory CRUD (org + project level)
  ✓ Inventory search + autocomplete
  ✓ Inventory import (CSV/Excel — Celery job)
  ✓ External integration adapter framework
  ✓ Quotation CRUD (all pages, all cost components)
  ✓ Quotation approval flow
  ✓ Schedule task CRUD
  ✓ AI schedule generation (from workbook sections)
  ✓ NCR report CRUD
  ✓ Pre-production checklist
  ✓ Manufacturing status updates (shop floor endpoints)
  ✓ Completion photo upload

Frontend:
  ✓ Inventory management module (full table, search, import)
  ✓ Autocomplete from inventory in BOM editor
  ✓ Quotation builder (multi-page, all cost sections)
  ✓ Quotation cover page editor (WYSIWYG)
  ✓ Quotation terms editor (WYSIWYG)
  ✓ Schedule table (Gantt + list view toggle)
  ✓ Task assignment + status update
  ✓ Shop floor mobile view (task list, status update, photo upload)
  ✓ NCR management UI
  ✓ Pre-production checklist UI
  ✓ Manufacturing tracker (Kanban + progress feed)
  ✓ Integration settings (adapter configuration)
```

### Phase 4 — AI Memory, Agents & Context (Weeks 12–14)

**Goal:** AI context memory, AI agent system, chat integrations.

```
Backend:
  ✓ pgvector setup (or Chroma) for embeddings
  ✓ AI context memory: create, retrieve, semantic search, inject into prompts
  ✓ Memory auto-capture on key events (spec verify, section approve, etc.)
  ✓ AI agent orchestration (LangGraph)
  ✓ Agent task queue (worker-agent)
  ✓ DrawingAnalyst agent
  ✓ Estimator agent
  ✓ Scheduler agent
  ✓ Reporter agent (daily status)
  ✓ Telegram bot bridge
  ✓ Slack bot bridge
  ✓ Chat command parser + agent dispatcher
  ✓ Agent activity log

Frontend:
  ✓ AI memory tab in right panel (list, pin, delete, manual add)
  ✓ Context indicator in AI panel (current scope, memory count)
  ✓ AI tool buttons (Generate BOM, Peer Review, Calculate, etc.)
  ✓ Agent configuration UI (Settings > AI Agents)
  ✓ Agent status dashboard widget
  ✓ Agent activity log view
  ✓ Chat integration settings (Telegram, Slack)
```

### Phase 5 — Revisions, Visualization & Exports (Weeks 15–17)

**Goal:** Full revision control, Anime.js parallax, complete export suite.

```
Backend:
  ✓ Revision snapshot (full JSON to file storage)
  ✓ Revision diff computation
  ✓ Revision activation + branch logic
  ✓ Revision archive (for plans exceeding limit)
  ✓ Change log (field-level audit)
  ✓ Anime.js visualization generation (AI generates HTML — Celery job)
  ✓ Export: Design Plan (DOCX + PDF — Celery job)
  ✓ Export: BOM (Excel + CSV)
  ✓ Export: Quotation PDF
  ✓ Export: Work Order PDF
  ✓ Export: Spec Code Sheet PDF
  ✓ Export: Material Traceability
  ✓ Export: Retrospective PDF
  ✓ Org document template system (Jinja2 rendering)
  ✓ Event-driven export (WebSocket job.complete notification)

Frontend:
  ✓ Revision timeline visual (horizontal, nodes, click to expand)
  ✓ Revision diff viewer (split-screen, color-coded changes)
  ✓ Activate revision dialog (consequence display)
  ✓ Anime.js parallax viewer (self-contained HTML in iframe + fullscreen)
  ✓ Home-progress-card components (scroll-driven)
  ✓ Intuitive note cards (data-card="intuitive" with tilt effect)
  ✓ Export modal (options, format, branding)
  ✓ Job progress toast (export in progress → ready)
  ✓ Outputs tab (all generated files, download links)
  ✓ Document template editor (org admin)
  ✓ Email template editor (org admin)
```

### Phase 6 — Reporting, Admin & Polish (Weeks 18–20)

**Goal:** Full reporting suite, admin panel, performance, launch-ready.

```
Backend:
  ✓ All report endpoints
  ✓ Scheduled report Celery beat jobs
  ✓ Portfolio analytics queries (optimized with DB views)
  ✓ Financial report calculations
  ✓ Admin panel endpoints (all)
  ✓ Subscription management
  ✓ Feature flag system (DB + runtime)
  ✓ Retrospective system
  ✓ WhatsApp integration (if needed for launch)
  ✓ API keys + webhooks (developer tier)
  ✓ Performance: query optimization, N+1 fixes, indexes verified
  ✓ Security audit: OWASP top 10 check, rate limiting, input validation
  ✓ Load testing (k6 or Locust)

Frontend:
  ✓ All report pages (with charts, Recharts)
  ✓ Schedule report UI
  ✓ Admin panel (all sections)
  ✓ Subscription management UI
  ✓ Feature flag UI (admin)
  ✓ Settings: all sections complete
  ✓ Keyboard shortcuts overlay (? key)
  ✓ Onboarding tour (first-time user)
  ✓ Empty states (no projects, no workbooks, etc.)
  ✓ Error boundaries (per module)
  ✓ Loading skeletons (all pages)
  ✓ Mobile responsiveness (dashboard, reports, shop floor view)
  ✓ Retrospective form + aggregate view
  ✓ Full E2E tests (Playwright)
  ✓ Performance audit (Lighthouse > 90 all categories)
```

---

## APPENDIX A: MECHANICAL MANUFACTURING PROCESS REFERENCE

The following process stages inform FORGE's manufacturing lifecycle, schedule task generation, and pre-production checklist. AI task generation pulls from this process map.

**1. Engineering Receipt & Review**
- Receive client drawings (PDF, DWG, STEP)
- Drawing register entry (drawing #, revision, date received)
- Inter-disciplinary check (dimensions close, standard compliant)
- RFI (Request for Information) log — any ambiguities raised to client
- Preliminary material identification from drawing

**2. Estimating & Quotation**
- BOM development from drawings
- Material quantity take-off with scrap factors
- Labour hour estimation per operation
- Sub-contract identification (cutting, galvanizing, NDT)
- Overheads + margin application
- Quotation issue to client

**3. Order Entry & Kick-Off**
- Purchase order receipt from client
- Contract review against quotation (scope, revision)
- Project kick-off meeting: engineering, procurement, scheduling, shop
- Drawing distribution (controlled copies to shop floor)

**4. Procurement**
- Material requisition from BOM
- Purchase orders to suppliers (with material spec requirements)
- Mill certificate / Certificate of Conformance requirements stated on PO
- Expediting critical long-lead items
- Incoming material inspection:
  - Dimensional verification (length, width, thickness, diameter)
  - Material grade verification (heat number vs mill cert)
  - Visual inspection (surface condition, straightness)
  - Hardness testing (if specified)
  - Heat number marking on each piece (traceability)

**5. Planning & Scheduling**
- Work breakdown structure (WBS) — by assembly, sub-assembly
- Routing sheet creation (operation sequence per part)
- Jig and fixture design/sourcing
- Shop loading: capacity check per trade, scheduling
- Work order release

**6. Material Preparation**
- Cutting: plasma, laser, oxy-fuel, saw, shear (per material, thickness)
- Hole drilling, punching (for flanges, bolt holes)
- Beveling / edge preparation (weld joint prep)
- Shot blasting / surface preparation before fitup (if specified)
- Material marking (part number, heat number transfer after cutting)

**7. Fit-Up & Assembly**
- Jig / fixture setup and verification
- Part location: clamps, dogs, wedges
- Dimensional check of sub-assembly during fitup
- Tack welding sequence (distortion control)
- Squareness, flatness, dimensional verification before release to welding
- Fitup inspection sign-off (internal QA or third party)

**8. Welding**
- Weld Procedure Specification (WPS) selection and availability
- Welder assignment per WPS qualification
- Preheat: verify material chemistry → calculate preheat temperature (per AWS D1.1 Annex I or similar)
- Weld sequence following distortion control plan
- Interpass temperature monitoring and recording
- Visual inspection during welding (in-process VT)
- Welder continuity record maintenance
- Weld identification marking (welder stamps or records)

**9. Post-Weld Activities**
- Post-Weld Heat Treatment (PWHT) — stress relief, if specified
  - Temperature/time cycle per code
  - Thermocouple attachment and recording chart
- Straightening / press work (if distortion exceeds tolerance)
- Grinding and dressing welds (if specified: flush, smooth)

**10. Non-Destructive Testing (NDT)**
- Visual Testing (VT): all welds, per AWS D1.1 Ch. 6 / applicable code
- Radiographic Testing (RT): film or digital, per joint category
- Ultrasonic Testing (UT): manual UT or TOFD/PAUT per specification
- Magnetic Particle Testing (MT): for ferromagnetic materials
- Dye Penetrant Testing (PT): for austenitic stainless, non-magnetic
- Leak Testing (LT): for pressure-containing assemblies (pneumatic or hydrostatic)
- Dimensional Inspection: all critical dimensions vs drawing
  - First-article inspection or 100% as required
  - As-built record / traveler completion

**11. Surface Treatment**
- Blast cleaning: dry abrasive blast to specified profile
  - Standards: SSPC-SP10/NACE No.2 (near-white) or SSPC-SP6/NACE No.3 (commercial)
  - ISO 8501-1: Sa 2.5 near-white, Sa 2 commercial, Sa 3 white metal
  - Profile depth: 40–75 µm typical (measure with replica tape)
- Primer application: spray or brush
  - Record: material, batch #, DFT (wet + dry film thickness), applicator
- Intermediate coat: as specified
- Topcoat: color confirmation, gloss level
- DFT measurement per coat, total DFT vs specification
- Holiday testing (pinhole detection) if specified

**12. Final Inspection & Documentation Assembly**
- Final dimensional check (all critical dimensions)
- Visual inspection (surface, welds, hardware, markings)
- Paint DFT final check
- All NCR dispositions confirmed closed
- Documentation package assembly:
  - Material mill certificates (heat traceable to piece marks)
  - Welder continuity records
  - WPS/PQR records
  - NDT reports (RT film, UT charts, MT/PT reports)
  - Dimensional inspection records
  - Paint records
  - Hydrostatic/pneumatic test records (if applicable)
  - As-built drawing (if deviations noted)
  - Certificate of Conformance (if required)

**13. Packing, Shipping & Handover**
- Rigging point verification (safe working load vs piece weight)
- Packing / crating to prevent shipping damage
- Shipping marks per contract (item #, weight, dimensions, handling symbols)
- Shipping list / packing list
- Bill of Lading
- Transport: truck, flat deck, specialized (oversized load permits if applicable)
- Site delivery receipt — client sign-off
- Punch list / snag list resolution (post-delivery)
- Handover documentation (all quality records, O&M manuals if applicable)

**14. Project Close-Out**
- Final invoice submission
- Warranty period commencement (record start date)
- Lessons learned documentation (retrospective)
- As-built drawing distribution (final)
- Project archive

---

## APPENDIX B: DRAWING SECTION TYPES REFERENCE

FORGE's parser recognizes and categorizes these section types:

| Section Type | Description | PDF Identifier Pattern |
|-------------|-------------|----------------------|
| Plan View | Top-down view | "PLAN", "TOP VIEW", "PLAN VIEW" |
| Elevation | Front/side orthographic | "ELEVATION", "ELEV.", "EL" |
| Section Cut | Cross-section through assembly | "SECTION A-A", "SECT. B-B", "§" |
| Detail | Enlarged view of specific area | "DETAIL F", "DTL.", scale ratio (e.g., 2:1) |
| Isometric | 3D orthographic representation | "ISO", "ISOMETRIC" |
| Auxiliary | View from non-standard angle | "AUX.", "AUXILIARY VIEW" |
| Title Block | Drawing metadata | Bottom-right corner, revision table |
| General Notes | Notes applying to entire drawing | "GENERAL NOTES", "NOTES:" (numbered list) |
| Parts List / BOM | Tabulated component list | Tabular format, column headers: ITEM / QTY / DESCRIPTION |
| Weld Symbol Legend | Key to weld symbols used | "WELD SYMBOL KEY", "WELDING NOTES" |
| Revision Block | History of drawing changes | "REV." + date + description table |
| Match Line | Drawing continuation indicator | "MATCH LINE", dashed line at edge |
| Section Marker | Arrow + section cut indicator | "A", circle-enclosed letter with arrows |
| Callout / Balloon | Part reference bubble | Circled number with leader arrow |

---

## APPENDIX C: INVENTORY FIELD REFERENCE FOR MANUFACTURING

### Material Categories and Typical Fields

**Structural Steel Plate (e.g., 44W, A36, A572 Gr50)**
- Part Number, Description, Material Grade, Spec (ASTM/CSA)
- Dimensions: Length (mm/in) × Width (mm/in) × Thickness (mm/in)
- Unit Weight (kg/m² or lbs/ft²), Total Weight
- Surface: hot-rolled (HR), normalized, quenched & tempered (Q&T)
- Requires mill cert: YES (with heat number)
- Standard stock sizes: 2400×6000mm, 2400×9000mm, 1500×6000mm

**Structural Sections (W-shape, HSS, Angles, Channels)**
- Section designation (e.g., W310×97, HSS152×152×9.5, L102×102×9.5)
- Grade: 44W (CSA), A36 (ASTM), 50W, Grade 50
- Length (m), Unit Weight (kg/m), Total Weight
- Flange width, flange thickness, web thickness (auto-lookup from section database)

**Pipe & Tube**
- NPS or OD, Wall thickness / Schedule (SCH 40, SCH 80, XXS, STD, XH, etc.)
- Material: CS A106 Gr.B, SS 304/316, Alloy P11/P22, HDPE
- Length (m), Weight (kg/m)
- End condition: beveled, plain, threaded
- Seam type: seamless, ERW, DSAW
- Requires hydrostatic test cert: YES/NO

**Flanges (Weld Neck, Slip-On, Blind, etc.)**
- NPS, Pressure Class (150#, 300#, 600#, 900#, 1500#, 2500#)
- Facing: RF (raised face), FF (flat face), RTJ (ring type joint)
- Material: ASTM A105 (CS), A182 F316 (SS), A350 (low temp)
- Standard: ASME B16.5, B16.47
- Bolt circle, bolt holes (from standard — auto-lookup)

**Fittings (Elbows, Tees, Reducers, Caps)**
- NPS, Wall thickness, Bend radius (1.5D, 3D long radius)
- Material: ASTM A234 Gr.WPB (CS), A403 WP316L (SS)
- Schedule matching pipe
- Butt-weld vs socket-weld vs threaded

**Fasteners**
- Bolt: diameter × length, grade (A325, A490, F3125 Gr.A325, ASTM A193 B7), thread (UNC, metric)
- Nut: size, grade (A194 2H), finish (plain, HDG, mechanically galvanized)
- Washer: size, type (flat, Belleville, lock)
- Quantity: per set (bolt + nut + washer set)
- Stud bolts: diameter × length, threading (both ends, one end)

**Welding Consumables**
- Process: SMAW (stick), GMAW/FCAW (wire), GTAW (TIG rod), SAW
- Classification: E7018, ER70S-6, E71T-1C, ER308L (SS)
- Diameter: 3.2mm, 4.0mm (SMAW); 0.9mm, 1.2mm, 1.6mm (wire)
- Unit: kg or spool (15kg, 25kg)
- AWS classification number
- Compatible base metals
- Preheat requirement

**Hardware & Lifting**
- Lifting lug type (welded plate, bolted, shackle hole)
- Safe Working Load (SWL) — critical field
- Shackles: bow, dee, rated SWL, material (grade 6, grade 8)
- Eye bolts: diameter, SWL, material
- Pad eyes: plate size, hole diameter, material

**Paint / Coating**
- Product name, manufacturer, product code
- Type: epoxy primer, zinc-rich primer, polyurethane topcoat, intumescent, etc.
- Volume solids % (for DFT calculation)
- Coverage rate (m²/L at recommended DFT)
- Recommended DFT (dry film thickness) range in µm
- VOC content, pot life, recoat window
- Compatible topcoats (for system compatibility)

**Insulation**
- Type: mineral wool, ceramic fiber, calcium silicate, expanded perlite
- Form: blanket, board, block, castable
- Operating temperature range (°C/°F)
- Density (kg/m³)
- Thermal conductivity (W/m·K)
- Thickness required (mm)

---

## APPENDIX D: WELD & MATERIAL STANDARDS REFERENCE

### Key Standards FORGE Recognizes and Decodes

**Welding Standards**

| Standard | Title | Key Use |
|----------|-------|---------|
| AWS D1.1 | Structural Welding Code — Steel | Most common; steel structural weld requirements |
| AWS D1.2 | Structural Welding Code — Aluminum | Aluminum structures |
| AWS D1.6 | Structural Welding Code — Stainless Steel | Austenitic SS welding |
| AWS D1.8 | Structural Welding Code — Seismic Supplement | High seismic zones |
| CAN/CSA W59 | Welded Steel Construction | Canadian equivalent to AWS D1.1 |
| CAN/CSA W47.1 | Certification of Companies for Fusion Welding of Steel | Canadian welder cert |
| CAN/CSA W178.1 | Certification of Welding Inspection Organizations | Inspection cert |
| ASME BPVC Sec. IX | Welding, Brazing, and Fusing Qualifications | Pressure vessel/piping WPS |
| ISO 3834 | Quality Requirements for Fusion Welding | Quality management framework |
| ISO 15614 | Specification and Qualification of Welding Procedures | WPS qualification |
| AWS A2.4 | Standard Symbols for Welding, Brazing, and NDE | Weld symbol language |
| AWS A3.0 | Standard Welding Terms and Definitions | Reference |

**Material Standards**

| Standard | Material |
|----------|----------|
| ASTM A36 | Structural carbon steel plate/shapes (~250 MPa Fy) |
| ASTM A572 Gr.50 | HSLA structural steel (345 MPa Fy) |
| ASTM A516 Gr.70 | Pressure vessel carbon steel plate |
| ASTM A240 | Stainless steel plate (304, 316, 316L) |
| ASTM A312 | Stainless steel pipe (TP304, TP316) |
| ASTM A106 Gr.B | Seamless carbon steel pipe (high temperature) |
| ASTM A105 | Carbon steel flanges and fittings |
| CSA G40.21 | Canadian structural steel (44W, 50W, 50WT, 80W) |
| CAN/CSA G30.18 | Billet-steel bars for concrete reinforcement |

**Inspection & NDT Standards**

| Standard | Method |
|----------|--------|
| ASNT SNT-TC-1A | Personnel qualification (NDT) |
| CAN/CSA W178.2 | Certification of welding inspectors |
| ASTM E709 | Magnetic particle testing (MT) |
| ASTM E165 | Liquid penetrant testing (PT) |
| ASTM E1742 | Radiographic testing (RT) |
| ASTM E164 | Contact ultrasonic testing (UT) |
| AWS D1.1 Ch.6 | Inspection requirements (VT, MT, PT, RT, UT) |

**Surface Treatment Standards**

| Standard | Description |
|----------|-------------|
| SSPC-SP10 / NACE No.2 | Near-white blast cleaning |
| SSPC-SP6 / NACE No.3 | Commercial blast cleaning |
| SSPC-SP3 | Power tool cleaning |
| SSPC-SP2 | Hand tool cleaning |
| ISO 8501-1 | Preparation grades: Sa 1, Sa 2, Sa 2.5, Sa 3 |
| SSPC-PA 1 | Shop, field, and maintenance painting |
| SSPC-PA 2 | Measurement of dry paint film thickness |

**FORGE uses these standards to:**
1. Auto-recognize references in extracted text
2. Validate extracted spec values against code minimum/maximum requirements
3. Provide linked citations in AI suggestions
4. Generate spec code sheets with proper standard references
5. Build pre-production checklists with applicable verification requirements

---

*End of FORGE Product Specification v2.0*
*Total Sections: 35 + 4 Appendices*
*Document Classification: Internal — AI Agent / Developer Implementation Guide*
*Review with: Product Owner before agent implementation begins*
*Version: 2.0 | Last Updated: February 2026*
*Do not remove or abbreviate any section — full fidelity required for implementation accuracy.*
