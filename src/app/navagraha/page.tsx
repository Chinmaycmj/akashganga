'use client';

import React, { useState } from 'react';
import { NAVAGRAHAS } from '@/data/navagrahasData';
import { PlanetId } from '@/types/vedicCosmos';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';
import { 
  Orbit, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  HelpCircle, 
  Info, 
  ChevronRight,
  Flame,
  Droplet,
  Wind,
  Layers,
  CheckCircle2
} from 'lucide-react';

type TabType = 'astronomy' | 'symbolism' | 'dignity' | 'quiz';

export default function NavagrahaObservatoryPage() {
  const [selectedGrahaId, setSelectedGrahaId] = useState<PlanetId>('surya');
  const [activeTab, setActiveTab] = useState<TabType>('astronomy');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const selectedGraha = NAVAGRAHAS.find(g => g.id === selectedGrahaId) || NAVAGRAHAS[0];

  const getElementIcon = (elem: string) => {
    if (elem.includes('Fire')) return <Flame className="w-4 h-4 text-amber-500" />;
    if (elem.includes('Water')) return <Droplet className="w-4 h-4 text-blue-400" />;
    if (elem.includes('Air')) return <Wind className="w-4 h-4 text-teal-400" />;
    return <Layers className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Page Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
              <Orbit className="w-3.5 h-3.5" /> Navagraha Observatory
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Vedic Astrometry & Planetary Archetypes
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Epistemic Demarcation Enabled
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            The Nine Celestial Seizers <span className="text-amber-400 font-serif italic">(Navagrahas)</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            In Indian cosmology and mathematical astronomy, the Navagrahas represent the dynamic forces governing physical celestial motion and symbolic archetypes of human consciousness. Explore physical astrophysics facts side-by-side with classical Sanskrit texts, dignity rules, and philosophical meanings.
          </p>
        </div>

        {/* 9 Grahas Selector Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 mb-8">
          {NAVAGRAHAS.map((graha) => {
            const isSelected = graha.id === selectedGrahaId;
            return (
              <button
                key={graha.id}
                onClick={() => {
                  setSelectedGrahaId(graha.id);
                  setQuizAnswer(null);
                  setShowExplanation(false);
                }}
                className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10 text-amber-300 scale-105'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base mb-1.5 shadow-inner"
                  style={{ 
                    backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.25)' : 'rgba(30, 41, 59, 0.8)',
                    borderColor: graha.color,
                    borderWidth: '2px'
                  }}
                >
                  <span className="text-xs font-serif">{graha.devanagari}</span>
                </div>
                <span className="text-xs font-bold tracking-wide truncate w-full">{graha.sanskritName}</span>
                <span className="text-[10px] text-slate-400 truncate w-full">{graha.englishName.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Main Graha Dossier Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl mb-12">
          {/* Card Top Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-5">
              <div 
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 shadow-xl shrink-0"
                style={{ borderColor: selectedGraha.color, backgroundColor: 'rgba(15, 23, 42, 0.9)' }}
              >
                <span className="text-2xl font-serif font-extrabold text-amber-300">{selectedGraha.devanagari}</span>
                <span className="text-[11px] font-mono tracking-widest text-slate-300">{selectedGraha.iast}</span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedGraha.sanskritName}
                  </h2>
                  <span className="text-sm font-medium text-slate-400">({selectedGraha.englishName})</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                    {selectedGraha.pronunciation}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80">
                    {getElementIcon(selectedGraha.element)} {selectedGraha.element}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-800/80 text-amber-300">
                    Guna: {selectedGraha.gunas}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-800/80 text-blue-300">
                    Day: {selectedGraha.dayOfWeek || 'Lunar Node (No weekday)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Epistemic Badge */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2">
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border flex items-center gap-1.5 ${
                selectedGraha.isPhysicalPlanet
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
              }`}>
                <ShieldCheck className="w-4 h-4" />
                {selectedGraha.isPhysicalPlanet ? 'Physical Celestial Body' : 'Mathematical Orbital Node'}
              </span>
              <span className="text-[11px] text-slate-400">
                Archetype: <strong className="text-slate-200">{selectedGraha.archetype}</strong>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 mt-6 gap-2">
            {[
              { id: 'astronomy', label: 'Physical Astronomy', icon: Orbit },
              { id: 'symbolism', label: 'Symbolism & Texts', icon: BookOpen },
              { id: 'dignity', label: 'Dignity & Relationships', icon: Compass },
              { id: 'quiz', label: 'Knowledge Check', icon: HelpCircle }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panes */}
          <div className="py-6">
            {activeTab === 'astronomy' && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Modern Astronomical Identity
                  </h3>
                  <p className="text-base text-slate-200 leading-relaxed">
                    {selectedGraha.astronomicalIdentity}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedGraha.astronomyFacts.diameterKm && (
                    <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 uppercase tracking-wider block">Equatorial Diameter</span>
                      <span className="text-xl font-extrabold text-white mt-1 block">
                        {selectedGraha.astronomyFacts.diameterKm.toLocaleString()} km
                      </span>
                    </div>
                  )}

                  {selectedGraha.astronomyFacts.orbitalPeriodDays && (
                    <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 uppercase tracking-wider block">Orbital Period</span>
                      <span className="text-xl font-extrabold text-white mt-1 block">
                        {selectedGraha.astronomyFacts.orbitalPeriodDays.toLocaleString()} days
                      </span>
                    </div>
                  )}

                  {selectedGraha.astronomyFacts.meanDistanceFromSunAU !== undefined && (
                    <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 uppercase tracking-wider block">Mean Distance (Sun)</span>
                      <span className="text-xl font-extrabold text-white mt-1 block">
                        {selectedGraha.astronomyFacts.meanDistanceFromSunAU} AU
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Astrophysical Characteristics</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedGraha.astronomyFacts.physicalCharacteristics}
                  </p>
                </div>

                {!selectedGraha.isPhysicalPlanet && (
                  <div className="p-4 bg-purple-950/20 border border-purple-800/40 rounded-xl text-purple-200 text-sm leading-relaxed">
                    <strong>Critical Scientific Caveat:</strong> In classical Siddhantas, ancient scholars like Aryabhata explicitly distinguished Rahu and Ketu from physical bodies. They are coordinate nodes (Pata) where the Moon’s 5.14° orbital inclination plane intersects the ecliptic. Eclipses occur exclusively along these mathematical axes.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'symbolism' && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Core Psychological & Spiritual Meaning</h3>
                  <p className="text-base text-slate-200 leading-relaxed font-serif">
                    &ldquo;{selectedGraha.symbolicMeaning}&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Traditional Mythological Narrative</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedGraha.mythologicalNarrative}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Primary Textual Citations</h4>
                    <p className="text-sm text-slate-300 leading-relaxed italic">
                      {selectedGraha.textualSource}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Sacred Mantra:</span>
                        <span className="text-amber-300 font-serif">{selectedGraha.mantra}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Gemstone:</span>
                        <span className="text-slate-200">{selectedGraha.gemstone}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Cardinal Direction:</span>
                        <span className="text-slate-200">{selectedGraha.direction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dignity' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-emerald-950/20 border border-emerald-800/30 rounded-xl">
                    <span className="text-xs text-emerald-400 uppercase font-semibold block">Exaltation (Ucca)</span>
                    <span className="text-lg font-bold text-white mt-1 block">{selectedGraha.exaltationRashi}</span>
                    <span className="text-xs text-emerald-300/80 mt-0.5 block">Peak degree: {selectedGraha.exaltationDegree}°</span>
                  </div>

                  <div className="p-4 bg-amber-950/20 border border-amber-800/30 rounded-xl">
                    <span className="text-xs text-amber-400 uppercase font-semibold block">Moolatrikona (Root)</span>
                    <span className="text-lg font-bold text-white mt-1 block">{selectedGraha.moolatrikonaRashi}</span>
                    <span className="text-xs text-amber-300/80 mt-0.5 block">{selectedGraha.moolatrikonaRange}</span>
                  </div>

                  <div className="p-4 bg-blue-950/20 border border-blue-800/30 rounded-xl">
                    <span className="text-xs text-blue-400 uppercase font-semibold block">Own Sign (Svakshetra)</span>
                    <span className="text-lg font-bold text-white mt-1 block">
                      {selectedGraha.rulingRashis.join(', ')}
                    </span>
                    <span className="text-xs text-blue-300/80 mt-0.5 block">Natural Rulership</span>
                  </div>

                  <div className="p-4 bg-rose-950/20 border border-rose-800/30 rounded-xl">
                    <span className="text-xs text-rose-400 uppercase font-semibold block">Debilitation (Nica)</span>
                    <span className="text-lg font-bold text-white mt-1 block">{selectedGraha.debilitationRashi}</span>
                    <span className="text-xs text-rose-300/80 mt-0.5 block">Nadir degree: {selectedGraha.debilitationDegree}°</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Traditional Aspects (Drishti)</h4>
                    <p className="text-sm text-slate-300">
                      Casts full vision on the <strong>{selectedGraha.aspects.map(a => `${a}th`).join(', ')}</strong> house(s) from its placement.
                      {selectedGraha.aspects.length > 1 && ' (Possesses special Vishesha Drishti aspects).'}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Natural Planetary Alliances</h4>
                    <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                      <div><strong className="text-emerald-400">Friends:</strong> {selectedGraha.naturalFriends.length ? selectedGraha.naturalFriends.join(', ') : 'None (Universal Friend)'}</div>
                      <div><strong className="text-slate-400">Neutrals:</strong> {selectedGraha.naturalNeutrals.length ? selectedGraha.naturalNeutrals.join(', ') : 'None'}</div>
                      <div><strong className="text-rose-400">Enemies:</strong> {selectedGraha.naturalEnemies.length ? selectedGraha.naturalEnemies.join(', ') : 'None (Universal Benevolence)'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 max-w-2xl">
                <h3 className="text-lg font-bold text-white mb-2">
                  Knowledge Mastery Check: {selectedGraha.sanskritName}
                </h3>
                <p className="text-sm text-slate-300 mb-6">
                  {selectedGraha.isPhysicalPlanet 
                    ? `Where is ${selectedGraha.sanskritName} exalted in traditional Sidereal Jyotisha?`
                    : `What is the physical nature of ${selectedGraha.sanskritName} in astronomical science?`}
                </p>

                <div className="space-y-3">
                  {[
                    selectedGraha.isPhysicalPlanet 
                      ? `${selectedGraha.exaltationRashi} at ${selectedGraha.exaltationDegree}°` 
                      : 'An intersection node between the Moon’s orbital plane and the ecliptic',
                    selectedGraha.isPhysicalPlanet 
                      ? `${selectedGraha.debilitationRashi} at ${selectedGraha.debilitationDegree}°` 
                      : 'A distant dark dwarf planet beyond Pluto',
                    selectedGraha.isPhysicalPlanet 
                      ? 'Simha (Leo) at 0°' 
                      : 'A cluster of comets in the Oort cloud'
                  ].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuizAnswer(idx);
                        setShowExplanation(true);
                      }}
                      className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-center justify-between ${
                        quizAnswer === idx
                          ? idx === 0 
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-200' 
                            : 'bg-rose-500/15 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span>{option}</span>
                      {quizAnswer === idx && (
                        idx === 0 
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          : <Info className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="mt-6 p-4 bg-slate-900/90 rounded-lg border border-slate-700 text-sm">
                    <span className="font-bold text-amber-400 block mb-1">Pedagogical Explanation:</span>
                    <span className="text-slate-300 leading-relaxed">
                      {selectedGraha.isPhysicalPlanet 
                        ? `${selectedGraha.sanskritName} reaches its highest classical dignity (Ucca) in ${selectedGraha.exaltationRashi} at ${selectedGraha.exaltationDegree}°, representing peak functional expression in traditional Siddhantic texts.`
                        : `${selectedGraha.sanskritName} is an astronomical lunar orbital node (Pata) where the Moon crosses the ecliptic, creating the causal condition for solar and lunar eclipses.`}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Route Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/rashi-nakshatra" 
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Next Exploration</span>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              Rashi & Nakshatra Atlas
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Explore the 12 sidereal Rashis, 27 Nakshatras, and all 108 Padas mapped to fixed background stars.
            </p>
          </Link>

          <Link 
            href="/chart-lab" 
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-blue-500/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Laboratory</span>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
              Jyotisha Chart Lab
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Generate transparent North and South Indian birth charts with Lahiri/Raman ayanamsha options.
            </p>
          </Link>

          <Link 
            href="/curriculum" 
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">Structured Learning</span>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              10-Stage Learning Map
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Follow the complete prerequisite-based curriculum from Celestial Foundations to Advanced Synthesis.
            </p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
