import React from 'react';
import { calculateScore } from '../utils/scoreCalculator';
import { Award } from 'lucide-react';

const ScoreCard = ({ user, repos }) => {
  if (!user || !repos) return null;

  const { grade, score, message, color } = calculateScore(user, repos);

  return (
    <div className="bg-bokara rounded-2xl p-8 border border-phantom shadow-xl flex flex-col items-center justify-center text-center animate-fade-in delay-400 h-full">
      <div className="mb-4 bg-phantom/30 p-4 rounded-full">
        <Award className={`w-12 h-12 ${color}`} />
      </div>
      <h2 className="text-xl font-medium text-anchovy mb-2">Profile Grade</h2>
      <div className={`text-6xl font-bold mb-4 drop-shadow-lg ${color}`}>
        {grade}
      </div>
      <p className="text-dusty font-medium mb-1">Score: {score.toLocaleString()}</p>
      <p className="text-anchovy text-sm">{message}</p>
    </div>
  );
};

export default ScoreCard;
