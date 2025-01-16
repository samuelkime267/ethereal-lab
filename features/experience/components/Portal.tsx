"use client";

import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import portalFragment from "../shaders/portal.fragment.glsl";
import portalVertex from "../shaders/portal.vertex.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import nebula from "@/assets/textures/portal/space.jpg";
import space from "@/assets/textures/portal/galaxy.jpg";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Portal() {
  gsap.registerPlugin(ScrollTrigger);

  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const portalTexture = useTexture([nebula.src, space.src]);
  const {
    viewport: { width, height },
  } = useThree();

  const scale = (width > height ? width : height) + 10;

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!meshRef.current) return;
      const bodyContent = document.getElementById("hero");
      if (!bodyContent) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bodyContent,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });
      tl.to(meshRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
      }).to(
        meshRef.current.position,
        {
          y: 0,
        },
        "<"
      );
    });

    return () => ctx.revert();
  }, [scale]);

  return (
    <>
      <mesh
        ref={meshRef}
        scale={[4, 4, 4]}
        position={[0, -3.5, -3]}
        renderOrder={10}
      >
        <shaderMaterial
          ref={shaderMaterialRef}
          vertexShader={portalVertex}
          fragmentShader={portalFragment}
          uniforms={uniforms}
          transparent
        />
        <ringGeometry args={[0, 1, 64]} />
      </mesh>
    </>
  );
}
