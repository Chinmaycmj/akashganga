'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { generateKundliChart } from '@/utils/vedicAstronomyMath';
import { AyanamshaSystem, ChartFormat, KundliChart } from '@/types/vedicCosmos';
import { 
  Calculator, 
  Settings, 
  Compass, 
  MapPin, 
  Calendar, 
  Clock, 
  Layers, 
  ShieldCheck
} from 'lucide-react';

const PRESET_LOCATIONS = [
  { name: 'Ujjain, India (Prime Meridian of Ancient Indian Astronomy)', lat: 23.1765, lon: 75.7885 },
  { name: 'Varanasi, India (Kashi)', lat: 25.3176, lon: 82.9739 },
  { name: 'New Delhi, India', lat: 28.6139, lon: 77.2090 },
  { name: 'Bengaluru, India', lat: 12.9716, lon: 77.5946 },
  { name: 'Greenwich, UK (UTC 0°)', lat: 51.4826, lon: 0.0077 },
  { name: 'New York, USA', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503 }
];

export default function JyotishaChartLabPage() {
  // Input states
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(10);
  const [day, setDay] = useState<number>(17);
  const [hour, setHour] = useState<number>(12);
  const [minute, setMinute] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(23.1765);
  const [longitude, setLongitude] = useState<number>(75.7885);
  const [locationName, setLocationName] = useState<string>('Ujjain, India');
  const [ayanamshaSystem, setAyanamshaSystem] = useState<AyanamshaSystem>('Lahiri');
  const [chartFormat, setChartFormat] = useState<ChartFormat>('North Indian');
  const [chartType, setChartType] = useState<'D1' | 'D9'>('D1');

  // Compute chart in real-time
  const chart: KundliChart = useMemo(() => {
    return generateKundliChart(
      year,
      month,
      day,
      hour,
      minute,
      latitude,
      longitude,
      locationName,
      ayanamshaSystem
    );
  }, [year, month, day, hour, minute, latitude, longitude, locationName, ayanamshaSystem]);

  const handleLocationPreset = (idx: number) => {
    const loc = PRESET_LOCATIONS[idx];
    setLatitude(loc.lat);
    setLongitude(loc.lon);
    setLocationName(loc.name);
  };

  const getDignityColor = (dignity: string) => {
    if (dignity === 'Exalted') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (dignity === 'Moolatrikona') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (dignity === 'Own Sign') return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    if (dignity === 'Debilitated') return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    return 'text-slate-300 bg-slate-800/40 border-slate-700/40';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" /> Jyotisha Chart Laboratory
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Transparent Mathematical Ephemeris Engine
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              North & South Indian Formats
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Janma Kundli Calculation Engine
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Generate fully transparent, reproducible natal birth charts with explicit Ayanamsha selection (Lahiri, Raman, KP, Tropical). Computes true Lagna, Bhavas, planetary longitudes, dignities, and D-9 Navamsha harmonics without hidden black-box constants.
          </p>
        </div>

        {/* Input Controls Workbench */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl mb-10">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            Astronomical Inputs & Calculation Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date (YYYY-MM-DD)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value) || 2024)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center text-white focus:outline-none focus:border-amber-400"
                  placeholder="YYYY"
                />
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value) || 1)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center text-white focus:outline-none focus:border-amber-400"
                  placeholder="MM"
                />
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(parseInt(e.target.value) || 1)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center text-white focus:outline-none focus:border-amber-400"
                  placeholder="DD"
                />
              </div>
            </div>

            {/* Time (UTC) */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Time UTC (HH : MM)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hour}
                  onChange={(e) => setHour(parseInt(e.target.value) || 0)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center text-white focus:outline-none focus:border-amber-400"
                  placeholder="HH"
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minute}
                  onChange={(e) => setMinute(parseInt(e.target.value) || 0)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-center text-white focus:outline-none focus:border-amber-400"
                  placeholder="MM"
                />
              </div>
            </div>

            {/* Ayanamsha System */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" /> Ayanamsha System
              </label>
              <select
                value={ayanamshaSystem}
                onChange={(e) => setAyanamshaSystem(e.target.value as AyanamshaSystem)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Lahiri">Lahiri (Chitra Paksha - Govt Standard)</option>
                <option value="Raman">B.V. Raman (Historical Offset)</option>
                <option value="Krishnamurti">Krishnamurti (KP System)</option>
                <option value="None (Tropical)">None (Tropical / Western Zodiac)</option>
              </select>
            </div>

            {/* Chart Format */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" /> Chart Representation
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setChartFormat('North Indian')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                    chartFormat === 'North Indian'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  North Indian
                </button>
                <button
                  type="button"
                  onClick={() => setChartFormat('South Indian')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                    chartFormat === 'South Indian'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  South Indian
                </button>
              </div>
            </div>
          </div>

          {/* Location Presets & Coordinates */}
          <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Presets:
              </span>
              {PRESET_LOCATIONS.slice(0, 4).map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLocationPreset(idx)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                    locationName === loc.name
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {loc.name.split(',')[0]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span>Lat: <strong className="text-slate-200">{latitude.toFixed(2)}°</strong></span>
              <span>•</span>
              <span>Lon: <strong className="text-slate-200">{longitude.toFixed(2)}°</strong></span>
              <span>•</span>
              <span>Ayanamsha: <strong className="text-amber-400">{chart.ayanamshaValueDeg.toFixed(2)}°</strong></span>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE KUNDLI CHART RENDERER & SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Chart SVG Canvas (5 Cols) */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl">
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{chartFormat} Kundli</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">
                  {chartType === 'D1' ? 'D-1 Rashi' : 'D-9 Navamsha'}
                </span>
              </div>

              {/* D1 / D9 Switcher */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setChartType('D1')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    chartType === 'D1' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  D-1 Rashi
                </button>
                <button
                  onClick={() => setChartType('D9')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    chartType === 'D9' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  D-9 Navamsha
                </button>
              </div>
            </div>

            {/* SVG Renderers */}
            {chartFormat === 'North Indian' ? (
              /* North Indian Diamond Chart SVG */
              <div className="w-full max-w-[420px] aspect-square relative">
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
                  {/* Outer Square */}
                  <rect x="10" y="10" width="380" height="380" fill="#0b1120" stroke="#f59e0b" strokeWidth="2.5" />
                  
                  {/* Diagonal X */}
                  <line x1="10" y1="10" x2="390" y2="390" stroke="#f59e0b" strokeWidth="1.8" />
                  <line x1="390" y1="10" x2="10" y2="390" stroke="#f59e0b" strokeWidth="1.8" />
                  
                  {/* Central Diamond */}
                  <polygon points="200,10 390,200 200,390 10,200" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />

                  {/* House 1 (Top Center Diamond - Lagna) */}
                  <text x="200" y="90" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
                    H1: {chartType === 'D1' ? chart.lagnaRashiIndex : 'Lagna'}
                  </text>
                  <text x="200" y="115" textAnchor="middle" fill="#38bdf8" fontSize="11">
                    {chart.planets.filter(p => (chartType === 'D1' ? p.bhavaNumber === 1 : p.navamshaRashiIndex === chart.lagnaRashiIndex)).map(p => p.name.split(' ')[0]).join(', ') || '—'}
                  </text>

                  {/* House 2 (Top Left Triangle) */}
                  <text x="110" y="60" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    H2 ({((chart.lagnaRashiIndex) % 12) + 1})
                  </text>
                  <text x="110" y="80" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {chart.planets.filter(p => p.bhavaNumber === 2).map(p => p.name.split(' ')[0]).join(', ')}
                  </text>

                  {/* House 12 (Top Right Triangle) */}
                  <text x="290" y="60" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    H12 ({((chart.lagnaRashiIndex + 10) % 12) + 1})
                  </text>
                  <text x="290" y="80" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {chart.planets.filter(p => p.bhavaNumber === 12).map(p => p.name.split(' ')[0]).join(', ')}
                  </text>

                  {/* House 4 (Right Diamond) */}
                  <text x="310" y="200" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">
                    H4 ({((chart.lagnaRashiIndex + 2) % 12) + 1})
                  </text>
                  <text x="310" y="220" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {chart.planets.filter(p => p.bhavaNumber === 4).map(p => p.name.split(' ')[0]).join(', ')}
                  </text>

                  {/* House 7 (Bottom Diamond - Descendant) */}
                  <text x="200" y="310" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">
                    H7 ({((chart.lagnaRashiIndex + 5) % 12) + 1})
                  </text>
                  <text x="200" y="330" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {chart.planets.filter(p => p.bhavaNumber === 7).map(p => p.name.split(' ')[0]).join(', ')}
                  </text>

                  {/* House 10 (Left Diamond - Midheaven) */}
                  <text x="90" y="200" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">
                    H10 ({((chart.lagnaRashiIndex + 8) % 12) + 1})
                  </text>
                  <text x="90" y="220" textAnchor="middle" fill="#38bdf8" fontSize="10">
                    {chart.planets.filter(p => p.bhavaNumber === 10).map(p => p.name.split(' ')[0]).join(', ')}
                  </text>
                </svg>
              </div>
            ) : (
              /* South Indian Box Chart SVG */
              <div className="w-full max-w-[420px] aspect-square relative">
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md">
                  {/* Outer Grid 4x4 */}
                  <rect x="10" y="10" width="380" height="380" fill="#0b1120" stroke="#f59e0b" strokeWidth="2.5" />
                  
                  {/* Internal Lines for 4x4 grid */}
                  <line x1="105" y1="10" x2="105" y2="390" stroke="#334155" strokeWidth="1.5" />
                  <line x1="200" y1="10" x2="200" y2="105" stroke="#334155" strokeWidth="1.5" />
                  <line x1="200" y1="295" x2="200" y2="390" stroke="#334155" strokeWidth="1.5" />
                  <line x1="295" y1="10" x2="295" y2="390" stroke="#334155" strokeWidth="1.5" />

                  <line x1="10" y1="105" x2="390" y2="105" stroke="#334155" strokeWidth="1.5" />
                  <line x1="10" y1="200" x2="105" y2="200" stroke="#334155" strokeWidth="1.5" />
                  <line x1="295" y1="200" x2="390" y2="200" stroke="#334155" strokeWidth="1.5" />
                  <line x1="10" y1="295" x2="390" y2="295" stroke="#334155" strokeWidth="1.5" />

                  {/* Hollow Center Box */}
                  <rect x="105" y="105" width="190" height="190" fill="#0f172a" />
                  <text x="200" y="195" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
                    South Indian Format
                  </text>
                  <text x="200" y="215" textAnchor="middle" fill="#94a3b8" fontSize="11">
                    Signs fixed clockwise
                  </text>

                  {/* 12 Outer Sign Boxes Labels */}
                  {/* Mesha (Box 2 top) */}
                  <text x="152" y="35" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">Mesha (1)</text>
                  <text x="152" y="55" textAnchor="middle" fill="#38bdf8" fontSize="9">
                    {chart.planets.filter(p => p.rashiIndex === 1).map(p => p.name.split(' ')[0]).join(', ')}
                    {chart.lagnaRashiIndex === 1 && ' [ASC]'}
                  </text>

                  {/* Vrishabha (Box 3 top) */}
                  <text x="247" y="35" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">Vrishabha (2)</text>
                  <text x="247" y="55" textAnchor="middle" fill="#38bdf8" fontSize="9">
                    {chart.planets.filter(p => p.rashiIndex === 2).map(p => p.name.split(' ')[0]).join(', ')}
                    {chart.lagnaRashiIndex === 2 && ' [ASC]'}
                  </text>

                  {/* Mithuna (Box 4 top-right) */}
                  <text x="342" y="35" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">Mithuna (3)</text>
                  <text x="342" y="55" textAnchor="middle" fill="#38bdf8" fontSize="9">
                    {chart.planets.filter(p => p.rashiIndex === 3).map(p => p.name.split(' ')[0]).join(', ')}
                    {chart.lagnaRashiIndex === 3 && ' [ASC]'}
                  </text>

                  {/* Karka (Box 8 right) */}
                  <text x="342" y="150" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">Karka (4)</text>
                  <text x="342" y="170" textAnchor="middle" fill="#38bdf8" fontSize="9">
                    {chart.planets.filter(p => p.rashiIndex === 4).map(p => p.name.split(' ')[0]).join(', ')}
                    {chart.lagnaRashiIndex === 4 && ' [ASC]'}
                  </text>
                </svg>
              </div>
            )}
          </div>

          {/* Lagna & Ephemeris Summary (7 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="text-xs text-amber-400 uppercase tracking-widest font-bold block mb-1">
                Lagna (Ascendant) Astrometric Readout
              </span>
              <div className="flex items-baseline gap-3">
                <h3 className="text-3xl font-extrabold text-white">
                  {chart.bhavas[0].rashiName}
                </h3>
                <span className="text-lg font-mono text-amber-300">
                  {chart.lagnaDegreesInRashi.toFixed(2)}°
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Lagna Nakshatra:</span>
                  <strong className="text-white">{chart.lagnaNakshatra}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Nakshatra Pada:</span>
                  <strong className="text-purple-300">Pada {chart.lagnaPada}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Selected Ayanamsha:</span>
                  <strong className="text-amber-400">{chart.ayanamshaSystem} ({chart.ayanamshaValueDeg.toFixed(2)}°)</strong>
                </div>
              </div>
            </div>

            {/* Scientific Caveat Banner */}
            <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-emerald-200 text-xs leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-300 text-sm mb-0.5">Transparent Epistemology:</strong>
                Planetary longitudes above are computed using Keplerian celestial mechanics. In strict accordance with the scientific principles of <em>The Infinite Cosmos</em>, planetary positions are mathematical astronomy; traditional interpretive traits are respected historical symbolic cultural frameworks.
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: PLANETARY DETAILS TABLE */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl mb-12 overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Planetary Positions & Classical Dignities</h3>
              <p className="text-xs text-slate-400">Complete calculated longitudes, Nakshatras, padas, and functional dignities</p>
            </div>
          </div>

          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Graha</th>
                <th className="py-3 px-3">Sidereal Lon</th>
                <th className="py-3 px-3">Rashi Sign</th>
                <th className="py-3 px-3">Degree</th>
                <th className="py-3 px-3">Nakshatra</th>
                <th className="py-3 px-3">Pada</th>
                <th className="py-3 px-3">D-9 Navamsha</th>
                <th className="py-3 px-3">Bhava</th>
                <th className="py-3 px-3">Dignity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {chart.planets.map((planet) => (
                <tr key={planet.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-sans font-bold text-white flex items-center gap-2">
                    <span>{planet.name}</span>
                    {planet.isRetrograde && (
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                        R
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-amber-300">
                    {planet.siderealLongitudeDeg.toFixed(2)}°
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-200">
                    {planet.rashiName.split(' ')[0]}
                  </td>
                  <td className="py-3 px-3">
                    {planet.degreesInRashi.toFixed(2)}°
                  </td>
                  <td className="py-3 px-3 font-sans text-purple-300">
                    {planet.nakshatraName}
                  </td>
                  <td className="py-3 px-3">
                    Pada {planet.nakshatraPada}
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-300">
                    {planet.navamshaRashiName.split(' ')[0]}
                  </td>
                  <td className="py-3 px-3 font-bold text-amber-400">
                    H{planet.bhavaNumber}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold border ${getDignityColor(planet.dignity)}`}>
                      {planet.dignity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SECTION 4: 12 BHAVAS BREAKDOWN */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-2">The Twelve Bhavas (Houses)</h3>
          <p className="text-xs text-slate-400 mb-6">Traditional domains of life projected from the Ascendant (Lagna)</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {chart.bhavas.map((bhava) => (
              <div key={bhava.bhavaNumber} className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-amber-400 uppercase">
                    House {bhava.bhavaNumber}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {bhava.rashiName.split(' ')[0]}
                  </span>
                </div>
                <div className="text-xs font-semibold text-white mb-2">
                  {bhava.significances[0]}
                </div>
                <div className="text-[11px] text-slate-400">
                  Occupying Grahas:{' '}
                  {bhava.occupyingPlanets.length > 0 ? (
                    <strong className="text-blue-300">
                      {bhava.occupyingPlanets.map(p => p.toUpperCase()).join(', ')}
                    </strong>
                  ) : (
                    <span className="text-slate-600">None</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
