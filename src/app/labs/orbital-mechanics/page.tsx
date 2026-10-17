'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CONSTANTS, calculateOrbitalVelocity, calculateEscapeVelocity, calculateKeplerPeriod } from '@/utils/astronomyMath';
import { useAudio } from '@/context/AudioContext';
import { Orbit, RotateCcw, Info, Play, Pause } from 'lucide-react';
import Link from 'next/link';

export default function OrbitalMechanicsLabPage() {
  const { playClickSound } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation State Variables
  const [centralMassRatio, setCentralMassRatio] = useState<number>(1.0); // Ratio to Solar Mass
  const [orbitalRadiusAU, setOrbitalRadiusAU] = useState<number>(1.0); // Distance in AU
  const [velocityKmS, setVelocityKmS] = useState<number>(29.78); // Tangential velocity (Earth's = ~29.78 km/s)
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Physical Calculations
  const centralMassKg = centralMassRatio * CONSTANTS.M_sun;
  const radiusMeters = orbitalRadiusAU * CONSTANTS.AU;

  const circularVelocityMs = calculateOrbitalVelocity(centralMassKg, radiusMeters);
  const circularVelocityKmS = circularVelocityMs / 1000;

  const escapeVelocityMs = calculateEscapeVelocity(centralMassKg, radiusMeters);
  const escapeVelocityKmS = escapeVelocityMs / 1000;

  // Kepler orbital period in days
  const periodSeconds = calculateKeplerPeriod(centralMassKg, radiusMeters);
  const periodDays = periodSeconds / (24 * 3600);

  // Velocity Ratio (v / v_c)
  const vRatio = velocityKmS / circularVelocityKmS;

  // Orbit classification
  let orbitType = 'Stable Circular';
  let orbitBadgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-600';
  if (velocityKmS >= escapeVelocityKmS) {
    orbitType = 'Unbound Hyperbolic Ejection (Escaping)';
    orbitBadgeColor = 'bg-rose-950 text-rose-300 border-rose-600';
  } else if (vRatio > 1.05) {
    orbitType = 'Stable Elliptical (High Apoapsis)';
    orbitBadgeColor = 'bg-sky-950 text-sky-300 border-sky-600';
  } else if (vRatio < 0.7) {
    orbitType = 'Decay Risk / Collision Path';
    orbitBadgeColor = 'bg-amber-950 text-amber-300 border-amber-600';
  } else if (vRatio < 0.95) {
    orbitType = 'Stable Elliptical (Low Periapsis)';
    orbitBadgeColor = 'bg-sky-950 text-sky-300 border-sky-600';
  }

  // Canvas Orbit Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const trail: { x: number; y: number }[] = [];

    const render = () => {
      animId = requestAnimationFrame(render);
      if (isPaused) return;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Predicted Theoretical Orbit Track
      ctx.beginPath();
      const scalePixelsPerAU = 110;
      const semiMajorA = orbitalRadiusAU * scalePixelsPerAU;
      const eccentricity = Math.min(0.9, Math.abs(1 - Math.pow(vRatio, 2)));
      const semiMinorB = semiMajorA * Math.sqrt(Math.max(0.01, 1 - eccentricity * eccentricity));

      ctx.ellipse(cx - (vRatio > 1 ? (semiMajorA * eccentricity) / 2 : 0), cy, semiMajorA, semiMinorB, 0, 0, Math.PI * 2);
      ctx.strokeStyle = velocityKmS >= escapeVelocityKmS ? 'rgba(244, 63, 94, 0.4)' : 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Central Mass (Star)
      const starRadius = Math.max(10, Math.min(28, 12 * Math.cbrt(centralMassRatio)));
      ctx.beginPath();
      ctx.arc(cx, cy, starRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.strokeStyle = '#fef3c7';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Animate Orbiting Body
      const angularSpeed = (velocityKmS / (orbitalRadiusAU * 200)) * 0.4;
      angle += angularSpeed;

      const px = cx + Math.cos(angle) * semiMajorA;
      const py = cy + Math.sin(angle) * semiMinorB;

      // Keep recent positions in trail
      trail.push({ x: px, y: py });
      if (trail.length > 50) trail.shift();

      // Render Trail
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Orbiting Satellite / Planet
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [centralMassRatio, orbitalRadiusAU, velocityKmS, isPaused, vRatio, escapeVelocityKmS]);

  const setEarthDefaults = () => {
    playClickSound();
    setCentralMassRatio(1.0); // 1 Sun
    setOrbitalRadiusAU(1.0); // 1 AU
    setVelocityKmS(29.78); // Earth velocity
  };

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
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">Lab #2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Orbit className="w-7 h-7 text-indigo-400" />
            Gravity & Orbital Mechanics Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Test Keplerian orbital physics. Change mass, orbital distance, and velocity to observe circular, elliptical, or escape trajectories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-700"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
          <button
            onClick={setEarthDefaults}
            className="px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 text-xs flex items-center gap-1.5 border border-indigo-700/60"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset (Earth Orbit)</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col justify-between shadow-2xl relative">
          <div className="flex items-center justify-between mb-2 z-10">
            <span className={`text-xs px-2.5 py-1 rounded font-semibold border ${orbitBadgeColor}`}>
              Trajectory: {orbitType}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Period: {periodDays.toFixed(1)} Days ({(periodDays / 365.25).toFixed(2)} Yrs)
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

          {/* Velocity Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-center text-xs">
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Current Speed</div>
              <div className="font-mono text-white text-xs mt-0.5">{velocityKmS.toFixed(2)} km/s</div>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-emerald-400 font-semibold uppercase">Circular Speed (vc)</div>
              <div className="font-mono text-white text-xs mt-0.5">{circularVelocityKmS.toFixed(2)} km/s</div>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-rose-400 font-semibold uppercase">Escape Speed (vesc)</div>
              <div className="font-mono text-white text-xs mt-0.5">{escapeVelocityKmS.toFixed(2)} km/s</div>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm">Orbital Parameters</h3>

            {/* Central Star Mass Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Central Star Mass:</span>
                <span className="font-mono text-amber-300 font-bold">{centralMassRatio.toFixed(2)} M☉</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={4.0}
                step={0.1}
                value={centralMassRatio}
                onChange={e => setCentralMassRatio(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.2 M☉ (Red Dwarf)</span>
                <span>1.0 M☉ (Sun)</span>
                <span>4.0 M☉ (Intermediate)</span>
              </div>
            </div>

            {/* Orbital Radius Slider */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Orbital Distance:</span>
                <span className="font-mono text-indigo-300 font-bold">{orbitalRadiusAU.toFixed(2)} AU</span>
              </div>
              <input
                type="range"
                min={0.3}
                max={3.0}
                step={0.05}
                value={orbitalRadiusAU}
                onChange={e => setOrbitalRadiusAU(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.39 AU (Mercury)</span>
                <span>1.0 AU (Earth)</span>
                <span>2.5 AU (Asteroid Belt)</span>
              </div>
            </div>

            {/* Tangential Velocity Slider */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Tangential Velocity:</span>
                <span className="font-mono text-sky-300 font-bold">{velocityKmS.toFixed(1)} km/s</span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={0.5}
                value={velocityKmS}
                onChange={e => setVelocityKmS(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5 km/s</span>
                <span>Circular: {circularVelocityKmS.toFixed(1)}</span>
                <span>Escape: {escapeVelocityKmS.toFixed(1)}</span>
              </div>
            </div>

            {/* Match Circular Velocity Shortcut */}
            <button
              onClick={() => {
                playClickSound();
                setVelocityKmS(parseFloat(circularVelocityKmS.toFixed(2)));
              }}
              className="w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 font-medium"
            >
              Snap to Circular Orbit Velocity
            </button>
          </div>

          {/* Educational Notes */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2 shadow-xl">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-400" />
              Kepler’s Laws in Action
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              When orbital speed v equals circular speed v_c = √(GM/r), the orbit is perfectly circular. If v increases up to escape velocity v_esc = √(2GM/r), the orbit becomes an elongated ellipse. At or above escape velocity, the trajectory opens into a parabola or hyperbola and escapes permanently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
