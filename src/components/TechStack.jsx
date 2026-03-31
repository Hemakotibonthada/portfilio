import { motion } from 'framer-motion';
import { techStack } from '../data/projects';

const sectionColors = {
  'Frontend': 'from-blue-500 to-cyan-400',
  'Mobile': 'from-green-500 to-emerald-400',
  'Backend': 'from-purple-500 to-violet-400',
  'Desktop': 'from-orange-500 to-amber-400',
  'Database': 'from-red-500 to-pink-400',
  'AI/ML': 'from-indigo-500 to-blue-400',
  'IoT': 'from-teal-500 to-green-400',
  'DevOps': 'from-gray-500 to-slate-400',
};

const sectionGlows = {
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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-400/30 dark:via-purple-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-5"
          >
            TECH ARSENAL
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Technology Stack
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            35+ technologies across frontend, backend, mobile, AI/ML, IoT, and DevOps
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {Object.entries(techStack).map(([section, techs]) => (
            <motion.div
              key={section}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={`group rounded-2xl bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800/40 p-6 hover:border-gray-300 dark:hover:border-gray-700/50 transition-all duration-500 shadow-sm dark:shadow-none hover:shadow-xl ${sectionGlows[section] || ''}`}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${sectionColors[section] || 'from-gray-500 to-gray-400'} text-white text-xs font-semibold mb-5 shadow-lg`}>
                {section}
              </div>
              <div className="space-y-2.5">
                {techs.map((tech, j) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.05 }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 py-1.5 px-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/30 transition-all duration-300 cursor-default"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${sectionColors[section] || 'from-gray-500 to-gray-400'} group-hover:scale-125 transition-transform`} />
                    <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
