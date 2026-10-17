'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { RASHIS, NAKSHATRAS } from '@/data/rashiNakshatraData';
import { 
  getRashiFromLongitude, 
  getNakshatraFromLongitude, 
  getNavamshaRashi 
} from '@/utils/vedicAstronomyMath';
import { 
  Compass, 
  Search, 
  Layers, 
  Sliders, 
  Star, 
  Info, 
  Flame, 
  Droplet, 
  Wind
} from 'lucide-react';
import Link from 'next/link';

export default function RashiNakshatraAtlasPage() {
  const [selectedRashiId, setSelectedRashiId] = useState<number>(1);
  const [selectedNakshatraId, setSelectedNakshatraId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [planetFilter, setPlanetFilter] = useState<string>('all');
  const [interactiveLongitude, setInteractiveLongitude] = useState<number>(180.0); // Default on Spica / Chitra

  // Calculation for the interactive slider
  const rashiCalc = getRashiFromLongitude(interactiveLongitude);
  const nakshatraCalc = getNakshatraFromLongitude(interactiveLongitude);
  const navamshaCalc = getNavamshaRashi(rashiCalc.rashiIndex, rashiCalc.degreeInRashi);

  const selectedRashi = RASHIS.find(r => r.id === selectedRashiId) || RASHIS[0];
  const selectedNakshatra = NAKSHATRAS.find(n => n.id === selectedNakshatraId) || NAKSHATRAS[0];

  const filteredNakshatras = NAKSHATRAS.filter(n => {
    const matchesSearch = 
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.associatedStars.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlanet = planetFilter === 'all' || n.rulingPlanetId === planetFilter;
    return matchesSearch && matchesPlanet;
  });

  const getElementBadge = (elem: string) => {
    if (elem.includes('Fire')) {
      return <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"><Flame className="w-3 h-3" /> {elem}</span>;
    }
    if (elem.includes('Water')) {
      return <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20"><Droplet className="w-3 h-3" /> {elem}</span>;
    }
    if (elem.includes('Air')) {
      return <span className="flex items-center gap-1 text-xs text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20"><Wind className="w-3 h-3" /> {elem}</span>;
    }
    return <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"><Layers className="w-3 h-3" /> {elem}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> Celestial Sidereal Atlas
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
              12 Rashis • 27 Nakshatras • 108 Padas
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Rashi & Nakshatra Celestial Atlas
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            The Sidereal Zodiac maps the 360° circle of the ecliptic against fixed background stars. Explore the mathematical harmony connecting the 12 solar Rashis (30° each) with the 27 lunar Nakshatras (13° 20′ each) and the 108 harmonic Padas (3° 20′ each) that anchor traditional Indian astrometry.
          </p>
        </div>

        {/* SECTION 1: INTERACTIVE COORDINATE EXPLORER */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                Interactive Ecliptic Longitude Explorer
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Drag the slider across 0° to 360° to observe real-time mathematical division into Rashi, Nakshatra, Pada, and D-9 Navamsha.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase tracking-widest block">Longitude λ</span>
              <span className="text-2xl font-mono font-bold text-amber-400">
                {interactiveLongitude.toFixed(2)}°
              </span>
            </div>
          </div>

          {/* Slider input */}
          <div className="mb-8">
            <input
              type="range"
              min="0"
              max="359.99"
              step="0.1"
              value={interactiveLongitude}
              onChange={(e) => setInteractiveLongitude(parseFloat(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2">
              <span>0° Mesha (Aries)</span>
              <span>90° Karka (Cancer)</span>
              <span>180° Tula / Spica (Libra)</span>
              <span>270° Makara (Capricorn)</span>
              <span>360° Revati</span>
            </div>
          </div>

          {/* Real-time Calculation Readout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Sidereal Rashi</span>
              <span className="text-lg font-bold text-white mt-1 block">{rashiCalc.rashiName}</span>
              <span className="text-xs font-mono text-amber-400 mt-0.5 block">
                {rashiCalc.degreeInRashi.toFixed(2)}° in sign
              </span>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Nakshatra</span>
              <span className="text-lg font-bold text-white mt-1 block">{nakshatraCalc.nakshatraName}</span>
              <span className="text-xs font-mono text-purple-400 mt-0.5 block">
                Nakshatra #{nakshatraCalc.nakshatraIndex} (13° 20′)
              </span>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Quarter (Pada)</span>
              <span className="text-lg font-bold text-white mt-1 block">Pada {nakshatraCalc.pada} of 4</span>
              <span className="text-xs font-mono text-blue-400 mt-0.5 block">
                Span: 3° 20′ (200 arcminutes)
              </span>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Navamsha (D-9)</span>
              <span className="text-lg font-bold text-white mt-1 block">{navamshaCalc.navamshaRashiName}</span>
              <span className="text-xs font-mono text-emerald-400 mt-0.5 block">
                9th Harmonic Micro-Sign
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>Fiducial Anchor:</strong> At exactly 180° 00′ lies the star Spica (Chitra), which anchors the Indian Government Calendar Reform Committee’s official Lahiri Ayanamsha.
            </span>
          </div>
        </div>

        {/* SECTION 2: THE 12 RASHIS */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">The Twelve Sidereal Rashis</h2>
              <p className="text-sm text-slate-400">Equal 30° divisions of the solar path along the ecliptic</p>
            </div>
          </div>

          {/* Rashis 12 Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
            {RASHIS.map((rashi) => {
              const isSelected = rashi.id === selectedRashiId;
              return (
                <button
                  key={rashi.id}
                  onClick={() => setSelectedRashiId(rashi.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 shadow-md text-white'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-serif">{rashi.symbol.split(' ')[0]}</span>
                    <span className="text-[10px] font-mono text-slate-400">#{rashi.id}</span>
                  </div>
                  <div className="font-bold text-sm truncate">{rashi.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{rashi.westernZodiac}</div>
                  <div className="text-[10px] font-mono text-amber-400/80 mt-1">
                    {rashi.longitudeStartDeg}°–{rashi.longitudeEndDeg}°
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Rashi Detail Card */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-serif text-amber-400">{selectedRashi.symbol}</span>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {selectedRashi.name} <span className="text-slate-400 font-normal">({selectedRashi.devanagari})</span>
                  </h3>
                  <span className="text-xs text-slate-400">Western Coordinate: {selectedRashi.westernZodiac}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {getElementBadge(selectedRashi.element)}
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                  Modality: {selectedRashi.modality}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                  Gender: {selectedRashi.gender}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-amber-300">
                  Ruler: {selectedRashi.rulingPlanetId.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Symbolism & Archetype</h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedRashi.symbolism}
                </p>
                <div className="mt-4 text-xs text-slate-400">
                  <strong>Astronomical Constellation:</strong> {selectedRashi.astronomicalConstellation}
                </div>
              </div>

              <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/80">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Precession & Ayanamsha Demarcation
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedRashi.precessionDifferenceNotes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: THE 27 NAKSHATRAS */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">The 27 Nakshatras & 108 Padas</h2>
              <p className="text-sm text-slate-400">The lunar mansions forming the microscopic fabric of Indian astrometry</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Nakshatra, deity, star..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <select
                value={planetFilter}
                onChange={(e) => setPlanetFilter(e.target.value)}
                className="py-1.5 px-3 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Ruling Grahas</option>
                <option value="ketu">Ketu</option>
                <option value="shukra">Shukra (Venus)</option>
                <option value="surya">Surya (Sun)</option>
                <option value="chandra">Chandra (Moon)</option>
                <option value="mangala">Mangala (Mars)</option>
                <option value="rahu">Rahu</option>
                <option value="brihaspati">Brihaspati (Jupiter)</option>
                <option value="shani">Shani (Saturn)</option>
                <option value="budha">Budha (Mercury)</option>
              </select>
            </div>
          </div>

          {/* Nakshatras List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-2 mb-6">
            {filteredNakshatras.map((nakshatra) => {
              const isSelected = nakshatra.id === selectedNakshatraId;
              return (
                <button
                  key={nakshatra.id}
                  onClick={() => setSelectedNakshatraId(nakshatra.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-400 shadow-md text-white'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-mono text-purple-400 block">#{nakshatra.id}</span>
                  <span className="text-xs font-bold block truncate">{nakshatra.name}</span>
                  <span className="text-[10px] text-slate-400 font-serif block">{nakshatra.devanagari}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Nakshatra Dossier Card */}
          <div className="p-6 lg:p-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
                    Nakshatra #{selectedNakshatra.id}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    {selectedNakshatra.name}
                  </h3>
                  <span className="text-xl font-serif text-purple-400">({selectedNakshatra.devanagari})</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
                  <span>Pronunciation: <strong className="text-slate-200">{selectedNakshatra.pronunciation}</strong></span>
                  <span>•</span>
                  <span>Symbol: <strong className="text-amber-300">{selectedNakshatra.symbol}</strong></span>
                  <span>•</span>
                  <span>Ruler: <strong className="text-slate-200">{selectedNakshatra.rulingPlanetId.toUpperCase()}</strong></span>
                  <span>•</span>
                  <span>Span: <strong className="font-mono text-slate-300">{selectedNakshatra.longitudeStartDeg.toFixed(1)}° – {selectedNakshatra.longitudeEndDeg.toFixed(1)}°</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  {selectedNakshatra.associatedStars}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Presiding Deity & Energy</h4>
                <div className="text-sm font-semibold text-white">{selectedNakshatra.deity}</div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedNakshatra.deityDescription}</p>
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs">
                  <strong className="text-amber-400">Shakti (Inherent Power):</strong> {selectedNakshatra.shakti}
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Mythology & Traditional Meaning</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {selectedNakshatra.mythologicalNarrative}
                </p>
                <p className="text-xs text-slate-400 italic">
                  Traditional interpretation: {selectedNakshatra.traditionalInterpretation}
                </p>
              </div>
            </div>

            {/* 4 Padas Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Constituent 4 Padas (Harmonic 3° 20′ Segments mapped to D-9 Navamsha)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {selectedNakshatra.padas.map(pada => (
                  <div key={pada.padaNumber} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">Pada {pada.padaNumber}</span>
                      <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                        Sound: &ldquo;{pada.soundSyllable}&rdquo;
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">{pada.degreesStart} – {pada.degreesEnd}</div>
                    <div className="mt-2 text-xs">
                      <span className="text-slate-400">Navamsha: </span>
                      <strong className="text-amber-300">{pada.navamshaRashi}</strong>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Lord: {pada.navamshaLord}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Construct Your Custom Janma Kundli</h3>
            <p className="text-sm text-slate-300">
              Input precise date, time, and coordinates to calculate all 9 Grahas across Rashis, Nakshatras, and Padas.
            </p>
          </div>
          <Link
            href="/chart-lab"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 shrink-0 text-center"
          >
            Launch Jyotisha Chart Lab
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
