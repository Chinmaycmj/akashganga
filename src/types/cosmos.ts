export type ScientificStatus =
  | 'Observed'
  | 'Well established'
  | 'Current model'
  | 'Active research'
  | 'Hypothesis'
  | 'Speculative';

export type ScaleUnit = 'm' | 'km' | 'AU' | 'ly' | 'pc' | 'kpc' | 'Mpc' | 'Gpc';

export interface PhysicalMeasurement {
  label: string;
  value: string;
  numericValueMeters?: number;
  scientificNotation?: string;
  unit: ScaleUnit | string;
  uncertainty?: string;
}

export interface CitationSource {
  title: string;
  institution: string; // e.g. NASA, ESA, Nature, Planck Collaboration, ESO
  url?: string;
  year?: number;
  description: string;
}

export interface CosmicStage {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  logScale: number; // Log10 meters, e.g. 6 = 10^6 m (Earth core/radius) up to 26 = 10^26 m (Observable Universe)
  scaleMeters: number;
  scaleDisplay: string;
  powersOfTen: string;
  scientificStatus: ScientificStatus;
  summary: string;
  wonderQuestion: string;
  narrative: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  keyFacts: string[];
  measurements: PhysicalMeasurement[];
  whatWeKnow: string[];
  whatWeInvestigate: string[];
  whatRemainsUnknown: string[];
  citations: CitationSource[];
  relatedTopics: string[];
  accentColor: string;
}

export interface AtlasTopic {
  id: string;
  title: string;
  category:
    | 'Earth & Planetary Science'
    | 'The Solar System'
    | 'Stars & Stellar Evolution'
    | 'Exoplanets'
    | 'Nebulae'
    | 'Galaxies'
    | 'Black Holes & Neutron Stars'
    | 'Relativity & Spacetime'
    | 'Cosmology & Dark Universe'
    | 'Quantum & Dimensions'
    | 'Multiverse & Hypotheses'
    | 'Unsolved Mysteries';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scientificStatus: ScientificStatus;
  heroEmoji: string;
  intro: string;
  sections: {
    title: string;
    content: string;
    formula?: string;
  }[];
  whatWeKnow: string[];
  whatScientistsInvestigate: string[];
  whatRemainsUnknown: string[];
  measurements: PhysicalMeasurement[];
  relatedTopicIds: string[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  citations: CitationSource[];
}

export interface CelestialObject {
  id: string;
  name: string;
  type: string;
  stageId: number;
  diameterKm: number;
  massKg: string;
  distanceFromEarth: string;
  orbitalPeriod?: string;
  surfaceTemp?: string;
  description: string;
  scientificStatus: ScientificStatus;
}

export interface GlossaryTerm {
  term: string;
  pronunciation?: string;
  category: string;
  definition: string;
  detailedContext: string;
  scientificStatus: ScientificStatus;
  relatedStages: number[];
}

export interface QuizQuestion {
  id: string;
  stageOrTopicId: string | number;
  stageTitle: string;
  question: string;
  wonderHook: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  depthNote: string;
}

export interface UserBookmark {
  id: string;
  type: 'stage' | 'topic' | 'lab';
  targetId: string;
  title: string;
  subtitle: string;
  timestamp: number;
  userNote?: string;
}
