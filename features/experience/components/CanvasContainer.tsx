"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Stats } from "@react-three/drei";
import { Leva } from "leva";

export default function CanvasContainer() {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Leva collapsed />
      <Canvas
        // dpr={[1, 2]}
        dpr={1}
        camera={{ fov: 45, position: [0, 0, 5] }}
      >
        <Stats />
        <Experience />
      </Canvas>
    </div>
  );
}
