import React, { useState, useEffect, useRef } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  RotateCcw,
  CheckCircle2,
  Lock,
  Zap,
  Info,
  Camera,
  Mic,
  Volume2,
  RefreshCw,
  AlertCircle,
  Video,
  Check
} from 'lucide-react';
import { CreatorProfile, CreatorType, NicheType } from '../types';
import { INITIAL_CREATOR_PROFILE } from '../data/mockData';

interface SettingsViewProps {
  profile: CreatorProfile;
  onUpdateProfile: (updated: CreatorProfile) => void;
  onResetData: () => void;
  onOpenOnboarding: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  onResetData,
  onOpenOnboarding
}) => {
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [niche, setNiche] = useState(profile.niche);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Hardware Diagnostics State (Camera & Audio)
  const [isTestingHardware, setIsTestingHardware] = useState(false);
  const [hardwareStream, setHardwareStream] = useState<MediaStream | null>(null);
  const [audioMeterLevel, setAudioMeterLevel] = useState(0);
  const [hardwareError, setHardwareError] = useState<string | null>(null);
  const [hardwareDevices, setHardwareDevices] = useState<{
    cameras: MediaDeviceInfo[];
    mics: MediaDeviceInfo[];
  }>({ cameras: [], mics: [] });

  const testVideoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const startHardwareTest = async () => {
    setIsTestingHardware(true);
    setHardwareError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: { echoCancellation: true, noiseSuppression: true }
      });

      setHardwareStream(stream);

      if (testVideoRef.current) {
        testVideoRef.current.srcObject = stream;
      }

      // Enumerate devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      setHardwareDevices({
        cameras: devices.filter((d) => d.kind === 'videoinput'),
        mics: devices.filter((d) => d.kind === 'audioinput')
      });

      // Setup audio analyzer
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) {
          const source = audioCtx.createMediaStreamSource(new MediaStream([audioTrack]));
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);
          analyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateMeter = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length;
            setAudioMeterLevel(Math.min(100, Math.round((avg / 128) * 100)));
            animFrameRef.current = requestAnimationFrame(updateMeter);
          };
          updateMeter();
        }
      }
    } catch (err: any) {
      console.error('Hardware access error:', err);
      setHardwareError(
        err.name === 'NotAllowedError'
          ? 'Camera or Microphone access was denied in browser permissions. Please allow access.'
          : err.message || 'Could not access camera or microphone.'
      );
    }
  };

  const stopHardwareTest = () => {
    if (hardwareStream) {
      hardwareStream.getTracks().forEach((track) => track.stop());
      setHardwareStream(null);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsTestingHardware(false);
    setAudioMeterLevel(0);
  };

  useEffect(() => {
    return () => {
      if (hardwareStream) {
        hardwareStream.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [hardwareStream]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      handle,
      niche
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <SettingsIcon className="w-3.5 h-3.5" />
          System Preferences
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Creator Account & Platform Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Configure creator parameters, update your content niche, and review privacy protocols.
        </p>
      </div>

      {/* Profile Settings Form */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            Profile Configuration
          </h3>
          <button
            type="button"
            onClick={onOpenOnboarding}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Re-run 6-Step Onboarding Wizard
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">TikTok Handle</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Primary Niche</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value as NicheType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {[
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
                ].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Creator Role</label>
              <input
                type="text"
                disabled
                value={profile.creatorType}
                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            {savedSuccess ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Profile updated successfully!
              </span>
            ) : (
              <span className="text-xs text-slate-400">
                Changes immediately re-calibrate your AI recommendations.
              </span>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Camera & Microphone Studio Hardware Diagnostics */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-rose-400" />
            <h3 className="font-bold text-white text-base">
              Studio Hardware Access (Camera & Audio)
            </h3>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono border border-rose-500/30">
            WEBRTC PERMISSION
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          TikTok Booster accesses your device camera and microphone locally to record 9:16 vertical clips, monitor live audio decibel levels, provide real-time hook teleprompters, and capture voice transcripts.
        </p>

        {hardwareError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{hardwareError}</span>
          </div>
        )}

        {!isTestingHardware ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 gap-3">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                Test Camera Feed & Microphone Meter
              </h4>
              <p className="text-[11px] text-slate-400">
                Check video framing, lighting, background noise, and microphone volume before recording.
              </p>
            </div>
            <button
              type="button"
              onClick={startHardwareTest}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center gap-1.5 transition-all self-start sm:self-center shrink-0"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Run Hardware Test</span>
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Camera & Audio Hardware Diagnostic Active
              </span>
              <button
                type="button"
                onClick={stopHardwareTest}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 transition-colors"
              >
                Close Test
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Video preview */}
              <div className="relative aspect-video max-w-[280px] mx-auto w-full bg-black rounded-xl overflow-hidden border border-slate-700 shadow-md">
                <video
                  ref={testVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                <div className="absolute top-2 left-2 text-[10px] bg-black/70 px-2 py-0.5 rounded text-emerald-400 font-mono">
                  LIVE VIDEO
                </div>
              </div>

              {/* Audio visualizer & device counts */}
              <div className="space-y-3 text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      Live Microphone Signal (VU Meter):
                    </span>
                    <span className="font-mono text-emerald-400">{audioMeterLevel}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-75 rounded-full ${
                        audioMeterLevel < 10
                          ? 'bg-amber-500'
                          : audioMeterLevel > 80
                          ? 'bg-rose-500'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${Math.max(4, audioMeterLevel)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {audioMeterLevel > 15
                      ? '✓ Voice level is strong and clear.'
                      : 'Speak into your microphone to verify vocal pickup.'}
                  </p>
                </div>

                <div className="space-y-1 text-[11px] text-slate-400 pt-1">
                  <div>Detected Cameras: <strong className="text-white">{hardwareDevices.cameras.length || 1} available</strong></div>
                  <div>Detected Microphones: <strong className="text-white">{hardwareDevices.mics.length || 1} available</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Privacy & Security Architecture (Section 22 Requirements) */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          Data & Privacy Safeguards (Zero Password Requirement)
        </h3>

        <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong>Zero TikTok Password Storage:</strong> TikTok Booster operates strictly as an educational analytics and strategy suite. We never ask for, collect, or store your TikTok password.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              <strong>Official API Architecture:</strong> If you connect an account, only official OAuth permission tokens with minimal read-only scopes are used.
            </p>
          </div>
        </div>
      </div>

      {/* Reset Demo Data */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-white text-sm">Reset Sample Metrics & Lessons</h4>
          <p className="text-xs text-slate-400">
            Restore original benchmark videos, default editorial schedule, and curriculum states.
          </p>
        </div>

        <button
          onClick={onResetData}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors border border-slate-700 self-start sm:self-center shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};
