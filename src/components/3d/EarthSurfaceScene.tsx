'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createEarthTexture } from '@/utils/proceduralTextures';

export default function EarthSurfaceScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeAtmosphereLayer, setActiveAtmosphereLayer] = useState<string>('troposphere');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x334466, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(5, 2, 4);
    scene.add(sunLight);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Earth Sphere with procedural texture
    const earthGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const earthTexture = createEarthTexture(1024, 512);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // Clouds Sphere
    const cloudGeo = new THREE.SphereGeometry(1.62, 48, 48);
    // Create cloud canvas texture
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cctx = cloudCanvas.getContext('2d');
    if (cctx) {
      cctx.fillStyle = 'rgba(0,0,0,0)';
      cctx.fillRect(0, 0, 1024, 512);
      cctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        cctx.beginPath();
        cctx.ellipse(x, y, 70, 20, 0.1, 0, Math.PI * 2);
        cctx.fill();
      }
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    // Atmosphere Glow Shell
    const atmoGeo = new THREE.SphereGeometry(1.68, 48, 48);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    earthGroup.add(atmoMesh);

    // Orbiting Satellite
    const satGroup = new THREE.Group();
    const satGeo = new THREE.BoxGeometry(0.04, 0.04, 0.08);
    const satMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    satMesh.position.set(2.2, 0, 0);
    satGroup.add(satMesh);
    scene.add(satGroup);

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
      earthGroup.rotation.y += (e.clientX - prevMouseX) * 0.008;
      earthGroup.rotation.x += (e.clientY - prevMouseY) * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseUp = () => (isDragging = false);

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        earthGroup.rotation.y += 0.002;
        cloudMesh.rotation.y += 0.0026; // Clouds drift slightly faster
      }
      satGroup.rotation.y += 0.015;
      satGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
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
  }, []);

  const atmoLayers = [
    { id: 'troposphere', name: 'Troposphere (0–12 km)', desc: 'Contains 75% of atmospheric mass and all human weather.' },
    { id: 'stratosphere', name: 'Stratosphere (12–50 km)', desc: 'Houses the protective Ozone layer (O₃) absorbing solar UV.' },
    { id: 'mesosphere', name: 'Mesosphere (50–85 km)', desc: 'Coldest layer (-90°C), where meteoroids burn up upon entry.' },
    { id: 'thermosphere', name: 'Thermosphere (85–600 km)', desc: 'Location of auroras and the International Space Station.' },
    { id: 'exosphere', name: 'Exosphere (>600 km)', desc: 'Tenuous transition where gas molecules escape into the void.' }
  ];

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Atmospheric Layers HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-1 flex items-center justify-between">
          <span>Atmospheric Stratification</span>
          <span className="text-[10px] text-sky-400 font-mono">101.3 kPa</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-2 leading-relaxed">
          Select a layer to examine its thermodynamic role in sustaining life:
        </p>

        <div className="space-y-1">
          {atmoLayers.map(layer => (
            <button
              key={layer.id}
              onClick={() => setActiveAtmosphereLayer(layer.id)}
              className={`w-full text-left px-2 py-1.5 rounded transition-all ${
                activeAtmosphereLayer === layer.id ? 'bg-sky-950/80 border border-sky-500/60 text-sky-200' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="font-medium text-[11px]">{layer.name}</div>
              {activeAtmosphereLayer === layer.id && (
                <div className="text-[10px] text-slate-300 mt-0.5 leading-snug">{layer.desc}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🌍 Drag to inspect day/night terminator & cloud currents
      </div>
    </div>
  );
}
