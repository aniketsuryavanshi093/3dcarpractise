import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";
// import NORMALMAP from "../asssets/textures/rough_plasterbrick_05_nor_gl_1k.jpg";
// import ROUGHMAP from "../asssets/textures/rough_plasterbrick_05_rough_1k.jpg";

function Ground() {
  const [roughness, normalMap] = useLoader(TextureLoader, [
    "./textures/rough_plasterbrick_05_rough_1k.jpg",
    "./textures/rough_plasterbrick_05_nor_gl_1k.jpg",
  ]);

  useEffect(() => {
    [normalMap, roughness].forEach((elem) => {
      elem.wrapS = RepeatWrapping;
      elem.wrapT = RepeatWrapping;
      elem.repeat.set(5, 5);
    });
    normalMap.encoding = LinearEncoding;
  }, [normalMap, roughness]);
  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.128;
    roughness.offset.set(0, t % 1);
    normalMap.offset.set(0, t % 1);
  });
  return (
    <>
      <mesh castShadow receiveShadow rotation-x={Math.PI * -0.5}>
        <planeGeometry args={[30, 30]} />
        <MeshReflectorMaterial
          envMapIntensity={0}
          normalScale={[0.15, 0.15]}
          debug={0}
          reflectorOffset={0.2}
          depthToBlurRatioBias={0.25}
          normalMap={normalMap}
          roughnessMap={roughness}
          mirror={0}
          resolution={1980}
          mixStrength={80}
          mixContrast={1}
          mixBlur={30}
          blur={[1000, 400]}
          roughness={0.7}
          dithering={true}
          color={[0.015, 0.015, 0.015]}
          minDepthThreshold={0.9}
          depthScale={0.01}
          maxDepthThreshold={1}
        />
      </mesh>
    </>
  );
}

export default Ground;
