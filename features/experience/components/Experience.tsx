import React from "react";
import Background from "./Background";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <color attach="background" args={["#070f1c"]} />
      <OrbitControls />
      <Background />
    </>
  );
}
