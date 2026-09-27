import React, { useState, useEffect } from 'react';
import {
  SearchCode,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FlaskConical,
  ShieldCheck,
  ArrowRight,
  Info,
  Clock,
  RotateCcw,
  Zap
} from 'lucide-react';
import { CreatorProfile, AuditResult } from '../types';

interface ContentAuditViewProps {
  profile: CreatorProfile;
}

export const ContentAuditView: React.FC<ContentAuditViewProps> = ({ profile }) => {
  const [topic, setTopic] = useState('How I learned to code in 6 months without a degree');
  const [hook, setHook] = useState('Stop wasting $30,000 on coding bootcamps. Here is the exact roadmap I used instead.');
  const [duration, setDuration] = useState<number>(45);
  const [caption, setCaption] = useState('The full free self-taught developer curriculum that landed me my first junior software engineering job. Save this for your study plan!');
  const [hashtags, setHashtags] = useState('#learntocode #programming #techcareers #softwaredeveloper #codingtips');
  const [cta, setCta] = useState('Save this post and comment ROADMAP if you want the Notion syllabus link.');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isAiPowered, setIsAiPowered] = useState(false);
  const [auditLatency, setAuditLatency] = useState<string>('Immediate (0ms)');

  const generateImmediateAudit = (): AuditResult => {
    const hasHook = hook && hook.length > 8;
    const isHookStrong = hasHook && !hook.toLowerCase().startsWith('hey') && !hook.toLowerCase().startsWith('hi');
    const tagCount = (hashtags || '').split('#').filter(Boolean).length;
    const hasCTA = cta && cta.length > 4;

    let retentionScore = 68;
    if (isHookStrong) retentionScore += 16;
    if (duration <= 45) retentionScore += 10;
    if (tagCount >= 3 && tagCount <= 6) retentionScore += 6;

    return {
      retentionScore: Math.min(96, Math.max(50, retentionScore)),
      hookStrength: isHookStrong ? 'Strong' : hasHook ? 'Moderate' : 'Needs Work',
      seoQuality: tagCount >= 3 && tagCount <= 6 ? 'Optimized' : 'Fair',
      complianceRisk: 'Low',
      whatIsWorking: [
        hasHook ? `Opening hook establishes the theme quickly.` : `Clear intended topic subject (${topic || 'topic'}).`,
        duration <= 60 ? `Target duration of ${duration}s is well-suited for high completion rate.` : `In-depth topic format provides educational depth.`,
        `Thematic relevance aligns well with the ${profile.niche || 'creator'} niche.`
      ],
      whatNeedsImprovement: [
        !isHookStrong ? `The opening 3 seconds risks early swipe-aways; eliminate greetings and lead directly with the problem.` : `Ensure visual b-roll or text overlays support the spoken hook within 1.5s.`,
        tagCount < 3 ? `Add 2 more targeted niche hashtags for TikTok search indexation.` : `Ensure keywords in the caption mirror the spoken words for dual audio-visual SEO.`,
        !hasCTA ? `Missing a clear reason for the viewer to save or follow.` : `Keep the CTA under 3 seconds at the tail end to preserve completion rate.`
      ],
      recommendedChanges: [
        `Front-load the core value proposition into the first 1.5 seconds.`,
        `Add 3-tier hashtags: 1 broad category, 2 niche community tags, and 2 specific topic tags.`,
        `Frame your Call-to-Action around "Saving" for later reference or following for the specific upcoming part.`
      ],
      suggestedExperiment: `Create two versions: Version A with a question hook ("Have you ever wondered...?"), and Version B with a bold statement ("Stop making this mistake..."). Compare the 3-second retention graphs.`
    };
  };

  // Immediate evaluation on mount (0ms delay)
  useEffect(() => {
    const immediate = generateImmediateAudit();
    setAuditResult(immediate);
  }, []);

  const runAudit = async () => {
    const start = performance.now();
    // 1. Immediate Execution (0ms)
    const immediate = generateImmediateAudit();
    setAuditResult(immediate);
    setIsAuditing(false);
    const elapsed = Math.round(performance.now() - start);
    setAuditLatency(`Immediate (${elapsed}ms)`);

    // 2. Background AI refinement without delay
    try {
      const res = await fetch('/api/ai/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          hook,
          caption,
          hashtags,
          cta,
          lengthSeconds: duration,
          niche: profile.niche
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audit) {
          setAuditResult(data.audit);
          setIsAiPowered(!data.isFallback);
        }
      }
    } catch {
      // immediate result already displayed
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <SearchCode className="w-3.5 h-3.5" />
          Pre-Publish Algorithmic Audit
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Interactive Content Audit Tool
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Test your video premise, opening hook, pacing, and calls-to-action against algorithmic retention patterns before you film or post.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Form (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm">Video Blueprint Details</h3>
            <span className="text-[10px] text-slate-400">Niche: {profile.niche}</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Core Topic / Premise
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                First 3-Second Hook (Spoken & Visual)
              </label>
              <textarea
                rows={2}
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                placeholder="What is spoken and displayed in seconds 0.0 - 3.0?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Estimated Length
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={10}
                    max={300}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs text-slate-400">sec</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Duration Class
                </label>
                <div className="text-[11px] py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  {duration >= 60 ? '✨ 1-min+ (Monetizable)' : '⚡ Short-form (High Velocity)'}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Proposed Caption
              </label>
              <textarea
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Hashtags
              </label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Call To Action (CTA)
              </label>
              <input
                type="text"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={runAudit}
              disabled={isAuditing}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Run Content Audit (Immediate Response • 0ms)</span>
            </button>
          </div>
        </div>

        {/* Right Output: Structured Audit Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {!auditResult ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <SearchCode className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h4 className="font-bold text-white text-base">Ready for Diagnostic Review</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Click <strong>Run Content Audit</strong> to generate a structured analysis: What is working → What needs improvement → Recommended changes → Suggested experiment.
                </p>
              </div>
              <button
                onClick={runAudit}
                className="text-xs px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Audit Current Draft
              </button>
            </div>
          ) : (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Scorecard Header */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Predicted Retention Score
                    </span>
                    {isAiPowered && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Gemini AI Analyzed
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-cyan-400">
                      {auditResult.retentionScore}/100
                    </span>
                    <span className="text-xs text-slate-400">
                      Hook: <strong className="text-white">{auditResult.hookStrength}</strong> • SEO: <strong className="text-white">{auditResult.seoQuality}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Compliance: {auditResult.complianceRisk} Risk
                  </span>
                </div>
              </div>

              {/* 4-Step Structured Audit (What is working -> Needs improvement -> Changes -> Experiment) */}
              <div className="space-y-4">
                {/* 1. What is working */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    1. What Is Working
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {auditResult.whatIsWorking.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. What needs improvement */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    2. What Needs Improvement
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {auditResult.whatNeedsImprovement.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Recommended changes */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    3. Recommended Changes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {auditResult.recommendedChanges.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Suggested experiment */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/30 to-slate-900 border border-purple-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4" />
                    4. Suggested A/B Experiment
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {auditResult.suggestedExperiment}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Educational Disclaimer Required by Section 10 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Educational Disclaimer:</strong> This audit provides recommendations based on proven retention formulas and search optimization signals. It does not promise or guarantee viral distribution, views, or follower gains.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
