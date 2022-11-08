import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export function Trees(props) {
  const { nodes, materials } = useGLTF("./textures/tree.glb");
  const [trees, setTrees] = useState([]);
  const updatePosition = (treeArr, boundry) => {
    treeArr.forEach((elem) => {
      elem.position.x = Math.random() * boundry;
      elem.position.z = Math.random() * boundry;
    });
    setTrees(treeArr);
  };
  useEffect(() => {
    const tempTree = [];
    for (let i = 0; i < props.count; i++) {
      tempTree.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    updatePosition(tempTree, props.boundry);
  }, [props.boundry, props.count]);
  console.log(trees);
  return (
    <group scale={[0.01, 0.01, 0.01]} {...props} dispose={null}>
      {trees.map((elem) => (
        <group
          position={[elem.position.x, 0, elem.position.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.formica_cinza}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            material-color={"green"}
            geometry={nodes.Object_6.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_7.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_9.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_10.geometry}
            material={materials.Vegetation_Bark_Maple_1}
          />
        </group>
      ))}
    </group>
  );
}

useGLTF.preload("./textures/tree.glb");
