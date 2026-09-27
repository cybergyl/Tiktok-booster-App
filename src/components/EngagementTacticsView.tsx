import React from 'react';
import {
  Users,
  MessageCircle,
  Video,
  Share2,
  Bookmark,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { CreatorProfile } from '../types';

interface EngagementTacticsViewProps {
  profile: CreatorProfile;
}

export const EngagementTacticsView: React.FC<EngagementTacticsViewProps> = ({ profile }) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Users className="w-3.5 h-3.5" />
          Community Building & Audience Loops
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Authentic Engagement & Comment Conversion
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          TikTok comments are not just social proof—they are an algorithmic signal and a continuous engine for new video ideas. Learn how to transform casual viewers into a dedicated creator community.
        </p>
      </div>

      {/* The Reply With Video Growth Loop (Flagship Strategy) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c1829] to-slate-900 border border-cyan-500/30 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">
              The "Reply With Video" Growth Machine
            </h3>
            <p className="text-xs text-slate-400">
              The most powerful organic loop native to TikTok's interface
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          When someone leaves a question or objection on your video, do not just type a text reply. Tap <strong>Reply with video</strong>. This displays the commenter’s sticker prominently on your new video, notifying the user and mathematically bridging viewers from Video A to Video B.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-cyan-400 uppercase">Step 1: Pin & Select</span>
            <p className="text-xs font-semibold text-white">Find the #1 Obstacle</p>
            <p className="text-[11px] text-slate-400">
              Look for comments asking "How do I do this if I have X?" or expressing constructive skepticism.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-blue-400 uppercase">Step 2: Instant Answer</span>
            <p className="text-xs font-semibold text-white">Solve It in Second 1</p>
            <p className="text-[11px] text-slate-400">
              Point to the comment sticker on screen: "Replying to @user: Here is the exact fix..."
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Step 3: Audience Validation</span>
            <p className="text-xs font-semibold text-white">Reward Engagement</p>
            <p className="text-[11px] text-slate-400">
              Other viewers realize that leaving thoughtful comments gets them featured in future videos.
            </p>
          </div>
        </div>
      </div>

      {/* High-Converting Comment Questions vs Generic Spam */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bad / Generic Engagement */}
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <XCircle className="w-5 h-5 shrink-0" />
            <span>Weak & Ineffective Engagement Prompts</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-semibold text-rose-300">"What do you guys think? Comment below!"</span>
              <p className="text-[11px] text-slate-400">
                Too broad. Requires high cognitive effort from mobile viewers who are passively scrolling. Results in zero comments.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-semibold text-rose-300">"Like and follow for part 2!"</span>
              <p className="text-[11px] text-slate-400">
                Begging without payoff. Viewers immediately detect low-effort gatekeeping and swipe away.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-semibold text-rose-300">Ignoring the first 30 minutes</span>
              <p className="text-[11px] text-slate-400">
                Failing to reply to the initial comments during the seed batch window reduces conversation depth scores.
              </p>
            </div>
          </div>
        </div>

        {/* High Converting Engagement */}
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>High-Converting Comment Formulas</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-semibold text-emerald-300">"Which one are you: Option A or Option B?"</span>
              <p className="text-[11px] text-slate-400">
                Low friction. Viewers only need to type a single letter ("A") to participate, multiplying total comment volume 8x.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-semibold text-emerald-300">"Drop your biggest roadblock with [topic]"</span>
              <p className="text-[11px] text-slate-400">
                Invites vulnerability and gives you a goldmine of genuine viewer problems to solve in your next videos.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="font-semibold text-emerald-300">The 30-Minute Golden Rule</span>
              <p className="text-[11px] text-slate-400">
                Stay in your TikTok inbox for the first 30 minutes after posting. Replying to early comments sparks active sub-threads.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stitches, Duets & Collaborative Community Strategy */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h4 className="font-bold text-white text-base flex items-center gap-2">
          <Share2 className="w-4 h-4 text-cyan-400" />
          Stitches & Duets: The Ethical Borrowed-Audience Protocol
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Stitching viral videos in your niche allows you to ride an existing wave of audience interest. However, doing it wrong looks lazy or predatory. Follow the <strong>"Validate & Expand"</strong> framework:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-semibold text-cyan-400 block">1. The Stitch (1.5s Max Clip)</span>
            <p className="text-slate-300">
              Only clip the exact controversial statement or question from the original creator. Do not let their video play for 10 seconds. Jump immediately into your unique perspective or solution.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-semibold text-blue-400 block">2. Constructive Contribution</span>
            <p className="text-slate-300">
              Never use stitches to mock, harass, or insult other creators (which violates Community Guidelines). Always add new value, a helpful alternative, or a friendly respectful counter-point.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
