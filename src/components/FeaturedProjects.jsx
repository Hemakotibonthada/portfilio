import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import DynamicIcon from './DynamicIcon';

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([mx, my]) => `radial-gradient(350px circle at ${mx}px ${my}px, rgba(99, 102, 241, 0.06), transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-28 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-5"
          >
            FEATURED WORK
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Highlights from 40+ projects spanning AI, IoT, FinTech, Healthcare, and more
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ perspective: '1000px' }}
        >
          {featured.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="group relative">
              <TiltCard className="h-full relative">
                <div className="h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/[0.04]">
                  <div className={`h-1.5 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 animate-shimmer" />
                  </div>
                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <motion.div
                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                        className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}
                      >
                        <DynamicIcon name={project.icon} size={24} className="text-white" />
                      </motion.div>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-white/[0.05] text-gray-400 border border-white/[0.06]">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1.5 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 font-medium">{project.tagline}</p>
                    <p className="text-sm text-gray-400 mb-5 line-clamp-3 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05, y: -1 }}
                          className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] text-gray-400 border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] text-gray-600">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/project/${project.id}`}
                        className="group/btn text-sm px-5 py-2.5 rounded-xl bg-white/[0.05] text-gray-300 hover:bg-white/[0.1] transition-all duration-300 flex items-center gap-1.5 hover:gap-2.5"
                      >
                        Details
                        <ArrowUpRight size={14} className="group-hover/btn:rotate-45 transition-transform duration-300" />
                      </Link>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm px-5 py-2.5 rounded-xl border border-white/[0.08] text-gray-400 hover:bg-white/[0.04] hover:text-gray-200 transition-all duration-300 flex items-center gap-1.5"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}