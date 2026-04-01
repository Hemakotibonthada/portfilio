import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, MapPin, Building2, ChevronDown } from 'lucide-react';
import { profile } from '../data/projects';
import profileImg from '../assets/profile.png';

function TypewriterLoop({ texts }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[idx];
    if (!del && text === cur) { const t = setTimeout(() => setDel(true), 2000); return () => clearTimeout(t); }
    if (del && text === '') { setDel(false); setIdx(p => (p + 1) % texts.length); return; }
    const t = setTimeout(() => setText(del ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1)), del ? 30 : 60);
    return () => clearTimeout(t);
  }, [text, del, idx, texts]);
  return <>{text}<span className="animate-pulse text-blue-400">|</span></>;
}

export default function Hero() {
  const stars = useMemo(() => Array.from({ length: 80 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    s: Math.random() * 2 + 0.5, d: Math.random() * 4 + 2, o: Math.random() * 0.5 + 0.1,
  })), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_70%)]" />
        {stars.map(s => (
          <motion.div key={s.id} className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s }}
            animate={{ opacity: [s.o, s.o * 0.2, s.o] }}
            transition={{ duration: s.d, repeat: Infinity, delay: Math.random() * 3 }} />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <span className="inline-flex items-center gap-2 text-sm text-gray-400 px-4 py-1.5 rounded-full border border-white/10 bg-white/5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Open to opportunities
          </span>
        </motion.div>

        {/* Photo */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-8">
          <div className="w-28 h-28 mx-auto rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#0a0a0f]">
              <img src={profileImg} alt={profile.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          {profile.name}
        </motion.h1>

        {/* Typewriter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-400 mb-6 h-8">
          <TypewriterLoop texts={['Full-Stack Developer', 'AI Engineer', 'IoT Architect', 'System Designer']} />
        </motion.div>

        {/* Info pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><Building2 size={14} className="text-blue-400" />{profile.company}</span>
          <span className="text-gray-700"></span>
          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-rose-400" />{profile.location}</span>
        </motion.div>

        {/* Bio */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          {profile.bio}
        </motion.p>

        {/* Buttons */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-4">
          <a href="#projects" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-shadow">
            View Projects
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer"
            className="px-6 py-3 rounded-xl border border-white/10 text-gray-300 font-medium text-sm hover:bg-white/5 transition-colors flex items-center gap-2">
            <Github size={16} /> GitHub
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={20} className="text-gray-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}