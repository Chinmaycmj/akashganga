'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { COSMIC_STAGES } from '@/data/cosmicStages';
import CosmicSceneContainer from '@/components/journey/CosmicSceneContainer';
import ScaleNavigator from '@/components/journey/ScaleNavigator';
import StageDiscoveryCard from '@/components/journey/StageDiscoveryCard';
import JourneyBreadcrumb from '@/components/journey/JourneyBreadcrumb';
import { useUserProgress } from '@/context/UserProgressContext';
import { useAudio } from '@/context/AudioContext';
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-react';

function JourneyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { markStageVisited } = useUserProgress();
  const { playZoomSound, playClickSound } = useAudio();

  // Active Stage State (1 to 14)
  const initialStageParam = searchParams.get('stage');
  const initialStage = initialStageParam ? parseInt(initialStageParam, 10) : 1;
  const [currentStageId, setCurrentStageId] = useState<number>(
    initialStage >= 1 && initialStage <= 14 ? initialStage : 1
  );

  // UI state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(false);

  const currentStage = COSMIC_STAGES.find(s => s.id === currentStageId) || COSMIC_STAGES[0];

  // Mark stage visited
  useEffect(() => {
    markStageVisited(currentStageId);
  }, [currentStageId, markStageVisited]);

  const handleStageChange = useCallback((newStageId: number) => {
    if (newStageId >= 1 && newStageId <= COSMIC_STAGES.length) {
      setCurrentStageId(newStageId);
      router.replace(`/journey?stage=${newStageId}`, { scroll: false });
    }
  }, [router]);

  // Scroll to zoom navigation (Wheel handling with debounce)
  useEffect(() => {
    let lastWheelTime = 0;
    const handleWheel = (e: WheelEvent) => {
      // Ignore if user is scrolling inside the discovery card
      const target = e.target as HTMLElement;
      if (target.closest('.overflow-y-auto')) return;

      const now = Date.now();
      if (now - lastWheelTime < 500) return; // Debounce wheel gestures

      if (e.deltaY > 30) {
        // Zoom Out (larger scale)
        if (currentStageId < COSMIC_STAGES.length) {
          lastWheelTime = now;
          playZoomSound();
          handleStageChange(currentStageId + 1);
        }
      } else if (e.deltaY < -30) {
        // Zoom In (smaller scale)
        if (currentStageId > 1) {
          lastWheelTime = now;
          playZoomSound();
          handleStageChange(currentStageId - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentStageId, handleStageChange, playZoomSound]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === '+') {
        if (currentStageId < COSMIC_STAGES.length) {
          playZoomSound();
          handleStageChange(currentStageId + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === '-') {
        if (currentStageId > 1) {
          playZoomSound();
          handleStageChange(currentStageId - 1);
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoTouring(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStageId, handleStageChange, playZoomSound]);

  // Auto-Tour interval progression
  useEffect(() => {
    if (!isAutoTouring) return;
    const interval = setInterval(() => {
      setCurrentStageId(prev => {
        if (prev >= COSMIC_STAGES.length) {
          setIsAutoTouring(false);
          return 1;
        }
        playZoomSound();
        const next = prev + 1;
        router.replace(`/journey?stage=${next}`, { scroll: false });
        return next;
      });
    }, 7000); // 7 seconds per cosmic stage

    return () => clearInterval(interval);
  }, [isAutoTouring, playZoomSound, router]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-4' : 'max-w-7xl mx-auto px-4 sm:px-6 py-4'}`}>
      {/* Top Breadcrumb & Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-slate-800">
        <JourneyBreadcrumb currentStageId={currentStageId} onSelectStage={handleStageChange} />

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Auto-Tour Play/Pause */}
          <button
            onClick={() => {
              playClickSound();
              setIsAutoTouring(!isAutoTouring);
            }}
            className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
              isAutoTouring
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-300 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title={isAutoTouring ? 'Pause Auto-Tour' : 'Start Cinematic Auto-Tour'}
          >
            {isAutoTouring ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoTouring ? 'Auto-Touring' : 'Auto-Tour'}</span>
          </button>

          {/* Toggle Info Panel */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isSidebarOpen ? 'Hide Discovery Card' : 'Show Discovery Card'}
          >
            {isSidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Exploration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-stretch min-h-[580px]">
        {/* Central 3D / 2D Cosmic Viewport */}
        <div className={`${isSidebarOpen ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'} flex flex-col transition-all duration-300`}>
          <CosmicSceneContainer stage={currentStage} />
        </div>

        {/* Right Contextual Discovery Card */}
        {isSidebarOpen && (
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <StageDiscoveryCard stage={currentStage} />
          </div>
        )}
      </div>

      {/* Bottom Scale Navigator & Logarithmic Stepper */}
      <div className="w-full">
        <ScaleNavigator currentStageId={currentStageId} onStageChange={handleStageChange} />
      </div>
    </div>
  );
}

export default function JourneyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Cosmic Journey...</div>}>
      <JourneyContent />
    </Suspense>
  );
}
