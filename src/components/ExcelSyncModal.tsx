import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Download,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TimetableSlot } from '../types';
import { parseAndPopulateUploadedExcel, ParseExcelResult } from '../utils/excelHandler';

interface ExcelSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTerm: number;
  currentWeek: number;
  onApplyImportedSlots: (slots: TimetableSlot[]) => void;
  onDownloadTemplateExcel: () => void;
}

export const ExcelSyncModal: React.FC<ExcelSyncModalProps> = ({
  isOpen,
  onClose,
  currentTerm,
  currentWeek,
  onApplyImportedSlots,
  onDownloadTemplateExcel,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseResult, setParseResult] = useState<ParseExcelResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    setIsProcessing(true);
    setParseResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      if (buffer) {
        const result = parseAndPopulateUploadedExcel(buffer, currentTerm, currentWeek);
        setParseResult(result);
      }
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setParseResult({
        success: false,
        slots: [],
        message: 'Could not read uploaded file.',
        matchedCount: 0,
      });
      setIsProcessing(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleApply = () => {
    if (parseResult && parseResult.success && parseResult.slots.length > 0) {
      onApplyImportedSlots(parseResult.slots);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Upload & Populate Excel Timetable
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Upload your Excel template (.xlsx, .xls) to automatically read timetable periods and sync them with CAPS ATP curriculum topics for Term {currentTerm} Week {currentWeek}.
          </p>
        </div>

        {/* Download Template Banner */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-800 block">Need the standard weekly timetable structure?</span>
            <span className="text-slate-500">Download the pre-formatted Excel master template.</span>
          </div>
          <button
            onClick={onDownloadTemplateExcel}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold rounded-xl transition-all shrink-0 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Master</span>
          </button>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-indigo-600 bg-indigo-50/50'
              : 'border-slate-300 hover:border-indigo-400 bg-slate-50/40 hover:bg-slate-50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            accept=".xlsx, .xls, .csv"
            className="hidden"
          />

          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="text-xs font-bold text-slate-800">
            {fileName ? fileName : 'Click to select or drag & drop Excel timetable'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Supports .xlsx, .xls, and .csv spreadsheet formats
          </p>
        </div>

        {/* Parse Feedback Status */}
        {isProcessing && (
          <div className="text-xs text-indigo-700 bg-indigo-50 p-3 rounded-xl border border-indigo-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
            <span>Analyzing timetable structure and correlating with CAPS ATP curriculum database...</span>
          </div>
        )}

        {parseResult && (
          <div
            className={`p-4 rounded-2xl text-xs space-y-2 border ${
              parseResult.success
                ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                : 'bg-red-50 text-red-950 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {parseResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{parseResult.success ? 'Timetable Parsed Successfully' : 'Parse Error'}</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">{parseResult.message}</p>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            disabled={!parseResult || !parseResult.success}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <span>Apply to Live Timetable</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
