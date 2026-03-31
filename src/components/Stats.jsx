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

  return <span ref={ref}>{numValue ? count + suffix : value}</span>;
}

const statItems = [
  { icon: FolderGit2, label: 'Projects Built', value: stats.totalProjects, suffix: '+', color: 'from-blue-500 to-cyan-400' },
  { icon: Code2, label: 'Technologies', value: stats.technologies, suffix: '+', color: 'from-violet-500 to-purple-400' },
  { icon: Layers, label: 'Lines of Code', value: stats.linesOfCode, suffix: '', color: 'from-emerald-500 to-green-400' },
  { icon: Cpu, label: 'Domains', value: stats.categories, suffix: '', color: 'from-amber-500 to-orange-400' },
];

export default function Stats() {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative text-center p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/[0.03]">
                <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                  <div className={`mx-auto mb-4 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <item.icon className="text-white" size={22} />
                  </div>
                </motion.div>
                <div className="text-4xl font-extrabold mb-1 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="text-sm text-gray-500 font-medium">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}