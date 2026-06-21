import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../components';
import { useApp } from '../context/AppContext';
import { pl } from '../i18n';
import { colors, fontSizes, layout, radii, spacing } from '../theme';

// One tappable settings row.
interface SettingItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const settingsItems: SettingItem[] = [
  { id: 'edit', icon: 'person-outline', label: pl.profile.editProfile },
  {
    id: 'notifications',
    icon: 'notifications-outline',
    label: pl.profile.notifications,
  },
  { id: 'payments', icon: 'card-outline', label: pl.profile.payments },
  { id: 'privacy', icon: 'lock-closed-outline', label: pl.profile.privacy },
  { id: 'help', icon: 'help-circle-outline', label: pl.profile.help },
];

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useApp();

  // Settings are not implemented, so we show a friendly info alert.
  const handleSettingPress = (label: string) => {
    Alert.alert(label, pl.profile.comingSoon);
  };

  // Log out and let the navigator return to the auth flow.
  const handleLogout = () => {
    logout();
  };

  // First letter of the name used as a fallback avatar.
  const initial = user?.name.charAt(0).toUpperCase() ?? '?';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{pl.profile.title}</Text>

        <Card style={styles.accountCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>{pl.profile.settings}</Text>
        <Card style={styles.settingsCard}>
          {settingsItems.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() => handleSettingPress(item.label)}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.settingRow,
                index < settingsItems.length - 1 && styles.settingDivider,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name={item.icon} size={22} color={colors.primary} />
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </Pressable>
          ))}
        </Card>

        <View style={styles.logoutWrap}>
          <Button
            label={pl.profile.logout}
            onPress={handleLogout}
            variant="secondary"
          />
        </View>
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
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: radii.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fontSizes.heading,
    fontWeight: '700',
    color: colors.textOnPrimary,
  },
  accountInfo: {
    marginLeft: spacing.lg,
    flex: 1,
  },
  name: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  email: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  settingsCard: {
    padding: 0,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  settingDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  settingLabel: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSizes.bodyLarge,
    color: colors.textPrimary,
  },
  pressed: {
    opacity: 0.7,
  },
  logoutWrap: {
    marginTop: spacing.xxl,
  },
});
