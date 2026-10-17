import { GlossaryTerm } from '@/types/cosmos';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Accretion Disk',
    pronunciation: '/əˈkriːʃən dɪsk/',
    category: 'High Energy Astrophysics',
    definition: 'A rotating disk of gas, plasma, and dust swirling around a massive central body such as a black hole, neutron star, or young protostar.',
    detailedContext: 'Frictional and magnetic forces (magnetorotational instability) heat the infalling matter to millions of degrees, producing intense X-ray and UV radiation before matter crosses the event horizon.',
    scientificStatus: 'Observed',
    relatedStages: [5, 8, 9]
  },
  {
    term: 'Astronomical Unit (AU)',
    pronunciation: '/ˌæstrəˈnɒmɪkəl ˈjuːnɪt/',
    category: 'Units & Measurement',
    definition: 'The mean distance from the center of Earth to the center of the Sun, defined exactly as 149,597,870,700 meters (~149.6 million km).',
    detailedContext: 'Used as the baseline yardstick for measuring distances within planetary systems.',
    scientificStatus: 'Observed',
    relatedStages: [3, 4]
  },
  {
    term: 'Baryonic Matter',
    pronunciation: '/bæriˈɒnɪk ˈmætər/',
    category: 'Particle Physics & Cosmology',
    definition: 'Matter composed of baryons (protons and neutrons), making up all atomic elements, stars, planets, gas, and living organisms.',
    detailedContext: 'Baryonic matter accounts for only about 4.9% of the total energy-matter density of the universe; the remaining 95% is dark matter and dark energy.',
    scientificStatus: 'Well established',
    relatedStages: [10, 11, 12]
  },
  {
    term: 'Cosmic Microwave Background (CMB)',
    pronunciation: '/ˈkɒzmɪk ˈmaɪkrəˌweɪv ˈbækɡraʊnd/',
    category: 'Cosmology',
    definition: 'The thermal relic radiation left over from the Big Bang, emitted ~380,000 years after the universe began when neutral hydrogen formed (recombination).',
    detailedContext: 'The CMB fills all of space with an almost uniform blackbody temperature of 2.7255 Kelvin. Tiny temperature variations of 1 part in 100,000 represent primordial seeds of all galaxies.',
    scientificStatus: 'Well established',
    relatedStages: [11, 12, 13]
  },
  {
    term: 'Event Horizon',
    pronunciation: '/ɪˈvɛnt həˈraɪzən/',
    category: 'Relativity',
    definition: 'The boundary surrounding a black hole beyond which the escape velocity exceeds the speed of light, making escape physically impossible.',
    detailedContext: 'Not a physical surface of matter, but a causal boundary in spacetime. The distance from the singularity to the event horizon in a non-rotating black hole is the Schwarzschild radius (Rs = 2GM/c²).',
    scientificStatus: 'Well established',
    relatedStages: [5, 8]
  },
  {
    term: 'Habitable Zone',
    pronunciation: '/ˈhæbɪtəbəl zoʊn/',
    category: 'Exoplanets & Astrobiology',
    definition: 'The orbital region around a star where temperatures allow liquid water to exist on a planet’s surface under sufficient atmospheric pressure.',
    detailedContext: 'Often called the "Goldilocks Zone." Being in the habitable zone is necessary but not sufficient for life; atmosphere, magnetic fields, and geochemical cycling are equally crucial.',
    scientificStatus: 'Current model',
    relatedStages: [2, 6]
  },
  {
    term: 'Hubble Tension',
    pronunciation: '/ˈhʌbəl ˈtɛnʃən/',
    category: 'Cosmology',
    definition: 'A statistically significant discrepancy between early-universe measurements of the cosmic expansion rate (H₀ ≈ 67.4 km/s/Mpc) and local late-universe measurements (H₀ ≈ 73 km/s/Mpc).',
    detailedContext: 'This 5-sigma disagreement may indicate new physics beyond the standard ΛCDM cosmological model, such as early dark energy or sterile neutrinos.',
    scientificStatus: 'Active research',
    relatedStages: [12, 13]
  },
  {
    term: 'Light-Year (ly)',
    pronunciation: '/laɪt jɪər/',
    category: 'Units & Measurement',
    definition: 'The distance that a photon of light travels in a vacuum in one Julian year (365.25 days), equal to 9.4607 × 10¹⁵ meters (about 9.46 trillion km).',
    detailedContext: 'Because light has a finite speed, looking at an object 100 light-years away means observing it as it existed 100 years ago (lookback time).',
    scientificStatus: 'Observed',
    relatedStages: [5, 6, 7, 8, 9]
  },
  {
    term: 'Multiverse',
    pronunciation: '/ˈmʌltiˌvɜːrs/',
    category: 'Theoretical Physics',
    definition: 'Hypothetical collections of potentially diverse universes, including our own, arising from models of cosmic inflation, quantum mechanics, or string theory.',
    detailedContext: 'There is zero empirical observational confirmation of other universes. Multiverse ideas remain theoretical frameworks and mathematical models.',
    scientificStatus: 'Hypothesis',
    relatedStages: [13, 14]
  },
  {
    term: 'Parsec (pc)',
    pronunciation: '/ˈpɑːrsɛk/',
    category: 'Units & Measurement',
    definition: 'An astronomical unit of length equal to approximately 3.26 light-years or 3.086 × 10¹⁶ meters, defined as the distance at which 1 AU subtends an angle of one arcsecond.',
    detailedContext: 'The standard distance unit preferred by professional astronomers for stellar and extragalactic distances.',
    scientificStatus: 'Observed',
    relatedStages: [5, 8, 9, 10]
  },
  {
    term: 'Redshift (z)',
    pronunciation: '/ˈrɛdˌʃɪft/',
    category: 'Cosmology & Spectroscopy',
    definition: 'The phenomenon where electromagnetic radiation from an astronomical object is shifted toward longer (redder) wavelengths.',
    detailedContext: 'Can be caused by Doppler motion, gravitational fields (gravitational redshift), or the cosmological expansion of space stretching photons during transit.',
    scientificStatus: 'Observed',
    relatedStages: [9, 11, 12]
  },
  {
    term: 'Schwarzschild Radius',
    pronunciation: '/ˈʃvɑːrtsʃɪld ˈreɪdiəs/',
    category: 'Relativity',
    definition: 'The radius of the event horizon for a non-rotating, spherically symmetric mass, given by Rs = 2GM / c².',
    detailedContext: 'If Earth were compressed to its Schwarzschild radius (~9 mm), it would collapse into a black hole.',
    scientificStatus: 'Well established',
    relatedStages: [5, 8]
  },
  {
    term: 'Spacetime Curvature',
    pronunciation: '/ˈspeɪstaɪm ˈkɜːrvətʃər/',
    category: 'Relativity',
    definition: 'The geometric deformation of the four-dimensional manifold of spacetime caused by the distribution of mass, energy, and momentum.',
    detailedContext: 'Described by Einstein’s Field Equations. Freely falling bodies travel along geodesics of this curved geometry, which we perceive macroscopically as gravity.',
    scientificStatus: 'Well established',
    relatedStages: [1, 3, 5, 14]
  },
  {
    term: 'Tesseract',
    pronunciation: '/ˈtɛsərækt/',
    category: 'Higher Geometry',
    definition: 'A four-dimensional geometric analog of a cube, bounded by 8 cubical cells, 24 square faces, 32 edges, and 16 vertices.',
    detailedContext: 'While a 4D tesseract cannot exist in 3D physical space, its 3D wireframe projections and 2D shadows can be manipulated and explored mathematically.',
    scientificStatus: 'Current model',
    relatedStages: [14]
  },
  {
    term: 'Dark Matter',
    pronunciation: '/dɑːrk ˈmætər/',
    category: 'Cosmology & Particle Physics',
    definition: 'A hypothetical form of non-luminous matter that does not absorb, reflect, or emit light, but reveals its presence solely through gravitational interactions.',
    detailedContext: 'Comprising ~26.8% of the universe’s energy density, it explains flat galactic rotation curves, gravitational lensing by clusters, and early structure formation.',
    scientificStatus: 'Current model',
    relatedStages: [8, 10, 11]
  },
  {
    term: 'Dark Energy',
    pronunciation: '/dɑːrk ˈɛnərdʒi/',
    category: 'Cosmology',
    definition: 'An unknown energy component that permeates all of space and exerts a negative pressure, accelerating the expansion rate of the universe.',
    detailedContext: 'Accounts for ~68.3% of the universe’s total energy density. Often mathematically modeled as the cosmological constant Lambda (Λ) in Einstein’s Field Equations.',
    scientificStatus: 'Current model',
    relatedStages: [11, 12, 13]
  },
  {
    term: 'Gravitational Waves',
    pronunciation: '/ˌɡrævɪˈteɪʃənəl weɪvz/',
    category: 'Relativity',
    definition: 'Ripples in the curvature of spacetime propagated as transverse waves at the speed of light, generated by accelerating quadrupole masses.',
    detailedContext: 'First directly detected by LIGO in September 2015 from a binary black hole merger (GW150914), confirming Einstein’s 1916 prediction.',
    scientificStatus: 'Observed',
    relatedStages: [5, 8, 14]
  },
  {
    term: 'Geodynamo',
    pronunciation: '/ˌdʒiːoʊˈdaɪnəmoʊ/',
    category: 'Planetary Geophysics',
    definition: 'The physical mechanism by which Earth generates its global magnetic field through convection currents in its liquid iron-nickel outer core.',
    detailedContext: 'The Coriolis effect twists convective columns into helical flows, amplifying seed magnetic fields through electromagnetic induction.',
    scientificStatus: 'Well established',
    relatedStages: [1, 2]
  },
  {
    term: 'Cosmic Web',
    pronunciation: '/ˈkɒzmɪk wɛb/',
    category: 'Cosmology & Large-Scale Structure',
    definition: 'The vast, filamentary network along which galaxies and galaxy clusters are distributed throughout the observable universe, separated by empty cosmic voids.',
    detailedContext: 'Formed through gravitational collapse of primordial dark matter density perturbations seeded during the inflationary epoch.',
    scientificStatus: 'Current model',
    relatedStages: [10, 11]
  },
  {
    term: 'Cosmic Inflation',
    pronunciation: '/ˈkɒzmɪk ɪnˈfleɪʃən/',
    category: 'Theoretical Cosmology',
    definition: 'A period of exponential spatial expansion occurring roughly 10⁻³⁶ to 10⁻³² seconds after the Big Bang singularity, driven by an inflaton scalar field.',
    detailedContext: 'Solves the horizon, flatness, and magnetic monopole problems, while generating primordial quantum density fluctuations that seeded galaxies.',
    scientificStatus: 'Current model',
    relatedStages: [12, 13, 14]
  }
];
