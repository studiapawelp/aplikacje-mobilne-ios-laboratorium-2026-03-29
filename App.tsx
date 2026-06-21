import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme';

// One React Query client for the whole app.
// Retry is off so the simulated errors show right away in the demo.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// On web the app would stretch across the whole browser. We center it in a
// phone-sized frame. On a real device this wrapper is just a plain full screen.
const isWeb = Platform.OS === 'web';

// App root. Order of providers: safe area -> query -> app state -> navigation.
export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <View style={styles.outer}>
            <View style={styles.frame}>
              <StatusBar style="dark" />
              <RootNavigator />
            </View>
          </View>
        </AppProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: colors.background,
    // Center the frame horizontally on web. Flat: white backdrop, no shadow.
    ...(isWeb ? { alignItems: 'center' } : null),
  },
  frame: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    // Phone-like width on web, no shadow (flat design).
    ...(isWeb ? { maxWidth: 480 } : null),
  },
});
