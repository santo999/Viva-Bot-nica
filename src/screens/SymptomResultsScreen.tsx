import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Platform } from 'react-native';
import { useRoute, useNavigation, RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Activity, Leaf, BookOpen } from 'lucide-react-native';
import { colors, spacing, roundness } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { plants } from '../data/plants';
import { recipes } from '../data/recipes';
import { favoritesStorage } from '../storage/favoritesStorage';
import PlantCard from '../components/PlantCard';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import SectionTitle from '../components/SectionTitle';

type SymptomResultsRouteProp = RouteProp<RootStackParamList, 'SymptomResults'>;
type SymptomResultsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SymptomResultsScreen() {
  const route = useRoute<SymptomResultsRouteProp>();
  const navigation = useNavigation<SymptomResultsNavigationProp>();
  const { symptomName } = route.params;

  const [favoritePlantIds, setFavoritePlantIds] = useState<string[]>([]);
  const [favoriteRecipeIds, setFavoriteRecipeIds] = useState<string[]>([]);

  // Load favorites on focus
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

  const handleTogglePlantFavorite = async (plantId: string) => {
    await favoritesStorage.toggleFavoritePlant(plantId);
    const updated = await favoritesStorage.getFavoritePlants();
    setFavoritePlantIds(updated);
  };

  const handleToggleRecipeFavorite = async (recipeId: string) => {
    await favoritesStorage.toggleFavoriteRecipe(recipeId);
    const updated = await favoritesStorage.getFavoriteRecipes();
    setFavoriteRecipeIds(updated);
  };

  // Find plants related to this symptom
  const matchingPlants = plants.filter((plant) =>
    plant.relatedSymptoms.map((s) => s.toLowerCase()).includes(symptomName.toLowerCase())
  );

  // Find recipes related to these plants
  const matchingPlantIds = matchingPlants.map((p) => p.id);
  const matchingRecipes = recipes.filter((recipe) =>
    recipe.relatedPlants.some((pId) => matchingPlantIds.includes(pId))
  );

  return (
    <View style={styles.container}>
      <Header title={`Molestia: ${symptomName}`} showBackButton={true} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Intro Banner */}
        <View style={styles.introBanner}>
          <Activity size={24} color={colors.primary} style={styles.bannerIcon} />
          <Text style={styles.bannerText}>
            Se encontraron {matchingPlants.length} plantas y {matchingRecipes.length} recetas recomendadas para tratar síntomas de{' '}
            <Text style={styles.highlightText}>{symptomName}</Text>.
          </Text>
        </View>

        {/* Section: Recommended Plants */}
        <SectionTitle 
          title="Plantas Recomendadas" 
          subtitle="Hierbas con propiedades medicinales para este síntoma" 
        />
        {matchingPlants.length > 0 ? (
          matchingPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onPress={() => navigation.navigate('PlantDetail', { plantId: plant.id })}
              isFavorite={favoritePlantIds.includes(plant.id)}
              onFavoritePress={() => handleTogglePlantFavorite(plant.id)}
              horizontal={true} // Horizontal list item for compact view
            />
          ))
        ) : (
          <View style={styles.emptySection}>
            <Text style={styles.emptyText}>No hay plantas registradas para este síntoma.</Text>
          </View>
        )}

        <View style={styles.spacer} />

        {/* Section: Related Recipes */}
        <SectionTitle 
          title="Recetas Naturales" 
          subtitle="Preparaciones que puedes elaborar en casa" 
        />
        {matchingRecipes.length > 0 ? (
          matchingRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onPress={() => navigation.navigate('RecipeDetail', { recipeId: recipe.id })}
              isFavorite={favoriteRecipeIds.includes(recipe.id)}
              onFavoritePress={() => handleToggleRecipeFavorite(recipe.id)}
              horizontal={true}
            />
          ))
        ) : (
          <View style={styles.emptySection}>
            <Text style={styles.emptyText}>No hay recetas registradas para este síntoma.</Text>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
    paddingTop: spacing.md,
  },
  introBanner: {
    flexDirection: 'row',
    backgroundColor: '#eaf1ec',
    borderRadius: roundness.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  bannerIcon: {
    marginRight: spacing.md,
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
    color: colors.tertiary,
    lineHeight: 20,
  },
  highlightText: {
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'capitalize',
  },
  emptySection: {
    backgroundColor: colors.surfaceBright,
    marginHorizontal: spacing.lg,
    borderRadius: roundness.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  emptyText: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  spacer: {
    height: spacing.md,
  },
});
