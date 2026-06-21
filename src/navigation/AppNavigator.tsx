import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProfessionalDetailScreen } from '../screens';
import { colors, fontSizes } from '../theme';
import { MainTabs } from './MainTabs';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

// Logged in stack. The tabs are the root and the detail screen is pushed
// on top so it covers the tab bar with a back button in the header.
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
    </Stack.Navigator>
  );
};
