import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface HospitalBlockProps {
  position: [number, number, number];
  name: string;
  accuracy: number;
  contribution: number;
  isPulsing: boolean;
}

export function HospitalBlock({ position, name, accuracy, contribution, isPulsing }: HospitalBlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.5;
    }

    if (glowRef.current) {
      const scale = isPulsing
        ? 1.2 + Math.sin(state.clock.elapsedTime * 5) * 0.1
        : 1.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#00ffff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <Text
        position={[0, 0, 0.76]}
        fontSize={0.15}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      <Text
        position={[0, -0.3, 0.76]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {`${accuracy.toFixed(1)}%`}
      </Text>

      <Text
        position={[0, -0.5, 0.76]}
        fontSize={0.1}
        color="#a855f7"
        anchorX="center"
        anchorY="middle"
      >
        {`${contribution.toFixed(1)}%`}
      </Text>

      <pointLight position={[0, 0, 1]} intensity={0.5} color="#00ffff" />
    </group>
  );
}
