"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import portalFragment from "../shaders/portal.fragment.glsl";
import portalVertex from "../shaders/portal.vertex.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { RenderTexture, useFBO, useTexture } from "@react-three/drei";
import Background from "./Background";
import portal from "@/assets/portal.jpg";

export default function Portal() {
  const buffer = useFBO();
  console.log(buffer.texture);

  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const portalTexture = useTexture(portal.src);
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
      uBackgroundTexture: { value: portalTexture },
    };
  }, [portalTexture]);

  return (
    <>
      <mesh scale={[scale, scale, 0]}>
        <shaderMaterial
          ref={shaderMaterialRef}
          vertexShader={portalVertex}
          fragmentShader={portalFragment}
          uniforms={uniforms}
        >
          <RenderTexture attach="uniforms-uBackgroundTexture-value">
            <Background />
          </RenderTexture>
        </shaderMaterial>
        <planeGeometry args={[1, 1]} />
        {/* <ringGeometry args={[0, 1, 64]} /> */}
      </mesh>
    </>
  );
}
