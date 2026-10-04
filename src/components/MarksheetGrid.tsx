import React, { useState } from 'react';
import { Learner, MarkEntry, MarkStatus } from '../types/marks';
import { AssessmentTask } from '../types';
import { User, AlertCircle, Save, Download, Upload, CheckCircle2 } from 'lucide-react';

interface MarksheetGridProps {
  learners: Learner[];
  task: AssessmentTask;
  initialEntries: MarkEntry[];
  onSave: (entries: MarkEntry[]) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onViewLearner: (learner: Learner) => void;
}

export const MarksheetGrid: React.FC<MarksheetGridProps> = ({
  learners,
  task,
  initialEntries,
  onSave,
  onExport,
  onImport,
  onViewLearner
}) => {
  const [entries, setEntries] = useState<MarkEntry[]>(initialEntries);
  const [hasChanges, setHasChanges] = useState(false);

  const getEntry = (learnerId: string) => {
    return entries.find(e => e.learnerId === learnerId) || {
      learnerId,
      taskId: task.id,
      rawMark: null,
      status: 'PRESENT' as MarkStatus,
      comment: '',
      lastModified: new Date().toISOString()
    };
  };

  const updateEntry = (learnerId: string, updates: Partial<MarkEntry>) => {
    setEntries(prev => {
      const existingIdx = prev.findIndex(e => e.learnerId === learnerId);
      const now = new Date().toISOString();
      let newEntries = [...prev];

      if (existingIdx >= 0) {
        newEntries[existingIdx] = { ...prev[existingIdx], ...updates, lastModified: now };
      } else {
        newEntries.push({
          learnerId,
          taskId: task.id,
          rawMark: null,
          status: 'PRESENT',
          comment: '',
          lastModified: now,
          ...updates
        });
      }
      return newEntries;
    });
    setHasChanges(true);
  };

  const calculatePercentage = (rawMark: number | null) => {
    if (rawMark === null || task.totalMarks === 0) return null;
    return ((rawMark / task.totalMarks) * 100).toFixed(1);
  };

  const getMarkColor = (percentage: string | null) => {
    if (!percentage) return 'text-slate-400';
    const p = parseFloat(percentage);
    if (p >= 80) return 'text-emerald-600 font-bold';
    if (p >= 50) return 'text-slate-900 font-semibold';
    if (p >= 40) return 'text-amber-600 font-semibold';
    return 'text-rose-600 font-bold';
  };

  return (
    <div className="bg-white dark:bg-[#1E2329] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{task.title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {task.subject} • Grade {task.gradeClass} • Total Marks: <span className="font-bold text-slate-900 dark:text-white">{task.totalMarks}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm"
          >
            <Download className="w-4 h-4 text-blue-500" />
            <span>Excel Template</span>
          </button>
          
          <label className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm cursor-pointer">
            <Upload className="w-4 h-4 text-purple-500" />
            <span>Import Marks</span>
            <input type="file" accept=".xlsx,.xls" className="hidden" onChange={onImport} />
          </label>

          <button
            onClick={() => {
              onSave(entries);
              setHasChanges(false);
            }}
            disabled={!hasChanges}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-bold rounded-lg transition shadow-sm ${
              hasChanges 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-800">Learner</th>
              <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 w-32">Status</th>
              <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 w-32">Raw Mark</th>
              <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-800 w-24">%</th>
              <th className="px-6 py-3 border-b border-slate-200 dark:border-slate-800">Comments / Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {learners.map((learner) => {
              const entry = getEntry(learner.id);
              const percentage = calculatePercentage(entry.rawMark);
              
              return (
                <tr key={learner.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onViewLearner(learner)}
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors cursor-pointer"
                        title="View Learner Report"
                      >
                        <User className="w-4 h-4" />
                      </button>
                      <div 
                        className="cursor-pointer group"
                        onClick={() => onViewLearner(learner)}
                      >
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
                          {learner.surname}, {learner.name}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          {learner.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <select
                      value={entry.status}
                      onChange={(e) => updateEntry(learner.id, { status: e.target.value as MarkStatus })}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-xs font-semibold focus:ring-1 focus:ring-emerald-500 outline-none transition"
                    >
                      <option value="PRESENT">Present</option>
                      <option value="ABSENT">Absent</option>
                      <option value="MEDICAL">Medical</option>
                      <option value="NOT_HANDED_IN">NHI</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <div className="relative">
                      <input
                        type="number"
                        disabled={entry.status !== 'PRESENT'}
                        value={entry.rawMark === null ? '' : entry.rawMark}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : parseFloat(e.target.value);
                          if (val !== null && (val < 0 || val > task.totalMarks)) return;
                          updateEntry(learner.id, { rawMark: val });
                        }}
                        className={`w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-1 text-sm font-bold focus:ring-1 focus:ring-emerald-500 outline-none transition ${
                          entry.status !== 'PRESENT' ? 'opacity-30 cursor-not-allowed' : ''
                        }`}
                        placeholder="0.0"
                      />
                      {entry.rawMark !== null && entry.rawMark > task.totalMarks && (
                        <div className="absolute -top-6 left-0 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded shadow-lg flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Exceeds max
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className={`text-sm font-mono ${getMarkColor(percentage)}`}>
                      {entry.status === 'PRESENT' ? (percentage ? `${percentage}%` : '---') : entry.status}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={entry.comment || ''}
                      onChange={(e) => updateEntry(learner.id, { comment: e.target.value })}
                      placeholder="e.g. Remediation required"
                      className="w-full bg-transparent border-b border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-emerald-500 outline-none text-xs text-slate-600 dark:text-slate-400 py-1 transition"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>80%+ Exceptional</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span>40-50% At Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <span>Below 40% Remediation</span>
          </div>
        </div>
        
        {hasChanges && (
          <div className="flex items-center gap-2 text-amber-600 font-bold animate-pulse">
            <AlertCircle className="w-4 h-4" />
            Unsaved Changes
          </div>
        )}
      </div>
    </div>
  );
};
