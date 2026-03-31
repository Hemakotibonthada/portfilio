import { motion } from 'framer-motion';
import { Github, Mail, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import { profile } from '../data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-5">
              GET IN TOUCH
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          >
            Let's Build Something
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            Interested in collaborating or have a project idea? I'd love to hear from you.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all duration-300"
            >
              <Github size={20} />
              View GitHub Profile
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-rose-400" />
              {profile.location}
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400" />
              {profile.company}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
