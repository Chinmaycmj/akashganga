'use client';

import React from 'react';
import { useUserProgress } from '@/context/UserProgressContext';
import { useAudio } from '@/context/AudioContext';
import { Bookmark, Trash2, ExternalLink, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark, notes } = useUserProgress();
  const { playClickSound } = useAudio();

  const exportNotes = () => {
    playClickSound();
    const data = {
      exportedAt: new Date().toISOString(),
      bookmarks,
      notes,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `infinite_cosmos_journal_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Learning Journal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            My Bookmarks & Discovery Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Personal collection of cosmic discoveries, saved chapters, and recorded observational notes.
          </p>
        </div>

        {bookmarks.length > 0 && (
          <button
            onClick={exportNotes}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 shadow"
          >
            <FileText className="w-4 h-4" />
            <span>Export Journal (.json)</span>
          </button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Bookmarks Saved Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any cosmic journey stage or atlas topic to build your personal astronomy notebook.
          </p>
          <div className="pt-2">
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
            >
              <span>Begin the Cosmic Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map(bm => {
            const userNote = notes[bm.targetId];
            const targetHref =
              bm.type === 'stage'
                ? `/journey?stage=${bm.targetId.replace(/[^0-9]/g, '') || 1}`
                : `/atlas/${bm.targetId}`;

            return (
              <div
                key={bm.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400">
                      {bm.type} bookmark
                    </span>
                    <button
                      onClick={() => {
                        playClickSound();
                        removeBookmark(bm.targetId);
                      }}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight mt-1">{bm.title}</h3>
                  <div className="text-xs text-slate-400">{bm.subtitle}</div>

                  {userNote && (
                    <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                      <div className="text-[10px] text-amber-400 font-semibold mb-1">Your Personal Note:</div>
                      <p className="italic leading-relaxed">{userNote}</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(bm.timestamp).toLocaleDateString()}
                  </span>
                  <Link
                    href={targetHref}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    <span>Revisit Discovery</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
