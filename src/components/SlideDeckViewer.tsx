import React, { useState } from 'react';
import { 
  Presentation, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  BookOpen, 
  FileText,
  Volume2,
  Maximize2
} from 'lucide-react';
import { GradeClass, SlideContent } from '../types';
import { CLASSES_CONFIG } from '../data/atpData';
import { getATPForClassAndWeek } from '../utils/excelHandler';
import { generate45MinLessonSlides, exportLessonToPPTX } from '../utils/pptxGenerator';

interface SlideDeckViewerProps {
  initialClassId: GradeClass;
  initialTerm: number;
  initialWeek: number;
  onAskAIChat: (prompt: string) => void;
}

export const SlideDeckViewer: React.FC<SlideDeckViewerProps> = ({
  initialClassId,
  initialTerm,
  initialWeek,
  onAskAIChat,
}) => {
  const [selectedClassId, setSelectedClassId] = useState<GradeClass>(initialClassId);
  const [selectedTerm, setSelectedTerm] = useState<number>(initialTerm);
  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  const classInfo = CLASSES_CONFIG[selectedClassId] || CLASSES_CONFIG['8A'];
  const currentATP = getATPForClassAndWeek(selectedClassId, selectedTerm, selectedWeek) || {
    id: 'generic',
    subject: classInfo.subject,
    grade: classInfo.grade,
    term: selectedTerm,
    week: selectedWeek,
    capsTopic: `${classInfo.subject} Core Curriculum Unit`,
    coreConcepts: ['Core Principle Review', 'IEB Exam Problem Modeling', 'Class Practice'],
    requisitePreKnowledge: 'Prior term skills',
    resources: ['Textbook', 'Workbook'],
    informalAssessment: 'Exit Ticket',
  };

  const slides: SlideContent[] = generate45MinLessonSlides(classInfo, currentATP);
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handleDownloadPPTX = async () => {
    setIsExporting(true);
    try {
      await exportLessonToPPTX(classInfo, currentATP, slides);
    } catch (err) {
      console.error('Failed to export PPTX:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white dark:bg-[#0c1222]/90 rounded-2xl p-6 border border-slate-200 dark:border-indigo-500/25 shadow-xs dark:shadow-[0_0_20px_rgba(99,102,241,0.1)] space-y-4 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Presentation className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Automatic 45-Minute Lesson Slide Deck (.pptx)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Strictly paced to 45 minutes as per timetable requirements, CAPS curriculum pacing, and IEB examination past paper style.
            </p>
          </div>

          <button
            id="download-pptx-slide-btn"
            onClick={handleDownloadPPTX}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-500 text-white text-xs font-semibold rounded-xl shadow-xs dark:shadow-[0_0_14px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating Presentation...' : 'Download PowerPoint (.pptx)'}</span>
          </button>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-cyan-300 block mb-1">Target Class:</label>
            <select
              id="slides-class-select"
              value={selectedClassId}
              onChange={e => {
                setSelectedClassId(e.target.value as GradeClass);
                setCurrentSlideIndex(0);
              }}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-indigo-500/30 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="8A">Grade 8A - Technology</option>
              <option value="8B">Grade 8B - Technology</option>
              <option value="9A">Grade 9A - Technology</option>
              <option value="9B">Grade 9B - Technology</option>
              <option value="10">Grade 10 - Maths Literacy</option>
              <option value="11">Grade 11 - Maths Literacy</option>
              <option value="12">Grade 12 - Maths Literacy</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-cyan-300 block mb-1">Term:</label>
            <select
              id="slides-term-select"
              value={selectedTerm}
              onChange={e => {
                setSelectedTerm(Number(e.target.value));
                setCurrentSlideIndex(0);
              }}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-indigo-500/30 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={1}>Term 1</option>
              <option value={2}>Term 2</option>
              <option value={3}>Term 3</option>
              <option value={4}>Term 4</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 dark:text-cyan-300 block mb-1">Week:</label>
            <select
              id="slides-week-select"
              value={selectedWeek}
              onChange={e => {
                setSelectedWeek(Number(e.target.value));
                setCurrentSlideIndex(0);
              }}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-indigo-500/30 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(w => (
                <option key={w} value={w}>
                  Week {w}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Slide Stage (2 Cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0b101e] rounded-2xl p-6 sm:p-8 aspect-[16/10] text-white flex flex-col justify-between shadow-lg border border-indigo-500/30 dark:shadow-[0_0_30px_rgba(99,102,241,0.2)] relative overflow-hidden">
            {/* Top Bar of Slide */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-indigo-500/20 pb-3">
              <div>
                <span className="text-[10px] tracking-wider uppercase font-bold text-cyan-400">
                  {classInfo.name} • Term {selectedTerm} W{selectedWeek}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
                  {currentSlide.title}
                </h3>
                {currentSlide.subtitle && (
                  <p className="text-xs text-slate-300">{currentSlide.subtitle}</p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {currentSlide.learningModelStage && (
                  <div className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentSlide.learningModelStage}</span>
                  </div>
                )}
                <div className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/50 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentSlide.phase}</span>
                </div>
              </div>
            </div>

            {/* Slide Body */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
              <div className="md:col-span-2 space-y-2.5">
                {currentSlide.bulletPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>

              {/* Side Callout on Slide */}
              <div className="space-y-3 bg-[#11182c]/90 p-3.5 rounded-xl border border-indigo-500/30 text-xs flex flex-col justify-center">
                {currentSlide.keyFormulaOrConcept && (
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 block uppercase tracking-wide">Key Formula / Rule:</span>
                    <p className="text-white font-mono font-semibold text-xs mt-0.5">
                      {currentSlide.keyFormulaOrConcept}
                    </p>
                  </div>
                )}

                {currentSlide.iebExamTip && (
                  <div className="pt-2 border-t border-indigo-500/20">
                    <span className="text-[10px] font-bold text-amber-400 block uppercase tracking-wide">IEB Examiner Insight:</span>
                    <p className="text-slate-200 text-[11px] mt-0.5">
                      {currentSlide.iebExamTip}
                    </p>
                  </div>
                )}

                {currentSlide.diagramOrVisualDescription && (
                  <div className="pt-2 border-t border-indigo-500/20">
                    <span className="text-[10px] font-bold text-cyan-400 block uppercase tracking-wide">Visual Model:</span>
                    <p className="text-slate-200 text-[11px] mt-0.5">
                      {currentSlide.diagramOrVisualDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Slide Footer */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-indigo-500/20 pt-3">
              <span>CAPS Curriculum Aligned • 45-Minute Pacing</span>
              <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center justify-between bg-white dark:bg-[#0c1222]/90 p-3.5 rounded-xl border border-slate-200 dark:border-indigo-500/25 shadow-xs">
            <button
              id="prev-slide-btn"
              onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Slide Thumbnails / Indicators */}
            <div className="flex items-center gap-1.5">
              {slides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'bg-emerald-600 text-white shadow-xs dark:shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              id="next-slide-btn"
              onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Notes & Teacher Instructions (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c1222]/90 rounded-2xl p-5 border border-slate-200 dark:border-indigo-500/25 shadow-xs space-y-3 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-indigo-500/20 pb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase">Teacher Speaker Notes</h4>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-cyan-300 font-mono">Slide {currentSlideIndex + 1}</span>
            </div>

            {currentSlide.learningModelStage && (
              <div className="p-3 bg-[#FAF9F5] dark:bg-[#181C21] rounded-xl border border-[#DCDCD3] dark:border-[#323842] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2F6F63] dark:text-[#5EBAA4]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trademark Pedagogical Alignment:</span>
                </div>
                <p className="text-xs font-semibold text-[#1B2430] dark:text-[#EDEEE7]">
                  {currentSlide.learningModelStage}
                </p>
                <p className="text-[11px] text-[#717885] dark:text-[#8E949F] leading-tight">
                  Aligned to CAPS &amp; IEB cognitive progression (Gradual Release of Responsibility).
                </p>
              </div>
            )}

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-slate-900/90 p-3 rounded-xl border border-slate-200 dark:border-indigo-500/20">
              "{currentSlide.speakerNotes}"
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-indigo-500/20 space-y-2">
              <div className="text-[11px] font-bold text-slate-700 dark:text-cyan-300">45-Minute Phase Breakdown:</div>
              <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                <li className={currentSlideIndex === 0 || currentSlideIndex === 1 ? 'font-bold text-indigo-600 dark:text-cyan-400' : ''}>
                  • 00:00 - 05:00: Hook & Prior Knowledge Check
                </li>
                <li className={currentSlideIndex === 2 ? 'font-bold text-indigo-600 dark:text-cyan-400' : ''}>
                  • 05:00 - 20:00: Direct Instruction & Concepts
                </li>
                <li className={currentSlideIndex === 3 ? 'font-bold text-indigo-600 dark:text-cyan-400' : ''}>
                  • 20:00 - 30:00: Worked Example (IEB Style)
                </li>
                <li className={currentSlideIndex === 4 ? 'font-bold text-indigo-600 dark:text-cyan-400' : ''}>
                  • 30:00 - 40:00: Guided Practice & Worksheet
                </li>
                <li className={currentSlideIndex === 5 ? 'font-bold text-indigo-600 dark:text-cyan-400' : ''}>
                  • 40:00 - 45:00: Plenary & Exit Ticket
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-indigo-500/20">
              <button
                onClick={() =>
                  onAskAIChat(
                    `Please create an interactive animated simulation idea or hands-on demonstration for teaching slide ${currentSlideIndex + 1} (${currentSlide.title}) to Grade ${classInfo.grade} ${classInfo.subject}.`
                  )
                }
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-cyan-300 text-xs font-semibold rounded-xl border border-transparent dark:border-indigo-500/40 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Get Interactive Activity Idea</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
