import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Presentation, 
  FileCheck, 
  Sparkles, 
  CheckCircle, 
  CheckCircle2,
  Layers,
  ChevronDown,
  FileSpreadsheet,
  Calendar,
  CalendarDays,
  Clock
} from 'lucide-react';
import { ATPItem, Subject, GradeClass } from '../types';
import { MASTER_ATP_DATA, CLASSES_CONFIG } from '../data/atpData';
import { getAcademicWeekInfo, detectAcademicPeriod, getATPPacingStatus } from '../data/calendarData';

interface ATPExplorerProps {
  onPlanLessonForATP: (atp: ATPItem) => void;
  onGenerateSlidesForATP: (atp: ATPItem) => void;
  onGenerateWorksheetForATP: (atp: ATPItem) => void;
  onChatAboutATP: (atp: ATPItem) => void;
  onOpenCalendarModal?: () => void;
}

export const ATPExplorer: React.FC<ATPExplorerProps> = ({
  onPlanLessonForATP,
  onGenerateSlidesForATP,
  onGenerateWorksheetForATP,
  onChatAboutATP,
  onOpenCalendarModal,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'ALL'>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedTerm, setSelectedTerm] = useState<number | 'ALL'>('ALL');
  const [selectedPacing, setSelectedPacing] = useState<'ALL' | 'current' | 'completed' | 'upcoming'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const currentPeriod = detectAcademicPeriod();

  const filteredATPItems = useMemo(() => {
    return MASTER_ATP_DATA.filter(item => {
      if (selectedSubject !== 'ALL' && item.subject !== selectedSubject) return false;
      if (selectedGrade !== 'ALL' && String(item.grade) !== selectedGrade) return false;
      if (selectedTerm !== 'ALL' && item.term !== selectedTerm) return false;

      const pacing = getATPPacingStatus(item, currentPeriod.term, currentPeriod.week);
      if (selectedPacing !== 'ALL' && pacing !== selectedPacing) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTopic = item.capsTopic.toLowerCase().includes(q);
        const matchesConcepts = item.coreConcepts.some(c => c.toLowerCase().includes(q));
        const matchesPre = item.requisitePreKnowledge.toLowerCase().includes(q);
        const matchesFormal = item.formalAssessment?.toLowerCase().includes(q);
        return matchesTopic || matchesConcepts || matchesPre || matchesFormal;
      }

      return true;
    });
  }, [selectedSubject, selectedGrade, selectedTerm, selectedPacing, searchQuery, currentPeriod]);

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Filterable CAPS Annual Teaching Plans (ATP)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Official South African CAPS curriculum database synchronized with the DBE &amp; IEB academic calendar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCalendarModal && (
              <button
                onClick={onOpenCalendarModal}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-all cursor-pointer"
              >
                <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
                <span>Calendar Alignment</span>
              </button>
            )}

            <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              Showing {filteredATPItems.length} Curriculum Units
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              id="atp-search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search concepts (e.g., Ohm's law, tax, gears)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              id="atp-subject-filter"
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value as Subject | 'ALL')}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            >
              <option value="ALL">All Subjects</option>
              <option value="Technology">Technology (Gr 8 & 9)</option>
              <option value="Mathematical Literacy">Mathematical Literacy (Gr 10, 11, 12)</option>
            </select>
          </div>

          {/* Grade Filter */}
          <div>
            <select
              id="atp-grade-filter"
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            >
              <option value="ALL">All Grades</option>
              <option value="8">Grade 8 (8A, 8B)</option>
              <option value="9">Grade 9 (9A, 9B)</option>
              <option value="10">Grade 10 (10A, 10B)</option>
              <option value="11">Grade 11 (11A, 11B)</option>
              <option value="12">Grade 12 (12A, 12B)</option>
            </select>
          </div>

          {/* Term Filter */}
          <div>
            <select
              id="atp-term-filter"
              value={selectedTerm}
              onChange={e => setSelectedTerm(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            >
              <option value="ALL">All Terms (1-4)</option>
              <option value={1}>Term 1</option>
              <option value={2}>Term 2</option>
              <option value={3}>Term 3</option>
              <option value={4}>Term 4</option>
            </select>
          </div>

          {/* Pacing Filter */}
          <div>
            <select
              id="atp-pacing-filter"
              value={selectedPacing}
              onChange={e => setSelectedPacing(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            >
              <option value="ALL">All Pacing (Live)</option>
              <option value="current">● Active Current Week</option>
              <option value="completed">✓ Completed Units</option>
              <option value="upcoming">○ Upcoming Units</option>
            </select>
          </div>
        </div>
      </div>

      {/* ATP Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredATPItems.map(item => {
          const isTech = item.subject === 'Technology';
          const isMathLit = item.subject === 'Mathematical Literacy';
          const weekInfo = getAcademicWeekInfo(item.term, item.week, 2026);
          const pacing = getATPPacingStatus(item, currentPeriod.term, currentPeriod.week);
          const isCurrent = pacing === 'active';

          return (
            <div
              key={item.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'bg-[#FCFDFB] border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
              }`}
            >
              <div className="space-y-3">
                {/* Header Tags */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
                        isTech
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : isMathLit
                          ? 'bg-sky-50 text-sky-800 border-sky-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {item.subject} • Grade {item.grade}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                      Term {item.term} • Wk {item.week}
                    </span>

                    {/* Aligned Calendar Dates */}
                    {weekInfo && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-50 text-slate-700 border border-slate-200">
                        <Calendar className="w-2.5 h-2.5 text-slate-500" />
                        {weekInfo.dateRangeShort}
                      </span>
                    )}

                    {/* Pacing Badge */}
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300 animate-pulse">
                        <Clock className="w-2.5 h-2.5 text-amber-600" /> Active Week
                      </span>
                    ) : pacing === 'completed' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Done
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500">
                        Upcoming
                      </span>
                    )}
                  </div>

                  {item.capsPageNo && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.capsPageNo}
                    </span>
                  )}
                </div>

                {/* CAPS Topic */}
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.capsTopic}
                </h3>

                {/* Core Concepts */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-600 block">Core Concepts & Skills:</span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 pl-1">
                    {item.coreConcepts.map((c, idx) => (
                      <li key={idx} className="line-clamp-2 leading-relaxed">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requisite Knowledge & Formal Assessment */}
                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <p className="text-slate-500">
                    <span className="font-semibold text-slate-700">Pre-Knowledge: </span>
                    {item.requisitePreKnowledge}
                  </p>
                  {item.formalAssessment && (
                    <div className="mt-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 font-semibold text-[11px]">
                      🏆 Formal SBA: {item.formalAssessment}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-4 mt-3 border-t border-slate-100 text-xs">
                <button
                  id={`atp-plan-${item.id}`}
                  onClick={() => onPlanLessonForATP(item)}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-semibold transition-all cursor-pointer"
                  title="Generate 45-min lesson plan"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Plan</span>
                </button>

                <button
                  id={`atp-slides-${item.id}`}
                  onClick={() => onGenerateSlidesForATP(item)}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-semibold transition-all cursor-pointer"
                  title="Download 45-min slides (.pptx)"
                >
                  <Presentation className="w-3.5 h-3.5" />
                  <span>Slides</span>
                </button>

                <button
                  id={`atp-worksheet-${item.id}`}
                  onClick={() => onGenerateWorksheetForATP(item)}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg font-semibold transition-all cursor-pointer"
                  title="Download worksheet & memo (.docx)"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Worksheet</span>
                </button>

                <button
                  id={`atp-ai-${item.id}`}
                  onClick={() => onChatAboutATP(item)}
                  className="flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-all cursor-pointer"
                  title="Ask AI Assistant"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>AI Help</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
