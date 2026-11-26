import { useEffect, useRef } from 'react';
import anandParticleBust from '../assets/anand-particle-bust.jpg';

// 00:16 — High-Definition 3D Particle Point-Cloud Portrait of Anand A with Interactive 3D Tilt + Live Drifting Stardust!
export function AboutParticleBust() {
  const containerRef = useRef(null);
  const tiltRef = useRef(null);
  const sparkCanvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = sparkCanvasRef.current;
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

    // Subtle live floating cyan-white stardust sparks drifting off Anand's particle hair & shoulders
    const SPARKS = 110;
    const sparks = Array.from({ length: SPARKS }, () => ({
      x: 0.14 + Math.random() * 0.72,
      y: 0.08 + Math.random() * 0.84,
      vx: (Math.random() - 0.62) * 0.00055,
      vy: -(0.0002 + Math.random() * 0.00065),
      size: 0.9 + Math.random() * 1.7,
      phase: Math.random() * Math.PI * 2,
      bright: Math.random() < 0.35,
    }));

    let curRx = 0;
    let curRy = 0;
    let t = 0;

    const tick = () => {
      t += 0.018;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Gentle 3D parallax tilt following pointer or subtle breathing sway
      const targetRy = pointerRef.current.active
        ? pointerRef.current.x * 11
        : Math.sin(t * 0.55) * 3.2;
      const targetRx = pointerRef.current.active
        ? -pointerRef.current.y * 8
        : Math.cos(t * 0.45) * 2.0;

      curRy += (targetRy - curRy) * 0.08;
      curRx += (targetRx - curRx) * 0.08;

      if (tiltRef.current) {
        tiltRef.current.style.transform = `perspective(1100px) rotateX(${curRx.toFixed(2)}deg) rotateY(${curRy.toFixed(2)}deg) scale(1.02)`;
      }

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;

        if (s.y < 0.03 || s.x < 0.04 || s.x > 0.96) {
          s.x = 0.18 + Math.random() * 0.62;
          s.y = 0.2 + Math.random() * 0.7;
        }

        const pulse = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2.4 + s.phase));
        const edgeFade = Math.min(1, s.y * 3.5) * Math.min(1, (1 - s.y) * 3.2);
        const alpha = pulse * edgeFade * 0.8;

        ctx.fillStyle = s.bright
          ? `rgba(220, 246, 255, ${alpha.toFixed(2)})`
          : `rgba(88, 198, 255, ${(alpha * 0.85).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
          active: true,
        };
      }}
      onPointerLeave={() => {
        pointerRef.current = { x: 0, y: 0, active: false };
      }}
      className="relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] aspect-[3/4] mx-auto flex items-center justify-center select-none overflow-hidden"
    >
      {/* Soft ambient ice-blue hologram aura */}
      <div
        className="absolute inset-8 rounded-full blur-3xl opacity-35 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 48% 42%, rgba(56, 189, 248, 0.38), rgba(14, 42, 92, 0.14) 55%, transparent 75%)',
        }}
      />

      {/* 3D Tilting Anand Point-Cloud Portrait blended seamlessly into dark obsidian (#050508) */}
      <div
        ref={tiltRef}
        className="relative w-full h-full will-change-transform flex items-center justify-center"
        style={{
          maskImage:
            'radial-gradient(ellipse 78% 82% at 50% 45%, #000 58%, rgba(0,0,0,0.75) 76%, transparent 98%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 78% 82% at 50% 45%, #000 58%, rgba(0,0,0,0.75) 76%, transparent 98%)',
        }}
      >
        <img
          src={anandParticleBust}
          alt="Anand A — 3D Particle Point-Cloud Hologram Portrait"
          draggable={false}
          className="w-full h-full object-contain mix-blend-screen brightness-[1.06] contrast-[1.08]"
        />
      </div>

      {/* Live Animated Floating Cyan Stardust Overlay */}
      <canvas
        ref={sparkCanvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

// 00:17 — Massive Glowing Amber-Orange 3D Particle Sphere / Planet for the Contact Section!
export function ContactParticleSphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const COUNT = 2600;
    const pts = [];

    for (let i = 0; i < COUNT; i++) {
      const mode = i % 10;
      if (mode < 6) {
        const ring = i % 26;
        const lat = ((ring + 0.5) / 26) * Math.PI;
        const lon = Math.random() * Math.PI * 2;
        const r = 1.0 + (Math.random() - 0.5) * 0.03;
        pts.push({
          x: r * Math.sin(lat) * Math.cos(lon),
          y: r * Math.cos(lat),
          z: r * Math.sin(lat) * Math.sin(lon),
          size: Math.random() * 1.45 + 0.65,
          hot: Math.random() < 0.32,
        });
      } else if (mode < 9) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(2 * Math.random() - 1);
        const r = 1.0 + (Math.random() - 0.5) * 0.09;
        pts.push({
          x: r * Math.sin(v) * Math.cos(u),
          y: r * Math.cos(v),
          z: r * Math.sin(v) * Math.sin(u),
          size: Math.random() * 1.55 + 0.5,
          hot: Math.random() < 0.22,
        });
      } else {
        const a = Math.random() * Math.PI * 2;
        const r = 1.18 + Math.random() * 0.55;
        pts.push({
          x: Math.cos(a) * r,
          y: (Math.random() - 0.5) * 0.22 + Math.sin(a) * 0.28,
          z: Math.sin(a) * r,
          size: Math.random() * 1.2 + 0.45,
          hot: false,
        });
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let rotY = 0;
    const render = () => {
      rotY += 0.0022;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const isMobile = w < 640;
      const cx = isMobile ? w * 0.58 : w * 0.68;
      const cy = isMobile ? h * 0.36 : h * 0.52;
      const scale = Math.min(w, h) * (isMobile ? 0.38 : 0.42);
      const fov = 3.2;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(0.28);
      const sinX = Math.sin(0.28);

      const aura = ctx.createRadialGradient(cx, cy, scale * 0.1, cx, cy, scale * 1.25);
      aura.addColorStop(0, isMobile ? 'rgba(255, 102, 34, 0.15)' : 'rgba(255, 102, 34, 0.22)');
      aura.addColorStop(0.55, 'rgba(195, 58, 12, 0.08)');
      aura.addColorStop(1, 'rgba(5, 5, 8, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, scale * 1.25, 0, Math.PI * 2);
      ctx.fill();

      const mobileDim = isMobile ? 0.68 : 1;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const depth = fov / (fov - z2 * 0.65);
        const sx = cx + x1 * scale * depth;
        const sy = cy + y2 * scale * depth;

        const distFromCenter = Math.hypot(x1, y2);
        const rimBoost = Math.min(1, 0.35 + distFromCenter * 0.72);
        const alpha = Math.max(0.08, Math.min(0.92, (z2 + 1.35) * 0.36 * rimBoost)) * mobileDim;

        if (p.hot) {
          ctx.fillStyle = `rgba(255, 186, 118, ${alpha.toFixed(2)})`;
        } else {
          ctx.fillStyle = `rgba(255, 96, 36, ${(alpha * 0.85).toFixed(2)})`;
        }
        ctx.fillRect(sx, sy, p.size * depth * 0.82, p.size * depth * 0.82);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-95"
    />
  );
}
