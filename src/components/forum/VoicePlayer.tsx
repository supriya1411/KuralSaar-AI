import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, AlertCircle } from 'lucide-react';

interface VoicePlayerProps {
  audioUrl: string;
  authorName?: string;
  compact?: boolean;
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({ audioUrl, authorName, compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = (e: Event) => {
      console.error('[VoicePlayer] Audio load/playback error:', e);
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('[VoicePlayer] Play error:', err);
          setHasError(true);
          setIsPlaying(false);
        });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasError) {
    return (
      <div className="flex items-center gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-medium text-amber-800 my-2">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>Voice message could not be loaded or played.</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border border-blue-200/80 rounded-xl my-2.5 transition-all ${
        compact ? 'max-w-md' : 'max-w-xl'
      }`}
    >
      <button
        type="button"
        onClick={togglePlayPause}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#071B3A] hover:bg-[#0A2540] text-amber-400 shadow-2xs shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        title={isPlaying ? 'Pause' : 'Play Voice Note'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white fill-current" />
        ) : (
          <Play className="w-4 h-4 text-amber-400 fill-current ml-0.5" />
        )}
      </button>

      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
          <span className="flex items-center gap-1.5 truncate">
            <Volume2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            {authorName ? `${authorName}'s Voice Note` : 'Voice Note'}
          </span>
          <span className="font-mono text-slate-500 text-[10px] shrink-0">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden"
        />
      </div>
    </div>
  );
};
