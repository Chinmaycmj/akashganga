'use client';

import React, { useState } from 'react';
import { CosmicStage } from '@/types/cosmos';
import { useUserProgress } from '@/context/UserProgressContext';
import { useAudio } from '@/context/AudioContext';
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  FlaskConical,
  Sparkles,
} from 'lucide-react';

interface StageDiscoveryCardProps {
  stage: CosmicStage;
}

export default function StageDiscoveryCard({ stage }: StageDiscoveryCardProps) {
  const {
    explanationLevel,
    setExplanationLevel,
    addBookmark,
    removeBookmark,
    isBookmarked,
    notes,
    saveNote,
  } = useUserProgress();

  const { playClickSound } = useAudio();
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'measurements'>('overview');
  const [showNoteEditor, setShowNoteEditor] = useState<boolean>(false);
  const [userNote, setUserNote] = useState<string>(notes[stage.slug] || '');

  const bookmarked = isBookmarked(stage.slug);

  const toggleBookmark = () => {
    playClickSound();
    if (bookmarked) {
      removeBookmark(stage.slug);
    } else {
      addBookmark({
        type: 'stage',
        targetId: stage.slug,
        title: stage.title,
        subtitle: stage.scaleDisplay,
      });
    }
  };

  const handleSaveNote = () => {
    saveNote(stage.slug, userNote);
    setShowNoteEditor(false);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Observed':
      case 'Well established':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60';
      case 'Current model':
        return 'bg-sky-950/80 text-sky-300 border-sky-600/60';
      case 'Active research':
        return 'bg-amber-950/80 text-amber-300 border-amber-600/60';
      case 'Hypothesis':
      case 'Speculative':
        return 'bg-rose-950/80 text-rose-300 border-rose-600/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-4 sm:p-5 text-slate-200 shadow-xl flex flex-col h-full max-h-[700px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Stage {stage.id} • {stage.powersOfTen}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-medium border ${getStatusBadgeStyle(
                stage.scientificStatus
              )}`}
            >
              {stage.scientificStatus}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{stage.title}</h2>
          <p className="text-xs sm:text-sm text-slate-400">{stage.subtitle}</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg border transition-all ${
              bookmarked
                ? 'bg-amber-950/70 border-amber-500/60 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark this Stage'}
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Wonder Hook Section */}
      <div className="bg-gradient-to-r from-indigo-950/50 to-slate-900/50 rounded-lg p-3 border border-indigo-900/40 mb-4">
        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Wonder Hook</span>
        </div>
        <p className="text-xs italic text-slate-200 leading-relaxed font-serif">
          &ldquo;{stage.wonderQuestion}&rdquo;
        </p>
      </div>

      {/* Explanation Depth Level Selector */}
      <div className="flex items-center justify-between mb-3 text-xs bg-slate-950/70 p-1 rounded-lg border border-slate-800">
        <span className="text-[11px] text-slate-400 px-2 font-mono">Depth:</span>
        <div className="flex gap-1">
          {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
            <button
              key={level}
              onClick={() => {
                playClickSound();
                setExplanationLevel(level);
              }}
              className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                explanationLevel === level
                  ? 'bg-indigo-600 text-white font-medium shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 mb-3 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2 px-3 font-medium transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Overview & Story
        </button>
        <button
          onClick={() => setActiveTab('evidence')}
          className={`pb-2 px-3 font-medium transition-colors border-b-2 ${
            activeTab === 'evidence'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Scientific Evidence
        </button>
        <button
          onClick={() => setActiveTab('measurements')}
          className={`pb-2 px-3 font-medium transition-colors border-b-2 ${
            activeTab === 'measurements'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Data & Sources
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 space-y-4">
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {stage.narrative[explanationLevel]}
            </div>

            {/* Key Takeaways */}
            <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800/80">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Key Takeaways
              </h4>
              <ul className="space-y-1.5">
                {stage.keyFacts.map((fact, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-3">
            {/* What We Know */}
            <div className="bg-emerald-950/30 rounded-lg p-3 border border-emerald-900/50">
              <h4 className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                What We Know (Confirmed)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {stage.whatWeKnow.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Scientists Investigate */}
            <div className="bg-sky-950/30 rounded-lg p-3 border border-sky-900/50">
              <h4 className="text-xs font-semibold text-sky-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
                What Scientists Are Investigating
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {stage.whatWeInvestigate.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 mt-0.5">🔬</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Remains Unknown */}
            <div className="bg-amber-950/30 rounded-lg p-3 border border-amber-900/50">
              <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                What Remains Unknown
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {stage.whatRemainsUnknown.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">?</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'measurements' && (
          <div className="space-y-3">
            {/* Physical Measurements Grid */}
            <div className="grid grid-cols-2 gap-2">
              {stage.measurements.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{m.label}</div>
                  <div className="text-sm font-semibold font-mono text-white mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Citations and Scientific Authorities */}
            <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                Validated Scientific Sources
              </h4>
              <div className="space-y-2">
                {stage.citations.map((cite, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-xs">
                    <div className="font-semibold text-slate-200">{cite.title}</div>
                    <div className="text-[11px] text-indigo-400">
                      {cite.institution} {cite.year ? `(${cite.year})` : ''}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{cite.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Discovery Notes Tool */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        {!showNoteEditor ? (
          <button
            onClick={() => setShowNoteEditor(true)}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <span>📝</span>
            <span>{notes[stage.slug] ? 'View / Edit Personal Discovery Note' : 'Add a Personal Discovery Note'}</span>
          </button>
        ) : (
          <div className="space-y-2">
            <textarea
              value={userNote}
              onChange={e => setUserNote(e.target.value)}
              placeholder="Record your thoughts, hypotheses, or questions about this scale..."
              rows={2}
              className="w-full text-xs bg-slate-950 border border-slate-700 rounded-lg p-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowNoteEditor(false)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
              >
                Save Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
