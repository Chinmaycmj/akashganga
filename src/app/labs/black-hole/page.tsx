'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CONSTANTS, calculateSchwarzschildRadius, toScientificNotation } from '@/utils/astronomyMath';
import { useAudio } from '@/context/AudioContext';
import { CircleDot, RotateCcw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function BlackHoleLabPage() {
  const { playClickSound } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lab Controls
  // Mass in Solar Masses (M_sun)
  const [solarMasses, setSolarMasses] = useState<number>(10); // Default 10 M_sun
  const [showAccretionDisk, setShowAccretionDisk] = useState<boolean>(true);
  const [showPhotonSphere, setShowPhotonSphere] = useState<boolean>(true);
  const [dopplerBeaming, setDopplerBeaming] = useState<boolean>(true);
  const [observerDistanceKm] = useState<number>(500);

  // Derived Physical Quantities
  const massKg = solarMasses * CONSTANTS.M_sun;
  const schwarzschildRadiusM = calculateSchwarzschildRadius(massKg);
  const schwarzschildRadiusKm = schwarzschildRadiusM / 1000;
  const photonSphereRadiusKm = schwarzschildRadiusKm * 1.5;
  const iscoRadiusKm = schwarzschildRadiusKm * 3.0;

  // Hawking Temperature: T_H = (hbar * c^3) / (8 * pi * G * M * k_B)
  const k_B = 1.380649e-23;
  const hawkingTempK = (CONSTANTS.hbar * Math.pow(CONSTANTS.c, 3)) / (8 * Math.PI * CONSTANTS.G * massKg * k_B);

  // Canvas 2D Relativistic Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Dark space background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      // Background stars distorted by gravitational lensing (Einstein ring arcs)
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 80; i++) {
        const sx = ((i * 47) % w);
        const sy = ((i * 83) % h);
        const dx = sx - cx;
        const dy = sy - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Gravitational bending of light
        if (dist > 30) {
          const bend = (schwarzschildRadiusKm * 15) / dist;
          const deflectedX = cx + dx * (1 + bend * 0.15);
          const deflectedY = cy + dy * (1 + bend * 0.15);
          ctx.globalAlpha = Math.min(1, Math.max(0.2, (dist - 40) / 100));
          ctx.beginPath();
          ctx.arc(deflectedX, deflectedY, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // Scale visual radius to fit canvas nicely
      const visualRs = Math.min(65, Math.max(16, 20 + Math.log10(solarMasses) * 10));

      // 1. Accretion Disk Back Arc
      if (showAccretionDisk) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, 0.32); // Elliptical projection tilt

        for (let r = visualRs * 3; r >= visualRs * 1.5; r -= 3) {
          const norm = (r - visualRs * 1.5) / (visualRs * 1.5);
          ctx.beginPath();
          ctx.arc(0, 0, r, Math.PI, 0, false); // Top / back arc
          ctx.strokeStyle = `rgba(249, 115, 22, ${0.4 * (1 - norm)})`;
          ctx.lineWidth = 4;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Gravitational Lensing Halo / Photon Ring
      if (showPhotonSphere) {
        ctx.beginPath();
        ctx.arc(cx, cy, visualRs * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      // 3. Black Hole Shadow / Event Horizon (Absolute Black)
      ctx.beginPath();
      ctx.arc(cx, cy, visualRs, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 4. Accretion Disk Front Arc (passes in front of horizon)
      if (showAccretionDisk) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, 0.32);

        for (let r = visualRs * 3; r >= visualRs * 1.5; r -= 3) {
          // Doppler beaming: approaching side (left) is brighter and bluer, receding side (right) is dimmer
          const grad = ctx.createLinearGradient(-r, 0, r, 0);
          if (dopplerBeaming) {
            grad.addColorStop(0, 'rgba(56, 189, 248, 0.85)'); // Blue Doppler boost
            grad.addColorStop(0.5, 'rgba(249, 115, 22, 0.7)');
            grad.addColorStop(1, 'rgba(185, 28, 28, 0.3)'); // Red Doppler dimming
          } else {
            grad.addColorStop(0, 'rgba(249, 115, 22, 0.7)');
            grad.addColorStop(1, 'rgba(249, 115, 22, 0.7)');
          }

          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI, false); // Bottom / front arc
          ctx.strokeStyle = grad;
          ctx.lineWidth = 4;
          ctx.stroke();
        }
        ctx.restore();
      }
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [solarMasses, showAccretionDisk, showPhotonSphere, dopplerBeaming, schwarzschildRadiusKm]);

  // Preset quick selectors
  const presets = [
    { label: 'Stellar (10 M☉)', val: 10, name: 'Cygnus X-1 Class' },
    { label: 'Intermediate (1,000 M☉)', val: 1000, name: 'Globular Cluster Seed' },
    { label: 'Supermassive (4.15M M☉)', val: 4150000, name: 'Sagittarius A* (Milky Way)' },
    { label: 'Ultramassive (6.5B M☉)', val: 6500000000, name: 'M87* (EHT Target)' },
  ];

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
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Lab #1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <CircleDot className="w-7 h-7 text-amber-400" />
            Black Hole & Event Horizon Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manipulate black hole mass, explore relativistic light bending, and verify the Schwarzschild metric in real-time.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            setSolarMasses(10);
            setShowAccretionDisk(true);
            setShowPhotonSphere(true);
            setDopplerBeaming(true);
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* Main Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualizer Canvas */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col justify-between shadow-2xl relative">
          <div className="flex items-center justify-between mb-2 z-10">
            <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span>General Relativistic Ray-Tracing Approximation</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
              Observer: {observerDistanceKm} km
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

          {/* Visual Annotations */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-center text-xs">
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-amber-400 font-semibold uppercase">Event Horizon (Rs)</div>
              <div className="font-mono text-white text-xs mt-0.5">{schwarzschildRadiusKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km</div>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-sky-400 font-semibold uppercase">Photon Sphere (1.5 Rs)</div>
              <div className="font-mono text-white text-xs mt-0.5">{photonSphereRadiusKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km</div>
            </div>
            <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-orange-400 font-semibold uppercase">Stable Orbit (3.0 Rs)</div>
              <div className="font-mono text-white text-xs mt-0.5">{iscoRadiusKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km</div>
            </div>
          </div>
        </div>

        {/* Control Parameters Panel */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <span>Simulation Controls</span>
            </h3>

            {/* Presets */}
            <div>
              <label className="text-[11px] text-slate-400 font-medium block mb-2">Astronomical Presets:</label>
              <div className="grid grid-cols-2 gap-1.5">
                {presets.map(p => (
                  <button
                    key={p.val}
                    onClick={() => {
                      playClickSound();
                      setSolarMasses(p.val);
                    }}
                    className={`p-2 rounded text-left transition-colors border ${
                      solarMasses === p.val
                        ? 'bg-amber-950/80 border-amber-500/60 text-amber-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <div className="font-bold text-[11px] truncate">{p.label}</div>
                    <div className="text-[9px] text-slate-400 truncate">{p.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mass Slider (Logarithmic) */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Black Hole Mass:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {solarMasses >= 1e6 ? `${(solarMasses / 1e6).toFixed(2)}M M☉` : `${solarMasses.toLocaleString()} M☉`}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={0.1}
                value={Math.log10(solarMasses)}
                onChange={e => {
                  const val = Math.round(Math.pow(10, parseFloat(e.target.value)));
                  setSolarMasses(val);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>10 M☉ (Stellar)</span>
                <span>10⁹ M☉ (Supermassive)</span>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showAccretionDisk}
                  onChange={e => setShowAccretionDisk(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-600 text-amber-500 focus:ring-0"
                />
                <span>Accretion Disk & Infalling Matter</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={showPhotonSphere}
                  onChange={e => setShowPhotonSphere(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-600 text-sky-500 focus:ring-0"
                />
                <span>Photon Sphere Light Ring (1.5 Rs)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={dopplerBeaming}
                  onChange={e => setDopplerBeaming(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-600 text-indigo-500 focus:ring-0"
                />
                <span>Relativistic Doppler Beaming (Blue shift)</span>
              </label>
            </div>
          </div>

          {/* Relativistic Thermodynamics Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2 shadow-xl">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Relativistic Thermodynamics
            </h4>
            <div className="space-y-1.5 text-slate-300 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Hawking Temp (T_H):</span>
                <span>{toScientificNotation(hawkingTempK)} K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Mass (kg):</span>
                <span>{toScientificNotation(massKg)} kg</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 leading-normal">
              Notice that as a black hole becomes more massive, its Hawking temperature drops to nearly absolute zero—making supermassive black holes colder than deep space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
