import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components';
import { pl } from '../i18n';
import { colors, fontSizes, layout, radii, spacing } from '../theme';
import type { AuthScreenProps } from '../navigation/types';

// One onboarding slide.
interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

// Three intro slides. Images are stable picsum seeds.
const slides: Slide[] = [
  {
    id: 'slide-1',
    title: pl.onboarding.slide1Title,
    description: pl.onboarding.slide1Desc,
    imageUrl: 'https://picsum.photos/seed/find/600/600',
  },
  {
    id: 'slide-2',
    title: pl.onboarding.slide2Title,
    description: pl.onboarding.slide2Desc,
    imageUrl: 'https://picsum.photos/seed/contact/600/600',
  },
  {
    id: 'slide-3',
    title: pl.onboarding.slide3Title,
    description: pl.onboarding.slide3Desc,
    imageUrl: 'https://picsum.photos/seed/account/600/600',
  },
];

export const OnboardingScreen: React.FC<AuthScreenProps<'Onboarding'>> = ({
  navigation,
}) => {
  const { width: windowWidth, height } = useWindowDimensions();
  // The list lives inside a centered, max-width frame on web, so the window
  // width is not the real space. We measure the container instead.
  const [containerWidth, setContainerWidth] = useState(windowWidth);
  // Each slide is exactly as wide as the available container.
  const slideWidth = containerWidth;
  // Image takes about half of the screen height for a strong visual.
  const imageHeight = Math.round(height * 0.48);
  // Index of the currently visible slide.
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);

  const isLast = index === slides.length - 1;

  // Move to a given slide: update the dot state and scroll the list.
  // We set the state directly so the UI is correct even on web, where
  // momentum scroll events may not fire.
  const goToSlide = (target: number) => {
    setIndex(target);
    listRef.current?.scrollToIndex({ index: target, animated: true });
  };

  // Keep the active slide in sync while the user swipes by hand.
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / slideWidth);
    if (page !== index) setIndex(page);
  };

  // Advance to the next slide, or go to login on the last one.
  const handleNext = () => {
    if (isLast) {
      navigation.replace('Login');
      return;
    }
    goToSlide(index + 1);
  };

  // Each slide: large image on top, then left-aligned title and description.
  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={[styles.slide, { width: slideWidth }]}>
      <Image
        source={{ uri: item.imageUrl }}
        style={[styles.image, { height: imageHeight }]}
        resizeMode="cover"
      />
      <View style={styles.textBlock}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Brand wordmark in navy, like the first frame of the mockup. */}
      <View style={styles.brandHeader}>
        <Text style={styles.brand}>Fachowiec+</Text>
        <Text style={styles.brandTagline}>Twój fachowiec na wyciągnięcie ręki</Text>
      </View>

      {/* Measure the real available width (frame is capped on web). */}
      <View
        style={styles.listArea}
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          if (w > 0 && w !== containerWidth) setContainerWidth(w);
        }}
      >
        <FlatList
          ref={listRef}
          data={slides}
          // Re-key on width so paging metrics reset cleanly when it changes.
          key={`list-${slideWidth}`}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          // Fixed full width pages make scrollToIndex reliable on web too.
          getItemLayout={(_, i) => ({
            length: slideWidth,
            offset: slideWidth * i,
            index: i,
          })}
        />
      </View>

      <View style={styles.footer}>
        {/* Page indicator dots. */}
        <View style={styles.dots}>
          {slides.map((slide, i) => (
            <View
              key={slide.id}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
        <Button
          label={isLast ? pl.common.start : pl.common.next}
          onPress={handleNext}
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
  brandHeader: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  brand: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.primary,
  },
  brandTagline: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  listArea: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  // Large photo on top of the slide, slightly inset with rounded corners.
  // Height is set inline from the window height so it never collapses.
  image: {
    marginHorizontal: layout.screenPadding,
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
  },
  // Left-aligned text under the image.
  textBlock: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: fontSizes.displayLg,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radii.round,
    backgroundColor: colors.inputBorder,
    marginHorizontal: spacing.xs,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
});
