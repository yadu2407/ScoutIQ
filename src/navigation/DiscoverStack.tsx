import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

export const DiscoverStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: { color: '#2C3E50', fontWeight: '600' },
        headerTintColor: '#3498DB',
        headerShadowVisible: false
      }}
    >
      <Stack.Screen 
        name="DiscoverFeed" 
        component={DiscoverScreen} 
        options={{ title: 'Discover Athletes' }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Athlete Profile' }} 
      />
    </Stack.Navigator>
  );
};