import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import FeaturedProjects from './components/FeaturedProjects';
import AllProjects from './components/AllProjects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

function HomePage() {
  return (<><Hero /><Stats /><FeaturedProjects /><TechStack /><AllProjects /><Footer /></>);
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0f] text-white noise-bg">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}