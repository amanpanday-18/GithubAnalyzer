import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-pulse mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-bokara rounded-2xl p-8 border border-phantom h-full flex flex-col sm:flex-row gap-6 min-h-[200px]">
          <div className="w-32 h-32 rounded-full bg-phantom/50 shrink-0"></div>
          <div className="flex-1 space-y-4 py-2">
            <div className="h-8 bg-phantom/50 rounded w-1/2"></div>
            <div className="h-4 bg-phantom/50 rounded w-1/4"></div>
            <div className="space-y-2 pt-4">
              <div className="h-4 bg-phantom/50 rounded w-3/4"></div>
              <div className="h-4 bg-phantom/50 rounded w-2/3"></div>
            </div>
          </div>
        </div>
        <div className="bg-bokara rounded-2xl p-8 border border-phantom min-h-[200px] flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-phantom/50"></div>
          <div className="h-6 bg-phantom/50 rounded w-1/2"></div>
          <div className="h-12 bg-phantom/50 rounded w-1/3 mt-2"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-phantom/20 rounded-xl p-5 border border-phantom/50 h-24 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-phantom/50"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-phantom/50 rounded w-1/2"></div>
              <div className="h-6 bg-phantom/50 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-bokara rounded-2xl p-8 border border-phantom h-[420px] flex flex-col">
          <div className="h-6 bg-phantom/50 rounded w-1/2 mb-8"></div>
          <div className="flex-1 flex justify-center items-center">
             <div className="w-48 h-48 rounded-full bg-phantom/50"></div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-bokara rounded-2xl p-8 border border-phantom h-[420px] flex flex-col">
          <div className="h-6 bg-phantom/50 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-5 rounded-xl border border-phantom/50 bg-phantom/10 flex flex-col justify-between">
                <div className="h-5 bg-phantom/50 rounded w-2/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-phantom/50 rounded w-full"></div>
                  <div className="h-4 bg-phantom/50 rounded w-4/5"></div>
                </div>
                <div className="h-4 bg-phantom/50 rounded w-1/3 mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
