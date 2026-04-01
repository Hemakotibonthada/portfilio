import { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import FeaturedProjects from './components/FeaturedProjects';
import AllProjects from './components/AllProjects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 15 + 5;
      });
    }, 100);
    const timer = setTimeout(onComplete, 2400);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onComplete]);

  const orbs = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i, size: 4 + Math.random() * 4,
    distance: 50 + i * 12, duration: 3 + i * 1.5, delay: i * 0.3,
  })), []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/[0.05] rounded-full blur-[150px] animate-morph" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/[0.05] rounded-full blur-[120px] animate-morph" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative text-center">
        {/* Orbital rings */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {orbs.map(o => (
            <motion.div
              key={o.id}
              className="absolute inset-0 rounded-full border border-white/[0.04]"
              style={{ inset: `${40 - o.distance / 2.5}px` }}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: 1 }}
              transition={{ rotate: { duration: o.duration, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.5, delay: o.delay } }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full bg-blue-400/80"
                style={{ width: o.size, height: o.size, boxShadow: `0 0 ${o.size * 3}px rgba(99,102,241,0.5)` }} />
            </motion.div>
          ))}

          {/* Center logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 150 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-[0_0_80px_rgba(99,102,241,0.4)] animate-glow">
              <span className="text-white text-2xl font-bold tracking-tight">HK</span>
            </div>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="w-48 mx-auto mb-4">
          <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-600 tracking-[0.3em] uppercase"
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <FeaturedProjects />
      <TechStack />
      <AllProjects />
      <Contact />
      <Footer />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-[#050507] text-white noise-bg"
        >
          <Navbar />
          <AnimatedRoutes />
        </motion.div>
      )}
    </Router>
  );
}

export default App;