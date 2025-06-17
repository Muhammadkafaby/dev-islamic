import React, { useState } from 'react';
import { Clock, MapPin, Loader2 } from 'lucide-react';
import { getPrayerTimes } from '../services/islamicApi';
import { PrayerTimes as PrayerTimesType } from '../types/islamic';

const PrayerTimes: React.FC = () => {
  const [city, setCity] = useState('');
  const [prayerData, setPrayerData] = useState<{ city: string; times: PrayerTimesType; date: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await getPrayerTimes(city);
      if (data) {
        setPrayerData(data);
      } else {
        setError('Kota tidak ditemukan. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Gagal mengambil data waktu sholat.');
    } finally {
      setLoading(false);
    }
  };

  const prayerNames = {
    Fajr: 'Subuh',
    Dhuhr: 'Dzuhur',
    Asr: 'Ashar',
    Maghrib: 'Maghrib',
    Isha: 'Isya',
    Sunrise: 'Matahari Terbit'
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-amber-400" />
        <h2 className="text-xl font-bold text-white">Waktu Sholat</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Masukkan nama kota..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !city.trim()}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-500 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cari'}
          </button>
        </div>

        {error && (
          <div className="text-red-300 text-sm bg-red-500/20 rounded-lg p-3">
            {error}
          </div>
        )}

        {prayerData && (
          <div className="space-y-3">
            <div className="text-center py-2">
              <h3 className="text-lg font-semibold text-amber-300 capitalize">{prayerData.city}</h3>
              <p className="text-sm text-gray-300">{prayerData.date}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(prayerData.times).map(([key, time]) => (
                <div key={key} className="bg-white/5 rounded-lg p-3 text-center hover:bg-white/10 transition-colors duration-200">
                  <div className="text-sm text-gray-300 mb-1">
                    {prayerNames[key as keyof typeof prayerNames] || key}
                  </div>
                  <div className="text-lg font-bold text-white">
                    {time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerTimes;