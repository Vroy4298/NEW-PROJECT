import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CRAFT_STAGES } from '../data/coffeeData';
import { Sparkles, MapPin, Quote, ArrowRight } from 'lucide-react';

export function TheCraftSection() {
  const [selectedStage, setSelectedStage] = useState(0);

  return (
    <section
      id="craft"
      className="relative w-full min-h-screen bg-[#0d0a08] text-[#f4efe8] py-28 md:py-36 px-6 md:px-12 border-t border-[#241a12] overflow-hidden"
    >
      {/* Background glow and subtle grain */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-[#c89255]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-2 text-[#c89255] text-xs tracking-[0.35em] uppercase font-sans mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARTISANAL ROASTING & METHODOLOGY</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#f4efe8] font-light leading-[1.05]">
            The Craft of the <span className="font-editorial-display italic text-[#c89255]">Unrushed</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-[#e2d7c7]/70 font-sans font-light leading-relaxed max-w-xl">
            From Western Ghats canopy shade to the acoustic resonance of hand-forged brass dabarahs, every fraction of every second is orchestrated with intention.
          </p>
        </div>

        {/* Interactive Craft Stage Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-12">
          {CRAFT_STAGES.map((stage, idx) => (
            <button
              key={stage.number}
              type="button"
              onClick={() => setSelectedStage(idx)}
              data-cursor="EXPAND"
              className={`p-4 rounded-xl border text-left transition-all duration-500 relative overflow-hidden ${
                selectedStage === idx
                  ? 'border-[#c89255] bg-[#1a120c] text-[#f4efe8] shadow-lg shadow-[#c89255]/10'
                  : 'border-[#241a12] bg-[#120d09]/60 text-[#e2d7c7]/50 hover:border-[#c89255]/40 hover:text-[#f4efe8]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-sans tracking-widest text-[#c89255] mb-2">
                <span>{stage.number}</span>
                {selectedStage === idx && <ArrowRight className="w-3.5 h-3.5" />}
              </div>
              <h4 className="font-editorial text-lg sm:text-xl leading-snug">
                {stage.title}
              </h4>
              <span className="text-[10px] tracking-wider uppercase text-[#e2d7c7]/40 block mt-1 truncate">
                {stage.heritageTitle || stage.frenchTitle}
              </span>
            </button>
          ))}
        </div>

        {/* Active Stage Editorial Spread */}
        <AnimatePresence mode="wait">
          {(() => {
            const stage = CRAFT_STAGES[selectedStage];
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#120d09]/80 border border-[#241a12] p-6 sm:p-10 md:p-14 rounded-3xl backdrop-blur-md"
              >
                {/* Left: Oversized Image with Mask and Vignette */}
                <div className="lg:col-span-6 relative group overflow-hidden rounded-2xl border border-[#2e2117] aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.06] transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Stage Number Stencil on Image */}
                  <div className="absolute top-6 left-6 font-editorial-display text-5xl md:text-7xl font-light text-[#f4efe8]/40 select-none">
                    {stage.number}
                  </div>

                  {/* Location Pin Tag */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0a08]/80 backdrop-blur-md border border-[#c89255]/40 text-[10px] font-sans tracking-widest text-[#f4efe8] uppercase">
                    <MapPin className="w-3 h-3 text-[#c89255]" />
                    <span>{stage.location}</span>
                  </div>
                </div>

                {/* Right: Editorial Narrative */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[#c89255] text-xs font-sans tracking-[0.3em] uppercase block mb-2">
                      {stage.heritageTitle || stage.frenchTitle}
                    </span>
                    <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#f4efe8] font-light leading-tight">
                      {stage.title}
                    </h3>
                    <p className="font-serif italic text-base sm:text-lg text-[#c89255] mt-2">
                      “{stage.subtitle}”
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#e2d7c7]/80 font-sans font-light leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Quotation Callout */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#1a120c] border border-[#2a1f18] flex items-start gap-3">
                    <Quote className="w-5 h-5 text-[#c89255] shrink-0 mt-1" />
                    <p className="font-editorial text-sm sm:text-base italic text-[#f4efe8] leading-relaxed">
                      {stage.quote}
                    </p>
                  </div>

                  {/* Curated Stats Row */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#241a12]">
                    {stage.stats.map((stat) => (
                      <div key={stat.label} className="p-2.5 rounded-lg bg-[#140e0a]">
                        <span className="text-[9px] uppercase tracking-wider text-[#c89255] block font-sans">
                          {stat.label}
                        </span>
                        <span className="text-xs sm:text-sm font-editorial text-[#f4efe8] font-medium mt-0.5 block">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
