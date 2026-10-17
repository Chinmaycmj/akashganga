'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAudio } from '@/context/AudioContext';
import {
  Sparkles,
  Compass,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CircleDot,
  Orbit,
  Box,
  Calculator,
  Layers,
} from 'lucide-react';

// Dynamically import EarthSurfaceScene for hero preview
const EarthSurfaceScene = dynamic(() => import('@/components/3d/EarthSurfaceScene'), { ssr: false });

export default function LandingPage() {
  const { playClickSound } = useAudio();

  const previewStages = [
    { id: 1, title: "Earth's Core", scale: "10⁶ m", color: "from-amber-500 to-orange-600" },
    { id: 4, title: "Solar System", scale: "10¹² m", color: "from-yellow-400 to-amber-500" },
    { id: 8, title: "The Milky Way", scale: "10²¹ m", color: "from-indigo-500 to-purple-600" },
    { id: 11, title: "The Cosmic Web", scale: "10²⁵ m", color: "from-cyan-400 to-blue-600" },
    { id: 12, title: "Observable Universe", scale: "10²⁶ m", color: "from-teal-400 to-emerald-600" },
    { id: 14, title: "Dimensions & Multiverse", scale: "> 10²⁷ m", color: "from-rose-500 to-pink-600" },
  ];

  const teachingPhases = [
    { step: '1. Wonder', desc: 'Confront surprising, counter-intuitive astrophysical questions that shatter everyday assumptions.' },
    { step: '2. Explore', desc: 'Interact directly with real-time 3D models, relativistic grids, and physical simulations.' },
    { step: '3. Observe', desc: 'Track what changes and what stays constant across cosmological orders of magnitude.' },
    { step: '4. Understand', desc: 'Digest clear explanations stratified into Beginner, Intermediate, and Advanced tiers.' },
    { step: '5. Test', desc: 'Check your conceptual understanding with instant-feedback quizzes and scientific rationales.' },
    { step: '6. Connect', desc: 'Link individual phenomena into the unified cosmological framework of physical reality.' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Cinematic Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-12 pb-12 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-mono uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>An Immersive Universe Exploration Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              From the Core of Earth to the Edge of the{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Observable Universe
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore the scales of reality, experiment with the laws of physics, and discover what science knows—and what it is still trying to understand.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/journey"
                onClick={() => playClickSound()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4" />
                <span>Begin the Journey</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <Link
                href="/atlas"
                onClick={() => playClickSound()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Explore the Knowledge Atlas</span>
              </Link>
            </div>

            {/* Scientific Governance Pill */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-2 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Peer-Reviewed Data</span>
              </div>
              <span>•</span>
              <div>14 Scale Stages</div>
              <span>•</span>
              <div>8 Interactive Labs</div>
            </div>
          </div>

          {/* Hero 3D Earth Preview Canvas */}
          <div className="lg:col-span-5 h-[360px] sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative bg-slate-950">
            <EarthSurfaceScene />
            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-mono">
              Stage 2 • 12,742 km Diameter
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 14-Stage Journey Preview Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-1">
              Cosmic Progression
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Zoom Out Across 21 Orders of Magnitude
            </h2>
          </div>
          <Link
            href="/journey"
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
          >
            <span>Launch Full Journey (14 Stages)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {previewStages.map(s => (
            <Link
              key={s.id}
              href={`/journey?stage=${s.id}`}
              onClick={() => playClickSound()}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-xl p-4 flex flex-col justify-between group transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="text-[10px] font-mono text-slate-400 mb-1">Stage {s.id}</div>
                <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {s.title}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-300">{s.scale}</span>
                <span className="text-slate-600 group-hover:text-indigo-400 text-xs">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Signature Interactive Labs Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
              Hands-On Experiments
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Signature Interactive Laboratories
            </h2>
          </div>
          <Link
            href="/labs"
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
          >
            <span>View All 8 Labs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Lab 1: Black Hole */}
          <Link
            href="/labs/black-hole"
            className="group bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-xl p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-600/40 text-amber-400 w-fit mb-3">
                <CircleDot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                Black Hole & Event Horizon Lab
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vary mass from stellar to supermassive (M87*), test photon sphere orbits, and observe relativistic Doppler beaming.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-medium text-amber-400">
              <span>Experiment Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Lab 2: Orbital Mechanics */}
          <Link
            href="/labs/orbital-mechanics"
            className="group bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-indigo-950/80 border border-indigo-600/40 text-indigo-400 w-fit mb-3">
                <Orbit className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5">
                Gravity & Orbital Mechanics Lab
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adjust central mass, orbital radius, and velocity to simulate circular, elliptical, or escape trajectories in real-time.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-medium text-indigo-400">
              <span>Experiment Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Lab 7: Dimensions Explorer */}
          <Link
            href="/labs/dimensions-explorer"
            className="group bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 rounded-xl p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-600/40 text-rose-400 w-fit mb-3">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors mb-1.5">
                Dimensions & Flatland Explorer
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rotate a 4D tesseract in real-time and observe how a 2D observer perceives 3D objects slicing through their plane.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-medium text-rose-400">
              <span>Experiment Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Vedic Cosmology, Jyotisha & Mathematical Astronomy Academy Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ancient Science & Cosmology Academy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Indian Astronomy, Vedic Cosmology & Jyotisha
            </h2>
          </div>
          <Link
            href="/curriculum"
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
          >
            <span>View 10-Stage Curriculum Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Navagraha Observatory */}
          <Link
            href="/navagraha"
            onClick={() => playClickSound()}
            className="group bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 rounded-2xl p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit mb-3">
                <Orbit className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                Navagraha Observatory
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explore the nine celestial archetypes from Surya to Rahu and Ketu with physical vs. symbolic demarcation.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-medium text-amber-400">
              <span>Open Observatory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Rashi & Nakshatra Atlas */}
          <Link
            href="/rashi-nakshatra"
            onClick={() => playClickSound()}
            className="group bg-slate-900/90 border border-slate-800 hover:border-purple-400/50 rounded-2xl p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
                Rashi & Nakshatra Atlas
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The 360° celestial wheel of 12 signs, 27 lunar mansions, and 108 padas anchored to fixed background stars.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-medium text-purple-400">
              <span>Explore Atlas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Jyotisha Chart Lab */}
          <Link
            href="/chart-lab"
            onClick={() => playClickSound()}
            className="group bg-slate-900/90 border border-slate-800 hover:border-blue-400/50 rounded-2xl p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 w-fit mb-3">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-1">
                Jyotisha Chart Lab
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transparent birth chart calculation engine rendering both North and South Indian Kundli with Lahiri ayanamsha.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-medium text-blue-400">
              <span>Generate Chart</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Ancient Mathematics Lab */}
          <Link
            href="/ancient-math"
            onClick={() => playClickSound()}
            className="group bg-slate-900/90 border border-slate-800 hover:border-emerald-400/50 rounded-2xl p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                Ancient Mathematics Lab
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interactive Aryabhata 24 sine table, Bhaskara I rational sine formula, and Kuttaka Diophantine solver.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <span>Launch Lab</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 5. Pedagogical Learning Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Pedagogical Framework
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How The Infinite Cosmos Teaches
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Every chapter and stage adheres to a six-step cognitive inquiry cycle designed to build authentic scientific intuition:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachingPhases.map((phase, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-indigo-400 font-mono">{phase.step}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final Prominent Invitation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-950 border border-indigo-900/50 shadow-2xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Explore the Infinite Cosmos?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Begin deep inside Earth’s molten dynamo and travel continuously outward to the cosmic web, the cosmic microwave background, and theoretical multiverse horizons.
          </p>
          <div className="pt-2">
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <Compass className="w-5 h-5" />
              <span>Launch Your Cosmic Exploration</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
