import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import { calculatePersona } from '../utils/personaCalculator';

const PersonaCard = ({ user, repos }) => {
  const cardRef = useRef(null);
  
  if (!user || !repos) return null;

  const persona = calculatePersona(user, repos);
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#09090B', 
        scale: 2,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${user.login}-persona.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download card', err);
    }
  };

  return (
    <div className="bg-bokara rounded-2xl p-8 border border-phantom shadow-xl flex flex-col h-full animate-fade-in delay-200">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-medium text-anchovy">Developer Persona</h2>
        <button 
          onClick={handleDownload}
          className="p-2 bg-phantom hover:bg-phantom/80 text-dusty rounded-lg transition-colors flex items-center gap-2 text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      <div 
        ref={cardRef} 
        className="flex-1 bg-gradient-to-br from-bokara to-raven rounded-xl p-6 border border-sphinx/20 flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-sphinx/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-anchovy/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
        
        <img 
          src={user.avatar_url} 
          alt={user.login} 
          crossOrigin="anonymous"
          className="w-20 h-20 rounded-full border-2 border-sphinx/50 mb-4 shadow-lg z-10"
        />
        <h3 className="text-2xl font-bold text-dusty mb-1 z-10">{user.name || user.login}</h3>
        <p className="text-sphinx font-medium mb-4 z-10">@{user.login}</p>
        
        <div className="text-4xl mb-3 z-10">{persona.emoji}</div>
        <h4 className="text-xl font-bold text-dusty mb-2 z-10">{persona.title}</h4>
        <p className="text-anchovy text-sm mb-6 max-w-xs z-10">{persona.description}</p>

        <div className="flex gap-4 text-sm text-dusty z-10 bg-black/30 px-4 py-2 rounded-full border border-white/5">
          <span>🌟 {totalStars} Stars</span>
          <span>📦 {user.public_repos} Repos</span>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
