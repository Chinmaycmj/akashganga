'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlowParticleTexture } from '@/utils/proceduralTextures';

export default function CosmicWebScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [highlightVoids, setHighlightVoids] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const webGroup = new THREE.Group();
    scene.add(webGroup);

    // 1. Generate Gravitational Nodes (Cluster Anchors)
    const nodeCount = 50;
    const nodes: THREE.Vector3[] = [];
    const spread = 8.5;

    for (let i = 0; i < nodeCount; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread
      );
      // Carve out a prominent central void (Boötes Void analogy)
      if (v.length() < 2.5) {
        v.normalize().multiplyScalar(2.6 + Math.random() * 2);
      }
      nodes.push(v);
    }

    // 2. Connect Nearest Nodes with Filaments
    const filamentLines: THREE.Vector3[] = [];
    const maxConnDist = 3.8;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const d = nodes[i].distanceTo(nodes[j]);
        if (d < maxConnDist) {
          // Subdivide filament line with slight gravitational sag/noise
          const segments = 8;
          for (let s = 0; s < segments; s++) {
            const t1 = s / segments;
            const t2 = (s + 1) / segments;
            const p1 = new THREE.Vector3().lerpVectors(nodes[i], nodes[j], t1);
            const p2 = new THREE.Vector3().lerpVectors(nodes[i], nodes[j], t2);
            filamentLines.push(p1, p2);
          }
        }
      }
    }

    const filamentGeo = new THREE.BufferGeometry().setFromPoints(filamentLines);
    const filamentMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.35,
    });
    const filamentMesh = new THREE.LineSegments(filamentGeo, filamentMat);
    webGroup.add(filamentMesh);

    // 3. Dense Galaxy Particles along Filaments and Nodes
    const particleCount = 4000;
    const partGeo = new THREE.BufferGeometry();
    const partPos = new Float32Array(particleCount * 3);
    const partCol = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Pick a random node or filament segment
      const nIdx = Math.floor(Math.random() * nodes.length);
      const target = nodes[nIdx];
      const scatter = 0.45;

      partPos[i * 3] = target.x + (Math.random() - 0.5) * scatter;
      partPos[i * 3 + 1] = target.y + (Math.random() - 0.5) * scatter;
      partPos[i * 3 + 2] = target.z + (Math.random() - 0.5) * scatter;

      partCol[i * 3] = 0.4 + Math.random() * 0.4;
      partCol[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      partCol[i * 3 + 2] = 1.0;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    partGeo.setAttribute('color', new THREE.BufferAttribute(partCol, 3));

    const glowTex = createGlowParticleTexture(64, '#ffffff', '#06b6d4');
    const partMat = new THREE.PointsMaterial({
      size: 0.16,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const webPoints = new THREE.Points(partGeo, partMat);
    webGroup.add(webPoints);

    // 4. Central Cosmic Void Bubble (Boötes Void representation)
    const voidGeo = new THREE.SphereGeometry(2.3, 24, 24);
    const voidMat = new THREE.MeshBasicMaterial({
      color: 0x4338ca,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    });
    const voidMesh = new THREE.Mesh(voidGeo, voidMat);
    webGroup.add(voidMesh);

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
      webGroup.rotation.y += (e.clientX - prevMouseX) * 0.005;
      webGroup.rotation.x += (e.clientY - prevMouseY) * 0.003;
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
        webGroup.rotation.y += 0.001;
      }
      voidMesh.visible = highlightVoids;

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
  }, [highlightVoids]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Cosmic Web HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Large-Scale Cosmological Filaments</span>
          <span className="text-[10px] text-cyan-400 font-mono">500 Mly</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          Galaxies follow dark matter scaffolding into colossal filaments, separated by vast cosmic voids spanning hundreds of millions of light-years:
        </p>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
          <input
            type="checkbox"
            checked={highlightVoids}
            onChange={e => setHighlightVoids(e.target.checked)}
            className="rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-0"
          />
          <span className="text-[11px]">Highlight Great Void (Boötes Analogy)</span>
        </label>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🕸️ Voids make up over 80% of the universe’s total volume
      </div>
    </div>
  );
}
