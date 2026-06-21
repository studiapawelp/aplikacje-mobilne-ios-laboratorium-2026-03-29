import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { pl } from '../i18n';
import { cardBorder, colors, fontSizes, radii, spacing } from '../theme';
import { Professional } from '../types';
import { Rating } from './Rating';

// "list" is a wide horizontal card, "featured" is a compact vertical card.
type CardVariant = 'list' | 'featured';

interface Props {
  professional: Professional;
  onPress: () => void;
  variant?: CardVariant;
}

// Card showing a professional's photo, name, category, rating and price.
export const ProfessionalCard: React.FC<Props> = ({
  professional,
  onPress,
  variant = 'list',
}) => {
  const priceText = `${pl.common.from} ${professional.priceFrom} ${pl.common.currency}`;

  if (variant === 'featured') {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={professional.name}
        style={({ pressed }) => [styles.featured, pressed && styles.pressed]}
      >
        <Image
          source={{ uri: professional.imageUrl }}
          style={styles.featuredImage}
        />
        <View style={styles.featuredBody}>
          <Text style={styles.name} numberOfLines={1}>
            {professional.name}
          </Text>
          <Text style={styles.category} numberOfLines={1}>
            {professional.category}
          </Text>
          <Rating value={professional.rating} size={14} />
          <Text style={styles.price}>{priceText}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={professional.name}
      style={({ pressed }) => [styles.list, pressed && styles.pressed]}
    >
      <Image source={{ uri: professional.imageUrl }} style={styles.listImage} />
      <View style={styles.listBody}>
        <Text style={styles.name} numberOfLines={1}>
          {professional.name}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {professional.category} · {professional.city}
        </Text>
        <Rating
          value={professional.rating}
          reviewsCount={professional.reviewsCount}
          size={14}
        />
      </View>
      <View style={styles.listPrice}>
        <Text style={styles.priceFromLabel}>{pl.common.from}</Text>
        <Text style={styles.priceValue}>
          {professional.priceFrom} {pl.common.currency}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.9,
  },
  // List variant.
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...cardBorder,
  },
  listImage: {
    width: 72,
    height: 72,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
  },
  listBody: {
    flex: 1,
    marginLeft: spacing.md,
  },
  listPrice: {
    alignItems: 'flex-end',
    marginLeft: spacing.sm,
  },
  priceFromLabel: {
    fontSize: fontSizes.caption,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: fontSizes.bodyLarge,
    fontWeight: '700',
    color: colors.primary,
  },
  // Featured variant.
  featured: {
    width: 200,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    marginRight: spacing.md,
    overflow: 'hidden',
    ...cardBorder,
  },
  featuredImage: {
    width: '100%',
    height: 130,
    backgroundColor: colors.surface,
  },
  featuredBody: {
    padding: spacing.md,
  },
  // Shared text styles.
  name: {
    fontSize: fontSizes.bodyLarge,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  category: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  price: {
    marginTop: spacing.xs,
    fontSize: fontSizes.body,
    fontWeight: '700',
    color: colors.primary,
  },
});
