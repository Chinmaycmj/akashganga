'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserBookmark } from '@/types/cosmos';

interface UserProgressContextType {
  activeStageId: number;
  setActiveStageId: (id: number) => void;
  visitedStages: number[];
  markStageVisited: (id: number) => void;
  completedQuizzes: Record<string, number>; // topicOrStageId -> selectedAnswer
  saveQuizResult: (id: string, selectedAnswer: number, isCorrect: boolean) => void;
  bookmarks: UserBookmark[];
  addBookmark: (bookmark: Omit<UserBookmark, 'id' | 'timestamp'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (targetId: string) => boolean;
  notes: Record<string, string>; // targetId -> noteText
  saveNote: (targetId: string, text: string) => void;
  displayMode: '3d' | '2d-fallback';
  setDisplayMode: (mode: '3d' | '2d-fallback') => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  explanationLevel: 'beginner' | 'intermediate' | 'advanced';
  setExplanationLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  unitMode: 'familiar' | 'powersOfTen';
  setUnitMode: (mode: 'familiar' | 'powersOfTen') => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: React.ReactNode }) {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [visitedStages, setVisitedStages] = useState<number[]>([1]);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, number>>({});
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [displayMode, setDisplayMode] = useState<'3d' | '2d-fallback'>('3d');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [explanationLevel, setExplanationLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [unitMode, setUnitMode] = useState<'familiar' | 'powersOfTen'>('familiar');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedVisited = localStorage.getItem('infinite_cosmos_visited');
      if (savedVisited) setVisitedStages(JSON.parse(savedVisited));

      const savedQuizzes = localStorage.getItem('infinite_cosmos_quizzes');
      if (savedQuizzes) setCompletedQuizzes(JSON.parse(savedQuizzes));

      const savedBookmarks = localStorage.getItem('infinite_cosmos_bookmarks');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

      const savedNotes = localStorage.getItem('infinite_cosmos_notes');
      if (savedNotes) setNotes(JSON.parse(savedNotes));

      const savedLevel = localStorage.getItem('infinite_cosmos_level');
      if (savedLevel && ['beginner', 'intermediate', 'advanced'].includes(savedLevel)) {
        setExplanationLevel(savedLevel as 'beginner' | 'intermediate' | 'advanced');
      }

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setReducedMotion(prefersReduced);
    } catch {
      // localStorage unavailable or SSR
    }
  }, []);

  const markStageVisited = (id: number) => {
    setVisitedStages(prev => {
      if (!prev.includes(id)) {
        const next = [...prev, id];
        try {
          localStorage.setItem('infinite_cosmos_visited', JSON.stringify(next));
        } catch {}
        return next;
      }
      return prev;
    });
  };

  const saveQuizResult = (id: string, selectedAnswer: number) => {
    setCompletedQuizzes(prev => {
      const next = { ...prev, [id]: selectedAnswer };
      try {
        localStorage.setItem('infinite_cosmos_quizzes', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const addBookmark = (bm: Omit<UserBookmark, 'id' | 'timestamp'>) => {
    setBookmarks(prev => {
      const newBm: UserBookmark = {
        ...bm,
        id: `${bm.type}-${bm.targetId}`,
        timestamp: Date.now()
      };
      const filtered = prev.filter(b => b.targetId !== bm.targetId);
      const next = [newBm, ...filtered];
      try {
        localStorage.setItem('infinite_cosmos_bookmarks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const removeBookmark = (targetId: string) => {
    setBookmarks(prev => {
      const next = prev.filter(b => b.targetId !== targetId && b.id !== targetId);
      try {
        localStorage.setItem('infinite_cosmos_bookmarks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isBookmarked = (targetId: string) => {
    return bookmarks.some(b => b.targetId === targetId || b.id === targetId);
  };

  const saveNote = (targetId: string, text: string) => {
    setNotes(prev => {
      const next = { ...prev, [targetId]: text };
      try {
        localStorage.setItem('infinite_cosmos_notes', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <UserProgressContext.Provider
      value={{
        activeStageId,
        setActiveStageId,
        visitedStages,
        markStageVisited,
        completedQuizzes,
        saveQuizResult,
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        notes,
        saveNote,
        displayMode,
        setDisplayMode,
        reducedMotion,
        setReducedMotion,
        explanationLevel,
        setExplanationLevel,
        unitMode,
        setUnitMode,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
}
