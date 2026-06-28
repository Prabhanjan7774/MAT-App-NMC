import React from "react";
import { TOPICS } from "../data/topicsData";
import { Topic, ModuleId, UserStats } from "../types";
import { 
  Play, 
  Lock, 
  CheckCircle2, 
  Award, 
  HelpCircle, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  Check,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { motion } from "motion/react";

interface SkillTreeProps {
  userStats: UserStats;
  onSelectTopic: (topicId: string) => void;
}

export default function SkillTree({ userStats, onSelectTopic }: SkillTreeProps) {
  const modules: { id: ModuleId; title: string; color: string; bg: string; border: string; accent: string; icon: React.ReactNode }[] = [
    {
      id: "Numerical",
      title: "Numerical Reasoning",
      color: "from-emerald-500 to-teal-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      accent: "text-emerald-600 bg-emerald-100",
      icon: <Layers className="w-5 h-5 text-emerald-600" />
    },
    {
      id: "Verbal",
      title: "Verbal & Linguistic Logic",
      color: "from-indigo-500 to-blue-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      accent: "text-indigo-600 bg-indigo-100",
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />
    },
    {
      id: "Visual",
      title: "Visual & Spatial Intelligence",
      color: "from-amber-500 to-orange-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      accent: "text-amber-600 bg-amber-100",
      icon: <Sparkles className="w-5 h-5 text-amber-600" />
    },
    {
      id: "Situational",
      title: "Situational & Logical Deduction",
      color: "from-rose-500 to-pink-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      accent: "text-rose-600 bg-rose-100",
      icon: <TrendingUp className="w-5 h-5 text-rose-600" />
    }
  ];

  // Group topics by module
  const getTopicsByModule = (moduleId: ModuleId) => {
    return TOPICS.filter(t => t.moduleId === moduleId).sort((a, b) => a.order - b.order);
  };

  // Check if a topic is unlocked
  const isTopicUnlocked = (topic: Topic) => {
    const moduleTopics = TOPICS.filter(t => t.moduleId === topic.moduleId).sort((a, b) => a.order - b.order);
    const currentIndex = moduleTopics.findIndex(t => t.id === topic.id);
    
    // First topic of each category is always unlocked
    if (currentIndex === 0) {
      return true;
    }
    
    // Otherwise, unlocked if explicitly in unlocked list
    if (userStats.unlockedTopicIds.includes(topic.id)) {
      return true;
    }
    
    // Or if the previous topic in the same module is completed
    if (currentIndex > 0) {
      const prevTopic = moduleTopics[currentIndex - 1];
      if (userStats.completedTopicIds.includes(prevTopic.id)) {
        return true;
      }
    }
    
    return false;
  };

  // Get topic completion status
  const getTopicCompletionState = (topicId: string) => {
    const isCompleted = userStats.completedTopicIds.includes(topicId);
    if (isCompleted) return "completed";
    
    // Check if there are any correct attempts
    const correctCount = userStats.correctAnswersByTopic[topicId] || 0;
    if (correctCount > 0) return "active";
    
    return "unstarted";
  };

  return (
    <div className="space-y-12 pb-10">
      {/* Platform Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4 relative py-6">
        {/* Whimsical decorations */}
        <div className="absolute -top-4 -left-6 text-4xl animate-float opacity-75 select-none pointer-events-none">🎈</div>
        <div className="absolute top-8 -right-6 text-3xl animate-float-slow opacity-75 select-none pointer-events-none">✨</div>
        <div className="absolute -bottom-2 left-10 text-3xl animate-float-slower opacity-50 select-none pointer-events-none">☁️</div>

        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-indigo-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-100">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
          Kaun Banega Topper
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-indigo-950">
          Your Logic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-violet-600 animate-pulse-glowing">Quest Map</span>
        </h1>
        
        <p className="text-sm sm:text-base text-indigo-950/70 font-medium leading-relaxed max-w-lg mx-auto">
          Embark on a grand adventure! Answer questions in the logic paths to gain Experience Points (XP), save your Shield Hearts, and unlock legendary mental badges! 🎡
        </p>
      </div>

      {/* Modules Path */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {modules.map((mod, index) => {
          const modTopics = getTopicsByModule(mod.id);
          const completedCount = modTopics.filter(t => userStats.completedTopicIds.includes(t.id)).length;
          const totalCount = modTopics.length;
          const completionPercentage = Math.round((completedCount / totalCount) * 100);

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl border-2 border-violet-100/50 shadow-md card-magical-hover flex flex-col overflow-hidden"
              id={`module-card-${mod.id}`}
            >
              {/* Module Header */}
              <div className={`bg-gradient-to-br ${mod.color} p-6 text-white space-y-3 relative overflow-hidden`}>
                {/* Decorative glowing overlay */}
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md shadow-inner">
                      {mod.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
                        Adventure Realm {String.fromCharCode(65 + index)}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight">{mod.title}</h2>
                    </div>
                  </div>
                  <div className="bg-white/20 border border-white/20 px-3 py-1 rounded-full text-xs font-extrabold backdrop-blur-md">
                    ⭐ {completedCount}/{totalCount} Cleared
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2 relative z-10">
                  <div className="flex justify-between text-xs font-bold text-white/90">
                    <span>Realm Mastery</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/25 rounded-full p-[2px] overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-300 to-white rounded-full transition-all duration-500 ease-out shadow-sm animate-pulse" 
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Topics Tree Layout */}
              <div className="p-6 bg-gradient-to-b from-slate-50/20 to-violet-50/30 flex-grow relative">
                <div className="relative space-y-4">
                  {/* Glowing vertical connector line */}
                  <div className="absolute left-6 top-6 bottom-6 w-1 bg-gradient-to-b from-indigo-300 via-pink-300 to-amber-300 opacity-60 rounded-full pointer-events-none" />

                  {modTopics.map((topic, tIdx) => {
                    const unlocked = isTopicUnlocked(topic);
                    const state = getTopicCompletionState(topic.id);
                    
                    return (
                      <motion.div
                        key={topic.id}
                        whileHover={unlocked ? { x: 6, scale: 1.01 } : {}}
                        whileTap={unlocked ? { scale: 0.99 } : {}}
                        className={`relative pl-14 pr-4 py-4 rounded-2xl transition-all border-2 ${
                          unlocked 
                            ? "bg-white border-violet-100/60 hover:border-violet-300 hover:shadow-md cursor-pointer" 
                            : "bg-gray-150/40 border-gray-200/30 opacity-70 cursor-not-allowed"
                        }`}
                        onClick={() => unlocked && onSelectTopic(topic.id)}
                        id={`topic-node-${topic.id}`}
                      >
                        {/* Interactive Node Indicator */}
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                          {state === "completed" ? (
                            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 border-2 border-white shadow-md flex items-center justify-center text-white transform hover:scale-110 transition-transform">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : state === "active" ? (
                            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-pink-500 to-amber-400 border-2 border-white shadow-lg flex items-center justify-center text-white animate-float">
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </div>
                          ) : unlocked ? (
                            <div className="w-9 h-9 rounded-2xl bg-white border-2 border-indigo-200 hover:border-indigo-400 shadow-sm flex items-center justify-center text-indigo-600 font-black font-display text-sm transition-colors">
                              {topic.order}
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-2xl bg-slate-150 border-2 border-slate-200 shadow-inner flex items-center justify-center text-slate-400">
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        {/* Node content */}
                        <div className="flex justify-between items-center gap-4">
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black tracking-widest text-indigo-500/80 uppercase">
                                Stage {topic.id}
                              </span>
                              {state === "completed" && (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-black tracking-wide">
                                  MASTERED 👑
                                </span>
                              )}
                              {!unlocked && (
                                <span className="bg-slate-100 text-slate-500 text-[10px] px-2.5 py-0.5 rounded-full font-bold tracking-wide">
                                  LOCKED 🔒
                                </span>
                              )}
                            </div>
                            <h3 className={`font-display font-bold text-base leading-snug ${unlocked ? "text-indigo-950" : "text-gray-400"}`}>
                              {topic.name}
                            </h3>
                            <p className="text-xs text-indigo-950/60 line-clamp-2 leading-relaxed">
                              {topic.description}
                            </p>
                          </div>

                          {/* Action Button */}
                          {unlocked && (
                            <div className="shrink-0">
                              <button 
                                className={`p-2.5 rounded-xl transition-all shadow-xs ${
                                  state === "completed"
                                    ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:scale-105"
                                }`}
                              >
                                <ChevronRight className="w-4 h-4 stroke-[3]" />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
