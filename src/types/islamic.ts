export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

export interface QuranVerse {
  text: string;
  translation: string;
  surah: string;
  ayah: number;
  surahName: string;
}

export interface Dua {
  title: string;
  arabic: string;
  translation: string;
  transliteration: string;
}

export interface SunnahFasting {
  date: string;
  title: string;
  description: string;
  type: 'wajib' | 'sunnah' | 'mustahab';
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  translation?: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}

export interface QuranSearchResult {
  ayah: Ayah;
  matches: string[];
}