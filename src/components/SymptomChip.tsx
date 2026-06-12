import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, spacing, roundness } from '../theme/colors';

interface SymptomChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function SymptomChip({ label, selected, onPress }: SymptomChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected ? styles.selectedChip : styles.unselectedChip
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {selected && (
          <Check size={14} color={colors.onPrimary} style={styles.icon} />
        )}
        <Text
          style={[
            styles.label,
            selected ? styles.selectedLabel : styles.unselectedLabel
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: roundness.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unselectedChip: {
    backgroundColor: colors.surfaceContainer,
    borderColor: colors.outlineVariant,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedLabel: {
    color: colors.onPrimary,
    fontWeight: '600',
  },
  unselectedLabel: {
    color: colors.onSurface,
  },
});
