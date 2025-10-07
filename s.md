generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

/**
 * =========================
 * ENUMS
 * =========================
 */

enum Role {
  OWNER
  ADMIN
  HR
  MANAGER
  EMPLOYEE
}

enum TwoFAEnforcement {
  NONE
  ADMINS_ONLY
  ALL_USERS
}

enum EmploymentStatus {
  FULL_TIME
  PART_TIME
  CONTRACT
  CASUAL
  UNPAID
  TERMINATED
}

enum ApplicantStatus {
  APPLIED
  SHORTLISTED
  INTERVIEW
  OFFERED
  HIRED
  REJECTED
  WITHDRAWN
}

enum InterviewType {
  APPLICANT
  ENTRY
  EXIT
  GENERAL
  PHONE
  VIDEO
  IN_PERSON
}

enum ReviewType {
  SELF
  MANAGER
  PEER
  HR
}

enum TimesheetStatus {
  DRAFT
  SUBMITTED
  APPROVED
  REJECTED
}

enum LeaveStatus {
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}

enum ClaimStatus {
  SUBMITTED
  APPROVED
  REJECTED
  PAID
}

enum DocCategory {
  PROCEDURE_MANUALS
  EMPLOYEE_HANDBOOKS
  NEW_EMPLOYEE_KIT
  COMPANY_FORMS
  CUSTOM
}

enum EmailTemplateType {
  RECRUITMENT
  ONBOARDING
  LEAVE
  EXPENSE
  PERFORMANCE
  GENERAL
}

enum IntegrationName {
  SLACK
  GOOGLE_CAL
  OUTLOOK_CAL
  PAYROLL
  TIMEDOCTOR
  CUSTOM
}

enum EsignStatus {
  DRAFT
  SENT
  COMPLETED
  DECLINED
  EXPIRED
}

enum SubscriptionPlan {
  CORE
  PREMIUM
  VIP
}

enum PaymentFrequency {
  MONTHLY
  ANNUAL
}

enum AssetStatus {
  AVAILABLE
  ASSIGNED
  MAINTENANCE
  RETIRED
}

enum BenefitStatus {
  ACTIVE
  ENROLLED
  PENDING
  DECLINED
}

enum GrievanceStatus {
  SUBMITTED
  UNDER_REVIEW
  RESOLVED
  CLOSED
}

enum TrainingStatus {
  ASSIGNED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum ReminderType {
  EMAIL
  SYSTEM
  SMS
}

enum PinCategory {
  ANNOUNCEMENT
  CLASSIFIED
  RECOGNITION
  GENERAL
}

enum EventType {
  COMPANY
  BIRTHDAY
  ANNIVERSARY
  HOLIDAY
  MEETING
}

enum TerminationReason {
  RESIGNATION
  TERMINATION
  LAYOFF
  RETIREMENT
  END_OF_CONTRACT
}

enum RelationshipType {
  SPOUSE
  CHILD
  PARENT
  SIBLING
  EMERGENCY_CONTACT
  OTHER
}

enum SkillLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}

enum ContactTypeEnum {
  PHONE
  EMAIL
  ADDRESS
  EMERGENCY
  CUSTOM
}

enum PlanLevel {
  CORE
  PREMIUM
  VIP
}

/**
 * =========================
 * CORE COMPANY & USERS
 * =========================
 */

model Company {
  id                     String           @id @default(auto()) @map("_id")
  name                   String
  subdomain              String           @unique
  customDomain           String?          @unique
  country                String?
  timezone               String?
  defaultDepartmentId    String?
  logo                   String?
  showLogoOnPages        Boolean          @default(true)
  showCompanyNameOnPages Boolean          @default(true)
  nameFormat             String           @default("FirstName LastName")
  twoFA                  TwoFAEnforcement @default(NONE)
  features               Json?
  subscriptionLimit      Int              @default(10)
  employeeCodeAuto       Boolean          @default(true)
  createdAt              DateTime         @default(now())
  updatedAt              DateTime         @updatedAt

  // Relations - MongoDB uses embedded or referenced documents
  users                User[]
  employees            Employee[]
  departments          Department[]
  positions            Position[]
  locations            Location[]
  groups               Group[]
  tags                 Tag[]
  settings             Setting[]
  emailTemplates       EmailTemplate[]
  categories           Category[]
  jobs                 Job[]
  applicants           Applicant[]
  timesheetTemplates   TimesheetTemplate[]
  timesheets           Timesheet[]
  timeClockEntries     TimeClockEntry[]
  leavePolicies        LeavePolicy[]
  leaveBalances        LeaveBalance[]
  leaveRequests        LeaveRequest[]
  expenseCategories    ExpenseCategory[]
  expenseClaims        ExpenseClaim[]
  goalTemplates        GoalTemplate[]
  goalAssignments      GoalAssignment[]
  reviewForms          ReviewForm[]
  performanceTemplates PerformanceTemplate[]
  performanceReviews   PerformanceReview[]
  formTemplates        FormTemplate[]
  formSubmissions      FormSubmission[]
  checklistTemplates   ChecklistTemplate[]
  checklistAssignments ChecklistAssignment[]
  esignDocuments       EsignDocument[]
  newsArticles         NewsArticle[]
  polls                Poll[]
  pins                 Pin[]
  storedDocuments      StoredDocument[]
  documentFolders      DocumentFolder[]
  savedReports         SavedReport[]
  emailHours           EmailHours[]
  messageQueue         MessageQueue[]
  messageLogs          MessageLog[]
  emailBlocklist       EmailBlocklist[]
  integrations         Integration[]
  calendarFeeds        CalendarFeed[]
  subscription         Subscription?             @relation(fields: [subscriptionId], references: [id])
  smsCredits           SmsCredit[]
  billingTransactions  BillingTransaction[]
  auditLogs            AuditLog[]
  systemLogs           SystemLog[]
  assets               Asset[]
  assetTypes           AssetType[]
  benefits             Benefit[]
  benefitTypes         BenefitType[]
  workingDayTemplates  WorkingDayTemplate[]
  grievances           Grievance[]
  grievanceTypes       GrievanceType[]
  trainings            Training[]
  trainingPrograms     TrainingProgram[]
  events               Event[]
  reminders            Reminder[]
  terminationReasons   TerminationReasonLookup[]
  scorecardTemplates   ScorecardTemplate[]
  screenLayouts        ScreenLayout[]
  qualificationTypes   QualificationType[]
  skillTypes           SkillType[]
  contactTypes         ContactType[]
  jobBoardSettings     JobBoardSettings?         @relation(fields: [jobBoardSettingsId], references: [id])
  interviews           Interview[]
  subscriptionId       String?
  jobBoardSettingsId   String?

  @@map("companies")
}

/**
 * =========================
 * PRICING & SUBSCRIPTIONS
 * =========================
 */

model PricingPlan {
  id                      String    @id @default(auto()) @map("_id")
  level                   PlanLevel @unique
  name                    String
  monthlyCost             Float
  annualCost              Float
  description             String?
  features                Json
  adminUsersLimit         Int
  implementationSessions  Int
  prioritySupport         Boolean   @default(false)
  dedicatedAccountManager Boolean   @default(false)
  customDomainCNAME       Boolean   @default(false)
  customLeaveDisplays     Boolean   @default(false)
  customTrainingVideo     Boolean   @default(false)
  unlimitedAdminUsers     Boolean   @default(false)

  @@map("pricing_plans")
}

model User {
  id           String    @id @default(auto()) @map("_id")
  companyId    String
  email        String
  passwordHash String
  name         String
  role         Role
  lastLogin    DateTime?
  isActive     Boolean   @default(true)
  twoFAEnabled Boolean   @default(false)
  isOwner      Boolean   @default(false)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  // Relations
  employee            Employee?            @relation(fields: [employeeId], references: [id])
  auditLogs           AuditLog[]
  timesheetApprovals  Timesheet[]
  leaveApprovals      LeaveRequest[]
  expenseApprovals    ExpenseClaim[]
  performanceReviews  PerformanceReview[]
  esignDocuments      EsignDocument[]
  newsArticles        NewsArticle[]
  savedReports        SavedReport[]
  applicantScorecards ApplicantScorecard[]
  Company             Company              @relation(fields: [companyId], references: [id])
  employeeId          String?

  @@unique([companyId, email])
  @@index([companyId, role])
  @@map("users")
}

model Setting {
  id        String  @id @default(auto()) @map("_id")
  companyId String
  key       String
  value     Json
  Company   Company @relation(fields: [companyId], references: [id])

  @@unique([companyId, key])
  @@map("settings")
}

/**
 * =========================
 * ORGANIZATIONAL STRUCTURE
 * =========================
 */

model Department {
  id        String     @id @default(auto()) @map("_id")
  companyId String
  name      String
  employees Employee[]
  jobs      Job[]
  Company   Company    @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("departments")
}

model Position {
  id        String     @id @default(auto()) @map("_id")
  companyId String
  name      String
  employees Employee[]
  Company   Company    @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("positions")
}

model Location {
  id        String     @id @default(auto()) @map("_id")
  companyId String
  name      String
  employees Employee[]
  jobs      Job[]
  Company   Company    @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("locations")
}

model Group {
  id        String            @id @default(auto()) @map("_id")
  companyId String
  name      String
  employees EmployeeOnGroup[]
  Company   Company           @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("groups")
}

model EmployeeOnGroup {
  id         String   @id @default(auto()) @map("_id")
  employeeId String
  groupId    String
  employee   Employee @relation(fields: [employeeId], references: [id])
  group      Group    @relation(fields: [groupId], references: [id])

  @@unique([employeeId, groupId])
  @@map("employee_groups")
}

model Tag {
  id        String  @id @default(auto()) @map("_id")
  companyId String
  name      String
  color     String?
  Company   Company @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("tags")
}

/**
 * =========================
 * EMPLOYEES & PROFILES
 * =========================
 */

model Employee {
  id                   String           @id @default(auto()) @map("_id")
  companyId            String
  userId               String?          @unique
  code                 String           @unique
  firstName            String
  lastName             String
  email                String
  phone                String?
  departmentId         String?
  positionId           String?
  locationId           String?
  managerId            String?
  status               EmploymentStatus @default(FULL_TIME)
  birthDate            DateTime?
  hireDate             DateTime?
  terminationDate      DateTime?
  terminationReasonId  String?
  workingDayTemplateId String?
  gender               String?
  biography            String?
  customFields         Json?
  isActive             Boolean          @default(true)
  portalAccess         Boolean          @default(true)
  showInDirectory      Boolean          @default(true)
  allowProfileEdit     Boolean          @default(true)
  createdAt            DateTime         @default(now())
  updatedAt            DateTime         @updatedAt

  // Relations
  groups                    EmployeeOnGroup[]
  dependents                Dependent[]
  emergencyContacts         EmergencyContact[]
  skills                    EmployeeSkill[]
  qualifications            EmployeeQualification[]
  benefits                  EmployeeBenefit[]
  assets                    AssetAssignment[]
  contacts                  EmployeeContact[]
  goals                     GoalAssignment[]
  timesheets                Timesheet[]
  timeClockEntries          TimeClockEntry[]
  leaves                    LeaveRequest[]
  leaveBalances             LeaveBalance[]
  expenseClaims             ExpenseClaim[]
  performanceReviews        PerformanceReview[]
  checklistAssignments      ChecklistAssignment[]
  forms                     FormSubmission[]
  documents                 StoredDocument[]
  esignRecipients           EsignRecipient[]
  grievances                Grievance[]
  trainings                 EmployeeTraining[]
  eventAttendees            EventAttendee[]
  pinReports                PinReport[]
  pins                      Pin[]
  directReports             Employee[]
  Company                   Company                  @relation(fields: [companyId], references: [id])
  User                      User[]
  Department                Department?              @relation(fields: [departmentId], references: [id])
  Position                  Position?                @relation(fields: [positionId], references: [id])
  Location                  Location?                @relation(fields: [locationId], references: [id])
  Employee                  Employee?                @relation(fields: [employeeId], references: [id])
  employeeId                String?
  WorkingDayTemplate        WorkingDayTemplate?      @relation(fields: [workingDayTemplateId], references: [id])
  TerminationReasonLookup   TerminationReasonLookup? @relation(fields: [terminationReasonLookupId], references: [id])
  terminationReasonLookupId String?

  @@map("employees")
}

model Dependent {
  id                 String           @id @default(auto()) @map("_id")
  employeeId         String
  name               String
  relationship       RelationshipType
  birthDate          DateTime?
  phone              String?
  email              String?
  address            String?
  isEmergencyContact Boolean          @default(false)
  createdAt          DateTime         @default(now())
  Employee           Employee         @relation(fields: [employeeId], references: [id])

  @@map("dependents")
}

model EmergencyContact {
  id           String   @id @default(auto()) @map("_id")
  employeeId   String
  name         String
  phone        String
  email        String?
  relationship String
  isPrimary    Boolean  @default(false)
  createdAt    DateTime @default(now())
  Employee     Employee @relation(fields: [employeeId], references: [id])

  @@map("emergency_contacts")
}

model EmployeeContact {
  id            String       @id @default(auto()) @map("_id")
  employeeId    String
  typeId        String
  value         String
  label         String?
  isPrimary     Boolean      @default(false)
  Employee      Employee     @relation(fields: [employeeId], references: [id])
  ContactType   ContactType? @relation(fields: [contactTypeId], references: [id])
  contactTypeId String?

  @@map("employee_contacts")
}

/**
 * =========================
 * SKILLS & QUALIFICATIONS
 * =========================
 */

model SkillType {
  id        String          @id @default(auto()) @map("_id")
  companyId String
  name      String
  category  String?
  employees EmployeeSkill[]
  Company   Company         @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("skill_types")
}

model EmployeeSkill {
  id          String     @id @default(auto()) @map("_id")
  employeeId  String
  skillId     String
  level       SkillLevel
  yearsExp    Int?
  certified   Boolean    @default(false)
  createdAt   DateTime   @default(now())
  Employee    Employee   @relation(fields: [employeeId], references: [id])
  SkillType   SkillType? @relation(fields: [skillTypeId], references: [id])
  skillTypeId String?

  @@unique([employeeId, skillId])
  @@map("employee_skills")
}

model QualificationType {
  id        String                  @id @default(auto()) @map("_id")
  companyId String
  name      String
  category  String?
  employees EmployeeQualification[]
  Company   Company                 @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("qualification_types")
}

model EmployeeQualification {
  id                  String             @id @default(auto()) @map("_id")
  employeeId          String
  qualificationId     String
  institutionName     String
  completionDate      DateTime?
  expiryDate          DateTime?
  certificateUrl      String?
  grade               String?
  createdAt           DateTime           @default(now())
  Employee            Employee           @relation(fields: [employeeId], references: [id])
  QualificationType   QualificationType? @relation(fields: [qualificationTypeId], references: [id])
  qualificationTypeId String?

  @@map("employee_qualifications")
}

/**
 * =========================
 * BENEFITS & ASSETS
 * =========================
 */

model BenefitType {
  id          String            @id @default(auto()) @map("_id")
  companyId   String
  name        String
  description String?
  category    String?
  isActive    Boolean           @default(true)
  benefits    Benefit[]
  employees   EmployeeBenefit[]
  Company     Company           @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("benefit_types")
}

model Benefit {
  id            String            @id @default(auto()) @map("_id")
  companyId     String
  name          String
  description   String?
  typeId        String
  cost          Float?
  isActive      Boolean           @default(true)
  employees     EmployeeBenefit[]
  Company       Company           @relation(fields: [companyId], references: [id])
  BenefitType   BenefitType?      @relation(fields: [benefitTypeId], references: [id])
  benefitTypeId String?

  @@unique([companyId, name])
  @@map("benefits")
}

model EmployeeBenefit {
  id            String        @id @default(auto()) @map("_id")
  employeeId    String
  benefitId     String
  typeId        String
  status        BenefitStatus @default(PENDING)
  enrolledDate  DateTime?
  cost          Float?
  notes         String?
  createdAt     DateTime      @default(now())
  Employee      Employee      @relation(fields: [employeeId], references: [id])
  BenefitType   BenefitType?  @relation(fields: [benefitTypeId], references: [id])
  benefitTypeId String?
  Benefit       Benefit       @relation(fields: [benefitId], references: [id])

  @@unique([employeeId, benefitId])
  @@map("employee_benefits")
}

model AssetType {
  id        String  @id @default(auto()) @map("_id")
  companyId String
  name      String
  category  String?
  assets    Asset[]
  Company   Company @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("asset_types")
}

model Asset {
  id           String            @id @default(auto()) @map("_id")
  companyId    String
  typeId       String
  name         String
  serialNumber String?           @unique
  model        String?
  purchaseDate DateTime?
  cost         Float?
  status       AssetStatus       @default(AVAILABLE)
  notes        String?
  assignments  AssetAssignment[]
  createdAt    DateTime          @default(now())
  Company      Company           @relation(fields: [companyId], references: [id])
  AssetType    AssetType?        @relation(fields: [assetTypeId], references: [id])
  assetTypeId  String?

  @@map("assets")
}

model AssetAssignment {
  id         String    @id @default(auto()) @map("_id")
  assetId    String
  employeeId String
  assignedAt DateTime  @default(now())
  returnedAt DateTime?
  condition  String?
  notes      String?
  isActive   Boolean   @default(true)
  Employee   Employee  @relation(fields: [employeeId], references: [id])
  Asset      Asset     @relation(fields: [assetId], references: [id])

  @@map("asset_assignments")
}

/**
 * =========================
 * WORKING DAY TEMPLATES
 * =========================
 */

model WorkingDayTemplate {
  id        String     @id @default(auto()) @map("_id")
  companyId String
  name      String
  schedule  Json
  isDefault Boolean    @default(false)
  employees Employee[]
  createdAt DateTime   @default(now())
  Company   Company    @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("working_day_templates")
}

/**
 * =========================
 * RECRUITMENT & ATS
 * =========================
 */

model JobBoardSettings {
  id            String    @id @default(auto()) @map("_id")
  companyId     String    @unique
  isPublic      Boolean   @default(true)
  customDomain  String?
  brandingColor String?
  logo          String?
  description   String?
  contactEmail  String?
  createdAt     DateTime  @default(now())
  Company       Company[]

  @@map("job_board_settings")
}

model Job {
  id           String    @id @default(auto()) @map("_id")
  companyId    String
  title        String
  description  String
  requirements String?
  departmentId String?
  locationId   String?
  salaryRange  String?
  status       String    @default("OPEN")
  isPublic     Boolean   @default(true)
  expiryDate   DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  applicants Applicant[]
  Company    Company     @relation(fields: [companyId], references: [id])
  Department Department? @relation(fields: [departmentId], references: [id])
  Location   Location?   @relation(fields: [locationId], references: [id])

  @@index([companyId, status])
  @@map("jobs")
}

model Applicant {
  id           String          @id @default(auto()) @map("_id")
  companyId    String
  jobId        String
  name         String
  email        String
  phone        String?
  resumeUrl    String?
  coverLetter  String?
  stage        ApplicantStatus @default(APPLIED)
  source       String?
  rating       Int?
  notes        Json?
  customFields Json?
  isArchived   Boolean         @default(false)
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt

  interviews Interview[]
  scorecards ApplicantScorecard[]
  Company    Company              @relation(fields: [companyId], references: [id])
  Job        Job                  @relation(fields: [jobId], references: [id])

  @@index([companyId, jobId, stage])
  @@map("applicants")
}

model Interview {
  id           String        @id @default(auto()) @map("_id")
  companyId    String
  applicantId  String
  type         InterviewType
  scheduledAt  DateTime
  duration     Int?
  location     String?
  interviewers Json?
  notes        String?
  status       String        @default("SCHEDULED")
  createdAt    DateTime      @default(now())
  Company      Company       @relation(fields: [companyId], references: [id])
  Applicant    Applicant     @relation(fields: [applicantId], references: [id])

  @@map("interviews")
}

model ScorecardTemplate {
  id         String               @id @default(auto()) @map("_id")
  companyId  String
  name       String
  criteria   Json
  scorecards ApplicantScorecard[]
  createdAt  DateTime             @default(now())
  Company    Company              @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("scorecard_templates")
}

model ApplicantScorecard {
  id                  String             @id @default(auto()) @map("_id")
  applicantId         String
  templateId          String
  interviewerId       String
  scores              Json
  overallScore        Float?
  feedback            String?
  recommendation      String?
  createdAt           DateTime           @default(now())
  User                User?              @relation(fields: [userId], references: [id])
  userId              String?
  Applicant           Applicant          @relation(fields: [applicantId], references: [id])
  ScorecardTemplate   ScorecardTemplate? @relation(fields: [scorecardTemplateId], references: [id])
  scorecardTemplateId String?

  @@map("applicant_scorecards")
}

/**
 * =========================
 * TIMESHEETS & TIMECLOCK
 * =========================
 */

model TimesheetTemplate {
  id         String      @id @default(auto()) @map("_id")
  companyId  String
  name       String
  config     Json
  isDefault  Boolean     @default(false)
  active     Boolean     @default(true)
  timesheets Timesheet[]
  createdAt  DateTime    @default(now())
  Company    Company     @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("timesheet_templates")
}

model Timesheet {
  id                  String             @id @default(auto()) @map("_id")
  companyId           String
  employeeId          String
  templateId          String?
  periodStart         DateTime
  periodEnd           DateTime
  status              TimesheetStatus    @default(DRAFT)
  entries             Json
  totalHours          Float?
  approverId          String?
  approvedAt          DateTime?
  createdAt           DateTime           @default(now())
  updatedAt           DateTime           @updatedAt
  Company             Company            @relation(fields: [companyId], references: [id])
  User                User?              @relation(fields: [userId], references: [id])
  userId              String?
  Employee            Employee           @relation(fields: [employeeId], references: [id])
  TimesheetTemplate   TimesheetTemplate? @relation(fields: [timesheetTemplateId], references: [id])
  timesheetTemplateId String?

  @@index([companyId, employeeId, status])
  @@map("timesheets")
}

model TimeClockEntry {
  id         String    @id @default(auto()) @map("_id")
  companyId  String
  employeeId String
  clockIn    DateTime
  clockOut   DateTime?
  location   String?
  type       String    @default("WORK")
  createdAt  DateTime  @default(now())
  Company    Company   @relation(fields: [companyId], references: [id])
  Employee   Employee  @relation(fields: [employeeId], references: [id])

  @@index([companyId, employeeId, clockIn])
  @@map("time_clock_entries")
}

/**
 * =========================
 * LEAVE MANAGEMENT
 * =========================
 */

model LeavePolicy {
  id        String         @id @default(auto()) @map("_id")
  companyId String
  name      String
  type      String
  config    Json
  color     String?
  isDefault Boolean        @default(false)
  active    Boolean        @default(true)
  balances  LeaveBalance[]
  requests  LeaveRequest[]
  createdAt DateTime       @default(now())
  Company   Company        @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("leave_policies")
}

model LeaveBalance {
  id            String       @id @default(auto()) @map("_id")
  companyId     String
  employeeId    String
  policyId      String
  balance       Float        @default(0)
  used          Float        @default(0)
  pending       Float        @default(0)
  year          Int
  updatedAt     DateTime     @updatedAt
  Company       Company      @relation(fields: [companyId], references: [id])
  Employee      Employee     @relation(fields: [employeeId], references: [id])
  LeavePolicy   LeavePolicy? @relation(fields: [leavePolicyId], references: [id])
  leavePolicyId String?

  @@unique([employeeId, policyId, year])
  @@map("leave_balances")
}

model LeaveRequest {
  id            String       @id @default(auto()) @map("_id")
  companyId     String
  employeeId    String
  policyId      String
  startDate     DateTime
  endDate       DateTime
  days          Float
  reason        String?
  status        LeaveStatus  @default(PENDING)
  approverId    String?
  approvedAt    DateTime?
  comments      String?
  attachments   Json?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  Company       Company      @relation(fields: [companyId], references: [id])
  User          User?        @relation(fields: [userId], references: [id])
  userId        String?
  Employee      Employee     @relation(fields: [employeeId], references: [id])
  LeavePolicy   LeavePolicy? @relation(fields: [leavePolicyId], references: [id])
  leavePolicyId String?

  @@index([companyId, employeeId, status])
  @@map("leave_requests")
}

/**
 * =========================
 * EXPENSES
 * =========================
 */

model ExpenseCategory {
  id        String         @id @default(auto()) @map("_id")
  companyId String
  name      String
  code      String?
  isDefault Boolean        @default(false)
  active    Boolean        @default(true)
  claims    ExpenseClaim[]
  Company   Company        @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("expense_categories")
}

model ExpenseClaim {
  id                String           @id @default(auto()) @map("_id")
  companyId         String
  employeeId        String
  categoryId        String
  amount            Float
  currency          String           @default("USD")
  description       String?
  receiptUrl        String?
  attachments       Json?
  expenseDate       DateTime
  status            ClaimStatus      @default(SUBMITTED)
  approverId        String?
  approvedAt        DateTime?
  paidAt            DateTime?
  comments          String?
  createdAt         DateTime         @default(now())
  Company           Company          @relation(fields: [companyId], references: [id])
  User              User?            @relation(fields: [userId], references: [id])
  userId            String?
  Employee          Employee         @relation(fields: [employeeId], references: [id])
  ExpenseCategory   ExpenseCategory? @relation(fields: [expenseCategoryId], references: [id])
  expenseCategoryId String?

  @@index([companyId, employeeId, status])
  @@map("expense_claims")
}

/**
 * =========================
 * GOALS & PERFORMANCE
 * =========================
 */

model GoalTemplate {
  id          String           @id @default(auto()) @map("_id")
  companyId   String
  name        String
  description String?
  items       Json
  assignments GoalAssignment[]
  createdAt   DateTime         @default(now())
  Company     Company          @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("goal_templates")
}

model GoalAssignment {
  id             String        @id @default(auto()) @map("_id")
  companyId      String
  employeeId     String
  templateId     String?
  title          String
  goals          Json
  dueDate        DateTime?
  status         String        @default("ACTIVE")
  progress       Int           @default(0)
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
  Company        Company       @relation(fields: [companyId], references: [id])
  Employee       Employee      @relation(fields: [employeeId], references: [id])
  GoalTemplate   GoalTemplate? @relation(fields: [goalTemplateId], references: [id])
  goalTemplateId String?

  @@index([companyId, employeeId])
  @@map("goal_assignments")
}

model ReviewForm {
  id          String                @id @default(auto()) @map("_id")
  companyId   String
  name        String
  description String?
  schema      Json
  isActive    Boolean               @default(true)
  reviews     PerformanceReview[]
  templates   PerformanceTemplate[]
  createdAt   DateTime              @default(now())
  Company     Company               @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("review_forms")
}

model PerformanceTemplate {
  id        String       @id @default(auto()) @map("_id")
  companyId String
  name      String
  forms     ReviewForm[]
  createdAt DateTime     @default(now())
  Company   Company      @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("performance_templates")
}

model PerformanceReview {
  id            String      @id @default(auto()) @map("_id")
  companyId     String
  employeeId    String
  type          ReviewType
  formId        String
  completedById String
  responses     Json
  score         Float?
  period        String?
  submittedAt   DateTime    @default(now())
  Company       Company     @relation(fields: [companyId], references: [id])
  User          User?       @relation(fields: [userId], references: [id])
  userId        String?
  Employee      Employee    @relation(fields: [employeeId], references: [id])
  ReviewForm    ReviewForm? @relation(fields: [reviewFormId], references: [id])
  reviewFormId  String?

  @@index([companyId, employeeId, type])
  @@map("performance_reviews")
}

/**
 * =========================
 * FORMS (CUSTOM)
 * =========================
 */

model FormTemplate {
  id           String           @id @default(auto()) @map("_id")
  companyId    String
  name         String
  description  String?
  category     String?
  fields       Json
  options      Json?
  portalAccess Boolean          @default(true)
  isActive     Boolean          @default(true)
  submissions  FormSubmission[]
  createdAt    DateTime         @default(now())
  Company      Company          @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("form_templates")
}

model FormSubmission {
  id             String        @id @default(auto()) @map("_id")
  companyId      String
  formId         String
  employeeId     String
  data           Json
  submittedAt    DateTime      @default(now())
  hidden         Boolean       @default(false)
  Company        Company       @relation(fields: [companyId], references: [id])
  Employee       Employee      @relation(fields: [employeeId], references: [id])
  FormTemplate   FormTemplate? @relation(fields: [formTemplateId], references: [id])
  formTemplateId String?

  @@index([companyId, formId, employeeId])
  @@map("form_submissions")
}

/**
 * =========================
 * CHECKLISTS
 * =========================
 */

model ChecklistTemplate {
  id          String                @id @default(auto()) @map("_id")
  companyId   String
  name        String
  type        String
  items       Json
  reminders   Boolean               @default(true)
  notify      Boolean               @default(true)
  assignments ChecklistAssignment[]
  createdAt   DateTime              @default(now())
  Company     Company               @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("checklist_templates")
}

model ChecklistAssignment {
  id                  String             @id @default(auto()) @map("_id")
  companyId           String
  employeeId          String
  templateId          String
  status              String             @default("ASSIGNED")
  progress            Json?
  assignedAt          DateTime           @default(now())
  completedAt         DateTime?
  Company             Company            @relation(fields: [companyId], references: [id])
  Employee            Employee           @relation(fields: [employeeId], references: [id])
  ChecklistTemplate   ChecklistTemplate? @relation(fields: [checklistTemplateId], references: [id])
  checklistTemplateId String?

  @@index([companyId, employeeId])
  @@map("checklist_assignments")
}

/**
 * =========================
 * E-SIGNATURES
 * =========================
 */

model EsignDocument {
  id          String           @id @default(auto()) @map("_id")
  companyId   String
  title       String
  fileUrl     String
  layout      Json?
  status      EsignStatus      @default(DRAFT)
  createdById String
  recipients  EsignRecipient[]
  createdAt   DateTime         @default(now())
  Company     Company          @relation(fields: [companyId], references: [id])
  User        User?            @relation(fields: [userId], references: [id])
  userId      String?

  @@map("esign_documents")
}

model EsignRecipient {
  id              String         @id @default(auto()) @map("_id")
  documentId      String
  employeeId      String?
  email           String
  name            String
  order           Int            @default(1)
  signedAt        DateTime?
  status          String         @default("PENDING")
  meta            Json?
  Employee        Employee?      @relation(fields: [employeeId], references: [id])
  EsignDocument   EsignDocument? @relation(fields: [esignDocumentId], references: [id])
  esignDocumentId String?

  @@map("esign_recipients")
}

/**
 * =========================
 * NEWS, POLLS & PINS
 * =========================
 */

model NewsArticle {
  id          String   @id @default(auto()) @map("_id")
  companyId   String
  authorId    String
  title       String
  content     String
  category    String?
  tags        String[]
  likes       Int      @default(0)
  comments    Json?
  isPublished Boolean  @default(true)
  publishedAt DateTime @default(now())
  Company     Company  @relation(fields: [companyId], references: [id])
  User        User?    @relation(fields: [userId], references: [id])
  userId      String?

  @@index([companyId, category])
  @@map("news_articles")
}

model Poll {
  id          String    @id @default(auto()) @map("_id")
  companyId   String
  question    String
  options     Json
  votes       Json
  isActive    Boolean   @default(true)
  publishedAt DateTime  @default(now())
  expiresAt   DateTime?
  Company     Company   @relation(fields: [companyId], references: [id])

  @@map("polls")
}

model Pin {
  id         String      @id @default(auto()) @map("_id")
  companyId  String
  authorId   String
  title      String
  content    String
  category   PinCategory @default(GENERAL)
  isPublic   Boolean     @default(true)
  reports    PinReport[]
  createdAt  DateTime    @default(now())
  Company    Company     @relation(fields: [companyId], references: [id])
  Employee   Employee?   @relation(fields: [employeeId], references: [id])
  employeeId String?

  @@index([companyId, category])
  @@map("pins")
}

model PinReport {
  id         String    @id @default(auto()) @map("_id")
  pinId      String
  reporterId String
  reason     String
  createdAt  DateTime  @default(now())
  Employee   Employee? @relation(fields: [employeeId], references: [id])
  employeeId String?
  Pin        Pin       @relation(fields: [pinId], references: [id])

  @@map("pin_reports")
}

/**
 * =========================
 * EVENTS & CALENDAR
 * =========================
 */

model Event {
  id          String          @id @default(auto()) @map("_id")
  companyId   String
  title       String
  description String?
  type        EventType
  startDate   DateTime
  endDate     DateTime?
  location    String?
  isAllDay    Boolean         @default(false)
  isRecurring Boolean         @default(false)
  recurrence  Json?
  attendees   EventAttendee[]
  createdAt   DateTime        @default(now())
  Company     Company         @relation(fields: [companyId], references: [id])

  @@index([companyId, type, startDate])
  @@map("events")
}

model EventAttendee {
  id         String   @id @default(auto()) @map("_id")
  eventId    String
  employeeId String
  status     String   @default("INVITED")
  Employee   Employee @relation(fields: [employeeId], references: [id])
  Event      Event    @relation(fields: [eventId], references: [id])

  @@unique([eventId, employeeId])
  @@map("event_attendees")
}

/**
 * =========================
 * GRIEVANCES
 * =========================
 */

model GrievanceType {
  id          String      @id @default(auto()) @map("_id")
  companyId   String
  name        String
  description String?
  grievances  Grievance[]
  Company     Company     @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("grievance_types")
}

model Grievance {
  id              String          @id @default(auto()) @map("_id")
  companyId       String
  employeeId      String
  typeId          String
  title           String
  description     String
  status          GrievanceStatus @default(SUBMITTED)
  priority        String?
  assignedTo      String?
  resolution      String?
  resolvedAt      DateTime?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  Company         Company         @relation(fields: [companyId], references: [id])
  Employee        Employee        @relation(fields: [employeeId], references: [id])
  GrievanceType   GrievanceType?  @relation(fields: [grievanceTypeId], references: [id])
  grievanceTypeId String?

  @@index([companyId, employeeId, status])
  @@map("grievances")
}

/**
 * =========================
 * TRAINING
 * =========================
 */

model TrainingProgram {
  id          String             @id @default(auto()) @map("_id")
  companyId   String
  name        String
  description String?
  duration    Int?
  isActive    Boolean            @default(true)
  trainings   Training[]
  employees   EmployeeTraining[]
  createdAt   DateTime           @default(now())
  Company     Company            @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("training_programs")
}

model Training {
  id                String             @id @default(auto()) @map("_id")
  companyId         String
  programId         String
  title             String
  startDate         DateTime
  endDate           DateTime?
  location          String?
  instructor        String?
  capacity          Int?
  employees         EmployeeTraining[]
  createdAt         DateTime           @default(now())
  Company           Company            @relation(fields: [companyId], references: [id])
  TrainingProgram   TrainingProgram?   @relation(fields: [trainingProgramId], references: [id])
  trainingProgramId String?

  @@map("trainings")
}

model EmployeeTraining {
  id                String           @id @default(auto()) @map("_id")
  employeeId        String
  trainingId        String?
  programId         String
  status            TrainingStatus   @default(ASSIGNED)
  completedAt       DateTime?
  score             Float?
  certificate       String?
  notes             String?
  assignedAt        DateTime         @default(now())
  Employee          Employee         @relation(fields: [employeeId], references: [id])
  TrainingProgram   TrainingProgram? @relation(fields: [trainingProgramId], references: [id])
  trainingProgramId String?
  Training          Training?        @relation(fields: [trainingId], references: [id])

  @@unique([employeeId, trainingId])
  @@map("employee_trainings")
}

/**
 * =========================
 * REMINDERS
 * =========================
 */

model Reminder {
  id          String       @id @default(auto()) @map("_id")
  companyId   String
  title       String
  message     String
  type        ReminderType
  targetId    String?
  scheduledAt DateTime
  sentAt      DateTime?
  isRecurring Boolean      @default(false)
  recurrence  Json?
  isActive    Boolean      @default(true)
  createdAt   DateTime     @default(now())
  Company     Company      @relation(fields: [companyId], references: [id])

  @@index([companyId, scheduledAt])
  @@map("reminders")
}

/**
 * =========================
 * DOCUMENTS & LIBRARY
 * =========================
 */

model StoredDocument {
  id               String          @id @default(auto()) @map("_id")
  companyId        String
  ownerId          String?
  title            String
  filename         String?
  url              String
  category         DocCategory     @default(CUSTOM)
  folderId         String?
  size             Int?
  mimeType         String?
  tags             String[]
  isPublic         Boolean         @default(false)
  createdAt        DateTime        @default(now())
  meta             Json?
  Company          Company         @relation(fields: [companyId], references: [id])
  Employee         Employee?       @relation(fields: [employeeId], references: [id])
  employeeId       String?
  DocumentFolder   DocumentFolder? @relation(fields: [documentFolderId], references: [id])
  documentFolderId String?

  @@index([companyId, category])
  @@map("stored_documents")
}

model DocumentFolder {
  id               String           @id @default(auto()) @map("_id")
  companyId        String
  name             String
  parentId         String?
  children         DocumentFolder[]
  documents        StoredDocument[]
  createdAt        DateTime         @default(now())
  Company          Company          @relation(fields: [companyId], references: [id])
  DocumentFolder   DocumentFolder?  @relation(fields: [documentFolderId], references: [id])
  documentFolderId String?

  @@unique([companyId, name, parentId])
  @@map("document_folders")
}

/**
 * =========================
 * TERMINATION REASONS
 * =========================
 */

model TerminationReasonLookup {
  id        String            @id @default(auto()) @map("_id")
  companyId String
  reason    TerminationReason
  name      String
  employees Employee[]
  Company   Company           @relation(fields: [companyId], references: [id])

  @@unique([companyId, reason, name])
  @@map("termination_reasons")
}

/**
 * =========================
 * CONTACT TYPES
 * =========================
 */

model ContactType {
  id        String            @id @default(auto()) @map("_id")
  companyId String
  name      String
  type      ContactTypeEnum   @default(CUSTOM)
  isDefault Boolean           @default(false)
  employees EmployeeContact[]
  Company   Company           @relation(fields: [companyId], references: [id])

  @@unique([companyId, name])
  @@map("contact_types")
}

/**
 * =========================
 * SCREEN LAYOUTS (ESS)
 * =========================
 */

model ScreenLayout {
  id          String  @id @default(auto()) @map("_id")
  companyId   String
  name        String
  portal      String
  description String?
  config      Json
  isDefault   Boolean @default(false)
  Company     Company @relation(fields: [companyId], references: [id])

  @@unique([companyId, name, portal])
  @@map("screen_layouts")
}

/**
 * =========================
 * CATEGORIES & LOOKUPS
 * =========================
 */

model Category {
  id        String  @id @default(auto()) @map("_id")
  companyId String
  type      String
  name      String
  color     String?
  isActive  Boolean @default(true)
  meta      Json?
  Company   Company @relation(fields: [companyId], references: [id])

  @@unique([companyId, type, name])
  @@map("categories")
}

/**
 * =========================
 * EMAIL TEMPLATES
 * =========================
 */

model EmailTemplate {
  id        String            @id @default(auto()) @map("_id")
  companyId String
  title     String
  type      EmailTemplateType
  subject   String
  body      String
  variables Json?
  isActive  Boolean           @default(true)
  createdAt DateTime          @default(now())
  updatedAt DateTime          @updatedAt
  Company   Company           @relation(fields: [companyId], references: [id])

  @@index([companyId, type])
  @@map("email_templates")
}

/**
 * =========================
 * REPORTS (METADATA)
 * =========================
 */

model SavedReport {
  id          String   @id @default(auto()) @map("_id")
  companyId   String
  name        String
  module      String
  query       Json
  isShared    Boolean  @default(false)
  createdById String
  createdAt   DateTime @default(now())
  Company     Company  @relation(fields: [companyId], references: [id])
  User        User?    @relation(fields: [userId], references: [id])
  userId      String?

  @@unique([companyId, name])
  @@map("saved_reports")
}

/**
 * =========================
 * EMAIL TOOLS
 * =========================
 */

model EmailHours {
  id        String   @id @default(auto()) @map("_id")
  companyId String
  enabled   Boolean  @default(false)
  timezone  String?
  priority  String?
  schedule  Json?
  createdAt DateTime @default(now())
  Company   Company  @relation(fields: [companyId], references: [id])

  @@map("email_hours")
}

model MessageQueue {
  id          String    @id @default(auto()) @map("_id")
  companyId   String
  recipient   String
  subject     String?
  body        String?
  channel     String    @default("EMAIL")
  status      String    @default("QUEUED")
  priority    String?
  scheduledAt DateTime?
  payload     Json?
  createdAt   DateTime  @default(now())
  processedAt DateTime?
  error       String?
  Company     Company   @relation(fields: [companyId], references: [id])

  @@index([companyId, status])
  @@map("message_queue")
}

model MessageLog {
  id        String   @id @default(auto()) @map("_id")
  companyId String
  recipient String
  subject   String?
  channel   String
  payload   Json?
  createdAt DateTime @default(now())
  status    String
  error     String?
  Company   Company  @relation(fields: [companyId], references: [id])

  @@index([companyId, channel])
  @@map("message_logs")
}

model EmailBlocklist {
  id        String   @id @default(auto()) @map("_id")
  companyId String
  email     String
  reason    String?
  addedBy   String?
  createdAt DateTime @default(now())
  Company   Company  @relation(fields: [companyId], references: [id])

  @@unique([companyId, email])
  @@map("email_blocklist")
}

/**
 * =========================
 * INTEGRATIONS
 * =========================
 */

model Integration {
  id         String          @id @default(auto()) @map("_id")
  companyId  String
  name       IntegrationName
  enabled    Boolean         @default(false)
  config     Json
  apiToken   String?         @unique
  lastSync   DateTime?
  syncStatus String?
  createdAt  DateTime        @default(now())
  updatedAt  DateTime        @updatedAt
  Company    Company         @relation(fields: [companyId], references: [id])

  @@map("integrations")
}

model CalendarFeed {
  id        String   @id @default(auto()) @map("_id")
  companyId String
  url       String   @unique
  include   Json?
  reminders Boolean  @default(true)
  createdAt DateTime @default(now())
  Company   Company  @relation(fields: [companyId], references: [id])

  @@map("calendar_feeds")
}

/**
 * =========================
 * BILLING & SUBSCRIPTIONS
 * =========================
 */

model Subscription {
  id          String           @id @default(auto()) @map("_id")
  companyId   String           @unique
  plan        SubscriptionPlan @default(CORE)
  frequency   PaymentFrequency @default(MONTHLY)
  seats       Int              @default(10)
  active      Boolean          @default(true)
  trialEnds   DateTime?
  billingDate DateTime?
  promoCode   String?
  promoMeta   Json?
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  Company     Company[]

  @@map("subscriptions")
}

model SmsCredit {
  id        String   @id @default(auto()) @map("_id")
  companyId String   @unique
  balance   Int      @default(0)
  purchased Int      @default(0)
  used      Int      @default(0)
  updatedAt DateTime @updatedAt
  Company   Company  @relation(fields: [companyId], references: [id])

  @@map("sms_credits")
}

model BillingTransaction {
  id          String   @id @default(auto()) @map("_id")
  companyId   String
  type        String
  amount      Float
  currency    String   @default("USD")
  description String?
  invoiceId   String?
  paymentId   String?
  status      String   @default("COMPLETED")
  meta        Json?
  createdAt   DateTime @default(now())
  Company     Company  @relation(fields: [companyId], references: [id])

  @@map("billing_transactions")
}

/**
 * =========================
 * AUDIT & LOGS
 * =========================
 */

model AuditLog {
  id        String   @id @default(auto()) @map("_id")
  companyId String
  userId    String?
  action    String
  entity    String
  entityId  String?
  oldValues Json?
  newValues Json?
  ipAddress String?
  userAgent String?
  details   Json?
  createdAt DateTime @default(now())
  Company   Company  @relation(fields: [companyId], references: [id])
  User      User?    @relation(fields: [userId], references: [id])

  @@index([companyId, entity, createdAt])
  @@map("audit_logs")
}

model SystemLog {
  id          String   @id @default(auto()) @map("_id")
  companyId   String
  level       String
  action      String
  description String?
  stackTrace  String?
  meta        Json?
  createdAt   DateTime @default(now())
  Company     Company  @relation(fields: [companyId], references: [id])

  @@index([companyId, level, createdAt])
  @@map("system_logs")
}
