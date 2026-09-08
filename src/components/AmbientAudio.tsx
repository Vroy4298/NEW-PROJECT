import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const toggleSound = () => {
    if (!isPlaying) {
      startSound();
    } else {
      stopSound();
    }
  };

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create gentle warm low drone (subtle organ tone of quiet sanctuary)
      const osc = ctx.createOscillator();
      const oscFilter = ctx.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, ctx.currentTime); // A2 note, warm hum

      oscFilter.type = 'lowpass';
      oscFilter.frequency.setValueAtTime(220, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.02, ctx.currentTime);

      osc.connect(oscFilter);
      oscFilter.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscRef.current = osc;

      // Create soft vinyl pink noise (rain/steam sensation)
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise approximation
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 1.2;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(450, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.8, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.015, ctx.currentTime);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noise.start();
      noiseNodeRef.current = noise;

      setIsPlaying(true);
    } catch (err) {
      console.warn('Web Audio error:', err);
    }
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);

      setTimeout(() => {
        try {
          oscRef.current?.stop();
          noiseNodeRef.current?.stop();
          ctx.close();
        } catch {
          // ignore cleanup errors
        }
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1000);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      id="ambient-audio-toggle"
      type="button"
      onClick={toggleSound}
      data-cursor={isPlaying ? 'MUTE' : 'SOUND'}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2a1f18] hover:border-[#c89255]/60 bg-[#120d09]/80 backdrop-blur-md transition-all duration-300 text-[11px] tracking-widest text-[#e2d7c7] uppercase"
      title={isPlaying ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
    >
      <span className="flex items-center gap-0.5 h-3">
        {isPlaying ? (
          <>
            <span className="w-0.5 h-2 bg-[#c89255] animate-pulse" />
            <span className="w-0.5 h-3 bg-[#c89255] animate-pulse delay-75" />
            <span className="w-0.5 h-1.5 bg-[#c89255] animate-pulse delay-150" />
            <span className="w-0.5 h-2.5 bg-[#c89255] animate-pulse delay-100" />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#e2d7c7]/50 group-hover:text-[#c89255] transition-colors" />
        )}
      </span>
      <span className="hidden sm:inline font-sans text-[10px]">
        {isPlaying ? 'ATMOSPHERE ON' : 'ATMOSPHERE'}
      </span>
    </button>
  );
}
