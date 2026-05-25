import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative group animate-fade-in delay-100">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-anchovy group-focus-within:text-sphinx transition-colors duration-300" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-4 bg-bokara border border-phantom rounded-xl text-dusty placeholder-anchovy focus:outline-none focus:ring-2 focus:ring-phantom focus:border-transparent transition-all duration-300 shadow-lg"
        placeholder="Enter GitHub username (e.g., torvalds)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="absolute right-2 top-2 bottom-2 px-6 bg-sphinx hover:bg-[#033B28] text-white rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Searching...' : 'Analyze'}
      </button>
    </form>
  );
};

export default SearchBar;
