import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Activity, ShieldAlert, ArrowRight } from 'lucide-react-native';
import { colors, spacing, roundness, shadows } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { symptoms } from '../data/symptoms';
import Header from '../components/Header';

type SymptomsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SymptomsScreen() {
  const navigation = useNavigation<SymptomsScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Header title="Buscar por Síntomas" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Intro Section */}
        <View style={styles.introContainer}>
          <Activity size={32} color={colors.primary} style={styles.introIcon} />
          <Text style={styles.introTitle}>¿Qué molestia experimentas?</Text>
          <Text style={styles.introSubtitle}>
            Selecciona un síntoma frecuente para consultar las plantas medicinales y recetas naturales recomendadas tradicionalmente.
          </Text>
        </View>

        {/* Symptoms Grid */}
        <View style={styles.gridContainer}>
          {symptoms.map((symptom) => (
            <TouchableOpacity
              key={symptom.id}
              style={[styles.symptomCard, shadows.soft]}
              onPress={() => navigation.navigate('SymptomResults', { symptomName: symptom.id })}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>
                  <Activity size={18} color={colors.primary} />
                </View>
                <ArrowRight size={16} color={colors.outline} />
              </View>
              <Text style={styles.symptomName}>{symptom.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notice Card */}
        <View style={styles.noticeCard}>
          <ShieldAlert size={20} color={colors.secondary} style={styles.noticeIcon} />
          <View style={styles.noticeTextContainer}>
            <Text style={styles.noticeTitle}>Nota de Uso Responsable</Text>
            <Text style={styles.noticeDesc}>
              El uso de hierbas medicinales es complementario. Si tu síntoma persiste o es severo, consulta a un profesional de la salud.
            </Text>
          </View>
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
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
    paddingTop: spacing.md,
  },
  introContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  introIcon: {
    marginBottom: spacing.sm,
  },
  introTitle: {
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.tertiary,
    textAlign: 'center',
  },
  introSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  symptomCard: {
    width: '47%',
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eaf1ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  symptomName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.tertiary,
    marginTop: spacing.xs,
  },
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff5f3',
    borderColor: colors.secondary + '30',
    borderWidth: 1,
    borderRadius: roundness.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  noticeIcon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  noticeTextContainer: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
  },
  noticeDesc: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginTop: 2,
  },
});
