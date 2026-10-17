'use client';

import React, { useState } from 'react';
import { useAudio } from '@/context/AudioContext';
import { Layers, AlertTriangle, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import Link from 'next/link';

interface MultiverseModel {
  id: string;
  name: string;
  framework: string;
  summary: string;
  whyConsidered: string;
  mathMotivation: string;
  empiricalEvidence: string;
  falsifiabilityRequirements: string;
  scientificClassification: 'Current model consequence' | 'Hypothesis' | 'Speculative Interpretation';
  color: string;
}

const MODELS: MultiverseModel[] = [
  {
    id: 'level-1',
    name: 'Level I: Distant Hubble Volumes',
    framework: 'Standard ΛCDM Cosmology + Infinite Space',
    summary: 'In an infinite, statistically flat universe, identical or nearly identical configurations of matter must repeat beyond our 93-billion-light-year particle horizon due to combinatorial quantum limits.',
    whyConsidered: 'Direct mathematical corollary of spatial flatness (Planck measured |Ωₖ| < 0.004) combined with infinite spatial topology.',
    mathMotivation: 'A Hubble volume contains ~10¹¹⁸ quantum states. In a volume exceeding ~10^(10¹¹⁸) meters, quantum state arrangements must repeat identically.',
    empiricalEvidence: 'Indirect: Spatial flatness is verified to 0.4% precision. However, regions beyond our cosmic horizon are permanently unobservable.',
    falsifiabilityRequirements: 'Could be challenged if cosmic topology is discovered to be compact and closed with fundamental domain smaller than our particle horizon (searches for matched circles in CMB).',
    scientificClassification: 'Hypothesis',
    color: '#38bdf8',
  },
  {
    id: 'level-2',
    name: 'Level II: Eternal Inflation Bubbles',
    framework: 'Cosmic Inflation Theory + String Landscape',
    summary: 'Cosmic inflation does not end everywhere simultaneously. While inflation ceased in our pocket 13.8 billion years ago, the inflating vacuum expands exponentially elsewhere, continually birthing new "bubble" universes with differing effective physical constants.',
    whyConsidered: 'Solves the fine-tuning puzzle of why the cosmological constant (Λ) and fundamental force couplings are hospitable to chemistry and life (anthropic selection).',
    mathMotivation: 'The inflaton potential landscape in String Theory possesses ~10⁵⁰⁰ distinct vacuum minima with different compactification geometries.',
    empiricalEvidence: 'Zero confirmed evidence. Searches for disk-like circular temperature discontinuities in the CMB from bubble collisions have yielded null results.',
    falsifiabilityRequirements: 'Requires observing distinct, statistically significant polarization or temperature anomalies in the CMB directly matching relativistic domain wall collisions.',
    scientificClassification: 'Hypothesis',
    color: '#a855f7',
  },
  {
    id: 'level-3',
    name: 'Level III: Everett’s Many-Worlds',
    framework: 'Unitary Quantum Mechanics (Pure Schrödinger Evolution)',
    summary: 'Wavefunctions never physically collapse. During quantum decoherence, the universal wavefunction branches deterministically in Hilbert space into mutually unobservable branches.',
    whyConsidered: 'Eliminates the arbitrary & ill-defined "measurement problem" and ad-hoc Copenhagen wavefunction collapse postulate, keeping the Schrödinger equation universal.',
    mathMotivation: 'Linear unitary evolution: iℏ d|Ψ⟩/dt = H|Ψ⟩. Entanglement with macroscopic measuring apparatuses causes environmental decoherence without non-linear collapse.',
    empiricalEvidence: 'Indirect: Quantum interference and Bell inequality violations verify unitary superpositions, but other branches cannot exchange classical signals.',
    falsifiabilityRequirements: 'Could be falsified if experimental tests verify an objective, non-linear physical collapse threshold (e.g. Penrose gravitational collapse or GRW spontaneous localization).',
    scientificClassification: 'Speculative Interpretation',
    color: '#ec4899',
  },
  {
    id: 'level-4',
    name: 'Level IV: Mathematical Universe',
    framework: 'Ontological Structural Realism (Max Tegmark)',
    summary: 'All structures that exist mathematically also exist physically. Our universe is not merely described by mathematics; it is a mathematical structure.',
    whyConsidered: 'Answers Eugene Wigner’s famous question: "Why is mathematics so unreasonably effective in describing natural physics?" by positing they are identical.',
    mathMotivation: 'Computable mathematical structures (Gödelian logic, abstract category theory).',
    empiricalEvidence: 'Zero observational confirmation. Widely categorized as metaphysical philosophy rather than empirical astrophysics.',
    falsifiabilityRequirements: 'Extremely difficult to test or falsify; fails standard Popperian demarcation unless it produces specific constraints on the distribution of physical laws.',
    scientificClassification: 'Speculative Interpretation',
    color: '#f43f5e',
  },
  {
    id: 'braneworlds',
    name: 'String Theory Braneworlds',
    framework: 'M-Theory (11 Dimensions) & D-Branes',
    summary: 'Our observable 3+1 dimensional spacetime is a membrane ("3-brane") floating in a higher-dimensional bulk space, where only gravity (closed strings) can propagate freely between parallel branes.',
    whyConsidered: 'Addresses the Hierarchy Problem: why gravity is 10³⁶ times weaker than the electromagnetic force (gravitons leak into higher-dimensional bulk).',
    mathMotivation: 'Type IIA/IIB superstrings and Dirichlet branes where open gauge strings have endpoints pinned to the brane surface.',
    empiricalEvidence: 'Null results so far: Tabletop sub-millimeter gravity experiments at Eöt-Wash have tested Newton’s 1/r² law down to ~50 micrometers without finding extra dimensions.',
    falsifiabilityRequirements: 'Detection of microscopic black holes, missing momentum (graviton leakage) at particle colliders, or sub-millimeter deviations in gravitational force.',
    scientificClassification: 'Hypothesis',
    color: '#f59e0b',
  },
];

export default function MultiverseLabPage() {
  const { playClickSound } = useAudio();
  const [selectedModelId, setSelectedModelId] = useState<string>('level-1');

  const activeModel = MODELS.find(m => m.id === selectedModelId) || MODELS[0];

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
            <span className="text-xs font-mono uppercase tracking-wider text-fuchsia-400">Lab #8</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-fuchsia-400" />
            Multiverse Hypothesis Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Examine theoretical multiverse frameworks, evaluate mathematical motivations, and uphold empirical testability limits.
          </p>
        </div>

        {/* Global Warning Banner */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-600/60 text-rose-300 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>Zero confirmed observational evidence exists for any parallel universe</span>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {MODELS.map(m => {
          const isSelected = m.id === selectedModelId;
          return (
            <button
              key={m.id}
              onClick={() => {
                playClickSound();
                setSelectedModelId(m.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg ring-1 ring-indigo-500/50'
                  : 'bg-slate-950/70 border-slate-800 hover:bg-slate-900 text-slate-400'
              }`}
            >
              <div className="w-2 h-2 rounded-full mb-1.5" style={{ backgroundColor: m.color }} />
              <div className="text-xs font-bold text-white truncate">{m.name}</div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">{m.scientificClassification}</div>
            </button>
          );
        })}
      </div>

      {/* Detailed Hypothesis Analysis Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Theoretical Model Overview
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">{activeModel.name}</h2>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Framework: <span className="text-slate-200">{activeModel.framework}</span>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-medium">
            Status: {activeModel.scientificClassification}
          </span>
        </div>

        {/* 4 Pillars of Scientific Investigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Core Physical Idea */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              1. The Fundamental Hypothesis
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{activeModel.summary}</p>
          </div>

          {/* 2. Why Physicists Consider It */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              2. Theoretical Motivation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{activeModel.whyConsidered}</p>
            <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800/80">
              Math: {activeModel.mathMotivation}
            </div>
          </div>

          {/* 3. Current Empirical Evidence */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              3. Current Observational Evidence
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{activeModel.empiricalEvidence}</p>
          </div>

          {/* 4. What Would Falsify or Confirm It */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              4. Falsifiability & Testing Requirements
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{activeModel.falsifiabilityRequirements}</p>
          </div>
        </div>

        {/* Demarcation Summary Footer */}
        <div className="p-4 rounded-lg bg-indigo-950/30 border border-indigo-800/40 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Karl Popper’s Demarcation Principle:</strong> A conjecture is scientifically meaningful only if it can make testable, falsifiable empirical predictions. The Infinite Cosmos strictly demarcates confirmed observational astronomy from mathematically motivated hypothetical universes.
          </p>
        </div>
      </div>
    </div>
  );
}
