'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { COSMIC_STAGES } from '@/data/cosmicStages';
import { ATLAS_TOPICS } from '@/data/atlasTopics';
import { CELESTIAL_OBJECTS } from '@/data/celestialObjects';
import { GLOSSARY_TERMS } from '@/data/glossaryData';
import { Search, X, Compass, BookOpen, FlaskConical, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const items: Array<{
      type: 'stage' | 'topic' | 'object' | 'glossary';
      title: string;
      subtitle: string;
      href: string;
      status?: string;
    }> = [];

    // Search Cosmic Stages
    COSMIC_STAGES.forEach(stage => {
      if (
        stage.title.toLowerCase().includes(q) ||
        stage.subtitle.toLowerCase().includes(q) ||
        stage.summary.toLowerCase().includes(q) ||
        stage.wonderQuestion.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'stage',
          title: `Stage ${stage.id}: ${stage.title}`,
          subtitle: stage.subtitle,
          href: `/journey?stage=${stage.id}`,
          status: stage.scientificStatus,
        });
      }
    });

    // Search Atlas Topics
    ATLAS_TOPICS.forEach(topic => {
      if (
        topic.title.toLowerCase().includes(q) ||
        topic.intro.toLowerCase().includes(q) ||
        topic.category.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'topic',
          title: topic.title,
          subtitle: topic.category,
          href: `/atlas/${topic.id}`,
          status: topic.scientificStatus,
        });
      }
    });

    // Search Celestial Objects
    CELESTIAL_OBJECTS.forEach(obj => {
      if (
        obj.name.toLowerCase().includes(q) ||
        obj.type.toLowerCase().includes(q) ||
        obj.description.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'object',
          title: obj.name,
          subtitle: `${obj.type} • Stage ${obj.stageId}`,
          href: `/journey?stage=${obj.stageId}`,
          status: obj.scientificStatus,
        });
      }
    });

    // Search Glossary
    GLOSSARY_TERMS.forEach(term => {
      if (
        term.term.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q) ||
        term.category.toLowerCase().includes(q)
      ) {
        items.push({
          type: 'glossary',
          title: term.term,
          subtitle: term.category,
          href: `/glossary#${encodeURIComponent(term.term)}`,
          status: term.scientificStatus,
        });
      }
    });

    return items.slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search celestial objects, concepts, questions (e.g. 'black hole', 'dark energy', 'TRAPPIST-1')..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-[420px] overflow-y-auto divide-y divide-slate-800/60">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-slate-400">
              <p>Type a cosmic object, question, or physical phenomenon to search.</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['Earth Core', 'Black Hole', 'Andromeda', 'Cosmic Web', 'Multiverse', 'Habitable Zone'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2 py-1 rounded bg-slate-800 text-indigo-300 hover:bg-slate-700 text-[11px]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No cosmic objects or topics matched &ldquo;{query}&rdquo;. Try another search term.
            </div>
          ) : (
            results.map((res, i) => (
              <Link
                key={i}
                href={res.href}
                onClick={onClose}
                className="py-2.5 px-3 rounded-lg hover:bg-slate-800/70 flex items-center justify-between gap-3 group transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-800 border border-slate-700 group-hover:border-indigo-500 transition-colors">
                    {res.type === 'stage' && <Compass className="w-4 h-4 text-amber-400" />}
                    {res.type === 'topic' && <BookOpen className="w-4 h-4 text-indigo-400" />}
                    {res.type === 'object' && <Globe className="w-4 h-4 text-sky-400" />}
                    {res.type === 'glossary' && <FlaskConical className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white flex items-center gap-2">
                      <span>{res.title}</span>
                      {res.status && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {res.status}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">{res.subtitle}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </Link>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Esc to close</span>
          <span>Validated astronomical database</span>
        </div>
      </div>
    </div>
  );
}
