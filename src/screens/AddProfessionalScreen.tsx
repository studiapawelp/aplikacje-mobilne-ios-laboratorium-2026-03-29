import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FormField, PickerField, PickerOption } from '../components';
import { useApp } from '../context/AppContext';
import { pl } from '../i18n';
import { colors, fontSizes, layout, spacing } from '../theme';
import { Professional } from '../types';
import {
  validateAll,
  validateMinLength,
  validateNumberRange,
  validateRequired,
  validateUrl,
} from '../utils/validation';
import type { MainTabScreenProps } from '../navigation/types';

export const AddProfessionalScreen: React.FC<MainTabScreenProps<'Add'>> = ({
  navigation,
}) => {
  const { categories, addProfessional } = useApp();

  // Form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [about, setAbout] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Error messages per field
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Category options for the picker
  const categoryOptions: PickerOption[] = categories.map((cat) => ({
    label: cat.name,
    value: cat.name,
  }));

  // Waliduj wszystkie pola – zwraca true jeśli formularz przechodzi.
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameErr = validateAll(name, [
      (v) => validateRequired(v, 'Imię i nazwisko'),
      (v) => validateMinLength(v, 3, 'Imię i nazwisko'),
    ]);
    if (nameErr) newErrors.name = nameErr;

    const categoryErr = validateRequired(category, 'Kategoria');
    if (categoryErr) newErrors.category = categoryErr;

    const cityErr = validateAll(city, [
      (v) => validateRequired(v, 'Miasto'),
      (v) => validateMinLength(v, 3, 'Miasto'),
    ]);
    if (cityErr) newErrors.city = cityErr;

    const priceErr = validateNumberRange(priceFrom, 1, 10000, 'Cena od');
    if (priceErr) newErrors.priceFrom = priceErr;

    const expErr = validateNumberRange(experienceYears, 0, 50, 'Doświadczenie');
    if (expErr) newErrors.experienceYears = expErr;

    const aboutErr = validateMinLength(about, 20, 'Opis');
    if (aboutErr) newErrors.about = aboutErr;

    const urlErr = validateUrl(imageUrl);
    if (urlErr) newErrors.imageUrl = urlErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const imgSeed = name.trim().toLowerCase().replace(/\s+/g, '-');
    const newProfessional: Professional = {
      id: `pro-custom-${Date.now()}`,
      name: name.trim(),
      category,
      rating: 0,
      reviewsCount: 0,
      priceFrom: Number(priceFrom.trim()),
      city: city.trim(),
      experienceYears: Number(experienceYears.trim()),
      about: about.trim(),
      imageUrl:
        imageUrl.trim() ||
        `https://picsum.photos/seed/${imgSeed}/400/400`,
      featured: false,
      reviews: [],
    };

    addProfessional(newProfessional);

    // Przejdź od razu do szczegółów nowo dodanego fachowca.
    navigation.navigate('ProfessionalDetail', { id: newProfessional.id });
  };

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
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
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{pl.addProfessional.title}</Text>
          <Text style={styles.subtitle}>{pl.addProfessional.subtitle}</Text>

          <View style={styles.form}>
            <FormField
              label={pl.addProfessional.name}
              value={name}
              onChangeText={(t) => {
                setName(t);
                clearFieldError('name');
              }}
              placeholder={pl.addProfessional.namePlaceholder}
              autoCapitalize="words"
              error={errors.name}
            />

            <PickerField
              label={pl.addProfessional.category}
              options={categoryOptions}
              selectedValue={category}
              onValueChange={(v) => {
                setCategory(v);
                clearFieldError('category');
              }}
              error={errors.category}
            />

            <FormField
              label={pl.addProfessional.city}
              value={city}
              onChangeText={(t) => {
                setCity(t);
                clearFieldError('city');
              }}
              placeholder={pl.addProfessional.cityPlaceholder}
              autoCapitalize="words"
              error={errors.city}
            />

            <View style={styles.row}>
              <View style={styles.halfField}>
                <FormField
                  label={pl.addProfessional.priceFrom}
                  value={priceFrom}
                  onChangeText={(t) => {
                    setPriceFrom(t);
                    clearFieldError('priceFrom');
                  }}
                  placeholder="0"
                  keyboardType="numeric"
                  error={errors.priceFrom}
                />
              </View>
              <View style={styles.gap} />
              <View style={styles.halfField}>
                <FormField
                  label={pl.addProfessional.experienceYears}
                  value={experienceYears}
                  onChangeText={(t) => {
                    setExperienceYears(t);
                    clearFieldError('experienceYears');
                  }}
                  placeholder="0"
                  keyboardType="numeric"
                  error={errors.experienceYears}
                />
              </View>
            </View>

            <FormField
              label={pl.addProfessional.about}
              value={about}
              onChangeText={(t) => {
                setAbout(t);
                clearFieldError('about');
              }}
              placeholder={pl.addProfessional.aboutPlaceholder}
              multiline
              numberOfLines={4}
              maxLength={500}
              error={errors.about}
            />

            <FormField
              label={pl.addProfessional.imageUrl}
              value={imageUrl}
              onChangeText={(t) => {
                setImageUrl(t);
                clearFieldError('imageUrl');
              }}
              placeholder={pl.addProfessional.imageUrlPlaceholder}
              keyboardType="url"
              autoCapitalize="none"
              error={errors.imageUrl}
            />

            <Button label={pl.addProfessional.submit} onPress={handleSubmit} />
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
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.bodyLarge,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  form: {
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: 'row',
  },
  halfField: {
    flex: 1,
  },
  gap: {
    width: spacing.md,
  },
});