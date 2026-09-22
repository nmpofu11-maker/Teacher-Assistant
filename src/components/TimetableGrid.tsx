import React, { useState } from 'react';
import { 
  Clock, 
  Sparkles, 
  Presentation, 
  FileCheck, 
  BookOpen, 
  Coffee,
  ChevronRight,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TimetableSlot, GradeClass, ATPItem } from '../types';
import { TIME_SLOTS, DAYS_OF_WEEK } from '../data/timetableData';
import { CLASSES_CONFIG } from '../data/atpData';
import { getATPForClassAndWeek } from '../utils/excelHandler';
import { getAcademicWeekInfo, detectAcademicPeriod } from '../data/calendarData';

interface TimetableGridProps {
  slots: TimetableSlot[];
  term: number;
  week: number;
  year?: number;
  classFilter: GradeClass | 'ALL';
  onSelectLesson: (slot: TimetableSlot, atp: ATPItem) => void;
  onQuickGenerateSlides: (slot: TimetableSlot, atp: ATPItem) => void;
  onQuickGenerateWorksheet: (slot: TimetableSlot, atp: ATPItem) => void;
  onQuickChat: (slot: TimetableSlot, atp: ATPItem) => void;
  onOpenCalendarModal?: () => void;
  onJumpToCurrentWeek?: () => void;
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  slots,
  term,
  week,
  year = 2026,
  classFilter,
  onSelectLesson,
  onQuickGenerateSlides,
  onQuickGenerateWorksheet,
  onQuickChat,
  onOpenCalendarModal,
  onJumpToCurrentWeek,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<TimetableSlot | null>(null);
  const weekInfo = getAcademicWeekInfo(term, week, year);
  const currentPeriod = detectAcademicPeriod();
  const isLiveWeek = currentPeriod.year === year && currentPeriod.term === term && currentPeriod.week === week;

  const getSlotForDayAndTime = (day: string, time: string): TimetableSlot | undefined => {
    return slots.find(s => s.day === day && s.timeSlot === time);
  };

  // Pacing intelligence: Calculate Lesson X of N for this class in this week
  const getLessonIndexInWeek = (slot: TimetableSlot): { index: number; total: number } => {
    if (slot.type !== 'lesson' || !slot.targetClassId) return { index: 0, total: 0 };
    const classId = slot.targetClassId;
    const dayOrder: Record<string, number> = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5 };

    const classSlots = slots
      .filter(s => s.type === 'lesson' && (s.targetClassId === classId || (s.classes && s.classes.some(c => c.startsWith(classId) || c === classId))))
      .sort((a, b) => {
        const dayDiff = (dayOrder[a.day] || 0) - (dayOrder[b.day] || 0);
        if (dayDiff !== 0) return dayDiff;
        return a.periodNumber - b.periodNumber;
      });

    const slotIndex = classSlots.findIndex(s => s.id === slot.id);
    return {
      index: slotIndex >= 0 ? slotIndex + 1 : 1,
      total: classSlots.length || 3
    };
  };

  const getCellStyling = (slot?: TimetableSlot) => {
    if (!slot) return 'bg-white dark:bg-[#20252B] border-[#DCDCD3] dark:border-[#323842] text-[#717885] dark:text-[#8E949F]';
    if (slot.type === 'break' || slot.type === 'admin') {
      return 'bg-[#F2EFE8] dark:bg-[#1E232A] border-[#DCDCD3] dark:border-[#323842] text-[#717885] dark:text-[#8E949F] font-medium';
    }
    if (slot.type === 'free') {
      return 'bg-white dark:bg-[#20252B] border-[#DCDCD3] dark:border-[#323842] text-[#A2A7B0] dark:text-[#525964] hover:bg-[#F6F5F0] dark:hover:bg-[#262C34]';
    }

    // Active Lesson Styling based on Subject (Atelier palette)
    if (slot.subject === 'Mathematical Literacy') {
      return 'bg-[#F2F5F9] hover:bg-[#E8EEF5] dark:bg-[#182332] dark:hover:bg-[#1F2C3E] border-[#BDCDDF] dark:border-[#2F4463] text-[#1B2430] dark:text-[#EDEEE7] shadow-2xs';
    }
    if (slot.subject === 'Technology') {
      return 'bg-[#F0F6F4] hover:bg-[#E6EFEA] dark:bg-[#162723] dark:hover:bg-[#1D322D] border-[#B8D8CD] dark:border-[#2E584D] text-[#1B2430] dark:text-[#EDEEE7] shadow-2xs';
    }

    return 'bg-[#F6F5F0] hover:bg-[#EAE8DF] dark:bg-[#21262D] dark:hover:bg-[#282F38] border-[#DCDCD3] dark:border-[#323842] text-[#1B2430] dark:text-[#EDEEE7]';
  };

  const isSlotHighlighted = (slot?: TimetableSlot) => {
    if (!slot || slot.type !== 'lesson') return false;
    if (classFilter === 'ALL') return true;
    if (slot.targetClassId === classFilter) return true;
    if (slot.classes && slot.classes.some(c => c.startsWith(classFilter) || c === classFilter)) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Master Timetable Header Banner */}
      <div className="bg-[#21262D] text-[#EDEEE7] rounded-2xl p-6 shadow-xs border border-[#323842]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h2 className="text-xl font-bold tracking-tight font-serif">Mr. Mpofu — Weekly Timetable</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1A2E28] text-[#92DAC8] border border-[#2E584D] font-semibold">
                Live ATP Synced • Term {term} Week {week}
              </span>
              {weekInfo && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#182332] text-[#AFCBEA] border border-[#2F4463] font-mono font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#87AADE]" />
                  {weekInfo.dateRangeLong}
                </span>
              )}
              {isLiveWeek && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800 font-bold flex items-center gap-1 animate-pulse">
                  ● Current Live Week
                </span>
              )}
            </div>
            <p className="text-xs text-[#A2A7B0]">
              Technology 8A, 8B, 9A, 9B &amp; Mathematical Literacy 10, 11, 12. Paced against the official South African gazetted academic calendar.
            </p>
          </div>

          {/* Quick Actions & Legend */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
            {onOpenCalendarModal && (
              <button
                onClick={onOpenCalendarModal}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#2F6F63] hover:bg-[#25574E] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Calendar &amp; ATP Alignment</span>
              </button>
            )}

            {onJumpToCurrentWeek && !isLiveWeek && (
              <button
                onClick={onJumpToCurrentWeek}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#35507C] hover:bg-[#2A4064] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Jump to Today ({currentPeriod.matchedWeek?.dateRangeShort})</span>
              </button>
            )}

            {/* Color-Coded Legend */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs bg-[#181C21] p-2 rounded-xl border border-[#323842]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1B2738] text-[#AFCBEA] font-semibold text-[11px] border border-[#2F4463]">
                <span className="w-2 h-2 rounded-full bg-[#87AADE]"></span> Math Lit
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1A2E28] text-[#92DAC8] font-semibold text-[11px] border border-[#2E584D]">
                <span className="w-2 h-2 rounded-full bg-[#5EBAA4]"></span> Technology
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#382C18] text-[#D9A24B] font-semibold text-[11px] border border-[#524124]">
                <Layers className="w-2.5 h-2.5 text-[#D9A24B]" /> Double
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Timetable Grid */}
      <div className="bg-white dark:bg-[#20252B] rounded-2xl shadow-xs border border-[#DCDCD3] dark:border-[#323842] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse text-left">
            <thead>
              <tr className="bg-[#F6F5F0] dark:bg-[#181C21] text-[#1B2430] dark:text-[#EDEEE7] text-xs tracking-wider uppercase border-b border-[#DCDCD3] dark:border-[#323842]">
                <th className="py-3 px-4 w-36 font-bold text-center border-r border-[#DCDCD3] dark:border-[#323842]">Bell Schedule</th>
                {DAYS_OF_WEEK.map(day => {
                  const dayDetail = weekInfo?.days[day];
                  const todayStr = new Date().toISOString().split('T')[0];
                  const isToday = dayDetail && dayDetail.fullDate === todayStr;

                  return (
                    <th
                      key={day}
                      className={`py-3 px-3 font-bold border-r border-[#DCDCD3] dark:border-[#323842] last:border-r-0 text-center transition-colors ${
                        isToday
                          ? 'bg-[#EBF5F2] dark:bg-[#142A24] text-[#1D453D] dark:text-[#92DAC8]'
                          : ''
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1.5">
                          <span>{day}</span>
                          {isToday && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#2F6F63] text-white">
                              Today
                            </span>
                          )}
                        </div>
                        {dayDetail && (
                          <div className="mt-0.5 flex items-center gap-1">
                            <span className={`text-[11px] font-mono normal-case tracking-normal ${
                              dayDetail.isHoliday 
                                ? 'text-amber-700 dark:text-amber-300 font-bold' 
                                : 'text-[#717885] dark:text-[#8E949F] font-normal'
                            }`}>
                              {dayDetail.displayDate}
                            </span>
                            {dayDetail.isHoliday && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-sans font-semibold">
                                {dayDetail.holidayName}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCDCD3] dark:divide-[#323842] text-xs">
              {TIME_SLOTS.map(slotInfo => {
                const isBreakRow = slotInfo.isBreak;

                return (
                  <tr key={slotInfo.id} className={isBreakRow ? 'bg-[#F9F8F5] dark:bg-[#1A1F25]' : 'hover:bg-[#FAF9F5] dark:hover:bg-[#242A32]'}>
                    {/* Time Column */}
                    <td className="py-3 px-3 text-center font-bold text-[#1B2430] dark:text-[#EDEEE7] border-r border-[#DCDCD3] dark:border-[#323842] bg-[#F6F5F0] dark:bg-[#181C21] whitespace-nowrap font-mono">
                      <div className="text-[11px]">{slotInfo.time}</div>
                      {slotInfo.period > 0 ? (
                        <span className="text-[10px] font-semibold text-[#717885] dark:text-[#8E949F]">Period {slotInfo.period} (45m)</span>
                      ) : (
                        <span className="text-[10px] font-semibold text-[#B4791E] dark:text-[#D9A24B] flex items-center justify-center gap-1 mt-0.5">
                          <Coffee className="w-2.5 h-2.5" /> Tea Break / Interval
                        </span>
                      )}
                    </td>

                    {/* Day Columns */}
                    {DAYS_OF_WEEK.map(day => {
                      const slot = getSlotForDayAndTime(day, slotInfo.time);
                      const highlighted = isSlotHighlighted(slot);
                      const atp = slot?.targetClassId ? getATPForClassAndWeek(slot.targetClassId, term, week) : undefined;
                      const opacityClass = classFilter !== 'ALL' && !highlighted ? 'opacity-30 grayscale-40' : 'opacity-100';

                      if (!slot || slot.type === 'free') {
                        return (
                          <td
                            key={`${day}-${slotInfo.id}`}
                            className="py-3 px-3 text-center border-r border-[#DCDCD3] dark:border-[#323842] last:border-r-0 bg-white dark:bg-[#20252B] text-[#A2A7B0] dark:text-[#525964] font-mono text-xs"
                          >
                            ---
                          </td>
                        );
                      }

                      if (slot.type === 'break' || slot.type === 'admin') {
                        return (
                          <td
                            key={`${day}-${slotInfo.id}`}
                            className="py-3 px-3 text-center border-r border-[#DCDCD3] dark:border-[#323842] last:border-r-0 bg-[#F2EFE8] dark:bg-[#1A1F25] text-[#717885] dark:text-[#8E949F] font-semibold font-mono"
                          >
                            -X-
                          </td>
                        );
                      }

                      // Pacing badge
                      const { index: lessonIndex, total: totalLessons } = getLessonIndexInWeek(slot);

                      // Active Lesson Cell
                      return (
                        <td
                          key={`${day}-${slotInfo.id}`}
                          onClick={() => {
                            setSelectedSlot(slot);
                            if (atp) onSelectLesson(slot, atp);
                          }}
                          className={`p-2.5 border-r border-[#DCDCD3] dark:border-[#323842] last:border-r-0 transition-all cursor-pointer relative group ${getCellStyling(
                            slot
                          )} ${opacityClass}`}
                        >
                          <div className="flex flex-col h-full justify-between gap-1.5">
                            {/* Class & Subject Header */}
                            <div>
                              <div className="flex items-center justify-between gap-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-[#1B2430] dark:text-[#EDEEE7] text-xs">
                                    {slot.classes?.join(', ')}
                                  </span>
                                  {slot.isDoublePeriod && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#F7EEDB] text-[#B4791E] dark:bg-[#382C18] dark:text-[#D9A24B] border border-[#F2DEB9] dark:border-[#524124]">
                                      2× Pt {slot.doublePeriodPart}
                                    </span>
                                  )}
                                </div>
                                <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                                  slot.subject === 'Technology'
                                    ? 'bg-[#E6EFEA] text-[#1D453D] dark:bg-[#1A2E28] dark:text-[#92DAC8]'
                                    : 'bg-[#E8EEF5] text-[#233A5C] dark:bg-[#1B2738] dark:text-[#AFCBEA]'
                                }`}>
                                  {slot.subject === 'Technology' ? 'Tech' : 'MathLit'}
                                </span>
                              </div>

                              <div className="text-[10px] font-medium text-[#717885] dark:text-[#8E949F] mt-0.5">
                                {slot.teachers?.join(', ')}
                              </div>
                            </div>

                            {/* Pacing indicator & Double Period status */}
                            <div className="space-y-0.5">
                              {lessonIndex > 0 && (
                                <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#B4791E] dark:text-[#D9A24B]">
                                  <Clock className="w-2.5 h-2.5" />
                                  <span>Lesson {lessonIndex} of {totalLessons} this week</span>
                                </div>
                              )}
                              {slot.isDoublePeriod && (
                                <div className="flex items-center gap-1 text-[10px] font-medium text-[#2F6F63] dark:text-[#5EBAA4]">
                                  <Layers className="w-2.5 h-2.5" />
                                  <span>Double Period • 90m block</span>
                                </div>
                              )}
                            </div>

                            {/* Live Topic from ATP */}
                            <div className="pt-1 border-t border-[#DCDCD3]/70 dark:border-[#323842] text-[11px] leading-snug">
                              {atp ? (
                                <span className="font-medium text-[#1B2430] dark:text-[#EDEEE7] line-clamp-2">
                                  {atp.capsTopic}
                                </span>
                              ) : (
                                <span className="text-[#8E949F] italic">(not entered)</span>
                              )}
                            </div>

                            {/* Hover prompt */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between pt-1 text-[10px] text-[#2F6F63] dark:text-[#5EBAA4] font-semibold border-t border-[#DCDCD3]/70 dark:border-[#323842]">
                              <span>Open 45m Kit</span>
                              <ChevronRight className="w-3 h-3" />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Lesson Quick-Action Modal / Drawer */}
      {selectedSlot && selectedSlot.targetClassId && (
        <div className="bg-white dark:bg-[#20252B] rounded-2xl p-6 border border-[#DCDCD3] dark:border-[#323842] shadow-xs transition-all">
          {(() => {
            const classInfo = CLASSES_CONFIG[selectedSlot.targetClassId];
            const atp = getATPForClassAndWeek(selectedSlot.targetClassId, term, week, year);
            const { index: lessonIndex, total: totalLessons } = getLessonIndexInWeek(selectedSlot);
            const dayDetail = weekInfo?.days[selectedSlot.day];

            return (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#DCDCD3] dark:border-[#323842]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${classInfo.color.badge}`}>
                        {classInfo.name}
                      </span>
                      <span className="text-xs font-semibold text-[#717885] dark:text-[#8E949F]">
                        {selectedSlot.day} • {selectedSlot.timeSlot} (Period {selectedSlot.periodNumber})
                      </span>
                      {dayDetail && (
                        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-white dark:bg-[#181C21] text-[#1B2430] dark:text-[#EDEEE7] border border-[#DCDCD3] dark:border-[#323842]">
                          📅 {dayDetail.displayDate} {year}
                        </span>
                      )}
                      {lessonIndex > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-[#F7EEDB] dark:bg-[#382C18] text-[#B4791E] dark:text-[#D9A24B] font-bold border border-[#F2DEB9] dark:border-[#524124]">
                          Lesson {lessonIndex} of {totalLessons} this week
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#1B2430] dark:text-[#EDEEE7] mt-1 font-serif">
                      {atp ? atp.capsTopic : 'CAPS Curriculum Topic'}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedSlot(null)}
                    className="text-xs text-[#717885] hover:text-[#1B2430] dark:text-[#8E949F] dark:hover:text-white font-semibold px-2 py-1 cursor-pointer"
                  >
                    Close Drawer
                  </button>
                </div>

                {/* 45-Minute / 90-Minute Double Period Framework Breakdown */}
                {selectedSlot.isDoublePeriod ? (
                  <div className="bg-[#F7EEDB] dark:bg-[#251E14] p-3.5 rounded-xl border border-[#F2DEB9] dark:border-[#4D391F] text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[#B4791E] dark:text-[#D9A24B]">
                      <Layers className="w-4 h-4" />
                      <span>
                        90-Minute Double Period Block — Part {selectedSlot.doublePeriodPart} of 2 ({selectedSlot.day})
                      </span>
                    </div>
                    <p className="text-[#6D4911] dark:text-[#E0BE83] text-[11px] leading-relaxed">
                      {selectedSlot.doublePeriodPart === 1
                        ? 'Phase 1 (First 45 mins): Recap foundational knowledge, formal concept introduction, formula derivations, and initial guided walkthroughs.'
                        : 'Phase 2 (Second 45 mins): In-depth IEB past exam application, multi-step problem solving, calculator/practical mastery, and peer evaluation.'}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-1">
                      <div className="bg-white/80 dark:bg-[#1E1710] p-2 rounded-lg border border-[#F2DEB9] dark:border-[#4D391F]">
                        <div className="font-bold text-[#B4791E] dark:text-[#D9A24B]">0 – 15m</div>
                        <div className="text-[10px] text-[#717885] dark:text-[#A2A7B0]">Hook &amp; Diagnostics</div>
                      </div>
                      <div className="bg-white/80 dark:bg-[#1E1710] p-2 rounded-lg border border-[#F2DEB9] dark:border-[#4D391F]">
                        <div className="font-bold text-[#B4791E] dark:text-[#D9A24B]">15 – 45m</div>
                        <div className="text-[10px] text-[#717885] dark:text-[#A2A7B0]">Deep Theory &amp; Models</div>
                      </div>
                      <div className="bg-white/80 dark:bg-[#1E1710] p-2 rounded-lg border border-[#F2DEB9] dark:border-[#4D391F]">
                        <div className="font-bold text-[#B4791E] dark:text-[#D9A24B]">45 – 75m</div>
                        <div className="text-[10px] text-[#717885] dark:text-[#A2A7B0]">IEB Multi-step Practice</div>
                      </div>
                      <div className="bg-white/80 dark:bg-[#1E1710] p-2 rounded-lg border border-[#F2DEB9] dark:border-[#4D391F]">
                        <div className="font-bold text-[#B4791E] dark:text-[#D9A24B]">75 – 90m</div>
                        <div className="text-[10px] text-[#717885] dark:text-[#A2A7B0]">Exit Task &amp; Review</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F6F5F0] dark:bg-[#181C21] p-3.5 rounded-xl border border-[#DCDCD3] dark:border-[#323842] text-xs">
                    <div className="flex items-center gap-2 mb-2 font-semibold text-[#1B2430] dark:text-[#EDEEE7]">
                      <Clock className="w-3.5 h-3.5 text-[#2F6F63] dark:text-[#5EBAA4]" />
                      <span>45-Minute Lesson Pacing Structure (Lesson {lessonIndex} of {totalLessons}):</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                      <div className="bg-white dark:bg-[#21262D] p-2 rounded-lg border border-[#DCDCD3] dark:border-[#323842]">
                        <div className="font-bold text-[#2F6F63] dark:text-[#5EBAA4]">5 mins</div>
                        <div className="text-[10px] text-[#717885] dark:text-[#8E949F]">Starter &amp; Recap</div>
                      </div>
                      <div className="bg-white dark:bg-[#21262D] p-2 rounded-lg border border-[#DCDCD3] dark:border-[#323842]">
                        <div className="font-bold text-[#2F6F63] dark:text-[#5EBAA4]">15 mins</div>
                        <div className="text-[10px] text-[#717885] dark:text-[#8E949F]">Direct Teaching &amp; Examples</div>
                      </div>
                      <div className="bg-white dark:bg-[#21262D] p-2 rounded-lg border border-[#DCDCD3] dark:border-[#323842]">
                        <div className="font-bold text-[#2F6F63] dark:text-[#5EBAA4]">15 mins</div>
                        <div className="text-[10px] text-[#717885] dark:text-[#8E949F]">Guided Activity</div>
                      </div>
                      <div className="bg-white dark:bg-[#21262D] p-2 rounded-lg border border-[#DCDCD3] dark:border-[#323842]">
                        <div className="font-bold text-[#2F6F63] dark:text-[#5EBAA4]">7 mins</div>
                        <div className="text-[10px] text-[#717885] dark:text-[#8E949F]">Consolidation</div>
                      </div>
                      <div className="bg-white dark:bg-[#21262D] p-2 rounded-lg border border-[#DCDCD3] dark:border-[#323842]">
                        <div className="font-bold text-[#2F6F63] dark:text-[#5EBAA4]">3 mins</div>
                        <div className="text-[10px] text-[#717885] dark:text-[#8E949F]">Summary &amp; Homework</div>
                      </div>
                    </div>
                  </div>
                )}

                {atp && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-[#FAF9F5] dark:bg-[#1A1F25] p-3.5 rounded-xl border border-[#DCDCD3] dark:border-[#323842]">
                    <div>
                      <span className="font-bold text-[#1B2430] dark:text-[#EDEEE7] block mb-1">Core Concepts (ATP):</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[#4A5568] dark:text-[#A2A7B0]">
                        {atp.coreConcepts.slice(0, 3).map((c, i) => (
                          <li key={i} className="line-clamp-2">{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold text-[#1B2430] dark:text-[#EDEEE7] block mb-1">Requisite Knowledge:</span>
                      <p className="text-[#4A5568] dark:text-[#A2A7B0]">{atp.requisitePreKnowledge}</p>
                      {atp.formalAssessment && (
                        <div className="mt-2 text-[#A6402F] dark:text-[#D98B7C] font-semibold bg-[#F7E5E2] dark:bg-[#38201B] px-2 py-1 rounded-md border border-[#F2C7C1] dark:border-[#542F28] inline-block">
                          SBA: {atp.formalAssessment}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-[#1B2430] dark:text-[#EDEEE7] block mb-1">CAPS Resources &amp; Pacing:</span>
                      <p className="text-[#4A5568] dark:text-[#A2A7B0]">{atp.resources.join(', ')}</p>
                      <p className="text-[#717885] dark:text-[#8E949F] mt-1 font-mono text-[11px]">{atp.capsPageNo || '45-Minute Lesson Allocation'}</p>
                    </div>
                  </div>
                )}

                {/* 4 Clean Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    id="modal-plan-lesson-btn"
                    onClick={() => atp && onSelectLesson(selectedSlot, atp)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2F6F63] hover:bg-[#25574E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open 45-Min Lesson Plan</span>
                  </button>

                  <button
                    id="modal-generate-slides-btn"
                    onClick={() => atp && onQuickGenerateSlides(selectedSlot, atp)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#35507C] hover:bg-[#2A4064] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Presentation className="w-4 h-4" />
                    <span>Download Slides (.pptx)</span>
                  </button>

                  <button
                    id="modal-generate-worksheet-btn"
                    onClick={() => atp && onQuickGenerateWorksheet(selectedSlot, atp)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4A5568] hover:bg-[#384150] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Download Worksheet &amp; Memo (.docx)</span>
                  </button>

                  <button
                    id="modal-chat-btn"
                    onClick={() => atp && onQuickChat(selectedSlot, atp)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#B4791E] hover:bg-[#976417] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ask AI Teaching Assistant</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Teaching Load & Allocation Matrix */}
      {(() => {
        const getCount = (cId: GradeClass) =>
          slots.filter(
            s => s.type === 'lesson' && (s.targetClassId === cId || (s.classes && s.classes.some(c => c.startsWith(cId) || c === cId)))
          ).length;
        const totalTeaching = slots.filter(s => s.type === 'lesson').length;

        return (
          <div className="bg-[#FAF9F5] dark:bg-[#181C21] rounded-2xl p-5 border border-[#DCDCD3] dark:border-[#323842] text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
              <h4 className="font-bold text-[#1B2430] dark:text-[#EDEEE7] font-serif text-sm">
                Weekly Teaching Load &amp; Class Allocation Summary
              </h4>
              <span className="text-[11px] text-[#717885] dark:text-[#8E949F]">
                Double blocks: Gr 11 &amp; 12 (Thu) • Gr 10 (Fri)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              <div className="bg-white dark:bg-[#21262D] p-3 rounded-xl border border-[#DCDCD3] dark:border-[#323842] text-center">
                <span className="font-bold text-[#2F6F63] dark:text-[#5EBAA4] block text-base">{getCount('8A')}</span>
                <span className="text-[11px] text-[#4A5568] dark:text-[#A2A7B0] font-medium">8A Tech</span>
              </div>
              <div className="bg-white dark:bg-[#21262D] p-3 rounded-xl border border-[#DCDCD3] dark:border-[#323842] text-center">
                <span className="font-bold text-[#2F6F63] dark:text-[#5EBAA4] block text-base">{getCount('8B')}</span>
                <span className="text-[11px] text-[#4A5568] dark:text-[#A2A7B0] font-medium">8B Tech</span>
              </div>
              <div className="bg-white dark:bg-[#21262D] p-3 rounded-xl border border-[#DCDCD3] dark:border-[#323842] text-center">
                <span className="font-bold text-[#2F6F63] dark:text-[#5EBAA4] block text-base">{getCount('9A')}</span>
                <span className="text-[11px] text-[#4A5568] dark:text-[#A2A7B0] font-medium">9A Tech</span>
              </div>
              <div className="bg-white dark:bg-[#21262D] p-3 rounded-xl border border-[#DCDCD3] dark:border-[#323842] text-center">
                <span className="font-bold text-[#2F6F63] dark:text-[#5EBAA4] block text-base">{getCount('9B')}</span>
                <span className="text-[11px] text-[#4A5568] dark:text-[#A2A7B0] font-medium">9B Tech</span>
              </div>
              <div className="bg-white dark:bg-[#21262D] p-3 rounded-xl border border-[#DCDCD3] dark:border-[#323842] text-center">
                <span className="font-bold text-[#35507C] dark:text-[#87AADE] block text-base">{getCount('10')}</span>
                <span className="text-[11px] text-[#4A5568] dark:text-[#A2A7B0] font-medium">Gr 10 MLit</span>
              </div>
              <div className="bg-white dark:bg-[#21262D] p-3 rounded-xl border border-[#DCDCD3] dark:border-[#323842] text-center">
                <span className="font-bold text-[#35507C] dark:text-[#87AADE] block text-base">{getCount('11')}</span>
                <span className="text-[11px] text-[#4A5568] dark:text-[#A2A7B0] font-medium">Gr 11 MLit</span>
              </div>
              <div className="bg-white dark:bg-[#21262D] p-3 rounded-xl border border-[#DCDCD3] dark:border-[#323842] text-center">
                <span className="font-bold text-[#35507C] dark:text-[#87AADE] block text-base">{getCount('12')}</span>
                <span className="text-[11px] text-[#4A5568] dark:text-[#A2A7B0] font-medium">Gr 12 MLit</span>
              </div>
              <div className="bg-white dark:bg-[#21262D] p-3 rounded-xl border border-[#DCDCD3] dark:border-[#323842] text-center">
                <span className="font-bold text-[#1B2430] dark:text-[#EDEEE7] block text-base">{totalTeaching} / 40</span>
                <span className="text-[11px] text-[#717885] dark:text-[#8E949F] font-medium">Teaching Periods</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
