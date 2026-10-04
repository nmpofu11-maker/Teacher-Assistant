import React from 'react';
import { Learner, Marksheet, MarkEntry } from '../types/marks';
import { AssessmentTask } from '../types';
import { calculateAchievementLevel } from '../utils/marksheetAnalytics';
import { 
  User, 
  BookOpen, 
  Target, 
  Calendar, 
  FileText,
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';

interface LearnerPerformanceReportProps {
  learner: Learner;
  marksheetData: Marksheet[];
  allAssessments: AssessmentTask[];
}

export const LearnerPerformanceReport: React.FC<LearnerPerformanceReportProps> = ({
  learner,
  marksheetData,
  allAssessments
}) => {
  const learnerEntries = marksheetData.flatMap(sheet => {
    const entry = sheet.entries.find(e => e.learnerId === learner.id);
    if (!entry) return [];
    
    const task = allAssessments.find(a => a.id === sheet.taskId);
    if (!task) return [];
    
    return [{
      ...entry,
      taskTitle: task.title,
      totalMarks: task.totalMarks,
      term: task.term,
      code: task.code,
      percentage: entry.rawMark !== null ? (entry.rawMark / task.totalMarks) * 100 : null
    }];
  });

  const presentEntries = learnerEntries.filter(e => e.percentage !== null);
  const avgPercentage = presentEntries.length > 0 
    ? presentEntries.reduce((acc, e) => acc + e.percentage!, 0) / presentEntries.length 
    : 0;

  const achievementLevel = calculateAchievementLevel(avgPercentage);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Learner Profile Header */}
      <div className="bg-white dark:bg-[#1E2329] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <User className="w-10 h-10" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{learner.surname}, {learner.name}</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
              <BookOpen className="w-4 h-4" />
              Grade {learner.classId}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
              <FileText className="w-4 h-4" />
              ID: {learner.id}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Avg. Performance</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{avgPercentage.toFixed(1)}%</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 font-black text-xl">
            {achievementLevel}
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Assessment History</h4>
        </div>
        
        {learnerEntries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 italic">
            No marks recorded for this learner yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {learnerEntries.map((entry, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-slate-400 font-mono">{entry.code}</span>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">{entry.taskTitle}</h5>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Term {entry.term}
                    </span>
                    {entry.comment && (
                      <span className="flex items-center gap-1 italic text-slate-400">
                        "{entry.comment}"
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {entry.status === 'PRESENT' ? `${entry.rawMark} / ${entry.totalMarks}` : entry.status}
                    </div>
                    {entry.percentage !== null && (
                      <div className={`text-[10px] font-black ${
                        entry.percentage >= 80 ? 'text-emerald-500' : 
                        entry.percentage >= 40 ? 'text-slate-500' : 
                        'text-rose-500'
                      }`}>
                        {entry.percentage.toFixed(1)}% (L{calculateAchievementLevel(entry.percentage)})
                      </div>
                    )}
                  </div>
                  <div className={`w-1 h-10 rounded-full ${
                    entry.percentage && entry.percentage >= 80 ? 'bg-emerald-500' :
                    entry.percentage && entry.percentage >= 40 ? 'bg-blue-500' :
                    'bg-rose-500 opacity-30'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievement Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
          <Award className="w-5 h-5 text-blue-500 shrink-0" />
          <div>
            <h5 className="text-xs font-bold text-blue-900 dark:text-blue-100 uppercase mb-1">Achievement Focus</h5>
            <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed">
              Based on the average of {presentEntries.length} tasks, this learner is performing at **Level {achievementLevel}**. 
              {achievementLevel >= 5 ? ' Consistent performance suggests strong concept mastery.' : ' Targeted remediation is recommended to improve core subject knowledge.'}
            </p>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-slate-400 shrink-0" />
          <div>
            <h5 className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase mb-1">Consistency Audit</h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard deviation and trend analysis will be available in Phase 3. Manual intervention is advised for any learner dropping more than 15% between tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
