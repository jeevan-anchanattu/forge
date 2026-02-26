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
