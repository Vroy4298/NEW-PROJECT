import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/coffeeData';
import { Sparkles, Plus, Check, Search, Info, X, Coffee, Feather, Flame } from 'lucide-react';

interface InteractiveMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

type MenuSection = 'all' | 'signature' | 'espresso' | 'americano' | 'cappuccino' | 'latte' | 'cold-brew' | 'pastries' | 'desserts';

const INDIAN_BOTANICAL_CHIPS = [
  { label: 'All Terroirs', query: '', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=200&auto=format&fit=crop' },
  { label: 'Malabar Cardamom', query: 'cardamom', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=200&auto=format&fit=crop' },
  { label: 'Kashmiri Saffron', query: 'saffron', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=200&auto=format&fit=crop' },
  { label: 'Western Ghats Honey', query: 'honey', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=200&auto=format&fit=crop' },
  { label: 'Dark Kerala Cacao', query: 'cacao', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=200&auto=format&fit=crop' },
  { label: 'Palm Jaggery', query: 'jaggery', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=200&auto=format&fit=crop' },
  { label: 'Roasted Pista & Badam', query: 'pista', image: 'https://images.unsplash.com/photo-1508061252227-0c3370d740c0?q=80&w=200&auto=format&fit=crop' },
  { label: 'Ratnagiri Mango', query: 'mango', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=200&auto=format&fit=crop' },
];

export function InteractiveMenu({ onAddToCart }: InteractiveMenuProps) {
  const [selectedSection, setSelectedSection] = useState<MenuSection>('all');
  const [selectedBotanical, setSelectedBotanical] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);

  const sections: { key: MenuSection; label: string; hindiTag: string }[] = [
    { key: 'all', label: 'Full Menu Card', hindiTag: 'सम्पूर्ण सूची' },
    { key: 'signature', label: 'Royal Kaapi & Signatures', hindiTag: 'राजसी कापी' },
    { key: 'espresso', label: 'Single Estate Espressos', hindiTag: 'एकल एस्टेट' },
    { key: 'americano', label: 'Biodynamic Pour-Overs', hindiTag: 'छना हुआ कावा' },
    { key: 'cappuccino', label: 'Spiced Cappuccinos', hindiTag: 'मसाला कापुचिनो' },
    { key: 'latte', label: 'Saffron & Rose Lattes', hindiTag: 'गुलाब-केसर लात्ते' },
    { key: 'cold-brew', label: 'Slow 16H Cold Drips', hindiTag: 'शीत कापी' },
    { key: 'pastries', label: 'Artisanal Bakes & Cruffins', hindiTag: 'हस्तशिल्प बेक्स' },
    { key: 'desserts', label: 'Mithai Patisserie', hindiTag: 'मिठाई पेस्ट्री' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSection = selectedSection === 'all' || item.category === selectedSection;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.heritageName && item.heritageName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBotanical =
      !selectedBotanical ||
      item.notes.some((n) => n.toLowerCase().includes(selectedBotanical.toLowerCase())) ||
      item.description.toLowerCase().includes(selectedBotanical.toLowerCase());

    return matchesSection && matchesSearch && matchesBotanical;
  });

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1600);
  };

  return (
    <section
      id="menu"
      className="relative w-full min-h-screen bg-[#0a0705] text-[#f4efe8] py-24 md:py-36 px-4 sm:px-8 md:px-12 border-t border-[#241a12] overflow-hidden"
    >
      {/* Warm ambient undertones */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#c89255]/5 to-transparent rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Physical Menu Card Outer Framing */}
        <div className="relative rounded-3xl bg-[#120d09] border-2 border-[#2a1d14] shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-14 overflow-hidden">
          {/* Subtle Indian brass filigree corner accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#c89255]/40 pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#c89255]/40 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#c89255]/40 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#c89255]/40 pointer-events-none" />

          {/* Menu Card Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 pb-8 border-b border-[#281b12]">
            <div className="inline-flex items-center justify-center gap-2 text-[#c89255] text-[10px] md:text-xs font-sans tracking-[0.35em] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ESTATE MENU CARD · भारतीय कॉफी सूची</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#f4efe8] font-light tracking-wide">
              Estate Kaapi & <span className="font-editorial-display italic text-[#c89255]">Patisserie</span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-[#e2d7c7]/70 font-sans leading-relaxed max-w-lg mx-auto">
              Shade-grown harvests from Bababudangiri, Coorg, Araku Valley, and the monsooned Malabar Coast. Each preparation is calibrated to honor India’s 350-year coffee tradition.
            </p>

            {/* Sleek Search & Counter Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search estate, roast, notes (e.g. Cardamom, Malabar)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-[#17100b] border border-[#2e1f15] text-xs text-[#f4efe8] placeholder-[#e2d7c7]/40 focus:outline-none focus:border-[#c89255]/80 transition-colors"
                />
                <Search className="w-3.5 h-3.5 text-[#e2d7c7]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <span className="text-[11px] font-sans tracking-widest uppercase text-[#c89255]/80">
                {filteredItems.length} Selections In Card
              </span>
            </div>
          </div>

          {/* Menu Card Section Tabs (Like tab dividers in a fine leather-bound estate ledger) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-[#24170f]">
            {sections.map((sec) => (
              <button
                key={sec.key}
                type="button"
                onClick={() => setSelectedSection(sec.key)}
                data-cursor="SELECT"
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-sans transition-all duration-300 flex items-center gap-2 ${
                  selectedSection === sec.key
                    ? 'bg-[#c89255] text-[#0d0a08] font-semibold shadow-md shadow-[#c89255]/15'
                    : 'bg-[#18110c] text-[#e2d7c7]/65 hover:text-[#f4efe8] hover:bg-[#201610] border border-[#2a1d14]'
                }`}
              >
                <span>{sec.label}</span>
                <span className={`text-[9px] tracking-wider opacity-75 ${selectedSection === sec.key ? 'text-[#0d0a08]' : 'text-[#c89255]'}`}>
                  {sec.hindiTag}
                </span>
              </button>
            ))}
          </div>

          {/* Botanical Terroir Flavor Filter Row */}
          <div className="mb-10 p-3 rounded-2xl bg-[#160f0a] border border-[#261910] flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c89255] font-sans font-medium whitespace-nowrap pl-1">
              Essence:
            </span>
            {INDIAN_BOTANICAL_CHIPS.map((botanical) => {
              const isSelected = selectedBotanical === botanical.query;
              return (
                <button
                  key={botanical.label}
                  type="button"
                  onClick={() => setSelectedBotanical(isSelected ? '' : botanical.query)}
                  data-cursor="FILTER"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#c89255] text-[#0d0a08] font-medium'
                      : 'bg-[#100b08] text-[#e2d7c7]/70 border border-[#2e1f15] hover:border-[#c89255]/50 hover:text-[#f4efe8]'
                  }`}
                >
                  <img
                    src={botanical.image}
                    alt={botanical.label}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{botanical.label}</span>
                </button>
              );
            })}
          </div>

          {/* The Sleek Menu Card Items List */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 text-[#e2d7c7]/50 font-sans text-sm">
                No coffee or patisserie found matching your query.
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isAdded = addedItemIds[item.id];

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    className="group relative p-5 sm:p-6 rounded-2xl bg-[#150e0a]/80 hover:bg-[#1b120c] border border-[#271a11] hover:border-[#c89255]/50 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Product Name & Heritage Tag */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Compact Circular Thumbnail */}
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#332216] group-hover:border-[#c89255]/60 transition-colors">
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover filter brightness-[0.9] group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-editorial text-lg sm:text-xl text-[#f4efe8] group-hover:text-[#c89255] transition-colors leading-snug">
                              {item.name}
                            </h3>
                            {item.heritageName && (
                              <span className="text-[11px] font-editorial italic text-[#c89255]/90">
                                ({item.heritageName})
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-[#e2d7c7]/75 font-sans leading-relaxed line-clamp-2 max-w-xl">
                            {item.description}
                          </p>

                          {/* Terroir & Origin Tag */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="text-[9.5px] uppercase tracking-wider text-[#c89255] font-sans bg-[#25170e] px-2 py-0.5 rounded-md border border-[#382315]">
                              {item.origin}
                            </span>
                            {item.altitude && (
                              <span className="text-[9.5px] uppercase tracking-wider text-[#e2d7c7]/50 font-sans">
                                {item.altitude}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Middle: Sensory Flavour Dots with Real Images */}
                      <div className="hidden lg:flex items-center gap-2 shrink-0 px-4">
                        {item.flavorDetails?.slice(0, 3).map((f) => (
                          <div
                            key={f.name}
                            title={`${f.name} (${f.aroma})`}
                            className="group/flavor relative flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#100a07] border border-[#281b12] text-[10px] text-[#e2d7c7]/80"
                          >
                            <img
                              src={f.image}
                              alt={f.name}
                              referrerPolicy="no-referrer"
                              className="w-3.5 h-3.5 rounded-full object-cover"
                            />
                            <span className="max-w-[85px] truncate">{f.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Right: Price & Quick Add Button */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#22170f]">
                        <div className="text-right">
                          <span className="font-editorial text-xl sm:text-2xl text-[#f4efe8] font-light">
                            {item.price}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-[#e2d7c7]/40 block font-sans">
                            Incl. taxes
                          </span>
                        </div>

                        {/* Details Inspection Trigger */}
                        <button
                          type="button"
                          onClick={() => setSelectedDetailItem(item)}
                          data-cursor="VIEW"
                          aria-label="View coffee specifications"
                          className="p-2 rounded-full border border-[#2a1d14] text-[#e2d7c7]/60 hover:text-[#f4efe8] hover:border-[#c89255]/50 transition-colors"
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        {/* Direct Add Button */}
                        <button
                          type="button"
                          onClick={() => handleAdd(item)}
                          data-cursor="ADD"
                          className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 font-medium ${
                            isAdded
                              ? 'bg-[#406838] text-[#f4efe8]'
                              : 'bg-[#c89255] text-[#0d0a08] hover:bg-[#d9a265] shadow-sm'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Menu Card Footer Note */}
          <div className="mt-12 pt-8 border-t border-[#281b12] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#e2d7c7]/60">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-[#c89255]" />
              <span>Served in traditional solid brass dabarah, kansa tumbler, or Khurja stoneware.</span>
            </div>
            <div className="text-right text-[11px] text-[#c89255]">
              Freshly ground & pulled per order · Zero micro-fines
            </div>
          </div>
        </div>
      </div>

      {/* Item Detail Modal (Sleek Sommelier Tasting Card) */}
      <AnimatePresence>
        {selectedDetailItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDetailItem(null)}
              className="absolute inset-0 bg-[#0d0a08]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl rounded-3xl bg-[#140e0a] border-2 border-[#38271a] p-6 sm:p-8 text-[#f4efe8] shadow-2xl z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedDetailItem(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#1e140e] text-[#e2d7c7]/70 hover:text-[#f4efe8] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[#c89255] text-xs font-sans tracking-[0.25em] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INDIAN ESTATE TASTING DOSSIER</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#f4efe8]">
                {selectedDetailItem.name}
              </h3>
              {selectedDetailItem.heritageName && (
                <p className="text-xs text-[#c89255] font-editorial italic -mt-0.5 mb-4">
                  {selectedDetailItem.heritageName}
                </p>
              )}

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden my-4 border border-[#2e1f15]">
                <img
                  src={selectedDetailItem.image}
                  alt={selectedDetailItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.88]"
                />
              </div>

              <p className="text-sm text-[#e2d7c7]/80 font-sans leading-relaxed mb-6">
                {selectedDetailItem.description}
              </p>

              {/* Detailed Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#0d0906] border border-[#261910] text-xs font-sans">
                <div>
                  <span className="text-[#e2d7c7]/40 block text-[10px] uppercase">Terroir Origin</span>
                  <span className="text-[#f4efe8] font-medium">{selectedDetailItem.origin}</span>
                </div>
                {selectedDetailItem.altitude && (
                  <div>
                    <span className="text-[#e2d7c7]/40 block text-[10px] uppercase">Elevation</span>
                    <span className="text-[#c89255] font-medium">{selectedDetailItem.altitude}</span>
                  </div>
                )}
                {selectedDetailItem.process && (
                  <div>
                    <span className="text-[#e2d7c7]/40 block text-[10px] uppercase">Processing</span>
                    <span className="text-[#f4efe8]">{selectedDetailItem.process}</span>
                  </div>
                )}
                {selectedDetailItem.pairing && (
                  <div>
                    <span className="text-[#e2d7c7]/40 block text-[10px] uppercase">Patisserie Pairing</span>
                    <span className="text-[#c89255]">{selectedDetailItem.pairing}</span>
                  </div>
                )}
              </div>

              {/* Flavour Highlights with Images */}
              <div className="mb-6">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#c89255] block mb-2 font-semibold">
                  Tasting Notes & Botanical Essence
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedDetailItem.flavorDetails?.map((f) => (
                    <div
                      key={f.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1e130c] border border-[#382315] text-xs"
                    >
                      <img
                        src={f.image}
                        alt={f.name}
                        referrerPolicy="no-referrer"
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#261910]">
                <div>
                  <span className="font-editorial text-3xl text-[#f4efe8]">
                    {selectedDetailItem.price}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleAdd(selectedDetailItem);
                    setSelectedDetailItem(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#c89255] text-[#0d0a08] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-[#d9a265] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Tasting Order</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
