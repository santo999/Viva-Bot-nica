import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { ShieldCheck, AlertTriangle, ShieldAlert, HeartHandshake, EyeOff } from 'lucide-react-native';
import { colors, spacing, roundness, shadows } from '../theme/colors';
import Header from '../components/Header';
import WarningCard from '../components/WarningCard';

export default function ResponsibleUseScreen() {
  return (
    <View style={styles.container}>
      <Header title="Uso Responsable" showBackButton={true} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Intro Section */}
        <View style={styles.introHeader}>
          <View style={styles.shieldWrapper}>
            <ShieldCheck size={36} color={colors.onPrimary} />
          </View>
          <Text style={styles.introTitle}>Guía de Consumo Seguro</Text>
          <Text style={styles.introDesc}>
            Las plantas medicinales poseen compuestos químicos activos que interactúan con el organismo. Su consumo debe ser informado, prudente y respetuoso.
          </Text>
        </View>

        {/* Section 1: Reglas de Oro */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <HeartHandshake size={22} color={colors.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Recomendaciones Clave</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardHeader}>1. Dosificación y Medida</Text>
            <Text style={styles.cardBody}>
              Respeta siempre las cantidades indicadas en las preparaciones. Más cantidad no significa una curación más rápida, y puede causar intoxicaciones severas.
            </Text>

            <View style={styles.cardDivider} />

            <Text style={styles.cardHeader}>2. Identificación Precisa</Text>
            <Text style={styles.cardBody}>
              Consume solo plantas de las que estés 100% seguro de su identidad. El uso de nombres científicos reduce la confusión entre especies medicinales y tóxicas.
            </Text>

            <View style={styles.cardDivider} />

            <Text style={styles.cardHeader}>3. Calidad y Almacenamiento</Text>
            <Text style={styles.cardBody}>
              Adquiere hierbas secas en tiendas confiables. Protégelas de la luz directa, la humedad y el polvo en frascos de vidrio bien cerrados.
            </Text>
          </View>
        </View>

        {/* Section 2: Advertencias Críticas (WarningCards) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShieldAlert size={22} color={colors.secondary} style={styles.sectionIcon} />
            <Text style={[styles.sectionTitle, { color: colors.secondary }]}>Advertencias Importantes</Text>
          </View>

          <WarningCard
            title="Interacciones Medicamentosas"
            description="Si estás bajo tratamiento farmacológico (especialmente anticoagulantes, antidepresivos o antidiabéticos), muchas plantas pueden anular, potenciar o alterar gravemente los efectos de tu medicina."
            type="warning"
          />

          <WarningCard
            title="Embarazo, Lactancia y Niñez"
            description="La mayoría de plantas medicinales contienen compuestos capaces de atravesar la placenta o diluirse en la leche materna. No se recomienda su administración a bebés o niños pequeños sin supervisión médica."
            type="warning"
          />

          <WarningCard
            title="Efectos Acumulativos"
            description="No consumas la misma infusión de forma continua por más de dos semanas. Deja reposar al cuerpo una semana entre ciclos de tratamiento herbal."
            type="warning"
          />
        </View>

        {/* Disclaimer Card */}
        <View style={styles.disclaimerCard}>
          <View style={styles.disclaimerIconContainer}>
            <EyeOff size={24} color={colors.primary} />
          </View>
          <View style={styles.disclaimerTextContainer}>
            <Text style={styles.disclaimerTitle}>Descargo de Responsabilidad Académico</Text>
            <Text style={styles.disclaimerBody}>
              La información contenida en esta aplicación es de carácter netamente educativo y divulgativo. No reemplaza un diagnóstico médico formal ni la prescripción de profesionales sanitarios calificados. Use esta información bajo su propia responsabilidad.
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
    paddingBottom: spacing.xxl,
    paddingTop: spacing.md,
  },
  introHeader: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  shieldWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.soft,
  },
  introTitle: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'sans-serif-condensed',
    fontWeight: '700',
    color: colors.tertiary,
  },
  introDesc: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
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
  card: {
    backgroundColor: colors.surfaceBright,
    borderRadius: roundness.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
    ...shadows.soft,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.tertiary,
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.outlineVariant + '30',
    marginVertical: spacing.sm,
  },
  disclaimerCard: {
    flexDirection: 'row',
    backgroundColor: '#f1ede6',
    borderRadius: roundness.lg,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant + '40',
  },
  disclaimerIconContainer: {
    marginRight: spacing.md,
    marginTop: 2,
  },
  disclaimerTextContainer: {
    flex: 1,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.tertiary,
  },
  disclaimerBody: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginTop: 4,
  },
});
