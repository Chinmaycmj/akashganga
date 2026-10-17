'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlowParticleTexture } from '@/utils/proceduralTextures';

export default function ExoplanetScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [detectionMethod, setDetectionMethod] = useState<'transit' | 'radial-velocity'>('transit');
  const [planetType, setPlanetType] = useState<'terrestrial-hz' | 'hot-jupiter'>('terrestrial-hz');
  const [transitDip, setTransitDip] = useState<number>(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Host Star (Red dwarf or Sun-like)
    const starRadius = 0.9;
    const starGeo = new THREE.SphereGeometry(starRadius, 32, 32);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffaa33 });
    const starMesh = new THREE.Mesh(starGeo, starMat);
    group.add(starMesh);

    // Star Glow
    const glowTex = createGlowParticleTexture(128, '#ffffff', '#ff8800');
    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, blending: THREE.AdditiveBlending }));
    glowSprite.scale.set(4, 4, 1);
    group.add(glowSprite);

    // Habitable Zone Ring
    const hzInner = 2.4;
    const hzOuter = 3.6;
    const hzGeo = new THREE.RingGeometry(hzInner, hzOuter, 64);
    const hzMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const hzMesh = new THREE.Mesh(hzGeo, hzMat);
    hzMesh.rotation.x = Math.PI / 2;
    group.add(hzMesh);

    // Planet Group
    const planetGroup = new THREE.Group();
    group.add(planetGroup);

    const pRadius = planetType === 'hot-jupiter' ? 0.35 : 0.16;
    const pOrbit = planetType === 'hot-jupiter' ? 1.6 : 3.0; // In or out of HZ
    const pGeo = new THREE.SphereGeometry(pRadius, 24, 24);
    const pMat = new THREE.MeshStandardMaterial({
      color: planetType === 'hot-jupiter' ? 0xe11d48 : 0x0284c7,
      roughness: 0.8,
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    planetGroup.add(pMesh);

    // Light
    const starLight = new THREE.DirectionalLight(0xffffff, 1.2);
    starLight.position.set(0, 0, 0);
    scene.add(starLight);

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

    let angle = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const speed = planetType === 'hot-jupiter' ? 0.03 : 0.015;
      angle += speed;

      const px = Math.cos(angle) * pOrbit;
      const pz = Math.sin(angle) * pOrbit;
      planetGroup.position.set(px, 0, pz);

      // Check if planet is in front of star along z-axis (Transit)
      if (pz > 0 && Math.abs(px) < starRadius) {
        // In transit!
        const dip = planetType === 'hot-jupiter' ? 1.5 : 0.08; // % dip
        setTransitDip(dip);
      } else {
        setTransitDip(0);
      }

      // Star wobble if radial velocity mode
      if (detectionMethod === 'radial-velocity') {
        starMesh.position.x = -Math.cos(angle) * 0.12;
        starMesh.position.z = -Math.sin(angle) * 0.12;
      } else {
        starMesh.position.set(0, 0, 0);
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
  }, [detectionMethod, planetType]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Exoplanet Detection & Transit HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Exoplanet Detection Lab</span>
          <span className="text-[10px] text-emerald-400 font-mono">JWST / TESS</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">
          Observe how a transiting planet periodically blocks a fraction of the host star’s light:
        </p>

        {/* Real-time Transit Light Curve Bar */}
        <div className="p-2 bg-slate-800/80 rounded border border-slate-700 mb-3">
          <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
            <span>Stellar Flux (Brightness)</span>
            <span className={transitDip > 0 ? 'text-emerald-400 font-mono font-bold' : 'text-slate-300 font-mono'}>
              {transitDip > 0 ? `Transit: -${transitDip.toFixed(2)}%` : '100.00%'}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className={`h-full rounded-full transition-all duration-150 ${transitDip > 0 ? 'bg-emerald-500 w-[88%]' : 'bg-amber-400 w-full'}`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Target World:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setPlanetType('terrestrial-hz')}
                className={`px-2 py-0.5 rounded text-[10px] ${planetType === 'terrestrial-hz' ? 'bg-emerald-600 text-white font-medium' : 'bg-slate-800 text-slate-400'}`}
              >
                Rocky in HZ
              </button>
              <button
                onClick={() => setPlanetType('hot-jupiter')}
                className={`px-2 py-0.5 rounded text-[10px] ${planetType === 'hot-jupiter' ? 'bg-rose-600 text-white font-medium' : 'bg-slate-800 text-slate-400'}`}
              >
                Hot Jupiter
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Detection Method:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setDetectionMethod('transit')}
                className={`px-2 py-0.5 rounded text-[10px] ${detectionMethod === 'transit' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                Transit
              </button>
              <button
                onClick={() => setDetectionMethod('radial-velocity')}
                className={`px-2 py-0.5 rounded text-[10px] ${detectionMethod === 'radial-velocity' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                Doppler Wobble
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🟢 Green ring = Habitable Zone where liquid water can pool on a surface
      </div>
    </div>
  );
}
