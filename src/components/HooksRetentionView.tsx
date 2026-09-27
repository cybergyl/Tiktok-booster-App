import React, { useState } from 'react';
import {
  Anchor,
  Sparkles,
  Clock,
  Copy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingDown,
  Layers,
  Zap,
  Play,
  Camera,
  Mic,
  Video
} from 'lucide-react';
import { CreatorProfile, HookTemplate } from '../types';
import { HOOK_TEMPLATES } from '../data/mockData';
import { CameraRecorder } from './CameraRecorder';

interface HooksRetentionViewProps {
  profile: CreatorProfile;
}

export const HooksRetentionView: React.FC<HooksRetentionViewProps> = ({ profile }) => {
  const [topicInput, setTopicInput] = useState('Organizing daily workflow and tasks');
  const [selectedArchetype, setSelectedArchetype] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [rehearsingHook, setRehearsingHook] = useState<string | null>(null);
  const [recordedRehearsal, setRecordedRehearsal] = useState<{
    duration: number;
    url: string;
    transcript?: string;
  } | null>(null);

  // Dynamic hook generator based on user input
  const generatedHooks = [
    {
      id: 'gen-1',
      archetype: 'The Curiosity Gap',
      hookText: `Most people struggle with ${topicInput.toLowerCase()}, but this one subtle change fixes it in seconds.`,
      pacing: 'Deliver words 1-6 in 0.8s; reveal the first screen movement at 1.4s.',
      psychology: 'Creates unresolved tension in the subconscious brain that forces the user to wait for the resolution.'
    },
    {
      id: 'gen-2',
      archetype: 'The Counter-Intuitive Truth',
      hookText: `Stop approaching ${topicInput.toLowerCase()} the normal way. Here is why the standard advice is secretly holding you back.`,
      pacing: 'Display a bold red text card overlay right on frame 1.',
      psychology: 'Challenges common belief systems, prompting cognitive dissonance and comments.'
    },
    {
      id: 'gen-3',
      archetype: 'The High Stakes Warning',
      hookText: `If you do ${topicInput.toLowerCase()} without knowing this setting, you are burning 10 hours every week.`,
      pacing: 'Speak urgently without introductory breathing pauses.',
      psychology: 'Loss aversion: humans are 2x more motivated to avoid a loss than to gain a benefit.'
    },
    {
      id: 'gen-4',
      archetype: 'The Instant Demonstration',
      hookText: `Watch what happens to ${topicInput.toLowerCase()} when I flip this single toggle in 3 seconds...`,
      pacing: 'Action must be already in motion before the first syllable is uttered.',
      psychology: 'Bypasses intellectual skepticism by delivering immediate visual proof.'
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLibrary = HOOK_TEMPLATES.filter((tpl) => {
    if (selectedArchetype === 'All') return true;
    return tpl.archetype === selectedArchetype;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Anchor className="w-3.5 h-3.5" />
          Attention Science
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Viewer Retention & 3-Second Opening Hooks
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          TikTok tests your video on a seed batch of 250 viewers. If more than 35% swipe away before second 3, the video stops receiving algorithmic promotion. Learn how to arrest the thumb reflex.
        </p>
      </div>

      {/* Interactive Retention Timeline Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              The Critical 3-Second Retention Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              The micro-second anatomy of the human swipe reflex on TikTok
            </p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold self-start sm:self-center">
            70%+ TARGET THRESHOLD
          </span>
        </div>

        {/* Phase Steps Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">0.0s – 1.2s: The Visual Arrest</span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">Frame 1</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Muted viewers decide whether to pause based entirely on visual contrast and motion. Zoom-ins, bold yellow/white typography, or an object flying into frame prevent reflexive swiping.
            </p>
            <div className="text-[10px] text-emerald-400 font-medium">
              Rule: Never open with a static talking head.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400">1.2s – 2.8s: The Stakes & Tension</span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">The Hook</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Spoken words deliver the specific problem, secret, or warning. Cut out all filler words ("Hey guys", "So today", "In this video"). Announce the tension immediately.
            </p>
            <div className="text-[10px] text-cyan-400 font-medium">
              Rule: The viewer must know what they stand to gain or lose.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">2.8s – 5.0s: The Proof Micro-Twist</span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">The Lock-In</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Show immediate evidence that your hook was not a lie. A 0.5-second glimpse of the final result or receipt locks in completion through the middle section.
            </p>
            <div className="text-[10px] text-purple-400 font-medium">
              Rule: Validate the promise before they suspect clickbait.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hook Generator Tool */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Interactive Hook Generator</h3>
          </div>
          <p className="text-xs text-slate-400">
            Enter your concept below to generate tailored psychological hooks calibrated for {profile.niche}.
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Enter your video concept or topic..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => setTopicInput(topicInput)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Formulas</span>
          </button>
        </div>

        {/* Generated Hooks Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {generatedHooks.map((gh) => {
            const isCopied = copiedId === gh.id;
            return (
              <div
                key={gh.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {gh.archetype}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 0.0 - 2.8s
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-white leading-relaxed">
                    "{gh.hookText}"
                  </p>

                  <p className="text-[11px] text-slate-400 leading-snug">
                    <strong className="text-slate-300">Pacing:</strong> {gh.pacing}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 italic">{gh.psychology}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setRehearsingHook(gh.hookText)}
                      className="px-2 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white font-medium text-[10px] flex items-center gap-1 border border-rose-500/30 transition-colors"
                      title="Rehearse on Camera with Audio Meter"
                    >
                      <Camera className="w-3 h-3 text-rose-400" />
                      <span>Rehearse on Camera</span>
                    </button>
                    <button
                      onClick={() => handleCopy(gh.hookText, gh.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Copy hook text"
                    >
                      {isCopied ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evergreen Hook Archetypes Library */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-white text-base">Proven Hook Archetypes Reference</h3>
            <p className="text-xs text-slate-400">Formulas tested across top-ranking FYP videos</p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Curiosity Gap', 'Counter-Intuitive', 'High Stakes', 'Problem-First', 'Story Spoiler'].map(
              (arch) => (
                <button
                  key={arch}
                  onClick={() => setSelectedArchetype(arch)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                    selectedArchetype === arch
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {arch}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLibrary.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  {item.archetype}
                </span>
                <p className="text-xs font-semibold text-white leading-snug">
                  Formula: {item.formula}
                </p>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 italic">
                  "{item.example}"
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-400 space-y-1">
                <p>
                  <strong>Pacing cue:</strong> {item.pacingNote}
                </p>
                <p>
                  <strong>Best for:</strong> {item.bestForNiches.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rehearsal with Camera & Audio Modal */}
      {rehearsingHook && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto my-auto animate-in fade-in duration-200">
            <CameraRecorder
              currentHook={rehearsingHook}
              onRecordingComplete={(blob, url, duration, transcribedText) => {
                setRecordedRehearsal({ duration, url, transcript: transcribedText });
                setRehearsingHook(null);
              }}
              onClose={() => setRehearsingHook(null)}
            />
          </div>
        </div>
      )}

      {/* Rehearsal Take Result Notification */}
      {recordedRehearsal && (
        <div className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl flex items-center gap-3 text-xs max-w-md animate-in slide-in-from-bottom duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="space-y-0.5 flex-1">
            <p className="font-bold text-white">Hook Rehearsal Saved ({recordedRehearsal.duration}s)</p>
            <p className="text-[11px] text-slate-400">
              {recordedRehearsal.duration <= 3.0
                ? '⚡ Perfect! Delivered under the 3.0s hook threshold.'
                : '⚠️ Took longer than 3.0s — trim pauses or increase vocal cadence.'}
            </p>
          </div>
          <button
            onClick={() => setRecordedRehearsal(null)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
