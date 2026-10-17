'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function BeyondHorizonScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [curvatureType, setCurvatureType] = useState<'flat' | 'spherical' | 'hyperbolic'>('flat');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Grid representing spatial geometry
    const gridRes = 32;
    const geo = new THREE.PlaneGeometry(8, 8, gridRes, gridRes);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.sqrt(x * x + y * y);

      let z = 0;
      if (curvatureType === 'spherical') {
        // Positive curvature: dome
        z = Math.max(0, 1.8 - r * 0.45);
      } else if (curvatureType === 'hyperbolic') {
        // Negative curvature: saddle
        z = (x * x - y * y) * 0.12;
      } else {
        // Flat Euclidean space: z = 0
        z = 0;
      }
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const gridMesh = new THREE.Mesh(geo, mat);
    gridMesh.rotation.x = -Math.PI / 2.5;
    group.add(gridMesh);

    // Causal Horizon Circle Marker
    const horizonPts: THREE.Vector3[] = [];
    const hRad = 2.4;
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      horizonPts.push(new THREE.Vector3(Math.cos(a) * hRad, 0.1, Math.sin(a) * hRad));
    }
    const horizonLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(horizonPts),
      new THREE.LineBasicMaterial({ color: 0xec4899, linewidth: 2 })
    );
    group.add(horizonLine);

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
  }, [curvatureType]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Beyond Horizon HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Global Geometry & Topology</span>
          <span className="text-[10px] text-purple-400 font-mono">|Ωₖ| &lt; 0.004</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          The pink ring marks our causal horizon. Beyond lies the unobserved global continuum. Explore 3 possible spatial geometries:
        </p>

        <div className="grid grid-cols-3 gap-1 mb-2">
          <button
            onClick={() => setCurvatureType('flat')}
            className={`px-2 py-1.5 rounded text-[10px] font-medium transition-colors ${
              curvatureType === 'flat' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Flat (Ω = 1)
          </button>
          <button
            onClick={() => setCurvatureType('spherical')}
            className={`px-2 py-1.5 rounded text-[10px] font-medium transition-colors ${
              curvatureType === 'spherical' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Closed (Ω &gt; 1)
          </button>
          <button
            onClick={() => setCurvatureType('hyperbolic')}
            className={`px-2 py-1.5 rounded text-[10px] font-medium transition-colors ${
              curvatureType === 'hyperbolic' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Open (Ω &lt; 1)
          </button>
        </div>

        <p className="text-[10px] text-slate-400 mt-1">
          {curvatureType === 'flat' && 'Euclidean geometry: parallel lines never meet. Observational data strongly favors a flat universe.'}
          {curvatureType === 'spherical' && 'Closed geometry: finite volume without an edge; parallel lines converge like lines of longitude.'}
          {curvatureType === 'hyperbolic' && 'Open saddle geometry: infinite volume; parallel lines diverge.'}
        </p>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🟣 Cosmic inflation predicts the global universe is at least 250× larger than what we can observe
      </div>
    </div>
  );
}
