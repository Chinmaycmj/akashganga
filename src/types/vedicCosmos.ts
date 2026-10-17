
export type EpistemicCategory =
  | 'Astronomical Observation'
  | 'Mathematical Algorithm'
  | 'Historical Textual Record'
  | 'Philosophical / Cosmological Concept'
  | 'Traditional Jyotisha Rule'
  | 'Mythological Narrative'
  | 'Speculative Modern Hypothesis';

export type AyanamshaSystem = 'Lahiri' | 'Raman' | 'Krishnamurti' | 'None (Tropical)';

export type ChartFormat = 'North Indian' | 'South Indian';

export type PlanetId = 
  | 'surya' 
  | 'chandra' 
  | 'mangala' 
  | 'budha' 
  | 'brihaspati' 
  | 'shukra' 
  | 'shani' 
  | 'rahu' 
  | 'ketu';

export type Dignity = 
  | 'Exalted' 
  | 'Moolatrikona' 
  | 'Own Sign' 
  | 'Great Friend' 
  | 'Friend' 
  | 'Neutral' 
  | 'Enemy' 
  | 'Great Enemy' 
  | 'Debilitated';

export interface Navagraha {
  id: PlanetId;
  sanskritName: string;
  devanagari: string;
  iast: string;
  pronunciation: string;
  englishName: string;
  astronomicalIdentity: string;
  isPhysicalPlanet: boolean; // false for Rahu & Ketu (lunar nodes)
  astronomyFacts: {
    orbitalPeriodDays?: number;
    meanDistanceFromSunAU?: number;
    diameterKm?: number;
    physicalCharacteristics: string;
  };
  symbolicMeaning: string;
  archetype: string;
  mythologicalNarrative: string;
  textualSource: string;
  element: string; // Tattva
  gunas: 'Sattva' | 'Rajas' | 'Tamas';
  gender: 'Male' | 'Female' | 'Neutral';
  rulingRashis: string[];
  exaltationRashi: string;
  exaltationDegree: number;
  debilitationRashi: string;
  debilitationDegree: number;
  moolatrikonaRashi: string;
  moolatrikonaRange: string;
  naturalFriends: string[];
  naturalNeutrals: string[];
  naturalEnemies: string[];
  aspects: number[]; // Traditional Drishti (e.g. 7th for all, special 4th/8th for Mars, etc.)
  gemstone: string;
  color: string;
  dayOfWeek?: string;
  direction: string;
  mantra: string;
  epistemicStatus: EpistemicCategory;
}

export interface Rashi {
  id: number; // 1 to 12
  name: string;
  sanskritName: string;
  devanagari: string;
  iast: string;
  symbol: string;
  westernZodiac: string;
  longitudeStartDeg: number;
  longitudeEndDeg: number;
  rulingPlanetId: PlanetId;
  element: 'Agni (Fire)' | 'Prithvi (Earth)' | 'Vayu (Air)' | 'Jala (Water)';
  modality: 'Chara (Movable)' | 'Sthira (Fixed)' | 'Dvisvabhava (Dual)';
  gender: 'Purusha (Masculine)' | 'Stri (Feminine)';
  risingSignQuality: 'Shirshodaya' | 'Prishtodaya' | 'Ubhayodaya';
  symbolism: string;
  astronomicalConstellation: string;
  precessionDifferenceNotes: string;
}

export interface NakshatraPada {
  padaNumber: number; // 1, 2, 3, 4
  degreesStart: string;
  degreesEnd: string;
  navamshaRashi: string;
  navamshaLord: string;
  soundSyllable: string;
}

export interface Nakshatra {
  id: number; // 1 to 27
  name: string;
  sanskritName: string;
  devanagari: string;
  iast: string;
  pronunciation: string;
  symbol: string;
  deity: string;
  deityDescription: string;
  rulingPlanetId: PlanetId;
  longitudeStartDeg: number; // 0 to 360
  longitudeEndDeg: number;
  associatedStars: string; // Western astronomical stars (e.g. Spica, Aldebaran, Antares)
  padas: NakshatraPada[];
  shakti: string; // Power or energy of Nakshatra
  mythologicalNarrative: string;
  traditionalInterpretation: string;
}

export interface CalculatedPlanetPosition {
  id: PlanetId;
  name: string;
  tropicalLongitudeDeg: number;
  siderealLongitudeDeg: number;
  rashiIndex: number; // 1 to 12
  rashiName: string;
  degreesInRashi: number; // 0 to 30
  nakshatraIndex: number; // 1 to 27
  nakshatraName: string;
  nakshatraPada: number; // 1 to 4
  navamshaRashiIndex: number; // 1 to 12
  navamshaRashiName: string;
  isRetrograde: boolean;
  speedDegPerDay: number;
  bhavaNumber: number; // 1 to 12
  dignity: Dignity;
}

export interface KundliChart {
  birthDateTimeUTC: string;
  latitude: number;
  longitude: number;
  locationName: string;
  ayanamshaSystem: AyanamshaSystem;
  ayanamshaValueDeg: number;
  tropicalAscendantDeg: number;
  siderealAscendantDeg: number;
  lagnaRashiIndex: number; // 1 to 12
  lagnaDegreesInRashi: number;
  lagnaNakshatra: string;
  lagnaPada: number;
  planets: CalculatedPlanetPosition[];
  bhavas: {
    bhavaNumber: number;
    rashiIndex: number;
    rashiName: string;
    occupyingPlanets: PlanetId[];
    significances: string[];
  }[];
}

export interface AncientMathAlgorithm {
  id: string;
  title: string;
  scholar: string;
  historicalPeriod: string;
  textName: string;
  description: string;
  mathematicalConcept: string;
  historicalSignificance: string;
  modernComparison: string;
  interactiveDemoId: string;
}

export interface TraditionalCosmicTimePeriod {
  name: string;
  sanskritName: string;
  devanagari: string;
  solarYearsDuration: number;
  humanYearsRatio: string;
  description: string;
  moralCharacteristics: string;
  textualSource: string;
  modernCosmologyComparison: string;
}

export interface TextualSourceEntry {
  id: string;
  title: string;
  authorOrAttribution: string;
  estimatedPeriod: string;
  traditionOrSchool: string;
  chapterVerseLocator: string;
  sanskritDevanagari: string;
  iastTransliteration: string;
  englishTranslation: string;
  translatorAttribution: string;
  scholarlyNotes: string;
  epistemicNature: 'Direct Quotation' | 'Scholarly Translation' | 'Historical Commentary';
  relatedTopics: string[];
}

export interface CurriculumStage {
  stageNumber: number;
  title: string;
  subtitle: string;
  prerequisites: number[]; // e.g. Stage 2 requires Stage 1
  estimatedMinutes: number;
  learningObjectives: string[];
  keyTerms: {
    sanskrit?: string;
    iast?: string;
    english: string;
    definition: string;
  }[];
  misconceptionAlert: {
    misconception: string;
    scientificHistoricalCorrection: string;
  };
  lessonContent: {
    sectionTitle: string;
    text: string;
    formulaOrCode?: string;
  }[];
  interactiveActivity: {
    title: string;
    description: string;
    toolUrl: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}
