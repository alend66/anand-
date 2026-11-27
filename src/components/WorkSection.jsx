import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  Scan,
  Radio,
  Server,
  Shield,
  Terminal,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { WORK_PROJECTS } from '../data/anandData';
import craftInfraImg from '../assets/craft-infra.jpg';
import craftFullstackImg from '../assets/craft-fullstack.jpg';
import craftAiImg from '../assets/craft-ai.jpg';

function SmartCartMockup() {
  return (
    <div className="relative w-full py-2 sm:py-0 sm:h-[350px] flex items-center justify-center select-none">
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

      {/* Left tilted phone: Live YOLOv8 Vision Scanner */}
      <div className="hidden sm:flex flex-col w-[150px] h-[260px] rounded-[24px] bg-[#0d1119] border border-white/12 p-3 -rotate-6 translate-x-6 translate-y-4 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between text-[9px] font-mono-tech text-white/45 mb-2">
          <span>CAM // YOLOV8</span>
          <span className="text-emerald-400">60 FPS</span>
        </div>
        <div className="relative flex-1 rounded-xl bg-gradient-to-br from-[#162033] to-[#0a0f18] border border-cyan-400/25 p-2.5 flex flex-col justify-between overflow-hidden">
          <div className="relative w-full h-24 rounded-lg border border-dashed border-cyan-400/80 bg-cyan-400/10 flex flex-col justify-between p-1.5">
            <span className="text-[8px] font-mono-tech bg-cyan-400 text-black font-bold px-1.5 py-0.5 rounded w-fit">
              ITEM_04 · 98.4%
            </span>
            <Scan className="w-6 h-6 text-cyan-300/80 self-center" />
            <span className="text-[8px] font-mono-tech text-cyan-200 text-right">DETECTED</span>
          </div>
          <div className="space-y-1.5 mt-2">
            <div className="h-2 w-4/5 rounded bg-white/15" />
            <div className="h-2 w-3/5 rounded bg-cyan-400/35" />
          </div>
        </div>
      </div>

      {/* Center flagship phone: Smart Cart Billing Dashboard */}
      <div className="relative z-10 flex flex-col w-full max-w-[260px] sm:w-[235px] min-h-[295px] h-auto sm:h-[325px] rounded-[26px] sm:rounded-[28px] bg-[#10131c] border border-white/18 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[9px] font-mono-tech uppercase tracking-widest text-cyan-400">
              SmartCart AI
            </p>
            <p className="text-xs font-semibold text-white">Auto Billing HUD</p>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400/80 flex items-center justify-center text-[9px] font-mono-tech font-bold text-cyan-300">
            JWT
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 mb-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-mono-tech text-white/45 uppercase">Cart Total</span>
            <span className="text-[9px] font-mono-tech text-emerald-400">SYNCED · MONGO</span>
          </div>
          <div className="font-display text-3xl text-white tracking-wide mt-1">
            ₹1,240<span className="text-sm text-white/40 font-sans">.00</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400" />
          </div>
        </div>

        <div className="space-y-2 flex-1">
          {[
            { name: 'Organic Coffee 250g', qty: 'x1', price: '₹480' },
            { name: 'Oat Protein Pack', qty: 'x2', price: '₹540' },
            { name: 'Sparkling Mineral', qty: 'x2', price: '₹220' },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[10px]"
            >
              <span className="text-white/85 truncate max-w-[115px]">{item.name}</span>
              <div className="flex items-center gap-2 font-mono-tech">
                <span className="text-cyan-400">{item.qty}</span>
                <span className="text-white font-semibold">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono-tech text-white/50">
          <span>FLASK + EXPRESS API</span>
          <span className="text-cyan-300">READY →</span>
        </div>
      </div>

      {/* Right tilted phone: REST Telemetry */}
      <div className="hidden sm:flex flex-col w-[150px] h-[260px] rounded-[24px] bg-[#0d1119] border border-white/12 p-3 rotate-6 -translate-x-6 translate-y-4 shadow-2xl">
        <p className="text-[9px] font-mono-tech text-white/45 mb-2">INVOICE // LIVE</p>
        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5 mb-2.5">
          <p className="text-[9px] text-white/50">Auth Token</p>
          <p className="text-[10px] font-mono-tech text-emerald-400 mt-0.5">VERIFIED ✓</p>
        </div>
        <div className="space-y-2 flex-1">
          <div className="p-2 rounded-lg bg-indigo-500/15 border border-indigo-400/25">
            <p className="text-[8px] font-mono-tech text-indigo-300">YOLOv8 ENGINE</p>
            <p className="text-[11px] font-bold text-white mt-0.5">Real-Time CV</p>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/8">
            <p className="text-[8px] font-mono-tech text-white/45">DATABASE</p>
            <p className="text-[10px] font-semibold text-white/85 mt-0.5">MongoDB</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 00:11 — Direct visual homage to the "145+ ARCHITECTURE FLOW" infrastructure card!
function LinuxInfraMockup() {
  return (
    <div className="relative w-full py-4 sm:py-0 sm:h-[350px] flex flex-col justify-center px-1 sm:px-6 select-none">
      <div className="absolute right-8 top-8 w-72 h-72 rounded-full bg-indigo-500/16 blur-3xl pointer-events-none" />

      {/* Big Metric Header mirroring 00:11's "145+ SOURCE SYSTEMS" */}
      <div className="relative z-10 mb-5 sm:mb-7">
        <div className="font-display text-white text-4xl sm:text-6xl tracking-wide leading-none">
          24/7<span className="text-indigo-400">+</span>
        </div>
        <p className="font-mono-tech text-[9.5px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] text-white/45 uppercase mt-2">
          LINUX PRODUCTION HOSTING · HASHROOT
        </p>
      </div>

      {/* 3-Zone Server Hardening Architecture Diagram mirroring 00:11 */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-4">
        {[
          { zone: 'EDGE', title: 'CSF FIREWALL', sub: 'TCP/IP · DNS · DHCP', color: '#818cf8' },
          { zone: 'PROXY', title: 'NGINX / APACHE', sub: 'VHOSTS · SSL · PHP', color: '#38bdf8' },
          { zone: 'STORE', title: 'MYSQL & LINUX', sub: 'TUNING · BACKUPS', color: '#34d399' },
        ].map((node) => (
          <div
            key={node.zone}
            className="rounded-2xl bg-[#101320] border border-white/12 p-3 sm:p-3.5 flex sm:flex-col items-center sm:items-stretch justify-between gap-2"
          >
            <div className="flex items-center justify-between gap-2 sm:mb-3">
              <span
                className="font-mono-tech text-[9px] font-bold tracking-[0.18em]"
                style={{ color: node.color }}
              >
                {node.zone}
              </span>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}` }}
              />
            </div>
            <div className="text-right sm:text-left">
              <p className="text-xs font-bold text-white leading-tight">{node.title}</p>
              <p className="font-mono-tech text-[8.5px] text-white/45 mt-0.5 sm:mt-1">{node.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Governance / Audit Strip */}
      <div className="relative z-10 rounded-xl bg-white/[0.03] border border-white/10 px-2.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-1 font-mono-tech text-[8.5px] sm:text-[10px] tracking-[0.08em] sm:tracking-[0.18em] text-white/60">
        <span className="inline-flex items-center gap-1 text-indigo-300 whitespace-nowrap">
          <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> PROVISION
        </span>
        <span className="text-white/25">→</span>
        <span className="inline-flex items-center gap-1 text-cyan-300 whitespace-nowrap">
          <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> HARDEN
        </span>
        <span className="text-white/25">→</span>
        <span className="inline-flex items-center gap-1 text-emerald-300 whitespace-nowrap">
          <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> MONITOR
        </span>
      </div>
    </div>
  );
}

function NeedNShareMockup() {
  return (
    <div className="relative w-full py-2 sm:py-0 sm:h-[350px] flex items-center justify-center select-none">
      <div className="absolute w-72 h-72 rounded-full bg-cyan-500/14 blur-3xl pointer-events-none" />

      <div className="hidden sm:flex flex-col w-[155px] h-[255px] rounded-[24px] bg-[#0e121a] border border-white/12 p-3.5 -rotate-6 translate-x-6 translate-y-3 shadow-2xl">
        <div className="flex items-center gap-1.5 text-[9px] font-mono-tech text-cyan-400 mb-2">
          <Radio className="w-3.5 h-3.5" />
          <span>PIN NEARBY</span>
        </div>
        <div className="relative flex-1 rounded-xl bg-black/45 border border-cyan-500/20 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-cyan-500/25 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border border-cyan-400/45 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_16px_#22d3ee]" />
            </div>
          </div>
          <span className="absolute bottom-2 text-[9px] font-mono-tech text-white/70">
            PIN 691506 · 1.2km
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-[265px] sm:w-[245px] min-h-[295px] h-auto sm:h-[325px] rounded-[26px] sm:rounded-[28px] bg-[#10131b] border border-white/18 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[9px] font-mono-tech uppercase tracking-widest text-cyan-400">
              NeedNShare
            </p>
            <p className="text-xs font-semibold text-white">Community Hub</p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono-tech text-[9px] font-bold">
            URGENT
          </span>
        </div>

        <div className="space-y-2.5 flex-1">
          {[
            { item: 'Bosch Power Drill', tag: 'BORROW', dist: '400m' },
            { item: 'DSLR Tripod Stand', tag: 'LEND', dist: '950m' },
            { item: 'Extension Reel 15m', tag: 'URGENT', dist: '1.1km' },
          ].map((row) => (
            <div
              key={row.item}
              className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between"
            >
              <div>
                <p className="text-[11px] font-semibold text-white">{row.item}</p>
                <p className="text-[9px] font-mono-tech text-white/45 mt-0.5">
                  Nearby · {row.dist}
                </p>
              </div>
              <span className="px-2 py-1 rounded-lg bg-white/8 text-[8px] font-mono-tech text-cyan-300">
                {row.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 p-2.5 rounded-2xl bg-cyan-500/12 border border-cyan-500/30">
          <p className="text-[8px] font-mono-tech text-cyan-300 mb-1">LIVE CHAT · ONLINE</p>
          <p className="text-[10px] text-white/90">
            &ldquo;Available to pick up near Town Junction at 5 PM!&rdquo;
          </p>
        </div>
      </div>

      <div className="hidden sm:flex flex-col w-[155px] h-[255px] rounded-[24px] bg-[#0e121a] border border-white/12 p-3.5 rotate-6 -translate-x-6 translate-y-3 shadow-2xl">
        <p className="text-[9px] font-mono-tech text-white/45 mb-2">MERN STACK</p>
        <div className="space-y-2 flex-1">
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <p className="text-[9px] font-mono-tech text-emerald-400">SECURE LOGIN</p>
            <p className="text-[10px] text-white/80 mt-1">Verified Members</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <p className="text-[9px] font-mono-tech text-cyan-400">REAL-TIME CHAT</p>
            <p className="text-[10px] text-white/80 mt-1">Instant Messaging</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <p className="text-[9px] font-mono-tech text-indigo-400">SMART FILTER</p>
            <p className="text-[10px] text-white/80 mt-1">PIN &amp; Urgency Sort</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 00:13 — Overlapping 3-card editorial portrait triptych!
function EditorialTriptychMockup() {
  return (
    <div className="relative w-full py-2 sm:py-0 sm:h-[360px] flex flex-col items-center justify-center select-none">
      <div className="relative flex items-center justify-center w-full h-[196px] sm:h-[275px]">
        <div className="absolute w-64 h-64 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />

        <div className="w-[82px] sm:w-[152px] h-[126px] sm:h-[212px] rounded-2xl overflow-hidden border border-white/12 -rotate-6 translate-x-4 sm:translate-x-7 shadow-2xl opacity-85">
          <img
            src={craftFullstackImg}
            alt="Anand Python & Django Engineering"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="relative z-10 w-[126px] sm:w-[192px] h-[176px] sm:h-[258px] rounded-2xl overflow-hidden border border-orange-400/35 shadow-[0_28px_70px_rgba(0,0,0,0.9)]">
          <img
            src={craftInfraImg}
            alt="Anand Systems & Security Engineering"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 via-black/45 to-transparent">
            <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-mono-tech text-orange-300 uppercase tracking-wider whitespace-nowrap">
              <Server className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" /> Django + Face ID
            </span>
          </div>
        </div>

        <div className="w-[82px] sm:w-[152px] h-[126px] sm:h-[212px] rounded-2xl overflow-hidden border border-white/12 rotate-6 -translate-x-4 sm:-translate-x-7 shadow-2xl opacity-85">
          <img
            src={craftAiImg}
            alt="Anand Computer Vision"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      <div className="mt-4 w-full max-w-[430px] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-orange-500/25 flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-[#ff521b] shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-white truncate">Criminal Face ID</p>
            <p className="text-[9px] font-mono-tech text-white/55 truncate">
              BCA Project · Django/SQLite
            </p>
          </div>
        </div>
        <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-white truncate">Cyberia Softwares</p>
            <p className="text-[9px] font-mono-tech text-white/55 truncate">
              Python Intern · Jul–Sep 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 00:10–00:13 — Sticky Stacking Card (active on md+ desktop; full-opacity clean cards on Android/iOS phones!)
function StackingWorkCard({ project, index, total, renderMockup }) {
  const wrapperRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start 12%', 'end 12%'],
  });

  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.42]);

  return (
    <div
      ref={wrapperRef}
      className="md:sticky"
      style={{
        top: isDesktop ? `${84 + index * 14}px` : undefined,
        zIndex: 10 + index,
      }}
    >
      <motion.article
        style={
          isDesktop
            ? { scale, opacity, transformOrigin: 'top center' }
            : undefined
        }
        className="group relative rounded-[24px] sm:rounded-[28px] bg-[#0b0c12] border border-white/[0.11] hover:border-white/22 p-5 sm:p-10 lg:p-12 overflow-hidden shadow-[0_-18px_60px_rgba(0,0,0,0.85)] transition-colors duration-500"
      >
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-12 group-hover:opacity-22 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: project.accent }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-7 lg:gap-8">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p
                className="font-mono-tech text-xs font-bold tracking-[0.2em] mb-3"
                style={{ color: project.accent }}
              >
                {project.number}
              </p>
              <p className="font-mono-tech text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-white/45 mb-2.5">
                {project.category}
              </p>
              <h3 className="font-display text-white uppercase text-[clamp(2.15rem,9.5vw,3.7rem)] sm:text-5xl xl:text-[3.7rem] leading-[0.96] tracking-[0.01em] mb-4">
                {project.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-white/62 leading-relaxed max-w-xl mb-6 sm:mb-7">
                {project.description}
              </p>
            </div>

            <div className="border-t border-white/10 pt-5 space-y-4 sm:space-y-3.5">
              <div className="flex flex-col sm:grid sm:grid-cols-12 sm:items-baseline gap-1 sm:gap-2">
                <span className="sm:col-span-3 font-mono-tech text-[10px] tracking-[0.18em] uppercase text-white/40">
                  ROLE
                </span>
                <span className="sm:col-span-9 text-xs sm:text-sm font-medium text-white/90">
                  {project.role}
                </span>
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-12 sm:items-start gap-2">
                <span className="sm:col-span-3 font-mono-tech text-[10px] tracking-[0.18em] uppercase text-white/40 sm:pt-1">
                  BUILT WITH
                </span>
                <div className="sm:col-span-9 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 font-mono-tech text-[10px] tracking-[0.12em] text-white/75 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={project.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] font-semibold tracking-[0.16em] uppercase pb-1 border-b transition-all hover:gap-2.5"
                  style={{
                    color: project.accent,
                    borderColor: `${project.accent}66`,
                  }}
                >
                  {project.linkLabel}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Bespoke Visual Column */}
          <div className="lg:col-span-6 flex items-center justify-center">
            {renderMockup(project.mockupType)}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function WorkSection() {
  const renderMockup = (type) => {
    switch (type) {
      case 'smartcart':
        return <SmartCartMockup />;
      case 'infra':
        return <LinuxInfraMockup />;
      case 'neednshare':
        return <NeedNShareMockup />;
      default:
        return <EditorialTriptychMockup />;
    }
  };

  return (
    <section
      id="work"
      className="relative w-full bg-[#050508] py-20 sm:py-32 px-5 sm:px-10 lg:px-14 border-t border-white/[0.06]"
    >
      <div className="max-w-[1380px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16"
        >
          <p className="font-mono-tech text-[11px] tracking-[0.22em] text-white/45 uppercase mb-4">
            (03) SELECTED WORK
          </p>
          <h2 className="font-display uppercase text-[clamp(2.55rem,10.8vw,7.5rem)] leading-[1.02] sm:leading-[0.92] tracking-[0.01em] select-none">
            <span className="text-white">BUILT, SHIPPED, </span>
            <span className="text-outline-white">RUNNING.</span>
          </h2>
        </motion.div>

        {/* Sticky Stacking Deck — each card glides up smoothly over the previous one (00:11–00:13!) */}
        <div className="flex flex-col gap-7 sm:gap-14 pb-10">
          {WORK_PROJECTS.map((project, idx) => (
            <StackingWorkCard
              key={project.number}
              project={project}
              index={idx}
              total={WORK_PROJECTS.length}
              renderMockup={renderMockup}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
