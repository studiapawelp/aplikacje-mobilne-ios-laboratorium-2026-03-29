import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfessionalCard, SearchBar } from '../components';
import { useApp } from '../context/AppContext';
import { pl } from '../i18n';
import { colors, fontSizes, layout, spacing } from '../theme';
import { Professional } from '../types';
import type { MainTabScreenProps } from '../navigation/types';

export const SearchScreen: React.FC<MainTabScreenProps<'Search'>> = ({
  navigation,
}) => {
  // Search the in memory list straight from the context.
  const { professionals } = useApp();
  const [query, setQuery] = useState('');

  const text = query.trim().toLowerCase();

  // Filter only when the user typed something.
  const results = useMemo(() => {
    if (!text) return [];
    return professionals.filter(
      (p) =>
        p.name.toLowerCase().includes(text) ||
        p.category.toLowerCase().includes(text) ||
        p.city.toLowerCase().includes(text)
    );
  }, [professionals, text]);

  const openDetail = (id: string) => {
    navigation.navigate('ProfessionalDetail', { id });
  };

  const renderItem = ({ item }: { item: Professional }) => (
    <ProfessionalCard professional={item} onPress={() => openDetail(item.id)} />
  );

  // Pick the right message for the empty list area.
  const renderEmpty = () => (
    <Text style={styles.empty}>
      {text ? pl.search.empty : pl.search.start}
    </Text>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{pl.search.title}</Text>
        <View style={styles.searchWrap}>
          <SearchBar
            value={query}
            onChangeText={setQuery}
            placeholder={pl.search.placeholder}
            autoFocus
          />
        </View>
        {text.length > 0 && (
          <Text style={styles.count}>
            {pl.search.resultsCount} {results.length} {pl.search.results}
          </Text>
        )}
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
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
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  searchWrap: {
    marginBottom: spacing.md,
  },
  count: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  listContent: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.xl,
  },
  empty: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: fontSizes.body,
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
});
