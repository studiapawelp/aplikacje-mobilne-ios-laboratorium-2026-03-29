import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

interface Props {
  // Rating value from 0 to 5.
  value: number;
  // Optional number of reviews shown in parentheses.
  reviewsCount?: number;
  // Hide the star icons and show only the number when false.
  showStars?: boolean;
  size?: number;
}

// Builds an array describing each of the five star slots.
const buildStars = (value: number): ('full' | 'half' | 'empty')[] => {
  const stars: ('full' | 'half' | 'empty')[] = [];
  for (let i = 1; i <= 5; i += 1) {
    if (value >= i) {
      stars.push('full');
    } else if (value >= i - 0.5) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }
  return stars;
};

// Map a star kind to its Ionicons glyph name (typed for the icon prop).
type IconName = keyof typeof Ionicons.glyphMap;
const iconName = (kind: 'full' | 'half' | 'empty'): IconName => {
  if (kind === 'full') return 'star';
  if (kind === 'half') return 'star-half';
  return 'star-outline';
};

// Gold star rating with a numeric value next to it.
export const Rating: React.FC<Props> = ({
  value,
  reviewsCount,
  showStars = true,
  size = 16,
}) => {
  const stars = buildStars(value);

  return (
    <View style={styles.row}>
      {showStars &&
        stars.map((kind, index) => (
          <Ionicons
            key={index}
            name={iconName(kind)}
            size={size}
            color={colors.star}
            style={styles.star}
          />
        ))}
      <Text style={[styles.value, { fontSize: size - 2 }]}>
        {value.toFixed(1)}
      </Text>
      {reviewsCount !== undefined && (
        <Text style={[styles.count, { fontSize: size - 3 }]}>
          ({reviewsCount})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 1,
  },
  value: {
    marginLeft: 4,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  count: {
    marginLeft: 2,
    color: colors.textSecondary,
  },
});
