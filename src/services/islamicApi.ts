import { PrayerTimes, QuranVerse, Surah, Ayah, QuranSearchResult } from '../types/islamic';

const ALADHAN_API = 'https://api.aladhan.com/v1';
const QURAN_API = 'https://api.alquran.cloud/v1';

export const getPrayerTimes = async (city: string): Promise<{ city: string; times: PrayerTimes; date: string } | null> => {
  try {
    const response = await fetch(`${ALADHAN_API}/timingsByCity?city=${city}&country=Indonesia`);
    const data = await response.json();
    
    if (data.code === 200) {
      return {
        city: city,
        times: data.data.timings,
        date: data.data.date.readable
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
};

export const getRandomQuranVerse = async (): Promise<QuranVerse | null> => {
  try {
    // Get random surah (1-114) and ayah
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    
    // Get surah info first to know the number of ayahs
    const surahResponse = await fetch(`${QURAN_API}/surah/${randomSurah}`);
    const surahData = await surahResponse.json();
    
    if (surahData.code === 200) {
      const totalAyahs = surahData.data.numberOfAyahs;
      const randomAyah = Math.floor(Math.random() * totalAyahs) + 1;
      
      // Get Arabic text
      const arabicResponse = await fetch(`${QURAN_API}/ayah/${randomSurah}:${randomAyah}`);
      const arabicData = await arabicResponse.json();
      
      // Get Indonesian translation
      const translationResponse = await fetch(`${QURAN_API}/ayah/${randomSurah}:${randomAyah}/id.indonesian`);
      const translationData = await translationResponse.json();
      
      if (arabicData.code === 200 && translationData.code === 200) {
        return {
          text: arabicData.data.text,
          translation: translationData.data.text,
          surah: randomSurah.toString(),
          ayah: randomAyah,
          surahName: arabicData.data.surah.englishName
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching Quran verse:', error);
    return null;
  }
};

export const getAllSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${QURAN_API}/surah`);
    const data = await response.json();
    
    if (data.code === 200) {
      return data.data.map((surah: any) => ({
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        englishNameTranslation: surah.englishNameTranslation,
        numberOfAyahs: surah.numberOfAyahs,
        revelationType: surah.revelationType
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching surahs:', error);
    return [];
  }
};

export const getSurahWithTranslation = async (surahNumber: number): Promise<{ arabic: Ayah[]; translation: Ayah[] } | null> => {
  try {
    // Get Arabic text
    const arabicResponse = await fetch(`${QURAN_API}/surah/${surahNumber}`);
    const arabicData = await arabicResponse.json();
    
    // Get Indonesian translation
    const translationResponse = await fetch(`${QURAN_API}/surah/${surahNumber}/id.indonesian`);
    const translationData = await translationResponse.json();
    
    if (arabicData.code === 200 && translationData.code === 200) {
      return {
        arabic: arabicData.data.ayahs,
        translation: translationData.data.ayahs
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching surah:', error);
    return null;
  }
};

export const searchQuran = async (query: string): Promise<QuranSearchResult[]> => {
  try {
    const response = await fetch(`${QURAN_API}/search/${encodeURIComponent(query)}/all/id.indonesian`);
    const data = await response.json();
    
    if (data.code === 200) {
      return data.data.matches.map((match: any) => ({
        ayah: {
          number: match.numberInSurah,
          text: match.text,
          surah: {
            number: match.surah.number,
            name: match.surah.name,
            englishName: match.surah.englishName
          }
        },
        matches: [query]
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching Quran:', error);
    return [];
  }
};

export const getQiblaDirection = (latitude: number, longitude: number): { url: string; bearing: number } => {
  // Kaaba coordinates
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;
  
  // Calculate bearing to Kaaba
  const dLng = (kaabaLng - longitude) * Math.PI / 180;
  const lat1 = latitude * Math.PI / 180;
  const lat2 = kaabaLat * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  
  const bearing = Math.atan2(y, x) * 180 / Math.PI;
  const qiblaDirection = (bearing + 360) % 360;
  
  return {
    url: `https://www.google.com/maps/dir/${latitude},${longitude}/21.4225,39.8262`,
    bearing: qiblaDirection
  };
};