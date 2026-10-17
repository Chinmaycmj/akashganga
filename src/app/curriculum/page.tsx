'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { CURRICULUM_STAGES } from '@/data/curriculumData';
import { useUserProgress } from '@/context/UserProgressContext';
import { 
  GraduationCap, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Clock, 
  AlertTriangle, 
  Play, 
  HelpCircle, 
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function CurriculumLearningMapPage() {
  const { completedCurriculumStages, markCurriculumStageCompleted } = useUserProgress();
  const [selectedStageNum, setSelectedStageNum] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const selectedStage = CURRICULUM_STAGES.find(s => s.stageNumber === selectedStageNum) || CURRICULUM_STAGES[0];

  const isStageUnlocked = (stageNum: number) => {
    if (stageNum === 1) return true;
    const stage = CURRICULUM_STAGES.find(s => s.stageNumber === stageNum);
    if (!stage) return false;
    return stage.prerequisites.every(p => completedCurriculumStages.includes(p));
  };

  const handleSelectQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleGradeQuiz = () => {
    setQuizSubmitted(true);
    const allCorrect = selectedStage.quiz.every((q, idx) => quizAnswers[idx] === q.correctAnswer);
    if (allCorrect) {
      markCurriculumStageCompleted(selectedStage.stageNumber);
    }
  };

  const isCompleted = completedCurriculumStages.includes(selectedStage.stageNumber);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Structured Prerequisite Curriculum
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20">
              10 Stages from Beginner to Advanced Synthesis
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {completedCurriculumStages.length} of 10 Mastered
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Mastery Curriculum & Prerequisite Map
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Begin with no prior knowledge and systematically advance through modern astrophysics, Vedic astrometry, classical Sanskrit literature, Jyotisha chart algorithms, and modern cosmology. Each stage unlocks progressively upon demonstrating mastery.
          </p>
        </div>

        {/* 10-STAGE HORIZONTAL PROGRESS STEPPER */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-10">
          {CURRICULUM_STAGES.map((st) => {
            const unlocked = isStageUnlocked(st.stageNumber);
            const finished = completedCurriculumStages.includes(st.stageNumber);
            const isSelected = st.stageNumber === selectedStageNum;

            return (
              <button
                key={st.stageNumber}
                disabled={!unlocked}
                onClick={() => {
                  setSelectedStageNum(st.stageNumber);
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[90px] ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/10 scale-105'
                    : finished
                    ? 'bg-emerald-950/30 border-emerald-800 text-emerald-300 hover:border-emerald-600'
                    : unlocked
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono font-bold">#{st.stageNumber}</span>
                  {finished ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : unlocked ? (
                    <Unlock className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>
                <span className="text-[11px] font-bold tracking-tight line-clamp-2 mt-1">
                  {st.title.split(':')[0]}
                </span>
                <span className="text-[9px] text-slate-500 font-mono mt-1">
                  {st.estimatedMinutes}m
                </span>
              </button>
            );
          })}
        </div>

        {/* SELECTED STAGE VIEWER */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl mb-12">
          {/* Header of Stage */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Stage {selectedStage.stageNumber} of 10
                </span>
                {isCompleted && (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <Award className="w-3 h-3" /> Mastered
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedStage.title}
              </h2>
              <p className="text-sm text-slate-400 mt-1">{selectedStage.subtitle}</p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> {selectedStage.estimatedMinutes} minutes
              </span>
              <span className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Prerequisites: {selectedStage.prerequisites.length ? selectedStage.prerequisites.map(p => `Stage ${p}`).join(', ') : 'None (Entry)'}
              </span>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="my-6 p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Learning Objectives</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
              {selectedStage.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Misconception Alert */}
          <div className="p-4 bg-rose-950/20 border border-rose-800/40 rounded-xl text-xs mb-8">
            <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4" /> Common Misconception Check
            </div>
            <div className="text-rose-200 mb-1">
              <strong>Misconception:</strong> {selectedStage.misconceptionAlert.misconception}
            </div>
            <div className="text-slate-300">
              <strong>Scientific & Historical Correction:</strong> {selectedStage.misconceptionAlert.scientificHistoricalCorrection}
            </div>
          </div>

          {/* Lesson Content Sections */}
          <div className="space-y-6 mb-8">
            {selectedStage.lessonContent.map((sec, idx) => (
              <div key={idx} className="p-5 bg-slate-950/50 rounded-xl border border-slate-800/80">
                <h4 className="text-base font-bold text-white mb-2">{sec.sectionTitle}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{sec.text}</p>
                {sec.formulaOrCode && (
                  <div className="mt-3 p-3 bg-slate-900 rounded font-mono text-xs text-amber-300">
                    {sec.formulaOrCode}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Terminology Glossary */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Essential Sanskrit & Astronomical Terminology
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedStage.keyTerms.map((term, i) => (
                <div key={i} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm font-bold text-white">{term.english}</span>
                    {term.sanskrit && (
                      <span className="text-xs font-serif text-amber-400">{term.sanskrit}</span>
                    )}
                  </div>
                  {term.iast && (
                    <div className="text-[10px] font-mono text-purple-300 mb-1">({term.iast})</div>
                  )}
                  <p className="text-xs text-slate-400 leading-relaxed">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Activity Launcher */}
          <div className="p-5 bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-blue-400">Guided Practical Activity</span>
              <h4 className="text-base font-bold text-white mt-0.5">{selectedStage.interactiveActivity.title}</h4>
              <p className="text-xs text-slate-300 mt-1">{selectedStage.interactiveActivity.description}</p>
            </div>
            <Link
              href={selectedStage.interactiveActivity.toolUrl}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
            >
              <Play className="w-3.5 h-3.5" /> Launch Activity
            </Link>
          </div>

          {/* Mastery Assessment Quiz */}
          <div className="p-6 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Stage {selectedStage.stageNumber} Mastery Assessment
              </h3>
              <span className="text-xs text-slate-400">Score 100% to unlock subsequent stage</span>
            </div>

            <div className="space-y-6">
              {selectedStage.quiz.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2">
                  <div className="text-xs font-semibold text-slate-200">
                    Q{qIdx + 1}: {q.question}
                  </div>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = quizAnswers[qIdx] === oIdx;
                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (quizSubmitted) {
                        if (oIdx === q.correctAnswer) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-200';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizAnswer(qIdx, oIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-xs text-slate-300 mt-2">
                      <strong className="text-amber-400">Explanation: </strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handleGradeQuiz}
                disabled={quizSubmitted && isCompleted}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md disabled:opacity-50"
              >
                {quizSubmitted ? 'Re-Evaluate Quiz' : 'Submit for Grading'}
              </button>

              {isCompleted && (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Stage Competency Demonstrated
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
