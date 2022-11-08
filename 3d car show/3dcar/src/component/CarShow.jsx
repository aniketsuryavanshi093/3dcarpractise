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
  const key = {
    LEFT: 37, //left arrow
    UP: 38, // up arrow
    RIGHT: 39, // right arrow
    BOTTOM: 40, // down arrow
  };
  return (
    <>
      {/* orbitcontrols : way for user to interact with the scene like move camera position zoom in and out 
          maxPolarAngle : setting it to 1.45 means that the user cannot go below the ground if not set then the user can freely go below the scene
    */}
      <OrbitControls maxPolarAngle={1.45} target={[0, 0.35, 0]} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      {/* using cubecamera here is because cube camera will accept all the light in the scene available and cast shadow on the mesh which is
       only rendered in side the cubecamera component 
       resolution: increase the resolution to make the shadow more feel realistic make sure we use this limited because may effect in performance
       */}
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car selectedCar={selectedCar} />
          </>
        )}
      </CubeCamera>
      {/* our rotating boxes */}
      <Boxes />
      {/* our spotlight only allows the light to come from one point  */}
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
