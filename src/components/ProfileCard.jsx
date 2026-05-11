import React from 'react';
import { MapPin, Building, Link as LinkIcon, AtSign } from 'lucide-react';
import AiFeedback from './AiFeedback';

const ProfileCard = ({ user, repos }) => {
  if (!user) return null;

  return (
    <div className="bg-bokara rounded-2xl p-8 border border-phantom shadow-xl animate-fade-in delay-200 h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <img 
            src={user.avatar_url} 
            alt={`${user.login}'s avatar`} 
            className="w-32 h-32 rounded-full border-4 border-phantom shadow-lg"
          />
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-dusty mb-1">{user.name || user.login}</h1>
          <a 
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sphinx hover:text-dusty transition-colors inline-block mb-4"
          >
            @{user.login}
          </a>
          
          {user.bio && (
            <p className="text-anchovy text-sm leading-relaxed mb-4 max-w-xl">
              {user.bio}
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {user.location && (
          <div className="flex items-center text-anchovy gap-3">
            <MapPin className="w-5 h-5 text-sphinx shrink-0" />
            <span className="text-sm truncate">{user.location}</span>
          </div>
        )}
        {user.company && (
          <div className="flex items-center text-anchovy gap-3">
            <Building className="w-5 h-5 text-sphinx shrink-0" />
            <span className="text-sm truncate">{user.company}</span>
          </div>
        )}
        {user.blog && (
          <div className="flex items-center text-anchovy gap-3">
            <LinkIcon className="w-5 h-5 text-sphinx shrink-0" />
            <a 
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-dusty transition-colors truncate"
            >
              {user.blog}
            </a>
          </div>
        )}
        {user.twitter_username && (
          <div className="flex items-center text-anchovy gap-3">
            <AtSign className="w-5 h-5 text-sphinx shrink-0" />
            <a 
              href={`https://twitter.com/${user.twitter_username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-dusty transition-colors truncate"
            >
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>

      <AiFeedback user={user} repos={repos} />
    </div>
  );
};

export default ProfileCard;
