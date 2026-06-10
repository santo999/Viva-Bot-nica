export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: 'digestivo' | 'respiratorio' | 'relajante' | 'antiinflamatorio' | 'cuidado de la piel';
  description: string;
  uses: string[];
  preparation: string;
  precautions: string[];
  relatedSymptoms: string[];
  image: any;
}

export interface Recipe {
  id: string;
  name: string;
  type: 'infusión' | 'ungüento' | 'cataplasma' | 'baño herbal';
  time: string;
  ingredients: string[];
  preparation: string[];
  use: string;
  precautions: string[];
  relatedPlants: string[];
  image: any;
}

export interface Symptom {
  id: string;
  name: string;
}
