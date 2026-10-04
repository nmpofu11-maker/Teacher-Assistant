import React, { useState } from 'react';
import { GradeClass, AssessmentTask, Subject } from '../types';
import { Learner, MarkEntry, Marksheet } from '../types/marks';
import { MOCK_LEARNERS } from '../data/learnerData';
import { ALL_ASSESSMENTS } from '../data/assessmentData';
import { MarksheetGrid } from './MarksheetGrid';
import { MarksheetAnalytics } from './MarksheetAnalytics';
import { LearnerPerformanceReport } from './LearnerPerformanceReport';
import { exportMarksheetTemplate, parseMarksheetUpload } from '../utils/marksheetExcelHandler';
import { ExcelMarksParser } from '../services/excelMarksParser';
import { 
  FileSpreadsheet, 
  Users, 
  ChevronRight, 
  Search, 
  Filter, 
  BarChart3, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Database,
  User,
  UploadCloud
} from 'lucide-react';

interface MarksheetHubProps {
  selectedClassFilter: GradeClass | 'ALL';
  setSelectedClassFilter: (cls: GradeClass | 'ALL') => void;
  marksheetData: Marksheet[];
  setMarksheetData: React.Dispatch<React.SetStateAction<Marksheet[]>>;
  onSaveMarks: (taskId: string, entries: MarkEntry[]) => void;
}

export const MarksheetHub: React.FC<MarksheetHubProps> = ({
  selectedClassFilter,
  setSelectedClassFilter,
  marksheetData,
  setMarksheetData,
  onSaveMarks
}) => {
  const [view, setView] = useState<'selection' | 'grid' | 'analytics' | 'learner-report'>('selection');
  const [selectedTask, setSelectedTask] = useState<AssessmentTask | null>(null);
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownloadBackup = () => {
    const dataStr = JSON.stringify(marksheetData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TeacherAssistant_Marks_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target?.result;
      if (data instanceof ArrayBuffer) {
        const parser = new ExcelMarksParser(data);
        const result = parser.parse();
        
        if (result.success && result.marksheet) {
          setMarksheetData(prev => {
            // Remove any existing sheet with same id ortaskId if it's a bulk one
            const filtered = prev.filter(s => s.id !== result.marksheet!.id);
            return [...filtered, result.marksheet!];
          });
          alert(`Success! Successfully parsed marksheet for ${result.marksheet.subject} Grade ${result.marksheet.classId}.\n\nImported ${result.learners.length} learners and ${result.assessments.length} assessment columns.`);
        } else {
          const errorList = result.errors.map(err => 
            `- ${err.severity === 'error' ? '❌' : '⚠️'} ${err.message}${err.row ? ` (Row ${err.row})` : ''}`
          ).join('\n');
          
          if (result.errors.some(err => err.severity === 'error')) {
            alert(`Import failed with errors:\n\n${errorList}`);
          } else {
            if (result.marksheet && window.confirm(`Import had warnings, but can proceed:\n\n${errorList}\n\nDo you want to import anyway?`)) {
              setMarksheetData(prev => [...prev, result.marksheet!]);
            }
          }
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const classes = [
    { id: '8A', label: 'Grade 8A', subject: 'Technology' },
    { id: '8B', label: 'Grade 8B', subject: 'Technology' },
    { id: '9A', label: 'Grade 9A', subject: 'Technology' },
    { id: '9B', label: 'Grade 9B', subject: 'Technology' },
    { id: '10', label: 'Grade 10', subject: 'Mathematical Literacy' },
    { id: '11', label: 'Grade 11', subject: 'Mathematical Literacy' },
    { id: '12', label: 'Grade 12', subject: 'Mathematical Literacy' },
  ];

  const filteredTasks = ALL_ASSESSMENTS.filter(task => {
    const matchesClass = selectedClassFilter === 'ALL' || task.gradeClass === selectedClassFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleSelectTask = (task: AssessmentTask) => {
    setSelectedTask(task);
    setView('grid');
  };

  const handleExport = () => {
    if (!selectedTask) return;
    const learners = MOCK_LEARNERS.filter(l => l.classId === selectedTask.gradeClass);
    exportMarksheetTemplate(learners, selectedTask);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedTask) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target?.result;
      if (data instanceof ArrayBuffer) {
        const result = await parseMarksheetUpload(data, selectedTask.id);
        if (result.success) {
          onSaveMarks(selectedTask.id, result.entries);
          alert(result.message);
        } else {
          alert(result.message);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const getTaskStatus = (taskId: string) => {
    const sheet = marksheetData.find(s => s.taskId === taskId);
    if (!sheet) return 'NOT_STARTED';
    const entered = sheet.entries.filter(e => e.rawMark !== null || e.status !== 'PRESENT').length;
    const total = MOCK_LEARNERS.filter(l => l.classId === sheet.classId).length;
    
    if (entered === 0) return 'NOT_STARTED';
    if (entered < total) return 'IN_PROGRESS';
    return 'COMPLETED';
  };

  if (view === 'learner-report' && selectedLearner) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setView(selectedTask ? 'grid' : 'selection')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {selectedTask ? 'Marksheet' : 'Selection'}
        </button>
        
        <LearnerPerformanceReport
          learner={selectedLearner}
          marksheetData={marksheetData}
          allAssessments={ALL_ASSESSMENTS}
        />
      </div>
    );
  }

  if (view === 'analytics') {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setView('selection')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment Selection
        </button>
        
        <MarksheetAnalytics
          marksheetData={marksheetData}
          allAssessments={ALL_ASSESSMENTS}
          selectedClassFilter={selectedClassFilter}
        />
      </div>
    );
  }

  if (view === 'grid' && selectedTask) {
    const learners = MOCK_LEARNERS.filter(l => l.classId === selectedTask.gradeClass);
    const existingSheet = marksheetData.find(s => s.taskId === selectedTask.id);
    const initialEntries = existingSheet ? existingSheet.entries : [];

    return (
      <div className="space-y-6">
        <button
          onClick={() => setView('selection')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment Selection
        </button>
        
        <MarksheetGrid
          learners={learners}
          task={selectedTask}
          initialEntries={initialEntries}
          onSave={(entries) => onSaveMarks(selectedTask.id, entries)}
          onExport={handleExport}
          onImport={handleImport}
          onViewLearner={(learner) => {
            setSelectedLearner(learner);
            setView('learner-report');
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 font-serif">Marksheets & Learner Records</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage assessment marks, track learner performance, and export schedules.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white dark:bg-[#1E2329] p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
            <Users className="w-4 h-4" />
            <span>{MOCK_LEARNERS.length} Registered Learners</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <FileSpreadsheet className="w-4 h-4" />
            <span>{ALL_ASSESSMENTS.length} Tasks Tracked</span>
          </div>
          <button
            onClick={handleDownloadBackup}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 transition"
            title="Download JSON Backup"
          >
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Backup</span>
          </button>
          
          <label className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition cursor-pointer">
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Bulk Import (Excel)</span>
            <input type="file" accept=".xlsx,.xls" className="hidden" onChange={handleBulkImport} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Controls */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#1E2329] rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Filter by Grade</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedClassFilter('ALL')}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedClassFilter === 'ALL'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                All Grades
              </button>
              {classes.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClassFilter(cls.id as GradeClass)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedClassFilter === cls.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{cls.label}</span>
                    <span className="text-[10px] opacity-70 uppercase">{cls.subject.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
            <BarChart3 className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
            <h3 className="text-lg font-bold mb-2">Grade Analysis</h3>
            <p className="text-emerald-100 text-xs leading-relaxed">
              Automated mark schedules and termly averages are calculated based on your entries.
            </p>
            <button 
              onClick={() => setView('analytics')}
              className="mt-4 w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold py-2 rounded-lg transition"
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* Task Selection Area */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by task title or code (e.g. TECH8-T1-CS1)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => {
                const status = getTaskStatus(task.id);
                
                return (
                  <button
                    key={task.id}
                    onClick={() => handleSelectTask(task)}
                    className="group bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-left transition-all hover:border-emerald-500/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        status === 'COMPLETED' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                        status === 'IN_PROGRESS' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                        'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{task.code}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Term {task.term} • Week {task.scheduledWeek}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5 group-hover:text-emerald-600 transition-colors">{task.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Grade {task.gradeClass} • {task.subject} • {task.totalMarks} Marks
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                          status === 'COMPLETED' ? 'text-emerald-600' :
                          status === 'IN_PROGRESS' ? 'text-blue-600' :
                          'text-slate-400'
                        }`}>
                          {status === 'COMPLETED' ? 'Marking Completed' :
                           status === 'IN_PROGRESS' ? 'Marking In Progress' :
                           'Ready for Entry'}
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          {status === 'COMPLETED' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> :
                           status === 'IN_PROGRESS' ? <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div> :
                           <AlertCircle className="w-4 h-4 text-slate-300" />}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="bg-slate-50 dark:bg-slate-900/20 rounded-3xl p-20 border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                <FileSpreadsheet className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No Assessments Found</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-2">
                  We couldn't find any assessments matching your current filters. Try selecting a different grade or clearing your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
