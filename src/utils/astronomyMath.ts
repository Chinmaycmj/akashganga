// Astronomical & Physical Constants
export const CONSTANTS = {
  G: 6.67430e-11, // Gravitational constant (m^3 kg^-1 s^-2)
  c: 299792458, // Speed of light (m/s)
  M_sun: 1.989e30, // Solar mass (kg)
  R_sun: 6.9634e8, // Solar radius (m)
  M_earth: 5.9722e24, // Earth mass (kg)
  R_earth: 6.371e6, // Earth radius (m)
  AU: 1.495978707e11, // Astronomical Unit (m)
  LY: 9.4607304725808e15, // Light-year (m)
  PC: 3.085677581e16, // Parsec (m)
  H0: 70.0, // Hubble constant (km/s / Mpc)
  hbar: 1.054571817e-34, // Reduced Planck constant (J*s)
  sigma_sb: 5.670374419e-8, // Stefan-Boltzmann constant (W m^-2 K^-4)
};

/**
 * Calculates the Schwarzschild radius (event horizon) of a non-rotating black hole.
 * R_s = 2GM / c^2
 * @param massInKg Black hole mass in kg
 * @returns Radius in meters
 */
export function calculateSchwarzschildRadius(massInKg: number): number {
  return (2 * CONSTANTS.G * massInKg) / (CONSTANTS.c * CONSTANTS.c);
}

/**
 * Calculates the circular orbital velocity around a central mass.
 * v = sqrt(GM / r)
 */
export function calculateOrbitalVelocity(centralMassKg: number, radiusMeters: number): number {
  if (radiusMeters <= 0) return 0;
  return Math.sqrt((CONSTANTS.G * centralMassKg) / radiusMeters);
}

/**
 * Calculates escape velocity from a central mass at radius r.
 * v_esc = sqrt(2GM / r)
 */
export function calculateEscapeVelocity(centralMassKg: number, radiusMeters: number): number {
  if (radiusMeters <= 0) return 0;
  return Math.sqrt((2 * CONSTANTS.G * centralMassKg) / radiusMeters);
}

/**
 * Calculates orbital period using Kepler's Third Law:
 * T = 2 * pi * sqrt(a^3 / GM)
 * @returns Period in seconds
 */
export function calculateKeplerPeriod(centralMassKg: number, semiMajorAxisMeters: number): number {
  if (semiMajorAxisMeters <= 0) return 0;
  return 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxisMeters, 3) / (CONSTANTS.G * centralMassKg));
}

/**
 * Calculates Einstein's gravitational deflection angle of light grazing a mass M at impact parameter b:
 * theta = 4GM / (c^2 * b)
 * @returns Deflection angle in arcseconds
 */
export function calculateGravitationalDeflectionArcsec(massKg: number, impactParameterMeters: number): number {
  if (impactParameterMeters <= 0) return 0;
  const radians = (4 * CONSTANTS.G * massKg) / (CONSTANTS.c * CONSTANTS.c * impactParameterMeters);
  return (radians * 180 * 3600) / Math.PI;
}

/**
 * Formats a distance in meters into the most intuitive astronomical unit
 */
export function formatAstronomicalDistance(meters: number): { value: string; unit: string; fullText: string } {
  if (meters < 1e3) {
    return { value: meters.toFixed(1), unit: 'm', fullText: `${meters.toFixed(1)} meters` };
  }
  if (meters < 1e6) {
    const km = meters / 1e3;
    return { value: km.toLocaleString(undefined, { maximumFractionDigits: 1 }), unit: 'km', fullText: `${km.toFixed(1)} km` };
  }
  if (meters < 1e11) {
    const thousandKm = meters / 1e6;
    return { value: (meters / 1e3).toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: 'km', fullText: `${thousandKm.toFixed(2)} × 10⁶ km` };
  }
  if (meters < 0.1 * CONSTANTS.LY) {
    const au = meters / CONSTANTS.AU;
    return { value: au.toFixed(2), unit: 'AU', fullText: `${au.toFixed(2)} Astronomical Units` };
  }
  if (meters < 1e6 * CONSTANTS.LY) {
    const ly = meters / CONSTANTS.LY;
    return { value: ly.toLocaleString(undefined, { maximumFractionDigits: 1 }), unit: 'ly', fullText: `${ly >= 1000 ? (ly/1000).toFixed(1) + ' kly' : ly.toFixed(1) + ' light-years'}` };
  }
  if (meters < 1e9 * CONSTANTS.LY) {
    const mly = meters / (1e6 * CONSTANTS.LY);
    return { value: mly.toFixed(1), unit: 'Mly', fullText: `${mly.toFixed(1)} Million light-years` };
  }
  const gly = meters / (1e9 * CONSTANTS.LY);
  return { value: gly.toFixed(2), unit: 'Gly', fullText: `${gly.toFixed(2)} Billion light-years` };
}

/**
 * Formats a number into standard scientific notation (e.g. 1.989 × 10³⁰)
 */
export function toScientificNotation(num: number): string {
  if (num === 0) return '0';
  const exponent = Math.floor(Math.log10(Math.abs(num)));
  const mantissa = num / Math.pow(10, exponent);
  const superscriptMap: Record<string, string> = {
    '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  const expStr = exponent.toString().split('').map(c => superscriptMap[c] || c).join('');
  return `${mantissa.toFixed(2)} × 10${expStr}`;
}
