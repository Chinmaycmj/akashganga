'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CONSTANTS, calculateGravitationalDeflectionArcsec } from '@/utils/astronomyMath';
import { useAudio } from '@/context/AudioContext';
import { Grid, RotateCcw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function SpacetimeCurvatureLabPage() {
  const { playClickSound } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lab Controls
  const [massSuns, setMassSuns] = useState<number>(1.0); // Mass in solar masses
  const [impactParameterKm, setImpactParameterKm] = useState<number>(696340); // Grazing solar radius by default
  const [firePhoton] = useState<boolean>(true);

  // Deflection angle calculation
  const massKg = massSuns * CONSTANTS.M_sun;
  const impactParameterM = impactParameterKm * 1000;
  const deflectionArcsec = calculateGravitationalDeflectionArcsec(massKg, impactParameterM);

  // Canvas Grid Deformation Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let photonX = 20;

    const render = () => {
      animId = requestAnimationFrame(render);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      // Deformed Spacetime Coordinate Grid
      const gridSpacing = 24;
      const massStrength = Math.min(80, massSuns * 14);

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;

      // Draw curved horizontal lines
      for (let y = 20; y < h; y += gridSpacing) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 10) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Gravitational well dip
          const dip = (massStrength * 30) / (dist + 40);
          const drawY = y + (dy > 0 ? dip : -dip) * 0.35;

          if (x === 0) ctx.moveTo(x, drawY);
          else ctx.lineTo(x, drawY);
        }
        ctx.stroke();
      }

      // Draw curved vertical lines
      for (let x = 20; x < w; x += gridSpacing) {
        ctx.beginPath();
        for (let y = 0; y < h; y += 10) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const dip = (massStrength * 30) / (dist + 40);
          const drawX = x + (dx > 0 ? dip : -dip) * 0.35;

          if (y === 0) ctx.moveTo(drawX, y);
          else ctx.lineTo(drawX, y);
        }
        ctx.stroke();
      }

      // Draw Central Mass Object
      const objectRadius = Math.max(12, Math.min(32, 14 * Math.cbrt(massSuns)));
      ctx.beginPath();
      ctx.arc(cx, cy, objectRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Animate Photon Trajectory & Bending
      if (firePhoton) {
        photonX += 4;
        if (photonX > w) photonX = 20;

        // Path calculation
        const grazingY = cy - objectRadius - 20;
        let photonY = grazingY;
        if (photonX > cx - 60) {
          // Bent trajectory past the mass
          const bendProgress = Math.max(0, Math.min(1, (photonX - (cx - 60)) / 120));
          photonY = grazingY + bendProgress * (massSuns * 12);
        }

        // Draw Light Beam Path
        ctx.beginPath();
        ctx.moveTo(20, grazingY);
        ctx.quadraticCurveTo(cx, grazingY + massSuns * 4, w, grazingY + massSuns * 14);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Photon Pulser
        ctx.beginPath();
        ctx.arc(photonX, photonY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [massSuns, impactParameterKm, firePhoton]);

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
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400">Lab #5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Grid className="w-7 h-7 text-purple-400" />
            Spacetime Curvature & Geodesic Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore General Relativity: mass curves the metric of spacetime, deflecting light along geodesic trajectories.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            setMassSuns(1.0);
            setImpactParameterKm(696340);
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset (Sun Eclipse 1919)</span>
        </button>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col justify-between shadow-2xl relative">
          <div className="flex items-center justify-between mb-2 z-10">
            <span className="text-xs text-slate-300 font-mono flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span>Einstein Field Metric Deformation</span>
            </span>
            <span className="text-xs font-bold text-sky-400 font-mono">
              Deflection: {deflectionArcsec.toFixed(3)} arcseconds
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

          {/* Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-center text-xs">
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Mass of Central Body</div>
              <div className="font-mono text-white text-xs mt-0.5">{massSuns.toFixed(1)} M☉</div>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Impact Parameter (b)</div>
              <div className="font-mono text-white text-xs mt-0.5">{impactParameterKm.toLocaleString()} km</div>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-purple-400 uppercase font-semibold">Einstein Deflection (θ)</div>
              <div className="font-mono text-white text-xs mt-0.5">{deflectionArcsec.toFixed(2)}″</div>
            </div>
          </div>
        </div>

        {/* Controls & Pedagogical Caveats */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm">Curvature Controls</h3>

            {/* Mass Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Mass (M☉):</span>
                <span className="font-mono text-amber-400 font-bold">{massSuns.toFixed(1)} M☉</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={5.0}
                step={0.1}
                value={massSuns}
                onChange={e => setMassSuns(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.1 M☉</span>
                <span>1.0 M☉ (Sun)</span>
                <span>5.0 M☉</span>
              </div>
            </div>

            {/* Impact Parameter Slider */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Grazing Distance (b):</span>
                <span className="font-mono text-indigo-400 font-bold">{(impactParameterKm / 1000).toFixed(0)}k km</span>
              </div>
              <input
                type="range"
                min={300000}
                max={2000000}
                step={50000}
                value={impactParameterKm}
                onChange={e => setImpactParameterKm(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>300,000 km</span>
                <span>Solar Limb (700k)</span>
                <span>2,000,000 km</span>
              </div>
            </div>

            {/* Historical 1919 Eddington Eclipse Verification */}
            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/50 space-y-1">
              <div className="text-[11px] font-semibold text-indigo-300">The 1919 Solar Eclipse Test</div>
              <p className="text-[10px] text-slate-300 leading-normal">
                Arthur Eddington photographed starlight grazing the Sun during a total solar eclipse, measuring 1.75″ of deflection—matching Einstein’s exact prediction and overthrowing Newtonian flat space.
              </p>
            </div>
          </div>

          {/* Critical Scientific Caveat */}
          <div className="bg-slate-900 border border-amber-900/60 rounded-xl p-4 text-xs space-y-2 shadow-xl">
            <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              Scientific Caveat: The Rubber Sheet Analogy
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              The classic &ldquo;bowling ball on a rubber sheet&rdquo; visual is a simplified 2D pedagogical analogy, not physical reality. In General Relativity:
            </p>
            <ul className="space-y-1 text-[10px] text-slate-400">
              <li>• Spacetime is four-dimensional (3 space + 1 time), not a 2D sheet.</li>
              <li>• Gravity is not pulling objects &ldquo;down&rdquo; into a hole; matter simply follows straight geodesics in curved geometry.</li>
              <li>• Time dilation contributes equally to the bending of light.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
