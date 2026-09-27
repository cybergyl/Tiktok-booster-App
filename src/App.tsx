import React, { useState, useEffect } from 'react';
import { ViewTab, CreatorProfile, VideoMetric } from './types';
import { INITIAL_CREATOR_PROFILE, INITIAL_VIDEOS } from './data/mockData';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { OnboardingModal } from './components/OnboardingModal';
import { DashboardView } from './components/DashboardView';
import { ContentOptimizerView } from './components/ContentOptimizerView';
import { ContentAuditView } from './components/ContentAuditView';
import { HooksRetentionView } from './components/HooksRetentionView';
import { PostingStrategyView } from './components/PostingStrategyView';
import { TrendsAudioView } from './components/TrendsAudioView';
import { EngagementTacticsView } from './components/EngagementTacticsView';
import { AnalyticsView } from './components/AnalyticsView';
import { AccountHealthView } from './components/AccountHealthView';
import { SafetyCenterView } from './components/SafetyCenterView';
import { MonetizationView } from './components/MonetizationView';
import { LearningCenterView } from './components/LearningCenterView';
import { AICreatorAssistantView } from './components/AICreatorAssistantView';
import { SettingsView } from './components/SettingsView';
import { VideoPublisherStudioView } from './components/VideoPublisherStudioView';

export default function App() {
  const [showLanding, setShowLanding] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profile, setProfile] = useState<CreatorProfile>(() => {
    try {
      const stored = localStorage.getItem('tokpulse_profile');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // Ignore
    }
    return INITIAL_CREATOR_PROFILE;
  });
  const [videos, setVideos] = useState<VideoMetric[]>(INITIAL_VIDEOS);

  // Save profile changes to local storage
  const handleSaveProfile = (updatedProfile: CreatorProfile) => {
    setProfile(updatedProfile);
    try {
      localStorage.setItem('tokpulse_profile', JSON.stringify(updatedProfile));
    } catch (e) {
      // Ignore
    }
  };

  const handleResetData = () => {
    setProfile(INITIAL_CREATOR_PROFILE);
    setVideos(INITIAL_VIDEOS);
    try {
      localStorage.removeItem('tokpulse_profile');
    } catch (e) {
      // Ignore
    }
  };

  // If viewing the Landing Page
  if (showLanding) {
    return (
      <LandingPage
        onStartLearning={() => {
          setShowLanding(false);
          setActiveTab('learning');
        }}
        onAnalyzeContent={() => {
          setShowLanding(false);
          setActiveTab('audit');
        }}
        onOpenDashboard={() => {
          setShowLanding(false);
          setActiveTab('dashboard');
        }}
        onNavigateTab={(tab: ViewTab) => {
          setShowLanding(false);
          setActiveTab(tab);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080d14] text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-cyan-500 selection:text-white">
      {/* Navigation (Sidebar on desktop, header/drawer/bottom bar on mobile) */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onOpenLanding={() => setShowLanding(true)}
        onOpenOnboarding={() => setShowOnboarding(true)}
      />

      {/* Main Workspace Content Area */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full mb-16 lg:mb-0">
        {activeTab === 'dashboard' && (
          <DashboardView
            profile={profile}
            videos={videos}
            onNavigateTab={setActiveTab}
            onOpenOnboarding={() => setShowOnboarding(true)}
          />
        )}

        {activeTab === 'publisher' && <VideoPublisherStudioView profile={profile} />}

        {activeTab === 'optimizer' && <ContentOptimizerView profile={profile} />}

        {activeTab === 'audit' && <ContentAuditView profile={profile} />}

        {activeTab === 'hooks' && <HooksRetentionView profile={profile} />}

        {activeTab === 'posting' && <PostingStrategyView profile={profile} />}

        {activeTab === 'trends' && <TrendsAudioView profile={profile} />}

        {activeTab === 'engagement' && <EngagementTacticsView profile={profile} />}

        {activeTab === 'analytics' && <AnalyticsView profile={profile} videos={videos} />}

        {activeTab === 'health' && <AccountHealthView profile={profile} />}

        {activeTab === 'safety' && <SafetyCenterView profile={profile} />}

        {activeTab === 'monetization' && <MonetizationView profile={profile} />}

        {activeTab === 'learning' && <LearningCenterView profile={profile} />}

        {activeTab === 'assistant' && <AICreatorAssistantView profile={profile} />}

        {activeTab === 'settings' && (
          <SettingsView
            profile={profile}
            onUpdateProfile={handleSaveProfile}
            onResetData={handleResetData}
            onOpenOnboarding={() => setShowOnboarding(true)}
          />
        )}
      </main>

      {/* Onboarding Questionnaire Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        currentProfile={profile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
