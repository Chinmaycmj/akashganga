import { CosmicStage } from '@/types/cosmos';

export const COSMIC_STAGES: CosmicStage[] = [
  {
    id: 1,
    slug: 'earths-core',
    title: "Earth's Core & Interior",
    subtitle: 'The Geodynamo Beneath Our Feet',
    logScale: 6, // 10^6 meters
    scaleMeters: 6.371e6, // Earth radius ~ 6,371 km
    scaleDisplay: '6,371 km',
    powersOfTen: '10⁶ m',
    scientificStatus: 'Well established',
    wonderQuestion: 'Why can we never drill to Earth’s core, yet we know its temperature rivals the surface of the Sun?',
    summary: 'Beneath the solid crust lies a churning mantle, a molten iron-nickel outer core generating our magnetic shield, and a super-dense solid inner core suspended under 3.6 million atmospheres of pressure.',
    narrative: {
      beginner: 'Deep inside Earth is a world of extreme heat and crushing pressure. At the very center sits a solid metal ball as hot as the surface of the Sun. Surrounding it is a sea of liquid molten iron that swirls constantly. This spinning liquid metal acts like an enormous electrical generator, creating an invisible magnetic forcefield that protects all life on Earth from harmful space radiation.',
      intermediate: 'Earth is stratified by density: the brittle silicate crust (5–70 km), the viscous convecting mantle (down to 2,890 km), the liquid iron-nickel outer core (2,890–5,150 km), and the crystalline solid inner core (5,150–6,371 km). Seismic P-waves and S-waves from earthquakes refract and reflect at boundary discontinuities, revealing that S-waves cannot shear through liquids—proving the outer core is molten. The geodynamo effect converts kinetic energy into magnetic field lines.',
      advanced: 'The Lehmann discontinuity at 5,150 km depth marks the inner/outer core boundary where iron-nickel crystallizes into an anisotropic hcp lattice under ~330–360 GPa and ~5,400–6,000 K. Direct drilling cannot exceed ~12.2 km (Kola Superdeep Borehole) due to plastic rock deformation under high temperature; all interior knowledge derives from seismic tomography, high-pressure diamond anvil cell experiments, and mineral physics equations of state (Birch-Murnaghan).'
    },
    keyFacts: [
      'The inner core temperature (~5,700 K) matches the effective surface temperature of the Sun.',
      'S-waves (shear waves) cannot travel through fluids, which directly proved the liquid nature of the outer core.',
      'Earth’s geodynamo creates the magnetosphere, deflecting the lethal solar wind.',
      'The Kola Superdeep Borehole reached only 12,262 m—less than 0.2% of the way to the core.'
    ],
    measurements: [
      { label: 'Inner Core Radius', value: '1,220 km', unit: 'km', numericValueMeters: 1.22e6 },
      { label: 'Outer Core Thickness', value: '2,260 km', unit: 'km', numericValueMeters: 2.26e6 },
      { label: 'Central Core Pressure', value: '~360 GPa (3.6M atm)', unit: 'GPa' },
      { label: 'Core Temperature', value: '5,400 – 6,000 K', unit: 'K' }
    ],
    whatWeKnow: [
      'Earth’s core consists predominantly of iron (~85%) and nickel (~5%), with lighter elements (silicon, sulfur, oxygen).',
      'The liquid outer core’s helical convection generates dipolar magnetic field lines through magnetohydrodynamic dynamo action.',
      'Seismic wave travel-time tomography maps core-mantle boundary features like ultra-low velocity zones (ULVZs).'
    ],
    whatWeInvestigate: [
      'The exact light element composition (S, Si, O, H) lowering the core density below pure iron.',
      'Inner core super-rotation relative to the mantle and seismic anisotropy variations.',
      'Periodic geomagnetic field reversals (geomagnetic excursions like the Laschamp event).'
    ],
    whatRemainsUnknown: [
      'The exact age when the inner core first began solidifying (estimates range from 500 million to 1.5 billion years ago).',
      'The detailed turbulent dynamics and heat flux at the core-mantle boundary (D″ layer).'
    ],
    citations: [
      { title: 'The Composition and State of the Earth’s Core', institution: 'Science / USGS', year: 2021, description: 'Review of seismic tomography and high-pressure mineral physics constraints.' },
      { title: 'Earth’s Core and the Geodynamo', institution: 'NASA Earth Observatory', year: 2023, description: 'Magnetic field generation and satellite observation.' }
    ],
    relatedTopics: ['earth-atmosphere', 'spacetime-curvature', 'planetary-comparison'],
    accentColor: '#f97316'
  },
  {
    id: 2,
    slug: 'earths-surface-atmosphere',
    title: 'Earth’s Surface & Atmosphere',
    subtitle: 'The Thin Veil of Life',
    logScale: 7, // 10^7 meters
    scaleMeters: 1.2742e7, // Earth diameter ~ 12,742 km
    scaleDisplay: '12,742 km',
    powersOfTen: '10⁷ m',
    scientificStatus: 'Observed',
    wonderQuestion: 'If Earth were shrunk to the size of an apple, would its entire breathable atmosphere be thicker than the apple’s skin?',
    summary: 'A razor-thin gaseous cocoon, dynamic oceans, and tectonic lithosphere maintain the delicate thermodynamic equilibrium that supports planetary habitability.',
    narrative: {
      beginner: 'Stepping onto Earth’s surface, we see vast blue oceans, green continents, and clouds drifting through a protective sky. The atmosphere that keeps us alive is astonishingly thin—if Earth were an apple, our entire atmosphere would be thinner than the fruit’s peel. This layer traps warmth, provides the oxygen we breathe, and stops meteoroids and cosmic rays from striking the ground.',
      intermediate: 'The atmosphere is divided into thermodynamic layers defined by temperature lapse rates: Troposphere (0–12 km, weather and 75% of mass), Stratosphere (12–50 km, ozone layer heating via UV absorption), Mesosphere (50–85 km, coldest layer where meteors ablate), Thermosphere (85–600 km, auroras and ionosphere), and Exosphere (transitioning into the vacuum of space at ~10,000 km).',
      advanced: 'Atmospheric retention is governed by the ratio of molecular thermal velocity (Maxwell-Boltzmann distribution) to escape velocity ($v_{esc} = \\sqrt{2GM/R} \\approx 11.2\\text{ km/s}$). Nitrogen (78.08%) and Oxygen (20.95%) remain gravitationally bound, while hydrogen and helium experience Jeans escape. Radiative forcing from trace greenhouse gases ($CO_2$, $H_2O$, $CH_4$) maintains a global mean surface temperature of ~288 K (+33 K above blackbody equilibrium).'
    },
    keyFacts: [
      'The atmosphere contains 78% Nitrogen, 21% Oxygen, 0.93% Argon, and 0.04% Carbon Dioxide.',
      'Atmospheric pressure at sea level is 101.325 kPa (1 atmosphere = 14.7 psi).',
      'The Kármán line at 100 km altitude serves as the internationally recognized boundary of space.',
      'Auroras occur when solar wind charged particles funnel along magnetic field lines and excite oxygen and nitrogen atoms.'
    ],
    measurements: [
      { label: 'Mean Radius of Earth', value: '6,371.0 km', unit: 'km', numericValueMeters: 6.371e6 },
      { label: 'Surface Atmospheric Pressure', value: '1013.25 hPa', unit: 'hPa' },
      { label: 'Atmospheric Scale Height', value: '~8.5 km', unit: 'km' },
      { label: 'Global Mean Temperature', value: '14.9°C (288 K)', unit: 'K' }
    ],
    whatWeKnow: [
      'Plate tectonics recycles crustal volatile elements through subduction, maintaining long-term climate stability via the carbonate-silicate cycle.',
      'The ozone layer in the stratosphere filters solar UV-B and UV-C radiation, preventing DNA degradation.'
    ],
    whatWeInvestigate: [
      'Feedback tipping points in the global climate system under elevated anthropogenic radiative forcing.',
      'Atmospheric loss mechanisms driven by coronal mass ejections during geomagnetic storms.'
    ],
    whatRemainsUnknown: [
      'The precise timeline and geochemical trigger of the Great Oxidation Event ~2.4 billion years ago.',
      'Long-term mantle-core coupling mechanisms driving volcanic mega-provinces.'
    ],
    citations: [
      { title: 'Earth Fact Sheet', institution: 'NASA Goddard Space Flight Center', year: 2024, description: 'Physical and atmospheric parameters of planet Earth.' },
      { title: 'Atmospheric Physics & Chemistry', institution: 'NOAA', year: 2023, description: 'Direct observational datasets of atmospheric layers.' }
    ],
    relatedTopics: ['earth-moon-system', 'exoplanets', 'solar-system'],
    accentColor: '#0ea5e9'
  },
  {
    id: 3,
    slug: 'earth-moon-system',
    title: 'The Earth–Moon System',
    subtitle: 'Gravitational Dance and Tides',
    logScale: 8, // 10^8 - 10^9 meters
    scaleMeters: 3.844e8, // Earth-Moon distance ~ 384,400 km
    scaleDisplay: '384,400 km',
    powersOfTen: '10⁸ m',
    scientificStatus: 'Observed',
    wonderQuestion: 'Could you fit all seven other planets of our Solar System in the space between Earth and the Moon?',
    summary: 'A gravitationally bound binary world. The Moon stabilizes Earth’s axial tilt, drives ocean tides, and recedes by 3.8 centimeters every year.',
    narrative: {
      beginner: 'When we look up at the night sky, the Moon looks close. But in reality, the Moon is about 384,400 kilometers away. That distance is so vast that you could fit all other seven planets of the Solar System between Earth and the Moon with room to spare! The Moon’s gravity pulls on our oceans, causing tides to rise and fall twice each day.',
      intermediate: 'The Moon is tidally locked to Earth, meaning its rotation period matches its orbital period (27.3 days), keeping the same hemisphere facing us. Tidal friction dissipates Earth’s rotational kinetic energy, transferring angular momentum to the Moon’s orbit and causing the Moon to spiral outward by ~3.8 cm/year (measured via Apollo laser retroreflectors).',
      advanced: 'The Giant Impact Hypothesis (Theia collision ~4.5 Ga) is the prevailing model explaining the Moon’s anomalously low iron core mass fraction and identical oxygen isotope signatures ($^{16}O/^{17}O/^{18}O$) with Earth’s mantle. The Earth-Moon barycenter lies inside Earth at ~4,670 km from the center (~73% of Earth’s radius).'
    },
    keyFacts: [
      'All seven other planets (Mercury to Neptune) could fit into the 384,400 km Earth-Moon gap.',
      'The Moon recedes from Earth at 3.78 cm per year due to tidal torque.',
      'The Moon is the fifth-largest natural satellite in the Solar System.',
      'Total solar eclipses are possible because the Sun is ~400× larger than the Moon, but also ~400× farther away.'
    ],
    measurements: [
      { label: 'Average Orbital Distance', value: '384,400 km (1.28 light-seconds)', unit: 'km', numericValueMeters: 3.844e8 },
      { label: 'Lunar Diameter', value: '3,474.8 km (0.272 Earths)', unit: 'km', numericValueMeters: 3.4748e6 },
      { label: 'Orbital Period (Sidereal)', value: '27.32 days', unit: 'days' },
      { label: 'Lunar Mass', value: '7.342 × 10²² kg (0.0123 Earths)', unit: 'kg' }
    ],
    whatWeKnow: [
      'The Moon exerts differential gravitational pull on Earth, creating two tidal bulges.',
      'The Moon stabilizes Earth’s obliquity (23.5° axial tilt), preventing wild climate swings.',
      'Lunar regolith contains ancient solar wind implants unaffected by magnetic shielding.'
    ],
    whatWeInvestigate: [
      'Permanently shadowed craters at the lunar south pole harboring volatile water ice (confirmed by LCROSS & Chandrayaan-1).',
      'High-resolution gravity anomalies mapped by NASA’s GRAIL mission.'
    ],
    whatRemainsUnknown: [
      'The exact dynamics and mass distribution of the impactor Theia during lunar formation.',
      'Whether the lunar deep interior contains active fluid partial melts.'
    ],
    citations: [
      { title: 'Lunar Laser Ranging and Gravitational Physics', institution: 'NASA / JPL', year: 2022, description: 'Millimeter-accuracy distance measurements and tidal dissipation.' },
      { title: 'The Origin of the Moon: 50 Years of Apollo Science', institution: 'Nature Astronomy', year: 2020, description: 'Isotopic constraints on the giant impact hypothesis.' }
    ],
    relatedTopics: ['orbital-mechanics', 'solar-system', 'gravity-spacetime'],
    accentColor: '#a855f7'
  },
  {
    id: 4,
    slug: 'the-solar-system',
    title: 'The Solar System',
    subtitle: 'Our Gravitational Neighborhood',
    logScale: 12, // 10^12 meters ~ 10 AU
    scaleMeters: 1.496e12, // ~10 AU
    scaleDisplay: '100 AU (~15 Billion km)',
    powersOfTen: '10¹² m',
    scientificStatus: 'Well established',
    wonderQuestion: 'If the Sun were scaled down to the size of a basketball, where would the nearest other basketball be?',
    summary: 'A central G-type star holding 99.86% of the mass, eight major planets, dwarf worlds, asteroid belts, and a frozen halo extending toward interstellar space.',
    narrative: {
      beginner: 'Leaving the Earth and Moon behind, we enter the vast realm ruled by the Sun. The Sun is so massive that it holds nearly 99.9% of all the matter in the entire Solar System. Eight planets orbit this fiery star: four rocky worlds near the center, and four giant gaseous and icy worlds farther out, separated by vast belts of spinning rocks and icy comets.',
      intermediate: 'The Solar System is organized into distinct zones: the Inner Solar System (Mercury, Venus, Earth, Mars), the Main Asteroid Belt (2.2–3.2 AU), the Gas Giants (Jupiter, Saturn), the Ice Giants (Uranus, Neptune), the Kuiper Belt (30–50 AU, home to Pluto and Makemake), the Scattered Disc, the Heliosphere boundary (~120 AU, crossed by Voyager 1), and the hypothetical Oort Cloud (~2,000–100,000 AU).',
      advanced: 'Planetary orbits conform to Kepler’s laws and general relativistic perihelion precession (demonstrated by Mercury’s 43″/century anomaly). Planetary migration models (the Nice Model and Grand Tack hypothesis) suggest Jupiter and Saturn migrated early in Solar System history, scattering planetesimals and sculpting the Kuiper Belt resonant populations (such as Plutinos in 3:2 resonance with Neptune).'
    },
    keyFacts: [
      'The Sun contains 99.86% of all mass in the Solar System.',
      'One Astronomical Unit (AU) is ~149.6 million kilometers (the Earth-Sun distance).',
      'Voyager 1, launched in 1977, is currently over 160 AU away in interstellar space.',
      'If the Sun were a 30 cm basketball, Earth would be a 2.7 mm pinhead 32 meters away, and Neptune would be 960 meters away.'
    ],
    measurements: [
      { label: 'Solar Diameter', value: '1,392,700 km (109 Earths)', unit: 'km', numericValueMeters: 1.3927e9 },
      { label: 'Solar Mass', value: '1.989 × 10³⁰ kg (333,000 Earths)', unit: 'kg' },
      { label: 'Neptune Semi-Major Axis', value: '30.07 AU (4.5 Billion km)', unit: 'AU' },
      { label: 'Kuiper Belt Outer Boundary', value: '~50 AU', unit: 'AU' }
    ],
    whatWeKnow: [
      'The Solar System coalesced 4.567 billion years ago from a rotating protoplanetary nebula (dated by calcium-aluminum-rich inclusions).',
      'The solar wind carves out the heliosphere, shielding the planets from high-energy galactic cosmic rays.'
    ],
    whatWeInvestigate: [
      'Subsurface liquid water oceans in icy moons (Europa, Enceladus, Ganymede) with potential astrobiological habitability.',
      'The orbital anomalies of distant trans-Neptunian objects and the hypothesis of an unseen "Planet Nine".'
    ],
    whatRemainsUnknown: [
      'The detailed inner and outer structure of the distant Oort Cloud, which has never been directly imaged.',
      'The exact triggering mechanism for the Late Heavy Bombardment.'
    ],
    citations: [
      { title: 'Planetary Fact Sheet - Ratio to Earth Values', institution: 'NASA / GSFC', year: 2024, description: 'Comparative orbital and physical planetary parameters.' },
      { title: 'Voyager Interstellar Mission Science Summary', institution: 'NASA / JPL', year: 2023, description: 'In-situ measurements of the heliopause transition.' }
    ],
    relatedTopics: ['solar-system-planets', 'orbital-mechanics', 'stellar-evolution'],
    accentColor: '#eab308'
  },
  {
    id: 5,
    slug: 'stars-and-stellar-evolution',
    title: 'Stars & Stellar Evolution',
    subtitle: 'Cosmic Nuclear Engines',
    logScale: 16, // 10^16 meters ~ 1 light-year
    scaleMeters: 9.461e15, // 1 ly
    scaleDisplay: '4.24 light-years',
    powersOfTen: '10¹⁶ m',
    scientificStatus: 'Well established',
    wonderQuestion: 'How does a star’s mass at birth seal its destiny billions of years later—as a sparkling diamond, an ultra-dense pulsar, or a black hole?',
    summary: 'Self-luminous spheres of plasma in hydrostatic balance. Stellar mass governs fusion rates, lifetimes, and dramatic terminal deaths.',
    narrative: {
      beginner: 'Looking past the outer edge of our Solar System, we enter the stellar sea. The nearest star to us, Proxima Centauri, is over 40 trillion kilometers away—it takes light more than four years to reach us from there! Stars are gigantic nuclear reactors. Their heavy gravity tries to crush them inward, while furious nuclear explosions at their cores push outward, creating a brilliant balance.',
      intermediate: 'A star is born when a cold molecular cloud collapses under gravity into a protostar. Once core temperature exceeds ~10 million K, hydrogen fuses into helium via the p-p chain or CNO cycle. A star’s initial mass dictates its evolutionary path on the Hertzsprung-Russell (H-R) diagram. Low-mass stars live for trillions of years; intermediate stars like our Sun expand into red giants and shed planetary nebulae; massive stars (>8 M☉) explode in core-collapse supernovae.',
      advanced: 'Hydrostatic equilibrium requires $dP/dr = -G M(r) \\rho(r) / r^2$. When core hydrogen exhausts, the core contracts, heating until helium ignition (the helium flash in low-mass stars). In massive stars, successive fusion shells synthesize C, O, Ne, Mg, and Si until an iron-56 core forms. Because iron fusion is endothermic, thermal pressure fails, triggering gravitational collapse. Electron degeneracy pressure (Chandrasekhar limit ~1.4 M☉) halts collapse into a white dwarf; neutron degeneracy pressure (Tolman-Oppenheimer-Volkoff limit ~2.1 M☉) halts a neutron star; beyond this, collapse into a black hole singularity is inevitable.'
    },
    keyFacts: [
      'Proxima Centauri is 4.24 light-years (40.1 trillion km) from the Sun.',
      'Our Sun fuses ~600 million tons of hydrogen into helium every second, converting 4 million tons into pure energy via $E=mc^2$.',
      'Massive stars burn hot and die fast: a 30 M☉ star lives only ~5 million years, while a 0.2 M☉ red dwarf can burn for 5 trillion years.',
      'Every atom of iron in your blood was forged inside a massive star before it exploded.'
    ],
    measurements: [
      { label: 'Distance to Nearest Star', value: '4.246 light-years (1.30 pc)', unit: 'ly', numericValueMeters: 4.017e16 },
      { label: 'Sun Core Temperature', value: '1.57 × 10⁷ K', unit: 'K' },
      { label: 'Chandrasekhar Mass Limit', value: '1.44 Solar Masses (M☉)', unit: 'M☉' },
      { label: 'Neutron Star Core Density', value: '~10¹⁷ kg/m³ (sugar cube = mountain)', unit: 'kg/m³' }
    ],
    whatWeKnow: [
      'Nuclear fusion powers stars through the conversion of mass defect into photons via $E=mc^2$.',
      'The Hertzsprung-Russell diagram maps luminosity against surface temperature, categorizing main-sequence, giant, and degenerate states.',
      'Supernovae disperse heavy elements (r-process and s-process nucleosynthesis) that seed future planetary systems.'
    ],
    whatWeInvestigate: [
      'The exact physics of core-collapse neutrino transport driving supernova shock breakout.',
      'Kilonovae nucleosynthesis produced during binary neutron star mergers (e.g. GW170817).'
    ],
    whatRemainsUnknown: [
      'The initial mass function of the universe’s very first generation of stars (Population III stars).',
      'The exact boundary mass for direct collapse into a black hole without a supernova explosion.'
    ],
    citations: [
      { title: 'Principles of Stellar Evolution and Nucleosynthesis', institution: 'University of Chicago Press', year: 2021, description: 'Foundational equations of stellar structure and fusion.' },
      { title: 'Gaia Data Release 3: Stellar Characteristics and Hertzsprung-Russell Mapping', institution: 'ESA / Gaia', year: 2022, description: 'Astrometric survey of over 1.8 billion stars.' }
    ],
    relatedTopics: ['black-holes-neutron-stars', 'nebulae-ism', 'stellar-evolution-lab'],
    accentColor: '#f59e0b'
  },
  {
    id: 6,
    slug: 'exoplanets-habitable-worlds',
    title: 'Exoplanets & Habitable Worlds',
    subtitle: 'The Search for Other Earths',
    logScale: 17, // 10^17 meters
    scaleMeters: 1e17,
    scaleDisplay: '10 – 100 light-years',
    powersOfTen: '10¹⁷ m',
    scientificStatus: 'Observed',
    wonderQuestion: 'Does being in a star’s habitable zone guarantee that a planet can support life, or is that only the first clue?',
    summary: 'Over 5,500 confirmed alien worlds reveal astonishing diversity—from scorched Hot Jupiters to potentially habitable rocky worlds in TRAPPIST-1.',
    narrative: {
      beginner: 'For thousands of years, humans looked at the night sky and wondered if other stars had planets of their own. Today, we know they do! Astronomers have discovered thousands of exoplanets orbiting distant suns. Some are strange worlds of molten glass rain, while others are rocky planets orbiting in the "Goldilocks Zone," where temperatures are just right for liquid water to pool on the surface.',
      intermediate: 'Exoplanets are detected primarily through the Transit Method (measuring the tiny dip in stellar brightness as a planet passes in front, used by Kepler and TESS) and the Radial Velocity Method (detecting the star’s Doppler wobble caused by the planet’s gravitational tug). Transmission spectroscopy during transits allows astronomers to analyze atmospheric chemical fingerprints.',
      advanced: 'The Habitable Zone (HZ) is defined where stellar irradiance permits liquid surface water given an Earth-like atmosphere ($S_{eff} \\approx 0.95 - 1.37 S_0$). However, habitability requires far more: planetary mass capable of retaining volatiles, a geomagnetic dynamo shielding against stellar flares (vital for M-dwarf systems like TRAPPIST-1), a dynamic carbon-silicate cycle, and low atmospheric toxic volatility. Biosignature detection targets disequilibrium gas pairs (e.g., simultaneous $CH_4$ and $O_2$ or $O_3$).'
    },
    keyFacts: [
      'Over 5,500 exoplanets have been confirmed by space telescopes (Kepler, TESS, James Webb).',
      'The TRAPPIST-1 system has seven Earth-sized rocky planets orbiting a red dwarf star 40 light-years away.',
      'A planet inside the "Habitable Zone" is NOT proven to be habitable—Venus and Mars are both near our Sun’s habitable zone.',
      'Transit spectroscopy measures starlight filtered through an alien atmosphere to detect molecules like water vapor and carbon dioxide.'
    ],
    measurements: [
      { label: 'Closest Known Exoplanet', value: 'Proxima Centauri b (4.24 ly)', unit: 'ly' },
      { label: 'Confirmed Exoplanets', value: '> 5,600 planets', unit: 'planets' },
      { label: 'Transit Depth of Earth-like Planet', value: '~0.0084% (84 parts per million)', unit: 'ppm' },
      { label: 'TRAPPIST-1 Distance', value: '39.46 light-years (12.1 pc)', unit: 'ly', numericValueMeters: 3.73e17 }
    ],
    whatWeKnow: [
      'Planets are statistically ubiquitous: on average, every star in the Milky Way hosts at least one planet.',
      'Exoplanet architectures differ radically from our Solar System, including super-Earths and sub-Neptunes which are absent in our system.'
    ],
    whatWeInvestigate: [
      'JWST transmission and emission spectroscopy of rocky exoplanet atmospheres (such as TRAPPIST-1 b, c, e).',
      'Atmospheric escape rates driven by extreme ultraviolet and X-ray flares from red dwarf host stars.'
    ],
    whatRemainsUnknown: [
      'Whether any exoplanet atmosphere hosts genuine biogenic atmospheric disequilibrium.',
      'The abundance of true Earth twins (1 R⊕ planets in 1-year orbits around Sun-like G-dwarf stars).'
    ],
    citations: [
      { title: 'NASA Exoplanet Archive', institution: 'NASA / Caltech IPAC', year: 2024, description: 'Real-time database of confirmed exoplanets and physical parameters.' },
      { title: 'Atmospheric Characterization of Rocky Exoplanets with JWST', institution: 'Nature', year: 2023, description: 'Spectroscopic constraints on secondary atmospheres around M-dwarfs.' }
    ],
    relatedTopics: ['stars-and-stellar-evolution', 'solar-system', 'planetary-comparison'],
    accentColor: '#10b981'
  },
  {
    id: 7,
    slug: 'nebulae-and-interstellar-medium',
    title: 'Nebulae & The Interstellar Medium',
    subtitle: 'Cosmic Stellar Nurseries and Remnants',
    logScale: 18, // 10^18 meters ~ 100 light-years
    scaleMeters: 1e18,
    scaleDisplay: '100 light-years',
    powersOfTen: '10¹⁸ m',
    scientificStatus: 'Observed',
    wonderQuestion: 'How can clouds of gas trillions of times emptier than the best vacuum on Earth give birth to billions of blazing suns?',
    summary: 'Vast interstellar clouds of ionized gas, neutral hydrogen, and microscopic cosmic dust sculpt the lifecycle of galaxies, giving birth to stars and recycling heavy elements.',
    narrative: {
      beginner: 'Between the stars lies a breathtaking realm of glowing clouds called nebulae. Some nebulae are stellar nurseries—massive clouds of hydrogen gas and cosmic dust where gravity squeezes material together until brand new stars ignite. Other nebulae, like the famous Crab Nebula, are the magnificent ruins of stars that exploded long ago, blasting gold, silver, and oxygen into deep space.',
      intermediate: 'Nebulae fall into distinct classes: Emission Nebulae (H II regions like the Orion Nebula, where ultraviolet light from hot O and B stars ionizes hydrogen, causing it to glow red at the H-alpha line of 656.3 nm); Reflection Nebulae (dust scattering blue light); Dark Nebulae (dense molecular clouds blocking background light); Planetary Nebulae (expanding gas shells cast off by dying intermediate-mass stars); and Supernova Remnants (blast waves driving shockwave nucleosynthesis).',
      advanced: 'Star formation occurs within Giant Molecular Clouds when the thermal pressure cannot resist gravitational collapse, defined by the Jeans Instability criterion: $M > M_J \\approx (5 k_B T / G \\mu m_H)^{3/2} (3 / 4 \\pi \\rho)^{1/2}$. Dust grains catalyze the transition from atomic hydrogen (H I) to molecular hydrogen ($H_2$) and mediate radiative cooling via far-infrared emission, permitting ongoing isothermal fragmentation into individual stellar cores.'
    },
    keyFacts: [
      'The Orion Nebula (M42) is 1,344 light-years away and spans 24 light-years across.',
      'Interstellar dust grains are microscopic—mostly carbon, silicates, and polycyclic aromatic hydrocarbons (PAHs).',
      'The "Pillars of Creation" in the Eagle Nebula are dense towers of gas being eroded by ultraviolet light from nearby newborn stars.',
      'Supernova remnants like the Crab Nebula expand at over 1,500 kilometers per second.'
    ],
    measurements: [
      { label: 'Orion Nebula Diameter', value: '~24 light-years', unit: 'ly', numericValueMeters: 2.27e17 },
      { label: 'H II Region Temperature', value: '~10,000 K', unit: 'K' },
      { label: 'Giant Molecular Cloud Density', value: '10² – 10⁶ particles/cm³', unit: 'cm⁻³' },
      { label: 'Typical Interstellar Pressure', value: '~10⁻¹³ Pa', unit: 'Pa' }
    ],
    whatWeKnow: [
      'Shockwaves from nearby supernovae compress quiescent molecular clouds, triggering new rounds of star birth.',
      'Dust grains polarize starlight, revealing the topology of interstellar magnetic fields.'
    ],
    whatWeInvestigate: [
      'High-resolution ALMA and JWST observations of protoplanetary disks within young stellar objects.',
      'The role of magnetic fields versus supersonic turbulence in regulating the star-formation efficiency of molecular clouds.'
    ],
    whatRemainsUnknown: [
      'The detailed physics determining why only ~1–2% of molecular gas converts into stars per free-fall time.',
      'The precise chemical pathways forming prebiotic amino acid precursors in interstellar ice mantles.'
    ],
    citations: [
      { title: 'The Physics of the Interstellar and Intergalactic Medium', institution: 'Princeton University Press', year: 2021, description: 'Comprehensive text on radiative transfer and shock dynamics.' },
      { title: 'JWST Imaging of the Pillars of Creation in M16', institution: 'NASA / ESA / STScI', year: 2022, description: 'Infrared penetration revealing embedded protostars.' }
    ],
    relatedTopics: ['stars-and-stellar-evolution', 'black-holes-neutron-stars', 'milky-way-galaxy'],
    accentColor: '#ec4899'
  },
  {
    id: 8,
    slug: 'the-milky-way',
    title: 'The Milky Way Galaxy',
    subtitle: 'Our Island Universe',
    logScale: 21, // 10^21 meters ~ 100,000 light-years
    scaleMeters: 9.461e20, // 100,000 ly
    scaleDisplay: '100,000 light-years',
    powersOfTen: '10²¹ m',
    scientificStatus: 'Observed',
    wonderQuestion: 'If our galaxy contains over 100 billion stars, why is more than 85% of its total mass completely invisible?',
    summary: 'A barred spiral galaxy spanning 100,000 light-years. Over 100 to 400 billion stars rotate around Sagittarius A*, embedded in an invisible dark matter halo.',
    narrative: {
      beginner: 'Zooming out far beyond individual stars and nebulae, our entire galaxy comes into view. The Milky Way is a majestic pinwheel of light spinning in the dark. It contains hundreds of billions of stars, and our Sun is just one humble member, located about halfway out from the center on a spiral arm called the Orion Spur. At the very heart of the galaxy lurks a supermassive black hole four million times heavier than our Sun.',
      intermediate: 'The Milky Way is classified as an SBbc barred spiral galaxy. It comprises three primary structural components: the thin and thick stellar disks (where star formation persists in spiral arms: Scutum-Centaurus, Perseus, Sagittarius, Norma), the central galactic bulge with a stellar bar, and the stellar halo with ~150 ancient globular clusters. The Solar System orbits the Galactic Center at ~220 km/s, taking ~230 million years to complete one Galactic Year.',
      advanced: 'Galactic rotation curves do not exhibit Keplerian decline ($v \\propto r^{-1/2}$) beyond the optical disk; instead, rotational velocities remain flat at $\\sim 220\\text{ km/s}$ out to large radii (Vera Rubin observations). This provides irrefutable dynamical evidence for an extended, spherical dark matter halo whose total mass ($\\\\sim 10^{12} M_\\odot$) dwarfs the baryonic stellar mass ($\\\\sim 6 \\times 10^{10} M_\\odot$). At the dynamical core lies Sagittarius A*, confirmed by monitoring the relativistic orbits of S-stars (Genzel and Ghez, Nobel Prize 2020) and imaged directly by the Event Horizon Telescope (2022).'
    },
    keyFacts: [
      'The Milky Way is approximately 100,000 light-years in diameter and ~1,000 light-years thick in the disk.',
      'Our Solar System is situated ~26,000 light-years from the galactic center in the Orion Spur.',
      'It takes our Sun about 230 million years to complete one orbit around the galaxy.',
      'Sagittarius A*, the supermassive black hole at the center, has a mass of 4.15 million solar masses.'
    ],
    measurements: [
      { label: 'Stellar Disk Diameter', value: '100,000 – 120,000 ly', unit: 'ly', numericValueMeters: 9.46e20 },
      { label: 'Total Stellar Population', value: '100 – 400 Billion stars', unit: 'stars' },
      { label: 'Distance from Sun to Core', value: '26,670 ly (8.18 kpc)', unit: 'ly', numericValueMeters: 2.52e20 },
      { label: 'Mass of Sagittarius A*', value: '4.15 × 10⁶ Solar Masses', unit: 'M☉' }
    ],
    whatWeKnow: [
      'The Milky Way is actively cannibalizing smaller satellite dwarf galaxies, such as the Sagittarius Dwarf Spheroidal.',
      'The galaxy is on a gravitational collision course with the Andromeda Galaxy (M31), with merger expected in ~4.5 billion years.'
    ],
    whatWeInvestigate: [
      'The precise 3D spatial velocity and chemical composition of billions of stars mapped by ESA’s Gaia spacecraft.',
      'The origin and high-energy emission mechanisms of the giant Fermi Bubbles extending 25,000 ly above and below the galactic plane.'
    ],
    whatRemainsUnknown: [
      'The exact nature and particle identity of the dark matter particles constituting the halo.',
      'The detailed evolutionary trigger that launched the stellar bar and its resonance patterns.'
    ],
    citations: [
      { title: 'First Sagittarius A* Event Horizon Telescope Results', institution: 'The Astrophysical Journal Letters', year: 2022, description: 'Direct millimeter-wave imaging of the supermassive black hole shadow.' },
      { title: 'The Milky Way in the Gaia Era', institution: 'Annual Review of Astronomy and Astrophysics', year: 2023, description: 'Structural and kinematic synthesis of galactic architecture.' }
    ],
    relatedTopics: ['galaxies', 'black-holes-neutron-stars', 'dark-matter-dark-energy'],
    accentColor: '#6366f1'
  },
  {
    id: 9,
    slug: 'other-galaxies',
    title: 'Other Galaxies',
    subtitle: 'Cosmic Cities of Billions',
    logScale: 22, // 10^22 meters ~ Millions of light-years
    scaleMeters: 2.36e22, // 2.5 million ly (Andromeda distance)
    scaleDisplay: '2.5 Million light-years',
    powersOfTen: '10²² m',
    scientificStatus: 'Observed',
    wonderQuestion: 'Until just 100 years ago, humanity believed our galaxy was the entire universe. How did we realize we are only one of two trillion galaxies?',
    summary: 'Galaxies come in spirals, ellipticals, and irregulars. They collide, merge, and nurture supermassive black holes in a cosmic evolutionary ballet.',
    narrative: {
      beginner: 'For most of human history, astronomers thought the Milky Way was all that existed. In the 1920s, Edwin Hubble pointed a powerful telescope at a blurry smudge called Andromeda and proved it was another colossal galaxy millions of light-years away. Today we know the universe contains trillions of galaxies, each home to hundreds of billions of stars.',
      intermediate: 'Galaxies are categorized on the Hubble Tuning Fork: Spiral galaxies (ordered rotation, ongoing star formation), Lenticulars (disk without spiral arms), Ellipticals (ellipsoidal, pressure-supported, older stellar populations with minimal gas), and Irregulars (often shaped by gravitational tidal disruption). Colliding galaxies like the Antennae (NGC 4038/4039) trigger massive starbursts as gas clouds collide, though stars themselves rarely hit one another due to vast interstellar separation.',
      advanced: 'Galaxy formation proceeds hierarchically in $\\Lambda$CDM cosmology: small dark matter subhalos merge into larger halos, pulling gas that cools, fragments, and forms stars. Supermassive Black Hole (SMBH) feedback plays a pivotal role in "quenching" star formation: active galactic nuclei (AGN) drive relativistic jets and radiation winds that heat and expel cold gas, explaining the observed $M_{BH} - \\sigma$ relation between central black hole mass and galactic bulge velocity dispersion.'
    },
    keyFacts: [
      'The Andromeda Galaxy (M31) is the nearest major spiral galaxy, 2.5 million light-years away.',
      'There are estimated to be over 2 trillion galaxies in the observable universe.',
      'When galaxies collide, individual stars almost never collide because the distance between stars is so enormous.',
      'Elliptical galaxies can grow to immense sizes—IC 1101 spans over 4 million light-years across and contains 100 trillion stars.'
    ],
    measurements: [
      { label: 'Distance to Andromeda (M31)', value: '2.537 Million ly (778 kpc)', unit: 'ly', numericValueMeters: 2.4e22 },
      { label: 'Andromeda Diameter', value: '~152,000 ly', unit: 'ly', numericValueMeters: 1.44e21 },
      { label: 'Estimated Galaxies in Universe', value: '~2 × 10¹² galaxies', unit: 'galaxies' },
      { label: 'Andromeda-Milky Way Approach Speed', value: '110 km/s', unit: 'km/s' }
    ],
    whatWeKnow: [
      'Galaxies grow via hierarchical merging and gas accretion along cosmological filaments.',
      'Nearly every massive galaxy harbors a supermassive black hole at its core.'
    ],
    whatWeInvestigate: [
      'JWST discoveries of surprisingly massive, mature galaxies at redshifts $z > 10$ ($< 400$ million years after the Big Bang).',
      'The mechanisms by which AGN feedback shuts down star formation in massive elliptical galaxies.'
    ],
    whatRemainsUnknown: [
      'How supermassive black holes grew to billions of solar masses so rapidly in the early universe.',
      'The exact physics of the "cusp-core" problem in dwarf galaxy dark matter density profiles.'
    ],
    citations: [
      { title: 'Extragalactic Astronomy and Cosmology', institution: 'Springer Nature', year: 2022, description: 'Morphology, dynamics, and evolution of galaxies.' },
      { title: 'Early Release Science with the James Webb Space Telescope: Distant Galaxies', institution: 'ApJ / STScI', year: 2023, description: 'High-redshift galaxy surveys probing cosmic dawn.' }
    ],
    relatedTopics: ['milky-way-galaxy', 'galaxy-groups-and-clusters', 'black-holes-neutron-stars'],
    accentColor: '#8b5cf6'
  },
  {
    id: 10,
    slug: 'galaxy-groups-and-clusters',
    title: 'Galaxy Groups & Clusters',
    subtitle: 'Gravitational Metropolises',
    logScale: 23, // 10^23 meters ~ 10-50 Million light-years
    scaleMeters: 5e23, // ~50 million ly (Virgo Cluster)
    scaleDisplay: '50 Million light-years',
    powersOfTen: '10²³ m',
    scientificStatus: 'Well established',
    wonderQuestion: 'How can a cluster of a thousand galaxies be held together if all the visible stars account for only 5% of its required gravity?',
    summary: 'The largest gravitationally bound structures in the universe, permeated by 100-million-degree X-ray plasma and dominated by dark matter.',
    narrative: {
      beginner: 'Galaxies do not drift alone in the void. They gather together like cities into groups and gigantic clusters. Our Milky Way is part of a small family called the Local Group. Nearby sits the immense Virgo Cluster, containing more than a thousand galaxies. What holds these colossal cosmic cities together is not just the gravity of their stars, but a massive web of invisible dark matter.',
      intermediate: 'The Local Group contains ~80 galaxies spanning ~10 million light-years, dominated by the Milky Way and Andromeda. Galaxy clusters, like the Virgo Cluster (54 Mly) or Coma Cluster (320 Mly), contain thousands of galaxies bound by gravity. Fritz Zwicky discovered dark matter in 1933 by applying the Virial Theorem to the Coma Cluster, showing galaxies moved far too fast to be held by visible matter alone.',
      advanced: 'The mass budget of a galaxy cluster is partitioned as: ~80–85% dark matter, ~12–15% hot Intracluster Medium (ICM), and only ~2–3% stars. The ICM is a tenuous, fully ionized plasma heated by gravitational collapse to $10^7 - 10^8\\text{ K}$, emitting copious thermal bremsstrahlung in the X-ray band (observed by Chandra and XMM-Newton). Clusters act as natural gravitational lenses, warping background light into Einstein rings and arcs (e.g. Abell 370, SMACS 0723).'
    },
    keyFacts: [
      'The Local Group spans ~10 million light-years and contains over 80 galaxies.',
      'The Virgo Cluster contains between 1,300 and 2,000 galaxies.',
      'The Intracluster Medium is so hot (up to 100 million Kelvin) that it glows intensely in X-rays.',
      'The Bullet Cluster provided direct empirical proof of dark matter by showing the separation of gravitational mass (lensing) from baryonic plasma (X-ray collision shock).'
    ],
    measurements: [
      { label: 'Distance to Virgo Cluster', value: '53.8 Million ly (16.5 Mpc)', unit: 'ly', numericValueMeters: 5.09e23 },
      { label: 'Virgo Cluster Total Mass', value: '~1.2 × 10¹⁵ Solar Masses', unit: 'M☉' },
      { label: 'Intracluster Gas Temperature', value: '10⁷ – 10⁸ K', unit: 'K' },
      { label: 'Gravitational Lensing Deflection', value: 'Up to tens of arcseconds', unit: 'arcsec' }
    ],
    whatWeKnow: [
      'Galaxy clusters are the largest virialized objects that have collapsed under gravity in the age of the universe.',
      'Gravitational lensing by clusters allows astronomers to peer at the most distant, magnified early universe galaxies.'
    ],
    whatWeInvestigate: [
      'The "cooling flow problem": why central cluster gas does not rapidly cool and form stars, mitigated by episodic AGN radio jet heating.',
      'Mapping dark matter distributions through weak and strong gravitational lensing surveys (Euclid mission).'
    ],
    whatRemainsUnknown: [
      'The microphysics of thermal conduction and magnetic turbulence within the intracluster medium.',
      'The precise cluster mass calibration across cosmological time used to constrain dark energy.'
    ],
    citations: [
      { title: 'Galaxy Clusters: Witnesses of Cosmic Evolution', institution: 'Annual Review of Astronomy and Astrophysics', year: 2021, description: 'Comprehensive review of cluster thermodynamics and cosmology.' },
      { title: 'Chandra X-ray Observatory Cluster Surveys', institution: 'NASA / Smithsonian Astrophysical Observatory', year: 2023, description: 'Observational data on intracluster plasma and the Bullet Cluster.' }
    ],
    relatedTopics: ['other-galaxies', 'the-cosmic-web', 'dark-matter-dark-energy'],
    accentColor: '#3b82f6'
  },
  {
    id: 11,
    slug: 'the-cosmic-web',
    title: 'The Cosmic Web',
    subtitle: 'The Architecture of the Universe',
    logScale: 25, // 10^25 meters ~ Hundreds of millions of light-years
    scaleMeters: 5e24, // ~500 million ly
    scaleDisplay: '500 Million light-years',
    powersOfTen: '10²⁵ m',
    scientificStatus: 'Current model',
    wonderQuestion: 'Why does the largest structure in the cosmos resemble the neural network of a human brain or a sponge?',
    summary: 'Matter on the grandest scale forms an interconnected network of filaments, dense gravitational nodes, and vast, empty cosmic voids spanning hundreds of millions of light-years.',
    narrative: {
      beginner: 'Zooming out so far that entire galaxies look like tiny specks of dust, we see the true skeleton of the cosmos: the Cosmic Web. Like water droplets condensing on a spiderweb, galaxies and gas form enormous glowing threads that stretch across space. Where these threads cross, colossal galaxy clusters thrive. Between the threads lie giant empty bubbles called cosmic voids.',
      intermediate: 'The Cosmic Web structure emerged from tiny primordial quantum fluctuations stretched during cosmic inflation. Dark matter, interacting only through gravity, collapsed first into a honeycomb of filaments and sheets. Baryonic gas followed, falling into the gravitational wells to ignite galaxies. The Boötes Void is one of the largest known voids, spanning ~330 million light-years with virtually no galaxies inside.',
      advanced: 'Large-scale structure evolution is described mathematically by the Zeldovich approximation: gravitational collapse occurs sequentially along principal axes, turning 3D perturbations into 2D "pancakes" (sheets), then 1D filaments, and finally 0D compact nodes (clusters). Cosmological N-body simulations (e.g. Millennium, IllustrisTNG) accurately reproduce the observed galaxy 2-point correlation function $\\xi(r) = (r/r_0)^{-\\gamma}$ and the Lyman-alpha forest absorption spectra of distant quasars.'
    },
    keyFacts: [
      'Cosmic filaments can be hundreds of millions of light-years long.',
      'Vast cosmic voids make up over 80% of the volume of the universe.',
      'The Boötes Void is ~330 million light-years in diameter, yet contains only ~60 known galaxies (a region that should contain 10,000).',
      'The Warm-Hot Intergalactic Medium (WHIM) residing in cosmic web filaments accounts for the "missing baryons" of the universe.'
    ],
    measurements: [
      { label: 'Scale of Cosmic Filaments', value: '100 – 500 Million ly', unit: 'ly', numericValueMeters: 4.73e24 },
      { label: 'Boötes Void Diameter', value: '~330 Million ly (100 Mpc)', unit: 'ly', numericValueMeters: 3.12e24 },
      { label: 'Matter Density in Voids', value: '< 10% of cosmic mean density', unit: 'density' },
      { label: 'Characteristic Node Separation', value: '~100 Mpc', unit: 'Mpc' }
    ],
    whatWeKnow: [
      'The Cosmic Web is the direct macroscopic imprint of primordial acoustic oscillations and cold dark matter collapse.',
      'Cosmological surveys like the Sloan Digital Sky Survey (SDSS) have mapped millions of galaxies along cosmic filaments.'
    ],
    whatWeInvestigate: [
      'Direct detection of the diffuse intergalactic gas filament network via Lyman-alpha emission with instruments like MUSE.',
      'Void cosmology: testing alternative theories of gravity and dark energy in empty, low-density regions.'
    ],
    whatRemainsUnknown: [
      'The exact ionization and metallicity state of gas throughout the deep inter-filament void regions.',
      'How neutrino mass variations suppress small-scale filamentary clustering.'
    ],
    citations: [
      { title: 'The Cosmic Web: Mysterious Architecture of the Universe', institution: 'Princeton University Press', year: 2020, description: 'Origin and observational confirmation of large-scale structure.' },
      { title: 'The Sloan Digital Sky Survey III: Baryon Oscillation Spectroscopic Survey', institution: 'Astrophysical Journal', year: 2022, description: '3D cosmological maps of the cosmic web.' }
    ],
    relatedTopics: ['galaxy-groups-and-clusters', 'the-observable-universe', 'dark-matter-dark-energy'],
    accentColor: '#06b6d4'
  },
  {
    id: 12,
    slug: 'the-observable-universe',
    title: 'The Observable Universe',
    subtitle: 'The Boundary of Our Vision',
    logScale: 26, // 10^26 meters ~ 93 Billion light-years
    scaleMeters: 8.8e26, // 93 billion light-years diameter ~ 8.8 x 10^26 m
    scaleDisplay: '93 Billion light-years',
    powersOfTen: '10²⁶ m',
    scientificStatus: 'Well established',
    wonderQuestion: 'If the universe is 13.8 billion years old, how can the observable universe be 93 billion light-years in diameter?',
    summary: 'The sphere centered on Earth containing all matter and light that has had time to reach us since the Big Bang. Its outer boundary is the Cosmic Microwave Background.',
    narrative: {
      beginner: 'We have arrived at the ultimate visible frontier: the Observable Universe. When we look deep into space, we are looking back in time, because light takes time to travel. The edge of what we can see is not a physical wall, but a time horizon: the moment 13.8 billion years ago when the universe cooled enough for light to travel freely. This faint afterglow is called the Cosmic Microwave Background.',
      intermediate: 'Learners often wonder: if the universe is 13.8 billion years old, shouldn’t the edge be 13.8 billion light-years away (a 27.6 Gly diameter)? No! Space has been continually expanding while light traveled toward us. The matter that emitted the CMB radiation 13.8 billion years ago is now ~46.5 billion light-years away from Earth in comoving coordinates. Thus, the diameter of the observable universe is approximately 93 billion light-years (28.5 gigaparsecs).',
      advanced: 'The comoving particle horizon is given by $\\chi_p = c \\int_0^t \\frac{dt\'}{a(t\')} = c \\int_0^z \\frac{dz\'}{H(z\')}$. For the benchmark $\\Lambda$CDM parameters ($\\Omega_m \\approx 0.315$, $\\Omega_\\Lambda \\approx 0.685$, $H_0 \\approx 67.4\\text{ km/s/Mpc}$ measured by Planck 2018), integrating to the surface of last scattering ($z \\approx 1090$) yields a comoving radius of $R_{obs} \\approx 14.3\\text{ Gpc} \\approx 46.5\\text{ Gly}$. The boundary is an observational horizon, not a physical edge; an observer in a galaxy 40 billion light-years away sees their own 93-billion-light-year observable bubble.'
    },
    keyFacts: [
      'The observable universe is ~93 billion light-years (28.5 Gpc) in diameter.',
      'The universe is 13.787 ± 0.020 billion years old.',
      'The Cosmic Microwave Background (CMB) has a nearly perfect blackbody temperature of 2.7255 K.',
      'The observable boundary is an observational horizon, NOT an edge of space.'
    ],
    measurements: [
      { label: 'Observable Diameter', value: '93 Billion ly (28.5 Gpc)', unit: 'ly', numericValueMeters: 8.8e26 },
      { label: 'Age of the Universe', value: '13.787 ± 0.020 Billion years', unit: 'years' },
      { label: 'CMB Temperature', value: '2.7255 K (-270.42°C)', unit: 'K' },
      { label: 'Hubble Constant (H₀)', value: '67.4 ± 0.5 km/s/Mpc (Planck)', unit: 'km/s/Mpc' }
    ],
    whatWeKnow: [
      'Space expands uniformly on cosmic scales; galaxies are not flying through space, but the metric of space itself is stretching.',
      'The CMB temperature fluctuations ($\\Delta T / T \\sim 10^{-5}$) are the seeds of all modern galaxies and cosmic web structures.'
    ],
    whatWeInvestigate: [
      'The "Hubble Tension": the persistent discrepancy between early-universe CMB measurements ($H_0 \\approx 67.4$) and late-universe Cepheid/Type Ia supernovae measurements ($H_0 \\approx 73.0$).',
      'Primordial B-mode polarization patterns in the CMB, which would verify gravitational waves from cosmic inflation.'
    ],
    whatRemainsUnknown: [
      'Whether the universe is spatially finite (with periodic topology) or infinitely large beyond our horizon.',
      'The exact nature of the initial singularity at $t = 0$.'
    ],
    citations: [
      { title: 'Planck 2018 Results: Cosmological Parameters', institution: 'Astronomy & Astrophysics / ESA Planck', year: 2020, description: 'Precision constraints on cosmic age, density parameters, and CMB.' },
      { title: 'Cosmology', institution: 'Oxford University Press', year: 2022, description: 'Foundations of the FLRW metric and cosmological horizon mathematics.' }
    ],
    relatedTopics: ['the-cosmic-web', 'beyond-observable-horizon', 'cosmic-expansion-lab'],
    accentColor: '#14b8a6'
  },
  {
    id: 13,
    slug: 'beyond-the-observable-horizon',
    title: 'Beyond the Observable Horizon',
    subtitle: 'The Unseen Continuum',
    logScale: 27, // > 10^27 meters
    scaleMeters: 1e28,
    scaleDisplay: '> 100 Billion light-years to Infinity',
    powersOfTen: '> 10²⁷ m',
    scientificStatus: 'Current model',
    wonderQuestion: 'Does space continue forever beyond what we can see, or could someone flying in one direction eventually return to where they started?',
    summary: 'Cosmic inflation strongly suggests our observable bubble is a microscopic fraction of a vastly larger, possibly infinite universe whose global topology remains unobserved.',
    narrative: {
      beginner: 'What lies beyond the farthest horizon we can see? The simple, honest scientific answer is that we cannot see it directly—light from beyond that horizon has simply not had enough time to reach us. However, all our best scientific equations tell us that space does not stop there. The universe likely continues onward for incomprehensible distances, and may even go on forever.',
      intermediate: 'Cosmic inflation theory proposes that in the first fraction of a second ($10^{-36}$ to $10^{-32}$ s), the universe expanded exponentially by a factor of at least $10^{26}$. This flattened spatial curvature and stretched the physical universe far beyond our observable horizon. Measurements of spatial curvature by the Planck satellite constrain the curvature parameter to $|\\Omega_k| < 0.005$, indicating the global universe is flat to high precision—and at least 250 to 500 times larger in volume than our observable patch, if not infinite.',
      advanced: 'Global spatial topology is independent of local Riemannian geometry. A flat universe ($\\Omega_k = 0$) can be topologically open (Euclidean $\\mathbb{R}^3$) or compact and closed (such as a 3-torus $T^3$). Searches for matched circle pairs in the CMB temperature fluctuations (e.g., Cornish et al.) place lower bounds on the topology scale: any compact topology must have an eigenmode fundamental domain exceeding the diameter of our particle horizon ($d > 28.5\\text{ Gpc}$). Regions beyond our future event horizon are permanently causally disconnected from us due to accelerated cosmic expansion driven by dark energy.'
    },
    keyFacts: [
      'The total universe is at least 250 to 500 times larger in volume than the observable universe, and could be mathematically infinite.',
      'Observational bounds constrain spatial curvature to be flat within 0.4% error ($|\\Omega_k| < 0.004$).',
      'Accelerated cosmic expansion means most galaxies in the observable universe will eventually cross our cosmic event horizon and disappear forever.',
      'We must clearly distinguish theoretical inference based on standard inflation from direct empirical proof.'
    ],
    measurements: [
      { label: 'Spatial Curvature (Ωₖ)', value: '0.0007 ± 0.0019 (Consistent with flat)', unit: 'curvature' },
      { label: 'Minimum Size of Global Universe', value: '> 23 Trillion light-years', unit: 'ly' },
      { label: 'Inflationary Expansion Factor', value: '> 10²⁶ (in 10⁻³² seconds)', unit: 'scale' },
      { label: 'Future Cosmological Horizon Limit', value: '~17.5 Gpc (comoving)', unit: 'Gpc' }
    ],
    whatWeKnow: [
      'The cosmological principle holds that on large scales, the universe is homogeneous and isotropic.',
      'Light from beyond our particle horizon can never reach Earth at the present epoch.'
    ],
    whatWeInvestigate: [
      'Primordial non-Gaussianity ($f_{NL}$) to constrain single-field versus multi-field inflationary models.',
      'Ultra-sensitive cosmic shear surveys to detect subtle deviations from flat Euclidean geometry.'
    ],
    whatRemainsUnknown: [
      'Whether the global universe is mathematically infinite or a compact topological manifold.',
      'The fundamental nature of the inflaton field and its potential energy landscape.'
    ],
    citations: [
      { title: 'Cosmic Inflation and the Limits of Observational Cosmology', institution: 'Physical Review D', year: 2021, description: 'Constraints on global topology and curvature bounds.' },
      { title: 'The Shape of Space', institution: 'CRC Press', year: 2020, description: 'Topological manifolds and cosmological horizon analysis.' }
    ],
    relatedTopics: ['the-observable-universe', 'dimensions-quantum-multiverse', 'cosmic-expansion-lab'],
    accentColor: '#a855f7'
  },
  {
    id: 14,
    slug: 'dimensions-quantum-multiverse',
    title: 'Dimensions, Quantum & Multiverse',
    subtitle: 'The Frontiers of Theoretical Physics',
    logScale: 28, // Conceptual / Multiverse
    scaleMeters: 1e30,
    scaleDisplay: 'Conceptual / Theoretical',
    powersOfTen: 'Beyond Space',
    scientificStatus: 'Hypothesis',
    wonderQuestion: 'Could there be other dimensions or parallel universes, and how do scientists separate wild science fiction from serious mathematical physics?',
    summary: 'From higher-dimensional geometry and quantum field theory to inflationary bubble universes and Everett’s Many-Worlds—separating mathematical motivation from empirical evidence.',
    narrative: {
      beginner: 'At the farthest edge of human inquiry, we leave ordinary spatial maps behind to confront the deepest questions of reality. Could space have hidden extra dimensions? Could our universe be just one of countless "bubbles" floating in an eternal cosmic foam? Scientists take these ideas seriously because the mathematics of quantum mechanics and relativity point toward them, but we must remember: not a single parallel universe has ever been observed.',
      intermediate: 'In physics, a "dimension" is simply an independent mathematical coordinate needed to specify a point. Einstein unified three spatial dimensions with one temporal dimension into 4D spacetime. Theoretical frameworks like String Theory require 10 or 11 dimensions, where the extra spatial dimensions are compactified (curled up microscopically into Calabi-Yau manifolds). Meanwhile, multiverse proposals vary: Tegmark’s Level I (distant Hubble volumes), Level II (eternal inflation pocket universes with different physical constants), and Level III (Everett’s Many-Worlds quantum branching).',
      advanced: 'Scientific integrity demands distinguishing empirical observation from mathematical consistency. The Many-Worlds Interpretation (MWI) preserves unitary quantum mechanics without wavefunction collapse by positing that quantum superpositions evolve deterministically in Hilbert space. The String Landscape provides $\\sim 10^{500}$ metastable vacua, motivating the anthropic principle for the cosmological constant. However, unless a hypothesis makes falsifiable, testable predictions (Karl Popper demarcation), it remains a theoretical model or philosophical interpretation rather than confirmed empirical science.'
    },
    keyFacts: [
      'There is ZERO confirmed empirical observational evidence for any parallel universe or multiverse.',
      'In physics, extra dimensions are mathematical coordinates (degrees of freedom), not "alternate mystical planes".',
      'The 4D spacetime of General Relativity treats time as a coordinate mathematically intertwined with space.',
      'A scientific hypothesis requires testable, falsifiable predictions to be confirmed as physical reality.'
    ],
    measurements: [
      { label: 'Spacetime Dimensions (GR)', value: '3 Space + 1 Time (4D)', unit: 'dim' },
      { label: 'Superstring Theory Dimensions', value: '10 Dimensions (9 Space + 1 Time)', unit: 'dim' },
      { label: 'M-Theory Dimensions', value: '11 Dimensions', unit: 'dim' },
      { label: 'String Vacua Landscape Estimate', value: '~10⁵⁰⁰ possible vacua', unit: 'vacua' }
    ],
    whatWeKnow: [
      'Quantum mechanics is the most accurately tested physical theory in human history, confirmed to one part in a trillion (electron g-factor).',
      'General relativity accurately describes gravitation as curved spacetime, verified by gravitational waves and black hole shadows.'
    ],
    whatWeInvestigate: [
      'Quantum Gravity: attempting to unite General Relativity with the Standard Model (e.g. Loop Quantum Gravity, Asymptotically Safe Gravity).',
      'Searches for large extra dimensions at the Large Hadron Collider (CERN) via microscopic graviton leakage.'
    ],
    whatRemainsUnknown: [
      'Whether the Many-Worlds interpretation or objective collapse (e.g. GRW) reflects physical reality.',
      'Whether the multiverse is a necessary consequence of eternal inflation or a mathematical artifact.'
    ],
    citations: [
      { title: 'The Many-Worlds Interpretation of Quantum Mechanics', institution: 'Stanford Encyclopedia of Philosophy', year: 2023, description: 'Rigorous philosophical and mathematical treatment of unitary quantum theory.' },
      { title: 'Inflation and the Multiverse', institution: 'Cambridge University Press', year: 2022, description: 'Theoretical cosmology, eternal inflation, and empirical testability limits.' }
    ],
    relatedTopics: ['relativity-spacetime', 'quantum-physics', 'multiverse-hypotheses'],
    accentColor: '#f43f5e'
  }
];
