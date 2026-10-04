import React from 'react';
import { Marksheet, AchievementLevel } from '../types/marks';
import { AssessmentTask } from '../types';
import { calculateMarksheetStats, MarksheetStats } from '../utils/marksheetAnalytics';
import { 
  TrendingUp, 
  Users, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  PieChart, 
  BarChart, 
  Info
} from 'lucide-react';

interface MarksheetAnalyticsProps {
  marksheetData: Marksheet[];
  allAssessments: AssessmentTask[];
  selectedClassFilter: string;
}

export const MarksheetAnalytics: React.FC<MarksheetAnalyticsProps> = ({
  marksheetData,
  allAssessments,
  selectedClassFilter
}) => {
  const filteredSheets = marksheetData.filter(s => 
    selectedClassFilter === 'ALL' || s.classId === selectedClassFilter
  );

  const statsList: (MarksheetStats & { taskTitle: string; totalMarks: number })[] = filteredSheets.map(sheet => {
    const task = allAssessments.find(a => a.id === sheet.taskId);
    if (!task) return null;
    return {
      ...calculateMarksheetStats(sheet, task.totalMarks),
      taskTitle: task.title,
      totalMarks: task.totalMarks
    };
  }).filter((s): s is MarksheetStats & { taskTitle: string; totalMarks: number } => s !== null);

  if (statsList.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900/20 rounded-3xl p-12 border border-slate-200 dark:border-slate-800 text-center">
        <PieChart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No Data for Analytics</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-2">
          Start entering marks for assessments to generate real-time pass rates and achievement distributions.
        </p>
      </div>
    );
  }

  const overallPassRate = statsList.reduce((acc, s) => acc + s.passRate, 0) / statsList.length;
  const overallAvg = statsList.reduce((acc, s) => acc + s.averagePercentage, 0) / statsList.length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1E2329] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Avg. Pass Rate</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">{overallPassRate.toFixed(1)}%</h4>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <TrendingUp className="w-20 h-20 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E2329] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Cohort Average</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">{overallAvg.toFixed(1)}%</h4>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Target className="w-20 h-20 text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E2329] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Tasks Tracked</p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">{statsList.length}</h4>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Users className="w-20 h-20 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Task Performance List */}
      <div className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Performance by Assessment</h3>
          </div>
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5">
            <Info className="w-3 h-3" />
            Relative to Class Pass Mark (40%)
          </div>
        </div>
        
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {statsList.map((stat, i) => (
            <div key={i} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                      {stat.classId}
                    </span>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">{stat.taskTitle}</h5>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {stat.enteredCount} / {stat.totalLearners} Entered
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {stat.passCount} Passed
                    </span>
                    {stat.failCount > 0 && (
                      <span className="flex items-center gap-1 text-rose-500">
                        <AlertTriangle className="w-3 h-3" />
                        {stat.failCount} At Risk
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-8 min-w-[240px]">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[10px] font-bold mb-1.5 uppercase">
                      <span className="text-slate-400">Pass Rate</span>
                      <span className={stat.passRate >= 75 ? 'text-emerald-500' : stat.passRate >= 40 ? 'text-amber-500' : 'text-rose-500'}>
                        {stat.passRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          stat.passRate >= 75 ? 'bg-emerald-500' : stat.passRate >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${stat.passRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-right w-16">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Avg %</div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {stat.averagePercentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Levels Distribution Mini Bars */}
              <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                <div className="flex items-center gap-1 h-3">
                  {[7, 6, 5, 4, 3, 2, 1].map(level => {
                    const count = (stat.achievementDistribution as any)[level];
                    if (count === 0) return null;
                    const width = (count / stat.enteredCount) * 100;
                    const colors: any = {
                      7: 'bg-emerald-600',
                      6: 'bg-emerald-500',
                      5: 'bg-blue-500',
                      4: 'bg-blue-400',
                      3: 'bg-amber-500',
                      2: 'bg-rose-400',
                      1: 'bg-rose-600'
                    };
                    return (
                      <div 
                        key={level}
                        className={`${colors[level]} h-full first:rounded-l-full last:rounded-r-full transition-all duration-500`}
                        style={{ width: `${width}%` }}
                        title={`Level ${level}: ${count} Learners`}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-1 text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span>L1 (Fail)</span>
                  <div className="flex gap-2">
                    <span className="text-emerald-500">L7 (Distinction)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
