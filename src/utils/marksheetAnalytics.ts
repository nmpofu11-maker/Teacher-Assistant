import { Marksheet, MarkEntry, AchievementLevel } from '../types/marks';

export interface MarksheetStats {
  classId: string;
  subject: string;
  term: number;
  totalLearners: number;
  enteredCount: number;
  absentCount: number;
  passCount: number;
  failCount: number;
  passRate: number;
  averagePercentage: number;
  achievementDistribution: Record<AchievementLevel, number>;
}

export function calculateAchievementLevel(percentage: number): AchievementLevel {
  if (percentage >= 80) return 7;
  if (percentage >= 70) return 6;
  if (percentage >= 60) return 5;
  if (percentage >= 50) return 4;
  if (percentage >= 40) return 3;
  if (percentage >= 30) return 2;
  return 1;
}

export function calculateMarksheetStats(marksheet: Marksheet, totalMarks: number): MarksheetStats {
  const entries = marksheet.entries;
  const enteredEntries = entries.filter(e => e.status === 'PRESENT' && e.rawMark !== null);
  const absentEntries = entries.filter(e => e.status === 'ABSENT' || e.status === 'MEDICAL');
  
  let totalPercentage = 0;
  let passCount = 0;
  let failCount = 0;
  
  const distribution: Record<AchievementLevel, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
  };

  enteredEntries.forEach(entry => {
    const percentage = (entry.rawMark! / totalMarks) * 100;
    totalPercentage += percentage;
    
    const level = calculateAchievementLevel(percentage);
    distribution[level]++;
    
    if (percentage >= 40) { // Standard CAPS pass mark usually 40% for subject
      passCount++;
    } else {
      failCount++;
    }
  });

  const enteredCount = enteredEntries.length;

  return {
    classId: marksheet.classId,
    subject: marksheet.subject,
    term: marksheet.term,
    totalLearners: marksheet.entries.length,
    enteredCount,
    absentCount: absentEntries.length,
    passCount,
    failCount,
    passRate: enteredCount > 0 ? (passCount / enteredCount) * 100 : 0,
    averagePercentage: enteredCount > 0 ? totalPercentage / enteredCount : 0,
    achievementDistribution: distribution
  };
}
