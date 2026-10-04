import * as XLSX from 'xlsx';
import { Learner, MarkEntry, MarkStatus } from '../types/marks';
import { AssessmentTask } from '../types';

export function exportMarksheetTemplate(
  learners: Learner[],
  task: AssessmentTask
) {
  const data = learners.map((l, index) => ({
    'No.': index + 1,
    'Learner ID': l.id,
    'Surname': l.surname,
    'Name': l.name,
    'Raw Mark': '',
    'Status (PRESENT/ABSENT/MEDICAL/NHI)': 'PRESENT',
    'Comment': ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Marksheet');

  // Add a hidden sheet or info row with task metadata
  XLSX.utils.sheet_add_aoa(worksheet, [
    ['TASK INFO:', task.id, 'TOTAL MARKS:', task.totalMarks]
  ], { origin: 'I1' });

  const fileName = `Marksheet_${task.code}_${task.gradeClass}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  return fileName;
}

export async function parseMarksheetUpload(
  arrayBuffer: ArrayBuffer,
  taskId: string
): Promise<{ entries: MarkEntry[], message: string, success: boolean }> {
  try {
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

    if (!jsonData || jsonData.length === 0) {
      return { entries: [], message: 'File is empty.', success: false };
    }

    const entries: MarkEntry[] = [];
    const now = new Date().toISOString();

    for (const row of jsonData) {
      const learnerId = row['Learner ID'];
      if (!learnerId) continue;

      let rawMarkValue = row['Raw Mark'];
      let status: MarkStatus = 'PRESENT';
      
      const statusInput = String(row['Status (PRESENT/ABSENT/MEDICAL/NHI)'] || '').toUpperCase();
      if (['PRESENT', 'ABSENT', 'MEDICAL', 'NOT_HANDED_IN'].includes(statusInput)) {
        status = statusInput as MarkStatus;
      }

      let rawMark: number | null = null;
      if (status === 'PRESENT' && rawMarkValue !== undefined && rawMarkValue !== '') {
        const parsedMark = parseFloat(rawMarkValue);
        if (!isNaN(parsedMark)) {
          rawMark = parsedMark;
        }
      }

      entries.push({
        learnerId,
        taskId,
        rawMark,
        status,
        comment: row['Comment'] || '',
        lastModified: now
      });
    }

    return { 
      entries, 
      message: `Successfully imported ${entries.length} marks.`, 
      success: true 
    };
  } catch (error: any) {
    return { entries: [], message: `Error parsing file: ${error.message}`, success: false };
  }
}
