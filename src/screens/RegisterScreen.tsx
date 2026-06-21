import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FormField } from '../components';
import { useApp } from '../context/AppContext';
import { pl } from '../i18n';
import { colors, fontSizes, layout, spacing } from '../theme';
import type { AuthScreenProps } from '../navigation/types';

export const RegisterScreen: React.FC<AuthScreenProps<'Register'>> = ({
  navigation,
}) => {
  const { register } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  // Create the account. On success the navigator switches to the app.
  const handleRegister = () => {
    const result = register(name, email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.brand}>Fachowiec+</Text>
          <Text style={styles.title}>{pl.auth.registerTitle}</Text>
          <Text style={styles.subtitle}>{pl.auth.registerSubtitle}</Text>

          <View style={styles.form}>
            <FormField
              label={pl.auth.name}
              value={name}
              onChangeText={(text) => {
                setName(text);
                setError(undefined);
              }}
              placeholder={pl.auth.namePlaceholder}
              autoCapitalize="words"
            />
            <FormField
              label={pl.auth.email}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(undefined);
              }}
              placeholder={pl.auth.emailPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormField
              label={pl.auth.password}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(undefined);
              }}
              placeholder={pl.auth.passwordPlaceholder}
              secureTextEntry
              autoCapitalize="none"
              error={error}
            />

            <Button label={pl.auth.registerButton} onPress={handleRegister} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{pl.auth.haveAccount} </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.link}>{pl.auth.goToLogin}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  brand: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSizes.displayLg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  form: {
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // Push the link row to the bottom of the screen.
    marginTop: 'auto',
    paddingTop: spacing.xxl,
  },
  footerText: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  link: {
    fontSize: fontSizes.body,
    fontWeight: '700',
    color: colors.primary,
  },
});
