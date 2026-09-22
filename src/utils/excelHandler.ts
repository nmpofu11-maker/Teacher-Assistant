import * as XLSX from 'xlsx';
import { ATPItem, ClassInfo, TimetableSlot, GradeClass } from '../types';
import { TIME_SLOTS, DAYS_OF_WEEK } from '../data/timetableData';
import { CLASSES_CONFIG, MASTER_ATP_DATA } from '../data/atpData';
import { getAcademicWeekInfo, getFormattedWeekRange } from '../data/calendarData';

export function getATPForClassAndWeek(classId: GradeClass, term: number, week: number, year: number = 2026): ATPItem | undefined {
  const classInfo = CLASSES_CONFIG[classId];
  if (!classInfo) return undefined;

  const found = MASTER_ATP_DATA.find(
    item =>
      item.subject === classInfo.subject &&
      String(item.grade) === String(classInfo.grade) &&
      item.term === term &&
      item.week === week
  );

  if (found) {
    const weekInfo = getAcademicWeekInfo(term, week, year);
    return {
      ...found,
      calendarDateRange: weekInfo?.dateRangeLong || getFormattedWeekRange(term, week, year, 'long'),
    };
  }
  return undefined;
}

export function exportMasterTimetableExcel(
  timetableSlots: TimetableSlot[],
  term: number,
  week: number,
  year: number = 2026
) {
  const workbook = XLSX.utils.book_new();
  const weekInfo = getAcademicWeekInfo(term, week, year);
  const weekRangeLabel = weekInfo ? weekInfo.dateRangeShort : `Term ${term} Week ${week}`;

  // 1. MASTER TIMETABLE SHEET
  // Enrich day headers with specific dates if available
  const masterHeaders = [
    'Period', 
    'Time Slot', 
    ...DAYS_OF_WEEK.map(day => {
      const dayDetail = weekInfo?.days[day];
      return dayDetail ? `${day} (${dayDetail.displayDate}${dayDetail.isHoliday ? ' - Holiday' : ''})` : day;
    })
  ];
  const dayKeyMap: Record<string, string> = {};
  DAYS_OF_WEEK.forEach(day => {
    const dayDetail = weekInfo?.days[day];
    dayKeyMap[day] = dayDetail ? `${day} (${dayDetail.displayDate}${dayDetail.isHoliday ? ' - Holiday' : ''})` : day;
  });

  const masterRows: any[] = [];

  TIME_SLOTS.forEach(slotInfo => {
    const row: any = {
      Period: slotInfo.period > 0 ? `Period ${slotInfo.period}` : slotInfo.label,
      'Time Slot': slotInfo.time,
    };

    DAYS_OF_WEEK.forEach(day => {
      const headerKey = dayKeyMap[day];
      const match = timetableSlots.find(
        s => s.day === day && s.timeSlot === slotInfo.time
      );

      if (!match || match.type === 'free') {
        row[headerKey] = '--- (Free)';
      } else if (match.type === 'break' || match.type === 'admin') {
        row[headerKey] = '-X- (Break / Admin)';
      } else if (match.type === 'lesson') {
        const atp = match.targetClassId ? getATPForClassAndWeek(match.targetClassId, term, week, year) : undefined;
        const topicText = atp ? atp.capsTopic : '(No topic set)';
        const teachers = match.teachers?.join(', ') || 'Mr. Mpofu';
        const classes = match.classes?.join(', ') || match.targetClassId;
        const subject = match.subject || '';
        const doubleBadge = match.isDoublePeriod ? ` [Double Period Pt ${match.doublePeriodPart}]` : '';

        row[headerKey] = `${teachers}\n[${classes}] ${subject}${doubleBadge}\nTopic: ${topicText}`;
      }
    });

    masterRows.push(row);
  });

  const masterWorksheet = XLSX.utils.json_to_sheet(masterRows, { header: masterHeaders });
  // Set column widths
  masterWorksheet['!cols'] = [
    { wch: 15 },
    { wch: 16 },
    { wch: 32 },
    { wch: 32 },
    { wch: 32 },
    { wch: 32 },
    { wch: 32 },
  ];

  XLSX.utils.book_append_sheet(workbook, masterWorksheet, `Master_T${term}_W${week}`);

  // 2. CLASS-BY-CLASS DETAILED SHEETS
  const classKeys = Object.keys(CLASSES_CONFIG) as GradeClass[];
  classKeys.forEach(classId => {
    const classInfo = CLASSES_CONFIG[classId];
    const classRows: any[] = [];

    TIME_SLOTS.filter(s => s.period > 0).forEach(slotInfo => {
      const row: any = {
        Period: `Period ${slotInfo.period}`,
        'Time Slot': slotInfo.time,
      };

      DAYS_OF_WEEK.forEach(day => {
        const match = timetableSlots.find(
          s =>
            s.day === day &&
            s.timeSlot === slotInfo.time &&
            (s.targetClassId === classId || (s.classes && s.classes.some(c => c.startsWith(classId) || c === classId)))
        );

        if (match) {
          const atp = getATPForClassAndWeek(classId, term, week);
          const doubleNote = match.isDoublePeriod ? ` (Double Pt ${match.doublePeriodPart})` : '';
          row[day] = `YES: ${match.subject}${doubleNote}\nTopic: ${atp ? atp.capsTopic : 'General'}\nRoom: ${match.room || 'Main'}`;
        } else {
          row[day] = '---';
        }
      });

      classRows.push(row);
    });

    const classWorksheet = XLSX.utils.json_to_sheet(classRows, { header: masterHeaders });
    classWorksheet['!cols'] = [
      { wch: 12 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
    ];
    XLSX.utils.book_append_sheet(workbook, classWorksheet, `Class_${classId}`);
  });

  // 3. COMPLETE CAPS ATP CURRICULUM SHEET
  const atpRows = MASTER_ATP_DATA.map(item => ({
    Subject: item.subject,
    Grade: item.grade,
    Term: item.term,
    Week: item.week,
    'CAPS Topic': item.capsTopic,
    'Core Concepts': item.coreConcepts.join(' | '),
    'Requisite Pre-Knowledge': item.requisitePreKnowledge,
    'Resources': item.resources.join(', '),
    'Informal Assessment': item.informalAssessment,
    'Formal SBA Assessment': item.formalAssessment || 'None',
    'CAPS Page No': item.capsPageNo || '',
  }));

  const atpWorksheet = XLSX.utils.json_to_sheet(atpRows);
  atpWorksheet['!cols'] = [
    { wch: 20 },
    { wch: 8 },
    { wch: 6 },
    { wch: 6 },
    { wch: 35 },
    { wch: 55 },
    { wch: 30 },
    { wch: 30 },
    { wch: 30 },
    { wch: 25 },
    { wch: 12 },
  ];
  XLSX.utils.book_append_sheet(workbook, atpWorksheet, 'CAPS_ATP_Master_Database');

  const dateSlug = weekInfo ? `_(${weekInfo.dateRangeShort.replace(/[\s–/]+/g, '_')})` : '';
  const fileName = `Weekly_Timetable_${year}_T${term}_W${week}${dateSlug}_Populated_ATP.xlsx`;
  XLSX.writeFile(workbook, fileName);
  return fileName;
}

export interface ParseExcelResult {
  success: boolean;
  slots: TimetableSlot[];
  message: string;
  matchedCount: number;
}

export function parseAndPopulateUploadedExcel(
  arrayBuffer: ArrayBuffer,
  currentTerm: number,
  currentWeek: number
): ParseExcelResult {
  try {
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (!jsonData || jsonData.length === 0) {
      return { success: false, slots: [], message: 'Uploaded file is empty or could not be parsed.', matchedCount: 0 };
    }

    const updatedSlots: TimetableSlot[] = [];
    let matchCount = 0;

    // Find header row containing days
    let dayIndices: { [day: string]: number } = {};
    let headerRowIdx = -1;

    for (let r = 0; r < Math.min(jsonData.length, 10); r++) {
      const row = jsonData[r];
      if (Array.isArray(row)) {
        DAYS_OF_WEEK.forEach(day => {
          const colIdx = row.findIndex((cell: any) => typeof cell === 'string' && cell.toLowerCase().includes(day.toLowerCase()));
          if (colIdx !== -1) {
            dayIndices[day] = colIdx;
            headerRowIdx = r;
          }
        });
      }
    }

    // If day headers were found, parse periods
    if (headerRowIdx !== -1 && Object.keys(dayIndices).length > 0) {
      for (let r = headerRowIdx + 1; r < jsonData.length; r++) {
        const row = jsonData[r];
        if (!row || row.length === 0) continue;

        // Try to find time slot or period in col 0 or 1
        const timeCell = String(row[0] || row[1] || '');
        const matchedTimeSlot = TIME_SLOTS.find(ts => 
          timeCell.includes(ts.time.split('-')[0].trim()) || 
          timeCell.toLowerCase().includes(`period ${ts.period}`)
        );

        const timeStr = matchedTimeSlot ? matchedTimeSlot.time : `Period ${r - headerRowIdx}`;
        const periodNum = matchedTimeSlot ? matchedTimeSlot.period : (r - headerRowIdx);

        DAYS_OF_WEEK.forEach(day => {
          const colIdx = dayIndices[day];
          if (colIdx !== undefined && row[colIdx] !== undefined) {
            const cellText = String(row[colIdx]).trim();
            const lower = cellText.toLowerCase();

            let type: TimetableSlot['type'] = 'lesson';
            let targetClass: GradeClass | undefined;
            let subject: TimetableSlot['subject'];
            let teachers: string[] = ['Mr. Mpofu'];
            let classes: string[] = [];

            if (lower.includes('-x-') || lower.includes('break') || lower.includes('admin')) {
              type = 'break';
            } else if (lower.includes('---') || lower.includes('free') || cellText === '') {
              type = 'free';
            } else {
              // Match class
              if (cellText.includes('8A')) { targetClass = '8A'; classes = ['8A']; subject = 'Technology'; }
              else if (cellText.includes('8B')) { targetClass = '8B'; classes = ['8B']; subject = 'Technology'; }
              else if (cellText.includes('9A')) { targetClass = '9A'; classes = ['9A']; subject = 'Technology'; }
              else if (cellText.includes('9B')) { targetClass = '9B'; classes = ['9B']; subject = 'Technology'; }
              else if (cellText.includes('10A') || cellText.includes('10B') || cellText.includes('10')) {
                targetClass = '10';
                classes = ['10A', '10B'];
                subject = 'Mathematical Literacy';
                teachers = ['Mr. Banda', 'Mr. Mpofu', 'Mr. Magagula'];
              } else if (cellText.includes('11A') || cellText.includes('11B') || cellText.includes('11')) {
                targetClass = '11';
                classes = ['11A', '11B'];
                subject = 'Mathematical Literacy';
                teachers = ['Mr. Banda', 'Mr. Mpofu'];
              } else if (cellText.includes('12A') || cellText.includes('12B') || cellText.includes('12')) {
                targetClass = '12';
                classes = ['12A', '12B'];
                subject = 'Mathematical Literacy';
                teachers = ['Mr. Banda', 'Mr. Mpofu'];
              } else if (cellText.includes('AS1') || cellText.includes('Buss')) {
                type = 'free';
              }

              if (targetClass) matchCount++;
            }

            updatedSlots.push({
              id: `imported-${day.toLowerCase()}-p${periodNum}-${Math.random().toString(36).substring(2, 6)}`,
              day,
              timeSlot: timeStr,
              periodNumber: periodNum,
              type,
              targetClassId: targetClass,
              teachers: type === 'lesson' ? teachers : undefined,
              classes: type === 'lesson' ? classes : undefined,
              subject,
            });
          }
        });
      }
    }

    return {
      success: true,
      slots: updatedSlots.length > 0 ? updatedSlots : [],
      message: `Successfully processed Excel timetable! Identified ${matchCount} class lessons and synced with CAPS ATP Term ${currentTerm} Week ${currentWeek}.`,
      matchedCount: matchCount,
    };
  } catch (err: any) {
    return {
      success: false,
      slots: [],
      message: `Failed to parse Excel file: ${err.message}`,
      matchedCount: 0,
    };
  }
}
