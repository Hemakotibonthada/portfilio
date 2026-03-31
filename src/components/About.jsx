import { motion } from 'framer-motion';
import { Code2, Brain, Cpu, Globe, Zap, Shield } from 'lucide-react';
import { profile, stats } from '../data/projects';

const highlights = [
  { icon: Brain, label: 'AI & ML', desc: 'Deep learning, NLP, Computer Vision', color: 'from-violet-500 to-purple-600' },
  { icon: Globe, label: 'Full-Stack', desc: 'React, Node.js, FastAPI, Next.js', color: 'from-blue-500 to-cyan-500' },
  { icon: Cpu, label: 'IoT & Edge', desc: 'ESP32, MQTT, Embedded Systems', color: 'from-emerald-500 to-teal-500' },
  { icon: Shield, label: 'FinTech', desc: 'Trading systems, Risk analysis', color: 'from-amber-500 to-orange-500' },
  { icon: Zap, label: 'Desktop & Mobile', desc: 'Electron, Flutter, React Native', color: 'from-rose-500 to-pink-500' },
  { icon: Code2, label: 'DevOps', desc: 'Docker, CI/CD, Cloud deployment', color: 'from-indigo-500 to-blue-500' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function About() {
  return (
    <section id="about" className="py-28 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-5">
              ABOUT ME
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Who I Am
            </h2>
          </motion.div>

          {/* Bio Card */}
          <motion.div variants={fadeUp} className="mb-12">
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 sm:p-10 backdrop-blur-sm">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
                  {profile.bio}
                </p>
                <p className="text-gray-500 leading-relaxed">
                  Currently at <span className="text-blue-400 font-medium">{profile.company}</span> in {profile.location}.
                  With <span className="text-white font-semibold">{stats.totalProjects}+ projects</span> across {stats.categories} domains,
                  I specialize in building end-to-end systems that combine AI/ML intelligence with robust engineering — from
                  neural trading architectures to IoT smart home platforms and healthcare AI systems.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Expertise Grid */}
          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/[0.03]"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg`}
                  >
                    <item.icon size={20} className="text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
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
