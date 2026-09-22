import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  BookOpen, 
  CalendarDays,
  Sparkles,
  ExternalLink,
  Layers,
  Flag,
  Award,
  Sun,
  Snowflake,
  Leaf,
  Flower2
} from 'lucide-react';
import { GradeClass, Subject, ATPItem } from '../types';
import { 
  getCalendarForYear, 
  getTermCalendarInfo, 
  detectAcademicPeriod, 
  getATPPacingStatus,
  SUPPORTED_CALENDARS
} from '../data/calendarData';
import { CLASSES_CONFIG, MASTER_ATP_DATA } from '../data/atpData';
import { getATPForClassAndWeek } from '../utils/excelHandler';

interface CalendarAlignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedYear: number;
  onSelectYear: (year: number) => void;
  selectedTerm: number;
  selectedWeek: number;
  onSelectTermAndWeek: (term: number, week: number) => void;
  onNavigateToPlanner?: (classId: GradeClass) => void;
}

export const CalendarAlignmentModal: React.FC<CalendarAlignmentModalProps> = ({
  isOpen,
  onClose,
  selectedYear,
  onSelectYear,
  selectedTerm,
  selectedWeek,
  onSelectTermAndWeek,
  onNavigateToPlanner,
}) => {
  const [activeTabTerm, setActiveTabTerm] = useState<number>(selectedTerm);
  const [filterClass, setFilterClass] = useState<GradeClass | 'ALL'>('ALL');

  if (!isOpen) return null;

  const currentPeriod = detectAcademicPeriod();
  const calendar = getCalendarForYear(selectedYear);
  const termInfo = getTermCalendarInfo(activeTabTerm, selectedYear);

  const isCurrentLiveTerm = currentPeriod.year === selectedYear && currentPeriod.term === activeTabTerm;

  const getSeasonIcon = (term: number) => {
    switch (term) {
      case 1: return <Sun className="w-4 h-4 text-amber-500" />;
      case 2: return <Leaf className="w-4 h-4 text-orange-500" />;
      case 3: return <Snowflake className="w-4 h-4 text-blue-500" />;
      case 4: return <Flower2 className="w-4 h-4 text-emerald-500" />;
      default: return <Calendar className="w-4 h-4 text-indigo-500" />;
    }
  };

  const handleJumpToToday = () => {
    onSelectYear(currentPeriod.year);
    setActiveTabTerm(currentPeriod.term);
    onSelectTermAndWeek(currentPeriod.term, currentPeriod.week);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1C2128] rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-[#DCDCD3] dark:border-[#323842]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#21262D] text-[#EDEEE7] flex items-center justify-between border-b border-[#323842]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1A2E28] text-[#92DAC8] border border-[#2E584D]">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-serif">
                  DBE &amp; IEB Academic Calendar &amp; ATP Alignment
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#182332] text-[#AFCBEA] border border-[#2F4463]">
                  CAPS Pacing Synchronizer
                </span>
              </div>
              <p className="text-xs text-[#A2A7B0] mt-0.5">
                Official gazetted South African school dates with week-by-week CAPS Annual Teaching Plan milestones.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Year Selector */}
            <div className="flex items-center bg-[#181C21] p-1 rounded-lg border border-[#323842] text-xs font-semibold">
              {[2026, 2025].map(yr => (
                <button
                  key={yr}
                  onClick={() => onSelectYear(yr)}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    selectedYear === yr
                      ? 'bg-[#2F6F63] text-white font-bold shadow-xs'
                      : 'text-[#A2A7B0] hover:text-white'
                  }`}
                >
                  {yr} {yr === 2026 && '(Active)'}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A2A7B0] hover:text-white hover:bg-[#2F3640] transition-all cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Date Status Banner */}
        <div className="px-6 py-3 bg-[#F6F5F0] dark:bg-[#181C21] border-b border-[#DCDCD3] dark:border-[#323842] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#1B2430] dark:text-[#EDEEE7]">
            <Clock className="w-4 h-4 text-[#2F6F63] dark:text-[#92DAC8]" />
            <span className="font-semibold">Today's Academic Status:</span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#20252B] border border-[#DCDCD3] dark:border-[#323842] font-mono font-medium">
              {new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#2F6F63] dark:text-[#92DAC8]">
              → Term {currentPeriod.term}, Week {currentPeriod.week} ({currentPeriod.matchedWeek?.dateRangeShort})
            </span>
            {currentPeriod.isHoliday && (
              <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold">
                Holiday: {currentPeriod.holidayName}
              </span>
            )}
          </div>

          <button
            onClick={handleJumpToToday}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2F6F63] hover:bg-[#26594F] text-white font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Jump to Current Live Week</span>
          </button>
        </div>

        {/* Term Tabs & Controls */}
        <div className="p-4 sm:p-6 pb-2 border-b border-[#DCDCD3] dark:border-[#323842] bg-white dark:bg-[#1C2128]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Term Tabs */}
            <div className="flex items-center gap-2 bg-[#F6F5F0] dark:bg-[#181C21] p-1 rounded-xl border border-[#DCDCD3] dark:border-[#323842]">
              {[1, 2, 3, 4].map(t => {
                const termMeta = calendar.terms[t];
                const isActive = activeTabTerm === t;
                const isCurrent = currentPeriod.year === selectedYear && currentPeriod.term === t;

                return (
                  <button
                    key={t}
                    onClick={() => setActiveTabTerm(t)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#2F6F63] dark:bg-[#5EBAA4] text-white dark:text-[#181C21] shadow-xs'
                        : 'text-[#717885] dark:text-[#8E949F] hover:text-[#1B2430] dark:hover:text-white'
                    }`}
                  >
                    {getSeasonIcon(t)}
                    <span>Term {t}</span>
                    {isCurrent && (
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-300' : 'bg-[#2F6F63] animate-pulse'}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Subject/Class Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-[#717885] dark:text-[#8E949F] font-medium whitespace-nowrap">Class Pacing:</span>
              <select
                value={filterClass}
                onChange={e => setFilterClass(e.target.value as GradeClass | 'ALL')}
                className="bg-[#F6F5F0] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842] text-[#1B2430] dark:text-[#EDEEE7] text-xs rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:ring-1 focus:ring-[#2F6F63]"
              >
                <option value="ALL">All Subjects &amp; Classes</option>
                <option value="8A">Grade 8A (Technology)</option>
                <option value="8B">Grade 8B (Technology)</option>
                <option value="9A">Grade 9A (Technology)</option>
                <option value="9B">Grade 9B (Technology)</option>
                <option value="10">Grade 10 (Mathematical Literacy)</option>
                <option value="11">Grade 11 (Mathematical Literacy)</option>
                <option value="12">Grade 12 (Mathematical Literacy)</option>
              </select>
            </div>
          </div>

          {/* Active Term Overview Card */}
          {termInfo && (
            <div className="mt-4 p-4 rounded-xl bg-[#F6F5F0] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842] grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[#717885] dark:text-[#8E949F] block text-[11px] uppercase font-semibold">Term Date Window</span>
                <span className="font-bold text-[#1B2430] dark:text-[#EDEEE7] text-sm">
                  {new Date(termInfo.startDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })} – {new Date(termInfo.endDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="text-[#717885] dark:text-[#8E949F] block text-[11px]">{termInfo.seasonLabel}</span>
              </div>

              <div>
                <span className="text-[#717885] dark:text-[#8E949F] block text-[11px] uppercase font-semibold">Duration &amp; Days</span>
                <span className="font-bold text-[#1B2430] dark:text-[#EDEEE7]">
                  {termInfo.totalWeeks} Academic Weeks
                </span>
                <span className="text-[#717885] dark:text-[#8E949F] block text-[11px]">
                  {termInfo.totalSchoolDays} Gazetted School Days
                </span>
              </div>

              <div className="md:col-span-2">
                <span className="text-[#717885] dark:text-[#8E949F] block text-[11px] uppercase font-semibold">Public &amp; School Holidays</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {termInfo.holidays.length > 0 ? (
                    termInfo.holidays.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60"
                      >
                        <Flag className="w-2.5 h-2.5" />
                        {new Date(h.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}: {h.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">No public holidays in this term</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Week-by-Week ATP Alignment Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#717885] dark:text-[#8E949F] uppercase tracking-wider">
              Term {activeTabTerm} Curriculum Schedule &amp; Assessment Milestones ({termInfo?.weeks.length} Weeks)
            </h3>
            <span className="text-xs text-[#717885] dark:text-[#8E949F]">
              Click on any week to synchronize entire teaching desk
            </span>
          </div>

          <div className="space-y-3">
            {termInfo?.weeks.map(weekInfo => {
              const isSelected = selectedTerm === weekInfo.term && selectedWeek === weekInfo.week;
              const isLiveCurrentWeek = currentPeriod.year === selectedYear && currentPeriod.term === weekInfo.term && currentPeriod.week === weekInfo.week;

              // Calculate pacing status
              const pacing = getATPPacingStatus(
                { term: weekInfo.term, week: weekInfo.week } as ATPItem,
                currentPeriod.term,
                currentPeriod.week
              );

              // Gather sample ATP topics for this week
              const sampleClasses: GradeClass[] = filterClass === 'ALL' 
                ? ['8A', '9A', '10', '11', '12'] 
                : [filterClass];

              const atpMatches = sampleClasses
                .map(cls => ({ cls, atp: getATPForClassAndWeek(cls, weekInfo.term, weekInfo.week) }))
                .filter(m => m.atp !== undefined);

              return (
                <div
                  key={weekInfo.week}
                  className={`p-4 rounded-xl border transition-all ${
                    isLiveCurrentWeek
                      ? 'bg-[#F0F6F4] dark:bg-[#162723] border-[#2F6F63] dark:border-[#5EBAA4] ring-1 ring-[#2F6F63]'
                      : isSelected
                      ? 'bg-[#F2F5F9] dark:bg-[#182332] border-[#35507C] dark:border-[#87AADE]'
                      : 'bg-white dark:bg-[#20252B] border-[#DCDCD3] dark:border-[#323842] hover:border-[#2F6F63]/50'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
                    {/* Week Title & Dates */}
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-white dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842] shadow-2xs font-mono">
                        <span className="text-[10px] uppercase font-bold text-[#717885] dark:text-[#8E949F]">Wk</span>
                        <span className="text-xl font-bold text-[#1B2430] dark:text-[#EDEEE7] leading-none">{weekInfo.week}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#1B2430] dark:text-[#EDEEE7]">
                            {weekInfo.dateRangeLong}
                          </h4>

                          {/* Pacing Badge */}
                          {isLiveCurrentWeek ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1A2E28] text-[#92DAC8] border border-[#2E584D] animate-pulse">
                              ● Current Live Week
                            </span>
                          ) : pacing === 'completed' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-[#252B33] text-slate-600 dark:text-slate-400">
                              Upcoming
                            </span>
                          )}

                          {weekInfo.isExamWeek && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
                              Formal Assessment Window
                            </span>
                          )}
                        </div>

                        {/* Day-by-Day Calendar Strip */}
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                          {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const).map(day => {
                            const d = weekInfo.days[day];
                            if (!d) return null;

                            return (
                              <span
                                key={day}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono border ${
                                  d.isHoliday
                                    ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                                    : d.isSchoolClosed
                                    ? 'bg-slate-100 dark:bg-[#181C21] text-slate-500 border-slate-200 dark:border-[#323842]'
                                    : 'bg-white dark:bg-[#181C21] text-[#1B2430] dark:text-[#EDEEE7] border-[#DCDCD3] dark:border-[#323842]'
                                }`}
                                title={d.fullDate + (d.holidayName ? ` - ${d.holidayName}` : '')}
                              >
                                <span className="font-semibold text-[10px] uppercase text-[#717885] dark:text-[#8E949F]">{day.slice(0, 3)}</span>
                                <span>{d.displayDate}</span>
                                {d.holidayName && (
                                  <span className="text-[9px] font-sans text-amber-700 dark:text-amber-400 ml-0.5">({d.holidayName})</span>
                                )}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Action: Select This Week */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onSelectTermAndWeek(weekInfo.term, weekInfo.week);
                          onClose();
                        }}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2F6F63] text-white shadow-2xs font-bold'
                            : 'bg-[#F6F5F0] dark:bg-[#252B33] text-[#1B2430] dark:text-[#EDEEE7] hover:bg-[#EAE8DF] dark:hover:bg-[#2C333D] border border-[#DCDCD3] dark:border-[#323842]'
                        }`}
                      >
                        {isSelected ? 'Currently Selected' : 'Sync Timetable to This Week'}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* SBA Milestone or Special Notes */}
                  {(weekInfo.sbaMilestone || weekInfo.specialNotes) && (
                    <div className="mt-3 pt-2.5 border-t border-[#DCDCD3]/60 dark:border-[#323842]/60 flex flex-wrap items-center gap-3 text-xs">
                      {weekInfo.sbaMilestone && (
                        <div className="inline-flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-semibold">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span>SBA Milestone: {weekInfo.sbaMilestone}</span>
                        </div>
                      )}
                      {weekInfo.specialNotes && (
                        <span className="text-slate-500 dark:text-slate-400 italic">
                          • {weekInfo.specialNotes}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Associated ATP Topics Scheduled for This Week */}
                  {atpMatches.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#DCDCD3]/60 dark:border-[#323842]/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {atpMatches.map(({ cls, atp }) => {
                        if (!atp) return null;
                        const classMeta = CLASSES_CONFIG[cls];
                        const isTech = classMeta.subject === 'Technology';

                        return (
                          <div
                            key={cls}
                            className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                              isTech
                                ? 'bg-[#F0F6F4] dark:bg-[#162723] border-[#B8D8CD] dark:border-[#2E584D]'
                                : 'bg-[#F2F5F9] dark:bg-[#182332] border-[#BDCDDF] dark:border-[#2F4463]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-[11px] text-[#1B2430] dark:text-[#EDEEE7]">
                                  {classMeta.name}
                                </span>
                                {atp.formalAssessment && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-bold">
                                    SBA
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] font-semibold text-[#2F6F63] dark:text-[#92DAC8] line-clamp-1">
                                {atp.capsTopic}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                                {atp.coreConcepts[0]}
                              </p>
                            </div>

                            <div className="mt-2 pt-1 border-t border-[#DCDCD3]/40 dark:border-[#323842]/40 flex items-center justify-between text-[10px]">
                              <span className="text-slate-400 font-mono">CAPS Pacing</span>
                              {onNavigateToPlanner && (
                                <button
                                  onClick={() => {
                                    onSelectTermAndWeek(weekInfo.term, weekInfo.week);
                                    onNavigateToPlanner(cls);
                                    onClose();
                                  }}
                                  className="text-[#2F6F63] dark:text-[#92DAC8] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
                                >
                                  Open Lesson Plan <ChevronRight className="w-2.5 h-2.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F6F5F0] dark:bg-[#181C21] border-t border-[#DCDCD3] dark:border-[#323842] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#717885] dark:text-[#8E949F]">
            Gazetted South African National School Calendar (DBE &amp; IEB) • 200 School Days
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#21262D] text-white hover:bg-[#323842] font-semibold cursor-pointer"
          >
            Close Calendar View
          </button>
        </div>
      </div>
    </div>
  );
};
