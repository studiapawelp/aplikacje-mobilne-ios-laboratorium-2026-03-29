import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useApp } from '../context/AppContext';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

// Picks the navigation tree based on auth state.
// No user -> onboarding/auth. Logged in user -> tabs + detail.
export const RootNavigator: React.FC = () => {
  const { user } = useApp();

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
