import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Routes available before the user logs in.
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
};

// Bottom tab routes shown after login.
export type MainTabParamList = {
  Services: undefined;
  Search: undefined;
  Add: undefined;
  Profile: undefined;
};

// Routes in the logged in stack that wraps the tabs.
export type AppStackParamList = {
  MainTabs: undefined;
  // Detail screen needs the professional id to load.
  ProfessionalDetail: { id: string };
  // About / information screen.
  About: undefined;
};

// Typed props helpers for each screen.
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

// Tab screens can also navigate the parent stack (e.g. open detail).
export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<AppStackParamList>
  >;
