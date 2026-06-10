import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, roundness } from '../theme/colors';

interface CategoryChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryChip({ label, selected, onPress }: CategoryChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected ? styles.selectedChip : styles.unselectedChip
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.label,
          selected ? styles.selectedLabel : styles.unselectedLabel
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: roundness.full,
    marginRight: spacing.sm,
    marginVertical: spacing.xs,
    borderWidth: 1,
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unselectedChip: {
    backgroundColor: colors.surfaceBright,
    borderColor: colors.outlineVariant,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedLabel: {
    color: colors.onPrimary,
  },
  unselectedLabel: {
    color: colors.onSurfaceVariant,
  },
});
