import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from '../screens/CommunityScreen';
import HalalScannerScreen from '../screens/HalalScannerScreen';
import KidsModeScreen from '../screens/KidsModeScreen';

export type CommunityStackParamList = {
  CommunityHome: undefined;
  HalalScanner: undefined;
  KidsMode: undefined;
};

const Stack = createNativeStackNavigator<CommunityStackParamList>();

const CommunityNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CommunityHome"
      component={CommunityScreen}
      options={{ title: 'Komunitas' }}
    />
    <Stack.Screen
      name="HalalScanner"
      component={HalalScannerScreen}
      options={{ title: 'Halal Scanner' }}
    />
    <Stack.Screen
      name="KidsMode"
      component={KidsModeScreen}
      options={{ title: 'Mode Anak' }}
    />
  </Stack.Navigator>
);

export default CommunityNavigator;
