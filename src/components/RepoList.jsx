import React from 'react';
import { Star, GitFork, BookOpen } from 'lucide-react';

const RepoList = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  const topRepos = repos.slice(0, 6);

  return (
    <div className="bg-bokara rounded-2xl p-8 border border-phantom shadow-xl animate-fade-in delay-500 h-full">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-sphinx" />
        <h2 className="text-xl font-medium text-anchovy">Top Repositories</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-xl border border-phantom/50 bg-phantom/10 hover:bg-phantom/30 hover:border-sphinx/50 transition-all duration-300 flex flex-col h-full"
          >
            <h3 className="text-dusty font-medium text-lg mb-2 group-hover:text-sphinx transition-colors truncate">
              {repo.name}
            </h3>
            <p className="text-anchovy text-sm mb-4 flex-1 line-clamp-2">
              {repo.description || 'No description provided.'}
            </p>
            <div className="flex items-center gap-4 text-anchovy text-sm mt-auto">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-sphinx" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitFork className="w-4 h-4 text-sphinx" />
                <span>{repo.forks_count}</span>
              </div>
              {repo.language && (
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="w-2.5 h-2.5 rounded-full bg-sphinx opacity-80"></span>
                  <span>{repo.language}</span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
