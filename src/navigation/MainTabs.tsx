import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HomeScreen, ProfileScreen, SearchScreen } from '../screens';
import { pl } from '../i18n';
import { colors, fontSizes } from '../theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

// Pick the icon glyph for each tab and its focused state.
const tabIcon = (
  routeName: keyof MainTabParamList,
  focused: boolean
): keyof typeof Ionicons.glyphMap => {
  if (routeName === 'Services') return focused ? 'home' : 'home-outline';
  if (routeName === 'Search') return focused ? 'search' : 'search-outline';
  return focused ? 'person' : 'person-outline';
};

// Bottom tab bar shown after login: Usługi, Wyszukaj, Profil.
export const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontSize: fontSizes.caption, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={tabIcon(route.name, focused)}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Services"
        component={HomeScreen}
        options={{ title: pl.tabs.services }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: pl.tabs.search }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: pl.tabs.profile }}
      />
    </Tab.Navigator>
  );
};
