import { motion } from 'framer-motion';
import { Github, Heart, ArrowUp } from 'lucide-react';
import { profile } from '../data/projects';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-16 px-4">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-700/50 to-transparent" />

      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Back to top */}
        <div className="flex justify-center mb-10">
          <motion.button
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/30 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm shadow-sm dark:shadow-none"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-5"
          >
            <span>Built with</span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Heart size={14} className="text-red-400 fill-red-400" />
            </motion.div>
            <span>by</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">{profile.name}</span>
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/30 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300"
            >
              <Github size={18} />
            </motion.a>
          </div>

          <p className="text-xs text-gray-600">
            {profile.company} &middot; {profile.location}
          </p>
          <p className="text-xs text-gray-700 mt-2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
