"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import starBgFragment from "../shaders/star-bg.fragment.glsl";
import starBgVertex from "../shaders/star-bg.vertex.glsl";
import starTexture from "@/assets/textures/star/star.png";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Background() {
  const bufferGeometryRef = useRef<THREE.BufferGeometry>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 2000;
  const texture = useTexture(starTexture.src);

  useEffect(() => {
    if (!bufferGeometryRef.current) return;
    const bufferGeometry = bufferGeometryRef.current;

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() * 30 - 15) * 10; // x
      positions[i3 + 1] = (Math.random() * 30 - 15) * 10; // y
      positions[i3 + 2] = (Math.random() * 30 - 15) * 10; // z
    }
    bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  }, []);

  const uniforms = useMemo(() => {
    return {
      uSize: { value: 1500 },
      uColor: { value: new THREE.Color("#ffffff") },
      uTexture: { value: texture },
    };
  }, [texture]);

  useFrame(({ clock: { elapsedTime } }) => {
    if (!pointsRef.current) return;
    const points = pointsRef.current;
    const curRotation = points.clone().rotation;
    points.rotation.set(
      Math.PI * elapsedTime * 0.01,
      Math.PI * elapsedTime * 0.005,
      curRotation.z
    );
  });

  return (
    <>
      <points ref={pointsRef}>
        <shaderMaterial
          fragmentShader={starBgFragment}
          vertexShader={starBgVertex}
          uniforms={uniforms}
          transparent
          depthTest={false}
          depthWrite={false}
        />
        <bufferGeometry ref={bufferGeometryRef} />
      </points>
    </>
  );
}
