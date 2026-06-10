import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { Clock, Heart } from 'lucide-react-native';
import { colors, spacing, roundness, shadows } from '../theme/colors';
import { Recipe } from '../models/types';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  horizontal?: boolean;
}

export default function RecipeCard({
  recipe,
  onPress,
  isFavorite = false,
  onFavoritePress,
  horizontal = false,
}: RecipeCardProps) {
  const imageSource = typeof recipe.image === 'string' ? { uri: recipe.image } : recipe.image;

  if (horizontal) {
    return (
      <TouchableOpacity
        style={[styles.horizontalCard, shadows.soft]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image source={imageSource} style={styles.thumbnail} />
        <View style={styles.horizontalContent}>
          <Text style={styles.recipeType} numberOfLines={1}>{recipe.type}</Text>
          <Text style={styles.recipeNameHorizontal} numberOfLines={1}>{recipe.name}</Text>
          <View style={styles.timeContainerHorizontal}>
            <Clock size={12} color={colors.onSurfaceVariant} style={styles.clockIcon} />
            <Text style={styles.timeText}>{recipe.time}</Text>
          </View>
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
      style={[styles.verticalCard, shadows.soft]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.cardImage} />
        <View style={styles.recipeTypeBadge}>
          <Text style={styles.recipeTypeText}>{recipe.type}</Text>
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
        <Text style={styles.recipeName} numberOfLines={1}>{recipe.name}</Text>
        <View style={styles.footerRow}>
          <View style={styles.timeContainer}>
            <Clock size={14} color={colors.onSurfaceVariant} style={styles.clockIcon} />
            <Text style={styles.timeText}>{recipe.time}</Text>
          </View>
          <Text style={styles.ingredientsCount}>{recipe.ingredients.length} ingredientes</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Horizontal Layout Styles
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
    width: 60,
    height: 60,
    borderRadius: roundness.md,
    backgroundColor: colors.surfaceContainer,
  },
  horizontalContent: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  recipeType: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recipeNameHorizontal: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.tertiary,
    marginTop: 2,
  },
  timeContainerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  favoriteButtonHorizontal: {
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Vertical Layout Styles
  verticalCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.lg,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  imageContainer: {
    position: 'relative',
    height: 140,
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceContainer,
  },
  recipeTypeBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.secondary + 'E6', // 90% opacity Terracotta
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: roundness.full,
  },
  recipeTypeText: {
    color: colors.onPrimary,
    fontSize: 10,
    fontWeight: '700',
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
  recipeName: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.tertiary,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  ingredientsCount: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
});
