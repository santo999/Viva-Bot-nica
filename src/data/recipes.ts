import { Recipe } from '../models/types';

export const recipes: Recipe[] = [
  {
    id: 'infusion-jengibre',
    name: 'Infusión de jengibre',
    type: 'infusión',
    time: '15 min',
    ingredients: [
      '1 taza de agua limpia',
      '3 a 4 rodajas delgadas de jengibre fresco',
      '1 cucharadita de miel de abejas (opcional)',
      '3 a 4 gotas de jugo de limón fresco'
    ],
    preparation: [
      'Lava bien la raíz de jengibre y córtala en rodajas muy finas.',
      'Pon a calentar el agua en un cazo pequeño hasta que comience a hervir.',
      'Añade las rodajas de jengibre, reduce el fuego al mínimo y deja hervir tapado durante 10 minutos.',
      'Apaga el fuego y deja reposar la infusión tapada por 3 a 5 minutos más.',
      'Cuela el líquido en una taza, agrega la miel y las gotas de limón. Mezcla bien y consúmela tibia.'
    ],
    use: 'Tomar 1 o 2 tazas al día, preferiblemente después de las comidas principales o al aparecer los primeros síntomas de resfriado o náuseas.',
    precautions: [
      'No exceder el consumo diario máximo recomendado (4g de jengibre fresco).',
      'Evitar si se consumen medicamentos anticoagulantes potentes sin consulta previa.',
      'Puede causar ardor en el estómago en personas extremadamente sensibles a alimentos picantes.'
    ],
    relatedPlants: ['jengibre'],
    image: require('../assets/images/recipe_jengibre.png')
  },
  {
    id: 'infusion-manzanilla',
    name: 'Infusión de manzanilla',
    type: 'infusión',
    time: '10 min',
    ingredients: [
      '1 taza de agua limpia',
      '1 cucharada de flores secas de manzanilla',
      'Miel de abejas al gusto (opcional)'
    ],
    preparation: [
      'Lleva el agua a ebullición en un recipiente limpio.',
      'Justo cuando comience a hervir, retírala del fuego.',
      'Agrega de inmediato las flores de manzanilla al agua caliente.',
      'Tapa bien el recipiente de inmediato para evitar la evaporación de los aceites esenciales de la flor.',
      'Deja reposar en infusión durante 7 minutos.',
      'Cuela con un colador de malla fina sobre una taza y endulza si lo deseas.'
    ],
    use: 'Ideal para consumir caliente antes de dormir para combatir el insomnio, o media hora después de comer para aliviar la pesadez estomacal.',
    precautions: [
      'Evitar su uso excesivo en personas con alergia al polen de plantas de la familia Asteráceas.',
      'No tomar infusiones concentradas durante el primer trimestre de embarazo de forma desmedida.'
    ],
    relatedPlants: ['manzanilla'],
    image: require('../assets/images/recipe_manzanilla.png')
  },
  {
    id: 'unguento-calendula',
    name: 'Ungüento de caléndula',
    type: 'ungüento',
    time: '45 min',
    ingredients: [
      '1/2 taza de flores secas de caléndula',
      '1/2 taza de aceite de oliva virgen extra o de almendras dulces',
      '15 gramos de cera de abejas pura'
    ],
    preparation: [
      'Coloca las flores secas de caléndula y el aceite seleccionado en un recipiente resistente al calor para hacer un baño María.',
      'Calienta a fuego lento el baño María durante 3 horas, revolviendo de vez en cuando (cuidando que el aceite no llegue a hervir) para extraer los principios activos.',
      'Filtra el aceite caliente con un colador cubierto por un lienzo o gasa limpia, exprimiendo bien las flores.',
      'Vuelve a colocar el aceite infundido en el baño María y añade la cera de abejas troceada hasta que se derrita por completo.',
      'Vierte rápidamente la mezcla líquida en frascos de vidrio oscuros previamente esterilizados.',
      'Deja enfriar sin tapar a temperatura ambiente hasta que solidifique. Conservar cerrado en un lugar fresco y seco.'
    ],
    use: 'Aplicar suavemente una capa delgada sobre la piel irritada, seca, rozaduras de pañal o quemaduras solares leves dos o tres veces al día.',
    precautions: [
      'Mantener en frascos limpios y protegidos de la luz directa.',
      'Solo para uso externo. Si nota picazón o irritación inusual en la piel, suspenda su aplicación inmediatamente.'
    ],
    relatedPlants: ['calendula'],
    image: require('../assets/images/recipe_calendula.png')
  },
  {
    id: 'cataplasma-sabila',
    name: 'Cataplasma de sábila',
    type: 'cataplasma',
    time: '25 min',
    ingredients: [
      '1 trozo mediano de hoja fresca de sábila (Aloe Vera)',
      '1 gasa estéril grande de algodón',
      'Vendaje elástico suave'
    ],
    preparation: [
      'Corta un pedazo de unos 8 a 10 cm de una hoja de sábila madura.',
      'Lávalo con abundante agua. Deja reposar en vertical para purgar el líquido amarillo amargo durante 15 minutos.',
      'Corta con cuidado las espinas laterales de la hoja.',
      'Con un cuchillo limpio abre la penca a la mitad a lo largo para exponer el gel interior.',
      'Usa una cuchara estéril para raspar suavemente la pulpa cristalina y machácala en un cuenco limpio hasta formar una pasta espesa.'
    ],
    use: 'Extiende la pasta de gel directamente sobre la zona de la piel que tenga una quemadura leve, hinchazón o picadura de insecto. Cubre con la gasa estéril y asegúrala con el vendaje sin apretar demasiado. Deja actuar durante 20 minutos.',
    precautions: [
      'Asegúrate de haber retirado bien la aloína (líquido amarillo) ya que puede causar comezón o quemazón cutánea.',
      'No aplicar sobre quemaduras profundas que requieran asistencia médica urgente o heridas abiertas que sangren.'
    ],
    relatedPlants: ['sabila'],
    image: require('../assets/images/recipe_sabila.png')
  },
  {
    id: 'bano-herbal-lavanda',
    name: 'Baño herbal de lavanda',
    type: 'baño herbal',
    time: '30 min',
    ingredients: [
      '1 taza de flores secas de lavanda',
      '2 tazas de agua hirviendo',
      '1/2 taza de sal de Epsom (opcional)'
    ],
    preparation: [
      'Pon a calentar el agua hasta que hierva.',
      'Coloca las flores de lavanda en un frasco o tetera grande resistente al calor y vierte el agua hirviendo sobre ellas.',
      'Tapa y deja reposar esta infusión muy concentrada durante 15 a 20 minutos.',
      'Cuela el líquido concentrado de lavanda directamente en el agua tibia de la bañera.',
      'Añade la sal de Epsom para potenciar la relajación muscular.'
    ],
    use: 'Sumergirse en la bañera y relajarse durante 15 a 20 minutos al final del día. En caso de no tener bañera, verter la infusión tibia sobre los hombros y espalda al final de la ducha normal sin aclarar con agua posterior.',
    precautions: [
      'Asegurar que el agua no esté demasiado caliente para evitar caídas bruscas de presión arterial.',
      'Secar la piel suavemente después del baño para evitar irritaciones mecánicas.'
    ],
    relatedPlants: ['lavanda'],
    image: require('../assets/images/recipe_lavanda.png')
  }
];
