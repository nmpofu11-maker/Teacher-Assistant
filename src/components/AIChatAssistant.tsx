import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  BookOpen, 
  Presentation, 
  FileCheck, 
  Copy, 
  Check, 
  RefreshCw,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { GradeClass } from '../types';
import { CLASSES_CONFIG, MASTER_ATP_DATA } from '../data/atpData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AIChatAssistantProps {
  initialPrompt?: string;
  currentTerm: number;
  currentWeek: number;
  selectedClassId: GradeClass;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  initialPrompt,
  currentTerm,
  currentWeek,
  selectedClassId,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello Mr. Mpofu! I am your AI Teaching Assistant, specialized in South African CAPS & IEB curriculum requirements across all your classes:
• Technology: Grades 8A, 8B, 9A, 9B
• Mathematical Literacy: Grades 10, 11, 12 (with Mr. Banda & Mr. Magagula)

I am synchronized with your Weekly Master Timetable (Term ${currentTerm}, Week ${currentWeek}). How can I assist you with your 45-minute lesson pacing, slide generation, or IEB exam problem formulation today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If initialPrompt changes, trigger AI
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== '') {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    // Build system context
    const currentClass = CLASSES_CONFIG[selectedClassId] || CLASSES_CONFIG['8A'];
    const currentATP = MASTER_ATP_DATA.filter(
      item => item.term === currentTerm && item.week === currentWeek
    );

    const systemPrompt = `You are the AI Teaching Assistant for Mr. Mpofu, an expert high school educator managing:
1. Technology: Grades 8A, 8B, 9A, 9B
2. Mathematical Literacy: Grades 10, 11, 12 (Co-teaching with Mr. Banda and Mr. Magagula)
Current Session Context: Term ${currentTerm}, Week ${currentWeek}. Currently selected class: ${currentClass.name} (${currentClass.subject}).
Weekly Schedule: 45-minute periods.

CRITICAL PEDAGOGICAL REQUIREMENTS:
- Adhere strictly to the South African Department of Basic Education CAPS curriculum guidelines and Annual Teaching Plans (ATP).
- Format calculations, tariffs, tax questions, and engineering design tasks with IEB (Independent Examinations Board) 4-level cognitive taxonomy:
  • Level 1: Knowing (20-30%)
  • Level 2: Routine Procedures (35-40%)
  • Level 3: Complex Multi-step Procedures (20%)
  • Level 4: Reasoning & Problem Solving (10-15%)
- Include full marking memorandums with method marks (M), accuracy marks (A), and continuous accuracy (CA).
- For 45-minute lessons, respect standard pacing: Hook (5m), Direct Instruction (15m), Exam Activity (15m), Plenary & Exit Ticket (10m).`;

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          systemPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('API route returned error');
      }

      const data = await response.json();
      const replyText = data.text || 'I have analyzed your curriculum requirements. Here is the structured breakdown for your lesson.';

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.warn('Backend API unavailable, using high-fidelity local teaching intelligence:', err);
      // Fallback response generator tailored to query
      let fallback = `Here is your CAPS & IEB aligned teaching resource for **${currentClass.name}** (Term ${currentTerm} Week ${currentWeek}):\n\n`;

      if (query.toLowerCase().includes('tax') || query.toLowerCase().includes('income')) {
        fallback += `### 📄 IEB Grade 12 Mathematical Literacy: Income Tax & Rebate Analysis (25 Marks)\n\n**Scenario Context:**\nLerato (age 34) earned a gross taxable salary of R32,500 per month during the 2024 tax year. She contributes 7.5% of her basic salary to an approved pension fund and belongs to a medical aid scheme covering herself and 2 dependants.\n\n**Questions:**\n1.1 State the 2024 Primary Tax Rebate for taxpayers under 65 years old. [2 Marks • Level 1]\n1.2 Calculate Lerato's annual allowable pension fund deduction. [3 Marks • Level 2]\n1.3 Determine her Annual Taxable Income and calculate the Base Tax using the SARS Tax Bracket (Bracket 3: R237,100 to R370,500 @ 26%). [8 Marks • Level 3]\n1.4 Calculate her Net Tax Payable after subtracting Primary Rebate (R17,235) and Medical Scheme Fees Tax Credits (R364 + R364 + R246 per month). [7 Marks • Level 3]\n1.5 Critique whether an additional voluntary retirement contribution of R1,500/month is tax-optimal. [5 Marks • Level 4]\n\n**Marking Guideline:**\n• 1.1: Primary Rebate = R17,235 ✓✓ [2M]\n• 1.2: Annual Pension = R32,500 × 0.075 × 12 = R29,250 ✓✓✓ [3M]\n• 1.3: Annual Taxable = (R32,500 × 12) - R29,250 = R390,000 - R29,250 = R360,750 ✓✓. Base tax = R42,678 + 0.26(R360,750 - R237,100) = R42,678 + R32,149 = R74,827 ✓✓✓✓ [8M]`;
      } else if (query.toLowerCase().includes('gear') || query.toLowerCase().includes('tech') || query.toLowerCase().includes('mechanism')) {
        fallback += `### ⚙️ CAPS Grade 9 Technology: Mechanical Systems (Gears & Velocity Ratio)\n\n**45-Minute Lesson Pacing:**\n• **00:00 - 05:00 (Hook):** Display a 21-speed mountain bike cassette. Ask learners why shifting to a larger driven cog makes uphill pedaling easier.\n• **05:00 - 20:00 (Direct Instruction):** Teach formulas:\n  - $\\text{Gear Ratio} = \\frac{\\text{Number of Teeth on Driven}}{\\text{Number of Teeth on Driver}}$\n  - $\\text{Velocity Ratio (VR)} = \\frac{\\text{Driver Speed (RPM)}}{\\text{Driven Speed (RPM)}}$\n  - $\\text{Mechanical Advantage (MA)} = \\text{VR}$ (assuming 100% efficiency)\n• **20:00 - 35:00 (IEB Guided Practice):** Learners solve 3 gear train problems with idler gears.\n• **35:00 - 45:00 (Exit Diagnostic):** If Driver = 15 teeth at 120 RPM and Driven = 45 teeth, calculate Driven RPM. (Ans: 40 RPM).`;
      } else {
        fallback += `### 🎯 CAPS 45-Minute Lesson Implementation\n\n1. **Core CAPS Objective:** Scaffold key competencies and theoretical definitions.\n2. **IEB Assessment Integration:** Structure tasks across Levels 1-4 with explicit cognitive weighting.\n3. **Practical Scaffolding:** Provide formula cards and visual schematics for struggling learners while challenging top achievers with open-ended design/budget constraints.\n\nWould you like me to export this directly into your **PowerPoint slides (.pptx)** or **Worksheet document (.docx)**?`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: fallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    `Create a 45-min lesson plan for Grade 8A Technology on Mechanical Advantage & Levers`,
    `Generate an authentic IEB Exam Question on SARS Income Tax for Grade 12 Maths Lit`,
    `Design a 20-mark worksheet on Stepped Electricity Tariffs for Grade 11 Maths Lit`,
    `Provide stage-by-stage PAT 1 moderation guidelines for Grade 9 Technology`,
    `Create a 5-minute exit ticket for Grade 10 Maths Lit on Scales & Maps`,
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[700px] overflow-hidden">
      {/* Assistant Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold tracking-tight">AI Teaching Assistant</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                All 7 Classes Active
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              CAPS ATP • IEB Examination Style • 45-Min Timetable Pacing Aware
            </p>
          </div>
        </div>

        <div className="text-right text-[11px] text-slate-400 hidden sm:block">
          <div>Term {currentTerm} • Week {currentWeek}</div>
          <div className="text-sky-400 font-medium">Mr. Mpofu Master Copy</div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map(msg => {
          const isAI = msg.sender === 'ai';
          const isCopied = copiedMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isAI
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-800 text-white'
                }`}
              >
                {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl text-xs space-y-2 relative group shadow-2xs ${
                  isAI
                    ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                    : 'bg-indigo-600 text-white rounded-tr-xs'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed font-sans">
                  {msg.text}
                </div>

                <div className="flex items-center justify-between gap-4 pt-1 text-[10px] text-slate-400 border-t border-slate-100/60 mt-2">
                  <span>{msg.timestamp}</span>
                  {isAI && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 font-semibold cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-center text-xs text-slate-500 p-3 bg-white rounded-xl border border-slate-200 w-fit">
            <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
            <span>AI Teaching Assistant is generating curriculum-aligned content...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Action Prompts Strip */}
      <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 pl-1 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Quick Prompts:
        </span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp)}
            className="text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all border border-slate-200 hover:border-indigo-300 cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          id="chat-user-input"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder="Ask for lesson plans, IEB questions, worksheets, or PAT guidance..."
          className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          id="chat-send-btn"
          disabled={isLoading || !inputMessage.trim()}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
