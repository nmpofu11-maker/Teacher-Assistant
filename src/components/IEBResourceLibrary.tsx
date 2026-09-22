import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Award, 
  Clock, 
  FileCheck, 
  ChevronRight, 
  X, 
  Lightbulb, 
  HelpCircle, 
  Copy, 
  ArrowRight,
  TrendingUp,
  Bookmark,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IEBResource, IEBResourceType, Subject, GradeClass } from '../types';
import { IEB_RESOURCES_DATA } from '../data/iebResourcesData';

interface IEBResourceLibraryProps {
  onPlanLessonForResource?: (resource: IEBResource) => void;
  onGenerateWorksheetForResource?: (resource: IEBResource) => void;
  onAskAIAboutResource?: (prompt: string) => void;
}

export const IEBResourceLibrary: React.FC<IEBResourceLibraryProps> = ({
  onPlanLessonForResource,
  onGenerateWorksheetForResource,
  onAskAIAboutResource,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [activeModalResource, setActiveModalResource] = useState<IEBResource | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'questions' | 'examiner' | 'memo'>('questions');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered list
  const filteredResources = useMemo(() => {
    return IEB_RESOURCES_DATA.filter(res => {
      const matchSubject = selectedSubject === 'ALL' || res.subject === selectedSubject;
      const matchGrade = selectedGrade === 'ALL' || String(res.grade) === selectedGrade;
      const matchType = selectedType === 'ALL' || res.resourceType === selectedType;
      const matchYear = selectedYear === 'ALL' || String(res.year) === selectedYear;

      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        res.title.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.capsTopicsCovered.some(t => t.toLowerCase().includes(q)) ||
        (res.keyHighlights && res.keyHighlights.some(h => h.toLowerCase().includes(q)));

      return matchSubject && matchGrade && matchType && matchYear;
    });
  }, [searchQuery, selectedSubject, selectedGrade, selectedType, selectedYear]);

  // Statistics
  const totalMarksCount = useMemo(() => {
    return filteredResources.reduce((acc, r) => acc + (r.totalMarks || 0), 0);
  }, [filteredResources]);

  const totalInsightsCount = useMemo(() => {
    return filteredResources.reduce((acc, r) => acc + (r.examinerInsights?.length || 0), 0);
  }, [filteredResources]);

  const handleCopyQuestion = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenDetailModal = (resource: IEBResource, initialTab: 'overview' | 'questions' | 'examiner' | 'memo' = 'questions') => {
    setActiveModalResource(resource);
    setModalTab(initialTab);
  };

  const handleDownloadResourceBrief = (resource: IEBResource) => {
    const textContent = `=====================================================
${resource.title.toUpperCase()}
Subject: ${resource.subject} | Grade: ${resource.grade} | Year: ${resource.year}
Resource Type: ${resource.resourceType} | Paper: ${resource.paperType}
Total Marks: ${resource.totalMarks} | Time: ${resource.timeAllocationMinutes} mins
=====================================================

DESCRIPTION:
${resource.description}

CAPS & IEB TOPICS COVERED:
${resource.capsTopicsCovered.map(t => `- ${t}`).join('\n')}

KEY HIGHLIGHTS & ASSESSMENT CRITERIA:
${resource.keyHighlights.map(h => `* ${h}`).join('\n')}

${resource.examinerInsights && resource.examinerInsights.length > 0 ? `
EXAMINER REPORT & CANDIDATE MISCONCEPTIONS:
${resource.examinerInsights.map(ins => `
--- TOPIC: ${ins.topic} (Performance: ${ins.overallPerformance}) ---
Average Score: ${ins.averageScorePercentage || 'N/A'}%
Common Errors:
${ins.commonErrors.map(e => `  ! ${e}`).join('\n')}
Examiner Recommendations:
${ins.examinerTips.map(tip => `  > ${tip}`).join('\n')}
`).join('\n')}` : ''}

${resource.sampleQuestions && resource.sampleQuestions.length > 0 ? `
EXAM QUESTIONS & MARKING GUIDELINES:
${resource.sampleQuestions.map(q => `
[${q.questionNumber}] Context: ${q.context} (${q.cognitiveLevel}, ${q.marks} Marks)
${q.subQuestions.map(sq => `  (${sq.number}) ${sq.text} [${sq.marks} Marks]
    Answer Guide: ${sq.answerGuide}
    Marks Allocation: ${sq.markBreakdown}
    ${sq.commonPitfall ? `Common Pitfall: ${sq.commonPitfall}` : ''}`).join('\n\n')}`).join('\n')}` : ''}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.id}-IEB-Resource-Pack.txt`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-indigo-50/70 to-transparent pointer-events-none -mr-20 -mt-20"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5 text-indigo-100" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                IEB Resource Library & Examination Archive
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Access standardized past examination papers, examiner diagnostic reports, and full marking guidelines categorized by Grade (8–12) and Subject. Inject authentic IEB examination questions and address real candidate misconceptions directly in your 45-minute lesson plans.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center min-w-[95px]">
              <span className="text-xs text-slate-400 font-medium block">Resources</span>
              <span className="text-xl font-bold text-slate-800">{filteredResources.length}</span>
            </div>
            <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-3.5 text-center min-w-[95px]">
              <span className="text-xs text-indigo-500 font-medium block">Total Marks</span>
              <span className="text-xl font-bold text-indigo-700">{totalMarksCount}</span>
            </div>
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-3.5 text-center min-w-[95px]">
              <span className="text-xs text-amber-600 font-medium block">Examiner Tips</span>
              <span className="text-xl font-bold text-amber-700">{totalInsightsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topic, question, tax, gears, tariffs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Subject Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="ALL">All Subjects</option>
              <option value="Mathematical Literacy">Mathematical Literacy (Gr 10–12)</option>
              <option value="Technology">Technology (Gr 8 & 9)</option>
            </select>
          </div>

          {/* Grade Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="ALL">All Grades</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12 (Matric)</option>
            </select>
          </div>

          {/* Resource Type Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="ALL">All Resource Types</option>
              <option value="Past Exam Paper">Past Exam Papers</option>
              <option value="Marking Guideline">Marking Guidelines & Memos</option>
              <option value="Examiner Report">Examiner Diagnostic Reports</option>
              <option value="Exemplar Assessment">Exemplar Assessments</option>
              <option value="PAT & Practical Guide">PAT & Design Portfolios</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Pill Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium text-[11px] mr-1">Quick Filters:</span>
          
          <button
            onClick={() => { setSelectedSubject('Mathematical Literacy'); setSelectedGrade('12'); setSelectedType('ALL'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedSubject === 'Mathematical Literacy' && selectedGrade === '12'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Matric MathLit (Gr 12)
          </button>

          <button
            onClick={() => { setSelectedSubject('Mathematical Literacy'); setSelectedGrade('11'); setSelectedType('ALL'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedSubject === 'Mathematical Literacy' && selectedGrade === '11'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Grade 11 MathLit
          </button>

          <button
            onClick={() => { setSelectedSubject('Mathematical Literacy'); setSelectedGrade('10'); setSelectedType('ALL'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedSubject === 'Mathematical Literacy' && selectedGrade === '10'
                ? 'bg-sky-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Grade 10 MathLit
          </button>

          <button
            onClick={() => { setSelectedSubject('Technology'); setSelectedGrade('9'); setSelectedType('ALL'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedSubject === 'Technology' && selectedGrade === '9'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Grade 9 Tech
          </button>

          <button
            onClick={() => { setSelectedSubject('Technology'); setSelectedGrade('8'); setSelectedType('ALL'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedSubject === 'Technology' && selectedGrade === '8'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Grade 8 Tech
          </button>

          <button
            onClick={() => { setSelectedType('Examiner Report'); }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              selectedType === 'Examiner Report'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            🔥 Examiner Misconception Reports
          </button>

          {(selectedSubject !== 'ALL' || selectedGrade !== 'ALL' || selectedType !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSubject('ALL');
                setSelectedGrade('ALL');
                setSelectedType('ALL');
                setSelectedYear('ALL');
                setSearchQuery('');
              }}
              className="ml-auto text-[11px] font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Resource Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredResources.map(resource => {
          const isTech = resource.subject === 'Technology';
          const isGrade12 = String(resource.grade) === '12';

          return (
            <div
              key={resource.id}
              className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Header Tags */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 font-bold rounded-lg ${
                        isTech
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isGrade12
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                          : 'bg-sky-100 text-sky-800 border border-sky-300'
                      }`}
                    >
                      {resource.subject} • Grade {resource.grade}
                    </span>

                    <span className="text-xs px-2.5 py-1 font-medium rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {resource.session} ({resource.year})
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      resource.resourceType === 'Examiner Report'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : resource.resourceType === 'Past Exam Paper'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-purple-50 text-purple-800 border border-purple-200'
                    }`}
                  >
                    {resource.resourceType}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug tracking-tight">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                {/* Key Specs Bar */}
                <div className="flex items-center gap-4 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="font-semibold text-slate-700">{resource.totalMarks} Marks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{resource.timeAllocationMinutes} Minutes</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto text-slate-600 font-medium">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{resource.paperType}</span>
                  </div>
                </div>

                {/* CAPS Topics Covered */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    CAPS & IEB Topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resource.capsTopicsCovered.map((topic, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Examiner Insight Callout Banner if available */}
                {resource.examinerInsights && resource.examinerInsights.length > 0 && (
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-amber-900">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Examiner Misconception Alert: {resource.examinerInsights[0].topic}</span>
                      </div>
                      {resource.examinerInsights[0].averageScorePercentage && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-amber-200/60 rounded text-amber-950 font-bold">
                          Avg: {resource.examinerInsights[0].averageScorePercentage}%
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-amber-800 leading-normal">
                      {resource.examinerInsights[0].commonErrors[0] || resource.examinerInsights[0].examinerTips[0]}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenDetailModal(resource, resource.sampleQuestions ? 'questions' : 'examiner')}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Questions & Memo</span>
                  </button>

                  {resource.examinerInsights && (
                    <button
                      onClick={() => handleOpenDetailModal(resource, 'examiner')}
                      className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Examiner Report</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 ml-auto">
                  {onPlanLessonForResource && (
                    <button
                      onClick={() => onPlanLessonForResource(resource)}
                      title="Use in 45-Min Lesson Planner"
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDownloadResourceBrief(resource)}
                    title="Download Text Document Pack"
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">No matching IEB resources found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to browse all available past papers and examiner reports.
          </p>
          <button
            onClick={() => {
              setSelectedSubject('ALL');
              setSelectedGrade('ALL');
              setSelectedType('ALL');
              setSelectedYear('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-all cursor-pointer"
          >
            Show All Resources
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* DETAILED RESOURCE MODAL (Questions, Memo & Examiner Report) */}
      {/* ======================================================== */}
      {activeModalResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {activeModalResource.subject} Grade {activeModalResource.grade}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {activeModalResource.session} ({activeModalResource.year}) • {activeModalResource.totalMarks} Marks
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {activeModalResource.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalResource(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-200/60 transition-all cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tab Switcher */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-white">
              <button
                onClick={() => setModalTab('questions')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  modalTab === 'questions'
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Sample Questions & Marking Guidelines
              </button>

              {activeModalResource.examinerInsights && (
                <button
                  onClick={() => setModalTab('examiner')}
                  className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                    modalTab === 'examiner'
                      ? 'border-amber-600 text-amber-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Examiner Diagnostic Report</span>
                </button>
              )}

              <button
                onClick={() => setModalTab('overview')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  modalTab === 'overview'
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Overview & Syllabus Alignment
              </button>
            </div>

            {/* Modal Scrollable Content Area */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* TAB 1: SAMPLE QUESTIONS */}
              {modalTab === 'questions' && (
                <div className="space-y-6">
                  {activeModalResource.sampleQuestions && activeModalResource.sampleQuestions.length > 0 ? (
                    activeModalResource.sampleQuestions.map((q, qIndex) => (
                      <div
                        key={qIndex}
                        className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4"
                      >
                        {/* Question Title Bar */}
                        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{q.questionNumber}</span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                              {q.cognitiveLevel}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                            [{q.marks} Marks Total]
                          </span>
                        </div>

                        {/* Question Context Scenario */}
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-serif">
                          {q.context}
                        </div>

                        {/* Sub Questions & Answer Guides */}
                        <div className="space-y-4">
                          {q.subQuestions.map((sq, sqIndex) => (
                            <div
                              key={sqIndex}
                              className="bg-white rounded-xl p-4 border border-slate-200 space-y-2.5"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <span className="font-bold text-xs text-slate-900">
                                  {sq.number} {sq.text}
                                </span>
                                <span className="text-xs font-bold text-slate-600 shrink-0">
                                  [{sq.marks}]
                                </span>
                              </div>

                              {/* Marking Guideline Box */}
                              <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3 text-xs space-y-1">
                                <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950">
                                  <span className="flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Marking Guideline & Solution</span>
                                  </span>
                                  <span className="text-emerald-800 font-mono text-[10px]">
                                    {sq.markBreakdown}
                                  </span>
                                </div>
                                <p className="text-emerald-900 font-mono text-[11px] leading-relaxed">
                                  {sq.answerGuide}
                                </p>
                              </div>

                              {/* Common Pitfall if present */}
                              {sq.commonPitfall && (
                                <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 text-xs flex items-start gap-2 text-rose-900">
                                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-bold block text-[11px]">Typical Learner Mistake:</span>
                                    <span className="text-[11px]">{sq.commonPitfall}</span>
                                  </div>
                                </div>
                              )}

                              {/* Action to Ask AI Assistant */}
                              <div className="flex justify-end pt-1">
                                <button
                                  onClick={() => {
                                    if (onAskAIAboutResource) {
                                      onAskAIAboutResource(
                                        `Please scaffold a 45-minute lesson activity based on this IEB exam question for ${activeModalResource.subject} Grade ${activeModalResource.grade}:\nQuestion: "${sq.text}"\nGuideline: "${sq.answerGuide}". Provide 3 stepping-stone diagnostic questions and 1 extension question.`
                                      );
                                      setActiveModalResource(null);
                                    }
                                  }}
                                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Sparkles className="w-3 h-3 text-indigo-600" />
                                  <span>Generate Scaffolding with AI</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 space-y-2">
                      <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-xs text-slate-500">
                        This resource is a full portfolio/report guide. Switch to the Examiner Report tab or download the complete text brief below.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: EXAMINER DIAGNOSTIC REPORT */}
              {modalTab === 'examiner' && activeModalResource.examinerInsights && (
                <div className="space-y-6">
                  {activeModalResource.examinerInsights.map((insight, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4"
                    >
                      {/* Topic & Performance header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-150">
                        <div>
                          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                            Diagnostic Strand
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">{insight.topic}</h4>
                        </div>

                        <div className="flex items-center gap-2">
                          {insight.averageScorePercentage && (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                              National Avg: {insight.averageScorePercentage}%
                            </span>
                          )}
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                              insight.overallPerformance === 'Well Answered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : insight.overallPerformance === 'Moderate'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}
                          >
                            {insight.overallPerformance}
                          </span>
                        </div>
                      </div>

                      {/* Common Candidate Errors */}
                      {insight.commonErrors.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Systemic Candidate Pitfalls & Mark Deductions:</span>
                          </span>
                          <ul className="space-y-1.5">
                            {insight.commonErrors.map((err, eIdx) => (
                              <li
                                key={eIdx}
                                className="text-xs text-slate-700 bg-rose-50/50 p-2.5 rounded-xl border border-rose-150 leading-relaxed flex items-start gap-2"
                              >
                                <span className="text-rose-500 font-bold">•</span>
                                <span>{err}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Examiner Recommendations & Classroom Fixes */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Actionable Teaching Recommendations for 45-Min Lessons:</span>
                        </span>
                        <ul className="space-y-1.5">
                          {insight.examinerTips.concat(insight.teachingRecommendations || []).map((tip, tIdx) => (
                            <li
                              key={tIdx}
                              className="text-xs text-slate-700 bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-150 leading-relaxed flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: OVERVIEW */}
              {modalTab === 'overview' && (
                <div className="space-y-5">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                    <span className="font-bold text-slate-900 block text-sm">Description & Purpose</span>
                    <p className="text-slate-600 leading-relaxed">{activeModalResource.description}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">Assessment Highlights</span>
                    <div className="grid grid-cols-1 gap-2">
                      {activeModalResource.keyHighlights.map((hl, hIdx) => (
                        <div
                          key={hIdx}
                          className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                        >
                          <Award className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">All CAPS Strands Assessed</span>
                    <div className="flex flex-wrap gap-2">
                      {activeModalResource.capsTopicsCovered.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 bg-slate-100 text-slate-800 rounded-xl font-medium border border-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleDownloadResourceBrief(activeModalResource)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <Download className="w-4 h-4" />
                <span>Export Resource Pack (.txt)</span>
              </button>

              <div className="flex items-center gap-2">
                {onPlanLessonForResource && (
                  <button
                    onClick={() => {
                      onPlanLessonForResource(activeModalResource);
                      setActiveModalResource(null);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plan 45-Min Lesson</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveModalResource(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
