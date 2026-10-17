'use client';

import React, { useState } from 'react';
import { useAudio } from '@/context/AudioContext';
import { Sparkles, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function StellarEvolutionLabPage() {
  const { playClickSound } = useAudio();
  const [initialMass, setInitialMass] = useState<number>(1.0); // In Solar Masses (M_sun)

  // Compute stellar parameters from mass-luminosity relation: L ~ M^3.5 for main sequence
  // Main sequence lifetime: tau ~ 10 * (M / M_sun)^(-2.5) billion years
  const lifetimeGyr = 10 * Math.pow(initialMass, -2.5);

  let spectralClass = 'G (Yellow Dwarf)';
  let endState = 'White Dwarf';
  let deathMechanism = 'Planetary Nebula shedding';
  let fusionElements = ['Hydrogen (H) → Helium (He)', 'Helium (He) → Carbon (C) & Oxygen (O)'];
  let hrTemperatureK = 5778;
  let color = '#fbbf24';

  if (initialMass < 0.08) {
    spectralClass = 'Brown Dwarf (Failed Star)';
    endState = 'Degenerate Brown Dwarf';
    deathMechanism = 'Gradual cooling without ignition';
    fusionElements = ['Transient deuterium fusion only'];
    hrTemperatureK = 1800;
    color = '#78350f';
  } else if (initialMass < 0.45) {
    spectralClass = 'M (Red Dwarf)';
    endState = 'Helium White Dwarf';
    deathMechanism = 'Full convective circulation, gradual cooling';
    fusionElements = ['Hydrogen (H) → Helium (He) (Slow p-p chain)'];
    hrTemperatureK = 3200;
    color = '#ef4444';
  } else if (initialMass < 8.0) {
    spectralClass = initialMass > 2.0 ? 'A/F (White/Yellow Star)' : 'G (Yellow Dwarf - Sun-like)';
    endState = 'Carbon-Oxygen White Dwarf (≤ 1.44 M☉)';
    deathMechanism = 'Asymptotic Giant Branch pulsation & Planetary Nebula';
    fusionElements = ['Hydrogen → Helium', 'Helium → Carbon & Oxygen'];
    hrTemperatureK = initialMass > 2.0 ? 8500 : 5800;
    color = initialMass > 2.0 ? '#e0f2fe' : '#fbbf24';
  } else if (initialMass < 20.0) {
    spectralClass = 'B (Blue Supergiant)';
    endState = 'Neutron Star / Pulsar (1.4 – 2.1 M☉)';
    deathMechanism = 'Type II Core-Collapse Supernova';
    fusionElements = ['H → He', 'He → C/O', 'C → Ne/Mg', 'O → Si/S', 'Si → Iron (Fe-56 Core)'];
    hrTemperatureK = 22000;
    color = '#38bdf8';
  } else {
    spectralClass = 'O (Luminous Blue Hypergiant)';
    endState = 'Stellar Black Hole (> 3 M☉ Singularity)';
    deathMechanism = 'Hypernova or Direct Gravitational Collapse';
    fusionElements = ['H → He', 'He → C', 'C → Ne', 'O → Si', 'Si → Iron (Fe)', 'Photodisintegration collapse'];
    hrTemperatureK = 38000;
    color = '#818cf8';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/labs" className="text-xs text-indigo-400 hover:text-indigo-300">
              ← Back to Labs
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono uppercase tracking-wider text-yellow-400">Lab #4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-yellow-400" />
            Stellar Evolution & H-R Diagram Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore how a star’s birth mass dictates its surface temperature, nuclear fusion stages, lifespan, and ultimate death.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            setInitialMass(1.0);
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset (Sun Mass)</span>
        </button>
      </div>

      {/* Main Lab Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* H-R Diagram and Visual Evolution Stage */}
        <div className="lg:col-span-2 space-y-5">
          {/* Visual Star State Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col items-center justify-center min-h-[260px] text-center relative overflow-hidden">
            <div className="absolute top-3 left-4 text-xs font-mono text-slate-400">
              Spectral Type: <span className="text-white font-bold">{spectralClass}</span>
            </div>

            {/* Glowing Star Sphere */}
            <div className="relative my-4 flex items-center justify-center">
              <div
                className="rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center font-bold text-slate-950 text-xs"
                style={{
                  width: `${Math.min(160, Math.max(30, 40 * Math.cbrt(initialMass)))}px`,
                  height: `${Math.min(160, Math.max(30, 40 * Math.cbrt(initialMass)))}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 40px ${color}`,
                }}
              >
                {initialMass >= 1 ? `${initialMass} M☉` : `${initialMass.toFixed(2)}`}
              </div>
            </div>

            <div className="mt-2 text-sm font-bold text-white">
              Main Sequence Lifetime: <span className="font-mono text-yellow-400">{lifetimeGyr > 100 ? '> 100 Billion Years' : `${lifetimeGyr.toFixed(2)} Billion Years`}</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Effective Surface Temperature: <span className="font-mono text-slate-200">{hrTemperatureK.toLocaleString()} K</span>
            </div>
          </div>

          {/* Interactive H-R Diagram Canvas representation */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
              <span>Hertzsprung-Russell (H-R) Position</span>
              <span className="text-xs text-slate-400 font-mono">Luminosity vs Temperature</span>
            </h3>

            <div className="relative w-full h-48 bg-slate-950 rounded-lg border border-slate-800 p-4 flex flex-col justify-between">
              {/* Axes Labels */}
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Hot (40,000 K)</span>
                <span>Sun (5,778 K)</span>
                <span>Cool (2,500 K)</span>
              </div>

              {/* Main Sequence Band Line */}
              <div className="relative w-full flex-1 flex items-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500 opacity-30 transform -rotate-12" />

                {/* Star Position Dot */}
                <div
                  className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg shadow-white/50 transition-all duration-300"
                  style={{
                    backgroundColor: color,
                    left: `${Math.max(5, Math.min(95, 100 - (hrTemperatureK / 40000) * 100))}%`,
                    top: '40%',
                  }}
                  title={`Star Position: ${hrTemperatureK} K, ${initialMass} M☉`}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>High Luminosity (10⁵ L☉)</span>
                <span>Main Sequence Track</span>
                <span>Low Luminosity (10⁻⁴ L☉)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls & Lifecycle Progression */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm">Initial Star Mass</h3>

            {/* Mass Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Birth Mass (M☉):</span>
                <span className="font-mono text-yellow-400 font-bold text-sm">{initialMass.toFixed(2)} M☉</span>
              </div>
              <input
                type="range"
                min={0.05}
                max={40.0}
                step={0.05}
                value={initialMass}
                onChange={e => setInitialMass(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.08 (Red Dwarf)</span>
                <span>1.0 (Sun)</span>
                <span>8.0 (Supernova)</span>
                <span>40.0 (Black Hole)</span>
              </div>
            </div>

            {/* Preset mass buttons */}
            <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-800">
              {[
                { label: '0.2 M☉ (Red Dwarf)', val: 0.2 },
                { label: '1.0 M☉ (Our Sun)', val: 1.0 },
                { label: '12 M☉ (Neutron Star)', val: 12.0 },
                { label: '35 M☉ (Black Hole)', val: 35.0 },
              ].map(p => (
                <button
                  key={p.val}
                  onClick={() => {
                    playClickSound();
                    setInitialMass(p.val);
                  }}
                  className={`p-2 rounded text-left border text-[11px] font-medium transition-colors ${
                    initialMass === p.val
                      ? 'bg-yellow-950/80 border-yellow-500/60 text-yellow-200'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Terminal Corpse and Death Mechanism */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">
                Terminal Evolutionary Fate
              </div>
              <div className="text-sm font-bold text-yellow-300">{endState}</div>
              <div className="text-xs text-slate-400">
                <span className="font-medium text-slate-300">Death Mechanism: </span>
                {deathMechanism}
              </div>
            </div>

            {/* Fusion Sequence */}
            <div className="space-y-1 pt-1">
              <div className="text-[11px] font-semibold text-slate-300">Nucleosynthesis Stages:</div>
              <div className="space-y-1">
                {fusionElements.map((el, i) => (
                  <div key={i} className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono">
                    {el}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
