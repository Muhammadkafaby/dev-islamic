import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SholatScreen from '../screens/SholatScreen';
import QuranScreen from '../screens/QuranScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import CommunityScreen from '../screens/CommunityScreen';
import AssistantScreen from '../screens/AssistantScreen';
import { MosqueIcon, QuranIcon, CalendarIcon, CommunityIcon, ChatIcon } from '../components/Icons';

const Tab = createBottomTabNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#10b981',
    background: '#ffffff',
  },
};

const TabNavigator = () => (
  <NavigationContainer theme={AppTheme}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Sholat':
              return <MosqueIcon color={color} size={size} />;
            case 'Quran':
              return <QuranIcon color={color} size={size} />;
            case 'Jadwal':
              return <CalendarIcon color={color} size={size} />;
            case 'Komunitas':
              return <CommunityIcon color={color} size={size} />;
            case 'AI Assistant':
              return <ChatIcon color={color} size={size} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Sholat" component={SholatScreen} />
      <Tab.Screen name="Quran" component={QuranScreen} />
      <Tab.Screen name="Jadwal" component={ScheduleScreen} />
      <Tab.Screen name="Komunitas" component={CommunityScreen} />
      <Tab.Screen name="AI Assistant" component={AssistantScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default TabNavigator;
