import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Heart, Leaf, BookOpen } from 'lucide-react-native';
import { colors, spacing, roundness, shadows } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { plants } from '../data/plants';
import { recipes } from '../data/recipes';
import { Plant, Recipe } from '../models/types';
import { favoritesStorage } from '../storage/favoritesStorage';
import PlantCard from '../components/PlantCard';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type FavTabType = 'plantas' | 'recetas';

export default function FavoritesScreen() {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<FavTabType>('plantas');
  const [favoritePlantIds, setFavoritePlantIds] = useState<string[]>([]);
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>([]);

  // Refresh favorites on screen focus
  useFocusEffect(
    useCallback(() => {
      let active = true;
      const loadFavorites = async () => {
        const pFavs = await favoritesStorage.getFavoritePlants();
        const rFavs = await favoritesStorage.getFavoriteRecipes();
        if (active) {
          setFavoritePlantIds(pFavs);
          setFavoriteRecipeIds(rFavs);
        }
      };
      loadFavorites();
      return () => {
        active = false;
      };
    }, [])
  );

  const handleRemovePlantFavorite = async (plantId: string) => {
    await favoritesStorage.toggleFavoritePlant(plantId);
    const updated = await favoritesStorage.getFavoritePlants();
    setFavoritePlantIds(updated);
  };

  const handleRemoveRecipeFavorite = async (recipeId: string) => {
    await favoritesStorage.toggleFavoriteRecipe(recipeId);
    const updated = await favoritesStorage.getFavoriteRecipes();
    setFavoriteRecipeIds(updated);
  };

  // Filter lists based on favorite IDs
  const favoritePlants = plants.filter((p) => favoritePlantIds.includes(p.id));
  const favoriteRecipes = recipes.filter((r) => favoriteRecipeIds.includes(r.id));

  const isPlantTab = activeTab === 'plantas';

  return (
    <View style={styles.container}>
      <Header title="Mis Favoritos" />

      {/* Custom Tab Selector */}
      <View style={styles.tabContainer}>
        <View style={styles.tabBackground}>
          <TouchableOpacity
            style={[styles.tabButton, isPlantTab && styles.activeTabButton]}
            onPress={() => setActiveTab('plantas')}
            activeOpacity={0.9}
          >
            <Leaf size={16} color={isPlantTab ? colors.primary : colors.outline} style={styles.tabIcon} />
            <Text style={[styles.tabText, isPlantTab && styles.activeTabText]}>
              Plantas ({favoritePlants.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, !isPlantTab && styles.activeTabButton]}
            onPress={() => setActiveTab('recetas')}
            activeOpacity={0.9}
          >
            <BookOpen size={16} color={!isPlantTab ? colors.primary : colors.outline} style={styles.tabIcon} />
            <Text style={[styles.tabText, !isPlantTab && styles.activeTabText]}>
              Recetas ({favoriteRecipes.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Favorites List */}
      {isPlantTab ? (
        <FlatList
          data={favoritePlants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PlantCard
              plant={item}
              onPress={() => navigation.navigate('PlantDetail', { plantId: item.id })}
              isFavorite={true}
              onFavoritePress={() => handleRemovePlantFavorite(item.id)}
              horizontal={true}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyWrapper}>
              <EmptyState
                title="Sin plantas favoritas"
                description="Aún no has guardado ninguna planta medicinal. Explora el catálogo y presiona el ícono del corazón."
                icon={Heart}
              />
            </View>
          }
        />
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
              isFavorite={true}
              onFavoritePress={() => handleRemoveRecipeFavorite(item.id)}
              horizontal={true}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyWrapper}>
              <EmptyState
                title="Sin recetas favoritas"
                description="Tu recetario guardado está vacío. Navega al recetario y guarda los remedios que más te interesen."
                icon={Heart}
              />
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  tabBackground: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderRadius: roundness.md,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: roundness.md - 2,
  },
  activeTabButton: {
    backgroundColor: colors.surfaceBright,
    ...shadows.soft,
  },
  tabIcon: {
    marginRight: spacing.xs,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.outline,
  },
  activeTabText: {
    color: colors.tertiary,
  },
  listContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  emptyWrapper: {
    flex: 1,
    paddingTop: 40,
  },
});
