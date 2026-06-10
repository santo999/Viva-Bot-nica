import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { Heart } from 'lucide-react-native';
import { colors, spacing, roundness, shadows } from '../theme/colors';
import { Plant } from '../models/types';

interface PlantCardProps {
  plant: Plant;
  onPress: () => void;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  horizontal?: boolean;
}

export default function PlantCard({
  plant,
  onPress,
  isFavorite = false,
  onFavoritePress,
  horizontal = false,
}: PlantCardProps) {
  const imageSource = typeof plant.image === 'string' ? { uri: plant.image } : plant.image;

  if (horizontal) {
    return (
      <TouchableOpacity
        style={[styles.horizontalCard, shadows.soft]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image source={imageSource} style={styles.thumbnail} />
        <View style={styles.horizontalContent}>
          <Text style={styles.commonNameHorizontal} numberOfLines={1}>{plant.name}</Text>
          <Text style={styles.scientificNameHorizontal} numberOfLines={1}>{plant.scientificName}</Text>
          <Text style={styles.descriptionHorizontal} numberOfLines={2}>{plant.description}</Text>
        </View>
        {onFavoritePress && (
          <TouchableOpacity
            style={styles.favoriteButtonHorizontal}
            onPress={(e) => {
              e.stopPropagation();
              onFavoritePress();
            }}
            activeOpacity={0.7}
          >
            <Heart
              size={20}
              color={isFavorite ? colors.secondary : colors.outline}
              fill={isFavorite ? colors.secondary : 'transparent'}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.editorialCard, shadows.soft]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.cardImage} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{plant.category}</Text>
        </View>
        {onFavoritePress && (
          <TouchableOpacity
            style={[styles.favoriteButtonVertical, shadows.soft]}
            onPress={(e) => {
              e.stopPropagation();
              onFavoritePress();
            }}
            activeOpacity={0.7}
          >
            <Heart
              size={20}
              color={isFavorite ? colors.secondary : colors.outline}
              fill={isFavorite ? colors.secondary : 'transparent'}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.verticalContent}>
        <Text style={styles.commonName} numberOfLines={1}>{plant.name}</Text>
        <Text style={styles.scientificName} numberOfLines={1}>{plant.scientificName}</Text>
        <Text style={styles.description} numberOfLines={2}>{plant.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Horizontal (List Card) Styles
  horizontalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.lg,
    padding: spacing.sm,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceContainer,
  },
  horizontalContent: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  commonNameHorizontal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.tertiary,
  },
  scientificNameHorizontal: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  descriptionHorizontal: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    lineHeight: 16,
  },
  favoriteButtonHorizontal: {
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Vertical (Editorial Card) Styles
  editorialCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.xl,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceContainer,
  },
  categoryBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.primary + 'E6', // 90% opacity Sage
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: roundness.full,
  },
  categoryText: {
    color: colors.onPrimary,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  favoriteButtonVertical: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceBright,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalContent: {
    padding: spacing.md,
  },
  commonName: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.tertiary,
  },
  scientificName: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: spacing.sm,
    lineHeight: 18,
  },
});
