import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Github, MapPin, Building2, Sparkles, Download, ExternalLink } from 'lucide-react';
import { profile } from '../data/projects';
import profileImg from '../assets/profile.png';

function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 150 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2, delay: Math.random() * 4,
      opacity: Math.random() * 0.6 + 0.1,
    })), []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.div key={s.id} className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.opacity, s.opacity * 0.15, s.opacity] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

function MeteorShower() {
  const meteors = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i, top: Math.random() * 50 + '%', left: (Math.random() * 80 + 20) + '%',
      delay: Math.random() * 8, duration: Math.random() * 1.5 + 0.8,
      size: Math.random() * 1.5 + 0.5,
    })), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map(m => (
        <motion.div key={m.id} className="absolute"
          style={{ top: m.top, left: m.left, width: m.size, height: m.size * 80 }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: [-0, -300], y: [0, 300], opacity: [0, 1, 1, 0] }}
          transition={{ duration: m.duration, delay: m.delay, repeat: Infinity, repeatDelay: Math.random() * 12 + 6 }}
        >
          <div className="w-full h-full bg-gradient-to-b from-white/60 to-transparent rounded-full transform rotate-[215deg]" />
        </motion.div>
      ))}
    </div>
  );
}

function TypewriterLoop({ texts }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    if (!deleting && displayed === current) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === '') {
      setDeleting(false);
      setIdx((p) => (p + 1) % texts.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
    }, deleting ? 25 : 55);
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, texts]);
  return (
    <span>
      {displayed}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}
        className="text-blue-400 ml-0.5 inline-block w-[2px] h-[1.1em] bg-blue-400 align-middle" />
    </span>
  );
}

function MagneticButton({ children, className, ...props }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };
  return (
    <motion.a style={{ x: springX, y: springY }}
      onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className} {...props}>{children}</motion.a>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);
  const orbX1 = useSpring(useTransform(mouseX, [0, 1], [-40, 40]), { stiffness: 50, damping: 30 });
  const orbY1 = useSpring(useTransform(mouseY, [0, 1], [-40, 40]), { stiffness: 50, damping: 30 });
  const orbX2 = useSpring(useTransform(mouseX, [0, 1], [40, -40]), { stiffness: 50, damping: 30 });
  const orbY2 = useSpring(useTransform(mouseY, [0, 1], [40, -40]), { stiffness: 50, damping: 30 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0">
        {/* Mouse-reactive gradient orbs */}
        <motion.div style={{ x: orbX1, y: orbY1 }}
          className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-blue-600/[0.08] rounded-full blur-[140px] animate-morph" />
        <motion.div style={{ x: orbX2, y: orbY2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-violet-600/[0.08] rounded-full blur-[120px] animate-morph"
          data-style-delay="-4s" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/[0.04] rounded-full blur-[160px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid + vignette */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050507_70%)]" />
        <StarField />
        <MeteorShower />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-sm text-gray-400 mb-10 hover:border-white/[0.15] transition-all duration-500 cursor-default">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <Sparkles size={14} className="text-amber-400" />
            Open to opportunities
          </div>
        </motion.div>

        {/* Profile with orbit rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-10 flex justify-center"
        >
          <div className="relative w-44 h-44 sm:w-48 sm:h-48">
            {/* Orbit rings */}
            <div className="absolute inset-[-12px] rounded-full border border-white/[0.04] animate-orbit" >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
            </div>
            <div className="absolute inset-[-24px] rounded-full border border-white/[0.03] animate-orbit-reverse">
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.7)]" />
            </div>
            <div className="absolute inset-[-36px] rounded-full border border-dashed border-white/[0.02] animate-orbit-slow">
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
            </div>
            {/* Glow behind */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 blur-xl" />
            {/* Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div
                  className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 opacity-80 blur-sm"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-[3px] border-[#050507] ring-1 ring-white/10">
                  <img src={profileImg} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-[3px] border-[#050507]">
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.05]"
        >
          <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto] text-glow">
            {profile.name}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-6 font-light min-h-[36px] sm:min-h-[40px]"
        >
          <TypewriterLoop texts={['Full-Stack Developer', 'AI Engineer', 'IoT Architect', 'System Designer']} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 mb-8"
        >
          <motion.span whileHover={{ scale: 1.05, borderColor: 'rgba(99,102,241,0.3)' }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 cursor-default">
            <Building2 size={14} className="text-blue-400" />
            {profile.company}
          </motion.span>
          <motion.span whileHover={{ scale: 1.05, borderColor: 'rgba(244,63,94,0.3)' }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 cursor-default">
            <MapPin size={14} className="text-rose-400" />
            {profile.location}
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-lg text-gray-500 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_50px_rgba(99,102,241,0.35)] overflow-hidden flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>&#8594;</motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </MagneticButton>
          <MagneticButton
            href={profile.github} target="_blank" rel="noreferrer"
            className="group px-8 py-4 rounded-2xl border border-white/[0.1] text-gray-300 font-semibold hover:bg-white/[0.05] hover:border-white/[0.2] transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
          >
            <Github size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            GitHub
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="p-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
          >
            <ArrowDown size={16} className="text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}