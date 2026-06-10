import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AlertTriangle, Info } from 'lucide-react-native';
import { colors, spacing, roundness } from '../theme/colors';

interface WarningCardProps {
  title: string;
  description: string;
  type?: 'warning' | 'info';
}

export default function WarningCard({ title, description, type = 'warning' }: WarningCardProps) {
  const isWarning = type === 'warning';
  const iconColor = isWarning ? colors.secondary : colors.primary;
  const borderColor = isWarning ? colors.secondary + '40' : colors.primary + '40';
  const bgColor = isWarning ? '#fff5f3' : '#f4fbf7'; // soft red/green tones

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }]}>
      <View style={styles.header}>
        {isWarning ? (
          <AlertTriangle size={20} color={iconColor} style={styles.icon} />
        ) : (
          <Info size={20} color={iconColor} style={styles.icon} />
        )}
        <Text style={[styles.title, { color: iconColor }]}>{title}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: roundness.lg,
    padding: spacing.md,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  icon: {
    marginRight: spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },
});
