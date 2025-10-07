import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const geometriesRef = useRef([]);

  useEffect(() => {
    // Prevent double initialization in React 18 Strict Mode
    if (!containerRef.current || rendererRef.current) return;

    // === Scene setup ===
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // === Particles ===
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 200;
      posArray[i + 1] = (Math.random() - 0.5) * 200;
      posArray[i + 2] = (Math.random() - 0.5) * 200;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    particlesRef.current = { system: particleSystem, velocities };

    // === Floating Geometries ===
    const createGeometry = (type, color, position) => {
      let geometry;
      switch (type) {
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(4);
          break;
        case 'icosahedron':
          geometry = new THREE.IcosahedronGeometry(3);
          break;
        case 'tetrahedron':
          geometry = new THREE.TetrahedronGeometry(4);
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry(3.5);
          break;
        default:
          geometry = new THREE.BoxGeometry(4, 4, 4);
      }

      const material = new THREE.MeshPhongMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        emissive: color,
        emissiveIntensity: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.userData.rotationSpeed = {
        x: Math.random() * 0.02 - 0.01,
        y: Math.random() * 0.02 - 0.01,
        z: Math.random() * 0.02 - 0.01,
      };
      mesh.userData.floatSpeed = Math.random() * 0.01 + 0.005;
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;
      mesh.userData.originalScale = 1;
      mesh.userData.isHovered = false;

      return mesh;
    };

    const geometries = [
      createGeometry('octahedron', 0x00ffff, [-25, 10, -20]),
      createGeometry('icosahedron', 0xffff00, [25, -15, -30]),
      createGeometry('tetrahedron', 0xff0080, [-30, -10, -25]),
      createGeometry('dodecahedron', 0xff00ff, [20, 20, -35]),
      createGeometry('octahedron', 0x0080ff, [0, -20, -15]),
      createGeometry('icosahedron', 0xff6600, [30, 5, -20]),
      createGeometry('tetrahedron', 0x00ff80, [-15, 25, -30]),
    ];

    geometries.forEach((geo) => {
      scene.add(geo);
      geometriesRef.current.push(geo);
    });

    // === Lights ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff00ff, 2, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ffff, 2, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffff00, 1.5, 100);
    pointLight3.position.set(0, 0, 40);
    scene.add(pointLight3);

    // === Mouse interaction ===
    let mouseX = 0;
    let mouseY = 0;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.x = mouseX;
      mouse.y = mouseY;
    };

    const handleClick = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(geometriesRef.current);

      if (intersects.length > 0) {
        const obj = intersects[0].object;

        // Small explosion + color flash
        obj.userData.rotationSpeed.x += (Math.random() - 0.5) * 0.1;
        obj.userData.rotationSpeed.y += (Math.random() - 0.5) * 0.1;
        obj.material.emissiveIntensity = 1;
        setTimeout(() => (obj.material.emissiveIntensity = 0.3), 200);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // === Animation Loop ===
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Animate particles
      const { system, velocities } = particlesRef.current;
      const positions = system.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i].x;
        positions[i3 + 1] += velocities[i].y;
        positions[i3 + 2] += velocities[i].z;

        // Bounce back when going too far
        if (Math.abs(positions[i3]) > 100) velocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > 100) velocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > 100) velocities[i].z *= -1;
      }
      system.geometry.attributes.position.needsUpdate = true;
      system.rotation.y += 0.0005;

      // Animate geometries
      geometriesRef.current.forEach((geo) => {
        geo.rotation.x += geo.userData.rotationSpeed.x;
        geo.rotation.y += geo.userData.rotationSpeed.y;
        geo.position.y += Math.sin(time * geo.userData.floatSpeed + geo.userData.floatOffset) * 0.03;
      });

      // Raycasting hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(geometriesRef.current);

      geometriesRef.current.forEach((geo) => {
        if (!intersects.find((i) => i.object === geo)) {
          const targetScale = geo.userData.originalScale;
          geo.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
          geo.material.opacity += (0.4 - geo.material.opacity) * 0.1;
        }
      });

      if (intersects.length > 0) {
        const obj = intersects[0].object;
        const targetScale = obj.userData.originalScale * 1.3;
        obj.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
        obj.material.opacity += (0.8 - obj.material.opacity) * 0.15;
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }

      // Subtle camera parallax
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate lights
      pointLight1.position.x = Math.sin(time * 0.5) * 30;
      pointLight1.position.z = Math.cos(time * 0.5) * 30;
      pointLight2.position.x = Math.cos(time * 0.7) * 25;
      pointLight2.position.y = Math.sin(time * 0.7) * 25;

      renderer.render(scene, camera);
    };

    animate();

    // === Handle Resize ===
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // === Cleanup ===
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      document.body.style.cursor = 'default';
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      geometries.forEach((geo) => {
        geo.geometry.dispose();
        geo.material.dispose();
      });
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-fuchsia-500/10 animate-pulse"
        style={{ animationDuration: '8s' }}
      />

      {/* Radial gradient effects */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"
        style={{ animationDuration: '6s' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse"
        style={{ animationDuration: '7s', animationDelay: '1s' }}
      />

      {/* Three.js container */}
      <div ref={containerRef} className="absolute inset-0 z-10" />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.05) 2px, rgba(0, 255, 255, 0.05) 4px)',
        }}
      />
    </div>
  );
}
