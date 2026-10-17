'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { ATLAS_TOPICS } from '@/data/atlasTopics';
import { useUserProgress } from '@/context/UserProgressContext';
import { useAudio } from '@/context/AudioContext';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  FlaskConical,
  Bookmark,
  BookmarkCheck,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function AtlasTopicDetailPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const topic = ATLAS_TOPICS.find(t => t.id === topicId);

  const {
    completedQuizzes,
    saveQuizResult,
    addBookmark,
    removeBookmark,
    isBookmarked,
  } = useUserProgress();
  const { playClickSound, playSuccessSound } = useAudio();

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(
    completedQuizzes[topicId] !== undefined ? completedQuizzes[topicId] : null
  );
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState<boolean>(
    completedQuizzes[topicId] !== undefined
  );

  if (!topic) {
    return notFound();
  }

  const bookmarked = isBookmarked(topic.id);

  const toggleBookmark = () => {
    playClickSound();
    if (bookmarked) {
      removeBookmark(topic.id);
    } else {
      addBookmark({
        type: 'topic',
        targetId: topic.id,
        title: topic.title,
        subtitle: topic.category,
      });
    }
  };

  const handleQuizAnswer = (idx: number) => {
    if (hasSubmittedQuiz) return;
    playClickSound();
    setSelectedOption(idx);
    setHasSubmittedQuiz(true);
    const isCorrect = idx === topic.quiz.correctAnswer;
    if (isCorrect) playSuccessSound();
    saveQuizResult(topic.id, idx, isCorrect);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Link href="/atlas" className="hover:text-white transition-colors text-indigo-400">
            ← Knowledge Atlas
          </Link>
          <span>/</span>
          <span>{topic.category}</span>
        </div>
        <button
          onClick={toggleBookmark}
          className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
            bookmarked
              ? 'bg-amber-950/70 border-amber-500/60 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
        </button>
      </div>

      {/* 1. Cinematic Hero Header */}
      <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <span className="text-4xl sm:text-5xl">{topic.heroEmoji}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              Difficulty: {topic.difficulty}
            </span>
            <span className="text-xs px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-700 font-medium">
              Status: {topic.scientificStatus}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {topic.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-serif italic">
          &ldquo;{topic.intro}&rdquo;
        </p>
      </div>

      {/* 4. Guided Explanation Broken into Sections */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          Guided Scientific Breakdown
        </h2>

        <div className="space-y-4">
          {topic.sections.map((sec, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
              <h3 className="text-base font-bold text-white tracking-tight">{sec.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{sec.content}</p>

              {sec.formula && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-center text-sm text-indigo-300 my-2">
                  {sec.formula}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5, 6, 7: Scientific Epistemology (What We Know / Investigating / Unknown) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-emerald-400" />
          Empirical Status & Frontier Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Confirmed Knowledge */}
          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              What We Know
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {topic.whatWeKnow.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Active Research */}
          <div className="bg-sky-950/20 border border-sky-900/40 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-semibold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
              What We Investigate
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {topic.whatScientistsInvestigate.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-sky-400 mt-0.5">🔬</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Remaining Unknowns */}
          <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              What Remains Unknown
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {topic.whatRemainsUnknown.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400 mt-0.5">?</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 8. Relevant Measurements & Physical Scales */}
      {topic.measurements.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white">Physical Measurements & Scales</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {topic.measurements.map((m, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">{m.label}</div>
                <div className="text-sm font-semibold font-mono text-white mt-1">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. Interactive Knowledge Check Quiz */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Knowledge Check</span>
        </div>
        <h3 className="text-base font-bold text-white">{topic.quiz.question}</h3>

        <div className="space-y-2">
          {topic.quiz.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isCorrect = i === topic.quiz.correctAnswer;

            let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800';
            if (hasSubmittedQuiz) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium';
              } else if (isSelected) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleQuizAnswer(i)}
                disabled={hasSubmittedQuiz}
                className={`w-full p-3 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {hasSubmittedQuiz && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                {hasSubmittedQuiz && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {hasSubmittedQuiz && (
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1 mt-3">
            <div className="font-semibold text-white">Scientific Rationale:</div>
            <p className="text-slate-300 leading-relaxed">{topic.quiz.explanation}</p>
          </div>
        )}
      </div>

      {/* 11. Validated Sources & Further Reading */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Validated Sources & Peer-Reviewed Literature
        </h4>
        <div className="space-y-2">
          {topic.citations.map((cite, i) => (
            <div key={i} className="text-xs text-slate-400">
              <span className="font-medium text-slate-200">{cite.title}</span> —{' '}
              <span className="text-indigo-400 font-medium">{cite.institution}</span> ({cite.year})
              <p className="text-[11px] text-slate-500 mt-0.5">{cite.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
