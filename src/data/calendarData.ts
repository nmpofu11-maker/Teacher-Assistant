import { 
  AcademicYearCalendar, 
  AcademicWeekInfo, 
  TermCalendarInfo, 
  WeekdayName, 
  CalendarDayDetail,
  ATPItem 
} from '../types';

// =========================================================================
// SOUTH AFRICAN SCHOOL CALENDAR & ATP PACING ALIGNMENT (DBE & IEB)
// Official national gazetted calendar dates for South African schools.
// =========================================================================

// Helper to create week details
function createWeek(
  term: number,
  week: number,
  startDate: string,
  endDate: string,
  dateRangeShort: string,
  dateRangeLong: string,
  days: Record<WeekdayName, CalendarDayDetail>,
  sbaMilestone?: string,
  specialNotes?: string,
  isExamWeek?: boolean
): AcademicWeekInfo {
  return {
    term,
    week,
    startDate,
    endDate,
    dateRangeShort,
    dateRangeLong,
    days,
    sbaMilestone,
    specialNotes,
    isExamWeek,
  };
}

// -------------------------------------------------------------------------
// 2026 ACADEMIC CALENDAR (South African National & IEB Unified)
// -------------------------------------------------------------------------
export const CALENDAR_2026: AcademicYearCalendar = {
  year: 2026,
  label: '2026 Academic Year (CAPS & IEB)',
  terms: {
    1: {
      term: 1,
      name: 'Term 1',
      seasonLabel: 'Summer / Autumn',
      startDate: '2026-01-14',
      endDate: '2026-03-27',
      totalWeeks: 11,
      totalSchoolDays: 53,
      holidays: [
        { date: '2026-03-21', name: 'Human Rights Day', type: 'public_holiday' },
      ],
      keyMilestones: [
        { week: 1, title: 'Term 1 Reopens', description: 'Learners return Wednesday 14 January; Baseline diagnostics commence.' },
        { week: 4, title: 'PAT Phase 1 Briefing', description: 'Grade 8-9 Tech Design Brief issue; MathLit assignment roll-out.' },
        { week: 8, title: 'Formal SBA Test Window', description: 'Grade 10-12 MathLit Controlled Test 1; Grade 8-9 Tech Test.' },
        { week: 11, title: 'Term 1 Closes', description: 'Final marks captured; school closes Friday 27 March.' },
      ],
      weeks: [
        createWeek(1, 1, '2026-01-14', '2026-01-16', '14 Jan – 16 Jan', '14 Jan – 16 Jan 2026', {
          Monday: { dateStr: '2026-01-12', displayDate: '12 Jan', fullDate: 'Monday, 12 January 2026', isSchoolClosed: true, holidayName: 'Staff Administration' },
          Tuesday: { dateStr: '2026-01-13', displayDate: '13 Jan', fullDate: 'Tuesday, 13 January 2026', isSchoolClosed: true, holidayName: 'Staff Planning' },
          Wednesday: { dateStr: '2026-01-14', displayDate: '14 Jan', fullDate: 'Wednesday, 14 January 2026' },
          Thursday: { dateStr: '2026-01-15', displayDate: '15 Jan', fullDate: 'Thursday, 15 January 2026' },
          Friday: { dateStr: '2026-01-16', displayDate: '16 Jan', fullDate: 'Friday, 16 January 2026' },
        }, 'Baseline Diagnostics', 'Learners return Wed 14 Jan'),
        createWeek(1, 2, '2026-01-19', '2026-01-23', '19 Jan – 23 Jan', '19 Jan – 23 Jan 2026', {
          Monday: { dateStr: '2026-01-19', displayDate: '19 Jan', fullDate: 'Monday, 19 January 2026' },
          Tuesday: { dateStr: '2026-01-20', displayDate: '20 Jan', fullDate: 'Tuesday, 20 January 2026' },
          Wednesday: { dateStr: '2026-01-21', displayDate: '21 Jan', fullDate: 'Wednesday, 21 January 2026' },
          Thursday: { dateStr: '2026-01-22', displayDate: '22 Jan', fullDate: 'Thursday, 22 January 2026' },
          Friday: { dateStr: '2026-01-23', displayDate: '23 Jan', fullDate: 'Friday, 23 January 2026' },
        }, undefined, 'Curriculum delivery in full swing'),
        createWeek(1, 3, '2026-01-26', '2026-01-30', '26 Jan – 30 Jan', '26 Jan – 30 Jan 2026', {
          Monday: { dateStr: '2026-01-26', displayDate: '26 Jan', fullDate: 'Monday, 26 January 2026' },
          Tuesday: { dateStr: '2026-01-27', displayDate: '27 Jan', fullDate: 'Tuesday, 27 January 2026' },
          Wednesday: { dateStr: '2026-01-28', displayDate: '28 Jan', fullDate: 'Wednesday, 28 January 2026' },
          Thursday: { dateStr: '2026-01-29', displayDate: '29 Jan', fullDate: 'Thursday, 29 January 2026' },
          Friday: { dateStr: '2026-01-30', displayDate: '30 Jan', fullDate: 'Friday, 30 January 2026' },
        }),
        createWeek(1, 4, '2026-02-02', '2026-02-06', '2 Feb – 6 Feb', '2 Feb – 6 Feb 2026', {
          Monday: { dateStr: '2026-02-02', displayDate: '2 Feb', fullDate: 'Monday, 2 February 2026' },
          Tuesday: { dateStr: '2026-02-03', displayDate: '3 Feb', fullDate: 'Tuesday, 3 February 2026' },
          Wednesday: { dateStr: '2026-02-04', displayDate: '4 Feb', fullDate: 'Wednesday, 4 February 2026' },
          Thursday: { dateStr: '2026-02-05', displayDate: '5 Feb', fullDate: 'Thursday, 5 February 2026' },
          Friday: { dateStr: '2026-02-06', displayDate: '6 Feb', fullDate: 'Friday, 6 February 2026' },
        }, 'PAT Phase 1 Issue'),
        createWeek(1, 5, '2026-02-09', '2026-02-13', '9 Feb – 13 Feb', '9 Feb – 13 Feb 2026', {
          Monday: { dateStr: '2026-02-09', displayDate: '9 Feb', fullDate: 'Monday, 9 February 2026' },
          Tuesday: { dateStr: '2026-02-10', displayDate: '10 Feb', fullDate: 'Tuesday, 10 February 2026' },
          Wednesday: { dateStr: '2026-02-11', displayDate: '11 Feb', fullDate: 'Wednesday, 11 February 2026' },
          Thursday: { dateStr: '2026-02-12', displayDate: '12 Feb', fullDate: 'Thursday, 12 February 2026' },
          Friday: { dateStr: '2026-02-13', displayDate: '13 Feb', fullDate: 'Friday, 13 February 2026' },
        }),
        createWeek(1, 6, '2026-02-16', '2026-02-20', '16 Feb – 20 Feb', '16 Feb – 20 Feb 2026', {
          Monday: { dateStr: '2026-02-16', displayDate: '16 Feb', fullDate: 'Monday, 16 February 2026' },
          Tuesday: { dateStr: '2026-02-17', displayDate: '17 Feb', fullDate: 'Tuesday, 17 February 2026' },
          Wednesday: { dateStr: '2026-02-18', displayDate: '18 Feb', fullDate: 'Wednesday, 18 February 2026' },
          Thursday: { dateStr: '2026-02-19', displayDate: '19 Feb', fullDate: 'Thursday, 19 February 2026' },
          Friday: { dateStr: '2026-02-20', displayDate: '20 Feb', fullDate: 'Friday, 20 February 2026' },
        }),
        createWeek(1, 7, '2026-02-23', '2026-02-27', '23 Feb – 27 Feb', '23 Feb – 27 Feb 2026', {
          Monday: { dateStr: '2026-02-23', displayDate: '23 Feb', fullDate: 'Monday, 23 February 2026' },
          Tuesday: { dateStr: '2026-02-24', displayDate: '24 Feb', fullDate: 'Tuesday, 24 February 2026' },
          Wednesday: { dateStr: '2026-02-25', displayDate: '25 Feb', fullDate: 'Wednesday, 25 February 2026' },
          Thursday: { dateStr: '2026-02-26', displayDate: '26 Feb', fullDate: 'Thursday, 26 February 2026' },
          Friday: { dateStr: '2026-02-27', displayDate: '27 Feb', fullDate: 'Friday, 27 February 2026' },
        }, 'Pre-Moderation of Test 1'),
        createWeek(1, 8, '2026-03-02', '2026-03-06', '2 Mar – 6 Mar', '2 Mar – 6 Mar 2026', {
          Monday: { dateStr: '2026-03-02', displayDate: '2 Mar', fullDate: 'Monday, 2 March 2026' },
          Tuesday: { dateStr: '2026-03-03', displayDate: '3 Mar', fullDate: 'Tuesday, 3 March 2026' },
          Wednesday: { dateStr: '2026-03-04', displayDate: '4 Mar', fullDate: 'Wednesday, 4 March 2026' },
          Thursday: { dateStr: '2026-03-05', displayDate: '5 Mar', fullDate: 'Thursday, 5 March 2026' },
          Friday: { dateStr: '2026-03-06', displayDate: '6 Mar', fullDate: 'Friday, 6 March 2026' },
        }, 'Formal Assessment Test Window', undefined, true),
        createWeek(1, 9, '2026-03-09', '2026-03-13', '9 Mar – 13 Mar', '9 Mar – 13 Mar 2026', {
          Monday: { dateStr: '2026-03-09', displayDate: '9 Mar', fullDate: 'Monday, 9 March 2026' },
          Tuesday: { dateStr: '2026-03-10', displayDate: '10 Mar', fullDate: 'Tuesday, 10 March 2026' },
          Wednesday: { dateStr: '2026-03-11', displayDate: '11 Mar', fullDate: 'Wednesday, 11 March 2026' },
          Thursday: { dateStr: '2026-03-12', displayDate: '12 Mar', fullDate: 'Thursday, 12 March 2026' },
          Friday: { dateStr: '2026-03-13', displayDate: '13 Mar', fullDate: 'Friday, 13 March 2026' },
        }, 'Test Marking & Remediation'),
        createWeek(1, 10, '2026-03-16', '2026-03-20', '16 Mar – 20 Mar', '16 Mar – 20 Mar 2026', {
          Monday: { dateStr: '2026-03-16', displayDate: '16 Mar', fullDate: 'Monday, 16 March 2026' },
          Tuesday: { dateStr: '2026-03-17', displayDate: '17 Mar', fullDate: 'Tuesday, 17 March 2026' },
          Wednesday: { dateStr: '2026-03-18', displayDate: '18 Mar', fullDate: 'Wednesday, 18 March 2026' },
          Thursday: { dateStr: '2026-03-19', displayDate: '19 Mar', fullDate: 'Thursday, 19 March 2026' },
          Friday: { dateStr: '2026-03-20', displayDate: '20 Mar', fullDate: 'Friday, 20 March 2026' },
        }, 'Post-Moderation Audit', '21 Mar: Human Rights Day (Saturday)'),
        createWeek(1, 11, '2026-03-23', '2026-03-27', '23 Mar – 27 Mar', '23 Mar – 27 Mar 2026', {
          Monday: { dateStr: '2026-03-23', displayDate: '23 Mar', fullDate: 'Monday, 23 March 2026' },
          Tuesday: { dateStr: '2026-03-24', displayDate: '24 Mar', fullDate: 'Tuesday, 24 March 2026' },
          Wednesday: { dateStr: '2026-03-25', displayDate: '25 Mar', fullDate: 'Wednesday, 25 March 2026' },
          Thursday: { dateStr: '2026-03-26', displayDate: '26 Mar', fullDate: 'Thursday, 26 March 2026' },
          Friday: { dateStr: '2026-03-27', displayDate: '27 Mar', fullDate: 'Friday, 27 March 2026' },
        }, 'Term 1 Conclusion', 'School closes Friday 27 March for Autumn Vacation'),
      ],
    },
    2: {
      term: 2,
      name: 'Term 2',
      seasonLabel: 'Autumn / Winter',
      startDate: '2026-04-08',
      endDate: '2026-06-26',
      totalWeeks: 12,
      totalSchoolDays: 54,
      holidays: [
        { date: '2026-04-27', name: 'Freedom Day', type: 'public_holiday' },
        { date: '2026-05-01', name: "Workers' Day", type: 'public_holiday' },
        { date: '2026-06-15', name: 'Special School Holiday', type: 'school_holiday' },
        { date: '2026-06-16', name: 'Youth Day', type: 'public_holiday' },
      ],
      keyMilestones: [
        { week: 1, title: 'Term 2 Reopens', description: 'Wednesday 8 April 2026. Review Term 1 feedback.' },
        { week: 4, title: 'Freedom Day & Workers Day', description: 'Public holidays Mon 27 Apr and Fri 1 May.' },
        { week: 8, title: 'Mid-Year Controlled Tests Begin', description: 'Gr 10-12 Mid-Year Examination window.' },
        { week: 11, title: 'Youth Day Long Weekend', description: 'School holiday Mon 15 Jun; Youth Day Tue 16 Jun.' },
        { week: 12, title: 'Term 2 Closes', description: 'Reports issued; Winter break begins 26 June.' },
      ],
      weeks: [
        createWeek(2, 1, '2026-04-08', '2026-04-10', '8 Apr – 10 Apr', '8 Apr – 10 Apr 2026', {
          Monday: { dateStr: '2026-04-06', displayDate: '6 Apr', fullDate: 'Monday, 6 April 2026', isHoliday: true, holidayName: 'Family Day (Easter Monday)' },
          Tuesday: { dateStr: '2026-04-07', displayDate: '7 Apr', fullDate: 'Tuesday, 7 April 2026', isSchoolClosed: true, holidayName: 'Staff Preparation' },
          Wednesday: { dateStr: '2026-04-08', displayDate: '8 Apr', fullDate: 'Wednesday, 8 April 2026' },
          Thursday: { dateStr: '2026-04-09', displayDate: '9 Apr', fullDate: 'Thursday, 9 April 2026' },
          Friday: { dateStr: '2026-04-10', displayDate: '10 Apr', fullDate: 'Friday, 10 April 2026' },
        }, 'Term 2 Reopening', 'School opens Wed 8 April'),
        createWeek(2, 2, '2026-04-13', '2026-04-17', '13 Apr – 17 Apr', '13 Apr – 17 Apr 2026', {
          Monday: { dateStr: '2026-04-13', displayDate: '13 Apr', fullDate: 'Monday, 13 April 2026' },
          Tuesday: { dateStr: '2026-04-14', displayDate: '14 Apr', fullDate: 'Tuesday, 14 April 2026' },
          Wednesday: { dateStr: '2026-04-15', displayDate: '15 Apr', fullDate: 'Wednesday, 15 April 2026' },
          Thursday: { dateStr: '2026-04-16', displayDate: '16 Apr', fullDate: 'Thursday, 16 April 2026' },
          Friday: { dateStr: '2026-04-17', displayDate: '17 Apr', fullDate: 'Friday, 17 April 2026' },
        }),
        createWeek(2, 3, '2026-04-20', '2026-04-24', '20 Apr – 24 Apr', '20 Apr – 24 Apr 2026', {
          Monday: { dateStr: '2026-04-20', displayDate: '20 Apr', fullDate: 'Monday, 20 April 2026' },
          Tuesday: { dateStr: '2026-04-21', displayDate: '21 Apr', fullDate: 'Tuesday, 21 April 2026' },
          Wednesday: { dateStr: '2026-04-22', displayDate: '22 Apr', fullDate: 'Wednesday, 22 April 2026' },
          Thursday: { dateStr: '2026-04-23', displayDate: '23 Apr', fullDate: 'Thursday, 23 April 2026' },
          Friday: { dateStr: '2026-04-24', displayDate: '24 Apr', fullDate: 'Friday, 24 April 2026' },
        }, 'PAT Mini-PAT Kickoff'),
        createWeek(2, 4, '2026-04-27', '2026-05-01', '27 Apr – 1 May', '27 Apr – 1 May 2026', {
          Monday: { dateStr: '2026-04-27', displayDate: '27 Apr', fullDate: 'Monday, 27 April 2026', isHoliday: true, holidayName: 'Freedom Day' },
          Tuesday: { dateStr: '2026-04-28', displayDate: '28 Apr', fullDate: 'Tuesday, 28 April 2026' },
          Wednesday: { dateStr: '2026-04-29', displayDate: '29 Apr', fullDate: 'Wednesday, 29 April 2026' },
          Thursday: { dateStr: '2026-04-30', displayDate: '30 Apr', fullDate: 'Thursday, 30 April 2026' },
          Friday: { dateStr: '2026-05-01', displayDate: '1 May', fullDate: 'Friday, 1 May 2026', isHoliday: true, holidayName: "Workers' Day" },
        }, undefined, 'Short week (Freedom Day & Workers Day)'),
        createWeek(2, 5, '2026-05-04', '2026-05-08', '4 May – 8 May', '4 May – 8 May 2026', {
          Monday: { dateStr: '2026-05-04', displayDate: '4 May', fullDate: 'Monday, 4 May 2026' },
          Tuesday: { dateStr: '2026-05-05', displayDate: '5 May', fullDate: 'Tuesday, 5 May 2026' },
          Wednesday: { dateStr: '2026-05-06', displayDate: '6 May', fullDate: 'Wednesday, 6 May 2026' },
          Thursday: { dateStr: '2026-05-07', displayDate: '7 May', fullDate: 'Thursday, 7 May 2026' },
          Friday: { dateStr: '2026-05-08', displayDate: '8 May', fullDate: 'Friday, 8 May 2026' },
        }),
        createWeek(2, 6, '2026-05-11', '2026-05-15', '11 May – 15 May', '11 May – 15 May 2026', {
          Monday: { dateStr: '2026-05-11', displayDate: '11 May', fullDate: 'Monday, 11 May 2026' },
          Tuesday: { dateStr: '2026-05-12', displayDate: '12 May', fullDate: 'Tuesday, 12 May 2026' },
          Wednesday: { dateStr: '2026-05-13', displayDate: '13 May', fullDate: 'Wednesday, 13 May 2026' },
          Thursday: { dateStr: '2026-05-14', displayDate: '14 May', fullDate: 'Thursday, 14 May 2026' },
          Friday: { dateStr: '2026-05-15', displayDate: '15 May', fullDate: 'Friday, 15 May 2026' },
        }, 'SBA Task 2 Submission'),
        createWeek(2, 7, '2026-05-18', '2026-05-22', '18 May – 22 May', '18 May – 22 May 2026', {
          Monday: { dateStr: '2026-05-18', displayDate: '18 May', fullDate: 'Monday, 18 May 2026' },
          Tuesday: { dateStr: '2026-05-19', displayDate: '19 May', fullDate: 'Tuesday, 19 May 2026' },
          Wednesday: { dateStr: '2026-05-20', displayDate: '20 May', fullDate: 'Wednesday, 20 May 2026' },
          Thursday: { dateStr: '2026-05-21', displayDate: '21 May', fullDate: 'Thursday, 21 May 2026' },
          Friday: { dateStr: '2026-05-22', displayDate: '22 May', fullDate: 'Friday, 22 May 2026' },
        }, 'Pre-Moderation of Mid-Year Exams'),
        createWeek(2, 8, '2026-05-25', '2026-05-29', '25 May – 29 May', '25 May – 29 May 2026', {
          Monday: { dateStr: '2026-05-25', displayDate: '25 May', fullDate: 'Monday, 25 May 2026' },
          Tuesday: { dateStr: '2026-05-26', displayDate: '26 May', fullDate: 'Tuesday, 26 May 2026' },
          Wednesday: { dateStr: '2026-05-27', displayDate: '27 May', fullDate: 'Wednesday, 27 May 2026' },
          Thursday: { dateStr: '2026-05-28', displayDate: '28 May', fullDate: 'Thursday, 28 May 2026' },
          Friday: { dateStr: '2026-05-29', displayDate: '29 May', fullDate: 'Friday, 29 May 2026' },
        }, 'Mid-Year Exam Phase 1', undefined, true),
        createWeek(2, 9, '2026-06-01', '2026-06-05', '1 Jun – 5 Jun', '1 Jun – 5 Jun 2026', {
          Monday: { dateStr: '2026-06-01', displayDate: '1 Jun', fullDate: 'Monday, 1 June 2026' },
          Tuesday: { dateStr: '2026-06-02', displayDate: '2 Jun', fullDate: 'Tuesday, 2 June 2026' },
          Wednesday: { dateStr: '2026-06-03', displayDate: '3 Jun', fullDate: 'Wednesday, 3 June 2026' },
          Thursday: { dateStr: '2026-06-04', displayDate: '4 Jun', fullDate: 'Thursday, 4 June 2026' },
          Friday: { dateStr: '2026-06-05', displayDate: '5 Jun', fullDate: 'Friday, 5 June 2026' },
        }, 'Mid-Year Exam Phase 2', undefined, true),
        createWeek(2, 10, '2026-06-08', '2026-06-12', '8 Jun – 12 Jun', '8 Jun – 12 Jun 2026', {
          Monday: { dateStr: '2026-06-08', displayDate: '8 Jun', fullDate: 'Monday, 8 June 2026' },
          Tuesday: { dateStr: '2026-06-09', displayDate: '9 Jun', fullDate: 'Tuesday, 9 June 2026' },
          Wednesday: { dateStr: '2026-06-10', displayDate: '10 Jun', fullDate: 'Wednesday, 10 June 2026' },
          Thursday: { dateStr: '2026-06-11', displayDate: '11 Jun', fullDate: 'Thursday, 11 June 2026' },
          Friday: { dateStr: '2026-06-12', displayDate: '12 Jun', fullDate: 'Friday, 12 June 2026' },
        }, 'Exam Marking & Moderation'),
        createWeek(2, 11, '2026-06-15', '2026-06-19', '15 Jun – 19 Jun', '15 Jun – 19 Jun 2026', {
          Monday: { dateStr: '2026-06-15', displayDate: '15 Jun', fullDate: 'Monday, 15 June 2026', isHoliday: true, holidayName: 'School Holiday' },
          Tuesday: { dateStr: '2026-06-16', displayDate: '16 Jun', fullDate: 'Tuesday, 16 June 2026', isHoliday: true, holidayName: 'Youth Day' },
          Wednesday: { dateStr: '2026-06-17', displayDate: '17 Jun', fullDate: 'Wednesday, 17 June 2026' },
          Thursday: { dateStr: '2026-06-18', displayDate: '18 Jun', fullDate: 'Thursday, 18 June 2026' },
          Friday: { dateStr: '2026-06-19', displayDate: '19 Jun', fullDate: 'Friday, 19 June 2026' },
        }, 'Diagnostic Feedback', 'Youth Day long weekend'),
        createWeek(2, 12, '2026-06-22', '2026-06-26', '22 Jun – 26 Jun', '22 Jun – 26 Jun 2026', {
          Monday: { dateStr: '2026-06-22', displayDate: '22 Jun', fullDate: 'Monday, 22 June 2026' },
          Tuesday: { dateStr: '2026-06-23', displayDate: '23 Jun', fullDate: 'Tuesday, 23 June 2026' },
          Wednesday: { dateStr: '2026-06-24', displayDate: '24 Jun', fullDate: 'Wednesday, 24 June 2026' },
          Thursday: { dateStr: '2026-06-25', displayDate: '25 Jun', fullDate: 'Thursday, 25 June 2026' },
          Friday: { dateStr: '2026-06-26', displayDate: '26 Jun', fullDate: 'Friday, 26 June 2026' },
        }, 'Term 2 Closes', 'Winter vacation starts 26 June'),
      ],
    },
    3: {
      term: 3,
      name: 'Term 3',
      seasonLabel: 'Winter / Spring',
      startDate: '2026-07-21',
      endDate: '2026-09-23',
      totalWeeks: 10,
      totalSchoolDays: 47,
      holidays: [
        { date: '2026-08-09', name: "National Women's Day", type: 'public_holiday' },
        { date: '2026-08-10', name: "Women's Day (Observed)", type: 'public_holiday' },
        { date: '2026-09-24', name: 'Heritage Day', type: 'public_holiday' },
        { date: '2026-09-25', name: 'Special School Holiday', type: 'school_holiday' },
      ],
      keyMilestones: [
        { week: 1, title: 'Term 3 Opens', description: 'Tuesday 21 July 2026. Gr 12 Trial Exam countdown.' },
        { week: 3, title: "Women's Day Weekend", description: "Holiday observed Monday 10 August." },
        { week: 6, title: 'PAT Practical Assessment Tasks', description: 'Grade 8-9 Tech model building and testing.' },
        { week: 8, title: 'Grade 12 Prelim Examination Window', description: 'Matric Trial Exams; Gr 10-11 Controlled Tests.' },
        { week: 9, title: 'Active Teaching Pacing (Current Week)', description: 'September revision sprints and term wrap-up.' },
        { week: 10, title: 'Term 3 Closes', description: 'Wednesday 23 September 2026. Heritage Day break.' },
      ],
      weeks: [
        createWeek(3, 1, '2026-07-21', '2026-07-24', '21 Jul – 24 Jul', '21 Jul – 24 Jul 2026', {
          Monday: { dateStr: '2026-07-20', displayDate: '20 Jul', fullDate: 'Monday, 20 July 2026', isSchoolClosed: true, holidayName: 'Staff Administration' },
          Tuesday: { dateStr: '2026-07-21', displayDate: '21 Jul', fullDate: 'Tuesday, 21 July 2026' },
          Wednesday: { dateStr: '2026-07-22', displayDate: '22 Jul', fullDate: 'Wednesday, 22 July 2026' },
          Thursday: { dateStr: '2026-07-23', displayDate: '23 Jul', fullDate: 'Thursday, 23 July 2026' },
          Friday: { dateStr: '2026-07-24', displayDate: '24 Jul', fullDate: 'Friday, 24 July 2026' },
        }, 'Term 3 Reopens', 'Learners return Tuesday 21 July'),
        createWeek(3, 2, '2026-07-27', '2026-07-31', '27 Jul – 31 Jul', '27 Jul – 31 Jul 2026', {
          Monday: { dateStr: '2026-07-27', displayDate: '27 Jul', fullDate: 'Monday, 27 July 2026' },
          Tuesday: { dateStr: '2026-07-28', displayDate: '28 Jul', fullDate: 'Tuesday, 28 July 2026' },
          Wednesday: { dateStr: '2026-07-29', displayDate: '29 Jul', fullDate: 'Wednesday, 29 July 2026' },
          Thursday: { dateStr: '2026-07-30', displayDate: '30 Jul', fullDate: 'Thursday, 30 July 2026' },
          Friday: { dateStr: '2026-07-31', displayDate: '31 Jul', fullDate: 'Friday, 31 July 2026' },
        }),
        createWeek(3, 3, '2026-08-03', '2026-08-07', '3 Aug – 7 Aug', '3 Aug – 7 Aug 2026', {
          Monday: { dateStr: '2026-08-03', displayDate: '3 Aug', fullDate: 'Monday, 3 August 2026' },
          Tuesday: { dateStr: '2026-08-04', displayDate: '4 Aug', fullDate: 'Tuesday, 4 August 2026' },
          Wednesday: { dateStr: '2026-08-05', displayDate: '5 Aug', fullDate: 'Wednesday, 5 August 2026' },
          Thursday: { dateStr: '2026-08-06', displayDate: '6 Aug', fullDate: 'Thursday, 6 August 2026' },
          Friday: { dateStr: '2026-08-07', displayDate: '7 Aug', fullDate: 'Friday, 7 August 2026' },
        }, undefined, "Women's Day Sunday 9 Aug"),
        createWeek(3, 4, '2026-08-10', '2026-08-14', '10 Aug – 14 Aug', '10 Aug – 14 Aug 2026', {
          Monday: { dateStr: '2026-08-10', displayDate: '10 Aug', fullDate: 'Monday, 10 August 2026', isHoliday: true, holidayName: "Women's Day (Observed)" },
          Tuesday: { dateStr: '2026-08-11', displayDate: '11 Aug', fullDate: 'Tuesday, 11 August 2026' },
          Wednesday: { dateStr: '2026-08-12', displayDate: '12 Aug', fullDate: 'Wednesday, 12 August 2026' },
          Thursday: { dateStr: '2026-08-13', displayDate: '13 Aug', fullDate: 'Thursday, 13 August 2026' },
          Friday: { dateStr: '2026-08-14', displayDate: '14 Aug', fullDate: 'Friday, 14 August 2026' },
        }, 'SBA Task 3 Checkpoint', 'Mon 10 Aug Public Holiday'),
        createWeek(3, 5, '2026-08-17', '2026-08-21', '17 Aug – 21 Aug', '17 Aug – 21 Aug 2026', {
          Monday: { dateStr: '2026-08-17', displayDate: '17 Aug', fullDate: 'Monday, 17 August 2026' },
          Tuesday: { dateStr: '2026-08-18', displayDate: '18 Aug', fullDate: 'Tuesday, 18 August 2026' },
          Wednesday: { dateStr: '2026-08-19', displayDate: '19 Aug', fullDate: 'Wednesday, 19 August 2026' },
          Thursday: { dateStr: '2026-08-20', displayDate: '20 Aug', fullDate: 'Thursday, 20 August 2026' },
          Friday: { dateStr: '2026-08-21', displayDate: '21 Aug', fullDate: 'Friday, 21 August 2026' },
        }),
        createWeek(3, 6, '2026-08-24', '2026-08-28', '24 Aug – 28 Aug', '24 Aug – 28 Aug 2026', {
          Monday: { dateStr: '2026-08-24', displayDate: '24 Aug', fullDate: 'Monday, 24 August 2026' },
          Tuesday: { dateStr: '2026-08-25', displayDate: '25 Aug', fullDate: 'Tuesday, 25 August 2026' },
          Wednesday: { dateStr: '2026-08-26', displayDate: '26 Aug', fullDate: 'Wednesday, 26 August 2026' },
          Thursday: { dateStr: '2026-08-27', displayDate: '27 Aug', fullDate: 'Thursday, 27 August 2026' },
          Friday: { dateStr: '2026-08-28', displayDate: '28 Aug', fullDate: 'Friday, 28 August 2026' },
        }, 'PAT Mini-PAT Moderation'),
        createWeek(3, 7, '2026-08-31', '2026-09-04', '31 Aug – 4 Sep', '31 Aug – 4 Sep 2026', {
          Monday: { dateStr: '2026-08-31', displayDate: '31 Aug', fullDate: 'Monday, 31 August 2026' },
          Tuesday: { dateStr: '2026-09-01', displayDate: '1 Sep', fullDate: 'Tuesday, 1 September 2026' },
          Wednesday: { dateStr: '2026-09-02', displayDate: '2 Sep', fullDate: 'Wednesday, 2 September 2026' },
          Thursday: { dateStr: '2026-09-03', displayDate: '3 Sep', fullDate: 'Thursday, 3 September 2026' },
          Friday: { dateStr: '2026-09-04', displayDate: '4 Sep', fullDate: 'Friday, 4 September 2026' },
        }, 'Grade 12 Prelim Trial Exams Commence', undefined, true),
        createWeek(3, 8, '2026-09-07', '2026-09-11', '7 Sep – 11 Sep', '7 Sep – 11 Sep 2026', {
          Monday: { dateStr: '2026-09-07', displayDate: '7 Sep', fullDate: 'Monday, 7 September 2026' },
          Tuesday: { dateStr: '2026-09-08', displayDate: '8 Sep', fullDate: 'Tuesday, 8 September 2026' },
          Wednesday: { dateStr: '2026-09-09', displayDate: '9 Sep', fullDate: 'Wednesday, 9 September 2026' },
          Thursday: { dateStr: '2026-09-10', displayDate: '10 Sep', fullDate: 'Thursday, 10 September 2026' },
          Friday: { dateStr: '2026-09-11', displayDate: '11 Sep', fullDate: 'Friday, 11 September 2026' },
        }, 'Prelim Exam Phase 2 / Gr 8-11 Tests', undefined, true),
        createWeek(3, 9, '2026-09-14', '2026-09-18', '14 Sep – 18 Sep', '14 Sep – 18 Sep 2026', {
          Monday: { dateStr: '2026-09-14', displayDate: '14 Sep', fullDate: 'Monday, 14 September 2026' },
          Tuesday: { dateStr: '2026-09-15', displayDate: '15 Sep', fullDate: 'Tuesday, 15 September 2026' },
          Wednesday: { dateStr: '2026-09-16', displayDate: '16 Sep', fullDate: 'Wednesday, 16 September 2026' },
          Thursday: { dateStr: '2026-09-17', displayDate: '17 Sep', fullDate: 'Thursday, 17 September 2026' },
          Friday: { dateStr: '2026-09-18', displayDate: '18 Sep', fullDate: 'Friday, 18 September 2026' },
        }, 'Active Academic Week (Live Pacing)', 'Term 3 syllabus completion & revision'),
        createWeek(3, 10, '2026-09-21', '2026-09-23', '21 Sep – 23 Sep', '21 Sep – 23 Sep 2026', {
          Monday: { dateStr: '2026-09-21', displayDate: '21 Sep', fullDate: 'Monday, 21 September 2026' },
          Tuesday: { dateStr: '2026-09-22', displayDate: '22 Sep', fullDate: 'Tuesday, 22 September 2026' },
          Wednesday: { dateStr: '2026-09-23', displayDate: '23 Sep', fullDate: 'Wednesday, 23 September 2026' },
          Thursday: { dateStr: '2026-09-24', displayDate: '24 Sep', fullDate: 'Thursday, 24 September 2026', isHoliday: true, holidayName: 'Heritage Day' },
          Friday: { dateStr: '2026-09-25', displayDate: '25 Sep', fullDate: 'Friday, 25 September 2026', isHoliday: true, holidayName: 'School Holiday' },
        }, 'Term 3 Concludes', 'School closes Wed 23 Sep; Heritage Day break'),
      ],
    },
    4: {
      term: 4,
      name: 'Term 4',
      seasonLabel: 'Spring / Summer',
      startDate: '2026-10-06',
      endDate: '2026-12-09',
      totalWeeks: 10,
      totalSchoolDays: 47,
      holidays: [
        { date: '2026-12-16', name: 'Day of Reconciliation', type: 'public_holiday' },
      ],
      keyMilestones: [
        { week: 1, title: 'Term 4 Opens', description: 'Tuesday 6 October 2026. Final NSC/IEB examination prep.' },
        { week: 4, title: 'Final SBA Marks Lock', description: 'Moderation of all SBA portfolios and PAT projects.' },
        { week: 5, title: 'National NSC / IEB Matric Exams Begin', description: 'Grade 12 final exam window commences.' },
        { week: 7, title: 'Senior Phase Final Examinations', description: 'Grade 8 & 9 Technology end-of-year examination.' },
        { week: 10, title: 'School Year Closes', description: 'Wednesday 9 December 2026. Academic year concluded.' },
      ],
      weeks: [
        createWeek(4, 1, '2026-10-06', '2026-10-09', '6 Oct – 9 Oct', '6 Oct – 9 Oct 2026', {
          Monday: { dateStr: '2026-10-05', displayDate: '5 Oct', fullDate: 'Monday, 5 October 2026', isSchoolClosed: true, holidayName: 'Staff Administration' },
          Tuesday: { dateStr: '2026-10-06', displayDate: '6 Oct', fullDate: 'Tuesday, 6 October 2026' },
          Wednesday: { dateStr: '2026-10-07', displayDate: '7 Oct', fullDate: 'Wednesday, 7 October 2026' },
          Thursday: { dateStr: '2026-10-08', displayDate: '8 Oct', fullDate: 'Thursday, 8 October 2026' },
          Friday: { dateStr: '2026-10-09', displayDate: '9 Oct', fullDate: 'Friday, 9 October 2026' },
        }, 'Term 4 Reopening', 'Reopens Tuesday 6 October'),
        createWeek(4, 2, '2026-10-12', '2026-10-16', '12 Oct – 16 Oct', '12 Oct – 16 Oct 2026', {
          Monday: { dateStr: '2026-10-12', displayDate: '12 Oct', fullDate: 'Monday, 12 October 2026' },
          Tuesday: { dateStr: '2026-10-13', displayDate: '13 Oct', fullDate: 'Tuesday, 13 October 2026' },
          Wednesday: { dateStr: '2026-10-14', displayDate: '14 Oct', fullDate: 'Wednesday, 14 October 2026' },
          Thursday: { dateStr: '2026-10-15', displayDate: '15 Oct', fullDate: 'Thursday, 15 October 2026' },
          Friday: { dateStr: '2026-10-16', displayDate: '16 Oct', fullDate: 'Friday, 16 October 2026' },
        }),
        createWeek(4, 3, '2026-10-19', '2026-10-23', '19 Oct – 23 Oct', '19 Oct – 23 Oct 2026', {
          Monday: { dateStr: '2026-10-19', displayDate: '19 Oct', fullDate: 'Monday, 19 October 2026' },
          Tuesday: { dateStr: '2026-10-20', displayDate: '20 Oct', fullDate: 'Tuesday, 20 October 2026' },
          Wednesday: { dateStr: '2026-10-21', displayDate: '21 Oct', fullDate: 'Wednesday, 21 October 2026' },
          Thursday: { dateStr: '2026-10-22', displayDate: '22 Oct', fullDate: 'Thursday, 22 October 2026' },
          Friday: { dateStr: '2026-10-23', displayDate: '23 Oct', fullDate: 'Friday, 23 October 2026' },
        }, 'Final PAT Submission & Moderation'),
        createWeek(4, 4, '2026-10-26', '2026-10-30', '26 Oct – 30 Oct', '26 Oct – 30 Oct 2026', {
          Monday: { dateStr: '2026-10-26', displayDate: '26 Oct', fullDate: 'Monday, 26 October 2026' },
          Tuesday: { dateStr: '2026-10-27', displayDate: '27 Oct', fullDate: 'Tuesday, 27 October 2026' },
          Wednesday: { dateStr: '2026-10-28', displayDate: '28 Oct', fullDate: 'Wednesday, 28 October 2026' },
          Thursday: { dateStr: '2026-10-29', displayDate: '29 Oct', fullDate: 'Thursday, 29 October 2026' },
          Friday: { dateStr: '2026-10-30', displayDate: '30 Oct', fullDate: 'Friday, 30 October 2026' },
        }, 'Final SBA Portfolio Sign-Off'),
        createWeek(4, 5, '2026-11-02', '2026-11-06', '2 Nov – 6 Nov', '2 Nov – 6 Nov 2026', {
          Monday: { dateStr: '2026-11-02', displayDate: '2 Nov', fullDate: 'Monday, 2 November 2026' },
          Tuesday: { dateStr: '2026-11-03', displayDate: '3 Nov', fullDate: 'Tuesday, 3 November 2026' },
          Wednesday: { dateStr: '2026-11-04', displayDate: '4 Nov', fullDate: 'Wednesday, 4 November 2026' },
          Thursday: { dateStr: '2026-11-05', displayDate: '5 Nov', fullDate: 'Thursday, 5 November 2026' },
          Friday: { dateStr: '2026-11-06', displayDate: '6 Nov', fullDate: 'Friday, 6 November 2026' },
        }, 'National NSC/IEB Matric Exams Commence', undefined, true),
        createWeek(4, 6, '2026-11-09', '2026-11-13', '9 Nov – 13 Nov', '9 Nov – 13 Nov 2026', {
          Monday: { dateStr: '2026-11-09', displayDate: '9 Nov', fullDate: 'Monday, 9 November 2026' },
          Tuesday: { dateStr: '2026-11-10', displayDate: '10 Nov', fullDate: 'Tuesday, 10 November 2026' },
          Wednesday: { dateStr: '2026-11-11', displayDate: '11 Nov', fullDate: 'Wednesday, 11 November 2026' },
          Thursday: { dateStr: '2026-11-12', displayDate: '12 Nov', fullDate: 'Thursday, 12 November 2026' },
          Friday: { dateStr: '2026-11-13', displayDate: '13 Nov', fullDate: 'Friday, 13 November 2026' },
        }, 'Final Exams (Gr 10-12)', undefined, true),
        createWeek(4, 7, '2026-11-16', '2026-11-20', '16 Nov – 20 Nov', '16 Nov – 20 Nov 2026', {
          Monday: { dateStr: '2026-11-16', displayDate: '16 Nov', fullDate: 'Monday, 16 November 2026' },
          Tuesday: { dateStr: '2026-11-17', displayDate: '17 Nov', fullDate: 'Tuesday, 17 November 2026' },
          Wednesday: { dateStr: '2026-11-18', displayDate: '18 Nov', fullDate: 'Wednesday, 18 November 2026' },
          Thursday: { dateStr: '2026-11-19', displayDate: '19 Nov', fullDate: 'Thursday, 19 November 2026' },
          Friday: { dateStr: '2026-11-20', displayDate: '20 Nov', fullDate: 'Friday, 20 November 2026' },
        }, 'Senior Phase End-of-Year Exams', undefined, true),
        createWeek(4, 8, '2026-11-23', '2026-11-27', '23 Nov – 27 Nov', '23 Nov – 27 Nov 2026', {
          Monday: { dateStr: '2026-11-23', displayDate: '23 Nov', fullDate: 'Monday, 23 November 2026' },
          Tuesday: { dateStr: '2026-11-24', displayDate: '24 Nov', fullDate: 'Tuesday, 24 November 2026' },
          Wednesday: { dateStr: '2026-11-25', displayDate: '25 Nov', fullDate: 'Wednesday, 25 November 2026' },
          Thursday: { dateStr: '2026-11-26', displayDate: '26 Nov', fullDate: 'Thursday, 26 November 2026' },
          Friday: { dateStr: '2026-11-27', displayDate: '27 Nov', fullDate: 'Friday, 27 November 2026' },
        }, 'Examination Marking & Schedules'),
        createWeek(4, 9, '2026-11-30', '2026-12-04', '30 Nov – 4 Dec', '30 Nov – 4 Dec 2026', {
          Monday: { dateStr: '2026-11-30', displayDate: '30 Nov', fullDate: 'Monday, 30 November 2026' },
          Tuesday: { dateStr: '2026-12-01', displayDate: '1 Dec', fullDate: 'Tuesday, 1 December 2026' },
          Wednesday: { dateStr: '2026-12-02', displayDate: '2 Dec', fullDate: 'Wednesday, 2 December 2026' },
          Thursday: { dateStr: '2026-12-03', displayDate: '3 Dec', fullDate: 'Thursday, 3 December 2026' },
          Friday: { dateStr: '2026-12-04', displayDate: '4 Dec', fullDate: 'Friday, 4 December 2026' },
        }, 'Final Promotion & Progression Meetings'),
        createWeek(4, 10, '2026-12-07', '2026-12-09', '7 Dec – 9 Dec', '7 Dec – 9 Dec 2026', {
          Monday: { dateStr: '2026-12-07', displayDate: '7 Dec', fullDate: 'Monday, 7 December 2026' },
          Tuesday: { dateStr: '2026-12-08', displayDate: '8 Dec', fullDate: 'Tuesday, 8 December 2026' },
          Wednesday: { dateStr: '2026-12-09', displayDate: '9 Dec', fullDate: 'Wednesday, 9 December 2026' },
          Thursday: { dateStr: '2026-12-10', displayDate: '10 Dec', fullDate: 'Thursday, 10 December 2026', isSchoolClosed: true, holidayName: 'Staff Administration' },
          Friday: { dateStr: '2026-12-11', displayDate: '11 Dec', fullDate: 'Friday, 11 December 2026', isSchoolClosed: true, holidayName: 'School Closes for Teachers' },
        }, 'Annual Prize Giving & Reports', 'School closes for learners Wed 9 Dec'),
      ],
    },
  },
};

// -------------------------------------------------------------------------
// 2025 ACADEMIC CALENDAR (Reference / Secondary)
// -------------------------------------------------------------------------
export const CALENDAR_2025: AcademicYearCalendar = {
  year: 2025,
  label: '2025 Academic Year (CAPS & IEB)',
  terms: {
    1: {
      term: 1,
      name: 'Term 1',
      seasonLabel: 'Summer / Autumn',
      startDate: '2025-01-15',
      endDate: '2025-03-28',
      totalWeeks: 11,
      totalSchoolDays: 53,
      holidays: [
        { date: '2025-03-21', name: 'Human Rights Day', type: 'public_holiday' },
      ],
      keyMilestones: [
        { week: 1, title: 'Term 1 Reopens', description: 'Wednesday 15 January 2025.' },
        { week: 8, title: 'SBA Test Window', description: 'Control tests across all grades.' },
        { week: 11, title: 'Term 1 Closes', description: 'Friday 28 March 2025.' },
      ],
      weeks: [
        createWeek(1, 1, '2025-01-15', '2025-01-17', '15 Jan – 17 Jan', '15 Jan – 17 Jan 2025', {
          Monday: { dateStr: '2025-01-13', displayDate: '13 Jan', fullDate: 'Monday, 13 January 2025', isSchoolClosed: true, holidayName: 'Staff Administration' },
          Tuesday: { dateStr: '2025-01-14', displayDate: '14 Jan', fullDate: 'Tuesday, 14 January 2025', isSchoolClosed: true, holidayName: 'Staff Planning' },
          Wednesday: { dateStr: '2025-01-15', displayDate: '15 Jan', fullDate: 'Wednesday, 15 January 2025' },
          Thursday: { dateStr: '2025-01-16', displayDate: '16 Jan', fullDate: 'Thursday, 16 January 2025' },
          Friday: { dateStr: '2025-01-17', displayDate: '17 Jan', fullDate: 'Friday, 17 January 2025' },
        }),
        createWeek(1, 2, '2025-01-20', '2025-01-24', '20 Jan – 24 Jan', '20 Jan – 24 Jan 2025', {
          Monday: { dateStr: '2025-01-20', displayDate: '20 Jan', fullDate: 'Monday, 20 January 2025' },
          Tuesday: { dateStr: '2025-01-21', displayDate: '21 Jan', fullDate: 'Tuesday, 21 January 2025' },
          Wednesday: { dateStr: '2025-01-22', displayDate: '22 Jan', fullDate: 'Wednesday, 22 January 2025' },
          Thursday: { dateStr: '2025-01-23', displayDate: '23 Jan', fullDate: 'Thursday, 23 January 2025' },
          Friday: { dateStr: '2025-01-24', displayDate: '24 Jan', fullDate: 'Friday, 24 January 2025' },
        }),
        createWeek(1, 3, '2025-01-27', '2025-01-31', '27 Jan – 31 Jan', '27 Jan – 31 Jan 2025', {
          Monday: { dateStr: '2025-01-27', displayDate: '27 Jan', fullDate: 'Monday, 27 January 2025' },
          Tuesday: { dateStr: '2025-01-28', displayDate: '28 Jan', fullDate: 'Tuesday, 28 January 2025' },
          Wednesday: { dateStr: '2025-01-29', displayDate: '29 Jan', fullDate: 'Wednesday, 29 January 2025' },
          Thursday: { dateStr: '2025-01-30', displayDate: '30 Jan', fullDate: 'Thursday, 30 January 2025' },
          Friday: { dateStr: '2025-01-31', displayDate: '31 Jan', fullDate: 'Friday, 31 January 2025' },
        }),
        createWeek(1, 4, '2025-02-03', '2025-02-07', '3 Feb – 7 Feb', '3 Feb – 7 Feb 2025', {
          Monday: { dateStr: '2025-02-03', displayDate: '3 Feb', fullDate: 'Monday, 3 February 2025' },
          Tuesday: { dateStr: '2025-02-04', displayDate: '4 Feb', fullDate: 'Tuesday, 4 February 2025' },
          Wednesday: { dateStr: '2025-02-05', displayDate: '5 Feb', fullDate: 'Wednesday, 5 February 2025' },
          Thursday: { dateStr: '2025-02-06', displayDate: '6 Feb', fullDate: 'Thursday, 6 February 2025' },
          Friday: { dateStr: '2025-02-07', displayDate: '7 Feb', fullDate: 'Friday, 7 February 2025' },
        }),
        createWeek(1, 5, '2025-02-10', '2025-02-14', '10 Feb – 14 Feb', '10 Feb – 14 Feb 2025', {
          Monday: { dateStr: '2025-02-10', displayDate: '10 Feb', fullDate: 'Monday, 10 February 2025' },
          Tuesday: { dateStr: '2025-02-11', displayDate: '11 Feb', fullDate: 'Tuesday, 11 February 2025' },
          Wednesday: { dateStr: '2025-02-12', displayDate: '12 Feb', fullDate: 'Wednesday, 12 February 2025' },
          Thursday: { dateStr: '2025-02-13', displayDate: '13 Feb', fullDate: 'Thursday, 13 February 2025' },
          Friday: { dateStr: '2025-02-14', displayDate: '14 Feb', fullDate: 'Friday, 14 February 2025' },
        }),
        createWeek(1, 6, '2025-02-17', '2025-02-21', '17 Feb – 21 Feb', '17 Feb – 21 Feb 2025', {
          Monday: { dateStr: '2025-02-17', displayDate: '17 Feb', fullDate: 'Monday, 17 February 2025' },
          Tuesday: { dateStr: '2025-02-18', displayDate: '18 Feb', fullDate: 'Tuesday, 18 February 2025' },
          Wednesday: { dateStr: '2025-02-19', displayDate: '19 Feb', fullDate: 'Wednesday, 19 February 2025' },
          Thursday: { dateStr: '2025-02-20', displayDate: '20 Feb', fullDate: 'Thursday, 20 February 2025' },
          Friday: { dateStr: '2025-02-21', displayDate: '21 Feb', fullDate: 'Friday, 21 February 2025' },
        }),
        createWeek(1, 7, '2025-02-24', '2025-02-28', '24 Feb – 28 Feb', '24 Feb – 28 Feb 2025', {
          Monday: { dateStr: '2025-02-24', displayDate: '24 Feb', fullDate: 'Monday, 24 February 2025' },
          Tuesday: { dateStr: '2025-02-25', displayDate: '25 Feb', fullDate: 'Tuesday, 25 February 2025' },
          Wednesday: { dateStr: '2025-02-26', displayDate: '26 Feb', fullDate: 'Wednesday, 26 February 2025' },
          Thursday: { dateStr: '2025-02-27', displayDate: '27 Feb', fullDate: 'Thursday, 27 February 2025' },
          Friday: { dateStr: '2025-02-28', displayDate: '28 Feb', fullDate: 'Friday, 28 February 2025' },
        }),
        createWeek(1, 8, '2025-03-03', '2025-03-07', '3 Mar – 7 Mar', '3 Mar – 7 Mar 2025', {
          Monday: { dateStr: '2025-03-03', displayDate: '3 Mar', fullDate: 'Monday, 3 March 2025' },
          Tuesday: { dateStr: '2025-03-04', displayDate: '4 Mar', fullDate: 'Tuesday, 4 March 2025' },
          Wednesday: { dateStr: '2025-03-05', displayDate: '5 Mar', fullDate: 'Wednesday, 5 March 2025' },
          Thursday: { dateStr: '2025-03-06', displayDate: '6 Mar', fullDate: 'Thursday, 6 March 2025' },
          Friday: { dateStr: '2025-03-07', displayDate: '7 Mar', fullDate: 'Friday, 7 March 2025' },
        }),
        createWeek(1, 9, '2025-03-10', '2025-03-14', '10 Mar – 14 Mar', '10 Mar – 14 Mar 2025', {
          Monday: { dateStr: '2025-03-10', displayDate: '10 Mar', fullDate: 'Monday, 10 March 2025' },
          Tuesday: { dateStr: '2025-03-11', displayDate: '11 Mar', fullDate: 'Tuesday, 11 March 2025' },
          Wednesday: { dateStr: '2025-03-12', displayDate: '12 Mar', fullDate: 'Wednesday, 12 March 2025' },
          Thursday: { dateStr: '2025-03-13', displayDate: '13 Mar', fullDate: 'Thursday, 13 March 2025' },
          Friday: { dateStr: '2025-03-14', displayDate: '14 Mar', fullDate: 'Friday, 14 March 2025' },
        }),
        createWeek(1, 10, '2025-03-17', '2025-03-21', '17 Mar – 21 Mar', '17 Mar – 21 Mar 2025', {
          Monday: { dateStr: '2025-03-17', displayDate: '17 Mar', fullDate: 'Monday, 17 March 2025' },
          Tuesday: { dateStr: '2025-03-18', displayDate: '18 Mar', fullDate: 'Tuesday, 18 March 2025' },
          Wednesday: { dateStr: '2025-03-19', displayDate: '19 Mar', fullDate: 'Wednesday, 19 March 2025' },
          Thursday: { dateStr: '2025-03-20', displayDate: '20 Mar', fullDate: 'Thursday, 20 March 2025' },
          Friday: { dateStr: '2025-03-21', displayDate: '21 Mar', fullDate: 'Friday, 21 March 2025', isHoliday: true, holidayName: 'Human Rights Day' },
        }),
        createWeek(1, 11, '2025-03-24', '2025-03-28', '24 Mar – 28 Mar', '24 Mar – 28 Mar 2025', {
          Monday: { dateStr: '2025-03-24', displayDate: '24 Mar', fullDate: 'Monday, 24 March 2025' },
          Tuesday: { dateStr: '2025-03-25', displayDate: '25 Mar', fullDate: 'Tuesday, 25 March 2025' },
          Wednesday: { dateStr: '2025-03-26', displayDate: '26 Mar', fullDate: 'Wednesday, 26 March 2025' },
          Thursday: { dateStr: '2025-03-27', displayDate: '27 Mar', fullDate: 'Thursday, 27 March 2025' },
          Friday: { dateStr: '2025-03-28', displayDate: '28 Mar', fullDate: 'Friday, 28 March 2025' },
        }),
      ],
    },
    2: {
      term: 2,
      name: 'Term 2',
      seasonLabel: 'Autumn / Winter',
      startDate: '2025-04-08',
      endDate: '2025-06-27',
      totalWeeks: 12,
      totalSchoolDays: 56,
      holidays: [
        { date: '2025-04-27', name: 'Freedom Day', type: 'public_holiday' },
        { date: '2025-04-28', name: 'Freedom Day (Observed)', type: 'public_holiday' },
        { date: '2025-05-01', name: "Workers' Day", type: 'public_holiday' },
        { date: '2025-06-16', name: 'Youth Day', type: 'public_holiday' },
      ],
      keyMilestones: [
        { week: 1, title: 'Term 2 Reopens', description: 'Tuesday 8 April 2025.' },
        { week: 8, title: 'Mid-Year Examinations', description: 'Grade 10-12 exam window.' },
        { week: 12, title: 'Term 2 Closes', description: 'Friday 27 June 2025.' },
      ],
      weeks: [
        createWeek(2, 1, '2025-04-08', '2025-04-11', '8 Apr – 11 Apr', '8 Apr – 11 Apr 2025', {
          Monday: { dateStr: '2025-04-07', displayDate: '7 Apr', fullDate: 'Monday, 7 April 2025', isSchoolClosed: true, holidayName: 'Staff Administration' },
          Tuesday: { dateStr: '2025-04-08', displayDate: '8 Apr', fullDate: 'Tuesday, 8 April 2025' },
          Wednesday: { dateStr: '2025-04-09', displayDate: '9 Apr', fullDate: 'Wednesday, 9 April 2025' },
          Thursday: { dateStr: '2025-04-10', displayDate: '10 Apr', fullDate: 'Thursday, 10 April 2025' },
          Friday: { dateStr: '2025-04-11', displayDate: '11 Apr', fullDate: 'Friday, 11 April 2025' },
        }),
        createWeek(2, 2, '2025-04-14', '2025-04-18', '14 Apr – 18 Apr', '14 Apr – 18 Apr 2025', {
          Monday: { dateStr: '2025-04-14', displayDate: '14 Apr', fullDate: 'Monday, 14 April 2025' },
          Tuesday: { dateStr: '2025-04-15', displayDate: '15 Apr', fullDate: 'Tuesday, 15 April 2025' },
          Wednesday: { dateStr: '2025-04-16', displayDate: '16 Apr', fullDate: 'Wednesday, 16 April 2025' },
          Thursday: { dateStr: '2025-04-17', displayDate: '17 Apr', fullDate: 'Thursday, 17 April 2025' },
          Friday: { dateStr: '2025-04-18', displayDate: '18 Apr', fullDate: 'Friday, 18 April 2025', isHoliday: true, holidayName: 'Good Friday' },
        }),
        createWeek(2, 3, '2025-04-21', '2025-04-25', '21 Apr – 25 Apr', '21 Apr – 25 Apr 2025', {
          Monday: { dateStr: '2025-04-21', displayDate: '21 Apr', fullDate: 'Monday, 21 April 2025', isHoliday: true, holidayName: 'Family Day' },
          Tuesday: { dateStr: '2025-04-22', displayDate: '22 Apr', fullDate: 'Tuesday, 22 April 2025' },
          Wednesday: { dateStr: '2025-04-23', displayDate: '23 Apr', fullDate: 'Wednesday, 23 April 2025' },
          Thursday: { dateStr: '2025-04-24', displayDate: '24 Apr', fullDate: 'Thursday, 24 April 2025' },
          Friday: { dateStr: '2025-04-25', displayDate: '25 Apr', fullDate: 'Friday, 25 April 2025' },
        }),
        createWeek(2, 4, '2025-04-28', '2025-05-02', '28 Apr – 2 May', '28 Apr – 2 May 2025', {
          Monday: { dateStr: '2025-04-28', displayDate: '28 Apr', fullDate: 'Monday, 28 April 2025', isHoliday: true, holidayName: 'Freedom Day (Observed)' },
          Tuesday: { dateStr: '2025-04-29', displayDate: '29 Apr', fullDate: 'Tuesday, 29 April 2025' },
          Wednesday: { dateStr: '2025-04-30', displayDate: '30 Apr', fullDate: 'Wednesday, 30 April 2025' },
          Thursday: { dateStr: '2025-05-01', displayDate: '1 May', fullDate: 'Thursday, 1 May 2025', isHoliday: true, holidayName: "Workers' Day" },
          Friday: { dateStr: '2025-05-02', displayDate: '2 May', fullDate: 'Friday, 2 May 2025', isHoliday: true, holidayName: 'Special School Holiday' },
        }),
        createWeek(2, 5, '2025-05-05', '2025-05-09', '5 May – 9 May', '5 May – 9 May 2025', {
          Monday: { dateStr: '2025-05-05', displayDate: '5 May', fullDate: 'Monday, 5 May 2025' },
          Tuesday: { dateStr: '2025-05-06', displayDate: '6 May', fullDate: 'Tuesday, 6 May 2025' },
          Wednesday: { dateStr: '2025-05-07', displayDate: '7 May', fullDate: 'Wednesday, 7 May 2025' },
          Thursday: { dateStr: '2025-05-08', displayDate: '8 May', fullDate: 'Thursday, 8 May 2025' },
          Friday: { dateStr: '2025-05-09', displayDate: '9 May', fullDate: 'Friday, 9 May 2025' },
        }),
        createWeek(2, 6, '2025-05-12', '2025-05-16', '12 May – 16 May', '12 May – 16 May 2025', {
          Monday: { dateStr: '2025-05-12', displayDate: '12 May', fullDate: 'Monday, 12 May 2025' },
          Tuesday: { dateStr: '2025-05-13', displayDate: '13 May', fullDate: 'Tuesday, 13 May 2025' },
          Wednesday: { dateStr: '2025-05-14', displayDate: '14 May', fullDate: 'Wednesday, 14 May 2025' },
          Thursday: { dateStr: '2025-05-15', displayDate: '15 May', fullDate: 'Thursday, 15 May 2025' },
          Friday: { dateStr: '2025-05-16', displayDate: '16 May', fullDate: 'Friday, 16 May 2025' },
        }),
        createWeek(2, 7, '2025-05-19', '2025-05-23', '19 May – 23 May', '19 May – 23 May 2025', {
          Monday: { dateStr: '2025-05-19', displayDate: '19 May', fullDate: 'Monday, 19 May 2025' },
          Tuesday: { dateStr: '2025-05-20', displayDate: '20 May', fullDate: 'Tuesday, 20 May 2025' },
          Wednesday: { dateStr: '2025-05-21', displayDate: '21 May', fullDate: 'Wednesday, 21 May 2025' },
          Thursday: { dateStr: '2025-05-22', displayDate: '22 May', fullDate: 'Thursday, 22 May 2025' },
          Friday: { dateStr: '2025-05-23', displayDate: '23 May', fullDate: 'Friday, 23 May 2025' },
        }),
        createWeek(2, 8, '2025-05-26', '2025-05-30', '26 May – 30 May', '26 May – 30 May 2025', {
          Monday: { dateStr: '2025-05-26', displayDate: '26 May', fullDate: 'Monday, 26 May 2025' },
          Tuesday: { dateStr: '2025-05-27', displayDate: '27 May', fullDate: 'Tuesday, 27 May 2025' },
          Wednesday: { dateStr: '2025-05-28', displayDate: '28 May', fullDate: 'Wednesday, 28 May 2025' },
          Thursday: { dateStr: '2025-05-29', displayDate: '29 May', fullDate: 'Thursday, 29 May 2025' },
          Friday: { dateStr: '2025-05-30', displayDate: '30 May', fullDate: 'Friday, 30 May 2025' },
        }),
        createWeek(2, 9, '2025-06-02', '2025-06-06', '2 Jun – 6 Jun', '2 Jun – 6 Jun 2025', {
          Monday: { dateStr: '2025-06-02', displayDate: '2 Jun', fullDate: 'Monday, 2 June 2025' },
          Tuesday: { dateStr: '2025-06-03', displayDate: '3 Jun', fullDate: 'Tuesday, 3 June 2025' },
          Wednesday: { dateStr: '2025-06-04', displayDate: '4 Jun', fullDate: 'Wednesday, 4 June 2025' },
          Thursday: { dateStr: '2025-06-05', displayDate: '5 Jun', fullDate: 'Thursday, 5 June 2025' },
          Friday: { dateStr: '2025-06-06', displayDate: '6 Jun', fullDate: 'Friday, 6 June 2025' },
        }),
        createWeek(2, 10, '2025-06-09', '2025-06-13', '9 Jun – 13 Jun', '9 Jun – 13 Jun 2025', {
          Monday: { dateStr: '2025-06-09', displayDate: '9 Jun', fullDate: 'Monday, 9 June 2025' },
          Tuesday: { dateStr: '2025-06-10', displayDate: '10 Jun', fullDate: 'Tuesday, 10 June 2025' },
          Wednesday: { dateStr: '2025-06-11', displayDate: '11 Jun', fullDate: 'Wednesday, 11 June 2025' },
          Thursday: { dateStr: '2025-06-12', displayDate: '12 Jun', fullDate: 'Thursday, 12 June 2025' },
          Friday: { dateStr: '2025-06-13', displayDate: '13 Jun', fullDate: 'Friday, 13 June 2025' },
        }),
        createWeek(2, 11, '2025-06-16', '2025-06-20', '16 Jun – 20 Jun', '16 Jun – 20 Jun 2025', {
          Monday: { dateStr: '2025-06-16', displayDate: '16 Jun', fullDate: 'Monday, 16 June 2025', isHoliday: true, holidayName: 'Youth Day' },
          Tuesday: { dateStr: '2025-06-17', displayDate: '17 Jun', fullDate: 'Tuesday, 17 June 2025' },
          Wednesday: { dateStr: '2025-06-18', displayDate: '18 Jun', fullDate: 'Wednesday, 18 June 2025' },
          Thursday: { dateStr: '2025-06-19', displayDate: '19 Jun', fullDate: 'Thursday, 19 June 2025' },
          Friday: { dateStr: '2025-06-20', displayDate: '20 Jun', fullDate: 'Friday, 20 June 2025' },
        }),
        createWeek(2, 12, '2025-06-23', '2025-06-27', '23 Jun – 27 Jun', '23 Jun – 27 Jun 2025', {
          Monday: { dateStr: '2025-06-23', displayDate: '23 Jun', fullDate: 'Monday, 23 June 2025' },
          Tuesday: { dateStr: '2025-06-24', displayDate: '24 Jun', fullDate: 'Tuesday, 24 June 2025' },
          Wednesday: { dateStr: '2025-06-25', displayDate: '25 Jun', fullDate: 'Wednesday, 25 June 2025' },
          Thursday: { dateStr: '2025-06-26', displayDate: '26 Jun', fullDate: 'Thursday, 26 June 2025' },
          Friday: { dateStr: '2025-06-27', displayDate: '27 Jun', fullDate: 'Friday, 27 June 2025' },
        }),
      ],
    },
    3: {
      term: 3,
      name: 'Term 3',
      seasonLabel: 'Winter / Spring',
      startDate: '2025-07-22',
      endDate: '2025-10-03',
      totalWeeks: 11,
      totalSchoolDays: 54,
      holidays: [
        { date: '2025-08-09', name: "National Women's Day", type: 'public_holiday' },
        { date: '2025-09-24', name: 'Heritage Day', type: 'public_holiday' },
      ],
      keyMilestones: [
        { week: 1, title: 'Term 3 Reopens', description: 'Tuesday 22 July 2025.' },
        { week: 7, title: 'Grade 12 Trial Exams', description: 'Prelim exams begin.' },
        { week: 11, title: 'Term 3 Closes', description: 'Friday 3 October 2025.' },
      ],
      weeks: [
        createWeek(3, 1, '2025-07-22', '2025-07-25', '22 Jul – 25 Jul', '22 Jul – 25 Jul 2025', {
          Monday: { dateStr: '2025-07-21', displayDate: '21 Jul', fullDate: 'Monday, 21 July 2025', isSchoolClosed: true, holidayName: 'Staff Administration' },
          Tuesday: { dateStr: '2025-07-22', displayDate: '22 Jul', fullDate: 'Tuesday, 22 July 2025' },
          Wednesday: { dateStr: '2025-07-23', displayDate: '23 Jul', fullDate: 'Wednesday, 23 July 2025' },
          Thursday: { dateStr: '2025-07-24', displayDate: '24 Jul', fullDate: 'Thursday, 24 July 2025' },
          Friday: { dateStr: '2025-07-25', displayDate: '25 Jul', fullDate: 'Friday, 25 July 2025' },
        }),
        createWeek(3, 2, '2025-07-28', '2025-08-01', '28 Jul – 1 Aug', '28 Jul – 1 Aug 2025', {
          Monday: { dateStr: '2025-07-28', displayDate: '28 Jul', fullDate: 'Monday, 28 July 2025' },
          Tuesday: { dateStr: '2025-07-29', displayDate: '29 Jul', fullDate: 'Tuesday, 29 July 2025' },
          Wednesday: { dateStr: '2025-07-30', displayDate: '30 Jul', fullDate: 'Wednesday, 30 July 2025' },
          Thursday: { dateStr: '2025-07-31', displayDate: '31 Jul', fullDate: 'Thursday, 31 July 2025' },
          Friday: { dateStr: '2025-08-01', displayDate: '1 Aug', fullDate: 'Friday, 1 August 2025' },
        }),
        createWeek(3, 3, '2025-08-04', '2025-08-08', '4 Aug – 8 Aug', '4 Aug – 8 Aug 2025', {
          Monday: { dateStr: '2025-08-04', displayDate: '4 Aug', fullDate: 'Monday, 4 August 2025' },
          Tuesday: { dateStr: '2025-08-05', displayDate: '5 Aug', fullDate: 'Tuesday, 5 August 2025' },
          Wednesday: { dateStr: '2025-08-06', displayDate: '6 Aug', fullDate: 'Wednesday, 6 August 2025' },
          Thursday: { dateStr: '2025-08-07', displayDate: '7 Aug', fullDate: 'Thursday, 7 August 2025' },
          Friday: { dateStr: '2025-08-08', displayDate: '8 Aug', fullDate: 'Friday, 8 August 2025' },
        }),
        createWeek(3, 4, '2025-08-11', '2025-08-15', '11 Aug – 15 Aug', '11 Aug – 15 Aug 2025', {
          Monday: { dateStr: '2025-08-11', displayDate: '11 Aug', fullDate: 'Monday, 11 August 2025' },
          Tuesday: { dateStr: '2025-08-12', displayDate: '12 Aug', fullDate: 'Tuesday, 12 August 2025' },
          Wednesday: { dateStr: '2025-08-13', displayDate: '13 Aug', fullDate: 'Wednesday, 13 August 2025' },
          Thursday: { dateStr: '2025-08-14', displayDate: '14 Aug', fullDate: 'Thursday, 14 August 2025' },
          Friday: { dateStr: '2025-08-15', displayDate: '15 Aug', fullDate: 'Friday, 15 August 2025' },
        }),
        createWeek(3, 5, '2025-08-18', '2025-08-22', '18 Aug – 22 Aug', '18 Aug – 22 Aug 2025', {
          Monday: { dateStr: '2025-08-18', displayDate: '18 Aug', fullDate: 'Monday, 18 August 2025' },
          Tuesday: { dateStr: '2025-08-19', displayDate: '19 Aug', fullDate: 'Tuesday, 19 August 2025' },
          Wednesday: { dateStr: '2025-08-20', displayDate: '20 Aug', fullDate: 'Wednesday, 20 August 2025' },
          Thursday: { dateStr: '2025-08-21', displayDate: '21 Aug', fullDate: 'Thursday, 21 August 2025' },
          Friday: { dateStr: '2025-08-22', displayDate: '22 Aug', fullDate: 'Friday, 22 August 2025' },
        }),
        createWeek(3, 6, '2025-08-25', '2025-08-29', '25 Aug – 29 Aug', '25 Aug – 29 Aug 2025', {
          Monday: { dateStr: '2025-08-25', displayDate: '25 Aug', fullDate: 'Monday, 25 August 2025' },
          Tuesday: { dateStr: '2025-08-26', displayDate: '26 Aug', fullDate: 'Tuesday, 26 August 2025' },
          Wednesday: { dateStr: '2025-08-27', displayDate: '27 Aug', fullDate: 'Wednesday, 27 August 2025' },
          Thursday: { dateStr: '2025-08-28', displayDate: '28 Aug', fullDate: 'Thursday, 28 August 2025' },
          Friday: { dateStr: '2025-08-29', displayDate: '29 Aug', fullDate: 'Friday, 29 August 2025' },
        }),
        createWeek(3, 7, '2025-09-01', '2025-09-05', '1 Sep – 5 Sep', '1 Sep – 5 Sep 2025', {
          Monday: { dateStr: '2025-09-01', displayDate: '1 Sep', fullDate: 'Monday, 1 September 2025' },
          Tuesday: { dateStr: '2025-09-02', displayDate: '2 Sep', fullDate: 'Tuesday, 2 September 2025' },
          Wednesday: { dateStr: '2025-09-03', displayDate: '3 Sep', fullDate: 'Wednesday, 3 September 2025' },
          Thursday: { dateStr: '2025-09-04', displayDate: '4 Sep', fullDate: 'Thursday, 4 September 2025' },
          Friday: { dateStr: '2025-09-05', displayDate: '5 Sep', fullDate: 'Friday, 5 September 2025' },
        }),
        createWeek(3, 8, '2025-09-08', '2025-09-12', '8 Sep – 12 Sep', '8 Sep – 12 Sep 2025', {
          Monday: { dateStr: '2025-09-08', displayDate: '8 Sep', fullDate: 'Monday, 8 September 2025' },
          Tuesday: { dateStr: '2025-09-09', displayDate: '9 Sep', fullDate: 'Tuesday, 9 September 2025' },
          Wednesday: { dateStr: '2025-09-10', displayDate: '10 Sep', fullDate: 'Wednesday, 10 September 2025' },
          Thursday: { dateStr: '2025-09-11', displayDate: '11 Sep', fullDate: 'Thursday, 11 September 2025' },
          Friday: { dateStr: '2025-09-12', displayDate: '12 Sep', fullDate: 'Friday, 12 September 2025' },
        }),
        createWeek(3, 9, '2025-09-15', '2025-09-19', '15 Sep – 19 Sep', '15 Sep – 19 Sep 2025', {
          Monday: { dateStr: '2025-09-15', displayDate: '15 Sep', fullDate: 'Monday, 15 September 2025' },
          Tuesday: { dateStr: '2025-09-16', displayDate: '16 Sep', fullDate: 'Tuesday, 16 September 2025' },
          Wednesday: { dateStr: '2025-09-17', displayDate: '17 Sep', fullDate: 'Wednesday, 17 September 2025' },
          Thursday: { dateStr: '2025-09-18', displayDate: '18 Sep', fullDate: 'Thursday, 18 September 2025' },
          Friday: { dateStr: '2025-09-19', displayDate: '19 Sep', fullDate: 'Friday, 19 September 2025' },
        }),
        createWeek(3, 10, '2025-09-22', '2025-09-26', '22 Sep – 26 Sep', '22 Sep – 26 Sep 2025', {
          Monday: { dateStr: '2025-09-22', displayDate: '22 Sep', fullDate: 'Monday, 22 September 2025' },
          Tuesday: { dateStr: '2025-09-23', displayDate: '23 Sep', fullDate: 'Tuesday, 23 September 2025' },
          Wednesday: { dateStr: '2025-09-24', displayDate: '24 Sep', fullDate: 'Wednesday, 24 September 2025', isHoliday: true, holidayName: 'Heritage Day' },
          Thursday: { dateStr: '2025-09-25', displayDate: '25 Sep', fullDate: 'Thursday, 25 September 2025' },
          Friday: { dateStr: '2025-09-26', displayDate: '26 Sep', fullDate: 'Friday, 26 September 2025' },
        }),
        createWeek(3, 11, '2025-09-29', '2025-10-03', '29 Sep – 3 Oct', '29 Sep – 3 Oct 2025', {
          Monday: { dateStr: '2025-09-29', displayDate: '29 Sep', fullDate: 'Monday, 29 September 2025' },
          Tuesday: { dateStr: '2025-09-30', displayDate: '30 Sep', fullDate: 'Tuesday, 30 September 2025' },
          Wednesday: { dateStr: '2025-10-01', displayDate: '1 Oct', fullDate: 'Wednesday, 1 October 2025' },
          Thursday: { dateStr: '2025-10-02', displayDate: '2 Oct', fullDate: 'Thursday, 2 October 2025' },
          Friday: { dateStr: '2025-10-03', displayDate: '3 Oct', fullDate: 'Friday, 3 October 2025' },
        }),
      ],
    },
    4: {
      term: 4,
      name: 'Term 4',
      seasonLabel: 'Spring / Summer',
      startDate: '2025-10-13',
      endDate: '2025-12-12',
      totalWeeks: 10,
      totalSchoolDays: 43,
      holidays: [
        { date: '2025-12-16', name: 'Day of Reconciliation', type: 'public_holiday' },
      ],
      keyMilestones: [
        { week: 1, title: 'Term 4 Opens', description: 'Monday 13 October 2025.' },
        { week: 5, title: 'Matric Exams Begin', description: 'NSC & IEB Final exams.' },
        { week: 10, title: 'School Year Closes', description: 'Friday 12 December 2025.' },
      ],
      weeks: [
        createWeek(4, 1, '2025-10-13', '2025-10-17', '13 Oct – 17 Oct', '13 Oct – 17 Oct 2025', {
          Monday: { dateStr: '2025-10-13', displayDate: '13 Oct', fullDate: 'Monday, 13 October 2025' },
          Tuesday: { dateStr: '2025-10-14', displayDate: '14 Oct', fullDate: 'Tuesday, 14 October 2025' },
          Wednesday: { dateStr: '2025-10-15', displayDate: '15 Oct', fullDate: 'Wednesday, 15 October 2025' },
          Thursday: { dateStr: '2025-10-16', displayDate: '16 Oct', fullDate: 'Thursday, 16 October 2025' },
          Friday: { dateStr: '2025-10-17', displayDate: '17 Oct', fullDate: 'Friday, 17 October 2025' },
        }),
        createWeek(4, 2, '2025-10-20', '2025-10-24', '20 Oct – 24 Oct', '20 Oct – 24 Oct 2025', {
          Monday: { dateStr: '2025-10-20', displayDate: '20 Oct', fullDate: 'Monday, 20 October 2025' },
          Tuesday: { dateStr: '2025-10-21', displayDate: '21 Oct', fullDate: 'Tuesday, 21 October 2025' },
          Wednesday: { dateStr: '2025-10-22', displayDate: '22 Oct', fullDate: 'Wednesday, 22 October 2025' },
          Thursday: { dateStr: '2025-10-23', displayDate: '23 Oct', fullDate: 'Thursday, 23 October 2025' },
          Friday: { dateStr: '2025-10-24', displayDate: '24 Oct', fullDate: 'Friday, 24 October 2025' },
        }),
        createWeek(4, 3, '2025-10-27', '2025-10-31', '27 Oct – 31 Oct', '27 Oct – 31 Oct 2025', {
          Monday: { dateStr: '2025-10-27', displayDate: '27 Oct', fullDate: 'Monday, 27 October 2025' },
          Tuesday: { dateStr: '2025-10-28', displayDate: '28 Oct', fullDate: 'Tuesday, 28 October 2025' },
          Wednesday: { dateStr: '2025-10-29', displayDate: '29 Oct', fullDate: 'Wednesday, 29 October 2025' },
          Thursday: { dateStr: '2025-10-30', displayDate: '30 Oct', fullDate: 'Thursday, 30 October 2025' },
          Friday: { dateStr: '2025-10-31', displayDate: '31 Oct', fullDate: 'Friday, 31 October 2025' },
        }),
        createWeek(4, 4, '2025-11-03', '2025-11-07', '3 Nov – 7 Nov', '3 Nov – 7 Nov 2025', {
          Monday: { dateStr: '2025-11-03', displayDate: '3 Nov', fullDate: 'Monday, 3 November 2025' },
          Tuesday: { dateStr: '2025-11-04', displayDate: '4 Nov', fullDate: 'Tuesday, 4 November 2025' },
          Wednesday: { dateStr: '2025-11-05', displayDate: '5 Nov', fullDate: 'Wednesday, 5 November 2025' },
          Thursday: { dateStr: '2025-11-06', displayDate: '6 Nov', fullDate: 'Thursday, 6 November 2025' },
          Friday: { dateStr: '2025-11-07', displayDate: '7 Nov', fullDate: 'Friday, 7 November 2025' },
        }),
        createWeek(4, 5, '2025-11-10', '2025-11-14', '10 Nov – 14 Nov', '10 Nov – 14 Nov 2025', {
          Monday: { dateStr: '2025-11-10', displayDate: '10 Nov', fullDate: 'Monday, 10 November 2025' },
          Tuesday: { dateStr: '2025-11-11', displayDate: '11 Nov', fullDate: 'Tuesday, 11 November 2025' },
          Wednesday: { dateStr: '2025-11-12', displayDate: '12 Nov', fullDate: 'Wednesday, 12 November 2025' },
          Thursday: { dateStr: '2025-11-13', displayDate: '13 Nov', fullDate: 'Thursday, 13 November 2025' },
          Friday: { dateStr: '2025-11-14', displayDate: '14 Nov', fullDate: 'Friday, 14 November 2025' },
        }),
        createWeek(4, 6, '2025-11-17', '2025-11-21', '17 Nov – 21 Nov', '17 Nov – 21 Nov 2025', {
          Monday: { dateStr: '2025-11-17', displayDate: '17 Nov', fullDate: 'Monday, 17 November 2025' },
          Tuesday: { dateStr: '2025-11-18', displayDate: '18 Nov', fullDate: 'Tuesday, 18 November 2025' },
          Wednesday: { dateStr: '2025-11-19', displayDate: '19 Nov', fullDate: 'Wednesday, 19 November 2025' },
          Thursday: { dateStr: '2025-11-20', displayDate: '20 Nov', fullDate: 'Thursday, 20 November 2025' },
          Friday: { dateStr: '2025-11-21', displayDate: '21 Nov', fullDate: 'Friday, 21 November 2025' },
        }),
        createWeek(4, 7, '2025-11-24', '2025-11-28', '24 Nov – 28 Nov', '24 Nov – 28 Nov 2025', {
          Monday: { dateStr: '2025-11-24', displayDate: '24 Nov', fullDate: 'Monday, 24 November 2025' },
          Tuesday: { dateStr: '2025-11-25', displayDate: '25 Nov', fullDate: 'Tuesday, 25 November 2025' },
          Wednesday: { dateStr: '2025-11-26', displayDate: '26 Nov', fullDate: 'Wednesday, 26 November 2025' },
          Thursday: { dateStr: '2025-11-27', displayDate: '27 Nov', fullDate: 'Thursday, 27 November 2025' },
          Friday: { dateStr: '2025-11-28', displayDate: '28 Nov', fullDate: 'Friday, 28 November 2025' },
        }),
        createWeek(4, 8, '2025-12-01', '2025-12-05', '1 Dec – 5 Dec', '1 Dec – 5 Dec 2025', {
          Monday: { dateStr: '2025-12-01', displayDate: '1 Dec', fullDate: 'Monday, 1 December 2025' },
          Tuesday: { dateStr: '2025-12-02', displayDate: '2 Dec', fullDate: 'Tuesday, 2 December 2025' },
          Wednesday: { dateStr: '2025-12-03', displayDate: '3 Dec', fullDate: 'Wednesday, 3 December 2025' },
          Thursday: { dateStr: '2025-12-04', displayDate: '4 Dec', fullDate: 'Thursday, 4 December 2025' },
          Friday: { dateStr: '2025-12-05', displayDate: '5 Dec', fullDate: 'Friday, 5 December 2025' },
        }),
        createWeek(4, 9, '2025-12-08', '2025-12-12', '8 Dec – 12 Dec', '8 Dec – 12 Dec 2025', {
          Monday: { dateStr: '2025-12-08', displayDate: '8 Dec', fullDate: 'Monday, 8 December 2025' },
          Tuesday: { dateStr: '2025-12-09', displayDate: '9 Dec', fullDate: 'Tuesday, 9 December 2025' },
          Wednesday: { dateStr: '2025-12-10', displayDate: '10 Dec', fullDate: 'Wednesday, 10 December 2025' },
          Thursday: { dateStr: '2025-12-11', displayDate: '11 Dec', fullDate: 'Thursday, 11 December 2025' },
          Friday: { dateStr: '2025-12-12', displayDate: '12 Dec', fullDate: 'Friday, 12 December 2025' },
        }),
      ],
    },
  },
};

export const SUPPORTED_CALENDARS: Record<number, AcademicYearCalendar> = {
  2026: CALENDAR_2026,
  2025: CALENDAR_2025,
};

// =========================================================================
// CALENDAR & ATP ALIGNMENT HELPER UTILITIES
// =========================================================================

/**
 * Retrieve the active AcademicYearCalendar for a given year (defaults to 2026).
 */
export function getCalendarForYear(year: number = 2026): AcademicYearCalendar {
  return SUPPORTED_CALENDARS[year] || CALENDAR_2026;
}

/**
 * Get term info for given year and term.
 */
export function getTermCalendarInfo(term: number, year: number = 2026): TermCalendarInfo | undefined {
  const cal = getCalendarForYear(year);
  return cal.terms[term];
}

/**
 * Retrieve week info for given term and week number.
 */
export function getAcademicWeekInfo(
  term: number,
  week: number,
  year: number = 2026
): AcademicWeekInfo | undefined {
  const termInfo = getTermCalendarInfo(term, year);
  if (!termInfo) return undefined;
  return termInfo.weeks.find(w => w.week === week);
}

/**
 * Formats a short or long date range string for an ATP item or timetable view.
 */
export function getFormattedWeekRange(
  term: number,
  week: number,
  year: number = 2026,
  format: 'short' | 'long' = 'short'
): string {
  const weekInfo = getAcademicWeekInfo(term, week, year);
  if (!weekInfo) return `Term ${term} W${week}`;
  return format === 'long' ? weekInfo.dateRangeLong : weekInfo.dateRangeShort;
}

/**
 * Get the exact calendar date for a specific weekday in a given term and week.
 */
export function getDayDetailForWeek(
  day: WeekdayName,
  term: number,
  week: number,
  year: number = 2026
): CalendarDayDetail {
  const weekInfo = getAcademicWeekInfo(term, week, year);
  if (weekInfo && weekInfo.days[day]) {
    return weekInfo.days[day];
  }

  // Fallback if not found
  return {
    dateStr: `${year}-01-01`,
    displayDate: day.slice(0, 3),
    fullDate: `${day}, Term ${term} Week ${week} ${year}`,
  };
}

/**
 * Live Academic Term & Week Detection based on a real Date object.
 * Returns the matched term and week, or closest academic week if in holiday.
 */
export function detectAcademicPeriod(currentDate: Date = new Date()): {
  year: number;
  term: number;
  week: number;
  isHoliday: boolean;
  holidayName?: string;
  isSchoolTerm: boolean;
  statusNote: string;
  matchedWeek?: AcademicWeekInfo;
  matchedTerm?: TermCalendarInfo;
} {
  const year = currentDate.getFullYear();
  const cal = SUPPORTED_CALENDARS[year] || CALENDAR_2026;
  const isoDate = currentDate.toISOString().slice(0, 10);

  // Check all terms
  for (const termNum of [1, 2, 3, 4]) {
    const termInfo = cal.terms[termNum];
    if (!termInfo) continue;

    // Check if within term start and end date
    if (isoDate >= termInfo.startDate && isoDate <= termInfo.endDate) {
      // Find week (allow weekend days up to Sunday to be included with that week)
      for (let i = 0; i < termInfo.weeks.length; i++) {
        const w = termInfo.weeks[i];
        const isLastWeekOfTerm = i === termInfo.weeks.length - 1;
        
        // Compute weekend extension for week matching (up to next Sunday)
        const nextWeekStart = !isLastWeekOfTerm ? termInfo.weeks[i + 1].startDate : termInfo.endDate;
        
        if (isoDate >= w.startDate && (isoDate <= w.endDate || isoDate < nextWeekStart)) {
          const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' }) as WeekdayName;
          const dayDetail = w.days[dayName];
          return {
            year,
            term: termNum,
            week: w.week,
            isHoliday: dayDetail?.isHoliday || false,
            holidayName: dayDetail?.holidayName,
            isSchoolTerm: true,
            statusNote: dayDetail?.holidayName || `${termInfo.name} Week ${w.week}`,
            matchedWeek: w,
            matchedTerm: termInfo,
          };
        }
      }

      // If in term but between formal week bounds, pick closest or last week
      const lastWeek = termInfo.weeks[termInfo.weeks.length - 1];
      return {
        year,
        term: termNum,
        week: lastWeek.week,
        isHoliday: false,
        isSchoolTerm: true,
        statusNote: `${termInfo.name} Week ${lastWeek.week}`,
        matchedWeek: lastWeek,
        matchedTerm: termInfo,
      };
    }
  }

  // If outside term bounds (holiday period), determine which term is next or preceding
  if (isoDate < cal.terms[1].startDate) {
    return {
      year,
      term: 1,
      week: 1,
      isHoliday: true,
      holidayName: 'Summer School Holidays (Pre-Term 1)',
      isSchoolTerm: false,
      statusNote: 'Summer Holidays (Pre-Term 1)',
      matchedWeek: cal.terms[1].weeks[0],
      matchedTerm: cal.terms[1],
    };
  }

  if (isoDate > cal.terms[1].endDate && isoDate < cal.terms[2].startDate) {
    return {
      year,
      term: 2,
      week: 1,
      isHoliday: true,
      holidayName: 'Autumn School Holidays',
      isSchoolTerm: false,
      statusNote: 'Autumn School Holidays (Recess)',
      matchedWeek: cal.terms[2].weeks[0],
      matchedTerm: cal.terms[2],
    };
  }

  if (isoDate > cal.terms[2].endDate && isoDate < cal.terms[3].startDate) {
    return {
      year,
      term: 3,
      week: 1,
      isHoliday: true,
      holidayName: 'Winter School Holidays',
      isSchoolTerm: false,
      statusNote: 'Winter School Holidays (Recess)',
      matchedWeek: cal.terms[3].weeks[0],
      matchedTerm: cal.terms[3],
    };
  }

  if (isoDate > cal.terms[3].endDate && isoDate < cal.terms[4].startDate) {
    return {
      year,
      term: 4,
      week: 1,
      isHoliday: true,
      holidayName: 'Spring School Holidays',
      isSchoolTerm: false,
      statusNote: 'Spring School Holidays (Recess)',
      matchedWeek: cal.terms[4].weeks[0],
      matchedTerm: cal.terms[4],
    };
  }

  // End of year
  const t4 = cal.terms[4];
  return {
    year,
    term: 4,
    week: t4.weeks[t4.weeks.length - 1].week,
    isHoliday: true,
    holidayName: 'Summer School Holidays',
    isSchoolTerm: false,
    statusNote: 'Summer School Holidays (Recess)',
    matchedWeek: t4.weeks[t4.weeks.length - 1],
    matchedTerm: t4,
  };
}

/**
 * Pacing status calculation for ATP items relative to the current live date.
 */
export function getATPPacingStatus(
  atpItem: ATPItem,
  currentTerm: number,
  currentWeek: number
): 'completed' | 'active' | 'upcoming' {
  if (atpItem.term < currentTerm) return 'completed';
  if (atpItem.term > currentTerm) return 'upcoming';
  if (atpItem.week < currentWeek) return 'completed';
  if (atpItem.week === currentWeek) return 'active';
  return 'upcoming';
}
