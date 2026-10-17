'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CosmicStage } from '@/types/cosmos';
import Cosmic2DFallback from '@/components/2d-fallback/Cosmic2DFallback';
import { useUserProgress } from '@/context/UserProgressContext';
import { Eye, Box } from 'lucide-react';

// Dynamically import 3D scenes with SSR disabled to prevent hydration / window issues
const EarthCoreScene = dynamic(() => import('@/components/3d/EarthCoreScene'), { ssr: false });
const EarthSurfaceScene = dynamic(() => import('@/components/3d/EarthSurfaceScene'), { ssr: false });
const EarthMoonScene = dynamic(() => import('@/components/3d/EarthMoonScene'), { ssr: false });
const SolarSystemScene = dynamic(() => import('@/components/3d/SolarSystemScene'), { ssr: false });
const StellarFieldScene = dynamic(() => import('@/components/3d/StellarFieldScene'), { ssr: false });
const ExoplanetScene = dynamic(() => import('@/components/3d/ExoplanetScene'), { ssr: false });
const NebulaScene = dynamic(() => import('@/components/3d/NebulaScene'), { ssr: false });
const MilkyWayScene = dynamic(() => import('@/components/3d/MilkyWayScene'), { ssr: false });
const GalaxiesScene = dynamic(() => import('@/components/3d/GalaxiesScene'), { ssr: false });
const GalaxyClusterScene = dynamic(() => import('@/components/3d/GalaxyClusterScene'), { ssr: false });
const CosmicWebScene = dynamic(() => import('@/components/3d/CosmicWebScene'), { ssr: false });
const ObservableUniverseScene = dynamic(() => import('@/components/3d/ObservableUniverseScene'), { ssr: false });
const BeyondHorizonScene = dynamic(() => import('@/components/3d/BeyondHorizonScene'), { ssr: false });
const TesseractScene = dynamic(() => import('@/components/3d/TesseractScene'), { ssr: false });

interface CosmicSceneContainerProps {
  stage: CosmicStage;
}

export default function CosmicSceneContainer({ stage }: CosmicSceneContainerProps) {
  const { displayMode, setDisplayMode } = useUserProgress();
  const [webGlError, setWebGlError] = useState<boolean>(false);

  const render3DScene = () => {
    try {
      switch (stage.id) {
        case 1:
          return <EarthCoreScene />;
        case 2:
          return <EarthSurfaceScene />;
        case 3:
          return <EarthMoonScene />;
        case 4:
          return <SolarSystemScene />;
        case 5:
          return <StellarFieldScene />;
        case 6:
          return <ExoplanetScene />;
        case 7:
          return <NebulaScene />;
        case 8:
          return <MilkyWayScene />;
        case 9:
          return <GalaxiesScene />;
        case 10:
          return <GalaxyClusterScene />;
        case 11:
          return <CosmicWebScene />;
        case 12:
          return <ObservableUniverseScene />;
        case 13:
          return <BeyondHorizonScene />;
        case 14:
          return <TesseractScene />;
        default:
          return <EarthSurfaceScene />;
      }
    } catch {
      setWebGlError(true);
      return <Cosmic2DFallback stage={stage} />;
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex flex-col">
      {/* Top Controls Overlay: 3D vs 2D Toggle */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-lg p-1 text-xs">
        <button
          onClick={() => setDisplayMode('3d')}
          className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
            displayMode === '3d' && !webGlError
              ? 'bg-indigo-600 text-white font-medium shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Interactive 3D WebGL Scene"
        >
          <Box className="w-3.5 h-3.5" />
          <span>3D WebGL</span>
        </button>
        <button
          onClick={() => setDisplayMode('2d-fallback')}
          className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
            displayMode === '2d-fallback' || webGlError
              ? 'bg-sky-600 text-white font-medium shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Accessible 2D High-Contrast Schematic"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>2D Schematic</span>
        </button>
      </div>

      {/* Main Viewport */}
      <div className="relative w-full h-full flex-1 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
        {displayMode === '2d-fallback' || webGlError ? (
          <Cosmic2DFallback stage={stage} />
        ) : (
          render3DScene()
        )}
      </div>
    </div>
  );
}
