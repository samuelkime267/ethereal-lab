"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import portalFragment from "../shaders/portal.fragment.glsl";
import portalVertex from "../shaders/portal.vertex.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import nebula from "@/assets/textures/portal/space.jpg";
import space from "@/assets/textures/portal/galaxy.jpg";

export default function Portal() {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const portalTexture = useTexture([nebula.src, space.src]);
  const {
    viewport: { width, height },
  } = useThree();

  const scale = width > height ? width : height;

  useFrame(({ clock: { elapsedTime } }) => {
    if (!shaderMaterialRef.current) return;
    shaderMaterialRef.current.uniforms.uTime.value = elapsedTime;
  });

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uNebulaTexture: { value: portalTexture[0] },
      uSpaceTexture: { value: portalTexture[1] },
    };
  }, [portalTexture]);

  return (
    <>
      <mesh scale={[scale, scale, 0]} position={[0, 0, -3.5]}>
        <shaderMaterial
          ref={shaderMaterialRef}
          vertexShader={portalVertex}
          fragmentShader={portalFragment}
          uniforms={uniforms}
          transparent
        ></shaderMaterial>
        {/* <planeGeometry args={[1, 1]} /> */}
        <ringGeometry args={[0, 1, 64]} />
      </mesh>
    </>
  );
}
