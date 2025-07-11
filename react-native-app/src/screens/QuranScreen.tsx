import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuranScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Halaman Quran (placeholder)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#374151' },
});

export default QuranScreen;
