// import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
let car = "";
export function Car({ selectedCar }) {
  car = selectedCar.value;
  const { scene } = useGLTF(`./textures/model/${selectedCar.value}.glb`);
  scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  if (selectedCar.rotate) {
    scene.rotation.y = 0;
  }

  return (
    <group scale={selectedCar.scale}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(`./textures/model/${car}.glb`);
