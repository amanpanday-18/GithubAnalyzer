import React from 'react';
import { Book, Users, UserPlus, Star, GitFork, FileCode } from 'lucide-react';
import useCountUp from '../hooks/useCountUp';

const StatItem = ({ icon: Icon, label, value }) => {
  const isNumber = typeof value === 'number';
  const animatedValue = useCountUp(isNumber ? value : 0, 1500);

  return (
    <div className="bg-phantom bg-opacity-30 rounded-xl p-5 border border-phantom/50 flex items-center gap-4 hover:bg-phantom/40 transition-colors">
      <div className="p-3 bg-bokara rounded-lg text-sphinx shadow-inner">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-anchovy text-sm font-medium">{label}</p>
        <p className="text-dusty text-2xl font-bold mt-1">
          {isNumber ? animatedValue.toLocaleString() : value}
        </p>
      </div>
    </div>
  );
};

const StatsCard = ({ user, repos }) => {
  if (!user || !repos) return null;

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

  const stats = [
    { icon: Book, label: 'Public Repos', value: user.public_repos },
    { icon: Users, label: 'Followers', value: user.followers },
    { icon: UserPlus, label: 'Following', value: user.following },
    { icon: Star, label: 'Total Stars', value: totalStars },
    { icon: GitFork, label: 'Total Forks', value: totalForks },
    { icon: FileCode, label: 'Public Gists', value: user.public_gists }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in delay-300">
      {stats.map((stat, idx) => (
        <StatItem key={idx} icon={stat.icon} label={stat.label} value={stat.value} />
      ))}
    </div>
  );
};

export default StatsCard;
