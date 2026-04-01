import { Github, Heart } from 'lucide-react';
import { profile } from '../data/projects';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
          <span>Built with</span>
          <Heart size={14} className="text-red-400 fill-red-400" />
          <span>by {profile.name}</span>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer" className="inline-block text-gray-600 hover:text-white transition-colors mb-4">
          <Github size={18} />
        </a>
        <p className="text-xs text-gray-700">{profile.company}  {profile.location}</p>
        <p className="text-xs text-gray-700 mt-1"> {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}