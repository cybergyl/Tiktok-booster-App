import React, { useState } from 'react';
import {
  Music2,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Volume2,
  Info,
  Radio,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CreatorProfile, SoundTrendItem } from '../types';
import { SOUND_TRENDS } from '../data/mockData';

interface TrendsAudioViewProps {
  profile: CreatorProfile;
}

export const TrendsAudioView: React.FC<TrendsAudioViewProps> = ({ profile }) => {
  const [selectedVelocity, setSelectedVelocity] = useState<string>('All');

  const filteredTrends = SOUND_TRENDS.filter((snd) => {
    if (selectedVelocity === 'All') return true;
    return snd.velocity === selectedVelocity;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Music2 className="w-3.5 h-3.5" />
          Sound Science & Trend Literacy
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Audio Strategy, Trend Velocity & Copyright
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Audio accounts for 50% of the sensory experience on TikTok. Learn how to discover sounds in their exponential growth phase, bridge viral memes to your niche, and respect copyright boundaries.
        </p>
      </div>

      {/* Educational Notice (Required by Section 7) */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Educational Notice:</strong> Sound metrics and lifecycle stages below are curated educational case studies illustrating velocity patterns. Always check the official TikTok Creative Center audio portal for real-time regional licensing clearances before publishing commercial campaigns.
        </p>
      </div>

      {/* The 4 Stages of the TikTok Sound Lifecycle */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400" />
          The Sound Velocity Curve: When to Jump On
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stage 1: Rising */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">1. Rising (Goldmine)</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <p className="text-[11px] text-slate-300">
              5,000 – 40,000 videos. Sound velocity is doubling daily. The algorithm is starved for high-quality niche interpretations.
            </p>
            <div className="text-[10px] text-cyan-300 font-semibold pt-1">
              Action: Jump in immediately with niche adaptation.
            </div>
          </div>

          {/* Stage 2: Peak */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400">2. Peak (High Volume)</span>
            <p className="text-[11px] text-slate-300">
              50,000 – 250,000 videos. Maximum user recognition on the FYP. High initial watch time because viewers recognize the melody.
            </p>
            <div className="text-[10px] text-emerald-400 font-semibold pt-1">
              Action: Focus on visual quality to stand out among thousands.
            </div>
          </div>

          {/* Stage 3: Saturated */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-rose-400">3. Saturated (Fatigue)</span>
            <p className="text-[11px] text-slate-300">
              500,000+ videos. Viewers begin reflexively swiping away due to auditory exhaustion.
            </p>
            <div className="text-[10px] text-rose-400 font-semibold pt-1">
              Action: Avoid unless you completely subvert the joke.
            </div>
          </div>

          {/* Stage 4: Evergreen */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-purple-400">4. Evergreen (Lofi / Calm)</span>
            <p className="text-[11px] text-slate-300">
              Ambient acoustic, subtle synth, or cozy lo-fi beats that viewers associate with educational value and focused tutorials.
            </p>
            <div className="text-[10px] text-purple-400 font-semibold pt-1">
              Action: Safe default for tutorials & voiceovers.
            </div>
          </div>
        </div>
      </div>

      {/* Audio Trend Catalog */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-base">Sound Analysis & Niche Applications</h3>
            <p className="text-xs text-slate-400">
              Educational breakdowns of how top creators deploy these audio formats
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Rising', 'Peak', 'Saturated', 'Evergreen'].map((vel) => (
              <button
                key={vel}
                onClick={() => setSelectedVelocity(vel)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedVelocity === vel
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {vel}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredTrends.map((snd) => {
            let velBadge = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
            if (snd.velocity === 'Peak') velBadge = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            if (snd.velocity === 'Saturated') velBadge = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            if (snd.velocity === 'Evergreen') velBadge = 'bg-purple-500/10 text-purple-400 border-purple-500/20';

            return (
              <div
                key={snd.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-xs">{snd.title}</span>
                    <span className="text-[11px] text-slate-400">by {snd.artist}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold border ${velBadge}`}>
                      {snd.velocity}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {snd.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-200">Recommendation:</strong> {snd.recommendedUse}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Velocity context: {snd.videoCountText}
                  </p>
                </div>

                <div className="shrink-0 text-left md:text-right space-y-1">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg font-semibold border ${
                      snd.copyrightStatus.includes('Commercial')
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {snd.copyrightStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Copyright Rules for Creators & Businesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">Personal Creator Accounts</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Personal creator accounts enjoy access to the full popular music library for non-commercial expression. However, if a record label revokes licensing agreements, videos using that sound may be retroactively muted by the platform.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <strong>Pro Tip:</strong> Keep original audio voiceovers in your primary track, and layer trending background sounds at 10-15% volume. If the sound is ever muted, your speech remains audible.
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-white text-sm">Business & Commercial Accounts</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            If your account is registered as a Business Account or you promote products/services, you are legally restricted to the <strong>TikTok Commercial Music Library (CML)</strong>. Using unauthorized popular radio hits on a business account leads to copyright strikes and video removal.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <strong>Compliance Rule:</strong> Always filter sounds by "Commercial Use Cleared" in the TikTok sound search tab.
          </div>
        </div>
      </div>
    </div>
  );
};
