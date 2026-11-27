import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CRAFT_PILLARS } from '../data/anandData';
import ParticleSculpture from './ParticleSculpture';
import craftInfraImg from '../assets/craft-infra.jpg';
import craftFullstackImg from '../assets/craft-fullstack.jpg';
import craftAiImg from '../assets/craft-ai.jpg';

const PORTRAIT_MAP = {
  fullstack: craftFullstackImg,
  'ai-cloud': craftAiImg,
  infrastructure: craftInfraImg,
};

export default function CraftSection() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState([0.15, 0, 0]);

  // 00:06–00:09 — Scroll-pinned 3-stage showcase (scrubs seamlessly 01 -> 02 -> 03 as you scroll!)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (window.innerWidth < 1024) return;
    const clamped = Math.max(0, Math.min(0.999, latest));
    const idx = Math.min(2, Math.floor(clamped * 3));
    if (idx !== activeIdx) setActiveIdx(idx);

    const p0 = Math.max(0, Math.min(1, clamped * 3));
    const p1 = Math.max(0, Math.min(1, clamped * 3 - 1));
    const p2 = Math.max(0, Math.min(1, clamped * 3 - 2));
    setSegmentProgress([p0, p1, p2]);
  });

  const scrollToPillar = (targetIdx) => {
    setActiveIdx(targetIdx);
    setSegmentProgress([
      targetIdx >= 0 ? 1 : 0,
      targetIdx >= 1 ? 1 : 0,
      targetIdx >= 2 ? 1 : 0,
    ]);
    if (window.innerWidth < 1024) return;
    const container = containerRef.current;
    if (!container) return;
    const top = container.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(1, container.offsetHeight - window.innerHeight);
    const targetFrac = targetIdx === 0 ? 0.04 : targetIdx === 1 ? 0.5 : 0.94;
    window.scrollTo({
      top: top + scrollable * targetFrac,
      behavior: 'smooth',
    });
  };

  const pillar = CRAFT_PILLARS[activeIdx];

  return (
    <section
      id="craft"
      ref={containerRef}
      className="relative w-full lg:h-[310vh] border-t border-white/[0.06]"
    >
      {/* Sticky full-viewport pinned Craft Stage on desktop; clean stacked showcase on mobile */}
      <div
        className="lg:sticky lg:top-0 w-full min-h-screen lg:h-screen lg:min-h-[680px] flex flex-col justify-between overflow-hidden px-5 sm:px-10 lg:px-14 pt-20 sm:pt-24 pb-14 lg:pb-8 transition-all duration-700"
        style={{ background: pillar.bgGradient }}
      >
        {/* Top Section Index & Counter Row */}
        <div className="relative z-10 max-w-[1380px] mx-auto w-full flex items-center justify-between">
          <div className="font-mono-tech text-[11px] tracking-[0.22em] text-white/45 uppercase">
            (02) CRAFT
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToPillar(activeIdx === 0 ? 2 : activeIdx - 1)}
                aria-label="Previous craft pillar"
                className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/15 hover:border-white/35 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToPillar(activeIdx === 2 ? 0 : activeIdx + 1)}
                aria-label="Next craft pillar"
                className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/15 hover:border-white/35 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="font-mono-tech text-xs text-white/45 flex items-baseline gap-1.5">
              <span className="font-display text-2xl sm:text-3xl text-white tracking-wider">
                {pillar.index}
              </span>
              <span>/ 03</span>
            </div>
          </div>
        </div>

        {/* Center 3-Column Stage: Copy | Studio Portrait Card | Morphing 3D Particle Sculpture */}
        <div className="relative z-10 max-w-[1380px] mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6">
          {/* Left Copy */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-sm sm:text-base font-medium mb-2.5 tracking-wide"
                  style={{ color: pillar.accentHex }}
                >
                  {pillar.eyebrow}
                </p>

                <h3 className="font-display text-white uppercase text-[clamp(2.65rem,11.5vw,4.4rem)] sm:text-6xl xl:text-[4.4rem] leading-[0.96] sm:leading-[0.94] tracking-[0.01em] mb-4 sm:mb-5">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-white/65 leading-relaxed mb-6 sm:mb-7 max-w-md">
                  {pillar.description}
                </p>

                {/* Process Pipeline Row */}
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5 sm:gap-2 font-mono-tech text-[9.5px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] uppercase mb-5">
                  {pillar.pipeline.map((step, idx) => (
                    <span key={step} className="inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                      {idx > 0 && (
                        <span className="text-white/25">—</span>
                      )}
                      <span
                        style={{
                          color:
                            idx === pillar.activeStep
                              ? pillar.accentHex
                              : 'rgba(255,255,255,0.55)',
                        }}
                        className={idx === pillar.activeStep ? 'font-bold' : ''}
                      >
                        {step}
                      </span>
                    </span>
                  ))}
                </div>

                {/* Tech Tag Pills */}
                <div className="flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-md font-mono-tech text-[10px] tracking-[0.14em] uppercase text-white/75 bg-white/[0.04] border border-white/12"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Studio Portrait Card */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative w-full max-w-[235px] sm:max-w-[315px] aspect-[3/4]">
              <div
                className="absolute -inset-4 rounded-[34px] blur-3xl opacity-45 transition-colors duration-700 pointer-events-none"
                style={{ background: pillar.accentSoft }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#0a0b10] shadow-[0_28px_80px_rgba(0,0,0,0.78)]"
                >
                  <img
                    src={PORTRAIT_MAP[pillar.id]}
                    alt={`Anand A — ${pillar.title}`}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.18em] uppercase text-white/75">
                    <span>ANAND A</span>
                    <span style={{ color: pillar.accentHex }}>{pillar.index} // LIVE</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right 3D Morphing Particle Sculpture (00:07 Blueprint -> 00:08 Neural Head -> 00:09 Cylinders + Pipelines) */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <ParticleSculpture
              shapeType={pillar.shapeType}
              accentHex={pillar.accentHex}
            />
          </div>
        </div>

        {/* Bottom 3-Segment Scroll-Scrubbed Progress Track (00:07–00:10!) */}
        <div className="relative z-10 max-w-[1380px] mx-auto w-full pt-4 lg:pt-2 grid grid-cols-3 gap-2.5 sm:gap-6">
          {CRAFT_PILLARS.map((item, idx) => {
            const isActive = idx === activeIdx;
            const fillPct = Math.max(
              isActive ? 12 : 0,
              Math.round((segmentProgress[idx] || 0) * 100)
            );
            const mobileCompactLabel =
              idx === 0 ? '01 WEB' : idx === 1 ? '02 AI' : '03 INFRA';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToPillar(idx)}
                className="group text-left py-1 focus:outline-none cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono-tech text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.16em] uppercase transition-colors truncate ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-white/45 group-hover:text-white/75'
                    }`}
                  >
                    <span className="sm:hidden">{mobileCompactLabel}</span>
                    <span className="hidden sm:inline">{item.shortLabel}</span>
                  </span>
                </div>
                <div className="h-[2.5px] w-full bg-white/12 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-[width] duration-150 ease-out"
                    style={{
                      width: `${fillPct}%`,
                      backgroundColor: item.accentHex,
                      opacity: idx <= activeIdx ? 1 : 0.35,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
