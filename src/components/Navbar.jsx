import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Github } from 'lucide-react';
import { profile } from '../data/projects';

const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'all', label: 'All Work' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    if (location.pathname !== '/') return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 z-[60] origin-left" style={{ scaleX }} />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs">HK</div>
            <span className="font-semibold text-gray-200 hidden sm:block">Portfolio</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-sm text-gray-400 hover:text-white transition-colors">{item.label}</button>
            ))}
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github size={18} /></a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-400"><Menu size={20} /></button>
        </div>
        {open && (
          <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 space-y-2">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-left text-sm text-gray-400 hover:text-white py-2">{item.label}</button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}