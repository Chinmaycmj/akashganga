'use client';

import React from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  CircleDot,
  Orbit,
  Scale,
  Sparkles,
  Grid,
  Radio,
  Box,
  Layers,
  ArrowRight,
} from 'lucide-react';

const LABS = [
  {
    id: 'black-hole',
    title: 'Black Hole & Event Horizon Lab',
    category: 'High Energy Astrophysics',
    description: 'Manipulate mass, photon sphere, accretion disk temperature, and relativistic gravitational lensing around a Schwarzschild black hole.',
    icon: CircleDot,
    accent: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300',
    tag: 'Relativistic Physics',
  },
  {
    id: 'orbital-mechanics',
    title: 'Gravity & Orbital Mechanics Lab',
    category: 'Celestial Mechanics',
    description: 'Adjust central mass, orbital distance, and tangential velocity to simulate circular, elliptical, and escape trajectories in real-time.',
    icon: Orbit,
    accent: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/40 text-indigo-300',
    tag: 'Keplerian Orbits',
  },
  {
    id: 'planet-comparison',
    title: 'Planetary Comparison Lab',
    category: 'Planetary Science',
    description: 'Compare diameters, surface gravity, surface temperatures, and atmospheric compositions side-by-side in true-to-scale or exaggerated view.',
    icon: Scale,
    accent: 'from-sky-500/20 to-cyan-500/20 border-sky-500/40 text-sky-300',
    tag: 'Comparative Data',
  },
  {
    id: 'stellar-evolution',
    title: 'Stellar Evolution & H-R Diagram Lab',
    category: 'Stellar Astrophysics',
    description: 'Vary a star’s birth mass from 0.1 to 60 solar masses to explore its fusion timeline, H-R diagram track, and final corpse.',
    icon: Sparkles,
    accent: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40 text-yellow-300',
    tag: 'Nuclear Fusion',
  },
  {
    id: 'spacetime-curvature',
    title: 'Spacetime Curvature & Geodesic Lab',
    category: 'General Relativity',
    description: 'Deform the geometric fabric of spacetime with mass and measure Einsteinian light deflection angles of passing photons.',
    icon: Grid,
    accent: 'from-purple-500/20 to-violet-500/20 border-purple-500/40 text-purple-300',
    tag: 'Einstein Field Equations',
  },
  {
    id: 'cosmic-expansion',
    title: 'Cosmic Expansion & Hubble Law Lab',
    category: 'Cosmology',
    description: 'Simulate the expansion of the universe across cosmic time, measuring galaxy redshift and understanding why space expands without a center.',
    icon: Radio,
    accent: 'from-teal-500/20 to-emerald-500/20 border-teal-500/40 text-teal-300',
    tag: 'Cosmological Metric',
  },
  {
    id: 'dimensions-explorer',
    title: 'Dimensions & Flatland Explorer',
    category: 'Higher Geometry',
    description: 'Explore 0D to 4D geometry, rotate a 4-dimensional tesseract in real-time, and observe how a 2D Flatlander perceives 3D objects.',
    icon: Box,
    accent: 'from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-300',
    tag: 'Higher Coordinates',
  },
  {
    id: 'multiverse',
    title: 'Multiverse Hypothesis Explorer',
    category: 'Theoretical Physics',
    description: 'Evaluate five theoretical multiverse models (Tegmark I-IV, Many-Worlds, String Landscape) while analyzing empirical testability limits.',
    icon: Layers,
    accent: 'from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/40 text-fuchsia-300',
    tag: 'Science vs Speculation',
  },
];

export default function LabsHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-3">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Interactive Scientific Laboratories</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Experiment with the Laws of Physics
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Manipulate astrophysical variables, test relativistic equations, compare planetary worlds, and observe direct outcomes in mathematically consistent simulations.
        </p>
      </div>

      {/* Grid of 8 Signature Labs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {LABS.map(lab => {
          const Icon = lab.icon;
          return (
            <Link
              key={lab.id}
              href={`/labs/${lab.id}`}
              className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-lg border bg-gradient-to-br ${lab.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {lab.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5">
                  {lab.title}
                </h3>
                <div className="text-[11px] font-medium text-indigo-400 mb-2">{lab.category}</div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{lab.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-medium text-slate-300 group-hover:text-indigo-300 transition-colors">
                <span>Launch Experiment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
