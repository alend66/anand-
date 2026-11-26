import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CAROUSEL_TECH, STACK_TOOLBOXES } from '../data/anandData';

function TechGlyphIcon({ id, color }) {
  const common = {
    className: 'w-11 h-11 sm:w-12 sm:h-12',
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: color,
    strokeWidth: '2.1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (id) {
    case 'linux':
      return (
        <svg {...common}>
          <rect x="6" y="10" width="36" height="28" rx="6" fill={`${color}20`} />
          <path d="M14 20 L20 25 L14 30" />
          <line x1="24" y1="30" x2="34" y2="30" />
        </svg>
      );
    case 'nginx':
      return (
        <svg {...common}>
          <polygon points="24,5 41,14.5 41,33.5 24,43 7,33.5 7,14.5" fill={`${color}20`} />
          <path d="M17 31 V17 L31 31 V17" strokeWidth="2.4" />
        </svg>
      );
    case 'apache':
      return (
        <svg {...common}>
          <rect x="9" y="8" width="30" height="10" rx="3" fill={`${color}20`} />
          <rect x="9" y="20" width="30" height="10" rx="3" fill={`${color}14`} />
          <rect x="9" y="32" width="30" height="8" rx="3" />
          <circle cx="15" cy="13" r="1.5" fill={color} />
          <circle cx="15" cy="25" r="1.5" fill={color} />
        </svg>
      );
    case 'react':
      return (
        <svg {...common}>
          <ellipse cx="24" cy="24" rx="18" ry="7.5" />
          <ellipse cx="24" cy="24" rx="18" ry="7.5" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="18" ry="7.5" transform="rotate(120 24 24)" />
          <circle cx="24" cy="24" r="3" fill={color} />
        </svg>
      );
    case 'node':
      return (
        <svg {...common}>
          <polygon points="24,5 40,14.5 40,33.5 24,43 8,33.5 8,14.5" fill={`${color}20`} />
          <path d="M18 28 V20 L30 28 V20" />
        </svg>
      );
    case 'python':
      return (
        <svg {...common}>
          <rect x="13" y="8" width="16" height="14" rx="5" fill={`${color}22`} />
          <rect x="19" y="26" width="16" height="14" rx="5" />
          <circle cx="18" cy="13" r="1.4" fill={color} />
          <circle cx="30" cy="35" r="1.4" fill={color} />
        </svg>
      );
    case 'django':
      return (
        <svg {...common}>
          <rect x="8" y="8" width="32" height="32" rx="8" fill={`${color}20`} />
          <path
            d="M21 15 V33 M21 23 C15 23 15 32 21 32 M28 21 V32 C28 35 26 36 24 36"
            strokeWidth="2.3"
          />
          <circle cx="28" cy="16" r="1.3" fill={color} />
        </svg>
      );
    case 'mongodb':
      return (
        <svg {...common}>
          <path d="M24 7 C32 16 34 26 24 40 C14 26 16 16 24 7 Z" fill={`${color}22`} />
          <line x1="24" y1="15" x2="24" y2="41" />
        </svg>
      );
    case 'mysql':
      return (
        <svg {...common}>
          <ellipse cx="24" cy="13" rx="14" ry="5.5" fill={`${color}22`} />
          <path d="M10 13 V35 C10 38 16 40.5 24 40.5 C32 40.5 38 38 38 35 V13" />
          <path d="M10 24 C10 27 16 29.5 24 29.5 C32 29.5 38 27 38 24" />
        </svg>
      );
    case 'yolov8':
      return (
        <svg {...common}>
          <path
            d="M9 17 V11 H15 M33 11 H39 V17 M39 31 V37 H33 M15 37 H9 V31"
            strokeWidth="2.4"
          />
          <circle cx="24" cy="24" r="7" fill={`${color}24`} />
          <circle cx="24" cy="24" r="2.2" fill={color} />
        </svg>
      );
    case 'aws':
      return (
        <svg {...common}>
          <path
            d="M14 30 H34 C38 30 40 27 40 23.5 C40 20 37.5 17.5 34 17.5 C33 12.5 28.5 9.5 23.5 9.5 C18 9.5 14 13.5 13.5 18.5 C10 19 8 21.5 8 24.5 C8 27.8 10.5 30 14 30 Z"
            fill={`${color}20`}
          />
          <path d="M15 36 Q24 41 34 35" strokeWidth="2.3" />
        </svg>
      );
    case 'devops':
      return (
        <svg {...common}>
          <path
            d="M17 18 C12 18 9 21 9 24 C9 27 12 30 17 30 C21 30 27 18 31 18 C36 18 39 21 39 24 C39 27 36 30 31 30 C27 30 21 18 17 18 Z"
            fill={`${color}20`}
            strokeWidth="2.3"
          />
        </svg>
      );
    case 'firewall':
      return (
        <svg {...common}>
          <path
            d="M24 7 L38 13 V24 C38 33 32 38.5 24 41 C16 38.5 10 33 10 24 V13 L24 7 Z"
            fill={`${color}20`}
          />
          <path d="M18 24 L22 28 L31 19" strokeWidth="2.4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="16" cy="14" r="4" fill={`${color}24`} />
          <circle cx="32" cy="14" r="4" />
          <circle cx="16" cy="34" r="4" />
          <path d="M16 18 V30 M32 18 C32 25 22 24 16 30" />
        </svg>
      );
  }
}

export default function StackSection() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const hoveredCategoryRef = useRef(null);

  // Continuous physics state for 60 FPS buttery mousepad swipe + hover glide + drag inertia + auto-rotation
  const physicsRef = useRef({
    pos: 3, // continuous floating-point index along the 14-item ring
    vel: 0, // inertial angular velocity from trackpad swipe / drag flick
    targetPos: null, // used when user clicks a card or Prev/Next arrow
    isDragging: false,
    dragStartX: 0,
    lastPointerX: 0,
    dragMoved: false,
    hoverSteer: 0, // -1..+1 gentle steering when gliding finger on mousepad across stage
    isHovering: false,
    lastSwipeTs: 0,
  });

  useEffect(() => {
    hoveredCategoryRef.current = hoveredCategory;
  }, [hoveredCategory]);

  const total = CAROUSEL_TECH.length;

  // Bind non-passive wheel handler so horizontal 2-finger trackpad swipes spin the carousel immediately without triggering browser Back/Forward!
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      // Respond immediately to horizontal mousepad two-finger swipe (or Shift+Scroll)
      const horizontalDelta =
        absX > 1.5 && absX >= absY * 0.45
          ? e.deltaX
          : e.shiftKey && absY > 1.5
            ? e.deltaY
            : 0;

      if (horizontalDelta !== 0) {
        e.preventDefault();
        const p = physicsRef.current;
        p.targetPos = null;
        p.lastSwipeTs = performance.now();
        // Smooth velocity injection scaled for both Windows precision trackpads and macOS trackpads
        p.vel += horizontalDelta * 0.0022;
        p.vel = Math.max(-0.55, Math.min(0.55, p.vel));
      }
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => stage.removeEventListener('wheel', onWheel);
  }, []);

  // 60 FPS continuous 3D curved cylinder renderer (direct GPU transform updates, zero React jank!)
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const tick = (now) => {
      const dt = Math.min(32, now - lastTime) / 16.667; // normalized to 60fps frames
      lastTime = now;

      const p = physicsRef.current;

      if (p.targetPos !== null) {
        // Shortest circular path glide when clicking a card or Prev/Next button
        let diff = ((p.targetPos - p.pos + total * 1.5) % total) - total * 0.5;
        if (Math.abs(diff) < 0.004) {
          p.pos = ((p.targetPos % total) + total) % total;
          p.targetPos = null;
        } else {
          p.pos += diff * 0.12 * dt;
        }
        p.vel *= 0.85;
      } else if (!p.isDragging) {
        // Apply inertial momentum from mousepad swipe or drag flick
        p.pos += p.vel * dt;
        p.vel *= Math.pow(0.935, dt);

        // Smooth continuous automatic motion:
        // - Gliding cursor left/right over the stage smoothly steers direction & speed
        // - Otherwise glides automatically in a silky continuous loop (matching 00:15!)
        const recentlySwiped = now - p.lastSwipeTs < 420;
        if (!recentlySwiped) {
          if (p.isHovering) {
            // Smooth hover-steering with calm center deadzone so center card is easy to inspect
            const steer =
              Math.abs(p.hoverSteer) < 0.16
                ? 0.0035 // gentle subtle drift even in center
                : p.hoverSteer * 0.026;
            p.pos += steer * dt;
          } else {
            // Continuous silky automatic glide
            p.pos += 0.0075 * dt;
          }
        }
      }

      // Wrap smoothly within [0, total)
      p.pos = ((p.pos % total) + total) % total;

      const stageW = stageRef.current?.clientWidth || 1200;
      const isCompact = stageW < 640;
      const cardSpacingAngle = isCompact ? 0.44 : 0.33; // clean non-overlapping arc spacing on Android/iOS & desktop!
      const arcRadius = isCompact ? Math.max(295, stageW * 0.82) : Math.min(720, stageW * 0.56);
      const filterCat = hoveredCategoryRef.current;

      for (let i = 0; i < total; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let offset = i - p.pos;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const absOffset = Math.abs(offset);
        const maxVisible = isCompact ? 2.5 : 3.6;

        if (absOffset > maxVisible) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          el.style.visibility = 'hidden';
          continue;
        }

        el.style.visibility = 'visible';
        el.style.pointerEvents = 'auto';

        // True 3D curved cylinder arc math (00:15!) — zero text overlap between neighboring cards!
        const angle = offset * cardSpacingAngle;
        const tx = Math.sin(angle) * arcRadius;
        const tz = (Math.cos(angle) - 1) * (arcRadius * 0.65);
        const rotateY = -angle * (180 / Math.PI) * 0.92;
        const scale = Math.max(0.74, 1.04 - absOffset * 0.085);

        const item = CAROUSEL_TECH[i];
        const dimmed = filterCat && item.category !== filterCat;
        const baseOpacity = Math.max(0, 1 - Math.pow(absOffset / maxVisible, 1.65));
        const finalOpacity = dimmed ? baseOpacity * 0.2 : baseOpacity;

        el.style.transform = `translate3d(${tx.toFixed(1)}px, 0px, ${tz.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = finalOpacity.toFixed(3);
        el.style.zIndex = String(Math.round(50 - absOffset * 10));

        // Subtle crisp center highlight border
        const isCenter = absOffset < 0.42;
        el.style.borderColor = isCenter
          ? 'rgba(255,255,255,0.26)'
          : 'rgba(255,255,255,0.09)';
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [total]);

  const handlePointerDown = (e) => {
    const p = physicsRef.current;
    p.isDragging = true;
    p.targetPos = null;
    p.dragStartX = e.clientX;
    p.lastPointerX = e.clientX;
    p.dragMoved = false;
    p.vel = 0;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const p = physicsRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 (left) to +1 (right)
    p.hoverSteer = Math.max(-1, Math.min(1, relX));
    p.isHovering = true;

    if (!p.isDragging) return;
    const dx = e.clientX - p.lastPointerX;
    p.lastPointerX = e.clientX;

    if (Math.abs(e.clientX - p.dragStartX) > 6) {
      p.dragMoved = true;
    }

    // 1:1 tactile horizontal drag + momentum velocity capture
    const step = -dx / 185;
    p.pos += step;
    p.vel = step * 0.85;
    p.lastSwipeTs = performance.now();
  };

  const handlePointerUp = () => {
    physicsRef.current.isDragging = false;
  };

  const handlePointerLeave = () => {
    const p = physicsRef.current;
    p.isHovering = false;
    p.hoverSteer = 0;
    p.isDragging = false;
  };

  const nudgeStep = (dir) => {
    const p = physicsRef.current;
    const base = p.targetPos !== null ? p.targetPos : Math.round(p.pos);
    p.targetPos = (base + dir + total) % total;
  };

  const focusCard = (idx) => {
    if (physicsRef.current.dragMoved) return;
    physicsRef.current.targetPos = idx;
  };

  return (
    <section
      id="stack"
      className="relative w-full min-h-screen bg-[#04050c] py-20 sm:py-32 px-5 sm:px-10 lg:px-14 overflow-hidden flex flex-col justify-between border-t border-white/[0.06]"
    >
      {/* Subtle deep indigo cosmic nebula + faint dot starfield (00:14–00:15!) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 55% 42%, rgba(45, 58, 168, 0.26), transparent 68%), radial-gradient(ellipse 45% 45% at 18% 80%, rgba(18, 72, 110, 0.16), transparent 65%)',
        }}
      />
      <div className="absolute inset-0 noise-overlay opacity-45 pointer-events-none" />

      <div className="relative z-10 max-w-[1380px] mx-auto w-full">
        {/* Top Massive Display Title: ONE BUILDER, THREE TOOLBOXES. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="font-mono-tech text-[11px] tracking-[0.22em] text-white/45 uppercase mb-4">
              (04) STACK
            </p>
            <h2 className="font-display uppercase text-[clamp(3.1rem,8.4vw,7.4rem)] leading-[0.92] tracking-[0.01em] select-none">
              <span className="text-white">ONE BUILDER, </span>
              <span className="text-outline-white">THREE</span>
              <br />
              <span className="text-outline-white">TOOLBOXES.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start md:self-end">
            <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-white/40">
              SWIPE TRACKPAD · GLIDE · DRAG
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => nudgeStep(-1)}
                aria-label="Rotate tech carousel left"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => nudgeStep(1)}
                aria-label="Rotate tech carousel right"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Interactive 60-FPS 3D Curved Tech Cylinder Stage */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          style={{ perspective: '1250px', touchAction: 'pan-y' }}
          className="relative w-full h-[230px] sm:h-[310px] flex items-center justify-center my-3 sm:my-6 select-none cursor-grab active:cursor-grabbing"
        >
          <div
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {CAROUSEL_TECH.map((item, idx) => (
              <button
                key={item.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => focusCard(idx)}
                style={{
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                }}
                className="absolute w-[138px] sm:w-[186px] h-[164px] sm:h-[212px] rounded-[20px] sm:rounded-[24px] flex flex-col items-center justify-center gap-3 sm:gap-4 border border-white/10 bg-[#0c0e17]/95 backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.82)] cursor-pointer transition-shadow hover:shadow-[0_26px_70px_rgba(56,189,248,0.16)]"
              >
                {/* Vivid glowing icon badge mirroring 00:15 */}
                <div
                  className="w-[62px] h-[62px] sm:w-[82px] sm:h-[82px] rounded-xl sm:rounded-2xl flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(145deg, ${item.color}36, ${item.color}12)`,
                    borderColor: `${item.color}50`,
                    boxShadow: `0 0 32px ${item.color}2e, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  }}
                >
                  <TechGlyphIcon id={item.id} color={item.color} />
                </div>

                <span className="font-mono-tech text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-white/85 font-semibold">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom 3-Column Categorized Stack Matrix (00:15!) */}
        <div className="mt-10 pt-8 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {STACK_TOOLBOXES.map((box) => (
            <div
              key={box.id}
              onMouseEnter={() => setHoveredCategory(box.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="group transition-opacity"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: box.dotColor,
                    boxShadow: `0 0 10px ${box.dotColor}`,
                  }}
                />
                <h3 className="font-mono-tech text-[11px] tracking-[0.2em] uppercase text-white/75 group-hover:text-white transition-colors font-semibold">
                  {box.label}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {box.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] hover:border-white/25 hover:bg-white/[0.08] font-mono-tech text-[10px] tracking-[0.14em] uppercase text-white/70 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
