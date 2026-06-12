import { Plant } from '../models/types';

export const plants: Plant[] = [
  {
    id: 'manzanilla',
    name: 'Manzanilla',
    scientificName: 'Matricaria chamomilla',
    category: 'relajante',
    description: 'Hierba aromática anual muy popular conocida por sus propiedades calmantes, antiinflamatorias y digestivas.',
    uses: [
      'Alivio de trastornos digestivos como gases, indigestión y espasmos.',
      'Reducción de la ansiedad, el estrés y ayuda a conciliar el sueño.',
      'Alivio de inflamaciones en la piel o irritación en los ojos mediante compresas.'
    ],
    preparation: 'Infusión: Agregar 1 cucharada de flores secas de manzanilla en una taza de agua hirviendo. Tapar y dejar reposar durante 5-10 minutos. Colar y beber tibio.',
    precautions: [
      'Puede causar reacciones alérgicas en personas sensibles a plantas de la familia Asteraceae.',
      'No se recomienda su uso en grandes cantidades durante los primeros meses de embarazo.',
      'Consultar al médico si se está bajo tratamiento con anticoagulantes.'
    ],
    relatedSymptoms: ['insomnio', 'estrés', 'digestión', 'inflamación'],
    image: require('../assets/images/manzanilla.png')
  },
  {
    id: 'hierbabuena',
    name: 'Hierbabuena',
    scientificName: 'Mentha spicata',
    category: 'digestivo',
    description: 'Planta herbácea muy aromática empleada tradicionalmente para tratar problemas estomacales y como refrescante natural.',
    uses: [
      'Alivio de espasmos estomacales, gases, náuseas e indigestión.',
      'Tratamiento de dolores de cabeza leves gracias a sus propiedades analgésicas y refrescantes.',
      'Reducción del estrés leve y refrescante del aliento.'
    ],
    preparation: 'Infusión: Colocar 4 a 6 hojas frescas de hierbabuena en una taza de agua hirviendo. Dejar reposar tapado por 5 minutos, colar y tomar caliente después de las comidas.',
    precautions: [
      'Evitar en personas con reflujo gastroesofágico severo ya que puede relajar el esfínter esofágico.',
      'No se recomienda su consumo en cantidades terapéuticas a niños menores de 2 años sin supervisión.'
    ],
    relatedSymptoms: ['digestión', 'dolor de cabeza', 'estrés'],
    image: require('../assets/images/hierbabuena.png')
  },
  {
    id: 'sabila',
    name: 'Sábila',
    scientificName: 'Aloe vera',
    category: 'cuidado de la piel',
    description: 'Planta suculenta conocida mundialmente por el gel mucilaginoso de sus hojas, altamente hidratante y cicatrizante.',
    uses: [
      'Cicatrización y regeneración de quemaduras leves, heridas superficiales y picaduras.',
      'Tratamiento del acné, resequedad cutánea e irritaciones solares.',
      'Uso interno como laxante y regulador digestivo (requiere preparación especial libre de aloína).'
    ],
    preparation: 'Gel Tópico: Cortar una hoja madura, lavarla bien y dejar escurrir en posición vertical por 20 minutos para eliminar el acíbar amarillo (aloína). Cortar los bordes espinosos, abrir la hoja longitudinalmente y extraer el gel transparente para aplicarlo directamente en la piel limpia.',
    precautions: [
      'No aplicar sobre heridas abiertas, profundas o quemaduras graves.',
      'El consumo interno del látex de aloe (líquido amarillo) puede causar diarrea severa y cólicos. No recomendado para embarazadas ni niños de forma oral.'
    ],
    relatedSymptoms: ['cuidado de la piel', 'inflamación'],
    image: require('../assets/images/sabila.png')
  },
  {
    id: 'calendula',
    name: 'Caléndula',
    scientificName: 'Calendula officinalis',
    category: 'antiinflamatorio',
    description: 'Planta de llamativas flores amarillas y anaranjadas con excelentes propiedades antisépticas, antiinflamatorias y cicatrizantes.',
    uses: [
      'Alivio de irritaciones en la piel, eccemas, dermatitis del pañal y rozaduras.',
      'Aceleración de la curación de pequeñas quemaduras, heridas leves e picaduras de insectos.',
      'Reducción de la inflamación de las encías mediante enjuagues bucales.'
    ],
    preparation: 'Ungüento/Compresa: Preparar una infusión concentrada con 2 cucharadas de flores de caléndula por taza de agua. Empapar una gasa estéril limpia y aplicarla tibia sobre la zona afectada por 10-15 minutos.',
    precautions: [
      'Puede causar dermatitis de contacto en personas alérgicas a las plantas compuestas.',
      'No aplicar de forma directa sobre quemaduras de tercer grado o heridas infectadas.'
    ],
    relatedSymptoms: ['inflamación', 'cuidado de la piel'],
    image: require('../assets/images/calendula.png')
  },
  {
    id: 'jengibre',
    name: 'Jengibre',
    scientificName: 'Zingiber officinale',
    category: 'antiinflamatorio',
    description: 'Rizoma nudoso de sabor picante y aromático, reconocido por sus potentes efectos antiinflamatorios, expectorantes y digestivos.',
    uses: [
      'Alivio de las náuseas causadas por mareos, embarazo o digestión lenta.',
      'Reducción del dolor articular y muscular debido a sus compuestos activos antiinflamatorios (gingeroles).',
      'Combate los síntomas del resfriado común, tos y dolor de garganta.'
    ],
    preparation: 'Té de jengibre: Hervir 1 taza de agua y agregar 2 o 3 rodajas finas de jengibre fresco o 1/2 cucharadita de jengibre en polvo. Dejar hervir a fuego lento de 5 a 10 minutos. Retirar del fuego, reposar tapado y endulzar opcionalmente con miel y limón.',
    precautions: [
      'Evitar dosis elevadas si se padece de cálculos biliares.',
      'Consultar al médico antes de consumirlo si toma medicamentos para la hipertensión o anticoagulantes.',
      'No exceder de 4 gramos de jengibre al día.'
    ],
    relatedSymptoms: ['inflamación', 'digestión', 'tos', 'resfriado', 'dolor de cabeza'],
    image: require('../assets/images/jengibre.png')
  },
  {
    id: 'eucalipto',
    name: 'Eucalipto',
    scientificName: 'Eucalyptus globulus',
    category: 'respiratorio',
    description: 'Árbol cuyas hojas contienen un aceite esencial muy rico en eucaliptol, ideal para despejar las vías respiratorias.',
    uses: [
      'Alivio de la congestión nasal, resfriados, bronquitis y asma leve.',
      'Acción expectorante que ayuda a expulsar la mucosidad de los pulmones.',
      'Desinfectante ambiental y calmante muscular en masajes o baños calientes.'
    ],
    preparation: 'Inhalaciones de Vapor: Hervir 1 litro de agua en una olla. Retirar del fuego y agregar 5 a 8 hojas de eucalipto fresco o seco. Colocarse una toalla sobre la cabeza cubriendo la olla para respirar los vapores emanados durante 5 a 10 minutos con los ojos cerrados.',
    precautions: [
      'El aceite esencial puro nunca debe ingerirse ya que es altamente tóxico.',
      'No recomendado para inhalación directa en niños menores de 3 años o personas con asma severa sin indicación médica.',
      'Evitar durante el embarazo y la lactancia.'
    ],
    relatedSymptoms: ['tos', 'resfriado'],
    image: require('../assets/images/eucalipto.png')
  },
  {
    id: 'lavanda',
    name: 'Lavanda',
    scientificName: 'Lavandula angustifolia',
    category: 'relajante',
    description: 'Planta arbustiva de hermosas espigas moradas con un aroma dulce e inconfundible, icónica en la aromaterapia por sus virtudes calmantes.',
    uses: [
      'Inducción al sueño reparador y alivio del insomnio crónico o estacional.',
      'Reducción de la ansiedad, tensión nerviosa y estrés cotidiano.',
      'Cuidado cosmético y cicatrización de irritaciones leves de la piel.'
    ],
    preparation: 'Infusión Relajante: Agregar 1 cucharadita de flores secas de lavanda en una taza de agua hirviendo. Reposar tapado por 5 minutos, colar y tomar antes de ir a dormir.',
    precautions: [
      'No consumir infusiones concentradas en exceso debido a posibles dolores de cabeza.',
      'El aceite esencial directo puede causar alergia si no se diluye en un aceite vehicular en personas de piel sensible.'
    ],
    relatedSymptoms: ['insomnio', 'estrés', 'dolor de cabeza', 'cuidado de la piel'],
    image: require('../assets/images/lavanda.png')
  },
  {
    id: 'menta',
    name: 'Menta',
    scientificName: 'Mentha x piperita',
    category: 'digestivo',
    description: 'Híbrido natural de menta con alto contenido de mentol, famosa por su efecto refrescante, descongestionante y antiespasmódico.',
    uses: [
      'Alivio de cólicos estomacales, síndrome de colon irritable e indigestión pesada.',
      'Descongestión de las vías respiratorias en estados gripales y tos.',
      'Disminución de la fatiga mental y los dolores de cabeza tensionales mediante la inhalación del aroma.'
    ],
    preparation: 'Té de Menta: Verter agua hirviendo sobre 1 cucharada de hojas secas o un puñado de hojas frescas de menta. Reposar 8 minutos, tapado para no perder los aceites esenciales, colar y beber tibio.',
    precautions: [
      'Evitar en personas con reflujo e hiperacidez estomacal.',
      'No emplear mentol directo cerca de la nariz o boca de bebés y niños pequeños por riesgo de espasmo de glotis.'
    ],
    relatedSymptoms: ['digestión', 'resfriado', 'dolor de cabeza', 'estrés'],
    image: require('../assets/images/menta.png')
  }
];
