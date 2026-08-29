import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface VoiceRecorderProps {
  onAudioChange: (audioUrl: string | null) => void;
  compact?: boolean;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onAudioChange, compact = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage('Microphone recording is not supported in this browser environment.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Determine supported MIME type
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
        mimeType = 'audio/ogg;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Stop all tracks to release mic
        stream.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        if (audioBlob.size === 0) {
          setErrorMessage('Recorded voice message was empty. Please try again.');
          return;
        }

        // Convert blob to base64 data URL for easy storage & playback
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setAudioUrl(result);
          onAudioChange(result);
        };
        reader.onerror = () => {
          setErrorMessage('Failed to process recorded audio.');
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.onerror = (_event) => {
        setErrorMessage('An error occurred during audio recording.');
        stopRecording();
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.error('[VoiceRecorder] Error accessing microphone:', err);
      const errorMsg = err instanceof Error ? err.message : '';
      if (errorMsg.includes('Permission denied') || errorMsg.includes('NotAllowedError')) {
        setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser settings.');
      } else if (errorMsg.includes('NotFoundError') || errorMsg.includes('DevicesNotFoundError')) {
        setErrorMessage('No microphone device found on your system.');
      } else {
        setErrorMessage('Could not access microphone: ' + (errorMsg || 'Permission denied or device error'));
      }
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const togglePreviewPlayback = () => {
    if (!audioUrl) return;

    if (!previewAudioRef.current) {
      previewAudioRef.current = new Audio(audioUrl);
      previewAudioRef.current.onended = () => setIsPlayingPreview(false);
      previewAudioRef.current.onerror = () => {
        setErrorMessage('Failed to play preview audio.');
        setIsPlayingPreview(false);
      };
    }

    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current
        .play()
        .then(() => setIsPlayingPreview(true))
        .catch((err) => {
          console.error('[VoiceRecorder] Playback error:', err);
          setErrorMessage('Playback failed. Please re-record your message.');
        });
    }
  };

  const clearAudio = () => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }
    setIsPlayingPreview(false);
    setAudioUrl(null);
    setRecordingTime(0);
    setErrorMessage(null);
    onAudioChange(null);
  };

  return (
    <div className={`space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3 transition-all ${compact ? 'text-xs' : 'text-xs sm:text-sm'}`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="font-bold text-slate-700 inline-flex items-center gap-1.5">
          <Mic className={`w-4 h-4 ${isRecording ? 'text-red-500 animate-pulse' : 'text-blue-600'}`} />
          Voice Message {audioUrl ? '(Recorded)' : isRecording ? '(Recording...)' : '(Optional)'}
        </span>

        {/* Buttons State */}
        {!isRecording && !audioUrl && (
          <button
            type="button"
            onClick={startRecording}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs cursor-pointer transition-all hover:text-blue-700"
          >
            <Mic className="w-3.5 h-3.5 text-red-500" />
            Record Voice
          </button>
        )}

        {isRecording && (
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 animate-pulse">
              {formatTime(recordingTime)}
            </span>
            <button
              type="button"
              onClick={stopRecording}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-2xs cursor-pointer transition-all"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              Stop Recording
            </button>
          </div>
        )}

        {audioUrl && !isRecording && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePreviewPlayback}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-900 bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-lg cursor-pointer transition-all"
            >
              {isPlayingPreview ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-blue-700" /> Pause Preview
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-blue-700 fill-current" /> Play Preview
                </>
              )}
            </button>

            <button
              type="button"
              onClick={clearAudio}
              className="inline-flex items-center gap-1 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Voice Note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Recording status visual */}
      {isRecording && (
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center gap-1 h-3">
            <span className="w-1 bg-red-500 h-full animate-bounce rounded-full"></span>
            <span className="w-1 bg-red-500 h-2/3 animate-bounce [animation-delay:0.2s] rounded-full"></span>
            <span className="w-1 bg-red-500 h-full animate-bounce [animation-delay:0.4s] rounded-full"></span>
          </div>
          <p className="text-[11px] font-medium text-slate-500">Speaking into microphone...</p>
        </div>
      )}

      {/* Audio Ready confirmation */}
      {audioUrl && !isRecording && (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Voice message attached ({formatTime(recordingTime)}). Ready to post.</span>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="flex items-start gap-1.5 text-[11px] font-medium text-red-700 bg-red-50 p-2 rounded-lg border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
