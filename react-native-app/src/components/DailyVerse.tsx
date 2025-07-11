import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface Verse {
  arabic: string;
  translation: string;
}

const DailyVerse = () => {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const randomAyah = Math.floor(Math.random() * 6236) + 1;
        const [arRes, enRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/ayah/${randomAyah}`),
          fetch(`https://api.alquran.cloud/v1/ayah/${randomAyah}/en.asad`),
        ]);
        const ar = await arRes.json();
        const en = await enRes.json();
        setVerse({ arabic: ar.data.text, translation: en.data.text });
      } catch (e) {
        setError('Failed to load verse');
      } finally {
        setLoading(false);
      }
    };
    fetchVerse();
  }, []);

  if (loading) return <ActivityIndicator size="small" color="#10b981" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.arabic}>{verse?.arabic}</Text>
      <Text style={styles.translation}>{verse?.translation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  arabic: {
    fontSize: 20,
    textAlign: 'center',
    color: '#065f46',
    marginBottom: 8,
  },
  translation: {
    fontSize: 14,
    textAlign: 'center',
    color: '#334155',
  },
});

export default DailyVerse;
