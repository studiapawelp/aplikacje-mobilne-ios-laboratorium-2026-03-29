import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components';
import { pl } from '../i18n';
import { colors, fontSizes, layout, spacing } from '../theme';
import type { AppStackScreenProps } from '../navigation/types';

export const AboutScreen: React.FC<AppStackScreenProps<'About'>> = () => {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.appName}>{pl.about.appName}</Text>
        <Text style={styles.version}>{pl.about.version}</Text>

        <Text style={styles.description}>{pl.about.description}</Text>

        <Text style={styles.sectionTitle}>{pl.about.features}</Text>
        <Card style={styles.card}>
          <Text style={styles.cardText}>{pl.about.featuresList}</Text>
        </Card>

        <Text style={styles.sectionTitle}>{pl.about.technologies}</Text>
        <Card style={styles.card}>
          <Text style={styles.cardText}>{pl.about.techList}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  appName: {
    fontSize: fontSizes.displayLg,
    fontWeight: '700',
    color: colors.primary,
  },
  version: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  description: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  card: {
    marginBottom: spacing.lg,
  },
  cardText: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});