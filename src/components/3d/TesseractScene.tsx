'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function TesseractScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'4d-tesseract' | 'flatland-slice'>('4d-tesseract');

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

    // --- 1. Tesseract 4D Geometry Setup ---
    // 16 vertices of a unit 4D hypercube: (±1, ±1, ±1, ±1)
    const vertices4D: number[][] = [];
    for (let i = 0; i < 16; i++) {
      vertices4D.push([
        (i & 1) ? 1 : -1,
        (i & 2) ? 1 : -1,
        (i & 4) ? 1 : -1,
        (i & 8) ? 1 : -1,
      ]);
    }

    // 32 edges connecting vertices that differ by only 1 bit
    const edges4D: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        // Differ by 1 bit check
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices4D[i][k] !== vertices4D[j][k]) diff++;
        }
        if (diff === 1) {
          edges4D.push([i, j]);
        }
      }
    }

    // Buffer geometry for 32 edges
    const linePositions = new Float32Array(edges4D.length * 2 * 3);
    const tesseractGeo = new THREE.BufferGeometry();
    tesseractGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const tesseractMat = new THREE.LineBasicMaterial({
      color: 0xf43f5e,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    const tesseractLines = new THREE.LineSegments(tesseractGeo, tesseractMat);
    group.add(tesseractLines);

    // Vertex spheres
    const vertexMeshes: THREE.Mesh[] = [];
    const vGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const vMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < 16; i++) {
      const vm = new THREE.Mesh(vGeo, vMat);
      vertexMeshes.push(vm);
      group.add(vm);
    }

    // --- 2. Flatland Slice Setup ---
    const flatlandGroup = new THREE.Group();
    // 2D Plane
    const planeGeo = new THREE.PlaneGeometry(5, 5);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x334155,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    planeMesh.rotation.x = Math.PI / 2;
    flatlandGroup.add(planeMesh);

    // Slicing Circle on the plane
    const circleMesh = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 3 })
    );
    circleMesh.rotation.x = Math.PI / 2;
    flatlandGroup.add(circleMesh);

    // 3D Sphere passing through
    const passSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35, wireframe: true })
    );
    flatlandGroup.add(passSphere);
    group.add(flatlandGroup);

    // 4D Rotation Angles
    let angleXW = 0;
    let angleYW = 0;

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

      if (viewMode === '4d-tesseract') {
        tesseractLines.visible = true;
        vertexMeshes.forEach(m => (m.visible = true));
        flatlandGroup.visible = false;

        angleXW += 0.01;
        angleYW += 0.007;

        // Project 4D to 3D via perspective projection from distance d = 2.5
        const projected3D: THREE.Vector3[] = [];
        const distance4D = 2.4;

        for (let i = 0; i < 16; i++) {
          const [x, y, z, w] = vertices4D[i];

          // Rotate in XW plane
          const cosXW = Math.cos(angleXW);
          const sinXW = Math.sin(angleXW);
          const x1 = x * cosXW - w * sinXW;
          const w1 = x * sinXW + w * cosXW;

          // Rotate in YW plane
          const cosYW = Math.cos(angleYW);
          const sinYW = Math.sin(angleYW);
          const y2 = y * cosYW - w1 * sinYW;
          const w2 = y * sinYW + w1 * cosYW;

          // 4D -> 3D projection factor: 1 / (distance4D - w)
          const pFactor = 1.3 / (distance4D - w2 * 0.5);
          const pVec = new THREE.Vector3(x1 * pFactor, y2 * pFactor, z * pFactor);
          projected3D.push(pVec);

          // Update vertex spheres
          vertexMeshes[i].position.copy(pVec);
        }

        // Update 32 edge buffer lines
        const posAttr = tesseractGeo.attributes.position as THREE.BufferAttribute;
        let pIdx = 0;
        edges4D.forEach(([v1, v2]) => {
          const p1 = projected3D[v1];
          const p2 = projected3D[v2];
          posAttr.setXYZ(pIdx++, p1.x, p1.y, p1.z);
          posAttr.setXYZ(pIdx++, p2.x, p2.y, p2.z);
        });
        posAttr.needsUpdate = true;
      } else {
        // Flatland slicing mode
        tesseractLines.visible = false;
        vertexMeshes.forEach(m => (m.visible = false));
        flatlandGroup.visible = true;

        // Animate sphere passing up and down through the plane
        const time = Date.now() * 0.0015;
        const sphereY = Math.sin(time) * 1.6;
        passSphere.position.y = sphereY;

        // Calculate intersecting circle radius: r^2 = R^2 - y^2
        const R = 1.2;
        const circlePts: THREE.Vector3[] = [];
        if (Math.abs(sphereY) < R) {
          const sliceR = Math.sqrt(R * R - sphereY * sphereY);
          for (let j = 0; j <= 48; j++) {
            const th = (j / 48) * Math.PI * 2;
            circlePts.push(new THREE.Vector3(Math.cos(th) * sliceR, Math.sin(th) * sliceR, 0));
          }
        }
        circleMesh.geometry.dispose();
        circleMesh.geometry = new THREE.BufferGeometry().setFromPoints(circlePts);
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
  }, [viewMode]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Dimensions & Multiverse HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Higher Dimensions Explorer</span>
          <span className="text-[10px] text-rose-400 font-mono">4D Spacetime</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          In physics, higher dimensions are degrees of freedom. Explore a rotating 4D Hypercube or the Flatland cross-section:
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('4d-tesseract')}
            className={`flex-1 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors ${
              viewMode === '4d-tesseract' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            4D Tesseract
          </button>
          <button
            onClick={() => setViewMode('flatland-slice')}
            className={`flex-1 px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors ${
              viewMode === 'flatland-slice' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Flatland Analogy
          </button>
        </div>

        <p className="text-[10px] text-slate-400 mt-2">
          {viewMode === '4d-tesseract'
            ? 'Rotating simultaneously in the XW and YW 4D planes, projected stereographically into our 3D space.'
            : 'A 3D sphere passing through a 2D plane is perceived by a 2D observer as an expanding and shrinking circle.'}
        </p>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        📐 Mathematical models of higher dimensions do NOT constitute empirical proof of physical parallel universes
      </div>
    </div>
  );
}
