'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlowParticleTexture } from '@/utils/proceduralTextures';

export default function NebulaScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [nebulaType, setNebulaType] = useState<'emission' | 'supernova-remnant'>('emission');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Multi-layered Nebula Gas Particles
    const particleCount = 2500;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Color palettes based on nebula type
    const emissionPalette = [
      new THREE.Color(0xec4899), // H-alpha red/pink
      new THREE.Color(0x06b6d4), // O III ionized oxygen teal
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0xf59e0b), // Warm dust amber
    ];

    const snrPalette = [
      new THREE.Color(0xef4444), // Supernova iron/shockwave red
      new THREE.Color(0x38bdf8), // Synchrotron blue
      new THREE.Color(0x22c55e), // Shocked sulfur green
    ];

    const activePalette = nebulaType === 'emission' ? emissionPalette : snrPalette;

    for (let i = 0; i < particleCount; i++) {
      if (nebulaType === 'emission') {
        // Pillar-like structures (Eagle nebula style)
        const pillarIndex = Math.floor(Math.random() * 3);
        const px = (pillarIndex - 1) * 1.6 + (Math.random() - 0.5) * 0.8;
        const py = (Math.random() - 0.5) * 4.2;
        const pz = (Math.random() - 0.5) * 1.2;
        positions[i * 3] = px;
        positions[i * 3 + 1] = py;
        positions[i * 3 + 2] = pz;
      } else {
        // Supernova remnant expanding bubble / shell
        const r = 2.4 + (Math.random() - 0.5) * 0.7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }

      const col = activePalette[Math.floor(Math.random() * activePalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const glowTex = createGlowParticleTexture(64, '#ffffff', '#ec4899');
    const mat = new THREE.PointsMaterial({
      size: 0.28,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebulaPoints = new THREE.Points(geo, mat);
    group.add(nebulaPoints);

    // Embedded newborn massive stars
    const starCount = 12;
    for (let s = 0; s < starCount; s++) {
      const starMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      starMesh.position.set(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 1.5
      );
      group.add(starMesh);
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
        group.rotation.y += 0.0015;
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
  }, [nebulaType]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Nebula Type HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Interstellar Medium & Clouds</span>
          <span className="text-[10px] text-pink-400 font-mono">10–100 ly</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          Dense gas collapses into protostars, while supernova shockwaves enrich space with carbon, oxygen, and iron:
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setNebulaType('emission')}
            className={`flex-1 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors ${
              nebulaType === 'emission' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Star Nursery (M16/Orion)
          </button>
          <button
            onClick={() => setNebulaType('supernova-remnant')}
            className={`flex-1 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors ${
              nebulaType === 'supernova-remnant' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Supernova Blast (Crab)
          </button>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🌌 Dust grains catalyze H₂ molecular synthesis in cold gas clouds
      </div>
    </div>
  );
}
