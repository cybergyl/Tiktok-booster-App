export type CreatorType =
  | 'Beginner'
  | 'Growing Creator'
  | 'Influencer'
  | 'Small Business'
  | 'Content Creator'
  | 'Social-Media Manager'
  | 'Monetization-Ready';

export type NicheType =
  | 'Tech & AI'
  | 'Business & Finance'
  | 'Education & How-To'
  | 'Fitness & Health'
  | 'Comedy & Entertainment'
  | 'Beauty & Fashion'
  | 'Food & Cooking'
  | 'Gaming'
  | 'Lifestyle & Vlogging'
  | 'Creative Arts & Design';

export interface CreatorProfile {
  name: string;
  handle: string;
  creatorType: CreatorType;
  niche: NicheType;
  postingFrequency: string;
  mainGoal: string;
  audienceSize: string;
  improvementAreas: string[];
  avatarUrl: string;
  joinedDate: string;
}

export interface VideoMetric {
  id: string;
  title: string;
  postedDate: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  retention3s: number; // percentage
  completionRate: number; // percentage
  avgWatchTimeSeconds: number;
  durationSeconds: number;
  performanceStatus: 'top' | 'underperforming' | 'average';
  tags: string[];
  soundTitle: string;
  whyItWorkedOrStruggled: string;
}

export interface ContentPlanItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlot: string;
  title: string;
  topic: string;
  stage: 'Idea' | 'Scripted' | 'Recorded' | 'Published';
  seriesName?: string;
  targetHook: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  completed: boolean;
  summary: string;
  learnContent: string[];
  realWorldExample: {
    good: string;
    bad: string;
    takeaway: string;
  };
  interactiveExercise: {
    prompt: string;
    placeholder: string;
    solutionHint: string;
  };
  checklist: string[];
}

export interface HookTemplate {
  id: string;
  archetype: 'Curiosity Gap' | 'Counter-Intuitive' | 'High Stakes' | 'Problem-First' | 'Story Spoiler' | 'Pattern Interrupt';
  formula: string;
  example: string;
  pacingNote: string;
  bestForNiches: string[];
}

export interface SoundTrendItem {
  id: string;
  title: string;
  artist: string;
  velocity: 'Rising' | 'Peak' | 'Saturated' | 'Evergreen';
  category: string;
  videoCountText: string;
  recommendedUse: string;
  copyrightStatus: 'Safe for Personal Accounts' | 'Cleared for Commercial Use' | 'Restricted for Businesses';
}

export interface AuditResult {
  retentionScore: number;
  hookStrength: 'Strong' | 'Moderate' | 'Needs Work';
  seoQuality: 'Optimized' | 'Fair' | 'Under-optimized';
  complianceRisk: 'Low' | 'Medium' | 'Review Needed';
  whatIsWorking: string[];
  whatNeedsImprovement: string[];
  recommendedChanges: string[];
  suggestedExperiment: string;
}

export interface ReviewCriterion {
  id: string;
  category: 'Hook' | 'SEO Keywords' | 'Hashtags' | 'CTA' | 'Duration' | 'Compliance';
  title: string;
  status: 'passed' | 'warning' | 'failed';
  issueDescription: string;
  correctionSuggestion: string;
  autoFixAvailable: boolean;
}

export interface PrePublishReviewReport {
  overallScore: number; // 0 - 100
  gatekeeperStatus: 'APPROVED_FOR_DIRECT_POST' | 'NEEDS_CORRECTIONS' | 'BLOCKED';
  totalIssuesCount: number;
  criteria: ReviewCriterion[];
  suggestedOptimizedDraft: {
    hook: string;
    caption: string;
    hashtags: string;
    cta: string;
  };
}

export type ViewTab =
  | 'dashboard'
  | 'publisher'
  | 'optimizer'
  | 'audit'
  | 'hooks'
  | 'posting'
  | 'trends'
  | 'engagement'
  | 'analytics'
  | 'health'
  | 'safety'
  | 'monetization'
  | 'learning'
  | 'assistant'
  | 'settings';
