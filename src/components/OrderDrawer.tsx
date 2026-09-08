import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, Coffee, Sparkles, MapPin, Building2 } from 'lucide-react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onUpdateGrind: (id: string, grind: CartItem['grind']) => void;
  onClearCart: () => void;
  onAddSampleFlight: () => void;
}

export function OrderDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onUpdateGrind,
  onClearCart,
  onAddSampleFlight,
}: OrderDrawerProps) {
  const [isOrdered, setIsOrdered] = useState(false);
  const [packaging, setPackaging] = useState<'roaster' | 'gift'>('roaster');
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedAtelier, setSelectedAtelier] = useState('Kala Ghoda Flagship Atelier, Mumbai');

  const subtotal = items.reduce(
    (acc, curr) => acc + curr.item.numericPrice * curr.quantity,
    0
  );
  const packagingFee = packaging === 'gift' ? 720 : 0;
  const total = subtotal + packagingFee;

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  const handleResetOrder = () => {
    setIsOrdered(false);
    onClearCart();
    onClose();
  };

  const grindOptions: NonNullable<CartItem['grind']>[] = [
    'Whole Bean',
    'South Indian Filter',
    'Espresso Fine',
    'Pour Over',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-md md:max-w-lg h-full bg-[#120d09] border-l border-[#241a12] text-[#f4efe8] flex flex-col justify-between overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-[#241a12] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c89255] font-sans block">
                  Indian Specialty Roastery Concierge
                </span>
                <h3 className="font-editorial text-2xl md:text-3xl text-[#f4efe8]">
                  Your Tasting Flight
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full border border-[#241a12] text-[#e2d7c7] hover:border-[#c89255] hover:text-[#c89255] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
              {isOrdered ? (
                /* Success Confirmation State */
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#c89255]/20 text-[#c89255] border border-[#c89255] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#c89255] font-sans">
                      Order Reserved · आदेश पुष्टि
                    </span>
                    <h4 className="font-editorial text-3xl text-[#f4efe8]">
                      Dhanyawad, {customerName || 'Coffee Connoisseur'}
                    </h4>
                    <p className="text-xs text-[#e2d7c7]/80 font-sans max-w-xs mx-auto leading-relaxed">
                      Your artisanal roast reservation has been recorded under order <strong className="text-[#c89255]">#CR-8924</strong>. Confirmation dispatched to {customerEmail || 'your email'}.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0d0a08] border border-[#241a12] text-left text-xs font-sans space-y-1.5">
                    <div className="flex justify-between text-[#e2d7c7]/60">
                      <span>Roast Batch:</span>
                      <span className="text-[#f4efe8]">Nordic Convection Lot 44</span>
                    </div>
                    <div className="flex justify-between text-[#e2d7c7]/60">
                      <span>Total:</span>
                      <span className="text-[#c89255] font-bold">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="pt-1.5 border-t border-[#241a12] text-[#e2d7c7]/80 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#c89255] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-[#c89255] uppercase tracking-wider block font-semibold">
                          {fulfillmentType === 'delivery' ? 'Dispatch to Indian Address:' : 'Atelier Tasting Pickup:'}
                        </span>
                        <p className="text-[11px] text-[#f4efe8]">
                          {fulfillmentType === 'delivery'
                            ? deliveryAddress || '14 Sassoon Building, V.B. Gandhi Marg, Kala Ghoda, Fort, Mumbai 400001'
                            : selectedAtelier}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetOrder}
                    className="w-full py-3.5 rounded-full bg-[#c89255] text-[#0d0a08] font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#d9a05b] transition-colors"
                  >
                    Return to Atelier
                  </button>
                </div>
              ) : items.length === 0 ? (
                /* Empty Cart State */
                <div className="py-16 text-center space-y-4">
                  <Coffee className="w-12 h-12 text-[#c89255]/40 mx-auto" />
                  <h4 className="font-editorial text-2xl text-[#f4efe8]">
                    Your flight is currently empty
                  </h4>
                  <p className="text-xs text-[#e2d7c7]/60 font-sans max-w-xs mx-auto leading-relaxed">
                    Select curations from the Grand Cru Signature or Tasting Catalogue to compose your bespoke tasting ritual.
                  </p>
                  <button
                    type="button"
                    onClick={onAddSampleFlight}
                    className="mt-4 px-6 py-3 rounded-full border border-[#c89255] text-[#c89255] hover:bg-[#c89255] hover:text-[#0d0a08] font-sans text-xs uppercase tracking-widest transition-all"
                  >
                    + Add Signature Flight Sample
                  </button>
                </div>
              ) : (
                /* Itemized List */
                <div className="space-y-4">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="p-4 rounded-2xl bg-[#18110c] border border-[#241a12] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-xl object-cover border border-[#241a12]"
                          />
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#c89255] font-sans">
                              {cartItem.item.category}
                            </span>
                            <h5 className="font-editorial text-lg text-[#f4efe8] leading-tight">
                              {cartItem.item.name}
                            </h5>
                            <span className="text-xs font-editorial-display text-[#c89255]">
                              {cartItem.item.price}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.item.id, -cartItem.quantity)}
                          className="text-[#e2d7c7]/40 hover:text-rose-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Grind Preference Selector for Coffee items */}
                      {cartItem.item.category !== 'pastries' && cartItem.item.category !== 'desserts' && (
                        <div className="pt-2 border-t border-[#241a12]/50 flex items-center justify-between text-xs">
                          <span className="text-[10px] text-[#e2d7c7]/50 uppercase tracking-wider font-sans">
                            Grind:
                          </span>
                          <select
                            value={cartItem.grind || 'Whole Bean'}
                            onChange={(e) =>
                              onUpdateGrind(cartItem.item.id, e.target.value as CartItem['grind'])
                            }
                            className="bg-[#100b07] border border-[#241a12] rounded-lg px-2 py-1 text-[11px] text-[#f4efe8] focus:outline-none focus:border-[#c89255]"
                          >
                            {grindOptions.map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Quantity Toggles */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-[#e2d7c7]/60 font-sans">Quantity</span>
                        <div className="flex items-center gap-3 bg-[#100b07] px-2.5 py-1 rounded-full border border-[#241a12]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                            className="text-[#e2d7c7]/60 hover:text-[#f4efe8]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold w-4 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                            className="text-[#e2d7c7]/60 hover:text-[#f4efe8]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Packaging Option */}
                  <div className="p-4 rounded-xl bg-[#18110c] border border-[#241a12] space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#c89255] font-sans block">
                      Presentation Packaging
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                      <button
                        type="button"
                        onClick={() => setPackaging('roaster')}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          packaging === 'roaster'
                            ? 'border-[#c89255] bg-[#22160e] text-[#f4efe8]'
                            : 'border-[#241a12] text-[#e2d7c7]/60'
                        }`}
                      >
                        <span className="block font-medium">Wax-Sealed Bag</span>
                        <span className="text-[10px] text-[#e2d7c7]/50">Included</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPackaging('gift')}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          packaging === 'gift'
                            ? 'border-[#c89255] bg-[#22160e] text-[#f4efe8]'
                            : 'border-[#241a12] text-[#e2d7c7]/60'
                        }`}
                      >
                        <span className="block font-medium">Handcrafted Brass Dabarah Gift Set</span>
                        <span className="text-[10px] text-[#c89255]">+₹720</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Checkout Form */}
            {!isOrdered && items.length > 0 && (
              <form onSubmit={handleCheckout} className="p-6 md:p-8 border-t border-[#241a12] bg-[#0d0a08] space-y-4">
                <div className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-[#241a12] text-xs text-[#f4efe8] placeholder-[#e2d7c7]/40 focus:outline-none focus:border-[#c89255]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Concierge Notification Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-[#241a12] text-xs text-[#f4efe8] placeholder-[#e2d7c7]/40 focus:outline-none focus:border-[#c89255]"
                  />

                  {/* Fulfillment Type Toggle */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-sans">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('delivery')}
                      className={`p-2 rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        fulfillmentType === 'delivery'
                          ? 'border-[#c89255] bg-[#22160e] text-[#f4efe8]'
                          : 'border-[#241a12] bg-[#140e0a] text-[#e2d7c7]/60'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-[#c89255]" />
                      <span>Pan-India Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('pickup')}
                      className={`p-2 rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        fulfillmentType === 'pickup'
                          ? 'border-[#c89255] bg-[#22160e] text-[#f4efe8]'
                          : 'border-[#241a12] bg-[#140e0a] text-[#e2d7c7]/60'
                      }`}
                    >
                      <Building2 className="w-3 h-3 text-[#c89255]" />
                      <span>Salon Tasting Pickup</span>
                    </button>
                  </div>

                  {fulfillmentType === 'delivery' ? (
                    <div className="space-y-1">
                      <input
                        type="text"
                        required
                        placeholder="Indian Delivery Address & PIN Code (e.g., Kala Ghoda, Mumbai 400001)"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-[#241a12] text-xs text-[#f4efe8] placeholder-[#e2d7c7]/40 focus:outline-none focus:border-[#c89255]"
                      />
                      <span className="text-[10px] text-[#e2d7c7]/50 font-sans block pl-1">
                        Dispatched in sealed nitrogen tins from our Mumbai roastery within 48 hours.
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <select
                        value={selectedAtelier}
                        onChange={(e) => setSelectedAtelier(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#140e0a] border border-[#241a12] text-xs text-[#f4efe8] focus:outline-none focus:border-[#c89255]"
                      >
                        <option value="Kala Ghoda Flagship Atelier, Mumbai">
                          Kala Ghoda Flagship Atelier — 14 Sassoon Bldg, Mumbai 400001
                        </option>
                        <option value="Indiranagar Roastery & Garden, Bengaluru">
                          Indiranagar Roastery — 772, 100 Feet Rd, Bengaluru 560038
                        </option>
                        <option value="Mehrauli Heritage Sanctuary, New Delhi">
                          Mehrauli Sanctuary — Ambawatta One, New Delhi 110030
                        </option>
                      </select>
                      <span className="text-[10px] text-[#e2d7c7]/50 font-sans block pl-1">
                        Complimentary fresh pour-over tasting included upon arrival.
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#241a12] text-xs font-sans">
                  <div className="flex justify-between text-[#e2d7c7]/70">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {packaging === 'gift' && (
                    <div className="flex justify-between text-[#c89255]">
                      <span>Limoges Gift Box</span>
                      <span>+₹720</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-editorial text-[#f4efe8] pt-1">
                    <span>Total Experience</span>
                    <span className="text-[#c89255] font-editorial-display font-bold">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  data-cursor="CONFIRM"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#c89255] via-[#d9a05b] to-[#b37a3c] text-[#0d0a08] font-sans font-bold text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_25px_rgba(200,146,85,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Tasting Flight · ₹{total.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
