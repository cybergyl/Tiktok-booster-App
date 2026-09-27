import {
  CreatorProfile,
  VideoMetric,
  ContentPlanItem,
  Lesson,
  HookTemplate,
  SoundTrendItem
} from '../types';

export const INITIAL_CREATOR_PROFILE: CreatorProfile = {
  name: 'Alex Rivera',
  handle: '@alexcreates',
  creatorType: 'Growing Creator',
  niche: 'Education & How-To',
  postingFrequency: '1x daily (5x weekly)',
  mainGoal: 'Grow audience sustainably & qualify for Creator Rewards',
  audienceSize: '10k-50k',
  improvementAreas: ['Hooks & 3s Retention', 'TikTok SEO Keywords', 'Series Consistency'],
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  joinedDate: 'February 2026'
};

export const INITIAL_VIDEOS: VideoMetric[] = [
  {
    id: 'vid-1',
    title: '3 Secret Keyboard Shortcuts Nobody Uses (Mac & Windows)',
    postedDate: 'Yesterday',
    views: 48200,
    likes: 4120,
    comments: 318,
    shares: 890,
    saves: 2450,
    retention3s: 74,
    completionRate: 52,
    avgWatchTimeSeconds: 26.4,
    durationSeconds: 38,
    performanceStatus: 'top',
    tags: ['#techhacks', '#productivity', '#learnontiktok', '#techtips', '#shortcut'],
    soundTitle: 'Aesthetic Lo-fi Beats (Instrumental)',
    whyItWorkedOrStruggled: 'Strong opening: demonstrated the shortcut in the very first second with zero greeting. High save-to-view ratio (5.1%) prompted the algorithm to push to wider FYP.'
  },
  {
    id: 'vid-2',
    title: 'How I Organize My Entire Life in 1 Free Tool',
    postedDate: '4 days ago',
    views: 89500,
    likes: 9230,
    comments: 642,
    shares: 1420,
    saves: 5610,
    retention3s: 81,
    completionRate: 64,
    avgWatchTimeSeconds: 44.8,
    durationSeconds: 58,
    performanceStatus: 'top',
    tags: ['#organization', '#productivitytips', '#studytok', '#workflow', '#learnontiktok'],
    soundTitle: 'Smooth Synth Ambient Waves',
    whyItWorkedOrStruggled: 'Pattern interrupt hook within 0.8s. Pacing was brisk with on-screen kinetic typography. High replay rate because viewers paused to inspect the template.'
  },
  {
    id: 'vid-3',
    title: 'Hey guys, quick update on my desk setup and thoughts',
    postedDate: '1 week ago',
    views: 3100,
    likes: 198,
    comments: 14,
    shares: 4,
    saves: 18,
    retention3s: 28,
    completionRate: 11,
    avgWatchTimeSeconds: 7.2,
    durationSeconds: 42,
    performanceStatus: 'underperforming',
    tags: ['#dailyvlog', '#desk', '#update'],
    soundTitle: 'Original Audio - @alexcreates',
    whyItWorkedOrStruggled: 'Fatal hook dropoff: 72% of viewers swiped away before 3 seconds due to the slow greeting ("Hey guys..."). No clear value promised upfront.'
  },
  {
    id: 'vid-4',
    title: 'Why 90% of people fail at learning new habits',
    postedDate: '2 weeks ago',
    views: 29400,
    likes: 2450,
    comments: 184,
    shares: 310,
    saves: 1180,
    retention3s: 68,
    completionRate: 46,
    avgWatchTimeSeconds: 22.1,
    durationSeconds: 35,
    performanceStatus: 'average',
    tags: ['#habits', '#psychology', '#selfimprovement', '#mindset'],
    soundTitle: 'Thoughtful Piano Melodies',
    whyItWorkedOrStruggled: 'Solid retention through the middle, but lacked a distinct CTA at the end, leading to fewer profile clicks and saves than average.'
  },
  {
    id: 'vid-5',
    title: 'The AI tool you will regret not knowing in 2026',
    postedDate: '3 weeks ago',
    views: 112000,
    likes: 14200,
    comments: 980,
    shares: 3100,
    saves: 8400,
    retention3s: 86,
    completionRate: 69,
    avgWatchTimeSeconds: 48.0,
    durationSeconds: 52,
    performanceStatus: 'top',
    tags: ['#aitools', '#techtrends', '#futureofwork', '#learnontiktok'],
    soundTitle: 'Upbeat Tech Cyber Bass',
    whyItWorkedOrStruggled: 'High-stakes curiosity gap hook. Solved an immediate problem with a 5-second live screencast. Generated heavy discussion in comments comparing alternatives.'
  }
];

export const INITIAL_CONTENT_CALENDAR: ContentPlanItem[] = [
  {
    id: 'cp-1',
    day: 'Monday',
    timeSlot: '12:00 PM - 1:00 PM',
    title: 'Part 1: 5 Common Mistakes in Daily Workflow',
    topic: 'Workflow Optimization',
    stage: 'Recorded',
    seriesName: 'Fix Your Workflow (Part 1/3)',
    targetHook: 'Stop doing this one thing before opening your laptop...'
  },
  {
    id: 'cp-2',
    day: 'Wednesday',
    timeSlot: '6:30 PM - 7:30 PM',
    title: 'Part 2: The 2-Minute Rule for Inbox Zero',
    topic: 'Productivity Techniques',
    stage: 'Scripted',
    seriesName: 'Fix Your Workflow (Part 2/3)',
    targetHook: 'My inbox had 4,000 unread emails until I found this trick.'
  },
  {
    id: 'cp-3',
    day: 'Friday',
    timeSlot: '5:00 PM - 6:00 PM',
    title: 'Part 3: 3 Automation Rules That Save 5 Hours Weekly',
    topic: 'Automation Tools',
    stage: 'Idea',
    seriesName: 'Fix Your Workflow (Part 3/3)',
    targetHook: 'If you do repetitive tasks every Friday, let a robot do it.'
  },
  {
    id: 'cp-4',
    day: 'Saturday',
    timeSlot: '11:00 AM - 12:00 PM',
    title: 'Community Q&A: Answering the #1 requested tool setup',
    topic: 'Community Response',
    stage: 'Idea',
    targetHook: 'Replying to @sarah_design: Here is how to configure dark mode templates...'
  }
];

export const HOOK_TEMPLATES: HookTemplate[] = [
  {
    id: 'hook-1',
    archetype: 'Curiosity Gap',
    formula: 'Most people don’t know this, but if you [Action], this happens...',
    example: 'Most people don’t know this, but if you press Windows + V right now, you unlock a hidden superpower.',
    pacingNote: 'Execute the physical action on screen before finishing the sentence (0.0s - 1.8s).',
    bestForNiches: ['Tech & AI', 'Education & How-To', 'Business & Finance']
  },
  {
    id: 'hook-2',
    archetype: 'Counter-Intuitive',
    formula: 'Stop [Common Habit]. Here is why it is actually destroying your [Goal]...',
    example: 'Stop drinking coffee first thing in the morning. Here is the neurochemical reason it makes you crash at 2 PM.',
    pacingNote: 'Use a high-contrast title card with red/amber accents for instant visual readability.',
    bestForNiches: ['Fitness & Health', 'Education & How-To', 'Lifestyle & Vlogging']
  },
  {
    id: 'hook-3',
    archetype: 'High Stakes',
    formula: 'This single mistake cost me [Cost / Time], and 95% of creators are still doing it...',
    example: 'This one video setting cost me 40,000 views, and almost every creator has it turned on by default.',
    pacingNote: 'State the consequence in the first 4 words. Cut straight to the proof.',
    bestForNiches: ['Business & Finance', 'Tech & AI', 'Creative Arts & Design']
  },
  {
    id: 'hook-4',
    archetype: 'Problem-First',
    formula: 'If your [Pain Point] feels completely overwhelming, try this 60-second fix...',
    example: 'If your video editing takes 4 hours for a 30-second clip, here is the timeline shortcut you need.',
    pacingNote: 'Show the messy/painful state for 0.5s, then immediately reveal the solution.',
    bestForNiches: ['Creative Arts & Design', 'Small Business', 'Food & Cooking']
  },
  {
    id: 'hook-5',
    archetype: 'Story Spoiler',
    formula: 'I tested [Crazy Hypothesis] for 30 days, and here is the shocking result...',
    example: 'I posted 3 times a day for 30 days without using hashtags. Here is what actually happened to my account.',
    pacingNote: 'Show the final graph/result for a split second (0.3s) to create intense retention curiosity.',
    bestForNiches: ['Tech & AI', 'Fitness & Health', 'Comedy & Entertainment']
  },
  {
    id: 'hook-6',
    archetype: 'Pattern Interrupt',
    formula: 'Wait, don’t scroll—look at this exact number right here...',
    example: 'Wait, look at this error message. If your phone shows this icon, your storage is about to freeze.',
    pacingNote: 'Physical hand gesture or rapid zoom-in on an unusual visual element.',
    bestForNiches: ['Tech & AI', 'Education & How-To', 'Gaming']
  }
];

export const SOUND_TRENDS: SoundTrendItem[] = [
  {
    id: 'st-1',
    title: 'Monochrome Ambient Glow (Slowed)',
    artist: 'Lofi Horizon',
    velocity: 'Rising',
    category: 'Aesthetic / Background',
    videoCountText: '34.2K videos (Velocity: +180% this week)',
    recommendedUse: 'Ideal for tutorials, voiceovers, study aesthetics, and educational countdowns. Keep volume at 12-18% under primary vocal.',
    copyrightStatus: 'Cleared for Commercial Use'
  },
  {
    id: 'st-2',
    title: 'The Suspense Drone (Impact Drop)',
    artist: 'Cinematic Soundscapes',
    velocity: 'Rising',
    category: 'Storytelling / Revelations',
    videoCountText: '12.8K videos (Early Discovery)',
    recommendedUse: 'Best for counter-intuitive hooks, myth-busting, and shocking case studies. Timed drop at 2.5s.',
    copyrightStatus: 'Safe for Personal Accounts'
  },
  {
    id: 'st-3',
    title: 'Upbeat Tech Cyber Pulse',
    artist: 'Digital Waveform',
    velocity: 'Peak',
    category: 'Productivity & Tech',
    videoCountText: '142K videos (High FYP recognition)',
    recommendedUse: 'High energy for rapid demonstrations, software showcases, and fast tips. Fosters energetic pace.',
    copyrightStatus: 'Cleared for Commercial Use'
  },
  {
    id: 'st-4',
    title: 'Viral Comedy Whistle Quirks',
    artist: 'Meme Central Lab',
    velocity: 'Saturated',
    category: 'Comedy & Skits',
    videoCountText: '890K videos (Saturation warning)',
    recommendedUse: 'Overused. Algorithmic fatigue risk is high. Use only if directly subverting the meme punchline.',
    copyrightStatus: 'Safe for Personal Accounts'
  },
  {
    id: 'st-5',
    title: 'Gentle Coffee Shop Morning Lo-Fi',
    artist: 'Cozy Beats Studio',
    velocity: 'Evergreen',
    category: 'Vlog / Routine',
    videoCountText: '2.4M videos (Consistent performer)',
    recommendedUse: 'Perennial background track that viewers associate with calm, high-value advice and honest reviews.',
    copyrightStatus: 'Cleared for Commercial Use'
  }
];

export const EDUCATIONAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Demystifying the TikTok Algorithm',
    category: 'Algorithm Literacy',
    durationMinutes: 6,
    completed: true,
    summary: 'Understand the math and recommendation signals behind the For You Page (FYP).',
    learnContent: [
      'The TikTok algorithm is not a magical entity or a mystery lottery; it is a batch-testing recommendation engine designed to maximize total active user watch time.',
      'When you publish a video, TikTok serves it to a "seed batch" of 200–500 random and niche-interested viewers.',
      'The algorithm measures 4 tiered signals: (1) 3-Second Retention Rate, (2) Video Completion Rate, (3) Shares & Saves, and (4) Comments & Likes.',
      'If your seed batch has an average watch time > 60% and high share-to-view ratio, the system triggers the next distribution tier (2,000 → 10,000 → 100,000+).'
    ],
    realWorldExample: {
      good: 'A 28-second video with no dead air, 78% retention at 3s, and 54% completion. TikTok pushes it to 4 sequential testing tiers.',
      bad: 'A 60-second video with a 5-second greeting ("Hey guys, happy Friday..."). 70% of viewers swipe before second 3. The video dies at 320 views.',
      takeaway: 'Optimize for completion rate and the first 3 seconds, not raw video length or aesthetic intros.'
    },
    interactiveExercise: {
      prompt: 'Identify the highest-weighted algorithmic signal when calculating FYP distribution score:',
      placeholder: 'Type your answer (e.g. Likes, Watch Time, Comments, Hashtags)',
      solutionHint: 'Watch Time & Completion Rate account for over 50% of the distribution score weight.'
    },
    checklist: [
      'Eliminated introductory greetings from the first 2 seconds',
      'Checked that video pacing has no empty pauses longer than 0.5s',
      'Ensured the topic appeals directly to a specific viewer problem or curiosity'
    ]
  },
  {
    id: 'lesson-2',
    title: 'Crafting Unskippable 3-Second Hooks',
    category: 'Retention & Hooks',
    durationMinutes: 8,
    completed: true,
    summary: 'Master the psychological formulas that stop the infinite scroll within 1.5 seconds.',
    learnContent: [
      'On mobile feeds, the human thumb scrolls reflexively every 1.5 to 2.2 seconds.',
      'A successful hook consists of two simultaneous layers: The Visual Hook (kinetic movement, zoom, on-screen text, gesture) and The Audio/Spoken Hook (curiosity gap, controversial statement, or instant promise).',
      'Never open with self-introduction or greetings. The viewer does not know you yet; they only care about what the video does for THEM.',
      'Place dynamic, high-contrast captions centered vertically in the viewport so muted viewers immediately understand the premise.'
    ],
    realWorldExample: {
      good: '"Do not buy an iPad until you turn off this setting." (Immediate urgency + curiosity + high contrast subtitle)',
      bad: '"Hey guys, welcome back to my tech channel! Today we are looking at iPad settings." (Self-centered, zero tension)',
      takeaway: 'Front-load the benefit or risk before the 2-second mark.'
    },
    interactiveExercise: {
      prompt: 'Re-write this weak opening: "Hi everyone, today I want to show you how to organize your desk."',
      placeholder: 'Draft your revised 3-second hook here...',
      solutionHint: 'Try: "If your desk looks like a disaster every Monday, this 10-second habit fixes it."'
    },
    checklist: [
      'Hook contains a clear tension, question, or curiosity gap',
      'On-screen text is placed within the TikTok "Safe Zone" (not covered by right-hand icons)',
      'Action or visual movement starts on frame 1'
    ]
  },
  {
    id: 'lesson-3',
    title: 'TikTok SEO & Keyword Strategy',
    category: 'Content Optimization',
    durationMinutes: 7,
    completed: false,
    summary: 'Optimize your captions, speech, and metadata for TikTok’s search engine algorithm.',
    learnContent: [
      'Over 40% of Gen Z users search TikTok directly instead of Google to find tutorials, reviews, and answers.',
      'TikTok’s machine learning transcribes spoken audio into text and indexes both your spoken words and your on-screen text overlays.',
      'A caption should not be a random wall of 30 tags. Use the "3-Tier SEO Formula": 1 Broad Mega Tag, 2 Categorical Niche Tags, and 2 Micro Problem Tags.',
      'Place your primary target search phrase in the first 5 words of your caption.'
    ],
    realWorldExample: {
      good: 'Caption: "Best free budget template for beginners. How to track your monthly expenses easily without spreadsheets. #budgeting #moneytok #financetips"',
      bad: 'Caption: "omg lol love this #fyp #foryou #viral #trending #xyzbca #likeforlike #blowup"',
      takeaway: 'Spam tags confuse the recommendation classifier; targeted semantic tags give your video evergreen search traffic for months.'
    },
    interactiveExercise: {
      prompt: 'Build a 3-tier hashtag structure for a video teaching a 15-minute quick healthy breakfast recipe:',
      placeholder: 'Enter 4-5 balanced hashtags...',
      solutionHint: '#healthyrecipes (Category) #quickbreakfast (Niche) #15minutemeal (Micro) #easyrecipe (Broad)'
    },
    checklist: [
      'Spoken audio mentions the exact primary keyword phrase naturally',
      'Caption includes target search terms in the opening sentence',
      'Hashtags are limited to 4-6 targeted, non-spam tags'
    ]
  },
  {
    id: 'lesson-4',
    title: 'Community Guidelines & Account Health',
    category: 'Safety & Compliance',
    durationMinutes: 10,
    completed: false,
    summary: 'Protect your account standing, avoid shadowbans, and understand safe content policies.',
    learnContent: [
      'Account health is fragile: accumulating multiple community guideline strikes restricts account reach, temporarily blocks LIVE privileges, or results in permanent bans.',
      'Key violation triggers: (1) Misleading engagement (giveaways requiring spam follows), (2) Copyrighted audio in business mode, (3) Dangerous stunts, (4) Unregulated medical claims, and (5) Hate speech/bullying.',
      'If you believe a video was falsely flagged by automated AI moderation, submit an official in-app appeal promptly. Never delete a flagged video while the appeal is pending.',
      'Avoid sudden suspicious spikes (buying fake followers or bots): TikTok algorithms detect artificial engagement patterns and disqualify the account from monetization.'
    ],
    realWorldExample: {
      good: 'Creator audits their script for sensitive trigger words, uses cleared commercial sounds, and maintains clean community standing.',
      bad: 'Creator pays $25 on a shady website for 5,000 instant bot followers. The account is permanently disqualified from the Creator Rewards Program.',
      takeaway: 'Slow, authentic, organic audience growth creates real customers, real community, and zero risk of sudden bans.'
    },
    interactiveExercise: {
      prompt: 'What should you do if an educational video is mistakenly flagged for community guidelines?',
      placeholder: 'Type your recommended action...',
      solutionHint: 'Submit an in-app appeal citing the educational context, rather than immediately re-uploading duplicate content.'
    },
    checklist: [
      'Checked video for banned medical, financial, or dangerous claims',
      'Used sounds from the authorized TikTok Commercial Music Library if on a Business Account',
      'Enabled Two-Factor Authentication (2FA) for creator security'
    ]
  },
  {
    id: 'lesson-5',
    title: 'Monetization & Creator Rewards Mastery',
    category: 'Monetization Readiness',
    durationMinutes: 9,
    completed: false,
    summary: 'The concrete roadmap to qualifying for the Creator Rewards Program and building multi-stream creator revenue.',
    learnContent: [
      'The TikTok Creator Rewards Program (formerly Creativity Program Beta) pays creators based on Qualified Views on high-quality videos longer than 1 minute.',
      'Key baseline eligibility: (1) 10,000 authentic followers, (2) 100,000 video views within the last 30 days, (3) 18+ years of age, and (4) Account in good standing with zero active strikes.',
      'RPM (Revenue Per Mille) is heavily influenced by audience geography (US, UK, CA, AU pay highest), viewer watch time, and search value.',
      'To earn consistently from 1-minute+ videos, you must master the "Middle Lull" (seconds 20 to 40) using micro-hooks and secondary revelations.'
    ],
    realWorldExample: {
      good: 'A 65-second tutorial with a visual payoff at second 55. Average watch time 48s. High RPM ($0.80 - $1.40).',
      bad: 'A 62-second video padded with filler words and dead space. Viewers drop off at second 15. Disqualified from qualified view monetization payouts.',
      takeaway: 'Make 1-minute+ videos that feel like 30 seconds through tight editing and constant value delivery.'
    },
    interactiveExercise: {
      prompt: 'Name the minimum duration required for a video to earn payouts under the TikTok Creator Rewards Program:',
      placeholder: 'Enter duration...',
      solutionHint: 'Videos must be at least 1 minute (60 seconds) in length and 100% original content.'
    },
    checklist: [
      'Track 30-day view velocity toward the 100,000 milestone',
      'Experiment with 60-75 second structured long-form videos',
      'Ensure 100% original footage without uncredited watermarks or screen-recordings of others'
    ]
  },
  {
    id: 'lesson-6',
    title: 'Building Returning Viewers & Community Loops',
    category: 'Engagement Strategy',
    durationMinutes: 7,
    completed: false,
    summary: 'Transform casual scroll-by viewers into loyal subscribers and lifelong community members.',
    learnContent: [
      'The difference between a viral video and a sustainable creator channel is "The Return Incentive".',
      'Serial Content is the #1 tool for sustainable follower growth: create numbered series ("Episode 1 of 5", "Day 12 of 30") and organize them into TikTok Playlists.',
      'Reply with Video: Pin the most insightful or controversial constructive comment and tap "Reply with video". This automatically links both videos together and drives viewers across your catalog.',
      'Ask specific, polarized questions at the end: "Do you prefer Option A or Option B?" gets 10x more comments than generic "What do you think?".'
    ],
    realWorldExample: {
      good: 'A 5-part series on "Fixing Bad Desk Ergonomics". Each video ends with: "In Part 3 tomorrow, I show the $15 monitor mount that saved my neck. Follow so you don’t miss it."',
      bad: 'Every video is a disconnected standalone topic with no series structure, no playlists, and no replies to viewer comments.',
      takeaway: 'Series turn one-off impressions into multi-video binge sessions and immediate profile follows.'
    },
    interactiveExercise: {
      prompt: 'Draft an engaging end-screen question that invites comments without sounding like spam:',
      placeholder: 'Write your question here...',
      solutionHint: 'Example: "Which of these 2 settings would you test first? Drop A or B in the comments."'
    },
    checklist: [
      'Organized top content into themed TikTok profile playlists',
      'Answered top 3 comments from the previous post with a dedicated video reply',
      'Included a specific reason to follow for upcoming episodic content'
    ]
  }
];
