import { CurriculumStage } from '@/types/vedicCosmos';

export const CURRICULUM_STAGES: CurriculumStage[] = [
  {
    stageNumber: 1,
    title: 'Foundations of Celestial Observation',
    subtitle: 'Earth, Celestial Sphere, Coordinates, and Naked-Eye Astrometry',
    prerequisites: [],
    estimatedMinutes: 30,
    learningObjectives: [
      'Understand the celestial sphere model and horizon coordinate systems (Altitude & Azimuth).',
      'Distinguish apparent diurnal motion from Earth’s true axial rotation.',
      'Explain the geometry of solar and lunar eclipses using umbra and penumbra models.',
      'Measure angles across the sky using hand span yardsticks (10°, 5°, 1°).'
    ],
    keyTerms: [
      {
        sanskrit: 'खगोल',
        iast: 'Khagola',
        english: 'Celestial Sphere',
        definition: 'An imaginary sphere of arbitrarily large radius, concentric with Earth, on which all celestial objects appear projected.'
      },
      {
        sanskrit: 'क्षितिज',
        iast: 'Kṣitija',
        english: 'Horizon',
        definition: 'The great circle on the celestial sphere 90° from the observer’s zenith, separating visible sky from earth.'
      },
      {
        sanskrit: 'क्रान्तिवृत्त',
        iast: 'Krāntivṛtta',
        english: 'The Ecliptic',
        definition: 'The apparent annual path of the Sun across the celestial sphere, caused by Earth’s orbital motion around the Sun.'
      }
    ],
    misconceptionAlert: {
      misconception: 'The seasons are caused by Earth moving closer to or farther from the Sun in its elliptical orbit.',
      scientificHistoricalCorrection: 'Seasons are caused by Earth’s 23.44° axial tilt relative to its orbital plane, varying solar irradiance and day length. Earth is actually closest to the Sun (perihelion) in early January during Northern Hemisphere winter.'
    },
    lessonContent: [
      {
        sectionTitle: 'The Celestial Sphere and Cardinal Coordinates',
        text: 'From the vantage point of Earth’s surface, the cosmos appears as an enormous dome surrounding the observer. Ancient observers across India, Babylon, Greece, and China mapped the motion of stars and planets onto this celestial sphere. The Zenith is the point directly overhead (90° altitude), the Nadir is directly below, and the Horizon circle is where sky meets land. The Celestial Equator is the projection of Earth’s equator into space.'
      },
      {
        sectionTitle: 'Diurnal Motion and Axial Rotation',
        text: 'Because Earth rotates from west to east on its axis once every 23 hours, 56 minutes, and 4 seconds (one sidereal day), celestial bodies appear to rise in the east and set in the west. In 499 CE, Aryabhata recognized this explicitly in Aryabhatiya (Golapada 9): "Just as a person in a moving boat sees stationary trees moving backward, so the stars appear to move westward due to Earth’s eastward rotation."'
      },
      {
        sectionTitle: 'Eclipse Geometry and the Nodal Points',
        text: 'The Moon’s orbital plane is tilted by approximately 5.14° relative to the ecliptic. Eclipses can only occur when the Moon is simultaneously near the ecliptic plane (at the nodes Rahu or Ketu) and at Syzygy (alignment with Sun and Earth). When the Moon passes into Earth’s shadow, a Lunar Eclipse occurs; when the Moon blocks sunlight from reaching Earth, a Solar Eclipse occurs.'
      }
    ],
    interactiveActivity: {
      title: 'Celestial Sphere & Horizon Simulator',
      description: 'Rotate the observer’s latitude and observe how polar altitude matches the observer’s latitude on Earth.',
      toolUrl: '/journey'
    },
    quiz: [
      {
        question: 'What is the primary cause of Earth’s changing seasons?',
        options: [
          'Earth’s axial tilt of ~23.4° relative to its orbital plane',
          'Varying distance between Earth and Sun in elliptical orbit',
          'Periodic fluctuations in the Sun’s core nuclear fusion output',
          'The gravitational pull of Jupiter pulling Earth off axis'
        ],
        correctAnswer: 0,
        explanation: 'Earth’s tilted rotational axis causes each hemisphere to receive more direct sunlight and longer daylight hours during its summer.'
      },
      {
        question: 'What did the Indian astronomer Aryabhata deduce about celestial motion in 499 CE?',
        options: [
          'The stars move on crystalline spheres powered by ether',
          'Earth rotates eastward on its axis, creating the optical illusion of westward stellar motion',
          'The Sun orbits Earth in an epicyclic pattern',
          'The planets move in perfect mathematical circles around the North Star'
        ],
        correctAnswer: 1,
        explanation: 'Aryabhata correctly used the analogy of a moving boat observing trees on the riverbank to explain that Earth rotates on its own axis.'
      }
    ]
  },
  {
    stageNumber: 2,
    title: 'Modern Astronomy & Planetary Motion',
    subtitle: 'The Solar System, Kepler’s Laws, and the Physics of Gravity',
    prerequisites: [1],
    estimatedMinutes: 35,
    learningObjectives: [
      'Formulate and apply Kepler’s Three Laws of Planetary Motion.',
      'Differentiate between Sidereal Period (relative to stars) and Synodic Period (relative to Sun).',
      'Explain axial precession and how the equinox shifts at ~50.3 arcsec per year.',
      'Contrast apparent retrograde motion in heliocentric versus geocentric models.'
    ],
    keyTerms: [
      {
        iast: 'Ayana',
        english: 'Solstitial Motion / Precession Cycle',
        definition: 'The periodic shifting of the equinoxes and solstices along the ecliptic due to Earth’s axial precession.'
      },
      {
        english: 'Kepler’s 1st Law',
        definition: 'Planetary orbits are ellipses with the Sun located at one of the two focal points.'
      },
      {
        english: 'Precession of the Equinoxes',
        definition: 'The slow, conical wobble of Earth’s rotational axis with a period of approximately 25,772 years.'
      }
    ],
    misconceptionAlert: {
      misconception: 'Retrograde motion means planets physically halt and reverse their direction in space.',
      scientificHistoricalCorrection: 'Planets never reverse their orbital velocity. Apparent retrograde motion is an optical projection effect that occurs when Earth overtakes an outer slower-moving planet, causing it to temporarily appear to move backward against the background stars.'
    },
    lessonContent: [
      {
        sectionTitle: 'Keplerian Orbital Mechanics',
        text: 'Johannes Kepler discovered in 1609 that planets travel in ellipses with the Sun at one focus (1st Law). A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time (2nd Law), meaning planets move fastest at perihelion (closest to Sun) and slowest at aphelion. The square of the orbital period is directly proportional to the cube of the semi-major axis: T^2 = a^3 (3rd Law).'
      },
      {
        sectionTitle: 'Sidereal vs. Synodic Periods',
        text: 'A planet’s sidereal period is the time it takes to complete one 360° orbit around the Sun relative to the fixed background stars. The synodic period is the time required for the planet to reappear at the same position relative to the Sun as seen from Earth (e.g. from one conjunction or opposition to the next). For inferior planets: 1/S = 1/P - 1/E; for superior planets: 1/S = 1/E - 1/P.'
      },
      {
        sectionTitle: 'The Precession of the Equinoxes',
        text: 'Earth is not a perfect sphere; its equatorial bulge experiences gravitational torques from the Moon and Sun. This causes Earth’s rotational axis to precess like a spinning top once every ~25,772 years (the Great Year). Consequently, the Vernal Equinox point slowly drifts westward along the ecliptic at ~50.29 arcseconds per year (~1° every 71.6 years). This drift is the physical origin of the difference between the tropical and sidereal zodiacs.'
      }
    ],
    interactiveActivity: {
      title: 'Orbital Mechanics & Retrograde Simulator',
      description: 'Adjust planetary semi-major axes and observe the geometric projection producing retrograde loops.',
      toolUrl: '/labs/orbital-mechanics'
    },
    quiz: [
      {
        question: 'Why does Earth’s rotational axis undergo precession?',
        options: [
          'Gravitational torques exerted by the Moon and Sun on Earth’s equatorial bulge',
          'Continuous friction between Earth’s core and mantle',
          'Solar wind pressure pushing against Earth’s magnetic field',
          'Comet impacts during the Late Heavy Bombardment'
        ],
        correctAnswer: 0,
        explanation: 'Because Earth bulges slightly at the equator, the gravitational pull of the Moon and Sun creates a torque that causes the axis to wobble like a gyroscope.'
      }
    ]
  },
  {
    stageNumber: 3,
    title: 'History and Textual Sources',
    subtitle: 'From Vedangas to Classical Siddhantic Astronomy',
    prerequisites: [1, 2],
    estimatedMinutes: 40,
    learningObjectives: [
      'Trace the evolution of Indian astronomy from Vedanga Jyotisha to the classical Siddhantas.',
      'Examine the astronomical passages of the Rigveda, Shatapatha Brahmana, and Taittiriya Samhita.',
      'Distinguish mathematical astronomy (Siddhanta/Ganita) from observational omen literature (Samhita) and horary/natal rules (Hora).',
      'Critically analyze scholarly editions and translation histories of ancient astronomical texts.'
    ],
    keyTerms: [
      {
        sanskrit: 'वेदाङ्ग ज्योतिष',
        iast: 'Vedāṅga Jyotiṣa',
        english: 'Vedanga Jyotisha',
        definition: 'The earliest surviving Indian astronomical manual, attributed to Lagadha (c. 1400–1200 BCE in textual roots, redacted later), detailing calendrical calculations for Vedic rituals.'
      },
      {
        sanskrit: 'सिद्धान्त',
        iast: 'Siddhānta',
        english: 'Siddhanta',
        definition: 'Comprehensive astronomical treatise presenting mathematical models for computing planetary positions, eclipses, and timekeeping (e.g. Surya Siddhanta, Aryabhatiya).'
      },
      {
        sanskrit: 'स्कन्धत्रय',
        iast: 'Skandhatraya',
        english: 'The Three Branches of Jyotisha',
        definition: 'Siddhanta (mathematical astronomy), Samhita (mundane phenomena and omens), and Hora (natal horoscopy).'
      }
    ],
    misconceptionAlert: {
      misconception: 'Ancient Indian astronomy and predictive horoscope astrology were always the exact same discipline.',
      scientificHistoricalCorrection: 'In Vedic antiquity, Jyotisha meant primarily the science of timekeeping (Kala-vidhana) and calendar computation for seasonal rituals. Predictive natal horoscopy (Hora) developed later through synthesized exchanges during the Hellenistic, Kushan, and Gupta periods.'
    },
    lessonContent: [
      {
        sectionTitle: 'The Vedic Period and Nakshatra Tracking',
        text: 'The earliest Vedic texts, including the Rigveda (10.85) and the Taittiriya Samhita, document a lunar zodiac of 27 or 28 Nakshatras. The Moon’s daily passage among these asterisms formed the foundational framework for early Indian calendrics. Time was measured in solar years of 360 civil days corrected by intercalary months (Adhikamasa).'
      },
      {
        sectionTitle: 'The Vedanga Jyotisha of Lagadha',
        text: 'Redacted in two recensions (Rigvedic and Yajurvedic), the Vedanga Jyotisha establishes a 5-year Yuga cycle (Yuga of 60 solar months or 62 lunar synodic months) to reconcile the solar year with lunar cycles. It provides computational rules for the longest and shortest days of the year (solstices) and shadow-length measurements using the Gnomon (Shanku).'
      },
      {
        sectionTitle: 'The Siddhantic Revolution: Aryabhata and Beyond',
        text: 'By the 5th century CE, Indian astronomy transitioned from crude mean-motion cycles to rigorous trigonometric algorithms. Aryabhata (b. 476 CE) introduced sine tables, epicyclic models for planetary anomalies, and accurate values for pi. Varahamihira (6th century CE) compiled the Panchasiddhantika, preserving the five major astronomical traditions of his era.'
      }
    ],
    interactiveActivity: {
      title: 'Textual Knowledge Library Explorer',
      description: 'Search original Sanskrit verses with IAST transliterations and scholarly translations from the Surya Siddhanta and Aryabhatiya.',
      toolUrl: '/library'
    },
    quiz: [
      {
        question: 'What was the primary function of astronomy in the Vedanga Jyotisha period?',
        options: [
          'Calculating precise calendar dates and solstices for seasonal rituals',
          'Predicting individual personal career outcomes from birth charts',
          'Calculating interstellar rocket propulsion trajectories',
          'Mapping gravitational lensing of distant galaxies'
        ],
        correctAnswer: 0,
        explanation: 'Vedanga Jyotisha was fundamentally an astronomical calendar treatise created to track solar and lunar cycles for scheduling sacred seasonal observances.'
      }
    ]
  },
  {
    stageNumber: 4,
    title: 'The Navagraha System: Science & Symbolism',
    subtitle: 'Physical Astronomy, Sanskrit Terminology, Dignity, and Drishti',
    prerequisites: [1, 2, 3],
    estimatedMinutes: 45,
    learningObjectives: [
      'Identify each of the nine Navagrahas by Sanskrit name, physical identity, and symbolic archetype.',
      'Explain why Rahu and Ketu are mathematical orbital nodes rather than physical bodies.',
      'Calculate traditional planetary dignity (Exaltation, Moolatrikona, Own Sign, Debilitation).',
      'Understand planetary aspects (Drishti) and their geometric angles.'
    ],
    keyTerms: [
      {
        sanskrit: 'नवग्रह',
        iast: 'Navagraha',
        english: 'The Nine Seizers / Planetary Archetypes',
        definition: 'Surya, Chandra, Mangala, Budha, Brihaspati, Shukra, Shani, Rahu, and Ketu.'
      },
      {
        sanskrit: 'उच्च / नीच',
        iast: 'Ucca / Nīca',
        english: 'Exaltation / Debilitation',
        definition: 'The specific zodiacal sign and degree where a planet is traditionally considered at maximum functional strength (Ucca) or maximum challenge (Nica).'
      },
      {
        sanskrit: 'दृष्टि',
        iast: 'Dṛṣṭi',
        english: 'Planetary Aspect',
        definition: 'The traditional angular sight or influence cast by a planet from its position onto other signs (e.g. 7th house for all, special 4th/8th for Mars, 5th/9th for Jupiter, 3rd/10th for Saturn).'
      }
    ],
    misconceptionAlert: {
      misconception: 'Rahu and Ketu are invisible dark physical planets orbiting somewhere behind the Sun.',
      scientificHistoricalCorrection: 'Classical Indian astronomers like Aryabhata and Varahamihira were completely clear: Rahu and Ketu are the mathematical intersection points (Pata) where the Moon’s tilted orbital path crosses the ecliptic. They cast no physical shadow except when a celestial body passes through them during an eclipse.'
    },
    lessonContent: [
      {
        sectionTitle: 'The Nine Grahas: Empirical vs. Archetypal',
        text: 'The Sanskrit word "Graha" derives from the root "Grah" meaning "to seize, hold, or influence." In Indian thought, the Grahas are both physical cosmic bodies and archetypal lenses of karmic resonance. The Sun represents the Atman (core soul), the Moon represents the Manas (mind and sensory feeling), Mars represents courage and executive logic, Mercury represents analytical discrimination, Jupiter represents wisdom and expansion, Venus represents refined aesthetics, and Saturn represents time, discipline, and endurance.'
      },
      {
        sectionTitle: 'Planetary Dignity and Functional Strength',
        text: 'In classical Jyotisha (such as Brihat Parashara Hora Shastra), each planet possesses preferred signs where its elemental nature operates harmoniously. The highest point is Exaltation (Ucca), such as the Sun at 10° Mesha or Jupiter at 5° Karka. Directly 180° opposite lies Debilitation (Nica), such as the Sun at 10° Tula or Jupiter at 5° Makara. Moolatrikona is an intermediate root dignity, followed by Own Sign (Svakshetra).'
      },
      {
        sectionTitle: 'Planetary Aspects (Drishti)',
        text: 'All planets cast a primary 7th aspect (180° opposition) across the chart. However, three outer planets possess special additional aspects (Vishesha Drishti): Mars additionally casts aspects to the 4th (90° square) and 8th (210° quincunx) signs; Jupiter casts trinal aspects to the 5th and 9th (120° trines); Saturn casts aspects to the 3rd (60° sextile) and 10th (270° square) signs.'
      }
    ],
    interactiveActivity: {
      title: 'Navagraha Observatory Workbench',
      description: 'Explore the 3D planetary models, verify exaltation/debilitation degrees, and inspect physical vs symbolic traits.',
      toolUrl: '/navagraha'
    },
    quiz: [
      {
        question: 'What are Rahu and Ketu in astronomical terms?',
        options: [
          'The mathematical orbital nodes where the Moon’s path intersects the ecliptic',
          'Two undiscovered gas giant planets beyond Pluto',
          'Asteroids located within the Main Asteroid Belt between Mars and Jupiter',
          'Dark matter clouds lingering in the inner Solar System'
        ],
        correctAnswer: 0,
        explanation: 'Rahu is the ascending lunar node and Ketu is the descending lunar node; they are coordinate calculation points, not physical planetary spheres.'
      }
    ]
  },
  {
    stageNumber: 5,
    title: 'Rashis and Nakshatras: The Sidereal Zodiac',
    subtitle: 'The 12 Signs, 27 Lunar Mansions, and 108 Padas',
    prerequisites: [1, 2, 4],
    estimatedMinutes: 50,
    learningObjectives: [
      'Master the mathematical division of the 360° circle into 12 Rashis of 30° each.',
      'Calculate Nakshatras (13° 20′) and Nakshatra Padas (3° 20′).',
      'Explain the significance of the 108-pada structure and its link to the Navamsha (D-9) divisional chart.',
      'Articulate the difference between sidereal signs and modern IAU astronomical constellation boundaries.'
    ],
    keyTerms: [
      {
        sanskrit: 'राशि',
        iast: 'Rāśi',
        english: 'Zodiac Sign',
        definition: 'One of twelve equal 30-degree segments of the ecliptic, beginning with Mesha.'
      },
      {
        sanskrit: 'नक्षत्र',
        iast: 'Nakṣatra',
        english: 'Lunar Mansion',
        definition: 'One of 27 equal segments of 13° 20′ along the ecliptic, each ruled by a deity and planetary lord.'
      },
      {
        sanskrit: 'पाद',
        iast: 'Pāda',
        english: 'Quarter / Foot',
        definition: 'A 3° 20′ division of a Nakshatra (one quarter). 27 × 4 = 108 padas make up the entire 360° zodiac.'
      }
    ],
    misconceptionAlert: {
      misconception: 'The 12 signs of the zodiac are identical in size and position to the modern astronomical constellations of the same name.',
      scientificHistoricalCorrection: 'Modern astronomical constellations (defined by the IAU in 1930) have irregular boundaries of vastly different sizes (e.g. Virgo spans ~44° while Cancer spans ~20°). In contrast, the astrological Rashis are mathematically defined equal 30° arcs of the ecliptic.'
    },
    lessonContent: [
      {
        sectionTitle: 'The Architecture of the Zodiac',
        text: 'The 360° circle of the ecliptic is partitioned on two interconnected scales: the 12 Rashis (each 30°) and the 27 Nakshatras (each 13° 20′ = 800 arcminutes). Because 30 and 13.333 share common factors, exactly 2¼ Nakshatras (or 9 Padas) fit into each Rashi. This elegant mathematical alignment binds the solar month (Rashi) with the sidereal lunar month (Nakshatras).'
      },
      {
        sectionTitle: 'The 108 Padas and Navamsha Integration',
        text: 'Each Nakshatra is divided into 4 equal Padas of 3° 20′ (200 arcminutes). The entire zodiac contains 27 × 4 = 108 Padas. The number 108 is sacred across Indian mathematical and spiritual traditions. Crucially, each 3° 20′ pada corresponds to one 30° sign in the 9th divisional chart (Navamsha or D-9), meaning the 108 padas directly map the microscopic harmonic texture of the macroscopic zodiac.'
      },
      {
        sectionTitle: 'Deities and Shaktis of the Nakshatras',
        text: 'Each Nakshatra is presided over by a Vedic deity who imparts a specific energetic power (Shakti). For example, Ashwini is presided over by the divine physicians (Ashvins) and has the power of swift healing; Rohini is presided over by Brahma with the power of growth and creation; Chitra is presided over by Vishvakarma with the power of artistic form and architecture.'
      }
    ],
    interactiveActivity: {
      title: 'Rashi & Nakshatra 108-Pada Atlas',
      description: 'Interact with the 360° wheel, search Nakshatras, inspect Pada boundaries, and see how Spica anchors the Lahiri Ayanamsha.',
      toolUrl: '/rashi-nakshatra'
    },
    quiz: [
      {
        question: 'How many total Nakshatra Padas exist in the 360° zodiac?',
        options: ['108', '27', '12', '72'],
        correctAnswer: 0,
        explanation: 'There are 27 Nakshatras, each divided into 4 equal quarters (Padas), yielding exactly 27 × 4 = 108 Padas.'
      }
    ]
  },
  {
    stageNumber: 6,
    title: 'Indian Mathematical Astronomy',
    subtitle: 'Aryabhata, Brahmagupta, Sine Tables, and Kuttaka Algorithms',
    prerequisites: [1, 2, 3, 5],
    estimatedMinutes: 55,
    learningObjectives: [
      'Derive and calculate sine values using Aryabhata’s 24-step sine table.',
      'Compute sines using Bhaskara I’s rational approximation formula (<1% error).',
      'Solve linear indeterminate Diophantine equations using Aryabhata’s Kuttaka algorithm.',
      'Explain historical Ahargana day-count calculations from the Kali Yuga epoch.'
    ],
    keyTerms: [
      {
        sanskrit: 'ज्या',
        iast: 'Jyā',
        english: 'Sine / Chord Half',
        definition: 'The fundamental trigonometric concept invented in India (R·sin θ), later translated into Arabic as Jiba and into Latin as Sinus.'
      },
      {
        sanskrit: 'कुट्टक',
        iast: 'Kuṭṭaka',
        english: 'The Pulverizer Method',
        definition: 'An algorithmic procedure developed by Aryabhata to solve linear Diophantine equations of the form ax - by = c for integer variables.'
      },
      {
        sanskrit: 'अहर्गण',
        iast: 'Ahargaṇa',
        english: 'Count of Days',
        definition: 'The total number of mean civil solar days elapsed from a designated astronomical epoch (such as the start of Kali Yuga on Feb 18, 3102 BCE).'
      }
    ],
    misconceptionAlert: {
      misconception: 'Trigonometry was completely invented by Greek mathematicians and merely copied by Indian scholars.',
      scientificHistoricalCorrection: 'While Hellenistic astronomers used chords of circles (Hipparchus/Ptolemy), Indian astronomers (starting with the Surya Siddhanta and Aryabhata) invented the modern half-chord (Jya), which directly corresponds to the modern trigonometric function Sine.'
    },
    lessonContent: [
      {
        sectionTitle: 'Aryabhata’s Trigonometric Sine Table (499 CE)',
        text: 'In the Gitikapada of the Aryabhatiya, Aryabhata presented a table of 24 sine values for a circle with radius R = 3438 arcminutes (21600 / 2pi ≈ 3437.75′). He divided the 90° quadrant (5400′) into 24 equal arcs of 225′ (3° 45′). Using recursive second-order differences (Delta_{n+1} = Delta_n - S_n / 225), he accurately derived sine values that agree with modern trigonometric values within a fraction of an arcminute.'
      },
      {
        sectionTitle: 'Bhaskara I’s Extraordinary Sine Formula (629 CE)',
        text: 'Over a thousand years before Taylor series polynomials, Bhaskara I published an astonishing rational approximation formula for sine: sin(x) ≈ (16x(pi - x)) / (5pi^2 - 4x(pi - x)) for x in [0, pi]. This formula has an absolute error of less than 0.0016 and a maximum relative error below 1%, demonstrating exceptional numerical intuition.'
      },
      {
        sectionTitle: 'The Kuttaka Algorithm for Astronomical Epicycles',
        text: 'Ancient astronomers needed to determine when multiple planets with different orbital periods would return to conjunction. This required solving linear Diophantine equations: ax - by = c where a, b, c are integers. Aryabhata’s Kuttaka ("Pulverizer") method used continuous reciprocal division (equivalent to the Extended Euclidean Algorithm) to break down large coefficients and solve for integer day counts.'
      }
    ],
    interactiveActivity: {
      title: 'Ancient Mathematics Laboratory',
      description: 'Solve Diophantine equations with the interactive Kuttaka solver, test Bhaskara’s sine formula, and compute Ahargana civil days.',
      toolUrl: '/ancient-math'
    },
    quiz: [
      {
        question: 'What radius R in arcminutes did Aryabhata select for his sine table, and why?',
        options: [
          'R = 3438′, because a circle of 360° has a circumference of 21,600′ (21,600 / 2π ≈ 3438′)',
          'R = 1000′, because Indian mathematics used a pure base-10 decimal system',
          'R = 60′, following Babylonian sexagesimal units exclusively',
          'R = 10,000′, representing maximum astronomical precision'
        ],
        correctAnswer: 0,
        explanation: 'Aryabhata set the circumference to 21,600 arcminutes (360° × 60′), yielding a radius R = 21,600 / (2 × 3.1416) ≈ 3,437.75 ≈ 3,438 arcminutes.'
      }
    ]
  },
  {
    stageNumber: 7,
    title: 'Traditional Chart Construction',
    subtitle: 'Lagna (Ascendant), Bhavas, Ayanamsha Systems, and Kundli Renderers',
    prerequisites: [1, 2, 4, 5, 6],
    estimatedMinutes: 50,
    learningObjectives: [
      'Calculate Local Sidereal Time (LST) and the Sidereal Ascendant (Lagna) for any birth time/location.',
      'Differentiate between Lahiri, Raman, and Krishnamurti (KP) Ayanamsha values.',
      'Generate 12 Bhavas using Equal Sign and Sripathi house cusps.',
      'Read and construct both North Indian (Diamond) and South Indian (Square) Kundli charts.'
    ],
    keyTerms: [
      {
        sanskrit: 'लग्न',
        iast: 'Lagna',
        english: 'Ascendant / Rising Sign',
        definition: 'The exact degree and sign of the ecliptic rising above the eastern horizon at the moment and geographic coordinates of birth.'
      },
      {
        sanskrit: 'अयनांश',
        iast: 'Ayanāṃśa',
        english: 'Ayanamsha',
        definition: 'The angular difference between the tropical vernal equinox (0° Aries) and the sidereal anchor star (e.g. Spica at 180° in Lahiri Ayanamsha).'
      },
      {
        sanskrit: 'भाव',
        iast: 'Bhāva',
        english: 'House',
        definition: 'One of the twelve experiential domains of life projected from the Lagna.'
      }
    ],
    misconceptionAlert: {
      misconception: 'Western astrology and Vedic astrology will calculate the exact same rising sign and planet positions for a given birth time.',
      scientificHistoricalCorrection: 'Western astrology uses the Tropical zodiac (anchored to the moving Vernal Equinox), whereas Vedic astrology uses the Sidereal zodiac (anchored to fixed stars). Because of ~24° of precession (Ayanamsha), most planets in a Vedic chart will appear in the preceding sign compared to a Western chart.'
    },
    lessonContent: [
      {
        sectionTitle: 'Calculating the Ascendant (Lagna)',
        text: 'The Lagna is the intersection of the eastern horizon with the ecliptic. It depends strictly on: (1) Date and time converted to UTC, (2) Geographic latitude and longitude of the birthplace, (3) Local Sidereal Time (LST), and (4) Obliquity of the ecliptic. Mathematically: tan(Asc) = cos(RAMC) / (-sin(RAMC)cos(eps) - tan(phi)sin(eps)). Subtracting the Ayanamsha yields the sidereal Lagna.'
      },
      {
        sectionTitle: 'Ayanamsha Systems: Lahiri vs. Raman vs. KP',
        text: 'Because stars move slightly over millennia, astronomers must choose a fiducial reference star. The Indian Government Calendar Reform Committee (headed by physicist Meghnad Saha in 1952) officially adopted the Lahiri Ayanamsha (Chitra Paksha), which defines the star Chitra (Spica) as exactly 180° opposite the start of Mesha. B.V. Raman preferred an ayanamsha based on an alternative epoch (~1.4° lower), while the KP system is ~0.1° lower.'
      },
      {
        sectionTitle: 'North Indian vs. South Indian Chart Formats',
        text: 'In the North Indian (Diamond) chart, the Bhavas (houses) are fixed in space: House 1 is always the top central diamond, and signs rotate counter-clockwise. In the South Indian (Square) chart, the 12 signs are permanently fixed in the outer boxes (Mesha is always 2nd box from top left, moving clockwise), and the Lagna is marked with diagonal lines.'
      }
    ],
    interactiveActivity: {
      title: 'Jyotisha Chart Calculation Workbench',
      description: 'Input any birth date, time, and coordinates to transparently calculate planetary longitudes, Bhavas, and switch between North and South Indian charts.',
      toolUrl: '/chart-lab'
    },
    quiz: [
      {
        question: 'Which star serves as the primary fiducial anchor for the Lahiri (Chitra Paksha) Ayanamsha?',
        options: [
          'Chitra (Spica / Alpha Virginis), placed at exactly 180°',
          'Rohini (Aldebaran / Alpha Tauri), placed at 0°',
          'Magha (Regulus / Alpha Leonis), placed at 90°',
          'Revati (Zeta Piscium), placed at 360°'
        ],
        correctAnswer: 0,
        explanation: 'The Lahiri system anchors the sidereal zodiac by fixing Spica (Chitra) at exactly 180° 00′ 00″ on the ecliptic.'
      }
    ]
  },
  {
    stageNumber: 8,
    title: 'Advanced Jyotisha: Navamsha & Interpretive Rules',
    subtitle: 'Divisional Charts (D-9), Yogas, Dashas, and Transits',
    prerequisites: [1, 2, 4, 5, 7],
    estimatedMinutes: 55,
    learningObjectives: [
      'Construct the D-9 Navamsha divisional chart from D-1 Rashi longitudes.',
      'Identify foundational planetary Yogas (Raja Yoga, Dhana Yoga, Gaja Kesari Yoga).',
      'Explain the Vimshottari Dasha 120-year cycle based on Moon’s birth Nakshatra.',
      'Distinguish transparent astrological rule execution from empirical scientific causation.'
    ],
    keyTerms: [
      {
        sanskrit: 'नवांश',
        iast: 'Navāṃśa',
        english: 'The 9th Harmonic Divisional Chart (D-9)',
        definition: 'A divisional chart where each 30° sign is divided into 9 equal parts of 3° 20′, revealing internal potential and marital harmony.'
      },
      {
        sanskrit: 'योग',
        iast: 'Yoga',
        english: 'Planetary Combination',
        definition: 'A specific geometric configuration or conjunction of planets that produces distinct traditional results.'
      },
      {
        sanskrit: 'विंशोत्तरी दशा',
        iast: 'Viṃśottarī Daśā',
        english: '120-Year Planetary Period Cycle',
        definition: 'A predictive timing system calculated from the exact position of the Moon within its birth Nakshatra at nativity.'
      }
    ],
    misconceptionAlert: {
      misconception: 'Scientific evidence has proven that a person’s personality and career destiny are predetermined by their Navamsha chart.',
      scientificHistoricalCorrection: 'Empirical statistical tests (such as Carlson’s 1985 Nature double-blind study) have failed to demonstrate reliable predictive validity for astrological birth charts. Astrological systems should be studied respectfully as historical cultural, symbolic, and psychological frameworks rather than deterministic physical sciences.'
    },
    lessonContent: [
      {
        sectionTitle: 'The Navamsha (D-9) Chart Construction',
        text: 'The Navamsha is the most important divisional chart in Vedic astrology, representing the inner seed (Dharma) of the outer plant (D-1 Rashi). If a planet is in the same sign in both D-1 and D-9, it is called Vargottama, which is traditionally interpreted as bestowing immense stability and strength.'
      },
      {
        sectionTitle: 'Classical Planetary Yogas',
        text: 'Yogas occur when specific planets form auspicious relationships between Kendra houses (1, 4, 7, 10 - Vishnu sthanas) and Trikona houses (1, 5, 9 - Lakshmi sthanas). A prime example is Gaja Kesari Yoga (Jupiter in a Kendra from the Moon), traditionally associated with wisdom and enduring reputation.'
      },
      {
        sectionTitle: 'Vimshottari Dasha Timing Mechanics',
        text: 'The Vimshottari Dasha system spans 120 human years, divided among the 9 Grahas in an unvarying sequence: Ketu (7 yrs), Venus (20), Sun (6), Moon (10), Mars (7), Rahu (18), Jupiter (16), Saturn (19), Mercury (17). The starting Dasha and balance of years is determined by how far through the birth Nakshatra the Moon has traveled.'
      }
    ],
    interactiveActivity: {
      title: 'Kundli Chart Lab: D-1 and D-9 Visualizer',
      description: 'Toggle between Rashi D-1 and Navamsha D-9 charts, inspect planetary dignity, and test classical Yoga rules.',
      toolUrl: '/chart-lab'
    },
    quiz: [
      {
        question: 'What is a planet called when it occupies the same zodiac sign in both the D-1 Rashi and D-9 Navamsha charts?',
        options: ['Vargottama', 'Neechabhanga', 'Combust (Asta)', 'Retrograde (Vakri)'],
        correctAnswer: 0,
        explanation: 'Vargottama ("best division") occurs when a planet occupies the exact same sign in both the primary Rashi chart and the harmonic Navamsha chart.'
      }
    ]
  },
  {
    stageNumber: 9,
    title: 'Cosmic Time & Modern Physics',
    subtitle: 'Yugas, Kalpas, Relativity, and Modern Cosmic Chronology',
    prerequisites: [1, 2, 6],
    estimatedMinutes: 50,
    learningObjectives: [
      'Calculate the arithmetic of Chaturyugas, Manvantaras, Kalpas, and Brahma’s Day.',
      'Contrast traditional cosmological cycles with the 13.8-billion-year modern Big Bang timeline.',
      'Understand gravitational time dilation and how gravity bends proper time.',
      'Evaluate speculative physics (cosmic inflation, multiverse hypotheses) with scientific rigor.'
    ],
    keyTerms: [
      {
        sanskrit: 'कल्प',
        iast: 'Kalpa',
        english: 'Cosmic Day of Brahma',
        definition: 'A period of 1,000 Mahayugas (4.32 billion solar years), followed by a night of equal duration during cosmic dissolution (Pralaya).'
      },
      {
        sanskrit: 'महायुग',
        iast: 'Mahāyuga',
        english: 'Great Epoch (Chaturyuga)',
        definition: 'A cycle of 4,320,000 solar years composed of Satya (1.728M), Treta (1.296M), Dvapara (864K), and Kali (432K) yugas.'
      },
      {
        english: 'Gravitational Time Dilation',
        definition: 'The physical effect predicted by General Relativity where time runs measurably slower in stronger gravitational potentials.'
      }
    ],
    misconceptionAlert: {
      misconception: 'Ancient Sanskrit texts predicted the exact date of the Big Bang down to the second.',
      scientificHistoricalCorrection: 'While Indian cosmology is uniquely magnificent in postulating vast, billions-of-years timescales (unlike young-Earth traditions of 6,000 years), its cyclical Yuga numbers arise from numerical harmonic proportions (4:3:2:1) rather than empirical astrophysical measurements like Hubble expansion or CMB radiation.'
    },
    lessonContent: [
      {
        sectionTitle: 'The Mathematics of Traditional Cosmic Cycles',
        text: 'In the Surya Siddhanta and Puranas, cosmic time is cyclical. A Mahayuga is 4.32 million years, divided into a descending 4:3:2:1 proportion among Satya, Treta, Dvapara, and Kali Yugas. One Kalpa equals 1,000 Mahayugas = 4.32 billion years—representing one daytime of Brahma, followed by a night of equal length (Pralaya). Interestingly, 4.32 billion years is remarkably close to Earth’s true geological age of ~4.54 billion years.'
      },
      {
        sectionTitle: 'Modern Cosmic Chronology (The ΛCDM Model)',
        text: 'Modern observational cosmology measures the age of our observable universe as 13.787 ± 0.020 billion years, based on measurements of the Cosmic Microwave Background (Planck Collaboration). We trace the universe from the Planck epoch ($10^{-43}$ s) through cosmic inflation, baryogenesis, recombination at 380,000 years, reionization, galaxy formation, and ongoing accelerated expansion driven by dark energy.'
      },
      {
        sectionTitle: 'Gravitational Time Dilation and General Relativity',
        text: 'Einstein’s General Relativity showed that time is not an absolute cosmic river. Stronger gravitational fields slow down proper time: $\\Delta t\' = \\Delta t \\sqrt{1 - 2GM / (rc^2)}$. Near the event horizon of a black hole, coordinate time approaches infinity relative to a distant observer. Indian philosophical texts similarly describe how time passes at drastically different rates across different Lokas (e.g. Brahma’s day versus mortal years).'
      }
    ],
    interactiveActivity: {
      title: 'Cosmic Time Machine Interactive Timeline',
      description: 'Scrub across traditional Indian Yuga/Kalpa epochs and compare them side-by-side with modern Big Bang to Heat Death timescales.',
      toolUrl: '/cosmic-time'
    },
    quiz: [
      {
        question: 'How long is one Kalpa (a daytime of Brahma) in classical Indian astronomy arithmetic?',
        options: [
          '4.32 billion solar years (1,000 Mahayugas)',
          '13.8 billion years',
          '432,000 years',
          '100,000 years'
        ],
        correctAnswer: 0,
        explanation: 'One Kalpa equals 1,000 Mahayugas of 4.32 million years each, yielding 4,320,000,000 (4.32 billion) solar years.'
      }
    ]
  },
  {
    stageNumber: 10,
    title: 'Advanced Synthesis & Epistemic Demarcation',
    subtitle: 'Evidence, Demarcation, Critical Evaluation, and Independent Research',
    prerequisites: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    estimatedMinutes: 60,
    learningObjectives: [
      'Apply Karl Popper’s falsifiability criterion to distinguish empirical science from metaphysical models.',
      'Categorize claims across the 6 Epistemic Categories (Observation, Math, Text, Philosophy, Jyotisha, Speculation).',
      'Critique pseudo-scientific conflations and unwarranted retroactive predictions.',
      'Complete an independent synthesis project connecting ancient computational astronomy with modern orbital mechanics.'
    ],
    keyTerms: [
      {
        english: 'Epistemic Demarcation',
        definition: 'The philosophical practice of clarifying the boundaries between empirical science, mathematics, historical texts, and traditional symbolic systems.'
      },
      {
        english: 'Falsifiability',
        definition: 'The capacity of a scientific hypothesis to be contradicted or proven false by an empirical observation or repeatable experiment.'
      },
      {
        sanskrit: 'प्रमाण',
        iast: 'Pramāṇa',
        english: 'Means of Valid Knowledge',
        definition: 'Epistemological sources recognized in Indian philosophy: Pratyaksha (direct observation), Anumana (inference), and Shabda (credible testimony).'
      }
    ],
    misconceptionAlert: {
      misconception: 'Respecting traditional ancient wisdom requires accepting all traditional claims as literally proven physical sciences.',
      scientificHistoricalCorrection: 'True scholarly and intellectual respect honors historical texts within their actual context, appreciating their mathematical elegance and philosophical depth without needing to force pseudo-scientific claims or fabricate empirical validation.'
    },
    lessonContent: [
      {
        sectionTitle: 'The Epistemology of Astronomy: Pramana and the Scientific Method',
        text: 'In Classical Indian Nyaya and Vaisheshika philosophy, knowledge is validated through Pramanas: Pratyaksha (direct observation), Anumana (logical inference), and Shabda (reliable testimony). This mirrors modern scientific epistemology, where theories require empirical observational testing, mathematical consistency, and independent peer verification.'
      },
      {
        sectionTitle: 'The Demarcation Framework of The Infinite Cosmos',
        text: 'Throughout this platform, every claim is tagged with one of six epistemic classifications: (1) Astronomical Observation (empirical facts), (2) Mathematical Algorithm (computational procedures), (3) Historical Textual Record (documented scholarship), (4) Philosophical Concept (worldview models), (5) Traditional Jyotisha Rule (interpretive tradition), or (6) Speculative Modern Hypothesis (multiverse, string theory). By keeping these separate, learners achieve true intellectual clarity.'
      },
      {
        sectionTitle: 'Final Synthesis Challenge',
        text: 'Learners are invited to construct an independent comparison between a historical Aryabhatan planetary model and a modern NASA ephemeris, showing the historical accuracy, mathematical elegance, and boundaries of both frameworks.'
      }
    ],
    interactiveActivity: {
      title: 'AI Cosmic Tutor & Synthesis Challenge',
      description: 'Engage with the AI Cosmic Tutor to evaluate complex claims, test your mastery, and receive personalized research feedback.',
      toolUrl: '/tutor'
    },
    quiz: [
      {
        question: 'Why is epistemic demarcation essential in a serious learning platform?',
        options: [
          'It preserves intellectual integrity by clearly distinguishing empirical observation from traditional interpretation and philosophical speculation',
          'It proves that ancient texts are completely unscientific',
          'It removes all traditional material from the curriculum',
          'It merges all modern and ancient claims into a single unquestioned dogma'
        ],
        correctAnswer: 0,
        explanation: 'Demarcation ensures that learners respect historical and traditional traditions in their authentic context without confusing them with empirically tested physical science.'
      }
    ]
  }
];
