import {
  OrbitControls,
  Stats,
  useTexture,
  TransformControls,
} from "@react-three/drei";

export default TextureSphere = () => {
  const map = useTexture("./textures/metal_plate_diff_1k.png");
  const normalmap = useTexture("./textures/metal_plate_nor_gl_1k.png");
  const roughmap = useTexture("./textures/metal_plate_rough_1k.png");

  return (
    <mesh castShadow scale={[0.5, 0.5, 0.5]} position={[0, 1, 0]}>
      <sphereGeometry />
      <meshStandardMaterial
        map={map}
        normalMap={normalmap}
        roughnessMap={roughmap}
      />
    </mesh>
  );
};
