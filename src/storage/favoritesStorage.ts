import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_PLANTS_KEY = 'botanica_viva_favorite_plants';
const FAVORITE_RECIPES_KEY = 'botanica_viva_favorite_recipes';

export const favoritesStorage = {
  // Get all favorite plant IDs
  getFavoritePlants: async (): Promise<string[]> => {
    try {
      const data = await AsyncStorage.getItem(FAVORITE_PLANTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting favorite plants:', error);
      return [];
    }
  },

  // Add a plant to favorites
  toggleFavoritePlant: async (id: string): Promise<boolean> => {
    try {
      const favorites = await favoritesStorage.getFavoritePlants();
      const index = favorites.indexOf(id);
      let newFavorites: string[];
      let isAdded = false;

      if (index > -1) {
        newFavorites = favorites.filter(favId => favId !== id);
      } else {
        newFavorites = [...favorites, id];
        isAdded = true;
      }

      await AsyncStorage.setItem(FAVORITE_PLANTS_KEY, JSON.stringify(newFavorites));
      return isAdded;
    } catch (error) {
      console.error('Error toggling favorite plant:', error);
      return false;
    }
  },

  // Get all favorite recipe IDs
  getFavoriteRecipes: async (): Promise<string[]> => {
    try {
      const data = await AsyncStorage.getItem(FAVORITE_RECIPES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting favorite recipes:', error);
      return [];
    }
  },

  // Add a recipe to favorites
  toggleFavoriteRecipe: async (id: string): Promise<boolean> => {
    try {
      const favorites = await favoritesStorage.getFavoriteRecipes();
      const index = favorites.indexOf(id);
      let newFavorites: string[];
      let isAdded = false;

      if (index > -1) {
        newFavorites = favorites.filter(favId => favId !== id);
      } else {
        newFavorites = [...favorites, id];
        isAdded = true;
      }

      await AsyncStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(newFavorites));
      return isAdded;
    } catch (error) {
      console.error('Error toggling favorite recipe:', error);
      return false;
    }
  },
};
