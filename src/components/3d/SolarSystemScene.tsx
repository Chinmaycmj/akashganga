'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createSunTexture, createBandedPlanetTexture } from '@/utils/proceduralTextures';

interface PlanetData {
  id: string;
  name: string;
  radius: number;
  orbitRadius: number;
  speed: number;
  color: string;
  hasRings?: boolean;
  palette?: string[];
  info: string;
}

const PLANETS: PlanetData[] = [
  { id: 'mercury', name: 'Mercury', radius: 0.12, orbitRadius: 2.2, speed: 0.04, color: '#94a3b8', info: 'Smallest, cratered rocky planet, 88-day orbit.' },
  { id: 'venus', name: 'Venus', radius: 0.22, orbitRadius: 3.2, speed: 0.03, color: '#eab308', info: 'Runaway greenhouse atmosphere (464°C, 92 atm).' },
  { id: 'earth', name: 'Earth', radius: 0.24, orbitRadius: 4.4, speed: 0.025, color: '#38bdf8', info: 'The cradle of life, liquid water oceans, 1 AU.' },
  { id: 'mars', name: 'Mars', radius: 0.16, orbitRadius: 5.6, speed: 0.02, color: '#ef4444', info: 'The Red Planet, iron oxide crust, ancient rivers.' },
  { id: 'jupiter', name: 'Jupiter', radius: 0.65, orbitRadius: 7.8, speed: 0.012, color: '#d97706', palette: ['#c2410c', '#f59e0b', '#fed7aa', '#b45309'], info: 'Largest gas giant (318 Earth masses), Great Red Spot.' },
  { id: 'saturn', name: 'Saturn', radius: 0.52, orbitRadius: 10.2, speed: 0.009, color: '#fde047', hasRings: true, palette: ['#fef08a', '#eab308', '#ca8a04'], info: 'Extensive icy ring system, low density (floats in water).' },
  { id: 'uranus', name: 'Uranus', radius: 0.35, orbitRadius: 12.5, speed: 0.006, color: '#67e8f9', info: 'Ice giant, extreme 98° axial tilt, methane atmosphere.' },
  { id: 'neptune', name: 'Neptune', radius: 0.34, orbitRadius: 14.8, speed: 0.005, color: '#3b82f6', info: 'Farthest major planet, supersonic winds >2,100 km/h.' }
];

export default function SolarSystemScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(PLANETS[2]); // Default Earth
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [scaleMode, setScaleMode] = useState<'orbital' | 'comparative'>('orbital');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 16, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // Glowing Central Sun
    const sunGeo = new THREE.SphereGeometry(1.2, 48, 48);
    const sunMat = new THREE.MeshBasicMaterial({
      map: createSunTexture(512, 256),
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    systemGroup.add(sunMesh);

    // Sun point light
    const sunLight = new THREE.PointLight(0xfff5ea, 2.5, 60);
    scene.add(sunLight);

    // Sun atmospheric glow
    const sunGlowGeo = new THREE.SphereGeometry(1.45, 32, 32);
    const sunGlowMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const sunGlowMesh = new THREE.Mesh(sunGlowGeo, sunGlowMat);
    systemGroup.add(sunGlowMesh);

    // Planetary meshes and orbit lines
    interface PlanetMeshItem {
      data: PlanetData;
      group: THREE.Group;
      mesh: THREE.Mesh;
      angle: number;
    }
    const planetMeshes: PlanetMeshItem[] = [];

    PLANETS.forEach((planet, idx) => {
      // Orbit Line
      const orbitPts: THREE.Vector3[] = [];
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        orbitPts.push(new THREE.Vector3(Math.cos(theta) * planet.orbitRadius, 0, Math.sin(theta) * planet.orbitRadius));
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPts);
      const orbitLine = new THREE.Line(
        orbitGeo,
        new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.4 })
      );
      systemGroup.add(orbitLine);

      // Planet Group
      const pGroup = new THREE.Group();
      systemGroup.add(pGroup);

      // Planet Material
      let pMat: THREE.Material;
      if (planet.palette) {
        pMat = new THREE.MeshStandardMaterial({
          map: createBandedPlanetTexture(256, 128, planet.palette),
          roughness: 0.6,
        });
      } else {
        pMat = new THREE.MeshStandardMaterial({
          color: planet.color,
          roughness: 0.7,
        });
      }

      const pMesh = new THREE.Mesh(new THREE.SphereGeometry(planet.radius, 32, 32), pMat);
      pGroup.add(pMesh);

      // Add rings for Saturn
      if (planet.hasRings) {
        const ringGeo = new THREE.RingGeometry(planet.radius * 1.5, planet.radius * 2.6, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xd4b106,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.75,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        pGroup.add(ringMesh);
      }

      planetMeshes.push({
        data: planet,
        group: pGroup,
        mesh: pMesh,
        angle: (idx * Math.PI) / 4,
      });
    });

    // Asteroid Belt Particles (between Mars 5.6 and Jupiter 7.8)
    const asteroidCount = 1200;
    const asteroidGeo = new THREE.BufferGeometry();
    const asteroidPositions = new Float32Array(asteroidCount * 3);
    for (let i = 0; i < asteroidCount; i++) {
      const r = 6.2 + Math.random() * 1.2;
      const th = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.4;
      asteroidPositions[i * 3] = Math.cos(th) * r;
      asteroidPositions[i * 3 + 1] = y;
      asteroidPositions[i * 3 + 2] = Math.sin(th) * r;
    }
    asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPositions, 3));
    const asteroidMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const asteroidField = new THREE.Points(asteroidGeo, asteroidMat);
    systemGroup.add(asteroidField);

    // Orbit Drag Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      systemGroup.rotation.y += (e.clientX - prevMouseX) * 0.005;
      systemGroup.rotation.x += (e.clientY - prevMouseY) * 0.003;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseUp = () => (isDragging = false);

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate Sun
      sunMesh.rotation.y += 0.002;
      asteroidField.rotation.y += 0.0005 * speedMultiplier;

      // Animate planets
      planetMeshes.forEach(item => {
        if (scaleMode === 'orbital') {
          item.angle += item.data.speed * speedMultiplier;
          item.group.position.x = Math.cos(item.angle) * item.data.orbitRadius;
          item.group.position.z = Math.sin(item.angle) * item.data.orbitRadius;
          item.group.position.y = 0;
        } else {
          // Comparative size mode: line them up side-by-side
          const idx = PLANETS.findIndex(p => p.id === item.data.id);
          item.group.position.set((idx - 3.5) * 2.8, 0, 0);
        }
        item.mesh.rotation.y += 0.02;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [speedMultiplier, scaleMode]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Solar System Navigator HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Solar System Explorer</span>
          <span className="text-[10px] text-amber-400 font-mono">0.39 – 30 AU</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">
          Select a planet to inspect its orbital characteristics and atmospheric profile:
        </p>

        {/* Planet quick selector */}
        <div className="grid grid-cols-4 gap-1 mb-3">
          {PLANETS.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPlanet(p)}
              className={`px-1.5 py-1 rounded text-[10px] truncate transition-colors ${
                selectedPlanet?.id === p.id ? 'bg-amber-500 text-slate-950 font-semibold' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {selectedPlanet && (
          <div className="p-2 rounded bg-slate-800/70 border border-slate-700 text-[11px] space-y-1">
            <div className="font-semibold text-amber-300 flex items-center justify-between">
              <span>{selectedPlanet.name}</span>
              <span className="font-mono text-slate-400 text-[10px]">{selectedPlanet.orbitRadius.toFixed(1)} AU</span>
            </div>
            <p className="text-slate-300 text-[10px]">{selectedPlanet.info}</p>
          </div>
        )}

        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setScaleMode('orbital')}
              className={`px-2 py-0.5 rounded text-[10px] ${scaleMode === 'orbital' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
            >
              Orbits
            </button>
            <button
              onClick={() => setScaleMode('comparative')}
              className={`px-2 py-0.5 rounded text-[10px] ${scaleMode === 'comparative' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
            >
              Compare Sizes
            </button>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 5].map(mult => (
              <button
                key={mult}
                onClick={() => setSpeedMultiplier(mult)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  speedMultiplier === mult ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {mult}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        ☀️ The Sun contains 99.86% of all mass in the Solar System
      </div>
    </div>
  );
}
