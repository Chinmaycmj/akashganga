'use client';

import React from 'react';
import { CosmicStage } from '@/types/cosmos';

interface Cosmic2DFallbackProps {
  stage: CosmicStage;
}

export default function Cosmic2DFallback({ stage }: Cosmic2DFallbackProps) {
  return (
    <div
      className="relative w-full h-full min-h-[460px] bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col justify-between overflow-y-auto"
      role="region"
      aria-label={`2D Schematic Diagram and Explanation for ${stage.title}`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-sky-950 text-sky-400 border border-sky-800">
              2D High-Contrast Schematic
            </span>
            <span className="text-xs text-slate-400 font-mono">Scale: {stage.scaleDisplay} ({stage.powersOfTen})</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-medium">
            {stage.scientificStatus}
          </span>
        </div>

        <h2 className="text-xl font-bold text-white mb-1">{stage.title}</h2>
        <p className="text-sm text-slate-300 mb-4">{stage.subtitle}</p>

        {/* Dynamic SVG Schematic tailored to stage */}
        <div className="w-full h-52 bg-slate-950 rounded-lg border border-slate-800 p-4 flex items-center justify-center my-3">
          <svg className="w-full h-full max-w-md" viewBox="0 0 400 200" role="img" aria-label={stage.title}>
            {stage.id === 1 && (
              // Earth Core cross section schematic
              <g transform="translate(200, 100)">
                <circle r="90" fill="#15803d" opacity="0.8" />
                <circle r="86" fill="#9a3412" />
                <circle r="52" fill="#ea580c" />
                <circle r="22" fill="#facc15" />
                <text x="0" y="4" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Solid Core</text>
                <text x="35" y="-35" fill="#fff" fontSize="9">Outer Core (Molten)</text>
                <text x="60" y="60" fill="#fff" fontSize="9">Mantle</text>
              </g>
            )}

            {stage.id === 2 && (
              // Earth Atmosphere layers schematic
              <g transform="translate(200, 100)">
                <circle r="60" fill="#0284c7" />
                <circle r="72" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 3" />
                <circle r="84" fill="none" stroke="#60a5fa" strokeWidth="2" />
                <circle r="96" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
                <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Earth Surface</text>
                <text x="0" y="-76" textAnchor="middle" fill="#38bdf8" fontSize="8">Troposphere (12 km)</text>
                <text x="0" y="-88" textAnchor="middle" fill="#60a5fa" fontSize="8">Stratosphere (50 km)</text>
              </g>
            )}

            {stage.id === 3 && (
              // Earth-Moon distance schematic
              <g transform="translate(50, 100)">
                <circle cx="50" cy="0" r="30" fill="#0284c7" />
                <text x="50" y="5" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Earth</text>
                <line x1="80" y1="0" x2="270" y2="0" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="280" cy="0" r="9" fill="#cbd5e1" />
                <text x="280" y="20" textAnchor="middle" fill="#cbd5e1" fontSize="9">Moon</text>
                <text x="175" y="-8" textAnchor="middle" fill="#94a3b8" fontSize="9">384,400 km (1.28 light-sec)</text>
              </g>
            )}

            {stage.id === 4 && (
              // Solar System orbits schematic
              <g transform="translate(50, 100)">
                <circle cx="20" cy="0" r="18" fill="#f59e0b" />
                <text x="20" y="4" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">Sun</text>
                {[55, 80, 110, 145, 205, 260, 305, 345].map((x, i) => (
                  <g key={i}>
                    <line x1={x} y1="-70" x2={x} y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx={x} cy="0" r={i > 3 ? 6 : 3} fill={['#94a3b8', '#eab308', '#38bdf8', '#ef4444', '#d97706', '#fde047', '#67e8f9', '#3b82f6'][i]} />
                  </g>
                ))}
                <text x="200" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">Orbits: Mercury to Neptune</text>
              </g>
            )}

            {stage.id >= 5 && stage.id <= 8 && (
              // Stellar / Galactic schematic
              <g transform="translate(200, 100)">
                <ellipse cx="0" cy="0" rx="120" ry="40" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.6" />
                <ellipse cx="0" cy="0" rx="80" ry="25" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.8" />
                <circle cx="0" cy="0" r="14" fill="#fbbf24" />
                <text x="0" y="4" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">Core</text>
                <circle cx="55" cy="-8" r="4" fill="#facc15" />
                <text x="55" y="-14" textAnchor="middle" fill="#facc15" fontSize="8">Solar System</text>
              </g>
            )}

            {stage.id >= 9 && stage.id <= 14 && (
              // Cosmological / Universe boundary schematic
              <g transform="translate(200, 100)">
                <circle r="85" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="4 4" />
                <circle r="55" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
                <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                <text x="0" y="-10" textAnchor="middle" fill="#38bdf8" fontSize="8">Earth (Center of Sight)</text>
                <text x="0" y="98" textAnchor="middle" fill="#14b8a6" fontSize="9">CMB Horizon (93 Glyr Diameter)</text>
              </g>
            )}
          </svg>
        </div>

        {/* Narrative Box */}
        <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="text-amber-400 font-semibold flex items-center gap-1.5">
            <span>Wonder Question:</span>
          </div>
          <p className="italic text-slate-200">{stage.wonderQuestion}</p>
          <div className="pt-2 border-t border-slate-800/80">
            <span className="font-semibold text-white">Scientific Summary: </span>
            <span>{stage.summary}</span>
          </div>
        </div>
      </div>

      {/* Measurements Table */}
      <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {stage.measurements.map((m, i) => (
          <div key={i} className="p-2 rounded bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">{m.label}</div>
            <div className="font-semibold text-slate-100 font-mono mt-0.5">{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
