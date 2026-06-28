import React, { useState, useEffect } from "react";
import { Question, UserStats } from "../types";
import { TOPICS } from "../data/topicsData";
import { getQuestionForTopic, getQuestionForTopicAndIndex, QUESTIONS } from "../data/questionsData";
import { getLessonContent } from "../data/lessonsData";
import { 
  Heart, 
  Sparkles, 
  Zap, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  ChevronRight, 
  Flame, 
  Lightbulb, 
  Shuffle, 
  MessageCircle,
  AlertCircle,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const KBC_LADDER = [
  { level: 15, points: "7 Crore Points", icon: "🏆", milestone: true },
  { level: 14, points: "1 Crore Points", icon: "💎" },
  { level: 13, points: "50 Lakh Points", icon: "🏅" },
  { level: 12, points: "25 Lakh Points", icon: "🌟" },
  { level: 11, points: "12.5 Lakh Points", icon: "🚀" },
  { level: 10, points: "6.25 Lakh Points", icon: "🎯", milestone: true },
  { level: 9, points: "3.2 Lakh Points", icon: "⚡" },
  { level: 8, points: "1.6 Lakh Points", icon: "🧠" },
  { level: 7, points: "80,000 Points", icon: "🎓" },
  { level: 6, points: "40,000 Points", icon: "📚" },
  { level: 5, points: "20,000 Points", icon: "🛡️", milestone: true },
  { level: 4, points: "10,000 Points", icon: "⚙️" },
  { level: 3, points: "5,000 Points", icon: "🐾" },
  { level: 2, points: "3,000 Points", icon: "🌱" },
  { level: 1, points: "1,000 Points", icon: "🌟" }
];

interface QuizEngineProps {
  topicId: string;
  userStats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
  onExit: () => void;
}

export default function QuizEngine({ topicId, userStats, onUpdateStats, onExit }: QuizEngineProps) {
  const topic = TOPICS.find(t => t.id === topicId)!;
  
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [playMode, setPlayMode] = useState<"challenge" | "marathon">("challenge");
  const [marathonIndex, setMarathonIndex] = useState<number>(0);
  const [marathonResults, setMarathonResults] = useState<Record<number, boolean>>(() => {
    const cached = localStorage.getItem(`marathon_results_${topicId}`);
    return cached ? JSON.parse(cached) : {};
  });

  const [question, setQuestion] = useState<Question>(() => getQuestionForTopic(topicId, "Easy"));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  
  // Power-up States
  const [ladderLevel, setLadderLevel] = useState<number>(0);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState<boolean>(false);
  const [usedHint, setUsedHint] = useState<boolean>(false);
  const [coachResponse, setCoachResponse] = useState<string | null>(null);
  const [isCoachLoading, setIsCoachLoading] = useState<boolean>(false);
  const [isGeneratingCustom, setIsGeneratingCustom] = useState<boolean>(false);
  const [generatorError, setGeneratorError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(`marathon_results_${topicId}`, JSON.stringify(marathonResults));
  }, [marathonResults, topicId]);

  // Reset KBC ladder only when changing topic or game mode
  useEffect(() => {
    setLadderLevel(0);
  }, [topicId, playMode]);

  // Sync question when topic, difficulty, playMode, or marathonIndex changes
  useEffect(() => {
    if (playMode === "challenge") {
      setQuestion(getQuestionForTopic(topicId, currentDifficulty));
    } else {
      setQuestion(getQuestionForTopicAndIndex(topicId, marathonIndex));
    }
    setSelectedOption(null);
    setIsSubmitted(false);
    setDisabledOptions([]);
    setUsedFiftyFifty(false);
    setUsedHint(false);
    setCoachResponse(null);
    setGeneratorError(null);
  }, [topicId, playMode, marathonIndex, currentDifficulty]);

  const handleSelectOption = (indexStr: string) => {
    if (isSubmitted) return;
    setSelectedOption(indexStr);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;

    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      setLadderLevel(prev => Math.min(15, prev + 1));
    } else {
      setLadderLevel(prev => {
        if (prev >= 10) return 10;
        if (prev >= 5) return 5;
        return 0;
      });
    }

    if (playMode === "marathon") {
      setMarathonResults(prev => ({ ...prev, [marathonIndex]: correct }));
    }

    onUpdateStats(prev => {
      let nextLives = prev.lives;
      let nextXp = prev.xp;
      let nextStreak = prev.streak;

      if (correct) {
        // Gain XP based on mode and difficulty
        const xpGain = playMode === "marathon" ? 10 : (currentDifficulty === "Easy" ? 15 : currentDifficulty === "Medium" ? 25 : 40);
        nextXp += xpGain;
        // Increment streak
        nextStreak += 1;
      } else {
        // Deduct life only in Challenge mode
        if (playMode !== "marathon") {
          nextLives = Math.max(0, nextLives - 1);
        }
        // Reset streak
        nextStreak = 0;
      }

      // Track attempts
      const updatedAttempts = { ...prev.totalAttemptsByTopic };
      const updatedCorrect = { ...prev.correctAnswersByTopic };
      
      updatedAttempts[topicId] = (updatedAttempts[topicId] || 0) + 1;
      if (correct) {
        updatedCorrect[topicId] = (updatedCorrect[topicId] || 0) + 1;
      }

      // Check for unlocking next levels
      const completedTopics = [...prev.completedTopicIds];
      if (correct && !completedTopics.includes(topicId)) {
        completedTopics.push(topicId);
      }

      // Calculate level-up: 100 XP per level
      const nextLevel = Math.floor(nextXp / 100) + 1;

      // Unlock next chronological topics within the same module automatically
      const unlockedTopics = [...prev.unlockedTopicIds];
      const currentTopic = TOPICS.find(t => t.id === topicId);
      if (currentTopic && correct) {
        const moduleTopics = TOPICS.filter(t => t.moduleId === currentTopic.moduleId).sort((a, b) => a.order - b.order);
        const currentIndex = moduleTopics.findIndex(t => t.id === topicId);
        if (currentIndex !== -1 && currentIndex < moduleTopics.length - 1) {
          const nextTopicInModule = moduleTopics[currentIndex + 1];
          if (!unlockedTopics.includes(nextTopicInModule.id)) {
            unlockedTopics.push(nextTopicInModule.id);
          }
        }
      }

      return {
        ...prev,
        xp: nextXp,
        level: nextLevel,
        lives: nextLives,
        streak: nextStreak,
        completedTopicIds: completedTopics,
        unlockedTopicIds: unlockedTopics,
        totalAttemptsByTopic: updatedAttempts,
        correctAnswersByTopic: updatedCorrect
      };
    });
  };

  // 1. Power-up: 50/50 Eliminator
  const handleFiftyFifty = () => {
    if (usedFiftyFifty || isSubmitted || userStats.powerups.fiftyFifty <= 0) return;

    // Keep the correct answer and pick one random wrong answer, disable the other two
    const correctIdx = parseInt(question.correctAnswer, 10);
    const incorrectIndexes = [0, 1, 2, 3].filter(idx => idx !== correctIdx);
    
    // Select one incorrect to keep
    const keepIncorrectIdx = incorrectIndexes[Math.floor(Math.random() * incorrectIndexes.length)];
    const optionsToDisable = incorrectIndexes.filter(idx => idx !== keepIncorrectIdx).map(String);

    setDisabledOptions(optionsToDisable);
    setUsedFiftyFifty(true);

    onUpdateStats(prev => ({
      ...prev,
      powerups: {
        ...prev.powerups,
        fiftyFifty: Math.max(0, prev.powerups.fiftyFifty - 1)
      }
    }));
  };

  // 2. Power-up: Ask Gemini Expert (KBC Lifeline)
  const handleAskCoach = async () => {
    if (isSubmitted || userStats.powerups.hints <= 0) return;
    setUsedHint(true);
    setIsCoachLoading(true);
    setCoachResponse(null);

    onUpdateStats(prev => ({
      ...prev,
      powerups: {
        ...prev.powerups,
        hints: Math.max(0, prev.powerups.hints - 1)
      }
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `I need help with this logic question: "${question.questionText}". The options are: ${question.options.join(", ")}. Can you provide a clear, encouraging hint and explain the logic step-by-step? Please do NOT tell me the final direct correct option index immediately, let me solve it. Keep it under 150 words.`,
          contextQuestion: question.questionText
        })
      });
      const data = await response.json();
      if (data.text) {
        setCoachResponse(data.text);
      } else {
        throw new Error("Empty response");
      }
    } catch (err) {
      console.error("Gemini Expert failed, falling back to offline", err);
      setCoachResponse(`**Professor Mindy (Offline Backup)** 🌟\n\n💡 Here is a quick hint to guide your thinking:\n\n*${question.hint}*`);
    } finally {
      setIsCoachLoading(false);
    }
  };

  // 3. Power-up: Purchase extra life
  const handleExtraLife = () => {
    if (userStats.lives >= 3 || userStats.powerups.extraLife <= 0) return;
    onUpdateStats(prev => ({
      ...prev,
      lives: Math.min(3, prev.lives + 1),
      powerups: {
        ...prev.powerups,
        extraLife: Math.max(0, prev.powerups.extraLife - 1)
      }
    }));
  };

  // 4. Offline Practice: Selects a non-repeating offline question
  const handleGenerateAiQuestion = () => {
    setIsGeneratingCustom(true);
    setGeneratorError(null);
    try {
      // Find all predesigned questions for this topic
      const candidates = QUESTIONS.filter(q => q.topicId === topic.id);
      
      // Filter out the current active question to prevent back-to-back repeats
      const filteredCandidates = candidates.filter(q => q.id !== question.id);
      
      let nextQ: Question;
      if (filteredCandidates.length > 0) {
        // Pick one at random from the filtered candidates
        const randomIndex = Math.floor(Math.random() * filteredCandidates.length);
        nextQ = filteredCandidates[randomIndex];
      } else {
        // If there are no other predesigned questions, generate a randomized version
        let attempts = 0;
        let randomQ = getQuestionForTopic(topic.id, currentDifficulty, true);
        while (randomQ.questionText === question.questionText && attempts < 10) {
          randomQ = getQuestionForTopic(topic.id, currentDifficulty, true);
          attempts++;
        }
        nextQ = randomQ;
      }
      
      setQuestion(nextQ);
      setSelectedOption(null);
      setIsSubmitted(false);
      setDisabledOptions([]);
      setUsedFiftyFifty(false);
      setUsedHint(false);
      setCoachResponse(null);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  const handleNextChallenge = () => {
    if (playMode === "marathon") {
      // For marathon, if correct, progress to the next index automatically
      if (isCorrect) {
        if (marathonIndex < 99) {
          setMarathonIndex(prev => prev + 1);
        } else {
          setIsLessonCompleted(true); // Marathon completed!
        }
      } else {
        // Retry the current question
        setSelectedOption(null);
        setIsSubmitted(false);
        setDisabledOptions([]);
        setUsedFiftyFifty(false);
        setUsedHint(false);
        setCoachResponse(null);
        setGeneratorError(null);
      }
    } else {
      // Progress difficulty or stay
      if (isCorrect) {
        if (currentDifficulty === "Easy") {
          setCurrentDifficulty("Medium");
        } else if (currentDifficulty === "Medium") {
          setCurrentDifficulty("Hard");
        } else {
          // Mastered all tiers! Show separate Golden Key Points section
          setIsLessonCompleted(true);
        }
      } else {
        // Retry current tier
        setSelectedOption(null);
        setIsSubmitted(false);
        setDisabledOptions([]);
        setUsedFiftyFifty(false);
        setUsedHint(false);
        setCoachResponse(null);
      }
    }
  };

  if (isLessonCompleted) {
    const lessonContent = getLessonContent(topic.id, topic.name, topic.moduleId);
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-12" id="gkp-completion-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 p-6 sm:p-10 rounded-3xl border-4 border-amber-400 shadow-2xl text-center space-y-8"
        >
          {/* Confetti-like ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1),transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 border-4 border-indigo-950 shadow-xl text-4xl animate-bounce">
              👑
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 uppercase tracking-tight">
              Stage Accomplished!
            </h1>
            <p className="text-xs font-black uppercase tracking-widest text-indigo-400 font-mono">
              STAGE {topic.id} • {topic.moduleId} REALM
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-white max-w-xl mx-auto leading-tight">
              {topic.name}
            </h2>
          </div>

          {/* Stats summary banner */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto bg-indigo-900/25 border-2 border-indigo-900/60 p-4 rounded-2xl relative z-10">
            <div className="text-center p-2">
              <span className="text-[10px] text-indigo-300 font-black uppercase block tracking-wider">Level Reached</span>
              <span className="text-xl font-mono font-black text-amber-300">#{ladderLevel} / 15</span>
            </div>
            <div className="text-center p-2">
              <span className="text-[10px] text-indigo-300 font-black uppercase block tracking-wider">Play Mode</span>
              <span className="text-xl font-display font-black text-slate-100 capitalize">{playMode}</span>
            </div>
            <div className="text-center p-2 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-indigo-300 font-black uppercase block tracking-wider">Shield Lives</span>
              <span className="text-xl font-mono font-black text-rose-400">{userStats.lives} / 3</span>
            </div>
          </div>

          {/* Golden Key Points Revision Cards */}
          <div className="space-y-5 text-left max-w-2xl mx-auto relative z-10">
            <div className="flex items-center gap-2 border-b border-indigo-900/60 pb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400/15 flex items-center justify-center text-amber-300">
                <Lightbulb className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-black text-amber-300 text-lg">Golden Key Points (GKP)</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your reward summary for mastering this lesson</p>
              </div>
            </div>

            <div className="grid gap-4">
              {lessonContent.goldenKeys.map((gkp, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 bg-indigo-950/70 border border-indigo-900 hover:border-amber-400/30 p-4 rounded-2xl transition-all shadow-md group animate-fade-in"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-indigo-950 font-black flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                    🔑
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Rule #{index + 1}</span>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-semibold">
                      {gkp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Collect Reward Action Button */}
          <div className="pt-4 relative z-10">
            <button
              onClick={onExit}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-indigo-950 font-display font-black text-xs sm:text-sm tracking-widest uppercase shadow-xl shadow-amber-500/25 border-2 border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto animate-magic-pulse"
            >
              <span>Collect Rewards & Return to Map 👑</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12" id="kbc-quiz-root">
      {/* Top Navigation / Headings */}
      <div className="flex justify-between items-center bg-indigo-950 border-2 border-amber-400/40 p-4 rounded-2xl shadow-xl">
        <button 
          onClick={onExit}
          className="text-amber-300 hover:text-amber-100 font-extrabold text-xs sm:text-sm bg-indigo-900 hover:bg-indigo-800 px-4 py-2.5 rounded-xl transition-all border border-amber-400/20"
        >
          ← Quit Game
        </button>
        <div className="text-right">
          <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">Topic {topic.id}</span>
          <h2 className="font-display font-black text-sm sm:text-base text-slate-100 leading-snug truncate max-w-[150px] sm:max-w-md">{topic.name}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Game Set (col-span-9) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Mode Switcher */}
          <div className="bg-indigo-950 p-1.5 rounded-2xl flex border-2 border-indigo-900 shadow-lg">
            <button
              onClick={() => setPlayMode("challenge")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black font-display text-xs sm:text-sm transition-all ${
                playMode === "challenge"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-indigo-950 shadow-md shadow-amber-500/25 scale-[1.01]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-indigo-900/40"
              }`}
            >
              <Zap className="w-4 h-4" />
              Challenge Path (3 Tiers)
            </button>
            <button
              onClick={() => setPlayMode("marathon")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black font-display text-xs sm:text-sm transition-all ${
                playMode === "marathon"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-indigo-950 shadow-md shadow-amber-500/25 scale-[1.01]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-indigo-900/40"
              }`}
            >
              <Shuffle className="w-4 h-4" />
              100-Question Marathon
            </button>
          </div>

          {/* 100-Question Marathon Navigation */}
          {playMode === "marathon" && (
            <div className="bg-indigo-950/90 p-5 rounded-2xl border-2 border-indigo-900 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-display font-black text-sm text-amber-300 flex items-center gap-2">
                    <Shuffle className="w-4 h-4 text-amber-400 animate-spin-slow" />
                    Marathon Progress: {Object.values(marathonResults).filter(v => v).length} / 100 Mastered
                  </h3>
                  <p className="text-xs text-slate-300 font-semibold">Practice risk-free without losing Shield Lives. Click any number to jump to that question!</p>
                </div>
                {/* Quick Difficulty Band indicators */}
                <div className="flex gap-2 text-[10px] font-black uppercase">
                  <span className="px-2 py-1 bg-emerald-950 text-emerald-400 rounded border border-emerald-900">Easy: 1-34</span>
                  <span className="px-2 py-1 bg-amber-950 text-amber-400 rounded border border-amber-900">Med: 35-67</span>
                  <span className="px-2 py-1 bg-rose-950 text-rose-400 rounded border border-rose-900">Hard: 68-100</span>
                </div>
              </div>
              
              {/* Grid Container */}
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 max-h-48 overflow-y-auto pr-1">
                {Array.from({ length: 100 }).map((_, i) => {
                  const qNum = i + 1;
                  const isSelected = marathonIndex === i;
                  const result = marathonResults[i];
                  
                  let btnClass = "bg-indigo-900/45 border border-indigo-800 text-slate-300 hover:bg-indigo-800/60";
                  if (result === true) {
                    btnClass = "bg-emerald-600 border border-emerald-500 hover:bg-emerald-500 text-white font-black shadow-sm shadow-emerald-950";
                  } else if (result === false) {
                    btnClass = "bg-rose-600 border border-rose-500 hover:bg-rose-500 text-white font-black shadow-sm shadow-rose-950";
                  }
                  
                  if (isSelected) {
                    btnClass = `${btnClass} ring-4 ring-amber-400 ring-offset-2 ring-offset-indigo-950 scale-105 z-10`;
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setMarathonIndex(i)}
                      className={`h-9 w-full rounded-xl flex items-center justify-center text-xs font-semibold shadow-sm transition-all duration-150 ${btnClass}`}
                      title={`Question ${qNum} (${i < 34 ? "Easy" : i < 67 ? "Medium" : "Hard"})`}
                    >
                      {qNum}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Game Dashboard: Lives, XP, Streaks */}
          <div className="grid grid-cols-3 gap-4">
            {/* Lives */}
            <div className="bg-indigo-950 p-3 rounded-2xl border-2 border-indigo-900 shadow-md flex flex-col items-center justify-center space-y-1 relative overflow-hidden bg-gradient-to-b from-indigo-950 to-indigo-900/50">
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Shield Lives</span>
              <div className="flex gap-1.5 relative z-10">
                {[1, 2, 3].map(heartId => (
                  <Heart 
                    key={heartId} 
                    className={`w-5 h-5 transition-all ${
                      heartId <= userStats.lives 
                        ? "text-rose-500 fill-rose-500 scale-110 drop-shadow-sm animate-pulse" 
                        : "text-indigo-900 scale-95"
                    }`} 
                  />
                ))}
              </div>
            </div>

            {/* Level & XP */}
            <div className="bg-indigo-950 p-3 rounded-2xl border-2 border-indigo-900 shadow-md flex flex-col items-center justify-center space-y-0.5 relative overflow-hidden bg-gradient-to-b from-indigo-950 to-indigo-900/50">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Level {userStats.level}</span>
              <div className="flex items-center gap-1 relative z-10">
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-500 animate-float" />
                <span className="font-display font-black text-amber-400 text-lg">{userStats.xp} <span className="text-xs font-semibold text-amber-500">XP</span></span>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="bg-indigo-950 p-3 rounded-2xl border-2 border-indigo-900 shadow-md flex flex-col items-center justify-center space-y-0.5 relative overflow-hidden bg-gradient-to-b from-indigo-950 to-indigo-900/50">
              <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Active Streak</span>
              <div className="flex items-center gap-1 relative z-10">
                <Flame className={`w-4 h-4 ${userStats.streak > 0 ? "text-orange-500 fill-orange-400 animate-bounce" : "text-orange-900"}`} />
                <span className="font-display font-black text-orange-400 text-lg">{userStats.streak} <span className="text-xs font-semibold text-orange-500">Days</span></span>
              </div>
            </div>
          </div>

          {/* Main Hot Seat Arena Card */}
          <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl border-2 border-amber-400/40 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 relative">
            
            {/* Header Tier Indicator */}
            <div className="flex justify-between items-center">
              <span className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xs ${
                (playMode === "marathon" ? question.difficulty : currentDifficulty) === "Easy" 
                  ? "bg-emerald-950/80 text-emerald-300 border-2 border-emerald-900" 
                  : (playMode === "marathon" ? question.difficulty : currentDifficulty) === "Medium"
                  ? "bg-amber-950/80 text-amber-300 border-2 border-amber-900"
                  : "bg-rose-950/80 text-rose-300 border-2 border-rose-900"
              }`}>
                🌟 {playMode === "marathon" ? `Question ${marathonIndex + 1} (${question.difficulty})` : `${currentDifficulty} Tier`}
              </span>

              <span className="text-xs font-black text-slate-500 font-mono">
                QUESTION ID: {question.id}
              </span>
            </div>

            {/* Question Text */}
            <div className="text-center space-y-2 py-4">
              <p className="text-xl sm:text-2xl font-display font-black text-slate-100 leading-relaxed whitespace-pre-line">
                {question.questionText}
              </p>
            </div>

            {/* Custom Visual Displays for logic question categories */}
            {question.visualData && (
              <div className="bg-indigo-950/50 p-6 rounded-2xl border-2 border-indigo-900/60 flex items-center justify-center shadow-inner" id="logic-visual-frame">
                {/* 1. Missing sequence cards */}
                {question.visualData.sequence && (
                  <div className="flex flex-wrap gap-2.5 justify-center items-center">
                    {question.visualData.sequence.map((item, idx) => (
                      <div 
                        key={idx}
                        className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl border-2 shadow-md font-mono font-black text-lg transition-all ${
                          item === "?" 
                            ? "bg-indigo-900 border-amber-400 text-amber-300 animate-pulse scale-105"
                            : "bg-indigo-950/85 border-indigo-800 text-slate-200"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. Number/Letter Matrix */}
                {question.visualData.matrixGrid && (
                  <div className="grid gap-2 text-center" style={{ gridTemplateColumns: `repeat(${question.visualData.matrixGrid[0].length}, minmax(0, 1fr))` }}>
                    {question.visualData.matrixGrid.flatMap((row, rIdx) => 
                      row.map((cell, cIdx) => (
                        <div 
                          key={`${rIdx}-${cIdx}`}
                          className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl border-2 font-mono font-bold text-base shadow-md transition-all ${
                            cell === "?" || cell === "Center: ?"
                              ? "bg-indigo-900 border-amber-400 text-amber-300 animate-pulse"
                              : "bg-indigo-950/85 border-indigo-800 text-slate-200"
                          }`}
                        >
                          {cell}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* 3. SVG illustration wrapper (Mirror Images, Venn, Triangles, Cubes) */}
                {question.visualData.originalImageSvg && (
                  <div 
                    className="w-full flex justify-center py-2 bg-slate-900/40 p-4 rounded-xl border border-indigo-900/50"
                    dangerouslySetInnerHTML={{ __html: question.visualData.originalImageSvg }}
                  />
                )}
              </div>
            )}

            {/* Interactive Options list as KBC horizontal diamond bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                const indexStr = String(index);
                const isSelected = selectedOption === indexStr;
                const isDisabled = disabledOptions.includes(indexStr);
                
                let btnStyle = "border border-indigo-900 bg-slate-950 text-slate-200 hover:border-amber-400 hover:bg-slate-900 hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-0.5";
                if (isSelected) {
                  btnStyle = "border-2 border-amber-400 bg-indigo-950 text-amber-300 shadow-md shadow-amber-500/20";
                }
                if (isDisabled) {
                  btnStyle = "border border-slate-900 bg-slate-950 text-slate-700 cursor-not-allowed opacity-20 select-none";
                }

                if (isSubmitted) {
                  if (indexStr === question.correctAnswer) {
                    btnStyle = "border-2 border-emerald-500 bg-emerald-950 text-emerald-300 font-black shadow-lg shadow-emerald-500/25";
                  } else if (isSelected) {
                    btnStyle = "border-2 border-rose-500 bg-rose-950 text-rose-300 font-black shadow-lg shadow-rose-500/25";
                  } else {
                    btnStyle = "border border-slate-900 bg-slate-950/80 text-slate-600 opacity-20 select-none";
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={isDisabled || isSubmitted}
                    onClick={() => handleSelectOption(indexStr)}
                    className={`p-4 rounded-2xl text-left font-semibold transition-all relative flex items-center justify-between group ${btnStyle}`}
                    id={`option-btn-${index}`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      {/* Diamond shape box */}
                      <div className={`w-8 h-8 rotate-45 flex items-center justify-center font-display font-black text-xs transition-all border shrink-0 ${
                        isSelected 
                          ? "bg-amber-400 border-white text-indigo-950" 
                          : isSubmitted && indexStr === question.correctAnswer
                          ? "bg-emerald-500 border-white text-white"
                          : "bg-indigo-900/60 border-amber-400/30 text-amber-300 group-hover:bg-indigo-800"
                      }`}>
                        <span className="-rotate-45 block">{String.fromCharCode(65 + index)}</span>
                      </div>
                      <span className="text-sm sm:text-base leading-tight font-bold ml-1">{option}</span>
                    </div>
                    {isSubmitted && indexStr === question.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && indexStr !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons: Submit / Next / Power-ups */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-indigo-900/50">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-black transition-all shadow-md flex-grow text-center flex items-center justify-center gap-2 ${
                    selectedOption === null
                      ? "bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-400 to-yellow-500 text-indigo-950 hover:shadow-lg hover:scale-[1.01]"
                  }`}
                >
                  Lock Answer 🔒
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-black transition-all shadow-lg flex-grow text-center flex items-center justify-center gap-2 text-white hover:scale-[1.01] ${
                    isCorrect 
                      ? "bg-gradient-to-r from-emerald-600 to-teal-700 shadow-emerald-950" 
                      : "bg-gradient-to-r from-indigo-600 to-violet-700 shadow-indigo-950"
                  }`}
                >
                  {isCorrect ? (playMode === "marathon" ? "Next Question 🚀" : "Continue Journey 👑") : "Try Again 🔄"}
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              )}

              {/* Practice Another offline puzzle button */}
              <button
                onClick={handleGenerateAiQuestion}
                disabled={isGeneratingCustom || isSubmitted}
                className={`px-5 py-4 rounded-2xl border font-display font-black transition-all flex items-center justify-center gap-2 ${
                  isSubmitted 
                    ? "bg-slate-950 border-slate-900 text-slate-700 cursor-not-allowed" 
                    : "bg-indigo-950 border-indigo-900 text-amber-300 hover:border-amber-400/50 hover:bg-indigo-900 hover:scale-[1.01]"
                }`}
                title="Load a different offline practice puzzle for this topic!"
              >
                {isGeneratingCustom ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Shuffle className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Practice Another</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* KBC Lifelines Panel */}
          {!isSubmitted && (
            <div className="bg-indigo-950 rounded-3xl border-2 border-indigo-900 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5 font-display">
                  👑 KBC Game Lifelines
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 50:50 Lifeline */}
                <button
                  onClick={handleFiftyFifty}
                  disabled={usedFiftyFifty || userStats.powerups.fiftyFifty <= 0}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
                    usedFiftyFifty || userStats.powerups.fiftyFifty <= 0
                      ? "bg-indigo-950/40 border-indigo-950 text-slate-600 cursor-not-allowed opacity-40"
                      : "bg-indigo-900/50 border-amber-400/20 text-slate-100 hover:border-amber-400/60 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-float" />
                    <div className="text-xs font-bold leading-tight font-display">
                      <p className="font-black text-slate-100">50:50 Lifeline</p>
                      <p className="text-[10px] font-semibold text-slate-400">Eliminate 2 wrong choices</p>
                    </div>
                  </div>
                  <span className="bg-amber-400/10 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-black border border-amber-400/20">
                    x{userStats.powerups.fiftyFifty}
                  </span>
                </button>

                {/* Ask Gemini Expert Lifeline */}
                <button
                  onClick={handleAskCoach}
                  disabled={usedHint || userStats.powerups.hints <= 0}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
                    usedHint || userStats.powerups.hints <= 0
                      ? "bg-indigo-950/40 border-indigo-950 text-slate-600 cursor-not-allowed opacity-40"
                      : "bg-indigo-900/50 border-amber-400/20 text-slate-100 hover:border-amber-400/60 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
                    <div className="text-xs font-bold leading-tight font-display">
                      <p className="font-black text-slate-100">Ask Gemini Expert</p>
                      <p className="text-[10px] font-semibold text-slate-400">Get an expert logical hint</p>
                    </div>
                  </div>
                  <span className="bg-amber-400/10 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-black border border-amber-400/20">
                    x{userStats.powerups.hints}
                  </span>
                </button>

                {/* Double Dip Safe Shield */}
                <button
                  onClick={handleExtraLife}
                  disabled={userStats.lives >= 3 || userStats.powerups.extraLife <= 0}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${
                    userStats.lives >= 3 || userStats.powerups.extraLife <= 0
                      ? "bg-indigo-950/40 border-indigo-950 text-slate-600 cursor-not-allowed opacity-40"
                      : "bg-indigo-900/50 border-amber-400/20 text-slate-100 hover:border-amber-400/60 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                    <div className="text-xs font-bold leading-tight font-display">
                      <p className="font-black text-slate-100">Double Dip Shield</p>
                      <p className="text-[10px] font-semibold text-slate-400">Restore 1 safety heart</p>
                    </div>
                  </div>
                  <span className="bg-rose-400/10 text-rose-300 text-[10px] px-2 py-0.5 rounded-full font-black border border-rose-400/20">
                    x{userStats.powerups.extraLife}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Ask Gemini Expert Response */}
          {usedHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-950/90 border-2 border-amber-400/30 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-indigo-950 font-black text-lg border-2 border-white shadow-md animate-float">
                  🤖
                </div>
                <div>
                  <h4 className="font-display font-black text-amber-300 text-sm">Ask Gemini Expert Lifeline</h4>
                  <p className="text-[10px] text-amber-400/60 font-black uppercase tracking-wider">REAL-TIME ARTIFICIAL INTELLIGENCE LOGIC REPORT</p>
                </div>
              </div>

              <div className="text-sm text-slate-100 leading-relaxed whitespace-pre-line bg-slate-950 p-4 rounded-2xl border border-indigo-900 shadow-inner font-bold">
                {isCoachLoading ? (
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing logical sequence structures...</span>
                  </div>
                ) : (
                  coachResponse
                )}
              </div>
            </motion.div>
          )}

          {/* Explanation drawer when answer is submitted */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className={`p-6 rounded-3xl border-2 shadow-2xl space-y-4 ${
                  isCorrect 
                    ? "bg-emerald-950/80 border-emerald-900 text-slate-100" 
                    : "bg-rose-950/80 border-rose-900 text-slate-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-lg leading-tight text-amber-300">
                      {isCorrect ? "Lock Successful! Correct Answer! ⭐️" : "Incorrect Answer! Learning Moment 🎈"}
                    </h3>
                    <p className="text-sm font-semibold opacity-90 text-slate-300">
                      {isCorrect 
                        ? `You earned Points and climbed the Topper Ladder! Ready for the next tier?` 
                        : `Your safety milestone protects you. Remember, mistakes help build logic connections.`}
                    </p>
                  </div>
                </div>

                {/* Explanation Area */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-900 space-y-3 shadow-inner">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-400 font-display">
                    <HelpCircle className="w-4 h-4 text-amber-400 animate-pulse" />
                    Official Explanation
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line font-bold">
                    {question.explanation}
                  </p>
                </div>

                {/* Common Mistakes Area */}
                <div className="bg-rose-950/40 p-5 rounded-2xl border border-rose-900/50 space-y-3 shadow-inner text-left">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-rose-400 font-display">
                    <AlertTriangle className="w-4 h-4 text-rose-500 animate-bounce shrink-0" />
                    ⚠️ Common Pitfalls
                  </div>
                  <p className="text-xs text-rose-200 leading-relaxed whitespace-pre-line font-semibold">
                    {getCommonMistake(question)}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: KBC Point Ladder (col-span-3) - Sidebar */}
        <div className="hidden lg:block lg:col-span-3 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 border-2 border-amber-400/30 rounded-3xl p-5 shadow-2xl relative overflow-hidden self-start">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_60%)] pointer-events-none" />
          
          <div className="text-center border-b border-indigo-900/60 pb-3 mb-4 relative z-10">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest font-display">
              🏆 Topper Ladder
            </h4>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Kaun Banega Topper</p>
          </div>

          {/* Ladder levels list */}
          <div className="space-y-1 relative z-10 font-mono">
            {KBC_LADDER.map((item) => {
              const isActive = ladderLevel === item.level;
              const isPassed = ladderLevel > item.level;
              const isMilestone = item.milestone;
              
              let bgClass = "bg-slate-950/40 text-slate-400 border border-transparent";
              if (isActive) {
                bgClass = "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-indigo-950 font-black border-2 border-white scale-[1.03] shadow-lg shadow-amber-400/25";
              } else if (isPassed) {
                bgClass = "bg-indigo-900/40 text-amber-300 font-bold border border-indigo-800/40";
              } else if (isMilestone) {
                bgClass = "bg-slate-950/80 text-slate-300 font-black border border-amber-400/10";
              }

              return (
                <div 
                  key={item.level}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-xl transition-all duration-150 ${bgClass}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold ${isActive ? "text-indigo-950" : isMilestone ? "text-amber-400" : "text-slate-600"}`}>
                      {String(item.level).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold">{item.icon}</span>
                    <span className={`text-[11px] ${isActive ? "font-black" : isMilestone ? "font-black text-slate-200" : "font-medium"}`}>
                      {item.points}
                    </span>
                  </div>
                  {isMilestone && !isActive && (
                    <span className="text-[7px] bg-amber-400/10 text-amber-400 font-black px-1.5 py-0.5 rounded border border-amber-400/20 uppercase tracking-widest">
                      Safe
                    </span>
                  )}
                  {isActive && (
                    <span className="text-[7px] bg-indigo-950 text-white font-black px-1.5 py-0.5 rounded animate-pulse uppercase tracking-widest border border-white/20">
                      Active
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to provide clear explanations of common student mistakes for every logic question
export function getCommonMistake(question: Question): string {
  // If the question object explicitly defines a common mistake, use it
  if ((question as any).commonMistake) return (question as any).commonMistake;
  
  const topicId = question.topicId || "";
  switch (topicId) {
    case "1": // Missing Number in Series
    case "19": // Finding wrong in the Number Series
      return "Careless Calculation & Fast Guessing:\n- Many students look only at the difference between the first two terms and guess a simple pattern (like +3 or +5) without verifying it across the entire series.\n- Off-by-one errors during subtraction of large terms in the sequence.";
    case "2": // Missing Letter in Letter Series
      return "Alphabetical Position Counting Mistakes:\n- Students often count letters mentally without writing down A=1, B=2, etc., which leads to off-by-one errors (e.g., counting a shift as +3 when it is actually +4).\n- Forgetting that the alphabet wraps around from Z back to A.";
    case "3": // Analogy Number
      return "Over-simplifying Relationships:\n- Spotting a simple relationship like 'multiply by 2' and choosing the first matching option, without realizing there is a more precise squares/cubes or consecutive multiplication rule (e.g., x : x² + x) that must be applied.";
    case "4": // Analogy Letter / Word
    case "6": // Odd one out Letters / Word
      return "Semantic Association Bias:\n- Relying on surface-level associations (e.g., 'both are kitchen items') rather than structural grammatical relationships (e.g., noun vs. verb, synonym vs. antonym, or vowel count patterns).";
    case "5": // Odd one out Number
      return "Incomplete Rule Verification:\n- Picking an odd-one-out option because of a single feature (like 'this number is even') before ensuring that the other three options strictly share a precise, common mathematical property (like all being perfect squares, cubes, or prime numbers).";
    case "7": // Counting Geometric Figures
      return "Overlooking Nested & Overlapping Shapes:\n- Students almost always miss larger combined shapes (e.g., four small triangles joined to make a larger triangle) or count the same sub-figure twice.\n- Advice: Always count systematically by size (single shapes first, then double, then triple!).";
    case "8": // Venn Diagrams
      return "Misinterpreting Overlapping Regions:\n- Confusing 'only A' with 'A in general'. For example, if asked for 'students who play ONLY Football', many mistakenly include the intersection region of students who play both Football and Basketball.";
    case "9": // Number / Letter Counting
      return "Visual Fatigue & Skipping Items:\n- Counting directly from the screen with eyes alone. In a long, dense sequence, students easily skip a number or double-count. \n- Advice: Use your finger or a pen to point to each item, or cross them off as you count.";
    case "10": // Decoding
      return "Forward/Backward Direction Swaps:\n- Confusing '+3' with '-3' when decoding. If the code goes from 'CAT' to 'FDW' (+3), students often apply '+3' instead of '-3' when decrypting back to the original word, getting the wrong answer.";
    case "11": // Missing Number in Figure
    case "17": // Number Matrix
      return "Row vs. Column Confusion & Incomplete Logic:\n- Finding a formula that works for the first row or column, and immediately applying it to the missing one without confirming if it also holds true for the second row or column.";
    case "12": // Missing Letter in Figure
      return "Ignoring Letter-Number Conversions:\n- Trying to solve the pattern using letters directly, rather than converting each letter to its position number in the English alphabet (A=1, B=2...) where the mathematical pattern becomes immediately obvious.";
    case "14": // Word within word
    case "15": // Word cannot be formed
      return "Double Counting Duplicate Letters:\n- Assuming a word can be formed if all its individual letters are present in the parent word, but forgetting that if a letter appears twice in the child word (e.g., 'E' in 'GREET'), it MUST also appear at least twice in the parent word.";
    case "16": // Arrangement in English Dictionary
      return "Stopping at the First Letter Match:\n- Looking only at the first different letter and getting confused. For example, when sorting 'PREVENT' and 'PREVIEW', you must look past 'PREV' to compare 'E' vs. 'I'.";
    case "18": // Number, Signs and Symbols
      return "BODMAS / PEMDAS Priority Violations:\n- Solving the expression strictly from left to right! For example, in '10 + 2 × 3', doing '10+2=12' then '12×3=36'. You MUST perform multiplication first: '2×3=6', then '10+6=16'.";
    case "20": // Numerical Problems
      return "Incorrect Variable Formulations:\n- Writing 'x + 3x = 12' as '3x = 12' or forgetting to include the baseline variable. Always define the base unknown clearly (e.g., child's age = x) and translate word phrases to algebraic terms slowly.";
    case "23": // Directions & Distances
      return "Reference Frame Mistakes & Straight Line Distance:\n- Assuming 'turning right' is always to the east. Remember: if a person is walking South, turning 'right' means they turn towards the West!\n- Forgetting that 'how far' means the shortest direct line (using the Pythagorean theorem: a² + b² = c²), not the sum of all walks.";
    case "26": // Ranking Test
      return "The Plus-One / Minus-One End Trap:\n- Forgetting to adjust by 1. For example, if Rohan is 10th from the top and 10th from the bottom in a class of students, the total number of students is 10 + 10 - 1 = 19 (since Rohan is counted twice).";
    case "27": // Legal Sequence of Word
      return "Chronological or Sizing Inversions:\n- Reversing the start and end of the sequence (e.g., sorting from Fruit to Seed instead of Seed to Fruit) or getting confused about intermediate stages (e.g., whether the flower comes before or after the fruit).";
    default:
      return "Careless Reading & Over-Thinking:\n- Rushing through the choices and picking the first option that looks similar, without reading all four options carefully.\n- Over-analyzing simple patterns and assuming a complex rule when a simple, basic rule is the correct one.";
  }
}
