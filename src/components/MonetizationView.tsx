import React from 'react';
import {
  Coins,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Info,
  ShieldCheck
} from 'lucide-react';
import { CreatorProfile } from '../types';

interface MonetizationViewProps {
  profile: CreatorProfile;
}

export const MonetizationView: React.FC<MonetizationViewProps> = ({ profile }) => {
  const requirements = [
    {
      title: '10,000 Authentic Followers',
      current: '14,200',
      target: '10,000',
      percent: 100,
      met: true,
      tip: 'Threshold met! Follower requirement satisfied.'
    },
    {
      title: '100,000 Video Views in Last 30 Days',
      current: '68,400',
      target: '100,000',
      percent: 68,
      met: false,
      tip: '31,600 views remaining. ~3-4 consistent uploads will clear this.'
    },
    {
      title: '18+ Years of Age Verification',
      current: 'Verified',
      target: '18+',
      percent: 100,
      met: true,
      tip: 'Age verified through official ID verification in account settings.'
    },
    {
      title: 'Pristine Account Standing (Zero Active Strikes)',
      current: '0 Strikes',
      target: '0 Strikes',
      percent: 100,
      met: true,
      tip: 'Clean community health profile maintained.'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
          <Coins className="w-3.5 h-3.5" />
          Revenue Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Monetization & Creator Rewards Readiness
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Prepare your content structure and audience metrics for the TikTok Creator Rewards Program, TikTok Shop affiliate, and brand sponsorships.
        </p>
      </div>

      {/* Official Notice Box (Section 15 Requirement) */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-white">Official Platform Requirements Notice</p>
          <p className="text-slate-400 leading-relaxed">
            Eligibility requirements, payout tiers, and revenue sharing percentages are determined exclusively by TikTok and may vary by geographic territory. Always cross-reference your in-app <em>TikTok Studio &gt; Creator Rewards Program</em> menu for current official regional terms.
          </p>
        </div>
      </div>

      {/* Eligibility Tracker Grid */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-base">Creator Rewards Program Eligibility</h3>
            <p className="text-xs text-slate-400">Core criteria required to apply for direct video payouts</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 self-start sm:self-center">
            3 OF 4 REQUIREMENTS MET (68% VIEWS)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {requirements.map((req, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{req.title}</span>
                  {req.met ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="text-[11px] font-bold text-amber-400">{req.percent}%</span>
                  )}
                </div>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Current: <strong className="text-white">{req.current}</strong></span>
                  <span>Goal: {req.target}</span>
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full ${req.met ? 'bg-emerald-500' : 'bg-amber-400'}`}
                    style={{ width: `${req.percent}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                {req.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The 1-Minute Rule & RPM Optimization Mastery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-white text-sm">The Mandatory 1-Minute Rule</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The Creator Rewards Program pays exclusively on <strong>videos longer than 60 seconds (1:01+)</strong>. Short 15-second clips earn zero program payouts regardless of millions of views.
          </p>
          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-white">Rule 1:</strong> Target 65 to 75 seconds to ensure playback buffer never registers under 60.0s.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-white">Rule 2:</strong> Solve the "Middle Lull" (seconds 25–45) with micro-demonstrations to sustain 45%+ completion.
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">Maximizing RPM (Revenue Per 1K Views)</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            RPM can fluctuate from $0.20 to $1.80 per 1,000 views based on three algorithm signals:
          </p>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>Audience Geography:</strong> Viewers in high-purchasing countries (US, UK, CA, AU) command significantly higher advertiser bids.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>Search Value:</strong> Videos found via the search bar carry higher commercial intent and earn premium RPM multipliers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>Completion Rate:</strong> Only "Qualified Views" (watched for at least 5 seconds without skipping) count toward payouts.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
