import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Royal3DCanvas = ({
  isUnlocked,
  is3DModeOnly,
  coupleData,
  targetFace = null,
  onFaceSnapped,
  isAutoSpinning = true
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    heartGroup: null,
    orbitRing1: null,
    orbitRing2: null,
    particleSystem: null,
    isDragging: false,
    prevX: 0,
    prevY: 0,
    rotVelocityX: 0,
    rotVelocityY: 0,
    isTweening: false,
    targetRotY: 0,
    userInteracting: false,
    interactionTimer: null,
    animFrameId: null,
    clock: new THREE.Clock()
  });

  /**
   * Generates ultra-crisp 2048x2048 Medallion Canvas Texture
   * High-contrast, large typography easily legible on all mobile displays.
   */
  const createMedallionTexture = (role, name, subtitle, arabicHonorific, location) => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');

    // Rich radial emerald gradient with deep dark vignette
    const radGrad = ctx.createRadialGradient(1024, 1024, 180, 1024, 1024, 980);
    radGrad.addColorStop(0, '#0d4e3a');
    radGrad.addColorStop(0.45, '#062d21');
    radGrad.addColorStop(0.75, '#031a13');
    radGrad.addColorStop(1, '#010c08');

    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(1024, 1024, 960, 0, Math.PI * 2);
    ctx.fill();

    // Outer Heavy Gold Filigree Border
    ctx.lineWidth = 32;
    ctx.strokeStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(1024, 1024, 920, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary Beaded Golden Ring
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#fff2b8';
    ctx.setLineDash([14, 18]);
    ctx.beginPath();
    ctx.arc(1024, 1024, 870, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // 8-Pointed Star Accents around circumference
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      const x = 1024 + Math.cos(angle) * 895;
      const y = 1024 + Math.sin(angle) * 895;
      ctx.fillStyle = '#f4e39f';
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 1. Arabic Calligraphy Honorific
    ctx.fillStyle = '#fff4ce';
    ctx.font = 'bold 125px "Amiri", serif';
    ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
    ctx.shadowBlur = 24;
    ctx.fillText(arabicHonorific, 1024, 460);
    ctx.shadowBlur = 0;

    // 2. Role Ribbon (THE GROOM / THE BRIDE)
    ctx.fillStyle = '#f4e39f';
    ctx.font = '800 80px "Cinzel", serif';
    ctx.letterSpacing = '8px';
    ctx.fillText(role.toUpperCase(), 1024, 630);

    // Decorative Horizontal Filigree Bar
    ctx.strokeStyle = 'rgba(244, 227, 159, 0.85)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(560, 700);
    ctx.lineTo(1488, 700);
    ctx.stroke();

    // Center Gold Diamond
    ctx.fillStyle = '#fffef8';
    ctx.beginPath();
    ctx.arc(1024, 700, 14, 0, Math.PI * 2);
    ctx.fill();

    // 3. Name with Warm Gold & White Glow (Large & Bold for Elders & Mobile)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 148px "Playfair Display", serif';
    ctx.shadowColor = 'rgba(244, 227, 159, 1)';
    ctx.shadowBlur = 34;
    ctx.fillText(name, 1024, 910);
    ctx.shadowBlur = 0;

    // 4. Subtitle / Parentage (High Contrast, Crisp)
    ctx.fillStyle = '#fbf3d5';
    ctx.font = '600 82px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(subtitle, 1024, 1100);

    // 5. Location
    if (location) {
      ctx.fillStyle = '#e6c86a';
      ctx.font = '700 70px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`📍 ${location}`, 1024, 1240);
    }

    // 6. Wedding Date Monogram
    ctx.fillStyle = '#d4af37';
    ctx.font = 'italic 72px "Cinzel", serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('13 · XII · 2026', 1024, 1390);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = stateRef.current;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x01110b, 0.032);
    state.scene = scene;

    const isMobile = window.innerWidth < 640;
    const initialZ = isUnlocked ? (isMobile ? 4.8 : 4.4) : (isMobile ? 6.8 : 6.2);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.15, initialZ);
    state.camera = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    state.renderer = renderer;

    // 3. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0a3d2e, 2.1);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xfff3cc, 2.3);
    goldKeyLight.position.set(4, 6, 5);
    scene.add(goldKeyLight);

    const backRimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    backRimLight.position.set(-4, -3, -5);
    scene.add(backRimLight);

    const centerGlowLight = new THREE.PointLight(0xffdf80, 2.6, 14);
    centerGlowLight.position.set(0, 3, 2);
    scene.add(centerGlowLight);

    // 4. Royal Heart Parent Group
    const heartGroup = new THREE.Group();
    heartGroup.position.set(0, 0.08, 0);
    scene.add(heartGroup);
    state.heartGroup = heartGroup;

    // Extruded 3D Heart Geometry
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0.7);
    heartShape.bezierCurveTo(0.2, 1.3, 1.15, 1.75, 1.75, 1.15);
    heartShape.bezierCurveTo(2.25, 0.65, 2.15, -0.15, 1.45, -0.85);
    heartShape.bezierCurveTo(0.85, -1.45, 0.25, -2.05, 0, -2.4);
    heartShape.bezierCurveTo(-0.25, -2.05, -0.85, -1.45, -1.45, -0.85);
    heartShape.bezierCurveTo(-2.15, -0.15, -2.25, 0.65, -1.75, 1.15);
    heartShape.bezierCurveTo(-1.15, 1.75, -0.2, 1.3, 0, 0.7);

    const extrudeSettings = {
      depth: 0.54,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.16,
      bevelThickness: 0.16
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.center();

    // Royal Emerald & 24K Gold Materials
    const heartBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x052a1e,
      roughness: 0.24,
      metalness: 0.72
    });

    const goldBevelMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.18,
      metalness: 0.94
    });

    // Prominent scale on both mobile and desktop so it fills the view comfortably
    const baseScale = isMobile ? 0.74 : 0.74;
    const heartMesh = new THREE.Mesh(heartGeometry, [heartBodyMaterial, goldBevelMaterial]);
    heartMesh.scale.set(baseScale, baseScale, baseScale);
    heartGroup.add(heartMesh);

    // 5. Side 1: Groom Medallion (Front +Z)
    const groomTexture = createMedallionTexture(
      coupleData.groom.title,
      coupleData.groom.name,
      coupleData.groom.parentage,
      coupleData.groom.arabicTitle,
      coupleData.groom.location
    );

    const medallionGeo = new THREE.CircleGeometry(1.22, 64);
    const groomMaterial = new THREE.MeshBasicMaterial({
      map: groomTexture,
      transparent: true,
      side: THREE.FrontSide
    });
    const groomMedallion = new THREE.Mesh(medallionGeo, groomMaterial);
    const medallionScale = 0.86;
    groomMedallion.scale.set(medallionScale, medallionScale, medallionScale);
    groomMedallion.position.set(0, 0.05, 0.36);
    heartGroup.add(groomMedallion);

    // Side 2: Bride Medallion (Back -Z, 180° rotated)
    const brideTexture = createMedallionTexture(
      coupleData.bride.title,
      coupleData.bride.name,
      coupleData.bride.parentage,
      coupleData.bride.arabicTitle,
      coupleData.bride.location
    );
    const brideMaterial = new THREE.MeshBasicMaterial({
      map: brideTexture,
      transparent: true,
      side: THREE.FrontSide
    });
    const brideMedallion = new THREE.Mesh(medallionGeo, brideMaterial);
    brideMedallion.scale.set(medallionScale, medallionScale, medallionScale);
    brideMedallion.position.set(0, 0.05, -0.36);
    brideMedallion.rotation.y = Math.PI; // Face backwards
    heartGroup.add(brideMedallion);

    // 6. Dual Celestial Golden Orbit Rings
    const ringRadius = isMobile ? 1.65 : 1.95;
    const ringGeo = new THREE.TorusGeometry(ringRadius, 0.024, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf4e39f,
      metalness: 0.92,
      roughness: 0.18
    });

    const orbitRing1 = new THREE.Mesh(ringGeo, ringMat);
    orbitRing1.rotation.x = Math.PI * 0.35;
    orbitRing1.rotation.y = Math.PI * 0.2;
    scene.add(orbitRing1);
    state.orbitRing1 = orbitRing1;

    const orbitRing2 = new THREE.Mesh(ringGeo, ringMat);
    orbitRing2.rotation.x = -Math.PI * 0.35;
    orbitRing2.rotation.y = -Math.PI * 0.25;
    orbitRing2.scale.set(1.12, 1.12, 1.12);
    scene.add(orbitRing2);
    state.orbitRing2 = orbitRing2;

    // Glowing Jewel Beads on the rings
    const jewelGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const jewelMat = new THREE.MeshBasicMaterial({ color: 0xfff6d0 });
    const jewel1 = new THREE.Mesh(jewelGeo, jewelMat);
    jewel1.position.set(ringRadius, 0, 0);
    orbitRing1.add(jewel1);

    const jewel2 = new THREE.Mesh(jewelGeo, jewelMat);
    jewel2.position.set(-ringRadius * 1.12, 0, 0);
    orbitRing2.add(jewel2);

    // 7. Floating Golden Stardust Particle Vortex
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = Math.random() * 10 - 5;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf4e39f,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    state.particleSystem = particleSystem;

    // 8. Window Resize Handling
    const onWindowResize = () => {
      if (!state.camera || !state.renderer) return;
      state.camera.aspect = window.innerWidth / window.innerHeight;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // 9. Animation Loop (Smooth, Stable, Clamped)
    const animate = () => {
      state.animFrameId = requestAnimationFrame(animate);
      const elapsedTime = state.clock.getElapsedTime();

      if (state.heartGroup) {
        if (state.isTweening) {
          // Smooth preset face transition
          const diff = state.targetRotY - state.heartGroup.rotation.y;
          if (Math.abs(diff) < 0.01) {
            state.heartGroup.rotation.y = state.targetRotY;
            state.isTweening = false;
            if (onFaceSnapped) onFaceSnapped();
          } else {
            state.heartGroup.rotation.y += diff * 0.08;
          }
          // Return X rotation upright
          state.heartGroup.rotation.x += (0 - state.heartGroup.rotation.x) * 0.08;
        } else if (state.isDragging) {
          // Dragging actively updates in handlePointerMove
        } else if (state.userInteracting) {
          // Inertia damping after drag release
          state.heartGroup.rotation.y += state.rotVelocityY;
          state.heartGroup.rotation.x += state.rotVelocityX;
          state.rotVelocityY *= 0.90;
          state.rotVelocityX *= 0.90;

          // Clamp X rotation to prevent upside-down flips
          state.heartGroup.rotation.x = Math.max(-0.38, Math.min(0.38, state.heartGroup.rotation.x));

          if (Math.abs(state.rotVelocityY) < 0.0005 && Math.abs(state.rotVelocityX) < 0.0005) {
            state.rotVelocityY = 0;
            state.rotVelocityX = 0;
            state.userInteracting = false;
          }
        } else {
          // Gentle, soothing auto-spin when idle
          if (isAutoSpinning) {
            state.heartGroup.rotation.y += 0.004;
          }
          // Smooth floating levitation
          state.heartGroup.position.y = 0.06 + Math.sin(elapsedTime * 1.3) * 0.04;
          // Smoothly return X angle upright
          state.heartGroup.rotation.x += (0 - state.heartGroup.rotation.x) * 0.04;
        }
      }

      // Orbital Rings Rotation
      if (state.orbitRing1 && state.orbitRing2) {
        state.orbitRing1.rotation.z = elapsedTime * 0.22;
        state.orbitRing2.rotation.z = -elapsedTime * 0.18;
      }

      // Floating Stardust Movement
      if (state.particleSystem) {
        const pos = state.particleSystem.geometry.attributes.position.array;
        for (let i = 1; i < pos.length; i += 3) {
          pos[i] += 0.006;
          if (pos[i] > 6) {
            pos[i] = -5;
          }
        }
        state.particleSystem.geometry.attributes.position.needsUpdate = true;
        state.particleSystem.rotation.y = elapsedTime * 0.02;
      }

      state.renderer.render(state.scene, state.camera);
    };

    animate();

    // 10. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(state.animFrameId);
      if (state.interactionTimer) clearTimeout(state.interactionTimer);
      window.removeEventListener('resize', onWindowResize);

      heartGeometry.dispose();
      heartBodyMaterial.dispose();
      goldBevelMaterial.dispose();
      medallionGeo.dispose();
      groomTexture.dispose();
      brideTexture.dispose();
      groomMaterial.dispose();
      brideMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      jewelGeo.dispose();
      jewelMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [coupleData, isAutoSpinning, onFaceSnapped]);

  // Handle Preset Face Snapping (Groom / Bride)
  useEffect(() => {
    if (!targetFace || !stateRef.current.heartGroup) return;
    const state = stateRef.current;
    state.isTweening = true;
    state.isDragging = false;
    state.rotVelocityX = 0;
    state.rotVelocityY = 0;

    const currentY = state.heartGroup.rotation.y;
    const twoPi = Math.PI * 2;
    const normY = ((currentY % twoPi) + twoPi) % twoPi;

    let target;
    if (targetFace === 'groom') {
      // nearest 0 radians
      target = normY > Math.PI ? currentY + (twoPi - normY) : currentY - normY;
    } else if (targetFace === 'bride') {
      // nearest PI radians
      target = currentY + (Math.PI - normY);
    }
    state.targetRotY = target;
  }, [targetFace]);

  // Dynamic Camera Zoom adjustments when isUnlocked or is3DModeOnly changes
  useEffect(() => {
    const state = stateRef.current;
    if (!state.camera) return;

    const isMobile = window.innerWidth < 640;
    let targetZ;

    if (is3DModeOnly) {
      targetZ = isMobile ? 3.35 : 3.5; // Close, majestic, fully readable on mobile
    } else if (isUnlocked) {
      targetZ = isMobile ? 4.8 : 4.4;
    } else {
      targetZ = isMobile ? 6.8 : 6.2;
    }

    const interval = setInterval(() => {
      if (!state.camera) {
        clearInterval(interval);
        return;
      }
      const diff = targetZ - state.camera.position.z;
      if (Math.abs(diff) < 0.04) {
        state.camera.position.z = targetZ;
        clearInterval(interval);
      } else {
        state.camera.position.z += diff * 0.14;
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isUnlocked, is3DModeOnly]);

  // POINTER INTERACTIONS (Touch & Mouse unified, scoped to 3D mode only)
  const handlePointerDown = (e) => {
    if (!is3DModeOnly) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const state = stateRef.current;
    state.isDragging = true;
    state.userInteracting = true;
    state.isTweening = false;
    state.prevX = e.clientX;
    state.prevY = e.clientY;
    state.rotVelocityX = 0;
    state.rotVelocityY = 0;

    if (state.interactionTimer) clearTimeout(state.interactionTimer);
  };

  const handlePointerMove = (e) => {
    const state = stateRef.current;
    if (!state.isDragging || !state.heartGroup || !is3DModeOnly) return;

    const deltaX = e.clientX - state.prevX;
    const deltaY = e.clientY - state.prevY;

    // Direct, responsive 1:1 rotation
    state.heartGroup.rotation.y += deltaX * 0.007;
    state.heartGroup.rotation.x += deltaY * 0.004;

    // Strict clamp so the heart never flips upside down or inverted
    state.heartGroup.rotation.x = Math.max(-0.38, Math.min(0.38, state.heartGroup.rotation.x));

    state.rotVelocityY = deltaX * 0.004;
    state.rotVelocityX = deltaY * 0.002;

    state.prevX = e.clientX;
    state.prevY = e.clientY;
  };

  const handlePointerUp = (e) => {
    const state = stateRef.current;
    if (!state.isDragging) return;
    state.isDragging = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // Limit maximum release speed so it never spins wildly
    state.rotVelocityY = Math.max(-0.035, Math.min(0.035, state.rotVelocityY));
    state.rotVelocityX = Math.max(-0.015, Math.min(0.015, state.rotVelocityX));

    state.interactionTimer = setTimeout(() => {
      state.userInteracting = false;
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: is3DModeOnly ? 30 : 0,
        pointerEvents: is3DModeOnly ? 'auto' : 'none',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        width: '100%',
        height: '100%'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          touchAction: 'none'
        }}
      />
    </div>
  );
};
