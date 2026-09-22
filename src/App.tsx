import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  GradeClass, 
  TimetableSlot, 
  ATPItem, 
  ClassInfo 
} from './types';
import { MASTER_TIMETABLE_SLOTS } from './data/timetableData';
import { CLASSES_CONFIG, MASTER_ATP_DATA } from './data/atpData';
import { AI_PROMPT_TEMPLATES } from './data/aiPromptsData';
import { exportMasterTimetableExcel, getATPForClassAndWeek } from './utils/excelHandler';
import { exportAIPromptsToDocx, exportWorksheetToDocx, exportLessonPlanToDocx } from './utils/docxGenerator';
import { exportLessonToPPTX, generate45MinLessonSlides } from './utils/pptxGenerator';

import { Navbar } from './components/Navbar';
import { TimetableGrid } from './components/TimetableGrid';
import { LessonPlanner } from './components/LessonPlanner';
import { SlideDeckViewer } from './components/SlideDeckViewer';
import { WorksheetViewer } from './components/WorksheetViewer';
import { ATPExplorer } from './components/ATPExplorer';
import { AIPromptLibrary } from './components/AIPromptLibrary';
import { AIChatAssistant } from './components/AIChatAssistant';
import { IEBResourceLibrary } from './components/IEBResourceLibrary';
import { AssessmentHub } from './components/AssessmentHub';
import { ExcelSyncModal } from './components/ExcelSyncModal';
import { LearningModelsHub } from './components/LearningModelsHub';
import { CalendarAlignmentModal } from './components/CalendarAlignmentModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { IEBResource } from './types';
import { detectAcademicPeriod, getAcademicWeekInfo } from './data/calendarData';

import { 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Presentation, 
  FileCheck, 
  BookOpen, 
  FileSpreadsheet, 
  FileText,
  AlertCircle,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('timetable');
  const [selectedClassFilter, setSelectedClassFilter] = useState<GradeClass | 'ALL'>('ALL');
  const [selectedClassForDetail, setSelectedClassForDetail] = useState<GradeClass>('8A');
  const [selectedTerm, setSelectedTerm] = useState<number>(1);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [academicYear, setAcademicYear] = useState<number>(2026);
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>(MASTER_TIMETABLE_SLOTS);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const activeWeekInfo = getAcademicWeekInfo(selectedTerm, selectedWeek, academicYear);

  const handleJumpToCurrentAcademicWeek = () => {
    const period = detectAcademicPeriod();
    if (period.isSchoolTerm) {
      setSelectedTerm(period.term);
      setSelectedWeek(period.week);
      setAcademicYear(period.year);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      showToast(`Synchronized to Live Academic Week: Term ${period.term}, Week ${period.week} (${period.year})`, 'success');
    } else {
      showToast(`School is currently in recess (${period.statusNote}). Showing Term ${selectedTerm}, Week ${selectedWeek}.`, 'info');
    }
  };

  const handleSelectWeekFromCalendar = (term: number, week: number, year: number) => {
    setSelectedTerm(term);
    setSelectedWeek(week);
    setAcademicYear(year);
    showToast(`Aligned timetable and ATP to Term ${term}, Week ${week} (${year})`, 'success');
  };
  
  // Dark Mode State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('mpofu_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('mpofu_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Export Complete Excel Master Timetable & Class Sheets
  const handleExportMasterExcel = () => {
    try {
      const fileName = exportMasterTimetableExcel(timetableSlots, selectedTerm, selectedWeek);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
      showToast(`Exported master timetable workbook: ${fileName}`, 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Failed to export Excel timetable', 'info');
    }
  };

  // Export AI Prompts Master Document
  const handleExportPromptsWord = async () => {
    try {
      const fileName = await exportAIPromptsToDocx(AI_PROMPT_TEMPLATES);
      showToast(`Exported AI prompt library: ${fileName}`, 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Failed to export Prompts document', 'info');
    }
  };

  // From Timetable Slot Click -> Open Lesson Plan
  const handleSelectLessonFromTimetable = (slot: TimetableSlot, atp: ATPItem) => {
    if (slot.targetClassId) {
      setSelectedClassForDetail(slot.targetClassId);
    }
    setActiveTab('planner');
  };

  // 1-Click Quick Generate Slides from Timetable
  const handleQuickGenerateSlides = async (slot: TimetableSlot, atp: ATPItem) => {
    const classId = slot.targetClassId || '8A';
    const classInfo = CLASSES_CONFIG[classId];
    try {
      const fileName = await exportLessonToPPTX(classInfo, atp);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
      showToast(`Generated 45-min PowerPoint slides: ${fileName}`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate slides', 'info');
    }
  };

  // 1-Click Quick Generate Worksheet from Timetable
  const handleQuickGenerateWorksheet = async (slot: TimetableSlot, atp: ATPItem) => {
    const classId = slot.targetClassId || '8A';
    const classInfo = CLASSES_CONFIG[classId];
    try {
      // Create quick worksheet
      const wsData = {
        id: `ws-${classId}`,
        lessonPlanId: `plan-${classId}`,
        title: `${classInfo.name}: ${atp.capsTopic}`,
        subject: classInfo.subject,
        grade: classInfo.grade,
        term: selectedTerm,
        week: selectedWeek,
        totalMarks: 25,
        estimatedMinutes: 45,
        instructions: ['Answer all questions.', 'Show all calculation working and formulas.'],
        questions: [
          {
            questionNumber: 1,
            contextText: `Classroom assessment for ${atp.capsTopic} adhering to CAPS requirements.`,
            subQuestions: [
              { id: '1.1', text: `Define the primary concept of ${atp.coreConcepts[0] || 'the topic'}.`, marks: 4, cognitiveLevel: 'Level 1: Knowing' },
              { id: '1.2', text: `Calculate or describe standard procedure for ${atp.coreConcepts[1] || 'practical application'}.`, marks: 7, cognitiveLevel: 'Level 2: Routine' },
              { id: '1.3', text: `Solve a multi-step scenario problem based on given parameters.`, marks: 8, cognitiveLevel: 'Level 3: Complex' },
              { id: '1.4', text: `Evaluate and justify design/financial decisions under constraints.`, marks: 6, cognitiveLevel: 'Level 4: Reasoning' },
            ],
          },
        ],
        memorandum: [
          { questionNumber: 1, subId: '1.1', stepByStepSolution: 'Accurate definition and technical terminology ✓✓✓✓', marksAllocated: 4, notes: 'Level 1' },
          { questionNumber: 1, subId: '1.2', stepByStepSolution: 'Method steps and accurate calculation ✓✓✓✓✓✓✓', marksAllocated: 7, notes: 'Level 2' },
          { questionNumber: 1, subId: '1.3', stepByStepSolution: 'Complex multi-phase solution with units ✓✓✓✓✓✓✓✓', marksAllocated: 8, notes: 'Level 3' },
          { questionNumber: 1, subId: '1.4', stepByStepSolution: 'Justified critique with reasoning ✓✓✓✓✓✓', marksAllocated: 6, notes: 'Level 4' },
        ],
      };
      const fileName = await exportWorksheetToDocx(classInfo, atp, wsData);
      showToast(`Generated Worksheet & Memo: ${fileName}`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate worksheet', 'info');
    }
  };

  // From Timetable or ATP -> Chat
  const handleQuickChat = (slot: TimetableSlot, atp: ATPItem) => {
    const classId = slot.targetClassId || '8A';
    const classInfo = CLASSES_CONFIG[classId];
    setChatInitialPrompt(`How can I optimize the 45-minute lesson delivery for ${classInfo.name} on topic "${atp.capsTopic}" in Term ${selectedTerm} Week ${selectedWeek}? Include common learner misconceptions and IEB past paper advice.`);
    setActiveTab('chat');
  };

  // From ATP Explorer actions
  const handlePlanLessonForATP = (atp: ATPItem) => {
    // Find matching class
    const matchedClass = (Object.keys(CLASSES_CONFIG) as GradeClass[]).find(c => {
      const conf = CLASSES_CONFIG[c];
      return conf.subject === atp.subject && String(conf.grade) === String(atp.grade);
    }) || '8A';

    setSelectedClassForDetail(matchedClass);
    setSelectedTerm(atp.term);
    setSelectedWeek(atp.week);
    setActiveTab('planner');
  };

  const handleGenerateSlidesForATP = async (atp: ATPItem) => {
    const matchedClass = (Object.keys(CLASSES_CONFIG) as GradeClass[]).find(c => {
      const conf = CLASSES_CONFIG[c];
      return conf.subject === atp.subject && String(conf.grade) === String(atp.grade);
    }) || '8A';

    const classInfo = CLASSES_CONFIG[matchedClass];
    try {
      const fileName = await exportLessonToPPTX(classInfo, atp);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
      showToast(`Generated Slides: ${fileName}`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate slides', 'info');
    }
  };

  const handleGenerateWorksheetForATP = (atp: ATPItem) => {
    const matchedClass = (Object.keys(CLASSES_CONFIG) as GradeClass[]).find(c => {
      const conf = CLASSES_CONFIG[c];
      return conf.subject === atp.subject && String(conf.grade) === String(atp.grade);
    }) || '8A';

    setSelectedClassForDetail(matchedClass);
    setSelectedTerm(atp.term);
    setSelectedWeek(atp.week);
    setActiveTab('worksheets');
  };

  const handleChatAboutATP = (atp: ATPItem) => {
    setChatInitialPrompt(`Please help me scaffold the CAPS topic "${atp.capsTopic}" (${atp.subject} Grade ${atp.grade}, Term ${atp.term} Week ${atp.week}) for a 45-minute period. Provide 3 diagnostic check questions and an authentic IEB examination problem.`);
    setActiveTab('chat');
  };

  const handlePlanLessonForIEBResource = (resource: IEBResource) => {
    let targetClass: GradeClass = '12';
    if (resource.subject === 'Technology') {
      targetClass = resource.grade === 8 ? '8A' : '9A';
    } else {
      if (resource.grade === 10) targetClass = '10';
      else if (resource.grade === 11) targetClass = '11';
      else targetClass = '12';
    }
    setSelectedClassForDetail(targetClass);
    setActiveTab('planner');
    showToast(`Loaded "${resource.title}" into Lesson Planner`, 'success');
  };

  const handleGenerateWorksheetForIEBResource = (resource: IEBResource) => {
    let targetClass: GradeClass = '12';
    if (resource.subject === 'Technology') {
      targetClass = resource.grade === 8 ? '8A' : '9A';
    } else {
      if (resource.grade === 10) targetClass = '10';
      else if (resource.grade === 11) targetClass = '11';
      else targetClass = '12';
    }
    setSelectedClassForDetail(targetClass);
    setActiveTab('worksheets');
    showToast(`Loaded "${resource.title}" into Worksheet Generator`, 'success');
  };

  const handleAskAIAboutIEBResource = (prompt: string) => {
    setChatInitialPrompt(prompt);
    setActiveTab('chat');
  };

  // Apply parsed slots from uploaded Excel
  const handleApplyImportedSlots = (newSlots: TimetableSlot[]) => {
    setTimetableSlots(newSlots);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.8 } });
    showToast(`Successfully updated live timetable from Excel file with ${newSlots.length} periods!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] dark:bg-[#181C21] text-[#1B2430] dark:text-[#EDEEE7] flex flex-col transition-colors duration-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-[#1B2430] dark:bg-[#252B33] text-[#EDEEE7] px-4 py-3 rounded-xl shadow-lg border border-[#323842] flex items-center gap-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-[#5EBAA4] shrink-0" />
            <span className="font-medium">{toastMessage.text}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[#8E949F] hover:text-white ml-2 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedClassFilter={selectedClassFilter}
        setSelectedClassFilter={setSelectedClassFilter}
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        onExportExcel={handleExportMasterExcel}
        onExportPromptsWord={handleExportPromptsWord}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
        calendarDateRange={activeWeekInfo?.dateRangeShort}
        year={academicYear}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'timetable' && (
          <TimetableGrid
            slots={timetableSlots}
            term={selectedTerm}
            week={selectedWeek}
            year={academicYear}
            classFilter={selectedClassFilter}
            onSelectLesson={handleSelectLessonFromTimetable}
            onQuickGenerateSlides={handleQuickGenerateSlides}
            onQuickGenerateWorksheet={handleQuickGenerateWorksheet}
            onQuickChat={handleQuickChat}
            onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
            onJumpToCurrentWeek={handleJumpToCurrentAcademicWeek}
          />
        )}

        {activeTab === 'learning-models' && (
          <LearningModelsHub
            onNavigateToPlanner={cls => {
              setSelectedClassForDetail(cls);
              setActiveTab('planner');
            }}
            onNavigateToSlides={cls => {
              setSelectedClassForDetail(cls);
              setActiveTab('slides');
            }}
            onAskAIChat={prompt => {
              setChatInitialPrompt(prompt);
              setActiveTab('chat');
            }}
          />
        )}

        {activeTab === 'planner' && (
          <LessonPlanner
            initialClassId={selectedClassForDetail}
            initialTerm={selectedTerm}
            initialWeek={selectedWeek}
            onNavigateToSlides={(cls, t, w) => {
              setSelectedClassForDetail(cls);
              setSelectedTerm(t);
              setSelectedWeek(w);
              setActiveTab('slides');
            }}
            onNavigateToWorksheet={(cls, t, w) => {
              setSelectedClassForDetail(cls);
              setSelectedTerm(t);
              setSelectedWeek(w);
              setActiveTab('worksheets');
            }}
            onAskAIChat={prompt => {
              setChatInitialPrompt(prompt);
              setActiveTab('chat');
            }}
            onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
          />
        )}

        {activeTab === 'slides' && (
          <SlideDeckViewer
            initialClassId={selectedClassForDetail}
            initialTerm={selectedTerm}
            initialWeek={selectedWeek}
            onAskAIChat={prompt => {
              setChatInitialPrompt(prompt);
              setActiveTab('chat');
            }}
          />
        )}

        {activeTab === 'worksheets' && (
          <WorksheetViewer
            initialClassId={selectedClassForDetail}
            initialTerm={selectedTerm}
            initialWeek={selectedWeek}
            onAskAIChat={prompt => {
              setChatInitialPrompt(prompt);
              setActiveTab('chat');
            }}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentHub
            currentTerm={selectedTerm}
            currentWeek={selectedWeek}
            onAskAIChat={prompt => {
              setChatInitialPrompt(prompt);
              setActiveTab('chat');
            }}
            onNavigateToPlanner={(cls, t, w) => {
              setSelectedClassForDetail(cls);
              setSelectedTerm(t);
              setSelectedWeek(w);
              setActiveTab('planner');
            }}
          />
        )}

        {activeTab === 'ieb' && (
          <IEBResourceLibrary
            onPlanLessonForResource={handlePlanLessonForIEBResource}
            onGenerateWorksheetForResource={handleGenerateWorksheetForIEBResource}
            onAskAIAboutResource={handleAskAIAboutIEBResource}
          />
        )}

        {activeTab === 'atp' && (
          <ATPExplorer
            onPlanLessonForATP={handlePlanLessonForATP}
            onGenerateSlidesForATP={handleGenerateSlidesForATP}
            onGenerateWorksheetForATP={handleGenerateWorksheetForATP}
            onChatAboutATP={handleChatAboutATP}
            onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
          />
        )}

        {activeTab === 'prompts' && (
          <AIPromptLibrary
            onRunPromptInChat={prompt => {
              setChatInitialPrompt(prompt);
              setActiveTab('chat');
            }}
          />
        )}

        {activeTab === 'chat' && (
          <AIChatAssistant
            initialPrompt={chatInitialPrompt}
            currentTerm={selectedTerm}
            currentWeek={selectedWeek}
            selectedClassId={selectedClassForDetail}
          />
        )}
      </main>

      {/* Calendar Alignment Modal */}
      <CalendarAlignmentModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
        selectedYear={academicYear}
        onSelectYear={setAcademicYear}
        selectedTerm={selectedTerm}
        selectedWeek={selectedWeek}
        onSelectTermAndWeek={(t, w) => handleSelectWeekFromCalendar(t, w, academicYear)}
        onNavigateToPlanner={classId => {
          setSelectedClassForDetail(classId);
          setActiveTab('planner');
        }}
      />

      {/* Excel Sync Upload Modal */}
      <ExcelSyncModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        currentTerm={selectedTerm}
        currentWeek={selectedWeek}
        onApplyImportedSlots={handleApplyImportedSlots}
        onDownloadTemplateExcel={handleExportMasterExcel}
      />

      {/* Offline Status PWA Indicator */}
      <OfflineIndicator />
    </div>
  );
}
