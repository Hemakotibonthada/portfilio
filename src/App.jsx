import { useState, useEffect } from 'react';
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
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_60px_rgba(99,102,241,0.4)]"
        >
          <span className="text-white text-2xl font-bold tracking-tight">HK</span>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 mx-auto rounded-full"
        />
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