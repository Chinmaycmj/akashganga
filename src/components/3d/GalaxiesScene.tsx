'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlowParticleTexture } from '@/utils/proceduralTextures';

export default function GalaxiesScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [galaxyMode, setGalaxyMode] = useState<'andromeda' | 'colliding'>('andromeda');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const glowTex = createGlowParticleTexture(64, '#ffffff', '#8b5cf6');

    // Helper to build a spiral galaxy particle system
    const createSpiral = (count: number, armColor: number, coreColor: number, scale = 1) => {
      const g = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const armCol = new THREE.Color(armColor);
      const coreCol = new THREE.Color(coreColor);

      for (let i = 0; i < count; i++) {
        const isCore = Math.random() < 0.2;
        if (isCore) {
          const r = Math.pow(Math.random(), 2) * 1.0 * scale;
          const th = Math.random() * Math.PI * 2;
          pos[i * 3] = r * Math.cos(th);
          pos[i * 3 + 1] = (Math.random() - 0.5) * 0.4 * scale;
          pos[i * 3 + 2] = r * Math.sin(th);
          col[i * 3] = coreCol.r;
          col[i * 3 + 1] = coreCol.g;
          col[i * 3 + 2] = coreCol.b;
        } else {
          const arm = Math.floor(Math.random() * 2);
          const r = (0.8 + Math.pow(Math.random(), 1.2) * 3.2) * scale;
          const th = r * 1.5 + arm * Math.PI;
          pos[i * 3] = Math.cos(th) * r + (Math.random() - 0.5) * 0.4 * scale;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3 * scale;
          pos[i * 3 + 2] = Math.sin(th) * r + (Math.random() - 0.5) * 0.4 * scale;
          col[i * 3] = armCol.r;
          col[i * 3 + 1] = armCol.g;
          col[i * 3 + 2] = armCol.b;
        }
      }
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      return new THREE.Points(
        g,
        new THREE.PointsMaterial({
          size: 0.12 * scale,
          map: glowTex,
          vertexColors: true,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
    };

    let g1: THREE.Points;
    let g2: THREE.Points | null = null;

    if (galaxyMode === 'andromeda') {
      g1 = createSpiral(6000, 0xa855f7, 0xfde047, 1.2);
      g1.rotation.x = 0.5;
      group.add(g1);
    } else {
      // Colliding / Interacting galaxies (e.g. Antennae)
      g1 = createSpiral(4000, 0xec4899, 0xfde047, 0.9);
      g1.position.set(-1.4, 0, 0);
      g1.rotation.z = 0.4;
      group.add(g1);

      g2 = createSpiral(4000, 0x06b6d4, 0xfde047, 0.8);
      g2.position.set(1.4, 0.3, 0);
      g2.rotation.z = -0.6;
      group.add(g2);
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
      group.rotation.x += (e.clientY - prevMouseY) * 0.003;
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
      if (g1) g1.rotation.y += 0.002;
      if (g2) g2.rotation.y -= 0.002;

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
  }, [galaxyMode]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Galaxy Interaction HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Extragalactic Realm</span>
          <span className="text-[10px] text-purple-400 font-mono">2.5 Mly</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          Galaxies collide and merge without stars touching, sparking intense starbursts in compressed gas:
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setGalaxyMode('andromeda')}
            className={`flex-1 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors ${
              galaxyMode === 'andromeda' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Andromeda (M31)
          </button>
          <button
            onClick={() => setGalaxyMode('colliding')}
            className={`flex-1 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors ${
              galaxyMode === 'colliding' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Colliding Galaxies
          </button>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🌌 Over 2 trillion galaxies populate the observable universe
      </div>
    </div>
  );
}
