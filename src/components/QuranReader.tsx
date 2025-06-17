import React, { useState, useEffect } from 'react';
import { Book, Search, ArrowLeft, Bookmark, Play, Pause } from 'lucide-react';
import { getAllSurahs, getSurahWithTranslation, searchQuran } from '../services/islamicApi';
import { Surah, Ayah, QuranSearchResult } from '../types/islamic';

const QuranReader: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [surahData, setSurahData] = useState<{ arabic: Ayah[]; translation: Ayah[] } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<QuranSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'read' | 'search'>('list');

  useEffect(() => {
    loadSurahs();
    loadBookmarks();
  }, []);

  const loadSurahs = async () => {
    setLoading(true);
    const data = await getAllSurahs();
    setSurahs(data);
    setLoading(false);
  };

  const loadBookmarks = () => {
    const saved = localStorage.getItem('quran-bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  };

  const saveBookmarks = (newBookmarks: string[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem('quran-bookmarks', JSON.stringify(newBookmarks));
  };

  const handleSurahSelect = async (surahNumber: number) => {
    setLoading(true);
    setSelectedSurah(surahNumber);
    const data = await getSurahWithTranslation(surahNumber);
    setSurahData(data);
    setCurrentView('read');
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    const results = await searchQuran(searchQuery);
    setSearchResults(results);
    setCurrentView('search');
    setLoading(false);
  };

  const toggleBookmark = (ayahId: string) => {
    const newBookmarks = bookmarks.includes(ayahId)
      ? bookmarks.filter(id => id !== ayahId)
      : [...bookmarks, ayahId];
    saveBookmarks(newBookmarks);
  };

  const renderSurahList = () => (
    <div className="space-y-3">
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ayat dalam Al-Quran..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !searchQuery.trim()}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-500 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Cari
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {surahs.map((surah) => (
          <div
            key={surah.number}
            onClick={() => handleSurahSelect(surah.number)}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {surah.number}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{surah.englishName}</h3>
                  <p className="text-gray-300 text-sm">{surah.englishNameTranslation}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-amber-300 font-arabic text-lg mb-1">{surah.name}</div>
                <div className="text-gray-400 text-xs">
                  {surah.numberOfAyahs} ayat • {surah.revelationType}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSurahReader = () => {
    if (!surahData || !selectedSurah) return null;

    const selectedSurahInfo = surahs.find(s => s.number === selectedSurah);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentView('list')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">{selectedSurahInfo?.englishName}</h2>
            <p className="text-amber-300 font-arabic text-lg">{selectedSurahInfo?.name}</p>
          </div>
          <div className="w-20"></div>
        </div>

        <div className="space-y-6">
          {surahData.arabic.map((ayah, index) => {
            const translation = surahData.translation[index];
            const ayahId = `${selectedSurah}:${ayah.numberInSurah}`;
            const isBookmarked = bookmarks.includes(ayahId);

            return (
              <div key={ayah.numberInSurah} className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {ayah.numberInSurah}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookmark(ayahId)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      isBookmarked ? 'bg-amber-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-right text-xl leading-relaxed mb-4 text-white font-arabic">
                  {ayah.text}
                </div>
                
                <div className="text-sm text-gray-300 leading-relaxed">
                  {translation?.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSearchResults = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentView('list')}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Hasil Pencarian</h2>
          <p className="text-gray-300">"{searchQuery}" - {searchResults.length} hasil</p>
        </div>
        <div className="w-20"></div>
      </div>

      <div className="space-y-4">
        {searchResults.map((result, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-amber-300 font-semibold">
                {result.ayah.surah.englishName} - Ayat {result.ayah.number}
              </div>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed">
              {result.ayah.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Book className="w-6 h-6 text-amber-400" />
        <h2 className="text-xl font-bold text-white">Al-Quran</h2>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-300">Memuat...</div>
        </div>
      ) : (
        <>
          {currentView === 'list' && renderSurahList()}
          {currentView === 'read' && renderSurahReader()}
          {currentView === 'search' && renderSearchResults()}
        </>
      )}
    </div>
  );
};

export default QuranReader;