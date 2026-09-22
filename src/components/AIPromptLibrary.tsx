import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Filter, 
  Search, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { AIPromptTemplate, GradeClass, Subject } from '../types';
import { AI_PROMPT_TEMPLATES } from '../data/aiPromptsData';
import { exportAIPromptsToDocx } from '../utils/docxGenerator';

interface AIPromptLibraryProps {
  onRunPromptInChat: (promptText: string) => void;
}

export const AIPromptLibrary: React.FC<AIPromptLibraryProps> = ({
  onRunPromptInChat,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const categories = ['ALL', 'Pedagogical Frameworks', 'Lesson Planning', 'IEB Exam Style Question', 'PAT & Practical Guidance', 'Worksheet Generation', 'Remediation & Scaffolding'];

  const filteredPrompts = AI_PROMPT_TEMPLATES.filter(p => {
    if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;
    if (selectedSubject !== 'ALL' && p.targetSubject !== selectedSubject && p.targetSubject !== 'All') return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.promptText.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportWord = async () => {
    setIsExporting(true);
    try {
      await exportAIPromptsToDocx(AI_PROMPT_TEMPLATES);
    } catch (err) {
      console.error('Failed to export AI Prompts docx:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Word Export Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                AI Prompts Library per Subject & Grade (Word Exportable)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Curated, high-impact prompt templates designed specifically for CAPS Technology (Grades 8 & 9), Mathematical Literacy (Grades 10, 11, 12), and AS1 Business.
            </p>
          </div>

          <button
            id="download-master-prompts-docx"
            onClick={handleExportWord}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Creating Document...' : 'Export Master Prompts (.docx)'}</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              id="prompt-search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search prompts by keyword or topic..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <select
              id="prompt-subject-filter"
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Subjects</option>
              <option value="Technology">Technology (Grades 8 & 9)</option>
              <option value="Mathematical Literacy">Mathematical Literacy (Grades 10-12)</option>
              <option value="Business Studies">Business Studies (AS1)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              id="prompt-category-filter"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Prompt Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Prompts Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrompts.map(prompt => {
          const isCopied = copiedId === prompt.id;

          return (
            <div
              key={prompt.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Badge Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                    {prompt.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {prompt.targetSubject} • {prompt.targetGrade}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{prompt.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{prompt.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {prompt.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Prompt Code Block Preview */}
                <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-line border border-slate-800">
                  {prompt.promptText}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-4 mt-3 border-t border-slate-100">
                <button
                  onClick={() => handleCopy(prompt.id, prompt.promptText)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Prompt'}</span>
                </button>

                <button
                  onClick={() => onRunPromptInChat(prompt.promptText)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Run in AI Chat</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
