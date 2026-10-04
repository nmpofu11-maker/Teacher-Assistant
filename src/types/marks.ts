import { Subject as SubjectName, GradeClass } from './index';

/**
 * CAPS Achievement Levels (1-7)
 */
export type AchievementLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Learner {
  id: string;
  name: string;
  surname: string;
  classId: GradeClass;
  idNumber?: string;
  studentNumber?: string;
  gender?: 'M' | 'F' | 'O';
}

export interface Subject {
  name: SubjectName;
  curriculum: 'CAPS' | 'IEB';
  department: string;
}

export interface Grade {
  grade: number | string;
  phase: 'Senior Phase' | 'FET Phase';
  classes: GradeClass[];
}

export interface Assessment {
  id: string;
  code: string;
  title: string;
  totalMarks: number;
  weighting: number; // e.g., 25 for 25%
  term: number;
  category: string;
}

export type MarkStatus = 'PRESENT' | 'ABSENT' | 'MEDICAL' | 'NOT_HANDED_IN';

export interface MarkEntry {
  learnerId: string;
  assessmentId?: string;
  taskId: string;
  rawMark: number | null;
  percentage?: number | null;
  achievementLevel?: AchievementLevel | null;
  status: MarkStatus;
  isAbsent?: boolean;
  isMedical?: boolean;
  comment?: string;
  lastUpdated?: string;
  lastModified: string;
}

export interface Marksheet {
  id: string;
  classId: GradeClass;
  subject: SubjectName;
  term: number;
  academicYear?: number;
  taskId: string;
  learners?: string[];
  assessments?: string[];
  entries: MarkEntry[];
}

export interface CalculationResult {
  learnerId: string;
  termTotalMarks: number;
  termMaxPossible: number;
  termPercentage: number;
  termAchievementLevel: AchievementLevel;
  sbaContribution: number;
  isPassing: boolean;
}

export interface ClassLearnerData {
  classId: GradeClass;
  learners: Learner[];
}
