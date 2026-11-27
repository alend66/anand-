import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Copy,
  Check,
  Download,
  Award,
  GraduationCap,
  Send,
} from 'lucide-react';
import {
  ANAND_PROFILE,
  CERTIFICATIONS,
  EDUCATION_TIMELINE,
  PERSONAL_DETAILS,
} from '../data/anandData';
import { AboutParticleBust, ContactParticleSphere } from './ParticleAmbientCanvas';

export default function AboutContactSection() {
  const [copied, setCopied] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sentNotice, setSentNotice] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(ANAND_PROFILE.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Anand,\n\n${form.message}\n\nBest regards,\n${form.name}\nEmail: ${form.email}`
    );
    setSentNotice(
      `Thanks ${form.name}! Launching your email client — or reach me directly at ${ANAND_PROFILE.email}.`
    );
    window.location.href = `mailto:${ANAND_PROFILE.email}?subject=${subject}&body=${body}`;
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative w-full bg-[#050508] overflow-hidden border-t border-white/[0.06]">
      {/* SECTION 05: ABOUT — 00:16 Massive 3D Particle Bust Portrait of Anand (Left) + Editorial Precision Headline (Right) */}
      <section
        id="about"
        className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden px-5 sm:px-10 lg:px-14 pt-20 sm:pt-32 pb-16 sm:pb-20"
      >
        {/* Subtle cosmic blue left aura behind Particle Bust */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 52% 62% at 24% 48%, rgba(28, 78, 138, 0.24), transparent 68%), radial-gradient(ellipse 48% 55% at 78% 42%, rgba(45, 55, 135, 0.14), transparent 65%)',
          }}
        />
        <div className="absolute inset-0 noise-overlay opacity-35 pointer-events-none" />

        <div className="relative z-10 max-w-[1380px] mx-auto w-full">
          {/* Primary 00:16 Split Hero Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 mb-14 sm:mb-20">
            {/* Left: Massive 3D Shimmering Particle Bust Silhouette (00:16!) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <AboutParticleBust />
            </div>

            {/* Right: ENGINEERING PRECISION. / CREATIVE INSTINCT. + Editorial Bio + 3-Col Strip */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <p className="font-mono-tech text-[11px] tracking-[0.22em] text-white/45 uppercase mb-4">
                (05) ABOUT
              </p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7 }}
                className="font-display uppercase text-[clamp(2.3rem,9.8vw,5.8rem)] leading-[1.02] sm:leading-[0.92] tracking-[0.01em] mb-6 sm:mb-7 select-none"
              >
                <span className="text-white block">ENGINEERING</span>
                <span className="text-white block">PRECISION.</span>
                <span className="text-outline-white block">CREATIVE INSTINCT.</span>
              </motion.h2>

              <p className="text-sm sm:text-[15px] text-white/65 leading-relaxed max-w-xl mb-5">
                {ANAND_PROFILE.aboutParagraph}
              </p>

              <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
                {ANAND_PROFILE.philosophyTop}
              </p>
              <p className="text-sm sm:text-base text-white/55 leading-relaxed mb-7 sm:mb-8">
                {ANAND_PROFILE.philosophyBottom}
              </p>

              {/* Hairline 3-Column Metadata Strip mirroring 00:16 */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 py-5 border-y border-white/12">
                <div className="min-w-0">
                  <p className="font-mono-tech text-[8px] min-[390px]:text-[8.5px] sm:text-[9px] tracking-[0.11em] sm:tracking-[0.2em] uppercase text-white/40 mb-1 truncate">
                    CURRENT ROLE
                  </p>
                  <p className="text-[11px] sm:text-sm font-semibold text-white truncate">Hashroot</p>
                </div>
                <div className="min-w-0">
                  <p className="font-mono-tech text-[8px] min-[390px]:text-[8.5px] sm:text-[9px] tracking-[0.11em] sm:tracking-[0.2em] uppercase text-white/40 mb-1 truncate">
                    DEGREE
                  </p>
                  <p className="text-[11px] sm:text-sm font-semibold text-white truncate">
                    FISAT · MCA
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="font-mono-tech text-[8px] min-[390px]:text-[8.5px] sm:text-[9px] tracking-[0.11em] sm:tracking-[0.2em] uppercase text-white/40 mb-1 truncate">
                    BASED IN
                  </p>
                  <p className="text-[11px] sm:text-sm font-semibold text-white truncate">Kerala, India</p>
                </div>
              </div>

              {/* Compact Soft Skills / Interests / Languages Row */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-tech text-[10px] tracking-[0.16em] uppercase text-white/50">
                <span>
                  LANGUAGES:{' '}
                  <strong className="text-white/85 font-medium">
                    {PERSONAL_DETAILS.languages.join(' · ')}
                  </strong>
                </span>
                <span>
                  INTERESTS:{' '}
                  <strong className="text-white/85 font-medium">
                    {PERSONAL_DETAILS.hobbies.join(' · ')}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* Education Timeline & 5 Verified Certifications Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Academic Background (Corrected Spelling) */}
            <div className="lg:col-span-5 rounded-[24px] bg-[#0b0c12]/90 border border-white/10 p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#ff521b] shrink-0" />
                  <h3 className="font-mono-tech text-xs tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white font-semibold">
                    EDUCATION
                  </h3>
                </div>
                <span className="font-mono-tech text-[10px] text-white/40">2018 — 2026</span>
              </div>

              <div className="space-y-3">
                {EDUCATION_TIMELINE.map((edu) => (
                  <div
                    key={edu.degree}
                    className={`rounded-2xl p-4 border transition-colors ${
                      edu.highlight
                        ? 'bg-[#ff521b]/[0.08] border-[#ff521b]/30'
                        : 'bg-white/[0.02] border-white/[0.08] hover:border-white/18'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-white leading-snug">
                        {edu.degree}
                      </h4>
                      <span className="shrink-0 px-2 py-0.5 rounded bg-white/10 font-mono-tech text-[10px] font-bold text-[#ff7849]">
                        {edu.score}
                      </span>
                    </div>
                    <p className="text-xs text-white/65">{edu.institution}</p>
                    <p className="font-mono-tech text-[10px] text-white/40 mt-1.5">
                      {edu.location} · {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Verified Certifications + Soft Skills */}
            <div className="lg:col-span-7 rounded-[24px] bg-[#0b0c12]/90 border border-white/10 p-5 sm:p-7 flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                    <h3 className="font-mono-tech text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase text-white font-semibold">
                      VERIFIED CERTIFICATIONS
                    </h3>
                  </div>
                  <span className="font-mono-tech text-[9.5px] sm:text-[10px] text-cyan-400/80 whitespace-nowrap">
                    <span className="sm:hidden">TAP TO VERIFY ↗</span>
                    <span className="hidden sm:inline">CLICK TO VERIFY ↗</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CERTIFICATIONS.map((cert) => (
                    <a
                      key={cert.title}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-2xl p-4 bg-white/[0.02] border border-white/[0.08] hover:border-cyan-400/45 hover:bg-cyan-400/[0.04] transition-all flex flex-col justify-between gap-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono-tech text-[9px] tracking-[0.18em] uppercase text-cyan-400">
                            {cert.issuer}
                          </span>
                          <h4 className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors mt-0.5 leading-snug">
                            {cert.title}
                          </h4>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-cyan-300 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="text-[11px] text-white/50 leading-relaxed">{cert.focus}</p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-white/40 mr-2">
                  SOFT SKILLS:
                </span>
                {PERSONAL_DETAILS.softSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 font-mono-tech text-[10px] text-white/75"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: CONTACT — 00:17 Massive Glowing Amber-Orange 3D Particle Sphere + Iconic 4-Line CTA */}
      <section
        id="contact"
        className="relative w-full min-h-[82vh] sm:min-h-[92vh] flex flex-col justify-center overflow-hidden px-5 sm:px-10 lg:px-14 pt-20 sm:pt-24 pb-20 sm:pb-24 border-t border-white/[0.06]"
      >
        {/* 00:17 — Massive Rotating Amber-Orange 3D Particle Planet / Orb */}
        <ContactParticleSphere />

        <div className="relative z-10 max-w-[1380px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="font-mono-tech text-[11px] tracking-[0.22em] text-white/45 uppercase mb-5">
              (06) CONTACT
            </p>

            {/* 00:17 Signature 4-Line Massive Solid + Outlined Display Headline */}
            <h2 className="font-display uppercase text-[clamp(2.3rem,9.6vw,7.4rem)] leading-[1.02] sm:leading-[0.93] tracking-[0.01em] select-none mb-7 sm:mb-10">
              <span className="text-white block">HAVE A SYSTEM TO</span>
              <span className="block">
                <span className="text-white">BUILD </span>
                <span className="text-outline-white">OR AN</span>
              </span>
              <span className="text-outline-white block">EXPERIENCE TO</span>
              <span className="text-outline-white block">CREATE?</span>
            </h2>

            {/* 00:17 Direct Luminous Underlined Email CTA + Copy */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3.5 sm:gap-4 mb-7 sm:mb-8">
              <a
                href={`mailto:${ANAND_PROFILE.email}`}
                className="group inline-flex items-center gap-2 sm:gap-3 text-[13px] min-[390px]:text-[15px] sm:text-xl font-medium text-white pb-2 border-b-2 border-[#ff521b] hover:text-[#ff7849] transition-colors max-w-full"
              >
                <span className="truncate">{ANAND_PROFILE.email}</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff521b] shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="px-3.5 py-2 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/12 font-mono-tech text-[10px] tracking-[0.16em] text-white/80 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> COPY EMAIL
                  </>
                )}
              </button>
            </div>

            {/* Direct Channels & Toggleable Quick Message Form (aligned 2x2 grid on phones, inline row on sm+) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 max-w-md sm:max-w-none">
              <a
                href={ANAND_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 sm:px-4 py-2.5 rounded-full bg-black/55 hover:bg-white hover:text-black border border-white/15 backdrop-blur-md font-mono-tech text-[10.5px] sm:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.14em] uppercase inline-flex items-center justify-center gap-1.5 transition-all"
              >
                LINKEDIN <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>
              <a
                href={ANAND_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 sm:px-4 py-2.5 rounded-full bg-black/55 hover:bg-white hover:text-black border border-white/15 backdrop-blur-md font-mono-tech text-[10.5px] sm:text-[11px] font-semibold tracking-[0.12em] sm:tracking-[0.14em] uppercase inline-flex items-center justify-center gap-1.5 transition-all"
              >
                GITHUB <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>
              <a
                href={ANAND_PROFILE.resumePath}
                download="Anand_A_Resume.pdf"
                className="px-3.5 sm:px-4 py-2.5 rounded-full bg-[#ff521b] hover:bg-white text-white hover:text-black font-mono-tech text-[10.5px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.14em] uppercase inline-flex items-center justify-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5 shrink-0" /> RESUME PDF
              </a>
              <button
                type="button"
                onClick={() => setShowComposer((prev) => !prev)}
                className="px-3.5 sm:px-4 py-2.5 rounded-full bg-white text-black hover:bg-[#ff521b] hover:text-white font-mono-tech text-[10.5px] sm:text-[11px] font-bold tracking-[0.12em] sm:tracking-[0.14em] uppercase inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{showComposer ? 'HIDE FORM' : 'MESSAGE'}</span>
              </button>
            </div>

            {/* Clean Expandable Dark Glass Message Composer */}
            {showComposer && (
              <motion.form
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="mt-8 max-w-2xl rounded-[24px] bg-[#0b0c12]/90 border border-white/14 backdrop-blur-xl p-5 sm:p-8 space-y-5 shadow-2xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono-tech text-[10px] tracking-[0.18em] uppercase text-white/45 mb-2"
                    >
                      YOUR NAME
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Alex Rivera"
                      className="w-full rounded-xl bg-white/[0.04] border border-white/12 focus:border-[#ff521b] focus:outline-none px-4 py-3 text-base sm:text-sm text-white placeholder:text-white/25 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono-tech text-[10px] tracking-[0.18em] uppercase text-white/45 mb-2"
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full rounded-xl bg-white/[0.04] border border-white/12 focus:border-[#ff521b] focus:outline-none px-4 py-3 text-base sm:text-sm text-white placeholder:text-white/25 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono-tech text-[10px] tracking-[0.18em] uppercase text-white/45 mb-2"
                  >
                    PROJECT / ROLE DETAILS
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about the role, system, or project you have in mind..."
                    className="w-full rounded-xl bg-white/[0.04] border border-white/12 focus:border-[#ff521b] focus:outline-none px-4 py-3 text-base sm:text-sm text-white placeholder:text-white/25 resize-none transition-colors"
                  />
                </div>

                {sentNotice && (
                  <div className="px-4 py-3 rounded-xl bg-emerald-500/12 border border-emerald-400/30 text-xs text-emerald-300 font-medium">
                    {sentNotice}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <span className="font-mono-tech text-[10px] tracking-[0.16em] uppercase text-white/40">
                    IST (UTC+5:30) · KERALA, INDIA
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black hover:bg-[#ff521b] hover:text-white font-mono-tech text-xs font-bold tracking-[0.16em] uppercase inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    SEND MESSAGE <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Clean Minimal Footer (generous iOS safe-area & Android bottom nav clearance) */}
      <footer className="footer-safe-pad relative z-10 border-t border-white/[0.08] px-5 sm:px-10 lg:px-14 bg-[#050508]">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 font-mono-tech text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/45 text-center sm:text-left">
          <div className="flex items-center justify-center gap-3">
            <span className="font-display text-lg text-white tracking-wider">
              {ANAND_PROFILE.monogram}
            </span>
            <span>© 2026 ANAND A · KERALA, INDIA</span>
          </div>
          <a href="#home" className="py-1 hover:text-white transition-colors">
            BACK TO TOP ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
