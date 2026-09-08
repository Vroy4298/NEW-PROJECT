import { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, Award } from 'lucide-react';

export function CoffeeBeanInteractive() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTerroir, setActiveTerroir] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    setMousePos({ x, y });
  };

  const terroirs = [
    {
      name: 'Bababudangiri Peaberry',
      origin: 'Chikmagalur, Karnataka · 1,450m',
      density: '1.28 g/cm³',
      moisture: '10.5%',
      geometry: 'Dense Peaberry Round',
      flavor: 'Green Cardamom, Wild Honey, 72% Dark Cacao',
    },
    {
      name: 'Monsoon Malabar AA',
      origin: 'Malabar Coast, Kerala · Sea Level',
      density: '1.18 g/cm³ (Swollen by Monsoons)',
      moisture: '11.8%',
      geometry: 'Golden Ocean-Cured Screen 19',
      flavor: 'Monsooned Cacao, Tellicherry Pepper, Toasted Malt',
    },
    {
      name: 'Araku Valley Red Bourbon',
      origin: 'Araku Valley, Andhra Pradesh · 1,280m',
      density: '1.25 g/cm³',
      moisture: '10.8%',
      geometry: 'Biodynamic Shade-Grown Typica',
      flavor: 'Wild Jasmine, Blood Orange, Raw Sugarcane',
    },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0d0a08] text-[#f4efe8] py-28 md:py-36 px-6 md:px-12 border-t border-[#241a12] overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      {/* Floating Interactive Parallax Bean Silhouettes with Subtle Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Bean 1 */}
        <motion.div
          animate={{
            x: mousePos.x * 1.5,
            y: mousePos.y * 1.5,
            rotate: mousePos.x * 0.4,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 200 }}
          className="absolute top-1/4 left-1/12 w-28 h-40 rounded-[50%_50%_45%_45%] bg-gradient-to-br from-[#2a1b12] to-[#140c08] border border-[#c89255]/20 shadow-2xl opacity-40 blur-[1px]"
        >
          {/* Center crease */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-24 bg-[#090604] rounded-full rotate-6" />
        </motion.div>

        {/* Bean 2 */}
        <motion.div
          animate={{
            x: mousePos.x * -1.8,
            y: mousePos.y * -1.8,
            rotate: -mousePos.y * 0.5,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 200 }}
          className="absolute bottom-1/5 right-1/12 w-36 h-52 rounded-[45%_55%_50%_50%] bg-gradient-to-br from-[#3b271a] to-[#120a06] border border-[#c89255]/25 shadow-2xl opacity-45 blur-[0.5px]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-[#090604] rounded-full -rotate-3" />
        </motion.div>

        {/* Small floating seed 3 */}
        <motion.div
          animate={{
            x: mousePos.x * 0.8,
            y: mousePos.y * 0.8,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 150 }}
          className="absolute top-2/3 left-1/3 w-16 h-24 rounded-full bg-[#24150c] border border-[#c89255]/15 opacity-30"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
            className="flex items-center justify-center gap-2 text-[#c89255] text-xs font-sans tracking-[0.35em] uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>TERROIR DENSITY & MORPHOLOGY</span>
          </motion.div>

          <motion.h2
            animate={{ x: mousePos.x * 0.4, y: mousePos.y * 0.4 }}
            className="font-editorial text-4xl sm:text-6xl text-[#f4efe8] font-light leading-tight"
          >
            The Anatomy of the <span className="font-editorial-display italic text-[#c89255]">Seed</span>
          </motion.h2>

          <p className="mt-4 text-xs sm:text-sm text-[#e2d7c7]/75 font-sans leading-relaxed">
            Move your cursor to examine cellular cellular density, micro-geometry, and sugar saturation across our three signature single-estate harvests.
          </p>
        </div>

        {/* Terroir Selectors */}
        <div className="flex justify-center gap-3 mb-12">
          {terroirs.map((t, idx) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setActiveTerroir(idx)}
              data-cursor="TOUCH"
              className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                activeTerroir === idx
                  ? 'bg-[#c89255] text-[#0d0a08] font-semibold shadow-[0_0_20px_rgba(200,146,85,0.3)]'
                  : 'border border-[#241a12] bg-[#140e0a] text-[#e2d7c7]/60 hover:text-[#f4efe8]'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Central Morphological Dossier */}
        <motion.div
          animate={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 sm:p-12 rounded-3xl bg-[#140e0a]/90 border border-[#2e2117] backdrop-blur-xl shadow-2xl"
        >
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c89255] font-sans flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>GEOGRAPHIC ORIGIN</span>
            </span>
            <h3 className="font-editorial text-3xl text-[#f4efe8]">
              {terroirs[activeTerroir].name}
            </h3>
            <p className="text-xs sm:text-sm text-[#e2d7c7]/80 font-sans">
              Terroir: {terroirs[activeTerroir].origin}
            </p>
            <p className="text-xs text-[#c89255] font-serif italic">
              Aroma profile: {terroirs[activeTerroir].flavor}
            </p>
          </div>

          <div className="space-y-4 border-t md:border-t-0 md:border-l border-[#241a12] pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c89255] font-sans flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CELLULAR DENSITY</span>
            </span>
            <div className="space-y-2">
              <div>
                <span className="text-[10px] text-[#e2d7c7]/50 block font-sans">Volumetric Mass</span>
                <span className="text-xl font-mono text-[#f4efe8]">{terroirs[activeTerroir].density}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#e2d7c7]/50 block font-sans">Internal Moisture</span>
                <span className="text-xl font-mono text-[#f4efe8]">{terroirs[activeTerroir].moisture}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t md:border-t-0 md:border-l border-[#241a12] pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c89255] font-sans flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>CLASSIFICATION</span>
            </span>
            <div>
              <span className="text-[10px] text-[#e2d7c7]/50 block font-sans">Seed Morphology</span>
              <span className="text-lg font-editorial text-[#f4efe8]">{terroirs[activeTerroir].geometry}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0d0a08] border border-[#241a12] text-[11px] text-[#e2d7c7]/70 font-sans">
              Triple optical sorting removes all defects, ensuring 100% uniformity in thermal convection.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
