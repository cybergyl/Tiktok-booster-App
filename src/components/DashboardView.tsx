import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Eye,
  Clock,
  Users,
  CalendarCheck,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Coins,
  Anchor,
  Zap,
  Info,
  Video,
  Send,
  ArrowRight
} from 'lucide-react';
import { CreatorProfile, VideoMetric, ViewTab } from '../types';

interface DashboardViewProps {
  profile: CreatorProfile;
  videos: VideoMetric[];
  onNavigateTab: (tab: ViewTab) => void;
  onOpenOnboarding: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  videos,
  onNavigateTab,
  onOpenOnboarding
}) => {
  const topVideos = videos.filter((v) => v.performanceStatus === 'top');
  const underperformingVideos = videos.filter((v) => v.performanceStatus === 'underperforming');

  // Simulated retention drop-off curve data
  const retentionCurve = [
    { sec: '0s', label: 'Start', rate: 100, note: 'Initial scroll impression' },
    { sec: '1.5s', label: 'Visual Hook', rate: 84, note: 'Movement & headline hook' },
    { sec: '3s', label: 'Seed Retention', rate: 74, note: 'Algorithmic test threshold' },
    { sec: '8s', label: 'Pacing Check', rate: 64, note: 'First micro-twist/proof' },
    { sec: '15s', label: 'Middle Lull', rate: 58, note: 'Core value delivery' },
    { sec: '30s', label: 'Climax', rate: 52, note: 'Payoff/revelation' },
    { sec: 'End', label: 'CTA & Replay', rate: 48, note: 'Loop potential & save' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner & Health Status Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e1726] to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Creator Studio for {profile.name}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
              {profile.niche}
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Personalized for {profile.creatorType.toLowerCase()}s targeting: <span className="text-slate-300 font-medium">"{profile.mainGoal}"</span>
          </p>
        </div>

        {/* Account Health Quick Card */}
        <div
          onClick={() => onNavigateTab('health')}
          className="cursor-pointer group flex items-center gap-4 bg-slate-950/70 border border-emerald-500/30 hover:border-emerald-500/60 p-3.5 rounded-xl transition-all shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">Account Health:</span>
              <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1">
                🟢 Healthy (98/100)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 group-hover:text-slate-300 flex items-center gap-1 mt-0.5">
              Zero strikes • Safe standing
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </p>
          </div>
        </div>
      </div>

      {/* Direct Video Studio & Gatekeeper Review Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-cyan-500/5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/25 shrink-0">
            <Video className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm">
                Pre-Publish Review & TikTok Direct Post
              </h3>
              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                Direct Upload Ready
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Run your video through the algorithm gatekeeper: auto-correct 3s hook dropoffs & SEO keywords, then publish directly to TikTok.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('publisher')}
          className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/25 transition-all self-start md:self-center"
        >
          <span>Open Video Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Core Performance Metrics Cards (Section 3 of prompt) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Engagement Rate</span>
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-extrabold text-white">4.8%</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center">
              +0.9% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Industry avg: 3.2%</p>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Average Views</span>
            <Eye className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-extrabold text-white">36.4K</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center">
              +14% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Last 30 days active</p>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Avg Watch Time</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-extrabold text-white">24.2s</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center">
              +3.1s <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[10px] text-slate-400">On 42s avg length</p>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>3s Retention</span>
            <Anchor className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-extrabold text-white">74%</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center">
              +6% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Seed batch cleared</p>
        </div>

        {/* Metric 5 */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Follower Growth</span>
            <Users className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-extrabold text-white">+1,820</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center">
              +28% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Real organic users</p>
        </div>

        {/* Metric 6 */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Consistency</span>
            <CalendarCheck className="w-3.5 h-3.5 text-pink-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-extrabold text-white">92%</span>
            <span className="text-[10px] text-cyan-400 font-semibold">Active</span>
          </div>
          <p className="text-[10px] text-slate-400">5 posts this week</p>
        </div>
      </div>

      {/* Main Two Column Layout: Retention Curve & Monetization Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Retention Dropoff Curve (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Anchor className="w-4 h-4 text-cyan-400" />
                Aggregated Audience Retention Curve
              </h3>
              <p className="text-xs text-slate-400">
                Where your viewers watch vs where they swipe away (Average across last 10 videos)
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('hooks')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 self-start sm:self-center"
            >
              <span>Hook Formulas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Retention Chart visualization */}
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2 items-end h-40 pt-4 px-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
              {retentionCurve.map((point) => {
                const heightPercent = point.rate;
                return (
                  <div key={point.sec} className="flex flex-col items-center gap-2 h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 pointer-events-none bg-slate-800 text-[10px] px-2 py-1 rounded shadow-lg border border-slate-700 whitespace-nowrap text-white">
                      {point.rate}% retained: {point.note}
                    </div>

                    <div className="text-[11px] font-bold text-cyan-300">{point.rate}%</div>
                    <div
                      className="w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 transition-all group-hover:brightness-125"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <div className="text-[10px] font-medium text-slate-400">{point.sec}</div>
                  </div>
                );
              })}
            </div>

            {/* Retention Insights Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 3-Second Retention (74%)
                </span>
                <p className="text-[11px] text-slate-400">
                  Above the 65% critical threshold required for algorithm FYP push.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Second 15-20 Dip (-6%)
                </span>
                <p className="text-[11px] text-slate-400">
                  Introduce a secondary visual element or sound effect at 15s to re-engage.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                <span className="font-semibold text-cyan-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> End Replay Loop (48%)
                </span>
                <p className="text-[11px] text-slate-400">
                  Videos that seamless loop gain 1.4x higher total watch time points.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monetization Readiness Card (1 col) */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                Monetization Tracker
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                68% READY
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Progress toward the official TikTok Creator Rewards Program criteria:
            </p>
          </div>

          <div className="space-y-4">
            {/* Follower progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Follower Goal</span>
                <span className="text-cyan-400 font-bold">14,200 / 10,000</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
              </div>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 10k Follower threshold achieved!
              </p>
            </div>

            {/* 30-day views progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">30-Day Views</span>
                <span className="text-amber-400 font-bold">68,400 / 100,000</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '68%' }} />
              </div>
              <p className="text-[10px] text-slate-400">
                31.6K views needed. Average: ~4 more high-retention videos.
              </p>
            </div>

            {/* Content duration note */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" /> 1-Minute Rule Reminder
              </span>
              <p className="text-slate-400">
                Only videos longer than 60 seconds are eligible for Creator Rewards payouts. Short clips will not earn revenue.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('monetization')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors text-center"
          >
            View Full Monetization Checklist
          </button>
        </div>
      </div>

      {/* Top Performing vs Underperforming Content Breakdown (Section 3 of prompt) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Card */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 font-bold text-xs">
                🏆
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Top-Performing Content</h4>
                <p className="text-[11px] text-slate-400">Why these videos cleared algorithmic distribution tiers</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              High Reach
            </span>
          </div>

          <div className="space-y-3">
            {topVideos.map((vid) => (
              <div key={vid.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h5 className="font-semibold text-white text-xs leading-snug">{vid.title}</h5>
                  <span className="text-xs font-bold text-emerald-400 shrink-0">
                    {vid.views.toLocaleString()} views
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                  <span>3s Retention: <strong className="text-slate-200">{vid.retention3s}%</strong></span>
                  <span>Completion: <strong className="text-slate-200">{vid.completionRate}%</strong></span>
                  <span>Saves: <strong className="text-slate-200">{vid.saves}</strong></span>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-[11px] text-emerald-300 leading-relaxed">
                  <strong>Why it worked:</strong> {vid.whyItWorkedOrStruggled}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Underperforming Content Card */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-500/15 flex items-center justify-center text-rose-400 font-bold text-xs">
                ⚠️
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Underperforming Content Diagnostics</h4>
                <p className="text-[11px] text-slate-400">What caused the initial seed batch to drop off</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
              Actionable Fixes
            </span>
          </div>

          <div className="space-y-3">
            {underperformingVideos.map((vid) => (
              <div key={vid.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h5 className="font-semibold text-white text-xs leading-snug">{vid.title}</h5>
                  <span className="text-xs font-bold text-rose-400 shrink-0">
                    {vid.views.toLocaleString()} views
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                  <span>3s Retention: <strong className="text-rose-400">{vid.retention3s}%</strong></span>
                  <span>Completion: <strong className="text-rose-400">{vid.completionRate}%</strong></span>
                  <span>Shares: <strong className="text-slate-200">{vid.shares}</strong></span>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30 text-[11px] text-rose-300 leading-relaxed">
                  <strong>Diagnostic breakdown:</strong> {vid.whyItWorkedOrStruggled}
                </div>
              </div>
            ))}

            {/* Optimization prompt button */}
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('optimizer')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-600/15 border border-cyan-500/30 hover:bg-cyan-600/25 text-xs font-semibold text-cyan-300 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Run New Video Idea Through Content Optimizer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations & Community Guidelines Reminder */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-blue-950/30 border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-white text-sm">
              Today's Tailored Growth Recommendation for {profile.niche}
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            "Your next post has the highest chance of breaking out if you use an <strong>episodic series title</strong> (e.g. 'Part 1: The 3-second mistake...'). Viewers who see 'Part 1' are 3.8x more likely to click your profile and hit follow to watch upcoming parts."
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('posting')}
          className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
        >
          <span>Plan in Calendar</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
