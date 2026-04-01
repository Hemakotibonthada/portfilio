import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import DynamicIcon from './DynamicIcon';

export default function ProjectDetail() {
  const { id } = useParams();
  const p = projects.find(x => x.id === id);
  if (!p) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-4">Project not found</h2>
        <Link to="/" className="text-blue-400 text-sm">Go home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden mb-8">
          <div className={`h-1.5 bg-gradient-to-r ${p.color}`} />
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                <DynamicIcon name={p.icon} size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{p.name}</h1>
                <p className="text-gray-400">{p.tagline}</p>
                <span className="inline-block mt-2 text-xs px-2.5 py-1 rounded bg-white/[0.04] text-gray-400">{p.category}</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">{p.description}</p>
            <a href={p.github} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-shadow">
              <Github size={16} /> View on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {p.technologies.map(t => (
                <span key={t} className="text-sm px-3 py-1.5 rounded-lg bg-white/[0.04] text-gray-300 border border-white/[0.06]">{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-2.5">
              {p.features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}