import React, { useState } from 'react';
import { Compass, MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { getQiblaDirection } from '../services/islamicApi';

const QiblaFinder: React.FC = () => {
  const [location, setLocation] = useState('');
  const [qiblaUrl, setQiblaUrl] = useState('');
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFindQibla = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Use OpenCage Geocoding API
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=abe50584aa984d488cc527da6f8def78&limit=1`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        const result = getQiblaDirection(lat, lng);
        setQiblaUrl(result.url);
        setQiblaDirection(result.bearing);
      } else {
        // Fallback to predefined coordinates for major Indonesian cities
        const cityCoordinates: Record<string, [number, number]> = {
          'jakarta': [-6.2088, 106.8456],
          'bandung': [-6.9175, 107.6191],
          'surabaya': [-7.2575, 112.7521],
          'medan': [3.5952, 98.6722],
          'yogyakarta': [-7.7956, 110.3695],
          'semarang': [-6.9932, 110.4203],
          'makassar': [-5.1477, 119.4327],
          'palembang': [-2.9761, 104.7754],
          'solo': [-7.5666, 110.8167],
          'malang': [-7.9666, 112.6326],
          'denpasar': [-8.6500, 115.2167],
          'balikpapan': [-1.2379, 116.8529],
          'pontianak': [-0.0263, 109.3425],
          'manado': [1.4748, 124.8421],
          'pekanbaru': [0.5071, 101.4478]
        };
        
        const cityKey = location.toLowerCase();
        const coordinates = cityCoordinates[cityKey];
        
        if (coordinates) {
          const [lat, lng] = coordinates;
          const result = getQiblaDirection(lat, lng);
          setQiblaUrl(result.url);
          setQiblaDirection(result.bearing);
        } else {
          setError('Lokasi tidak ditemukan. Coba nama kota yang lebih spesifik atau gunakan lokasi Anda.');
        }
      }
    } catch (err) {
      setError('Gagal mencari arah kiblat. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError('');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const result = getQiblaDirection(latitude, longitude);
          setQiblaUrl(result.url);
          setQiblaDirection(result.bearing);
          setLocation('Lokasi Anda');
          setLoading(false);
        },
        (error) => {
          setError('Gagal mendapatkan lokasi Anda. Pastikan Anda mengizinkan akses lokasi.');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      setError('Geolocation tidak didukung oleh browser Anda.');
    }
  };

  const getDirectionText = (bearing: number) => {
    const directions = [
      'Utara', 'Timur Laut', 'Timur', 'Tenggara',
      'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'
    ];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="w-6 h-6 text-amber-400" />
        <h2 className="text-xl font-bold text-white">Arah Kiblat</h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Masukkan nama kota atau alamat..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleFindQibla()}
            />
          </div>
          <button
            onClick={handleFindQibla}
            disabled={loading || !location.trim()}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-500 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cari'}
          </button>
        </div>

        <button
          onClick={handleGetCurrentLocation}
          disabled={loading}
          className="w-full py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
          Gunakan Lokasi Saya
        </button>

        {error && (
          <div className="text-red-300 text-sm bg-red-500/20 rounded-lg p-3">
            {error}
          </div>
        )}

        {qiblaUrl && (
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-center mb-4">
              <div className="text-green-300 mb-3">
                <Compass className="w-12 h-12 mx-auto mb-2" />
                <p className="text-lg font-semibold">Arah Kiblat untuk</p>
                <p className="text-amber-300 font-bold">{location}</p>
              </div>
              
              {qiblaDirection !== null && (
                <div className="bg-white/10 rounded-lg p-3 mb-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {Math.round(qiblaDirection)}°
                  </div>
                  <div className="text-sm text-gray-300">
                    {getDirectionText(qiblaDirection)}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <a
                href={qiblaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Buka di Google Maps
              </a>
            </div>
            
            <div className="mt-4 text-xs text-gray-400 text-center">
              💡 Tip: Gunakan kompas untuk menghadap ke arah yang ditunjukkan
            </div>
          </div>
        )}

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-amber-300 mb-2">Informasi:</h4>
          <div className="text-xs text-gray-300 space-y-1">
            <p>• Arah kiblat dihitung berdasarkan koordinat Ka'bah di Makkah</p>
            <p>• Untuk akurasi terbaik, gunakan lokasi GPS Anda</p>
            <p>• Aplikasi ini menggunakan OpenCage Geocoding API</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QiblaFinder;