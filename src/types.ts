export interface FlavorItem {
  name: string;
  image: string;
  aroma?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  heritageName?: string;
  category: 'espresso' | 'cappuccino' | 'latte' | 'americano' | 'cold-brew' | 'signature' | 'pastries' | 'desserts';
  price: string;
  numericPrice: number;
  origin: string;
  altitude?: string;
  process?: string;
  notes: string[];
  flavorDetails?: FlavorItem[];
  description: string;
  image: string;
  intensity?: number; // 1 to 5
  temperature?: 'Hot' | 'Iced' | 'Ambient';
  pairing?: string;
}

export interface BrewingStage {
  id: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  detailedSpecs: { label: string; value: string }[];
  image: string;
  accentNote: string;
}

export interface CraftStage {
  number: string;
  title: string;
  frenchTitle?: string;
  heritageTitle: string;
  subtitle: string;
  description: string;
  quote: string;
  location: string;
  image: string;
  stats: { label: string; value: string }[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: string;
  year: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  curatorNote: string;
  cameraInfo: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  grind?: 'Whole Bean' | 'Espresso Fine' | 'Pour Over' | 'South Indian Filter' | 'Cold Brew Coarse';
}
