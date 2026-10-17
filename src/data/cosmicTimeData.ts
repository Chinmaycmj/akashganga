import { TraditionalCosmicTimePeriod } from '@/types/vedicCosmos';

export const TRADITIONAL_COSMIC_EPOCHS: TraditionalCosmicTimePeriod[] = [
  {
    name: 'Kali Yuga',
    sanskritName: 'Kali Yuga',
    devanagari: 'कलियुग',
    solarYearsDuration: 432000,
    humanYearsRatio: '1x baseline (1,200 divine years)',
    description: 'The age of material density, discord, spiritual forgetfulness, and rapid technological acceleration.',
    moralCharacteristics: 'Dharma stands on only one leg (25% truth). Lifespans diminish, but spiritual attainment requires only simple sincere remembrance (Nama-smarana).',
    textualSource: 'Surya Siddhanta 1.15–17; Vishnu Purana 4.24.',
    modernCosmologyComparison: 'Roughly equivalent to the entire evolutionary span of anatomically modern Homo sapiens (~300,000 years).'
  },
  {
    name: 'Dvapara Yuga',
    sanskritName: 'Dvapara Yuga',
    devanagari: 'द्वापरयुग',
    solarYearsDuration: 864000,
    humanYearsRatio: '2x Kali Yuga (2,400 divine years)',
    description: 'The age of duality, ceremonial ritual, formal sciences, and emerging division between spirit and matter.',
    moralCharacteristics: 'Dharma stands on two legs (50% truth). The epoch associated with the events of the Mahabharata and Krishna.',
    textualSource: 'Bhagavata Purana 12.3.',
    modernCosmologyComparison: 'Twice the duration of Kali Yuga; spans multiple human ice age cycles on Earth.'
  },
  {
    name: 'Treta Yuga',
    sanskritName: 'Treta Yuga',
    devanagari: 'त्रेतायुग',
    solarYearsDuration: 1296000,
    humanYearsRatio: '3x Kali Yuga (3,600 divine years)',
    description: 'The age of intellectual purity, mental focus, sacred fire rituals (Yajnas), and noble kingship (Rama Rajya).',
    moralCharacteristics: 'Dharma stands on three legs (75% truth). Knowledge is preserved through refined oral memory and spiritual clarity.',
    textualSource: 'Ramayana (Uttara Kanda); Surya Siddhanta.',
    modernCosmologyComparison: '1.296 million years; approximates the Pleistocene epoch of early hominid toolmaking.'
  },
  {
    name: 'Satya Yuga (Krita Yuga)',
    sanskritName: 'Satya / Krita Yuga',
    devanagari: 'सत्ययुग / कृतयुग',
    solarYearsDuration: 1728000,
    humanYearsRatio: '4x Kali Yuga (4,800 divine years)',
    description: 'The Golden Age of uncompromised truth, direct intuitive knowledge of universal laws, and profound harmony with nature.',
    moralCharacteristics: 'Dharma stands fully on all four legs (100% truth). No deceit, crime, or coercion; meditation (Dhyana) is the primary mode of living.',
    textualSource: 'Manusmriti 1.81–86; Mahabharata (Vana Parva).',
    modernCosmologyComparison: '1.728 million years; represents an entire geological epoch of quaternary climate shifts.'
  },
  {
    name: 'Mahayuga (Chaturyuga)',
    sanskritName: 'Mahayuga',
    devanagari: 'महायुग',
    solarYearsDuration: 4320000,
    humanYearsRatio: 'Sum of 4 Yugas (4,320,000 solar years)',
    description: 'One complete four-stage cycle of cosmic emergence, moral golden age, progressive density, and dissolution.',
    moralCharacteristics: 'A closed harmonic cycle repeating 1,000 times within each daytime of Brahma.',
    textualSource: 'Aryabhatiya (Kalakriyapada 8); Surya Siddhanta 1.15.',
    modernCosmologyComparison: '4.32 million years; approximates the period of one complete galactic vertical oscillation of our Sun through the Milky Way disk.'
  },
  {
    name: 'Manvantara',
    sanskritName: 'Manvantara',
    devanagari: 'मन्वन्तर',
    solarYearsDuration: 306720000,
    humanYearsRatio: '71 Mahayugas + Sandhis (~308.4 million years)',
    description: 'The reign of a single cosmic Manu (progenitor of civilizations), comprising 71 Mahayugas flanked by transitional twilight sandhis.',
    moralCharacteristics: 'There are 14 Manvantaras in one Kalpa. The present epoch is the 7th Manvantara (Vaivasvata Manu).',
    textualSource: 'Vishnu Purana Book 3; Surya Siddhanta 1.18.',
    modernCosmologyComparison: '~308 million years; remarkably close to one complete Galactic Year (the Sun’s 230-million-year orbit around the Milky Way).'
  },
  {
    name: 'Kalpa (A Day of Brahma)',
    sanskritName: 'Kalpa',
    devanagari: 'कल्प',
    solarYearsDuration: 4320000000,
    humanYearsRatio: '1,000 Mahayugas (4.32 Billion years)',
    description: 'One daytime period of the cosmic creator Brahma, during which the physical worlds manifest, evolve, and sustain life.',
    moralCharacteristics: 'Followed by a cosmic night (Pralaya / Naimittika Dissolution) of equal duration (4.32 billion years) while Brahma sleeps.',
    textualSource: 'Bhagavad Gita 8.17; Surya Siddhanta 1.20.',
    modernCosmologyComparison: '4.32 billion years; astonishingly close to Earth’s true scientific age (4.54 billion years) and the Sun’s age (4.6 billion years).'
  },
  {
    name: 'Maha-Kalpa (Brahma’s Lifespan)',
    sanskritName: 'Brahma-Ayu',
    devanagari: 'ब्रह्मायुष्',
    solarYearsDuration: 311040000000000, // 3.1104 × 10¹⁴ years
    humanYearsRatio: '100 Brahma Years = 72,000 Kalpas (~311 Trillion years)',
    description: 'The total lifespan of Brahma, after which the entire universe collapses into primordial Mahapralaya before rebirth.',
    moralCharacteristics: 'We are currently in the 51st year of the present Brahma (Shveta-Varaha Kalpa).',
    textualSource: 'Srimad Bhagavatam Canto 3, Chapter 11.',
    modernCosmologyComparison: '311 trillion years; modern astrophysics calculates that by ~100 trillion years, star formation ceases as all gas is consumed (Degenerate Era).'
  }
];

export interface ModernCosmicEpoch {
  epochName: string;
  timeFromBigBang: string;
  numericYears: number;
  physicsDescription: string;
  cosmicMilestone: string;
}

export const MODERN_COSMIC_EPOCHS: ModernCosmicEpoch[] = [
  {
    epochName: 'Planck Epoch',
    timeFromBigBang: '0 to 10⁻⁴³ seconds',
    numericYears: 0,
    physicsDescription: 'All four fundamental forces unified under quantum gravity at Planck temperature (10³² K).',
    cosmicMilestone: 'Quantum foam singularity prior to known spacetime physics.'
  },
  {
    epochName: 'Cosmic Inflation',
    timeFromBigBang: '10⁻³⁶ to 10⁻³² seconds',
    numericYears: 0,
    physicsDescription: 'Exponential superluminal expansion driven by false-vacuum inflaton field by a factor of >10²⁶.',
    cosmicMilestone: 'Flattened spatial curvature and seeded primordial quantum density perturbations.'
  },
  {
    epochName: 'Recombination & CMB',
    timeFromBigBang: '379,000 years',
    numericYears: 379000,
    physicsDescription: 'Temperature dropped to ~3,000 K; electrons bonded to protons forming neutral hydrogen atoms.',
    cosmicMilestone: 'Photons decoupled and universe became transparent, leaving the Cosmic Microwave Background.'
  },
  {
    epochName: 'First Stars (Reionization)',
    timeFromBigBang: '150 to 400 Million years',
    numericYears: 300000000,
    physicsDescription: 'Pristine Population III stars ignited from primordial hydrogen and helium without heavier metals.',
    cosmicMilestone: 'Ended the Cosmic Dark Ages with intense ultraviolet stellar radiation.'
  },
  {
    epochName: 'Formation of Sun & Earth',
    timeFromBigBang: '9.2 Billion years (~4.6 Ga ago)',
    numericYears: 9200000000,
    physicsDescription: 'Gravitational collapse of molecular cloud enriched by previous supernova remnants.',
    cosmicMilestone: 'Protoplanetary disk formed Sun and 8 planets; prebiotic oceans developed on Earth.'
  },
  {
    epochName: 'The Present Day',
    timeFromBigBang: '13.787 Billion years',
    numericYears: 13787000000,
    physicsDescription: 'Accelerated cosmic expansion driven by dark energy (Cosmological constant Λ ≈ 0.68).',
    cosmicMilestone: 'Intelligent life on Earth measures cosmic history across 26 orders of magnitude.'
  },
  {
    epochName: 'Sun’s Red Giant Phase',
    timeFromBigBang: '~18.8 Billion years (+5 Ga future)',
    numericYears: 18800000000,
    physicsDescription: 'Solar core exhausts hydrogen; helium burning expands photosphere to envelop Mercury, Venus, and Earth.',
    cosmicMilestone: 'Planetary nebula ejected, leaving a slowly cooling White Dwarf.'
  },
  {
    epochName: 'Degenerate Star Era',
    timeFromBigBang: '~100 Trillion years',
    numericYears: 100000000000000,
    physicsDescription: 'All interstellar hydrogen gas consumed; all normal stars cease nuclear burning.',
    cosmicMilestone: 'Universe populated solely by White Dwarfs, Neutron Stars, and Black Holes.'
  },
  {
    epochName: 'Heat Death / Big Freeze',
    timeFromBigBang: '> 10¹⁰⁰ years',
    numericYears: 1e100,
    physicsDescription: 'Supermassive black holes evaporate via quantum Hawking radiation; maximum cosmological entropy.',
    cosmicMilestone: 'Universe consists of dilute bath of low-frequency photons and leptons approaching absolute zero.'
  }
];
