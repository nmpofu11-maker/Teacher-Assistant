import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Download, 
  FileText, 
  Presentation, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Award,
  Compass,
  Zap,
  Calendar,
  CalendarDays
} from 'lucide-react';
import { ATPItem, ClassInfo, GradeClass, LessonPlan } from '../types';
import { CLASSES_CONFIG, MASTER_ATP_DATA } from '../data/atpData';
import { getATPForClassAndWeek } from '../utils/excelHandler';
import { exportLessonPlanToDocx } from '../utils/docxGenerator';
import { exportLessonToPPTX } from '../utils/pptxGenerator';
import { getLearningModelForClass } from '../data/learningModelsData';
import { getAcademicWeekInfo, detectAcademicPeriod } from '../data/calendarData';

interface LessonPlannerProps {
  initialClassId: GradeClass;
  initialTerm: number;
  initialWeek: number;
  onNavigateToSlides: (classId: GradeClass, term: number, week: number) => void;
  onNavigateToWorksheet: (classId: GradeClass, term: number, week: number) => void;
  onAskAIChat: (prompt: string) => void;
  onOpenCalendarModal?: () => void;
}

export const LessonPlanner: React.FC<LessonPlannerProps> = ({
  initialClassId,
  initialTerm,
  initialWeek,
  onNavigateToSlides,
  onNavigateToWorksheet,
  onAskAIChat,
  onOpenCalendarModal,
}) => {
  const [selectedClassId, setSelectedClassId] = useState<GradeClass>(initialClassId);
  const [selectedTerm, setSelectedTerm] = useState<number>(initialTerm);
  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek);
  const [selectedWeekday, setSelectedWeekday] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');
  const [isExporting, setIsExporting] = useState(false);
  const [isAiRefining, setIsAiRefining] = useState(false);
  const [customNotes, setCustomNotes] = useState('');
  const [firstTopicInput, setFirstTopicInput] = useState('');
  const [isGeneratingWeekly, setIsGeneratingWeekly] = useState(false);
  const [weeklyPlanResult, setWeeklyPlanResult] = useState<{
    weeklyOverview: string;
    days: Record<string, { title: string; objective: string; activities: string; cognitiveLevel: string }>;
    nextWeekSuggestion: { firstLessonTopic: string; rationale: string };
  } | null>(null);
  const [weeklyError, setWeeklyError] = useState<string | null>(null);

  const handleGenerateWeeklySequence = async () => {
    const topicToUse = firstTopicInput.trim() || currentATP.capsTopic;
    if (!topicToUse) return;
    setIsGeneratingWeekly(true);
    setWeeklyError(null);
    try {
      const prompt = `You are an expert CAPS and IEB curriculum specialist and senior South African educator. 
The teacher is planning for Grade ${classInfo.grade} ${classInfo.subject} (Term ${selectedTerm}, Week ${selectedWeek}).
The teacher has inputted the first topic for the week as: "${topicToUse}".
Please automatically plan the complete lesson sequence for the 5 school days of the week (Monday, Tuesday, Wednesday, Thursday, Friday) adhering to Annual Pedagogical Alignment (APA) and Annual Teaching Plan (ATP) guidelines. Each lesson must be structured for a 45-minute period with rigorous CAPS & IEB cognitive progression (Levels 1 to 4).
Additionally, provide a strategic suggestion and topic description for the FIRST LESSON of NEXT WEEK (Week ${selectedWeek + 1}).

Return ONLY valid JSON with this exact structure:
{
  "weeklyOverview": "A brief 2-sentence summary of the weekly pedagogical goal and curriculum focus.",
  "days": {
    "Monday": { "title": "...", "objective": "...", "activities": "...", "cognitiveLevel": "Level 1: Knowing" },
    "Tuesday": { "title": "...", "objective": "...", "activities": "...", "cognitiveLevel": "Level 2: Routine Procedure" },
    "Wednesday": { "title": "...", "objective": "...", "activities": "...", "cognitiveLevel": "Level 2/3: Complex Application" },
    "Thursday": { "title": "...", "objective": "...", "activities": "...", "cognitiveLevel": "Level 3: Problem Solving" },
    "Friday": { "title": "...", "objective": "...", "activities": "...", "cognitiveLevel": "Level 4: Critical Evaluation & Exit Check" }
  },
  "nextWeekSuggestion": {
    "firstLessonTopic": "...",
    "rationale": "..."
  }
}`;

      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemInstruction: 'You are an expert South African CAPS and IEB curriculum planner specializing in ATP and APA weekly lesson sequencing.',
          jsonMode: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate weekly sequence');
      }
      
      let parsed;
      try {
        let cleanText = data.text.trim();
        if (cleanText.startsWith('```json')) {
          cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanText.startsWith('```')) {
          cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        parsed = JSON.parse(cleanText);
      } catch (parseErr) {
        console.error('JSON parse error:', parseErr, data.text);
        throw new Error('Failed to parse AI weekly plan response.');
      }

      setWeeklyPlanResult(parsed);
    } catch (err: any) {
      console.error('Weekly sequence error:', err);
      setWeeklyError(err.message || 'Error generating weekly sequence.');
    } finally {
      setIsGeneratingWeekly(false);
    }
  };

  const weekInfo = getAcademicWeekInfo(selectedTerm, selectedWeek, 2026);
  const currentPeriod = detectAcademicPeriod();
  const isCurrentLiveWeek = currentPeriod.isSchoolTerm && currentPeriod.term === selectedTerm && currentPeriod.week === selectedWeek;

  const learningModel = getLearningModelForClass(selectedClassId);
  const [selectedModelStageId, setSelectedModelStageId] = useState<string>(
    learningModel.stages[0]?.id || ''
  );

  // Sync with props
  useEffect(() => {
    setSelectedClassId(initialClassId);
    setSelectedTerm(initialTerm);
    setSelectedWeek(initialWeek);
  }, [initialClassId, initialTerm, initialWeek]);

  // Sync model stages on class change
  useEffect(() => {
    const model = getLearningModelForClass(selectedClassId);
    if (model.stages.length > 0) {
      setSelectedModelStageId(model.stages[0].id);
    }
  }, [selectedClassId]);

  const classInfo = CLASSES_CONFIG[selectedClassId] || CLASSES_CONFIG['8A'];
  const currentATP = getATPForClassAndWeek(selectedClassId, selectedTerm, selectedWeek) || {
    id: 'generic',
    subject: classInfo.subject,
    grade: classInfo.grade,
    term: selectedTerm,
    week: selectedWeek,
    capsTopic: `${classInfo.subject} Core Curriculum Unit`,
    coreConcepts: ['Introduction to key principles', 'Classroom practical exercise', 'Formative evaluation'],
    requisitePreKnowledge: 'Prior term fundamentals and basic mathematical/technical skills',
    resources: ['Textbook', 'Workbook', 'Scientific calculator / Drawing instruments'],
    informalAssessment: 'Classroom worksheet and exit ticket',
  };

  const isTech = classInfo.subject === 'Technology';
  const isMathLit = classInfo.subject === 'Mathematical Literacy';

  const defaultLessonPlan: LessonPlan = {
    id: `plan-${selectedClassId}-t${selectedTerm}-w${selectedWeek}`,
    classId: selectedClassId,
    subject: classInfo.subject,
    term: selectedTerm,
    week: selectedWeek,
    lessonTitle: currentATP.capsTopic,
    durationMinutes: 45,
    capsTopic: currentATP.capsTopic,
    capsSpecificAims: isTech
      ? [
          'Develop technological literacy through IDMEC design process.',
          'Apply graphic communication conventions accurately (orthographic/isometric).',
          'Evaluate structural and mechanical systems with real-world ethical considerations.',
        ]
      : isMathLit
      ? [
          'Develop mathematical literacy to engage with real-world financial and spatial contexts.',
          'Solve multi-step problems using tables, formulas, graphs, and conversions.',
          'Critique data, tax calculations, tariffs, and probability to make informed decisions.',
        ]
      : [
          'Understand business enterprise environments and strategic objectives.',
          'Analyze marketing mix strategies and stakeholder impacts.',
        ],
    learningObjectives: currentATP.coreConcepts.map(c => `Learners will be able to apply and explain: ${c}`),
    requisiteKnowledge: currentATP.requisitePreKnowledge,
    pacingBreakdown: [
      {
        phase: '1. Hook & Baseline Recall',
        duration: '5 min (00:00 - 05:00)',
        teacherActivity: `Presents real-world provocation related to ${currentATP.capsTopic}. Checks prerequisite knowledge: "${currentATP.requisitePreKnowledge}".`,
        learnerActivity: 'Think-Pair-Share: Recall prior concepts and relate to today’s learning outcome in notes.',
        resources: 'Whiteboard, exemplar baseline question',
      },
      {
        phase: '2. Direct Instruction & Modeling',
        duration: '15 min (05:00 - 20:00)',
        teacherActivity: `Explicit teaching of core concepts: ${currentATP.coreConcepts.slice(0, 2).join(', ')}. Demonstrates worked problem on board with line conventions / formulas.`,
        learnerActivity: 'Take structured Cornell notes, copy sample diagram/calculation, identify key formulas.',
        resources: currentATP.resources.join(', '),
      },
      {
        phase: '3. Guided & Independent IEB Practice',
        duration: '15 min (20:00 - 35:00)',
        teacherActivity: 'Distributes 45-minute lesson worksheet. Circulates room to facilitate scaffolding for struggling learners and provide Level 4 extensions.',
        learnerActivity: 'Complete assigned exam-style questions (Levels 1-3), show method calculations, collaborate in pairs.',
        resources: 'Classroom worksheet, calculator/instruments',
      },
      {
        phase: '4. Plenary & Diagnostic Exit Ticket',
        duration: '10 min (35:00 - 45:00)',
        teacherActivity: 'Facilitates rapid plenary review. Administers 3-question diagnostic exit check. Summarizes homework task.',
        learnerActivity: 'Complete exit slip individually and submit upon departure.',
        resources: 'Exit ticket slips, homework workbook',
      },
    ],
    iebCognitiveLevels: {
      level1_knowing: isMathLit
        ? 'Extract values directly from tax tables, state definitions (e.g. VAT rate, median, scale ratio).'
        : 'Identify components, state functions of structural members (strut, tie), name logic symbols.',
      level2_routine: isMathLit
        ? 'Calculate simple percentage increase, direct metric conversions, single-step tariff cost calculations.'
        : 'Calculate gear ratios (Velocity Ratio = Driven Teeth ÷ Driver Teeth), draw dark outlines and construction lines.',
      level3_complex: isMathLit
        ? 'Multi-step tax bracket calculation with rebates and medical credits; dual break-even comparison.'
        : 'Analyze mechanical advantage in compound gear train with idlers; evaluate truss failure modes under load.',
      level4_problem_solving: isMathLit
        ? 'Critique financial viability, advise a family on tariff switching with budget justification.'
        : 'Design an optimized mechanism within budget constraints; evaluate environmental impact of acid mine drainage.',
    },
    differentiation: {
      support: isMathLit
        ? 'Provide step-by-step calculation frames, formula triangles (V = I × R, Speed = D ÷ T), and pre-drawn Cartesian grid axes.'
        : 'Provide guided isometric grid underlays and annotated circuit symbol reference cards.',
      extension: isMathLit
        ? 'Provide authentic IEB Matric Paper 1 / Paper 2 past exam question with unfamiliar context variables.'
        : 'Simulate unexpected mechanical load or budget reduction constraint requiring redesign.',
    },
    informalAssessment: currentATP.informalAssessment || 'Classroom worksheet marking & exit ticket check.',
    homeworkOrPATTask: currentATP.formalAssessment ? `Prepare for formal task: ${currentATP.formalAssessment}` : 'Complete questions 4 & 5 from Sasol Inzalo / CAPS workbook.',
  };

  const handleDownloadWord = async () => {
    setIsExporting(true);
    try {
      const enrichedATP: ATPItem = {
        ...currentATP,
        calendarDateRange: weekInfo
          ? `${selectedWeekday}, ${weekInfo.days[selectedWeekday]?.displayDate || ''} (${weekInfo.dateRangeLong})`
          : currentATP.calendarDateRange,
      };
      await exportLessonPlanToDocx(classInfo, enrichedATP, defaultLessonPlan);
    } catch (err) {
      console.error('Failed to export Docx:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPPTX = async () => {
    setIsExporting(true);
    try {
      const enrichedATP: ATPItem = {
        ...currentATP,
        calendarDateRange: weekInfo
          ? `${selectedWeekday}, ${weekInfo.days[selectedWeekday]?.displayDate || ''} (${weekInfo.dateRangeShort})`
          : currentATP.calendarDateRange,
      };
      await exportLessonToPPTX(classInfo, enrichedATP);
    } catch (err) {
      console.error('Failed to export PPTX:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Planner Header & Selectors */}
      <div className="bg-white dark:bg-[#20252B] rounded-2xl p-6 border border-[#DCDCD3] dark:border-[#323842] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2F6F63] dark:text-[#5EBAA4]" />
              <h2 className="text-lg font-bold text-[#1B2430] dark:text-[#EDEEE7] tracking-tight font-serif">
                45-Minute Lesson Planner (CAPS &amp; IEB Aligned)
              </h2>
            </div>
            <p className="text-xs text-[#717885] dark:text-[#8E949F] mt-0.5">
              Structured lesson plan generator with 4-phase timing, IEB 4-level taxonomy, differentiated scaffolding, and instant Word/PowerPoint exports.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenCalendarModal && (
              <button
                onClick={onOpenCalendarModal}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Calendar Alignment</span>
              </button>
            )}

            <button
              id="plan-download-docx-btn"
              onClick={handleDownloadWord}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2F6F63] hover:bg-[#25574E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{isExporting ? 'Exporting...' : 'Export Plan (.docx)'}</span>
            </button>

            <button
              id="plan-download-pptx-btn"
              onClick={handleDownloadPPTX}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#35507C] hover:bg-[#2A4064] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Presentation className="w-4 h-4" />
              <span>Export Slides (.pptx)</span>
            </button>
          </div>
        </div>

        {/* Class / Term / Week / Weekday Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Class Select */}
          <div>
            <label className="text-[11px] font-bold text-[#4A5568] dark:text-[#A2A7B0] block mb-1">Target Class &amp; Subject:</label>
            <select
              id="planner-class-select"
              value={selectedClassId}
              onChange={e => setSelectedClassId(e.target.value as GradeClass)}
              className="w-full bg-[#F6F5F0] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842] rounded-xl px-3 py-2 text-xs font-semibold text-[#1B2430] dark:text-[#EDEEE7] focus:outline-none focus:ring-2 focus:ring-[#2F6F63]"
            >
              <option value="8A">Grade 8A - Technology (Mr. Mpofu)</option>
              <option value="8B">Grade 8B - Technology (Mr. Mpofu)</option>
              <option value="9A">Grade 9A - Technology (Mr. Mpofu)</option>
              <option value="9B">Grade 9B - Technology (Mr. Mpofu)</option>
              <option value="10">Grade 10 - Maths Literacy (10A & 10B)</option>
              <option value="11">Grade 11 - Maths Literacy (11A & 11B)</option>
              <option value="12">Grade 12 - Maths Literacy (12A & 12B)</option>
            </select>
          </div>

          {/* Term Select */}
          <div>
            <label className="text-[11px] font-bold text-[#4A5568] dark:text-[#A2A7B0] block mb-1">Term:</label>
            <select
              id="planner-term-select"
              value={selectedTerm}
              onChange={e => setSelectedTerm(Number(e.target.value))}
              className="w-full bg-[#F6F5F0] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842] rounded-xl px-3 py-2 text-xs font-semibold text-[#1B2430] dark:text-[#EDEEE7] focus:outline-none focus:ring-2 focus:ring-[#2F6F63]"
            >
              <option value={1}>Term 1</option>
              <option value={2}>Term 2</option>
              <option value={3}>Term 3</option>
              <option value={4}>Term 4</option>
            </select>
          </div>

          {/* Week Select */}
          <div>
            <label className="text-[11px] font-bold text-[#4A5568] dark:text-[#A2A7B0] block mb-1">Curriculum Week:</label>
            <select
              id="planner-week-select"
              value={selectedWeek}
              onChange={e => setSelectedWeek(Number(e.target.value))}
              className="w-full bg-[#F6F5F0] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842] rounded-xl px-3 py-2 text-xs font-semibold text-[#1B2430] dark:text-[#EDEEE7] focus:outline-none focus:ring-2 focus:ring-[#2F6F63]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(w => (
                <option key={w} value={w}>
                  Week {w}
                </option>
              ))}
            </select>
          </div>

          {/* Scheduled Day Picker */}
          <div>
            <label className="text-[11px] font-bold text-[#4A5568] dark:text-[#A2A7B0] block mb-1">Scheduled Lesson Day:</label>
            <select
              id="planner-day-select"
              value={selectedWeekday}
              onChange={e => setSelectedWeekday(e.target.value as any)}
              className="w-full bg-[#F6F5F0] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842] rounded-xl px-3 py-2 text-xs font-semibold text-[#1B2430] dark:text-[#EDEEE7] focus:outline-none focus:ring-2 focus:ring-[#2F6F63]"
            >
              {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const).map(day => {
                const dayDetail = weekInfo?.days[day];
                return (
                  <option key={day} value={day}>
                    {day} {dayDetail ? `(${dayDetail.displayDate})` : ''}{dayDetail?.isHoliday ? ' [Holiday]' : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Weekly Lesson Sequencing & AI Auto-Planner (APA Aligned) */}
      <div className="bg-gradient-to-br from-emerald-950 via-[#182622] to-slate-900 text-white rounded-2xl p-6 border border-emerald-500/30 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <h3 className="text-base font-bold tracking-tight font-serif text-emerald-100">
                AI Weekly Lesson Sequencing &amp; Auto-Planner (APA Aligned)
              </h3>
            </div>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Input the first topic for the week. The AI will automatically sequence all 5 daily lessons (Monday–Friday) and generate a strategic preview for next week's first lesson.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:flex-1">
            <input
              type="text"
              placeholder={`e.g., ${currentATP.capsTopic} (or custom weekly starting topic)...`}
              value={firstTopicInput}
              onChange={e => setFirstTopicInput(e.target.value)}
              className="w-full bg-slate-900/80 border border-emerald-500/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <button
            onClick={handleGenerateWeeklySequence}
            disabled={isGeneratingWeekly}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGeneratingWeekly ? 'Sequencing Week...' : 'AI Auto-Plan Week & Next Week'}</span>
          </button>
        </div>

        {weeklyError && (
          <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{weeklyError}</span>
          </div>
        )}

        {weeklyPlanResult && (
          <div className="space-y-4 pt-3 border-t border-emerald-500/20">
            <div className="p-3.5 bg-emerald-900/30 rounded-xl border border-emerald-500/30 text-xs text-emerald-100">
              <strong className="text-amber-300">Weekly Pedagogical Overview (APA):</strong> {weeklyPlanResult.weeklyOverview}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {Object.entries(weeklyPlanResult.days).map(([dayName, dayData]) => (
                <div key={dayName} className="bg-slate-900/80 p-3.5 rounded-xl border border-emerald-500/20 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {dayName}
                      </span>
                      <span className="text-[9px] text-amber-300 font-medium">
                        {dayData.cognitiveLevel}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white pt-1">{dayData.title}</h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
                      {dayData.objective}
                    </p>
                  </div>
                  <div className="text-[10px] text-emerald-200/70 pt-2 border-t border-slate-800">
                    <strong>Activity:</strong> {dayData.activities}
                  </div>
                </div>
              ))}
            </div>

            {/* Next Week First Lesson Preview Card */}
            <div className="p-4 bg-gradient-to-r from-indigo-950/90 via-slate-900 to-indigo-950/90 rounded-xl border border-indigo-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                    Next Week (Week {selectedWeek + 1}) Preview
                  </span>
                  <span className="text-xs font-bold text-white">
                    First Lesson Topic: {weeklyPlanResult.nextWeekSuggestion.firstLessonTopic}
                  </span>
                </div>
                <p className="text-[11px] text-indigo-200/80">
                  <strong>Pedagogical Rationale:</strong> {weeklyPlanResult.nextWeekSuggestion.rationale}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedWeek(selectedWeek + 1);
                  setFirstTopicInput(weeklyPlanResult.nextWeekSuggestion.firstLessonTopic);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-sm"
              >
                Jump to Week {selectedWeek + 1}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lesson Banner Card */}
      <div className="bg-white dark:bg-[#20252B] rounded-2xl p-6 border border-[#DCDCD3] dark:border-[#323842] shadow-xs space-y-6">
        {/* Title & Metadata Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#DCDCD3] dark:border-[#323842]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${classInfo.color.badge}`}>
                {classInfo.name}
              </span>
              <span className="text-xs font-semibold text-[#717885] dark:text-[#8E949F]">
                Term {selectedTerm} • Week {selectedWeek} • 45 Minutes
              </span>
              {weekInfo && (
                <span className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-[#181C21] text-slate-700 dark:text-[#EDEEE7] border border-slate-300 dark:border-[#323842]">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {weekInfo.dateRangeShort}
                </span>
              )}
              {weekInfo?.days[selectedWeekday] && (
                <span className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                  weekInfo.days[selectedWeekday].isHoliday
                    ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border-amber-300'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                }`}>
                  📅 {selectedWeekday}, {weekInfo.days[selectedWeekday].displayDate} 2026
                  {weekInfo.days[selectedWeekday].holidayName ? ` (${weekInfo.days[selectedWeekday].holidayName})` : ''}
                </span>
              )}
              {isCurrentLiveWeek && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                  ● Live Current Week
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-[#1B2430] dark:text-[#EDEEE7] mt-1.5 font-serif">
              {currentATP.capsTopic}
            </h3>
            <p className="text-xs text-[#717885] dark:text-[#8E949F] mt-0.5">
              Teachers: {classInfo.teachers.join(', ')} • CAPS Policy: {currentATP.capsPageNo || 'Senior / FET Phase Guidelines'} • Calendar Window: {weekInfo?.dateRangeLong || 'DBE / IEB Calendar'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToSlides(selectedClassId, selectedTerm, selectedWeek)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#E6EFEA] hover:bg-[#D5E6DE] text-[#1D453D] dark:bg-[#1A2E28] dark:text-[#92DAC8] border border-[#B8D8CD] dark:border-[#2E584D] rounded-xl text-xs font-semibold cursor-pointer transition-all"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>View 45m Slides</span>
            </button>
            <button
              onClick={() => onNavigateToWorksheet(selectedClassId, selectedTerm, selectedWeek)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#E8EEF5] hover:bg-[#D6E2EE] text-[#233A5C] dark:bg-[#1B2738] dark:text-[#AFCBEA] border border-[#BDCDDF] dark:border-[#2F4463] rounded-xl text-xs font-semibold cursor-pointer transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Worksheet</span>
            </button>
          </div>
        </div>

        {/* Trademark Pedagogical Learning Model Integration */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F5] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842] space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#DCDCD3] dark:border-[#323842] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2F6F63] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-[#1B2430] dark:text-[#EDEEE7] uppercase tracking-wide font-serif">
                    Trademark Learning Model: {learningModel.title}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E6EFEA] dark:bg-[#1A2E28] text-[#1D453D] dark:text-[#92DAC8] font-bold border border-[#B8D8CD] dark:border-[#2E584D]">
                    {learningModel.targetGrades}
                  </span>
                </div>
                <p className="text-[11px] text-[#717885] dark:text-[#8E949F]">
                  Select the active pedagogical stage for this 45-minute lesson to inspect targeted question stems and modeling guidance.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const stage = learningModel.stages.find(s => s.id === selectedModelStageId) || learningModel.stages[0];
                onAskAIChat(
                  `Incorporate Stage ${stage.order} (${stage.name}) of the ${learningModel.title} into today's ${classInfo.name} lesson on "${currentATP.capsTopic}". Give me 3 concrete diagnostic check questions and a guided modeling example.`
                );
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#252B33] border border-[#DCDCD3] dark:border-[#323842] hover:bg-[#F6F5F0] dark:hover:bg-[#2C333D] text-[#2F6F63] dark:text-[#5EBAA4] cursor-pointer shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Ask AI for Stage Activity</span>
            </button>
          </div>

          {/* Interactive Stage Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {learningModel.stages.map((stage) => {
              const isActive = selectedModelStageId === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedModelStageId(stage.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2F6F63] text-white border-[#2F6F63] shadow-xs'
                      : 'bg-white dark:bg-[#20252B] border-[#DCDCD3] dark:border-[#323842] text-[#1B2430] dark:text-[#EDEEE7] hover:bg-[#F0EEE6] dark:hover:bg-[#252B33]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-[#E6EFEA] dark:bg-[#1A2E28] text-[#1D453D] dark:text-[#92DAC8]'}`}>
                      {stage.code}
                    </span>
                    <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-[#717885] dark:text-[#8E949F]'}`}>
                      Stage {stage.order}
                    </span>
                  </div>
                  <div className="text-xs font-bold truncate">{stage.name}</div>
                  <div className={`text-[10px] line-clamp-1 ${isActive ? 'text-white/85' : 'text-[#717885] dark:text-[#8E949F]'}`}>
                    {stage.shortDesc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Detail Box */}
          {(() => {
            const activeStage = learningModel.stages.find(s => s.id === selectedModelStageId) || learningModel.stages[0];
            if (!activeStage) return null;
            return (
              <div className="p-3.5 bg-white dark:bg-[#20252B] rounded-xl border border-[#DCDCD3] dark:border-[#323842] space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2F6F63] dark:text-[#5EBAA4]">
                      Stage {activeStage.order}: {activeStage.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF9F5] dark:bg-[#181C21] text-[#4A5568] dark:text-[#A2A7B0] border border-[#DCDCD3] dark:border-[#323842]">
                      Cognitive Level: {activeStage.cognitiveLevel}
                    </span>
                  </div>
                  <span className="text-xs text-[#717885] dark:text-[#8E949F] italic">
                    Goal: {activeStage.didacticGoal}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-[#FAF9F5] dark:bg-[#181C21] border border-[#DCDCD3]/70 dark:border-[#323842]/70">
                    <span className="font-bold text-[11px] text-[#2F6F63] dark:text-[#5EBAA4] block mb-1">
                      Teacher Instructional Modeling (I Do):
                    </span>
                    <p className="text-[#4A5568] dark:text-[#A2A7B0] leading-relaxed">
                      {activeStage.teacherAction}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF9F5] dark:bg-[#181C21] border border-[#DCDCD3]/70 dark:border-[#323842]/70">
                    <span className="font-bold text-[11px] text-[#35507C] dark:text-[#87AADE] block mb-1">
                      Learner Activity &amp; Practice (We Do / You Do):
                    </span>
                    <p className="text-[#4A5568] dark:text-[#A2A7B0] leading-relaxed">
                      {activeStage.learnerAction}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 text-[11px] text-[#4A5568] dark:text-[#A2A7B0] border-t border-[#DCDCD3]/60 dark:border-[#323842]/60">
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#B4791E] dark:text-[#D9A24B] shrink-0" />
                    <span>
                      <strong className="text-[#1B2430] dark:text-[#EDEEE7]">Key Socratic Question:</strong> "{activeStage.keyQuestionStems[0]}"
                    </span>
                  </div>
                  <span className="text-[10px] text-[#717885] dark:text-[#8E949F]">
                    {activeStage.commonMisconception}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 4-Phase Pacing Table */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2F6F63] dark:text-[#5EBAA4]" />
            <h4 className="text-sm font-bold text-[#1B2430] dark:text-[#EDEEE7] uppercase tracking-wide font-serif">
              1. 45-Minute Lesson Pacing &amp; Methodology
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-[#DCDCD3] dark:border-[#323842] rounded-xl overflow-hidden">
              <thead className="bg-[#F6F5F0] dark:bg-[#181C21] text-[#1B2430] dark:text-[#EDEEE7] font-bold border-b border-[#DCDCD3] dark:border-[#323842]">
                <tr>
                  <th className="py-2.5 px-3 text-left w-36">Phase &amp; Duration</th>
                  <th className="py-2.5 px-3 text-left">Teacher Instruction &amp; Demonstration</th>
                  <th className="py-2.5 px-3 text-left">Learner Activity</th>
                  <th className="py-2.5 px-3 text-left w-36">Resources</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCDCD3] dark:divide-[#323842] bg-white dark:bg-[#20252B]">
                {defaultLessonPlan.pacingBreakdown.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF9F5] dark:hover:bg-[#252B33]">
                    <td className="py-3 px-3 font-bold text-[#2F6F63] dark:text-[#5EBAA4] bg-[#F6F5F0] dark:bg-[#181C21]">
                      <div>{p.phase}</div>
                      <span className="text-[10px] text-[#717885] dark:text-[#8E949F] font-medium">{p.duration}</span>
                    </td>
                    <td className="py-3 px-3 text-[#1B2430] dark:text-[#EDEEE7] leading-relaxed">{p.teacherActivity}</td>
                    <td className="py-3 px-3 text-[#4A5568] dark:text-[#A2A7B0] leading-relaxed">{p.learnerActivity}</td>
                    <td className="py-3 px-3 text-[#717885] dark:text-[#8E949F] font-medium">{p.resources}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* IEB 4-Level Cognitive Taxonomy Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              2. IEB Examination Taxonomy Alignment
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-slate-50 dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200 dark:border-indigo-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>Level 1: Knowing</span>
                <span className="text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-1.5 py-0.5 rounded text-[10px] font-bold border border-indigo-200 dark:border-indigo-700">20-30%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {defaultLessonPlan.iebCognitiveLevels.level1_knowing}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200 dark:border-indigo-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>Level 2: Routine</span>
                <span className="text-sky-600 dark:text-cyan-300 bg-sky-50 dark:bg-cyan-950/80 px-1.5 py-0.5 rounded text-[10px] font-bold border border-sky-200 dark:border-cyan-700">35-40%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {defaultLessonPlan.iebCognitiveLevels.level2_routine}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200 dark:border-indigo-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>Level 3: Complex</span>
                <span className="text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-200 dark:border-amber-700">20%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {defaultLessonPlan.iebCognitiveLevels.level3_complex}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/90 p-3.5 rounded-xl border border-slate-200 dark:border-indigo-500/20 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>Level 4: Reasoning</span>
                <span className="text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-200 dark:border-emerald-700">10-15%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {defaultLessonPlan.iebCognitiveLevels.level4_problem_solving}
              </p>
            </div>
          </div>
        </div>

        {/* Differentiated Support & Homework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/40 space-y-2 dark:shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <h5 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase">
              Scaffolding for Struggling Learners
            </h5>
            <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
              {defaultLessonPlan.differentiation.support}
            </p>
          </div>

          <div className="bg-indigo-50/60 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-500/40 space-y-2 dark:shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            <h5 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase">
              Extension for Advanced Learners (IEB High Order)
            </h5>
            <p className="text-xs text-indigo-800 dark:text-indigo-200 leading-relaxed">
              {defaultLessonPlan.differentiation.extension}
            </p>
          </div>
        </div>

        {/* AI Teaching Assistant Prompt Trigger */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:border dark:border-indigo-500/30 text-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0 animate-pulse" />
            <div>
              <h5 className="text-xs font-bold">Want AI to customize this lesson plan further?</h5>
              <p className="text-[11px] text-slate-300">
                Ask the AI Assistant to adapt pacing for double periods, generate remedial worksheets, or simulate student misconceptions.
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              onAskAIChat(
                `Please refine the 45-minute lesson plan for ${classInfo.name} on topic: "${currentATP.capsTopic}" (Term ${selectedTerm}, Week ${selectedWeek}). Include practical IEB exam hints and common learner traps.`
              )
            }
            className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-sm dark:shadow-[0_0_12px_rgba(245,158,11,0.4)]"
          >
            Refine with AI
          </button>
        </div>
      </div>
    </div>
  );
};
