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
  Calendar, 
  FileText,
  Users,
  Plus,
  Trash2,
  Sliders,
  FileCheck2
} from 'lucide-react';
import { AssessmentTask, PostModerationForm } from '../types';
import { exportPostModerationToDocx } from '../utils/docxGenerator';
import confetti from 'canvas-confetti';

interface PostModerationModalProps {
  task: AssessmentTask;
  initialForm: PostModerationForm;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedForm: PostModerationForm) => void;
  onAskAI: (prompt: string) => void;
}

export const PostModerationModal: React.FC<PostModerationModalProps> = ({
  task,
  initialForm,
  isOpen,
  onClose,
  onSave,
  onAskAI
}) => {
  const [form, setForm] = useState<PostModerationForm>(initialForm);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [newMisconception, setNewMisconception] = useState<string>('');
  const [newRemediation, setNewRemediation] = useState<string>('');

  if (!isOpen) return null;

  const handleCheckboxToggle = (key: keyof PostModerationForm['checks']) => {
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

  const handleCommentChange = (key: keyof PostModerationForm['checks'], comment: string) => {
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

  const handleAddMisconception = () => {
    if (!newMisconception.trim()) return;
    setForm(prev => ({
      ...prev,
      commonLearnerMisconceptions: [...prev.commonLearnerMisconceptions, newMisconception.trim()]
    }));
    setNewMisconception('');
  };

  const handleRemoveMisconception = (idx: number) => {
    setForm(prev => ({
      ...prev,
      commonLearnerMisconceptions: prev.commonLearnerMisconceptions.filter((_, i) => i !== idx)
    }));
  };

  const handleAddRemediation = () => {
    if (!newRemediation.trim()) return;
    setForm(prev => ({
      ...prev,
      recommendationsForRemediation: [...prev.recommendationsForRemediation, newRemediation.trim()]
    }));
    setNewRemediation('');
  };

  const handleRemoveRemediation = (idx: number) => {
    setForm(prev => ({
      ...prev,
      recommendationsForRemediation: prev.recommendationsForRemediation.filter((_, i) => i !== idx)
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
      await exportPostModerationToDocx(task, form);
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.8 } });
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const runAIDiagnostics = () => {
    const aiPrompt = `Perform an AI Post-Moderation diagnostic review for ${task.subject} Grade ${task.grade} on task "${task.title}" (${task.code}). Analyze the following learner misconceptions: ${form.commonLearnerMisconceptions.join('; ')}, and generate an actionable 3-step targeted remediation worksheet plan and marking guidance.`;
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
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1B2430] dark:text-[#EDEEE7] tracking-tight font-serif">
                  Post-Administration Moderation Form
                </h3>
                <p className="text-xs text-[#717885] dark:text-[#8E949F]">
                  {task.code} • {task.subject} Grade {task.grade} — {task.title} (Sample Script Audit)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runAIDiagnostics}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7EEDB] dark:bg-[#382C18] text-[#B4791E] dark:text-[#D9A24B] border border-[#F2DEB9] dark:border-[#524124] text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Remediation Generator</span>
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
                  Official Acceptable Post-Moderation Timeline
                </span>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                form.status === 'MODERATION_APPROVED' 
                  ? 'bg-[#E6EFEA] text-[#1D453D] dark:bg-[#1A2E28] dark:text-[#92DAC8] border border-[#B8D8CD] dark:border-[#2E584D]'
                  : 'bg-[#F7EEDB] text-[#B4791E] dark:bg-[#382C18] dark:text-[#D9A24B] border border-[#F2DEB9] dark:border-[#524124]'
              }`}>
                {form.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-[#4A5568] dark:text-[#A2A7B0] leading-relaxed">
              <strong>DBE / IEB Standard:</strong> Post-moderation must occur <strong className="text-[#2F6F63] dark:text-[#5EBAA4]">within 3 to 7 working days</strong> after teacher marks all scripts, strictly before marks are finalized on SA-SAMS or IEB online portfolios.
              Target Window: <strong className="text-[#1B2430] dark:text-[#EDEEE7]">{form.officialAcceptableWindow}</strong>.
            </p>
          </div>

          {/* Moderator Metadata Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Moderator Name</label>
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
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Moderation Date</label>
              <input
                type="date"
                value={form.moderationDate}
                onChange={e => setForm({ ...form, moderationDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/30 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 10% Representative Sample Breakdown */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Moderated Script Sample Selection (10% Minimum Benchmark)
                </h4>
              </div>
              <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-300">
                {form.sampleSize} Scripts Audited
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white dark:bg-[#090e1a] border border-slate-200 dark:border-indigo-500/20 space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                  Top Performers (Sample)
                </span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {form.sampleBreakdown.topLearners.map((learner, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{learner}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#090e1a] border border-slate-200 dark:border-indigo-500/20 space-y-1.5">
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase block">
                  Middle Performers (Sample)
                </span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {form.sampleBreakdown.middleLearners.map((learner, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{learner}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#090e1a] border border-slate-200 dark:border-indigo-500/20 space-y-1.5">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase block">
                  Bottom Performers (Sample)
                </span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {form.sampleBreakdown.bottomLearners.map((learner, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{learner}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Post-Moderation 5-Point Verification Matrix */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Post-Administration Audit Criteria (5-Point Verification)
            </h4>

            {/* Check 1: Marking Consistency */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.markingConsistency.passed}
                    onChange={() => handleCheckboxToggle('markingConsistency')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>1. Marking Consistency & Adherence to Approved Memorandum</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.markingConsistency.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.markingConsistency.passed ? 'VERIFIED' : 'VARIANCE'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.markingConsistency.comment}
                onChange={e => handleCommentChange('markingConsistency', e.target.value)}
                placeholder="Findings regarding CA (consistent accuracy) and marking guidelines..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Check 2: Arithmetic Accuracy */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.arithmeticAccuracy.passed}
                    onChange={() => handleCheckboxToggle('arithmeticAccuracy')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>2. Arithmetic Accuracy & Subtotal Calculation on Scripts</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.arithmeticAccuracy.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.arithmeticAccuracy.passed ? 'VERIFIED' : 'VARIANCE'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.arithmeticAccuracy.comment}
                onChange={e => handleCommentChange('arithmeticAccuracy', e.target.value)}
                placeholder="Discrepancies in mark summation across pages..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Check 3: Formative Feedback */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.formativeFeedback.passed}
                    onChange={() => handleCheckboxToggle('formativeFeedback')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>3. Quality of Formative Feedback & Annotations Given to Learners</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.formativeFeedback.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.formativeFeedback.passed ? 'VERIFIED' : 'VARIANCE'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.formativeFeedback.comment}
                onChange={e => handleCommentChange('formativeFeedback', e.target.value)}
                placeholder="Annotations pointing out method errors, positive remarks..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Check 4: Mark Transfer Accuracy */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.markTransferAccuracy.passed}
                    onChange={() => handleCheckboxToggle('markTransferAccuracy')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>4. Accuracy of Mark Transfer to SA-SAMS / Record Sheet</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.markTransferAccuracy.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.markTransferAccuracy.passed ? 'VERIFIED' : 'VARIANCE'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.markTransferAccuracy.comment}
                onChange={e => handleCommentChange('markTransferAccuracy', e.target.value)}
                placeholder="Comparison of script cover marks vs electronic schedule..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Check 5: Appendix G AI Declaration Audit */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.checks.aiUseAudit.passed}
                    onChange={() => handleCheckboxToggle('aiUseAudit')}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>5. Appendix G AI Declaration Audit (Authenticity Verification)</span>
                </label>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.checks.aiUseAudit.passed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-500'}`}>
                  {form.checks.aiUseAudit.passed ? 'VERIFIED' : 'VARIANCE'}
                </span>
              </div>
              <input
                type="text"
                value={form.checks.aiUseAudit.comment}
                onChange={e => handleCommentChange('aiUseAudit', e.target.value)}
                placeholder="Confirmation of learner AI declaration table entries vs written analysis..."
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300"
              />
            </div>
          </div>

          {/* Mark Adjustment Section */}
          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 dark:text-white">
                <input
                  type="checkbox"
                  checked={form.markAdjustmentSuggested}
                  onChange={e => setForm({ ...form, markAdjustmentSuggested: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                />
                <span>Statistical / Standardized Mark Adjustment Recommended?</span>
              </label>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${form.markAdjustmentSuggested ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                {form.markAdjustmentSuggested ? 'ADJUSTMENT REQUIRED' : 'ORIGINAL MARKS UPHELD'}
              </span>
            </div>

            {form.markAdjustmentSuggested && (
              <input
                type="text"
                value={form.adjustmentDetails || ''}
                onChange={e => setForm({ ...form, adjustmentDetails: e.target.value })}
                placeholder="Specify mark adjustment formula or question-level scaling..."
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-500/50 text-xs text-slate-800 dark:text-slate-200"
              />
            )}
          </div>

          {/* Diagnostic Misconceptions & Remediation */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Common Learner Misconceptions Identified in Sample:
              </label>
              <div className="space-y-1.5 mb-2">
                {form.commonLearnerMisconceptions.map((mis, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-300">• {mis}</span>
                    <button
                      onClick={() => handleRemoveMisconception(idx)}
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
                  value={newMisconception}
                  onChange={e => setNewMisconception(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddMisconception(); } }}
                  placeholder="Add a common misconception..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddMisconception}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                Targeted Remediation Recommendations:
              </label>
              <div className="space-y-1.5 mb-2">
                {form.recommendationsForRemediation.map((rem, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-700 dark:text-slate-300">• {rem}</span>
                    <button
                      onClick={() => handleRemoveRemediation(idx)}
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
                  value={newRemediation}
                  onChange={e => setNewRemediation(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddRemediation(); } }}
                  placeholder="Add remediation directive..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddRemediation}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.signatureVerified}
                  onChange={e => setForm({ ...form, signatureVerified: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                />
                <span className="font-bold text-cyan-700 dark:text-cyan-300">
                  Post-Moderation Verified & Signed Off for SA-SAMS Capture
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
            <span>{isExporting ? 'Exporting...' : 'Export Post-Moderation Report (.docx)'}</span>
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
              <span>Save &amp; Sign Post-Moderation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
