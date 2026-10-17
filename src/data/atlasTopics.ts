import { AtlasTopic } from '@/types/cosmos';

export const ATLAS_TOPICS: AtlasTopic[] = [
  {
    id: 'black-holes',
    title: 'Black Holes & Singularities',
    category: 'Black Holes & Neutron Stars',
    difficulty: 'Intermediate',
    scientificStatus: 'Observed',
    heroEmoji: '🕳️',
    intro: 'Regions of spacetime where gravitational collapse is so extreme that nothing—not even light—can escape past the event horizon.',
    sections: [
      {
        title: 'The Anatomy of a Black Hole',
        content: 'A black hole is not an empty cosmic vacuum cleaner; it is a profound deformation of spacetime. At its boundary lies the Event Horizon, a one-way causal boundary defined by the Schwarzschild radius: R_s = 2GM / c^2. Surrounding the horizon is the Photon Sphere at 1.5 R_s, where light rays can orbit in unstable circles. Beyond that lies the Innermost Stable Circular Orbit (ISCO) at 3 R_s for non-rotating black holes, which anchors the glowing accretion disk.',
        formula: 'R_s = \\frac{2GM}{c^2}'
      },
      {
        title: 'Observing the Unseeable',
        content: 'While the interior cannot be observed directly, surrounding matter reveals black holes through high-energy X-ray emission and gravitational lensing. In 2019, the Event Horizon Telescope delivered the first direct image of the black hole shadow in M87*, followed by Sagittarius A* in our own Milky Way in 2022. LIGO and Virgo have detected dozens of black hole gravitational wave mergers.',
        formula: 'h \\sim \\frac{G}{c^4} \\frac{\\ddot{Q}}{r}'
      },
      {
        title: 'The Information Paradox and Hawking Radiation',
        content: 'In 1974, Stephen Hawking demonstrated using quantum field theory in curved spacetime that black holes emit thermal blackbody radiation due to quantum fluctuations near the event horizon. This implies black holes slowly evaporate over incomprehensible timescales (~10^67 years for a solar-mass black hole), leading to the Black Hole Information Paradox: does quantum information get destroyed when a black hole evaporates?'
      }
    ],
    whatWeKnow: [
      'Stellar-mass black holes form when massive stars (>20-25 M☉) collapse at the end of their lives.',
      'Supermassive black holes containing millions to billions of solar masses sit at the cores of almost all major galaxies.',
      'Gravitational lensing by the black hole warps background light into double-image arcs and shadows.'
    ],
    whatScientistsInvestigate: [
      'The physics of relativistic jet launching from spinning Kerr black holes via the Blandford-Znajek process.',
      'Resolving the Black Hole Information Paradox via holographic duality (AdS/CFT) and quantum entanglement islands.'
    ],
    whatRemainsUnknown: [
      'The true quantum nature of the central gravitational singularity where general relativity breaks down.',
      'How supermassive black holes formed within only 500 million years after the Big Bang.'
    ],
    measurements: [
      { label: 'Event Horizon Radius (10 M☉)', value: '29.5 km', unit: 'km' },
      { label: 'Sagittarius A* Mass', value: '4.15 × 10⁶ M☉', unit: 'M☉' },
      { label: 'M87* Black Hole Mass', value: '6.5 × 10⁹ M☉', unit: 'M☉' },
      { label: 'Hawking Temperature (10 M☉)', value: '6.17 × 10⁻⁹ K', unit: 'K' }
    ],
    relatedTopicIds: ['neutron-stars', 'relativity-spacetime', 'quantum-physics'],
    quiz: {
      question: 'What actually happens to light when it crosses the event horizon of a black hole?',
      options: [
        'Light is absorbed and turned into solid matter',
        'Spacetime curvature is so extreme that all future light paths point inward toward the singularity',
        'The speed of light drops to zero immediately',
        'Light reflects off the solid surface of the event horizon'
      ],
      correctAnswer: 1,
      explanation: 'Inside the event horizon, the radial coordinate and time coordinate swap roles. Spacetime flows inward faster than light, so all future light cones point inexorably toward the central singularity.'
    },
    citations: [
      { title: 'First M87 Event Horizon Telescope Results', institution: 'Astrophysical Journal Letters', year: 2019, description: 'First direct image of a black hole shadow.' },
      { title: 'Black Hole Thermodynamics', institution: 'Living Reviews in Relativity', year: 2021, description: 'Hawking radiation and horizon entropy.' }
    ]
  },
  {
    id: 'neutron-stars',
    title: 'Neutron Stars & Pulsars',
    category: 'Black Holes & Neutron Stars',
    difficulty: 'Intermediate',
    scientificStatus: 'Observed',
    heroEmoji: '⚡',
    intro: 'City-sized stellar remnants so dense that a single teaspoon of their material weighs as much as Mount Everest.',
    sections: [
      {
        title: 'Beyond the Atomic Realm',
        content: 'When a star between ~8 and 20 solar masses exhausts its fuel, its iron core collapses under immense gravity. Electrons and protons are crushed together via inverse beta decay (p + e⁻ → n + νₑ) into pure neutrons. Collapse is halted only by Neutron Degeneracy Pressure, forming a spherical object just 20 kilometers across with a mass of 1.4 to 2.1 suns.',
        formula: 'p + e^- \\rightarrow n + \\nu_e'
      },
      {
        title: 'Pulsars and Magnetars',
        content: 'Due to conservation of angular momentum and magnetic flux compression during collapse, newly formed neutron stars spin hundreds of times per second and harbor magnetic fields up to 10^15 Gauss (Magnetars). Beams of radiation sweeping across our line of sight are detected as rhythmic pulses—Pulsars.'
      }
    ],
    whatWeKnow: [
      'Neutron stars possess the strongest magnetic fields and highest densities directly observed in nature.',
      'Binary neutron star mergers (kilonovae) forge most of the universe’s heavy elements, including gold and platinum.'
    ],
    whatScientistsInvestigate: [
      'The neutron star interior equation of state using NASA’s NICER X-ray telescope.',
      'Fast Radio Bursts (FRBs) linked to magnetar crust-quakes.'
    ],
    whatRemainsUnknown: [
      'Whether the hyper-dense core contains a superfluid of strange quarks or deconfined quark-gluon plasma.',
      'The maximum theoretical mass limit (Tolman-Oppenheimer-Volkoff limit) before inevitable black hole collapse.'
    ],
    measurements: [
      { label: 'Typical Diameter', value: '20 km', unit: 'km' },
      { label: 'Mass', value: '1.4 – 2.1 M☉', unit: 'M☉' },
      { label: 'Core Density', value: '10¹⁷ kg/m³', unit: 'kg/m³' },
      { label: 'Fastest Pulsar Spin', value: '716 rotations per second (PSR J1748-2446ad)', unit: 'Hz' }
    ],
    relatedTopicIds: ['black-holes', 'stars-and-stellar-evolution', 'quantum-physics'],
    quiz: {
      question: 'What fundamental quantum mechanism prevents a neutron star from collapsing into a black hole?',
      options: [
        'Thermal radiation pressure from nuclear fusion',
        'Neutron degeneracy pressure governed by the Pauli exclusion principle',
        'Centrifugal force from rapid rotation',
        'Electrostatic repulsion between protons'
      ],
      correctAnswer: 1,
      explanation: 'The Pauli Exclusion Principle dictates that no two identical fermions (neutrons) can occupy the same quantum state simultaneously, creating neutron degeneracy pressure.'
    },
    citations: [
      { title: 'The Physics of Neutron Stars', institution: 'Annual Review of Nuclear and Particle Science', year: 2022, description: 'Dense matter equation of state and pulsar phenomenology.' }
    ]
  },
  {
    id: 'relativity-spacetime',
    title: 'Relativity & Curved Spacetime',
    category: 'Relativity & Spacetime',
    difficulty: 'Advanced',
    scientificStatus: 'Well established',
    heroEmoji: '⏳',
    intro: 'Gravity is not an invisible pulling force across empty space, but the curvature of a four-dimensional geometric fabric: spacetime.',
    sections: [
      {
        title: 'From Flat Space to Curved Geometry',
        content: 'Albert Einstein’s General Relativity (1915) revolutionized our understanding of gravity. Mass and energy tell spacetime how to curve, and curved spacetime tells matter how to move along geodesics (the straightest possible paths in curved space).',
        formula: 'G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}'
      },
      {
        title: 'Gravitational Time Dilation',
        content: 'Clocks run slower in stronger gravitational fields. A clock near Earth’s surface ticks slightly slower than a clock aboard a GPS satellite. Without relativistic corrections (both special and general relativity), GPS navigation systems would accumulate errors of over 10 kilometers every single day.'
      },
      {
        title: 'Gravitational Waves',
        content: 'When massive objects accelerate—such as two merging black holes—they create ripples in the fabric of spacetime itself that travel at the speed of light. First detected by LIGO in 2015, gravitational waves allow us to hear the universe directly.'
      }
    ],
    whatWeKnow: [
      'Spacetime is 4-dimensional (3 spatial dimensions + 1 time dimension intertwined).',
      'Light bends around massive objects, creating gravitational lenses (verified during the 1919 solar eclipse).',
      'Gravitational waves travel at exactly the speed of light, confirmed by simultaneous gamma-ray and gravitational wave detection in GW170817.'
    ],
    whatScientistsInvestigate: [
      'Testing General Relativity in extreme field environments around Sagittarius A* and pulsars.',
      'Space-based gravitational wave detectors (LISA) to detect low-frequency ripples from supermassive black hole mergers.'
    ],
    whatRemainsUnknown: [
      'How to reconcile general relativity with quantum mechanics at the Planck scale (10⁻³⁵ meters).',
      'Whether Einstein’s cosmological constant Λ is a pure geometric vacuum energy or a dynamic dark energy field.'
    ],
    measurements: [
      { label: 'GPS Relativistic Offset', value: '+38 microseconds per day', unit: 'µs/day' },
      { label: 'Gravitational Wave Strain', value: 'h ~ 10⁻²¹ (1/10,000th proton radius)', unit: 'strain' },
      { label: 'Speed of Gravity', value: '299,792,458 m/s (c)', unit: 'm/s' }
    ],
    relatedTopicIds: ['black-holes', 'quantum-physics', 'dark-matter-dark-energy'],
    quiz: {
      question: 'Why do GPS satellite clocks tick faster than identical clocks on Earth’s surface?',
      options: [
        'Because satellites travel faster than the speed of sound',
        'Because satellites are in weaker gravity, so gravitational time dilation causes time to pass faster for them',
        'Because satellite solar panels generate excess electricity that speeds up circuitry',
        'They actually tick slower, not faster'
      ],
      correctAnswer: 1,
      explanation: 'General relativity dictates that clocks deeper in a gravitational well run slower. Earth’s surface is deeper in gravity than high-altitude orbits, so satellite clocks gain ~45 µs/day from gravity (partially offset by -7 µs/day from their orbital speed).'
    },
    citations: [
      { title: 'The Einstein Field Equations and Relativistic Gravitation', institution: 'Princeton University Press', year: 2021, description: 'Mathematical foundations of general relativity.' }
    ]
  },
  {
    id: 'dark-matter-dark-energy',
    title: 'Dark Matter & Dark Energy',
    category: 'Cosmology & Dark Universe',
    difficulty: 'Intermediate',
    scientificStatus: 'Current model',
    heroEmoji: '🌌',
    intro: 'Ordinary atomic matter makes up less than 5% of the cosmos. The remaining 95% is an invisible cosmic mystery.',
    sections: [
      {
        title: 'The Missing Mass: Dark Matter',
        content: 'When Vera Rubin and Kent Ford measured galactic rotation curves in the 1970s, stars at galaxy edges were moving far too fast. Without extra unseen mass, galaxies would fly apart. Dark matter constitutes ~27% of the universe. It does not interact with electromagnetic radiation—it neither emits, absorbs, nor reflects light—interacting almost entirely through gravity.'
      },
      {
        title: 'The Accelerated Expansion: Dark Energy',
        content: 'In 1998, two teams studying distant Type Ia supernovae discovered that the expansion of the universe is not slowing down under gravity—it is accelerating! The mysterious repulsive energy driving this accelerated expansion accounts for ~68% of the total energy density of the cosmos, termed Dark Energy.'
      }
    ],
    whatWeKnow: [
      'The cosmic mass-energy budget is ~68.5% Dark Energy, 26.5% Dark Matter, and only 5% Ordinary Baryonic Matter.',
      'Dark matter forms the invisible scaffolding upon which all galaxies and cosmic filaments condensed.'
    ],
    whatScientistsInvestigate: [
      'Underground cryogenic xenon detectors (LZ, XENONnT) searching for Weakly Interacting Massive Particles (WIMPs).',
      'The Dark Energy Spectroscopic Instrument (DESI) and ESA’s Euclid mission mapping baryon acoustic oscillations.'
    ],
    whatRemainsUnknown: [
      'The fundamental particle identity of dark matter (WIMPs, Axions, or Primordial Black Holes).',
      'Whether dark energy is a true cosmological constant (constant vacuum energy density) or a time-varying scalar field (Quintessence).'
    ],
    measurements: [
      { label: 'Dark Energy Fraction', value: '68.5% of total universe', unit: '%' },
      { label: 'Dark Matter Fraction', value: '26.5% of total universe', unit: '%' },
      { label: 'Baryonic (Normal) Matter', value: '4.9% of total universe', unit: '%' }
    ],
    relatedTopicIds: ['the-cosmic-web', 'the-observable-universe', 'relativity-spacetime'],
    quiz: {
      question: 'Which observation provided the earliest compelling evidence for dark matter inside galaxy clusters?',
      options: [
        'The discovery of black holes in the center of galaxies',
        'Fritz Zwicky observing galaxies in the Coma Cluster moving too fast to be held by visible stars alone',
        'The detection of solar neutrino oscillations',
        'Direct chemical sampling of moon rocks'
      ],
      correctAnswer: 1,
      explanation: 'In 1933, Swiss astronomer Fritz Zwicky applied the virial theorem to the Coma Cluster and found that galaxies moved hundreds of times faster than could be explained by visible matter, positing "dunkle Materie" (dark matter).'
    },
    citations: [
      { title: 'The Cosmological Dark Matter Puzzle', institution: 'Reviews of Modern Physics', year: 2022, description: 'Observational evidence and particle candidate status.' },
      { title: 'Dark Energy and the Accelerating Universe', institution: 'Annual Review of Astronomy and Astrophysics', year: 2021, description: 'Supernovae, CMB, and large-scale structure constraints.' }
    ]
  },
  {
    id: 'quantum-physics',
    title: 'Quantum Mechanics & Quantum Fields',
    category: 'Quantum & Dimensions',
    difficulty: 'Advanced',
    scientificStatus: 'Well established',
    heroEmoji: '⚛️',
    intro: 'At the smallest scales of reality, nature behaves not as deterministic billiard balls, but as probabilistic quantum wavefunctions and fluctuating fields.',
    sections: [
      {
        title: 'Wave-Particle Duality & Uncertainty',
        content: 'Matter and light exhibit both wave and particle characteristics. Heisenberg’s Uncertainty Principle proves that fundamental conjugate variables—such as position (x) and momentum (p)—cannot simultaneously possess arbitrarily precise values: Δx · Δp ≥ ℏ/2.',
        formula: '\\Delta x \\cdot \\Delta p \\ge \\frac{\\hbar}{2}'
      },
      {
        title: 'Quantum Field Theory (QFT)',
        content: 'In modern physics, particles are not tiny marbles. They are localized excitations (quanta) of underlying universal fields. An electron is a ripple in the universal electron field; a photon is a ripple in the electromagnetic field. Even empty vacuum is a sea of zero-point quantum energy fluctuations.'
      }
    ],
    whatWeKnow: [
      'The Standard Model of particle physics successfully unifies electromagnetism, the weak force, and the strong force.',
      'Quantum entanglement allows correlated measurement outcomes across arbitrary distances without transmitting classical signals faster than light (Bell’s Theorem).'
    ],
    whatScientistsInvestigate: [
      'Quantum computing utilizing coherent superposition and entanglement.',
      'Searches for physics beyond the Standard Model at the Large Hadron Collider.'
    ],
    whatRemainsUnknown: [
      'The Measurement Problem: what physically causes the transition from a quantum superposition to a definite classical outcome?',
      'How to formulate a renormalizable quantum field theory of gravitation.'
    ],
    measurements: [
      { label: 'Planck Length', value: '1.616 × 10⁻³⁵ m', unit: 'm' },
      { label: 'Planck Time', value: '5.391 × 10⁻⁴⁴ s', unit: 's' },
      { label: 'Reduced Planck Constant (ℏ)', value: '1.05457 × 10⁻³⁴ J·s', unit: 'J·s' }
    ],
    relatedTopicIds: ['relativity-spacetime', 'dimensions-geometry', 'multiverse-hypotheses'],
    quiz: {
      question: 'What does Quantum Field Theory teach us about what a particle fundamentally is?',
      options: [
        'A hard, microscopic solid sphere',
        'A localized vibrational excitation of a continuous universal field',
        'A tiny gravitational vortex',
        'A miniature black hole'
      ],
      correctAnswer: 1,
      explanation: 'In QFT, reality is built of fields spanning all of spacetime. A particle (such as an electron or photon) is a quantized wave packet or excitation of its respective quantum field.'
    },
    citations: [
      { title: 'The Quantum Theory of Fields', institution: 'Cambridge University Press', year: 2020, description: 'Definitive theoretical formulation of relativistic quantum mechanics.' }
    ]
  },
  {
    id: 'dimensions-geometry',
    title: 'Dimensions & Higher Geometry',
    category: 'Quantum & Dimensions',
    difficulty: 'Intermediate',
    scientificStatus: 'Current model',
    heroEmoji: '🧊',
    intro: 'Exploring zero to four or more spatial dimensions through mathematical projections, cross-sections, and the Flatland analogy.',
    sections: [
      {
        title: 'What is a Dimension?',
        content: 'In mathematics and physics, a dimension is simply an independent degree of freedom or coordinate needed to specify a point: 0D (point), 1D (line, x), 2D (plane, x, y), 3D (space, x, y, z), and 4D (tesseract, x, y, z, w).'
      },
      {
        title: 'The Flatland Analogy',
        content: 'In Edwin Abbott’s classic 1884 book Flatland, a 2D square living on a flat sheet cannot comprehend the direction "up". When a 3D sphere passes through the plane, the square sees only a point that grows into an expanding circle, shrinks, and vanishes. Similarly, humans cannot directly see 4D space, but we can visualize its 3D shadows and cross-sections.'
      },
      {
        title: 'Extra Dimensions in Physics',
        content: 'In String Theory, consistency requires 10 spacetime dimensions. The extra 6 spatial dimensions are hypothesized to be compactified—curled up at scales near the Planck length (~10⁻³⁵ m) into complex shapes called Calabi-Yau manifolds.'
      }
    ],
    whatWeKnow: [
      'Macroscopic physical space is empirically observed to possess exactly 3 spatial dimensions plus 1 temporal dimension.',
      'Mathematical higher-dimensional geometries (like 4D hypercubes/tesseracts) are completely rigorous and well-defined mathematically.'
    ],
    whatScientistsInvestigate: [
      'Precision tabletop sub-millimeter gravity experiments testing for deviations from Newton’s inverse-square law.',
      'Collider searches for microscopic Kaluza-Klein graviton excitations escaping into bulk dimensions.'
    ],
    whatRemainsUnknown: [
      'Whether any compactified physical extra spatial dimensions actually exist in nature, or if they are purely mathematical devices.',
      'Why our universe expanded with exactly 3 macroscopic spatial dimensions instead of 2, 4, or 5.'
    ],
    measurements: [
      { label: 'Macroscopic Spatial Dimensions', value: '3 (Observed)', unit: 'dim' },
      { label: 'Superstring Theory Dimensions', value: '10 (9 Spatial + 1 Time)', unit: 'dim' },
      { label: 'Current Upper Bound on Extra Dimensions', value: '< 10⁻¹⁹ m (LHC limits)', unit: 'm' }
    ],
    relatedTopicIds: ['multiverse-hypotheses', 'quantum-physics', 'relativity-spacetime'],
    quiz: {
      question: 'If a 3D sphere passes straight through a 2D flat plane, what does a 2D observer living on the plane actually observe?',
      options: [
        'A solid unchanging sphere in the sky',
        'A mysterious circle that appears from nowhere, grows wider, shrinks back to a point, and vanishes',
        'Nothing at all, because 3D objects are completely invisible to 2D observers',
        'A four-dimensional hypercube'
      ],
      correctAnswer: 1,
      explanation: 'A 2D plane intersects a 3D sphere as a series of 2D circular cross-sections. As the sphere passes through, the circle starts at a point, expands to the sphere’s diameter, and shrinks to zero.'
    },
    citations: [
      { title: 'The Geometry of Physics', institution: 'Cambridge University Press', year: 2021, description: 'Differential geometry, fiber bundles, and higher-dimensional manifolds.' }
    ]
  },
  {
    id: 'multiverse-hypotheses',
    title: 'Multiverse Hypotheses: Science vs Speculation',
    category: 'Multiverse & Hypotheses',
    difficulty: 'Advanced',
    scientificStatus: 'Hypothesis',
    heroEmoji: '🫧',
    intro: 'Exploring theoretical multiverse models—from eternal inflation to Many-Worlds—while maintaining strict scientific demarcation between speculation and empirical evidence.',
    sections: [
      {
        title: 'Max Tegmark’s Multiverse Hierarchy',
        content: 'Physicist Max Tegmark categorized multiverse concepts into four distinct levels: Level I (Regions beyond our cosmic horizon in an infinite flat universe), Level II (Other pocket universes born from eternal inflation with differing physical constants), Level III (The Many-Worlds interpretation of quantum mechanics where branching occurs at quantum measurements), and Level IV (The Mathematical Universe Hypothesis where every mathematically consistent structure physically exists).'
      },
      {
        title: 'The Demarcation Problem',
        content: 'Karl Popper established that for an idea to be scientific, it must be testable and falsifiable. Because other universes by definition lie beyond our causal observational horizon, many physicists caution that multiverse concepts risk crossing from physics into metaphysical philosophy unless they make distinct, measurable imprints on our own universe (such as cosmic bubble collision imprints on the CMB).'
      }
    ],
    whatWeKnow: [
      'There is ZERO confirmed empirical observational evidence supporting the physical existence of other universes.',
      'Multiverse ideas arise naturally from equations of cosmic inflation and unitary quantum mechanics, rather than being invented ad-hoc.'
    ],
    whatScientistsInvestigate: [
      'Searches in the Cosmic Microwave Background for circular polarization anomalies from potential bubble universe collisions.',
      'Testing whether the cosmological constant fine-tuning can be explained by anthropic selection across a string theory landscape.'
    ],
    whatRemainsUnknown: [
      'Whether the multiverse is a necessary physical consequence of eternal inflation or an artifact of incomplete models.',
      'Whether any multiverse hypothesis can ever be rigorously falsified by direct or indirect empirical testing.'
    ],
    measurements: [
      { label: 'Observed Multiverses', value: '0 (Zero confirmed)', unit: 'count' },
      { label: 'String Theory Landscape Vacua', value: '~10⁵⁰⁰ possibilities', unit: 'vacua' }
    ],
    relatedTopicIds: ['the-observable-universe', 'dimensions-geometry', 'quantum-physics'],
    quiz: {
      question: 'What is the crucial scientific difference between the observable universe and a multiverse?',
      options: [
        'The observable universe is confirmed by observational data; the multiverse has no direct observational confirmation and remains theoretical',
        'The observable universe is infinite while the multiverse is small',
        'The multiverse is observed in radio telescopes but not optical ones',
        'There is no difference; both are verified facts'
      ],
      correctAnswer: 0,
      explanation: 'The observable universe is grounded in direct empirical observation (CMB, galaxies, redshift). The multiverse is a theoretical hypothesis that lacks empirical verification and cannot be directly probed.'
    },
    citations: [
      { title: 'Parallel Worlds: A Journey Through Creation, Higher Dimensions, and the Future of the Cosmos', institution: 'Doubleday', year: 2021, description: 'Overview of cosmological and quantum multiverse models.' },
      { title: 'The Multiverse Hypothesis in Science and Philosophy', institution: 'Nature Physics', year: 2020, description: 'Critical examination of testability and the demarcation problem.' }
    ]
  },
  {
    id: 'unsolved-mysteries',
    title: 'Great Unsolved Mysteries of Astronomy',
    category: 'Unsolved Mysteries',
    difficulty: 'Intermediate',
    scientificStatus: 'Active research',
    heroEmoji: '❓',
    intro: 'The most exciting aspect of astrophysics is what we still do not know. Explore the frontiers where current theories fail.',
    sections: [
      {
        title: 'The Baryon Asymmetry Mystery',
        content: 'The Standard Model predicts that equal amounts of matter and antimatter should have been created in the Big Bang. When matter and antimatter meet, they annihilate into pure radiation. Why did a tiny excess of matter (about 1 part in 10 billion) survive to form all stars, planets, and humans?'
      },
      {
        title: 'The Hubble Tension',
        content: 'When astronomers measure the expansion rate of the universe ($H_0$) using the early universe (CMB from the Planck satellite), they get ~67.4 km/s/Mpc. When they measure it using the local universe (Cepheid variables and Type Ia supernovae via Hubble and JWST), they get ~73.0 km/s/Mpc. This 5-sigma discrepancy may signal new physics beyond the $\\Lambda$CDM model.'
      },
      {
        title: 'The Fermi Paradox',
        content: 'Our galaxy contains hundreds of billions of stars and billions of rocky planets in habitable zones. The Milky Way is over 13 billion years old. Why have we found no confirmed evidence of extraterrestrial technological civilizations? Where is everybody?'
      }
    ],
    whatWeKnow: [
      'The observable universe contains billions of habitable-zone rocky planets.',
      'Antimatter is routinely created in particle accelerators, confirming it behaves symmetrically with matter under almost all interactions.'
    ],
    whatScientistsInvestigate: [
      'Searches for CP violation in neutrino oscillations at DUNE and Hyper-Kamiokande.',
      'JWST and Roman Space Telescope measurements to resolve the Hubble tension.',
      'SETI (Search for Extraterrestrial Intelligence) technosignature and radio sky surveys.'
    ],
    whatRemainsUnknown: [
      'What caused the initial CP violation that allowed matter to dominate over antimatter.',
      'Whether the Hubble tension is caused by systematic measurement errors or new cosmological physics (e.g. Early Dark Energy).',
      'The prevalence of abiogenesis (the transition from non-living chemistry to life) throughout the universe.'
    ],
    measurements: [
      { label: 'Matter/Antimatter Asymmetry', value: '~1 excess baryon per 10⁹ photons', unit: 'ratio' },
      { label: 'Hubble Tension Discrepancy', value: '67.4 vs 73.0 km/s/Mpc (5σ tension)', unit: 'km/s/Mpc' }
    ],
    relatedTopicIds: ['dark-matter-dark-energy', 'the-observable-universe', 'exoplanets'],
    quiz: {
      question: 'What is the "Hubble Tension" in modern cosmology?',
      options: [
        'A physical collision between the Hubble and James Webb space telescopes',
        'A statistically significant discrepancy between early-universe CMB measurements and local-universe supernova measurements of the expansion rate',
        'The disagreement over whether Edwin Hubble or Albert Einstein discovered gravity',
        'A discrepancy in the measured temperature of the Sun'
      ],
      correctAnswer: 1,
      explanation: 'Early-universe measurements predict an expansion rate of ~67.4 km/s/Mpc, while local measurements find ~73.0 km/s/Mpc. The gap has reached a 5-sigma statistical significance, suggesting our cosmological model may be missing critical physics.'
    },
    citations: [
      { title: 'The Hubble Tension: Current Status and Potential Solutions', institution: 'Annual Review of Astronomy and Astrophysics', year: 2023, description: 'Review of local vs early universe measurements.' },
      { title: 'The Fermi Paradox: An Updated Astronomical Perspective', institution: 'Astrobiology Journal', year: 2022, description: 'Evaluation of habitability filters and technosignatures.' }
    ]
  }
];
