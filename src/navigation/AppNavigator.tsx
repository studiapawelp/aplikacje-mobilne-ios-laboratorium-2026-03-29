import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AboutScreen, ProfessionalDetailScreen } from '../screens';
import { colors, fontSizes } from '../theme';
import { MainTabs } from './MainTabs';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

// Logged in stack. Tabs are the root; detail and about screens push on top.
export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfessionalDetail"
        component={ProfessionalDetailScreen}
        options={{
          title: '',
          headerBackTitle: '',
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { fontSize: fontSizes.title },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'O aplikacji',
          headerBackTitle: '',
          headerTintColor: colors.primary,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { fontSize: fontSizes.title },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
