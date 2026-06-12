import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { colors, spacing } from '../theme/colors';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.indicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-SemiBold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.tertiary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
    fontWeight: '400',
  },
  indicator: {
    width: 24,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 1.5,
    marginTop: spacing.xs,
  },
});
