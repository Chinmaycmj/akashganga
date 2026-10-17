import {
  calculateJulianDay,
  calculateAyanamsha,
  calculateTropicalPlanetaryLongitudes,
  calculateAscendant,
  getRashiFromLongitude,
  getNakshatraFromLongitude,
  getNavamshaRashi,
  calculatePlanetaryDignity,
  generateKundliChart,
  bhaskaraSineApproximation,
  getAryabhataSineTable,
  solveKuttaka,
  calculateYugaDurations
} from '../src/utils/vedicAstronomyMath';
import { NAVAGRAHAS } from '../src/data/navagrahasData';
import { RASHIS, NAKSHATRAS } from '../src/data/rashiNakshatraData';
import { CURRICULUM_STAGES } from '../src/data/curriculumData';
import { TEXTUAL_SOURCES } from '../src/data/textualLibraryData';
import { TRADITIONAL_COSMIC_EPOCHS, MODERN_COSMIC_EPOCHS } from '../src/data/cosmicTimeData';
import * as fs from 'fs';
import * as path from 'path';

let passedTests = 0;
let totalTests = 0;

function assert(condition: unknown, testName: string, details?: string) {
  totalTests++;
  if (Boolean(condition)) {
    passedTests++;
    console.log(`  ✓ ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName} ${details ? `(${details})` : ''}`);
    process.exitCode = 1;
  }
}

console.log('\n========================================================================');
console.log('🕉️ THE INFINITE COSMOS — VEDIC ASTRONOMY & MATHEMATICS VERIFICATION SUITE');
console.log('========================================================================\n');

// ----------------------------------------------------
// SECTION 1: EPHEMERIS & SIDEREAL ASTRONOMY MATHEMATICS
// ----------------------------------------------------
console.log('--- SECTION 1: EPHEMERIS & SIDEREAL ASTRONOMY MATHEMATICS ---');

// 1.1 Julian Day computation for J2000.0 (2000-01-01 12:00:00 UTC)
const jd2000 = calculateJulianDay(2000, 1, 1, 12, 0, 0);
assert(
  Math.abs(jd2000 - 2451545.0) < 0.0001,
  `Julian Day of J2000.0 epoch: got ${jd2000} (expected 2451545.0)`
);

// 1.2 Lahiri Ayanamsha at J2000.0 (~23° 51' 25" = 23.8571°)
const lahiri2000 = calculateAyanamsha(jd2000, 'Lahiri');
assert(
  Math.abs(lahiri2000 - 23.8571) < 0.05,
  `Lahiri Ayanamsha at J2000.0: got ${lahiri2000.toFixed(4)}° (expected ~23.8571°)`
);

// 1.3 Raman Ayanamsha offset check
const raman2000 = calculateAyanamsha(jd2000, 'Raman');
assert(
  Math.abs(raman2000 - (lahiri2000 - 1.40833)) < 0.001,
  `Raman Ayanamsha offset: got ${raman2000.toFixed(4)}°`
);

// 1.4 KP Ayanamsha offset check
const kp2000 = calculateAyanamsha(jd2000, 'Krishnamurti');
assert(
  Math.abs(kp2000 - (lahiri2000 - 0.1000)) < 0.001,
  `KP Ayanamsha offset: got ${kp2000.toFixed(4)}°`
);

// 1.5 Ascendant (Lagna) calculation for Ujjain (Lat 23.18° N, Lon 75.79° E)
const { tropicalAscendantDeg } = calculateAscendant(jd2000, 23.1765, 75.7885);
assert(
  tropicalAscendantDeg >= 0 && tropicalAscendantDeg < 360,
  `Ascendant calculated within [0, 360) range: ${tropicalAscendantDeg.toFixed(2)}°`
);

// 1.6 Full Chart Generator verification
const sampleChart = generateKundliChart(2024, 10, 17, 12, 0, 23.1765, 75.7885, 'Ujjain', 'Lahiri');
assert(sampleChart.planets.length === 9, `Chart contains all 9 Navagrahas: found ${sampleChart.planets.length}`);
assert(sampleChart.bhavas.length === 12, `Chart contains all 12 Bhavas: found ${sampleChart.bhavas.length}`);
assert(sampleChart.lagnaRashiIndex >= 1 && sampleChart.lagnaRashiIndex <= 12, `Lagna Rashi index is valid (1-12)`);


// ----------------------------------------------------
// SECTION 2: ANCIENT MATHEMATICS ALGORITHMS
// ----------------------------------------------------
console.log('\n--- SECTION 2: ANCIENT MATHEMATICS ALGORITHMS ---');

// 2.1 Bhaskara I Sine Approximation Formula (<1% relative error across [0, π])
const testAnglesDeg = [0, 15, 30, 45, 60, 75, 90, 120, 150, 180];
testAnglesDeg.forEach((deg) => {
  const rad = (deg * Math.PI) / 180;
  const res = bhaskaraSineApproximation(rad);
  assert(
    res.relativeErrorPercent < 1.0,
    `Bhaskara I sin(${deg}°): approx = ${res.approximateSine.toFixed(4)}, exact = ${res.exactSine.toFixed(4)}, relError = ${res.relativeErrorPercent.toFixed(3)}%`
  );
});

// 2.2 Aryabhata's 24-step Sine Table
const aryabhataTable = getAryabhataSineTable();
assert(aryabhataTable.length === 24, `Aryabhata sine table contains exactly 24 steps`);
aryabhataTable.forEach((row) => {
  assert(
    row.errorMinutes <= 2.0,
    `Aryabhata Step #${row.step} (${row.arcDegrees}): Jya = ${row.aryabhataJya}', Exact = ${row.exactModernJya}', Error = ${row.errorMinutes}'`
  );
});

// 2.3 Kuttaka Linear Diophantine Equation Solver (ax - by = c)
// Classic Aryabhatan test case: 137x - 60y = 1
const kuttakaSol = solveKuttaka(137, 60, 1);
assert(kuttakaSol.hasSolution, `Kuttaka found solution for 137x - 60y = 1`);
if (kuttakaSol.hasSolution && kuttakaSol.x !== undefined && kuttakaSol.y !== undefined) {
  const check = 137 * kuttakaSol.x - 60 * kuttakaSol.y;
  assert(check === 1, `Kuttaka solution verified: 137(${kuttakaSol.x}) - 60(${kuttakaSol.y}) = ${check}`);
}

// 2.4 Traditional Yuga & Kalpa Arithmetic
const yugas = calculateYugaDurations();
assert(yugas.kaliYugaYears === 432000, `Kali Yuga = 432,000 years`);
assert(yugas.dvaparaYugaYears === 864000, `Dvapara Yuga = 864,000 years`);
assert(yugas.tretaYugaYears === 1296000, `Treta Yuga = 1,296,000 years`);
assert(yugas.satyaYugaYears === 1728000, `Satya Yuga = 1,728,000 years`);
assert(yugas.mahayugaYears === 4320000, `Mahayuga = 4,320,000 years`);
assert(yugas.kalpaYears === 4320000000, `Kalpa = 4,320,000,000 years (4.32 billion years)`);


// ----------------------------------------------------
// SECTION 3: RASHI & NAKSHATRA INTEGRITY (108 PADAS)
// ----------------------------------------------------
console.log('\n--- SECTION 3: RASHI & NAKSHATRA INTEGRITY (108 PADAS) ---');

assert(RASHIS.length === 12, `Exactly 12 Rashis defined: found ${RASHIS.length}`);
RASHIS.forEach((rashi, i) => {
  const expectedId = i + 1;
  assert(rashi.id === expectedId, `Rashi #${expectedId} id matches index`);
  assert(rashi.longitudeStartDeg === (expectedId - 1) * 30, `Rashi #${expectedId} start deg is ${(expectedId - 1) * 30}°`);
  assert(rashi.longitudeEndDeg === expectedId * 30, `Rashi #${expectedId} end deg is ${expectedId * 30}°`);
  assert(Boolean(rashi.rulingPlanetId && rashi.element && rashi.symbol), `Rashi #${expectedId} has complete metadata`);
});

assert(NAKSHATRAS.length === 27, `Exactly 27 Nakshatras defined: found ${NAKSHATRAS.length}`);
let totalPadas = 0;
NAKSHATRAS.forEach((nak, i) => {
  const expectedId = i + 1;
  assert(nak.id === expectedId, `Nakshatra #${expectedId} (${nak.name}) id matches index`);
  assert(nak.padas && nak.padas.length === 4, `Nakshatra #${expectedId} has exactly 4 padas`);
  totalPadas += nak.padas.length;
  assert(Boolean(nak.deity && nak.shakti && nak.associatedStars), `Nakshatra #${expectedId} has deity and stars`);
});
assert(totalPadas === 108, `Total Nakshatra Padas across 360° is exactly 108 (found ${totalPadas})`);

// Longitude conversion tests
const spicaCoord = getNakshatraFromLongitude(180.0);
assert(spicaCoord.nakshatraName === 'Chitra', `Longitude 180° corresponds to Chitra (got ${spicaCoord.nakshatraName})`);
assert(spicaCoord.pada === 3, `Longitude 180° corresponds to Chitra Pada 3 (got Pada ${spicaCoord.pada})`);

const navamshaSpica = getNavamshaRashi(7, 0.0); // 0° Tula
assert(navamshaSpica.navamshaRashiName.includes('Tula'), `0° Tula maps to Tula in D-9 Navamsha`);


// ----------------------------------------------------
// SECTION 4: 9 NAVAGRAHAS INTEGRITY
// ----------------------------------------------------
console.log('\n--- SECTION 4: 9 NAVAGRAHAS INTEGRITY ---');

assert(NAVAGRAHAS.length === 9, `Exactly 9 Navagrahas defined: found ${NAVAGRAHAS.length}`);
NAVAGRAHAS.forEach((graha) => {
  assert(Boolean(graha.id && graha.sanskritName && graha.englishName), `Graha [${graha.id}] has valid identity`);
  assert(Boolean(graha.devanagari && graha.iast), `Graha [${graha.id}] has Devanagari and IAST`);
  assert(graha.aspects && graha.aspects.length >= 1, `Graha [${graha.id}] has aspects defined`);
  assert(Boolean(graha.gemstone && graha.mantra), `Graha [${graha.id}] has gemstone and mantra`);
  assert(Boolean(graha.exaltationRashi && graha.debilitationRashi), `Graha [${graha.id}] has exaltation/debilitation`);
});

// Epistemic distinction check: Rahu and Ketu must NOT be physical planets
const rahu = NAVAGRAHAS.find(g => g.id === 'rahu');
const ketu = NAVAGRAHAS.find(g => g.id === 'ketu');
assert(Boolean(rahu && !rahu.isPhysicalPlanet), `Rahu accurately marked as non-physical planet (mathematical node)`);
assert(Boolean(ketu && !ketu.isPhysicalPlanet), `Ketu accurately marked as non-physical planet (mathematical node)`);


// ----------------------------------------------------
// SECTION 5: CURRICULUM & TEXTUAL SOURCES INTEGRITY
// ----------------------------------------------------
console.log('\n--- SECTION 5: CURRICULUM & TEXTUAL SOURCES INTEGRITY ---');

assert(CURRICULUM_STAGES.length === 10, `Curriculum has all 10 stages: found ${CURRICULUM_STAGES.length}`);
CURRICULUM_STAGES.forEach((stage, i) => {
  const expectedNum = i + 1;
  assert(stage.stageNumber === expectedNum, `Curriculum Stage #${expectedNum} matches index`);
  assert(stage.learningObjectives.length >= 3, `Stage #${expectedNum} has at least 3 learning objectives`);
  assert(Boolean(stage.misconceptionAlert?.misconception), `Stage #${expectedNum} has misconception check`);
  assert(stage.quiz && stage.quiz.length >= 1, `Stage #${expectedNum} has mastery quiz`);
  stage.quiz.forEach((q, qIdx) => {
    assert(
      q.correctAnswer >= 0 && q.correctAnswer < q.options.length,
      `Stage #${expectedNum} Q#${qIdx+1} has valid correctAnswer index`
    );
  });
});

assert(TEXTUAL_SOURCES.length >= 5, `Textual Library has at least 5 scholarly sources: found ${TEXTUAL_SOURCES.length}`);
TEXTUAL_SOURCES.forEach((src) => {
  assert(Boolean(src.id && src.title && src.authorOrAttribution), `Textual source [${src.id}] has metadata`);
  assert(Boolean(src.sanskritDevanagari && src.iastTransliteration), `Textual source [${src.id}] has verified Sanskrit & IAST`);
  assert(Boolean(src.englishTranslation && src.translatorAttribution), `Textual source [${src.id}] has attributed translation`);
});

assert(TRADITIONAL_COSMIC_EPOCHS.length >= 8, `At least 8 traditional cosmic epochs in database`);
assert(MODERN_COSMIC_EPOCHS.length >= 9, `At least 9 modern cosmic epochs in database`);


// ----------------------------------------------------
// SECTION 6: ROUTE FILES EXISTENCE
// ----------------------------------------------------
console.log('\n--- SECTION 6: ROUTE FILES EXISTENCE ---');

const expectedRoutes = [
  'navagraha',
  'rashi-nakshatra',
  'chart-lab',
  'ancient-math',
  'cosmic-time',
  'library',
  'curriculum',
  'tutor'
];

expectedRoutes.forEach((route) => {
  const filePath = path.resolve(__dirname, `../src/app/${route}/page.tsx`);
  const exists = fs.existsSync(filePath);
  assert(exists, `Route file exists: /${route}/page.tsx`);
});


// ----------------------------------------------------
// SUMMARY
// ----------------------------------------------------
console.log('\n========================================================================');
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${totalTests - passedTests}`);
console.log('========================================================================\n');

if (passedTests === totalTests) {
  console.log('🎉 ALL VEDIC COSMOLOGY, JYOTISHA & MATHEMATICAL TESTS PASSED!\n');
} else {
  console.error('❌ SOME TESTS FAILED!\n');
  process.exit(1);
}
