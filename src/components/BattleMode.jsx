import React, { useState } from 'react';
import { fetchAllUserData } from '../utils/github';
import { Loader2, AlertCircle, Swords } from 'lucide-react';

const BattleStat = ({ label, val1, val2, invertWinner = false }) => {
  let win1 = val1 > val2;
  let win2 = val2 > val1;
  let draw = val1 === val2;

  if (invertWinner) {
    win1 = val1 < val2;
    win2 = val2 < val1;
  }

  const formatVal = (v) => {
    if (v instanceof Date) return v.getFullYear();
    return typeof v === 'number' ? v.toLocaleString() : v;
  };

  return (
    <div className="grid grid-cols-3 gap-4 items-center py-4 border-b border-phantom last:border-0">
      <div className={`text-center font-bold text-lg ${win1 ? 'text-dusty' : draw ? 'text-sphinx' : 'text-anchovy'}`}>
        {formatVal(val1)} {win1 && '🏆'}
      </div>
      <div className="text-center text-sphinx text-sm uppercase tracking-wider font-medium">
        {label}
      </div>
      <div className={`text-center font-bold text-lg ${win2 ? 'text-dusty' : draw ? 'text-sphinx' : 'text-anchovy'}`}>
        {win2 && '🏆'} {formatVal(val2)}
      </div>
    </div>
  );
};

const BattleMode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const handleBattle = async (e) => {
    e.preventDefault();
    if (!input1.trim() || !input2.trim()) return;
    
    setLoading(true);
    setError(null);
    setData1(null);
    setData2(null);
    
    try {
      const [res1, res2] = await Promise.all([
        fetchAllUserData(input1.trim()),
        fetchAllUserData(input2.trim())
      ]);
      setData1(res1);
      setData2(res2);
    } catch (err) {
      setError(err.message || 'Battle failed. Please check usernames and try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (data) => {
    if (!data) return {};
    const { user, repos } = data;
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
    const langs = new Set(repos.map(r => r.language).filter(Boolean));
    const createdDate = new Date(user.created_at);

    return {
      followers: user.followers,
      stars: totalStars,
      repos: user.public_repos,
      forks: totalForks,
      langs: langs.size,
      created: createdDate,
    };
  };

  const renderBattle = () => {
    if (!data1 || !data2) return null;
    
    const m1 = calculateMetrics(data1);
    const m2 = calculateMetrics(data2);

    let wins1 = 0;
    let wins2 = 0;

    const compare = (v1, v2, invert = false) => {
      if (v1 === v2) return;
      let w1 = v1 > v2;
      if (invert) w1 = v1 < v2;
      w1 ? wins1++ : wins2++;
    };

    compare(m1.followers, m2.followers);
    compare(m1.stars, m2.stars);
    compare(m1.repos, m2.repos);
    compare(m1.forks, m2.forks);
    compare(m1.langs, m2.langs);
    compare(m1.created.getTime(), m2.created.getTime(), true); 

    let winnerText = "It's a Draw! 🤝";
    if (wins1 > wins2) winnerText = `${data1.user.login} Wins! 🏆`;
    if (wins2 > wins1) winnerText = `${data2.user.login} Wins! 🏆`;

    return (
      <div className="bg-bokara border border-phantom rounded-2xl p-6 md:p-10 shadow-xl animate-fade-in mt-12 w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-dusty mb-2">{winnerText}</h2>
          <p className="text-sphinx">
            {data1.user.login} ({wins1}) vs {data2.user.login} ({wins2})
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <img src={data1.user.avatar_url} alt={data1.user.login} className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border-4 border-phantom shadow-lg mb-4" />
            <h3 className="text-lg md:text-xl font-bold text-dusty truncate">@{data1.user.login}</h3>
          </div>
          <div className="flex items-center justify-center">
            <Swords className="w-8 h-8 md:w-12 md:h-12 text-sphinx opacity-50" />
          </div>
          <div className="text-center">
            <img src={data2.user.avatar_url} alt={data2.user.login} className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border-4 border-phantom shadow-lg mb-4" />
            <h3 className="text-lg md:text-xl font-bold text-dusty truncate">@{data2.user.login}</h3>
          </div>
        </div>

        <div className="bg-phantom/20 rounded-xl p-4 md:p-6 border border-phantom/50 overflow-x-auto">
          <BattleStat label="Followers" val1={m1.followers} val2={m2.followers} />
          <BattleStat label="Total Stars" val1={m1.stars} val2={m2.stars} />
          <BattleStat label="Repositories" val1={m1.repos} val2={m2.repos} />
          <BattleStat label="Forks" val1={m1.forks} val2={m2.forks} />
          <BattleStat label="Languages Used" val1={m1.langs} val2={m2.langs} />
          <BattleStat label="Account Age" val1={m1.created} val2={m2.created} invertWinner />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10 animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-bokara rounded-full border border-phantom shadow-lg">
            <Swords className="w-8 h-8 text-sphinx" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-dusty mb-2">Profile Battle</h2>
        <p className="text-anchovy">Enter two GitHub usernames to compare their stats side-by-side.</p>
      </div>

      <form onSubmit={handleBattle} className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto animate-fade-in delay-100">
        <input
          type="text"
          className="flex-1 px-6 py-4 bg-bokara border border-phantom rounded-xl text-dusty placeholder-anchovy focus:outline-none focus:border-sphinx transition-colors shadow-lg"
          placeholder="Player 1 username"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <div className="flex items-center justify-center font-bold text-sphinx italic">VS</div>
        <input
          type="text"
          className="flex-1 px-6 py-4 bg-bokara border border-phantom rounded-xl text-dusty placeholder-anchovy focus:outline-none focus:border-sphinx transition-colors shadow-lg"
          placeholder="Player 2 username"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || !input1.trim() || !input2.trim()}
          className="px-8 py-4 bg-phantom hover:bg-phantom/80 text-dusty rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Battle!'}
        </button>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto mt-8 bg-bokara border border-red-900/50 rounded-xl p-6 flex items-center gap-4 animate-fade-in">
          <AlertCircle className="w-8 h-8 text-red-400 shrink-0" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {renderBattle()}
    </div>
  );
};

export default BattleMode;
