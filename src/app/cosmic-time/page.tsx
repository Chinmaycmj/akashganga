'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { TRADITIONAL_COSMIC_EPOCHS, MODERN_COSMIC_EPOCHS } from '@/data/cosmicTimeData';
import { 
  Hourglass, 
  ShieldCheck 
} from 'lucide-react';
import Link from 'next/link';

export default function CosmicTimeMachinePage() {
  const [selectedTradEpochIdx, setSelectedTradEpochIdx] = useState<number>(0);
  const [selectedModEpochIdx, setSelectedModEpochIdx] = useState<number>(5); // Default to Present Day

  const tradEpoch = TRADITIONAL_COSMIC_EPOCHS[selectedTradEpochIdx];
  const modEpoch = MODERN_COSMIC_EPOCHS[selectedModEpochIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5" /> Cosmic Time Machine
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Yugas & Kalpas vs. Modern Astrophysics Chronology
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Epistemic Demarcation Enabled
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Cosmic Time: Deep Past to Trillion-Year Futures
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Ancient Indian cosmology is uniquely distinguished among world traditions by contemplating immense, billions-of-years cyclical timescales. Explore and contrast the harmonic arithmetic of Yugas and Kalpas side-by-side with modern observational cosmology’s 13.787-billion-year timeline from the Big Bang to the Heat Death.
          </p>
        </div>

        {/* SECTION 1: SIDE-BY-SIDE INTERACTIVE SCRUBBER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* TRACK A: TRADITIONAL INDIAN COSMIC EPOCHS */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Track A • Traditional Indian Model</span>
                  <h2 className="text-2xl font-bold text-white mt-0.5">Cyclical Yugas & Kalpas</h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-serif">
                  Harmonic Arithmetic
                </span>
              </div>

              {/* Epoch Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {TRADITIONAL_COSMIC_EPOCHS.map((epoch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTradEpochIdx(idx)}
                    className={`p-2 rounded-lg text-xs font-semibold text-center transition-all border ${
                      selectedTradEpochIdx === idx
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block truncate">{epoch.name}</span>
                  </button>
                ))}
              </div>

              {/* Epoch Card Display */}
              <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-bold text-white font-serif">
                    {tradEpoch.name} <span className="text-amber-400">({tradEpoch.devanagari})</span>
                  </h3>
                  <span className="text-sm font-mono font-bold text-amber-400">
                    {tradEpoch.solarYearsDuration.toLocaleString()} years
                  </span>
                </div>

                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Divine Proportion:</span> {tradEpoch.humanYearsRatio}
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {tradEpoch.description}
                </p>

                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 text-xs">
                  <strong className="text-slate-300 block mb-1">Moral & Philosophical Nature:</strong>
                  <span className="text-slate-400">{tradEpoch.moralCharacteristics}</span>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 flex justify-between">
                  <span>Source: {tradEpoch.textualSource}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <strong className="text-amber-300">Cosmological Comparison:</strong> {tradEpoch.modernCosmologyComparison}
            </div>
          </div>

          {/* TRACK B: MODERN ASTROPHYSICS & COSMOLOGY */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">Track B • Modern Observational Model</span>
                  <h2 className="text-2xl font-bold text-white mt-0.5">ΛCDM Cosmic Evolution</h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  Empirical Science
                </span>
              </div>

              {/* Epoch Selector Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {MODERN_COSMIC_EPOCHS.map((epoch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedModEpochIdx(idx)}
                    className={`p-2 rounded-lg text-xs font-semibold text-center transition-all border ${
                      selectedModEpochIdx === idx
                        ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-md'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block truncate">{epoch.epochName}</span>
                  </button>
                ))}
              </div>

              {/* Epoch Card Display */}
              <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {modEpoch.epochName}
                  </h3>
                  <span className="text-sm font-mono font-bold text-blue-400">
                    {modEpoch.timeFromBigBang}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {modEpoch.physicsDescription}
                </p>

                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 text-xs">
                  <strong className="text-slate-300 block mb-1">Cosmological Milestone:</strong>
                  <span className="text-slate-400">{modEpoch.cosmicMilestone}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
              <span>Standard Model: Inflationary Big Bang + Dark Energy</span>
              <span className="text-blue-300 font-mono">13.787 Ga</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: DEEP EPISTEMOLOGICAL SYNTHESIS */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Epistemological Analysis: Cyclical Time vs. Linear Expansion
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">
                1. The Architectural Grandeur of Ancient Indian Time
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                While medieval Western theology long held that the universe was created in 4004 BCE (a span of ~6,000 years), ancient Indian astronomers and philosophers conceptualized cosmic spans in billions of years. Carl Sagan famously noted in <em>Cosmos</em>:
              </p>
              <blockquote className="p-3 bg-slate-900/90 border-l-2 border-amber-400 rounded text-xs text-slate-200 italic font-serif">
                &ldquo;The Hindu religion is the only one of the world&apos;s great faiths dedicated to the idea that the Cosmos itself undergoes an immense, indeed an infinite, number of deaths and rebirths... A day of Brahma is 4.32 billion years. That&apos;s a scale that dwarfs ordinary human history.&rdquo;
              </blockquote>
            </div>

            <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">
                2. Gravitational Time Dilation in General Relativity
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                In Einstein’s General Relativity, time is not a uniform universal clock. Clocks run measurably slower in stronger gravitational fields:
              </p>
              <div className="p-2.5 bg-slate-900/90 rounded border border-slate-800 text-center font-mono text-xs text-blue-300 my-2">
                {"Δt' = Δt · √(1 - 2GM / rc²)"}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Similarly, classical Puranic literature contains narratives where individuals travel to Brahmaloka and return to find centuries have elapsed on Earth, showing a profound intuitive fascination with the relativity of experienced time.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: NAVIGATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/ancient-math"
            className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-amber-400/40 transition-all"
          >
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">Explore Mathematics</span>
            <h4 className="text-lg font-bold text-white mb-2">Ancient Mathematics Lab</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Examine Aryabhata’s sine differences, Bhaskara’s approximation, and the Kuttaka algorithm.
            </p>
          </Link>

          <Link
            href="/library"
            className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-purple-400/40 transition-all"
          >
            <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold block mb-1">Explore Primary Sources</span>
            <h4 className="text-lg font-bold text-white mb-2">Textual Knowledge Library</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Read verified Sanskrit verses with IAST transliterations and scholarly translations.
            </p>
          </Link>

          <Link
            href="/curriculum"
            className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-blue-400/40 transition-all"
          >
            <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold block mb-1">Structured Learning</span>
            <h4 className="text-lg font-bold text-white mb-2">10-Stage Learning Map</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Follow the complete curriculum track with quizzes, misconceptions, and activities.
            </p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
