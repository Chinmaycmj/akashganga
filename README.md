# 🌌 THE INFINITE COSMOS
### An Immersive, Animated, Interactive Universe-Learning Platform

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-orange?style=flat&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat)](LICENSE)

> *"Start at the center of Earth. Keep zooming outward, discovering increasingly larger structures of reality, until reaching the observable universe and exploring scientific questions about what may exist beyond it."*

---

## 🔭 Architectural Overview

**The Infinite Cosmos** is built on a production-grade educational architecture designed for high-performance spatial rendering, rigorous astrophysics mathematics, responsive navigation, and strict epistemological integrity.

```
                               ┌────────────────────────────────────────────────────────┐
                               │                    GLOBAL APP ROUTE                    │
                               │           Next.js 14 App Router (React 18)             │
                               └──────────────────────────┬─────────────────────────────┘
                                                          │
                    ┌─────────────────────────────────────┴─────────────────────────────────────┐
                    ▼                                                                           ▼
      ┌───────────────────────────┐                                               ┌───────────────────────────┐
      │   INTERACTIVE JOURNEY     │                                               │   8 INTERACTIVE LABS      │
      │ 14 Cosmological Scales    │                                               │ In-browser Physics Sims   │
      │   (10⁶ m → >10²⁶ m)       │                                               │  Real Analytical Solvers  │
      └─────────────┬─────────────┘                                               └─────────────┬─────────────┘
                    │                                                                           │
                    ├─────────────────────────────────────┬─────────────────────────────────────┤
                    ▼                                     ▼                                     ▼
      ┌───────────────────────────┐         ┌───────────────────────────┐         ┌───────────────────────────┐
      │    3D WebGL (Three.js)    │         │     ACCESSIBLE 2D SVGs    │         │  KNOWLEDGE ATLAS & LEX    │
      │ Procedural Textures & FX  │         │  High-Contrast Schematics │         │ Demarcated Explanations   │
      │  Dynamic Scene Switching  │         │   Reduced-Motion Safe     │         │ Formulas, Quizzes, Notes  │
      └─────────────┬─────────────┘         └─────────────┬─────────────┘         └─────────────┬─────────────┘
                    │                                     │                                     │
                    └─────────────────────────────────────┼─────────────────────────────────────┘
                                                          ▼
                                            ┌───────────────────────────┐
                                            │      AUDIO & STATE        │
                                            │ Web Audio API Synthesizer │
                                            │  UserProgressContext      │
                                            └───────────────────────────┘
```

---

## 🌟 Key Features

### 1. The 14-Stage Zoom Out to Infinity Journey
A continuous interactive voyage spanning 22 orders of magnitude:
1. **Earth's Core & Interior ($10^6\text{ m}$)**: Crust, mantle, outer liquid core, inner solid core, and the geodynamo.
2. **Earth's Surface & Atmosphere ($10^7\text{ m}$)**: Troposphere through exosphere, magnetosphere, and planetary habitability.
3. **The Earth–Moon System ($10^8\text{ m}$)**: Orbital resonance, tidal locking, lunar phases, and true scale distance.
4. **The Solar System ($10^{12}\text{ m}$)**: Sun, 8 planets, Asteroid & Kuiper belts, Oort Cloud, and Keplerian orbital speeds.
5. **Stars & Stellar Evolution ($10^{16}\text{ m}$)**: Main sequence, red giants, planetary nebulae, white dwarfs, neutron stars, and stellar mass black holes.
6. **Exoplanets & Habitable Worlds ($10^{17}\text{ m}$)**: Goldilocks zone, transit spectroscopy, and atmospheric biosignature criteria.
7. **Nebulae & Interstellar Medium ($10^{18}\text{ m}$)**: Emission, reflection, and planetary nebulae; star birth in molecular clouds.
8. **The Milky Way Galaxy ($10^{21}\text{ m}$)**: Barred spiral structure, Perseus/Orion arms, Sagittarius A* ($4.15 \times 10^6\ M_\odot$), and dark matter halo.
9. **Other Galaxies ($10^{22}\text{ m}$)**: Hubble tuning fork (ellipticals, spirals, lenticulars, irregulars), Andromeda, and galaxy collisions.
10. **Galaxy Groups & Clusters ($10^{23}\text{ m}$)**: Local Group, Virgo Cluster, intracluster medium, and gravitational binding.
11. **The Cosmic Web ($10^{24}\text{ m}$)**: Large-scale structure filaments, voids, dark matter scaffolds, and Sloan Digital Sky Survey mapping.
12. **The Observable Universe ($10^{26}\text{ m}$)**: Cosmic Microwave Background, particle horizon ($\sim 93\text{ billion light-years}$ comoving diameter), and Big Bang cosmology.
13. **Beyond the Observable Horizon ($10^{28}\text{ m}$)**: Cosmic inflation, spatial curvature bounds ($|\Omega_k| < 0.005$), and causal horizons.
14. **Dimensions, Quantum & Multiverse ($10^{30}\text{ m}$)**: General Relativity, 4D Tesseract projection, quantum mechanics, and scientific demarcation of multiverse hypotheses.

### 2. The 8 Signature Interactive Labs
- **Lab 1: Black Hole Explorer (`/labs/black-hole`)**: Real-time Schwarzschild radius solver ($R_s = \frac{2GM}{c^2}$), photon sphere ($1.5 R_s$), ISCO ($3 R_s$), and gravitational lensing deflection.
- **Lab 2: Orbital Mechanics Simulator (`/labs/orbital-mechanics`)**: Vis-viva equation ($v^2 = GM(\frac{2}{r} - \frac{1}{a})$), semi-major axis, eccentricity, and perihelion/aphelion velocities.
- **Lab 3: Comparative Planetary Scale (`/labs/planet-comparison`)**: True physical diameter, surface gravity, escape velocity, and atmospheric comparisons across all 8 major planets + Pluto & the Sun.
- **Lab 4: Stellar Evolution & Lifecycles (`/labs/stellar-evolution`)**: Initial stellar mass slider ($0.1\ M_\odot$ to $100\ M_\odot$) predicting core fusion stages, Chandrasekhar limit ($1.4\ M_\odot$), Tolman-Oppenheimer-Volkoff limit, and remnant fates.
- **Lab 5: Spacetime Curvature & Waves (`/labs/spacetime-curvature`)**: 3D rubber-sheet spacetime mesh deformation based on mass and compact binary orbital frequency.
- **Lab 6: Cosmic Expansion & Redshift (`/labs/cosmic-expansion`)**: Hubble-Lemaître law ($v = H_0 d$), cosmological redshift ($z = \frac{\lambda_{obs} - \lambda_{emit}}{\lambda_{emit}}$), lookback time, and scale factor $a(t)$.
- **Lab 7: Dimensions & Projections (`/labs/dimensions-explorer`)**: Interactive 4D hypercube (Tesseract) rotating through the $XW$ and $YZ$ planes projected to 3D and 2D.
- **Lab 8: Multiverse Hypotheses Comparator (`/labs/multiverse`)**: Systematic comparison of Level I–IV Tegmark multiverse models with falsifiability, testability, and empirical criteria.

### 3. Epistemological Demarcation Engine
Every stage, topic, and lab explicitly badges scientific claims with strict epistemology:
- 🟢 **Observed**: Directly measured via empirical instruments (e.g., CMB temperature, black hole shadow, exoplanet transits).
- 🔵 **Well established**: Robustly corroborated by independent experiments (e.g., General Relativity, Stellar Nucleosynthesis).
- 🟣 **Current model**: Leading consensus framework, under ongoing refinement (e.g., $\Lambda$CDM Cosmological Model, Cosmic Inflation).
- 🟡 **Active research**: Competing theories undergoing empirical tests (e.g., Dark Matter particle candidates, Hubble Tension).
- 🟠 **Hypothesis**: Mathematically consistent proposition lacking empirical confirmation (e.g., Compact Spatial Topologies).
- 🔴 **Speculative**: Theoretical construct with no direct observational evidence (e.g., String Landscape, Many-Worlds branches).

### 4. Accessibility & Neurodiversity Design
- **High-Contrast 2D Schematics**: Every stage features an SVG 2D fallback with technical readouts for users with low-power GPUs or reduced visual processing preferences.
- **Reduced Motion Support**: Honoring `prefers-reduced-motion` with one-click toggling in the header.
- **Synthesized Ambient Web Audio**: Zero-asset audio engine generating spatial low-frequency cosmic drone, zoom whooshes, and interaction chimes without external bandwidth cost.
- **Multi-Tier Explanations**: Seamlessly switch between Beginner, Intermediate, and Advanced pedagogical depths at any moment.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14 (App Router), React 18, TypeScript 5 |
| **Styling** | Tailwind CSS 3.4, PostCSS, Lucide React Icons |
| **3D Graphics** | Three.js (WebGL), Canvas Procedural Textures (0 external image assets) |
| **Audio** | Native Web Audio API Synthesizer (Oscillators, BiquadFilters, GainNodes) |
| **Testing** | Node.js TSX test runner, Strict Physics Verification Suite |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (tested on Node v20 & v24)
- **npm**: v9.0.0 or later

### Installation & Run

```bash
# 1. Clone or navigate to the project directory
cd infinite-cosmos

# 2. Install dependencies
npm install

# 3. Run the automated astrophysics & data integrity test suite
npm test

# 4. Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Production Build

```bash
# Build the production application
npm run build

# Start the optimized production server
npm run start
```

---

## 🧪 Automated Verification Suite

Run the full verification suite anytime:
```bash
npm test
```

The test runner validates:
1. **Astrophysical Constants & Formulas**:
   - Schwarzschild radius of $1\ M_\odot$ ($R_s \approx 2954\text{ m}$)
   - Schwarzschild radius of Sagittarius A* ($R_s \approx 1.226 \times 10^{10}\text{ m}$)
   - Earth circular orbital velocity ($v \approx 29.79\text{ km/s}$)
   - Earth surface escape velocity ($v_{esc} \approx 11.19\text{ km/s}$)
   - Kepler's 3rd Law orbital period ($T = 365.25\text{ days}$)
   - Solar gravitational deflection angle ($\theta \approx 1.75\text{ arcsec}$)
   - Unit formatting across 26 orders of magnitude
2. **Cosmological Stages Integrity**: All 14 stages possess valid narratives, measurements, citations, and epistemological levels.
3. **Knowledge Atlas Topics**: Complete quiz options, verified correct indices, and formulas.
4. **Celestial Objects & Glossary**: Complete phonetic pronunciations and cross-stage relations.
5. **Interactive Labs**: All 8 signature labs and the Labs Hub route files exist and compile.

---

## 📚 Academic References & Citations

- **Planck Collaboration (2020)**: *Planck 2018 results. VI. Cosmological parameters*. Astronomy & Astrophysics.
- **Event Horizon Telescope Collaboration (2019, 2022)**: *First M87 & Sgr A* Event Horizon Results*. Astrophysical Journal Letters.
- **LIGO Scientific & Virgo Collaborations (2016)**: *Observation of Gravitational Waves from a Binary Black Hole Merger*. Physical Review Letters.
- **Carroll, Bradley W. & Ostlie, Dale A.**: *An Introduction to Modern Astrophysics* (2nd Edition), Cambridge University Press.
- **Misner, Thorne, & Wheeler**: *Gravitation*, W. H. Freeman.
- **Guth, Alan H. (1981)**: *Inflationary universe: A possible solution to the horizon and flatness problems*. Physical Review D.

---

## 📄 License
This project is licensed under the MIT License.
