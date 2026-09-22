import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Target, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Award, 
  Cpu, 
  Presentation, 
  MessageSquareText, 
  FileSpreadsheet, 
  Zap,
  Clock,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { LEARNING_MODELS } from '../data/learningModelsData';
import { LearningModel, LearningModelStage, GradeClass } from '../types';

interface LearningModelsHubProps {
  onNavigateToPlanner: (classId: GradeClass) => void;
  onNavigateToSlides: (classId: GradeClass) => void;
  onAskAIChat: (prompt: string) => void;
}

export const LearningModelsHub: React.FC<LearningModelsHubProps> = ({
  onNavigateToPlanner,
  onNavigateToSlides,
  onAskAIChat,
}) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('idmec-tech');
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-i');

  const currentModel: LearningModel = 
    LEARNING_MODELS.find(m => m.id === selectedModelId) || LEARNING_MODELS[0];

  // Auto-select first stage when model changes if current stage not found
  const currentStage: LearningModelStage = 
    currentModel.stages.find(s => s.id === selectedStageId) || currentModel.stages[0];

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId);
    const model = LEARNING_MODELS.find(m => m.id === modelId);
    if (model && model.stages.length > 0) {
      setSelectedStageId(model.stages[0].id);
    }
  };

  const getTargetClassForModel = (modelId: string): GradeClass => {
    if (modelId === 'idmec-tech') return '8A';
    if (modelId === 'context-mathlit') return '11';
    return '10';
  };

  return (
    <div className="space-y-6">
      {/* Trademark Banner */}
      <div className="bg-white dark:bg-[#20252B] rounded-2xl p-6 border border-[#DCDCD3] dark:border-[#323842] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2F6F63] to-[#1F4B43] dark:from-[#5EBAA4] dark:to-[#2F6F63] text-white dark:text-[#181C21] flex items-center justify-center shrink-0 shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-[#1B2430] dark:text-[#EDEEE7] tracking-tight font-serif">
                  Pedagogical Learning Models Hub
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 font-bold rounded-full bg-[#E6EFEA] dark:bg-[#1A2E28] text-[#1D453D] dark:text-[#92DAC8] border border-[#B8D8CD] dark:border-[#2E584D] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#2F6F63] dark:text-[#5EBAA4]" />
                  Trademark Instructional Core
                </span>
                <span className="text-[11px] px-2.5 py-0.5 font-semibold rounded-full bg-[#E8EEF5] dark:bg-[#1B2738] text-[#233A5C] dark:text-[#AFCBEA] border border-[#BDCDDF] dark:border-[#2F4463]">
                  CAPS &amp; IEB SAG Frameworks
                </span>
              </div>
              <p className="text-xs text-[#4A5568] dark:text-[#A2A7B0] mt-1 max-w-3xl leading-relaxed">
                Every lesson plan, slide presentation, worksheet question, and timetable period in this application is intentionally engineered around our flagship learning models. Rather than passive curriculum delivery, these frameworks transform classrooms into structured, inquiry-driven problem-solving workshops.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch lg:self-auto justify-end">
            <button
              id="model-ask-ai-overview-btn"
              onClick={() =>
                onAskAIChat(
                  `Explain how Mr. Mpofu's Learning Models (${currentModel.title}) should guide our upcoming 45-minute lesson and 90-minute double period delivery. Include practical tips for learner engagement and common mistakes to avoid.`
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#2F6F63] hover:bg-[#25574E] text-white shadow-xs transition-all cursor-pointer"
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>Ask AI About Model</span>
            </button>
          </div>
        </div>

        {/* Model Tabs Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {LEARNING_MODELS.map(model => {
            const isSelected = selectedModelId === model.id;
            return (
              <button
                key={model.id}
                id={`model-card-${model.id}`}
                onClick={() => handleSelectModel(model.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#E6EFEA]/60 dark:bg-[#1A2E28]/70 border-[#2F6F63] dark:border-[#5EBAA4] shadow-xs'
                    : 'bg-[#FAF9F5] dark:bg-[#181C21] border-[#DCDCD3] dark:border-[#323842] hover:bg-[#F0EEE6] dark:hover:bg-[#21262D]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F6F63] dark:text-[#5EBAA4]">
                      {model.subject}
                    </span>
                    <span className="text-[10px] text-[#717885] dark:text-[#8E949F]">
                      {model.targetGrades}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-[#1B2430] dark:text-[#EDEEE7]">
                    {model.title}
                  </h3>
                  <p className="text-[11px] text-[#4A5568] dark:text-[#A2A7B0] line-clamp-2 mt-1 leading-snug">
                    {model.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#DCDCD3]/60 dark:border-[#323842]/60 flex items-center justify-between text-[11px] font-medium text-[#2F6F63] dark:text-[#5EBAA4]">
                  <span>{model.stages.length} Pedagogical Stages</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Model Deep-Dive Canvas */}
      <div className="bg-white dark:bg-[#20252B] rounded-2xl p-6 border border-[#DCDCD3] dark:border-[#323842] shadow-xs space-y-6">
        {/* Model Title & Philosophical Foundation */}
        <div className="border-b border-[#DCDCD3] dark:border-[#323842] pb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1B2430] dark:text-[#EDEEE7] font-serif">
                  {currentModel.title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E6EFEA] dark:bg-[#1A2E28] text-[#1D453D] dark:text-[#92DAC8] font-semibold border border-[#B8D8CD] dark:border-[#2E584D]">
                  {currentModel.targetGrades}
                </span>
              </div>
              <p className="text-xs font-medium text-[#2F6F63] dark:text-[#5EBAA4] mt-0.5">
                {currentModel.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigateToPlanner(getTargetClassForModel(currentModel.id))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#252B33] border border-[#DCDCD3] dark:border-[#323842] hover:bg-[#F6F5F0] dark:hover:bg-[#2C333D] text-[#1B2430] dark:text-[#EDEEE7] cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#2F6F63] dark:text-[#5EBAA4]" />
                <span>Open in Lesson Planner</span>
              </button>
              <button
                onClick={() => onNavigateToSlides(getTargetClassForModel(currentModel.id))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#252B33] border border-[#DCDCD3] dark:border-[#323842] hover:bg-[#F6F5F0] dark:hover:bg-[#2C333D] text-[#1B2430] dark:text-[#EDEEE7] cursor-pointer"
              >
                <Presentation className="w-3.5 h-3.5 text-[#35507C] dark:text-[#87AADE]" />
                <span>Generate Model Slides</span>
              </button>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#717885] dark:text-[#8E949F] block mb-1">
              Philosophical &amp; Cognitive Anchor
            </span>
            <p className="text-xs text-[#1B2430] dark:text-[#EDEEE7] leading-relaxed italic">
              "{currentModel.philosophy}"
            </p>
          </div>
        </div>

        {/* Interactive Lifecycle Visualizer (Horizontal Steps / Flow) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#717885] dark:text-[#8E949F] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#2F6F63] dark:text-[#5EBAA4]" />
              <span>{currentModel.diagramTitle} (Click any stage to inspect)</span>
            </h4>
            <span className="text-[11px] text-[#2F6F63] dark:text-[#5EBAA4] font-semibold">
              Stage {currentStage.order} of {currentModel.stages.length}: {currentStage.name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {currentModel.stages.map((stage, idx) => {
              const isStageActive = selectedStageId === stage.id;
              return (
                <button
                  key={stage.id}
                  id={`stage-btn-${stage.id}`}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isStageActive
                      ? 'bg-[#2F6F63] text-white border-[#2F6F63] shadow-md ring-2 ring-offset-2 ring-[#2F6F63] dark:ring-[#5EBAA4] dark:ring-offset-[#20252B]'
                      : 'bg-[#F6F5F0] dark:bg-[#181C21] border-[#DCDCD3] dark:border-[#323842] text-[#1B2430] dark:text-[#EDEEE7] hover:bg-[#EAE8DF] dark:hover:bg-[#252B33]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isStageActive
                          ? 'bg-white text-[#2F6F63]'
                          : 'bg-white dark:bg-[#21262D] text-[#2F6F63] dark:text-[#5EBAA4] border border-[#DCDCD3] dark:border-[#323842]'
                      }`}
                    >
                      {stage.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        isStageActive ? 'text-white/80' : 'text-[#717885] dark:text-[#8E949F]'
                      }`}
                    >
                      Step {stage.order}
                    </span>
                  </div>

                  <div>
                    <h5
                      className={`font-bold text-xs mb-1 ${
                        isStageActive ? 'text-white' : 'text-[#1B2430] dark:text-[#EDEEE7]'
                      }`}
                    >
                      {stage.name}
                    </h5>
                    <p
                      className={`text-[10px] line-clamp-2 ${
                        isStageActive ? 'text-white/90' : 'text-[#4A5568] dark:text-[#A2A7B0]'
                      }`}
                    >
                      {stage.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Comprehensive Diagnostic & Didactic Canvas */}
        <div className="bg-[#FAF9F5] dark:bg-[#181C21] rounded-2xl p-5 border border-[#DCDCD3] dark:border-[#323842] space-y-5">
          {/* Header of Active Stage */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#DCDCD3] dark:border-[#323842] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2F6F63] dark:bg-[#5EBAA4] text-white dark:text-[#181C21] flex items-center justify-center font-bold text-sm">
                {currentStage.code}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[#1B2430] dark:text-[#EDEEE7]">
                    Stage {currentStage.order}: {currentStage.name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-[#252B33] border border-[#DCDCD3] dark:border-[#323842] text-[#4A5568] dark:text-[#A2A7B0]">
                    {currentStage.cognitiveLevel}
                  </span>
                </div>
                <p className="text-xs text-[#2F6F63] dark:text-[#5EBAA4] font-medium">
                  {currentStage.didacticGoal}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                onAskAIChat(
                  `Provide a detailed 10-minute classroom activity for Stage ${currentStage.order} (${currentStage.name}) of the ${currentModel.title} for ${currentModel.subject} ${currentModel.targetGrades}. Include verbatim teacher questions, expected student working, and an immediate check for understanding.`
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2F6F63] text-white hover:bg-[#25574E] cursor-pointer shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Generate Stage Activity</span>
            </button>
          </div>

          {/* Teacher vs Student Cognitive Role Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#21262D] p-4 rounded-xl border border-[#DCDCD3] dark:border-[#323842]">
              <div className="flex items-center gap-2 mb-2 font-bold text-xs text-[#2F6F63] dark:text-[#5EBAA4]">
                <GraduationCap className="w-4 h-4" />
                <span>Teacher Instructional Action &amp; Modeling:</span>
              </div>
              <p className="text-xs text-[#1B2430] dark:text-[#EDEEE7] leading-relaxed">
                {currentStage.teacherAction}
              </p>
            </div>

            <div className="bg-white dark:bg-[#21262D] p-4 rounded-xl border border-[#DCDCD3] dark:border-[#323842]">
              <div className="flex items-center gap-2 mb-2 font-bold text-xs text-[#35507C] dark:text-[#87AADE]">
                <Target className="w-4 h-4" />
                <span>Learner Cognitive &amp; Practical Execution:</span>
              </div>
              <p className="text-xs text-[#1B2430] dark:text-[#EDEEE7] leading-relaxed">
                {currentStage.learnerAction}
              </p>
            </div>
          </div>

          {/* Question Stems & Classroom Example */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Socratic Question Stems */}
            <div className="bg-white dark:bg-[#21262D] p-4 rounded-xl border border-[#DCDCD3] dark:border-[#323842] space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[#1B2430] dark:text-[#EDEEE7]">
                <HelpCircle className="w-4 h-4 text-[#B4791E] dark:text-[#D9A24B]" />
                <span>Verbatim Teacher Question Stems (Socratic Cold-Calling):</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#4A5568] dark:text-[#A2A7B0]">
                {currentStage.keyQuestionStems.map((stem, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-[#B4791E] dark:text-[#D9A24B] shrink-0">•</span>
                    <span className="italic">"{stem}"</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concrete Classroom Example */}
            <div className="bg-white dark:bg-[#21262D] p-4 rounded-xl border border-[#DCDCD3] dark:border-[#323842] space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-[#1B2430] dark:text-[#EDEEE7]">
                <Sparkles className="w-4 h-4 text-[#2F6F63] dark:text-[#5EBAA4]" />
                <span>Concrete South African Classroom Exemplar:</span>
              </div>
              <p className="text-xs text-[#1B2430] dark:text-[#EDEEE7] leading-relaxed">
                {currentStage.classroomExample}
              </p>
              <div className="pt-2 border-t border-[#DCDCD3] dark:border-[#323842] text-[11px] text-[#717885] dark:text-[#8E949F] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2F6F63] dark:text-[#5EBAA4]" />
                <span>Paced for immediate inclusion in daily 45m lesson or 90m double block.</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Misconception Buster & IEB Examiner Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Common Misconception */}
            <div className="bg-[#FFF8F0] dark:bg-[#241B12] p-4 rounded-xl border border-[#F4DEC6] dark:border-[#4B3620] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-xs text-[#9C5A14] dark:text-[#F3B367]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>High-Frequency Learner Misconception:</span>
              </div>
              <p className="text-xs text-[#6B3E0E] dark:text-[#E8BD8C] leading-relaxed">
                {currentStage.commonMisconception}
              </p>
            </div>

            {/* IEB Strategy */}
            <div className="bg-[#F0F5F4] dark:bg-[#152320] p-4 rounded-xl border border-[#C6DDD8] dark:border-[#25463E] space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-xs text-[#1D453D] dark:text-[#8AD1C0]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>IEB &amp; CAPS Examination Strategy:</span>
              </div>
              <p className="text-xs text-[#133F37] dark:text-[#B6E4D9] leading-relaxed">
                {currentStage.iebCapsStrategy}
              </p>
            </div>
          </div>
        </div>

        {/* Model Impact & Evaluation Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842]">
            <h5 className="font-bold text-xs text-[#1B2430] dark:text-[#EDEEE7] mb-2 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#2F6F63] dark:text-[#5EBAA4]" />
              <span>Instructional &amp; Classroom Impact:</span>
            </h5>
            <ul className="space-y-1.5 text-xs text-[#4A5568] dark:text-[#A2A7B0]">
              {currentModel.classroomImpact.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2F6F63] dark:text-[#5EBAA4] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF9F5] dark:bg-[#181C21] border border-[#DCDCD3] dark:border-[#323842]">
            <h5 className="font-bold text-xs text-[#1B2430] dark:text-[#EDEEE7] mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#35507C] dark:text-[#87AADE]" />
              <span>Quality Assurance &amp; Moderation Criteria:</span>
            </h5>
            <ul className="space-y-1.5 text-xs text-[#4A5568] dark:text-[#A2A7B0]">
              {currentModel.evaluationCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#35507C] dark:text-[#87AADE] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
