import React, { useState, useEffect } from 'react';
import { Flame, Briefcase, Loader2 } from 'lucide-react';
import { fetchAiFeedback } from '../utils/ai';

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length - 1) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  return <p className="text-dusty text-sm leading-relaxed whitespace-pre-wrap">{displayedText}</p>;
};

const AiFeedback = ({ user, repos }) => {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(null);

  const generatePrompt = (type) => {
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const langCounts = {};
    repos.forEach(repo => {
      if (repo.language) langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
    });
    const topLangs = Object.keys(langCounts).slice(0, 3).join(', ');

    const stats = `User: ${user.login}\nBio: ${user.bio || 'None'}\nRepos: ${user.public_repos}\nFollowers: ${user.followers}\nTotal Stars: ${totalStars}\nTop Languages: ${topLangs}`;

    if (type === 'roast') {
      return `Here are the GitHub stats for a developer:\n${stats}\n\nGive me a witty, savage but fun roast of this GitHub profile in 3-4 lines. Do not use markdown, just text.`;
    } else {
      return `Here are the GitHub stats for a developer:\n${stats}\n\nGive me professional career-level feedback and suggestions for this profile in 3-4 lines. Do not use markdown, just text.`;
    }
  };

  const handleRequest = async (type) => {
    setLoading(true);
    setError(null);
    setMode(type);
    setFeedback(null);
    try {
      const prompt = generatePrompt(type);
      const responseText = await fetchAiFeedback(prompt);
      setFeedback(responseText);
    } catch (err) {
      setError(err.message || "AI generation failed. Please check the console or API endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-phantom">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button 
          onClick={() => handleRequest('roast')}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-bokara border border-phantom hover:border-red-300 hover:bg-red-50 text-dusty rounded-xl transition-all disabled:opacity-50"
        >
          <Flame className="w-4 h-4 text-orange-400" />
          <span>Roast My Profile</span>
        </button>
        <button 
          onClick={() => handleRequest('review')}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-bokara border border-phantom hover:border-sphinx/50 hover:bg-sphinx/10 text-dusty rounded-xl transition-all disabled:opacity-50"
        >
          <Briefcase className="w-4 h-4 text-sphinx" />
          <span>Review My Profile</span>
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 text-anchovy">
          <Loader2 className="w-6 h-6 animate-spin mb-2" />
          <p className="text-sm">Analyzing profile data...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {feedback && !loading && (
        <div className="p-5 bg-phantom/20 border border-phantom rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            {mode === 'roast' ? (
              <Flame className="w-4 h-4 text-orange-400" />
            ) : (
              <Briefcase className="w-4 h-4 text-sphinx" />
            )}
            <h4 className="font-medium text-dusty capitalize">AI {mode}</h4>
          </div>
          <TypewriterText text={feedback} />
        </div>
      )}
    </div>
  );
};

export default AiFeedback;
