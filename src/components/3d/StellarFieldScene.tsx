'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlowParticleTexture } from '@/utils/proceduralTextures';

export default function StellarFieldScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedStarType, setSelectedStarType] = useState<string>('main-sequence');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Ambient background stars
    const starCount = 2000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0x93c5fd), // O/B blue
      new THREE.Color(0xfef08a), // G yellow
      new THREE.Color(0xfca5a5), // M red dwarf
      new THREE.Color(0xffffff), // A white
    ];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    group.add(starPoints);

    // Hero Star at Center based on selected type
    const heroGroup = new THREE.Group();
    group.add(heroGroup);

    // Hero Star Mesh
    let starRadius = 0.9;
    let starColor = 0xffcc00;
    let glowColor = 0xff8800;

    if (selectedStarType === 'red-giant') {
      starRadius = 1.8;
      starColor = 0xef4444;
      glowColor = 0x991b1b;
    } else if (selectedStarType === 'white-dwarf') {
      starRadius = 0.25;
      starColor = 0xe0f2fe;
      glowColor = 0x38bdf8;
    } else if (selectedStarType === 'neutron-star') {
      starRadius = 0.15;
      starColor = 0xa855f7;
      glowColor = 0xc084fc;
    } else if (selectedStarType === 'blue-supergiant') {
      starRadius = 1.6;
      starColor = 0x60a5fa;
      glowColor = 0x1d4ed8;
    }

    const heroGeo = new THREE.SphereGeometry(starRadius, 32, 32);
    const heroMat = new THREE.MeshBasicMaterial({ color: starColor });
    const heroMesh = new THREE.Mesh(heroGeo, heroMat);
    heroGroup.add(heroMesh);

    // Glowing Halo Billboard
    const glowTex = createGlowParticleTexture(128, '#ffffff', `#${glowColor.toString(16)}`);
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
    });
    const glowSprite = new THREE.Sprite(glowMat);
    glowSprite.scale.set(starRadius * 4.5, starRadius * 4.5, 1);
    heroGroup.add(glowSprite);

    // For Neutron Star: Add Relativistic Pulsar Radiation Cones
    if (selectedStarType === 'neutron-star') {
      const coneGeo = new THREE.ConeGeometry(0.6, 3.5, 16, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const topCone = new THREE.Mesh(coneGeo, coneMat);
      topCone.position.set(0, 1.75, 0);
      heroGroup.add(topCone);

      const botCone = new THREE.Mesh(coneGeo, coneMat);
      botCone.position.set(0, -1.75, 0);
      botCone.rotation.x = Math.PI;
      heroGroup.add(botCone);
    }

    // Drag interaction
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
      group.rotation.y += (e.clientX - prevMouseX) * 0.005;
      group.rotation.x += (e.clientY - prevMouseY) * 0.005;
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
      if (!isDragging) {
        group.rotation.y += 0.001;
      }
      if (selectedStarType === 'neutron-star') {
        heroGroup.rotation.y += 0.08; // Rapid pulsar spin
        heroGroup.rotation.z = Math.sin(Date.now() * 0.003) * 0.3;
      } else {
        heroMesh.rotation.y += 0.004;
      }
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
  }, [selectedStarType]);

  const starTypes = [
    { id: 'main-sequence', name: 'Main Sequence (Sun-like)', desc: 'Fusing hydrogen to helium in core hydrostatic equilibrium for ~10 billion years.' },
    { id: 'red-giant', name: 'Red Giant (Betelgeuse)', desc: 'Hydrogen shell fusion expands outer envelope hundreds of times its original radius.' },
    { id: 'white-dwarf', name: 'White Dwarf (Sirius B)', desc: 'Earth-sized degenerate carbon-oxygen core supported by electron degeneracy pressure.' },
    { id: 'neutron-star', name: 'Neutron Star / Pulsar', desc: 'Collapsed core of a massive star, spinning rapidly with lighthouse radiation beams.' },
    { id: 'blue-supergiant', name: 'Blue Supergiant (Rigel)', desc: 'Luminous massive star burning rapidly, destined for a violent core-collapse supernova.' }
  ];

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Stellar Evolution HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Stellar Lifecycle Explorer</span>
          <span className="text-[10px] text-amber-400 font-mono">10¹⁶ m (ly)</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">
          A star’s initial mass dictates its entire lifecycle and terminal corpse:
        </p>

        <div className="space-y-1">
          {starTypes.map(st => (
            <button
              key={st.id}
              onClick={() => setSelectedStarType(st.id)}
              className={`w-full text-left px-2 py-1.5 rounded transition-all ${
                selectedStarType === st.id ? 'bg-amber-950/80 border border-amber-500/60 text-amber-200' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="font-medium text-[11px]">{st.name}</div>
              {selectedStarType === st.id && (
                <div className="text-[10px] text-slate-300 mt-0.5 leading-snug">{st.desc}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        ✨ Stars heavier than 20 M☉ end their lives as stellar-mass black holes
      </div>
    </div>
  );
}
