import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { DirectionalLightHelper } from "three";

export const Lights = () => {
  const luightref = useRef();
  useHelper(luightref, DirectionalLightHelper, 6, "red");
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={luightref}
        castShadow
        position={[0, 10, 10]}
        shadowMapHeight={5000}
        shadowMapWidth={6000}
        shadowCameraLeft={-40}
        shadowCameraRight={40}
        shadowCameraTop={40}
        shadowCameraBottom={-40}
      />
      <hemisphereLight args={["green", "blue", 0.7]} />
    </>
  );
};
export default Lights;
