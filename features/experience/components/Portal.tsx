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

  const scale = (width > height ? width : height) + 1.5;

  useFrame(({ clock: { elapsedTime } }) => {
    if (!shaderMaterialRef.current) return;
    shaderMaterialRef.current.uniforms.uTime.value = elapsedTime / 3;
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
      const heroSection = document.getElementById("hero");
      if (!meshRef.current || !heroSection) return;

      const q = gsap.utils.selector(heroSection);
      const heroDesc = q(".hero-desc");
      const heroTitle = q(".hero-title");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "+=200%",
          scrub: true,
          // markers: true,
          pin: true,
        },
      });
      tl.to(heroTitle, { opacity: 0 })
        .to(heroDesc, { opacity: 0 }, "<")
        .to(
          meshRef.current.scale,
          {
            x: scale,
            y: scale,
            z: scale,
            duration: 1,
          },
          "-=0.4"
        )
        .set(meshRef.current, {
          visible: false,
        });
    });

    return () => ctx.revert();
  }, [scale]);

  return (
    <>
      <mesh
        ref={meshRef}
        scale={[3.2, 3.2, 3.2]}
        position={[0, 0, -3]}
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
