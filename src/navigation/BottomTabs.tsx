import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Home } from '../pages/Home';
import { Portfolio } from '../pages/Portfolio';
import { Transactions } from '../pages/Transactions';
import { Market } from '../pages/Market';
import { Settings } from '../pages/Settings';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';

            if (route.name === 'Início') {
              iconName = 'home';
            } else if (route.name === 'Portfólio') {
              iconName = 'wallet';
            } else if (route.name === 'Transações') {
              iconName = 'swap-horizontal';
            } else if (route.name === 'Mercado') {
              iconName = 'bar-chart';
            } else if (route.name === 'Configurações') {
              iconName = 'settings';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00FF00',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: { backgroundColor: '#00008B' },
        })}
      >
        <Tab.Screen name="Início" component={Home} />
        <Tab.Screen name="Portfólio" component={Portfolio} />
        <Tab.Screen name="Transações" component={Transactions} />
        <Tab.Screen name="Mercado" component={Market} />
        <Tab.Screen name="Configurações" component={Settings} />
      </Tab.Navigator>
  );
}
