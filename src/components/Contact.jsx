import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, MapPin, ArrowUpRight, Sparkles, Mail, Linkedin, Send } from 'lucide-react';
import { profile } from '../data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, duration: Math.random() * 6 + 4,
      delay: Math.random() * 3,
    })), []);

  return (
    <section id="contact" className="py-28 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/[0.04] rounded-full blur-[150px]" />
      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <motion.div key={p.id} className="absolute rounded-full bg-blue-400/20"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-5 animate-border-glow">
              GET IN TOUCH
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            {"Let's Build Something"}
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
            Interested in collaborating or have a project idea? I'd love to connect and explore possibilities together.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <motion.a
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] transition-all duration-300"
            >
              <Github size={20} />
              View GitHub Profile
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/[0.1] text-gray-300 font-semibold hover:bg-white/[0.05] hover:border-white/[0.2] transition-all duration-300"
            >
              <Send size={18} />
              Send Message
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <motion.span whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] cursor-default transition-all duration-300 hover:border-white/[0.12]">
              <MapPin size={16} className="text-rose-400" />
              {profile.location}
            </motion.span>
            <motion.span whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] cursor-default transition-all duration-300 hover:border-white/[0.12]">
              <Sparkles size={16} className="text-amber-400" />
              {profile.company}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}