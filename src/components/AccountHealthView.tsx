import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Music2,
  CalendarCheck,
  Plus,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { CreatorProfile } from '../types';

interface AccountHealthViewProps {
  profile: CreatorProfile;
}

export const AccountHealthView: React.FC<AccountHealthViewProps> = ({ profile }) => {
  const [selfWarnings, setSelfWarnings] = useState<
    { id: string; date: string; title: string; resolved: boolean; note: string }[]
  >([
    {
      id: 'w-1',
      date: 'March 14, 2026',
      title: 'Copyright Music Notice on Video #12',
      resolved: true,
      note: 'Replaced audio track with Commercial Music Library ambient lo-fi sound.'
    }
  ]);

  const [newWarningTitle, setNewWarningTitle] = useState('');
  const [newWarningNote, setNewWarningNote] = useState('');
  const [showAddLog, setShowAddLog] = useState(false);

  const complianceItems = [
    {
      id: 'c-1',
      label: 'Zero Active Community Guideline Strikes',
      passed: true,
      desc: 'No automated moderation strikes or video removals detected in the past 90 days.'
    },
    {
      id: 'c-2',
      label: '100% Original Content Footage',
      passed: true,
      desc: 'All recent videos feature original recordings with no uncredited third-party watermarks.'
    },
    {
      id: 'c-3',
      label: 'Authentic Engagement Verification',
      passed: true,
      desc: 'Zero bot followers, engagement pods, or artificial view services used.'
    },
    {
      id: 'c-4',
      label: 'Commercial Music Licensing Adherence',
      passed: true,
      desc: 'All sponsored and tutorial videos utilize pre-cleared sounds or original audio.'
    }
  ];

  const securityItems = [
    {
      id: 's-1',
      label: 'Two-Factor Authentication (2FA) Active',
      passed: true,
      desc: 'SMS or Authenticator app security code required for login.'
    },
    {
      id: 's-2',
      label: 'Verified Recovery Email & Phone Number',
      passed: true,
      desc: 'Secures account against lockouts and unauthorized password resets.'
    },
    {
      id: 's-3',
      label: 'Suspicious Direct Message Filter On',
      passed: true,
      desc: 'Blocks unverified DM links and fake sponsorship phishing inquiries.'
    }
  ];

  const handleAddWarning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWarningTitle.trim()) return;

    setSelfWarnings([
      ...selfWarnings,
      {
        id: `w-${Date.now()}`,
        date: 'Today',
        title: newWarningTitle,
        resolved: false,
        note: newWarningNote || 'Under self-review'
      }
    ]);
    setNewWarningTitle('');
    setNewWarningNote('');
    setShowAddLog(false);
  };

  const handleToggleResolved = (id: string) => {
    setSelfWarnings(
      selfWarnings.map((w) => (w.id === id ? { ...w, resolved: !w.resolved } : w))
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Account Health & Integrity
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Creator Account Health Status
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Maintain your account standing, review security protocols, log compliance reviews, and ensure full eligibility for TikTok creator opportunities.
        </p>
      </div>

      {/* Primary Account Status Banner (Section 14 requirement) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl font-extrabold">
            🟢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg text-white">Status: Healthy Standing</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Score: 98/100
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Zero strikes recorded • 2FA enabled • Clean copyright standing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-left sm:text-right">
            <p className="text-[11px] text-slate-400">Creator Program Standing</p>
            <p className="text-xs font-bold text-emerald-400">Fully Eligible for Monetization</p>
          </div>
        </div>
      </div>

      {/* Two Columns: Compliance & Security Checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compliance Checklist */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h4 className="font-bold text-white text-base flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Compliance & Guidelines Checklist
          </h4>

          <div className="space-y-3">
            {complianceItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-white">{item.label}</p>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Checklist */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h4 className="font-bold text-white text-base flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            Account Security & Phishing Defense
          </h4>

          <div className="space-y-3">
            {securityItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-white">{item.label}</p>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Self-Logged Warnings / Content Reviews */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div>
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Creator Self-Audit & Content Warning Log
            </h4>
            <p className="text-xs text-slate-400">
              Track video audits, copyright adjustments, and content notices
            </p>
          </div>

          <button
            onClick={() => setShowAddLog(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors self-start sm:self-center"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Notice</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {selfWarnings.map((warn) => (
            <div
              key={warn.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">{warn.title}</span>
                  <span className="text-[10px] text-slate-400">{warn.date}</span>
                </div>
                <p className="text-xs text-slate-300">{warn.note}</p>
              </div>

              <button
                onClick={() => handleToggleResolved(warn.id)}
                className={`text-[10px] px-2.5 py-1 rounded-lg font-bold border transition-colors shrink-0 ${
                  warn.resolved
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-emerald-500/10 hover:text-emerald-400'
                }`}
              >
                {warn.resolved ? '✓ Resolved' : 'Mark Resolved'}
              </button>
            </div>
          ))}
        </div>

        {/* Modal for adding log */}
        {showAddLog && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h5 className="text-xs font-bold text-white">Record New Content Audit or Warning</h5>
            <div className="space-y-2">
              <input
                type="text"
                value={newWarningTitle}
                onChange={(e) => setNewWarningTitle(e.target.value)}
                placeholder="Title (e.g. Muted audio review on Episode 3)"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <textarea
                rows={2}
                value={newWarningNote}
                onChange={(e) => setNewWarningNote(e.target.value)}
                placeholder="Resolution notes or actions taken..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowAddLog(false)}
                className="px-3 py-1 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWarning}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white"
              >
                Save Record
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Regulatory / Platform Disclaimer (Section 14) */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5 leading-relaxed">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p>
          <strong>Account Health Disclaimer:</strong> Status evaluations and compliance checklists are generated solely from self-entered records, verified platform guidelines, and best practice metrics. TikTok Booster does not access TikTok's proprietary backend moderation servers or internal strike databases.
        </p>
      </div>
    </div>
  );
};
