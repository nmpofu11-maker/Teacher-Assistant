export type Subject = 'Technology' | 'Mathematical Literacy';

export type GradeClass = '8A' | '8B' | '9A' | '9B' | '10' | '11' | '12';

export interface ClassInfo {
  id: GradeClass;
  name: string;
  grade: number | string;
  section: string;
  subject: Subject;
  teachers: string[];
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    lightBg: string;
  };
  description: string;
}

export interface ATPItem {
  id: string;
  subject: Subject;
  grade: number | string;
  term: number; // 1 to 4
  week: number; // 1 to 11
  capsTopic: string;
  coreConcepts: string[];
  requisitePreKnowledge: string;
  resources: string[];
  informalAssessment?: string;
  formalAssessment?: string;
  capsPageNo?: string;
  calendarDateRange?: string;
}

export type WeekdayName = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface CalendarDayDetail {
  dateStr: string;      // e.g. "2026-09-17"
  displayDate: string;  // e.g. "17 Sep"
  fullDate: string;     // e.g. "Thursday, 17 September 2026"
  isHoliday?: boolean;
  holidayName?: string;
  isSchoolClosed?: boolean;
}

export interface AcademicWeekInfo {
  term: number;
  week: number;
  startDate: string;
  endDate: string;
  dateRangeShort: string; // e.g. "14 Sep – 18 Sep"
  dateRangeLong: string;  // e.g. "14 Sep – 18 Sep 2026"
  days: Record<WeekdayName, CalendarDayDetail>;
  sbaMilestone?: string;
  specialNotes?: string;
  isExamWeek?: boolean;
}

export interface TermCalendarInfo {
  term: number;
  name: string;
  seasonLabel: string;
  startDate: string;
  endDate: string;
  totalWeeks: number;
  totalSchoolDays: number;
  holidays: Array<{ date: string; name: string; type: 'public_holiday' | 'school_holiday' | 'special' }>;
  keyMilestones: Array<{ week: number; title: string; description: string; badgeColor?: string }>;
  weeks: AcademicWeekInfo[];
}

export interface AcademicYearCalendar {
  year: number;
  label: string;
  terms: Record<number, TermCalendarInfo>;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  timeSlot: string;
  periodNumber: number; // 1 to 8, or 0 for admin/break
  type: 'lesson' | 'break' | 'free' | 'admin';
  teachers?: string[];
  classes?: string[]; // e.g. ['12A', '12B'] or ['8A']
  targetClassId?: GradeClass;
  subject?: Subject;
  customTopic?: string;
  room?: string;
  isDoublePeriod?: boolean;
  doublePeriodPart?: 1 | 2;
}

export interface LearningModelStage {
  id: string;
  name: string;
  code: string;
  order: number;
  shortDesc: string;
  didacticGoal: string;
  teacherAction: string;
  learnerAction: string;
  cognitiveLevel: string;
  keyQuestionStems: string[];
  classroomExample: string;
  commonMisconception: string;
  iebCapsStrategy: string;
}

export interface LearningModel {
  id: 'idmec-tech' | 'context-mathlit' | 'grr-pacing' | 'caps-cognitive';
  title: string;
  tagline: string;
  subject: Subject | 'All';
  targetGrades: string;
  philosophy: string;
  diagramTitle: string;
  stages: LearningModelStage[];
  classroomImpact: string[];
  evaluationCriteria: string[];
}

export interface SlideContent {
  slideNumber: number;
  title: string;
  subtitle?: string;
  timingMinutes: number; // e.g. 5, 10, 15
  phase: 'Hook / Baseline (0-5m)' | 'Concept Teaching (5-20m)' | 'Worked Examples (20-30m)' | 'IEB Exam Activity (30-40m)' | 'Wrap-up & Exit Ticket (40-45m)';
  learningModelStage?: string;
  bulletPoints: string[];
  keyFormulaOrConcept?: string;
  diagramOrVisualDescription?: string;
  iebExamTip?: string;
  speakerNotes: string;
}

export interface LessonPlan {
  id: string;
  classId: GradeClass;
  subject: Subject;
  term: number;
  week: number;
  lessonTitle: string;
  durationMinutes: number; // 45 min
  capsTopic: string;
  capsSpecificAims: string[];
  learningObjectives: string[];
  requisiteKnowledge: string;
  pacingBreakdown: {
    phase: string;
    duration: string;
    teacherActivity: string;
    learnerActivity: string;
    resources: string;
  }[];
  iebCognitiveLevels: {
    level1_knowing: string; // 20-30%
    level2_routine: string; // 35-40%
    level3_complex: string; // 20%
    level4_problem_solving: string; // 10-15%
  };
  differentiation: {
    support: string;
    extension: string;
  };
  informalAssessment: string;
  homeworkOrPATTask: string;
}

export interface WorksheetQuestion {
  questionNumber: string | number;
  subQuestions?: {
    id: string;
    text: string;
    marks: number;
    cognitiveLevel: string;
    answerSpaceLines?: number;
    solution?: string;
    markingGuideline?: string;
  }[];
  contextText?: string;
  diagramDescription?: string;
  tableData?: { headers: string[]; rows: (string | number)[][] };
}

export interface Worksheet {
  id: string;
  lessonPlanId?: string;
  title: string;
  grade: GradeClass | string | number;
  subject: Subject;
  term: number;
  week: number;
  totalMarks: number;
  estimatedMinutes?: number;
  estimatedTime?: string;
  instructions: string[];
  questions: WorksheetQuestion[];
  memorandum: {
    questionNumber?: string | number;
    subId: string;
    stepByStepSolution: string;
    marksAllocated: number;
    notes: string;
  }[];
}

export interface AIPromptTemplate {
  id: string;
  category: 'Lesson Planning' | 'IEB Exam Style Question' | 'PAT & Practical Guidance' | 'Remediation & Scaffolding' | 'Worksheet Generation' | 'Pedagogical Frameworks';
  title: string;
  targetSubject: Subject | 'All';
  targetGrade: GradeClass | 'All';
  promptText: string;
  description: string;
  tags: string[];
}

export type IEBResourceType = 
  | 'Past Exam Paper' 
  | 'Marking Guideline' 
  | 'Examiner Report' 
  | 'Exemplar Assessment' 
  | 'PAT & Practical Guide';

export interface IEBExamQuestionSample {
  questionNumber: string;
  context: string;
  cognitiveLevel: 'Level 1: Knowing' | 'Level 2: Routine' | 'Level 3: Complex' | 'Level 4: Problem Solving';
  marks: number;
  subQuestions: {
    number: string;
    text: string;
    marks: number;
    answerGuide: string;
    markBreakdown: string; // e.g. "1M method + 1A accuracy"
    commonPitfall?: string;
  }[];
}

export interface IEBExaminerInsight {
  topic: string;
  overallPerformance: 'Well Answered' | 'Moderate' | 'Poorly Answered / High Remediation Required';
  averageScorePercentage?: number;
  commonErrors: string[];
  examinerTips: string[];
  teachingRecommendations: string[];
}

export interface IEBResource {
  id: string;
  title: string;
  subject: Subject;
  grade: number | string; // 8, 9, 10, 11, 12
  year: number;
  session: 'November Final' | 'June Mid-Year' | 'Exemplar' | 'Supplementary';
  paperType: 'Paper 1 (Basic Skills)' | 'Paper 2 (Applications)' | 'Theory & Design' | 'Practical Assessment Task';
  resourceType: IEBResourceType;
  totalMarks: number;
  timeAllocationMinutes: number;
  capsTopicsCovered: string[];
  description: string;
  keyHighlights: string[];
  examinerInsights?: IEBExaminerInsight[];
  sampleQuestions?: IEBExamQuestionSample[];
  memorandumSnippet?: string;
  downloadUrl?: string;
}

export type AssessmentStandard = 'CAPS / DBE ATP' | 'IEB SAG (Subject Assessment Guidelines 2025/2026)';

export type AssessmentCategory = 
  | 'Mini-PAT (Practical Assessment Task)'
  | 'Controlled Test'
  | 'Mid-Year Examination'
  | 'Final Examination'
  | 'Case Study'
  | 'Assignment'
  | 'Alternate Assessment: Project'
  | 'Alternate Assessment: Assignment'
  | 'Alternate Assessment: Investigation'
  | 'Alternate Assessment: Research Task'
  | 'Alternate Assessment: Case Study'
  | 'Standardised Test'
  | 'Preliminary Examination';

export interface EducatorPromptMilestone {
  stage: '2_weeks_prior' | '1_week_prior' | 'task_launch' | 'submission_marking' | 'moderation_signoff';
  title: string;
  leadTimeDays: number;
  triggerDateStr: string;
  urgentAlert: boolean;
  message: string;
  checklist: string[];
  suggestedAIPrompt: string;
}

export interface AssessmentQuestionItem {
  id: string;
  title: string;
  description: string;
  cognitiveLevel: 'Level 1: Knowing' | 'Level 2: Routine' | 'Level 3: Multi-step / Complex' | 'Level 4: Reasoning / Reflecting';
  marks: number;
  markingCriteriaSnippet: string;
}

export interface AssessmentTask {
  id: string;
  code: string; // e.g. "TECH8-T1-A1" or "MLIT12-SBA-ALT1"
  grade: number; // 8, 9, 10, 11, 12
  gradeClass: GradeClass; // '8A', '8B', '9A', '9B', '10', '11', '12'
  subject: Subject;
  curriculumStandard: AssessmentStandard;
  term: number; // 1, 2, 3, 4
  scheduledWeek: number; // 1 to 11
  targetDate: string; // e.g. "Week 5 (March 2026)"
  title: string;
  category: AssessmentCategory;
  duration: string; // e.g. "1 - 2 hours", "45 - 60 mins", "3 hours", "2 weeks project"
  totalMarks: number;
  sbaWeightingPercentage: number; // For IEB Gr12: 15%, 20%, etc.
  sbaContributionMarks: number; // For IEB Gr12: 15 / 20 / 30 / 40
  topicsCovered: string[];
  cognitiveWeighting: {
    level1_knowing: number; // %
    level2_routine: number; // %
    level3_complex: number; // %
    level4_reasoning: number; // %
  };
  paperStructure?: {
    paperNumber?: 1 | 2;
    topicWeightings?: { topic: string; percentage: number }[];
    guidelines?: string[];
  };
  instructions: string[];
  scenarioOrBrief: string;
  questions: AssessmentQuestionItem[];
  markingRubricOrMemo: string;
  educatorPrompts: EducatorPromptMilestone[];
  iebAppendicesRequired?: ('Appendix A' | 'Appendix B' | 'Appendix C' | 'Appendix D' | 'Appendix E' | 'Appendix F' | 'Appendix G')[];
  aiAssistancePrompts: string[];
  isCompleted?: boolean;
}

export interface IEBAppendixDoc {
  appendixId: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  title: string;
  description: string;
  purpose: string;
}

export type ModerationStageStatus = 'NOT_DUE' | 'DUE_NOW' | 'PENDING_REVIEW' | 'COMPLETED' | 'OVERDUE';

export interface PreModerationForm {
  taskId: string;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'APPROVED_WITH_MODIFICATIONS' | 'RESUBMISSION_REQUIRED';
  moderatorName: string;
  moderatorRole: 'HOD' | 'Subject Head' | 'Senior Teacher' | 'Cluster Moderator' | 'External IEB Moderator';
  saceNumber?: string;
  moderationDate: string;
  officialAcceptableWindow: string; // e.g. "14–21 days prior to test administration (Before Week 4)"
  daysRemainingOrAgo: number;
  stageStatus: ModerationStageStatus;
  checks: {
    technicalLayout: { passed: boolean; comment: string }; // Total marks, time, instructions, layout
    curriculumAlignment: { passed: boolean; comment: string }; // ATP / CAPS / IEB SAG scope compliance
    cognitiveDistribution: { passed: boolean; comment: string }; // Bloom's L1-L4 percentage compliance
    markingMemoClarity: { passed: boolean; comment: string }; // Complete solutions, mark breakdown, alternatives
    languageAndFairness: { passed: boolean; comment: string }; // Clear wording, bias-free, accessible stimulus
    aiAcademicIntegrity: { passed: boolean; comment: string }; // Appendix G attached (IEB) / authenticity declaration
  };
  overallComments: string;
  recommendations: string[];
  signatureVerified: boolean;
  signedAt?: string;
}

export interface PostModerationForm {
  taskId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'MODERATION_APPROVED' | 'MARK_ADJUSTMENT_RECOMMENDED';
  moderatorName: string;
  moderatorRole: 'HOD' | 'Subject Head' | 'Senior Teacher' | 'Cluster Moderator' | 'External IEB Moderator';
  saceNumber?: string;
  moderationDate: string;
  officialAcceptableWindow: string; // e.g. "Within 3 to 7 working days after marking completion"
  stageStatus: ModerationStageStatus;
  sampleSize: number; // e.g. 10% or minimum 6-10 scripts
  sampleBreakdown: {
    topLearners: string[];
    middleLearners: string[];
    bottomLearners: string[];
  };
  checks: {
    markingConsistency: { passed: boolean; comment: string }; // Memo adhered to strictly & fairly
    arithmeticAccuracy: { passed: boolean; comment: string }; // Correct addition & subtotal calculation
    formativeFeedback: { passed: boolean; comment: string }; // Meaningful feedback annotations for learners
    markTransferAccuracy: { passed: boolean; comment: string }; // Checked against SA-SAMS / mark schedules
    aiUseAudit: { passed: boolean; comment: string }; // Appendix G reviewed against learner submissions
  };
  markAdjustmentSuggested: boolean;
  adjustmentDetails?: string;
  commonLearnerMisconceptions: string[];
  recommendationsForRemediation: string[];
  signatureVerified: boolean;
  signedAt?: string;
}
