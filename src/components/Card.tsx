import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { cardBorder, colors, radii, spacing } from '../theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

// White rounded container with a thin border (flat design). Wraps content.
export const Card: React.FC<Props> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    ...cardBorder,
  },
});
