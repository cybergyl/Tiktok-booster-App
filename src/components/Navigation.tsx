import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  SearchCode,
  Anchor,
  CalendarDays,
  Music2,
  Users,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  Coins,
  GraduationCap,
  Bot,
  Settings,
  Menu,
  X,
  Zap,
  Globe,
  Video
} from 'lucide-react';
import { ViewTab, CreatorProfile } from '../types';

interface NavigationProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  profile: CreatorProfile;
  onOpenLanding: () => void;
  onOpenOnboarding: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenLanding,
  onOpenOnboarding
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navGroups = [
    {
      group: 'Core Creation',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'publisher', label: 'Video Studio & Publish', icon: Video },
        { id: 'optimizer', label: 'Content Optimizer', icon: Sparkles },
        { id: 'audit', label: 'Content Audit', icon: SearchCode },
        { id: 'hooks', label: 'Hooks & Retention', icon: Anchor }
      ]
    },
    {
      group: 'Strategy & Reach',
      items: [
        { id: 'posting', label: 'Posting Strategy', icon: CalendarDays },
        { id: 'trends', label: 'Trends & Audio', icon: Music2 },
        { id: 'engagement', label: 'Engagement', icon: Users }
      ]
    },
    {
      group: 'Performance & Health',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'health', label: 'Account Health', icon: ShieldCheck },
        { id: 'safety', label: 'Safety Center', icon: AlertTriangle },
        { id: 'monetization', label: 'Monetization', icon: Coins }
      ]
    },
    {
      group: 'Growth & Support',
      items: [
        { id: 'learning', label: 'Learning Center', icon: GraduationCap },
        { id: 'assistant', label: 'AI Creator Assistant', icon: Bot },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const handleSelectTab = (tab: ViewTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              TikTok Booster
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                PRO
              </span>
            </span>
            <p className="text-[10px] text-slate-400">{profile.handle} • {profile.niche}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLanding}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center gap-1 border border-slate-800"
            title="Overview Landing Page"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-sm bg-[#0b0f17] border-r border-slate-800 p-5 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-sm">TikTok Booster</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-5 flex-1">
              {navGroups.map((grp) => (
                <div key={grp.group} className="space-y-1">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 px-2 mb-1.5">
                    {grp.group}
                  </p>
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id as ViewTab)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOnboarding();
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 text-left font-medium"
              >
                ⚙️ Recalibrate Creator Profile
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLanding();
                }}
                className="w-full py-2 px-3 rounded-lg bg-cyan-600/20 border border-cyan-500/30 hover:bg-cyan-600/30 text-xs text-cyan-300 text-center font-medium"
              >
                View Landing Overview
              </button>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-col bg-[#0b0f17] border-r border-slate-800/80 h-screen sticky top-0 shrink-0 select-none">
        {/* Logo / Brand header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">
                  TikTok Booster
                </span>
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  Growth
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Algorithmic Literacy Platform</p>
            </div>
          </div>
        </div>

        {/* Creator profile card */}
        <div className="px-4 py-3 mx-3 my-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-cyan-500/40 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{profile.name}</p>
              <p className="text-[10px] text-cyan-400 truncate">{profile.niche}</p>
            </div>
          </div>
          <button
            onClick={onOpenOnboarding}
            className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
            title="Edit creator profile"
          >
            Edit
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-2 space-y-5 overflow-y-auto scrollbar-thin">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400 px-3 mb-1">
                {grp.group}
              </p>
              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ViewTab)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.id === 'assistant' && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                        AI
                      </span>
                    )}
                    {item.id === 'health' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom banner & Landing link */}
        <div className="p-3 border-t border-slate-800/80 bg-[#080d14] space-y-2">
          <button
            onClick={onOpenLanding}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Public Landing Page</span>
          </button>
          <div className="px-2 py-1 text-center">
            <p className="text-[10px] text-slate-400 leading-tight">
              Ethical • Educational • TOS Compliant
            </p>
          </div>
        </div>
      </aside>

      {/* Bottom Mobile Bar for Essential Shortcuts */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0f17]/95 backdrop-blur border-t border-slate-800 px-3 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            activeTab === 'dashboard' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('publisher')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            activeTab === 'publisher' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Studio</span>
        </button>
        <button
          onClick={() => setActiveTab('optimizer')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            activeTab === 'optimizer' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Optimize</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            activeTab === 'audit' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <SearchCode className="w-4 h-4" />
          <span>Audit</span>
        </button>
        <button
          onClick={() => setActiveTab('learning')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            activeTab === 'learning' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Learn</span>
        </button>
        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] ${
            activeTab === 'assistant' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Bot className="w-4 h-4 text-cyan-400" />
          <span>AI Coach</span>
        </button>
      </nav>
    </>
  );
};
