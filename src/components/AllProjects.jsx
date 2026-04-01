import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ArrowUpRight, Search, X } from 'lucide-react';
import { projects, categories } from '../data/projects';
import DynamicIcon from './DynamicIcon';

export default function AllProjects() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const filtered = projects.filter(p => {
    if (cat !== 'All' && p.category !== cat) return false;
    if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.technologies.some(t => t.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <section id="all" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="text-sm text-emerald-400 font-medium tracking-wider uppercase">Complete Collection</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">All Projects</h2>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mb-6">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input type="text" placeholder="Search projects..." value={q} onChange={e => setQ(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-white/[0.12]" />
            {q && <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><X size={14} /></button>}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${cat === c ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25' : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:text-gray-300'}`}>
              {c}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-6">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <motion.div key={p.id} layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] transition-colors">
                <div className={`h-0.5 bg-gradient-to-r ${p.color}`} />
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                      <DynamicIcon name={p.icon} size={14} className="text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">{p.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{p.category}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.tagline}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.technologies.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-gray-400">{t}</span>
                    ))}
                    {p.technologies.length > 3 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-gray-600">+{p.technologies.length - 3}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/project/${p.id}`} className="text-xs px-3 py-1.5 rounded bg-white/[0.05] text-gray-300 hover:bg-white/[0.1] transition-colors flex items-center gap-1">
                      Details <ArrowUpRight size={10} />
                    </Link>
                    <a href={p.github} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded border border-white/[0.08] text-gray-400 hover:bg-white/[0.04] transition-colors flex items-center gap-1">
                      <Github size={10} /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-2">No projects found</p>
            <button onClick={() => { setCat('All'); setQ(''); }} className="text-blue-400 text-sm">Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}