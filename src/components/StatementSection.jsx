import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ANAND_PROFILE } from '../data/anandData';

const MANIFESTO_LINES = [
  [
    { text: 'SYSADMIN', accent: false },
    { text: 'BY', accent: false },
    { text: 'DISCIPLINE.', accent: false },
    { text: 'DEVELOPER', accent: true },
  ],
  [
    { text: 'BY', accent: true },
    { text: 'OBSESSION.', accent: true },
  ],
  [
    { text: 'BUILDER', accent: false },
    { text: 'BY', accent: false },
    { text: 'CHOICE.', accent: false },
  ],
];

function ScrollWord({ text, accent, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.22em] ${
        accent ? 'text-[#ff521b]' : 'text-white'
      }`}
    >
      {text}
    </motion.span>
  );
}

export default function StatementSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // 00:05 — Progressive word-by-word scroll illumination
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.88', 'center 0.36'],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 1200;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const arm = i % 3;
      const radius = Math.pow(Math.random(), 0.72) * 440 + 48;
      const angle = (arm * Math.PI * 2) / 3 + radius * 0.011 + (Math.random() - 0.5) * 1.3;
      const speed = (0.00045 + (1 / (radius + 60)) * 0.075) * (Math.random() * 0.5 + 0.75);
      const huePick = Math.random();
      let color = 'rgba(200, 210, 255, 0.55)';
      if (huePick < 0.25) color = 'rgba(255, 92, 38, 0.72)';
      else if (huePick < 0.55) color = 'rgba(99, 102, 241, 0.65)';
      else if (huePick < 0.78) color = 'rgba(56, 189, 248, 0.65)';
      return {
        radius,
        angle,
        speed,
        size: Math.random() * 1.7 + 0.45,
        color,
        zTilt: (Math.random() - 0.5) * 0.45,
      };
    });

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.68 + mouseRef.current.x * 26;
      const cy = h * 0.44 + mouseRef.current.y * 20;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius * 1.15;
        const y = cy + Math.sin(p.angle) * p.radius * (0.72 + p.zTilt * 0.25);

        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;

        ctx.fillStyle = p.color;
        ctx.fillRect(x, y, p.size, p.size);
      }

      const voidGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 92);
      voidGrad.addColorStop(0, 'rgba(5, 5, 8, 0.96)');
      voidGrad.addColorStop(0.65, 'rgba(5, 5, 8, 0.55)');
      voidGrad.addColorStop(1, 'rgba(5, 5, 8, 0)');
      ctx.fillStyle = voidGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 92, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const totalWords = MANIFESTO_LINES.reduce((acc, l) => acc + l.length, 0);
  let wordCursor = 0;

  return (
    <section
      ref={sectionRef}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }}
      className="relative w-full min-h-[72vh] sm:min-h-[88vh] bg-[#050508] overflow-hidden flex flex-col justify-between px-5 sm:px-10 lg:px-14 pt-20 sm:pt-24 pb-12 border-t border-white/[0.06]"
    >
      {/* Subtle architectural dark grid echoing 00:04 */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Warm crimson left aura + deep cobalt right nebula */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 8% 58%, rgba(168, 32, 10, 0.34), transparent 65%), radial-gradient(ellipse 55% 65% at 88% 72%, rgba(45, 52, 156, 0.32), transparent 68%)',
        }}
      />

      {/* Swirling cosmic particle galaxy canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
      />

      {/* Top (01) POSITION micro-tag matching 00:05 */}
      <div className="relative z-10 max-w-[1380px] mx-auto w-full font-mono-tech text-[11px] tracking-[0.22em] text-white/40 uppercase">
        (01) POSITION
      </div>

      {/* Massive Condensed 3-Line Manifesto Headline with Word-by-Word Scroll Illumination */}
      <div className="relative z-10 max-w-[1380px] mx-auto w-full my-auto py-8 sm:py-10">
        <h2 className="font-display uppercase text-[clamp(2.4rem,10.5vw,7.2rem)] leading-[0.95] tracking-[0.01em] select-none">
          {MANIFESTO_LINES.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((w) => {
                const start = (wordCursor / totalWords) * 0.82;
                const end = start + 0.22;
                wordCursor += 1;
                return (
                  <ScrollWord
                    key={`${lineIdx}-${w.text}-${wordCursor}`}
                    text={w.text}
                    accent={w.accent}
                    progress={scrollYProgress}
                    start={start}
                    end={Math.min(1, end)}
                  />
                );
              })}
            </span>
          ))}
        </h2>

        {/* Bottom Narrative & Micro-Credits Row */}
        <div className="mt-10 sm:mt-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="text-sm sm:text-base text-white/65 max-w-md leading-relaxed">
            {ANAND_PROFILE.bioShort}
          </p>

          <div className="flex flex-col md:items-end gap-1.5 font-mono-tech text-[11px] tracking-[0.2em] uppercase">
            <p className="text-white/45">
              SERVER ADMIN INTERN AT{' '}
              <span className="text-white font-semibold">HASHROOT</span>
            </p>
            <p className="text-white/45">
              MCA GRADUATE FROM{' '}
              <span className="text-white font-semibold">FISAT, KERALA</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto w-full pt-8 flex items-center justify-between font-mono-tech text-[11px] tracking-[0.22em] text-white/35 uppercase">
        <span>SCROLL TO ENTER CRAFT ↓</span>
        <span>01 / 03</span>
      </div>
    </section>
  );
}
