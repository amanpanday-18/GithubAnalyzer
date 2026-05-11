import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Code2 } from 'lucide-react';

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#FAFAFA', '#A1A1AA', '#27272A'];

const LanguageChart = ({ repos }) => {
  const data = useMemo(() => {
    if (!repos) return [];
    
    const langCounts = {};
    repos.forEach(repo => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });

    const sortedLangs = Object.entries(langCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    return sortedLangs;
  }, [repos]);

  if (data.length === 0) return null;

  return (
    <div className="bg-bokara rounded-2xl p-8 border border-phantom shadow-xl animate-fade-in delay-500 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <Code2 className="w-6 h-6 text-sphinx" />
        <h2 className="text-xl font-medium text-anchovy">Top Languages</h2>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181B', borderColor: '#27272A', color: '#FAFAFA', borderRadius: '0.5rem' }}
              itemStyle={{ color: '#FAFAFA' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ color: '#A1A1AA', fontSize: '14px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageChart;
