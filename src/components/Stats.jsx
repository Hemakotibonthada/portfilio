import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FolderGit2, Code2, Layers, Cpu } from 'lucide-react';
import { stats } from '../data/projects';

function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numValue = parseInt(value) || 0;

  useEffect(() => {
    if (!inView || !numValue) return;
    let start = 0;
    const step = numValue / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= numValue) {
        setCount(numValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, numValue, duration]);

  const display = numValue ? count + suffix : value;
  return <span ref={ref}>{display}</span>;
}

const statItems = [
  { icon: FolderGit2, label: 'Projects Built', value: stats.totalProjects, suffix: '+', color: 'from-blue-500 to-cyan-400', glow: 'shadow-blue-500/20' },
  { icon: Code2, label: 'Technologies', value: stats.technologies, suffix: '+', color: 'from-purple-500 to-violet-400', glow: 'shadow-purple-500/20' },
  { icon: Layers, label: 'Lines of Code', value: stats.linesOfCode, suffix: '', color: 'from-emerald-500 to-green-400', glow: 'shadow-emerald-500/20' },
  { icon: Cpu, label: 'Domains', value: stats.categories, suffix: '', color: 'from-amber-500 to-orange-400', glow: 'shadow-amber-500/20' },
];

export default function Stats() {
  return (
    <section className="py-20 px-4 relative">
      {/* Subtle divider gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-700/50 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {statItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`} />
              <div className={`relative text-center p-7 rounded-2xl bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800/40 hover:border-gray-300 dark:hover:border-gray-700/60 transition-all duration-500 shadow-sm dark:shadow-none hover:shadow-xl ${item.glow}`}>
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`mx-auto mb-4 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="text-white" size={22} />
                  </div>
                </motion.div>
                <div className="text-4xl font-extrabold mb-1 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500 font-medium">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
