export const fetchPrayerTimes = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`
    );
    const data = await response.json();
    if (data.code === 200) {
      return data.data.timings as { [key: string]: string };
    }
    return null;
  } catch (e) {
    console.error('Prayer time fetch failed', e);
    return null;
  }
};
