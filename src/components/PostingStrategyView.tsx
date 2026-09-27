import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
  Flame,
  ArrowRight,
  Filter
} from 'lucide-react';
import { CreatorProfile, ContentPlanItem } from '../types';
import { INITIAL_CONTENT_CALENDAR } from '../data/mockData';

interface PostingStrategyViewProps {
  profile: CreatorProfile;
}

export const PostingStrategyView: React.FC<PostingStrategyViewProps> = ({ profile }) => {
  const [calendarItems, setCalendarItems] = useState<ContentPlanItem[]>(INITIAL_CONTENT_CALENDAR);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDay, setNewDay] = useState<ContentPlanItem['day']>('Tuesday');
  const [newTime, setNewTime] = useState('6:30 PM - 7:30 PM');
  const [newTopic, setNewTopic] = useState('');
  const [newStage, setNewStage] = useState<ContentPlanItem['stage']>('Idea');
  const [newSeries, setNewSeries] = useState('');
  const [newHook, setNewHook] = useState('');

  const daysOfWeek: ContentPlanItem['day'][] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ContentPlanItem = {
      id: `cp-${Date.now()}`,
      day: newDay,
      timeSlot: newTime,
      title: newTitle,
      topic: newTopic || profile.niche,
      stage: newStage,
      seriesName: newSeries || undefined,
      targetHook: newHook || 'Opening with curiosity gap...'
    };

    setCalendarItems([...calendarItems, newItem]);
    setNewTitle('');
    setNewTopic('');
    setNewSeries('');
    setNewHook('');
    setShowAddModal(false);
  };

  const handleToggleStage = (id: string) => {
    const stages: ContentPlanItem['stage'][] = ['Idea', 'Scripted', 'Recorded', 'Published'];
    setCalendarItems(
      calendarItems.map((item) => {
        if (item.id === id) {
          const currentIndex = stages.indexOf(item.stage);
          const nextIndex = (currentIndex + 1) % stages.length;
          return { ...item, stage: stages[nextIndex] };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <CalendarDays className="w-3.5 h-3.5" />
          Content Cadence & Planning
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Posting Strategy & Editorial Calendar
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Algorithmic recommendation momentum relies on audience predictability. Establish a dependable rhythm, serialize your concepts, and post during peak viewer activity windows.
        </p>
      </div>

      {/* Recommended Peak Posting Windows Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e1726] to-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-white text-sm">
                Target Audience Peak Activity Windows ({profile.niche})
              </h3>
              <p className="text-[11px] text-slate-400">
                Calibrated against active mobile engagement peaks
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold self-start sm:self-center">
            Local Creator Timezone
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-cyan-400">
              Primary Window #1 (Lunch Rush)
            </span>
            <p className="text-sm font-bold text-white">11:30 AM – 1:30 PM</p>
            <p className="text-[10px] text-slate-400">
              Ideal for quick tips, hacks, and educational tutorials.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400">
              Primary Window #2 (Evening Peak)
            </span>
            <p className="text-sm font-bold text-white">6:30 PM – 8:30 PM</p>
            <p className="text-[10px] text-slate-400">
              Highest watch time window for in-depth 1-minute+ series.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-400">
              Weekend Window (Late Morning)
            </span>
            <p className="text-sm font-bold text-white">10:00 AM – 12:30 PM</p>
            <p className="text-[10px] text-slate-400">
              High recreational browsing time; test new storytelling formats.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Editorial Calendar */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span>Weekly Content Pipeline</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-normal">
                {calendarItems.length} Planned
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Click any stage badge to advance from Idea → Scripted → Recorded → Published
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all self-start sm:self-center"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Plan New Video</span>
          </button>
        </div>

        {/* 7-Day Columns */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {daysOfWeek.map((day) => {
            const dayItems = calendarItems.filter((item) => item.day === day);
            const isToday = day === 'Monday';

            return (
              <div
                key={day}
                className={`p-3 rounded-xl border flex flex-col justify-between min-h-[220px] ${
                  isToday
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800/80'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white">{day.slice(0, 3)}</span>
                    {isToday && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500 text-slate-950 font-extrabold">
                        TODAY
                      </span>
                    )}
                  </div>

                  {dayItems.length === 0 ? (
                    <div className="py-6 text-center text-[10px] text-slate-400">
                      Rest / Buffer
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {dayItems.map((item) => {
                        let stageColor = 'bg-slate-800 text-slate-300 border-slate-700';
                        if (item.stage === 'Scripted') stageColor = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
                        if (item.stage === 'Recorded') stageColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
                        if (item.stage === 'Published') stageColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

                        return (
                          <div
                            key={item.id}
                            className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5 text-left text-xs hover:border-slate-700 transition-colors"
                          >
                            {item.seriesName && (
                              <span className="text-[9px] font-bold text-cyan-400 block truncate">
                                {item.seriesName}
                              </span>
                            )}
                            <p className="font-semibold text-white leading-tight line-clamp-2">
                              {item.title}
                            </p>
                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                              <span>{item.timeSlot.split('-')[0]}</span>
                              <button
                                onClick={() => handleToggleStage(item.id)}
                                className={`text-[9px] px-1.5 py-0.5 rounded font-bold border transition-all ${stageColor}`}
                                title="Click to advance stage"
                              >
                                {item.stage}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => {
                      setNewDay(day);
                      setShowAddModal(true);
                    }}
                    className="w-full py-1 text-[10px] text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Pillars: Series & The 80/20 Rule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-white text-sm">
              The "Follower Binge" Series Architecture
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Stand-alone videos get views; episodic series get followers. When a viewer discovers "Episode 4 of 5" on their FYP, their immediate psychological urge is to visit your profile to watch Episodes 1, 2, and 3.
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li>Number your videos explicitly in the thumbnail text card ('Part 1/3')</li>
            <li>Group episodes into a designated in-app TikTok playlist</li>
            <li>End each episode with an unanswered open loop resolved in tomorrow's post</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-white text-sm">The 80/20 Experimentation Rule</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Avoid getting trapped in a creative rut or confusing the algorithm:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-cyan-300">80% Core Pillar Content:</strong> Proven topics, your signature style, and expected niche tutorials that your core audience relies on.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-purple-300">20% Wild Card Experiments:</strong> New visual editing styles, controversial opinion pieces, or new sound formats to discover your next viral series.
            </div>
          </div>
        </div>
      </div>

      {/* Plan New Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b0f17] border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm">Schedule Content Piece</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Video Working Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Part 1: How to automate Notion in 60s"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Day of Week</label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(e.target.value as ContentPlanItem['day'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    {daysOfWeek.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Time Window</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option>11:30 AM - 1:30 PM (Lunch)</option>
                    <option>6:30 PM - 8:30 PM (Evening)</option>
                    <option>10:00 AM - 12:00 PM (Morning)</option>
                    <option>8:30 PM - 10:00 PM (Night)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Series Name (Optional)</label>
                  <input
                    type="text"
                    value={newSeries}
                    onChange={(e) => setNewSeries(e.target.value)}
                    placeholder="e.g. Notion Hacks (1/3)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Initial Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as ContentPlanItem['stage'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option>Idea</option>
                    <option>Scripted</option>
                    <option>Recorded</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Planned 3-Second Hook</label>
                <input
                  type="text"
                  value={newHook}
                  onChange={(e) => setNewHook(e.target.value)}
                  placeholder="e.g. Stop organizing your notes by date..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20"
                >
                  Save to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
