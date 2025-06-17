import { SunnahFasting } from '../types/islamic';

export const getSunnahFastingForMonth = (month: number, year: number): SunnahFasting[] => {
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const commonFasting: SunnahFasting[] = [
    {
      date: 'Setiap Senin dan Kamis',
      title: 'Puasa Senin Kamis',
      description: 'Puasa sunnah yang dianjurkan setiap hari Senin dan Kamis',
      type: 'sunnah'
    },
    {
      date: 'Tanggal 13, 14, 15 (Ayyamul Bidh)',
      title: 'Puasa Ayyamul Bidh',
      description: 'Puasa di hari-hari putih (bulan purnama) setiap bulan Hijriah',
      type: 'sunnah'
    }
  ];

  // Add specific fasting for certain months
  const specificFasting: Record<number, SunnahFasting[]> = {
    1: [
      {
        date: '1 Januari',
        title: 'Puasa Tahun Baru',
        description: 'Puasa di awal tahun untuk mengawali dengan ketakwaan',
        type: 'mustahab'
      }
    ],
    8: [
      {
        date: '9 Agustus (perkiraan)',
        title: 'Puasa Arafah',
        description: 'Puasa di hari Arafah (9 Dzulhijjah) sangat dianjurkan',
        type: 'sunnah'
      }
    ],
    9: [
      {
        date: '10 September (perkiraan)',
        title: 'Puasa Asyura',
        description: 'Puasa di hari Asyura (10 Muharram) dengan hari sebelum atau sesudahnya',
        type: 'sunnah'
      }
    ],
    11: [
      {
        date: 'Sepanjang bulan (kecuali yang diharamkan)',
        title: 'Puasa Bulan Sya\'ban',
        description: 'Puasa sunnah di bulan Sya\'ban sebagai persiapan Ramadhan',
        type: 'sunnah'
      }
    ]
  };

  return [...commonFasting, ...(specificFasting[month] || [])];
};