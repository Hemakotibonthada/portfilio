import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun, Menu, X, Github, Home } from 'lucide-react';
import { profile } from '../data/projects';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'all-projects', label: 'All Work' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHome) return;
      const sections = navItems.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));
      for (const section of sections.reverse()) {
        if (section.el && section.el.getBoundingClientRect().top <= 200) {
          setActiveSection(section.id);
          return;
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (!isHome) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 z-[60] origin-left"
        style={{ scaleX }}
      />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050507]/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25"
              >
                HK
              </motion.div>
              <span className="font-bold text-lg hidden sm:block text-gray-200 group-hover:text-white transition-colors duration-300">Portfolio</span>
            </Link>
            <div className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-sm rounded-full px-1.5 py-1 border border-white/[0.06]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative px-4 py-1.5 text-sm transition-colors duration-300 rounded-full"
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/[0.08] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeSection === item.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors text-gray-400 hover:text-white"
              >
                <Github size={18} />
              </motion.a>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors text-gray-400"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#050507]/95 backdrop-blur-2xl border-b border-white/[0.06]"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-left px-4 py-3 text-sm rounded-xl transition-all ${
                      activeSection === item.id
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}