'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '@/context/AudioContext';
import { Box, RotateCcw, AlertTriangle, Play, Pause } from 'lucide-react';
import Link from 'next/link';

export default function DimensionsExplorerLabPage() {
  const { playClickSound } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lab Controls
  const [dimensionMode, setDimensionMode] = useState<'0d-3d' | 'flatland' | 'tesseract'>('tesseract');
  const [flatlandSliceY, setFlatlandSliceY] = useState<number>(0); // Vertical position of 3D sphere slicing 2D plane
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Tesseract 4D Geometry
  const vertices4D = useRef<number[][]>([]);
  const edges4D = useRef<[number, number][]>([]);

  useEffect(() => {
    // Generate 16 vertices of 4D hypercube
    const v: number[][] = [];
    for (let i = 0; i < 16; i++) {
      v.push([
        (i & 1) ? 1 : -1,
        (i & 2) ? 1 : -1,
        (i & 4) ? 1 : -1,
        (i & 8) ? 1 : -1,
      ]);
    }
    vertices4D.current = v;

    // Generate 32 edges
    const e: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (v[i][k] !== v[j][k]) diff++;
        }
        if (diff === 1) e.push([i, j]);
      }
    }
    edges4D.current = e;
  }, []);

  // Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angleXW = 0;
    let angleYW = 0;
    let angle3D = 0;

    const render = () => {
      animId = requestAnimationFrame(render);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      if (dimensionMode === 'tesseract') {
        if (isRotating) {
          angleXW += 0.012;
          angleYW += 0.008;
          angle3D += 0.005;
        }

        const distance4D = 2.4;
        const projected2D: { x: number; y: number }[] = [];

        // Project 16 vertices: 4D -> 3D -> 2D
        vertices4D.current.forEach(([x, y, z, w4]) => {
          // Rotate in XW plane
          const cosXW = Math.cos(angleXW);
          const sinXW = Math.sin(angleXW);
          const x1 = x * cosXW - w4 * sinXW;
          const w1 = x * sinXW + w4 * cosXW;

          // Rotate in YW plane
          const cosYW = Math.cos(angleYW);
          const sinYW = Math.sin(angleYW);
          const y2 = y * cosYW - w1 * sinYW;
          const w2 = y * sinYW + w1 * cosYW;

          // 4D to 3D perspective projection
          const pFactor = 1.6 / (distance4D - w2 * 0.5);
          const x3 = x1 * pFactor;
          const y3 = y2 * pFactor;
          const z3 = z * pFactor;

          // Rotate 3D in XY for viewing angle
          const cos3 = Math.cos(angle3D);
          const sin3 = Math.sin(angle3D);
          const rotX = x3 * cos3 - z3 * sin3;

          // 3D to 2D screen projection
          const scale = 75;
          projected2D.push({
            x: cx + rotX * scale,
            y: cy + y3 * scale,
          });
        });

        // Draw 32 Edges
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.8;
        edges4D.current.forEach(([i, j]) => {
          const p1 = projected2D[i];
          const p2 = projected2D[j];
          if (!p1 || !p2) return;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw 16 Vertices
        projected2D.forEach((p, idx) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = idx < 8 ? '#38bdf8' : '#a855f7';
          ctx.fill();
        });
      } else if (dimensionMode === 'flatland') {
        // Flatland Demonstration: A 3D sphere slicing a 2D plane
        const sphereRadius = 80;
        const sphereY = flatlandSliceY; // -80 to +80

        // Draw 2D Plane Surface
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - 160, cy - 80, 320, 160);
        ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
        ctx.fillRect(cx - 160, cy - 80, 320, 160);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px sans-serif';
        ctx.fillText('2D Flatland Plane', cx - 150, cy - 65);

        // Calculate Circle Intersection: r = sqrt(R^2 - y^2)
        if (Math.abs(sphereY) <= sphereRadius) {
          const sliceRadius = Math.sqrt(sphereRadius * sphereRadius - sphereY * sphereY);
          ctx.beginPath();
          ctx.arc(cx, cy, sliceRadius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
          ctx.fill();
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = '12px monospace';
          ctx.fillText(`2D Observer Perception: Circle (r = ${sliceRadius.toFixed(1)} px)`, cx - 120, cy + 120);
        } else {
          ctx.fillStyle = '#f43f5e';
          ctx.font = '12px monospace';
          ctx.fillText('3D Sphere Outside 2D Plane (Completely Invisible)', cx - 140, cy + 120);
        }
      } else {
        // 0D, 1D, 2D, 3D progression
        const cols = [
          { dim: '0D', label: 'Point (0 coords)', x: cx - 220, y: cy },
          { dim: '1D', label: 'Line (1 coord: x)', x: cx - 80, y: cy },
          { dim: '2D', label: 'Square (x, y)', x: cx + 70, y: cy },
          { dim: '3D', label: 'Cube (x, y, z)', x: cx + 200, y: cy },
        ];

        // 0D Point
        ctx.beginPath();
        ctx.arc(cols[0].x, cols[0].y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // 1D Line
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cols[1].x - 30, cols[1].y);
        ctx.lineTo(cols[1].x + 30, cols[1].y);
        ctx.stroke();

        // 2D Square
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(cols[2].x - 25, cols[2].y - 25, 50, 50);

        // 3D Cube Wireframe
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(cols[3].x - 20, cols[3].y - 20, 40, 40);
        ctx.strokeRect(cols[3].x - 10, cols[3].y - 30, 40, 40);
        ctx.beginPath();
        ctx.moveTo(cols[3].x - 20, cols[3].y - 20); ctx.lineTo(cols[3].x - 10, cols[3].y - 30);
        ctx.moveTo(cols[3].x + 20, cols[3].y - 20); ctx.lineTo(cols[3].x + 30, cols[3].y - 30);
        ctx.moveTo(cols[3].x - 20, cols[3].y + 20); ctx.lineTo(cols[3].x - 10, cols[3].y + 10);
        ctx.moveTo(cols[3].x + 20, cols[3].y + 20); ctx.lineTo(cols[3].x + 30, cols[3].y + 10);
        ctx.stroke();

        cols.forEach(c => {
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(c.dim, c.x, c.y + 50);
          ctx.fillStyle = '#64748b';
          ctx.font = '9px monospace';
          ctx.fillText(c.label, c.x, c.y + 65);
        });
        ctx.textAlign = 'left';
      }
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [dimensionMode, flatlandSliceY, isRotating]);

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
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400">Lab #7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Box className="w-7 h-7 text-rose-400" />
            Dimensions & Flatland Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Understand mathematical dimensions through coordinates, Flatland cross-sections, and real-time 4D hypercube projections.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {dimensionMode === 'tesseract' && (
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-700"
            >
              {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRotating ? 'Pause 4D Spin' : 'Resume 4D Spin'}</span>
            </button>
          )}
          <button
            onClick={() => {
              playClickSound();
              setDimensionMode('tesseract');
              setFlatlandSliceY(0);
            }}
            className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs flex items-center gap-1.5 border border-rose-700/60"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Mode</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col justify-between shadow-2xl relative">
          <div className="flex items-center justify-between mb-2 z-10">
            <span className="text-xs text-slate-300 font-mono flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
              <span>
                {dimensionMode === 'tesseract' && '4D Hypercube Stereographic Projection (16 Vertices, 32 Edges)'}
                {dimensionMode === 'flatland' && 'Flatland Slice: 3D Sphere Intersecting 2D Plane'}
                {dimensionMode === '0d-3d' && 'Dimensional Hierarchy: 0D Point to 3D Space'}
              </span>
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

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-center text-xs">
            <button
              onClick={() => {
                playClickSound();
                setDimensionMode('tesseract');
              }}
              className={`p-2 rounded border transition-colors ${
                dimensionMode === 'tesseract' ? 'bg-rose-950 border-rose-500/80 text-white font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              4D Tesseract Projection
            </button>
            <button
              onClick={() => {
                playClickSound();
                setDimensionMode('flatland');
              }}
              className={`p-2 rounded border transition-colors ${
                dimensionMode === 'flatland' ? 'bg-emerald-950 border-emerald-500/80 text-white font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Flatland Analogy
            </button>
            <button
              onClick={() => {
                playClickSound();
                setDimensionMode('0d-3d');
              }}
              className={`p-2 rounded border transition-colors ${
                dimensionMode === '0d-3d' ? 'bg-indigo-950 border-indigo-500/80 text-white font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              0D to 3D Hierarchy
            </button>
          </div>
        </div>

        {/* Controls & Conceptual Rigor */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm">Dimensional Controls</h3>

            {dimensionMode === 'flatland' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Sphere Vertical Position (Y):</span>
                  <span className="font-mono text-emerald-400 font-bold">{flatlandSliceY} px</span>
                </div>
                <input
                  type="range"
                  min={-100}
                  max={100}
                  value={flatlandSliceY}
                  onChange={e => setFlatlandSliceY(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-[10px] text-slate-400 leading-normal">
                  Drag the slider to pass the 3D sphere through the 2D plane. Notice how the 2D observer perceives a circle appearing, expanding to diameter 2R, shrinking to zero, and vanishing.
                </p>
              </div>
            )}

            {dimensionMode === 'tesseract' && (
              <div className="space-y-2 text-[11px] text-slate-300">
                <p className="leading-relaxed">
                  A tesseract is bounded by 8 cubical cells. As it rotates across the 4th spatial coordinate ($w$), the interior cube appears to invert into the exterior cube—this is an optical projection effect, identical to how a 3D wireframe cube casts changing 2D shadows.
                </p>
              </div>
            )}
          </div>

          {/* Critical Demarcation: Math vs Physical Reality */}
          <div className="bg-slate-900 border border-amber-900/60 rounded-xl p-4 text-xs space-y-2 shadow-xl">
            <h4 className="font-semibold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              Empirical Demarcation
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Mathematical consistency in 4 or 10 dimensions does <strong>not</strong> prove the physical existence of extra spatial dimensions.
            </p>
            <p className="text-[10px] text-slate-400 leading-normal">
              In physics, a dimension is merely an independent mathematical variable (coordinate). String Theory’s 10 dimensions remain a theoretical framework lacking experimental confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
