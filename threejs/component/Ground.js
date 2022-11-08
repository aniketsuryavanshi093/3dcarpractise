import { useTexture } from "@react-three/drei";
import React from "react";

const Ground = (props) => {
  const map = useTexture("./textures/coast_sand_rocks_02_diff_1k.png");
  const normalmap = useTexture("./textures/coast_sand_rocks_02_nor_gl_1k.png");
  const roughmap = useTexture("./textures/coast_sand_rocks_02_rough_1k.png");
  const dismap = useTexture("./textures/metal_plate_disp_1k.png");
  return (
    <mesh
      receiveShadow
      scale={[10, 10, 0.01]}
      {...props}
      rotation-x={Math.PI * -0.5}
    >
      <planeBufferGeometry attach="geometry" />
      <meshStandardMaterial
        map={map}
        normalMap={normalmap}
        roughnessMap={roughmap}
        displacementMap={dismap}
      ></meshStandardMaterial>
    </mesh>
  );
};

export default Ground;
