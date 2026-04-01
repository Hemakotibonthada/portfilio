import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, CheckCircle2, ArrowUpRight, Layers, Sparkles } from 'lucide-react';
import { projects } from '../data/projects';
import DynamicIcon from './DynamicIcon';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
            <Layers size={32} className="text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Project not found</h2>
          <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Go back home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to all projects
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden mb-8 hover:border-white/[0.1] transition-all duration-500">
              <div className={`h-2 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 animate-shimmer" />
              </div>
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 mb-6">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                    className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shrink-0 shadow-xl`}
                  >
                    <DynamicIcon name={project.icon} size={30} className="text-white" />
                  </motion.div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{project.name}</h1>
                    <p className="text-gray-400 text-base sm:text-lg">{project.tagline}</p>
                    <span className="inline-block mt-3 text-xs px-3 py-1.5 rounded-xl bg-white/[0.05] text-gray-400 border border-white/[0.06]">
                      {project.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold hover:shadow-[0_0_40px_rgba(99,102,241,0.25)] transition-all duration-300"
                  >
                    <Github size={18} />
                    View on GitHub
                    <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            <motion.div variants={fadeUp}>
              <div className="h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7 hover:border-white/[0.1] transition-all duration-500">
                <div className="flex items-center gap-2 mb-5">
                  <Layers size={18} className="text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Technologies Used</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="px-3.5 py-2 rounded-xl bg-white/[0.04] text-sm text-gray-300 border border-white/[0.06] hover:border-blue-500/30 hover:text-blue-300 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7 hover:border-white/[0.1] transition-all duration-500">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles size={18} className="text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Key Features</h3>
                </div>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ x: 6 }}
                      className="flex items-start gap-3 text-sm text-gray-300 py-1 cursor-default"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}