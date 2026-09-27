import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Eye,
  Bookmark,
  Share2,
  Users,
  Compass,
  ArrowUpRight,
  Filter,
  Calendar,
  Layers,
  Search
} from 'lucide-react';
import { VideoMetric, CreatorProfile } from '../types';

interface AnalyticsViewProps {
  profile: CreatorProfile;
  videos: VideoMetric[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ profile, videos }) => {
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Custom'>('Monthly');
  const [sortField, setSortField] = useState<'views' | 'completionRate' | 'saves' | 'shares'>('views');
  const [searchTerm, setSearchTerm] = useState('');

  const trafficSources = [
    { source: 'For You Page (FYP)', percent: 72, color: 'bg-cyan-500' },
    { source: 'Personal Profile Page', percent: 14, color: 'bg-blue-500' },
    { source: 'TikTok Search Results', percent: 9, color: 'bg-teal-400' },
    { source: 'Following Feed', percent: 5, color: 'bg-slate-500' }
  ];

  const sortedVideos = [...videos]
    .filter((v) => v.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b[sortField] - a[sortField]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header & Timeframe selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
            <BarChart3 className="w-3.5 h-3.5" />
            Performance Tracking
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Creator Analytics Center
          </h2>
          <p className="text-xs text-slate-400">
            Transparent data without vanity metrics: watch time, completion, and traffic breakdown
          </p>
        </div>

        {/* Date Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl self-start sm:self-center">
          {(['Daily', 'Weekly', 'Monthly', 'Custom'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timeframe === t
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Views</span>
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">282,200</p>
          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +22.4% vs last period
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Net Followers</span>
            <Users className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">+1,820</p>
          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> Real engaged creators
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Avg Completion Rate</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">52.8%</p>
          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +4.2% (FYP healthy)
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Saves & Bookmarks</span>
            <Bookmark className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">17,658</p>
          <p className="text-[10px] text-cyan-400 font-semibold">
            6.2% Save-to-View Ratio
          </p>
        </div>
      </div>

      {/* Traffic Sources & Search Indexation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Traffic Sources (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Traffic Sources Breakdown
            </h3>
            <span className="text-[10px] text-slate-400">{timeframe} Period</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {trafficSources.map((item) => (
              <div key={item.source} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{item.source}</span>
                  <span className="text-white font-bold">{item.percent}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-200">Algorithmic Insight:</strong>
            <p>
              Your 9% Search Traffic index indicates that your SEO-optimized captions and on-screen keywords are indexing well in TikTok’s search algorithm for evergreen views.
            </p>
          </div>
        </div>

        {/* 30-Day Growth Trajectory Visualization (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Audience Growth Velocity
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              Steady Compounding
            </span>
          </div>

          {/* Simple simulated weekly bar chart */}
          <div className="grid grid-cols-4 gap-4 items-end h-40 pt-4 px-3 bg-slate-950/70 rounded-xl border border-slate-800">
            {[
              { label: 'Week 1', followers: 290, views: '48K' },
              { label: 'Week 2', followers: 410, views: '64K' },
              { label: 'Week 3', followers: 520, views: '79K' },
              { label: 'Week 4', followers: 600, views: '91K' }
            ].map((col, idx) => (
              <div key={col.label} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] text-slate-400 group-hover:text-cyan-300 font-bold">
                  +{col.followers}
                </span>
                <div
                  className="w-full max-w-[44px] rounded-t-lg bg-gradient-to-t from-cyan-600 to-blue-500 group-hover:brightness-125 transition-all"
                  style={{ height: `${(col.followers / 600) * 100}%` }}
                />
                <span className="text-[10px] text-slate-400 font-medium">{col.label}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Consistent posting of 1-minute+ series generated a <strong>28% increase in weekly subscriber velocity</strong> compared to sporadic uploads.
          </p>
        </div>
      </div>

      {/* Detailed Content Performance Table */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-white text-base">Video Catalog Performance</h3>
            <p className="text-xs text-slate-400">Sort by views, completion rate, or saves</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search videos..."
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 w-36 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-400 bg-slate-950 border border-slate-800 p-1 rounded-lg">
              <span className="text-[10px] px-1 text-slate-500 font-semibold">SORT:</span>
              <button
                onClick={() => setSortField('views')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  sortField === 'views' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:text-white'
                }`}
              >
                Views
              </button>
              <button
                onClick={() => setSortField('completionRate')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  sortField === 'completionRate' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:text-white'
                }`}
              >
                Completion
              </button>
              <button
                onClick={() => setSortField('saves')}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  sortField === 'saves' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:text-white'
                }`}
              >
                Saves
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                <th className="py-2.5 px-3">Video Title & Date</th>
                <th className="py-2.5 px-3">Views</th>
                <th className="py-2.5 px-3">3s Retention</th>
                <th className="py-2.5 px-3">Completion Rate</th>
                <th className="py-2.5 px-3">Saves</th>
                <th className="py-2.5 px-3">Shares</th>
                <th className="py-2.5 px-3">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedVideos.map((vid) => (
                <tr key={vid.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 max-w-xs">
                    <p className="font-semibold text-white truncate">{vid.title}</p>
                    <p className="text-[10px] text-slate-400">{vid.postedDate} • {vid.durationSeconds}s</p>
                  </td>
                  <td className="py-3 px-3 font-bold text-white">
                    {vid.views.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className={vid.retention3s >= 70 ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                      {vid.retention3s}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={vid.completionRate >= 50 ? 'text-cyan-400 font-semibold' : 'text-slate-300'}>
                      {vid.completionRate}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{vid.saves.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-300">{vid.shares.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        vid.performanceStatus === 'top'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : vid.performanceStatus === 'underperforming'
                          ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {vid.performanceStatus.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
