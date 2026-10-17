'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlowParticleTexture } from '@/utils/proceduralTextures';

export default function GalaxyClusterScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showXRayGas, setShowXRayGas] = useState<boolean>(true);
  const [showLensingArcs, setShowLensingArcs] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 4, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // 1. Swarm of Galaxy Nodes
    const galaxyCount = 350;
    const glowTex = createGlowParticleTexture(64, '#ffffff', '#3b82f6');
    const gGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(galaxyCount * 3);
    const col = new Float32Array(galaxyCount * 3);

    for (let i = 0; i < galaxyCount; i++) {
      // King profile or NFW-like cluster concentration
      const r = Math.pow(Math.random(), 1.8) * 5.0;
      const th = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(th) * 0.7; // Slightly flattened
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Yellow/orange ellipticals dominant in cluster cores, blue spirals on outskirts
      if (r < 2.0) {
        col[i * 3] = 1.0;
        col[i * 3 + 1] = 0.85;
        col[i * 3 + 2] = 0.5;
      } else {
        col[i * 3] = 0.6;
        col[i * 3 + 1] = 0.8;
        col[i * 3 + 2] = 1.0;
      }
    }
    gGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    gGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const galaxies = new THREE.Points(
      gGeo,
      new THREE.PointsMaterial({
        size: 0.22,
        map: glowTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      })
    );
    clusterGroup.add(galaxies);

    // 2. Intracluster Medium (Hot 100M K X-Ray Gas)
    const icmGeo = new THREE.SphereGeometry(3.2, 32, 32);
    const icmMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const icmMesh = new THREE.Mesh(icmGeo, icmMat);
    clusterGroup.add(icmMesh);

    // 3. Gravitational Lensing Rings / Arcs (Einstein arcs)
    const lensArcsGroup = new THREE.Group();
    const arcMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    });

    [1.8, 2.5, 3.1].forEach((r, idx) => {
      const arcPts: THREE.Vector3[] = [];
      const startAngle = idx * 1.5;
      const arcSpan = 0.8;
      for (let j = 0; j <= 20; j++) {
        const theta = startAngle + (j / 20) * arcSpan;
        arcPts.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
      }
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPts);
      lensArcsGroup.add(new THREE.Line(arcGeo, arcMat));
    });
    clusterGroup.add(lensArcsGroup);

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
      clusterGroup.rotation.y += (e.clientX - prevMouseX) * 0.005;
      clusterGroup.rotation.x += (e.clientY - prevMouseY) * 0.003;
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
        clusterGroup.rotation.y += 0.001;
      }
      icmMesh.visible = showXRayGas;
      lensArcsGroup.visible = showLensingArcs;

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
  }, [showXRayGas, showLensingArcs]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Galaxy Cluster HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Virgo-Scale Galaxy Cluster</span>
          <span className="text-[10px] text-blue-400 font-mono">50 Mly</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          Over 1,000 galaxies held together by dark matter. The intracluster gas is heated to 100 million Kelvin:
        </p>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showXRayGas}
              onChange={e => setShowXRayGas(e.target.checked)}
              className="rounded bg-slate-800 border-slate-600 text-sky-500 focus:ring-0"
            />
            <span className="text-[11px]">Intracluster Medium (X-Ray Plasma)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showLensingArcs}
              onChange={e => setShowLensingArcs(e.target.checked)}
              className="rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
            />
            <span className="text-[11px]">Gravitational Lensing Arcs (Einstein Rings)</span>
          </label>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🔭 Cluster mass is 85% Dark Matter, 13% Hot Gas, and only 2% Stars
      </div>
    </div>
  );
}
