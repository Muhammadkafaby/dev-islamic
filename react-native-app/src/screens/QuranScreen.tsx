import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DailyVerse from '../components/DailyVerse';

const QuranScreen = () => {
  return (
    <View style={styles.container}>
      <DailyVerse />
      <Text style={styles.text}>Halaman Quran (placeholder)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  text: { fontSize: 18, color: '#374151', marginTop: 16 },
});

export default QuranScreen;
