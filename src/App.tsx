import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrewingProcessSection } from './components/BrewingProcessSection';
import { TheCraftSection } from './components/TheCraftSection';
import { SignatureSection } from './components/SignatureSection';
import { InteractiveMenu } from './components/InteractiveMenu';
import { HorizontalWorldSection } from './components/HorizontalWorldSection';
import { CoffeeBeanInteractive } from './components/CoffeeBeanInteractive';
import { BrandStorySection } from './components/BrandStorySection';
import { ImageGallerySection } from './components/ImageGallerySection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { MenuItem, CartItem } from './types';
import { MENU_ITEMS } from './data/coffeeData';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1, grind: 'Whole Bean' }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleUpdateGrind = (id: string, grind: CartItem['grind']) => {
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === id ? { ...ci, grind } : ci))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddSampleFlight = () => {
    const signature = MENU_ITEMS.find((i) => i.id === 'sig-1') || MENU_ITEMS[0];
    const croissant = MENU_ITEMS.find((i) => i.id === 'pas-1') || MENU_ITEMS[1];
    setCartItems([
      { item: signature, quantity: 1, grind: 'Whole Bean' },
      { item: croissant, quantity: 1 },
    ]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0a08] text-[#f4efe8] selection:bg-[#c89255] selection:text-[#0d0a08] relative">
      {/* Luxury Desktop Custom Cursor */}
      <CustomCursor />

      {/* Haute Navigation */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />

      {/* Main Cinematic Flow */}
      <main>
        {/* 01: The Cinematic Hero (First 5 seconds wow) */}
        <HeroSection
          onExploreBrew={() => scrollToSection('brewing')}
          onExploreMenu={() => scrollToSection('menu')}
        />

        {/* 02: Cinematic Coffee Pouring Interaction (8 Scroll Stages) */}
        <BrewingProcessSection />

        {/* 03: The Craft Section (01 Origin, 02 Roast, 03 Grind, 04 Brew, 05 Serve) */}
        <TheCraftSection />

        {/* 04: Signature Coffee Experience (Fashion perfume × Specialty coffee) */}
        <SignatureSection onAddToCart={handleAddToCart} />

        {/* 05: The Interactive Coffee Menu (Editorial Catalogue) */}
        <InteractiveMenu onAddToCart={handleAddToCart} />

        {/* 06: Horizontal Scroll Panorama (The World of Croustille) */}
        <HorizontalWorldSection />

        {/* 07: Coffee Bean Parallax & Cellular Morphology Interaction */}
        <CoffeeBeanInteractive />

        {/* 08: The Croustille Story (Progressive Manifesto) */}
        <BrandStorySection />

        {/* 09: Sensory Image Gallery (Photography Exhibition) */}
        <ImageGallerySection />

        {/* 10: Final Cinematic Call to Action */}
        <FinalCTA
          onOrderClick={() => setIsCartOpen(true)}
          onVisitClick={() => scrollToSection('visit')}
        />
      </main>

      {/* 11: Minimal Luxury Footer */}
      <Footer />

      {/* Concierge Tasting Flight Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateGrind={handleUpdateGrind}
        onClearCart={handleClearCart}
        onAddSampleFlight={handleAddSampleFlight}
      />
    </div>
  );
}
