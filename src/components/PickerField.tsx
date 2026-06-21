import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSizes, radii, spacing } from '../theme';

export interface PickerOption {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: PickerOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const PickerField: React.FC<Props> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = option.value === selectedValue;
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => onValueChange(option.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBackground,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: fontSizes.body,
    color: colors.textPrimary,
  },
  optionTextSelected: {
    color: colors.textOnPrimary,
    fontWeight: '600',
  },
  error: {
    marginTop: spacing.xs,
    fontSize: fontSizes.caption,
    color: colors.danger,
  },
});