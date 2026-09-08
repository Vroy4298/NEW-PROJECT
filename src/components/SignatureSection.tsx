import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, Layers, Flame, Droplet, ArrowRight } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS, FLAVOR_IMAGE_MAP } from '../data/coffeeData';

interface SignatureSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

export function SignatureSection({ onAddToCart }: SignatureSectionProps) {
  const signatureDrinks = MENU_ITEMS.filter((item) => item.category === 'signature');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = signatureDrinks[selectedIdx];

  // Mouse tilt effect state
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Olfactory notes pyramid for high-end perfume feel
  const olfactoryPyramid = [
    { tier: 'HEAD (00–02 MIN)', note: 'Malabar green cardamom vapor & Kashmiri saffron blossom' },
    { tier: 'HEART (02–10 MIN)', note: 'Toasted Mamra almond, palm jaggery, & 72% Kerala dark cacao' },
    { tier: 'BASE (10–30 MIN)', note: 'Aged Indian oak wood, roasted hazelnut, & warm amber finish' },
  ];

  return (
    <section
      id="signature"
      className="relative w-full min-h-screen bg-[#090706] text-[#f4efe8] py-28 md:py-36 px-6 md:px-12 border-t border-[#241a12] overflow-hidden"
    >
      {/* Background ambient luxury lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#3b2112]/30 via-[#c89255]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Campaign Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#241a12]">
          <div>
            <div className="flex items-center gap-2 text-[#c89255] text-xs font-sans tracking-[0.35em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE GRAND CRU ARCHIVE</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#f4efe8] font-light leading-none">
              The Croustille <span className="font-editorial-display italic text-[#c89255]">Signature</span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            {signatureDrinks.map((drink, idx) => (
              <button
                key={drink.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                data-cursor="SWITCH"
                className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all duration-300 ${
                  selectedIdx === idx
                    ? 'bg-[#c89255] text-[#0d0a08] font-semibold shadow-[0_0_20px_rgba(200,146,85,0.3)]'
                    : 'border border-[#241a12] bg-[#140e0a] text-[#e2d7c7]/60 hover:border-[#c89255]/50 hover:text-[#f4efe8]'
                }`}
              >
                {drink.name.split(' ')[1] || drink.name}
              </button>
            ))}
          </div>
        </div>

        {/* The Luxury Fashion × Coffee Hero Showcase Canvas */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left: Interactive 3D Responsive Centerpiece */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] md:min-h-[580px]">
            {/* Background Arch & Halo */}
            <div className="absolute w-72 sm:w-96 md:w-[480px] h-72 sm:h-96 md:h-[480px] rounded-full border border-[#c89255]/20 animate-spin-slow pointer-events-none" />
            <div className="absolute w-56 sm:w-80 h-56 sm:h-80 rounded-full border border-[#e2d7c7]/10 pointer-events-none" />

            {/* Oversized Cinematic Product Vessel Image with 3D Tilt */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateX: mouseOffset.y,
                  rotateY: mouseOffset.x,
                }}
                exit={{ opacity: 0, scale: 0.92, rotate: 2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-[#2e2117] group cursor-pointer"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.12] transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-transparent to-black/20 pointer-events-none" />

                {/* Fragrance Label Stamp */}
                <div className="absolute top-6 left-6 p-3 rounded-2xl bg-[#0d0a08]/85 backdrop-blur-md border border-[#c89255]/30">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#c89255] block font-sans">
                    Haute Extraction
                  </span>
                  <span className="font-editorial-display text-lg text-[#f4efe8]">
                    {current.price}
                  </span>
                </div>

                {/* Floating Micro Annotations */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute bottom-6 right-6 p-3.5 rounded-2xl bg-[#0d0a08]/90 backdrop-blur-md border border-[#241a12] text-xs font-sans max-w-[230px]"
                >
                  <div className="flex items-center gap-1.5 text-[#c89255] font-semibold text-[10px] uppercase tracking-wider mb-2">
                    <Droplet className="w-3 h-3" />
                    <span>Slow Maceration</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {current.notes.map((note) => {
                      const f = FLAVOR_IMAGE_MAP[note];
                      return (
                        <div key={note} className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#18110c] border border-[#2e2117] text-[9px] text-[#e2d7c7]">
                          <img
                            src={f?.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=100&auto=format&fit=crop'}
                            alt={note}
                            referrerPolicy="no-referrer"
                            className="w-3 h-3 rounded-full object-cover"
                          />
                          <span>{note}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Editorial Narrative & Fragrance Breakdown */}
          <div className="lg:col-span-5 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.35em] text-[#c89255] font-sans block mb-1">
                    {current.heritageName || current.frenchName}
                  </span>
                  <h3 className="font-editorial text-4xl sm:text-5xl text-[#f4efe8] font-light leading-tight">
                    {current.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-3 text-xs text-[#e2d7c7]/60 font-sans">
                    <span>{current.origin}</span>
                    <span>·</span>
                    <span className="text-[#c89255]">{current.process}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#e2d7c7]/85 font-sans font-light leading-relaxed">
                  {current.description}
                </p>

                {/* Fragrance / Flavor Notes Pyramid */}
                <div className="p-6 rounded-2xl bg-[#120d09] border border-[#241a12] space-y-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-[#c89255] font-sans pb-2 border-b border-[#241a12]">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Sensory Evolution Arc</span>
                    </div>
                    <span className="text-[10px] text-[#e2d7c7]/50 lowercase">botanical palette</span>
                  </div>

                  {olfactoryPyramid.map((tier) => (
                    <div key={tier.tier} className="text-xs font-sans">
                      <span className="text-[10px] uppercase tracking-wider text-[#e2d7c7]/50 block font-semibold">
                        {tier.tier}
                      </span>
                      <p className="text-xs sm:text-sm text-[#f4efe8] font-editorial italic mt-0.5">
                        {tier.note}
                      </p>
                    </div>
                  ))}

                  {/* Micro Flavour Visuals */}
                  <div className="pt-2 border-t border-[#241a12] flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#c89255] font-sans font-medium">Notes:</span>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                      {current.notes.map((n) => {
                        const fl = FLAVOR_IMAGE_MAP[n];
                        return (
                          <div key={n} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1c140e] border border-[#2e2117] text-[10px] text-[#e2d7c7]">
                            <img
                              src={fl?.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=100&auto=format&fit=crop'}
                              alt={n}
                              referrerPolicy="no-referrer"
                              className="w-3 h-3 rounded-full object-cover"
                            />
                            <span>{n}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Pairing Recommendation */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1a120c] border border-[#2a1f18] text-xs font-sans">
                  <Flame className="w-4 h-4 text-[#c89255] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#c89255] block">
                      Recommended Patisserie Pairing
                    </span>
                    <span className="text-[#f4efe8] font-medium">{current.pairing}</span>
                  </div>
                </div>

                {/* Actions: Add to Tasting Bag */}
                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onAddToCart(current)}
                    data-cursor="ORDER"
                    className="flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-[#c89255] via-[#d9a05b] to-[#b37a3c] text-[#0d0a08] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,146,85,0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Reserve Tasting · {current.price}</span>
                  </button>

                  <a
                    href="#menu"
                    className="p-4 rounded-full border border-[#241a12] hover:border-[#c89255] text-[#f4efe8] hover:text-[#c89255] transition-colors"
                    aria-label="View all items"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
