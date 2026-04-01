import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import DynamicIcon from './DynamicIcon';

export default function FeaturedProjects() {
  const featured = projects.filter(p => p.featured);
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="text-sm text-violet-400 font-medium tracking-wider uppercase">Featured Work</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Featured Projects</h2>
          <p className="text-gray-500 mt-3 max-w-lg">Highlights from 40+ projects across AI, IoT, FinTech, and Healthcare.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] transition-colors duration-300">
              <div className={`h-1 bg-gradient-to-r ${p.color}`} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                    <DynamicIcon name={p.icon} size={18} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-500 bg-white/[0.04] px-2.5 py-1 rounded-full">{p.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{p.tagline}</p>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.technologies.slice(0, 4).map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/[0.04] text-gray-400">{t}</span>
                  ))}
                  {p.technologies.length > 4 && <span className="text-xs px-2 py-0.5 rounded bg-white/[0.04] text-gray-600">+{p.technologies.length - 4}</span>}
                </div>
                <div className="flex gap-2">
                  <Link to={`/project/${p.id}`} className="text-xs px-4 py-2 rounded-lg bg-white/[0.05] text-gray-300 hover:bg-white/[0.1] transition-colors flex items-center gap-1">
                    Details <ArrowUpRight size={12} />
                  </Link>
                  <a href={p.github} target="_blank" rel="noreferrer" className="text-xs px-4 py-2 rounded-lg border border-white/[0.08] text-gray-400 hover:bg-white/[0.04] transition-colors flex items-center gap-1">
                    <Github size={12} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}