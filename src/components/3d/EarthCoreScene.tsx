'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface EarthCoreSceneProps {
  onSelectLayer?: (layerName: string) => void;
}

export default function EarthCoreScene({ onSelectLayer }: EarthCoreSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedLayer, setSelectedLayer] = useState<string>('all');
  const [cutawayAngle, setCutawayAngle] = useState<number>(90); // Degrees of cross-section wedge cut

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xff7700, 2, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    // Layer specifications (radii normalized to total radius = 1.6)
    // 1. Inner Core (Solid Fe-Ni, r ~ 0.3)
    const innerCoreGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xff8800,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    group.add(innerCoreMesh);

    // 2. Outer Core (Liquid Fe-Ni, r ~ 0.85)
    // Create cross-section cutaway using theta/phi ranges
    const cutRad = (cutawayAngle * Math.PI) / 180;
    const outerCoreGeo = new THREE.SphereGeometry(0.85, 32, 32, 0, Math.PI * 2 - cutRad);
    const outerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      emissive: 0xaa2200,
      emissiveIntensity: 0.4,
      roughness: 0.4,
      metalness: 0.8,
      side: THREE.DoubleSide,
    });
    const outerCoreMesh = new THREE.Mesh(outerCoreGeo, outerCoreMat);
    group.add(outerCoreMesh);

    // 3. Mantle (Silicate rock, r ~ 1.55)
    const mantleGeo = new THREE.SphereGeometry(1.55, 48, 48, 0, Math.PI * 2 - cutRad);
    const mantleMat = new THREE.MeshStandardMaterial({
      color: 0x9a3412,
      roughness: 0.8,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const mantleMesh = new THREE.Mesh(mantleGeo, mantleMat);
    group.add(mantleMesh);

    // 4. Crust (Thin exterior skin, r ~ 1.60)
    const crustGeo = new THREE.SphereGeometry(1.60, 48, 48, 0, Math.PI * 2 - cutRad);
    const crustMat = new THREE.MeshStandardMaterial({
      color: 0x15803d, // Continental crust greenish-blue
      roughness: 0.9,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const crustMesh = new THREE.Mesh(crustGeo, crustMat);
    group.add(crustMesh);

    // 5. Magnetic Field Lines (Looping curves)
    const fieldLinesGroup = new THREE.Group();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      const numPoints = 40;
      for (let j = 0; j <= numPoints; j++) {
        const t = (j / numPoints) * Math.PI - Math.PI / 2;
        // Dipole field equation r = r0 * cos^2(lat)
        const r = 2.6 * Math.pow(Math.cos(t), 2);
        const x = r * Math.cos(t) * Math.cos(angle);
        const z = r * Math.cos(t) * Math.sin(angle);
        const y = r * Math.sin(t) * 1.5;
        points.push(new THREE.Vector3(x, y, z));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      fieldLinesGroup.add(line);
    }
    group.add(fieldLinesGroup);

    // Orbit / Drag interaction state
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
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      group.rotation.y += deltaX * 0.008;
      group.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        group.rotation.y += 0.003;
      }
      // Pulsing magnetic field
      const time = Date.now() * 0.002;
      lineMat.opacity = 0.4 + Math.sin(time) * 0.2;

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
  }, [cutawayAngle]);

  const layers = [
    { id: 'inner', name: 'Inner Core (1,220 km)', color: 'bg-amber-400' },
    { id: 'outer', name: 'Outer Core (2,260 km)', color: 'bg-orange-600' },
    { id: 'mantle', name: 'Mantle (2,890 km)', color: 'bg-amber-800' },
    { id: 'crust', name: 'Crust (5-70 km)', color: 'bg-emerald-600' },
    { id: 'magnetic', name: 'Geomagnetic Field', color: 'bg-sky-400' }
  ];

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-950 rounded-xl overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Layer selector controls */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg p-3 text-xs text-slate-200 shadow-xl max-w-xs">
        <div className="font-semibold text-slate-100 mb-2 flex items-center justify-between">
          <span>Earth Cross-Section</span>
          <span className="text-[10px] text-amber-400 uppercase font-mono tracking-wider">3D Cutaway</span>
        </div>
        <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
          Drag to rotate. Discover how seismic waves revealed Earth’s liquid outer core and solid inner dynamo.
        </p>

        <div className="space-y-1.5">
          {layers.map(layer => (
            <button
              key={layer.id}
              onClick={() => {
                setSelectedLayer(layer.id);
                onSelectLayer?.(layer.name);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded flex items-center gap-2 transition-colors ${
                selectedLayer === layer.id ? 'bg-slate-700 text-white font-medium ring-1 ring-amber-400' : 'hover:bg-slate-800/80 text-slate-300'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${layer.color} shrink-0`} />
              <span className="truncate">{layer.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Wedge Cut:</span>
          <div className="flex gap-1.5">
            {[60, 90, 120].map(deg => (
              <button
                key={deg}
                onClick={() => setCutawayAngle(deg)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  cutawayAngle === deg ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {deg}°
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-[11px] text-slate-400 bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
        🖱️ Click & Drag to Orbit | Scroll to Zoom
      </div>
    </div>
  );
}
