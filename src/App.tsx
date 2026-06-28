import React, { useState, useEffect } from "react";
import { UserStats } from "./types";
import SkillTree from "./components/SkillTree";
import QuizEngine from "./components/QuizEngine";
import Analytics from "./components/Analytics";
import StrategicIntel from "./components/StrategicIntel";
import LessonBriefing from "./components/LessonBriefing";
import { TOPICS } from "./data/topicsData";
import kbtLogo from "./assets/images/kbt_logo_1782624365062.jpg";
import { 
  Compass, 
  BarChart3, 
  Award, 
  Heart, 
  Sparkles, 
  Flame,
  Info,
  Layers,
  ChevronRight,
  BookOpen,
  Brain
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_STATS: UserStats = {
  xp: 0,
  level: 1,
  streak: 0,
  lives: 3,
  lastActiveDate: new Date().toISOString().split("T")[0],
  powerups: {
    hints: 3,
    fiftyFifty: 3,
    extraLife: 2
  },
  completedTopicIds: [],
  unlockedTopicIds: ["1", "2", "7", "21"], // First topic of each category unlocked initially
  correctAnswersByTopic: {},
  totalAttemptsByTopic: {}
};

export default function App() {
  const [activeTab, setActiveTab] = useState<"map" | "intel" | "analytics">("map");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [stats, setStats] = useState<UserStats>(() => {
    const cached = localStorage.getItem("logic_academy_stats_v1");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return INITIAL_STATS;
      }
    }
    return INITIAL_STATS;
  });

  // Persist statistics on changes
  useEffect(() => {
    localStorage.setItem("logic_academy_stats_v1", JSON.stringify(stats));
  }, [stats]);

  // Handle active daily streak update on load
  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (stats.lastActiveDate !== todayStr) {
      setStats(prev => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];
        
        let newStreak = prev.streak;
        if (prev.lastActiveDate === yesterdayStr) {
          // Keep streak going!
          newStreak += 1;
        } else if (prev.lastActiveDate !== todayStr) {
          // Broke streak, reset or start with 1
          newStreak = 1;
        }

        return {
          ...prev,
          lastActiveDate: todayStr,
          streak: newStreak
        };
      });
    }
  }, []);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setQuizStarted(false);
  };

  const handleExitQuiz = () => {
    setSelectedTopicId(null);
    setQuizStarted(false);
  };

  const handleMasterAllTopics = () => {
    const allIds = TOPICS.map(t => t.id);
    const completedObj: Record<string, number> = {};
    const attemptsObj: Record<string, number> = {};
    allIds.forEach(id => {
      completedObj[id] = 3;
      attemptsObj[id] = 3;
    });

    setStats({
      xp: 1500,
      level: 15,
      streak: 7,
      lives: 3,
      lastActiveDate: new Date().toISOString().split("T")[0],
      powerups: {
        hints: 10,
        fiftyFifty: 10,
        extraLife: 10
      },
      completedTopicIds: allIds,
      unlockedTopicIds: allIds,
      correctAnswersByTopic: completedObj,
      totalAttemptsByTopic: attemptsObj
    });
  };

  return (
    <div className="min-h-screen bg-magical-sky font-sans text-gray-800 antialiased flex flex-col justify-between">
      {/* Top Playful Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-violet-100 shadow-md shadow-violet-100/10 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { setSelectedTopicId(null); setQuizStarted(false); setActiveTab("map"); }}>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-400 bg-indigo-950 shadow-lg shadow-indigo-950/20 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
              <img 
                src={kbtLogo} 
                alt="Kaun Banega Topper Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Center Tabs navigation */}
          {!selectedTopicId && (
            <nav className="hidden sm:flex bg-violet-50/75 p-1 rounded-2xl border border-violet-150/40 shadow-inner">
              <button
                onClick={() => setActiveTab("map")}
                className={`px-5 py-2.5 rounded-xl text-xs font-black font-display tracking-wide transition-all flex items-center gap-1.5 ${
                  activeTab === "map"
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-150 scale-[1.03]"
                    : "text-indigo-950/70 hover:text-indigo-900 hover:bg-white/40"
                }`}
              >
                <Compass className="w-4 h-4 text-pink-400" />
                Quest Map
              </button>
              <button
                onClick={() => setActiveTab("intel")}
                className={`px-5 py-2.5 rounded-xl text-xs font-black font-display tracking-wide transition-all flex items-center gap-1.5 ${
                  activeTab === "intel"
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-150 scale-[1.03]"
                    : "text-indigo-950/70 hover:text-indigo-900 hover:bg-white/40"
                }`}
              >
                <Brain className="w-4 h-4 text-amber-400 animate-pulse" />
                Strategic Intel
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-5 py-2.5 rounded-xl text-xs font-black font-display tracking-wide transition-all flex items-center gap-1.5 ${
                  activeTab === "analytics"
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-150 scale-[1.03]"
                    : "text-indigo-950/70 hover:text-indigo-900 hover:bg-white/40"
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                Analytics & Drills
              </button>
            </nav>
          )}

          {/* User Score Stats indicators */}
          <div className="flex items-center gap-2.5">
            {/* Level bubble */}
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-black font-display px-4 py-1.5 rounded-2xl text-xs shadow-md shadow-indigo-100 flex items-center gap-1.5 hover:scale-105 transition-transform duration-200">
              <Award className="w-4 h-4 text-yellow-300 animate-bounce" />
              <span>Level {stats.level}</span>
            </div>

            {/* XP progress */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black font-display px-4 py-1.5 rounded-2xl text-xs shadow-md shadow-amber-100 flex items-center gap-1.5 hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 text-yellow-100 fill-white animate-pulse" />
              <span>{stats.xp} <span className="font-semibold text-[10px] text-amber-100">XP</span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile-only Bottom Bar tabs */}
      {!selectedTopicId && (
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 bg-white/80 backdrop-blur-xl rounded-3xl border border-violet-100/70 shadow-2xl shadow-indigo-500/20 flex justify-around p-1.5">
          <button
            onClick={() => setActiveTab("map")}
            className={`flex-grow py-2.5 rounded-2xl text-center flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === "map" ? "text-indigo-600 bg-indigo-50/70 font-black" : "text-gray-400"
            }`}
          >
            <Compass className="w-5 h-5 text-indigo-500" />
            <span className="text-[10px] font-display font-black">Quest Map</span>
          </button>
          <button
            onClick={() => setActiveTab("intel")}
            className={`flex-grow py-2.5 rounded-2xl text-center flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === "intel" ? "text-indigo-600 bg-indigo-50/70 font-black" : "text-gray-400"
            }`}
          >
            <Brain className="w-5 h-5 text-pink-500" />
            <span className="text-[10px] font-display font-black">Strategic Intel</span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-grow py-2.5 rounded-2xl text-center flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === "analytics" ? "text-indigo-600 bg-indigo-50/70 font-black" : "text-gray-400"
            }`}
          >
            <BarChart3 className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] font-display font-black">Analytics</span>
          </button>
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex gap-8">
        {/* Playable content area */}
        <div className="flex-grow space-y-6">
          <AnimatePresence mode="wait">
            {selectedTopicId ? (
              <motion.div
                key={quizStarted ? "quiz" : "briefing"}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {quizStarted ? (
                  <QuizEngine
                    topicId={selectedTopicId}
                    userStats={stats}
                    onUpdateStats={setStats}
                    onExit={handleExitQuiz}
                  />
                ) : (
                  (() => {
                    const selectedTopic = TOPICS.find(t => t.id === selectedTopicId);
                    return selectedTopic ? (
                      <LessonBriefing
                        topic={selectedTopic}
                        onStartQuiz={() => setQuizStarted(true)}
                        onBack={handleExitQuiz}
                      />
                    ) : null;
                  })()
                )}
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "map" && (
                  <SkillTree 
                    userStats={stats} 
                    onSelectTopic={handleSelectTopic} 
                  />
                )}
                {activeTab === "intel" && (
                  <StrategicIntel />
                )}
                {activeTab === "analytics" && (
                  <Analytics 
                    userStats={stats} 
                    onSelectTopic={handleSelectTopic} 
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Humble Footer */}
      <footer className="text-center py-8 text-gray-400 text-xs border-t border-gray-150/40 bg-white mt-12 pb-24 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Logic Reasoning Academy. Structured according to the 36 NMMS Mental Ability topics.</p>
          <div className="flex items-center gap-4 font-semibold">
            <button 
              onClick={handleMasterAllTopics}
              className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3.5 py-1.5 rounded-xl font-bold transition-all border border-indigo-150 cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              Master All Topics & Badges 🏆
            </button>
            <button 
              onClick={() => setStats(INITIAL_STATS)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer font-bold px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-all"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
