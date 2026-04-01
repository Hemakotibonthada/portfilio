import { motion } from 'framer-motion';
import { techStack } from '../data/projects';

const colors = {
  Frontend: 'bg-blue-500', Mobile: 'bg-green-500', Backend: 'bg-purple-500', Desktop: 'bg-orange-500',
  Database: 'bg-red-500', 'AI/ML': 'bg-indigo-500', IoT: 'bg-teal-500', DevOps: 'bg-gray-500',
};

export default function TechStack() {
  return (
    <section id="tech" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="text-sm text-purple-400 font-medium tracking-wider uppercase">Tech Arsenal</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Technology Stack</h2>
          <p className="text-gray-500 mt-3 max-w-lg">35+ technologies across the full development spectrum.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(techStack).map(([section, techs], i) => (
            <motion.div key={section}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-2 h-2 rounded-full ${colors[section] || 'bg-gray-500'}`} />
                <span className="text-sm font-semibold text-white">{section}</span>
                <span className="ml-auto text-xs text-gray-600">{techs.length}</span>
              </div>
              <div className="space-y-1">
                {techs.map(t => (
                  <div key={t} className="text-sm text-gray-400 py-1.5 px-2 rounded hover:bg-white/[0.03] transition-colors">{t}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}