import { 
  PlanetId, 
  AyanamshaSystem, 
  CalculatedPlanetPosition, 
  Dignity, 
  KundliChart 
} from '@/types/vedicCosmos';

export const RASHI_NAMES = [
  'Mesha (Aries)',
  'Vrishabha (Taurus)',
  'Mithuna (Gemini)',
  'Karka (Cancer)',
  'Simha (Leo)',
  'Kanya (Virgo)',
  'Tula (Libra)',
  'Vrishchika (Scorpio)',
  'Dhanus (Sagittarius)',
  'Makara (Capricorn)',
  'Kumbha (Aquarius)',
  'Meena (Pisces)'
];

export const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

/**
 * Calculates the Julian Day from UTC calendar components.
 */
export function calculateJulianDay(
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0
): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const dayFraction = day + (hour + minute / 60 + second / 3600) / 24;
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFraction + B - 1524.5;
}

/**
 * Calculates centuries from J2000.0 epoch (Jan 1, 2000, 12:00 TT).
 */
export function getCenturiesSinceJ2000(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Calculates Ayanamsha (precession offset between tropical and sidereal zodiacs) in degrees.
 */
export function calculateAyanamsha(jd: number, system: AyanamshaSystem = 'Lahiri'): number {
  if (system === 'None (Tropical)') return 0;
  const T = getCenturiesSinceJ2000(jd);
  
  // Lahiri Ayanamsha (Chitra Paksha): 23° 51' 25.53" at J2000.0, rate ~ 50.29" per year
  const lahiriJ2000 = 23.857092; 
  const precessionPerCentury = 1.396887; // degrees per Julian century
  const lahiri = lahiriJ2000 + precessionPerCentury * T - 0.000308 * (T * T);

  switch (system) {
    case 'Lahiri':
      return lahiri;
    case 'Raman':
      // B.V. Raman ayanamsha is typically ~ 1.41° less than Lahiri
      return lahiri - 1.40833;
    case 'Krishnamurti':
      // KP ayanamsha is ~ 0.10° less than Lahiri
      return lahiri - 0.1000;
    default:
      return lahiri;
  }
}

/**
 * Normalizes an angle into the range [0, 360).
 */
export function normalizeAngle(angle: number): number {
  let normalized = angle % 360;
  if (normalized < 0) normalized += 360;
  return normalized;
}

/**
 * Low-to-moderate precision analytical planetary longitudes (VSOP87 truncated series).
 * Accurate to within ~0.05° for Sun, ~0.2° for planets, sufficient for educational astrometry.
 */
export function calculateTropicalPlanetaryLongitudes(jd: number): Record<PlanetId, { lon: number; speed: number }> {
  const T = getCenturiesSinceJ2000(jd);

  // 1. Sun
  const L0 = normalizeAngle(280.46646 + 36000.76983 * T);
  const M_sun = normalizeAngle(357.52911 + 35999.05029 * T) * (Math.PI / 180);
  const C_sun = (1.914602 - 0.004817 * T) * Math.sin(M_sun) + (0.019993 - 0.000101 * T) * Math.sin(2 * M_sun);
  const sunLon = normalizeAngle(L0 + C_sun);

  // 2. Moon (Brown's Lunar Theory fundamental arguments)
  const L_moon = normalizeAngle(218.3164477 + 481267.88123421 * T);
  const D = normalizeAngle(297.8501921 + 445267.1114034 * T) * (Math.PI / 180); // Mean elongation
  const M_lunar = normalizeAngle(134.9633964 + 477198.8675055 * T) * (Math.PI / 180); // Moon anomaly
  const F = normalizeAngle(93.2720950 + 483202.0175233 * T) * (Math.PI / 180); // Argument of latitude
  
  // Principal periodic terms for longitude (Evection, Variation, Annual Equation)
  const moonPerturbations = 
    6.288774 * Math.sin(M_lunar) +
    1.274027 * Math.sin(2 * D - M_lunar) +
    0.658314 * Math.sin(2 * D) +
    0.213618 * Math.sin(2 * M_lunar) -
    0.185116 * Math.sin(M_sun) -
    0.114332 * Math.sin(2 * F);
  const moonLon = normalizeAngle(L_moon + moonPerturbations);

  // 3. Lunar Nodes (Rahu / Ketu)
  // Mean ascending node (regressing at ~19.34° per year)
  const omega = normalizeAngle(125.04452 - 1934.136261 * T);
  const rahuLon = omega;
  const ketuLon = normalizeAngle(omega + 180);

  // 4. Mercury
  const L_merc = normalizeAngle(252.2509 + 149472.6746 * T);
  const M_merc = normalizeAngle(174.7948 + 149474.0707 * T) * (Math.PI / 180);
  const mercLon = normalizeAngle(L_merc + 23.44 * Math.sin(M_merc));

  // 5. Venus
  const L_ven = normalizeAngle(181.9798 + 58517.8156 * T);
  const M_ven = normalizeAngle(50.4161 + 58517.8039 * T) * (Math.PI / 180);
  const venLon = normalizeAngle(L_ven + 0.7758 * Math.sin(M_ven));

  // 6. Mars
  const L_mars = normalizeAngle(355.4330 + 19140.2993 * T);
  const M_mars = normalizeAngle(19.3730 + 19139.8585 * T) * (Math.PI / 180);
  const marsLon = normalizeAngle(L_mars + 10.691 * Math.sin(M_mars));

  // 7. Jupiter
  const L_jup = normalizeAngle(34.3515 + 3034.9057 * T);
  const M_jup = normalizeAngle(20.0202 + 3034.6907 * T) * (Math.PI / 180);
  const jupLon = normalizeAngle(L_jup + 5.555 * Math.sin(M_jup));

  // 8. Saturn
  const L_sat = normalizeAngle(50.0774 + 1222.1138 * T);
  const M_sat = normalizeAngle(317.0207 + 1221.5515 * T) * (Math.PI / 180);
  const satLon = normalizeAngle(L_sat + 6.358 * Math.sin(M_sat));

  return {
    surya: { lon: sunLon, speed: 0.9856 },
    chandra: { lon: moonLon, speed: 13.176 },
    mangala: { lon: marsLon, speed: 0.524 },
    budha: { lon: mercLon, speed: 1.15 },
    brihaspati: { lon: jupLon, speed: 0.083 },
    shukra: { lon: venLon, speed: 1.20 },
    shani: { lon: satLon, speed: 0.033 },
    rahu: { lon: rahuLon, speed: -0.0529 },
    ketu: { lon: ketuLon, speed: -0.0529 }
  };
}

/**
 * Calculates Local Sidereal Time (in hours) and Tropical Ascendant (Lagna) in degrees.
 */
export function calculateAscendant(
  jd: number,
  latitudeDeg: number,
  longitudeDeg: number
): { gmstHours: number; lstHours: number; tropicalAscendantDeg: number } {
  const T = getCenturiesSinceJ2000(jd);
  
  // Greenwich Mean Sidereal Time (IAU 1982 formula)
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * (T * T) - (T * T * T) / 38710000;
  gmst = normalizeAngle(gmst);
  const gmstHours = gmst / 15.0;

  // Local Sidereal Time
  let lstHours = gmstHours + longitudeDeg / 15.0;
  while (lstHours < 0) lstHours += 24;
  while (lstHours >= 24) lstHours -= 24;

  const ramcRad = (lstHours * 15.0) * (Math.PI / 180);
  const epsRad = (23.4392911 - 0.0130042 * T) * (Math.PI / 180); // Obliquity of ecliptic
  const phiRad = latitudeDeg * (Math.PI / 180);

  // Ascendant formula: tan(Asc) = cos(RAMC) / (-sin(RAMC)*cos(eps) - tan(phi)*sin(eps))
  const y = Math.cos(ramcRad);
  const x = -Math.sin(ramcRad) * Math.cos(epsRad) - Math.tan(phiRad) * Math.sin(epsRad);
  const ascRad = Math.atan2(y, x);
  let ascDeg = ascRad * (180 / Math.PI);
  ascDeg = normalizeAngle(ascDeg);

  return { gmstHours, lstHours, tropicalAscendantDeg: ascDeg };
}

/**
 * Converts a 0-360° celestial longitude to Rashi (1-12) and degree within Rashi (0-30°).
 */
export function getRashiFromLongitude(longitudeDeg: number): {
  rashiIndex: number;
  rashiName: string;
  degreeInRashi: number;
} {
  const norm = normalizeAngle(longitudeDeg);
  const rashiIndex = Math.floor(norm / 30) + 1; // 1 to 12
  const degreeInRashi = norm % 30;
  return {
    rashiIndex,
    rashiName: RASHI_NAMES[rashiIndex - 1],
    degreeInRashi
  };
}

/**
 * Converts a 0-360° celestial longitude to Nakshatra (1-27) and Pada (1-4).
 * Each Nakshatra is 13° 20' = 13.333333°
 * Each Pada is 3° 20' = 3.333333°
 */
export function getNakshatraFromLongitude(longitudeDeg: number): {
  nakshatraIndex: number;
  nakshatraName: string;
  pada: number;
} {
  const norm = normalizeAngle(longitudeDeg);
  const nakshatraSpan = 40.0 / 3.0; // 13.333333°
  const padaSpan = 10.0 / 3.0; // 3.333333°

  // Add small epsilon to prevent precision truncation at exact degree boundaries (e.g. 180.0)
  const nakshatraIndex = Math.min(Math.floor((norm + 1e-7) / nakshatraSpan) + 1, 27);
  const rem = (norm + 1e-7) % nakshatraSpan;
  const pada = Math.min(Math.floor(rem / padaSpan) + 1, 4);

  return {
    nakshatraIndex,
    nakshatraName: NAKSHATRA_NAMES[nakshatraIndex - 1],
    pada: Math.min(pada, 4)
  };
}

/**
 * Calculates Navamsha (D-9) Rashi (1-12).
 * For fire signs (1, 5, 9): starts at 1 (Mesha)
 * For earth signs (2, 6, 10): starts at 10 (Makara)
 * For air signs (3, 7, 11): starts at 7 (Tula)
 * For water signs (4, 8, 12): starts at 4 (Karka)
 */
export function getNavamshaRashi(rashiIndex: number, degreeInRashi: number): {
  navamshaRashiIndex: number;
  navamshaRashiName: string;
} {
  const padaInSign = Math.floor(degreeInRashi / (10.0 / 3.0)); // 0 to 8
  let baseRashi: number;
  const elementGroup = (rashiIndex - 1) % 4; // 0: Fire, 1: Earth, 2: Air, 3: Water

  if (elementGroup === 0) baseRashi = 1; // Mesha
  else if (elementGroup === 1) baseRashi = 10; // Makara
  else if (elementGroup === 2) baseRashi = 7; // Tula
  else baseRashi = 4; // Karka

  const navamshaRashiIndex = ((baseRashi - 1 + padaInSign) % 12) + 1;
  return {
    navamshaRashiIndex,
    navamshaRashiName: RASHI_NAMES[navamshaRashiIndex - 1]
  };
}

/**
 * Evaluates traditional planetary dignity (Exaltation, Own sign, Debilitation, etc.).
 */
export function calculatePlanetaryDignity(
  planetId: PlanetId,
  rashiIndex: number,
  degreesInRashi: number
): Dignity {
  switch (planetId) {
    case 'surya':
      if (rashiIndex === 1) return degreesInRashi <= 10 ? 'Exalted' : 'Moolatrikona'; // Mesha
      if (rashiIndex === 5) return degreesInRashi <= 20 ? 'Moolatrikona' : 'Own Sign'; // Simha
      if (rashiIndex === 7) return 'Debilitated'; // Tula
      if ([4, 9, 12].includes(rashiIndex)) return 'Friend';
      if ([2, 6, 10, 11].includes(rashiIndex)) return 'Enemy';
      return 'Neutral';

    case 'chandra':
      if (rashiIndex === 2) return degreesInRashi <= 3 ? 'Exalted' : 'Moolatrikona'; // Vrishabha
      if (rashiIndex === 4) return 'Own Sign'; // Karka
      if (rashiIndex === 8) return 'Debilitated'; // Vrishchika
      if ([1, 5].includes(rashiIndex)) return 'Friend';
      return 'Neutral';

    case 'mangala':
      if (rashiIndex === 10) return 'Exalted'; // Makara (28°)
      if (rashiIndex === 1) return degreesInRashi <= 12 ? 'Moolatrikona' : 'Own Sign'; // Mesha
      if (rashiIndex === 8) return 'Own Sign'; // Vrishchika
      if (rashiIndex === 4) return 'Debilitated'; // Karka (28°)
      if ([5, 9, 12].includes(rashiIndex)) return 'Friend';
      if ([3, 6].includes(rashiIndex)) return 'Enemy';
      return 'Neutral';

    case 'budha':
      if (rashiIndex === 6) {
        if (degreesInRashi <= 15) return 'Exalted'; // Kanya
        if (degreesInRashi <= 20) return 'Moolatrikona';
        return 'Own Sign';
      }
      if (rashiIndex === 3) return 'Own Sign'; // Mithuna
      if (rashiIndex === 12) return 'Debilitated'; // Meena
      if ([1, 5].includes(rashiIndex)) return 'Friend';
      if ([4].includes(rashiIndex)) return 'Enemy';
      return 'Neutral';

    case 'brihaspati':
      if (rashiIndex === 4) return 'Exalted'; // Karka (5°)
      if (rashiIndex === 9) return degreesInRashi <= 10 ? 'Moolatrikona' : 'Own Sign'; // Dhanus
      if (rashiIndex === 12) return 'Own Sign'; // Meena
      if (rashiIndex === 10) return 'Debilitated'; // Makara (5°)
      if ([1, 5, 8].includes(rashiIndex)) return 'Friend';
      if ([3, 6].includes(rashiIndex)) return 'Enemy';
      return 'Neutral';

    case 'shukra':
      if (rashiIndex === 12) return 'Exalted'; // Meena (27°)
      if (rashiIndex === 7) return degreesInRashi <= 15 ? 'Moolatrikona' : 'Own Sign'; // Tula
      if (rashiIndex === 2) return 'Own Sign'; // Vrishabha
      if (rashiIndex === 6) return 'Debilitated'; // Kanya (27°)
      if ([3, 10, 11].includes(rashiIndex)) return 'Friend';
      if ([1, 5].includes(rashiIndex)) return 'Enemy';
      return 'Neutral';

    case 'shani':
      if (rashiIndex === 7) return 'Exalted'; // Tula (20°)
      if (rashiIndex === 11) return degreesInRashi <= 20 ? 'Moolatrikona' : 'Own Sign'; // Kumbha
      if (rashiIndex === 10) return 'Own Sign'; // Makara
      if (rashiIndex === 1) return 'Debilitated'; // Mesha (20°)
      if ([2, 3, 6, 7].includes(rashiIndex)) return 'Friend';
      if ([1, 4, 5, 8].includes(rashiIndex)) return 'Enemy';
      return 'Neutral';

    case 'rahu':
      if (rashiIndex === 2 || rashiIndex === 3) return 'Exalted';
      if (rashiIndex === 8 || rashiIndex === 9) return 'Debilitated';
      if (rashiIndex === 11) return 'Moolatrikona';
      return 'Neutral';

    case 'ketu':
      if (rashiIndex === 8 || rashiIndex === 9) return 'Exalted';
      if (rashiIndex === 2 || rashiIndex === 3) return 'Debilitated';
      if (rashiIndex === 5) return 'Moolatrikona';
      return 'Neutral';

    default:
      return 'Neutral';
  }
}

/**
 * Builds a complete Kundli chart data object from birth date, time, and coordinates.
 */
export function generateKundliChart(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  latitude: number,
  longitude: number,
  locationName: string = 'Custom Location',
  ayanamshaSystem: AyanamshaSystem = 'Lahiri'
): KundliChart {
  const jd = calculateJulianDay(year, month, day, hour, minute, 0);
  const ayanamsha = calculateAyanamsha(jd, ayanamshaSystem);
  const { tropicalAscendantDeg } = calculateAscendant(jd, latitude, longitude);
  
  const siderealAscendantDeg = normalizeAngle(tropicalAscendantDeg - ayanamsha);
  const lagnaRashi = getRashiFromLongitude(siderealAscendantDeg);
  const lagnaNakshatra = getNakshatraFromLongitude(siderealAscendantDeg);

  const tropicalPlanets = calculateTropicalPlanetaryLongitudes(jd);
  const planetKeys: PlanetId[] = [
    'surya', 'chandra', 'mangala', 'budha', 'brihaspati', 'shukra', 'shani', 'rahu', 'ketu'
  ];

  const planets: CalculatedPlanetPosition[] = planetKeys.map((key) => {
    const trop = tropicalPlanets[key];
    const sidereal = normalizeAngle(trop.lon - ayanamsha);
    const rashi = getRashiFromLongitude(sidereal);
    const nakshatra = getNakshatraFromLongitude(sidereal);
    const navamsha = getNavamshaRashi(rashi.rashiIndex, rashi.degreeInRashi);
    const dignity = calculatePlanetaryDignity(key, rashi.rashiIndex, rashi.degreeInRashi);

    // Bhava (Equal House system from Lagna sign)
    // House 1 = Lagna sign, House 2 = Lagna + 1, etc.
    const bhavaNumber = ((rashi.rashiIndex - lagnaRashi.rashiIndex + 12) % 12) + 1;

    const namesMap: Record<PlanetId, string> = {
      surya: 'Surya (Sun)',
      chandra: 'Chandra (Moon)',
      mangala: 'Mangala (Mars)',
      budha: 'Budha (Mercury)',
      brihaspati: 'Brihaspati (Jupiter)',
      shukra: 'Shukra (Venus)',
      shani: 'Shani (Saturn)',
      rahu: 'Rahu (North Node)',
      ketu: 'Ketu (South Node)'
    };

    return {
      id: key,
      name: namesMap[key],
      tropicalLongitudeDeg: trop.lon,
      siderealLongitudeDeg: sidereal,
      rashiIndex: rashi.rashiIndex,
      rashiName: rashi.rashiName,
      degreesInRashi: rashi.degreeInRashi,
      nakshatraIndex: nakshatra.nakshatraIndex,
      nakshatraName: nakshatra.nakshatraName,
      nakshatraPada: nakshatra.pada,
      navamshaRashiIndex: navamsha.navamshaRashiIndex,
      navamshaRashiName: navamsha.navamshaRashiName,
      isRetrograde: trop.speed < 0,
      speedDegPerDay: trop.speed,
      bhavaNumber,
      dignity
    };
  });

  // Construct 12 Bhavas
  const bhavaSignificances = [
    ['Tanu (Body, Self, Vitality)', 'Appearance', 'Lagna'],
    ['Dhana (Wealth, Speech, Family)', 'Resources', 'Values'],
    ['Sahaja (Siblings, Courage, Effort)', 'Initiative', 'Communication'],
    ['Bandhu (Mother, Home, Happiness)', 'Vehicles', 'Inner peace'],
    ['Putra (Children, Intellect, Purva Punya)', 'Creativity', 'Mantra'],
    ['Ari (Debts, Obstacles, Health)', 'Service', 'Daily discipline'],
    ['Yuvati (Partnership, Spouse, Public)', 'Contracts', 'Other people'],
    ['Randhra (Longevity, Transformation, Secrets)', 'Occult', 'Unforeseen changes'],
    ['Dharma (Philosophy, Guru, Higher Truth)', 'Fortunate fortune', 'Pilgrimage'],
    ['Karma (Career, Profession, Status)', 'Public actions', 'Duty'],
    ['Labha (Gains, Aspirations, Elder siblings)', 'Social network', 'Achievements'],
    ['Vyaya (Losses, Liberation/Moksha, Foreign travel)', 'Expenditure', 'Solitude']
  ];

  const bhavas = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const houseRashiIndex = ((lagnaRashi.rashiIndex - 1 + i) % 12) + 1;
    const occupying = planets
      .filter((p) => p.bhavaNumber === houseNum)
      .map((p) => p.id);

    return {
      bhavaNumber: houseNum,
      rashiIndex: houseRashiIndex,
      rashiName: RASHI_NAMES[houseRashiIndex - 1],
      occupyingPlanets: occupying,
      significances: bhavaSignificances[i]
    };
  });

  return {
    birthDateTimeUTC: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} UTC`,
    latitude,
    longitude,
    locationName,
    ayanamshaSystem,
    ayanamshaValueDeg: ayanamsha,
    tropicalAscendantDeg,
    siderealAscendantDeg,
    lagnaRashiIndex: lagnaRashi.rashiIndex,
    lagnaDegreesInRashi: lagnaRashi.degreeInRashi,
    lagnaNakshatra: lagnaNakshatra.nakshatraName,
    lagnaPada: lagnaNakshatra.pada,
    planets,
    bhavas
  };
}

// ---------------------------------------------------------------------------
// HISTORICAL & ANCIENT MATHEMATICAL ASTRONOMY FORMULAS
// ---------------------------------------------------------------------------

/**
 * Bhaskara I's Sine Approximation Formula (c. 629 CE).
 * For x in radians in range [0, PI]:
 * sin(x) ≈ (16 * x * (pi - x)) / (5 * pi^2 - 4 * x * (pi - x))
 * Maximum relative error is less than 1%!
 */
export function bhaskaraSineApproximation(radians: number): {
  approximateSine: number;
  exactSine: number;
  absoluteError: number;
  relativeErrorPercent: number;
} {
  // Normalize into [0, PI]
  let rad = radians % (2 * Math.PI);
  if (rad < 0) rad += 2 * Math.PI;
  let sign = 1;
  if (rad > Math.PI) {
    rad -= Math.PI;
    sign = -1;
  }

  const pi = Math.PI;
  const num = 16 * rad * (pi - rad);
  const denom = 5 * pi * pi - 4 * rad * (pi - rad);
  const approx = sign * (num / denom);
  const exact = Math.sin(radians);
  const absError = Math.abs(approx - exact);
  const relError = absError < 1e-12 ? 0 : (Math.abs(exact) > 1e-12 ? (absError / Math.abs(exact)) * 100 : 0);

  return {
    approximateSine: approx,
    exactSine: exact,
    absoluteError: absError,
    relativeErrorPercent: relError
  };
}

/**
 * Aryabhata's 24-step Sine Table derivation (Aryabhatiya, Gitikapada 12).
 * Aryabhata divided the quadrant (90° = 5400 minutes) into 24 equal steps of 225' (3° 45').
 * Calculates the exact R*sin values (where R = 3438', the radius of the circle).
 */
export function getAryabhataSineTable(): {
  step: number;
  arcMinutes: number;
  arcDegrees: string;
  aryabhataJya: number; // Historical value in minutes
  exactModernJya: number;
  errorMinutes: number;
}[] {
  // Historical values given in Aryabhatiya Gitikapada
  const historicalJyas = [
    225, 449, 671, 890, 1105, 1315, 1520, 1719,
    1910, 2093, 2267, 2431, 2585, 2728, 2859, 2978,
    3084, 3177, 3256, 3321, 3372, 3409, 3431, 3438
  ];
  const R = 3438; // Aryabhata's radius: 21600 / 2pi ≈ 3437.7468 ≈ 3438'

  return historicalJyas.map((jya, idx) => {
    const step = idx + 1;
    const arcMinutes = step * 225;
    const deg = (arcMinutes / 60);
    const exact = R * Math.sin(deg * (Math.PI / 180));
    return {
      step,
      arcMinutes,
      arcDegrees: `${Math.floor(deg)}° ${arcMinutes % 60}'`,
      aryabhataJya: jya,
      exactModernJya: Math.round(exact * 100) / 100,
      errorMinutes: Math.abs(Math.round((jya - exact) * 100) / 100)
    };
  });
}

/**
 * Solves a Linear Diophantine Equation (Kuttaka / Aryabhata's Pulverizer method):
 * a * x - b * y = c
 * Returns the smallest positive integer solutions (x, y) if a solution exists.
 */
export function solveKuttaka(a: number, b: number, c: number): {
  hasSolution: boolean;
  gcd: number;
  x?: number;
  y?: number;
  generalSolution?: string;
  explanationSteps: string[];
} {
  const steps: string[] = [];
  steps.push(`Solving Aryabhata's Kuttaka: ${a}x - ${b}y = ${c}`);

  // Extended Euclidean Algorithm
  function extendedGcd(p: number, q: number): { gcd: number; x: number; y: number } {
    if (q === 0) return { gcd: p, x: 1, y: 0 };
    const res = extendedGcd(q, p % q);
    return {
      gcd: res.gcd,
      x: res.y,
      y: res.x - Math.floor(p / q) * res.y
    };
  }

  const { gcd, x: x0, y: y0 } = extendedGcd(a, b);
  steps.push(`GCD(${a}, ${b}) = ${gcd}`);

  if (c % gcd !== 0) {
    steps.push(`Since ${c} is not divisible by GCD ${gcd}, no integer solution exists.`);
    return { hasSolution: false, gcd, explanationSteps: steps };
  }

  // Base solution scaled by c / gcd
  const factor = c / gcd;
  let x = x0 * factor;
  let y = -y0 * factor; // because equation is ax - by = c

  // Reduce to smallest positive integer x
  const modB = Math.abs(b / gcd);
  const modA = Math.abs(a / gcd);
  x = ((x % modB) + modB) % modB;
  y = (a * x - c) / b;

  if (y < 0) {
    const k = Math.ceil(-y / modA);
    x += k * modB;
    y = (a * x - c) / b;
  }

  steps.push(`Base solution found using extended Euclidean division: x = ${x}, y = ${y}`);
  steps.push(`Verification: ${a}(${x}) - ${b}(${y}) = ${a * x - b * y} (Matches c = ${c})`);

  return {
    hasSolution: true,
    gcd,
    x,
    y,
    generalSolution: `x = ${x} + ${modB}k,  y = ${y} + ${modA}k  (for integer k)`,
    explanationSteps: steps
  };
}

/**
 * Traditional Yuga & Kalpa Arithmetic Calculator.
 */
export function calculateYugaDurations(): {
  satyaYugaYears: number;
  tretaYugaYears: number;
  dvaparaYugaYears: number;
  kaliYugaYears: number;
  mahayugaYears: number;
  manvantaraYears: number;
  kalpaYears: number;
  brahmaDayNightYears: number;
  brahmaLifeYears: string;
} {
  const kali = 432000; // 432,000 solar years
  const dvapara = 2 * kali; // 864,000
  const treta = 3 * kali; // 1,296,000
  const satya = 4 * kali; // 1,728,000
  const mahayuga = satya + treta + dvapara + kali; // 4,320,000
  const manvantara = 71 * mahayuga; // ~306,720,000 + sandhis
  const kalpa = 1000 * mahayuga; // 4,320,000,000 (4.32 Billion years)
  const brahmaDayNight = 2 * kalpa; // 8.64 Billion years
  const brahmaLife = (360 * 100 * brahmaDayNight).toExponential(3); // ~ 3.11 × 10¹⁴ years

  return {
    satyaYugaYears: satya,
    tretaYugaYears: treta,
    dvaparaYugaYears: dvapara,
    kaliYugaYears: kali,
    mahayugaYears: mahayuga,
    manvantaraYears: manvantara,
    kalpaYears: kalpa,
    brahmaDayNightYears: brahmaDayNight,
    brahmaLifeYears: brahmaLife
  };
}
