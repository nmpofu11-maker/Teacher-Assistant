import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } from 'docx';
import saveAs from 'file-saver';
import { ATPItem, ClassInfo, LessonPlan, Worksheet, AIPromptTemplate, AssessmentTask, PreModerationForm, PostModerationForm } from '../types';
import { IEB_APPENDICES } from '../data/assessmentData';

export async function exportLessonPlanToDocx(
  classInfo: ClassInfo,
  atpItem: ATPItem,
  lessonPlan: LessonPlan
) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: `CAPS & IEB ALIGNED 45-MINUTE LESSON PLAN`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `School: `, bold: true }),
              new TextRun(`High School / Senior & FET Phase    `),
              new TextRun({ text: `Teacher: `, bold: true }),
              new TextRun(`${classInfo.teachers.join(', ')}    `),
              new TextRun({ text: `Class: `, bold: true }),
              new TextRun(`${classInfo.name}`),
            ],
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Subject: `, bold: true }),
              new TextRun(`${classInfo.subject}    `),
              new TextRun({ text: `Term: `, bold: true }),
              new TextRun(`${atpItem.term}    `),
              new TextRun({ text: `Week: `, bold: true }),
              new TextRun(`${atpItem.week}    `),
              new TextRun({ text: `Calendar Dates: `, bold: true }),
              new TextRun(`${atpItem.calendarDateRange || 'Gazetted DBE / IEB Term Window'}    `),
              new TextRun({ text: `Duration: `, bold: true }),
              new TextRun(`45 Minutes`),
            ],
            spacing: { after: 200 },
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'CAPS Topic', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [new Paragraph(atpItem.capsTopic)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Academic Calendar Pacing', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph(`Term ${atpItem.term}, Week ${atpItem.week} • ${atpItem.calendarDateRange || 'Academic Term Schedule'}`)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Requisite Knowledge', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph(atpItem.requisitePreKnowledge)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Resources & Equipment', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph(atpItem.resources.join(', '))],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { before: 200 } }),
          new Paragraph({
            text: '1. 45-MINUTE PACING & METHODOLOGY BREAKDOWN',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Phase & Time', bold: true })] })] }),
                  new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Teacher Activity', bold: true })] })] }),
                  new TableCell({ width: { size: 30, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Learner Activity', bold: true })] })] }),
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Resources', bold: true })] })] }),
                ],
              }),
              ...lessonPlan.pacingBreakdown.map(p =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${p.phase}\n(${p.duration})`, bold: true })] })] }),
                    new TableCell({ children: [new Paragraph(p.teacherActivity)] }),
                    new TableCell({ children: [new Paragraph(p.learnerActivity)] }),
                    new TableCell({ children: [new Paragraph(p.resources)] }),
                  ],
                })
              ),
            ],
          }),

          new Paragraph({ text: '', spacing: { before: 200 } }),
          new Paragraph({
            text: '2. IEB TAXONOMY & COGNITIVE LEVELS',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Level 1 (Knowing - 20-30%): ', bold: true }),
              new TextRun(lessonPlan.iebCognitiveLevels.level1_knowing),
            ],
            spacing: { after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Level 2 (Routine Procedures - 35-40%): ', bold: true }),
              new TextRun(lessonPlan.iebCognitiveLevels.level2_routine),
            ],
            spacing: { after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Level 3 (Multi-step Complex Procedures - 20%): ', bold: true }),
              new TextRun(lessonPlan.iebCognitiveLevels.level3_complex),
            ],
            spacing: { after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Level 4 (Reasoning & Problem Solving - 10-15%): ', bold: true }),
              new TextRun(lessonPlan.iebCognitiveLevels.level4_problem_solving),
            ],
            spacing: { after: 140 },
          }),

          new Paragraph({
            text: '3. DIFFERENTIATION & HOMEWORK',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 140, after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Support for Struggling Learners: ', bold: true }),
              new TextRun(lessonPlan.differentiation.support),
            ],
            spacing: { after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Extension for Advanced Learners: ', bold: true }),
              new TextRun(lessonPlan.differentiation.extension),
            ],
            spacing: { after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Informal Assessment / Exit Check: ', bold: true }),
              new TextRun(lessonPlan.informalAssessment),
            ],
            spacing: { after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Homework / SBA Task: ', bold: true }),
              new TextRun(lessonPlan.homeworkOrPATTask),
            ],
            spacing: { after: 80 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${classInfo.id}_T${atpItem.term}_W${atpItem.week}_LessonPlan.docx`;
  saveAs(blob, fileName);
  return fileName;
}

export async function exportWorksheetToDocx(
  classInfo: ClassInfo,
  atpItem: ATPItem,
  worksheet: Worksheet
) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: `${classInfo.name.toUpperCase()} - CLASSROOM WORKSHEET`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
          }),
          new Paragraph({
            text: `CAPS & IEB ALIGNED ASSESSMENT • DURATION: 45 MINUTES • TOTAL: ${worksheet.totalMarks} MARKS`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: `Learner Name: ___________________________    `, bold: true }),
              new TextRun({ text: `Date: ______________    `, bold: true }),
              new TextRun({ text: `Teacher: ${classInfo.teachers.join(', ')}`, bold: true }),
            ],
            spacing: { after: 180 },
          }),

          new Paragraph({
            text: 'INSTRUCTIONS TO LEARNERS:',
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 80 },
          }),
          ...worksheet.instructions.map(
            inst =>
              new Paragraph({
                children: [new TextRun({ text: `• ${inst}` })],
                spacing: { after: 40 },
              })
          ),

          new Paragraph({ text: '', spacing: { before: 180 } }),
          new Paragraph({
            text: 'QUESTIONS',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 120 },
          }),

          // Questions List
          ...worksheet.questions.flatMap(q => {
            const paragraphs: Paragraph[] = [];
            if (q.contextText) {
              paragraphs.push(
                new Paragraph({
                  children: [new TextRun({ text: `Context Scenario: `, bold: true }), new TextRun({ text: q.contextText, italics: true })],
                  spacing: { before: 100, after: 100 },
                })
              );
            }

            if (q.subQuestions) {
              q.subQuestions.forEach(sub => {
                paragraphs.push(
                  new Paragraph({
                    children: [
                      new TextRun({ text: `${sub.id} `, bold: true }),
                      new TextRun(sub.text),
                      new TextRun({ text: `   [${sub.marks} Marks • ${sub.cognitiveLevel}]`, bold: true, italics: true }),
                    ],
                    spacing: { before: 80, after: 60 },
                  })
                );

                // Answer lines
                const lineCount = sub.answerSpaceLines || 3;
                for (let i = 0; i < lineCount; i++) {
                  paragraphs.push(
                    new Paragraph({
                      text: '_________________________________________________________________________________',
                      spacing: { after: 40 },
                    })
                  );
                }
              });
            }
            return paragraphs;
          }),

          // Page Break / Memorandum Section
          new Paragraph({ text: '', spacing: { before: 300 } }),
          new Paragraph({
            text: 'TEACHER MEMORANDUM & MARKING GUIDELINES',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 140 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 12, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Que', bold: true })] })] }),
                  new TableCell({ width: { size: 60, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Detailed Step-by-Step Solution', bold: true })] })] }),
                  new TableCell({ width: { size: 13, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Marks', bold: true })] })] }),
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'IEB Criteria', bold: true })] })] }),
                ],
              }),
              ...worksheet.memorandum.map(
                m =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m.subId, bold: true })] })] }),
                      new TableCell({ children: [new Paragraph(m.stepByStepSolution)] }),
                      new TableCell({ children: [new Paragraph(`${m.marksAllocated} Marks`)] }),
                      new TableCell({ children: [new Paragraph(m.notes)] }),
                    ],
                  })
              ),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${classInfo.id}_T${atpItem.term}_W${atpItem.week}_Worksheet_Memo.docx`;
  saveAs(blob, fileName);
  return fileName;
}

export async function exportAIPromptsToDocx(prompts: AIPromptTemplate[]) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'THE AI TEACHING ASSISTANT: MASTER PROMPT LIBRARY',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: 'High-Impact AI Prompts for Technology (Grades 8A, 8B, 9A, 9B), Maths Literacy (Grades 10, 11, 12), and AS1 Business Studies',
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          ...prompts.flatMap(p => [
            new Paragraph({
              text: `${p.title} [${p.category}]`,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 80 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Target: ', bold: true }),
                new TextRun(`${p.targetSubject} (${p.targetGrade})   |   `),
                new TextRun({ text: 'Tags: ', bold: true }),
                new TextRun(p.tags.join(', ')),
              ],
              spacing: { after: 80 },
            }),
            new Paragraph({
              children: [new TextRun({ text: p.description, italics: true })],
              spacing: { after: 100 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph(p.promptText)],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph({ text: '', spacing: { after: 100 } }),
          ]),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `AI_Teaching_Assistant_Prompts_Library.docx`;
  saveAs(blob, fileName);
  return fileName;
}

export async function exportAssessmentTaskToDocx(
  classInfo: ClassInfo,
  task: AssessmentTask
) {
  const isIEB = task.curriculumStandard.includes('IEB');
  
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: isIEB 
              ? `NATIONAL SENIOR CERTIFICATE (IEB) — ASSESSMENT TASK`
              : `CAPS FORMAL ASSESSMENT TASK`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          new Paragraph({
            text: task.title,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 20, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Subject / Class', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    children: [new Paragraph(`${task.subject} (${classInfo.name})`)],
                  }),
                  new TableCell({
                    width: { size: 20, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Term / Week', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    children: [new Paragraph(`Term ${task.term}, Week ${task.scheduledWeek} (${task.targetDate})`)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Standard', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph(task.curriculumStandard)],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Task Type / Marks', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph(`${task.category} | ${task.totalMarks} Marks (${task.duration})`)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'SBA Weighting', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph(`${task.sbaWeightingPercentage}% (${task.sbaContributionMarks} marks towards SBA)`)],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Teacher / Assessor', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph(classInfo.teachers.join(', '))],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 120 } }),

          // Student Details Block
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'Candidate Name & Surname: ___________________________', bold: true })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'Examination / Student ID: ___________________________', bold: true })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Cognitive Level Breakdown
          new Paragraph({
            text: '1. COGNITIVE LEVEL DISTRIBUTION (BLOOM’S TAXONOMY WEIGHTING)',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 100, after: 80 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Level 1: Knowing', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Level 2: Routine', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Level 3: Multi-step', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Level 4: Reasoning', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(`${task.cognitiveWeighting.level1_knowing}%`)] }),
                  new TableCell({ children: [new Paragraph(`${task.cognitiveWeighting.level2_routine}%`)] }),
                  new TableCell({ children: [new Paragraph(`${task.cognitiveWeighting.level3_complex}%`)] }),
                  new TableCell({ children: [new Paragraph(`${task.cognitiveWeighting.level4_reasoning}%`)] }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Instructions
          new Paragraph({
            text: '2. INSTRUCTIONS AND INFORMATION',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 100, after: 80 },
          }),
          ...task.instructions.map(
            (inst, idx) =>
              new Paragraph({
                text: `${idx + 1}. ${inst}`,
                spacing: { after: 60 },
              })
          ),

          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Scenario / Context
          new Paragraph({
            text: '3. BACKGROUND SCENARIO & STIMULUS CONTEXT',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 100, after: 80 },
          }),
          new Paragraph({
            text: task.scenarioOrBrief,
            spacing: { after: 150 },
          }),

          // Questions
          new Paragraph({
            text: '4. QUESTIONS & ASSESSMENT TASKS',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 120, after: 100 },
          }),
          ...task.questions.map(q => [
            new Paragraph({
              children: [
                new TextRun({ text: `${q.id}. ${q.title} `, bold: true }),
                new TextRun({ text: `[${q.marks} Marks] (${q.cognitiveLevel})`, italics: true }),
              ],
              spacing: { before: 120, after: 60 },
            }),
            new Paragraph({
              text: q.description,
              spacing: { after: 60 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Marking Guideline: ', bold: true, italics: true }),
                new TextRun({ text: q.markingCriteriaSnippet, italics: true }),
              ],
              spacing: { after: 140 },
            }),
          ]).flat(),

          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Marking Rubric Summary
          new Paragraph({
            text: '5. MEMORANDUM & MODERATION GUIDELINES',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 120, after: 80 },
          }),
          new Paragraph({
            text: task.markingRubricOrMemo,
            spacing: { after: 150 },
          }),

          // If IEB, include Appendix G template
          ...(isIEB
            ? [
                new Paragraph({
                  text: 'APPENDIX G: LEARNER DECLARATION — USE OF AI IN ASSESSMENT TASKS',
                  heading: HeadingLevel.HEADING_2,
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 200, after: 100 },
                }),
                new Paragraph({
                  text: 'I confirm that this task is my own original work. Any use of AI tools (ChatGPT, Claude, grammar check, simulation apps) has been transparently recorded below.',
                  spacing: { after: 120 },
                }),
                new Table({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Section of Task', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'AI Tool Used', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Purpose of Use', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Extent (Light/Mod/Ext)', bold: true })] })] }),
                        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Candidate’s Contribution', bold: true })] })] }),
                      ],
                    }),
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph('e.g. Research / Drafting')] }),
                        new TableCell({ children: [new Paragraph('e.g. AI Assistant')] }),
                        new TableCell({ children: [new Paragraph('e.g. Data verification')] }),
                        new TableCell({ children: [new Paragraph('Moderate')] }),
                        new TableCell({ children: [new Paragraph('Wrote full analysis & calculations')] }),
                      ],
                    }),
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph('\n\n')] }),
                        new TableCell({ children: [new Paragraph('')] }),
                        new TableCell({ children: [new Paragraph('')] }),
                        new TableCell({ children: [new Paragraph('')] }),
                        new TableCell({ children: [new Paragraph('')] }),
                      ],
                    }),
                  ],
                }),
                new Paragraph({
                  text: 'Candidate Signature: _______________________      Date: _______________',
                  spacing: { before: 150, after: 100 },
                }),
              ]
            : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeTitle = task.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
  const fileName = `${task.code}_${safeTitle}.docx`;
  saveAs(blob, fileName);
  return fileName;
}

export async function exportIEBModerationPortfolioToDocx(grade: number = 12) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: `INDEPENDENT EXAMINATIONS BOARD (IEB)`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: `MATHEMATICAL LITERACY GRADE ${grade} — SBA MODERATION DOSSIER & FORMS`,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Compiled in strict accordance with the IEB Subject Assessment Guidelines (Updated June 2025 / 2026 Implementation).`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          ...IEB_APPENDICES.map(app => [
            new Paragraph({
              text: `APPENDIX ${app.appendixId}: ${app.title}`,
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 200, after: 60 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Purpose: ', bold: true }),
                new TextRun(app.purpose),
              ],
              spacing: { after: 60 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Description: ', bold: true }),
                new TextRun(app.description),
              ],
              spacing: { after: 120 },
            }),
            new Paragraph({
              text: '----------------------------------------------------------------------------------------',
              spacing: { after: 120 },
            }),
          ]).flat(),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `IEB_MathLit_Grade${grade}_SBA_Moderation_Appendices.docx`;
  saveAs(blob, fileName);
  return fileName;
}

export async function exportPreModerationToDocx(
  task: AssessmentTask,
  form: PreModerationForm
) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: `FORMAL PRE-ADMINISTRATION MODERATION REPORT`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: `${task.subject} — Grade ${task.grade} (${task.code})`,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 },
          }),
          new Paragraph({
            text: `Official Window: ${form.officialAcceptableWindow} | Moderation Date: ${form.moderationDate}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Task Title:', bold: true })] })] }),
                  new TableCell({ width: { size: 75, type: WidthType.PERCENTAGE }, children: [new Paragraph(task.title)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Standard & Term:', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(`${task.curriculumStandard} | Term ${task.term}, Week ${task.scheduledWeek}`)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Total Marks & Time:', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(`${task.totalMarks} Marks | ${task.duration}`)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Moderator & SACE:', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(`${form.moderatorName} (${form.moderatorRole}) | ${form.saceNumber || 'Verified'}`)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Approval Status:', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(form.status.replace(/_/g, ' '))] }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Moderation Criteria Checklist Table
          new Paragraph({
            text: 'QUALITY ASSURANCE & MODERATION CRITERIA',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 150, after: 100 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 30, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Criterion Checked', bold: true })] })] }),
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Status', bold: true })] })] }),
                  new TableCell({ width: { size: 55, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Moderator Findings & Annotations', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('1. Technical Layout & Instructions')] }),
                  new TableCell({ children: [new Paragraph(form.checks.technicalLayout.passed ? 'COMPLIANT' : 'NEEDS ACTION')] }),
                  new TableCell({ children: [new Paragraph(form.checks.technicalLayout.comment)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('2. CAPS / IEB Curriculum Alignment')] }),
                  new TableCell({ children: [new Paragraph(form.checks.curriculumAlignment.passed ? 'COMPLIANT' : 'NEEDS ACTION')] }),
                  new TableCell({ children: [new Paragraph(form.checks.curriculumAlignment.comment)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('3. Bloom’s Cognitive Taxonomy Weighting')] }),
                  new TableCell({ children: [new Paragraph(form.checks.cognitiveDistribution.passed ? 'COMPLIANT' : 'NEEDS ACTION')] }),
                  new TableCell({ children: [new Paragraph(form.checks.cognitiveDistribution.comment)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('4. Marking Memorandum & Solutions')] }),
                  new TableCell({ children: [new Paragraph(form.checks.markingMemoClarity.passed ? 'COMPLIANT' : 'NEEDS ACTION')] }),
                  new TableCell({ children: [new Paragraph(form.checks.markingMemoClarity.comment)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('5. Language Accessibility & Bias-Free')] }),
                  new TableCell({ children: [new Paragraph(form.checks.languageAndFairness.passed ? 'COMPLIANT' : 'NEEDS ACTION')] }),
                  new TableCell({ children: [new Paragraph(form.checks.languageAndFairness.comment)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('6. AI Integrity & Appendix G Declaration')] }),
                  new TableCell({ children: [new Paragraph(form.checks.aiAcademicIntegrity.passed ? 'COMPLIANT' : 'NEEDS ACTION')] }),
                  new TableCell({ children: [new Paragraph(form.checks.aiAcademicIntegrity.comment)] }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Overall Comments & Recommendations
          new Paragraph({
            text: 'OVERALL MODERATOR RECOMMENDATIONS & SIGN-OFF',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 150, after: 80 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Overall Finding: ', bold: true }),
              new TextRun(form.overallComments),
            ],
            spacing: { after: 80 },
          }),
          ...form.recommendations.map(r => new Paragraph({
            children: [new TextRun({ text: `• ${r}` })],
            spacing: { after: 40 },
          })),

          new Paragraph({ text: '', spacing: { after: 200 } }),
          new Paragraph({
            children: [
              new TextRun({ text: `Moderator Digital Signature: [SIGNED - ${form.moderatorName}]   |   Date: ${form.moderationDate}`, bold: true }),
            ],
            spacing: { before: 100, after: 60 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${task.code}_Pre_Moderation_Report.docx`;
  saveAs(blob, fileName);
  return fileName;
}

export async function exportPostModerationToDocx(
  task: AssessmentTask,
  form: PostModerationForm
) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: `FORMAL POST-ADMINISTRATION MODERATION REPORT`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: `${task.subject} — Grade ${task.grade} (${task.code})`,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 },
          }),
          new Paragraph({
            text: `Official Window: ${form.officialAcceptableWindow} | Sample Audited: ${form.sampleSize} Scripts (10% representative)`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Task Title:', bold: true })] })] }),
                  new TableCell({ width: { size: 75, type: WidthType.PERCENTAGE }, children: [new Paragraph(task.title)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Moderator & Role:', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(`${form.moderatorName} (${form.moderatorRole}) | SACE: ${form.saceNumber || 'Verified'}`)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Moderation Date:', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(form.moderationDate)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Mark Adjustment:', bold: true })] })] }),
                  new TableCell({ children: [new Paragraph(form.markAdjustmentSuggested ? `Adjustment: ${form.adjustmentDetails}` : 'Original Teacher Marks Upheld (100% Consistent)')] }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Sample Audit Details
          new Paragraph({
            text: 'MODERATED SCRIPT SAMPLE BREAKDOWN',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 120, after: 80 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 33, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Top Performers (Sample)', bold: true })] })] }),
                  new TableCell({ width: { size: 33, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Middle Performers (Sample)', bold: true })] })] }),
                  new TableCell({ width: { size: 34, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Bottom Performers (Sample)', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: form.sampleBreakdown.topLearners.map(l => new Paragraph(l)) }),
                  new TableCell({ children: form.sampleBreakdown.middleLearners.map(l => new Paragraph(l)) }),
                  new TableCell({ children: form.sampleBreakdown.bottomLearners.map(l => new Paragraph(l)) }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Post-Moderation Checks
          new Paragraph({
            text: 'POST-MODERATION AUDIT FINDINGS',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 120, after: 80 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 30, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Audit Dimension', bold: true })] })] }),
                  new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Status', bold: true })] })] }),
                  new TableCell({ width: { size: 55, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: 'Moderator Findings', bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('1. Marking Consistency')] }),
                  new TableCell({ children: [new Paragraph(form.checks.markingConsistency.passed ? 'VERIFIED' : 'VARIANCE')] }),
                  new TableCell({ children: [new Paragraph(form.checks.markingConsistency.comment)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('2. Arithmetic Accuracy')] }),
                  new TableCell({ children: [new Paragraph(form.checks.arithmeticAccuracy.passed ? 'VERIFIED' : 'VARIANCE')] }),
                  new TableCell({ children: [new Paragraph(form.checks.arithmeticAccuracy.comment)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('3. Learner Feedback')] }),
                  new TableCell({ children: [new Paragraph(form.checks.formativeFeedback.passed ? 'VERIFIED' : 'VARIANCE')] }),
                  new TableCell({ children: [new Paragraph(form.checks.formativeFeedback.comment)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('4. Mark Schedule Transfer')] }),
                  new TableCell({ children: [new Paragraph(form.checks.markTransferAccuracy.passed ? 'VERIFIED' : 'VARIANCE')] }),
                  new TableCell({ children: [new Paragraph(form.checks.markTransferAccuracy.comment)] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph('5. Appendix G AI Declaration Audit')] }),
                  new TableCell({ children: [new Paragraph(form.checks.aiUseAudit.passed ? 'VERIFIED' : 'VARIANCE')] }),
                  new TableCell({ children: [new Paragraph(form.checks.aiUseAudit.comment)] }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 150 } }),

          // Misconceptions and Remediation
          new Paragraph({
            text: 'DIAGNOSTIC ANALYSIS & REMEDIATION DIRECTIVES',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 120, after: 80 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Common Learner Misconceptions Identified:', bold: true })],
            spacing: { after: 40 },
          }),
          ...form.commonLearnerMisconceptions.map(m => new Paragraph({ children: [new TextRun(`• ${m}`)], spacing: { after: 40 } })),

          new Paragraph({
            children: [new TextRun({ text: 'Recommendations for Remediation & Post-Assessment Teaching:', bold: true })],
            spacing: { before: 80, after: 40 },
          }),
          ...form.recommendationsForRemediation.map(r => new Paragraph({ children: [new TextRun(`• ${r}`)], spacing: { after: 40 } })),

          new Paragraph({ text: '', spacing: { after: 200 } }),
          new Paragraph({
            children: [
              new TextRun({ text: `Moderator Digital Signature: [SIGNED - ${form.moderatorName}]   |   Date: ${form.moderationDate}`, bold: true }),
            ],
            spacing: { before: 100, after: 60 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${task.code}_Post_Moderation_Report.docx`;
  saveAs(blob, fileName);
  return fileName;
}
