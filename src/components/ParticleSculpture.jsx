import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 2600;

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Helper to place a particle uniformly along a 3D rectangle frame
function sampleRectFrame(cx, cy, cz, w, h) {
  const side = Math.floor(Math.random() * 4);
  const t = Math.random() * 2 - 1;
  const jitter = () => (Math.random() - 0.5) * 0.035;
  if (side === 0) return [cx + t * w, cy - h, cz + jitter()];
  if (side === 1) return [cx + t * w, cy + h, cz + jitter()];
  if (side === 2) return [cx - w, cy + t * h, cz + jitter()];
  return [cx + w, cy + t * h, cz + jitter()];
}

function generateShapePoints(shapeType) {
  const pts = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let x = 0;
    let y = 0;
    let z = 0;

    if (shapeType === 'blueprint') {
      // 00:07 — Coral-Red 3D Wireframe Architectural Layout Blueprint
      const p = i % 20;
      if (p < 5) {
        // Outer browser/viewport frame (front + back depth shell)
        const depthZ = p % 2 === 0 ? 0.22 : -0.22;
        [x, y, z] = sampleRectFrame(0, 0, depthZ, 1.48, 0.92);
      } else if (p < 7) {
        // Top header bar + window control dots
        if (Math.random() < 0.72) {
          x = (Math.random() * 2 - 1) * 1.45;
          y = -0.68 + (Math.random() - 0.5) * 0.035;
          z = 0.24;
        } else {
          const a = Math.random() * Math.PI * 2;
          const r = 0.26 + (Math.random() - 0.5) * 0.04;
          x = -1.16 + Math.cos(a) * r;
          y = -0.56 + Math.sin(a) * r;
          z = 0.34;
        }
      } else if (p < 13) {
        // Modular bento grid cards inside the wireframe
        const cards = [
          [-0.78, 0.14, 0.54, 0.62],
          [0.12, -0.15, 0.3, 0.36],
          [0.86, -0.15, 0.42, 0.36],
          [0.12, 0.52, 0.3, 0.24],
          [0.86, 0.52, 0.42, 0.24],
        ];
        const card = cards[i % cards.length];
        const zOff = (i % 3 === 0 ? 0.14 : -0.06) + (Math.random() - 0.5) * 0.04;
        [x, y, z] = sampleRectFrame(card[0], card[1], zOff, card[2], card[3]);
      } else if (p < 17) {
        // Diagonal wireframe diagonals & interior grid mesh lines
        const t = Math.random() * 2 - 1;
        if (p % 2 === 0) {
          x = t * 1.42;
          y = (Math.floor(Math.random() * 5) - 2) * 0.36;
        } else {
          x = (Math.floor(Math.random() * 7) - 3) * 0.44;
          y = t * 0.88;
        }
        z = (Math.random() - 0.5) * 0.28;
      } else {
        // Depth connector struts linking front & back wireframe planes
        const corners = [
          [-1.48, -0.92],
          [1.48, -0.92],
          [-1.48, 0.92],
          [1.48, 0.92],
          [0, 0],
        ];
        const c = corners[i % corners.length];
        x = c[0] + (Math.random() - 0.5) * 0.05;
        y = c[1] + (Math.random() - 0.5) * 0.05;
        z = (Math.random() * 2 - 1) * 0.26;
      }
    } else if (shapeType === 'neural') {
      // 00:08 — Glowing Cyan 3D Neural Head Bust + Dual Tilted Orbital Telemetry Rings
      const part = i % 24;
      if (part < 11) {
        // Cranium & sculpted AI head ellipsoid
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(2 * Math.random() - 1);
        const r = 0.68 + (Math.random() - 0.5) * 0.055;
        x = r * Math.sin(v) * Math.cos(u) * 0.82;
        y = r * Math.cos(v) * 1.04 - 0.18;
        z = r * Math.sin(v) * Math.sin(u) * 0.92;
      } else if (part < 16) {
        // Neck & sculptural bust shoulders
        const t = Math.random();
        if (t < 0.36) {
          const a = Math.random() * Math.PI * 2;
          const h = Math.random() * 0.36;
          const r = 0.24 + h * 0.24;
          x = Math.cos(a) * r;
          y = 0.44 + h;
          z = Math.sin(a) * r;
        } else {
          const u = Math.random() * 2 - 1;
          const a = Math.random() * Math.PI * 2;
          const radX = 1.08 * Math.sqrt(1 - u * u * 0.35);
          x = u * radX;
          y = 0.78 + Math.abs(u) * 0.16 + (Math.random() - 0.5) * 0.16;
          z = Math.sin(a) * 0.36;
        }
      } else if (part < 19) {
        // Orbital Ring 1 (angled +28 deg)
        const a = Math.random() * Math.PI * 2;
        const r = 1.46 + (Math.random() - 0.5) * 0.06;
        const rx = Math.cos(a) * r;
        const ry = Math.sin(a) * r * 0.34;
        const rz = Math.sin(a) * r * 0.85;
        const c = Math.cos(0.46);
        const s = Math.sin(0.46);
        x = rx * c - ry * s;
        y = rx * s + ry * c;
        z = rz;
      } else if (part < 22) {
        // Orbital Ring 2 (angled -32 deg)
        const a = Math.random() * Math.PI * 2;
        const r = 1.32 + (Math.random() - 0.5) * 0.06;
        const rx = Math.cos(a) * r;
        const ry = Math.sin(a) * r * 0.38;
        const rz = Math.sin(a) * r * 0.82;
        const c = Math.cos(-0.56);
        const s = Math.sin(-0.56);
        x = rx * c - ry * s;
        y = rx * s + ry * c;
        z = rz;
      } else {
        // Luminous vision beacon orb near crown
        const a = Math.random() * Math.PI * 2;
        const v = Math.acos(2 * Math.random() - 1);
        const r = 0.16;
        x = -0.34 + r * Math.sin(v) * Math.cos(a);
        y = -0.82 + r * Math.cos(v);
        z = 0.44 + r * Math.sin(v) * Math.sin(a);
      }
    } else {
      // 00:09 — Stacked 3D Server / Database Cylinders + Flowing Network Pipelines Left & Right!!
      const part = i % 20;
      if (part < 11) {
        // 3 stacked glowing database/server cylinders in center
        const tier = i % 3; // 0 = top, 1 = mid, 2 = bottom
        const cy = (tier - 1) * 0.56;
        const a = Math.random() * Math.PI * 2;
        const isRim = Math.random() < 0.52;
        const r = isRim
          ? 0.52 + (Math.random() - 0.5) * 0.04
          : Math.sqrt(Math.random()) * 0.5;
        const h = isRim
          ? (Math.random() - 0.5) * 0.34
          : (Math.random() < 0.5 ? -0.17 : 0.17) + (Math.random() - 0.5) * 0.03;
        x = Math.cos(a) * r;
        y = cy + h;
        z = Math.sin(a) * r;
      } else {
        // 4 curved glowing data-stream pipes entering from left & exiting right (matching 00:09!)
        const isRight = part >= 15;
        const lane = i % 4; // 4 vertical lanes
        const t = Math.random(); // 0 at cylinder edge -> 1 at outer viewport edge
        const dir = isRight ? 1 : -1;
        const startY = (lane - 1.5) * 0.36;
        const endY = (lane - 1.5) * 0.64;
        // Smooth S-curve bend into cylinder cluster
        const blend = t * t * (3 - 2 * t);
        x = dir * (0.52 + t * 1.42);
        y = startY + (endY - startY) * blend + Math.sin(t * 7 + lane) * 0.04;
        // Cylindrical tube cross-section thickness
        const tubeAngle = Math.random() * Math.PI * 2;
        const tubeR = 0.055 * Math.random();
        y += Math.cos(tubeAngle) * tubeR;
        z = Math.sin(tubeAngle) * tubeR + (lane % 2 === 0 ? 0.14 : -0.14);
      }
    }

    pts[i * 3] = x;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = z;
  }

  return pts;
}

const SHAPE_CACHE = {
  blueprint: generateShapePoints('blueprint'),
  neural: generateShapePoints('neural'),
  pipeline: generateShapePoints('pipeline'),
};

export default function ParticleSculpture({ shapeType, accentHex }) {
  const canvasRef = useRef(null);
  const targetShapeRef = useRef(shapeType);
  const targetColorRef = useRef(hexToRgb(accentHex));
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    targetShapeRef.current = shapeType;
    targetColorRef.current = hexToRgb(accentHex);
  }, [shapeType, accentHex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const currentPos = new Float32Array(
      SHAPE_CACHE[targetShapeRef.current] || SHAPE_CACHE.blueprint
    );
    const currentRgb = [...targetColorRef.current];
    let rotY = 0;
    let rotX = 0.12;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.025;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const activeShape = targetShapeRef.current;
      const targetPos = SHAPE_CACHE[activeShape] || SHAPE_CACHE.blueprint;
      const targetRgb = targetColorRef.current;

      for (let c = 0; c < 3; c++) {
        currentRgb[c] += (targetRgb[c] - currentRgb[c]) * 0.07;
      }

      // Pipelines look best with subtle gentle yaw oscillation; neural & blueprint rotate smoothly
      if (activeShape === 'pipeline') {
        rotY = Math.sin(time * 0.35) * 0.32;
      } else if (activeShape === 'blueprint') {
        rotY = Math.sin(time * 0.42) * 0.36;
      } else {
        rotY += 0.0045;
      }

      const desiredRotX = 0.1 + pointerRef.current.y * 0.28;
      rotX += (desiredRotX - rotX) * 0.06;

      const angleY = rotY + pointerRef.current.x * 0.48;
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const scale =
        activeShape === 'pipeline'
          ? Math.min(w * 0.22, h * 0.3)
          : Math.min(w * 0.27, h * 0.31);
      const fov = 3.4;

      const rCol = Math.round(currentRgb[0]);
      const gCol = Math.round(currentRgb[1]);
      const bCol = Math.round(currentRgb[2]);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        currentPos[idx] += (targetPos[idx] - currentPos[idx]) * 0.08;
        currentPos[idx + 1] += (targetPos[idx + 1] - currentPos[idx + 1]) * 0.08;
        currentPos[idx + 2] += (targetPos[idx + 2] - currentPos[idx + 2]) * 0.08;

        let px = currentPos[idx];
        const py = currentPos[idx + 1];
        const pz = currentPos[idx + 2];

        // Subtle live data-packet flow pulse along pipeline streams
        const isFlowParticle = activeShape === 'pipeline' && i % 20 >= 11;
        if (isFlowParticle) {
          px += Math.sin(time * 2.2 + i * 0.13) * 0.03;
        }

        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        const depth = fov / (fov - z2 * 0.68);
        const sx = cx + x1 * scale * depth;
        const sy = cy + y2 * scale * depth;

        const alpha = Math.max(0.16, Math.min(0.96, (z2 + 1.45) * 0.38));
        const size = Math.max(0.95, depth * 1.4);

        if ((z2 > 0.62 && i % 5 === 0) || (isFlowParticle && i % 17 === 0)) {
          ctx.fillStyle = `rgba(230, 245, 255, ${alpha * 0.92})`;
        } else {
          ctx.fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, ${alpha})`;
        }
        ctx.fillRect(sx, sy, size, size);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        pointerRef.current = { x: 0, y: 0 };
      }}
      className="relative w-full h-[250px] sm:h-[400px] lg:h-[480px] select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
