import React, { useState } from 'react';
import { 
  FileCheck, 
  Download, 
  Eye, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Award,
  HelpCircle
} from 'lucide-react';
import { GradeClass, Worksheet, WorksheetQuestion } from '../types';
import { CLASSES_CONFIG } from '../data/atpData';
import { getATPForClassAndWeek } from '../utils/excelHandler';
import { exportWorksheetToDocx } from '../utils/docxGenerator';

interface WorksheetViewerProps {
  initialClassId: GradeClass;
  initialTerm: number;
  initialWeek: number;
  onAskAIChat: (prompt: string) => void;
}

export const WorksheetViewer: React.FC<WorksheetViewerProps> = ({
  initialClassId,
  initialTerm,
  initialWeek,
  onAskAIChat,
}) => {
  const [selectedClassId, setSelectedClassId] = useState<GradeClass>(initialClassId);
  const [selectedTerm, setSelectedTerm] = useState<number>(initialTerm);
  const [selectedWeek, setSelectedWeek] = useState<number>(initialWeek);
  const [showMemo, setShowMemo] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const classInfo = CLASSES_CONFIG[selectedClassId] || CLASSES_CONFIG['8A'];
  const currentATP = getATPForClassAndWeek(selectedClassId, selectedTerm, selectedWeek) || {
    id: 'generic',
    subject: classInfo.subject,
    grade: classInfo.grade,
    term: selectedTerm,
    week: selectedWeek,
    capsTopic: `${classInfo.subject} Core Assessment`,
    coreConcepts: ['Core Principle Review', 'Calculation', 'Analysis'],
    requisitePreKnowledge: 'Prior fundamentals',
    resources: ['Calculator', 'Workbook'],
  };

  const isTech = classInfo.subject === 'Technology';
  const isMathLit = classInfo.subject === 'Mathematical Literacy';

  // Construct structured 4-tier CAPS & IEB Worksheet
  const worksheetData: Worksheet = {
    id: `ws-${selectedClassId}-t${selectedTerm}-w${selectedWeek}`,
    lessonPlanId: `plan-${selectedClassId}`,
    title: `${classInfo.name}: ${currentATP.capsTopic}`,
    subject: classInfo.subject,
    grade: classInfo.grade,
    term: selectedTerm,
    week: selectedWeek,
    totalMarks: 25,
    estimatedMinutes: 45,
    instructions: [
      'Answer all questions in the spaces provided.',
      'Show all calculation working, unit conversions, and formula substitutions.',
      'Round final monetary answers to 2 decimal places and dimensions to 1 decimal place unless specified.',
      'Non-programmable scientific calculators and drawing instruments may be used.',
    ],
    questions: [
      {
        questionNumber: 1,
        contextText: isTech
          ? `A local community needs a mechanical lifting crane to load water purification tanks onto trucks. Study the system specifications before answering.`
          : isMathLit
          ? `Mpho is analyzing her monthly household budget, electricity consumption rates, and tax contributions under current South African municipal brackets.`
          : `Apex Retailers is evaluating a new product line expansion and evaluating marketing distribution channels.`,
        subQuestions: [
          {
            id: '1.1',
            text: isTech
              ? `State the primary function of a mechanical advantage system and identify whether a lever of the second class multiplies force or distance.`
              : isMathLit
              ? `Define the term "Tariff" and state the standard South African Value Added Tax (VAT) rate.`
              : `Define the term "Target Market" and state one primary research method.`,
            marks: 3,
            cognitiveLevel: 'Level 1: Knowing (20%)',
            answerSpaceLines: 3,
          },
          {
            id: '1.2',
            text: isTech
              ? `Calculate the Mechanical Advantage (MA) if a load of 450 N is lifted by an effort force of 150 N. State the formula clearly.`
              : isMathLit
              ? `Mpho's basic monthly taxable income is R24,500. Calculate her total annual taxable income before allowable deductions.`
              : `Calculate the total revenue if 850 units are sold at R120 per unit.`,
            marks: 4,
            cognitiveLevel: 'Level 2: Routine Procedure (35%)',
            answerSpaceLines: 4,
          },
          {
            id: '1.3',
            text: isTech
              ? `Draw a neat free-hand 2D diagram of the gear train showing a driver gear (20 teeth) meshed with an idler gear (10 teeth) and a driven gear (40 teeth). Indicate the direction of rotation with arrows.`
              : isMathLit
              ? `Using the stepped electricity tariff table (Block 1: 0-50 kWh @ R1.85/kWh; Block 2: 51-350 kWh @ R2.45/kWh), calculate the total cost for 280 kWh including 15% VAT.`
              : `Analyze the break-even point given Fixed Costs of R45,000, Selling Price R150, and Variable Cost R90 per unit.`,
            marks: 8,
            cognitiveLevel: 'Level 3: Complex Multi-Step Procedure (25%)',
            answerSpaceLines: 6,
          },
          {
            id: '1.4',
            text: isTech
              ? `Critique the choice of using mild steel vs recycled PVC plastic for the crane boom in terms of tensile strength, corrosion resistance, and cost efficiency in a coastal town.`
              : isMathLit
              ? `Advise Mpho on whether switching to prepaid solar metering is financially advantageous over a 3-year period if the initial installation costs R38,000 with an average monthly saving of R1,250. Provide full mathematical justification.`
              : `Recommend whether the business should implement price skimming or penetration pricing with strategic justification.`,
            marks: 10,
            cognitiveLevel: 'Level 4: Reasoning & Problem Solving (20%)',
            answerSpaceLines: 7,
          },
        ],
      },
    ],
    memorandum: [
      {
        questionNumber: 1,
        subId: '1.1',
        stepByStepSolution: isTech
          ? `Mechanical Advantage enables a small effort force to move a larger load (Force multiplier) ✓. A second-class lever has the load between fulcrum and effort, therefore it multiplies force (MA > 1) ✓✓.`
          : isMathLit
          ? `Tariff: A scale of charges or rate schedule for municipal services (electricity, water, sanitation) ✓. Standard SA VAT rate = 15% ✓✓.`
          : `Target Market: A specific group of consumers at whom products/services are aimed ✓. Primary research method: Surveys / Interviews ✓✓.`,
        marksAllocated: 3,
        notes: '1 Mark for concept definition, 2 Marks for accurate property identification.',
      },
      {
        questionNumber: 1,
        subId: '1.2',
        stepByStepSolution: isTech
          ? `Formula: MA = Load ÷ Effort ✓\nMA = 450 N ÷ 150 N ✓\nMA = 3 (Ratio, no units) ✓✓`
          : isMathLit
          ? `Annual Taxable Income = R24,500 × 12 months ✓\n= R294,000 per annum ✓✓✓`
          : `Total Revenue = 850 × R120 = R102,000 ✓✓✓`,
        marksAllocated: 4,
        notes: 'M1 Method mark for formula substitution, A1 Accuracy mark for final value.',
      },
      {
        questionNumber: 1,
        subId: '1.3',
        stepByStepSolution: isTech
          ? `Accurate schematic drawing showing 3 meshed gears ✓✓. Correct tooth ratio / size representation ✓✓. Driver clockwise -> Idler anti-clockwise -> Driven clockwise arrows correctly indicated ✓✓✓✓.`
          : isMathLit
          ? `Block 1 (50 kWh): 50 × R1.85 = R92.50 ✓\nBlock 2 (280 - 50 = 230 kWh): 230 × R2.45 = R563.50 ✓\nSubtotal = R92.50 + R563.50 = R656.00 ✓✓\nVAT (15%) = R656.00 × 0.15 = R98.40 ✓\nTotal Cost = R656.00 + R98.40 = R754.40 ✓✓✓`
          : `Contribution = R150 - R90 = R60 ✓. BEP Units = R45,000 ÷ R60 = 750 units ✓✓✓✓.`,
        marksAllocated: 8,
        notes: 'Full continuous accuracy (CA) applied if arithmetic slip occurs in Block 2.',
      },
      {
        questionNumber: 1,
        subId: '1.4',
        stepByStepSolution: isTech
          ? `Mild Steel advantages: High tensile & compressive strength, withstands 450N bending moments without buckling ✓✓. Disadvantage: Requires galvanizing or epoxy paint against coastal salt corrosion ✓✓. PVC comparison: Highly corrosion resistant and lightweight, but lacks structural stiffness and degrades under UV exposure ✓✓. Conclusion: Mild steel with zinc coating is the technically sound choice ✓✓✓✓.`
          : isMathLit
          ? `Total Savings over 3 years (36 months) = 36 × R1,250 = R45,000 ✓✓✓\nNet Financial Benefit = R45,000 (Savings) - R38,000 (Cost) = +R7,000 profit ✓✓✓\nPayback Period = R38,000 ÷ R1,250 = 30.4 months (~2.5 years) ✓✓\nRecommendation: Yes, highly advantageous as it pays for itself in 30.4 months and saves R7,000 within 3 years, shielding the household from future tariff hikes ✓✓.`
          : `Penetration pricing rationale: Attracts rapid volume ✓✓✓. Financial tradeoff analysis ✓✓✓. Strategic recommendation justified ✓✓✓✓.`,
        marksAllocated: 10,
        notes: 'IEB Level 4 Criteria: 4 Marks for calculation, 4 Marks for context comparison, 2 Marks for well-reasoned conclusion.',
      },
    ],
  };

  const handleDownloadDocx = async () => {
    setIsExporting(true);
    try {
      await exportWorksheetToDocx(classInfo, currentATP, worksheetData);
    } catch (err) {
      console.error('Failed to export worksheet docx:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Classroom Worksheet & Memorandum Generator
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Generates printable 45-minute lesson worksheets with full IEB 4-level mark schemes, rubrics, and Word (.docx) export.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="toggle-memo-btn"
              onClick={() => setShowMemo(prev => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                showMemo
                  ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{showMemo ? 'Hide Memo & Solutions' : 'Show Teacher Memo'}</span>
            </button>

            <button
              id="download-worksheet-docx-btn"
              onClick={handleDownloadDocx}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating...' : 'Download Word (.docx)'}</span>
            </button>
          </div>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Target Class:</label>
            <select
              id="ws-class-select"
              value={selectedClassId}
              onChange={e => setSelectedClassId(e.target.value as GradeClass)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Term:</label>
            <select
              id="ws-term-select"
              value={selectedTerm}
              onChange={e => setSelectedTerm(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value={1}>Term 1</option>
              <option value={2}>Term 2</option>
              <option value={3}>Term 3</option>
              <option value={4}>Term 4</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">Week:</label>
            <select
              id="ws-week-select"
              value={selectedWeek}
              onChange={e => setSelectedWeek(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
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

      {/* Printable Worksheet Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Worksheet Exam Header */}
        <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
          <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Republic of South Africa • CAPS & IEB Assessment
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">
            {classInfo.name} — {currentATP.capsTopic}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700 pt-1">
            <span>Duration: 45 Minutes</span>
            <span>•</span>
            <span>Total: {worksheetData.totalMarks} Marks</span>
            <span>•</span>
            <span>Term {selectedTerm} Week {selectedWeek}</span>
          </div>
        </div>

        {/* Learner Info Line */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-medium text-slate-700">
          <div>Learner Name: ___________________________</div>
          <div>Date: __________________</div>
          <div>Teacher: {classInfo.teachers.join(', ')}</div>
        </div>

        {/* Instructions */}
        <div className="text-xs bg-slate-100/70 p-4 rounded-xl border border-slate-200 space-y-1">
          <span className="font-bold text-slate-900 block">INSTRUCTIONS TO LEARNERS:</span>
          <ul className="list-disc list-inside space-y-0.5 text-slate-700">
            {worksheetData.instructions.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
          </ul>
        </div>

        {/* Questions Section */}
        <div className="space-y-6 pt-2">
          {worksheetData.questions.map(q => (
            <div key={q.questionNumber} className="space-y-4">
              {q.contextText && (
                <div className="p-3.5 bg-sky-50/70 border-l-4 border-sky-600 text-xs text-sky-950 rounded-r-xl italic leading-relaxed">
                  <span className="font-bold not-italic text-sky-900 block mb-0.5">Scenario / Context:</span>
                  {q.contextText}
                </div>
              )}

              <div className="space-y-6">
                {q.subQuestions?.map(sub => (
                  <div key={sub.id} className="space-y-2">
                    <div className="flex items-start justify-between gap-3 text-xs">
                      <div className="font-bold text-slate-900 leading-snug">
                        <span className="text-indigo-600 mr-1.5">{sub.id}</span>
                        {sub.text}
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          [{sub.marks} Marks]
                        </span>
                        <div className="text-[10px] text-slate-500 italic mt-0.5">
                          {sub.cognitiveLevel}
                        </div>
                      </div>
                    </div>

                    {/* Answer Lines for Learner */}
                    <div className="space-y-2 pt-1">
                      {Array.from({ length: sub.answerSpaceLines || 3 }).map((_, lineIdx) => (
                        <div
                          key={lineIdx}
                          className="w-full border-b border-dashed border-slate-300 h-4"
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Teacher Memorandum & Marking Scheme (Toggleable) */}
        {showMemo && (
          <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-300 space-y-4 bg-amber-50/40 p-6 rounded-2xl border">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-700" />
              <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
                Teacher Memorandum & Step-by-Step Marking Guideline
              </h4>
            </div>
            <p className="text-xs text-amber-800">
              Includes full method marks (M), accuracy marks (A), and continuous accuracy (CA) as required by IEB past paper moderation.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-amber-200 rounded-xl bg-white overflow-hidden">
                <thead className="bg-amber-100/70 text-amber-900 font-bold border-b border-amber-200">
                  <tr>
                    <th className="py-2.5 px-3 text-left w-16">Que</th>
                    <th className="py-2.5 px-3 text-left">Detailed Worked Solution & Mark Allocation</th>
                    <th className="py-2.5 px-3 text-left w-20">Marks</th>
                    <th className="py-2.5 px-3 text-left w-36">IEB Criteria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {worksheetData.memorandum.map((m, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/30">
                      <td className="py-3 px-3 font-bold text-amber-950 align-top">{m.subId}</td>
                      <td className="py-3 px-3 text-slate-800 whitespace-pre-line leading-relaxed align-top">
                        {m.stepByStepSolution}
                      </td>
                      <td className="py-3 px-3 font-bold text-amber-900 align-top">{m.marksAllocated} M</td>
                      <td className="py-3 px-3 text-slate-600 text-[11px] align-top">{m.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
