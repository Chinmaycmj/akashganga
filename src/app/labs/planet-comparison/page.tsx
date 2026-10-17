'use client';

import React, { useState } from 'react';
import { useAudio } from '@/context/AudioContext';
import { Scale, Check } from 'lucide-react';
import Link from 'next/link';

interface PlanetMetric {
  id: string;
  name: string;
  diameterKm: number;
  massEarths: number;
  gravityM_s2: number;
  tempC: number;
  orbitalPeriodDays: number;
  dayLengthHours: number;
  moons: number;
  atmosphere: string;
  color: string;
}

const PLANET_METRICS: PlanetMetric[] = [
  { id: 'mercury', name: 'Mercury', diameterKm: 4879, massEarths: 0.055, gravityM_s2: 3.7, tempC: 167, orbitalPeriodDays: 88, dayLengthHours: 4222, moons: 0, atmosphere: 'Trace (Na, He, O₂)', color: '#94a3b8' },
  { id: 'venus', name: 'Venus', diameterKm: 12104, massEarths: 0.815, gravityM_s2: 8.87, tempC: 464, orbitalPeriodDays: 225, dayLengthHours: 2802, moons: 0, atmosphere: '96.5% CO₂, 3.5% N₂ (92 atm)', color: '#eab308' },
  { id: 'earth', name: 'Earth', diameterKm: 12742, massEarths: 1.0, gravityM_s2: 9.81, tempC: 15, orbitalPeriodDays: 365.25, dayLengthHours: 24, moons: 1, atmosphere: '78% N₂, 21% O₂, 1% Ar', color: '#38bdf8' },
  { id: 'mars', name: 'Mars', diameterKm: 6779, massEarths: 0.107, gravityM_s2: 3.72, tempC: -65, orbitalPeriodDays: 687, dayLengthHours: 24.6, moons: 2, atmosphere: '95% CO₂, 2.6% N₂ (0.006 atm)', color: '#ef4444' },
  { id: 'jupiter', name: 'Jupiter', diameterKm: 139820, massEarths: 317.8, gravityM_s2: 24.79, tempC: -110, orbitalPeriodDays: 4333, dayLengthHours: 9.9, moons: 95, atmosphere: '90% H₂, 10% He', color: '#d97706' },
  { id: 'saturn', name: 'Saturn', diameterKm: 116460, massEarths: 95.2, gravityM_s2: 10.44, tempC: -140, orbitalPeriodDays: 10759, dayLengthHours: 10.7, moons: 146, atmosphere: '96% H₂, 3% He', color: '#fde047' },
  { id: 'uranus', name: 'Uranus', diameterKm: 50724, massEarths: 14.5, gravityM_s2: 8.69, tempC: -195, orbitalPeriodDays: 30687, dayLengthHours: 17.2, moons: 28, atmosphere: '83% H₂, 15% He, 2% CH₄', color: '#67e8f9' },
  { id: 'neptune', name: 'Neptune', diameterKm: 49244, massEarths: 17.1, gravityM_s2: 11.15, tempC: -200, orbitalPeriodDays: 60190, dayLengthHours: 16.1, moons: 16, atmosphere: '80% H₂, 19% He, 1.5% CH₄', color: '#3b82f6' },
];

export default function PlanetComparisonLabPage() {
  const { playClickSound } = useAudio();
  const [selectedIds, setSelectedIds] = useState<string[]>(['earth', 'mars', 'jupiter']);
  const [scaleMode, setScaleMode] = useState<'true-to-scale' | 'exaggerated'>('exaggerated');

  const toggleSelect = (id: string) => {
    playClickSound();
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const activePlanets = PLANET_METRICS.filter(p => selectedIds.includes(p.id));
  const maxDiameter = Math.max(...activePlanets.map(p => p.diameterKm));

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
            <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Lab #3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Scale className="w-7 h-7 text-sky-400" />
            Planetary Comparison Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Compare diameters, masses, surface gravities, and atmospheric compositions of worlds in our Solar System.
          </p>
        </div>

        {/* Scale Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 p-1 rounded-lg text-xs">
          <button
            onClick={() => setScaleMode('true-to-scale')}
            className={`px-3 py-1.5 rounded transition-colors ${
              scaleMode === 'true-to-scale' ? 'bg-sky-600 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            True-to-Scale
          </button>
          <button
            onClick={() => setScaleMode('exaggerated')}
            className={`px-3 py-1.5 rounded transition-colors ${
              scaleMode === 'exaggerated' ? 'bg-sky-600 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Educationally Normalized
          </button>
        </div>
      </div>

      {/* Planet Selection Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <div className="text-xs text-slate-400 mb-2">Select 2 to 4 planets to compare:</div>
        <div className="flex flex-wrap gap-2">
          {PLANET_METRICS.map(planet => {
            const isSelected = selectedIds.includes(planet.id);
            return (
              <button
                key={planet.id}
                onClick={() => toggleSelect(planet.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                  isSelected
                    ? 'bg-sky-950/80 border-sky-500/80 text-white ring-1 ring-sky-500/50'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: planet.color }} />
                <span>{planet.name}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Size Comparison Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Visual Diameter Comparison</span>
            {scaleMode === 'exaggerated' && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-600/60 font-mono">
                Logarithmic Exaggeration Mode
              </span>
            )}
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {scaleMode === 'true-to-scale' ? 'Linear Scale (1:1 Physical Ratio)' : 'Normalized View'}
          </span>
        </div>

        <div className="min-h-[220px] bg-slate-950 rounded-lg border border-slate-800 flex items-end justify-around p-6 overflow-x-auto gap-4">
          {activePlanets.map(planet => {
            let heightPx: number;
            if (scaleMode === 'true-to-scale') {
              // Linear scale against max diameter in selection
              heightPx = Math.max(8, (planet.diameterKm / maxDiameter) * 160);
            } else {
              // Logarithmic scale so terrestrial planets don't become invisible pinheads next to Jupiter
              heightPx = Math.max(24, Math.log10(planet.diameterKm) * 36 - 60);
            }

            return (
              <div key={planet.id} className="flex flex-col items-center gap-2 shrink-0">
                <div
                  className="rounded-full transition-all duration-300 shadow-lg border border-white/20"
                  style={{
                    width: `${heightPx}px`,
                    height: `${heightPx}px`,
                    backgroundColor: planet.color,
                  }}
                />
                <div className="text-center mt-2">
                  <div className="text-xs font-bold text-white">{planet.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {planet.diameterKm.toLocaleString()} km
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Metric Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Metric / Property</th>
                {activePlanets.map(p => (
                  <th key={p.id} className="py-3 px-4">
                    <span className="flex items-center gap-1.5 text-white font-bold">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-400">Equatorial Diameter</td>
                {activePlanets.map(p => (
                  <td key={p.id} className="py-3 px-4 text-white font-semibold">
                    {p.diameterKm.toLocaleString()} km
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-400">Mass (Earth = 1.0)</td>
                {activePlanets.map(p => (
                  <td key={p.id} className="py-3 px-4">
                    {p.massEarths.toFixed(3)} M⊕
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-400">Surface Gravity (g)</td>
                {activePlanets.map(p => (
                  <td key={p.id} className="py-3 px-4">
                    {p.gravityM_s2.toFixed(2)} m/s² ({(p.gravityM_s2 / 9.81).toFixed(2)}g)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-400">Mean Temperature</td>
                {activePlanets.map(p => (
                  <td key={p.id} className="py-3 px-4">
                    <span className={p.tempC > 100 ? 'text-amber-400 font-bold' : p.tempC < -50 ? 'text-sky-300' : 'text-emerald-400 font-bold'}>
                      {p.tempC > 0 ? `+${p.tempC}°C` : `${p.tempC}°C`}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-400">Orbital Period</td>
                {activePlanets.map(p => (
                  <td key={p.id} className="py-3 px-4">
                    {p.orbitalPeriodDays >= 365 ? `${(p.orbitalPeriodDays / 365.25).toFixed(1)} Earth Years` : `${p.orbitalPeriodDays} Days`}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-400">Rotation Period (Day)</td>
                {activePlanets.map(p => (
                  <td key={p.id} className="py-3 px-4">
                    {p.dayLengthHours >= 48 ? `${(p.dayLengthHours / 24).toFixed(0)} Earth Days` : `${p.dayLengthHours.toFixed(1)} Hours`}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-400">Confirmed Moons</td>
                {activePlanets.map(p => (
                  <td key={p.id} className="py-3 px-4 font-semibold text-white">
                    {p.moons}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-400">Atmosphere Composition</td>
                {activePlanets.map(p => (
                  <td key={p.id} className="py-3 px-4 font-sans text-xs text-slate-300">
                    {p.atmosphere}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
