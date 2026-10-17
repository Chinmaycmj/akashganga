'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createEarthTexture } from '@/utils/proceduralTextures';

export default function EarthMoonScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showTides, setShowTides] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Sunlight
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(10, 2, 8);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x223355, 0.5);
    scene.add(ambientLight);

    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // Earth
    const earthGeo = new THREE.SphereGeometry(1.0, 48, 48);
    const earthMat = new THREE.MeshStandardMaterial({
      map: createEarthTexture(512, 256),
      roughness: 0.7,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    systemGroup.add(earthMesh);

    // Tidal Bulge Mesh (slightly scaled ellipsoid representing ocean bulge)
    const tideGeo = new THREE.SphereGeometry(1.05, 32, 32);
    const tideMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const tideMesh = new THREE.Mesh(tideGeo, tideMat);
    tideMesh.scale.set(1.15, 0.95, 0.95); // Stretched along x-axis toward Moon
    systemGroup.add(tideMesh);

    // Lunar Orbit Line
    const orbitRadius = 4.2; // Educationally visible scale (true scale is ~30 Earth diameters)
    const orbitPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      orbitPoints.push(new THREE.Vector3(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius));
    }
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitLine = new THREE.Line(
      orbitGeo,
      new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.5 })
    );
    systemGroup.add(orbitLine);

    // Moon
    const moonGroup = new THREE.Group();
    const moonGeo = new THREE.SphereGeometry(0.27, 32, 32); // Moon is ~0.272 Earth diameter

    // Procedural lunar texture
    const moonCanvas = document.createElement('canvas');
    moonCanvas.width = 256;
    moonCanvas.height = 128;
    const mctx = moonCanvas.getContext('2d');
    if (mctx) {
      mctx.fillStyle = '#888899';
      mctx.fillRect(0, 0, 256, 128);
      // Maria (dark basaltic plains)
      mctx.fillStyle = '#555566';
      mctx.beginPath();
      mctx.ellipse(80, 50, 40, 30, 0, 0, Math.PI * 2);
      mctx.fill();
      mctx.beginPath();
      mctx.ellipse(140, 60, 35, 25, 0, 0, Math.PI * 2);
      mctx.fill();
    }
    const moonTexture = new THREE.CanvasTexture(moonCanvas);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.9,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonGroup.add(moonMesh);
    systemGroup.add(moonGroup);

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
      systemGroup.rotation.y += (e.clientX - prevMouseX) * 0.006;
      systemGroup.rotation.x += (e.clientY - prevMouseY) * 0.006;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseUp = () => (isDragging = false);

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let orbitAngle = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      orbitAngle += 0.008 * simSpeed;
      const moonX = Math.cos(orbitAngle) * orbitRadius;
      const moonZ = Math.sin(orbitAngle) * orbitRadius;
      moonGroup.position.set(moonX, 0, moonZ);

      // Tidal locking: Moon rotates synchronously
      moonMesh.rotation.y = -orbitAngle;

      // Align tidal bulge toward Moon
      tideMesh.rotation.y = -orbitAngle;
      tideMesh.visible = showTides;

      // Earth axial rotation
      earthMesh.rotation.y += 0.01 * simSpeed;

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
  }, [showTides, simSpeed]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Earth-Moon Mechanics Panel */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Earth–Moon Orbital Dynamics</span>
          <span className="text-[10px] text-purple-400 font-mono">384,400 km</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          The Moon is tidally locked (same face always points to Earth). Differential gravity creates two tidal ocean bulges.
        </p>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showTides}
              onChange={e => setShowTides(e.target.checked)}
              className="rounded bg-slate-800 border-slate-600 text-purple-500 focus:ring-0"
            />
            <span className="text-[11px]">Show Ocean Tidal Bulges</span>
          </label>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Orbital Speed:</span>
            <div className="flex gap-1">
              {[0.5, 1, 2].map(speed => (
                <button
                  key={speed}
                  onClick={() => setSimSpeed(speed)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    simSpeed === speed ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🌕 Tidal friction recedes the Moon by 3.8 cm/year
      </div>
    </div>
  );
}
