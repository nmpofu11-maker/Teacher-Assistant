import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Download, 
  Sparkles, 
  X, 
  Check, 
  UserCheck, 
  Calendar, 
  FileText,
  HelpCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { AssessmentTask, PreModerationForm } from '../types';
import { exportPreModerationToDocx } from '../utils/docxGenerator';
import confetti from 'canvas-confetti';

interface PreModerationModalProps {
  task: AssessmentTask;
  initialForm: PreModerationForm;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedForm: PreModerationForm) => void;
  onAskAI: (prompt: string) => void;
}

export const PreModerationModal: React.FC<PreModerationModalProps> = ({
  task,
  initialForm,
  isOpen,
  onClose,
  onSave,
  onAskAI
}) => {
  const [form, setForm] = useState<PreModerationForm>(initialForm);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [newRecommendation, setNewRecommendation] = useState<string>('');

  if (!isOpen) return null;

  const isIEB = task.curriculumStandard.includes('IEB');

  const handleCheckboxToggle = (key: keyof PreModerationForm['checks']) => {
    setForm(prev => ({
      ...prev,
      checks: {
        ...prev.checks,
        [key]: {
          ...prev.checks[key],
          passed: !prev.checks[key].passed
        }
      }
    }));
  };

  const handleCommentChange = (key: keyof PreModerationForm['checks'], comment: string) => {
    setForm(prev => ({
      ...prev,
      checks: {
        ...prev.checks,
        [key]: {
          ...prev.checks[key],
          comment
        }
      }
    }));
  };

  const handleAddRecommendation = () => {
    if (!newRecommendation.trim()) return;
    setForm(prev => ({
      ...prev,
      recommendations: [...prev.recommendations, newRecommendation.trim()]
    }));
    setNewRecommendation('');
  };

  const handleRemoveRecommendation = (index: number) => {
    setForm(prev => ({
      ...prev,
      recommendations: prev.recommendations.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(form);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    onClose();
  };

  const handleExportDocx = async () => {
    setIsExporting(true);
    try {
      await exportPreModerationToDocx(task, form);
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.8 } });
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const runAIAudit = () => {
    const aiPrompt = `Perform a formal Pre-Administration Moderation audit on the assessment task "${task.title}" (${task.code}) for ${task.subject} Grade ${task.grade}. Verify Bloom's taxonomy cognitive levels (L1: ${task.cognitiveWeighting.level1_knowing}%, L2: ${task.cognitiveWeighting.level2_routine}%, L3: ${task.cognitiveWeighting.level3_complex}%, L4: ${task.cognitiveWeighting.level4_reasoning}%), technical layout, memo accuracy, and Appendix G AI declaration compliance according to official ${task.curriculumStandard} standards.`;
    onAskAI(aiPrompt);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#20252B] border border-[#DCDCD3] dark:border-[#323842] rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#1B2430] dark:text-[#EDEEE7]">
        {/* Header */}
        <div className="p-5 border-b border-[#DCDCD3] dark:border-[#323842] bg-[#F6F5F0] dark:bg-[#181C21] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2F6F63] dark:bg-[#5EBAA4] text-white dark:text-[#181C21] flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1B2430] dark:text-[#EDEEE7] tracking-tight font-serif">
                  Pre-Administration Moderation Form
                </h3>
                <p className="text-xs text-[#717885] dark:text-[#8E949F]">
                  {task.code} • {task.subject} Grade {task.grade} — {task.title}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runAIAudit}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7EEDB] dark:bg-[#382C18] text-[#B4791E] dark:text-[#D9A24B] border border-[#F2DEB9] dark:border-[#524124] text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Pre-Audit</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#717885] hover:text-[#1B2430] dark:hover:text-white rounded-lg hover:bg-[#EAE8DF] dark:hover:bg-[#252B33] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Official Acceptable Window Alert Bar */}
          <div className="p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B4791E] dark:text-[#D9A24B]" />
                <span className="font-bold text-[#1B2430] dark:text-[#EDEEE7] uppercase tracking-wider text-[11px]">
                  Official Acceptable Moderation Timeline
                </span>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                form.status === 'APPROVED' 
                  ? 'bg-[#E6EFEA] text-[#1D453D] dark:bg-[#1A2E28] dark:text-[#92DAC8] border border-[#B8D8CD] dark:border-[#2E584D]'
                  : 'bg-[#F7EEDB] text-[#B4791E] dark:bg-[#382C18] dark:text-[#D9A24B] border border-[#F2DEB9] dark:border-[#524124]'
              }`}>
                {form.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-[#4A5568] dark:text-[#A2A7B0] leading-relaxed">
              <strong>DBE / IEB Standard:</strong> Pre-moderation must be conducted <strong className="text-[#2F6F63] dark:text-[#5EBAA4]">14 to 21 calendar days</strong> prior to test administration (strictly closing at least 7 days before printing). 
              Target submission: <strong className="text-[#1B2430] dark:text-[#EDEEE7]">{form.officialAcceptableWindow}</strong>.
            </p>
          </div>

          {/* Moderator Metadata Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Moderator Name & Title</label>
              <input
                type="text"
                value={form.moderatorName}
                onChange={e => setForm({ ...form, moderatorName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/30 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Moderator Role</label>
              <select
                value={form.moderatorRole}
                onChange={e => setForm({ ...form, moderatorRole: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/30 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="HOD">HOD (Head of Department)</option>
                <option value="Subject Head">Subject Head</option>
                <option value="Senior Teacher">Senior Teacher</option>
                <option value="Cluster Moderator">Cluster Moderator</option>
                <option value="External IEB Moderator">External IEB Moderator</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">SACE Registration Number</label>
              <input
                type="text"
                value={form.saceNumber || ''}
                onChange={e => setForm({ ...form, saceNumber: e.target.value })}
                placeholder="e.g. SACE-8849201"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/30 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Approval Determination</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/30 text-xs font-bold text-cyan-600 dark:text-cyan-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="APPROVED">APPROVED (Ready for Duplication)</option>
                <option value="APPROVED_WITH_MODIFICATIONS">APPROVED WITH MINOR MODIFICATIONS</option>
                <option value="IN_REVIEW">IN REVIEW (Under Quality Assurance)</option>
                <option value="RESUBMISSION_REQUIRED">RESUBMISSION REQUIRED (Correct & Resubmit)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Moderation Date</label>
              <input
                type="date"
                value={form.moderationDate}
                onChange={e => setForm({ ...form, moderationDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/30 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Detailed Criteria Matrix */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Official Moderation Audit Criteria (6-Point Verification)
            </h4>

            {/* Check Item 1: Technical Layout */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.technicalLayout.passed}
                    onChange={() => handleCheckboxToggle('technicalLayout')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>1. Technical Layout, Instructions, Mark Totals & Time Allocation</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.technicalLayout.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.technicalLayout.passed ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.technicalLayout.comment}
                onChange={e => handleCommentChange('technicalLayout', e.target.value)}
                placeholder="Moderator annotations..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Check Item 2: Curriculum Alignment */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.curriculumAlignment.passed}
                    onChange={() => handleCheckboxToggle('curriculumAlignment')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>2. CAPS / IEB SAG Curriculum Coverage & Term ATP Scope</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.curriculumAlignment.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.curriculumAlignment.passed ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.curriculumAlignment.comment}
                onChange={e => handleCommentChange('curriculumAlignment', e.target.value)}
                placeholder="Moderator annotations..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Check Item 3: Bloom's Cognitive Taxonomy */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.cognitiveDistribution.passed}
                    onChange={() => handleCheckboxToggle('cognitiveDistribution')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>3. Bloom's Cognitive Weighting (L1: {task.cognitiveWeighting.level1_knowing}%, L2: {task.cognitiveWeighting.level2_routine}%, L3: {task.cognitiveWeighting.level3_complex}%, L4: {task.cognitiveWeighting.level4_reasoning}%)</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.cognitiveDistribution.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.cognitiveDistribution.passed ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.cognitiveDistribution.comment}
                onChange={e => handleCommentChange('cognitiveDistribution', e.target.value)}
                placeholder="Moderator annotations..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Check Item 4: Marking Memorandum */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.markingMemoClarity.passed}
                    onChange={() => handleCheckboxToggle('markingMemoClarity')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>4. Marking Memorandum Accuracy, Step-by-Step Marks & Alternative Methods</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.markingMemoClarity.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.markingMemoClarity.passed ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.markingMemoClarity.comment}
                onChange={e => handleCommentChange('markingMemoClarity', e.target.value)}
                placeholder="Moderator annotations..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Check Item 5: Language & Fairness */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.languageAndFairness.passed}
                    onChange={() => handleCheckboxToggle('languageAndFairness')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>5. Language Accessibility, Readability & Absence of Cultural Bias</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.languageAndFairness.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.languageAndFairness.passed ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.languageAndFairness.comment}
                onChange={e => handleCommentChange('languageAndFairness', e.target.value)}
                placeholder="Moderator annotations..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Check Item 6: AI Integrity & Appendix G */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.aiAcademicIntegrity.passed}
                    onChange={() => handleCheckboxToggle('aiAcademicIntegrity')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>6. AI Academic Integrity Policy & Appendix G Learner Declaration Attached</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.aiAcademicIntegrity.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.aiAcademicIntegrity.passed ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.aiAcademicIntegrity.comment}
                onChange={e => handleCommentChange('aiAcademicIntegrity', e.target.value)}
                placeholder="Moderator annotations..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>
          </div>

          {/* Overall Comments & Recommendations */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Moderator Overall Finding & Summary
              </label>
              <textarea
                rows={2}
                value={form.overallComments}
                onChange={e => setForm({ ...form, overallComments: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/30 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            {/* Recommendations list */}
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Specific Recommendations for the Educator:
              </label>
              <div className="space-y-1.5 mb-2">
                {form.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-300">• {rec}</span>
                    <button
                      onClick={() => handleRemoveRecommendation(idx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRecommendation}
                  onChange={e => setNewRecommendation(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddRecommendation(); } }}
                  placeholder="Add a new recommendation..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddRecommendation}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.signatureVerified}
                  onChange={e => setForm({ ...form, signatureVerified: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  Digital Signature & Moderator Authentication (SACE Verified)
                </span>
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {form.signedAt || 'Timestamped'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#DCDCD3] dark:border-[#323842] bg-[#F6F5F0] dark:bg-[#181C21] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleExportDocx}
            disabled={isExporting}
            className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-[#21262D] hover:bg-[#FAF9F5] dark:hover:bg-[#282F38] text-[#1B2430] dark:text-[#EDEEE7] text-xs font-semibold rounded-xl border border-[#DCDCD3] dark:border-[#323842] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#35507C] dark:text-[#87AADE]" />
            <span>{isExporting ? 'Exporting...' : 'Export Formal Report (.docx)'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#717885] dark:text-[#8E949F] hover:text-[#1B2430] dark:hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 bg-[#2F6F63] hover:bg-[#25574E] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Save &amp; Sign Pre-Moderation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
