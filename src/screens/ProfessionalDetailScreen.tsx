import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Rating } from '../components';
import { useApp } from '../context/AppContext';
import { fetchProfessionalById } from '../data/api';
import { pl } from '../i18n';
import { colors, fontSizes, layout, radii, spacing } from '../theme';
import { Review } from '../types';
import type { AppStackScreenProps } from '../navigation/types';

// A single info row with an icon, label and value.
interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={20} color={colors.primary} />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// One review card with author, stars and text.
const ReviewItem: React.FC<{ review: Review }> = ({ review }) => (
  <Card style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Text style={styles.reviewAuthor}>{review.author}</Text>
      <Rating value={review.rating} showStars size={14} />
    </View>
    <Text style={styles.reviewText}>{review.text}</Text>
  </Card>
);

export const ProfessionalDetailScreen: React.FC<
  AppStackScreenProps<'ProfessionalDetail'>
> = ({ route }) => {
  const { id } = route.params;
  const { professionals } = useApp();

  // Load the single professional by id (simulated async fetch).
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['professional', id, professionals],
    queryFn: () => fetchProfessionalById(id, professionals),
  });

  // Fake a phone call with a simple alert.
  const handleCall = () => {
    if (!data) return;
    Alert.alert(pl.detail.callTitle, `${pl.detail.callBody} ${data.name}.`);
  };

  // Fake sending a message with a simple alert.
  const handleMessage = () => {
    if (!data) return;
    Alert.alert(
      pl.detail.messageTitle,
      `${pl.detail.messageBody} ${data.name}.`
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.center} edges={['bottom']}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (isError || !data) {
    return (
      <SafeAreaView style={styles.center} edges={['bottom']}>
        <Text style={styles.errorText}>{pl.common.error}</Text>
        <View style={styles.retryWrap}>
          <Button label={pl.common.retry} onPress={() => refetch()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: data.imageUrl }} style={styles.hero} />

        <View style={styles.headerBlock}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.category}>{data.category}</Text>
          <View style={styles.ratingWrap}>
            <Rating value={data.rating} size={18} />
            <Text style={styles.reviewsCount}>
              {data.reviewsCount} {pl.common.reviews}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{pl.detail.about}</Text>
        <Text style={styles.about}>{data.about}</Text>

        <Text style={styles.sectionTitle}>{pl.detail.info}</Text>
        <Card>
          <InfoRow
            icon="location-outline"
            label={pl.detail.location}
            value={data.city}
          />
          <View style={styles.divider} />
          <InfoRow
            icon="briefcase-outline"
            label={pl.detail.experience}
            value={`${data.experienceYears} ${pl.common.years}`}
          />
          <View style={styles.divider} />
          <InfoRow
            icon="cash-outline"
            label={pl.detail.price}
            value={`${pl.common.from} ${data.priceFrom} ${pl.common.currency}`}
          />
        </Card>

        <Text style={styles.sectionTitle}>
          {pl.detail.reviewsTitle} ({data.reviews.length})
        </Text>
        {data.reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ScrollView>

      {/* Sticky action bar with call and message buttons. */}
      <View style={styles.actions}>
        <Button
          label={pl.detail.call}
          onPress={handleCall}
          variant="secondary"
          style={styles.actionButton}
        />
        <View style={styles.actionGap} />
        <Button
          label={pl.detail.message}
          onPress={handleMessage}
          style={styles.actionButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  errorText: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  retryWrap: {
    width: '100%',
  },
  content: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  // Hero sits inside the same padded container as the text,
  // with the same rounded corners on every side.
  hero: {
    width: '100%',
    height: 260,
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
  },
  headerBlock: {
    marginTop: spacing.lg,
  },
  name: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  category: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  reviewsCount: {
    marginLeft: spacing.sm,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  about: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    marginLeft: spacing.md,
    fontSize: fontSizes.bodyLarge,
    color: colors.textSecondary,
  },
  infoValue: {
    marginLeft: 'auto',
    fontSize: fontSizes.bodyLarge,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.inputBorder,
  },
  reviewCard: {
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  reviewAuthor: {
    fontSize: fontSizes.bodyLarge,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  reviewText: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.inputBorder,
    backgroundColor: colors.background,
  },
  actionButton: {
    flex: 1,
  },
  actionGap: {
    width: spacing.md,
  },
});
