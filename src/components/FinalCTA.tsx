import { motion } from 'motion/react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOrderClick: () => void;
  onVisitClick: () => void;
}

export function FinalCTA({ onOrderClick, onVisitClick }: FinalCTAProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center py-28 px-6 md:px-12 bg-[#090706] text-[#f4efe8] overflow-hidden border-t border-[#241a12]">
      {/* Cinematic Backdrop with Rich Coffee Extraction Focus */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1920&auto=format&fit=crop"
          alt="Croustille Final Cinematic Atmosphere"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-[0.32] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-[#0d0a08]/60 to-[#0d0a08]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d0a08]/40 to-[#0d0a08] pointer-events-none" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 text-[#c89255] text-xs font-sans tracking-[0.4em] uppercase mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AN INVITATION TO SLOW TIME</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#f4efe8] font-light leading-[0.98] tracking-tight"
        >
          YOUR NEXT CUP <br />
          <span className="font-editorial-display italic text-[#c89255]">STARTS HERE.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-[#e2d7c7]/80 font-sans max-w-xl leading-relaxed"
        >
          Whether at our candlelit marble counters in Mumbai (Kala Ghoda) or shipped fresh within 48 hours of drum-roasting to your doorstep across India, taste coffee as it was intended to be experienced.
        </motion.p>

        {/* Dual Primary Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          <button
            type="button"
            onClick={onOrderClick}
            data-cursor="ORDER"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#c89255] via-[#d9a05b] to-[#b37a3c] text-[#0d0a08] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_35px_rgba(200,146,85,0.5)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Order Coffee</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onVisitClick}
            data-cursor="VISIT"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#e2d7c7]/30 hover:border-[#c89255] bg-[#0d0a08]/70 backdrop-blur-md text-[#f4efe8] font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#1a120c] flex items-center justify-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5 text-[#c89255]" />
            <span>Visit Croustille</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
