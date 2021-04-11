import { useRef } from 'react';
import { GroupProps, useFrame, useLoader } from 'react-three-fiber';
import { BufferGeometry } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model: React.FC<{ url: string }> = ({ url }) => {
  const group = useRef<THREE.Group>();
  const { nodes } = useLoader(GLTFLoader, url);

  useFrame(() => {
    const current = group.current;
    if (current && current.rotation) {
      current.rotation.y += 0.004;
    }
  });

  return (
    <group ref={group}>
      <mesh
        visible
        geometry={(nodes.Default as any).geometry as BufferGeometry}
      >
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
};

export default Model;
