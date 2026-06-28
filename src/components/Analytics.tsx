import React from "react";
import { UserStats, ModuleId, Badge } from "../types";
import { TOPICS } from "../data/topicsData";
import { 
  Award, 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  ShieldCheck, 
  Play, 
  Flame, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Lock
} from "lucide-react";
import { motion } from "motion/react";

interface AnalyticsProps {
  userStats: UserStats;
  onSelectTopic: (topicId: string) => void;
}

export default function Analytics({ userStats, onSelectTopic }: AnalyticsProps) {
  // 1. Calculate stats per module
  const getModuleStats = (moduleId: ModuleId) => {
    const moduleTopics = TOPICS.filter(t => t.moduleId === moduleId);
    const completed = moduleTopics.filter(t => userStats.completedTopicIds.includes(t.id)).length;
    const total = moduleTopics.length;

    let totalAttempts = 0;
    let correctAttempts = 0;

    moduleTopics.forEach(t => {
      totalAttempts += userStats.totalAttemptsByTopic[t.id] || 0;
      correctAttempts += userStats.correctAnswersByTopic[t.id] || 0;
    });

    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
    const progressPercent = Math.round((completed / total) * 100);

    return { completed, total, accuracy, progressPercent, totalAttempts };
  };

  const numStats = getModuleStats("Numerical");
  const verbalStats = getModuleStats("Verbal");
  const visualStats = getModuleStats("Visual");
  const sitStats = getModuleStats("Situational");

  // 2. Identify the weakest module based on accuracy of topics with attempts
  const getWeakestModule = (): { id: ModuleId; title: string; accuracy: number; suggestTopicId: string } | null => {
    const stats = [
      { id: "Numerical" as ModuleId, title: "Numerical Reasoning", ...numStats },
      { id: "Verbal" as ModuleId, title: "Verbal & Linguistic Logic", ...verbalStats },
      { id: "Visual" as ModuleId, title: "Visual & Spatial Intelligence", ...visualStats },
      { id: "Situational" as ModuleId, title: "Situational & Logical Deduction", ...sitStats }
    ];

    // Filter modules that have at least some attempts
    const modulesWithAttempts = stats.filter(m => m.totalAttempts > 0);

    if (modulesWithAttempts.length === 0) {
      // Diagnostic Mode: default to Topic 1 (Numerical) as first drill
      return {
        id: "Numerical",
        title: "Numerical Reasoning",
        accuracy: 0,
        suggestTopicId: "1"
      };
    }

    // Sort by lowest accuracy
    modulesWithAttempts.sort((a, b) => a.accuracy - b.accuracy);
    const weakest = modulesWithAttempts[0];

    // Suggest an incomplete topic in this weakest module
    const weakestTopics = TOPICS.filter(t => t.moduleId === weakest.id);
    const incomplete = weakestTopics.find(t => !userStats.completedTopicIds.includes(t.id));
    const suggestTopicId = incomplete ? incomplete.id : weakestTopics[0].id;

    return {
      id: weakest.id,
      title: weakest.title,
      accuracy: weakest.accuracy,
      suggestTopicId
    };
  };

  const weakestModule = getWeakestModule();

  // 3. Define Badges
  const badges: Badge[] = [
    {
      id: "streak_3",
      name: "Flame Rider",
      description: "Answer questions correctly on 3+ consecutive attempts.",
      iconName: "🔥",
      unlocked: userStats.streak >= 3
    },
    {
      id: "mirror_master",
      name: "Reflection Ruler",
      description: "Complete Mirror Image (Topic 33) and Water Image (Topic 34).",
      iconName: "🪞",
      unlocked: userStats.completedTopicIds.includes("33") && userStats.completedTopicIds.includes("34")
    },
    {
      id: "venn_voyager",
      name: "Venn Voyager",
      description: "Complete the Venn Diagram puzzle successfully.",
      iconName: "⭕",
      unlocked: userStats.completedTopicIds.includes("8")
    },
    {
      id: "num_master",
      name: "Number Wizard",
      description: "Master 3+ topics in the Numerical Reasoning module.",
      iconName: "🔢",
      unlocked: TOPICS.filter(t => t.moduleId === "Numerical" && userStats.completedTopicIds.includes(t.id)).length >= 3
    },
    {
      id: "verbal_master",
      name: "Lexicon Legend",
      description: "Master 3+ topics in the Verbal Logic module.",
      iconName: "✍️",
      unlocked: TOPICS.filter(t => t.moduleId === "Verbal" && userStats.completedTopicIds.includes(t.id)).length >= 3
    },
    {
      id: "spatial_master",
      name: "Spatial Sovereign",
      description: "Master 3+ topics in the Visual & Spatial module.",
      iconName: "🧩",
      unlocked: TOPICS.filter(t => t.moduleId === "Visual" && userStats.completedTopicIds.includes(t.id)).length >= 3
    },
    {
      id: "situational_master",
      name: "Deduction Detective",
      description: "Master 3+ topics in the Situational & Logical Deduction module.",
      iconName: "🕵️‍♂️",
      unlocked: TOPICS.filter(t => t.moduleId === "Situational" && userStats.completedTopicIds.includes(t.id)).length >= 3
    },
    {
      id: "logic_grandmaster",
      name: "Grandmaster of Logic",
      description: "Master 10+ logical reasoning topics across all domains.",
      iconName: "👑",
      unlocked: userStats.completedTopicIds.length >= 10
    },
    {
      id: "omnipresent_brain",
      name: "Universal Thinker",
      description: "Master/Unlock all 36 mental ability curriculum topics.",
      iconName: "🧠",
      unlocked: userStats.completedTopicIds.length >= 36
    },
    {
      id: "high_xp",
      name: "Logic Sovereign",
      description: "Accumulate more than 1000+ total Logic Experience Points (XP).",
      iconName: "🌟",
      unlocked: userStats.xp >= 1000
    }
  ];

  const unlockedBadgesCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="space-y-8 text-left pb-10">
      {/* Title Header */}
      <div className="flex items-center gap-3 relative">
        <div className="bg-gradient-to-tr from-indigo-500 via-pink-500 to-violet-600 p-3 rounded-2xl text-white shadow-md shadow-indigo-150 animate-float">
          <BarChart3 className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-black tracking-tight text-indigo-950">Adventure Stats</h1>
          <p className="text-xs sm:text-sm text-indigo-950/60 font-semibold">Track your logical mastery levels, domain powers, and legendary badges!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module Performance Gauges (Left Side Column) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border-2 border-violet-100/50 p-6 shadow-md space-y-6">
            <h2 className="text-xl font-display font-black text-indigo-950 flex items-center gap-2">
              <Compass className="w-5 h-5 text-pink-500 animate-spin-slow" />
              Logical Domain Powers
            </h2>

            <div className="space-y-5">
              {/* Numerical */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-indigo-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Numerical Reasoning
                  </span>
                  <span className="font-mono font-bold text-gray-500">{numStats.accuracy}% Accuracy</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500" 
                    style={{ width: `${numStats.accuracy}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                  <span>Topics unlocked: {TOPICS.filter(t => t.moduleId === "Numerical" && (t.id === "1" || userStats.unlockedTopicIds.includes(t.id))).length}/{numStats.total}</span>
                  <span>{numStats.completed} Cleared</span>
                </div>
              </div>

              {/* Verbal */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-indigo-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    Verbal Logic
                  </span>
                  <span className="font-mono font-bold text-gray-500">{verbalStats.accuracy}% Accuracy</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500" 
                    style={{ width: `${verbalStats.accuracy}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                  <span>Topics unlocked: {TOPICS.filter(t => t.moduleId === "Verbal" && (t.id === "2" || userStats.unlockedTopicIds.includes(t.id))).length}/{verbalStats.total}</span>
                  <span>{verbalStats.completed} Cleared</span>
                </div>
              </div>

              {/* Visual */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-indigo-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Visual & Spatial
                  </span>
                  <span className="font-mono font-bold text-gray-500">{visualStats.accuracy}% Accuracy</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-500" 
                    style={{ width: `${visualStats.accuracy}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                  <span>Topics unlocked: {TOPICS.filter(t => t.moduleId === "Visual" && (t.id === "7" || userStats.unlockedTopicIds.includes(t.id))).length}/{visualStats.total}</span>
                  <span>{visualStats.completed} Cleared</span>
                </div>
              </div>

              {/* Situational */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-indigo-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Situational Deduction
                  </span>
                  <span className="font-mono font-bold text-gray-500">{sitStats.accuracy}% Accuracy</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 transition-all duration-500" 
                    style={{ width: `${sitStats.accuracy}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                  <span>Topics unlocked: {TOPICS.filter(t => t.moduleId === "Situational" && (t.id === "21" || userStats.unlockedTopicIds.includes(t.id))).length}/{sitStats.total}</span>
                  <span>{sitStats.completed} Cleared</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adaptive Drill Suggester */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 rounded-3xl p-6 text-white space-y-4 shadow-lg border-2 border-indigo-500/20 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-200 backdrop-blur-md">
                <Target className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                Adaptive Tutoring
              </div>
              <h3 className="text-xl font-display font-black leading-tight">Daily Oracle Quest</h3>
              
              {weakestModule ? (
                <div className="space-y-3 text-left">
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    Based on your recent attempts, we detected that you need more practice with **{weakestModule.title}** (Accuracy is currently {weakestModule.accuracy}%).
                  </p>
                  
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[9px] font-black uppercase text-indigo-300 tracking-wider">Suggested Target Node</span>
                    <p className="font-bold text-sm leading-tight text-white line-clamp-1">
                      {TOPICS.find(t => t.id === weakestModule.suggestTopicId)?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-indigo-200 leading-relaxed">
                  Start solving logical puzzles to gather diagnostics. Our AI algorithm will analyze your weak points and suggest targeted focus modules!
                </p>
              )}
            </div>

            {weakestModule && (
              <button
                onClick={() => onSelectTopic(weakestModule.suggestTopicId)}
                className="w-full bg-white text-indigo-950 hover:bg-violet-50 py-3.5 rounded-2xl font-black font-display text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] mt-4 relative z-10"
              >
                <Play className="w-4 h-4 fill-current text-indigo-950" />
                Launch Adaptive Drill
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Badges Cabinet */}
      <div className="bg-white rounded-3xl border-2 border-amber-100/60 p-6 shadow-md space-y-6 relative overflow-hidden bg-gradient-to-b from-white to-amber-50/10">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-32 h-32 bg-amber-200/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex justify-between items-center relative z-10">
          <h2 className="text-xl font-display font-black text-indigo-950 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />
            The Vault of Legend Badges
          </h2>
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-sm shadow-amber-100">
            👑 {unlockedBadgesCount}/{badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {badges.map((badge, idx) => (
            <div 
              key={badge.id}
              className={`p-4 rounded-2xl border-2 flex items-start gap-4 transition-all ${
                badge.unlocked 
                  ? "bg-white border-violet-100 hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5" 
                  : "bg-slate-50/50 border-slate-200/40 opacity-50 select-none cursor-not-allowed"
              }`}
            >
              {/* Badge Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner ${
                badge.unlocked 
                  ? "bg-gradient-to-tr from-amber-100 to-yellow-200 border-2 border-white shadow-md animate-float" 
                  : "bg-slate-100 border border-slate-200/80"
              }`}>
                {badge.unlocked ? badge.iconName : <Lock className="w-4 h-4 text-slate-400" />}
              </div>

              {/* Badge details */}
              <div className="space-y-1">
                <h4 className={`font-display font-bold text-sm ${badge.unlocked ? "text-indigo-950" : "text-gray-400"}`}>
                  {badge.name}
                </h4>
                <p className="text-xs text-indigo-950/60 leading-normal font-semibold">
                  {badge.description}
                </p>
                {badge.unlocked && (
                  <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-[9px] px-2 py-0.5 rounded-full tracking-wide">
                    EARNED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
