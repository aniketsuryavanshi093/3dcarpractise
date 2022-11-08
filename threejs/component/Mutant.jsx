import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import useInput from "../hooks/useInput";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotatequternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();
const directionOffset = ({ forward, backward, left, right }) => {
  var directionoffset = 0;
  if (forward) {
    if (left) {
      directionoffset = Math.PI / 4;
    } else if (right) {
      directionoffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionoffset = Math.PI / 4 + Math.PI / 2;
    } else if (right) {
      directionoffset = -Math.PI / 4 + -Math.PI / 2;
    } else {
      directionoffset = Math.PI;
    }
  } else if (left) {
    directionoffset = Math.PI / 2;
  } else if (right) {
    directionoffset = -Math.PI / 2;
  }
  return directionoffset;
};
export function Mutant(props) {
  const { forward, backward, right, flexing, left, jump, shift } = useInput();
  const { animations, scene } = useGLTF("./textures/mutant.glb");
  const { actions } = useAnimations(animations, scene);
  const controlRef = useRef("");
  scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  const camera = useThree((state) => state.camera);
  const currentAction = useRef("");
  const updateCameraTraget = ({ moveX, movez }) => {
    camera.position.x += moveX;
    camera.position.z += movez;

    cameraTarget.x = scene.position.x;
    cameraTarget.y = scene.position.y + 2;
    cameraTarget.z = scene.position.z;
    if (controlRef) {
      controlRef.current.target = cameraTarget;
    }
  };
  useEffect(() => {
    let action = "";
    if (forward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "run";
      }
    } else if (jump) {
      action = "jumping";
    } else if (flexing) {
      action = "flex";
    } else {
      action = "idle";
    }
    if (currentAction.current != action) {
      const nextAActionToplay = actions[action];
      const current = actions[currentAction?.current];
      current?.fadeOut(0.2);
      nextAActionToplay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, flexing, right, left, jump, shift]);
  useFrame((state, delta) => {
    if (
      currentAction?.current === "walking" ||
      currentAction?.current === "run"
    ) {
      let angleCamera = Math.atan2(
        camera.position.x - scene.position.x,
        camera.position.z - scene.position.z
      );
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });
      rotatequternion.setFromAxisAngle(
        rotateAngle,
        angleCamera + newDirectionOffset
      );
      scene.quaternion.rotateTowards(rotatequternion, 0.2);
      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      const velocity = currentAction?.current === "run" ? 10 : 5;
      const movex = walkDirection.x * velocity * delta;
      const movez = walkDirection.z * velocity * delta;
      scene.position.x += movex;
      scene.position.z += movez;
      updateCameraTraget(movex, movez);
    }
  });

  return (
    <>
      {/* <group> */}
      <OrbitControls ref={controlRef} />
      <primitive object={scene} />
      {/* </group> */}
    </>
  );
}

useGLTF.preload("./textures/mutant.glb");
