'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { TEXTUAL_SOURCES } from '@/data/textualLibraryData';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Tag, 
  User, 
  Clock
} from 'lucide-react';

export default function TextualKnowledgeLibraryPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSources = TEXTUAL_SOURCES.filter(source => {
    const matchesSearch = 
      source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.authorOrAttribution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.sanskritDevanagari.includes(searchQuery) ||
      source.iastTransliteration.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTopic = selectedTopic === 'all' || source.relatedTopics.includes(selectedTopic);
    return matchesSearch && matchesTopic;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allTopics = Array.from(
    new Set(TEXTUAL_SOURCES.flatMap(s => s.relatedTopics))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Textual Knowledge Library
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Verified Sanskrit • IAST • Scholarly Translations
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Zero Fabricated Citations
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Source-Based Knowledge Library
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            In strict compliance with academic research standards, every claim and verse in this library includes verified Sanskrit Devanagari text, standard IAST transliteration, authoritative translation attributions, and historical context notes.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search verses, Sanskrit, translators, scholars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedTopic === 'all'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Topics ({TEXTUAL_SOURCES.length})
            </button>
            {allTopics.slice(0, 5).map(topic => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  selectedTopic === topic
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Source Cards Grid */}
        <div className="space-y-8 mb-12">
          {filteredSources.map(source => (
            <div 
              key={source.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-xl hover:border-slate-700 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {source.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-slate-300">
                      <User className="w-3.5 h-3.5 text-amber-400" /> {source.authorOrAttribution}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> {source.estimatedPeriod}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded">
                      {source.chapterVerseLocator}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                  {source.epistemicNature}
                </span>
              </div>

              {/* Sanskrit Devanagari & IAST side-by-side or stacked */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                {/* Devanagari */}
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      Original Sanskrit (Devanagari)
                    </span>
                    <button
                      onClick={() => handleCopy(source.id + '-deva', source.sanskritDevanagari)}
                      className="p-1 rounded text-slate-500 hover:text-white transition-colors"
                      title="Copy Sanskrit"
                    >
                      {copiedId === source.id + '-deva' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <pre className="text-base sm:text-lg font-serif text-slate-100 whitespace-pre-wrap leading-relaxed">
                    {source.sanskritDevanagari}
                  </pre>
                </div>

                {/* IAST */}
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                      Standard Transliteration (IAST)
                    </span>
                    <button
                      onClick={() => handleCopy(source.id + '-iast', source.iastTransliteration)}
                      className="p-1 rounded text-slate-500 hover:text-white transition-colors"
                      title="Copy IAST"
                    >
                      {copiedId === source.id + '-iast' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <pre className="text-xs sm:text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {source.iastTransliteration}
                  </pre>
                </div>
              </div>

              {/* English Translation */}
              <div className="p-5 bg-slate-950/50 border border-slate-800/80 rounded-xl mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
                  Scholarly Translation
                </span>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif italic">
                  &ldquo;{source.englishTranslation}&rdquo;
                </p>
                <span className="text-xs text-slate-400 mt-2 block font-sans">
                  — Attribution: {source.translatorAttribution}
                </span>
              </div>

              {/* Scholarly Notes */}
              <div className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
                <strong className="text-slate-300 block mb-1">Academic & Historical Context:</strong>
                {source.scholarlyNotes}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-slate-800/60">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                {source.relatedTopics.map(t => (
                  <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
