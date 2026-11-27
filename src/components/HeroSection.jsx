import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { ANAND_PROFILE } from '../data/anandData';
import heroNormalCutout from '../assets/hero-normal-cutout.png';
import heroCyberCutout from '../assets/hero-cyber-cutout.png';

const TRAIL_COUNT = 12;

function HeroLayerContent({ variant, displayWord }) {
  const isCyber = variant === 'cyber';

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        background: isCyber
          ? 'radial-gradient(ellipse 78% 78% at 54% 40%, #09275e 0%, #05112c 52%, #020714 100%)'
          : 'radial-gradient(ellipse 84% 82% at 36% 36%, #ff700a 0%, #ea4600 54%, #ba1c00 100%)',
      }}
    >
      {/* Subtle architectural telemetry grid on cyber layer */}
      {isCyber && (
        <div
          className="absolute inset-0 opacity-32 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.18) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
      )}

      {/* Subtle warm editorial vignette on orange layer */}
      {!isCyber && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, transparent 45%, rgba(84, 12, 0, 0.34) 100%)',
          }}
        />
      )}

      {/* Giant Edge-to-Edge Condensed Wordmark BEHIND Portrait (00:00–00:03!) */}
      <div className="absolute inset-0 flex items-start justify-center pt-[31dvh] sm:items-center sm:pt-0 sm:-translate-y-6 pointer-events-none select-none px-2">
        <span
          aria-hidden="true"
          className={`font-display uppercase whitespace-nowrap leading-[0.82] tracking-[0.015em] text-[19.5vw] sm:text-[22vw] xl:text-[21vw] ${
            isCyber
              ? 'text-outline-cyan opacity-95'
              : 'text-[#ffbe55]/45 drop-shadow-[0_10px_30px_rgba(140,25,0,0.2)]'
          }`}
        >
          {displayWord}
        </span>
      </div>

      {/* Centerpiece Studio Portrait Cutout (dead-centered on Android/iOS phones + desktop editorial height!) */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pointer-events-none select-none">
        <img
          src={isCyber ? heroCyberCutout : heroNormalCutout}
          alt={
            isCyber
              ? 'Anand A — Augmented Systems Engineer Portrait'
              : 'Anand A — Editorial Developer Portrait'
          }
          draggable={false}
          className="h-[60dvh] sm:h-[76vh] md:h-[89vh] max-h-[850px] max-w-[96vw] sm:max-w-none w-auto object-contain object-bottom translate-x-0 md:translate-x-4 drop-shadow-[0_24px_50px_rgba(0,0,0,0.42)]"
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [mode, setMode] = useState('developer');
  const sectionRef = useRef(null);
  const clipCirclesRef = useRef([]);
  const rimCirclesRef = useRef([]);
  const rimCoreCirclesRef = useRef([]);

  const isDeveloper = mode === 'developer';
  const baseVariant = isDeveloper ? 'orange' : 'cyber';
  const revealVariant = isDeveloper ? 'cyber' : 'orange';
  const displayWord = isDeveloper ? 'DEVELOPER' : 'SYSADMIN';

  // 00:00–00:03 — True fluid decaying liquid brush trail (circles spring-chained together + unified exterior neon rim via SVG feMorphology!)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const initialRect = section.getBoundingClientRect();
    const initialIsPhone = initialRect.width < 640;
    const startX = initialRect.width * (initialIsPhone ? 0.5 : 0.54);
    const startY = initialRect.height * (initialIsPhone ? 0.53 : 0.42);

    const trail = Array.from({ length: TRAIL_COUNT }, () => ({
      x: startX,
      y: startY,
      r: 0,
    }));

    const state = {
      hasMoved: false,
      tx: startX,
      ty: startY,
      t: 0,
      touchResetTimer: null,
    };

    const isInteractiveTarget = (target) =>
      Boolean(target && typeof target.closest === 'function' && target.closest('button, a'));

    const onPointerMove = (e) => {
      if (isInteractiveTarget(e.target)) return;
      const rect = section.getBoundingClientRect();
      state.hasMoved = true;
      state.tx = e.clientX - rect.left;
      state.ty = e.clientY - rect.top;

      if (e.pointerType === 'touch') {
        clearTimeout(state.touchResetTimer);
        state.touchResetTimer = setTimeout(() => {
          state.hasMoved = false;
        }, 2200);
      }
    };

    const onPointerLeave = () => {
      state.hasMoved = false;
    };

    const onPointerUpOrCancel = (e) => {
      if (e.pointerType === 'touch') {
        clearTimeout(state.touchResetTimer);
        state.touchResetTimer = setTimeout(() => {
          state.hasMoved = false;
        }, 2000);
      }
    };

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerdown', onPointerMove);
    section.addEventListener('pointerup', onPointerUpOrCancel);
    section.addEventListener('pointercancel', onPointerUpOrCancel);
    section.addEventListener('pointerleave', onPointerLeave);

    let animId;
    const tick = () => {
      state.t += 0.022;
      const rect = section.getBoundingClientRect();
      const isPhone = rect.width < 640;
      const baseR = isPhone
        ? Math.max(52, Math.min(72, rect.width * 0.16))
        : Math.max(76, Math.min(126, Math.min(rect.width, rect.height) * 0.138));

      if (!state.hasMoved) {
        // Gentle figure-8 sweep across Anand's face/glasses when idle
        state.tx =
          rect.width * (isPhone ? 0.5 : 0.54) +
          Math.sin(state.t * 0.72) * (rect.width * (isPhone ? 0.11 : 0.085));
        state.ty =
          rect.height * (isPhone ? 0.53 : 0.42) +
          Math.sin(state.t * 1.44) * (rect.height * (isPhone ? 0.036 : 0.048));
      }

      // Head node glides responsively toward cursor
      trail[0].x += (state.tx - trail[0].x) * 0.24;
      trail[0].y += (state.ty - trail[0].y) * 0.24;
      trail[0].r = baseR;

      // Trailing nodes follow smoothly, painting an organic decaying liquid brush streak when moving fast and contracting into a clean orb when still!
      for (let i = 1; i < TRAIL_COUNT; i++) {
        const prev = trail[i - 1];
        const curr = trail[i];
        const follow = Math.max(0.16, 0.34 - i * 0.014);
        curr.x += (prev.x - curr.x) * follow;
        curr.y += (prev.y - curr.y) * follow;

        const dist = Math.hypot(prev.x - curr.x, prev.y - curr.y);
        const taper = 1 - i / (TRAIL_COUNT + 1.5);
        // Slightly shrink tail nodes unless dragged fast so resting state is a super crisp circle (00:02–00:03)
        const velocityBoost = Math.min(1, 0.48 + dist * 0.045);
        curr.r = Math.max(12, baseR * taper * velocityBoost);
      }

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const pt = trail[i];
        const cx = pt.x.toFixed(1);
        const cy = pt.y.toFixed(1);
        const cr = pt.r.toFixed(1);

        const cEl = clipCirclesRef.current[i];
        if (cEl) {
          cEl.setAttribute('cx', cx);
          cEl.setAttribute('cy', cy);
          cEl.setAttribute('r', cr);
        }

        const rEl = rimCirclesRef.current[i];
        if (rEl) {
          rEl.setAttribute('cx', cx);
          rEl.setAttribute('cy', cy);
          rEl.setAttribute('r', cr);
        }

        const coreEl = rimCoreCirclesRef.current[i];
        if (coreEl) {
          coreEl.setAttribute('cx', cx);
          coreEl.setAttribute('cy', cy);
          coreEl.setAttribute('r', cr);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(state.touchResetTimer);
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerdown', onPointerMove);
      section.removeEventListener('pointerup', onPointerUpOrCancel);
      section.removeEventListener('pointercancel', onPointerUpOrCancel);
      section.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const rimColor = isDeveloper ? '#38bdf8' : '#ff6a1a';
  const rimCore = isDeveloper ? '#e0f7ff' : '#fff3e0';
  const trailSlots = Array.from({ length: TRAIL_COUNT }, (_, i) => i);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full hero-viewport sm:min-h-[640px] max-h-[1040px] overflow-hidden select-none"
    >
      {/* LAYER 1: Base Hero Theme */}
      <HeroLayerContent variant={baseVariant} displayWord={displayWord} />

      {/* LAYER 2: Clipped Reveal Hero Theme (interactive fluid metaball brush trail!) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          clipPath: 'url(#hero-portal-clip)',
          WebkitClipPath: 'url(#hero-portal-clip)',
          transform: 'translateZ(0)',
        }}
      >
        <HeroLayerContent variant={revealVariant} displayWord={displayWord} />
      </div>

      {/* SVG ClipPath + Unified Exterior-Only Electric Neon Rim Filter */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
      >
        <defs>
          <clipPath id="hero-portal-clip" clipPathUnits="userSpaceOnUse">
            {trailSlots.map((i) => (
              <circle
                key={`clip-${i}`}
                ref={(el) => {
                  clipCirclesRef.current[i] = el;
                }}
                cx="0"
                cy="0"
                r="0"
              />
            ))}
          </clipPath>

          {/* Extracts ONLY the outer silhouette edge of the unioned liquid trail and applies plasma glow */}
          <filter id="liquid-rim-glow" x="-45%" y="-45%" width="190%" height="190%">
            <feMorphology operator="dilate" radius="4.5" in="SourceAlpha" result="dilated" />
            <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring" />
            <feFlood floodColor={rimColor} floodOpacity="1" result="colorFlood" />
            <feComposite in="colorFlood" in2="ring" operator="in" result="coloredRing" />
            <feGaussianBlur in="coloredRing" stdDeviation="9" result="softHalo" />
            <feGaussianBlur in="coloredRing" stdDeviation="3" result="tightHalo" />
            <feMerge>
              <feMergeNode in="softHalo" />
              <feMergeNode in="tightHalo" />
              <feMergeNode in="coloredRing" />
            </feMerge>
          </filter>

          {/* Crisp incandescent inner contour filament */}
          <filter id="liquid-rim-core" x="-45%" y="-45%" width="190%" height="190%">
            <feMorphology operator="dilate" radius="1.8" in="SourceAlpha" result="dilatedCore" />
            <feComposite in="dilatedCore" in2="SourceAlpha" operator="out" result="thinRing" />
            <feFlood floodColor={rimCore} floodOpacity="0.95" result="coreFlood" />
            <feComposite in="coreFlood" in2="thinRing" operator="in" result="finalCore" />
          </filter>
        </defs>

        <g filter="url(#liquid-rim-glow)">
          {trailSlots.map((i) => (
            <circle
              key={`rim-${i}`}
              ref={(el) => {
                rimCirclesRef.current[i] = el;
              }}
              cx="0"
              cy="0"
              r="0"
              fill="#ffffff"
            />
          ))}
        </g>

        <g filter="url(#liquid-rim-core)">
          {trailSlots.map((i) => (
            <circle
              key={`core-${i}`}
              ref={(el) => {
                rimCoreCirclesRef.current[i] = el;
              }}
              cx="0"
              cy="0"
              r="0"
              fill="#ffffff"
            />
          ))}
        </g>
      </svg>

      {/* Subtle bottom legibility gradient (slightly taller on phone for clean CTA/toggle contrast) */}
      <div className="absolute inset-x-0 bottom-0 h-60 sm:h-44 bg-gradient-to-t from-black/80 via-black/32 to-transparent pointer-events-none z-20" />

      {/* LAYER 3: Foreground Editorial HUD UI */}
      <div className="hero-hud-pad relative z-30 max-w-[1440px] mx-auto w-full h-full px-5 sm:px-10 flex flex-col md:justify-between pointer-events-none">
        {/* Top Row: Identity Tag */}
        <div className="flex items-center justify-center md:justify-between pt-1 sm:pt-6">
          <div className="inline-flex items-center gap-2 font-mono-tech text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-white/90 drop-shadow">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: isDeveloper ? '#ffffff' : '#38bdf8' }}
            />
            <span>ANAND A</span>
            <span className="text-white/45">·</span>
            <span className="text-white/75">{ANAND_PROFILE.location}</span>
          </div>
        </div>

        {/* Middle Row: Pixel-Matrix Hero Headline (Top-Centered on Phone, Left-Aligned on Desktop) & Stats (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center md:items-end gap-3 md:gap-6 mt-2.5 sm:mt-4 md:my-auto">
          <div className="md:col-span-5 lg:col-span-4 space-y-2 sm:space-y-4 text-center md:text-left">
            <motion.h1
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="font-pixel text-white text-[clamp(1.9rem,8.4vw,2.65rem)] sm:text-5xl lg:text-[3.5rem] leading-[1.0] tracking-tight drop-shadow-[0_6px_22px_rgba(0,0,0,0.42)]"
            >
              {isDeveloper ? (
                <>
                  I build
                  <br />
                  systems.
                </>
              ) : (
                <>
                  I run
                  <br />
                  infrastructure.
                </>
              )}
            </motion.h1>

            <p className="font-mono-tech text-[8.5px] min-[390px]:text-[9.5px] sm:text-[10px] tracking-[0.1em] min-[390px]:tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white/88 drop-shadow">
              LINUX SERVER ADMIN · FULL-STACK DEV · CLOUD &amp; AI
            </p>
          </div>

          <div className="hidden md:block md:col-span-4 lg:col-span-5" />

          {/* Right Vertical Metric Stack (Desktop) */}
          <div className="hidden md:flex md:col-span-3 flex-col items-end gap-5 text-right">
            {ANAND_PROFILE.stats.map((stat) => (
              <div key={stat.label} className="drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]">
                <div className="font-display text-white text-4xl lg:text-5xl leading-none tracking-wide">
                  {stat.value}
                </div>
                <div className="font-mono-tech text-[9px] tracking-[0.2em] uppercase text-white/75 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Bio + CTAs (Left) | Interactive Mode Switcher (Center) */}
        <div className="mt-auto md:mt-0 grid grid-cols-1 md:grid-cols-12 items-end gap-3 sm:gap-5">
          {/* Bottom-Left Intro & Primary CTAs */}
          <div className="md:col-span-4 pointer-events-auto order-2 md:order-1">
            <p className="hidden sm:block text-xs text-white/85 leading-relaxed max-w-[280px] mb-4 drop-shadow">
              MCA graduate &amp; Server Administrator Intern engineering resilient Linux
              infrastructure, MERN platforms, and YOLOv8 vision apps.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <a
                href="#work"
                className="px-4 sm:px-5 py-2.5 rounded-full bg-white text-black hover:bg-black hover:text-white font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase inline-flex items-center gap-1.5 sm:gap-2 transition-all shadow-xl"
              >
                SEE THE WORK
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={ANAND_PROFILE.resumePath}
                download="Anand_A_Resume.pdf"
                className="px-4 py-2.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/30 text-white font-mono-tech text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase backdrop-blur-md inline-flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                RESUME
              </a>
            </div>
          </div>

          {/* Bottom-Center Mode Toggle Pill */}
          <div className="md:col-span-4 flex flex-col items-center justify-end pointer-events-auto order-1 md:order-2">
            <div
              role="group"
              aria-label="Toggle Hero Identity Mode"
              className="inline-flex items-center p-1 rounded-full bg-black/70 border border-white/20 backdrop-blur-xl shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setMode('developer')}
                className={`px-4 py-1.5 rounded-full font-mono-tech text-[10px] font-bold tracking-[0.16em] uppercase transition-all cursor-pointer ${
                  isDeveloper
                    ? 'bg-white text-black shadow'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                DEVELOPER
              </button>
              <button
                type="button"
                onClick={() => setMode('sysadmin')}
                className={`px-4 py-1.5 rounded-full font-mono-tech text-[10px] font-bold tracking-[0.16em] uppercase transition-all cursor-pointer ${
                  !isDeveloper
                    ? 'bg-[#38bdf8] text-black shadow'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                SYSADMIN
              </button>
            </div>
            <p className="font-mono-tech text-[8.5px] sm:text-[9px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-white/75 mt-1.5 text-center">
              TAP OR SWIPE TO AUGMENT · SWITCH MODE
            </p>
          </div>

          <div className="hidden md:flex md:col-span-4 justify-end items-end order-3">
            <a
              href="#craft"
              className="pointer-events-auto font-mono-tech text-[10px] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors"
            >
              SCROLL TO EXPLORE ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
