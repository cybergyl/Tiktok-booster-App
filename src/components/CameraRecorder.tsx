import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Volume2,
  VolumeX,
  Clock,
  Download,
  Eye,
  Settings,
  Flame,
  FileText,
  X
} from 'lucide-react';

interface CameraRecorderProps {
  currentHook: string;
  onRecordingComplete: (videoBlob: Blob, videoUrl: string, durationSeconds: number, transcribedText?: string) => void;
  onClose?: () => void;
}

export const CameraRecorder: React.FC<CameraRecorderProps> = ({
  currentHook,
  onRecordingComplete,
  onClose
}) => {
  // Media Streams and Devices
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState<string>('');
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  // Device permissions & error states
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Video & Audio toggles
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Audio Visualizer
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Recording State
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [recordMode, setRecordMode] = useState<'immediate' | 'countdown'>('immediate');
  const recordIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Result Preview State
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordedDuration, setRecordedDuration] = useState<number>(0);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  // Teleprompter / Hook Prompt Overlay
  const [showTeleprompter, setShowTeleprompter] = useState(true);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Speech-to-Text Live Hook Dictation
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(true);
  const [liveTranscript, setLiveTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  // Video Element Refs
  const liveVideoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Initialize Speech Recognition check
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
    }
  }, []);

  // Request & initialize MediaStream
  const initializeMedia = async () => {
    try {
      setErrorMessage(null);

      // Stop any existing tracks
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: selectedVideoDeviceId
          ? { deviceId: { exact: selectedVideoDeviceId }, width: { ideal: 1080 }, height: { ideal: 1920 } }
          : { facingMode, width: { ideal: 1080 }, height: { ideal: 1920 } },
        audio: selectedAudioDeviceId
          ? { deviceId: { exact: selectedAudioDeviceId }, echoCancellation: true, noiseSuppression: true }
          : { echoCancellation: true, noiseSuppression: true }
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      setPermissionStatus('granted');

      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = newStream;
      }

      // Enumerate available devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      setVideoDevices(devices.filter((d) => d.kind === 'videoinput'));
      setAudioDevices(devices.filter((d) => d.kind === 'audioinput'));

      // Setup Web Audio API Analyzer for real-time audio volume
      setupAudioAnalyzer(newStream);
    } catch (err: any) {
      console.error('Error accessing camera and audio:', err);
      setPermissionStatus('denied');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Camera or Microphone access was denied. Please allow camera and audio permissions in your browser bar.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setErrorMessage('No camera or microphone found on this device.');
      } else {
        setErrorMessage(err.message || 'Could not access camera or microphone.');
      }
    }
  };

  // Setup Web Audio API meter
  const setupAudioAnalyzer = (mediaStream: MediaStream) => {
    try {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const audioTrack = mediaStream.getAudioTracks()[0];
      if (!audioTrack) return;

      const source = audioCtx.createMediaStreamSource(new MediaStream([audioTrack]));
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        // Normalize roughly between 0 and 100
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioLevel(normalized);

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (e) {
      console.warn('Audio analyzer error:', e);
    }
  };

  // Toggle Video Track
  const toggleVideo = () => {
    if (!stream) return;
    const track = stream.getVideoTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      setIsVideoMuted(!track.enabled);
    }
  };

  // Toggle Audio Track
  const toggleAudio = () => {
    if (!stream) return;
    const track = stream.getAudioTracks()[0];
    if (track) {
      track.enabled = !track.enabled;
      setIsAudioMuted(!track.enabled);
    }
  };

  // Switch Facing Mode (Front vs Back camera)
  const toggleCameraFacing = async () => {
    const nextFacing = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextFacing);
    setSelectedVideoDeviceId('');
  };

  // Start Media Stream on mount
  useEffect(() => {
    initializeMedia();

    return () => {
      // Cleanup tracks on unmount
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (recordIntervalRef.current) {
        clearInterval(recordIntervalRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [facingMode, selectedVideoDeviceId, selectedAudioDeviceId]);

  // Immediate recording start (0s delay)
  const startImmediateRecording = () => {
    setIsCountingDown(false);
    setLiveTranscript('');
    beginActualRecording();
  };

  // Handle countdown before recording
  const startRecordingCountdown = () => {
    setIsCountingDown(true);
    setCountdown(3);
    setLiveTranscript('');

    const countInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countInterval);
          setIsCountingDown(false);
          beginActualRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Actual recording start
  const beginActualRecording = () => {
    if (!stream) return;

    recordedChunksRef.current = [];

    // Select supported mimeType
    const mimeTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4'
    ];
    let selectedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || '';

    try {
      const mediaRecorder = new MediaRecorder(stream, selectedMime ? { mimeType: selectedMime } : undefined);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const finalBlob = new Blob(recordedChunksRef.current, {
          type: selectedMime || 'video/webm'
        });
        const url = URL.createObjectURL(finalBlob);
        setRecordedBlob(finalBlob);
        setRecordedUrl(url);
      };

      mediaRecorder.start(250); // Emit chunk every 250ms
      setIsRecording(true);
      setRecordSeconds(0);

      // Start elapsed timer
      recordIntervalRef.current = setInterval(() => {
        setRecordSeconds((s) => s + 0.5);
      }, 500);

      // Start live speech-to-text if enabled
      if (speechSupported && isTranscribing) {
        startSpeechRecognition();
      }
    } catch (e) {
      console.error('Failed to start MediaRecorder:', e);
      setErrorMessage('Could not initialize video recording format.');
    }
  };

  // Speech Recognition
  const startSpeechRecognition = () => {
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + ' ';
        }
        setLiveTranscript(transcript.trim());
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition warning:', e);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition error:', err);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recordIntervalRef.current) {
      clearInterval(recordIntervalRef.current);
      recordIntervalRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsRecording(false);
    setRecordedDuration(Math.round(recordSeconds));
  };

  // Retake video
  const handleRetake = () => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    setRecordedBlob(null);
    setRecordedUrl(null);
    setRecordedDuration(0);
    setRecordSeconds(0);
    setLiveTranscript('');
    setIsPreviewPlaying(false);

    // Reattach camera stream to video tag
    setTimeout(() => {
      if (liveVideoRef.current && stream) {
        liveVideoRef.current.srcObject = stream;
      }
    }, 100);
  };

  // Use Recorded Video in Studio
  const handleConfirmRecording = () => {
    if (!recordedBlob || !recordedUrl) return;
    onRecordingComplete(
      recordedBlob,
      recordedUrl,
      recordedDuration || Math.round(recordSeconds) || 5,
      liveTranscript || undefined
    );
  };

  // Audio level color indicator
  const getAudioBarColor = () => {
    if (isAudioMuted) return 'bg-slate-700';
    if (audioLevel < 10) return 'bg-amber-500';
    if (audioLevel > 80) return 'bg-rose-500';
    return 'bg-emerald-400';
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              Live Camera & Audio Studio
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono border border-rose-500/30">
                RECORDER
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Record 9:16 vertical video with live audio leveling, teleprompter, and hook pacing
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Permission Denied / Error Banner */}
      {permissionStatus === 'denied' && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-rose-300">
            <AlertCircle className="w-4 h-4" />
            Camera or Microphone Access Required
          </div>
          <p>{errorMessage}</p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={initializeMedia}
              className="px-3 py-1.5 rounded-lg bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-rose-600 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Grant Camera & Audio Access
            </button>
            <span className="text-[11px] text-slate-400">
              Look for the camera/mic icon in your browser address bar.
            </span>
          </div>
        </div>
      )}

      {/* Main Studio Viewport & Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left Column: 9:16 Vertical Live Viewfinder (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] aspect-[9/16] bg-black rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl flex items-center justify-center group">
            {/* Live Camera Feed */}
            {!recordedUrl ? (
              <video
                ref={liveVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${
                  facingMode === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />
            ) : (
              /* Playback of Recorded Video */
              <video
                ref={previewVideoRef}
                src={recordedUrl}
                playsInline
                controls
                className="w-full h-full object-cover"
                onPlay={() => setIsPreviewPlaying(true)}
                onPause={() => setIsPreviewPlaying(false)}
              />
            )}

            {/* Video Disabled Blackout */}
            {isVideoMuted && !recordedUrl && (
              <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-2">
                <VideoOff className="w-8 h-8 text-slate-600" />
                <span className="text-xs font-semibold">Camera Video Paused</span>
              </div>
            )}

            {/* Scrim Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

            {/* Countdown Overlay (3, 2, 1) */}
            {isCountingDown && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-30">
                <div className="text-6xl font-black text-rose-500 animate-ping">
                  {countdown}
                </div>
                <p className="text-xs text-white font-semibold mt-4 tracking-wider uppercase">
                  Get Ready to Deliver Your Hook!
                </p>
              </div>
            )}

            {/* Recording Active Status Indicator & Hook Timer Bar */}
            {isRecording && (
              <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold shadow-lg animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span>REC {recordSeconds.toFixed(1)}s</span>
                </div>

                {/* 3-Second Hook Status */}
                {recordSeconds < 3.0 ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/90 text-black border border-amber-300">
                    🎯 Hook Window ({ (3.0 - recordSeconds).toFixed(1) }s)
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/90 text-white border border-emerald-300">
                    ✓ Hook Delivered!
                  </span>
                )}
              </div>
            )}

            {/* 60s Monetization Threshold Badge */}
            {isRecording && recordSeconds >= 60 && (
              <div className="absolute top-12 left-3 right-3 text-center z-20">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white shadow">
                  💎 1-Min Monetization Reached!
                </span>
              </div>
            )}

            {/* Teleprompter / Hook Prompt Overlay on Camera View */}
            {showTeleprompter && !recordedUrl && (
              <div className="absolute top-14 inset-x-3 z-10 pointer-events-none">
                <div className="bg-black/75 backdrop-blur-md rounded-xl p-2.5 border border-white/20 text-white space-y-1 text-center shadow-xl">
                  <div className="flex items-center justify-between text-[9px] text-cyan-300 uppercase font-mono font-bold">
                    <span>Teleprompter (Eye Level)</span>
                    <span>0.0s - 3.0s</span>
                  </div>
                  <p
                    className={`font-bold leading-snug ${
                      fontSize === 'sm'
                        ? 'text-[11px]'
                        : fontSize === 'base'
                        ? 'text-xs'
                        : 'text-sm'
                    }`}
                  >
                    "{currentHook || 'Hook your audience immediately with the core problem or curiosity gap!'}"
                  </p>
                </div>
              </div>
            )}

            {/* Live Audio Level VU Meter on bottom of viewfinder */}
            <div className="absolute bottom-3 inset-x-3 z-20 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-2 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-[9px] text-slate-300">
                  <span className="flex items-center gap-1">
                    {isAudioMuted ? (
                      <VolumeX className="w-3 h-3 text-rose-400" />
                    ) : (
                      <Volume2 className="w-3 h-3 text-emerald-400" />
                    )}
                    Mic Volume
                  </span>
                  <span className="font-mono text-[9px]">
                    {isAudioMuted ? 'MUTED' : `${audioLevel}%`}
                  </span>
                </div>
                {/* Visualizer bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-75 rounded-full ${getAudioBarColor()}`}
                    style={{ width: `${isAudioMuted ? 0 : Math.max(3, audioLevel)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Camera & Audio Hardware Bar */}
          <div className="flex items-center gap-2 mt-3 text-xs">
            <button
              onClick={toggleVideo}
              disabled={!!recordedUrl}
              className={`p-2 rounded-xl border transition-colors ${
                isVideoMuted
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={isVideoMuted ? 'Turn Camera On' : 'Turn Camera Off'}
            >
              {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleAudio}
              disabled={!!recordedUrl}
              className={`p-2 rounded-xl border transition-colors ${
                isAudioMuted
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={isAudioMuted ? 'Unmute Microphone' : 'Mute Microphone'}
            >
              {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleCameraFacing}
              disabled={!!recordedUrl || isRecording}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:text-white transition-colors"
              title="Flip Camera (Front / Back)"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowTeleprompter(!showTeleprompter)}
              disabled={!!recordedUrl}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                showTeleprompter
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              Teleprompter
            </button>
          </div>
        </div>

        {/* Right Column: Audio & Camera Controls, Script, Recording Action (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          {/* Hardware Status & Device Selection */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5 text-white">
                <Settings className="w-3.5 h-3.5 text-cyan-400" />
                Input Devices & Audio Quality
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Input Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Camera Selector */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Camera Device:</label>
                <select
                  value={selectedVideoDeviceId}
                  onChange={(e) => setSelectedVideoDeviceId(e.target.value)}
                  disabled={isRecording || !!recordedUrl}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Default Front Camera</option>
                  {videoDevices.map((d, i) => (
                    <option key={d.deviceId || i} value={d.deviceId}>
                      {d.label || `Camera ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Microphone Selector */}
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Microphone Device:</label>
                <select
                  value={selectedAudioDeviceId}
                  onChange={(e) => setSelectedAudioDeviceId(e.target.value)}
                  disabled={isRecording || !!recordedUrl}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Default Microphone</option>
                  {audioDevices.map((d, i) => (
                    <option key={d.deviceId || i} value={d.deviceId}>
                      {d.label || `Microphone ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Audio Check Feedback */}
            <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300">Audio Health Check:</span>
              </div>
              <span
                className={`font-semibold ${
                  isAudioMuted
                    ? 'text-rose-400'
                    : audioLevel > 15
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}
              >
                {isAudioMuted
                  ? 'Microphone is Muted'
                  : audioLevel > 15
                  ? '✓ Vocal Pickup Clear'
                  : '⚠️ Low Signal (Speak closer to mic)'}
              </span>
            </div>
          </div>

          {/* Teleprompter Text & Font Controls */}
          {showTeleprompter && (
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  Hook Script Teleprompter
                </span>
                <div className="flex items-center gap-1 text-[10px]">
                  <span>Text Size:</span>
                  <button
                    onClick={() => setFontSize('sm')}
                    className={`px-1.5 py-0.5 rounded ${
                      fontSize === 'sm' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('base')}
                    className={`px-1.5 py-0.5 rounded ${
                      fontSize === 'base' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setFontSize('lg')}
                    className={`px-1.5 py-0.5 rounded ${
                      fontSize === 'lg' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
                    }`}
                  >
                    A++
                  </button>
                </div>
              </div>
              <p className="text-slate-300 italic bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[11px] leading-relaxed">
                "{currentHook || 'Write or generate your opening hook to read while looking directly into the camera!'}"
              </p>
            </div>
          )}

          {/* Speech-to-Text Transcription Box (Microphone Audio Feedback) */}
          {speechSupported && (
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Live Audio Dictation (Speech-to-Text)
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-slate-300">
                  <input
                    type="checkbox"
                    checked={isTranscribing}
                    onChange={(e) => setIsTranscribing(e.target.checked)}
                    className="rounded text-cyan-500 focus:ring-0"
                  />
                  <span>Transcribe Spoken Voice</span>
                </label>
              </div>

              {liveTranscript ? (
                <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-[11px] text-cyan-200">
                  <span className="text-slate-400 block text-[9px] uppercase font-mono mb-0.5">
                    Live Transcript from Mic:
                  </span>
                  "{liveTranscript}"
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 italic">
                  When you speak into the microphone during recording, your opening lines will be automatically transcribed here.
                </p>
              )}
            </div>
          )}

          {/* Recording Action Hub */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 space-y-3">
            {!recordedUrl ? (
              /* Ready to record or actively recording */
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Recording Actions:</span>
                  {isRecording && (
                    <span className="text-rose-400 font-mono font-bold animate-pulse">
                      ● Recording in progress ({recordSeconds.toFixed(1)}s)
                    </span>
                  )}
                </div>

                {!isRecording ? (
                  <div className="space-y-2">
                    <button
                      onClick={startImmediateRecording}
                      disabled={isCountingDown || permissionStatus !== 'granted'}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-white animate-pulse" />
                      <span>⚡ Immediate Record (Instant 0s Start)</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={startRecordingCountdown}
                        disabled={isCountingDown || permissionStatus !== 'granted'}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>3s Countdown Delay</span>
                      </button>
                      <div className="text-[10px] text-emerald-400 font-mono px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 whitespace-nowrap">
                        ⚡ 0ms Response Latency
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <div className="w-3.5 h-3.5 rounded-sm bg-white" />
                    <span>Stop Recording & Review Immediately ({recordSeconds.toFixed(1)}s)</span>
                  </button>
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>⏱️ 0-3s: Hook Delivery</span>
                  <span>⚡ 15-45s: Fast Velocity</span>
                  <span>💎 60s+: Monetization Ready</span>
                </div>
              </div>
            ) : (
              /* Review Recorded Video Clip */
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Video Captured Successfully ({recordedDuration}s)
                  </span>
                  <button
                    onClick={handleRetake}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Retake
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleConfirmRecording}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Use Video in Studio</span>
                  </button>

                  <a
                    href={recordedUrl}
                    download={`tiktok-booster-take-${Date.now()}.webm`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Clip</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
