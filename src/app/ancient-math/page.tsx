'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { 
  bhaskaraSineApproximation, 
  getAryabhataSineTable, 
  solveKuttaka,
  calculateJulianDay
} from '@/utils/vedicAstronomyMath';
import { 
  Calculator, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export default function AncientMathLabPage() {
  // Bhaskara I Sine Approximation state
  const [sineAngleDeg, setSineAngleDeg] = useState<number>(30);
  const sineRad = (sineAngleDeg * Math.PI) / 180;
  const sineResult = bhaskaraSineApproximation(sineRad);

  // Aryabhata Sine Table
  const sineTable = getAryabhataSineTable();

  // Kuttaka Solver state
  const [coeffA, setCoeffA] = useState<number>(137);
  const [coeffB, setCoeffB] = useState<number>(60);
  const [coeffC, setCoeffC] = useState<number>(1);
  const kuttakaResult = solveKuttaka(coeffA, coeffB, coeffC);

  // Ahargana Calculator state
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [currentMonth, setCurrentMonth] = useState<number>(10);
  const [currentDay, setCurrentDay] = useState<number>(17);

  // Kali Yuga Epoch: Feb 18, 3102 BCE is JD 588465.5
  const KALI_YUGA_EPOCH_JD = 588465.5;
  const currentJD = calculateJulianDay(currentYear, currentMonth, currentDay, 0, 0, 0);
  const aharganaDays = Math.floor(currentJD - KALI_YUGA_EPOCH_JD);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" /> Ancient Mathematics Laboratory
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Aryabhata • Brahmagupta • Bhaskara I & II
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Interactive Historical Algorithms
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Indian Astronomy & Mathematics Lab
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Reconstruct and interact with the groundbreaking algorithms of classical Indian mathematical astronomers. Test Bhaskara I’s 7th-century rational sine approximation, explore Aryabhata’s 24-step sine table from 499 CE, and solve indeterminate Diophantine astronomical equations using the Kuttaka pulverizer method.
          </p>
        </div>

        {/* EXPERIMENT 1: BHASKARA I SINE APPROXIMATION */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Experiment 1 • 629 CE</span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Bhaskara I’s Rational Sine Approximation Formula
              </h2>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              Max Error &lt; 1% Across All Angles
            </div>
          </div>

          <div className="my-6 p-4 bg-slate-950/70 border border-slate-800 rounded-xl font-mono text-center text-sm sm:text-base text-amber-300">
            sin(x) ≈ [ 16x(π - x) ] / [ 5π² - 4x(π - x) ]  (for x in [0, π])
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Slider */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Test Angle θ: <strong className="text-amber-400 font-mono text-base">{sineAngleDeg}°</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="1"
                  value={sineAngleDeg}
                  onChange={(e) => setSineAngleDeg(parseInt(e.target.value) || 0)}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
                  <span>0°</span>
                  <span>45°</span>
                  <span>90°</span>
                  <span>135°</span>
                  <span>180°</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-2">
                <p>
                  <strong>Historical Context:</strong> In his 629 CE commentary on Aryabhata, Bhaskara I presented this brilliant algebraic formula over a thousand years before European mathematicians discovered trigonometric series expansions.
                </p>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Bhaskara Approx</span>
                <span className="text-xl font-mono font-bold text-amber-400 mt-1 block">
                  {sineResult.approximateSine.toFixed(6)}
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Modern Exact</span>
                <span className="text-xl font-mono font-bold text-blue-400 mt-1 block">
                  {sineResult.exactSine.toFixed(6)}
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Absolute Error</span>
                <span className="text-xl font-mono font-bold text-slate-300 mt-1 block">
                  {sineResult.absoluteError.toFixed(6)}
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Relative Error</span>
                <span className="text-xl font-mono font-bold text-emerald-400 mt-1 block">
                  {sineResult.relativeErrorPercent.toFixed(3)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* EXPERIMENT 2: KUTTAKA (PULVERIZER) DIOPHANTINE SOLVER */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Experiment 2 • 499 CE</span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Aryabhata’s Kuttaka (Pulverizer) Diophantine Algorithm
              </h2>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              Linear Indeterminate Equation Solver
            </div>
          </div>

          <p className="text-sm text-slate-300 my-4 leading-relaxed">
            Ancient astronomers needed to find when celestial bodies with different synodic periods would coincide at the same longitude. This required solving linear Diophantine equations: <strong className="text-white font-mono">a · x - b · y = c</strong> for integer unknowns <strong className="font-mono text-amber-300">x</strong> and <strong className="font-mono text-amber-300">y</strong>.
          </p>

          {/* Equation Input Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">Coefficient a</label>
              <input
                type="number"
                value={coeffA}
                onChange={(e) => setCoeffA(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-center text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">Coefficient b</label>
              <input
                type="number"
                value={coeffB}
                onChange={(e) => setCoeffB(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-center text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase block mb-1">Constant c</label>
              <input
                type="number"
                value={coeffC}
                onChange={(e) => setCoeffC(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-center text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Solution Display */}
          <div className="p-6 bg-slate-950/70 border border-slate-800 rounded-xl">
            {kuttakaResult.hasSolution ? (
              <div>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Integer Solution Found
                  </span>
                  <span className="text-xs text-slate-400">
                    GCD({coeffA}, {coeffB}) = <strong className="text-white font-mono">{kuttakaResult.gcd}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Smallest Positive x</span>
                    <span className="text-2xl font-mono font-bold text-amber-400 mt-1 block">x = {kuttakaResult.x}</span>
                  </div>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Corresponding y</span>
                    <span className="text-2xl font-mono font-bold text-purple-400 mt-1 block">y = {kuttakaResult.y}</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-300 p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                  General Solution: {kuttakaResult.generalSolution}
                </div>

                <div className="mt-4 text-xs text-slate-400 space-y-1">
                  {kuttakaResult.explanationSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-rose-400 text-sm">
                No integer solution exists because constant {coeffC} is not divisible by GCD({coeffA}, {coeffB}) = {kuttakaResult.gcd}.
              </div>
            )}
          </div>
        </div>

        {/* EXPERIMENT 3: ARYABHATA’S 24 SINE TABLE */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Experiment 3 • Aryabhatiya Gitikapada 12</span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Aryabhata’s 24-Step Trigonometric Jya (Sine) Table
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Radius R = 3438 arcminutes (21,600′ / 2π)
            </div>
          </div>

          <p className="text-sm text-slate-300 my-4 leading-relaxed">
            Aryabhata partitioned the 90° quadrant into 24 equal arcs of 225 arcminutes (3° 45′). Using second differences, he computed the 24 historical values below. Compare his 1,500-year-old figures with modern trigonometric calculations:
          </p>

          <div className="overflow-x-auto max-h-96 border border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs font-mono text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider sticky top-0 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Step</th>
                  <th className="py-2.5 px-3">Angle (Deg & Min)</th>
                  <th className="py-2.5 px-3">Aryabhata Jya (499 CE)</th>
                  <th className="py-2.5 px-3">Modern Exact R·sin θ</th>
                  <th className="py-2.5 px-3">Discrepancy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                {sineTable.map((row) => (
                  <tr key={row.step} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-slate-400">#{row.step}</td>
                    <td className="py-2 px-3 text-white font-sans">{row.arcDegrees}</td>
                    <td className="py-2 px-3 text-amber-300 font-bold">{row.aryabhataJya}′</td>
                    <td className="py-2 px-3 text-blue-400">{row.exactModernJya}′</td>
                    <td className="py-2 px-3 text-emerald-400">{row.errorMinutes}′</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EXPERIMENT 4: AHARGANA DAY COUNT */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Experiment 4 • Epoch Astrometry</span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Ahargana: Civil Solar Days Elapsed Since Kali Yuga
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Astronomical Epoch: Midnight Feb 18, 3102 BCE at Ujjain
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-6">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Calculate for Date (YYYY-MM-DD)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <input
                  type="number"
                  value={currentYear}
                  onChange={(e) => setCurrentYear(parseInt(e.target.value) || 2024)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(parseInt(e.target.value) || 1)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={currentDay}
                  onChange={(e) => setCurrentDay(parseInt(e.target.value) || 1)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                In classical Siddhantas, the Ahargana was the fundamental master input. By multiplying Ahargana by mean daily planetary revolutions, astronomers derived mean planetary longitudes.
              </p>
            </div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs uppercase tracking-widest text-slate-400 block mb-1">
                Total Elapsed Mean Solar Days (Ahargana)
              </span>
              <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-400 block">
                {aharganaDays.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 mt-2 block font-mono">
                Julian Day Number: {currentJD.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
