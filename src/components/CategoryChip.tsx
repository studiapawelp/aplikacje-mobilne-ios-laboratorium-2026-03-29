import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSizes, radii, spacing } from '../theme';

interface Props {
  label: string;
  // Optional Ionicons glyph name shown before the label.
  icon?: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
}

// Pill shaped category filter. Turns navy when selected.
export const CategoryChip: React.FC<Props> = ({
  label,
  icon,
  selected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : styles.chipDefault,
        pressed && styles.pressed,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={selected ? colors.textOnPrimary : colors.primary}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.label,
          { color: selected ? colors.textOnPrimary : colors.textPrimary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    marginRight: spacing.sm,
  },
  chipDefault: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
  icon: {
    marginRight: spacing.xs,
  },
  label: {
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
});
