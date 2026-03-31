import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ArrowUpRight, Search, X, SlidersHorizontal } from 'lucide-react';
import { projects, categories } from '../data/projects';
import DynamicIcon from './DynamicIcon';

export default function AllProjects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="all-projects" className="py-28 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-5"
          >
            COMPLETE COLLECTION
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            All Projects
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Browse the complete collection of projects by category or search
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto mb-8"
        >
          <div className="relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25 shadow-md shadow-blue-500/5'
                  : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:text-gray-300 hover:border-white/[0.12]'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <motion.p layout className="text-sm text-gray-500 mb-6 text-center font-medium">
          <SlidersHorizontal size={14} className="inline mr-1.5 mb-0.5" />
          Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-blue-500/[0.03]"
                >
                  <div className={`h-1 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 animate-shimmer" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shrink-0 shadow-lg`}
                      >
                        <DynamicIcon name={project.icon} size={17} className="text-white" />
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm truncate text-white group-hover:text-blue-400 transition-colors duration-300">
                          {project.name}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">{project.category}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{project.tagline}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-400 border border-white/[0.06]">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-600">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/project/${project.id}`}
                        className="group/btn text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] text-gray-300 hover:bg-white/[0.1] transition-all duration-300 flex items-center gap-1"
                      >
                        Details
                        <ArrowUpRight size={11} className="group-hover/btn:rotate-45 transition-transform duration-300" />
                      </Link>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.08] text-gray-400 hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-1"
                      >
                        <Github size={11} /> Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-600" />
            </div>
            <p className="text-lg text-gray-400 mb-2">No projects found</p>
            <p className="text-sm text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearch(''); }}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}