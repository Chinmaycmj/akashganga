'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlowParticleTexture } from '@/utils/proceduralTextures';

export default function MilkyWayScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [showDarkMatterHalo, setShowDarkMatterHalo] = useState<boolean>(false);
  const [showSolarLocation, setShowSolarLocation] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 8, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // 1. Spiral Arms Particles
    const starCount = 12000;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const numArms = 4;
    const armOffset = (Math.PI * 2) / numArms;

    for (let i = 0; i < starCount; i++) {
      // Bulge vs Arms ratio
      const isBulge = Math.random() < 0.25;

      if (isBulge) {
        // Dense spherical/bar bulge
        const r = Math.pow(Math.random(), 2) * 1.4;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.6;
        positions[i * 3] = r * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * 0.5;
        positions[i * 3 + 2] = r * Math.sin(theta);

        // Warm golden/amber stars
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.4 + Math.random() * 0.2;
      } else {
        // Logarithmic spiral arms
        const armIndex = Math.floor(Math.random() * numArms);
        const distance = 1.2 + Math.pow(Math.random(), 1.4) * 4.8;
        const angle = distance * 1.2 + armIndex * armOffset;

        // Scatter
        const scatterX = (Math.random() - 0.5) * (distance * 0.35);
        const scatterZ = (Math.random() - 0.5) * (distance * 0.35);
        const scatterY = (Math.random() - 0.5) * 0.25 * (1 - distance / 6);

        positions[i * 3] = Math.cos(angle) * distance + scatterX;
        positions[i * 3 + 1] = scatterY;
        positions[i * 3 + 2] = Math.sin(angle) * distance + scatterZ;

        // Spiral arm young stars (bluish white with pink H II knots)
        if (Math.random() > 0.8) {
          colors[i * 3] = 0.95; // Pink H II star-forming knot
          colors[i * 3 + 1] = 0.3;
          colors[i * 3 + 2] = 0.6;
        } else {
          colors[i * 3] = 0.6 + Math.random() * 0.3; // Blue-white
          colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
          colors[i * 3 + 2] = 1.0;
        }
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const glowTex = createGlowParticleTexture(64, '#ffffff', '#6366f1');
    const mat = new THREE.PointsMaterial({
      size: 0.12,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const galaxyPoints = new THREE.Points(geo, mat);
    galaxyGroup.add(galaxyPoints);

    // 2. Sagittarius A* Center Marker
    const sgrGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const sgrMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sgrMesh = new THREE.Mesh(sgrGeo, sgrMat);
    galaxyGroup.add(sgrMesh);

    // Sgr A* Accretion Glow
    const sgrGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xffaa00,
      transparent: true,
      blending: THREE.AdditiveBlending,
    }));
    sgrGlow.scale.set(1.5, 1.5, 1);
    galaxyGroup.add(sgrGlow);

    // 3. Solar System Location Marker (Orion Spur, ~26,000 ly = ~2.8 units out)
    const sunMarkerGroup = new THREE.Group();
    const sunMarkerMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfacc15 })
    );
    sunMarkerGroup.add(sunMarkerMesh);
    // Orbit ring for Sun around core
    const sunOrbitGeo = new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 65 }, (_, i) => {
        const a = (i / 64) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * 2.8, 0, Math.sin(a) * 2.8);
      })
    );
    const sunOrbitLine = new THREE.Line(
      sunOrbitGeo,
      new THREE.LineBasicMaterial({ color: 0xeab308, transparent: true, opacity: 0.4 })
    );
    sunMarkerGroup.add(sunOrbitLine);
    sunMarkerGroup.position.set(0, 0, 0);
    sunMarkerMesh.position.set(2.8, 0, 0);
    galaxyGroup.add(sunMarkerGroup);

    // 4. Dark Matter Halo (Spherical translucent envelope)
    const haloGeo = new THREE.SphereGeometry(7.2, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    galaxyGroup.add(haloMesh);

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
      galaxyGroup.rotation.y += (e.clientX - prevMouseX) * 0.005;
      galaxyGroup.rotation.x += (e.clientY - prevMouseY) * 0.003;
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
        galaxyGroup.rotation.y += 0.0012;
      }
      haloMesh.visible = showDarkMatterHalo;
      sunMarkerGroup.visible = showSolarLocation;

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
  }, [showDarkMatterHalo, showSolarLocation]);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Galactic HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Milky Way Spiral Dynamics</span>
          <span className="text-[10px] text-indigo-400 font-mono">100,000 ly</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          Over 200 billion stars orbit Sagittarius A*. The flat rotation curve reveals an invisible dark matter halo holding the galaxy together:
        </p>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showSolarLocation}
              onChange={e => setShowSolarLocation(e.target.checked)}
              className="rounded bg-slate-800 border-slate-600 text-amber-500 focus:ring-0"
            />
            <span className="text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Sun’s Location (Orion Spur, 26,000 ly)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
            <input
              type="checkbox"
              checked={showDarkMatterHalo}
              onChange={e => setShowDarkMatterHalo(e.target.checked)}
              className="rounded bg-slate-800 border-slate-600 text-indigo-500 focus:ring-0"
            />
            <span className="text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
              Reveal Inferred Dark Matter Halo
            </span>
          </label>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🌀 Central Sagittarius A* contains 4.15 million solar masses
      </div>
    </div>
  );
}
