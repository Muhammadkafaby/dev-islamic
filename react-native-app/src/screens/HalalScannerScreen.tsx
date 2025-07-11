import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HalalScannerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fitur scan produk halal akan hadir.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: '#374151' },
});

export default HalalScannerScreen;
