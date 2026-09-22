import React from 'react';
import { 
  Calendar, 
  BookOpen, 
  FileSpreadsheet, 
  FileText, 
  Presentation, 
  MessageSquareText, 
  Sparkles, 
  UploadCloud,
  FileCheck,
  CheckCircle2,
  GraduationCap,
  Award,
  ClipboardCheck,
  Sun,
  Moon,
  Compass
} from 'lucide-react';
import { GradeClass } from '../types';
import { CLASSES_CONFIG } from '../data/atpData';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedClassFilter: GradeClass | 'ALL';
  setSelectedClassFilter: (cls: GradeClass | 'ALL') => void;
  selectedTerm: number;
  setSelectedTerm: (term: number) => void;
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  onExportExcel: () => void;
  onExportPromptsWord: () => void;
  onOpenUploadModal: () => void;
  onOpenCalendarModal?: () => void;
  calendarDateRange?: string;
  year?: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedClassFilter,
  setSelectedClassFilter,
  selectedTerm,
  setSelectedTerm,
  selectedWeek,
  setSelectedWeek,
  onExportExcel,
  onExportPromptsWord,
  onOpenUploadModal,
  onOpenCalendarModal,
  calendarDateRange,
  year = 2026,
  theme,
  onToggleTheme,
}) => {
  const classesList: { id: GradeClass | 'ALL'; label: string; badge: string; darkBadge: string }[] = [
    { id: 'ALL', label: 'All 7 Classes (Master)', badge: 'bg-[#1B2430] text-white', darkBadge: 'dark:bg-[#EDEEE7] dark:text-[#181C21] dark:border-transparent' },
    { id: '8A', label: 'Gr 8A Tech', badge: 'bg-[#E6EFEA] text-[#1D453D] border border-[#B8D8CD]', darkBadge: 'dark:bg-[#1A2E28] dark:text-[#92DAC8] dark:border-[#2E584D]' },
    { id: '8B', label: 'Gr 8B Tech', badge: 'bg-[#EAF3F0] text-[#28574D] border border-[#C3DFD8]', darkBadge: 'dark:bg-[#1A312B] dark:text-[#A7E2D4] dark:border-[#355F55]' },
    { id: '9A', label: 'Gr 9A Tech', badge: 'bg-[#E3EEEB] text-[#133F37] border border-[#AECFC7]', darkBadge: 'dark:bg-[#152924] dark:text-[#83D1BE] dark:border-[#264D43]' },
    { id: '9B', label: 'Gr 9B Tech', badge: 'bg-[#EDF5F3] text-[#315E54] border border-[#CDE3DD]', darkBadge: 'dark:bg-[#1C332D] dark:text-[#B2E4DA] dark:border-[#396359]' },
    { id: '10', label: 'Gr 10 MathLit', badge: 'bg-[#E8EEF5] text-[#233A5C] border border-[#BDCDDF]', darkBadge: 'dark:bg-[#1B2738] dark:text-[#AFCBEA] dark:border-[#2F4463]' },
    { id: '11', label: 'Gr 11 MathLit', badge: 'bg-[#EEF3F8] text-[#334D75] border border-[#CAD7E6]', darkBadge: 'dark:bg-[#1F2C3F] dark:text-[#BED4EE] dark:border-[#374C6A]' },
    { id: '12', label: 'Gr 12 MathLit', badge: 'bg-[#E5EBF3] text-[#162742] border border-[#B2C3D9]', darkBadge: 'dark:bg-[#162130] dark:text-[#9FBFE5] dark:border-[#283A53]' },
  ];

  const navTabs = [
    { id: 'timetable', label: 'Weekly Timetable', icon: Calendar },
    { id: 'learning-models', label: 'Learning Models Hub', icon: Compass },
    { id: 'planner', label: '45-Min Lesson Planner', icon: BookOpen },
    { id: 'slides', label: 'Slide Decks (.pptx)', icon: Presentation },
    { id: 'worksheets', label: 'Worksheets & Memos', icon: FileCheck },
    { id: 'assessment', label: 'Assessments & SBA Hub', icon: ClipboardCheck },
    { id: 'ieb', label: 'IEB Resource Library', icon: Award },
    { id: 'atp', label: 'CAPS ATP Explorer', icon: FileSpreadsheet },
    { id: 'prompts', label: 'AI Prompts Library', icon: FileText },
    { id: 'chat', label: 'AI Teaching Assistant', icon: MessageSquareText },
  ];

  return (
    <header className="bg-white dark:bg-[#20252B] border-b border-[#DCDCD3] dark:border-[#323842] sticky top-0 z-40 shadow-xs backdrop-blur-md transition-colors duration-200">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Teacher Persona */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2F6F63] dark:bg-[#5EBAA4] text-white dark:text-[#181C21] flex items-center justify-center shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1B2430] dark:text-[#EDEEE7] tracking-tight font-serif">The AI Teaching Assistant</h1>
              <span className="text-xs px-2.5 py-0.5 font-semibold rounded-full bg-[#E6EFEA] dark:bg-[#1A2E28] text-[#1D453D] dark:text-[#92DAC8] border border-[#B8D8CD] dark:border-[#2E584D]">
                Mr. Mpofu — Teaching Desk
              </span>
            </div>
            <p className="text-xs text-[#4A5568] dark:text-[#A2A7B0]">
              Technology (8A, 8B, 9A, 9B) • Mathematical Literacy (10, 11, 12) • CAPS & IEB SAG Aligned
            </p>
          </div>
        </div>

        {/* Global Term & Week Controls + Fast Exports + Dark Mode */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Term Selector */}
          <div className="flex items-center bg-[#F6F5F0] dark:bg-[#181C21] rounded-lg p-1 border border-[#DCDCD3] dark:border-[#323842] text-xs font-semibold text-[#4A5568] dark:text-[#EDEEE7]">
            <span className="px-2 text-[#717885] dark:text-[#8E949F] font-normal">Term:</span>
            {[1, 2, 3, 4].map(t => (
              <button
                key={t}
                id={`term-btn-${t}`}
                onClick={() => setSelectedTerm(t)}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  selectedTerm === t
                    ? 'bg-[#2F6F63] dark:bg-[#5EBAA4] text-white dark:text-[#181C21] font-bold shadow-xs'
                    : 'hover:text-[#1B2430] dark:hover:text-white hover:bg-[#EAE8DF] dark:hover:bg-[#252B33]'
                }`}
              >
                T{t}
              </button>
            ))}
          </div>

          {/* Week Selector */}
          <div className="flex items-center bg-[#F6F5F0] dark:bg-[#181C21] rounded-lg p-1 border border-[#DCDCD3] dark:border-[#323842] text-xs font-semibold text-[#4A5568] dark:text-[#EDEEE7]">
            <span className="px-2 text-[#717885] dark:text-[#8E949F] font-normal">Week:</span>
            <select
              id="week-select-dropdown"
              value={selectedWeek}
              onChange={e => setSelectedWeek(Number(e.target.value))}
              className="bg-white dark:bg-[#252B33] border border-[#DCDCD3] dark:border-[#323842] text-[#1B2430] dark:text-[#EDEEE7] text-xs rounded-md px-2 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-[#2F6F63]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(w => (
                <option key={w} value={w}>
                  Week {w}
                </option>
              ))}
            </select>
          </div>

          {/* Calendar Alignment Trigger */}
          {onOpenCalendarModal && (
            <button
              id="navbar-calendar-btn"
              onClick={onOpenCalendarModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all cursor-pointer text-xs font-semibold"
              title="View and synchronize 2025/2026 Academic Calendar"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline font-mono">
                {calendarDateRange ? calendarDateRange : `Calendar (${year})`}
              </span>
              <span className="md:hidden">Cal</span>
            </button>
          )}

          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Dark Mode Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#DCDCD3] dark:border-[#323842] bg-[#F6F5F0] dark:bg-[#181C21] text-[#4A5568] dark:text-[#EDEEE7] hover:bg-[#EAE8DF] dark:hover:bg-[#252B33] transition-all cursor-pointer text-xs font-semibold"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#D9A24B]" />
                <span className="hidden sm:inline font-bold text-[#D9A24B]">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#35507C]" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-[#DCDCD3] dark:border-[#323842]">
            <button
              id="export-master-excel-btn"
              onClick={onExportExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2F6F63] hover:bg-[#25574E] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
              title="Export complete Excel workbook with all 7 classes populated with ATP topics"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </button>

            <button
              id="upload-excel-btn"
              onClick={onOpenUploadModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#35507C] hover:bg-[#2A4064] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
              title="Upload existing Excel timetable to auto-populate with ATP data"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Upload Excel</span>
            </button>

            <button
              id="export-prompts-word-btn"
              onClick={onExportPromptsWord}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4A5568] hover:bg-[#384150] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
              title="Download Word document containing all AI teaching prompts for all subjects & grades"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Word Prompts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Class Quick-Filter Strip */}
      <div className="bg-[#F6F5F0] dark:bg-[#181C21] border-t border-[#DCDCD3] dark:border-[#323842] px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-[#4A5568] dark:text-[#A2A7B0] font-medium whitespace-nowrap">
            <span className="font-semibold text-[#1B2430] dark:text-[#EDEEE7]">Filter Classes:</span>
            {classesList.map(item => (
              <button
                key={item.id}
                id={`filter-class-${item.id}`}
                onClick={() => setSelectedClassFilter(item.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                  selectedClassFilter === item.id
                    ? `${item.badge} ${item.darkBadge} ring-2 ring-offset-1 ring-[#2F6F63] dark:ring-[#5EBAA4] dark:ring-offset-[#181C21] font-bold shadow-xs`
                    : 'bg-white dark:bg-[#21262D] text-[#4A5568] dark:text-[#A2A7B0] border-[#DCDCD3] dark:border-[#323842] hover:bg-[#EAE8DF] dark:hover:bg-[#2A313A]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#4A5568] dark:text-[#A2A7B0]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6F63] dark:text-[#5EBAA4]" />
            <span className="font-medium">CAPS & IEB Synced (Term {selectedTerm} • Week {selectedWeek})</span>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="border-t border-[#DCDCD3] dark:border-[#323842] px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#20252B]">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto">
          {navTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#2F6F63] dark:border-[#5EBAA4] text-[#1D453D] dark:text-[#92DAC8] bg-[#E6EFEA]/40 dark:bg-[#1A2E28]/50'
                    : 'border-transparent text-[#4A5568] dark:text-[#A2A7B0] hover:text-[#1B2430] dark:hover:text-[#EDEEE7] hover:bg-[#F6F5F0] dark:hover:bg-[#262C34]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#2F6F63] dark:text-[#5EBAA4]' : 'text-[#717885] dark:text-[#8E949F]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

