import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DiscoverStack } from './DiscoverStack';
import { ShortlistScreen } from '../screens/ShortlistScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false, 
        tabBarActiveTintColor: '#3498DB', 
        tabBarInactiveTintColor: '#95A5A6',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500'
        }
      }}
    >
      <Tab.Screen 
        name="DiscoverTab" 
        component={DiscoverStack} 
        options={{ title: 'Discover' }} 
      />
      <Tab.Screen 
        name="ShortlistTab" 
        component={ShortlistScreen} 
        options={{ title: 'Shortlist' }} 
      />
    </Tab.Navigator>
  );
};