"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import starBgFragment from "../shaders/star-bg.fragment.glsl";
import starBgVertex from "../shaders/star-bg.vertex.glsl";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import starTexture from "@/assets/textures/star/star.png";
import overlay from "@/assets/textures/overlay.jpg";

export default function Background() {
  const bufferGeometryRef = useRef<THREE.BufferGeometry>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const particleCount = 5000;
  const texture = useTexture(starTexture.src);
  const overlayTexture = useTexture(overlay.src);
  const { gl } = useThree();

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

    const twinkle = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      twinkle[i] = Math.random();
    }
    bufferGeometry.setAttribute(
      "aTwinkle",
      new THREE.BufferAttribute(twinkle, 1)
    );

    const twinkleSpeed = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      twinkleSpeed[i] = Math.random() * 5;
    }
    bufferGeometry.setAttribute(
      "aTwinkleSpeed",
      new THREE.BufferAttribute(twinkleSpeed, 1)
    );
  }, []);

  const uniforms = useMemo(() => {
    return {
      uSize: { value: 750 * gl.getPixelRatio() },
      uColor: { value: new THREE.Color("#ffc37a") },
      uTexture: { value: texture },
      uTime: { value: 0 },
    };
  }, [texture, gl]);

  useFrame(({ clock: { elapsedTime } }) => {
    if (!pointsRef.current || !shaderMaterialRef.current) return;

    const points = pointsRef.current;
    const curRotation = points.clone().rotation;
    points.rotation.set(
      Math.PI * elapsedTime * 0.01,
      Math.PI * elapsedTime * 0.005,
      curRotation.z
    );

    shaderMaterialRef.current.uniforms.uTime.value = elapsedTime;
  });

  return (
    <>
      <mesh position={[0, 0, 0]} scale={[10, 10, 10]} renderOrder={11}>
        <planeGeometry args={[2, 1]} />
        <meshBasicMaterial
          map={overlayTexture}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <points ref={pointsRef}>
        <shaderMaterial
          ref={shaderMaterialRef}
          fragmentShader={starBgFragment}
          vertexShader={starBgVertex}
          uniforms={uniforms}
          transparent
        />
        <bufferGeometry ref={bufferGeometryRef} />
      </points>
    </>
  );
}
