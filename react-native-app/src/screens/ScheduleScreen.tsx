import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const ScheduleScreen = () => {
  const [hijri, setHijri] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHijri = async () => {
      try {
        const d = new Date();
        const date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
        const res = await fetch(`https://api.aladhan.com/v1/gToH?date=${date}`);
        const data = await res.json();
        if (data.data) {
          const h = data.data.hijri;
          setHijri(`${h.day} ${h.month.en} ${h.year}`);
        }
      } catch {
        setHijri('');
      } finally {
        setLoading(false);
      }
    };
    fetchHijri();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#10b981" />
      ) : (
        <Text style={styles.text}>Tanggal Hijriah hari ini: {hijri}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: { fontSize: 18, color: '#374151' },
});

export default ScheduleScreen;
