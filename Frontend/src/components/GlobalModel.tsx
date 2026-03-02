import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface GlobalModelProps {
  accuracy: number;
  isPulsing: boolean;
}

export function GlobalModel({ accuracy, isPulsing }: GlobalModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }

    if (glowRef.current) {
      const scale = isPulsing
        ? 2.5 + Math.sin(state.clock.elapsedTime * 4) * 0.3
        : 2.3;
      glowRef.current.scale.setScalar(scale);
      glowRef.current.rotation.y -= 0.005;
    }

    if (innerGlowRef.current) {
      const scale = isPulsing
        ? 2.2 + Math.sin(state.clock.elapsedTime * 4) * 0.2
        : 2.1;
      innerGlowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.05}
        />
      </mesh>

      <Sphere ref={meshRef} args={[1.8, 32, 32]}>
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#a855f7"
          emissiveIntensity={isPulsing ? 0.8 : 0.5}
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </Sphere>

      <Sphere args={[1.6, 32, 32]}>
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#00ffff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </Sphere>

      <Text
        position={[0, 0, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#a855f7"
      >
        Global Model
      </Text>

      <Text
        position={[0, -0.5, 0]}
        fontSize={0.35}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {`${accuracy.toFixed(1)}%`}
      </Text>

      <pointLight position={[0, 0, 0]} intensity={isPulsing ? 2 : 1} color="#a855f7" />
    </group>
  );
}
