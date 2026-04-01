import { motion } from 'framer-motion';
import { techStack } from '../data/projects';
import { Monitor, Smartphone, Server, MonitorSmartphone, Database, Brain, Cpu, GitBranch } from 'lucide-react';

const sectionIcons = {
  'Frontend': Monitor, 'Mobile': Smartphone, 'Backend': Server,
  'Desktop': MonitorSmartphone, 'Database': Database, 'AI/ML': Brain,
  'IoT': Cpu, 'DevOps': GitBranch,
};

const sectionColors = {
  'Frontend': 'from-blue-500 to-cyan-400',
  'Mobile': 'from-green-500 to-emerald-400',
  'Backend': 'from-purple-500 to-violet-400',
  'Desktop': 'from-orange-500 to-amber-400',
  'Database': 'from-red-500 to-pink-400',
  'AI/ML': 'from-indigo-500 to-blue-400',
  'IoT': 'from-teal-500 to-green-400',
  'DevOps': 'from-gray-400 to-slate-400',
};

const sectionGlow = {
  'Frontend': 'group-hover:shadow-blue-500/10',
  'Mobile': 'group-hover:shadow-green-500/10',
  'Backend': 'group-hover:shadow-purple-500/10',
  'Desktop': 'group-hover:shadow-orange-500/10',
  'Database': 'group-hover:shadow-red-500/10',
  'AI/ML': 'group-hover:shadow-indigo-500/10',
  'IoT': 'group-hover:shadow-teal-500/10',
  'DevOps': 'group-hover:shadow-gray-500/10',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-32 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      {/* Background accent */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-violet-600/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-5 animate-border-glow"
          >
            TECH ARSENAL
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Technology Stack
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            35+ technologies powering everything from neural networks to microcontrollers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {Object.entries(techStack).map(([section, techs]) => {
            const Icon = sectionIcons[section] || Cpu;
            return (
              <motion.div
                key={section}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className={`group glass-card p-6 transition-all duration-500 hover:shadow-xl ${sectionGlow[section] || ''}`}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                {/* Mouse glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(300px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(99,102,241,0.05), transparent 50%)' }} />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <motion.div whileHover={{ rotate: 15, scale: 1.1 }}
                      className={`w-10 h-10 rounded-xl bg-gradient-to-r ${sectionColors[section]} flex items-center justify-center shadow-lg`}>
                      <Icon size={18} className="text-white" />
                    </motion.div>
                    <span className="font-semibold text-white text-sm tracking-wide">{section}</span>
                    <span className="ml-auto text-xs text-gray-600 bg-white/[0.04] px-2 py-0.5 rounded-full">{techs.length}</span>
                  </div>
                  <div className="space-y-1.5">
                    {techs.map((tech, j) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.04 }}
                        whileHover={{ x: 8, backgroundColor: 'rgba(255,255,255,0.04)' }}
                        className="flex items-center gap-3 text-sm text-gray-400 py-2 px-2.5 rounded-lg transition-all duration-300 cursor-default"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${sectionColors[section]} group-hover:scale-150 transition-transform`} />
                        <span className="group-hover:text-white transition-colors">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}