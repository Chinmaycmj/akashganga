'use client';

import React from 'react';
import { COSMIC_STAGES } from '@/data/cosmicStages';
import { ChevronRight, Home } from 'lucide-react';

interface JourneyBreadcrumbProps {
  currentStageId: number;
  onSelectStage: (stageId: number) => void;
}

export default function JourneyBreadcrumb({ currentStageId, onSelectStage }: JourneyBreadcrumbProps) {
  // Compute hierarchical breadcrumb segments
  const getHierarchy = () => {
    if (currentStageId <= 2) {
      return [
        { label: 'Earth & Interior', stageId: 1 },
        { label: currentStageId === 1 ? 'Solid Inner Core' : 'Atmosphere & Surface', stageId: currentStageId },
      ];
    }
    if (currentStageId <= 4) {
      return [
        { label: 'Solar System', stageId: 4 },
        { label: currentStageId === 3 ? 'Earth-Moon System' : 'Planetary Realm', stageId: currentStageId },
      ];
    }
    if (currentStageId <= 8) {
      return [
        { label: 'Milky Way Galaxy', stageId: 8 },
        {
          label:
            currentStageId === 5
              ? 'Stellar Field'
              : currentStageId === 6
              ? 'Exoplanet Systems'
              : currentStageId === 7
              ? 'Interstellar Nebulae'
              : 'Galactic Center (Sgr A*)',
          stageId: currentStageId,
        },
      ];
    }
    if (currentStageId <= 11) {
      return [
        { label: 'Large-Scale Structure', stageId: 11 },
        {
          label:
            currentStageId === 9
              ? 'Extragalactic Realm'
              : currentStageId === 10
              ? 'Galaxy Clusters'
              : 'The Cosmic Web',
          stageId: currentStageId,
        },
      ];
    }
    return [
      { label: 'Cosmological Horizon', stageId: 12 },
      {
        label:
          currentStageId === 12
            ? 'Observable Universe'
            : currentStageId === 13
            ? 'Beyond Horizon'
            : 'Dimensions & Multiverse',
        stageId: currentStageId,
      },
    ];
  };

  const hierarchy = getHierarchy();
  const currentStage = COSMIC_STAGES.find(s => s.id === currentStageId) || COSMIC_STAGES[0];

  return (
    <nav aria-label="Cosmic Journey Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 overflow-x-auto py-1">
      <button
        onClick={() => onSelectStage(1)}
        className="flex items-center gap-1 hover:text-white transition-colors text-slate-300 shrink-0"
        title="Return to Earth Core"
      >
        <Home className="w-3.5 h-3.5 text-indigo-400" />
        <span className="font-medium">Earth</span>
      </button>

      {hierarchy.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <button
            onClick={() => onSelectStage(item.stageId)}
            className={`truncate hover:text-white transition-colors ${
              item.stageId === currentStageId ? 'text-indigo-300 font-semibold' : 'text-slate-400'
            }`}
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}

      <div className="ml-auto flex items-center gap-2 pl-3 shrink-0">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
          {currentStage.scaleDisplay}
        </span>
      </div>
    </nav>
  );
}
