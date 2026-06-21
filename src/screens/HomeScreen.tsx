import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, CategoryChip, ProfessionalCard, SearchBar } from '../components';
import { useApp } from '../context/AppContext';
import { fetchCategories, fetchProfessionals } from '../data/api';
import { pl } from '../i18n';
import { colors, fontSizes, layout, spacing } from '../theme';
import { Professional } from '../types';
import type { Ionicons } from '@expo/vector-icons';
import type { MainTabScreenProps } from '../navigation/types';

export const HomeScreen: React.FC<MainTabScreenProps<'Services'>> = ({
  navigation,
}) => {
  const { user } = useApp();
  // Currently selected category name, or null for "Wszystkie".
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  // Load data through React Query so we get loading and error states.
  const professionalsQuery = useQuery({
    queryKey: ['professionals'],
    queryFn: fetchProfessionals,
  });
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Memoize the list so the empty array fallback stays stable across renders.
  const all = useMemo(
    () => professionalsQuery.data ?? [],
    [professionalsQuery.data]
  );

  // Featured professionals shown in the horizontal "Polecani" row.
  const featured = useMemo(() => all.filter((p) => p.featured), [all]);

  // Apply the search text and category filter to the full list.
  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return all.filter((p) => {
      const matchesCategory =
        !selectedCategory || p.category === selectedCategory;
      const matchesText =
        !text ||
        p.name.toLowerCase().includes(text) ||
        p.category.toLowerCase().includes(text) ||
        p.city.toLowerCase().includes(text);
      return matchesCategory && matchesText;
    });
  }, [all, query, selectedCategory]);

  // Open the detail screen for a chosen professional.
  const openDetail = (id: string) => {
    navigation.navigate('ProfessionalDetail', { id });
  };

  // Show a full screen spinner during the first load.
  if (professionalsQuery.isLoading) {
    return (
      <SafeAreaView style={styles.center} edges={['top']}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{pl.common.loading}</Text>
      </SafeAreaView>
    );
  }

  // Show an error with a retry button if the fetch failed.
  if (professionalsQuery.isError) {
    return (
      <SafeAreaView style={styles.center} edges={['top']}>
        <Text style={styles.errorText}>{pl.common.error}</Text>
        <View style={styles.retryWrap}>
          <Button
            label={pl.common.retry}
            onPress={() => professionalsQuery.refetch()}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Header holds greeting, search, categories and featured section.
  const ListHeader = (
    <View>
      <Text style={styles.greeting}>
        {pl.home.greeting}, {user?.name.split(' ')[0]}!
      </Text>
      <Text style={styles.subtitle}>{pl.home.subtitle}</Text>

      <View style={styles.searchWrap}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={pl.home.searchPlaceholder}
        />
      </View>

      <Text style={styles.sectionTitle}>{pl.home.categories}</Text>
      <FlatList
        data={categoriesQuery.data ?? []}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
        ListHeaderComponent={
          <CategoryChip
            label={pl.home.all}
            selected={selectedCategory === null}
            onPress={() => setSelectedCategory(null)}
          />
        }
        renderItem={({ item }) => (
          <CategoryChip
            label={item.name}
            icon={item.icon as keyof typeof Ionicons.glyphMap}
            selected={selectedCategory === item.name}
            onPress={() => setSelectedCategory(item.name)}
          />
        )}
      />

      {featured.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>{pl.home.featured}</Text>
          <FlatList
            data={featured}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredRow}
            renderItem={({ item }) => (
              <ProfessionalCard
                professional={item}
                variant="featured"
                onPress={() => openDetail(item.id)}
              />
            )}
          />
        </>
      )}

      <Text style={styles.sectionTitle}>{pl.home.allProfessionals}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Professional }) => (
    <ProfessionalCard professional={item} onPress={() => openDetail(item.id)} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={<Text style={styles.empty}>{pl.home.empty}</Text>}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSizes.body,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryWrap: {
    width: '100%',
  },
  listContent: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.xl,
  },
  greeting: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  searchWrap: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  chipsRow: {
    paddingRight: layout.screenPadding,
  },
  featuredRow: {
    paddingRight: layout.screenPadding,
    paddingBottom: spacing.xs,
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: fontSizes.body,
    marginTop: spacing.xl,
  },
});
