import React from 'react';
import {
  BarChart3,
  Sparkles,
  Brain,
  Music2,
  Users,
  ShieldCheck,
  Coins,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  Play,
  Anchor,
  Clock,
  ChevronRight
} from 'lucide-react';
import { ViewTab } from '../types';

interface LandingPageProps {
  onStartLearning: () => void;
  onAnalyzeContent: () => void;
  onOpenDashboard: () => void;
  onNavigateTab: (tab: ViewTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning,
  onAnalyzeContent,
  onOpenDashboard,
  onNavigateTab
}) => {
  const featureCards = [
    {
      tab: 'analytics' as ViewTab,
      icon: BarChart3,
      badge: '📈 Analytics',
      title: 'Actionable Performance Tracking',
      description: 'Interactive retention curves, watch time metrics, traffic sources (FYP vs Profile), and data-driven insights without vanity metrics.'
    },
    {
      tab: 'optimizer' as ViewTab,
      icon: Sparkles,
      badge: '🎯 Content Optimization',
      title: 'Search SEO & Caption Architect',
      description: '3-tier hashtag formulas, primary keyword placement, thumbnail framing, and high-converting calls-to-action.'
    },
    {
      tab: 'learning' as ViewTab,
      icon: Brain,
      badge: '🧠 Algorithm Literacy',
      title: 'Demystify Distribution Signals',
      description: 'Understand seed batches, 3-second completion weights, and recommendation engines in clear, simple language.'
    },
    {
      tab: 'trends' as ViewTab,
      icon: Music2,
      badge: '🔥 Trends & Audio',
      title: 'Audio Velocity & Niche Adaptation',
      description: 'Discover rising sound trends early, adapt viral concepts to your specific industry, and avoid copyright pitfalls.'
    },
    {
      tab: 'engagement' as ViewTab,
      icon: Users,
      badge: '👥 Engagement',
      title: 'Authentic Community Building',
      description: 'Master video reply workflows, spark meaningful comment debates, and turn one-time viewers into lifelong subscribers.'
    },
    {
      tab: 'safety' as ViewTab,
      icon: ShieldCheck,
      badge: '🛡️ Safety Center',
      title: 'Guideline Compliance & Security',
      description: 'Avoid accidental strikes, identify phishing scams and fake sponsor emails, and maintain pristine account standing.'
    },
    {
      tab: 'monetization' as ViewTab,
      icon: Coins,
      badge: '💰 Monetization Readiness',
      title: 'Creator Rewards Program Roadmap',
      description: 'Step-by-step progress tracking toward 10k followers, 100k monthly views, and high-retention 1-minute+ video formats.'
    },
    {
      tab: 'learning' as ViewTab,
      icon: GraduationCap,
      badge: '📚 Creator Education',
      title: 'Structured 12-Lesson Academy',
      description: 'Learn → Real Example → Interactive Exercise → Checklist workflow for every critical stage of creator development.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#080d14] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              TikTok Booster
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                EDUCATION
              </span>
            </span>
            <p className="text-[11px] text-slate-400">Ethical Creator Growth Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartLearning}
            className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors hidden sm:block"
          >
            Curriculum
          </button>
          <button
            onClick={onAnalyzeContent}
            className="text-xs text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all hidden sm:block"
          >
            Audit Tool
          </button>
          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-6 max-w-6xl mx-auto w-full text-center space-y-8">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          100% Policy-Compliant • Zero Bots • Sustainable Organic Growth
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Turn Your TikTok Into a{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Smarter Growth Journey.
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
            Learn how to create better content, understand your audience, improve retention, stay compliant and build a healthier creator account.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02]"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Start Learning</span>
          </button>

          <button
            onClick={onAnalyzeContent}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Analyze My Content</span>
          </button>

          <button
            onClick={onOpenDashboard}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span>Launch Live Dashboard</span>
          </button>
        </div>

        {/* Philosophy Manifesto Quote */}
        <div className="pt-6">
          <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/20 text-center">
            <p className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-1">
              The TikTok Booster Philosophy
            </p>
            <p className="text-sm sm:text-base font-semibold text-white italic">
              “Don't chase the algorithm. Understand your audience, improve your content, and grow sustainably.”
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid (Section 25 of prompt) */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Built for Modern Creators & Brands
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Practical modules designed to eliminate guesswork and replace vanity metrics with real algorithmic literacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.badge}
                onClick={() => onNavigateTab(feat.tab)}
                className="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {feat.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:bg-cyan-950/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-white text-sm group-hover:text-cyan-200 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                  <span>Explore Module</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ethical Growth vs Fake Bots Comparison Section */}
      <section className="px-6 py-14 max-w-5xl mx-auto w-full">
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Why Fake Followers Destroy Accounts vs How Organic Boosters Win
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Understanding the mathematics of TikTok's recommendation engine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Bot Trap */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <XCircle className="w-5 h-5 shrink-0" />
                <span>The Fake Follower / Bot Trap (Forbidden)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Zero Watch Time:</strong> Inactive bots never watch videos. When TikTok tests your video against 500 bot followers who never watch, your completion rate drops to 0%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Algorithmic Death:</strong> TikTok assumes your content is unwanted and stops pushing your videos to the For You Page entirely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Permanent Disqualification:</strong> Flagged for artificial engagement, disqualifying the account from Creator Rewards and TikTok Shop.</span>
                </li>
              </ul>
            </div>

            {/* The TikTok Booster Way */}
            <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-900/30 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>The TikTok Booster Solution (100% Compliant)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>3-Second Retention Mastery:</strong> Stop the swipe with proven curiosity gap openings and visual pattern interrupts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Real Humans Who Follow:</strong> Multi-part episodic series and search SEO bring viewers who eagerly hit the follow button.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Monetization Ready:</strong> Real audience engagement unlocks high RPM, Creator Rewards, brand sponsorships, and shop conversions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences Supported */}
      <section className="px-6 py-10 max-w-6xl mx-auto w-full border-t border-slate-900 text-center space-y-6">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
          Tailored Workflows For Every Stage
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
          {[
            'Beginner Creators',
            'Growing Creators',
            'Influencers',
            'Small Businesses',
            'Content Creators',
            'Social-Media Managers',
            'Creators Preparing for Monetization'
          ].map((role) => (
            <span
              key={role}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300"
            >
              {role}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-400 space-y-2">
        <p>TikTok Booster &bull; Educational Creator Growth & Analytics Platform</p>
        <p className="text-[11px] text-slate-400">
          Independent educational platform. Not affiliated with, endorsed by, or sponsored by TikTok or ByteDance Ltd.
        </p>
      </footer>
    </div>
  );
};
