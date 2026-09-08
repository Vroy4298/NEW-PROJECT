import { useRef } from 'react';
import { motion } from 'motion/react';
import { HORIZONTAL_GALLERY } from '../data/coffeeData';
import { ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';

export function HorizontalWorldSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#090706] text-[#f4efe8] py-28 md:py-36 border-t border-[#241a12] overflow-hidden">
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#c89255] text-xs font-sans tracking-[0.35em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EDITORIAL PANORAMA</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#f4efe8] font-light leading-none">
            The Indian Coffee <span className="font-editorial-display italic text-[#c89255]">Odyssey</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#e2d7c7]/70 font-sans max-w-lg">
            A visual chronicle from high-elevation mist terraces of the Western Ghats to our architectural tasting salons in Mumbai, Bengaluru, and New Delhi.
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scroll('left')}
            data-cursor="PREV"
            className="p-3.5 rounded-full border border-[#241a12] bg-[#140e0a] hover:border-[#c89255] text-[#f4efe8] hover:text-[#c89255] transition-colors"
            aria-label="Previous gallery image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            data-cursor="NEXT"
            className="p-3.5 rounded-full border border-[#241a12] bg-[#140e0a] hover:border-[#c89255] text-[#f4efe8] hover:text-[#c89255] transition-colors"
            aria-label="Next gallery image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Large Horizontal Photographic Strip */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 sm:gap-8 overflow-x-auto px-6 md:px-12 pb-8 no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {HORIZONTAL_GALLERY.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="shrink-0 w-[300px] sm:w-[460px] md:w-[560px] group"
          >
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-[#2e2117] bg-[#140e0a] shadow-2xl mb-5">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Archive Number Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0d0a08]/80 backdrop-blur-md border border-[#c89255]/40 text-[10px] tracking-[0.25em] text-[#c89255] font-sans">
                {item.number}
              </div>

              {/* Camera metadata pill */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d0a08]/85 backdrop-blur-md border border-[#241a12] text-[9.5px] font-sans text-[#e2d7c7]/80">
                <Camera className="w-3 h-3 text-[#c89255]" />
                <span>{item.meta}</span>
              </div>
            </div>

            {/* Editorial Caption Below Image */}
            <div className="space-y-1.5 px-1">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#c89255] font-sans">
                {item.location}
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#f4efe8] group-hover:text-[#c89255] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#e2d7c7]/75 font-sans leading-relaxed">
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
