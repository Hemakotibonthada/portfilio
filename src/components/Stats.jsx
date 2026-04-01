import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FolderGit2, Code2, Layers, Cpu } from 'lucide-react';
import { stats } from '../data/projects';

function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value) || 0;
  useEffect(() => {
    if (!inView || !num) return;
    let s = 0; const step = num / 120;
    const t = setInterval(() => { s += step; if (s >= num) { setCount(num); clearInterval(t); } else setCount(Math.floor(s)); }, 1000/60);
    return () => clearInterval(t);
  }, [inView, num]);
  return <span ref={ref}>{num ? count + suffix : value}</span>;
}

const items = [
  { icon: FolderGit2, label: 'Projects', value: stats.totalProjects, suffix: '+', color: 'text-blue-400' },
  { icon: Code2, label: 'Technologies', value: stats.technologies, suffix: '+', color: 'text-violet-400' },
  { icon: Layers, label: 'Lines of Code', value: stats.linesOfCode, color: 'text-emerald-400' },
  { icon: Cpu, label: 'Domains', value: stats.categories, color: 'text-amber-400' },
];

export default function Stats() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div key={item.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="text-center">
            <item.icon size={24} className={`mx-auto mb-3 ${item.color}`} />
            <div className="text-3xl font-bold text-white mb-1">
              <Counter value={item.value} suffix={item.suffix} />
            </div>
            <div className="text-sm text-gray-500">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}