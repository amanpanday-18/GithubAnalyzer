import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import StatsCard from './components/StatsCard';
import ScoreCard from './components/ScoreCard';
import PersonaCard from './components/PersonaCard';
import LanguageChart from './components/LanguageChart';
import RepoList from './components/RepoList';
import SkeletonLoader from './components/SkeletonLoader';
import BattleMode from './components/BattleMode';
import { fetchAllUserData } from './utils/github';
import { AlertCircle, Swords } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.1-3.8s-1.3-.4-4 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-4-1.4-4-1.4a5.4 5.4 0 0 0-.1 3.8A5.4 5.4 0 0 0 2 8.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isBattleMode, setIsBattleMode] = useState(false);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const result = await fetchAllUserData(username);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 overflow-x-hidden relative">
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <button 
          onClick={() => setIsBattleMode(!isBattleMode)}
          className="px-4 py-2 bg-bokara border border-phantom hover:border-sphinx text-dusty rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg"
        >
          <Swords className="w-4 h-4 text-sphinx" />
          <span className="hidden sm:inline">{isBattleMode ? 'Standard Mode' : 'Battle Mode'}</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {isBattleMode ? (
          <BattleMode />
        ) : (
          <>
            {/* Header & Search */}
            <div className="text-center space-y-6 pt-4">
              <div className="flex justify-center items-center gap-3 animate-fade-in">
                <div className="p-3 bg-bokara rounded-2xl shadow-lg border border-phantom">
                  <GithubIcon className="w-10 h-10 text-dusty" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-dusty">
                  Git<span className="text-sphinx">Analyze</span>
                </h1>
              </div>
              <p className="text-anchovy max-w-2xl mx-auto text-lg animate-fade-in delay-100">
                A premium GitHub profile analyzer. Discover developer metrics, popular repositories, and language statistics in an elegant interface.
              </p>
              <SearchBar onSearch={handleSearch} isLoading={loading} />
            </div>

            {/* Error State */}
            {error && (
              <div className="max-w-2xl mx-auto bg-bokara border border-red-900/50 rounded-xl p-6 flex items-center gap-4 animate-fade-in shadow-xl">
                <AlertCircle className="w-8 h-8 text-red-400 shrink-0" />
                <div>
                  <h3 className="text-red-400 font-medium text-lg">Analysis Failed</h3>
                  <p className="text-anchovy mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && <SkeletonLoader />}

            {/* Dashboard */}
            {data && !loading && (
              <div className="space-y-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <ProfileCard user={data.user} repos={data.repos} />
                  </div>
                  <div className="flex flex-col gap-8 h-full">
                    <ScoreCard user={data.user} repos={data.repos} />
                    <PersonaCard user={data.user} repos={data.repos} />
                  </div>
                </div>

                <StatsCard user={data.user} repos={data.repos} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="h-full">
                    <LanguageChart repos={data.repos} />
                  </div>
                  <div className="lg:col-span-2">
                    <RepoList repos={data.repos} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
