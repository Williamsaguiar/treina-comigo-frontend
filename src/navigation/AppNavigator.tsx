import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator }
from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import AgendaScreen from '../screens/AgendaScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: '#0F0F0F',
            borderTopColor: '#1E1E1E',
            height: 70,
          },

          tabBarActiveTintColor: '#9FE870',
          tabBarInactiveTintColor: '#777',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Mapa"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="map"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="calendar"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}