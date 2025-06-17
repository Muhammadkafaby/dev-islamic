import React, { useState } from 'react';
import { Parentheses as Crescent, Home, Book, Clock, Heart, Compass, Moon } from 'lucide-react';
import PrayerTimes from './components/PrayerTimes';
import QuranVerse from './components/QuranVerse';
import DailyDua from './components/DailyDua';
import QiblaFinder from './components/QiblaFinder';
import SunnahFasting from './components/SunnahFasting';
import QuranReader from './components/QuranReader';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'quran'>('home');

  const navigationItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'quran', label: 'Al-Quran', icon: Book },
  ];

  const renderHomePage = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Prayer Times */}
      <div className="lg:col-span-1">
        <PrayerTimes />
      </div>

      {/* Quran Verse */}
      <div className="lg:col-span-1">
        <QuranVerse />
      </div>

      {/* Daily Dua */}
      <div className="lg:col-span-1">
        <DailyDua />
      </div>

      {/* Qibla Finder */}
      <div className="lg:col-span-1">
        <QiblaFinder />
      </div>

      {/* Sunnah Fasting */}
      <div className="lg:col-span-2">
        <SunnahFasting />
      </div>
    </div>
  );

  const renderQuranPage = () => (
    <div className="max-w-4xl mx-auto">
      <QuranReader />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-800 to-emerald-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <Crescent className="w-8 h-8 text-amber-400" />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-1">Islamic Bot</h1>
              <p className="text-sm text-gray-300">Aplikasi Pendamping Muslim Sehari-hari</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as 'home' | 'quran')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-amber-500 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'quran' && renderQuranPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-md border-t border-white/20 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-300">
              © 2024 Islamic Bot - Dibuat dengan ❤️ untuk umat Muslim
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Data dari Aladhan API & Alquran.cloud
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;