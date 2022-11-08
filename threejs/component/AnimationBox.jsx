import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper } from "three";

const AnimationBox = ({ isTesting }) => {
  const meshref = useRef(null);
  useHelper(meshref, BoxHelper, "blue");
  useFrame(() => {
    meshref.current.rotation.x += 0.09;
  });
  return (
    <>
      <mesh ref={meshref} scale={[0.9, 0.7, 0.5]}>
        {isTesting ? <coneGeometry /> : null}
        <meshStandardMaterial color={"green"} />
      </mesh>
    </>
  );
};
export default AnimationBox;
