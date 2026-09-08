import { motion } from 'motion/react';
import { Sparkles, Feather } from 'lucide-react';

export function BrandStorySection() {
  return (
    <section
      id="story"
      className="relative w-full bg-[#0d0a08] text-[#f4efe8] py-28 md:py-40 px-6 md:px-12 border-t border-[#241a12] overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#c89255]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill */}
        <div className="flex items-center gap-2 text-[#c89255] text-xs font-sans tracking-[0.35em] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>THE CROUSTILLE MANIFESTO</span>
        </div>

        {/* The Signature Story Opening */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-8xl text-[#f4efe8] font-light leading-[1.04]">
            Every cup begins <br />
            <span className="font-editorial-display italic text-[#c89255]">long before</span> the first sip.
          </h2>
        </motion.div>

        {/* Editorial Story Layout: Mixed Large Typography, Prose & Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atmospheric Roastery Photography */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-[#2e2117] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
                alt="Croustille Mumbai Roastery Atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0d0a08]/85 backdrop-blur-md border border-[#241a12] text-xs font-sans text-[#e2d7c7]">
                <span className="text-[#c89255] uppercase text-[9px] tracking-widest block font-semibold mb-1">
                  Kala Ghoda Atelier · Mumbai
                </span>
                <p className="italic font-editorial text-sm">
                  “We did not want another place where people hurry. We built a cathedral for stillness.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Journey */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6 text-base sm:text-lg text-[#e2d7c7]/85 font-sans font-light leading-relaxed">
              <p>
                In a world that glorifies acceleration, <strong className="text-[#f4efe8] font-normal">CROUSTILLE</strong> was born from an obstinate devotion to the unhurried. Born from deep reverence for India’s 350-year shade-grown coffee agroforestry and nurtured through our flagship roastery ateliers in Mumbai’s Kala Ghoda, Bengaluru, and New Delhi, we exist at the intersection of royal culinary heritage and specialty coffee science.
              </p>

              <p>
                We do not blend origins to cut costs. We do not roast dark to mask flaws. We source exclusively single-estate micro-lots from legacy growers in Bababudangiri, Coorg, and Araku Valley whose families have cultivated these sacred canopies for generations—paying up to four times fair-trade minimums to guarantee absolute stewardship of the soil.
              </p>

              <p>
                When you visit our salons or brew our beans in your personal sanctum, you participate in a tactile ritual. The resonance of hand-forged solid brass dabarah settling on aged teak. The blooming fragrance of crushed green cardamom, wild honey, and dark cocoa. The temperature of the first sip that opens like vintage wine.
              </p>
            </div>

            {/* Founder Quote Block */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#140e0a] border border-[#2e2117] relative">
              <Feather className="w-6 h-6 text-[#c89255] mb-3" />
              <p className="font-editorial text-xl sm:text-2xl text-[#f4efe8] italic leading-snug">
                “True luxury is having the courage to give an ordinary moment the dignity of perfection.”
              </p>
              <div className="mt-4 pt-4 border-t border-[#241a12] flex items-center justify-between text-xs font-sans">
                <span className="text-[#c89255] font-semibold tracking-wider uppercase">
                  Aaditya Vardhan & Devika Nair
                </span>
                <span className="text-[#e2d7c7]/40 tracking-widest uppercase">
                  Co-Founders & Estate Stewards
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
