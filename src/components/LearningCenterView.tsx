import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Award,
  ChevronRight,
  Play
} from 'lucide-react';
import { Lesson, CreatorProfile } from '../types';
import { EDUCATIONAL_LESSONS } from '../data/mockData';

interface LearningCenterViewProps {
  profile: CreatorProfile;
}

export const LearningCenterView: React.FC<LearningCenterViewProps> = ({ profile }) => {
  const [lessons, setLessons] = useState<Lesson[]>(EDUCATIONAL_LESSONS);
  const [activeLessonId, setActiveLessonId] = useState<string>(EDUCATIONAL_LESSONS[0].id);
  const [exerciseInput, setExerciseInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const activeLesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];
  const completedCount = lessons.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const handleToggleComplete = (id: string) => {
    setLessons(
      lessons.map((l) => (l.id === id ? { ...l, completed: !l.completed } : l))
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
            <GraduationCap className="w-3.5 h-3.5" />
            Creator Curriculum
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Algorithm & Growth Academy
          </h2>
          <p className="text-xs text-slate-400">
            Learn the science of TikTok organic growth: Learn → Example → Try It → Checklist
          </p>
        </div>

        {/* Academy Progress Badge */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 self-start sm:self-center">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Academy Progress</span>
              <span className="text-xs font-bold text-cyan-400">{progressPercent}%</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {completedCount} of {lessons.length} Modules Completed
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Classroom: Lesson Sidebar + Active Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Lessons Navigation List (4 cols) */}
        <div className="lg:col-span-4 space-y-2 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 max-h-[700px] overflow-y-auto scrollbar-thin">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
            Curriculum Modules
          </p>

          {lessons.map((lesson, idx) => {
            const isActive = lesson.id === activeLessonId;
            return (
              <button
                key={lesson.id}
                onClick={() => {
                  setActiveLessonId(lesson.id);
                  setExerciseInput('');
                  setShowHint(false);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all border flex items-start justify-between gap-3 ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-white shadow-sm shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-mono">0{idx + 1}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-semibold truncate">
                      {lesson.category}
                    </span>
                  </div>
                  <p className="text-xs font-semibold leading-snug truncate">{lesson.title}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {lesson.durationMinutes} min read
                  </p>
                </div>

                <div className="shrink-0 mt-1">
                  {lesson.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Active Lesson View (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          {/* Lesson Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                {activeLesson.category} • Module
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {activeLesson.title}
              </h3>
              <p className="text-xs text-slate-400">{activeLesson.summary}</p>
            </div>

            <button
              onClick={() => handleToggleComplete(activeLesson.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 self-start sm:self-center shrink-0 ${
                activeLesson.completed
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{activeLesson.completed ? 'Completed' : 'Mark Complete'}</span>
            </button>
          </div>

          {/* Section 1: LEARN */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              1. Learn the Principle
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {activeLesson.learnContent.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Section 2: REAL-WORLD EXAMPLE */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              2. Real-World Case Study
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-1">
                <span className="font-bold text-emerald-400 block">✓ The Winning Approach</span>
                <p className="text-slate-300 leading-relaxed">
                  "{activeLesson.realWorldExample.good}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-1">
                <span className="font-bold text-rose-400 block">✗ The Mistake</span>
                <p className="text-slate-300 leading-relaxed">
                  "{activeLesson.realWorldExample.bad}"
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <strong className="text-cyan-400">Core Takeaway:</strong>{' '}
              {activeLesson.realWorldExample.takeaway}
            </div>
          </div>

          {/* Section 3: TRY IT INTERACTIVE EXERCISE */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <span>3. Try It Yourself Exercise</span>
              </h4>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                {showHint ? 'Hide Solution Hint' : 'Reveal Solution Hint'}
              </button>
            </div>

            <p className="text-xs font-semibold text-white">
              {activeLesson.interactiveExercise.prompt}
            </p>

            <textarea
              rows={2}
              value={exerciseInput}
              onChange={(e) => setExerciseInput(e.target.value)}
              placeholder={activeLesson.interactiveExercise.placeholder}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />

            {showHint && (
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 animate-in fade-in">
                <strong>Recommended Model Answer:</strong> {activeLesson.interactiveExercise.solutionHint}
              </div>
            )}
          </div>

          {/* Section 4: ACTION CHECKLIST */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              4. Implementation Checklist
            </h4>
            <div className="space-y-2">
              {activeLesson.checklist.map((chk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{chk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
