import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

interface VoiceDictationButtonProps {
  onTranscript: (text: string) => void;
  currentValue?: string;
  className?: string;
  title?: string;
  appendMode?: boolean;
}

export const VoiceDictationButton: React.FC<VoiceDictationButtonProps> = ({
  onTranscript,
  currentValue = '',
  className = '',
  title = 'Search by voice (Google Voice Input)',
  appendMode = true,
}) => {
  const { language } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // cleanup
        }
      }
    };
  }, []);

  const toggleListening = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please try Google Chrome, Microsoft Edge, or Safari.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;

      // Match language from AppContext (Tamil, Hindi, or English fallback)
      if (language === 'ta') {
        recognition.lang = 'ta-IN';
      } else if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      const initialValue = currentValue;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }

        if (appendMode && initialValue.trim()) {
          onTranscript(`${initialValue.trim()} ${transcript}`);
        } else {
          onTranscript(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('[VoiceDictation] Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('[VoiceDictation] Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative group p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center shrink-0 z-20 select-none ${
        isListening
          ? 'bg-red-500 text-white shadow-md shadow-red-500/40 ring-4 ring-red-200 animate-pulse scale-105'
          : 'bg-slate-100/80 hover:bg-slate-200/90 text-slate-700 hover:text-slate-900 border border-slate-200/80 shadow-2xs hover:shadow-xs hover:scale-105'
      } ${className}`}
      title={
        isListening
          ? 'Listening... Speak now (Click to stop)'
          : speechSupported
          ? title
          : 'Speech recognition requires Chrome/Edge browser'
      }
      aria-label="Google Voice Input Dictation"
    >
      {isListening ? (
        <div className="flex items-center gap-1">
          {/* Animated sound waves */}
          <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      ) : (
        /* Iconic 4-Color Google Microphone SVG */
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          {/* Top Capsule - Google Blue */}
          <path
            d="M12 14C13.6569 14 15 12.6569 15 11V5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5V11C9 12.6569 10.3431 14 12 14Z"
            fill="#4285F4"
          />
          {/* Bottom Stand - Google Green */}
          <path
            d="M11 19.9318V22H13V19.9318C16.3923 19.446 19 16.53 19 13H17C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13H5C5 16.53 7.60771 19.446 11 19.9318Z"
            fill="#34A853"
          />
          {/* Right Arc - Google Red */}
          <path
            d="M17 11C17 12.0621 16.6698 13.047 16.1064 13.8569L17.5684 15.3189C18.4716 14.0792 19 12.6009 19 11H17Z"
            fill="#EA4335"
          />
          {/* Left Accent - Google Yellow */}
          <path
            d="M7 11C7 12.3807 7.56 13.6307 8.464 14.535L7.05 15.949C5.778 14.677 5 12.927 5 11H7Z"
            fill="#FBBC05"
          />
        </svg>
      )}

      {/* Tooltip on hover */}
      <span className="absolute bottom-full mb-2 hidden group-hover:block px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900 rounded-md whitespace-nowrap shadow-lg pointer-events-none z-30">
        {isListening ? '🎙️ Listening... Speak now' : '🎙️ Search by voice (Google Mic)'}
      </span>
    </button>
  );
};

