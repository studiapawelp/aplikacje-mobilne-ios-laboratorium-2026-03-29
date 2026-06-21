// Central design system for the whole app.
// Keep all colors, spacing, radii and font sizes here.
// Screens and components must read from this theme, no magic numbers.

export const colors = {
  // Brand navy used for primary buttons and headers.
  primary: '#0D2B45',
  // Slightly deeper navy for the branded onboarding panel.
  primaryDark: '#0A2138',
  // Dark translucent overlay placed on top of images for readable text.
  overlay: 'rgba(13, 43, 69, 0.45)',
  // App background and section background.
  background: '#FFFFFF',
  surface: '#F5F6F8',
  // Card background (white) for contrast on surface.
  card: '#FFFFFF',
  // Text colors.
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textOnPrimary: '#FFFFFF',
  // Form field colors.
  inputBackground: '#F5F6F8',
  inputBorder: '#E5E7EB',
  // Gold color for star ratings.
  star: '#F5A623',
  // Misc.
  danger: '#DC2626',
  success: '#16A34A',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  // Large radius for hero images and onboarding photos.
  xl: 24,
  // Pill radius for full width primary buttons.
  pill: 24,
  // Full round for avatars.
  round: 999,
} as const;

export const fontSizes = {
  caption: 12,
  body: 14,
  bodyLarge: 16,
  title: 18,
  heading: 22,
  display: 28,
  // Largest size for onboarding and auth headlines.
  displayLg: 32,
} as const;

// Shared layout values, e.g. the side padding used on every screen.
export const layout = {
  screenPadding: 24,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Flat design: cards use a thin light border instead of a shadow.
export const cardBorder = {
  borderWidth: 1,
  borderColor: colors.inputBorder,
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  fontSizes,
  fontWeights,
  layout,
  cardBorder,
} as const;

export type Theme = typeof theme;
