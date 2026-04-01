import { motion } from 'framer-motion';
import { Github, Heart, ArrowUp, Code2 } from 'lucide-react';
import { profile } from '../data/projects';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-16 px-4">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto relative">
        {/* Back to top */}
        <div className="flex justify-center mb-12">
          <motion.button
            whileHover={{ y: -5, scale: 1.1, boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] text-gray-500 hover:text-white transition-all duration-300"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>

        {/* Brand */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-500/20">
                HK
              </div>
              <span className="text-lg font-bold text-gray-300">Portfolio</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6"
          >
            <span>Crafted with</span>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart size={14} className="text-red-400 fill-red-400" />
            </motion.div>
            <span>by</span>
            <span className="text-gray-300 font-medium">{profile.name}</span>
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-8">
            <motion.a
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] text-gray-500 hover:text-white transition-all duration-300"
            >
              <Github size={20} />
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mb-2">
            <Code2 size={12} />
            <span>React &middot; Tailwind CSS &middot; Framer Motion</span>
          </div>
          <p className="text-xs text-gray-700">{profile.company} &middot; {profile.location}</p>
          <p className="text-xs text-gray-700 mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}