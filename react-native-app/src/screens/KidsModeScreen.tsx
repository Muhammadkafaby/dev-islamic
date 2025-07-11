import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const KidsModeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mode anak-anak (gamifikasi Islam) segera hadir.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#374151' },
});

export default KidsModeScreen;
