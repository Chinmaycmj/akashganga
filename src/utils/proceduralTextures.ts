import * as THREE from 'three';

/**
 * Creates a procedural Earth surface texture with continents, oceans, and ice caps.
 */
export function createEarthTexture(width = 1024, height = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep ocean background
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#0a1e3f');
  oceanGrad.addColorStop(0.5, '#042252');
  oceanGrad.addColorStop(1, '#0a1e3f');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Continent shapes (stylized landmasses)
  ctx.fillStyle = '#225533';

  // Eurasia & Africa approximation
  ctx.beginPath();
  ctx.ellipse(width * 0.55, height * 0.35, width * 0.22, height * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(width * 0.52, height * 0.6, width * 0.12, height * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Americas approximation
  ctx.beginPath();
  ctx.ellipse(width * 0.22, height * 0.35, width * 0.12, height * 0.18, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(width * 0.27, height * 0.65, width * 0.09, height * 0.18, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Australia
  ctx.beginPath();
  ctx.ellipse(width * 0.8, height * 0.7, width * 0.07, height * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  // Add terrain noise / desert variations
  ctx.fillStyle = '#8b6f38';
  ctx.beginPath();
  ctx.ellipse(width * 0.52, height * 0.45, width * 0.09, height * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();

  // Polar ice caps
  ctx.fillStyle = '#e8f4f8';
  ctx.fillRect(0, 0, width, height * 0.08);
  ctx.fillRect(0, height * 0.92, width, height * 0.08);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates a procedural Sun plasma texture with turbulent granulation and flares.
 */
export function createSunTexture(width = 512, height = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Solar base
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#ffcc00');
  grad.addColorStop(0.5, '#ff6600');
  grad.addColorStop(1, '#ff3300');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Granules
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 8 + 2;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 255, 200, 0.4)' : 'rgba(180, 40, 0, 0.35)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Creates a procedural gas giant banded atmosphere (Jupiter-like).
 */
export function createBandedPlanetTexture(width = 512, height = 256, palette: string[]): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const numBands = 32;
  const bandHeight = height / numBands;

  for (let i = 0; i < numBands; i++) {
    const color = palette[i % palette.length];
    ctx.fillStyle = color;
    ctx.fillRect(0, i * bandHeight, width, bandHeight + 1);
  }

  // Add subtle swirl noise
  for (let j = 0; j < 30; j++) {
    const y = Math.random() * height;
    const x = Math.random() * width;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.ellipse(x, y, 40, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Creates a glowing circle texture for particles (stars, dust, cosmic web).
 */
export function createGlowParticleTexture(size = 64, innerColor = '#ffffff', outerColor = '#4f46e5'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const center = size / 2;
  const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
  grad.addColorStop(0, innerColor);
  grad.addColorStop(0.2, innerColor);
  grad.addColorStop(0.6, outerColor);
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}

/**
 * Creates an accretion disk texture with radial gradient and Doppler-like brightness.
 */
export function createAccretionDiskTexture(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const center = size / 2;
  // Clear transparent
  ctx.clearRect(0, 0, size, size);

  // Ring with inner void
  for (let r = 80; r < center; r += 2) {
    const norm = (r - 80) / (center - 80);
    // Peak temperature near inner edge
    const alpha = Math.sin(norm * Math.PI) * 0.85;
    const red = Math.floor(255);
    const green = Math.floor(180 * (1 - norm * 0.6));
    const blue = Math.floor(60 * (1 - norm));

    ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(center, center, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  return new THREE.CanvasTexture(canvas);
}
