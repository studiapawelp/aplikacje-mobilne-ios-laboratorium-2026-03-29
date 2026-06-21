import { Category } from '../types';

// Service categories shown as filter chips on the Home screen.
// The icon names map to Ionicons from @expo/vector-icons.
export const categories: Category[] = [
  { id: 'cat-electrician', name: 'Elektryk', icon: 'flash' },
  { id: 'cat-plumber', name: 'Hydraulik', icon: 'water' },
  { id: 'cat-it', name: 'Serwis IT', icon: 'laptop' },
  { id: 'cat-cleaning', name: 'Sprzątanie', icon: 'sparkles' },
  { id: 'cat-handyman', name: 'Złota rączka', icon: 'hammer' },
];
