import React from "react";
import { Topic } from "../types";
import { 
  Sparkles, 
  ChevronRight, 
  Play, 
  Info,
  Shield,
  Zap,
  Lightbulb,
  Trophy,
  Activity
} from "lucide-react";
import { motion } from "motion/react";

interface LessonBriefingProps {
  topic: Topic;
  onStartQuiz: () => void;
  onBack: () => void;
}

export default function LessonBriefing({ topic, onStartQuiz, onBack }: LessonBriefingProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12" id="lesson-briefing-lobby">
      {/* KBC Glowing Title Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border-2 border-amber-400/50 shadow-2xl shadow-indigo-950/40">
        {/* Glowing cosmic stars background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-10 bottom-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-yellow-300" />
              Game Show Lobby
            </div>
            <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest block font-mono">STAGE {topic.id} • {topic.moduleId} REALM</span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 leading-tight">
              {topic.name}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Prepare to face the ultimate mental challenge in <strong className="text-amber-300 font-extrabold">Kaun Banega Topper</strong>! Conquer logical puzzles, earn massive points, and secure the glorious Golden Key Points!
            </p>
          </div>

          <div className="flex gap-3 shrink-0 self-stretch md:self-auto">
            <button
              onClick={onBack}
              className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 font-display font-black text-xs transition-all cursor-pointer hover:scale-[1.02]"
            >
              ← Game Map
            </button>
            <button
              onClick={onStartQuiz}
              className="flex-1 md:flex-initial px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-indigo-950 font-display font-black text-xs shadow-lg shadow-amber-500/20 border-2 border-white/20 transition-all cursor-pointer hover:scale-[1.03] animate-magic-pulse flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Start Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Quest Breakdown */}
        <div className="bg-gradient-to-b from-indigo-950 to-slate-900 border-2 border-indigo-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.03),transparent_40%)] pointer-events-none" />
          
          <div className="flex items-center gap-2 border-b border-indigo-900/60 pb-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-amber-400/15 flex items-center justify-center text-amber-300">
              <Trophy className="w-4.5 h-4.5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-display font-black text-amber-300 text-base">Topper's Quest</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">How to Conquer this Lesson</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-xs sm:text-sm">
            <div className="flex items-start gap-3 bg-indigo-900/25 border border-indigo-900/40 p-3.5 rounded-2xl">
              <span className="text-xl shrink-0">📈</span>
              <div>
                <strong className="text-slate-100 font-bold block mb-0.5">3-Tier Challenge Path</strong>
                Climb from Easy to Medium and hard puzzles. Master each tier to unlock the throne.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-indigo-900/25 border border-indigo-900/40 p-3.5 rounded-2xl">
              <span className="text-xl shrink-0">🛡️</span>
              <div>
                <strong className="text-slate-100 font-bold block mb-0.5">Shield Lives</strong>
                You enter with 3 Shield Lives. Lock in incorrect answers and you lose a life, but safety milestones on the ladder will protect you!
              </div>
            </div>

            <div className="flex items-start gap-3 bg-indigo-900/25 border border-indigo-900/40 p-3.5 rounded-2xl">
              <span className="text-xl shrink-0">🏃</span>
              <div>
                <strong className="text-slate-100 font-bold block mb-0.5">Practice Marathon</strong>
                Switch to Marathon mode anytime to play through up to 100 questions risk-free.
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Lifelines & Golden Key Reward */}
        <div className="bg-gradient-to-b from-indigo-950 to-slate-900 border-2 border-indigo-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.03),transparent_40%)] pointer-events-none" />
          
          <div className="flex items-center gap-2 border-b border-indigo-900/60 pb-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-300">
              <Activity className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            <div>
              <h2 className="font-display font-black text-indigo-300 text-base">Lifelines & Rewards</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Tools for Victory</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-xs sm:text-sm">
            <div className="flex items-start gap-3 bg-indigo-900/25 border border-indigo-900/40 p-3.5 rounded-2xl">
              <span className="text-xl shrink-0">⚡</span>
              <div>
                <strong className="text-slate-100 font-bold block mb-0.5">KBC Lifelines Active</strong>
                Use the <strong className="text-amber-300 font-extrabold">50:50 Lifeline</strong> to eliminate two incorrect options, or activate <strong className="text-amber-300 font-extrabold">Ask Gemini Expert</strong> for a real-time AI hint!
              </div>
            </div>

            <div className="flex items-start gap-3 bg-indigo-900/25 border border-indigo-900/40 p-3.5 rounded-2xl">
              <span className="text-xl shrink-0">🔑</span>
              <div>
                <strong className="text-amber-300 font-black block mb-0.5">Golden Key Points (GKP) Unlocks</strong>
                We have removed pre-quiz spoilers! Solve the puzzles first; the coveted <strong className="text-amber-300 font-extrabold">Golden Key Points</strong> summary will unlock as a glorious reward section once you complete the lesson.
              </div>
            </div>

            <div className="bg-amber-400/10 border border-amber-400/30 p-3 rounded-xl flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[10px] sm:text-xs text-amber-300 font-bold">
                No spoilers, just logic! Complete the challenges to secure your revision keys.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lock In Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onStartQuiz}
          className="relative px-12 py-5 rounded-2xl bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-indigo-950 font-display font-black text-sm tracking-widest uppercase shadow-2xl shadow-amber-500/30 border-4 border-amber-300/60 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 group cursor-pointer animate-magic-pulse"
        >
          <span>Lock In & Start Topper Challenge! 👑</span>
          <ChevronRight className="w-5 h-5 stroke-[3.5] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
