import React, { useState, useEffect } from 'react';
import { Calendar, Moon } from 'lucide-react';
import { getSunnahFastingForMonth } from '../data/sunnahFasting';
import { SunnahFasting as SunnahFastingType } from '../types/islamic';

const SunnahFasting: React.FC = () => {
  const [fastingList, setFastingList] = useState<SunnahFastingType[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1; // JavaScript months are 0-indexed
    const year = now.getFullYear();
    
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    setCurrentMonth(monthNames[month - 1]);
    setFastingList(getSunnahFastingForMonth(month, year));
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'wajib':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'sunnah':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'mustahab':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Moon className="w-6 h-6 text-amber-400" />
        <h2 className="text-xl font-bold text-white">Puasa Sunnah</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-300">
          <Calendar className="w-4 h-4" />
          <span className="font-medium">Bulan {currentMonth}</span>
        </div>

        <div className="space-y-3">
          {fastingList.map((fasting, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">
                  {fasting.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(fasting.type)} capitalize`}>
                  {fasting.type}
                </span>
              </div>
              
              <div className="text-sm text-amber-300 mb-2">
                📅 {fasting.date}
              </div>
              
              <div className="text-sm text-gray-300 leading-relaxed">
                {fasting.description}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-semibold text-amber-300 mb-2">Keterangan:</h4>
          <div className="text-xs text-gray-300 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500/50 rounded-full"></span>
              <span>Wajib - Harus dilakukan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500/50 rounded-full"></span>
              <span>Sunnah - Dianjurkan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500/50 rounded-full"></span>
              <span>Mustahab - Baik jika dilakukan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunnahFasting;