"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type AnimatedShape = {
  mesh: THREE.Mesh;
  basePosition: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number;
  amplitude: number;
};

const CONFIG = {
  scaleMin: 3.5,
  scaleMax: 6.0,
  blur: 80,
  saturation: 1.3,
  driftSpeed: 2.0,
  spinY: 0.003,
  spinZ: 0.002,
};

const BLOB_COLORS = [
  "#b0b8c1", // steel blue-grey
  "#7f8a94", // storm grey
  "#9aa3ad", // overcast
  "#c5cdd4", // silver mist
  "#636e78", // deep slate
  "#adb5bd", // cool grey
  "#d0d8df", // pale cloud
  "#525c66", // thunder dark
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function ThreeGradientBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      62,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const makeBlob = (colorHex: string, opacity: number) =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(colorHex),
        transparent: true,
        opacity,
      });

    const shapeConfigs: [THREE.BufferGeometry, string][] = [
      [new THREE.SphereGeometry(1, 28, 28), BLOB_COLORS[0]],
      [new THREE.SphereGeometry(1, 28, 28), BLOB_COLORS[1]],
      [new THREE.IcosahedronGeometry(1, 4), BLOB_COLORS[2]],
      [new THREE.SphereGeometry(1, 28, 28), BLOB_COLORS[3]],
      [new THREE.DodecahedronGeometry(1, 2), BLOB_COLORS[4]],
      [new THREE.SphereGeometry(1, 28, 28), BLOB_COLORS[5]],
      [new THREE.IcosahedronGeometry(1, 3), BLOB_COLORS[6]],
      [new THREE.DodecahedronGeometry(1, 1), BLOB_COLORS[7]],
    ];

    const animatedShapes: AnimatedShape[] = [];

    for (let i = 0; i < shapeConfigs.length; i++) {
      const [geometry, colorHex] = shapeConfigs[i];
      const opacity = randomBetween(0.72, 0.9);
      const mesh = new THREE.Mesh(geometry, makeBlob(colorHex, opacity));

      const scale = randomBetween(CONFIG.scaleMin, CONFIG.scaleMax);
      mesh.scale.setScalar(scale);

      const basePosition = new THREE.Vector3(
        randomBetween(-4.2, 4.2),
        randomBetween(-2.8, 2.8),
        randomBetween(-1.5, 0.5),
      );
      mesh.position.copy(basePosition);
      scene.add(mesh);

      animatedShapes.push({
        mesh,
        basePosition,

        velocity: new THREE.Vector3(
          randomBetween(-CONFIG.driftSpeed, CONFIG.driftSpeed),
          randomBetween(-CONFIG.driftSpeed * 0.84, CONFIG.driftSpeed * 0.84),
          0,
        ),
        phase: randomBetween(0, Math.PI * 2),

        amplitude: randomBetween(0.4, 1.0),
      });
    }

    const clock = new THREE.Clock();
    const bounds = { x: 5.5, y: 3.8 };

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      for (const shape of animatedShapes) {
        shape.basePosition.addScaledVector(shape.velocity, delta);

        if (Math.abs(shape.basePosition.x) > bounds.x) shape.velocity.x *= -1;
        if (Math.abs(shape.basePosition.y) > bounds.y) shape.velocity.y *= -1;

        shape.mesh.position.x =
          shape.basePosition.x +
          Math.sin(elapsed * 0.28 + shape.phase) * shape.amplitude;
        shape.mesh.position.y =
          shape.basePosition.y +
          Math.cos(elapsed * 0.22 + shape.phase * 1.4) * shape.amplitude * 0.65;
        shape.mesh.position.z = shape.basePosition.z;

        shape.mesh.rotation.y += CONFIG.spinY * delta;
        shape.mesh.rotation.z += CONFIG.spinZ * delta;
      }

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", resize);
    let animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrameId);
      for (const shape of animatedShapes) {
        shape.mesh.geometry.dispose();
        const mat = shape.mesh.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem]"
      style={{
        filter: `blur(${CONFIG.blur}px) saturate(${CONFIG.saturation * 100}%)`,
      }}
    />
  );
}
