import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Calculator, 
  FileSpreadsheet, 
  HelpCircle, 
  ChevronRight, 
  ArrowUpRight,
  Info,
  Sliders,
  CheckSquare,
  Square,
  Printer,
  FileCheck2,
  ListTodo,
  UserCheck,
  Check
} from 'lucide-react';
import { AssessmentTask, GradeClass, Subject, PreModerationForm, PostModerationForm } from '../types';
import { ALL_ASSESSMENTS, IEB_APPENDICES } from '../data/assessmentData';
import { CLASSES_CONFIG } from '../data/atpData';
import { exportAssessmentTaskToDocx, exportIEBModerationPortfolioToDocx } from '../utils/docxGenerator';
import { 
  getPreModerationFormForTask, 
  savePreModerationForm, 
  getPostModerationFormForTask, 
  savePostModerationForm, 
  getModerationAlertForTask 
} from '../data/moderationData';
import { PreModerationModal } from './PreModerationModal';
import { PostModerationModal } from './PostModerationModal';
import confetti from 'canvas-confetti';

interface AssessmentHubProps {
  currentTerm: number;
  currentWeek: number;
  onAskAIChat: (prompt: string) => void;
  onNavigateToPlanner?: (classId: GradeClass, term: number, week: number) => void;
}

export const AssessmentHub: React.FC<AssessmentHubProps> = ({
  currentTerm,
  currentWeek,
  onAskAIChat,
}) => {
  // State for subject/grade selection and term filtering
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<'ALL' | 'TECH8' | 'TECH9' | 'MLIT10' | 'MLIT11' | 'MLIT12'>('MLIT12');
  const [selectedTermFilter, setSelectedTermFilter] = useState<number | 'ALL'>(currentTerm);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(ALL_ASSESSMENTS[4].id); // default to Grade 12 Task 1
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [showAppendixViewer, setShowAppendixViewer] = useState<boolean>(false);
  const [selectedAppendixId, setSelectedAppendixId] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'>('G');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Moderation Modals State
  const [isPreModModalOpen, setIsPreModModalOpen] = useState<boolean>(false);
  const [isPostModModalOpen, setIsPostModModalOpen] = useState<boolean>(false);
  const [currentPreModForm, setCurrentPreModForm] = useState<PreModerationForm | null>(null);
  const [currentPostModForm, setCurrentPostModForm] = useState<PostModerationForm | null>(null);
  const [moderationVersion, setModerationVersion] = useState<number>(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const subjectTabs = [
    { id: 'ALL', label: 'All 5 Subjects & Grades', icon: Layers, count: ALL_ASSESSMENTS.length, badge: 'Master Portfolio' },
    { id: 'TECH8', label: 'Technology Gr 8', icon: Cpu, count: ALL_ASSESSMENTS.filter(a => a.grade === 8).length, badge: 'CAPS & ATP' },
    { id: 'TECH9', label: 'Technology Gr 9', icon: Cpu, count: ALL_ASSESSMENTS.filter(a => a.grade === 9).length, badge: 'CAPS & ATP' },
    { id: 'MLIT10', label: 'Maths Literacy Gr 10', icon: Calculator, count: ALL_ASSESSMENTS.filter(a => a.grade === 10).length, badge: 'IEB Aligned' },
    { id: 'MLIT11', label: 'Maths Literacy Gr 11', icon: Calculator, count: ALL_ASSESSMENTS.filter(a => a.grade === 11).length, badge: 'IEB Aligned' },
    { id: 'MLIT12', label: 'Maths Literacy Gr 12', icon: ShieldCheck, count: ALL_ASSESSMENTS.filter(a => a.grade === 12).length, badge: 'IEB SAG 2025/2026' },
  ];

  // Filter tasks based on selected subject and term
  const filteredTasks = ALL_ASSESSMENTS.filter(task => {
    if (selectedSubjectFilter === 'TECH8' && task.grade !== 8) return false;
    if (selectedSubjectFilter === 'TECH9' && task.grade !== 9) return false;
    if (selectedSubjectFilter === 'MLIT10' && task.grade !== 10) return false;
    if (selectedSubjectFilter === 'MLIT11' && task.grade !== 11) return false;
    if (selectedSubjectFilter === 'MLIT12' && task.grade !== 12) return false;
    if (selectedTermFilter !== 'ALL' && task.term !== selectedTermFilter) return false;
    return true;
  });

  const currentTask = ALL_ASSESSMENTS.find(t => t.id === selectedTaskId) || filteredTasks[0] || ALL_ASSESSMENTS[0];
  const isSelectedIEB = currentTask.curriculumStandard.includes('IEB');

  // Toggle task completion
  const handleToggleTaskCompleted = (taskId: string) => {
    setCompletedTaskIds(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  // Download formal docx
  const handleDownloadTaskDocx = async (task: AssessmentTask) => {
    setIsExporting(true);
    try {
      const classInfo = CLASSES_CONFIG[task.gradeClass] || CLASSES_CONFIG['12'];
      const fileName = await exportAssessmentTaskToDocx(classInfo, task);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      showToast(`Exported printable task document: ${fileName}`);
    } catch (err) {
      console.error(err);
      showToast('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Download full IEB Moderation Portfolio with Appendices
  const handleDownloadIEBPortfolio = async (grade: number = 12) => {
    setIsExporting(true);
    try {
      const fileName = await exportIEBModerationPortfolioToDocx(grade);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 } });
      showToast(`Exported IEB SBA Moderation Dossier (${fileName})`);
    } catch (err) {
      console.error(err);
      showToast('Export failed.');
    } finally {
      setIsExporting(false);
    }
  };

  // Open Pre-Moderation modal
  const handleOpenPreModeration = (task: AssessmentTask) => {
    const form = getPreModerationFormForTask(task);
    setCurrentPreModForm(form);
    setIsPreModModalOpen(true);
  };

  // Save Pre-Moderation
  const handleSavePreModeration = (updatedForm: PreModerationForm) => {
    savePreModerationForm(updatedForm);
    setModerationVersion(v => v + 1);
    showToast(`Pre-Moderation form saved & SACE recorded successfully.`);
  };

  // Open Post-Moderation modal
  const handleOpenPostModeration = (task: AssessmentTask) => {
    const form = getPostModerationFormForTask(task);
    setCurrentPostModForm(form);
    setIsPostModModalOpen(true);
  };

  // Save Post-Moderation
  const handleSavePostModeration = (updatedForm: PostModerationForm) => {
    savePostModerationForm(updatedForm);
    setModerationVersion(v => v + 1);
    showToast(`Post-Moderation sample verified & saved successfully.`);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in duration-200">
          <div className="bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white dark:bg-[#20252B] rounded-2xl p-6 border border-[#DCDCD3] dark:border-[#323842] shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2F6F63] dark:bg-[#5EBAA4] text-white dark:text-[#181C21] flex items-center justify-center shadow-xs">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#1B2430] dark:text-[#EDEEE7] tracking-tight font-serif">
                    Assessment &amp; SBA Portfolio Master Hub
                  </h2>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E6EFEA] dark:bg-[#1A2E28] text-[#1D453D] dark:text-[#92DAC8] border border-[#B8D8CD] dark:border-[#2E584D]">
                    Termly Structured
                  </span>
                </div>
                <p className="text-xs text-[#4A5568] dark:text-[#A2A7B0]">
                  Technology (Grades 8–9 CAPS/ATP with Educator Timeline Bars &amp; Moderation Windows) • Mathematical Literacy (Grades 10–12 Official IEB SAG 2025/2026 Portfolio)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              id="export-ieb-appendices-btn"
              onClick={() => handleDownloadIEBPortfolio(12)}
              disabled={isExporting}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#F6F5F0] dark:bg-[#181C21] hover:bg-[#EAE8DF] dark:hover:bg-[#252B33] text-[#1B2430] dark:text-[#EDEEE7] text-xs font-semibold rounded-xl border border-[#DCDCD3] dark:border-[#323842] transition-all cursor-pointer shadow-xs"
            >
              <FileCheck2 className="w-4 h-4 text-[#35507C] dark:text-[#87AADE]" />
              <span>Export IEB Appendices A–G (.docx)</span>
            </button>
            <button
              id="view-appendices-toggle-btn"
              onClick={() => setShowAppendixViewer(!showAppendixViewer)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#2F6F63] hover:bg-[#25574E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{showAppendixViewer ? 'Hide IEB Forms' : 'Inspect IEB Appendices & AI Rules'}</span>
            </button>
          </div>
        </div>

        {/* Subject & Grade Filter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-5 border-t border-[#DCDCD3] dark:border-[#323842] mt-4">
          {subjectTabs.map(tab => {
            const isSelected = selectedSubjectFilter === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`filter-subject-${tab.id}`}
                onClick={() => {
                  setSelectedSubjectFilter(tab.id as any);
                  const firstMatch = ALL_ASSESSMENTS.find(t => {
                    if (tab.id === 'TECH8') return t.grade === 8;
                    if (tab.id === 'TECH9') return t.grade === 9;
                    if (tab.id === 'MLIT10') return t.grade === 10;
                    if (tab.id === 'MLIT11') return t.grade === 11;
                    if (tab.id === 'MLIT12') return t.grade === 12;
                    return true;
                  });
                  if (firstMatch) setSelectedTaskId(firstMatch.id);
                }}
                className={`flex flex-col text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B2430] dark:bg-[#EDEEE7] text-white dark:text-[#181C21] border-[#1B2430] dark:border-[#EDEEE7] shadow-xs'
                    : 'bg-[#F6F5F0] dark:bg-[#181C21] text-[#4A5568] dark:text-[#A2A7B0] border-[#DCDCD3] dark:border-[#323842] hover:bg-[#EAE8DF] dark:hover:bg-[#252B33]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D9A24B]' : 'text-[#717885] dark:text-[#8E949F]'}`} />
                  <span className={`text-[10px] px-1.5 py-0.2 font-mono rounded ${isSelected ? 'bg-white/20 text-white dark:bg-black/15 dark:text-[#181C21]' : 'bg-[#EAE8DF] dark:bg-[#252B33] text-[#717885] dark:text-[#8E949F]'}`}>
                    {tab.count} Tasks
                  </span>
                </div>
                <span className="text-xs font-bold mt-2 truncate">{tab.label}</span>
                <span className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-white/80 dark:text-[#181C21]/80' : 'text-[#717885] dark:text-[#8E949F]'}`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Term Filters */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-3 mt-3 border-t border-[#DCDCD3] dark:border-[#323842] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1B2430] dark:text-[#EDEEE7]">Term Filter:</span>
            <div className="flex items-center bg-[#F6F5F0] dark:bg-[#181C21] p-1 rounded-xl border border-[#DCDCD3] dark:border-[#323842]">
              {(['ALL', 1, 2, 3, 4] as const).map(t => (
                <button
                  key={t}
                  id={`term-filter-btn-${t}`}
                  onClick={() => setSelectedTermFilter(t)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedTermFilter === t
                      ? 'bg-[#2F6F63] dark:bg-[#5EBAA4] text-white dark:text-[#181C21] shadow-xs font-bold'
                      : 'text-[#4A5568] dark:text-[#A2A7B0] hover:text-[#1B2430] dark:hover:text-[#EDEEE7]'
                  }`}
                >
                  {t === 'ALL' ? 'All Terms' : `Term ${t}`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#4A5568] dark:text-[#A2A7B0] text-xs">
            <Clock className="w-4 h-4 text-[#2F6F63] dark:text-[#5EBAA4]" />
            <span>Current Term: <strong className="text-[#1B2430] dark:text-[#EDEEE7]">Term {currentTerm}</strong> • Week <strong className="text-[#1B2430] dark:text-[#EDEEE7]">{currentWeek}</strong></span>
          </div>
        </div>
      </div>

      {/* IEB Appendices & Forms Inspector Modal / Drawer */}
      {showAppendixViewer && (
        <div className="bg-gradient-to-br from-indigo-950/90 via-slate-900 to-[#0c1222] rounded-2xl p-6 border border-cyan-500/40 shadow-xl space-y-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  IEB Subject Assessment Guidelines (SAG) — Official Appendices & Administrative Forms
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Mandatory moderation and declaration files as prescribed by the Independent Examinations Board for Mathematical Literacy.
              </p>
            </div>
            <button
              onClick={() => setShowAppendixViewer(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Close
            </button>
          </div>

          {/* Appendix selector tabs */}
          <div className="flex flex-wrap gap-2">
            {IEB_APPENDICES.map(app => (
              <button
                key={app.appendixId}
                id={`appendix-tab-${app.appendixId}`}
                onClick={() => setSelectedAppendixId(app.appendixId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedAppendixId === app.appendixId
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Appendix {app.appendixId}
              </button>
            ))}
          </div>

          {/* Active Appendix Details */}
          {(() => {
            const app = IEB_APPENDICES.find(a => a.appendixId === selectedAppendixId)!;
            return (
              <div className="bg-slate-900/90 p-5 rounded-xl border border-indigo-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-cyan-300">
                    Appendix {app.appendixId}: {app.title}
                  </h4>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/40">
                    Mandatory IEB Form
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-400 block uppercase text-[10px]">Purpose:</span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">{app.purpose}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block uppercase text-[10px]">Structure & Implementation:</span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">{app.description}</p>
                  </div>
                </div>

                {/* Specific Visual Preview for Appendix G (AI Declaration) */}
                {app.appendixId === 'G' && (
                  <div className="mt-3 p-4 rounded-lg bg-[#0a0f1d] border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                      <span>APPENDIX G: LEARNER DECLARATION — USE OF AI IN ASSESSMENT TASKS</span>
                      <span className="text-[10px] text-amber-400">IEB SAG Page 22-23</span>
                    </div>
                    <p className="text-[11px] text-slate-300 italic">
                      "Candidate must complete the table below to declare any use of AI tools in their assessment tasks:"
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px] text-left border-collapse border border-slate-700">
                        <thead>
                          <tr className="bg-slate-800 text-slate-200">
                            <th className="p-2 border border-slate-700">Section of Task</th>
                            <th className="p-2 border border-slate-700">AI Tool Used</th>
                            <th className="p-2 border border-slate-700">Purpose of Use</th>
                            <th className="p-2 border border-slate-700">Extent of AI Use</th>
                            <th className="p-2 border border-slate-700">Candidate's Own Contribution</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-300">
                          <tr className="border-b border-slate-800">
                            <td className="p-2 border border-slate-700">e.g. Research, drafting, editing</td>
                            <td className="p-2 border border-slate-700">e.g. ChatGPT, Claude, Grammarly</td>
                            <td className="p-2 border border-slate-700">e.g. Idea generation, formula verification</td>
                            <td className="p-2 border border-slate-700">e.g. Light, Moderate, Extensive</td>
                            <td className="p-2 border border-slate-700">e.g. Wrote all the content, performed calculations</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() =>
                      onAskAIChat(`Please explain the requirements for filling out IEB ${app.title} (Appendix ${app.appendixId}) and provide an exemplar template for Mathematical Literacy Grade 12.`)
                    }
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI Assistant to Generate Filled Exemplar for Appendix {app.appendixId}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadIEBPortfolio(12)}
                    className="flex items-center gap-1.5 text-xs text-white bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 rounded-lg font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Appendices Word Template</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Main Grid: Left Column Task List with Timeline, Right Column Active Task Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tasks Overview & Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Assessment Schedule & Milestones ({filteredTasks.length})
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {completedTaskIds.length} completed
            </span>
          </div>

          <div className="space-y-3">
            {filteredTasks.map(task => {
              const isSelected = task.id === currentTask.id;
              const isCompleted = completedTaskIds.includes(task.id);
              const isTechnology = task.subject === 'Technology';
              const isTaskActiveThisTerm = task.term === currentTerm;

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-white dark:bg-[#0f172a] border-indigo-500 dark:border-cyan-400 shadow-md dark:shadow-[0_0_18px_rgba(6,182,212,0.25)] ring-1 ring-indigo-500/50'
                      : 'bg-white dark:bg-[#0c1222]/80 border-slate-200 dark:border-indigo-500/20 hover:border-slate-300 dark:hover:border-indigo-500/50'
                  }`}
                >
                  {/* Task Top Meta */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleTaskCompleted(task.id);
                        }}
                        className="text-slate-400 hover:text-emerald-500 cursor-pointer"
                      >
                        {isCompleted ? (
                          <CheckSquare className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                        )}
                      </button>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        isTechnology
                          ? 'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/60'
                          : 'bg-cyan-100 dark:bg-cyan-950/90 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/60'
                      }`}>
                        {task.code}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {task.totalMarks} Marks
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold">
                        SBA: {task.sbaWeightingPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Title & Subject */}
                  <div>
                    <h4 className={`text-xs font-bold leading-snug ${isSelected ? 'text-indigo-600 dark:text-cyan-300' : 'text-slate-900 dark:text-white'}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <span>{task.subject} Gr {task.grade}</span>
                      <span>•</span>
                      <span>Term {task.term}, Week {task.scheduledWeek}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{task.category}</span>
                    </div>
                  </div>

                  {/* Visual Date Bar / Milestone Progress Bar */}
                  <div className="pt-2 border-t border-slate-100 dark:border-indigo-500/15 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyan-500" />
                        Target: Week {task.scheduledWeek} ({task.targetDate})
                      </span>
                      {isTaskActiveThisTerm && (
                        <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Active Term
                        </span>
                      )}
                    </div>

                    {/* Visual bar across the 11-week term */}
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isTechnology
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                            : 'bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(10, (task.scheduledWeek / 11) * 100))}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                      <span>W1 Hook</span>
                      <span>W4 Prep Alert</span>
                      <span className="text-cyan-500 font-bold">W{task.scheduledWeek} Issue</span>
                      <span>W11 Moderation</span>
                    </div>

                    {/* Moderation Stage Quick Actions & Statuses */}
                    <div className="flex items-center justify-between pt-1 gap-1 text-[10px]" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenPreModeration(task)}
                        className={`px-2 py-0.5 rounded-lg border font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          getPreModerationFormForTask(task).status === 'APPROVED'
                            ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40'
                            : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-cyan-300 border-indigo-200 dark:border-indigo-500/40 hover:bg-indigo-100'
                        }`}
                        title="Open Pre-Moderation Form"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>Pre-Mod: {getPreModerationFormForTask(task).status === 'APPROVED' ? 'Approved' : 'In Review'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenPostModeration(task)}
                        className={`px-2 py-0.5 rounded-lg border font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          getPostModerationFormForTask(task).status === 'MODERATION_APPROVED'
                            ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                        }`}
                        title="Open Post-Moderation Form"
                      >
                        <FileCheck2 className="w-3 h-3" />
                        <span>Post-Mod: {getPostModerationFormForTask(task).status === 'MODERATION_APPROVED' ? 'Verified' : 'Sample Due'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Assessment File Detail & Educator Prompter (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Task Card */}
          <div className="bg-white dark:bg-[#0c1222]/90 rounded-2xl p-6 border border-slate-200 dark:border-indigo-500/30 shadow-sm dark:shadow-[0_0_25px_rgba(99,102,241,0.15)] space-y-5 backdrop-blur-sm">
            {/* Top Bar with Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-indigo-500/20 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-cyan-300 border border-indigo-200 dark:border-indigo-500/40 font-mono">
                    {currentTask.code}
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isSelectedIEB 
                      ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300' 
                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {currentTask.curriculumStandard}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {currentTask.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  id="export-task-docx-btn"
                  onClick={() => handleDownloadTaskDocx(currentTask)}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-500 text-white text-xs font-semibold rounded-xl shadow-xs dark:shadow-[0_0_14px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Generating...' : 'Download Task (.docx)'}</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-indigo-500/20">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Total Marks</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white">{currentTask.totalMarks} Marks</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-indigo-500/20">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">SBA Weighting</span>
                <span className="text-base font-extrabold text-cyan-600 dark:text-cyan-300">{currentTask.sbaWeightingPercentage}% ({currentTask.sbaContributionMarks} marks)</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-indigo-500/20">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Duration</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentTask.duration}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-indigo-500/20">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Scheduled Time</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Term {currentTask.term} • W{currentTask.scheduledWeek}</span>
              </div>
            </div>

            {/* Educator Timely Prompting System Alert Box */}
            <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-indigo-950/60 p-4 rounded-xl border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 animate-pulse" />
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                    Automated Timely Educator Prompter
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Stage: Preparation & Verification</span>
              </div>

              <div className="space-y-2.5">
                {currentTask.educatorPrompts.map((prompt, idx) => (
                  <div key={idx} className="bg-[#0b101f] p-3 rounded-lg border border-indigo-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300">{prompt.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {prompt.triggerDateStr}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{prompt.message}</p>
                    
                    {/* Checklist */}
                    <div className="space-y-1 pt-1 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Educator Checklist:</span>
                      <ul className="text-[11px] space-y-1 text-slate-300">
                        {prompt.checklist.map((item, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick AI Run */}
                    <button
                      onClick={() => onAskAIChat(prompt.suggestedAIPrompt)}
                      className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-indigo-950 hover:bg-indigo-900 text-cyan-300 text-xs font-semibold rounded-lg border border-indigo-500/30 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ask AI: "{prompt.suggestedAIPrompt}"</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pre- & Post-Moderation Official Timeline & Form Hub */}
            <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-cyan-950/80 p-5 rounded-2xl border border-cyan-500/30 space-y-4 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Official Pre- & Post-Moderation Quality Assurance Workflow
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      Statutory timelines & formal sign-offs for {currentTask.code}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/80 text-cyan-300 border border-indigo-500/40">
                    SACE & IEB Quality Standard
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pre-Moderation Card */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-indigo-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        Stage 1: Pre-Moderation Form
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        getPreModerationFormForTask(currentTask).status === 'APPROVED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}>
                        {getPreModerationFormForTask(currentTask).status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      <strong className="text-white">Official Timeline:</strong> 14 to 21 calendar days prior to administration (Target: {getPreModerationFormForTask(currentTask).officialAcceptableWindow}).
                    </p>
                    <div className="text-[10px] text-slate-400 space-y-0.5 pt-1">
                      <div>• Moderator: <span className="text-slate-200">{getPreModerationFormForTask(currentTask).moderatorName} ({getPreModerationFormForTask(currentTask).moderatorRole})</span></div>
                      <div>• Signed: <span className="text-emerald-400">{getPreModerationFormForTask(currentTask).signatureVerified ? 'Verified & SACE Recorded' : 'Pending Signature'}</span></div>
                    </div>
                  </div>

                  <button
                    id={`open-pre-mod-${currentTask.id}`}
                    onClick={() => handleOpenPreModeration(currentTask)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Complete / Edit Pre-Moderation Form</span>
                  </button>
                </div>

                {/* Post-Moderation Card */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-indigo-500/30 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        Stage 2: Post-Moderation Audit
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        getPostModerationFormForTask(currentTask).status === 'MODERATION_APPROVED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                      }`}>
                        {getPostModerationFormForTask(currentTask).status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      <strong className="text-white">Official Timeline:</strong> 3 to 7 working days following marking (Target: {getPostModerationFormForTask(currentTask).officialAcceptableWindow}).
                    </p>
                    <div className="text-[10px] text-slate-400 space-y-0.5 pt-1">
                      <div>• 10% Sample: <span className="text-slate-200">{getPostModerationFormForTask(currentTask).sampleSize} Scripts Checked (Top/Mid/Bot)</span></div>
                      <div>• Mark Adjustment: <span className="text-amber-300">{getPostModerationFormForTask(currentTask).markAdjustmentSuggested ? 'Adjustment Proposed' : 'Original Upheld'}</span></div>
                    </div>
                  </div>

                  <button
                    id={`open-post-mod-${currentTask.id}`}
                    onClick={() => handleOpenPostModeration(currentTask)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>Complete / Edit Post-Moderation Form</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cognitive Taxonomy Weighting Bar (Bloom's Taxonomy) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Cognitive Weighting Breakdown (Bloom's Taxonomy)
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  IEB / CAPS Standard Aligned
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
                <div className="bg-sky-50 dark:bg-sky-950/60 p-2 rounded-lg border border-sky-200 dark:border-sky-500/30">
                  <span className="text-[10px] text-sky-600 dark:text-sky-300 block">Level 1: Knowing</span>
                  <span className="text-sm font-bold text-sky-700 dark:text-sky-200">{currentTask.cognitiveWeighting.level1_knowing}%</span>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/60 p-2 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-300 block">Level 2: Routine</span>
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-200">{currentTask.cognitiveWeighting.level2_routine}%</span>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/60 p-2 rounded-lg border border-amber-200 dark:border-amber-500/30">
                  <span className="text-[10px] text-amber-600 dark:text-amber-300 block">Level 3: Multi-step</span>
                  <span className="text-sm font-bold text-amber-700 dark:text-amber-200">{currentTask.cognitiveWeighting.level3_complex}%</span>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/60 p-2 rounded-lg border border-purple-200 dark:border-purple-500/30">
                  <span className="text-[10px] text-purple-600 dark:text-purple-300 block">Level 4: Reasoning</span>
                  <span className="text-sm font-bold text-purple-700 dark:text-purple-200">{currentTask.cognitiveWeighting.level4_reasoning}%</span>
                </div>
              </div>
            </div>

            {/* Scenario & Questions Section */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-cyan-300 uppercase tracking-wide mb-1">
                  Context & Scenario Brief
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200 dark:border-indigo-500/20">
                  {currentTask.scenarioOrBrief}
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-cyan-300 uppercase tracking-wide">
                  Question Items & Marking Guides ({currentTask.questions.length} Questions)
                </h4>
                <div className="space-y-2.5">
                  {currentTask.questions.map(q => (
                    <div
                      key={q.id}
                      className="bg-slate-50 dark:bg-[#0b101e] p-3.5 rounded-xl border border-slate-200 dark:border-indigo-500/20 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          Question {q.id}: {q.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-cyan-300 font-semibold">
                            {q.cognitiveLevel}
                          </span>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            [{q.marks} Marks]
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {q.description}
                      </p>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-white dark:bg-slate-900/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                        <strong className="text-slate-700 dark:text-slate-300 not-italic">Marking Guideline: </strong>
                        {q.markingCriteriaSnippet}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memorandum & Guidelines */}
              <div className="bg-slate-50 dark:bg-slate-900/90 p-4 rounded-xl border border-slate-200 dark:border-indigo-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Marking Memorandum & Moderation Guidelines
                  </h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Concept Marking</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentTask.markingRubricOrMemo}
                </p>
              </div>

              {/* Required Appendices Checklist if IEB */}
              {currentTask.iebAppendicesRequired && (
                <div className="bg-indigo-50/50 dark:bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900 dark:text-cyan-300">
                      Mandatory IEB Portfolio Forms Required for this Task:
                    </span>
                    <button
                      onClick={() => setShowAppendixViewer(true)}
                      className="text-[11px] text-cyan-400 hover:underline font-semibold cursor-pointer"
                    >
                      View Forms
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentTask.iebAppendicesRequired.map(app => (
                      <span key={app} className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-indigo-500/30 font-mono">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Assistance Prompt Shortcuts */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-indigo-500/20">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block uppercase">
                  AI Teaching Assistant Assessment Prompts:
                </span>
                <div className="space-y-1.5">
                  {currentTask.aiAssistancePrompts.map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => onAskAIChat(`Regarding ${currentTask.title} (${currentTask.code}): ${prompt}`)}
                      className="w-full text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/80 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between group transition-all border border-slate-200 dark:border-indigo-500/20 cursor-pointer"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{prompt}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Moderation Modal */}
      {isPreModModalOpen && currentPreModForm && (
        <PreModerationModal
          task={currentTask}
          initialForm={currentPreModForm}
          isOpen={isPreModModalOpen}
          onClose={() => setIsPreModModalOpen(false)}
          onSave={handleSavePreModeration}
          onAskAI={onAskAIChat}
        />
      )}

      {/* Post-Moderation Modal */}
      {isPostModModalOpen && currentPostModForm && (
        <PostModerationModal
          task={currentTask}
          initialForm={currentPostModForm}
          isOpen={isPostModModalOpen}
          onClose={() => setIsPostModModalOpen(false)}
          onSave={handleSavePostModeration}
          onAskAI={onAskAIChat}
        />
      )}
    </div>
  );
};
