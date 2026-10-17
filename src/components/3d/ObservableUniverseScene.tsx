'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlowParticleTexture } from '@/utils/proceduralTextures';

export default function ObservableUniverseScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showCMBShell, setShowCMBShell] = useState<boolean>(true);
  const [showExpansionRays] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 13);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Procedural CMB (Cosmic Microwave Background) Texture
    const cmbCanvas = document.createElement('canvas');
    cmbCanvas.width = 512;
    cmbCanvas.height = 256;
    const ctx = cmbCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 512, 256);
      // Generate Planck-like mottled temperature fluctuations (blue/orange/yellow)
      const cmbColors = ['#1d4ed8', '#0284c7', '#f59e0b', '#dc2626', '#3b82f6'];
      for (let i = 0; i < 1800; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const r = Math.random() * 8 + 3;
        ctx.fillStyle = cmbColors[Math.floor(Math.random() * cmbColors.length)];
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
    }
    const cmbTexture = new THREE.CanvasTexture(cmbCanvas);

    // Outer CMB Shell (Particle Horizon at ~46.5 Gly comoving radius)
    const cmbGeo = new THREE.SphereGeometry(6.2, 48, 48);
    const cmbMat = new THREE.MeshBasicMaterial({
      map: cmbTexture,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.35,
    });
    const cmbMesh = new THREE.Mesh(cmbGeo, cmbMat);
    universeGroup.add(cmbMesh);

    // Outer Horizon Wireframe
    const horizonWireGeo = new THREE.SphereGeometry(6.25, 32, 32);
    const horizonWireMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const horizonWireMesh = new THREE.Mesh(horizonWireGeo, horizonWireMat);
    universeGroup.add(horizonWireMesh);

    // 2. Interior Galaxy Distribution (Billions of galaxies inside)
    const galaxyCount = 5000;
    const gGeo = new THREE.BufferGeometry();
    const gPos = new Float32Array(galaxyCount * 3);
    const gCol = new Float32Array(galaxyCount * 3);

    for (let i = 0; i < galaxyCount; i++) {
      const r = Math.pow(Math.random(), 0.8) * 5.8;
      const th = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      gPos[i * 3] = r * Math.sin(phi) * Math.cos(th);
      gPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(th);
      gPos[i * 3 + 2] = r * Math.cos(phi);

      // Galaxies farther away have higher lookback time and appear redder (cosmological redshift)
      const redshiftFraction = r / 5.8;
      gCol[i * 3] = 0.3 + redshiftFraction * 0.7; // Redder near boundary
      gCol[i * 3 + 1] = 0.8 - redshiftFraction * 0.4;
      gCol[i * 3 + 2] = 1.0 - redshiftFraction * 0.6;
    }
    gGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    gGeo.setAttribute('color', new THREE.BufferAttribute(gCol, 3));

    const glowTex = createGlowParticleTexture(64, '#ffffff', '#14b8a6');
    const gMat = new THREE.PointsMaterial({
      size: 0.15,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const galaxies = new THREE.Points(gGeo, gMat);
    universeGroup.add(galaxies);

    // 3. Central Earth/Observer Beacon
    const earthBeacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    universeGroup.add(earthBeacon);

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
      universeGroup.rotation.y += (e.clientX - prevMouseX) * 0.005;
      universeGroup.rotation.x += (e.clientY - prevMouseY) * 0.003;
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
        universeGroup.rotation.y += 0.0008;
      }
      cmbMesh.visible = showCMBShell;
      horizonWireMesh.visible = showCMBShell;

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
  }, [showCMBShell, showExpansionRays]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Observable Universe HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>The Observable Universe</span>
          <span className="text-[10px] text-teal-400 font-mono">93 Billion ly</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          The outer boundary is the Cosmic Microwave Background (CMB) emitted 13.8 billion years ago. Expansion has carried that matter ~46.5 Gly away:
        </p>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={showCMBShell}
            onChange={e => setShowCMBShell(e.target.checked)}
            className="rounded bg-slate-800 border-slate-600 text-teal-500 focus:ring-0"
          />
          <span className="text-[11px]">Show CMB Surface of Last Scattering</span>
        </label>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🌐 The observable sphere is an observational boundary, NOT a physical edge of space
      </div>
    </div>
  );
}
