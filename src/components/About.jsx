import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Brain, Cpu, Globe, Zap, Shield, Terminal, Layers } from 'lucide-react';
import { profile, stats } from '../data/projects';

const highlights = [
  { icon: Brain, label: 'AI & ML', desc: 'Deep learning, NLP, Computer Vision, LLM agents', color: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/20' },
  { icon: Globe, label: 'Full-Stack', desc: 'React, Node.js, FastAPI, Next.js, TypeScript', color: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/20' },
  { icon: Cpu, label: 'IoT & Edge', desc: 'ESP32, MQTT, Embedded firmware, PlatformIO', color: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/20' },
  { icon: Shield, label: 'FinTech', desc: 'Algorithmic trading, Risk engines, OpenVINO', color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/20' },
  { icon: Zap, label: 'Desktop & Mobile', desc: 'Electron, Tauri, Flutter, React Native', color: 'from-rose-500 to-pink-500', glow: 'shadow-rose-500/20' },
  { icon: Code2, label: 'DevOps', desc: 'Docker, CI/CD, Firebase, Cloud deployment', color: 'from-indigo-500 to-blue-500', glow: 'shadow-indigo-500/20' },
];

const metrics = [
  { value: '40+', label: 'Projects', icon: Layers },
  { value: '35+', label: 'Technologies', icon: Terminal },
  { value: '15', label: 'Domains', icon: Globe },
  { value: '500K+', label: 'Lines of Code', icon: Code2 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-32 px-4 relative" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[150px] -translate-y-1/2" />

      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-5 animate-border-glow">
              ABOUT ME
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Who I Am
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Engineer. Builder. Problem solver.
            </p>
          </motion.div>

          {/* Bio Card with gradient border */}
          <motion.div variants={fadeUp} className="mb-16">
            <div className="gradient-border p-8 sm:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                  {profile.bio}
                </p>
                <p className="text-gray-500 leading-relaxed">
                  Currently at <span className="text-blue-400 font-medium">{profile.company}</span> in {profile.location}.
                  With <span className="text-white font-semibold">{stats.totalProjects}+ projects</span> across {stats.categories} domains,
                  I specialize in building end-to-end systems that combine AI/ML intelligence with robust engineering.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mini metrics */}
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
            {metrics.map((m, i) => (
              <motion.div key={m.label} variants={fadeUp}
                className="glass-card p-5 text-center group transition-all duration-500 cursor-default"
              >
                <m.icon size={18} className="text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white mb-0.5">{m.value}</div>
                <div className="text-xs text-gray-500 font-medium">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Expertise Grid */}
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group glass-card p-6 transition-all duration-500 cursor-default"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                {/* Hover glow spot */}
                <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(99,102,241,0.06), transparent 50%)' }} />
                <div className="relative flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg ${item.glow} group-hover:shadow-xl transition-shadow duration-500`}
                  >
                    <item.icon size={22} className="text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white mb-1.5 group-hover:text-blue-400 transition-colors duration-300">{item.label}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}