import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Inicio: undefined;
  Catálogo: undefined;
  Síntomas: undefined;
  Recetas: undefined;
  Favoritos: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  PlantDetail: { plantId: string };
  RecipeDetail: { recipeId: string };
  SymptomResults: { symptomName: string };
  ResponsibleUse: undefined;
};
