import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_PHOTOS } from '../data/coffeeData';
import { GalleryPhoto } from '../types';
import { Sparkles, Maximize2, X, Camera, Calendar } from 'lucide-react';

export function ImageGallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Extraction', 'Sensory', 'Terroir', 'Craft', 'Atelier', 'Pastry'];

  const filteredPhotos =
    activeCategory === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section
      id="gallery"
      className="relative w-full bg-[#090706] text-[#f4efe8] py-28 md:py-36 px-6 md:px-12 border-t border-[#241a12] overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Exhibition Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#241a12]">
          <div>
            <div className="flex items-center gap-2 text-[#c89255] text-xs font-sans tracking-[0.35em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE COFFEE PHOTOGRAPHY EXHIBITION</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[#f4efe8] font-light leading-none">
              Sensory <span className="font-editorial-display italic text-[#c89255]">Exposition</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 md:mt-0 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-cursor="FILTER"
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-widest transition-all ${
                  activeCategory === cat
                    ? 'bg-[#c89255] text-[#0d0a08] font-semibold'
                    : 'border border-[#241a12] text-[#e2d7c7]/60 hover:text-[#f4efe8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Exhibition Editorial Masonry/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedPhoto(photo)}
              data-cursor="EXPAND"
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#241a12] hover:border-[#c89255]/70 bg-[#140e0a] transition-all duration-500 flex flex-col"
            >
              {/* Photo Canvas */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/80 via-transparent to-transparent pointer-events-none" />

                {/* Inspect Overlay Trigger Icon */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-[#0d0a08]/70 backdrop-blur-md border border-[#241a12] text-[#f4efe8] group-hover:border-[#c89255] group-hover:text-[#c89255] transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-[#0d0a08]/80 text-[10px] uppercase tracking-wider text-[#c89255] font-sans">
                  {photo.category}
                </div>
              </div>

              {/* Photo Label & Exif */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-editorial text-2xl text-[#f4efe8] group-hover:text-[#c89255] transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-[#e2d7c7]/70 font-sans mt-1.5 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#241a12] flex items-center justify-between text-[10px] text-[#e2d7c7]/40 font-mono">
                  <span>{photo.cameraInfo.split('·')[0]}</span>
                  <span>{photo.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#140e0a] border border-[#2e2117] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#0d0a08]/80 border border-[#241a12] text-[#f4efe8] hover:text-[#c89255] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* High-res Image View */}
              <div className="md:w-3/5 relative aspect-square sm:aspect-auto sm:min-h-[480px]">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Curatorial Notes & Tech Details */}
              <div className="md:w-2/5 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c89255] font-sans mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Archival Series {selectedPhoto.year}</span>
                  </div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#f4efe8]">
                    {selectedPhoto.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#e2d7c7]/80 font-sans leading-relaxed">
                    {selectedPhoto.caption}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d0a08] border border-[#241a12] space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#c89255] block font-semibold font-sans">
                    Curator’s Technical Note
                  </span>
                  <p className="text-xs text-[#e2d7c7]/80 font-sans leading-relaxed italic">
                    {selectedPhoto.curatorNote}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#e2d7c7]/60 pt-2 border-t border-[#241a12]">
                  <Camera className="w-4 h-4 text-[#c89255]" />
                  <span>{selectedPhoto.cameraInfo}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
