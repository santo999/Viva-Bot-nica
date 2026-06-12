import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Heart, Clock, Utensils, ClipboardList, ShieldAlert, Sparkles } from 'lucide-react-native';
import { colors, spacing, roundness, shadows } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { recipes } from '../data/recipes';
import { plants } from '../data/plants';
import { favoritesStorage } from '../storage/favoritesStorage';
import WarningCard from '../components/WarningCard';

type RecipeDetailRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;
type RecipeDetailNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RecipeDetailScreen() {
  const route = useRoute<RecipeDetailRouteProp>();
  const navigation = useNavigation<RecipeDetailNavigationProp>();
  const insets = useSafeAreaInsets();
  const { recipeId } = route.params;

  const recipe = recipes.find((r) => r.id === recipeId);
  const [isFavorite, setIsFavorite] = useState(false);
  const imageSource = recipe ? (typeof recipe.image === 'string' ? { uri: recipe.image } : recipe.image) : null;

  useEffect(() => {
    const checkFavorite = async () => {
      const favs = await favoritesStorage.getFavoriteRecipes();
      setIsFavorite(favs.includes(recipeId));
    };
    checkFavorite();
  }, [recipeId]);

  const handleToggleFavorite = async () => {
    const added = await favoritesStorage.toggleFavoriteRecipe(recipeId);
    setIsFavorite(added);
  };

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Receta no encontrada</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Find detailed objects for related plants
  const relatedPlantObjects = plants.filter((p) => recipe.relatedPlants.includes(p.id));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Image Container */}
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.imageOverlay} />

          {/* Action overlay */}
          <View style={[styles.headerOverlay, { top: insets.top + 10 }]}>
            <TouchableOpacity
              style={[styles.actionBtn, shadows.soft]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <ChevronLeft size={24} color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, shadows.soft]}
              onPress={handleToggleFavorite}
              activeOpacity={0.8}
            >
              <Heart
                size={22}
                color={isFavorite ? colors.secondary : colors.outline}
                fill={isFavorite ? colors.secondary : 'transparent'}
              />
            </TouchableOpacity>
          </View>

          {/* Time Badge Overlay */}
          <View style={styles.timeBadge}>
            <Clock size={14} color={colors.onPrimary} style={styles.clockIcon} />
            <Text style={styles.timeText}>{recipe.time}</Text>
          </View>
        </View>

        {/* Content Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.recipeType}>{recipe.type}</Text>
          <Text style={styles.recipeName}>{recipe.name}</Text>

          <View style={styles.divider} />

          {/* Section: Ingredients */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Utensils size={20} color={colors.primary} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Ingredientes necesarios</Text>
            </View>
            <View style={styles.ingredientsCard}>
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Section: Preparation Step-by-Step */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ClipboardList size={20} color={colors.primary} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Preparación paso a paso</Text>
            </View>
            <View style={styles.stepsContainer}>
              {recipe.preparation.map((step, index) => (
                <View key={index} style={styles.stepRow}>
                  <View style={styles.stepNumberContainer}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  </View>
                  <View style={styles.stepTextContainer}>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Section: Recommended Use */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Sparkles size={20} color={colors.primary} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Modo de aplicación / Uso</Text>
            </View>
            <View style={styles.useCard}>
              <Text style={styles.useText}>{recipe.use}</Text>
            </View>
          </View>

          {/* Section: Precautions */}
          {recipe.precautions && recipe.precautions.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <ShieldAlert size={20} color={colors.secondary} style={styles.sectionIcon} />
                <Text style={[styles.sectionTitle, { color: colors.secondary }]}>Contraindicaciones</Text>
              </View>
              {recipe.precautions.map((prec, index) => (
                <WarningCard
                  key={index}
                  title="Precaución de consumo"
                  description={prec}
                  type="warning"
                />
              ))}
            </View>
          )}

          {/* Section: Related Plants */}
          {relatedPlantObjects.length > 0 && (
            <View style={[styles.section, { marginBottom: spacing.lg }]}>
              <Text style={styles.sectionSubTitle}>Plantas e ingredientes clave</Text>
              <View style={styles.plantsContainer}>
                {relatedPlantObjects.map((plant) => (
                  <TouchableOpacity
                    key={plant.id}
                    style={styles.plantBadge}
                    onPress={() => navigation.navigate('PlantDetail', { plantId: plant.id })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.plantBadgeText}>{plant.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
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
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  backBtn: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: roundness.md,
  },
  backBtnText: {
    color: colors.onPrimary,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
    height: 280,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  headerOverlay: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceBright,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeBadge: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.lg,
    backgroundColor: 'rgba(73,98,81,0.95)', // Sage Green translucent
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: roundness.full,
  },
  clockIcon: {
    marginRight: 6,
  },
  timeText: {
    color: colors.onPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  detailsContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  recipeType: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  recipeName: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'sans-serif-condensed',
    fontWeight: '800',
    color: colors.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outlineVariant + '40',
    marginVertical: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionIcon: {
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-SemiBold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.tertiary,
  },
  ingredientsCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  ingredientText: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 20,
  },
  stepsContainer: {
    paddingLeft: spacing.xs,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  stepNumber: {
    color: colors.onPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepText: {
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 22,
  },
  useCard: {
    backgroundColor: '#f4fbf7',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRadius: roundness.sm,
    padding: spacing.md,
  },
  useText: {
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  sectionSubTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.tertiary,
    marginBottom: spacing.sm,
  },
  plantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  plantBadge: {
    backgroundColor: '#eaf1ec',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: roundness.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  plantBadgeText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
