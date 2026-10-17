import { 
  CONSTANTS, 
  calculateSchwarzschildRadius, 
  calculateOrbitalVelocity, 
  calculateEscapeVelocity, 
  calculateKeplerPeriod, 
  calculateGravitationalDeflectionArcsec, 
  formatAstronomicalDistance, 
  toScientificNotation 
} from '../src/utils/astronomyMath';
import { COSMIC_STAGES } from '../src/data/cosmicStages';
import { ATLAS_TOPICS } from '../src/data/atlasTopics';
import { CELESTIAL_OBJECTS } from '../src/data/celestialObjects';
import { GLOSSARY_TERMS } from '../src/data/glossaryData';
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

console.log('\n======================================================');
console.log('🌌 THE INFINITE COSMOS — COMPREHENSIVE VERIFICATION SUITE');
console.log('======================================================\n');

// ----------------------------------------------------
// SECTION 1: ASTROPHYSICS & MATHEMATICAL FORMULAS
// ----------------------------------------------------
console.log('--- SECTION 1: ASTROPHYSICS & MATHEMATICAL FORMULAS ---');

// 1.1 Schwarzschild radius of 1 Solar Mass (M_sun = 1.989e30 kg)
// Expected: ~2953.2 meters (~2.95 km)
const rsSun = calculateSchwarzschildRadius(CONSTANTS.M_sun);
assert(
  Math.abs(rsSun - 2954.1) < 2.0, 
  `Schwarzschild radius of 1 Solar Mass (~2954 m): got ${rsSun.toFixed(1)} m`
);

// 1.2 Schwarzschild radius of Sagittarius A* (~4.15 million M_sun)
// Expected: ~1.226e10 meters
const sagAMass = 4.15e6 * CONSTANTS.M_sun;
const rsSagA = calculateSchwarzschildRadius(sagAMass);
assert(
  Math.abs(rsSagA - 1.226e10) < 5e7,
  `Schwarzschild radius of Sgr A* (~1.226 × 10¹⁰ m): got ${rsSagA.toExponential(3)} m`
);

// 1.3 Earth's orbital velocity around Sun (1 AU)
// Expected: ~29,780 m/s (~29.78 km/s)
const earthOrbitalVel = calculateOrbitalVelocity(CONSTANTS.M_sun, CONSTANTS.AU);
assert(
  Math.abs(earthOrbitalVel - 29780) < 100,
  `Earth orbital velocity around Sun (~29.78 km/s): got ${(earthOrbitalVel / 1000).toFixed(2)} km/s`
);

// 1.4 Escape velocity from Earth's surface
// Expected: ~11,180 m/s (~11.18 km/s)
const earthEscapeVel = calculateEscapeVelocity(CONSTANTS.M_earth, CONSTANTS.R_earth);
assert(
  Math.abs(earthEscapeVel - 11180) < 50,
  `Earth escape velocity (~11.18 km/s): got ${(earthEscapeVel / 1000).toFixed(2)} km/s`
);

// 1.5 Kepler's Third Law for 1 AU around Sun
// Expected: 1 sidereal year = 365.25 days = 3.1558e7 seconds
const yearInSeconds = calculateKeplerPeriod(CONSTANTS.M_sun, CONSTANTS.AU);
const days = yearInSeconds / (24 * 3600);
assert(
  Math.abs(days - 365.25) < 0.5,
  `Kepler 3rd Law period for 1 AU (~365.25 days): got ${days.toFixed(2)} days`
);

// 1.6 Gravitational light deflection by the Sun at limb (Eddington 1919 verification)
// Expected: ~1.750 arcseconds
const sunDeflection = calculateGravitationalDeflectionArcsec(CONSTANTS.M_sun, CONSTANTS.R_sun);
assert(
  Math.abs(sunDeflection - 1.750) < 0.05,
  `General Relativity solar deflection angle (~1.75 arcsec): got ${sunDeflection.toFixed(3)} arcsec`
);

// 1.7 Distance formatting across physical scales
const dMeters = formatAstronomicalDistance(450);
assert(dMeters.unit === 'm' && dMeters.value === '450.0', `Format meters: got ${dMeters.fullText}`);

const dKm = formatAstronomicalDistance(384400e3); // Earth-Moon distance
assert(dKm.unit === 'km', `Format Earth-Moon distance: got ${dKm.fullText}`);

const dAU = formatAstronomicalDistance(5.2 * CONSTANTS.AU); // Jupiter
assert(dAU.unit === 'AU' && dAU.value === '5.20', `Format AU: got ${dAU.fullText}`);

const dLY = formatAstronomicalDistance(4.24 * CONSTANTS.LY); // Proxima Centauri
assert(dLY.unit === 'ly' && dLY.value === '4.2', `Format light-years: got ${dLY.fullText}`);

const dMly = formatAstronomicalDistance(2.537e6 * CONSTANTS.LY); // Andromeda
assert(dMly.unit === 'Mly' && dMly.value === '2.5', `Format Megalight-years: got ${dMly.fullText}`);

const dGly = formatAstronomicalDistance(93e9 * CONSTANTS.LY); // Observable universe diameter
assert(dGly.unit === 'Gly' && dGly.value === '93.00', `Format Gigalight-years: got ${dGly.fullText}`);

// 1.8 Scientific notation formatting
const sciNotation = toScientificNotation(1.989e30);
assert(sciNotation.includes('1.99') && sciNotation.includes('10³⁰'), `Scientific notation (1.989e30): got ${sciNotation}`);


// ----------------------------------------------------
// SECTION 2: COSMIC STAGES INTEGRITY (14 STAGES)
// ----------------------------------------------------
console.log('\n--- SECTION 2: COSMIC STAGES INTEGRITY (14 STAGES) ---');

assert(COSMIC_STAGES.length === 14, `Exactly 14 cosmic stages defined: found ${COSMIC_STAGES.length}`);

COSMIC_STAGES.forEach((stage, idx) => {
  const stageNum = idx + 1;
  assert(stage.id === stageNum, `Stage #${stageNum} id matches index`);
  assert(Boolean(stage.title && stage.subtitle), `Stage #${stageNum} has title "${stage.title}" and subtitle`);
  assert(stage.scaleMeters > 0, `Stage #${stageNum} scaleMeters is strictly positive (${stage.scaleMeters} m)`);
  
  // 3-tier narrative check
  assert(
    Boolean(stage.narrative.beginner && stage.narrative.intermediate && stage.narrative.advanced),
    `Stage #${stageNum} has all 3 narrative tiers (beginner, intermediate, advanced)`
  );
  
  // Scientific facts & measurements
  assert(stage.keyFacts && stage.keyFacts.length >= 3, `Stage #${stageNum} has at least 3 key facts`);
  assert(stage.measurements && stage.measurements.length >= 2, `Stage #${stageNum} has physical measurements`);
  assert(stage.whatWeKnow && stage.whatWeKnow.length >= 1, `Stage #${stageNum} has "whatWeKnow" entries`);
  assert(stage.whatWeInvestigate && stage.whatWeInvestigate.length >= 1, `Stage #${stageNum} has "whatWeInvestigate" entries`);
  assert(stage.whatRemainsUnknown && stage.whatRemainsUnknown.length >= 1, `Stage #${stageNum} has "whatRemainsUnknown" entries`);
  
  // Scientific demarcation & citations
  assert(Boolean(stage.scientificStatus), `Stage #${stageNum} has epistemological status: "${stage.scientificStatus}"`);
  assert(stage.citations && stage.citations.length >= 1, `Stage #${stageNum} has verified academic citations`);
});

// Epistemological boundary check
const stage13 = COSMIC_STAGES[12];
assert(
  ['Current model', 'Hypothesis', 'Active research'].includes(stage13.scientificStatus),
  `Stage 13 (${stage13.title}) correctly demarcated as "${stage13.scientificStatus}"`
);

const stage14 = COSMIC_STAGES[13];
assert(
  ['Hypothesis', 'Speculative', 'Active research'].includes(stage14.scientificStatus),
  `Stage 14 (${stage14.title}) correctly demarcated as "${stage14.scientificStatus}"`
);


// ----------------------------------------------------
// SECTION 3: KNOWLEDGE ATLAS INTEGRITY
// ----------------------------------------------------
console.log('\n--- SECTION 3: KNOWLEDGE ATLAS TOPICS INTEGRITY ---');

assert(ATLAS_TOPICS.length >= 8, `At least 8 Knowledge Atlas topics: found ${ATLAS_TOPICS.length}`);

ATLAS_TOPICS.forEach((topic) => {
  assert(Boolean(topic.id && topic.title && topic.category), `Atlas topic [${topic.id}] "${topic.title}" has metadata`);
  assert(topic.sections && topic.sections.length >= 2, `Atlas topic [${topic.id}] has structured sections`);
  assert(Boolean(topic.quiz && topic.quiz.question), `Atlas topic [${topic.id}] has quiz question`);
  assert(
    topic.quiz.options && topic.quiz.options.length >= 3,
    `Atlas topic [${topic.id}] quiz has multiple choice options`
  );
  assert(
    topic.quiz.correctAnswer >= 0 && topic.quiz.correctAnswer < topic.quiz.options.length,
    `Atlas topic [${topic.id}] quiz has valid correctAnswer index (${topic.quiz.correctAnswer})`
  );
  assert(Boolean(topic.quiz.explanation), `Atlas topic [${topic.id}] quiz provides pedagogical explanation`);
});


// ----------------------------------------------------
// SECTION 4: CELESTIAL OBJECTS & GLOSSARY LEXICON
// ----------------------------------------------------
console.log('\n--- SECTION 4: CELESTIAL OBJECTS & GLOSSARY LEXICON ---');

assert(CELESTIAL_OBJECTS.length >= 10, `At least 10 celestial objects in database: found ${CELESTIAL_OBJECTS.length}`);

CELESTIAL_OBJECTS.forEach((obj) => {
  assert(Boolean(obj.id && obj.name && obj.type), `Celestial object [${obj.id}] "${obj.name}" has valid identity`);
  assert(obj.diameterKm > 0, `Celestial object [${obj.id}] has positive diameter (${obj.diameterKm} km)`);
  assert(Boolean(obj.scientificStatus), `Celestial object [${obj.id}] has scientificStatus`);
});

assert(GLOSSARY_TERMS.length >= 15, `At least 15 glossary terms: found ${GLOSSARY_TERMS.length}`);

GLOSSARY_TERMS.forEach((term) => {
  assert(Boolean(term.term && term.definition), `Glossary term "${term.term}" has definition`);
  assert(Boolean(term.pronunciation), `Glossary term "${term.term}" has phonetic pronunciation: ${term.pronunciation}`);
  assert(term.relatedStages && term.relatedStages.length > 0, `Glossary term "${term.term}" links to related stages`);
});


// ----------------------------------------------------
// SECTION 5: 8 SIGNATURE INTERACTIVE LABS VERIFICATION
// ----------------------------------------------------
console.log('\n--- SECTION 5: 8 SIGNATURE INTERACTIVE LABS VERIFICATION ---');

const expectedLabs = [
  'black-hole',
  'orbital-mechanics',
  'planet-comparison',
  'stellar-evolution',
  'spacetime-curvature',
  'cosmic-expansion',
  'dimensions-explorer',
  'multiverse'
];

expectedLabs.forEach((labSlug) => {
  const labPagePath = path.resolve(__dirname, `../src/app/labs/${labSlug}/page.tsx`);
  const exists = fs.existsSync(labPagePath);
  assert(exists, `Interactive Lab route file exists: /labs/${labSlug}/page.tsx`);
});

// Check Labs index page
const labsIndexPage = path.resolve(__dirname, '../src/app/labs/page.tsx');
assert(fs.existsSync(labsIndexPage), `Interactive Labs Hub page exists: /labs/page.tsx`);


// ----------------------------------------------------
// SUMMARY
// ----------------------------------------------------
console.log('\n======================================================');
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${totalTests - passedTests}`);
console.log('======================================================\n');

if (passedTests === totalTests) {
  console.log('🎉 ALL ASTROPHYSICS & DATA INTEGRITY VERIFICATIONS PASSED!\n');
} else {
  console.error('❌ SOME TESTS FAILED!\n');
  process.exit(1);
}
