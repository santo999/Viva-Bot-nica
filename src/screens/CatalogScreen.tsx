import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search, X, SlidersHorizontal } from 'lucide-react-native';
import { colors, spacing, roundness } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { plants } from '../data/plants';
import { Plant } from '../models/types';
import { favoritesStorage } from '../storage/favoritesStorage';
import PlantCard from '../components/PlantCard';
import CategoryChip from '../components/CategoryChip';
import Header from '../components/Header';

type CatalogScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CategoryType = 'todas' | Plant['category'];

export default function CatalogScreen() {
  const navigation = useNavigation<CatalogScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('todas');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Reload favorites whenever screen gains focus
  useFocusEffect(
    useCallback(() => {
      let active = true;
      const loadFavorites = async () => {
        const favs = await favoritesStorage.getFavoritePlants();
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

  const handleToggleFavorite = async (plantId: string) => {
    await favoritesStorage.toggleFavoritePlant(plantId);
    const updatedFavs = await favoritesStorage.getFavoritePlants();
    setFavoriteIds(updatedFavs);
  };

  // Categories list
  const categories: CategoryType[] = ['todas', 'digestivo', 'respiratorio', 'relajante', 'antiinflamatorio', 'cuidado de la piel'];

  // Filter and search logic
  const filteredPlants = plants.filter((plant) => {
    const matchesCategory = selectedCategory === 'todas' || plant.category === selectedCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      query === '' ||
      plant.name.toLowerCase().includes(query) ||
      plant.scientificName.toLowerCase().includes(query) ||
      plant.category.toLowerCase().includes(query) ||
      plant.description.toLowerCase().includes(query) ||
      plant.relatedSymptoms.some(s => s.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Header title="Catálogo Botánico" />

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBarContainer}>
          <Search size={20} color={colors.outline} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre, síntoma..."
            placeholderTextColor={colors.onSurfaceVariant + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <X size={18} color={colors.outline} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter Horizontal Scroll */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CategoryChip
              label={item === 'todas' ? 'Todas' : item}
              selected={selectedCategory === item}
              onPress={() => setSelectedCategory(item)}
            />
          )}
        />
      </View>

      {/* Plants List */}
      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlantCard
            plant={item}
            onPress={() => navigation.navigate('PlantDetail', { plantId: item.id })}
            isFavorite={favoriteIds.includes(item.id)}
            onFavoritePress={() => handleToggleFavorite(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No se encontraron plantas</Text>
            <Text style={styles.emptySubtitle}>Intenta buscar con otros términos o cambia la categoría de filtro.</Text>
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
  searchSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.full,
    paddingHorizontal: spacing.md,
    height: 52,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '60',
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.onSurface,
    height: '100%',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
  },
  clearButton: {
    padding: spacing.xs,
  },
  categoriesContainer: {
    marginBottom: spacing.xs,
  },
  categoriesList: {
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
