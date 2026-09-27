import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Lock,
  Mail,
  FileWarning,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  Info
} from 'lucide-react';
import { CreatorProfile } from '../types';

interface SafetyCenterViewProps {
  profile: CreatorProfile;
}

export const SafetyCenterView: React.FC<SafetyCenterViewProps> = ({ profile }) => {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const phishingSigns = [
    {
      title: 'Fake Sender Domains',
      example: 'pr-collab@tiktok-brand-agency.net (Real brand emails always end in the official domain, e.g. @nike.com or @tiktok.com)',
      danger: 'High'
    },
    {
      title: 'Password-Protected ZIP / RAR Files',
      example: '"Please download our media kit: MediaKit_2026.zip (Password: 1234)" contains malware designed to steal browser session tokens and passwords.',
      danger: 'Critical'
    },
    {
      title: 'Unrealistic Pay for Zero Work',
      example: '"We will pay you $8,000 to post a 15-second sound." Legitimate brand sponsorships always require detailed contract terms and verified agencies.',
      danger: 'High'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400">
          <AlertTriangle className="w-3.5 h-3.5" />
          Creator Protection Protocol
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Safety Center & Scam Defense
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          As your TikTok account grows, you become a prime target for session token hijackers, phishing emails, and fake follower scams. Learn how to protect your brand and digital assets.
        </p>
      </div>

      {/* Flagship Alert: The Fake Follower Hazard Matrix */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-900 border border-rose-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <FileWarning className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">
              The Mathematical Destruction of Buying Fake Followers
            </h3>
            <p className="text-xs text-slate-400">Why third-party follower "boosters" permanently kill accounts</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          When creators pay shady services for 10,000 bot followers, they assume it will give them social proof. Here is what actually happens in TikTok’s recommendation backend:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-rose-400 block">1. Seed Batch Failure</span>
            <p className="text-slate-300">
              TikTok shows your new video to a sample of your existing followers. Since bots do not log in or watch videos, <strong>your initial completion rate is 0%</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-rose-400 block">2. Distribution Halts</span>
            <p className="text-slate-300">
              The algorithm concludes: <em>"Even this creator's own followers refuse to watch this video."</em> The video is permanently barred from reaching the FYP.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-rose-400 block">3. Program Disqualification</span>
            <p className="text-slate-300">
              TikTok’s anti-fraud system audits accounts before approving them for the Creator Rewards Program. Artificial follower spikes result in permanent disqualification.
            </p>
          </div>
        </div>
      </div>

      {/* Phishing & Fake Sponsorship Simulator */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Mail className="w-4 h-4 text-cyan-400" />
          Spotting Phishing & Fake Brand Sponsorship Inquiries
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {phishingSigns.map((sign, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between text-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{sign.title}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {sign.danger} Risk
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{sign.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legitimate Moderation Appeal Guide */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h4 className="font-bold text-white text-base">
            What To Do When a Video is Mistakenly Flagged
          </h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Automated AI filters sometimes flag educational content by mistake. Do not panic and <strong>do not delete the video immediately</strong>. Deleting a flagged video prevents the strike from being reversed on review.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-400">Step 1: Tap Appeal</span>
            <p className="text-slate-400">
              Open the system notification inside your TikTok inbox and tap <strong>Submit an appeal</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-blue-400">Step 2: Educational Context</span>
            <p className="text-slate-400">
              State clearly: <em>"This video provides educational information regarding [topic] in compliance with platform guidelines."</em>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400">Step 3: Human Review</span>
            <p className="text-slate-400">
              TikTok routes the video to human moderation. If approved, the video and all views are completely restored with zero strike impact.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Manifesto Note */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5 leading-relaxed">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>
          <strong>Safety Commitment:</strong> TikTok Booster never provides tools or instructions to bypass moderation systems, evade enforcement, or spam communities. We teach compliance, account security, and long-term creator safety.
        </p>
      </div>
    </div>
  );
};
