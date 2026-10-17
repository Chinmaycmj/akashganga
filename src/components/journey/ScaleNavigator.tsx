'use client';

import React from 'react';
import { COSMIC_STAGES } from '@/data/cosmicStages';
import { useUserProgress } from '@/context/UserProgressContext';
import { useAudio } from '@/context/AudioContext';
import { ZoomIn, ZoomOut, RotateCcw, Compass } from 'lucide-react';

interface ScaleNavigatorProps {
  currentStageId: number;
  onStageChange: (stageId: number) => void;
}

export default function ScaleNavigator({ currentStageId, onStageChange }: ScaleNavigatorProps) {
  const { unitMode, setUnitMode } = useUserProgress();
  const { playZoomSound, playClickSound } = useAudio();

  const currentStage = COSMIC_STAGES.find(s => s.id === currentStageId) || COSMIC_STAGES[0];

  const handleZoomIn = () => {
    if (currentStageId > 1) {
      playZoomSound();
      onStageChange(currentStageId - 1);
    }
  };

  const handleZoomOut = () => {
    if (currentStageId < COSMIC_STAGES.length) {
      playZoomSound();
      onStageChange(currentStageId + 1);
    }
  };

  const handleReturnToEarth = () => {
    playClickSound();
    onStageChange(1); // Return to Earth's core/surface
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    playZoomSound();
    onStageChange(val);
  };

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 sm:p-4 text-slate-200 shadow-xl select-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Scale Metric Display */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
            <Compass className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Current Scale:</span>
              <button
                onClick={() => setUnitMode(unitMode === 'familiar' ? 'powersOfTen' : 'familiar')}
                className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-mono border border-slate-700 transition-colors"
                title="Toggle between Familiar Units and Powers of Ten"
              >
                {unitMode === 'familiar' ? 'Units: Standard' : 'Units: 10ˣ m'}
              </button>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-white tracking-tight flex items-center gap-2">
              <span>{unitMode === 'familiar' ? currentStage.scaleDisplay : currentStage.powersOfTen}</span>
              <span className="text-xs font-normal text-slate-400">({currentStage.title})</span>
            </div>
          </div>
        </div>

        {/* Stepper & Return Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomIn}
            disabled={currentStageId <= 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all active:scale-95 flex items-center gap-1 text-xs"
            title="Zoom In (Toward Earth Core)"
          >
            <ZoomIn className="w-4 h-4" />
            <span className="hidden sm:inline">Zoom In</span>
          </button>

          <button
            onClick={handleZoomOut}
            disabled={currentStageId >= COSMIC_STAGES.length}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all active:scale-95 flex items-center gap-1 text-xs"
            title="Zoom Out (Toward Observable Universe)"
          >
            <ZoomOut className="w-4 h-4" />
            <span className="hidden sm:inline">Zoom Out</span>
          </button>

          <button
            onClick={handleReturnToEarth}
            className="p-2 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60 transition-all active:scale-95 flex items-center gap-1 text-xs ml-1"
            title="Return to Earth"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Earth</span>
          </button>
        </div>
      </div>

      {/* Logarithmic Scale Slider & Stage Dots */}
      <div className="mt-3 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1.5">
          <span>Earth Core (10⁶ m)</span>
          <span className="text-indigo-400 font-semibold">Stage {currentStageId} of {COSMIC_STAGES.length}</span>
          <span>Cosmic Horizon (&gt; 10²⁷ m)</span>
        </div>

        <input
          type="range"
          min={1}
          max={COSMIC_STAGES.length}
          step={1}
          value={currentStageId}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
          aria-label="Cosmic Scale Slider"
        />

        {/* Stage quick jump bar */}
        <div className="flex justify-between items-center mt-2 px-1">
          {COSMIC_STAGES.map(stage => {
            const isActive = stage.id === currentStageId;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  playZoomSound();
                  onStageChange(stage.id);
                }}
                className={`group relative flex flex-col items-center transition-all focus:outline-none`}
                title={`${stage.id}. ${stage.title} (${stage.scaleDisplay})`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-indigo-400 ring-4 ring-indigo-500/30 scale-125'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
