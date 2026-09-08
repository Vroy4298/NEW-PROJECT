import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreBrew: () => void;
  onExploreMenu: () => void;
}

export function HeroSection({ onExploreBrew, onExploreMenu }: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden pt-28 pb-12 px-6 md:px-12 bg-[#0d0a08]">
      {/* Background Cinematic Video with Fallback & Rich Color Grading */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.12] saturate-[1.1]"
        >
          {/* High-quality cinematic public MP4 of espresso brewing / slow pour */}
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Vignette & Ambient Coffee Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-[#0d0a08]/50 to-[#0d0a08]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d0a08]/40 to-[#0d0a08] pointer-events-none" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />

        {/* Ambient Steam Wisps */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-64 pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-gradient-to-t from-[#e2d7c7]/20 via-[#c89255]/10 to-transparent blur-2xl animate-steam-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e2d7c7]/15 via-[#c89255]/5 to-transparent blur-3xl animate-steam-2" />
        </div>
      </div>

      {/* Top Editorial Sub-bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#e2d7c7]/70 pt-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c89255] animate-ping" />
          <span>KALA GHODA ATELIER · CHIKMAGALUR LOT NO. 44</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:flex items-center gap-3 text-[#c89255]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>WESTERN GHATS SHADE-GROWN · 93.4°C EXTRACTION</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={toggleVideo}
            data-cursor="CINEMA"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#2a1f18] hover:border-[#c89255]/60 bg-[#120d09]/70 backdrop-blur-sm transition-colors text-[10px] tracking-widest text-[#f4efe8]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-2.5 h-2.5 text-[#c89255]" />
                <span>PAUSE FILM</span>
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5 text-[#c89255]" />
                <span>PLAY FILM</span>
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Centerpiece Typographic Drama */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Poetic pre-title */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.6em', y: 15 }}
          animate={{ opacity: 1, letterSpacing: '0.35em', y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm uppercase text-[#c89255] font-sans font-medium mb-3 md:mb-6"
        >
          BHARAT SPECIALTY COFFEE · SINGLE ESTATE KAAPI
        </motion.div>

        {/* Oversized Brand Typography */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="font-editorial-display text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-[0.14em] text-[#f4efe8] font-light leading-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          CROUSTILLE
        </motion.h1>

        {/* The Poetic Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.35 }}
          className="mt-6 md:mt-8 max-w-2xl px-4"
        >
          <p className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#e2d7c7] italic font-light tracking-wide">
            “Crafted slow. Tasted deeply.”
          </p>
          <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-[#e2d7c7]/75 font-sans font-light leading-relaxed max-w-xl mx-auto">
            A sanctuary where time decelerates. Single-estate shade-grown Arabica from Bababudangiri and Coorg,
            calibrated convection roasting, and velvet extraction poured into hand-forged brass dabarahs.
          </p>
        </motion.div>

        {/* Primary Interactive CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <button
            type="button"
            onClick={onExploreBrew}
            data-cursor="BREW"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#c89255] via-[#d9a05b] to-[#a36f36] text-[#0d0a08] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,146,85,0.5)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Experience The Brew</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onExploreMenu}
            data-cursor="EXPLORE"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#e2d7c7]/30 hover:border-[#c89255] bg-[#0d0a08]/60 backdrop-blur-md text-[#f4efe8] font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#1f1610]/80 flex items-center justify-center gap-2"
          >
            <span>The Estate Menu Card</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator & Coordinates */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-end justify-between text-[11px] font-sans text-[#e2d7c7]/60 pt-6">
        <div className="hidden sm:block">
          <span className="text-[#c89255] font-serif italic text-sm mr-2">01 /</span>
          <span>MUMBAI KALA GHODA · BENGALURU · NEW DELHI</span>
        </div>

        {/* Center Scroll Indicator */}
        <button
          type="button"
          onClick={onExploreBrew}
          data-cursor="SCROLL"
          className="mx-auto sm:mx-0 flex flex-col items-center gap-2 group cursor-pointer"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#e2d7c7]/80 group-hover:text-[#c89255] transition-colors">
            Scroll to Discover
          </span>
          <div className="w-5 h-9 rounded-full border border-[#e2d7c7]/30 group-hover:border-[#c89255] flex items-start justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-[#c89255]"
            />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#c89255] -mt-1 group-hover:translate-y-0.5 transition-transform" />
        </button>

        <div className="hidden sm:block text-right">
          <span className="block text-[#f4efe8] font-medium">SLOW COFFEE ARCHIVE</span>
          <span className="text-[9.5px] text-[#c89255]">PRESSURE: 9.0 BAR · TEMP: 93.4°C</span>
        </div>
      </div>
    </section>
  );
}
