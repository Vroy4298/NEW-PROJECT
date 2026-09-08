import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BREWING_STAGES } from '../data/coffeeData';
import { Gauge, Thermometer, Droplets, Clock, Play, Pause, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

export function BrewingProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoBrewing, setIsAutoBrewing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-brewing simulation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoBrewing) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % BREWING_STAGES.length);
      }, 3400);
    }
    return () => clearInterval(interval);
  }, [isAutoBrewing]);

  // Handle scroll-based progress when user scrolls through the container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the section is in view
      if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.4) {
        const totalScrollable = rect.height - windowHeight;
        const currentScroll = Math.max(0, -rect.top);
        const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
        const stepIndex = Math.min(
          BREWING_STAGES.length - 1,
          Math.floor(progress * BREWING_STAGES.length)
        );
        if (!isAutoBrewing) {
          setActiveStep(stepIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAutoBrewing]);

  const currentStage = BREWING_STAGES[activeStep];

  // Dynamic telemetry metrics computed per stage
  const getMetrics = (step: number) => {
    switch (step) {
      case 0:
        return { pressure: '0.0 Bar', temp: '20.5°C', flow: '0.0 g/s', yieldG: '0.0 g' };
      case 1:
        return { pressure: '0.0 Bar', temp: '21.0°C', flow: '0.0 g/s', yieldG: '0.0 g' };
      case 2:
        return { pressure: '0.0 Bar', temp: '22.0°C', flow: '0.0 g/s', yieldG: '20.0 g (Dose)' };
      case 3:
        return { pressure: '1.2 Bar', temp: '92.0°C', flow: '0.0 g/s', yieldG: '0.0 g' };
      case 4:
        return { pressure: '4.8 Bar', temp: '93.4°C', flow: '1.4 g/s', yieldG: '12.4 g' };
      case 5:
        return { pressure: '9.0 Bar', temp: '93.5°C', flow: '2.1 g/s', yieldG: '28.6 g' };
      case 6:
        return { pressure: '8.2 Bar', temp: '90.2°C', flow: '1.8 g/s', yieldG: '38.0 g' };
      case 7:
        return { pressure: '0.0 Bar', temp: '64.0°C (Serving)', flow: 'Done', yieldG: '42.0 g (Perfect)' };
      default:
        return { pressure: '9.0 Bar', temp: '93.4°C', flow: '2.0 g/s', yieldG: '42.0 g' };
    }
  };

  const metrics = getMetrics(activeStep);

  return (
    <section
      id="brewing"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0d0a08] text-[#f4efe8] py-24 md:py-32 px-6 md:px-12 border-t border-[#241a12] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#c89255]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#3d2719]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-8 border-b border-[#241a12]">
          <div>
            <div className="flex items-center gap-2 text-[#c89255] text-xs uppercase tracking-[0.3em] font-sans mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE EXTRACTION CHRONICLES</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#f4efe8] font-light tracking-wide">
              The Alchemy of <span className="font-editorial-display italic text-[#c89255]">Pouring</span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-[#e2d7c7]/65 max-w-md font-sans leading-relaxed">
              Experience the microscopic physics of slow brewing. Scroll or scrub the timeline to unfold the ritual from green harvest to the final porcelain cradle.
            </p>

            {/* Auto Play / Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoBrewing(!isAutoBrewing)}
              data-cursor={isAutoBrewing ? 'PAUSE' : 'BREW'}
              className="px-4 py-2 rounded-full border border-[#c89255]/60 hover:bg-[#c89255] hover:text-[#0d0a08] text-[#c89255] text-[11px] font-sans uppercase tracking-widest transition-all duration-300 flex items-center gap-2 self-start sm:self-auto"
            >
              {isAutoBrewing ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Pause Sim</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Auto Brew Sim</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 8-Stage Timeline Navigation Scrub Bar */}
        <div className="mb-12">
          {/* Progress track */}
          <div className="relative w-full h-1 bg-[#241a12] rounded-full mb-6">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#c89255] to-[#f4efe8] rounded-full"
              animate={{ width: `${((activeStep + 1) / BREWING_STAGES.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Stepper pills */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3">
            {BREWING_STAGES.map((stage, idx) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setIsAutoBrewing(false);
                  setActiveStep(idx);
                }}
                data-cursor="SELECT"
                className={`py-2 px-2.5 rounded-lg border text-left transition-all duration-300 ${
                  activeStep === idx
                    ? 'border-[#c89255] bg-[#22160e] text-[#f4efe8] shadow-[0_0_15px_rgba(200,146,85,0.25)]'
                    : 'border-[#241a12] bg-[#120d09]/60 text-[#e2d7c7]/50 hover:border-[#c89255]/40 hover:text-[#e2d7c7]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] tracking-wider mb-1 font-sans">
                  <span className={activeStep === idx ? 'text-[#c89255] font-bold' : ''}>
                    0{idx + 1}
                  </span>
                  {activeStep === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c89255] animate-ping" />
                  )}
                </div>
                <div className="text-[11px] truncate font-editorial leading-tight">
                  {stage.title.split(' ')[1] || stage.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage Presentation Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Cinema Viewport */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#2e2117] bg-[#140e0a] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <img
                    src={currentStage.image}
                    alt={currentStage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Visual Lighting Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08] via-transparent to-black/30 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a08]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Stage Badge on Image */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d0a08]/80 backdrop-blur-md border border-[#c89255]/40 text-[10px] tracking-[0.25em] uppercase text-[#f4efe8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c89255]" />
                    <span>PHASE {currentStage.stepNumber}</span>
                  </div>

                  {/* Sensory Accent Note Pill */}
                  <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md p-3.5 rounded-xl bg-[#0d0a08]/85 backdrop-blur-md border border-[#241a12] text-xs text-[#e2d7c7] font-sans">
                    <span className="text-[#c89255] uppercase text-[9px] tracking-widest block font-bold mb-0.5">
                      Micro-Observation
                    </span>
                    <p className="italic">{currentStage.accentNote}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows for Scrubbing */}
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoBrewing(false);
                    setActiveStep((prev) => (prev > 0 ? prev - 1 : BREWING_STAGES.length - 1));
                  }}
                  data-cursor="PREV"
                  className="p-2 rounded-full bg-[#0d0a08]/80 backdrop-blur-md border border-[#241a12] hover:border-[#c89255] text-[#f4efe8] transition-colors"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoBrewing(false);
                    setActiveStep((prev) => (prev < BREWING_STAGES.length - 1 ? prev + 1 : 0));
                  }}
                  data-cursor="NEXT"
                  className="p-2 rounded-full bg-[#0d0a08]/80 backdrop-blur-md border border-[#241a12] hover:border-[#c89255] text-[#f4efe8] transition-colors"
                  aria-label="Next step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Details & Telemetry Gauges */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[#c89255] font-sans text-xs tracking-[0.3em] uppercase block mb-1">
                    {currentStage.subtitle}
                  </span>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#f4efe8] font-light leading-tight">
                    {currentStage.title}
                  </h3>
                </div>

                <p className="text-sm md:text-base text-[#e2d7c7]/80 font-sans font-light leading-relaxed">
                  {currentStage.description}
                </p>

                {/* Stage Specific Technical Specs */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#241a12]">
                  {currentStage.detailedSpecs.map((spec) => (
                    <div key={spec.label} className="p-3 rounded-lg bg-[#140e0a] border border-[#241a12]">
                      <span className="text-[10px] uppercase tracking-wider text-[#c89255] block font-sans">
                        {spec.label}
                      </span>
                      <span className="text-xs md:text-sm font-editorial text-[#f4efe8] font-medium mt-0.5 block">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Live Hydro-Mechanical Telemetry Bar */}
            <div className="mt-8 p-5 rounded-xl bg-[#120d09] border border-[#2a1f18]">
              <div className="flex items-center justify-between text-[11px] font-sans tracking-widest uppercase text-[#c89255] mb-4 pb-2 border-b border-[#241a12]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Hydro-Extraction Telemetry
                </span>
                <span className="text-[#e2d7c7]/50">Atelier Vendôme</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#1f1610] text-[#c89255]">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#e2d7c7]/50 block">Pressure</span>
                    <span className="text-xs font-mono font-medium text-[#f4efe8]">{metrics.pressure}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#1f1610] text-[#c89255]">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#e2d7c7]/50 block">Temp</span>
                    <span className="text-xs font-mono font-medium text-[#f4efe8]">{metrics.temp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#1f1610] text-[#c89255]">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#e2d7c7]/50 block">Flow</span>
                    <span className="text-xs font-mono font-medium text-[#f4efe8]">{metrics.flow}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#1f1610] text-[#c89255]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#e2d7c7]/50 block">Yield</span>
                    <span className="text-xs font-mono font-medium text-[#f4efe8]">{metrics.yieldG}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
