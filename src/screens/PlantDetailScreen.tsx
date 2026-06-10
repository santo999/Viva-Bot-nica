import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Heart, BookOpen, HelpingHand, ShieldAlert } from 'lucide-react-native';
import { colors, spacing, roundness, shadows } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { plants } from '../data/plants';
import { favoritesStorage } from '../storage/favoritesStorage';
import WarningCard from '../components/WarningCard';

type PlantDetailRouteProp = RouteProp<RootStackParamList, 'PlantDetail'>;
type PlantDetailNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function PlantDetailScreen() {
  const route = useRoute<PlantDetailRouteProp>();
  const navigation = useNavigation<PlantDetailNavigationProp>();
  const insets = useSafeAreaInsets();
  const { plantId } = route.params;

  const plant = plants.find((p) => p.id === plantId);
  const [isFavorite, setIsFavorite] = useState(false);
  const imageSource = plant ? (typeof plant.image === 'string' ? { uri: plant.image } : plant.image) : null;

  useEffect(() => {
    const checkFavorite = async () => {
      const favs = await favoritesStorage.getFavoritePlants();
      setIsFavorite(favs.includes(plantId));
    };
    checkFavorite();
  }, [plantId]);

  const handleToggleFavorite = async () => {
    const added = await favoritesStorage.toggleFavoritePlant(plantId);
    setIsFavorite(added);
  };

  if (!plant) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Planta no encontrada</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image Container */}
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.imageOverlay} />
          
          {/* Header Actions Overlay */}
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
          
          {/* Category Badge overlay on bottom left of image */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{plant.category}</Text>
          </View>
        </View>

        {/* Content Body */}
        <View style={styles.detailsContainer}>
          {/* Title Area */}
          <Text style={styles.commonName}>{plant.name}</Text>
          <Text style={styles.scientificName}>{plant.scientificName}</Text>
          
          <Text style={styles.description}>{plant.description}</Text>
          
          <View style={styles.divider} />

          {/* Section: Usos Tradicionales */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <HelpingHand size={20} color={colors.primary} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Usos Tradicionales</Text>
            </View>
            {plant.uses.map((use, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{use}</Text>
              </View>
            ))}
          </View>

          {/* Section: Preparación */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <BookOpen size={20} color={colors.primary} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Método de Preparación</Text>
            </View>
            <View style={styles.prepCard}>
              <Text style={styles.prepText}>{plant.preparation}</Text>
            </View>
          </View>

          {/* Section: Precauciones */}
          {plant.precautions && plant.precautions.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <ShieldAlert size={20} color={colors.secondary} style={styles.sectionIcon} />
                <Text style={[styles.sectionTitle, { color: colors.secondary }]}>Precauciones y Contraindicaciones</Text>
              </View>
              {plant.precautions.map((prec, index) => (
                <WarningCard 
                  key={index}
                  title="Precaución"
                  description={prec}
                  type="warning"
                />
              ))}
            </View>
          )}

          {/* Section: Síntomas Relacionados */}
          {plant.relatedSymptoms && plant.relatedSymptoms.length > 0 && (
            <View style={[styles.section, { marginBottom: spacing.lg }]}>
              <Text style={styles.sectionSubTitle}>Síntomas Relacionados</Text>
              <View style={styles.symptomsContainer}>
                {plant.relatedSymptoms.map((symptom) => (
                  <TouchableOpacity
                    key={symptom}
                    style={styles.symptomBadge}
                    onPress={() => navigation.navigate('SymptomResults', { symptomName: symptom })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.symptomBadgeText}>{symptom}</Text>
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
    height: 300,
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
  categoryBadge: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: roundness.full,
  },
  categoryText: {
    color: colors.onPrimary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  detailsContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  commonName: {
    fontSize: 26,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'sans-serif-condensed',
    fontWeight: '800',
    color: colors.tertiary,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.onSurfaceVariant,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 15,
    color: colors.onSurface,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outlineVariant + '40',
    marginVertical: spacing.lg,
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
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-SemiBold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.tertiary,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    paddingRight: spacing.md,
  },
  bulletPoint: {
    fontSize: 16,
    color: colors.primary,
    width: 15,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 20,
  },
  prepCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  prepText: {
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 22,
  },
  sectionSubTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.tertiary,
    marginBottom: spacing.sm,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  symptomBadge: {
    backgroundColor: '#eaf1ec',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: roundness.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  symptomBadgeText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
