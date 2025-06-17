import React, { useState, useEffect } from 'react';
import { Book, RefreshCw, Loader2 } from 'lucide-react';
import { getRandomQuranVerse } from '../services/islamicApi';
import { QuranVerse as QuranVerseType } from '../types/islamic';

const QuranVerse: React.FC = () => {
  const [verse, setVerse] = useState<QuranVerseType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchVerse = async () => {
    setLoading(true);
    try {
      const data = await getRandomQuranVerse();
      if (data) {
        setVerse(data);
      }
    } catch (error) {
      console.error('Error fetching verse:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Book className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-bold text-white">Ayat Harian</h2>
        </div>
        <button
          onClick={fetchVerse}
          disabled={loading}
          className="p-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-500 text-white rounded-lg transition-colors duration-200"
          title="Ambil ayat baru"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
        </button>
      </div>

      {verse ? (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-amber-300 mb-2">
              {verse.surahName} - Ayat {verse.ayah}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-right text-xl leading-relaxed mb-4 text-white font-arabic">
              {verse.text}
            </div>
            <div className="text-sm text-gray-300 leading-relaxed">
              {verse.translation}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-300">
            {loading ? 'Memuat ayat...' : 'Gagal memuat ayat'}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranVerse;