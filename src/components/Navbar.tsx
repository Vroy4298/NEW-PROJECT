import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Compass, ArrowUpRight } from 'lucide-react';
import { AmbientAudio } from './AmbientAudio';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
}

export function Navbar({ onOpenCart, cartCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Brew', href: '#brewing' },
    { label: 'The Craft', href: '#craft' },
    { label: 'Signature', href: '#signature' },
    { label: 'Menu Card', href: '#menu' },
    { label: 'The Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Terroirs', href: '#visit' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isScrolled
            ? 'py-3.5 bg-[#0d0a08]/85 backdrop-blur-xl border-b border-[#241a12]/80 shadow-2xl shadow-black/60'
            : 'py-6 md:py-8 bg-gradient-to-b from-[#0d0a08]/90 via-[#0d0a08]/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo / Wordmark */}
          <a
            href="#"
            data-cursor="TOP"
            className="group flex flex-col items-start focus:outline-none"
            id="brand-logo-btn"
          >
            <span className="font-editorial-display text-2xl md:text-3xl tracking-[0.22em] text-[#f4efe8] group-hover:text-[#c89255] transition-colors duration-500 font-light">
              CROUSTILLE
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.35em] text-[#c89255]/80 font-sans -mt-1 group-hover:tracking-[0.42em] transition-all duration-500">
              Specialty Kaapi Atelier · Bharat
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11.5px] tracking-[0.2em] uppercase font-sans font-medium text-[#e2d7c7]/75">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                data-cursor="GO"
                className="relative py-1 hover:text-[#f4efe8] transition-colors duration-300 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c89255] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Audio Ambiance Toggle */}
            <AmbientAudio />

            {/* Cart / Tasting Flight Drawer Trigger */}
            <button
              id="nav-cart-trigger"
              type="button"
              onClick={onOpenCart}
              data-cursor="BAG"
              className="relative p-2.5 rounded-full border border-[#241a12] hover:border-[#c89255]/70 bg-[#140e0a]/80 text-[#e2d7c7] hover:text-[#f4efe8] transition-all duration-300"
              aria-label="Tasting Flight & Coffee Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c89255] text-[#0d0a08] font-sans font-bold text-[9px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Coffee Primary Button */}
            <button
              id="nav-order-button"
              type="button"
              onClick={onOpenCart}
              data-cursor="ORDER"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c89255] via-[#d9a05b] to-[#b37a3c] text-[#0d0a08] text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-500 hover:shadow-[0_0_24px_rgba(200,146,85,0.45)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Order Coffee</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-[#241a12] text-[#f4efe8] hover:border-[#c89255]/60 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Editorial Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#0d0a08] text-[#f4efe8] pt-28 px-8 pb-12 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c89255] block">
                Editorial Navigation
              </span>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href)}
                    className="flex items-center justify-between text-left py-2 border-b border-[#241a12] group"
                  >
                    <span className="font-editorial text-2xl md:text-3xl tracking-wide group-hover:text-[#c89255] transition-colors">
                      {link.label}
                    </span>
                    <span className="text-[10px] font-sans tracking-widest text-[#9e6b38]">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#241a12] flex flex-col space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3.5 rounded-full bg-[#c89255] text-[#0d0a08] font-sans font-semibold tracking-widest text-xs uppercase flex items-center justify-center gap-2"
              >
                <span>Order Coffee Collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#e2d7c7]/50 tracking-wider">
                <span>MUMBAI · BENGALURU · NEW DELHI</span>
                <span className="flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#c89255]" />
                  93.5°C EXTRACTION
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
