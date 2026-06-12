import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, spacing, roundness } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { recipes } from '../data/recipes';
import { Recipe } from '../models/types';
import { favoritesStorage } from '../storage/favoritesStorage';
import RecipeCard from '../components/RecipeCard';
import CategoryChip from '../components/CategoryChip';
import Header from '../components/Header';

type RecipesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RecipeFilterType = 'todas' | Recipe['type'];

export default function RecipesScreen() {
  const navigation = useNavigation<RecipesScreenNavigationProp>();
  const [selectedFilter, setSelectedFilter] = useState<RecipeFilterType>('todas');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Reload favorites on focus
  useFocusEffect(
    useCallback(() => {
      let active = true;
      const loadFavorites = async () => {
        const favs = await favoritesStorage.getFavoriteRecipes();
        if (active) {
          setFavoriteIds(favs);
        }
      };
      loadFavorites();
      return () => {
        active = false;
      };
    }, [])
  );

  const handleToggleFavorite = async (recipeId: string) => {
    await favoritesStorage.toggleFavoriteRecipe(recipeId);
    const updated = await favoritesStorage.getFavoriteRecipes();
    setFavoriteIds(updated);
  };

  const filters: RecipeFilterType[] = ['todas', 'infusión', 'ungüento', 'cataplasma', 'baño herbal'];

  const filteredRecipes = recipes.filter((recipe) => {
    return selectedFilter === 'todas' || recipe.type === selectedFilter;
  });

  return (
    <View style={styles.container}>
      <Header title="Recetario Natural" />

      {/* Filter Horizontal Scroll */}
      <View style={styles.filterSection}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CategoryChip
              label={item === 'todas' ? 'Todas' : item}
              selected={selectedFilter === item}
              onPress={() => setSelectedFilter(item)}
            />
          )}
        />
      </View>

      {/* Recipes List */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
            isFavorite={favoriteIds.includes(item.id)}
            onFavoritePress={() => handleToggleFavorite(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No hay recetas disponibles</Text>
            <Text style={styles.emptySubtitle}>No se encontraron recetas para esta categoría de preparación.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterSection: {
    paddingVertical: spacing.sm,
  },
  filtersList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  listContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxl * 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.tertiary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
});
