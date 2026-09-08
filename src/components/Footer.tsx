import { useState } from 'react';
import { ArrowUp, Instagram, Mail, Phone, Compass, Mountain, Trees, Calendar, Sparkles } from 'lucide-react';

export function Footer() {
  const [selectedTerroirIdx, setSelectedTerroirIdx] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indianTerroirs = [
    {
      id: 'bababudan',
      region: 'Bababudangiri, Chikmagalur',
      state: 'Karnataka',
      title: 'The Sacred Cradle of Indian Coffee (1670 AD)',
      elevation: '1,450m MASL',
      canopy: 'Silver Oak, Native Rosewood & Wild Fig',
      harvest: 'December – February',
      process: 'Natural & Washed Arabica S795',
      notes: 'Wild Mountain Honey, Roasted Hazelnut, 72% Dark Cacao',
      legend: 'In 1670 AD, the revered sage Baba Budan smuggled seven fertile raw coffee seeds strapped to his chest across the Arabian Sea from the port of Mocha. He planted them in the sacred Chandra Drona hills, birthing India’s majestic 350-year shade-grown coffee agroforestry.',
      image: 'https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'malabar',
      region: 'Monsooned Malabar Coast',
      state: 'Kerala',
      title: 'The Ocean-Wind Cured Golden Reserve',
      elevation: 'Sea Level Saline Air',
      canopy: 'Coastal Open Wooden Sheds & Sea Mist',
      harvest: 'June – September (Monsoon Season)',
      process: '12-Week Arabian Sea Wind Exposure',
      notes: 'Mellow Pipe Tobacco, Dark Earthy Cacao, Toasted Malt',
      legend: 'Discovered during the historical era of wooden sailing clippers, coffee beans transported across monsoon seas turned golden-yellow and swelled with mellow, low-acid sweetness. Today, our Malabar AA beans are cured in open-sided coastal sheds washed by salty monsoon winds.',
      image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'araku',
      region: 'Araku Valley, Eastern Ghats',
      state: 'Andhra Pradesh',
      title: 'Tribal Biodynamic Micro-Lots',
      elevation: '1,250m MASL',
      canopy: 'Jackfruit, Mango, Pepper & Silver Oak',
      harvest: 'November – January',
      process: 'Anaerobic Slow Yeast Ferment & Red Honey',
      notes: 'Wild Jasmine, Blood Orange, Raw Sugarcane Clarity',
      legend: 'Tended by indigenous Adivasi farmer collectives on red laterite mountain terraces without chemical fertilizers. The unique diurnal temperature variance creates extraordinary sweetness, dense cherry crystallization, and world-renowned floral cup profiles.',
      image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'coorg',
      region: 'Kodagu (Coorg), Western Ghats',
      state: 'Karnataka',
      title: 'Mysore Nugget Extra Bold (MNEB)',
      elevation: '1,380m MASL',
      canopy: 'Tellicherry Pepper Vines & Wild Fig',
      harvest: 'December – February',
      process: 'Washed Screen 19 Extra Bold',
      notes: 'Black Pepper Warmth, Nutmeg, Candied Fig, Dark Toffee',
      legend: 'Grown within the emerald heart of Kodagu alongside wild black pepper vines that coil around shade trees. The Mysore Nugget Extra Bold represents the top 2% of the harvest—flawlessly uniform, dense blue-green beans with rich buttery body.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'brhills',
      region: 'Biligirirangana (BR) Hills & Nilgiris',
      state: 'Tamil Nadu & Karnataka Border',
      title: 'Cloud Forest Wildlife Corridor',
      elevation: '1,650m MASL',
      canopy: 'Ancient Shola Forest Evergreen Canopy',
      harvest: 'January – March',
      process: 'Natural Sun-Dried Honey',
      notes: 'Damask Rose, Lemongrass, Stone Fruit, Honeycomb',
      legend: 'Perched in the high-altitude biosphere reserve where the Western and Eastern Ghats merge. Wild elephants and honeybees roam freely through coffee groves shaded by ancient Shola trees, producing intensely aromatic, slow-ripened Arabica cherries.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const activeTerroir = indianTerroirs[selectedTerroirIdx];

  return (
    <footer id="visit" className="relative bg-[#080605] text-[#f4efe8] pt-24 pb-12 px-4 sm:px-8 md:px-12 border-t border-[#241a12] overflow-hidden">
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* The Great Indian Coffee Terroirs Showcase (Replaces Sanctuaries of Stillness) */}
        <div className="mb-20 pb-16 border-b border-[#241a12]">
          <div className="flex items-center gap-2 text-[#c89255] text-xs font-sans tracking-[0.35em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE SACRED CANOPY OF BHARAT · 1670 AD TO PRESENT</span>
          </div>
          
          <h3 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#f4efe8] font-light mb-4">
            The Great Indian <span className="font-editorial-display italic text-[#c89255]">Terroirs</span>
          </h3>

          <p className="text-xs sm:text-sm text-[#e2d7c7]/75 font-sans leading-relaxed max-w-2xl mb-10">
            India is the only country where 100% of coffee is cultivated under the two-tier native forest canopy. Explore the legendary estates from where Croustille sources each single-origin crop.
          </p>

          {/* Interactive Terroir Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
            {indianTerroirs.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTerroirIdx(idx)}
                data-cursor="TERROIR"
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 ${
                  selectedTerroirIdx === idx
                    ? 'border-[#c89255] bg-[#1a120c] shadow-lg shadow-[#c89255]/10 text-[#f4efe8]'
                    : 'border-[#22170f] bg-[#110c08] text-[#e2d7c7]/55 hover:border-[#c89255]/40 hover:text-[#f4efe8]'
                }`}
              >
                <span className="text-[10px] tracking-widest uppercase text-[#c89255] block font-sans mb-1">
                  0{idx + 1} · {t.state}
                </span>
                <span className="font-editorial text-sm sm:text-base leading-snug block truncate">
                  {t.region.split(',')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Active Terroir Detail Dossier */}
          <div className="rounded-3xl bg-[#120d09] border border-[#2a1d14] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Terroir Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#332216]">
              <img
                src={activeTerroir.image}
                alt={activeTerroir.region}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-sans text-[#e2d7c7]">
                <span className="text-[9px] uppercase tracking-widest text-[#c89255] font-semibold block mb-0.5">
                  Single Estate Origin
                </span>
                <span className="font-editorial text-lg text-[#f4efe8]">{activeTerroir.region}</span>
              </div>
            </div>

            {/* Terroir Narrative & Specs */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c89255] font-sans font-semibold">
                  {activeTerroir.title}
                </span>
                <h4 className="font-editorial text-2xl sm:text-3xl text-[#f4efe8] mt-1">
                  {activeTerroir.region}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-[#e2d7c7]/85 font-sans leading-relaxed">
                {activeTerroir.legend}
              </p>

              {/* 4 Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#17100b] border border-[#281b12]">
                  <div className="flex items-center gap-1 text-[#c89255] text-[10px] uppercase tracking-wider mb-1">
                    <Mountain className="w-3 h-3" />
                    <span>Elevation</span>
                  </div>
                  <span className="text-xs text-[#f4efe8] font-medium">{activeTerroir.elevation}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#17100b] border border-[#281b12]">
                  <div className="flex items-center gap-1 text-[#c89255] text-[10px] uppercase tracking-wider mb-1">
                    <Trees className="w-3 h-3" />
                    <span>Canopy</span>
                  </div>
                  <span className="text-xs text-[#f4efe8] font-medium truncate block" title={activeTerroir.canopy}>
                    {activeTerroir.canopy.split(',')[0]}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#17100b] border border-[#281b12]">
                  <div className="flex items-center gap-1 text-[#c89255] text-[10px] uppercase tracking-wider mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>Harvest</span>
                  </div>
                  <span className="text-xs text-[#f4efe8] font-medium">{activeTerroir.harvest}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#17100b] border border-[#281b12]">
                  <div className="flex items-center gap-1 text-[#c89255] text-[10px] uppercase tracking-wider mb-1">
                    <Compass className="w-3 h-3" />
                    <span>Method</span>
                  </div>
                  <span className="text-xs text-[#f4efe8] font-medium truncate block" title={activeTerroir.process}>
                    {activeTerroir.process.split('&')[0]}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1a110a] border border-[#301e13] flex items-center justify-between text-xs font-sans">
                <span className="text-[#c89255] uppercase text-[10px] tracking-widest font-semibold">
                  Tasting Profile:
                </span>
                <span className="text-[#f4efe8] font-editorial italic text-sm">
                  {activeTerroir.notes}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-editorial-display text-4xl sm:text-5xl tracking-[0.18em] text-[#f4efe8] font-light">
              CROUSTILLE
            </h2>
            <p className="text-xs sm:text-sm text-[#e2d7c7]/70 font-sans max-w-sm leading-relaxed">
              Indian specialty slow coffee culture, single estate shade-grown terroirs, and handcrafted brass dabarah service.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="INSTA"
                className="p-2.5 rounded-full border border-[#241a12] hover:border-[#c89255] text-[#e2d7c7] hover:text-[#c89255] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:concierge@croustille.in"
                data-cursor="EMAIL"
                className="p-2.5 rounded-full border border-[#241a12] hover:border-[#c89255] text-[#e2d7c7] hover:text-[#c89255] transition-colors"
                aria-label="Contact Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+912269425500"
                data-cursor="CALL"
                className="p-2.5 rounded-full border border-[#241a12] hover:border-[#c89255] text-[#e2d7c7] hover:text-[#c89255] transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c89255] font-sans font-semibold block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#e2d7c7]/75">
              <li><a href="#brewing" className="hover:text-[#c89255] transition-colors">The Brewing Chronicles</a></li>
              <li><a href="#craft" className="hover:text-[#c89255] transition-colors">The Ghats Craft</a></li>
              <li><a href="#signature" className="hover:text-[#c89255] transition-colors">Grand Cru Kaapi</a></li>
              <li><a href="#menu" className="hover:text-[#c89255] transition-colors">Estate Menu Card</a></li>
              <li><a href="#story" className="hover:text-[#c89255] transition-colors">The Heritage Story</a></li>
              <li><a href="#gallery" className="hover:text-[#c89255] transition-colors">Photographic Exhibition</a></li>
            </ul>
          </div>

          {/* Legal & Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c89255] font-sans font-semibold block">
              The Indian Roaster’s Gazette
            </span>
            <p className="text-xs text-[#e2d7c7]/70 font-sans">
              Receive private invitations to seasonal single-estate micro-lot drops and brass tasting flight previews.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Namaste. You are now inscribed in the private Croustille Indian harvest circle.');
              }}
              className="flex items-center gap-2 pt-1"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-full bg-[#120d09] border border-[#241a12] text-xs text-[#f4efe8] placeholder-[#e2d7c7]/40 focus:outline-none focus:border-[#c89255]"
              />
              <button
                type="submit"
                data-cursor="JOIN"
                className="px-5 py-2.5 rounded-full bg-[#c89255] hover:bg-[#d9a05b] text-[#0d0a08] font-sans font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-colors"
              >
                Inscribe
              </button>
            </form>
          </div>
        </div>

        {/* Final Line & Scroll to Top */}
        <div className="pt-8 border-t border-[#241a12] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#e2d7c7]/50">
          <div className="flex items-center gap-6">
            <span>© MMXXV CROUSTILLE INDIA PVT. LTD.</span>
            <a href="#" className="hover:text-[#c89255] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#c89255] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#c89255] transition-colors">Direct Estate Charter</a>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#c89255] font-serif italic text-sm tracking-wider">
              CRAFTED WITH INTENTION · भारत
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              data-cursor="TOP"
              className="flex items-center gap-1 text-[11px] uppercase tracking-widest hover:text-[#f4efe8] transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#c89255]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
