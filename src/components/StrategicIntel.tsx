import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  Brain, 
  CheckCircle, 
  Award, 
  Sparkles, 
  ChevronRight, 
  Lightbulb, 
  HelpCircle, 
  Target, 
  AlertTriangle,
  Zap,
  Bookmark,
  CheckSquare,
  Square,
  Trash2,
  PlusCircle,
  RotateCcw
} from "lucide-react";

export default function StrategicIntel() {
  const [activeLesson, setActiveLesson] = useState<"smart-thinker" | "smart-strategies" | "learn-mistakes" | "time-management">("smart-thinker");

  // Lesson 1 Interactive States
  const [thinkerChecklist, setThinkerChecklist] = useState<Record<string, boolean>>(() => {
    const cached = localStorage.getItem("intel_thinker_checklist");
    return cached ? JSON.parse(cached) : {
      readCarefully: false,
      identifyType: false,
      selectStrategy: false,
      checkAnswer: false,
      confident: false,
    };
  });

  const [personalGoal, setPersonalGoal] = useState<string>(() => {
    return localStorage.getItem("intel_personal_goal") || "";
  });

  // Lesson 2 Interactive States
  const [strategyToolbox, setStrategyToolbox] = useState<Record<string, boolean>>(() => {
    const cached = localStorage.getItem("intel_strategy_toolbox");
    return cached ? JSON.parse(cached) : {
      patterns: false,
      diagram: false,
      eliminate: false,
      backwards: false,
      skipReturn: false,
      breakSmaller: false,
      reRead: false,
      checkAnswer: false,
    };
  });

  const [strategyGoal, setStrategyGoal] = useState<string>(() => {
    return localStorage.getItem("intel_strategy_goal") || "";
  });

  // Lesson 3 Interactive States (Learn from Mistakes)
  const [mistakeChecklist, setMistakeChecklist] = useState<Record<string, boolean>>(() => {
    const cached = localStorage.getItem("intel_mistake_checklist");
    return cached ? JSON.parse(cached) : {
      guessed: false,
      readQuickly: false,
      misunderstood: false,
      forgotMethod: false,
      gotConfused: false,
      ranOutTime: false,
      carelessError: false,
    };
  });

  const [mistakeBook, setMistakeBook] = useState<Array<{ id: string; question: string; type: string; reason: string; strategy: string }>>(() => {
    const cached = localStorage.getItem("intel_mistake_book");
    return cached ? JSON.parse(cached) : [
      { id: "1", question: "In a number series, what comes after 2, 4, 8?", type: "Careless Mistakes ⚠️", reason: "I guessed 10 without looking for the multiplication rule.", strategy: "Check differences and look for multiplication/squares" },
      { id: "2", question: "Finding the mirror image of a clock at 3:15", type: "Concept Mistakes 📚", reason: "I didn't know the 11:60 subtraction shortcut.", strategy: "Subtract the time from 11:60 to get the exact reflection (8:45)." }
    ];
  });

  // New mistake entry inputs
  const [newQuestion, setNewQuestion] = useState("");
  const [newType, setNewType] = useState("Careless Mistakes ⚠️");
  const [newReason, setNewReason] = useState("");
  const [newStrategy, setNewStrategy] = useState("");

  // Lesson 4 Interactive States (Time Management)
  const [timeChecklist, setTimeChecklist] = useState<Record<string, boolean>>(() => {
    const cached = localStorage.getItem("intel_time_checklist");
    return cached ? JSON.parse(cached) : {
      easyFirst: false,
      notStuck: false,
      skipReturn: false,
      watchTime: false,
      stayCalm: false,
      reviewEnd: false,
    };
  });

  // Game: Question Classifier Challenge
  const [currentClassifierQuestion, setCurrentClassifierQuestion] = useState(0);
  const [selectedClassification, setSelectedClassification] = useState<string | null>(null);
  const [classifierFeedback, setClassifierFeedback] = useState<string | null>(null);

  const classifierQuestions = [
    {
      question: "A very complicated 4-step blood relation puzzle with 7 family members.",
      correct: "red",
      feedback: "Perfect! This is a Red Question 🔴. It takes way too much time to draw. Skip immediately and return to it ONLY at the very end if you have spare time!"
    },
    {
      question: "A simple number series: 5, 10, 15, 20, ?",
      correct: "green",
      feedback: "Awesome! This is a Green Question 🟢. You can write 25 within 5 seconds. Answer it immediately to secure high-speed marks!"
    },
    {
      question: "A standard direction puzzle with 3 turns that requires drawing a quick compass diagram.",
      correct: "yellow",
      feedback: "Excellent! This is a Yellow Question 🟡. You know exactly how to solve it, but it requires drawing and will take 45 seconds. Attempt in Round 2!"
    }
  ];

  // Persist interactive state
  useEffect(() => {
    localStorage.setItem("intel_thinker_checklist", JSON.stringify(thinkerChecklist));
  }, [thinkerChecklist]);

  useEffect(() => {
    localStorage.setItem("intel_personal_goal", personalGoal);
  }, [personalGoal]);

  useEffect(() => {
    localStorage.setItem("intel_strategy_toolbox", JSON.stringify(strategyToolbox));
  }, [strategyToolbox]);

  useEffect(() => {
    localStorage.setItem("intel_strategy_goal", strategyGoal);
  }, [strategyGoal]);

  useEffect(() => {
    localStorage.setItem("intel_mistake_checklist", JSON.stringify(mistakeChecklist));
  }, [mistakeChecklist]);

  useEffect(() => {
    localStorage.setItem("intel_mistake_book", JSON.stringify(mistakeBook));
  }, [mistakeBook]);

  useEffect(() => {
    localStorage.setItem("intel_time_checklist", JSON.stringify(timeChecklist));
  }, [timeChecklist]);

  const toggleThinkerChecklist = (key: string) => {
    setThinkerChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleStrategyToolbox = (key: string) => {
    setStrategyToolbox(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMistakeChecklist = (key: string) => {
    setMistakeChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleTimeChecklist = (key: string) => {
    setTimeChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addMistakeLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newReason.trim() || !newStrategy.trim()) return;
    
    const newEntry = {
      id: Date.now().toString(),
      question: newQuestion,
      type: newType,
      reason: newReason,
      strategy: newStrategy
    };
    
    setMistakeBook(prev => [newEntry, ...prev]);
    setNewQuestion("");
    setNewReason("");
    setNewStrategy("");
  };

  const deleteMistakeLog = (id: string) => {
    setMistakeBook(prev => prev.filter(item => item.id !== id));
  };

  const thinkerChecklistItems = [
    { key: "readCarefully", text: "I read the question carefully." },
    { key: "identifyType", text: "I identified the question type." },
    { key: "selectStrategy", text: "I selected a strategy." },
    { key: "checkAnswer", text: "I checked my answer." },
    { key: "confident", text: "I am confident about my answer." },
  ];

  const personalGoals = [
    "I will read every question carefully.",
    "I will avoid careless mistakes.",
    "I will not guess immediately.",
    "I will try two strategies if stuck.",
    "I will check my answers before submitting."
  ];

  const strategyToolboxItems = [
    { key: "patterns", text: "Look for patterns" },
    { key: "diagram", text: "Draw a diagram" },
    { key: "eliminate", text: "Eliminate wrong options" },
    { key: "backwards", text: "Work backwards" },
    { key: "skipReturn", text: "Skip and return later" },
    { key: "breakSmaller", text: "Break the problem into smaller parts" },
    { key: "reRead", text: "Re-read the question" },
    { key: "checkAnswer", text: "Check your answer" },
  ];

  const strategyGoals = [
    "Read every question carefully.",
    "Draw diagrams whenever needed.",
    "Eliminate wrong options before guessing.",
    "Skip difficult questions and return later.",
    "Check all answers before submission."
  ];

  const mistakeChecklistItems = [
    { key: "guessed", text: "I guessed without solving" },
    { key: "readQuickly", text: "I read the question too quickly" },
    { key: "misunderstood", text: "I misunderstood what was being asked" },
    { key: "forgotMethod", text: "I forgot the exact concept/method" },
    { key: "gotConfused", text: "I got confused by tricky options" },
    { key: "ranOutTime", text: "I ran out of time/rushed" },
    { key: "carelessError", text: "I made a careless calculation mistake" }
  ];

  const timeChecklistItems = [
    { key: "easyFirst", text: "Solve easy questions first 🟢" },
    { key: "notStuck", text: "Do not get stuck on hard questions 🟡" },
    { key: "skipReturn", text: "Skip difficult tasks and return later ⏭️" },
    { key: "watchTime", text: "Keep an eye on the exam timer ⏰" },
    { key: "stayCalm", text: "Stay calm and focused 🧘" },
    { key: "reviewEnd", text: "Review unanswered questions at the end 🔍" }
  ];

  // Calculate total progress
  const thinkerCheckedCount = Object.values(thinkerChecklist).filter(Boolean).length;
  const strategyCheckedCount = Object.values(strategyToolbox).filter(Boolean).length;
  const mistakeCheckedCount = Object.values(mistakeChecklist).filter(Boolean).length;
  const timeCheckedCount = Object.values(timeChecklist).filter(Boolean).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto" id="strategic-intel-root">
      
      {/* Visual Header */}
      <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border-2 border-indigo-500/20">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-[10px] font-black uppercase tracking-widest">
              <Brain className="w-3.5 h-3.5" />
              Strategic Mindset
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight">Strategic Intel</h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
              Unlock the secrets of NMMS Mental Ability toppers! Learn how to think, analyze, and use magical strategy maps to solve logic puzzles flawlessly.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-4 self-stretch md:self-auto justify-between sm:justify-start">
            <div className="text-left">
              <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">Strategic Level</p>
              <h4 className="text-sm font-black font-display text-white">
                {activeLesson === "smart-thinker" && "Smart Thinker 🎓"}
                {activeLesson === "smart-strategies" && "Strategy Master 🧰"}
                {activeLesson === "learn-mistakes" && "Mistake Detective 🕵️"}
                {activeLesson === "time-management" && "Time Champ ⏱️"}
              </h4>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/25">
              {activeLesson === "smart-thinker" && "🧠"}
              {activeLesson === "smart-strategies" && "⚡"}
              {activeLesson === "learn-mistakes" && "📒"}
              {activeLesson === "time-management" && "⏳"}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Selector Tabs */}
      <div className="bg-violet-50/70 p-1.5 rounded-2xl border border-violet-100 shadow-inner grid grid-cols-2 md:grid-cols-4 gap-1.5">
        <button
          onClick={() => setActiveLesson("smart-thinker")}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl font-black font-display text-[10px] sm:text-xs transition-all ${
            activeLesson === "smart-thinker"
              ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-150 scale-[1.01]"
              : "text-indigo-950/70 hover:text-indigo-900 hover:bg-white/50"
          }`}
        >
          <Brain className="w-3.5 h-3.5 shrink-0" />
          <span>L1: Thinker</span>
        </button>
        <button
          onClick={() => setActiveLesson("smart-strategies")}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl font-black font-display text-[10px] sm:text-xs transition-all ${
            activeLesson === "smart-strategies"
              ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-150 scale-[1.01]"
              : "text-indigo-950/70 hover:text-indigo-900 hover:bg-white/50"
          }`}
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span>L2: Strategies</span>
        </button>
        <button
          onClick={() => setActiveLesson("learn-mistakes")}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl font-black font-display text-[10px] sm:text-xs transition-all ${
            activeLesson === "learn-mistakes"
              ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-150 scale-[1.01]"
              : "text-indigo-950/70 hover:text-indigo-900 hover:bg-white/50"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span>L3: Mistakes</span>
        </button>
        <button
          onClick={() => setActiveLesson("time-management")}
          className={`flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl font-black font-display text-[10px] sm:text-xs transition-all ${
            activeLesson === "time-management"
              ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-150 scale-[1.01]"
              : "text-indigo-950/70 hover:text-indigo-900 hover:bg-white/50"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 shrink-0" />
          <span>L4: Time</span>
        </button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl border-2 border-violet-100/50 shadow-md overflow-hidden p-6 sm:p-8 space-y-8">
        
        {activeLesson === "smart-thinker" && (
          /* Smart Thinker Lesson */
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-black text-indigo-950 flex items-center gap-2">
                <span className="text-2xl">🧠</span> Become a Smart Thinker
              </h3>
              <p className="text-indigo-600 font-extrabold text-xs tracking-wider uppercase">Metacognition & Self-Checking Guide</p>
            </div>

            <hr className="border-gray-100" />

            {/* Metacognition Explainer */}
            <div className="bg-indigo-50/40 rounded-2xl p-5 border border-indigo-100/40 space-y-4">
              <h4 className="font-display font-extrabold text-indigo-950 text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-indigo-500 animate-pulse" />
                What is Metacognition?
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Metacognition means <strong className="text-indigo-900 font-black">"thinking about your thinking."</strong>
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Smart learners do not simply solve questions. They continuously ask themselves:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-2">
                {[
                  "What is this question asking?",
                  "Do I understand it?",
                  "Which strategy should I use?",
                  "Am I making a mistake?",
                  "Does my answer make sense?"
                ].map((q, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-3 py-2.5 rounded-xl border-2 border-indigo-50/50 shadow-3xs hover:scale-[1.02] transition-transform">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-black">{idx + 1}</span>
                    {q}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-indigo-600 font-black bg-white/80 border border-indigo-100/30 rounded-xl p-3 mt-2 shadow-2xs">
                📊 Research shows that students who regularly think about their thinking learn faster and score higher!
              </p>
            </div>

            {/* Three Golden Steps */}
            <div className="space-y-4">
              <h4 className="font-display font-black text-indigo-950 text-base">The Three Golden Steps of Smart Thinking</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="border-2 border-violet-100/50 hover:border-violet-300 rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3 relative overflow-hidden bg-gradient-to-b from-white to-violet-50/20">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-3xl flex items-center justify-center text-xs font-black text-blue-500">
                    Step 1
                  </div>
                  <h5 className="font-display font-bold text-indigo-950 text-sm flex items-center gap-1.5">
                    1. PLAN 📝
                  </h5>
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Before Solving</p>
                  <p className="text-xs text-gray-600 leading-relaxed">Before attempting a question, ask yourself:</p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-semibold pl-1">
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Have I understood the question?</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> What type of question is this?</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Which strategy should I use?</li>
                  </ul>
                  <div className="pt-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Strategies:</span>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-1">Look for a pattern, draw a diagram, eliminate wrong options, solve easy parts first, or work backwards.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="border-2 border-violet-100/50 hover:border-violet-300 rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3 relative overflow-hidden bg-gradient-to-b from-white to-violet-50/20">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-3xl flex items-center justify-center text-xs font-black text-amber-500">
                    Step 2
                  </div>
                  <h5 className="font-display font-bold text-indigo-950 text-sm flex items-center gap-1.5">
                    2. MONITOR 🔍
                  </h5>
                  <p className="text-xs text-amber-500 font-bold uppercase tracking-wider">While Solving</p>
                  <p className="text-xs text-gray-600 leading-relaxed">Keep checking yourself while solving. Ask:</p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-semibold pl-1">
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Am I following the correct method?</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Am I solving too quickly?</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Am I getting confused?</li>
                  </ul>
                  <div className="pt-2">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Stuck &gt; 1 min?</span>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-1">Pause. Reread the question carefully. Try another approach!</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="border-2 border-violet-100/50 hover:border-violet-300 rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3 relative overflow-hidden bg-gradient-to-b from-white to-violet-50/20">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-bl-3xl flex items-center justify-center text-xs font-black text-indigo-500">
                    Step 3
                  </div>
                  <h5 className="font-display font-bold text-indigo-950 text-sm flex items-center gap-1.5">
                    3. REFLECT 💡
                  </h5>
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">After Solving</p>
                  <p className="text-xs text-gray-600 leading-relaxed">After answering, ask yourself:</p>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-semibold pl-1">
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> Is my answer reasonable?</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> Did I guess the solution?</li>
                    <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> What mistake did I make?</li>
                  </ul>
                  <div className="pt-2">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">The Core Rule:</span>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-1">Every mistake is an opportunity to learn, correct, and improve!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart Thinker Checklist - Interactive */}
            <div className="border border-indigo-100 rounded-2xl p-6 bg-slate-50/60 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-black text-indigo-950 text-sm flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                    The SMART THINKER Checklist
                  </h4>
                  <p className="text-[11px] text-gray-500">Before pressing Submit, quickly check:</p>
                </div>
                <span className="bg-indigo-100 text-indigo-800 font-black px-2.5 py-1 rounded-md text-[10px]">
                  {thinkerCheckedCount}/5 Checked
                </span>
              </div>
              <div className="space-y-2 bg-white rounded-xl p-4 border border-gray-100">
                {thinkerChecklistItems.map(item => {
                  const isChecked = thinkerChecklist[item.key];
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleThinkerChecklist(item.key)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 text-left transition-all"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-300" />
                      )}
                      <span className={`text-xs font-semibold ${isChecked ? "text-indigo-900 line-through decoration-indigo-300" : "text-gray-700"}`}>
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
              {thinkerCheckedCount === 5 && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-3 text-xs font-bold flex items-center gap-2 animate-bounce">
                  🏆 Superb! You are following the exact habits of high-scoring logic minds!
                </div>
              )}
            </div>

            {/* Common Thinking Mistakes */}
            <div className="space-y-4">
              <h4 className="font-black text-gray-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                Common Thinking Mistakes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "1. Rushing", wrong: "Reading too quickly.", right: "Read carefully." },
                  { title: "2. Guessing Without Thinking", wrong: "Randomly selecting an option.", right: "Eliminate wrong options first." },
                  { title: "3. Giving Up Too Early", wrong: '"I can\'t do this."', right: "Try another strategy." },
                  { title: "4. Not Checking Answers", wrong: "Submitting immediately.", right: "Recheck important steps." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-4 space-y-2">
                    <h5 className="font-extrabold text-xs text-gray-900">{item.title}</h5>
                    <div className="space-y-1">
                      <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                        <span>❌</span> {item.wrong}
                      </p>
                      <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <span>✔</span> {item.right}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Good Learners Table */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-3xs bg-white">
              <div className="bg-indigo-900 text-white p-3 text-xs font-black tracking-wider uppercase">
                Good Learners Always Ask:
              </div>
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                <div className="p-4 text-center space-y-1">
                  <span className="text-[10px] bg-slate-100 font-black uppercase text-slate-500 px-2 py-0.5 rounded-md">Before</span>
                  <p className="text-xs font-bold text-gray-800">"What should I do?"</p>
                </div>
                <div className="p-4 text-center space-y-1">
                  <span className="text-[10px] bg-indigo-50 font-black uppercase text-indigo-500 px-2 py-0.5 rounded-md">During</span>
                  <p className="text-xs font-bold text-gray-800">"Am I doing it correctly?"</p>
                </div>
                <div className="p-4 text-center space-y-1">
                  <span className="text-[10px] bg-emerald-50 font-black uppercase text-emerald-500 px-2 py-0.5 rounded-md">After</span>
                  <p className="text-xs font-bold text-gray-800">"What did I learn?"</p>
                </div>
              </div>
            </div>

            {/* Personal Thinking Goal Selector - Interactive */}
            <div className="border border-indigo-100 rounded-2xl p-6 bg-indigo-50/20 space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <div>
                  <h4 className="font-black text-indigo-950 text-sm">My Personal Thinking Goal</h4>
                  <p className="text-xs text-gray-500">Choose one goal for today's practice:</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {personalGoals.map((goal, idx) => {
                  const isSelected = personalGoal === goal;
                  return (
                    <button
                      key={idx}
                      onClick={() => setPersonalGoal(goal)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        isSelected 
                          ? "bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-100" 
                          : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isSelected ? "bg-white text-indigo-600" : "bg-gray-100 text-gray-500"}`}>
                          {isSelected ? "✔" : idx + 1}
                        </span>
                        {goal}
                      </div>
                    </button>
                  );
                })}
              </div>

              {personalGoal && (
                <div className="bg-indigo-100 text-indigo-950 px-4 py-3 rounded-xl border border-indigo-200 text-xs font-bold">
                  🎯 My Focus Goal: <span className="underline font-black">{personalGoal}</span>. Let's practice with this in mind!
                </div>
              )}
            </div>

            {/* Reflection Quote banner */}
            <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-2xl p-5 text-center text-white space-y-1.5">
              <span className="text-xl">🌟</span>
              <p className="font-bold italic text-sm">"Great thinkers are not those who never make mistakes. Great thinkers are those who learn from every mistake."</p>
            </div>
          </div>
        )}

        {activeLesson === "smart-strategies" && (
          /* Smart Strategies Lesson */
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                <span className="text-2xl">⚡</span> Smart Strategies
              </h3>
              <p className="text-indigo-600 font-extrabold text-xs tracking-wider uppercase">Work Smarter, Not Harder</p>
            </div>

            <hr className="border-gray-100" />

            {/* Smart Strategies Intro */}
            <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100/50 space-y-4">
              <h4 className="font-extrabold text-indigo-950 text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-indigo-500" />
                "Work Smarter, Not Harder"
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Many students believe that toppers solve every question because they are naturally intelligent. This is not true.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Successful students use smart strategies. These strategies help them solve questions faster, avoid mistakes, and score more marks.
              </p>
              <div className="p-3 bg-white border border-indigo-100 rounded-xl space-y-1">
                <span className="text-xs font-black text-indigo-600 uppercase">Why Use Strategies?</span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Imagine going on a journey without a map. You may eventually reach your destination, but it will take longer and you may get lost. Strategies are like maps for your brain.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {["Solve faster ⚡", "Reduce mistakes 🎯", "Save time ⏱️", "Improve confidence 🌟"].map((v, idx) => (
                    <span key={idx} className="bg-indigo-50 text-indigo-700 font-extrabold text-[10px] py-1 px-2 rounded-md text-center border border-indigo-100">{v}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* List of Strategies */}
            <div className="space-y-4">
              <h4 className="font-black text-gray-900 text-base">Key Strategic Maps</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Strategy 1 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all space-y-2">
                  <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600">1</span>
                    Strategy 1: Read Carefully 🔍
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Many students lose marks not because they don't know the answer, but because they read the question carelessly.
                  </p>
                  <p className="text-xs font-bold text-gray-800">Smart Thinkers:</p>
                  <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                    <li>Read the entire question.</li>
                    <li>Underline important words mentally.</li>
                    <li>Identify exactly what is being asked.</li>
                  </ul>
                  <div className="bg-rose-50/50 border border-rose-100 p-2 rounded-lg text-[10px] text-gray-600">
                    <span className="text-rose-600 font-bold">⚠️ Example:</span> Reading "brother" as "father" or "clockwise" as "anticlockwise."
                  </div>
                </div>

                {/* Strategy 2 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all space-y-2">
                  <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600">2</span>
                    Strategy 2: Identify Question Type 🏷️
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Before solving, ask: <span className="font-bold text-indigo-900">"What kind of question is this?"</span>
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {["Number Series", "Coding-Decoding", "Blood Relations", "Direction Sense", "Figure Reasoning", "Analogy"].map((type, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[9px] font-bold py-0.5 px-1.5 rounded-md border border-slate-200">{type}</span>
                    ))}
                  </div>
                  <p className="text-[11px] text-indigo-600 font-bold">Once you identify the type, your brain automatically recalls the correct method.</p>
                </div>

                {/* Strategy 3 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all space-y-2">
                  <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600">3</span>
                    Strategy 3: Look for Patterns 👀
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Many NMMS questions are based on hidden patterns. Ask yourself:
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                    <li>Are numbers increasing? Or decreasing?</li>
                    <li>Are differences changing? Or shapes rotating?</li>
                  </ul>
                  <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-lg text-[10px] text-slate-700 font-mono">
                    <span className="text-emerald-700 font-bold">Example:</span> 2, 4, 8, 16, ? <br />
                    <strong>Pattern:</strong> ×2 &nbsp; | &nbsp; <strong>Answer:</strong> 32
                  </div>
                </div>

                {/* Strategy 4 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all space-y-2">
                  <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600">4</span>
                    Strategy 4: Draw Diagrams ✏️
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Some questions become much easier when drawn. Especially useful for:
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-indigo-50/50 text-indigo-700 text-[10px] font-bold p-1 rounded-md border border-indigo-100">Blood Relations 👩‍👩‍👦</span>
                    <span className="bg-indigo-50/50 text-indigo-700 text-[10px] font-bold p-1 rounded-md border border-indigo-100">Direction Sense 🧭</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Instead of remembering complex relationships in your mind, draw a small family tree. A picture saves critical test-taking time!
                  </p>
                </div>

                {/* Strategy 5 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all space-y-2">
                  <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600">5</span>
                    Strategy 5: Eliminate Wrong Options ❌
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    If you are unsure, don't guess immediately. Remove options that are clearly mathematically or logically impossible first!
                  </p>
                  <div className="bg-blue-50 text-blue-800 p-2 rounded-lg text-[10px] font-bold">
                    💡 If two options are impossible, eliminate them. Now your chances of guessing correctly double from 25% to 50%!
                  </div>
                </div>

                {/* Strategy 6 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all space-y-2">
                  <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600">6</span>
                    Strategy 6: Work Backwards ↩️
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Sometimes the multiple choice options themselves provide key clues. Start from the options and check which one satisfies the question rules.
                  </p>
                  <span className="text-[10px] text-gray-500 uppercase font-black">Best for:</span>
                  <p className="text-xs text-gray-500">Number puzzles, missing terms, and equations.</p>
                </div>

                {/* Strategy 7 */}
                <div className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all space-y-2 md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600">7</span>
                        Strategy 7: Skip and Return ⏭️
                      </h5>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Smart students do not waste too much time on one difficult question. If you are stuck:
                      </p>
                      <p className="text-xs text-indigo-600 font-bold mt-1">✔ Mark the question, move on, and return later.</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">Your brain continues working on it in the background and it feels easier when you return!</p>
                    </div>

                    <div>
                      <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                        <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600">8</span>
                        Strategy 8: Check Your Answer ✔️
                      </h5>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Before submitting, quickly ask yourself:
                      </p>
                      <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4 mt-1">
                        <li>Does my answer make sense?</li>
                        <li>Did I miss any important information?</li>
                        <li>Did I read the question correctly?</li>
                      </ul>
                      <p className="text-[11px] text-emerald-600 font-bold mt-1">Spend just 3 seconds checking to avoid careless mistakes.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* The STOP-THINK-SOLVE-CHECK Method */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-2xl p-6 space-y-4">
              <h4 className="font-black text-white text-base flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-indigo-400" />
                The STOP-THINK-SOLVE-CHECK Method
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                  <span className="text-xl font-black block text-indigo-300">S — STOP</span>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">Read carefully. Fully understand the question before writing anything.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                  <span className="text-xl font-black block text-indigo-300">T — THINK</span>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">Identify the question type. Choose the perfect strategy from your toolbox.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                  <span className="text-xl font-black block text-indigo-300">S — SOLVE</span>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">Apply the strategy systematically step-by-step.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                  <span className="text-xl font-black block text-indigo-300">C — CHECK</span>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">Review your final answer. Spot and correct spelling/calculation mistakes.</p>
                </div>
              </div>
            </div>

            {/* Strategy Toolbox - Interactive */}
            <div className="border border-indigo-100 rounded-2xl p-6 bg-slate-50/60 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-black text-indigo-950 text-sm flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                    Strategy Toolbox 🧰
                  </h4>
                  <p className="text-[11px] text-gray-500">Whenever you are stuck, choose one of these strategies:</p>
                </div>
                <span className="bg-indigo-100 text-indigo-800 font-black px-2.5 py-1 rounded-md text-[10px]">
                  {strategyCheckedCount}/8 Explored
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white rounded-xl p-4 border border-gray-100">
                {strategyToolboxItems.map(item => {
                  const isChecked = strategyToolbox[item.key];
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleStrategyToolbox(item.key)}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 text-left transition-all"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-300" />
                      )}
                      <span className={`text-xs font-semibold ${isChecked ? "text-indigo-900 line-through decoration-indigo-300" : "text-gray-700"}`}>
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              {strategyCheckedCount === 8 && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                  🏆 Wow! You've mastered your entire mental strategy toolbox! Use these to tackle Hard levels!
                </div>
              )}
            </div>

            {/* My Smart Strategy Goal - Interactive */}
            <div className="border border-indigo-100 rounded-2xl p-6 bg-indigo-50/20 space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <div>
                  <h4 className="font-black text-indigo-950 text-sm">My Smart Strategy Goal</h4>
                  <p className="text-xs text-gray-500">Choose one strategy to practice today:</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {strategyGoals.map((goal, idx) => {
                  const isSelected = strategyGoal === goal;
                  return (
                    <button
                      key={idx}
                      onClick={() => setStrategyGoal(goal)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                        isSelected 
                          ? "bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-100" 
                          : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isSelected ? "bg-white text-indigo-600" : "bg-gray-100 text-gray-500"}`}>
                          {isSelected ? "✔" : idx + 1}
                        </span>
                        {goal}
                      </div>
                    </button>
                  );
                })}
              </div>

              {strategyGoal && (
                <div className="bg-indigo-100 text-indigo-950 px-4 py-3 rounded-xl border border-indigo-200 text-xs font-bold">
                  🎯 My Strategy Focus: <span className="underline font-black">{strategyGoal}</span>. Let's conquer those drills!
                </div>
              )}
            </div>

            {/* Strategy Quote banner */}
            <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-2xl p-5 text-center text-white space-y-1.5">
              <span className="text-xl">🌟</span>
              <p className="font-bold italic text-sm">"Intelligence is not just about knowing the answer. It is about choosing the right strategy to find the answer."</p>
            </div>
          </div>
        )}

        {activeLesson === "learn-mistakes" && (
          /* Lesson 3: Learn from Mistakes */
          <div className="space-y-8 text-left animate-fade-in">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-black text-indigo-950 flex items-center gap-2">
                <span className="text-2xl">🕵️</span> Lesson 3: Learn from Mistakes
              </h3>
              <p className="text-indigo-600 font-extrabold text-xs tracking-wider uppercase">Every Error is a Teacher</p>
            </div>

            <hr className="border-gray-100" />

            {/* Intro Quote */}
            <div className="bg-rose-50/40 border border-rose-100/60 rounded-2xl p-5 space-y-3">
              <span className="text-rose-600 font-extrabold text-xs tracking-wider uppercase flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                "Mistakes are proof that you are trying"
              </span>
              <p className="text-gray-700 text-sm leading-relaxed font-semibold">
                Many students feel disappointed when they get a wrong answer. They think: <span className="text-rose-600">"I am not smart."</span> But NMMS toppers think differently. They say: <span className="text-emerald-600 font-bold">"Excellent, a new chance to learn!"</span>
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                The difference between an average student and a state topper is how they respond to mistakes. Your brain literally grows new neural pathways every time you analyze and correct an error!
              </p>
            </div>

            {/* The Four Types of Mistakes Card Grid */}
            <div className="space-y-4">
              <h4 className="font-display font-black text-indigo-950 text-base">The Four Types of Student Mistakes</h4>
              <p className="text-xs text-gray-500">To conquer mistakes, you must first identify what kind of mistake it is:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Type 1 */}
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-indigo-100 hover:shadow-sm transition-all space-y-2">
                  <h5 className="font-black text-xs text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚠️</span> Careless Mistakes
                  </h5>
                  <p className="text-xs text-gray-700 font-semibold">"You knew the concept, but made a silly slip."</p>
                  <ul className="text-[11px] text-gray-500 pl-4 space-y-1 list-disc">
                    <li>Reading "not equal to" as "equal to".</li>
                    <li>Making a fast 2+3=6 multiplication error.</li>
                    <li>Clicking Option B when you meant Option C.</li>
                  </ul>
                  <p className="text-[11px] text-emerald-600 font-bold bg-emerald-50/50 p-1.5 rounded-lg border border-emerald-100/30">
                    💡 Fix: Slow down, read with your finger, and double check!
                  </p>
                </div>

                {/* Type 2 */}
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-indigo-100 hover:shadow-sm transition-all space-y-2">
                  <h5 className="font-black text-xs text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📚</span> Concept Mistakes
                  </h5>
                  <p className="text-xs text-gray-700 font-semibold">"You didn't understand the pattern or formula."</p>
                  <ul className="text-[11px] text-gray-500 pl-4 space-y-1 list-disc">
                    <li>Not knowing how the mirror reflection formula works.</li>
                    <li>Not recognizing the prime number sequence.</li>
                    <li>Misunderstanding the blood relations family tree structure.</li>
                  </ul>
                  <p className="text-[11px] text-indigo-600 font-bold bg-indigo-50/50 p-1.5 rounded-lg border border-indigo-100/30">
                    💡 Fix: Go back to theory, study solved examples, and practice!
                  </p>
                </div>

                {/* Type 3 */}
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-indigo-100 hover:shadow-sm transition-all space-y-2">
                  <h5 className="font-black text-xs text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🎯</span> Strategy Mistakes
                  </h5>
                  <p className="text-xs text-gray-700 font-semibold">"You used the wrong tool for the problem."</p>
                  <ul className="text-[11px] text-gray-500 pl-4 space-y-1 list-disc">
                    <li>Trying to calculate code shifts in your head instead of using scratch paper.</li>
                    <li>Spending 4 minutes on a single hard puzzle.</li>
                  </ul>
                  <p className="text-[11px] text-amber-600 font-bold bg-amber-50/50 p-1.5 rounded-lg border border-indigo-100/30">
                    💡 Fix: Build a toolbox! Draw diagrams and eliminate choices!
                  </p>
                </div>

                {/* Type 4 */}
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-indigo-100 hover:shadow-sm transition-all space-y-2">
                  <h5 className="font-black text-xs text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⏱️</span> Time Management Mistakes
                  </h5>
                  <p className="text-xs text-gray-700 font-semibold">"You got stuck or rushed at the end."</p>
                  <ul className="text-[11px] text-gray-500 pl-4 space-y-1 list-disc">
                    <li>Staring at a hard number matrix for 3 minutes.</li>
                    <li>Getting panic-stricken and guessing randomly.</li>
                  </ul>
                  <p className="text-[11px] text-purple-600 font-bold bg-purple-50/50 p-1.5 rounded-lg border border-purple-100/30">
                    💡 Fix: Skip the hard ones, secure easy marks, and return!
                  </p>
                </div>
              </div>
            </div>

            {/* Become a Mistake Detective Checklist */}
            <div className="border border-rose-100 rounded-2xl p-6 bg-rose-50/20 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-black text-rose-950 text-sm flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-rose-500" />
                    Become a Mistake Detective 🕵️
                  </h4>
                  <p className="text-[11px] text-gray-500">Tick the mistakes you've made recently to analyze them:</p>
                </div>
                <span className="bg-rose-100 text-rose-800 font-black px-2.5 py-1 rounded-md text-[10px]">
                  {mistakeCheckedCount}/7 Investigated
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white rounded-xl p-4 border border-rose-100/50">
                {mistakeChecklistItems.map(item => {
                  const isChecked = mistakeChecklist[item.key];
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleMistakeChecklist(item.key)}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-rose-50/30 text-left transition-all"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-rose-500" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-300" />
                      )}
                      <span className={`text-xs font-semibold ${isChecked ? "text-rose-900 line-through decoration-rose-300" : "text-gray-700"}`}>
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {mistakeCheckedCount > 0 && (
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-950 rounded-xl p-3 text-xs font-bold leading-relaxed">
                  📢 <strong>Detective Verdict:</strong> Now that you've spotted these triggers, write down a specific strategy (like drawing or translating to numbers) to prevent them in your next test!
                </div>
              )}
            </div>

            {/* The SMART Reflection Method */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 space-y-4">
              <h4 className="font-black text-white text-base flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-purple-300 animate-pulse" />
                The SMART Reflection Method
              </h4>
              <p className="text-xs text-indigo-200">Use this 5-step checklist for every incorrect practice answer:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5">
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-lg font-black block text-purple-300">S</span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Spot</span>
                  <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">Identify exactly which question went wrong.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-lg font-black block text-purple-300">M</span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Mention</span>
                  <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">Name the reason: Silly slip or lack of knowledge?</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-lg font-black block text-purple-300">A</span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Analyse</span>
                  <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">What strategy or diagram should I use next?</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-lg font-black block text-purple-300">R</span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Revise</span>
                  <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">Re-read the solved examples of this type.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-lg font-black block text-purple-300">T</span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Try Again</span>
                  <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">Solve the question cleanly from scratch without assistance.</p>
                </div>
              </div>
            </div>

            {/* My Mistake Book - Interactive Logs */}
            <div className="border border-violet-100 rounded-2xl p-6 bg-slate-50/60 space-y-5">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="font-black text-indigo-950 text-sm flex items-center gap-1.5">
                    <span>📒</span> My Personal Mistake Book
                  </h4>
                  <p className="text-xs text-gray-500">Top students document their learning to review before exam day.</p>
                </div>
                <span className="bg-violet-100 text-violet-800 font-bold px-3 py-1 rounded-full text-xs">
                  {mistakeBook.length} Entries
                </span>
              </div>

              {/* Add Mistake Log Form */}
              <form onSubmit={addMistakeLog} className="bg-white border border-gray-150 p-4 rounded-xl space-y-3 shadow-3xs">
                <span className="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                  <PlusCircle className="w-4 h-4 text-indigo-500" />
                  Log a Recent Mistake
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Question / Topic</label>
                    <input
                      type="text"
                      placeholder="e.g., Finding wrong in Number series (3, 5, 9, 16)"
                      value={newQuestion}
                      onChange={e => setNewQuestion(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:outline-indigo-500 focus:border-indigo-500 font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Mistake Type</label>
                    <select
                      value={newType}
                      onChange={e => setNewType(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:outline-indigo-500 focus:border-indigo-500 font-bold text-gray-800"
                    >
                      <option value="Careless Mistakes ⚠️">Careless Mistakes ⚠️</option>
                      <option value="Concept Mistakes 📚">Concept Mistakes 📚</option>
                      <option value="Strategy Mistakes 🎯">Strategy Mistakes 🎯</option>
                      <option value="Time Mistakes ⏱️">Time Mistakes ⏱️</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Why did it happen?</label>
                    <input
                      type="text"
                      placeholder="e.g., I subtracted too quickly in my head."
                      value={newReason}
                      onChange={e => setNewReason(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:outline-indigo-500 focus:border-indigo-500 font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">What will I do next time?</label>
                    <input
                      type="text"
                      placeholder="e.g., I will write down step-by-step calculations."
                      value={newStrategy}
                      onChange={e => setNewStrategy(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-gray-200 focus:outline-indigo-500 focus:border-indigo-500 font-semibold text-gray-800"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-sm shadow-indigo-100 transition-all"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Save to Mistake Book</span>
                  </button>
                </div>
              </form>

              {/* Mistake Log List */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {mistakeBook.map(log => (
                  <div key={log.id} className="bg-white border-2 border-indigo-50 p-4 rounded-xl flex justify-between items-start gap-3 shadow-3xs hover:border-indigo-100 transition-all">
                    <div className="space-y-2 text-left flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-slate-100 text-slate-800 text-[9px] font-black py-0.5 px-2 rounded-md border border-slate-200 uppercase tracking-wider">
                          {log.type}
                        </span>
                        <h5 className="font-extrabold text-xs text-indigo-950 font-sans">{log.question}</h5>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] leading-relaxed">
                        <p className="text-rose-700 bg-rose-50/50 p-1.5 rounded-lg border border-rose-100/30">
                          <strong>Reason:</strong> {log.reason}
                        </p>
                        <p className="text-emerald-700 bg-emerald-50/50 p-1.5 rounded-lg border border-emerald-100/30">
                          <strong>Strategy:</strong> {log.strategy}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteMistakeLog(log.id)}
                      className="p-1 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-all shrink-0 self-center"
                      title="Remove entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Golden Rules Checklist */}
            <div className="border border-indigo-100 rounded-2xl p-6 bg-indigo-50/20 space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600 animate-pulse" />
                <div>
                  <h4 className="font-black text-indigo-950 text-sm">Mistake Defense Goals</h4>
                  <p className="text-xs text-gray-500">Ensure you practice these 4 golden mindset principles:</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "I will not feel disappointed about making mistakes.",
                  "I will view mistakes as proof that I am learning.",
                  "I will find the exact reason for every wrong answer.",
                  "I will solve similar questions to build memory muscles."
                ].map((goal, idx) => (
                  <div key={idx} className="bg-white border border-gray-150 p-3 rounded-xl flex items-center gap-2.5 shadow-4xs text-left">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black shrink-0">
                      ✔
                    </span>
                    <span className="text-xs font-semibold text-gray-700">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote banner */}
            <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-2xl p-5 text-center text-white space-y-1.5">
              <span className="text-xl">🌟</span>
              <p className="font-bold italic text-sm">"The only real mistake is the one from which we learn nothing. View every error as a powerful mental workout!"</p>
            </div>
          </div>
        )}

        {activeLesson === "time-management" && (
          /* Lesson 4: Time Management */
          <div className="space-y-8 text-left animate-fade-in">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-black text-indigo-950 flex items-center gap-2">
                <span className="text-2xl">⏱️</span> Lesson 4: Time Management during NMMS
              </h3>
              <p className="text-indigo-600 font-extrabold text-xs tracking-wider uppercase">Master your speed & strategy</p>
            </div>

            <hr className="border-gray-100" />

            {/* Intro Alert */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-3">
              <span className="text-amber-700 font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500 animate-pulse" />
                "Time saved is marks earned"
              </span>
              <p className="text-gray-700 text-sm leading-relaxed font-semibold">
                Many smart students know how to solve questions, but still miss out on high ranks because <span className="text-amber-700">they run out of time.</span> NMMS is not just an intelligence test, it is a time-management game!
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                You have exactly 90 questions to solve in 90 minutes. That means <strong className="text-indigo-950">exactly 1 minute per question.</strong> Some questions will take 5 seconds, others can take 3 minutes. Your secret weapon is learning how to bypass "time traps"!
              </p>
            </div>

            {/* The Three-Level Question System */}
            <div className="space-y-4">
              <h4 className="font-display font-black text-indigo-950 text-base">The Three-Level Question System</h4>
              <p className="text-xs text-gray-500">To manage time perfectly, classify every question into one of three color codes:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Green */}
                <div className="bg-emerald-50/30 border-2 border-emerald-100 rounded-2xl p-4.5 space-y-2 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                    🟢 Green Questions
                  </div>
                  <h5 className="font-black text-xs text-emerald-900">Easy & Quick (under 30 sec)</h5>
                  <p className="text-[11px] text-gray-600 leading-relaxed">You know the formula or logic instantly. No drawings needed.</p>
                  <span className="block text-[10px] text-emerald-700 font-black uppercase font-display">Action: Solve Immediately!</span>
                </div>

                {/* Yellow */}
                <div className="bg-amber-50/30 border-2 border-amber-100 rounded-2xl p-4.5 space-y-2 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black uppercase">
                    🟡 Yellow Questions
                  </div>
                  <h5 className="font-black text-xs text-amber-900">Moderate (30 to 60 sec)</h5>
                  <p className="text-[11px] text-gray-600 leading-relaxed">You understand the method, but you need to write a quick sequence or draw a simple diagram.</p>
                  <span className="block text-[10px] text-amber-700 font-black uppercase font-display">Action: Circle & Solve in Round 2!</span>
                </div>

                {/* Red */}
                <div className="bg-rose-50/30 border-2 border-rose-100 rounded-2xl p-4.5 space-y-2 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-black uppercase">
                    🔴 Red Questions
                  </div>
                  <h5 className="font-black text-xs text-rose-900">Complex Puzzles (over 60 sec)</h5>
                  <p className="text-[11px] text-gray-600 leading-relaxed">Very long statements, multi-step blood relationships, or grids you don't grasp at first glance.</p>
                  <span className="block text-[10px] text-rose-700 font-black uppercase font-display">Action: Skip immediately & return later!</span>
                </div>
              </div>
            </div>

            {/* Interactive Game: Question Classifier Challenge */}
            <div className="border border-indigo-100 rounded-2xl p-6 bg-slate-50/60 space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h4 className="font-black text-indigo-950 text-sm flex items-center gap-2">
                    <span className="text-base animate-pulse">🎮</span> Question Classifier Game
                  </h4>
                  <p className="text-[11px] text-gray-500">Test your mental sorting skills! How would you classify this exam question?</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                    Scenario {currentClassifierQuestion + 1}/3
                  </span>
                </div>
              </div>

              {/* Game Question Card */}
              <div className="bg-white border-2 border-indigo-50 rounded-xl p-5 text-center shadow-3xs space-y-3">
                <p className="text-xs text-slate-500 font-black uppercase tracking-wider">Exam Scenario:</p>
                <p className="text-sm font-bold text-indigo-950 leading-relaxed max-w-lg mx-auto">
                  "{classifierQuestions[currentClassifierQuestion].question}"
                </p>
              </div>

              {/* Option Classification Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setSelectedClassification("green");
                    setClassifierFeedback(classifierQuestions[currentClassifierQuestion].feedback);
                  }}
                  className={`py-3 px-2 rounded-xl text-xs font-black border-2 transition-all flex flex-col items-center gap-1 ${
                    selectedClassification === "green"
                      ? "bg-emerald-100 border-emerald-400 text-emerald-950 scale-95"
                      : "bg-white border-gray-150 hover:border-emerald-200 text-gray-700"
                  }`}
                  disabled={selectedClassification !== null}
                >
                  <span className="text-lg">🟢</span>
                  <span>GREEN</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedClassification("yellow");
                    setClassifierFeedback(classifierQuestions[currentClassifierQuestion].feedback);
                  }}
                  className={`py-3 px-2 rounded-xl text-xs font-black border-2 transition-all flex flex-col items-center gap-1 ${
                    selectedClassification === "yellow"
                      ? "bg-amber-100 border-amber-400 text-amber-950 scale-95"
                      : "bg-white border-gray-150 hover:border-amber-200 text-gray-700"
                  }`}
                  disabled={selectedClassification !== null}
                >
                  <span className="text-lg">🟡</span>
                  <span>YELLOW</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedClassification("red");
                    setClassifierFeedback(classifierQuestions[currentClassifierQuestion].feedback);
                  }}
                  className={`py-3 px-2 rounded-xl text-xs font-black border-2 transition-all flex flex-col items-center gap-1 ${
                    selectedClassification === "red"
                      ? "bg-rose-100 border-rose-400 text-rose-950 scale-95"
                      : "bg-white border-gray-150 hover:border-rose-200 text-gray-700"
                  }`}
                  disabled={selectedClassification !== null}
                >
                  <span className="text-lg">🔴</span>
                  <span>RED</span>
                </button>
              </div>

              {/* Feedback and Reset/Next Action */}
              {selectedClassification !== null && (
                <div className="space-y-3 p-4 rounded-xl border-2 border-indigo-100 bg-white/80">
                  <div className="flex items-center gap-2">
                    {selectedClassification === classifierQuestions[currentClassifierQuestion].correct ? (
                      <span className="text-base text-emerald-700 font-bold">🏆 Perfect Choice!</span>
                    ) : (
                      <span className="text-base text-indigo-700 font-bold">💡 Topper Insight:</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                    {classifierFeedback}
                  </p>
                  
                  <div className="flex justify-end pt-1">
                    {currentClassifierQuestion < 2 ? (
                      <button
                        onClick={() => {
                          setCurrentClassifierQuestion(prev => prev + 1);
                          setSelectedClassification(null);
                          setClassifierFeedback(null);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-1 shadow-xs"
                      >
                        <span>Next Scenario</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentClassifierQuestion(0);
                          setSelectedClassification(null);
                          setClassifierFeedback(null);
                        }}
                        className="bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Game</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* The One-Minute Rule & Skipping Strategy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-150 rounded-2xl p-5 space-y-3 hover:shadow-3xs transition-all text-left">
                <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5 font-display">
                  <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600 font-black">1</span>
                  The One-Minute Rule ⏰
                </h5>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Never spend more than 60 seconds of silent thought on one question. If you are not writing or building logic by then:
                </p>
                <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-950 font-bold space-y-1">
                  <p className="flex items-center gap-1">✔ Stop thinking immediately.</p>
                  <p className="flex items-center gap-1">✔ Make a mark next to the number.</p>
                  <p className="flex items-center gap-1">✔ Jump to the next question.</p>
                </div>
              </div>

              <div className="bg-white border border-gray-150 rounded-2xl p-5 space-y-3 hover:shadow-3xs transition-all text-left">
                <h5 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5 font-display">
                  <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600 font-black">2</span>
                  Smart Skipping is a Strategy 🚀
                </h5>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Many students feel that skipping a question means "giving up". But top scorers view skipping as a strategic pause.
                </p>
                <p className="text-[11px] text-gray-500 leading-relaxed italic">
                  "When you skip and move ahead, your subconscious brain actually continues working on the pattern. When you return to it 20 minutes later, the answer will suddenly feel obvious!"
                </p>
              </div>
            </div>

            {/* Avoid Time Traps */}
            <div className="space-y-4">
              <h4 className="font-black text-indigo-950 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
                Time Traps to Avoid
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: "❌ Re-reading", desc: "Re-reading the same question 4 times without writing anything. Solution: Use draft paper to draw instantly!" },
                  { title: "❌ Puzzle Obsession", desc: "Refusing to move ahead because 'I am close to solving this.' Solution: Force yourself to skip after 1 minute!" },
                  { title: "❌ Exam Panic", desc: "Worrying about a countdown clock instead of focusing on the questions. Solution: Take three deep breaths." }
                ].map((trap, idx) => (
                  <div key={idx} className="bg-rose-50/10 border border-rose-100 p-4 rounded-xl space-y-1.5 text-left">
                    <h5 className="font-extrabold text-xs text-rose-800">{trap.title}</h5>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{trap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Management Checklist - Interactive */}
            <div className="border border-indigo-100 rounded-2xl p-6 bg-indigo-50/20 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-black text-indigo-950 text-sm flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                    Time Management Checklist ⏱️
                  </h4>
                  <p className="text-[11px] text-gray-500">Practice these six rules in every mock test:</p>
                </div>
                <span className="bg-indigo-100 text-indigo-800 font-black px-2.5 py-1 rounded-md text-[10px]">
                  {timeCheckedCount}/6 Mastered
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white rounded-xl p-4 border border-indigo-100/30">
                {timeChecklistItems.map(item => {
                  const isChecked = timeChecklist[item.key];
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleTimeChecklist(item.key)}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-indigo-50/30 text-left transition-all"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-300" />
                      )}
                      <span className={`text-xs font-semibold ${isChecked ? "text-indigo-950 line-through decoration-indigo-300" : "text-gray-700"}`}>
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {timeCheckedCount === 6 && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-3 text-xs font-bold flex items-center gap-2 animate-bounce">
                  🏆 Awesome! You have mastered the timing habits of top NMMS scorers!
                </div>
              )}
            </div>

            {/* Quote banner */}
            <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-2xl p-5 text-center text-white space-y-1.5">
              <span className="text-xl">🌟</span>
              <p className="font-bold italic text-sm">"Top students do not solve questions faster. They solve easy questions first, skip red questions, and use their time smarter."</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
