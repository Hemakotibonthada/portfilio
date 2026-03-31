import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, MapPin, Building2, Sparkles } from 'lucide-react';
import { profile } from '../data/projects';
import profileImg from '../assets/profile.png';

function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.6 + 0.1,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.opacity, s.opacity * 0.2, s.opacity] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
        />
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

  return <span>{displayed}<span className="animate-pulse text-blue-400 ml-0.5">|</span></span>;
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.07] rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/[0.07] rounded-full blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/[0.04] rounded-full blur-[130px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050507_75%)]" />
        <StarField />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-sm text-gray-400 mb-10">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <Sparkles size={14} className="text-amber-400" />
            Open to opportunities
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mb-10"
        >
          <div className="relative inline-block">
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
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.05]"
        >
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
            {profile.name}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-6 font-light h-[40px]"
        >
          <TypewriterLoop texts={['Full-Stack Developer', 'AI Engineer', 'IoT Architect', 'System Designer']} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 mb-8"
        >
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <Building2 size={14} className="text-blue-400" />
            {profile.company}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <MapPin size={14} className="text-rose-400" />
            {profile.location}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:scale-[1.02] flex items-center gap-2"
          >
            View Projects
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>&#8594;</motion.span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group px-8 py-3.5 rounded-2xl border border-white/[0.1] text-gray-300 font-semibold hover:bg-white/[0.05] hover:border-white/[0.2] transition-all duration-300 flex items-center gap-2"
          >
            <Github size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="p-2 rounded-full border border-white/[0.08] bg-white/[0.03]"
          >
            <ArrowDown size={16} className="text-gray-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}