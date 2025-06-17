import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw } from 'lucide-react';
import { dailyDuas } from '../data/duas';
import { Dua } from '../types/islamic';

const DailyDua: React.FC = () => {
  const [currentDua, setCurrentDua] = useState<Dua | null>(null);

  const getRandomDua = () => {
    const randomIndex = Math.floor(Math.random() * dailyDuas.length);
    setCurrentDua(dailyDuas[randomIndex]);
  };

  useEffect(() => {
    getRandomDua();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-bold text-white">Doa Harian</h2>
        </div>
        <button
          onClick={getRandomDua}
          className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors duration-200"
          title="Ambil doa baru"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {currentDua && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-amber-300 mb-4">
              {currentDua.title}
            </h3>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 space-y-3">
            <div className="text-right text-xl leading-relaxed text-white font-arabic">
              {currentDua.arabic}
            </div>
            
            <div className="text-sm text-gray-300 italic">
              <strong>Transliterasi:</strong> {currentDua.transliteration}
            </div>
            
            <div className="text-sm text-gray-200 leading-relaxed">
              <strong>Artinya:</strong> {currentDua.translation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyDua;