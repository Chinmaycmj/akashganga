'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ATLAS_TOPICS } from '@/data/atlasTopics';
import { useAudio } from '@/context/AudioContext';
import { BookOpen, Search, ArrowRight } from 'lucide-react';

export default function AtlasCatalogPage() {
  const { playClickSound } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(ATLAS_TOPICS.map(t => t.category)));
    return ['all', ...cats];
  }, []);

  const filteredTopics = useMemo(() => {
    return ATLAS_TOPICS.filter(t => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.intro.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'all' || t.difficulty === selectedDifficulty;

      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-mono uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Cosmic Knowledge Atlas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore the Concepts Shaping Physical Reality
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Searchable, interactive lessons on black holes, quantum fields, spacetime curvature, cosmology, and the boundaries of current astronomical research.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search topics (e.g. 'Hawking radiation', 'inflation')..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Category & Difficulty Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== 'all').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTopics.map(topic => (
          <Link
            key={topic.id}
            href={`/atlas/${topic.id}`}
            onClick={() => playClickSound()}
            className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{topic.heroEmoji}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                    {topic.difficulty}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-medium">
                    {topic.scientificStatus}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                {topic.title}
              </h3>
              <div className="text-[11px] text-indigo-400 font-medium mb-2">{topic.category}</div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{topic.intro}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 group-hover:text-indigo-300 font-medium transition-colors">
              <span>Read Guided Chapter</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
