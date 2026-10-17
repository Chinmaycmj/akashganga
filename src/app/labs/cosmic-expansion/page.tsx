'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/context/AudioContext';
import { Radio, Info, RotateCcw } from 'lucide-react';
import Link from 'next/link';

// 2D Galaxy Grid Coordinates (Normalized relative coordinates)
const BASE_GALAXIES = [
  { id: 0, name: 'Milky Way (Observer)', x: 0, y: 0, color: '#38bdf8' },
  { id: 1, name: 'Galaxy A (Virgo)', x: -1.2, y: 0.8, color: '#f59e0b' },
  { id: 2, name: 'Galaxy B (Ursa Major)', x: 1.4, y: 1.1, color: '#a855f7' },
  { id: 3, name: 'Galaxy C (Centaurus)', x: -1.5, y: -1.2, color: '#10b981' },
  { id: 4, name: 'Galaxy D (Coma)', x: 2.1, y: -0.6, color: '#ec4899' },
  { id: 5, name: 'Galaxy E (Perseus)', x: 0.6, y: -1.8, color: '#06b6d4' },
  { id: 6, name: 'Galaxy F (Fornax)', x: -0.8, y: 2.0, color: '#fbbf24' },
  { id: 7, name: 'Galaxy G (Hercules)', x: 1.9, y: 1.7, color: '#f43f5e' },
];

export default function CosmicExpansionLabPage() {
  const { playClickSound } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lab Controls
  const [scaleFactor, setScaleFactor] = useState<number>(1.0); // a(t), 1.0 = present day, 0.2 = early universe, 2.5 = future
  const [selectedCenterIndex, setSelectedCenterIndex] = useState<number>(0); // Which galaxy is the observer (to show no special center)
  const [hubbleConstant, setHubbleConstant] = useState<number>(70); // km/s/Mpc

  // Canvas Grid Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, w, h);

    // Coordinate grid expanding with scaleFactor
    const gridStep = 45 * scaleFactor;
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    for (let x = (cx % gridStep); x < w; x += gridStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = (cy % gridStep); y < h; y += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const observer = BASE_GALAXIES[selectedCenterIndex];
    const unitPixels = 70;

    // Draw lines of sight and velocity vectors from the selected observer
    BASE_GALAXIES.forEach(galaxy => {
      // Calculate position relative to chosen observer
      const relX = (galaxy.x - observer.x) * scaleFactor * unitPixels;
      const relY = (galaxy.y - observer.y) * scaleFactor * unitPixels;
      const screenX = cx + relX;
      const screenY = cy + relY;

      if (galaxy.id !== observer.id) {
        // Line of sight
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(screenX, screenY);
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Recessional velocity vector arrow (proportional to distance v = H0 * d)
        const dist = Math.sqrt(relX * relX + relY * relY);
        const vectorLen = Math.min(30, dist * 0.18);
        const angle = Math.atan2(relY, relX);

        ctx.beginPath();
        ctx.moveTo(screenX, screenY);
        ctx.lineTo(screenX + Math.cos(angle) * vectorLen, screenY + Math.sin(angle) * vectorLen);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw Galaxy Marker
      ctx.beginPath();
      ctx.arc(screenX, screenY, galaxy.id === observer.id ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = galaxy.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px monospace';
      ctx.fillText(galaxy.name, screenX + 10, screenY + 3);
    });

    // Observer Crosshair Ring
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [scaleFactor, selectedCenterIndex, hubbleConstant]);

  // Compute stats for a target galaxy (e.g. Galaxy A)
  const targetDistMpc = 16.5 * scaleFactor; // Virgo cluster ~ 16.5 Mpc today
  const recessionalVelocityKmS = hubbleConstant * targetDistMpc;
  const redshiftZ = (1 / Math.max(0.05, scaleFactor)) - 1;

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
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400">Lab #6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Radio className="w-7 h-7 text-teal-400" />
            Cosmic Expansion & Hubble Law Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Observe space stretching between galaxies, test Hubble’s Law (v = H₀ · d), and prove that expansion has no center.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            setScaleFactor(1.0);
            setSelectedCenterIndex(0);
            setHubbleConstant(70);
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset (Present Day a=1.0)</span>
        </button>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col justify-between shadow-2xl relative">
          <div className="flex items-center justify-between mb-2 z-10">
            <span className="text-xs text-slate-300 font-mono flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <span>Scale Factor a(t) = {scaleFactor.toFixed(2)}</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              Red arrows = Recessional velocities (v ∝ d)
            </span>
          </div>

          <div className="w-full flex-1 min-h-[380px] flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={700}
              height={400}
              className="w-full h-full max-h-[440px] rounded-lg shadow-inner"
            />
          </div>

          {/* Hubble Metrics Strip */}
          <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800 text-center text-xs">
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Hubble (H₀)</div>
              <div className="font-mono text-white text-xs mt-0.5">{hubbleConstant} km/s/Mpc</div>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-teal-400 uppercase font-semibold">Virgo Dist</div>
              <div className="font-mono text-white text-xs mt-0.5">{targetDistMpc.toFixed(1)} Mpc</div>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-rose-400 uppercase font-semibold">Recession (v)</div>
              <div className="font-mono text-white text-xs mt-0.5">{recessionalVelocityKmS.toFixed(0)} km/s</div>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-amber-400 uppercase font-semibold">Redshift (z)</div>
              <div className="font-mono text-white text-xs mt-0.5">{redshiftZ > 0 ? `+${redshiftZ.toFixed(2)}` : redshiftZ.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm">Expansion Controls</h3>

            {/* Cosmic Scale Factor Slider a(t) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Cosmic Scale Factor a(t):</span>
                <span className="font-mono text-teal-400 font-bold">{scaleFactor.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min={0.3}
                max={2.2}
                step={0.05}
                value={scaleFactor}
                onChange={e => setScaleFactor(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.3 (Early Cosmos)</span>
                <span>1.0 (Today)</span>
                <span>2.2 (Future Expansion)</span>
              </div>
            </div>

            {/* Change Observer Perspective (To prove there is no center) */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <label className="text-[11px] text-slate-400 font-medium block">
                Choose Observer Galaxy (Prove No Center):
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {BASE_GALAXIES.slice(0, 4).map(g => (
                  <button
                    key={g.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedCenterIndex(g.id);
                    }}
                    className={`p-2 rounded text-left border text-[11px] transition-colors ${
                      selectedCenterIndex === g.id
                        ? 'bg-teal-950/80 border-teal-500/60 text-teal-200 font-semibold'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Hubble Constant Slider */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Expansion Rate (H₀):</span>
                <span className="font-mono text-indigo-400 font-bold">{hubbleConstant} km/s/Mpc</span>
              </div>
              <input
                type="range"
                min={50}
                max={90}
                step={1}
                value={hubbleConstant}
                onChange={e => setHubbleConstant(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>50</span>
                <span>Planck: 67.4</span>
                <span>SH0ES: 73.0</span>
                <span>90</span>
              </div>
            </div>
          </div>

          {/* Educational Insight: Expansion Has No Center */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2 shadow-xl">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-teal-400" />
              Why Space Expands Without a Center
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Select any galaxy from the list above. Notice that from <em>every</em> galaxy’s perspective, all other galaxies appear to be rushing away, with speed proportional to distance. Galaxies are not flying through space; space itself is stretching between them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
