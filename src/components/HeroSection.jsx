import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { ANAND_PROFILE } from '../data/anandData';
import heroNormalCutout from '../assets/hero-normal-cutout.png';
import heroCyberCutout from '../assets/hero-cyber-cutout.png';

const TRAIL_COUNT = 12;

function getContainedBottomRect(box, natW, natH) {
  if (!natW || !natH || !box.width || !box.height) {
    return { x: box.x, y: box.y, w: box.width, h: box.height };
  }
  const scale = Math.min(box.width / natW, box.height / natH);
  const w = natW * scale;
  const h = natH * scale;
  const x = box.x + (box.width - w) / 2;
  const y = box.y + (box.height - h); // object-bottom
  return { x, y, w, h };
}

function drawLiquidSilhouette(ctx, trail, extraRadius = 0) {
  ctx.beginPath();
  for (let i = 0; i < trail.length; i++) {
    const pt = trail[i];
    const r = Math.max(1, pt.r + extraRadius);
    ctx.moveTo(pt.x + r, pt.y);
    ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
  }
  ctx.fill();

  // Smooth fluid bridge strokes between consecutive trail nodes so fast touch/mouse swipes form a seamless liquid ribbon
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 1; i < trail.length; i++) {
    const prev = trail[i - 1];
    const curr = trail[i];
    const d = Math.hypot(prev.x - curr.x, prev.y - curr.y);
    if (d < 1.5) continue;
    const avgR = Math.max(1, (prev.r + curr.r) * 0.5 + extraRadius);
    ctx.lineWidth = avgR * 2;
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(curr.x, curr.y);
    ctx.stroke();
  }
}

function HeroBaseLayer({ variant, displayWord, wordRef, imgRef, onImgLoad }) {
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

      {/* Giant Edge-to-Edge Condensed Wordmark BEHIND Portrait */}
      <div className="absolute inset-0 flex items-start justify-center pt-[max(198px,27dvh)] sm:items-center sm:pt-0 sm:-translate-y-6 pointer-events-none select-none px-2">
        <span
          ref={wordRef}
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
          ref={imgRef}
          src={isCyber ? heroCyberCutout : heroNormalCutout}
          onLoad={onImgLoad}
          alt={
            isCyber
              ? 'Anand A — Augmented Systems Engineer Portrait'
              : 'Anand A — Editorial Developer Portrait'
          }
          draggable={false}
          className="h-[63dvh] sm:h-[76vh] md:h-[89vh] max-h-[850px] max-w-[96vw] sm:max-w-none w-auto object-contain object-bottom translate-x-0 md:translate-x-4 drop-shadow-[0_24px_50px_rgba(0,0,0,0.42)]"
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [mode, setMode] = useState('developer');
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const baseWordRef = useRef(null);
  const baseImgRef = useRef(null);
  const modeRef = useRef(mode);
  const sceneDirtyRef = useRef(true);

  const isDeveloper = mode === 'developer';
  const baseVariant = isDeveloper ? 'orange' : 'cyber';
  const displayWord = isDeveloper ? 'DEVELOPER' : 'SYSADMIN';

  useEffect(() => {
    modeRef.current = mode;
    sceneDirtyRef.current = true;
  }, [mode]);

  // 60-FPS GPU-Accelerated Canvas Liquid Portal + Unified Exterior Plasma Rim (100% reliable on iOS Safari, Android Chrome & Desktop!)
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sceneCanvas = document.createElement('canvas');
    const sceneCtx = sceneCanvas.getContext('2d');
    const rimCanvas = document.createElement('canvas');
    const rimCtx = rimCanvas.getContext('2d');

    const imgNormal = new Image();
    const imgCyber = new Image();
    imgNormal.src = heroNormalCutout;
    imgCyber.src = heroCyberCutout;
    imgNormal.onload = () => {
      sceneDirtyRef.current = true;
    };
    imgCyber.onload = () => {
      sceneDirtyRef.current = true;
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        sceneDirtyRef.current = true;
      });
    }

    let w = section.clientWidth || window.innerWidth;
    let h = section.clientHeight || window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const getFaceAnchor = () => {
      const secRect = section.getBoundingClientRect();
      const imgEl = baseImgRef.current;
      if (imgEl && imgEl.naturalWidth > 0) {
        const ir = imgEl.getBoundingClientRect();
        const box = {
          x: ir.left - secRect.left,
          y: ir.top - secRect.top,
          width: ir.width,
          height: ir.height,
        };
        const contained = getContainedBottomRect(box, imgEl.naturalWidth, imgEl.naturalHeight);
        return {
          x: contained.x + contained.w * 0.5,
          y: contained.y + contained.h * 0.28,
          spanX: contained.w * 0.22,
          spanY: contained.h * 0.06,
        };
      }
      const isPhone = w < 640;
      return {
        x: w * (isPhone ? 0.5 : 0.52),
        y: h * (isPhone ? 0.52 : 0.36),
        spanX: w * (isPhone ? 0.14 : 0.085),
        spanY: h * 0.045,
      };
    };

    const syncSize = () => {
      const rect = section.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      for (const c of [canvas, sceneCanvas, rimCanvas]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sceneCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rimCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sceneDirtyRef.current = true;
    };

    const rebuildRevealScene = () => {
      sceneDirtyRef.current = false;
      const revealIsCyber = modeRef.current === 'developer';
      const wordText = modeRef.current === 'developer' ? 'DEVELOPER' : 'SYSADMIN';
      const s = sceneCtx;
      s.save();
      s.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.clearRect(0, 0, w, h);

      // 1. Background radial gradient matching HeroBaseLayer
      if (revealIsCyber) {
        const bg = s.createRadialGradient(
          w * 0.54,
          h * 0.4,
          0,
          w * 0.54,
          h * 0.4,
          Math.max(w, h) * 0.85
        );
        bg.addColorStop(0, '#09275e');
        bg.addColorStop(0.52, '#05112c');
        bg.addColorStop(1, '#020714');
        s.fillStyle = bg;
        s.fillRect(0, 0, w, h);

        // Subtle 42px cyan architectural telemetry grid
        s.strokeStyle = 'rgba(56, 189, 248, 0.075)';
        s.lineWidth = 1;
        s.beginPath();
        for (let gx = 0; gx <= w; gx += 42) {
          s.moveTo(gx + 0.5, 0);
          s.lineTo(gx + 0.5, h);
        }
        for (let gy = 0; gy <= h; gy += 42) {
          s.moveTo(0, gy + 0.5);
          s.lineTo(w, gy + 0.5);
        }
        s.stroke();
      } else {
        const bg = s.createRadialGradient(
          w * 0.36,
          h * 0.36,
          0,
          w * 0.36,
          h * 0.36,
          Math.max(w, h) * 0.9
        );
        bg.addColorStop(0, '#ff700a');
        bg.addColorStop(0.54, '#ea4600');
        bg.addColorStop(1, '#ba1c00');
        s.fillStyle = bg;
        s.fillRect(0, 0, w, h);

        const vig = s.createRadialGradient(
          w * 0.5,
          h * 0.45,
          Math.min(w, h) * 0.25,
          w * 0.5,
          h * 0.45,
          Math.max(w, h) * 0.72
        );
        vig.addColorStop(0, 'rgba(84, 12, 0, 0)');
        vig.addColorStop(1, 'rgba(84, 12, 0, 0.34)');
        s.fillStyle = vig;
        s.fillRect(0, 0, w, h);
      }

      // 2. Giant Wordmark synced pixel-for-pixel with baseWordRef
      const secRect = section.getBoundingClientRect();
      const wordEl = baseWordRef.current;
      if (wordEl) {
        const wr = wordEl.getBoundingClientRect();
        const cs = getComputedStyle(wordEl);
        const fontSize = parseFloat(cs.fontSize) || w * 0.2;
        const cx = wr.left - secRect.left + wr.width / 2;
        const cy = wr.top - secRect.top + wr.height / 2 + fontSize * 0.04;

        s.save();
        s.font = `400 ${fontSize}px "Anton", Impact, sans-serif`;
        s.textAlign = 'center';
        s.textBaseline = 'middle';
        if ('letterSpacing' in s) {
          s.letterSpacing = cs.letterSpacing || '0.015em';
        }

        if (revealIsCyber) {
          s.strokeStyle = 'rgba(56, 189, 248, 0.85)';
          s.lineWidth = w < 640 ? 1.5 : 2.1;
          s.shadowColor = 'rgba(56, 189, 248, 0.42)';
          s.shadowBlur = 22;
          s.strokeText(wordText, cx, cy);
        } else {
          s.fillStyle = 'rgba(255, 190, 85, 0.45)';
          s.fillText(wordText, cx, cy);
        }
        s.restore();
      }

      // 3. Reveal Studio Cutout synced pixel-for-pixel with baseImgRef
      const revealImg = revealIsCyber ? imgCyber : imgNormal;
      const baseImgEl = baseImgRef.current;
      if (revealImg.complete && revealImg.naturalWidth > 0 && baseImgEl) {
        const ir = baseImgEl.getBoundingClientRect();
        const box = {
          x: ir.left - secRect.left,
          y: ir.top - secRect.top,
          width: ir.width,
          height: ir.height,
        };
        const drawRect = getContainedBottomRect(
          box,
          revealImg.naturalWidth,
          revealImg.naturalHeight
        );
        s.drawImage(revealImg, drawRect.x, drawRect.y, drawRect.w, drawRect.h);
      }

      s.restore();
    };

    syncSize();
    const ro = new ResizeObserver(() => {
      syncSize();
    });
    ro.observe(section);

    const initialAnchor = getFaceAnchor();
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({
      x: initialAnchor.x,
      y: initialAnchor.y,
      r: 0,
    }));

    const state = {
      hasMoved: false,
      tx: initialAnchor.x,
      ty: initialAnchor.y,
      t: 0,
      pulse: 0,
      touchResetTimer: null,
      touchStartX: 0,
      touchStartY: 0,
      touchMode: 'idle', // 'idle' | 'undecided' | 'paint' | 'scroll'
    };

    const isInteractiveTarget = (target) =>
      Boolean(target && typeof target.closest === 'function' && target.closest('button, a'));

    const setTargetPoint = (clientX, clientY, boostPulse = false) => {
      const rect = section.getBoundingClientRect();
      state.hasMoved = true;
      state.tx = Math.max(0, Math.min(rect.width, clientX - rect.left));
      state.ty = Math.max(0, Math.min(rect.height, clientY - rect.top));
      if (boostPulse) {
        state.pulse = 1;
      }
    };

    const scheduleTouchIdleResume = (delayMs = 2400) => {
      clearTimeout(state.touchResetTimer);
      state.touchResetTimer = setTimeout(() => {
        state.hasMoved = false;
      }, delayMs);
    };

    // Mouse hover / drag tracking (desktop)
    const onPointerMove = (e) => {
      if (e.pointerType !== 'mouse' || isInteractiveTarget(e.target)) return;
      setTargetPoint(e.clientX, e.clientY, false);
    };

    const onPointerDown = (e) => {
      if (e.pointerType !== 'mouse' || isInteractiveTarget(e.target)) return;
      setTargetPoint(e.clientX, e.clientY, true);
    };

    const onPointerLeave = (e) => {
      if (e.pointerType === 'mouse') {
        state.hasMoved = false;
      }
    };

    // Dedicated Touch Events (Android Chrome & iOS Safari): tap anywhere to augment + drag across portrait without hijacking normal vertical page scroll!
    const onTouchStart = (e) => {
      if (e.touches.length !== 1 || isInteractiveTarget(e.target)) return;
      const touch = e.touches[0];
      state.touchStartX = touch.clientX;
      state.touchStartY = touch.clientY;
      state.touchMode = 'undecided';
      clearTimeout(state.touchResetTimer);
      setTargetPoint(touch.clientX, touch.clientY, true);
    };

    const onTouchMove = (e) => {
      if (e.touches.length !== 1 || state.touchMode === 'idle') return;
      const touch = e.touches[0];
      const dx = touch.clientX - state.touchStartX;
      const dy = touch.clientY - state.touchStartY;

      if (state.touchMode === 'undecided') {
        if (Math.abs(dx) + Math.abs(dy) < 4) return;
        const rect = section.getBoundingClientRect();
        const startRelY = (state.touchStartY - rect.top) / Math.max(1, rect.height);
        const startedOnPortrait = startRelY >= 0.24 && startRelY <= 0.72;
        const isStrongVerticalScroll = Math.abs(dy) > Math.abs(dx) * (startedOnPortrait ? 1.85 : 1.15);

        state.touchMode = isStrongVerticalScroll ? 'scroll' : 'paint';
      }

      if (state.touchMode === 'paint') {
        e.preventDefault();
        setTargetPoint(touch.clientX, touch.clientY, false);
      }
    };

    const onTouchEnd = () => {
      if (state.touchMode !== 'idle') {
        state.touchMode = 'idle';
        scheduleTouchIdleResume(2200);
      }
    };

    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerdown', onPointerDown);
    section.addEventListener('pointerleave', onPointerLeave);
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchmove', onTouchMove, { passive: false });
    section.addEventListener('touchend', onTouchEnd, { passive: true });
    section.addEventListener('touchcancel', onTouchEnd, { passive: true });

    let animId;
    const tick = () => {
      if (sceneDirtyRef.current) {
        rebuildRevealScene();
      }

      state.t += 0.024;
      state.pulse *= 0.88;
      const isPhone = w < 640;
      const baseR =
        (isPhone
          ? Math.max(54, Math.min(74, w * 0.165))
          : Math.max(78, Math.min(126, Math.min(w, h) * 0.138))) *
        (1 + state.pulse * 0.14);

      if (!state.hasMoved) {
        const anchor = getFaceAnchor();
        // Smooth, visibly alive figure-8 sweep directly across Anand's face & glasses!
        state.tx = anchor.x + Math.sin(state.t * 0.82) * anchor.spanX;
        state.ty = anchor.y + Math.sin(state.t * 1.64) * anchor.spanY;
      }

      // Head node glides responsively toward cursor/finger
      trail[0].x += (state.tx - trail[0].x) * 0.28;
      trail[0].y += (state.ty - trail[0].y) * 0.28;
      trail[0].r = baseR;

      // Trailing nodes follow smoothly, forming a decaying liquid plasma ribbon when moving fast and contracting into a crisp orb at rest
      for (let i = 1; i < TRAIL_COUNT; i++) {
        const prev = trail[i - 1];
        const curr = trail[i];
        const follow = Math.max(0.18, 0.36 - i * 0.015);
        curr.x += (prev.x - curr.x) * follow;
        curr.y += (prev.y - curr.y) * follow;

        const dist = Math.hypot(prev.x - curr.x, prev.y - curr.y);
        const taper = 1 - i / (TRAIL_COUNT + 1.4);
        const velocityBoost = Math.min(1, 0.5 + dist * 0.055);
        curr.r = Math.max(11, baseR * taper * velocityBoost);
      }

      const revealIsCyber = modeRef.current === 'developer';
      const rimColor = revealIsCyber ? '#38bdf8' : '#ff6a1a';
      const rimCore = revealIsCyber ? '#e0f7ff' : '#fff3e0';

      // STEP 1: Render clipped reveal layer on main portalCanvas
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ffffff';
      drawLiquidSilhouette(ctx, trail, 0);

      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(sceneCanvas, 0, 0, w, h);

      // STEP 2: Render unified exterior-only electric plasma neon rim on offscreen rimCanvas
      rimCtx.save();
      rimCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rimCtx.clearRect(0, 0, w, h);

      // Outer luminous plasma halo
      rimCtx.globalCompositeOperation = 'source-over';
      rimCtx.fillStyle = rimColor;
      rimCtx.strokeStyle = rimColor;
      rimCtx.shadowColor = rimColor;
      rimCtx.shadowBlur = isPhone ? 16 : 22;
      drawLiquidSilhouette(rimCtx, trail, isPhone ? 3.5 : 4.2);

      // Crisp incandescent inner filament
      rimCtx.shadowBlur = 5;
      rimCtx.shadowColor = rimCore;
      rimCtx.fillStyle = rimCore;
      rimCtx.strokeStyle = rimCore;
      drawLiquidSilhouette(rimCtx, trail, isPhone ? 1.5 : 1.8);

      // Punch out the interior so ONLY the exterior contour glows
      rimCtx.shadowBlur = 0;
      rimCtx.globalCompositeOperation = 'destination-out';
      rimCtx.fillStyle = '#000000';
      rimCtx.strokeStyle = '#000000';
      drawLiquidSilhouette(rimCtx, trail, -0.5);
      rimCtx.restore();

      // Composite unified neon rim over the clipped reveal layer
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(rimCanvas, 0, 0, w, h);
      ctx.restore();

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(state.touchResetTimer);
      ro.disconnect();
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerdown', onPointerDown);
      section.removeEventListener('pointerleave', onPointerLeave);
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchmove', onTouchMove);
      section.removeEventListener('touchend', onTouchEnd);
      section.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ touchAction: 'pan-y' }}
      className="relative w-full hero-viewport sm:min-h-[640px] max-h-[1040px] overflow-hidden select-none"
    >
      {/* LAYER 1: Base Hero Theme */}
      <HeroBaseLayer
        variant={baseVariant}
        displayWord={displayWord}
        wordRef={baseWordRef}
        imgRef={baseImgRef}
        onImgLoad={() => {
          sceneDirtyRef.current = true;
        }}
      />

      {/* LAYER 2: Hardware-Accelerated 60-FPS Canvas Liquid Portal + Glowing Plasma Rim */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Subtle bottom legibility gradient for crisp CTA/toggle contrast */}
      <div className="absolute inset-x-0 bottom-0 h-60 sm:h-44 bg-gradient-to-t from-black/82 via-black/34 to-transparent pointer-events-none z-20" />

      {/* LAYER 3: Foreground Editorial HUD UI */}
      <div className="hero-hud-pad relative z-30 max-w-[1440px] mx-auto w-full h-full px-4 sm:px-10 flex flex-col md:justify-between pointer-events-none">
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
        <div className="grid grid-cols-1 md:grid-cols-12 items-center md:items-end gap-3 md:gap-6 mt-2 sm:mt-4 md:my-auto">
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

        {/* Bottom Row: Symmetrically Aligned Mode Switcher + Equal-Width CTAs on Phone | Classic Editorial Split on Desktop */}
        <div className="mt-auto md:mt-0 grid grid-cols-1 md:grid-cols-12 items-end gap-3 sm:gap-5">
          {/* Bottom-Left Intro & Primary CTAs (aligned 50/50 grid matching 336px dock width on phone!) */}
          <div className="md:col-span-4 pointer-events-auto order-2 md:order-1 w-full">
            <p className="hidden sm:block text-xs text-white/85 leading-relaxed max-w-[280px] mb-4 drop-shadow">
              MCA graduate &amp; Server Administrator Intern engineering resilient Linux
              infrastructure, MERN platforms, and YOLOv8 vision apps.
            </p>
            <div className="grid grid-cols-2 md:flex items-center md:justify-start gap-2.5 w-full max-w-[336px] md:max-w-none mx-auto md:mx-0">
              <a
                href="#work"
                className="h-[42px] md:h-auto px-3 sm:px-5 md:py-2.5 rounded-full bg-white text-black hover:bg-black hover:text-white font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.14em] uppercase inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all shadow-xl"
              >
                <span>SEE THE WORK</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </a>
              <a
                href={ANAND_PROFILE.resumePath}
                download="Anand_A_Resume.pdf"
                className="h-[42px] md:h-auto px-3 sm:px-4 md:py-2.5 rounded-full bg-black/58 hover:bg-black/75 border border-white/32 text-white font-mono-tech text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.14em] uppercase backdrop-blur-md inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>RESUME</span>
              </a>
            </div>
          </div>

          {/* Bottom-Center Mode Toggle Pill (exact 50/50 split centered over buttons & nav dock on phone!) */}
          <div className="md:col-span-4 flex flex-col items-center justify-end pointer-events-auto order-1 md:order-2 w-full">
            <div
              role="group"
              aria-label="Toggle Hero Identity Mode"
              className="grid grid-cols-2 sm:inline-flex items-center w-full max-w-[264px] sm:w-auto sm:max-w-none p-1 rounded-full bg-black/72 border border-white/20 backdrop-blur-xl shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setMode('developer')}
                className={`h-[32px] sm:h-auto px-3 sm:px-4 sm:py-1.5 rounded-full font-mono-tech text-[10px] font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase inline-flex items-center justify-center transition-all cursor-pointer ${
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
                className={`h-[32px] sm:h-auto px-3 sm:px-4 sm:py-1.5 rounded-full font-mono-tech text-[10px] font-bold tracking-[0.14em] sm:tracking-[0.16em] uppercase inline-flex items-center justify-center transition-all cursor-pointer ${
                  !isDeveloper
                    ? 'bg-[#38bdf8] text-black shadow'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                SYSADMIN
              </button>
            </div>
            <p className="font-mono-tech text-[8.5px] sm:text-[9px] tracking-[0.14em] sm:tracking-[0.2em] uppercase text-white/75 mt-1.5 text-center">
              <span className="sm:hidden">DRAG FACE TO AUGMENT · SWITCH MODE</span>
              <span className="hidden sm:inline">TAP OR SWIPE TO AUGMENT · SWITCH MODE</span>
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
