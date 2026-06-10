import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Leaf, BookOpen, Activity, Heart, ShieldCheck, Sparkles } from 'lucide-react-native';
import { colors, spacing, roundness, shadows } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { plants } from '../data/plants';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  
  // Select "Manzanilla" as the Plant of the Day
  const plantOfTheDay = plants[0];

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + spacing.lg }]} 
      showsVerticalScrollIndicator={false}
    >
      {/* Brand Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View>
          <Text style={styles.welcomeText}>Hola, bienvenido a</Text>
          <Text style={styles.brandTitle}>Botánica Viva</Text>
        </View>
        <View style={styles.logoContainer}>
          <Leaf size={24} color={colors.onPrimary} />
        </View>
      </View>

      {/* Main Banner */}
      <View style={[styles.bannerContainer, shadows.soft]}>
        <Image 
          source={require('../assets/images/home_banner.png')} 
          style={styles.bannerImage} 
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Tu Herbario Digital</Text>
          <Text style={styles.bannerSubtitle}>Conecta con el poder curativo de las plantas medicinales y recetas naturales.</Text>
        </View>
      </View>

      {/* Quick Access Grid */}
      <Text style={styles.sectionTitle}>Explorar Aplicación</Text>
      <View style={styles.gridContainer}>
        {/* Catálogo */}
        <TouchableOpacity 
          style={[styles.gridItem, shadows.soft]} 
          onPress={() => navigation.navigate('MainTabs', { screen: 'Catálogo' })}
          activeOpacity={0.9}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#eaf1ec' }]}>
            <Leaf size={22} color={colors.primary} />
          </View>
          <Text style={styles.gridItemLabel}>Catálogo</Text>
        </TouchableOpacity>

        {/* Síntomas */}
        <TouchableOpacity 
          style={[styles.gridItem, shadows.soft]} 
          onPress={() => navigation.navigate('MainTabs', { screen: 'Síntomas' })}
          activeOpacity={0.9}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#fdf3f0' }]}>
            <Activity size={22} color={colors.secondary} />
          </View>
          <Text style={styles.gridItemLabel}>Síntomas</Text>
        </TouchableOpacity>

        {/* Recetas */}
        <TouchableOpacity 
          style={[styles.gridItem, shadows.soft]} 
          onPress={() => navigation.navigate('MainTabs', { screen: 'Recetas' })}
          activeOpacity={0.9}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#f2f8f6' }]}>
            <BookOpen size={22} color={colors.tertiary} />
          </View>
          <Text style={styles.gridItemLabel}>Recetario</Text>
        </TouchableOpacity>

        {/* Favoritos */}
        <TouchableOpacity 
          style={[styles.gridItem, shadows.soft]} 
          onPress={() => navigation.navigate('MainTabs', { screen: 'Favoritos' })}
          activeOpacity={0.9}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#fbf3f5' }]}>
            <Heart size={22} color="#c06c5d" />
          </View>
          <Text style={styles.gridItemLabel}>Favoritos</Text>
        </TouchableOpacity>
      </View>

      {/* Plant of the Day */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Planta del Día</Text>
        <View style={styles.badgePlantaDia}>
          <Sparkles size={12} color={colors.primary} style={styles.badgeIcon} />
          <Text style={styles.badgeText}>Recomendada</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.plantaDiaCard, shadows.medium]}
        onPress={() => navigation.navigate('PlantDetail', { plantId: plantOfTheDay.id })}
        activeOpacity={0.9}
      >
        <Image source={typeof plantOfTheDay.image === 'string' ? { uri: plantOfTheDay.image } : plantOfTheDay.image} style={styles.plantaDiaImage} />
        <View style={styles.plantaDiaContent}>
          <Text style={styles.plantaDiaName}>{plantOfTheDay.name}</Text>
          <Text style={styles.plantaDiaScientific}>{plantOfTheDay.scientificName}</Text>
          <Text style={styles.plantaDiaDesc} numberOfLines={2}>{plantOfTheDay.description}</Text>
          <View style={styles.plantaDiaAction}>
            <Text style={styles.plantaDiaActionText}>Ver ficha completa</Text>
            <Leaf size={14} color={colors.primary} style={styles.actionIcon} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Responsible Use Banner */}
      <TouchableOpacity 
        style={[styles.responsibleBanner, shadows.soft]}
        onPress={() => navigation.navigate('ResponsibleUse')}
        activeOpacity={0.9}
      >
        <View style={styles.responsibleIconContainer}>
          <ShieldCheck size={28} color={colors.onPrimary} />
        </View>
        <View style={styles.responsibleTextContainer}>
          <Text style={styles.responsibleTitle}>Uso Responsable y Seguro</Text>
          <Text style={styles.responsibleSubtitle}>Aprende recomendaciones esenciales antes de consumir remedios naturales.</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    // Relleno inferior dinámico para evitar solapamiento
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  brandTitle: {
    fontSize: 26,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'sans-serif-condensed',
    fontWeight: '800',
    color: colors.tertiary,
    marginTop: 2,
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerContainer: {
    height: 180,
    marginHorizontal: spacing.lg,
    borderRadius: roundness.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: spacing.lg,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  bannerTitle: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.onPrimary,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#e2e8e4',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-SemiBold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.tertiary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  gridItem: {
    width: (width - 48 - 16) / 2, // 4-column margin logic (width - padding - gap)
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gridItemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: spacing.lg,
  },
  badgePlantaDia: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaf1ec',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: roundness.full,
    marginTop: spacing.md,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  plantaDiaCard: {
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.xl,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  plantaDiaImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.surfaceContainer,
  },
  plantaDiaContent: {
    padding: spacing.md,
  },
  plantaDiaName: {
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.tertiary,
  },
  plantaDiaScientific: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.onSurfaceVariant,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  plantaDiaDesc: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  plantaDiaAction: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  plantaDiaActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
  actionIcon: {
    marginTop: 1,
  },
  responsibleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: roundness.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  responsibleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: roundness.md,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  responsibleTextContainer: {
    flex: 1,
  },
  responsibleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  responsibleSubtitle: {
    fontSize: 12,
    color: '#e2e8e4',
    marginTop: 2,
    lineHeight: 16,
  },
});
