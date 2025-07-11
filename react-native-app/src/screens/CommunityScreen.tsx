import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CommunityStackParamList } from '../navigation/CommunityNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavProp = NativeStackNavigationProp<CommunityStackParamList, 'CommunityHome'>;

const CommunityScreen = () => {
  const navigation = useNavigation<NavProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Komunitas</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HalalScanner')}
      >
        <Text style={styles.buttonText}>Scan Produk Halal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('KidsMode')}
      >
        <Text style={styles.buttonText}>Mode Anak-anak</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, color: '#374151', marginBottom: 16 },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default CommunityScreen;
