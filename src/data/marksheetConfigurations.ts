import { Subject, GradeClass } from '../types';
import { Assessment, AchievementLevel } from '../types/marks';

export interface MarksheetConfiguration {
  subject: Subject;
  grade: number;
  curriculum: 'CAPS' | 'IEB';
  achievementLevels: {
    level: AchievementLevel;
    minPercentage: number;
    description: string;
  }[];
  terms: {
    term: number;
    assessments: {
      code: string;
      title: string;
      category: string;
      totalMarks: number;
      sbaWeighting: number; // Contribution to the term mark or year SBA
    }[];
  }[];
  finalCalculation: {
    sbaWeighting: number; // e.g. 60 for 60%
    examWeighting: number; // e.g. 40 for 40%
  };
}

export const CAPS_ACHIEVEMENT_LEVELS: MarksheetConfiguration['achievementLevels'] = [
  { level: 7, minPercentage: 80, description: 'Outstanding Achievement' },
  { level: 6, minPercentage: 70, description: 'Meritorious Achievement' },
  { level: 5, minPercentage: 60, description: 'Substantial Achievement' },
  { level: 4, minPercentage: 50, description: 'Adequate Achievement' },
  { level: 3, minPercentage: 40, description: 'Moderate Achievement' },
  { level: 2, minPercentage: 30, description: 'Elementary Achievement' },
  { level: 1, minPercentage: 0, description: 'Not Achieved' },
];

export const MARKSHEET_CONFIGURATIONS: Record<string, MarksheetConfiguration> = {
  'TECH-GR8': {
    subject: 'Technology',
    grade: 8,
    curriculum: 'CAPS',
    achievementLevels: CAPS_ACHIEVEMENT_LEVELS,
    terms: [
      {
        term: 1,
        assessments: [
          { code: 'TECH8-T1-CS1', title: 'Case Study', category: 'Assignment', totalMarks: 50, sbaWeighting: 10 },
          { code: 'TECH8-T1-TEST', title: 'Controlled Test 1', category: 'Test', totalMarks: 60, sbaWeighting: 15 },
        ]
      },
      {
        term: 2,
        assessments: [
          { code: 'TECH8-T2-PAT', title: 'Mini-PAT', category: 'Practical', totalMarks: 70, sbaWeighting: 35 },
        ]
      },
      {
        term: 3,
        assessments: [
          { code: 'TECH8-T3-AS1', title: 'Assignment', category: 'Assignment', totalMarks: 50, sbaWeighting: 10 },
          { code: 'TECH8-T3-TEST', title: 'Controlled Test 2', category: 'Test', totalMarks: 60, sbaWeighting: 15 },
        ]
      },
      {
        term: 4,
        assessments: [
          { code: 'TECH8-T4-PAT', title: 'Mini-PAT (Final)', category: 'Practical', totalMarks: 70, sbaWeighting: 35 },
          { code: 'TECH8-T4-EXAM', title: 'Final Examination', category: 'Examination', totalMarks: 100, sbaWeighting: 40 },
        ]
      }
    ],
    finalCalculation: {
      sbaWeighting: 60,
      examWeighting: 40
    }
  },
  'TECH-GR9': {
    subject: 'Technology',
    grade: 9,
    curriculum: 'CAPS',
    achievementLevels: CAPS_ACHIEVEMENT_LEVELS,
    terms: [
      {
        term: 1,
        assessments: [
          { code: 'TECH9-T1-A1', title: 'Investigation', category: 'Assignment', totalMarks: 50, sbaWeighting: 10 },
          { code: 'TECH9-T1-TEST', title: 'Controlled Test 1', category: 'Test', totalMarks: 60, sbaWeighting: 15 },
        ]
      },
      {
        term: 2,
        assessments: [
          { code: 'TECH9-T2-PAT', title: 'Mini-PAT', category: 'Practical', totalMarks: 70, sbaWeighting: 35 },
        ]
      },
      {
        term: 3,
        assessments: [
          { code: 'TECH9-T3-AS1', title: 'Assignment', category: 'Assignment', totalMarks: 50, sbaWeighting: 10 },
          { code: 'TECH9-T3-TEST', title: 'Controlled Test 2', category: 'Test', totalMarks: 60, sbaWeighting: 15 },
        ]
      },
      {
        term: 4,
        assessments: [
          { code: 'TECH9-T4-PAT', title: 'Mini-PAT (Final)', category: 'Practical', totalMarks: 70, sbaWeighting: 35 },
          { code: 'TECH9-T4-EXAM', title: 'Final Examination', category: 'Examination', totalMarks: 100, sbaWeighting: 40 },
        ]
      }
    ],
    finalCalculation: {
      sbaWeighting: 60,
      examWeighting: 40
    }
  },
  'MLIT-GR10': {
    subject: 'Mathematical Literacy',
    grade: 10,
    curriculum: 'IEB',
    achievementLevels: CAPS_ACHIEVEMENT_LEVELS, // IEB uses same 1-7 scale for reporting to DHET/DBE
    terms: [
      {
        term: 1,
        assessments: [
          { code: 'MLIT10-T1-INV1', title: 'Investigation', category: 'Investigation', totalMarks: 50, sbaWeighting: 15 },
          { code: 'MLIT10-T1-TEST1', title: 'Standardised Test 1', category: 'Test', totalMarks: 60, sbaWeighting: 15 },
        ]
      },
      {
        term: 2,
        assessments: [
          { code: 'MLIT10-T2-PROJ', title: 'Project', category: 'Project', totalMarks: 50, sbaWeighting: 15 },
          { code: 'MLIT10-T2-EXAM', title: 'Mid-Year Examination', category: 'Examination', totalMarks: 100, sbaWeighting: 20 },
        ]
      },
      {
        term: 3,
        assessments: [
          { code: 'MLIT10-T3-ALT', title: 'Alternate Assessment', category: 'Assignment', totalMarks: 50, sbaWeighting: 15 },
          { code: 'MLIT10-T3-TEST2', title: 'Standardised Test 2', category: 'Test', totalMarks: 60, sbaWeighting: 15 },
        ]
      },
      {
        term: 4,
        assessments: [
          { code: 'MLIT10-T4-EXAM', title: 'Final Examination', category: 'Examination', totalMarks: 150, sbaWeighting: 100 },
        ]
      }
    ],
    finalCalculation: {
      sbaWeighting: 25, // IEB FET Phase often 25% SBA
      examWeighting: 75
    }
  },
  'MLIT-GR11': {
    subject: 'Mathematical Literacy',
    grade: 11,
    curriculum: 'IEB',
    achievementLevels: CAPS_ACHIEVEMENT_LEVELS,
    terms: [
      {
        term: 1,
        assessments: [
          { code: 'MLIT11-T1-INV1', title: 'Investigation', category: 'Investigation', totalMarks: 50, sbaWeighting: 15 },
          { code: 'MLIT11-T1-TEST1', title: 'Standardised Test 1', category: 'Test', totalMarks: 60, sbaWeighting: 15 },
        ]
      },
      {
        term: 2,
        assessments: [
          { code: 'MLIT11-T2-PROJ', title: 'Project', category: 'Project', totalMarks: 50, sbaWeighting: 15 },
          { code: 'MLIT11-T2-EXAM', title: 'Mid-Year Examination', category: 'Examination', totalMarks: 100, sbaWeighting: 20 },
        ]
      },
      {
        term: 3,
        assessments: [
          { code: 'MLIT11-T3-ALT', title: 'Alternate Assessment', category: 'Assignment', totalMarks: 50, sbaWeighting: 15 },
          { code: 'MLIT11-T3-TEST2', title: 'Standardised Test 2', category: 'Test', totalMarks: 60, sbaWeighting: 15 },
        ]
      },
      {
        term: 4,
        assessments: [
          { code: 'MLIT11-T4-EXAM', title: 'Final Examination', category: 'Examination', totalMarks: 150, sbaWeighting: 100 },
        ]
      }
    ],
    finalCalculation: {
      sbaWeighting: 25,
      examWeighting: 75
    }
  }
};
