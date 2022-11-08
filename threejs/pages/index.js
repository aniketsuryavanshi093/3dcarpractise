import styles from "../styles/Home.module.css";
import { Canvas } from "@react-three/fiber";
// import AnimationBox from "../component/AnimationBox";
import { OrbitControls, Stats, useGLTF } from "@react-three/drei";
import Lights from "../component/Lights";
import Ground from "../component/Ground";
import { Trees } from "../component/TreeModal";
import { Mutant } from "../component/Mutant";

export default function Home() {
  // const Mutant = () => {
  //   const { nodes, materials } = useGLTF("./textures/untitled.glb");
  //   return (
  //     <mesh>
  //       <primitive object={materials.scene} />
  //     </mesh>
  //   );
  // };
  const testing = true;
  return (
    <div className={styles.container}>
      <Canvas shadows>
        <OrbitControls />
        {testing ? <Stats /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        {testing ? <axesHelper visible={testing} args={[2]} /> : null}
        <Lights />
        <Ground position={[0, 0, 0]} />
        <Ground position={[10, 0, 0]} />
        <Ground position={[0, 0, 10]} />
        <Ground position={[20, 0, 0]} />
        <Ground position={[0, 0, 20]} />
        <Ground position={[10, 0, 10]} />
        <Ground position={[20, 0, 20]} />
        <Ground position={[10, 0, 20]} />
        <Ground position={[20, 0, 10]} />
        <Ground position={[20, 0, 20]} />
        <Ground position={[20, 0, 0]} />
        <Ground position={[0, 0, 20]} />
        <Ground position={[30, 0, 0]} />
        <Ground position={[0, 0, 30]} />
        <Ground position={[20, 0, 20]} />
        <Ground position={[30, 0, 30]} />
        <Ground position={[20, 0, 30]} />
        <Ground position={[30, 0, 20]} />
        <Ground position={[30, 0, 10]} />
        <Ground position={[10, 0, 30]} />
        <Trees boundry={800} count={20} />
        <Mutant />
        {/* <TextureSphere /> */}
      </Canvas>
    </div>
  );
}
