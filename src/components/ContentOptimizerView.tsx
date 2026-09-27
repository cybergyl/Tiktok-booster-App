import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Hash,
  MessageSquare,
  Image as ImageIcon,
  CheckCircle2,
  Copy,
  Layers,
  ArrowRight,
  Info,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { CreatorProfile } from '../types';

interface ContentOptimizerViewProps {
  profile: CreatorProfile;
}

export const ContentOptimizerView: React.FC<ContentOptimizerViewProps> = ({ profile }) => {
  const [videoTopic, setVideoTopic] = useState('Secret keyboard shortcuts for productivity');
  const [proposedCaption, setProposedCaption] = useState(
    'The 3 keyboard shortcuts I use every single day to save 2 hours of typing. Save this so you remember tomorrow!'
  );
  const [selectedFormat, setSelectedFormat] = useState('Tutorial / How-To');
  const [targetAudience, setTargetAudience] = useState('Students & Remote Workers');
  const [copiedTagSet, setCopiedTagSet] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Dynamic calculations based on user input
  const words = proposedCaption.trim().split(/\s+/).filter(Boolean);
  const first5Words = words.slice(0, 5).join(' ');
  const hasKeywordsInFirst5 =
    first5Words.toLowerCase().includes('shortcut') ||
    first5Words.toLowerCase().includes('keyboard') ||
    first5Words.toLowerCase().includes('secret') ||
    first5Words.toLowerCase().includes('hack') ||
    first5Words.toLowerCase().includes('save');

  const hasSaveCTA =
    proposedCaption.toLowerCase().includes('save') ||
    proposedCaption.toLowerCase().includes('bookmark');
  const hasShareCTA =
    proposedCaption.toLowerCase().includes('share') ||
    proposedCaption.toLowerCase().includes('send this to');

  // Generate 3-Tier Hashtags
  const generateHashtagTiers = () => {
    const cleanTopic = videoTopic.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanNiche = profile.niche.toLowerCase().replace(/[^a-z0-9]/g, '');

    return {
      tier1Broad: ['#learnontiktok', '#productivity', '#techtok'],
      tier2Niche: [`#${cleanNiche}`, '#techtips', '#workflow'],
      tier3Micro: [`#${cleanTopic.slice(0, 15)}`, '#keyboardhacks', '#shortcuts']
    };
  };

  const tagTiers = generateHashtagTiers();
  const allTagsString = [...tagTiers.tier1Broad.slice(0, 1), ...tagTiers.tier2Niche.slice(0, 2), ...tagTiers.tier3Micro.slice(0, 2)].join(' ');

  const handleCopyTags = () => {
    navigator.clipboard.writeText(allTagsString);
    setCopiedTagSet(true);
    setTimeout(() => setCopiedTagSet(false), 2000);
  };

  const handleCopyFullCaption = () => {
    const full = `${proposedCaption} ${allTagsString}`;
    navigator.clipboard.writeText(full);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5" />
          Content Optimization Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Video Architecture & TikTok SEO Optimizer
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          TikTok uses computer vision and natural language processing to index spoken words, text on screen, captions, and hashtags. Optimize your metadata to earn evergreen search traffic.
        </p>
      </div>

      {/* Main Two-Column Studio: Inputs & Live Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Proposed Video Draft</span>
            <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              Interactive Editor
            </span>
          </h3>

          {/* Video Topic */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Primary Video Topic / Concept</span>
              <span className="text-[10px] text-slate-400">What is the central premise?</span>
            </label>
            <input
              type="text"
              value={videoTopic}
              onChange={(e) => setVideoTopic(e.target.value)}
              placeholder="e.g. 3 secret keyboard shortcuts"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Format & Audience Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Video Format</label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option>Tutorial / How-To</option>
                <option>Curiosity Gap Story</option>
                <option>Counter-Intuitive Myth Bust</option>
                <option>Product / Tool Review</option>
                <option>Episodic Series (Part 1, 2...)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Viewer Demographic</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Students, Beginners"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              >
              </input>
            </div>
          </div>

          {/* Proposed Caption */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <span>Proposed Caption & CTA</span>
                <span className="text-[10px] text-cyan-400 font-normal">
                  (First 5 words are indexed heavily)
                </span>
              </label>
              <span className={`text-[10px] ${proposedCaption.length > 150 ? 'text-amber-400' : 'text-slate-400'}`}>
                {proposedCaption.length} chars
              </span>
            </div>
            <textarea
              rows={3}
              value={proposedCaption}
              onChange={(e) => setProposedCaption(e.target.value)}
              placeholder="Draft your caption with primary keywords and clear CTA..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors leading-relaxed"
            />
          </div>

          {/* CTA Quick Buttons */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold text-slate-400">Append High-Converting CTA Formula:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setProposedCaption((prev) => prev.trim() + ' Save this before it gets buried.')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
              >
                + Save for Later
              </button>
              <button
                type="button"
                onClick={() => setProposedCaption((prev) => prev.trim() + ' Share this with a friend who needs to fix this.')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
              >
                + Share to Friend
              </button>
              <button
                type="button"
                onClick={() => setProposedCaption((prev) => prev.trim() + ' Follow for Part 2 tomorrow where we reveal the final setting.')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
              >
                + Follow for Part 2
              </button>
            </div>
          </div>

          {/* 3-Tier Hashtag Generator Section */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan-400" />
                3-Tier Algorithmic Hashtag Distribution
              </span>
              <button
                onClick={handleCopyTags}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedTagSet ? 'Copied Tags!' : 'Copy Tags'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              {/* Tier 1 */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-300 block text-[10px] uppercase text-cyan-400">
                  Tier 1: Broad (1 tag)
                </span>
                <p className="text-slate-400">{tagTiers.tier1Broad[0]}</p>
                <p className="text-[9px] text-slate-500">Broad FYP category anchor</p>
              </div>

              {/* Tier 2 */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-300 block text-[10px] uppercase text-blue-400">
                  Tier 2: Niche (2 tags)
                </span>
                <p className="text-slate-400">{tagTiers.tier2Niche.slice(0, 2).join(' ')}</p>
                <p className="text-[9px] text-slate-500">Sub-community target</p>
              </div>

              {/* Tier 3 */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-semibold text-slate-300 block text-[10px] uppercase text-purple-400">
                  Tier 3: Specific (2 tags)
                </span>
                <p className="text-slate-400">{tagTiers.tier3Micro.slice(0, 2).join(' ')}</p>
                <p className="text-[9px] text-slate-500">Exact intent keyword search</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output & Educational Audit (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Live Mobile Post Preview Mockup */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Feed Display Simulation</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Live Preview</span>
            </h4>

            {/* Video Frame Mock */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-950 aspect-[9/12] flex flex-col justify-between p-4 border border-slate-800 shadow-inner">
              {/* Top simulated badge */}
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="bg-black/40 backdrop-blur px-2 py-0.5 rounded text-[10px]">
                  {selectedFormat}
                </span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  Safe Zone OK
                </span>
              </div>

              {/* On-screen visual hook headline test */}
              <div className="p-3 rounded-lg bg-black/60 backdrop-blur border border-white/10 text-center my-auto">
                <p className="text-xs uppercase tracking-wider text-cyan-300 font-extrabold">
                  {videoTopic || 'Topic Title'}
                </p>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  High-contrast visual hook centered for muted autoplay
                </p>
              </div>

              {/* Bottom caption overlay */}
              <div className="space-y-1 text-left bg-black/60 backdrop-blur p-2.5 rounded-lg border border-white/10">
                <p className="text-[11px] font-bold text-white">{profile.handle}</p>
                <p className="text-[11px] text-slate-200 line-clamp-3 leading-snug">
                  {proposedCaption} <span className="text-cyan-400 font-medium">{allTagsString}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyFullCaption}
              className="w-full py-2.5 rounded-xl bg-cyan-600/20 border border-cyan-500/30 hover:bg-cyan-600/30 text-xs font-bold text-cyan-300 flex items-center justify-center gap-2 transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedCaption ? 'Copied Full Caption & Tags!' : 'Copy Formatted Caption & Tags'}</span>
            </button>
          </div>

          {/* Educational Checklist Card */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              SEO & Optimization Scorecard
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <span className={hasKeywordsInFirst5 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {hasKeywordsInFirst5 ? '✓' : '•'}
                </span>
                <div>
                  <strong className="text-white">Opening Keyword Index:</strong>{' '}
                  <span className="text-slate-400">
                    {hasKeywordsInFirst5
                      ? 'First 5 words contain target intent terms.'
                      : 'Add your primary search phrase to the first 5 words of your caption.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className={hasSaveCTA || hasShareCTA ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {hasSaveCTA || hasShareCTA ? '✓' : '•'}
                </span>
                <div>
                  <strong className="text-white">Algorithmic CTA Alignment:</strong>{' '}
                  <span className="text-slate-400">
                    {hasSaveCTA
                      ? 'Prompting a "Save" directly boosts long-tail recommendation weight.'
                      : 'Add a prompt to save or follow for upcoming episodes.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <div>
                  <strong className="text-white">Hashtag Volume Discipline:</strong>{' '}
                  <span className="text-slate-400">
                    5 targeted tags avoid algorithm confusion and maximize search visibility.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
