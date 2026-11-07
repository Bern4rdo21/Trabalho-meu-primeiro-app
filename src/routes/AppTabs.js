import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Configuracoes from '../screens/Configuracoes';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#14325A',
        tabBarInactiveTintColor: '#808080',
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={route.name === 'Inicio' ? 'home-outline' : 'settings-outline'}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Inicio" component={Home} options={{ title: 'Início' }} />
      <Tab.Screen name="Ajustes" component={Configuracoes} />
    </Tab.Navigator>
  );
}
