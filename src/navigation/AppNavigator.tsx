import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Leaf, Activity, BookOpen, Heart } from 'lucide-react-native';
import { View, StyleSheet, Platform } from 'react-native';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import SymptomsScreen from '../screens/SymptomsScreen';
import RecipesScreen from '../screens/RecipesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import PlantDetailScreen from '../screens/PlantDetailScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import SymptomResultsScreen from '../screens/SymptomResultsScreen';
import ResponsibleUseScreen from '../screens/ResponsibleUseScreen';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamList, MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom active dot indicator under active icon
function TabIcon({ Icon, color, focused }: { Icon: any; color: string; focused: boolean }) {
  return (
    <View style={styles.iconContainer}>
      <Icon size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
      {focused && <View style={[styles.activeDot, { backgroundColor: color }]} />}
    </View>
  );
}

function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#496251',
        tabBarInactiveTintColor: '#a3aaa4',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          height: Platform.OS === 'ios' ? 88 : 64 + insets.bottom,
          paddingBottom: Platform.OS === 'ios' ? 28 : insets.bottom + 8,
          paddingTop: 12,
          elevation: 20,
          shadowColor: '#496251',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Home} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Catálogo"
        component={CatalogScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Leaf} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Síntomas"
        component={SymptomsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Activity} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Recetas"
        component={RecipesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={BookOpen} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Heart} color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fdf9f2' },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen
        name="PlantDetail"
        component={PlantDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="SymptomResults"
        component={SymptomResultsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ResponsibleUse"
        component={ResponsibleUseScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 32,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
});
