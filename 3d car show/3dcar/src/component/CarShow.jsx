import React from "react";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Ground from "./Ground";
import { Car } from "./Car";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Rings from "./Rings";
import Boxes from "./Box";

const CarShow = ({ selectedCar }) => {
  return (
    <>
      <OrbitControls maxPolarAngle={1.45} target={[0, 0.35, 0]} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car selectedCar={selectedCar} />
          </>
        )}
      </CubeCamera>
      <Boxes />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.7}
        angle={0.6}
        castShadow
        shadowBias={-0.0001}
        penumbra={0.5}
        position={[10, 5, 0]}
      />
      <spotLight
        color={"#46c9f5"}
        intensity={2}
        angle={0.6}
        castShadow
        shadowBias={-0.0001}
        penumbra={0.5}
        position={[-10, 5, 0]}
      />
      <Rings />
      <Ground />

      <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
    </>
  );
};

export default CarShow;
