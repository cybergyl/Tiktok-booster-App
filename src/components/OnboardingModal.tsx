import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Target,
  Users,
  Clock,
  Compass,
  Zap
} from 'lucide-react';
import { CreatorProfile, CreatorType, NicheType } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: CreatorProfile;
  onSaveProfile: (profile: CreatorProfile) => void;
}

const CREATOR_TYPES: CreatorType[] = [
  'Beginner',
  'Growing Creator',
  'Influencer',
  'Small Business',
  'Content Creator',
  'Social-Media Manager',
  'Monetization-Ready'
];

const NICHES: NicheType[] = [
  'Tech & AI',
  'Business & Finance',
  'Education & How-To',
  'Fitness & Health',
  'Comedy & Entertainment',
  'Beauty & Fashion',
  'Food & Cooking',
  'Gaming',
  'Lifestyle & Vlogging',
  'Creative Arts & Design'
];

const FREQUENCIES = [
  'Multiple times a day',
  '1x daily (5-7x weekly)',
  '3-4x weekly',
  '1-2x weekly',
  'Sporadic / When inspired'
];

const GOALS = [
  'Grow authentic followers sustainably',
  'Master the 3-second retention hook',
  'Qualify for the Creator Rewards Program',
  'Generate leads & customers for small business',
  'Improve content quality & editing speed',
  'Learn TikTok SEO & search traffic'
];

const AUDIENCE_SIZES = [
  'Starting out (0 - 1,000 followers)',
  '1,000 - 10,000 followers',
  '10,000 - 50,000 followers',
  '50,000 - 100,000 followers',
  '100,000+ followers'
];

const IMPROVEMENT_OPTIONS = [
  'Hooks & 3s Retention',
  'TikTok SEO & Search Keywords',
  'Ending Call-to-Action (CTA)',
  'Posting Consistency & Scheduling',
  'Audio & Trend Adaptation',
  'Community Engagement & Video Replies',
  'Monetization Readiness (1-min+ format)',
  'Community Guidelines Safety'
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<CreatorProfile>({ ...currentProfile });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      onSaveProfile(profile);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleImprovement = (item: string) => {
    const exists = profile.improvementAreas.includes(item);
    if (exists) {
      setProfile({
        ...profile,
        improvementAreas: profile.improvementAreas.filter((i) => i !== item)
      });
    } else {
      setProfile({
        ...profile,
        improvementAreas: [...profile.improvementAreas, item]
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0b0f17] border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Personalize Your Growth Plan</h3>
              <p className="text-[11px] text-slate-400">Step {step} of 6</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 h-1">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Body Steps */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Step 1: Creator Role
                </span>
                <h4 className="text-base font-bold text-white">What type of creator best describes you?</h4>
                <p className="text-xs text-slate-400">
                  This customizes your analytics benchmarks and educational curriculum.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CREATOR_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setProfile({ ...profile, creatorType: type })}
                    className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                      profile.creatorType === type
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Step 2: Content Niche
                </span>
                <h4 className="text-base font-bold text-white">What is your primary niche or topic?</h4>
                <p className="text-xs text-slate-400">
                  We will calibrate hook templates and trending sound suggestions for your category.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {NICHES.map((niche) => (
                  <button
                    key={niche}
                    onClick={() => setProfile({ ...profile, niche })}
                    className={`p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                      profile.niche === niche
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Step 3: Consistency
                </span>
                <h4 className="text-base font-bold text-white">How often do you currently publish?</h4>
                <p className="text-xs text-slate-400">
                  Consistency signals inform the algorithm that your profile is an active source of content.
                </p>
              </div>

              <div className="space-y-2">
                {FREQUENCIES.map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setProfile({ ...profile, postingFrequency: freq })}
                    className={`w-full p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                      profile.postingFrequency === freq
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> Step 4: Primary Goal
                </span>
                <h4 className="text-base font-bold text-white">What is your main creator milestone right now?</h4>
                <p className="text-xs text-slate-400">
                  We'll orient your daily recommendations around this target.
                </p>
              </div>

              <div className="space-y-2">
                {GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setProfile({ ...profile, mainGoal: goal })}
                    className={`w-full p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                      profile.mainGoal === goal
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Step 5: Audience Scale
                </span>
                <h4 className="text-base font-bold text-white">What is your current follower range?</h4>
                <p className="text-xs text-slate-400">
                  Different follower tiers require different strategies (e.g. 0-1k needs hooks; 10k+ needs monetization).
                </p>
              </div>

              <div className="space-y-2">
                {AUDIENCE_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setProfile({ ...profile, audienceSize: size })}
                    className={`w-full p-3 rounded-xl text-left text-xs font-medium border transition-all ${
                      profile.audienceSize === size
                        ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Step 6: Focus Areas
                </span>
                <h4 className="text-base font-bold text-white">What areas do you want to prioritize?</h4>
                <p className="text-xs text-slate-400">Select all that apply to highlight priority tools in your dashboard.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {IMPROVEMENT_OPTIONS.map((area) => {
                  const isChecked = profile.improvementAreas.includes(area);
                  return (
                    <button
                      key={area}
                      onClick={() => toggleImprovement(area)}
                      className={`p-3 rounded-xl text-left text-xs font-medium border flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{area}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all"
          >
            <span>{step === 6 ? 'Save & Calibrate Dashboard' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
