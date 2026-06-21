import React from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, fontSizes, radii, spacing } from '../theme';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  // Optional error message shown in red below the field.
  error?: string;
  /** Render as a multi‑line TextInput (textarea). */
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
}

// Labeled text input used in the login and register forms.
export const FormField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  multiline = false,
  numberOfLines,
  maxLength,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          error ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
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
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: spacing.lg,
    height: 52,
    fontSize: fontSizes.bodyLarge,
    color: colors.textPrimary,
  },
  inputMultiline: {
    height: 120,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    marginTop: spacing.xs,
    fontSize: fontSizes.caption,
    color: colors.danger,
  },
});