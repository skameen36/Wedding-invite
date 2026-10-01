import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Royal3DCanvas = ({ isUnlocked, is3DModeOnly, coupleData }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // References for external control if needed
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    heartGroup: null,
    orbitRing1: null,
    orbitRing2: null,
    particleSystem: null,
    isDragging: false,
    previousPointerX: 0,
    previousPointerY: 0,
    rotVelocityX: 0,
    rotVelocityY: 0.008,
    userInteracting: false,
    interactionTimer: null,
    animFrameId: null,
    clock: new THREE.Clock()
  });

  /**
   * Generates ultra-crisp 2048x2048 Medallion Canvas Texture
   */
  const createMedallionTexture = (role, name, subtitle, arabicHonorific) => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');

    // Rich radial emerald gradient with dark vignette
    const radGrad = ctx.createRadialGradient(1024, 1024, 250, 1024, 1024, 980);
    radGrad.addColorStop(0, '#0c4434');
    radGrad.addColorStop(0.55, '#05291e');
    radGrad.addColorStop(0.85, '#031911');
    radGrad.addColorStop(1, '#010c07');

    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(1024, 1024, 960, 0, Math.PI * 2);
    ctx.fill();

    // Outer Heavy Gold Filigree Border
    ctx.lineWidth = 26;
    ctx.strokeStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(1024, 1024, 920, 0, Math.PI * 2);
    ctx.stroke();

    // Secondary Beaded Ring
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#f8f1de';
    ctx.setLineDash([12, 16]);
    ctx.beginPath();
    ctx.arc(1024, 1024, 875, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // 8-Pointed Star Accents around circumference
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      const x = 1024 + Math.cos(angle) * 896;
      const y = 1024 + Math.sin(angle) * 896;
      ctx.fillStyle = '#f4e39f';
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 1. Arabic Calligraphy Honorific
    ctx.fillStyle = '#f4e39f';
    ctx.font = 'bold 96px "Amiri", serif';
    ctx.shadowColor = 'rgba(212, 175, 55, 0.7)';
    ctx.shadowBlur = 20;
    ctx.fillText(arabicHonorific, 1024, 520);
    ctx.shadowBlur = 0;

    // 2. Role Ribbon (THE GROOM / THE BRIDE)
    ctx.fillStyle = '#d4af37';
    ctx.font = '700 64px "Cinzel", serif';
    ctx.letterSpacing = '6px';
    ctx.fillText(role.toUpperCase(), 1024, 710);

    // Decorative Horizontal Filigree Bar
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(640, 780);
    ctx.lineTo(1408, 780);
    ctx.stroke();

    // Center Diamond on Divider
    ctx.fillStyle = '#fffef8';
    ctx.beginPath();
    ctx.arc(1024, 780, 10, 0, Math.PI * 2);
    ctx.fill();

    // 3. Name with Warm Gold Glow
    ctx.fillStyle = '#fffef8';
    ctx.font = 'bold 118px "Playfair Display", serif';
    ctx.shadowColor = 'rgba(244, 227, 159, 0.9)';
    ctx.shadowBlur = 35;
    ctx.fillText(name, 1024, 980);
    ctx.shadowBlur = 0;

    // 4. Subtitle / Lineage
    ctx.fillStyle = '#fbf3d5';
    ctx.font = '500 58px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(subtitle, 1024, 1170);

    // 5. Wedding Date Monogram
    ctx.fillStyle = '#d4af37';
    ctx.font = 'italic 62px "Cinzel", serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('13 · XII · 2026', 1024, 1370);

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
    const initialZ = isUnlocked ? (isMobile ? 5.8 : 4.4) : (isMobile ? 8.6 : 6.8);

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
    const ambientLight = new THREE.AmbientLight(0x0a3d2e, 1.9);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xfff3cc, 2.2);
    goldKeyLight.position.set(4, 6, 5);
    scene.add(goldKeyLight);

    const backRimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    backRimLight.position.set(-4, -3, -5);
    scene.add(backRimLight);

    const centerGlowLight = new THREE.PointLight(0xffdf80, 2.4, 12);
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

    const baseScale = isMobile ? 0.48 : 0.68;
    const heartMesh = new THREE.Mesh(heartGeometry, [heartBodyMaterial, goldBevelMaterial]);
    heartMesh.scale.set(baseScale, baseScale, baseScale);
    heartGroup.add(heartMesh);

    // 5. Side 1: Groom Medallion (Front +Z)
    const groomTexture = createMedallionTexture(
      coupleData.groom.title,
      coupleData.groom.name,
      coupleData.groom.parentage,
      coupleData.groom.arabicTitle
    );

    const medallionGeo = new THREE.CircleGeometry(1.05, 64);
    const groomMaterial = new THREE.MeshBasicMaterial({
      map: groomTexture,
      transparent: true,
      side: THREE.FrontSide
    });
    const groomMedallion = new THREE.Mesh(medallionGeo, groomMaterial);
    const medallionScale = isMobile ? 0.55 : 0.76;
    groomMedallion.scale.set(medallionScale, medallionScale, medallionScale);
    groomMedallion.position.set(0, 0.05, 0.35 * (isMobile ? 0.7 : 0.9));
    heartGroup.add(groomMedallion);

    // Side 2: Bride Medallion (Back -Z, 180° rotated)
    const brideTexture = createMedallionTexture(
      coupleData.bride.title,
      coupleData.bride.name,
      coupleData.bride.parentage,
      coupleData.bride.arabicTitle
    );
    const brideMaterial = new THREE.MeshBasicMaterial({
      map: brideTexture,
      transparent: true,
      side: THREE.FrontSide
    });
    const brideMedallion = new THREE.Mesh(medallionGeo, brideMaterial);
    brideMedallion.scale.set(medallionScale, medallionScale, medallionScale);
    brideMedallion.position.set(0, 0.05, -0.35 * (isMobile ? 0.7 : 0.9));
    brideMedallion.rotation.y = Math.PI; // Face backwards
    heartGroup.add(brideMedallion);

    // 6. Dual Celestial Golden Orbit Rings
    const ringRadius = isMobile ? 1.35 : 1.85;
    const ringGeo = new THREE.TorusGeometry(ringRadius, 0.022, 16, 100);
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

    // 8. Interactive Touch & Mouse Drag Controls
    const handlePointerDown = (clientX, clientY) => {
      state.isDragging = true;
      state.userInteracting = true;
      state.previousPointerX = clientX;
      state.previousPointerY = clientY;
      if (state.interactionTimer) clearTimeout(state.interactionTimer);
    };

    const handlePointerMove = (clientX, clientY) => {
      if (!state.isDragging || !state.heartGroup) return;

      const deltaX = clientX - state.previousPointerX;
      const deltaY = clientY - state.previousPointerY;

      state.rotVelocityY = deltaX * 0.007;
      state.rotVelocityX = deltaY * 0.004;

      state.heartGroup.rotation.y += state.rotVelocityY;
      state.heartGroup.rotation.x += state.rotVelocityX;

      state.previousPointerX = clientX;
      state.previousPointerY = clientY;
    };

    const handlePointerUp = () => {
      state.isDragging = false;
      state.interactionTimer = setTimeout(() => {
        state.userInteracting = false;
      }, 1800);
    };

    // Event listeners
    const onMouseDown = (e) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handlePointerUp();

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 9. Resize Handling
    const onWindowResize = () => {
      if (!state.camera || !state.renderer) return;
      state.camera.aspect = window.innerWidth / window.innerHeight;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(window.innerWidth, window.innerHeight);

      const isMob = window.innerWidth < 640;
      if (!isUnlocked) {
        state.camera.position.z = isMob ? 8.6 : 6.8;
      } else {
        state.camera.position.z = isMob ? 5.8 : 4.4;
      }
    };
    window.addEventListener('resize', onWindowResize);

    // 10. Animation Loop
    const animate = () => {
      state.animFrameId = requestAnimationFrame(animate);
      const elapsedTime = state.clock.getElapsedTime();

      if (state.heartGroup) {
        if (!state.userInteracting) {
          // Perpetual gentle rotation
          state.heartGroup.rotation.y += 0.0075;
          // Floating levitation
          state.heartGroup.position.y = 0.08 + Math.sin(elapsedTime * 1.5) * 0.08;
          // Smooth return to upright
          state.heartGroup.rotation.x += (Math.sin(elapsedTime * 0.8) * 0.06 - state.heartGroup.rotation.x) * 0.05;
        } else if (!state.isDragging) {
          // Inertia damping
          state.heartGroup.rotation.y += state.rotVelocityY;
          state.heartGroup.rotation.x += state.rotVelocityX;
          state.rotVelocityY *= 0.94;
          state.rotVelocityX *= 0.94;
        }
      }

      // Orbital Rings Rotation
      if (state.orbitRing1 && state.orbitRing2) {
        state.orbitRing1.rotation.z = elapsedTime * 0.25;
        state.orbitRing2.rotation.z = -elapsedTime * 0.2;
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

    // 11. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(state.animFrameId);
      if (state.interactionTimer) clearTimeout(state.interactionTimer);

      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onWindowResize);

      // Dispose Three.js objects
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
  }, [coupleData]);

  // Dynamic Camera Zoom adjustments when isUnlocked or is3DModeOnly changes
  useEffect(() => {
    const state = stateRef.current;
    if (!state.camera) return;

    const isMobile = window.innerWidth < 640;
    let targetZ;

    if (is3DModeOnly) {
      targetZ = isMobile ? 4.8 : 3.6; // Closer dramatic inspection
    } else if (isUnlocked) {
      targetZ = isMobile ? 5.8 : 4.4;
    } else {
      targetZ = isMobile ? 8.6 : 6.8;
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
        state.camera.position.z += diff * 0.12;
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isUnlocked, is3DModeOnly]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: is3DModeOnly ? 30 : 0,
        pointerEvents: is3DModeOnly ? 'auto' : 'none',
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
          pointerEvents: 'auto'
        }}
      />
    </div>
  );
};
