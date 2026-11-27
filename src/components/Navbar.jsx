import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ANAND_PROFILE } from '../data/anandData';

const NAV_ITEMS = [
  { id: 'craft', label: 'CRAFT' },
  { id: 'work', label: 'WORK' },
  { id: 'stack', label: 'STACK' },
  { id: 'about', label: 'ABOUT' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sectionIds = ['home', 'craft', 'work', 'stack', 'about', 'contact'];

    const updateActive = () => {
      setScrolled(window.scrollY > 40);

      const probeY = window.innerHeight * 0.38;
      let matched = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          matched = id;
          break;
        }
      }

      if (NAV_ITEMS.some((n) => n.id === matched)) {
        setActiveSection(matched);
      } else if (matched === 'home') {
        setActiveSection('');
      } else if (matched === 'contact') {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive, { passive: true });
    updateActive();

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* Subtle mobile top fade when scrolled so fixed AA + LET'S TALK stay crisp over content */}
      <div
        aria-hidden="true"
        className={`sm:hidden absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050508]/88 via-[#050508]/45 to-transparent transition-opacity duration-300 pointer-events-none ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Signature rainbow/orange-cyan top scroll progress bar */}
      <div className="relative w-full h-[2.5px] bg-white/5 overflow-hidden">
        <motion.div
          style={{ scaleX }}
          className="h-full origin-left bg-gradient-to-r from-[#ff521b] via-[#f59e0b] via-[#38bdf8] to-[#6366f1]"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 pt-3 sm:pt-4 flex items-center justify-between gap-4">
        {/* Left Monogram */}
        <a
          href="#home"
          aria-label="Anand A Home"
          className={`pointer-events-auto inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full font-display text-base sm:text-lg tracking-wider transition-all duration-300 ${
            scrolled
              ? 'bg-black/80 text-white border border-white/18 backdrop-blur-md hover:border-white/40'
              : 'bg-black/40 text-white border border-white/20 backdrop-blur-md hover:bg-black/60'
          }`}
        >
          {ANAND_PROFILE.monogram}
        </a>

        {/* Center Floating Glass Pill Nav */}
        <nav
          aria-label="Primary Navigation"
          className="pointer-events-auto hidden sm:flex items-center gap-1 p-1.5 rounded-full bg-[#0b0c12]/80 border border-white/12 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full font-mono-tech text-[11px] font-semibold tracking-[0.16em] transition-colors duration-250 ${
                  isActive ? 'text-black' : 'text-white/65 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white shadow-sm -z-10"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Solid White Pill CTA */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <a
            href="#contact"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black font-mono-tech text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-[#ff521b] hover:text-white transition-all duration-300 shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
          >
            LET&apos;S TALK
          </a>
        </div>
      </div>

      {/* Compact Mobile Nav Pill (iOS Safe-Area & Android Bottom Bar Aligned) */}
      <nav
        aria-label="Mobile Navigation"
        style={{ bottom: 'max(0.75rem, calc(env(safe-area-inset-bottom) + 0.35rem))' }}
        className="pointer-events-auto sm:hidden fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[336px] flex items-center justify-between gap-1 p-1.5 rounded-full bg-[#0b0c12]/92 border border-white/18 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.75)]"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`flex-1 min-h-[36px] inline-flex items-center justify-center px-2.5 py-1.5 rounded-full font-mono-tech text-[10px] font-semibold tracking-[0.13em] transition-colors ${
                isActive ? 'bg-white text-black shadow-sm' : 'text-white/75 active:text-white'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
