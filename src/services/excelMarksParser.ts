import * as XLSX from 'xlsx';
import { 
  Marksheet, 
  MarkEntry, 
  MarkStatus, 
  Learner, 
  Assessment, 
  AchievementLevel 
} from '../types/marks';
import { GradeClass, Subject as SubjectName } from '../types';
import { calculateAchievementLevel } from '../utils/marksheetAnalytics';

export interface ParseError {
  row?: number;
  column?: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ExcelParseResult {
  success: boolean;
  marksheet?: Marksheet;
  learners: Learner[];
  assessments: Assessment[];
  errors: ParseError[];
}

/**
 * A reusable parser for South African School Marksheets (CAPS & IEB)
 */
export class ExcelMarksParser {
  private workbook: XLSX.WorkBook;

  constructor(arrayBuffer: ArrayBuffer) {
    this.workbook = XLSX.read(arrayBuffer, { type: 'array' });
  }

  /**
   * Main entry point to parse a marksheet
   */
  public parse(): ExcelParseResult {
    const sheetName = this.workbook.SheetNames[0];
    const worksheet = this.workbook.Sheets[sheetName];
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const errors: ParseError[] = [];
    
    // 1. Metadata Detection
    const metadata = this.detectMetadata(data);
    if (!metadata.subject || !metadata.grade) {
      errors.push({ message: 'Could not detect Subject or Grade from the file header.', severity: 'error' });
      return { success: false, learners: [], assessments: [], errors };
    }

    // 2. Structure Detection (Assessments, Weightings, Max Marks)
    const structure = this.detectStructure(data);
    if (structure.assessments.length === 0) {
      errors.push({ message: 'No assessments found in the column headers.', severity: 'error' });
      return { success: false, learners: [], assessments: [], errors };
    }

    // Verify weightings
    const totalWeight = structure.assessments.reduce((acc, curr) => acc + curr.weighting, 0);
    if (totalWeight !== 100 && metadata.curriculum === 'IEB') {
       errors.push({ message: `IEB Marksheet weighting total is ${totalWeight}%, but should be 100%.`, severity: 'warning' });
    }

    // 3. Learner & Mark Extraction
    const learners: Learner[] = [];
    const entries: MarkEntry[] = [];
    const learnerIds = new Set<string>();

    const startRow = structure.dataStartRow;
    for (let i = startRow; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length < 2) continue;

      const learnerId = String(row[structure.idCol] || '').trim();
      const surname = String(row[structure.surnameCol] || '').trim();
      const name = String(row[structure.nameCol] || '').trim();

      if (!learnerId && !surname) continue;

      if (learnerIds.has(learnerId)) {
        errors.push({ row: i + 1, message: `Duplicate learner ID found: ${learnerId}`, severity: 'error' });
        continue;
      }
      learnerIds.add(learnerId);

      const learner: Learner = {
        id: learnerId,
        name,
        surname,
        classId: metadata.grade as GradeClass
      };
      learners.push(learner);

      // Extract marks for each assessment
      structure.assessments.forEach((assessment, idx) => {
        const colIdx = structure.assessmentCols[idx];
        const rawValue = row[colIdx];
        
        let rawMark: number | null = null;
        let status: MarkStatus = 'PRESENT';
        let isAbsent = false;

        if (rawValue === undefined || rawValue === null || String(rawValue).trim() === '') {
          errors.push({ row: i + 1, column: assessment.code, message: `Missing mark for ${learner.name} ${learner.surname}`, severity: 'warning' });
        } else if (typeof rawValue === 'string' && ['A', 'AB', 'ABS'].includes(rawValue.toUpperCase())) {
          status = 'ABSENT';
          isAbsent = true;
        } else if (typeof rawValue === 'string' && ['M', 'MED'].includes(rawValue.toUpperCase())) {
          status = 'MEDICAL';
        } else {
          const parsed = parseFloat(rawValue);
          if (isNaN(parsed)) {
            errors.push({ row: i + 1, column: assessment.code, message: `Invalid mark value: ${rawValue}`, severity: 'error' });
          } else if (parsed < 0 || parsed > assessment.totalMarks) {
            errors.push({ row: i + 1, column: assessment.code, message: `Mark ${parsed} exceeds maximum of ${assessment.totalMarks}`, severity: 'error' });
          } else {
            rawMark = parsed;
          }
        }

        const percentage = rawMark !== null ? (rawMark / assessment.totalMarks) * 100 : null;

        entries.push({
          learnerId,
          assessmentId: assessment.id,
          taskId: assessment.id, // For compatibility
          rawMark,
          percentage,
          achievementLevel: percentage !== null ? calculateAchievementLevel(percentage) : null,
          status,
          isAbsent,
          lastModified: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        });
      });
    }

    const marksheet: Marksheet = {
      id: `imported-${Date.now()}`,
      classId: metadata.grade as GradeClass,
      subject: metadata.subject as SubjectName,
      term: metadata.term || 1,
      academicYear: 2026,
      taskId: 'CLASS_MARKSHEET',
      entries
    };

    return {
      success: errors.filter(e => e.severity === 'error').length === 0,
      marksheet,
      learners,
      assessments: structure.assessments,
      errors
    };
  }

  private detectMetadata(data: any[][]): { subject?: string, grade?: string, term?: number, curriculum?: 'CAPS' | 'IEB' } {
    let subject, grade, term;
    let curriculum: 'CAPS' | 'IEB' = 'CAPS';

    // official templates often have metadata in the first 5 rows
    for (let i = 0; i < Math.min(data.length, 10); i++) {
      const row = data[i];
      if (!row) continue;
      const rowStr = row.join(' ').toLowerCase();
      
      if (rowStr.includes('technology')) subject = 'Technology';
      if (rowStr.includes('mathematical literacy') || rowStr.includes('mathlit') || rowStr.includes('maths lit')) {
        subject = 'Mathematical Literacy';
        curriculum = 'IEB';
      }

      if (rowStr.includes('ieb') || rowStr.includes('ieb-aligned')) curriculum = 'IEB';
      if (rowStr.includes('caps') || rowStr.includes('dbe')) curriculum = 'CAPS';

      const gradeMatch = rowStr.match(/grade\s*(\d+)/i);
      if (gradeMatch) grade = gradeMatch[1];

      const termMatch = rowStr.match(/term\s*(\d+)/i);
      if (termMatch) term = parseInt(termMatch[1]);
    }

    // fallback detection based on subject keywords if grade is missing
    if (!grade) {
      if (subject === 'Technology') grade = '8'; // Default to 8
      if (subject === 'Mathematical Literacy') grade = '10'; // Default to 10
    }

    return { subject, grade, term, curriculum };
  }

  private detectStructure(data: any[][]): { 
    idCol: number, 
    surnameCol: number, 
    nameCol: number, 
    assessments: Assessment[], 
    assessmentCols: number[],
    dataStartRow: number 
  } {
    let idCol = -1, surnameCol = -1, nameCol = -1;
    let headerRowIdx = -1;
    const assessments: Assessment[] = [];
    const assessmentCols: number[] = [];

    // 1. Identify the Main Header Row
    for (let i = 0; i < Math.min(data.length, 20); i++) {
      const row = data[i];
      if (!row) continue;
      const rowLower = row.map(c => String(c || '').toLowerCase());
      
      const sIdx = rowLower.findIndex(c => c.includes('surname') || c.includes('family name'));
      const nIdx = rowLower.findIndex(c => c.includes('name') || c.includes('first name'));
      const iIdx = rowLower.findIndex(c => c.includes('id') || c.includes('student no') || c.includes('admission'));

      if (sIdx !== -1 || iIdx !== -1) {
        headerRowIdx = i;
        surnameCol = sIdx;
        nameCol = nIdx;
        idCol = iIdx;
        break;
      }
    }

    if (headerRowIdx === -1) {
      // Fallback defaults
      headerRowIdx = 4;
      idCol = 0; surnameCol = 1; nameCol = 2;
    } else {
      if (idCol === -1) idCol = 0;
      if (surnameCol === -1) surnameCol = 1;
      if (nameCol === -1) nameCol = 2;
    }

    // 2. Identify Max Marks and Weights (usually the next 1-2 rows)
    const headerRow = data[headerRowIdx];
    const nextRow = data[headerRowIdx + 1] || [];
    const thirdRow = data[headerRowIdx + 2] || [];

    // We search columns after name/id for assessment tasks
    const startCol = Math.max(idCol, surnameCol, nameCol) + 1;
    
    headerRow.forEach((cell, idx) => {
      if (idx >= startCol) {
        const title = String(cell || '').trim();
        if (title && !/total|avg|average|rank|percent|%|level/i.test(title)) {
          // Look for Max Mark in next rows
          let maxMark = 100;
          let weight = 0;

          // Check if next row contains numbers
          const nrVal = parseFloat(String(nextRow[idx]));
          const trVal = parseFloat(String(thirdRow[idx]));

          if (!isNaN(nrVal)) maxMark = nrVal;
          if (!isNaN(trVal)) weight = trVal;

          assessments.push({
            id: `task-${idx}-${Date.now()}`,
            code: title.toUpperCase().replace(/\s+/g, '_'),
            title,
            totalMarks: maxMark,
            weighting: weight,
            term: 1,
            category: 'Assessment'
          });
          assessmentCols.push(idx);
        }
      }
    });

    // Determine where actual student data starts
    // If next rows were max/weight, start after them
    let dataStartRow = headerRowIdx + 1;
    if (assessments.length > 0) {
      const nrIsNumeric = !isNaN(parseFloat(String(nextRow[assessmentCols[0]])));
      const trIsNumeric = !isNaN(parseFloat(String(thirdRow[assessmentCols[0]])));
      if (nrIsNumeric) dataStartRow++;
      if (trIsNumeric) dataStartRow++;
    }

    return { idCol, surnameCol, nameCol, assessments, assessmentCols, dataStartRow };
  }
}
