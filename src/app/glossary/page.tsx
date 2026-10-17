'use client';

import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '@/data/glossaryData';
import { useAudio } from '@/context/AudioContext';
import { HelpCircle, Search } from 'lucide-react';
import Link from 'next/link';

export default function GlossaryPage() {
  const { playClickSound } = useAudio();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(GLOSSARY_TERMS.map(t => t.category)));
    return ['all', ...cats];
  }, []);

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchSearch =
        item.term.toLowerCase().includes(search.toLowerCase()) ||
        item.definition.toLowerCase().includes(search.toLowerCase()) ||
        item.detailedContext.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-mono uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Scientific Lexicon</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Astronomical & Physical Glossary
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Rigorous definitions, pronunciations, and epistemological context for fundamental cosmological and astrophysical concepts.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search terms (e.g. 'Event Horizon', 'Parsec')..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => {
                playClickSound();
                setActiveCategory(c);
              }}
              className={`px-3 py-1 rounded-lg text-xs transition-colors capitalize ${
                activeCategory === c
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {c === 'all' ? 'All Categories' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div
            key={item.term}
            id={encodeURIComponent(item.term)}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{item.term}</h3>
                  {item.pronunciation && (
                    <div className="text-xs text-indigo-400 font-mono">{item.pronunciation}</div>
                  )}
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {item.scientificStatus}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mb-2">{item.category}</div>

              <p className="text-xs text-slate-200 leading-relaxed font-medium mb-2">
                {item.definition}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.detailedContext}
              </p>
            </div>

            {item.relatedStages.length > 0 && (
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Observed in Journey:</span>
                <div className="flex gap-1.5">
                  {item.relatedStages.map(sId => (
                    <Link
                      key={sId}
                      href={`/journey?stage=${sId}`}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-mono text-[10px]"
                    >
                      Stage {sId}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
