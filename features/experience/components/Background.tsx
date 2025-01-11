"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import starBgFragment from "../shaders/star-bg.fragment.glsl";
import starBgVertex from "../shaders/star-bg.vertex.glsl";

export default function Background() {
  const bufferGeometryRef = useRef<THREE.BufferGeometry>(null);
  const particleCount = 2000;

  useEffect(() => {
    if (!bufferGeometryRef.current) return;
    const bufferGeometry = bufferGeometryRef.current;

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() * 20 - 10) * 10; // x
      positions[i3 + 1] = (Math.random() * 20 - 10) * 10; // y
      positions[i3 + 2] = (Math.random() * 20 - 10) * 10; // z
    }
    bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  }, []);

  const uniforms = useMemo(() => {
    return {
      uSize: { value: 100 },
    };
  }, []);

  return (
    <>
      <points>
        <shaderMaterial
          fragmentShader={starBgFragment}
          vertexShader={starBgVertex}
          uniforms={uniforms}
        />
        <bufferGeometry ref={bufferGeometryRef} />
      </points>
    </>
  );
}
