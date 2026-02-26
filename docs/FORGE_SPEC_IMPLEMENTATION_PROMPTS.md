## AGENT PROMPT TEMPLATES

These are ready-to-paste prompts for each phase. Copy the entire block when starting a new phase with your AI agent.

---
Refer the below docs only if you have any doubt. 
D:\Hoopit\Apps\Forge\v2\docs\FORGE_SPEC_V2.md - contains the spec
D:\Hoopit\Apps\Forge\v2\docs\FORGE_SPEC_IMPLEMENTATION.md  - contains the Implementation plan

the whole work is divided into 8 Phases - you only do it phase by phase

### PROMPT: Phase 0 — Scaffold

```
You are implementing FORGE, a mechanical fabrication management platform.

ROLE: Frontend architect — build the project scaffold only.

TECH STACK (use exact versions):
- React 18.3.1 + TypeScript 5.5 + Vite 5.3
- Tailwind CSS 3.4 (with custom design tokens from spec)
- Zustand 4.5 (global state)
- TanStack Query v5 (server state)
- MSW v2 (Mock Service Worker — mock API)
- Framer Motion 11, Anime.js 3.2, Three.js 0.166
- Lucide React 0.408 (icons)

RULES:
1. Every module lives in src/modules/[name]/ and exposes ONLY index.ts
2. No module imports another module's internals
3. All shared code goes in src/shared/
4. VITE_MOCK_API=true — all API calls intercepted by MSW
5. TypeScript strict mode — zero any types
6. All color values from tailwind.config.ts tokens — no hardcoded hex in components

DELIVER IN THIS ORDER:
1. package.json with all dependencies
2. vite.config.ts + tsconfig.json + tailwind.config.ts
3. src/shared/types/index.ts (all TypeScript interfaces)
4. src/shared/store/ (all Zustand slices)
5. src/shared/api/ (Axios client + MSW setup)
6. src/shared/components/ (design system components)
7. src/app/router.tsx (routing skeleton — all routes to placeholder pages)
8. src/main.tsx (MSW initialization)
9. src/shared/api/mock/fixtures/ (all fixture JSON files)
10. Verify: npm run dev starts, MSW shows in console, dark theme correct

DO NOT BUILD: any feature pages, any API calls, any business logic.
```

---

### PROMPT: Phase 1 — Auth & Org

```
You are implementing FORGE Phase 1 — Authentication & Organization Shell.

COMPLETED: Phase 0 (scaffold, design tokens, Zustand store, MSW setup, routing skeleton).
AVAILABLE: src/shared/types/index.ts, src/shared/store/, src/shared/components/

SPEC REFERENCE SECTIONS: 7 (Auth), 8 (Org & Team Management)

YOUR TASK: Build these modules:
1. src/modules/auth/ — Login, Session Lock PIN, Forgot Password
2. src/modules/org/ — Onboarding wizard (5 steps), Org Settings, Team Management
3. src/shared/components/layout/ — AppShell, Sidebar, TopBar, GlobalSearch

MSW HANDLERS TO CREATE:
- src/shared/api/mock/handlers/auth.handlers.ts
- src/shared/api/mock/handlers/org.handlers.ts

MOCK CREDENTIALS (in fixture): email="john@cambridgeprofab.com" password="password123"
MOCK ORG: Cambridge Profab (in organizations.json fixture)

SESSION LOCK PIN RULES (SPEC 7.1):
- Store PIN as SHA-256 hash in localStorage
- Idle timeout: configurable (5/10/15/30 min), default 15 min
- Lock screen: full-page overlay showing org logo + 6-digit input
- Security question stored in localStorage for PIN reset

SIDEBAR (SPEC 2.4):
- Collapsed: 64px (icon only)
- Expanded: 260px (icon + label)
- Org logo (40×40px) at top when logoUrl exists
- Nav items: Dashboard, Projects, Inventory, Reports, Settings
- Toggle: persisted in uiSlice.sidebarExpanded

ONBOARDING (SPEC 8.1): 5 steps
Step 1: Org name + logo upload + industry + country
Step 2: Address + phone + email + tax IDs + bank details
Step 3: Labour rate table + overhead % + margins + contingency + payment terms
Step 4: Document template selector (link to template editor — placeholder OK)
Step 5: Invite team members (email + role)

After onboarding: redirect to dashboard. Org NOT in sidebar nav — only in Settings.

DO NOT BUILD: Dashboard content, Projects, Workbooks, or any other module.
```

---

### PROMPT: Phase 2 — Dashboard & Projects

```
You are implementing FORGE Phase 2 — Dashboard & Project Management.

COMPLETED: Phases 0–1 (scaffold, auth, org shell running).

SPEC REFERENCE SECTIONS: 13 (Dashboard), 14 (Project Management Module)

MSW HANDLERS TO CREATE:
- src/shared/api/mock/handlers/project.handlers.ts
- src/shared/api/mock/handlers/dashboard.handlers.ts

MODULES TO BUILD:
1. src/modules/dashboard/ — Command center with KPI cards, activity feed, project grid
2. src/modules/projects/ — Project list, project detail (all tabs), project creation

CRITICAL IMPLEMENTATIONS:

KPI CARDS (SPEC 13.2):
- Use Anime.js: anime({ targets: counterEl, innerHTML: [0, value], round: 1, duration: 800, easing: 'easeOutExpo' })
- 6 cards: Active Projects, Open Items, Due This Week, Quotes Pending, Hours Logged, On-Time Rate
- Trend indicator: compare to last 30 days (mock delta in fixture)

PROJECT STATUS FLOW (SPEC 14.3) — 14 statuses:
planning → active → quotation_review → quotation_approved → plan_started →
plan_complete → manufacturing_review → manufacturing_progress → 
manufacturing_qa_review → manufacturing_complete → manufacturing_signoff →
delivered → feedback → retrospective → archived

Each transition: confirmation modal showing "This will unlock: [feature list]"
Backward: shows red warning + reason input + stores reason in mock

3D VISUAL VIEWER (SPEC 14.5):
- If .glb file: @react-three/fiber canvas, auto-rotate Y axis 0.003 rad/frame
  Use <Stage> from drei for lighting, <OrbitControls> for interaction
- If images (1+): Framer Motion AnimatePresence carousel, dot indicators, 4s auto-advance
- If nothing: SVG generated from org.orgColor + first 2 letters of project name

CLIENT CONTACTS (SPEC 14.1 — CLIENT INFORMATION section):
- Multiple contacts per project (array in clientJson)
- Fields: name, title, email, phone, address, isPrimary
- Primary contact shown in project header

MANUFACTURING TRACKER (SPEC 14.8):
- Only visible when status >= manufacturing_review
- Kanban columns: To Do / In Progress / QA Hold / Done
- Shop floor view: simplified task cards with large status buttons

ATTACHMENTS (SPEC 14.4):
- Drag-drop upload (react-dropzone)
- Categories: Client Documents / Internal / Photos / Certificates / Correspondence / Reference
- Version tracking: upload new version shows V1, V2, V3 history
- File preview: images show thumbnail, PDFs show first page thumbnail

DO NOT BUILD: Workbook engine, PDF viewer, or section cockpit.
```

---

missing
in the project details overview tab,

Where is the option to add CLIENT CONTACTS (SPEC 14.1 — CLIENT INFORMATION section):

Multiple contacts per project (array in clientJson)
Fields: name, title, email, phone, address, isPrimary
MANUFACTURING TRACKER (SPEC 14.8):

Only visible when status >= manufacturing_review
Kanban columns: To Do / In Progress / QA Hold / Done
Shop floor view: simplified task cards with large status buttons


### PROMPT: Phase 3 — Workbook Engine & Section Cockpit

```
You are implementing FORGE Phase 3 — Workbook Engine & Three-Panel Section Cockpit.

COMPLETED: Phases 0–2 (scaffold, auth, org, dashboard, projects).

SPEC REFERENCE SECTIONS:
15 (Workbook Engine), 16 (Three-Panel Cockpit), 17 (PDF Parser — UI only),
18 (Section Analysis — spec table and review panel)

MSW HANDLERS TO CREATE:
- src/shared/api/mock/handlers/workbook.handlers.ts
- src/shared/api/mock/handlers/section.handlers.ts

MOCK PDF PARSE SIMULATION:
POST /workbooks/:id/upload/confirm → returns job_id immediately
GET /jobs/:id → first 3 calls return status: "processing", then returns status: "complete"
GET /workbooks/:id/parse/preview → returns sections from sections.json fixture
(Do NOT simulate real PDF parsing — use pre-populated fixture sections)

THREE-PANEL LAYOUT (SPEC 16.1):
CSS implementation:
  .cockpit { display: grid; grid-template-columns: var(--pdf-w) 1fr var(--ai-w); height: 100vh; }
  --pdf-w: default 380px, range 48px (collapsed) to 600px
  --ai-w: default 320px, range 0px (hidden) to 480px

Panel collapse animation (Framer Motion):
  <motion.div animate={{ width: collapsed ? 48 : panelWidth }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>

Drag resize:
  PanelResizer: onMouseDown → document.onMouseMove → update CSS variable
  Min/max clamp per panel

PDF VIEWER SCALE RULER (SPEC 16.2):
Implementation:
  - Ruler: <canvas> element 20px tall (horizontal) + 20px wide (vertical)
  - On zoom/pan: redraw ruler tick marks
  - Tick spacing: computed from pxPerUnit × zoom
  - Calibration mode: cursor crosshair, click 2 points, record pixel distance
  - Known distance modal: enter real distance + unit
  - pxPerUnit = pixelDistance / realDistance
  - Store in section state, persist in URL params

GHOST OVERLAY (SPEC 16.2):
  - Positioned <div> container absolute over PDF canvas
  - Each SpecItem has boundsJson: {x, y, w, h} as % of page (from fixture)
  - Overlay divs: background rgba with confidence color, thin border
  - Click overlay div → dispatch to specTableSlice: setHighlightedRow(specId)
  - Click spec row → dispatch setHighlightedOverlay(specId) → overlay pulses

INTUITIVE NOTE CARDS (SPEC 2.3):
  useEffect + mousemove listener on card ref:
    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  onMouseLeave: reset transform to identity

AI CHAT MOCK STREAMING:
  Simulate typing effect: split response into words, reveal one word per 60ms via setInterval
  Pattern match user input → select mock response from fixture
  "weld" in message → respond with weld specs from active section fixture
  "bom" or "material" → list top 5 BOM items from fixture
  Default → "Based on the current section context, here's what I found: [spec summary]"

SPEC TABLE (SPEC 16.3 — SPEC Section 18.1):
  TanStack Table columns:
    #, Parameter, Extracted Value, Verified Value, Unit, Confidence, Source Ref, Standard Ref, Notes, Actions
  Extracted Value + Verified Value: font-mono class, cyan text color
  Confidence cell: badge (High=green, Medium=amber, Low=red)
  Inline edit: click cell → contentEditable or input overlay
  On verified value change: create memory point of type "user_correction"
  Actions column: Re-check button (shows toast), Link to PDF (highlights ghost overlay)

REVISIONS IN WORKBOOK HEADER (SPEC 15.3):
  Revision selector: dropdown showing R0, R1, R2, R3... (from revisions.json fixture)
  Active revision: shown with ● indicator
  Switching revision: updates URL param, reloads section data from fixture

WORKBOOK TABS (SPEC 15.5) — 9 tabs:
  Overview | Sections | BOM | Specs | Schedule | Quotation | Outputs | Revisions | Attachments
  Each tab lazy-loaded

DO NOT BUILD: Real AI integration, real PDF parsing, quotation builder (Phase 4).
```

---

### PROMPT: Phase 4 — Business Tools

```
You are implementing FORGE Phase 4 — Inventory, Quotation, Schedule, Revisions, Visualization, Exports.

COMPLETED: Phases 0–3 (full frontend shell + workbook cockpit with mock data).

SPEC REFERENCE SECTIONS:
19 (Quotation), 20 (Inventory), 21 (WYSIWYG + Smart Tables),
22 (Revision Control), 23 (Anime.js Visualization), 24 (Exports), 25 (Event-Driven Jobs)

MSW HANDLERS TO CREATE:
- src/shared/api/mock/handlers/inventory.handlers.ts
- src/shared/api/mock/handlers/quotation.handlers.ts
- src/shared/api/mock/handlers/revision.handlers.ts
- src/shared/api/mock/handlers/job.handlers.ts (simulates export jobs)

INVENTORY (SPEC 20.2 — all fields from Appendix C):
Smart table with ALL inventory fields. Category filter sidebar (SPEC 20.3 categories).
Price history: Recharts LineChart with 6-month mock prices.
Autocomplete component (InventoryAutocomplete): used in BOM table + quotation.
  - Input: typed characters → filter inventory by part_number or description
  - Dropdown: shows matching items with price + stock level
  - Select: fills BOM row fields automatically

QUOTATION MULTI-PAGE BUILDER (SPEC 19.2):
Structure: left sidebar page nav + right content area
Page 1 - Cover: company letterhead (org logo + address), quotation number, to/from, subject
Page 2 - Scope: TipTap WYSIWYG (fullscreen editor mode available)
Page 3 - Summary: Recharts PieChart (material/labour/sub-ops/paint/other), summary table
Pages 4-N - Detailed Breakdown:
  MaterialCostTable — linked to BOM, InventoryAutocomplete in part number column
  LabourCostTable — trade dropdown from org labour rates, hours × rate = total
  SubOpsTable — operations with unit rates
  PaintTable — surface area × coat rate
  FreightTable, ProcurementTable
Page N+1 - Exclusions: TipTap editor (pre-populated from org template fixture)
Page N+2 - Terms: TipTap editor (pre-populated from org template fixture)
Page N+3 - Signatures: prepared by / reviewed by / approved by / client acceptance

Sticky cost bar (bottom of viewport):
  Material: $X | Labour: $X | Sub-Ops: $X | Overhead: $X | TOTAL: $X
  Updates reactively as line items change (client-side calculation only in Phase 4)

COST CALCULATION HOOK:
  useQuotationTotals(quotation) → returns QuotationTotals
  Computed purely client-side from line items + overhead% + profit% + contingency%

REVISION CONTROL (SPEC 22):
  RevisionTimeline: horizontal scrollable timeline
    Each node: circle with R# label, hover shows type badge + description preview
    Click: expands card showing full details + actions
  
  RevisionDiffViewer: CSS Grid split layout
    Left: selected older revision | Right: selected newer revision
    Diff engine (client-side): compare spec items arrays by ID
    Changed fields: show old value (line-through) + new value side by side
    Added rows: green background | Removed: red | Changed: amber | Same: greyed
    Toggle: "Show unchanged items" (default: hidden)

  ActivateRevisionDialog (SPEC 22.6):
    Title: "Activate R1 as Working Base?"
    Shows: which revisions will be archived (R2, R3...)
    Checkbox: "I understand revisions will be archived"
    Cancel / Activate button (disabled until checkbox ticked)

ANIME.JS PARALLAX (SPEC 23):
Use real component data from CPF sections fixture to power the scene.

Scene structure (scroll-driven, 5 stages):
Stage 0 (progress 0.0–0.15): All parts assembled, labels hidden
Stage 1 (progress 0.15–0.40): Parts explode outward
  Each part: translateX + translateY based on its position in assembly
  Values from fixture boundsJson
Stage 2 (progress 0.40–0.60): Labels fly in
  Font-mono spec callouts animate from opacity 0
  SVG lines draw from part to label (stroke-dashoffset animation)
Stage 3 (progress 0.60–0.80): Weld connection lines draw on
  SVG paths between connected parts, cyan stroke, dashoffset animation
Stage 4 (progress 0.80–1.00): Parts reassemble + all specs visible

Scroll controller:
  window.addEventListener('scroll', () => {
    const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    // For each anime.js timeline: timeline.seek(progress * timeline.duration)
  });

Sticky progress card (SPEC 23.3):
  position: sticky; top: 24px; (appears in left rail during scroll)
  Shows: section name, completion %, open items count, animated progress bar

EXPORT JOB SIMULATION (SPEC 25):
  POST /exports/[type] → mock handler: creates job record {id, status: "queued"}
  GET /jobs/:id → mock handler: returns "processing" for 2 calls, then "complete"
    On complete: provides mock downloadUrl in response
  Frontend: useExport hook polls every 2s while queued/processing
    Shows: progress bar with percentage + progress message
    On complete: toast notification + download button appears in Outputs tab

SMART TABLE EXTENDED FEATURES (all tables in this phase):
  Excel paste: document.onpaste on table container
    Parse clipboard text → split by \n and \t → map to rows/cols → fill cells
  Column formula: define formula in column config, recompute on cell change
    e.g., { field: 'total_cost', formula: (row) => row.quantity * row.unit_cost }
  Conditional formatting rule: user can right-click column header → "Format rules"
    Configure: field, operator (>, <, =, contains), value, highlight color

DO NOT BUILD: Real backend, real AI. Export downloads a placeholder file.
```

---

### PROMPT: Phase 5 — Reports, Notifications, Settings, Admin

```
You are implementing FORGE Phase 5 — Reports, Notifications, Settings & Admin Panel.

COMPLETED: Phases 0–4 (all core feature modules with mock data).

SPEC REFERENCE SECTIONS:
27 (Reports), 26 (Notifications), 29 (Settings), 28 (Admin Panel)

MSW HANDLERS TO CREATE:
- src/shared/api/mock/handlers/report.handlers.ts
- src/shared/api/mock/handlers/notification.handlers.ts

REPORTS (SPEC 27.2):
Project Status Report layout (ASCII from spec maps to JSX):
  Header card: project name, client, status, completion %, schedule variance, risk level badge
  Workbook summary: TanStack table with Status / Completion / Assignee / Due columns
  Open items section: bulleted list with severity color coding
  Financial summary: 4-metric bar showing quoted/committed/spent/remaining
  Manufacturing progress: task completion bar + current operation card

Charts (Recharts):
  Portfolio: BarChart (projects by status, grouped)
  Financial: ComposedChart (bars for categories + line for total)
  Capacity: custom HeatmapCell grid (7 days × 8 trades, labor hours color scale)
  Quality: RadarChart (6 quality dimensions)
  Schedule performance: AreaChart (planned vs actual milestone completion %)

Schedule Report modal:
  Report type selector, frequency (daily/weekly/monthly), day+time picker
  Email recipients: tag input (add by email)
  Chat channel: select from configured integrations (Telegram/Slack)
  "Send preview now" button → queues mock report export job

NOTIFICATIONS (SPEC 26.1 — 18 event types):
NotificationDrawer:
  Slide in from right (Framer Motion: x: '100%' → x: 0)
  Sticky header: "Notifications" + mark all read + filter chips
  Grouped: Today / Yesterday / This Week / Older (using date-fns groupBy)
  Each item:
    Left: event type icon (color-coded: cyan=info, amber=warning, red=critical, violet=agent)
    Center: actor avatar + description with linked entity name (bold)
    Right: relative time (2h ago) + unread dot
  Swipe right to dismiss (touch events, translateX on swipe)
  
WebSocket simulation (Phase 5 — real WebSocket in Phase 7):
  In useWebSocket hook: setInterval every 30s → pick random event from fixture
  Push to notificationSlice.addNotification()
  Dispatch to activityFeedSlice for dashboard feed

SETTINGS NAVIGATION STRUCTURE:
Left nav groups (SPEC 29.1):
  ─ MY ACCOUNT
    Profile
    Security  
    Notifications
    Appearance
    AI Configuration
    Keyboard Shortcuts
  ─ ORGANIZATION (Org Admin only — checkFeature('org_admin'))
    Company Profile
    Team Members
    Labour Rates
    Email Templates
    Document Templates
    Storage
    AI Configuration
    AI Agents
    Integrations
    Billing & Subscription
  ─ DEVELOPER (Pro+ only — checkFeature('api_access'))
    API Keys
    Webhooks

URL sync: /settings/[section] → update nav highlight + render correct component
Dirty state: any settings form → show sticky bar "Unsaved changes — [Save] [Discard]"

TEMPLATE EDITORS (SPEC 8.4, 8.5):
Email template editor:
  Template selector: 7 template types (dropdown)
  TipTap editor with custom extension: variable placeholders
  Variables rendered as: <span class="bg-violet-900 px-1 rounded font-mono text-xs">{{client_name}}</span>
  Insert variable: toolbar button → popover with all available variables
  Preview mode: renders template with sample data replacing placeholders
  From/Reply-to: input fields below editor

Document template editor (quotation):
  Tabs: Cover Page / Scope / Exclusions / Terms / Signature
  Each tab: configuration fields (logo position, color scheme) + WYSIWYG for content
  Live preview pane: renders mock quotation page with settings applied

ADMIN PANEL (SPEC 28.1):
Accessible only when useForgeStore(s => s.auth.user?.orgRole === 'super_admin')
Route: /admin (direct URL, not in sidebar)

OrgsTable: columns — Org Name, Plan badge, Users, Projects, Storage used, Last Active, Status
  Click row → OrgDetailDrawer: full org config, usage metrics, plan change controls
  "Impersonate Admin" button → mock: sets impersonation flag in store, shows banner

SystemHealth: status cards for each service
  DB: Green ✓ / Red ✗ with latency (P95)
  Redis: queue depth per queue name
  Workers: online worker count per type
  Storage: bucket size + used % gauge
  All showing mock data with realistic values

AnalyticsCharts:
  DAU/WAU/MAU: Recharts AreaChart (30-day trend)
  AI calls by model: BarChart (per day, stacked by model)
  Plan distribution: PieChart (free/starter/pro/enterprise counts + MRR)
  Export job success rate: LineChart + threshold line

FeatureFlagTable:
  Columns: Feature Name, Default Plan, Active Orgs with Override, Toggle
  Click toggle: updates mock featureOverrides in store
  Click org count: shows list of orgs with override (modal)

FEATURE GATING SYSTEM:
Every premium feature wrapped in <FeatureGate feature="parallax">
  If user has feature: renders children
  If not: renders <UpgradePrompt feature="parallax" requiredPlan="professional" />

UpgradePrompt card:
  Lock icon + "This feature requires Professional plan"
  Bullet list of what the plan includes
  "Upgrade Now" button (mock: opens plan selector modal)

Test all gating by changing subscriptionTier in org fixture:
  "free" → most features locked
  "starter" → manufacturing + agents locked
  "professional" → white-label + all agents locked
  "enterprise" → everything unlocked

DO NOT BUILD: Real WebSocket, real notifications, real backend anything.
```

---

### PROMPT: Phase 6 — Backend Foundation

```
You are implementing FORGE Phase 6 — Backend API Foundation.

COMPLETED: Phases 0–5 (complete frontend with MSW mock API).
FRONTEND IS NOT BEING CHANGED in this phase, EXCEPT:
  - VITE_MOCK_API=false
  - authHandlers and orgHandlers removed from MSW worker
  - All other MSW handlers remain active

SPEC REFERENCE SECTIONS: 3 (Architecture), 30 (DB Schema), 31 (API), 32 (Tech Stack), 33 (Prerequisites)

TECH STACK:
Python 3.11 + FastAPI 0.111 + PostgreSQL 15 + Alembic + Redis 7 + MinIO + Docker Compose

DELIVER IN THIS ORDER:

1. docker-compose.yml
Services: postgres, redis, minio, api (+ nginx optional)
Health checks on all services. Depends_on with condition: service_healthy.

2. requirements.txt (exact versions from SPEC 32.2)
fastapi==0.111.0, uvicorn[standard]==0.30.1, sqlalchemy[asyncio]==2.0.31,
asyncpg==0.29.0, alembic==1.13.2, pydantic==2.8.2, pydantic-settings==2.3.4,
python-jose[cryptography]==3.3.0, passlib[bcrypt]==1.7.4, redis[asyncio]==5.0.7,
boto3==1.34.144, python-multipart==0.0.9, httpx==0.27.0, structlog==24.2.0,
google-auth==2.32.0, sendgrid==6.11.0

3. core/ modules (config, database, security, permissions, middleware)

4. All SQLAlchemy models (SPEC Section 30.1 — ALL tables, all columns)
  IMPORTANT: Models must match TypeScript interfaces in src/shared/types/index.ts exactly
  Use snake_case in DB columns, which maps to camelCase in TypeScript via humps

5. Alembic migration: initial schema (creates ALL tables at once)
  Run: alembic upgrade head

6. Pydantic schemas for auth + org modules only (matching TS interfaces)

7. Auth router + service:
  POST /api/v1/auth/login → verify email+password → return {access_token, refresh_token, user}
  POST /api/v1/auth/google → verify Google ID token → return same
  POST /api/v1/auth/refresh → validate refresh token → return new access_token
  POST /api/v1/auth/logout → revoke refresh token in Redis
  GET  /api/v1/auth/sessions → list active sessions for current user
  DELETE /api/v1/auth/sessions/{id} → revoke specific session

8. Org router + service:
  GET  /api/v1/orgs/current → current user's org
  PUT  /api/v1/orgs/current → update org (admin only)
  GET  /api/v1/orgs/current/members → list all members
  POST /api/v1/orgs/current/members/invite → send invitation email
  PUT  /api/v1/orgs/current/members/{uid}/role → change member role
  DELETE /api/v1/orgs/current/members/{uid} → remove member
  GET  /api/v1/orgs/current/invitations → list pending invitations
  DELETE /api/v1/orgs/current/invitations/{id} → revoke invitation

9. File upload endpoint (for logo):
  POST /api/v1/files/upload-url → returns MinIO presigned PUT URL
  POST /api/v1/files/confirm → confirms upload complete

10. Seed script: python scripts/seed_superadmin.py
  Creates: superadmin user, Cambridge Profab org, 5 team members (matching fixtures)

RESPONSE FORMAT: All endpoints must return ApiResponse<T> wrapper:
  { "success": true, "data": {...}, "meta": null, "errors": null }
  Match the TypeScript ApiResponse<T> interface exactly.

CORS: Allow frontend origin (localhost:3000 + configured FRONTEND_URL)

VERIFY: Login in browser (VITE_MOCK_API=false) works with real backend.
  Auth token stored, org loads from DB, team members show.
  All other pages still work (still on MSW mock handlers).
```

---

### PROMPT: Phase 7 — Backend Module Integration (use per sub-phase)

```
You are implementing FORGE Phase 7[X] — [MODULE NAME] Backend Integration.

CONTEXT:
- Backend auth + org running (Phase 6 done)
- Frontend partially on real backend (auth/org real, everything else MSW mock)
- This sub-phase: build [MODULE] backend, then remove its MSW handler from frontend

CONTRACT:
TypeScript interfaces (src/shared/types/index.ts) = source of truth
Mock handlers (src/shared/api/mock/handlers/[module].handlers.ts) = expected behavior
Mock fixtures (src/shared/api/mock/fixtures/[module].json) = sample data shape
Your Pydantic schemas MUST match the TypeScript interfaces exactly.

SPEC REFERENCE: Section 31 (API endpoints for [module])

DELIVER IN THIS ORDER:
1. Pydantic schemas: src/schemas/[module].py
   Match TypeScript interface fields (snake_case) + use same validation rules

2. SQLAlchemy repository: src/repositories/[module]_repo.py
   All DB queries as async methods, using SQLAlchemy ORM only (no raw SQL)

3. Service class: src/services/[module]_service.py
   Business logic only — calls repository methods, raises HTTPException

4. FastAPI router: src/routers/[module].py
   All endpoints from SPEC Section 31 for this module
   Include: proper auth dependency, permission check, error handling

5. Register router in main.py

6. Seed data: add [module] records to seed script matching fixture data

7. Test each endpoint manually:
   - Matches TypeScript interface shape exactly
   - Error responses use ApiResponse error format
   - Pagination works (page, per_page, total in meta)

8. Frontend change:
   Open src/shared/api/mock/browser.ts
   Remove [module]Handlers from setupWorker() call
   Verify: [module] pages still work with real data from DB

AFTER EACH SUB-PHASE: run full frontend smoke test
  - Login still works
  - Dashboard still loads
  - [Module page] loads from real DB
  - All other pages still work (on remaining MSW handlers)
```

---

### PROMPT: Phase 8 — AI Integration

```
You are implementing FORGE Phase 8 — AI Integration, Agents & Production Hardening.

COMPLETED: Phases 0–7 (full frontend + full backend without AI).

SPEC REFERENCE SECTIONS:
9 (AI Configuration), 10 (Agent Automation), 11 (AI Context Memory),
17 (PDF Intelligence Pipeline), 23 (Anime.js AI Generation), 33 (API keys)

BUILD ORDER:

1. AI GATEWAY (SPEC 9.1):
   src/services/ai_gateway.py — AIGateway class
   Methods: dispatch(task_type, messages, org_id, stream=False) → str | AsyncGenerator
   - Load org AI config from DB (decrypt keys)
   - Build model chain for task_type (SPEC 9.2 table)
   - Try primary → secondary → free fallback
   - If stream=True: yield tokens as they arrive (SSE or WS)

2. PDF INTELLIGENCE PIPELINE (SPEC 17.2 — 7 stages):
   src/tasks/pdf_tasks.py — Celery task: parse_pdf(pdf_upload_id, org_id)
   Stage 1–3: PyMuPDF (synchronous, fast — page images, text coords, title block)
   Stage 4: Dispatch to AI Gateway (vision model per section zone)
   Stage 5: Python-only cross-reference + validation
   Stage 6: AI Gateway for summaries + task suggestions
   Stage 7: Create sections + spec_items + memory points in DB

   Update PDF parse endpoint to enqueue real Celery task
   WebSocket: broadcast progress updates at each stage
   Frontend: PDF parse now shows real stages (Stage 1/7... Stage 4/7... Complete)

3. AI CONTEXT MEMORY (SPEC 11):
   pgvector extension: CREATE EXTENSION vector; in Alembic migration
   src/services/context_memory_service.py
   Methods:
     add_point(org_id, project_id, workbook_id, section_id, revision_id, memory_type, summary, detail, tags, source)
       → generate embedding via AI Gateway (text-embedding-3-small)
       → store in ai_context_memory with embedding column
     
     get_context(org_id, project_id, workbook_id, user_query) → str
       → get pinned memories (always include)
       → vector similarity search: top 8 semantically relevant memories
       → format as context block for AI prompt injection

4. AI CHAT ENDPOINT (streaming):
   POST /api/v1/ai/chat — accept: message, org_id, project_id, workbook_id, section_id
   - Build context: get_context() → returns formatted string
   - Build full prompt: org context + project context + memory block + user message
   - Stream response: Server-Sent Events (FastAPI StreamingResponse)
   - Save each exchange as memory point (type: "clarification" or "decision")
   
   Frontend: replace mock streaming simulation with real SSE reader
   useAiChat hook: EventSource or fetch with ReadableStream for SSE

5. PROACTIVE SUGGESTIONS:
   GET /api/v1/ai/suggestions/{section_id} — returns Anomaly[] + Citation[] + Suggestion[]
   Triggered after PDF parse completes + when section is opened (cached 1h)
   AI Gateway: analyze spec items against known rules (undersized weld, missing NDT, etc.)

6. AI TOOLS (SPEC 16.4 — AI Panel tools):
   POST /api/v1/ai/generate-bom — generates BOM rows from section specs
   POST /api/v1/ai/peer-review — checks specs for completeness
   POST /api/v1/ai/calculate — uses calibrated scale + dims for area/weight
   POST /api/v1/ai/visualize — generates Anime.js HTML scene from section data

7. AI AGENT SYSTEM (SPEC 10):
   src/services/agent_service.py — AgentService
   4 agents (build in order, test each before next):
   
   DrawingAnalystAgent: auto-runs after PDF parse, creates spec table draft
   EstimatorAgent: triggered at plan_started status, creates quotation draft
   SchedulerAgent: triggered at plan_started status, creates schedule draft
   ReporterAgent: Celery beat every morning 8AM, sends status report to chat

   Each agent: load context → build prompt → dispatch to AI Gateway → format output
   → create pending action in DB → notify approver via WebSocket + email

8. TELEGRAM BOT (SPEC 10.4):
   src/services/telegram_service.py
   Commands:
     /forge status {project_ref} → query DB → format → respond
     /forge approve quotation {QT-number} → update quotation status → confirm
     /forge approve action {action_id} → approve pending agent action → confirm
   Webhook: POST /api/v1/webhooks/telegram → dispatch to TelegramService

9. PRODUCTION HARDENING:
   Security:
     Input sanitization: all text inputs through bleach.clean()
     File upload: MIME type validation, virus scan hook (ClamAV optional)
     Rate limiting: slowapi per endpoint + per user
     AES-256-GCM: verify all org/user AI keys encrypted at rest
   
   Performance:
     DB query analysis: run EXPLAIN ANALYZE on all list endpoints
     Add missing indexes (compare against SPEC 30.2)
     Redis caching: GET /orgs/current → cache 5 min, invalidate on PUT
     Celery worker autoscaling: configure min/max workers per queue
   
   Observability:
     structlog: JSON logging on all service methods (input params + duration)
     Prometheus: expose /metrics with request count + latency histograms
     Sentry: configure SENTRY_DSN in .env, capture unhandled exceptions
     Health check: GET /health → check DB + Redis + MinIO all healthy
   
   Testing:
     pytest: cover all service methods + all router endpoints
     Playwright E2E: login → create project → upload PDF → view sections → export
     k6 load test: 50 VUs, 5 minute run, all P95 latency < 500ms
```

---

## FULL FILE TREE REFERENCE

This is the complete expected file tree at the end of Phase 5 (before any backend work). Use this as a checklist. All files below must exist and be functional.

```
forge-frontend/
├── .env                              # VITE_MOCK_API=true
├── .env.production                   # VITE_MOCK_API=false
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── index.html
├── public/
│   └── mockServiceWorker.js          # MSW service worker (generated by msw init)
└── src/
    ├── main.tsx
    ├── app/
    │   ├── App.tsx
    │   ├── router.tsx
    │   └── providers.tsx
    │
    ├── shared/
    │   ├── types/
    │   │   └── index.ts              # ALL TypeScript interfaces
    │   │
    │   ├── store/
    │   │   ├── index.ts              # Root store
    │   │   ├── hooks.ts              # Typed useForgeStore, useAuth, useUI etc.
    │   │   └── slices/
    │   │       ├── authSlice.ts
    │   │       ├── orgSlice.ts
    │   │       ├── activeContextSlice.ts
    │   │       ├── uiSlice.ts
    │   │       ├── aiSlice.ts
    │   │       ├── notificationSlice.ts
    │   │       └── jobSlice.ts
    │   │
    │   ├── api/
    │   │   ├── client.ts             # Axios + humps transform
    │   │   ├── transforms.ts         # camelizeKeys / decamelizeKeys
    │   │   └── mock/
    │   │       ├── browser.ts        # MSW worker setup
    │   │       ├── server.ts         # MSW node setup (tests)
    │   │       ├── config.ts         # MOCK_DELAY constant
    │   │       ├── handlers/
    │   │       │   ├── auth.handlers.ts
    │   │       │   ├── org.handlers.ts
    │   │       │   ├── project.handlers.ts
    │   │       │   ├── workbook.handlers.ts
    │   │       │   ├── section.handlers.ts
    │   │       │   ├── bom.handlers.ts
    │   │       │   ├── inventory.handlers.ts
    │   │       │   ├── quotation.handlers.ts
    │   │       │   ├── revision.handlers.ts
    │   │       │   ├── schedule.handlers.ts
    │   │       │   ├── report.handlers.ts
    │   │       │   ├── notification.handlers.ts
    │   │       │   └── job.handlers.ts
    │   │       └── fixtures/
    │   │           ├── organizations.json
    │   │           ├── users.json
    │   │           ├── projects.json
    │   │           ├── workbooks.json
    │   │           ├── sections.json
    │   │           ├── spec-items.json
    │   │           ├── bom-items.json
    │   │           ├── inventory.json
    │   │           ├── quotations.json
    │   │           ├── revisions.json
    │   │           ├── schedule-tasks.json
    │   │           ├── comments.json
    │   │           ├── notifications.json
    │   │           ├── attachments.json
    │   │           └── reports.json
    │   │
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── Button.tsx
    │   │   │   ├── Card.tsx
    │   │   │   ├── Badge.tsx
    │   │   │   ├── Input.tsx
    │   │   │   ├── Select.tsx
    │   │   │   ├── Textarea.tsx
    │   │   │   ├── Modal.tsx
    │   │   │   ├── Drawer.tsx
    │   │   │   ├── Tooltip.tsx
    │   │   │   ├── Spinner.tsx
    │   │   │   ├── ProgressBar.tsx
    │   │   │   ├── EmptyState.tsx
    │   │   │   ├── ConfirmDialog.tsx
    │   │   │   ├── Tabs.tsx
    │   │   │   ├── Accordion.tsx
    │   │   │   ├── Popover.tsx
    │   │   │   ├── DatePicker.tsx
    │   │   │   ├── Dropdown.tsx
    │   │   │   └── Avatar.tsx
    │   │   ├── layout/
    │   │   │   ├── AppShell.tsx
    │   │   │   ├── Sidebar.tsx
    │   │   │   ├── TopBar.tsx
    │   │   │   ├── PageHeader.tsx
    │   │   │   ├── GlobalSearch.tsx
    │   │   │   ├── NotificationDrawer.tsx
    │   │   │   ├── UserMenu.tsx
    │   │   │   └── SessionLockOverlay.tsx
    │   │   ├── data/
    │   │   │   ├── StatusBadge.tsx
    │   │   │   ├── SpecValue.tsx
    │   │   │   ├── PartCode.tsx
    │   │   │   ├── StandardCode.tsx
    │   │   │   ├── KPICard.tsx
    │   │   │   ├── ProgressRing.tsx
    │   │   │   └── SmartTable.tsx
    │   │   └── forms/
    │   │       ├── FormField.tsx
    │   │       ├── FormSection.tsx
    │   │       ├── FileDropzone.tsx
    │   │       └── RichTextEditor.tsx
    │   │
    │   ├── hooks/
    │   │   ├── useDebounce.ts
    │   │   ├── useLocalStorage.ts
    │   │   ├── useKeyboard.ts
    │   │   ├── useIntersectionObserver.ts
    │   │   └── useWebSocket.ts
    │   │
    │   └── utils/
    │       ├── cn.ts                 # clsx + tailwind-merge helper
    │       ├── format.ts             # Currency, date, number formatters
    │       ├── status.ts             # Status → color/label/icon maps
    │       └── permissions.ts        # checkFeature() helper
    │
    └── modules/
        ├── auth/
        │   ├── pages/
        │   │   ├── LoginPage.tsx
        │   │   ├── SessionLockPage.tsx
        │   │   └── ForgotPasswordPage.tsx
        │   ├── components/
        │   │   ├── LoginForm.tsx
        │   │   ├── PinLockScreen.tsx
        │   │   └── SecurityQuestionSetup.tsx
        │   ├── hooks/
        │   │   ├── useAuth.ts
        │   │   └── useSessionLock.ts
        │   ├── api/auth.api.ts
        │   └── index.ts
        │
        ├── org/
        │   ├── pages/
        │   │   ├── OnboardingPage.tsx
        │   │   └── OrgSettingsPage.tsx
        │   ├── components/
        │   │   ├── OnboardingStep1.tsx
        │   │   ├── OnboardingStep2.tsx
        │   │   ├── OnboardingStep3.tsx
        │   │   ├── OnboardingStep4.tsx
        │   │   ├── OnboardingStep5.tsx
        │   │   ├── TeamMemberCard.tsx
        │   │   ├── TeamMemberTable.tsx
        │   │   ├── LabourRateTable.tsx
        │   │   ├── InviteModal.tsx
        │   │   └── OrgLogoUpload.tsx
        │   ├── hooks/
        │   │   ├── useOrg.ts
        │   │   └── useTeam.ts
        │   ├── api/org.api.ts
        │   └── index.ts
        │
        ├── dashboard/
        │   ├── pages/DashboardPage.tsx
        │   ├── components/
        │   │   ├── KPIRow.tsx
        │   │   ├── KPICard.tsx
        │   │   ├── ActivityFeed.tsx
        │   │   ├── ProjectTimeline.tsx
        │   │   ├── ProjectsGrid.tsx
        │   │   ├── ProjectCard.tsx
        │   │   └── AgentStatusBar.tsx
        │   ├── hooks/useDashboard.ts
        │   ├── api/dashboard.api.ts
        │   └── index.ts
        │
        ├── projects/
        │   ├── pages/
        │   │   ├── ProjectsPage.tsx
        │   │   ├── ProjectDetailPage.tsx
        │   │   └── ProjectCreatePage.tsx
        │   ├── components/
        │   │   ├── ProjectHeader.tsx
        │   │   ├── ProjectVisual.tsx
        │   │   ├── ProjectStatusStepper.tsx
        │   │   ├── ProjectStatusModal.tsx
        │   │   ├── ProjectSummaryCards.tsx
        │   │   ├── WorkbooksTable.tsx
        │   │   ├── ProjectGantt.tsx
        │   │   ├── ProjectFinancialSummary.tsx
        │   │   ├── ProjectTeamPanel.tsx
        │   │   ├── ProjectNotes.tsx
        │   │   ├── ProjectAttachments.tsx
        │   │   ├── ClientContactsPanel.tsx
        │   │   ├── ManufacturingTracker.tsx
        │   │   ├── PreProductionChecklist.tsx
        │   │   ├── RetrospectiveForm.tsx
        │   │   ├── RetroAggregate.tsx
        │   │   ├── NCRList.tsx
        │   │   └── ProjectCreateForm.tsx
        │   ├── hooks/
        │   │   ├── useProject.ts
        │   │   ├── useProjectStatus.ts
        │   │   └── useManufacturing.ts
        │   ├── api/project.api.ts
        │   └── index.ts
        │
        ├── workbooks/
        │   ├── pages/
        │   │   ├── WorkbookDetailPage.tsx
        │   │   └── WorkbookCreatePage.tsx
        │   ├── components/
        │   │   ├── WorkbookHeader.tsx
        │   │   ├── WorkbookStatusStepper.tsx
        │   │   ├── WorkbookTabNav.tsx
        │   │   ├── WorkbookOverviewTab.tsx
        │   │   ├── WorkbookSectionsTab.tsx
        │   │   ├── WorkbookBomTab.tsx
        │   │   ├── WorkbookSpecsTab.tsx
        │   │   ├── WorkbookScheduleTab.tsx
        │   │   ├── WorkbookQuotationTab.tsx
        │   │   ├── WorkbookOutputsTab.tsx
        │   │   ├── WorkbookRevisionsTab.tsx
        │   │   ├── WorkbookAttachmentsTab.tsx
        │   │   ├── WorkbookCreateStep1.tsx
        │   │   ├── WorkbookCreateStep2.tsx
        │   │   ├── WorkbookCreateStep3.tsx
        │   │   ├── WorkbookCreateStep4.tsx
        │   │   ├── ParseProgressOverlay.tsx
        │   │   └── ParsePreviewScreen.tsx
        │   ├── hooks/
        │   │   ├── useWorkbook.ts
        │   │   └── usePdfParse.ts
        │   ├── api/workbook.api.ts
        │   └── index.ts
        │
        ├── sections/
        │   ├── pages/SectionCockpitPage.tsx
        │   ├── components/
        │   │   ├── PdfPanel.tsx
        │   │   ├── PdfViewer.tsx
        │   │   ├── PdfPageNav.tsx
        │   │   ├── PdfSectionNav.tsx
        │   │   ├── PdfScaleRuler.tsx
        │   │   ├── MeasurementTool.tsx
        │   │   ├── PdfAnnotationLayer.tsx
        │   │   ├── GhostOverlay.tsx
        │   │   ├── RevisionCompare.tsx
        │   │   ├── WorkPanel.tsx
        │   │   ├── SectionHeader.tsx
        │   │   ├── SectionSummary.tsx
        │   │   ├── SpecTable.tsx
        │   │   ├── SpecTableRow.tsx
        │   │   ├── SectionNotes.tsx
        │   │   ├── IntuitiveNoteCard.tsx
        │   │   ├── RelatedBomItems.tsx
        │   │   ├── SectionActions.tsx
        │   │   ├── RightPanel.tsx
        │   │   ├── AiPanel.tsx
        │   │   ├── AiChat.tsx
        │   │   ├── AiToolsBar.tsx
        │   │   ├── AiSuggestions.tsx
        │   │   ├── ReviewPanel.tsx
        │   │   ├── ReviewThread.tsx
        │   │   ├── ReviewComment.tsx
        │   │   ├── AddCommentForm.tsx
        │   │   ├── MemoryPanel.tsx
        │   │   ├── MemoryPointCard.tsx
        │   │   ├── PanelResizer.tsx
        │   │   ├── PanelCollapseToggle.tsx
        │   │   └── SectionProgressCard.tsx
        │   ├── hooks/
        │   │   ├── useSectionCockpit.ts
        │   │   ├── usePdfViewer.ts
        │   │   ├── useSpecTable.ts
        │   │   ├── useComments.ts
        │   │   └── useAiChat.ts
        │   ├── api/section.api.ts
        │   └── index.ts
        │
        ├── inventory/
        │   ├── pages/InventoryPage.tsx
        │   ├── components/
        │   │   ├── InventoryTable.tsx
        │   │   ├── InventoryFilters.tsx
        │   │   ├── InventoryItemModal.tsx
        │   │   ├── InventoryImportModal.tsx
        │   │   ├── StockGauge.tsx
        │   │   ├── PriceHistoryChart.tsx
        │   │   └── InventoryAutocomplete.tsx
        │   ├── hooks/useInventory.ts
        │   ├── api/inventory.api.ts
        │   └── index.ts
        │
        ├── quotation/
        │   ├── pages/QuotationBuilderPage.tsx
        │   ├── components/
        │   │   ├── QuotationPageNav.tsx
        │   │   ├── QuotationCoverPage.tsx
        │   │   ├── QuotationScopePage.tsx
        │   │   ├── QuotationSummaryPage.tsx
        │   │   ├── QuotationDetailPage.tsx
        │   │   ├── QuotationExclusionsPage.tsx
        │   │   ├── QuotationTermsPage.tsx
        │   │   ├── QuotationSignaturePage.tsx
        │   │   ├── MaterialCostTable.tsx
        │   │   ├── LabourCostTable.tsx
        │   │   ├── SubOpsTable.tsx
        │   │   ├── PaintTable.tsx
        │   │   ├── CostSummaryBar.tsx
        │   │   ├── QuotationApprovalFlow.tsx
        │   │   ├── QuotationStatusBanner.tsx
        │   │   └── ChangeOrderModal.tsx
        │   ├── hooks/
        │   │   ├── useQuotation.ts
        │   │   └── useQuotationTotals.ts
        │   ├── api/quotation.api.ts
        │   └── index.ts
        │
        ├── schedule/ ← (components listed in Phase 4)
        ├── revisions/ ← (components listed in Phase 4)
        ├── visualization/ ← (components listed in Phase 4)
        ├── exports/ ← (components listed in Phase 4)
        │
        ├── reports/
        │   ├── pages/ ← (pages listed in Phase 5)
        │   ├── components/ ← (components listed in Phase 5)
        │   ├── hooks/useReports.ts
        │   ├── api/report.api.ts
        │   └── index.ts
        │
        ├── notifications/
        │   ├── components/ ← (listed in Phase 5)
        │   ├── hooks/
        │   │   ├── useNotifications.ts
        │   │   └── useWebSocket.ts
        │   ├── api/notification.api.ts
        │   └── index.ts
        │
        ├── settings/
        │   ├── pages/SettingsPage.tsx
        │   ├── components/ ← (listed in Phase 5)
        │   ├── hooks/useSettings.ts
        │   ├── api/settings.api.ts
        │   └── index.ts
        │
        └── admin/
            ├── pages/AdminPage.tsx
            ├── components/ ← (listed in Phase 5)
            ├── hooks/useAdmin.ts
            ├── api/admin.api.ts
            └── index.ts
```

---

## PHASE SUMMARY TIMELINE

| Phase | What Runs | Backend | Frontend | Duration |
|-------|-----------|---------|----------|----------|
| **0** | Scaffold | None | MSW mock | 2–3 days |
| **1** | Auth + Org | None | MSW mock | 3–4 days |
| **2** | Dashboard + Projects | None | MSW mock | 4–5 days |
| **3** | Workbook + Sections | None | MSW mock | 5–6 days |
| **4** | Inventory, Quotation, Schedule, Revisions, Viz | None | MSW mock | 6–7 days |
| **5** | Reports, Notifications, Settings, Admin | None | MSW mock | 3–4 days |
| **6** | Backend: Auth + Org | FastAPI + Postgres + Redis | Auth/Org on real API; rest MSW | 5–6 days |
| **7A** | Backend: Projects | +Projects | Projects real; rest MSW | 1–2 days |
| **7B** | Backend: Workbooks + PDF | +Workbooks | Workbooks real | 2–3 days |
| **7C** | Backend: Sections + Comments | +Sections | Sections real | 1–2 days |
| **7D** | Backend: BOM + Inventory | +BOM/Inventory | Both real | 1–2 days |
| **7E** | Backend: Quotations | +Quotations | Quotations real | 1–2 days |
| **7F** | Backend: Schedule + Mfg | +Schedule | Schedule real | 1–2 days |
| **7G** | Backend: Revisions | +Revisions | Revisions real | 1–2 days |
| **7H** | Backend: WebSocket + Notifications | +WS/Notify | Live notifications | 2–3 days |
| **7I** | Backend: Celery + Exports | +Workers | Real export jobs | 2–3 days |
| **7J** | Backend: Reports | +Reports | Reports real | 1–2 days |
| **8** | AI + Agents + Production | +AI Pipeline | Full AI chat, agents | 8–10 days |
| **TOTAL** | | | | **~60–75 days** |

---

## CROSS-CUTTING RULES (enforce in every phase)

### 1. TypeScript Strictness
```typescript
// tsconfig.json — never relax these
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"noUnusedLocals": true,
"noUnusedParameters": true
```

### 2. Component File Structure (every component follows this)
```typescript
// ComponentName.tsx
// SPEC: Section X.X — [what this implements]
import { ... } from 'react';
import type { ... } from '@/shared/types';

// Props interface always defined
interface ComponentNameProps {
  // ...
}

// Named export (not default — easier to find in codebase)
export function ComponentName({ ... }: ComponentNameProps) {
  // ...
}
```

### 3. API Hook Pattern (every module follows this)
```typescript
// useProject.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '../api/project.api';
import type { Project, PaginationParams } from '@/shared/types';

// Query keys are namespaced per module
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params: PaginationParams) => [...projectKeys.lists(), params] as const,
  detail: (id: string) => [...projectKeys.all, 'detail', id] as const,
};

export function useProjects(params: PaginationParams) {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => projectApi.list(params),
    staleTime: 30_000,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectApi.get(id),
    enabled: !!id,
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectApi.update,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: projectKeys.lists() });
      qc.setQueryData(projectKeys.detail(data.id), data);
    },
  });
}
```

### 4. Status Color Map (single source of truth)
```typescript
// src/shared/utils/status.ts
// SPEC: Section 14.3 (project statuses), 15.4 (workbook statuses)
export const PROJECT_STATUS_CONFIG: Record<ProjectStatus, {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
  description: string;
}> = {
  planning:               { label: 'Planning',              color: '#4A5980', bgColor: '#1A2440', icon: 'clipboard', description: 'Project is being planned' },
  active:                 { label: 'Active',                color: '#00D4FF', bgColor: '#001E2B', icon: 'zap', description: 'Workbooks being developed' },
  quotation_review:       { label: 'Quotation Review',      color: '#FFB800', bgColor: '#2B1F00', icon: 'file-text', description: 'Quotation under internal review' },
  quotation_approved:     { label: 'Quotation Approved',    color: '#00E5A0', bgColor: '#00201A', icon: 'check-circle', description: 'Quotation approved by stakeholders' },
  plan_started:           { label: 'Plan Started',          color: '#7B2FBE', bgColor: '#1A0A2E', icon: 'map', description: 'Manufacturing planning underway' },
  plan_complete:          { label: 'Plan Complete',         color: '#00D4FF', bgColor: '#001E2B', icon: 'check-square', description: 'All workbooks planned and scheduled' },
  manufacturing_review:   { label: 'Manufacturing Review',  color: '#FF6B35', bgColor: '#2B1100', icon: 'eye', description: 'Pre-production checklist being completed' },
  manufacturing_progress: { label: 'Manufacturing Progress',color: '#1A6FFF', bgColor: '#00102B', icon: 'tool', description: 'On the shop floor' },
  manufacturing_qa_review:{ label: 'QA Review',             color: '#FFB800', bgColor: '#2B1F00', icon: 'shield', description: 'NDT and dimensional inspection' },
  manufacturing_complete: { label: 'Mfg. Complete',         color: '#00E5A0', bgColor: '#00201A', icon: 'package', description: 'All tasks complete, QA passed' },
  manufacturing_signoff:  { label: 'Manufacturing Sign-Off',color: '#00C853', bgColor: '#001F0D', icon: 'pen-tool', description: 'Official sign-off obtained' },
  delivered:              { label: 'Delivered',             color: '#00C853', bgColor: '#001F0D', icon: 'truck', description: 'Shipped to client' },
  feedback:               { label: 'Client Feedback',       color: '#FFD600', bgColor: '#2B2500', icon: 'message-circle', description: 'Client feedback being captured' },
  retrospective:          { label: 'Retrospective',         color: '#FFD600', bgColor: '#2B2500', icon: 'refresh-cw', description: 'Team retrospective in progress' },
  archived:               { label: 'Archived',              color: '#4A5980', bgColor: '#0A0E1A', icon: 'archive', description: 'Project archived — read only' },
};
```

### 5. No Hardcoded Strings in Components
```typescript
// ❌ Wrong
<span>Manufacturing Progress</span>

// ✅ Correct — derive from config
<StatusBadge status={project.status} />
// StatusBadge reads from PROJECT_STATUS_CONFIG
```

### 6. Error Handling Pattern (every async operation)
```typescript
// In every mutation / query that can fail:
const { mutate, isPending } = useUpdateProject();

const handleSave = async () => {
  try {
    await mutate(data);
    toast.success('Project saved');
  } catch (err) {
    const apiErr = err as ApiError;
    toast.error(apiErr.errors?.[0]?.message ?? 'Something went wrong');
  }
};
```

---

## QUICK REFERENCE: SPEC → PHASE MAPPING

| SPEC Section | Content | Phase Built |
|-------------|---------|-------------|
| §2 Design System | Colors, typography, components | 0 |
| §3 Architecture | Stack overview | 0 (frontend), 6 (backend) |
| §4 Module Isolation | Module boundaries | 0 |
| §5 Global State | Zustand slices | 0 |
| §6 Mock API | MSW setup | 0 |
| §7 Auth & Access | Login, PIN lock, roles | 1 |
| §8 Org & Team | Onboarding, team, templates | 1 |
| §9 AI Config | Model registry, provider cards | 5 (UI), 8 (real) |
| §10 AI Agents | Agent types, chat control | 5 (UI), 8 (real) |
| §11 AI Memory | Context memory | 3 (UI shell), 8 (real) |
| §12 Storage | Storage config UI | 5 |
| §13 Dashboard | KPI cards, feed, grid | 2 |
| §14 Projects | Project CRUD, status flow, mfg | 2 |
| §15 Workbooks | Workbook engine, 9 tabs | 3 |
| §16 Section Cockpit | Three-panel, PDF viewer | 3 |
| §17 PDF Parser | Parse pipeline (7 stages) | 3 (UI), 8 (real AI) |
| §18 Section Analysis | Spec table, anomalies | 3 |
| §19 Quotation | Multi-page quotation builder | 4 |
| §20 Inventory | Full inventory management | 4 |
| §21 WYSIWYG + Tables | TipTap, TanStack Table | 3+4 |
| §22 Revisions | Timeline, diff viewer | 4 |
| §23 Parallax Viz | Anime.js scene | 4 |
| §24 Exports | Output types, settings | 4 |
| §25 Event-Driven Jobs | Job queue simulation | 4 (mock), 7I (real) |
| §26 Notifications | Event types, channels | 5 |
| §27 Reports | All report types | 5 |
| §28 Admin Panel | Superadmin, subscriptions | 5 |
| §29 Settings | All settings pages | 5 |
| §30 Data Models | PostgreSQL schema | 6 |
| §31 API Spec | All endpoints | 6–7 |
| §32 Tech Stack | Dependencies | 0+6 |
| §33 Prerequisites | Env vars, API keys | 6 |
| §34 Feature Matrix | Plan gating | 5 |
| §35 Impl. Phases | (this document supersedes) | — |

---

*End of FORGE Phase-by-Phase Implementation Plan*
*Version: 1.0 | Generated from FORGE Spec v2.0*
*Use this document as the single source for all AI agent prompts.*
*Keep this document in sync with src/shared/types/index.ts at all times.*
